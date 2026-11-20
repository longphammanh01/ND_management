// Máy chủ cho trang "Quản trị NDOP" trên Cloudflare Workers + D1.
// Phục vụ trang tĩnh (thư mục public/) và API dữ liệu /api/* mà claude-shim.js gọi.
// Đăng nhập: Cloudflare Access đứng trước tên miền; Worker kiểm tra chữ ký JWT của Access.

const COL = /^[A-Za-z0-9_\-.]{1,100}$/;
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });

// ---------- Lưu trữ D1 ----------
export function d1Store(DB) {
  const ver = async col => (await DB.prepare('SELECT v FROM colver WHERE col=?').bind(col).first())?.v || 0;
  const bump = col => DB.prepare('INSERT INTO colver(col,v) VALUES(?,1) ON CONFLICT(col) DO UPDATE SET v=v+1').bind(col);
  return {
    ver,
    async vers() { const { results } = await DB.prepare('SELECT col,v FROM colver').all(); return Object.fromEntries(results.map(r => [r.col, r.v])) },
    async list(col) {
      const { results } = await DB.prepare('SELECT id,data FROM docs WHERE col=? ORDER BY id').bind(col).all();
      return { v: await ver(col), docs: results.map(r => ({ id: r.id, data: JSON.parse(r.data) })) };
    },
    async get(col, id) {
      const r = await DB.prepare('SELECT data FROM docs WHERE col=? AND id=?').bind(col, id).first();
      return { v: await ver(col), data: r ? JSON.parse(r.data) : null };
    },
    async set(col, id, data) {
      await DB.batch([DB.prepare('INSERT INTO docs(col,id,data,updated) VALUES(?,?,?,?) ON CONFLICT(col,id) DO UPDATE SET data=excluded.data, updated=excluded.updated')
        .bind(col, id, JSON.stringify(data), Date.now()), bump(col)]);
    },
    async update(col, id, data) { // gộp trường (json_patch), nguyên tử trong một câu lệnh
      await DB.batch([DB.prepare('INSERT INTO docs(col,id,data,updated) VALUES(?,?,?,?) ON CONFLICT(col,id) DO UPDATE SET data=json_patch(docs.data, excluded.data), updated=excluded.updated')
        .bind(col, id, JSON.stringify(data), Date.now()), bump(col)]);
    },
    async del(col, id) {
      await DB.batch([DB.prepare('DELETE FROM docs WHERE col=? AND id=?').bind(col, id), bump(col)]);
    },
  };
}

// ---------- Xác thực Cloudflare Access ----------
let certs = null, certsAt = 0;
const b64u = s => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4)), c => c.charCodeAt(0));
async function verifyAccess(token, env) {
  const [h, p, sig] = token.split('.');
  const head = JSON.parse(new TextDecoder().decode(b64u(h))), pay = JSON.parse(new TextDecoder().decode(b64u(p)));
  if (!certs || Date.now() - certsAt > 3600e3) {
    certs = (await (await fetch(`https://${env.ACCESS_TEAM_DOMAIN}/cdn-cgi/access/certs`)).json()).keys; certsAt = Date.now();
  }
  const jwk = certs.find(k => k.kid === head.kid);
  if (!jwk) throw new Error('kid');
  const key = await crypto.subtle.importKey('jwk', jwk, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']);
  const ok = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, b64u(sig), new TextEncoder().encode(h + '.' + p));
  const aud = [].concat(pay.aud || []);
  if (!ok || !aud.includes(env.ACCESS_AUD) || pay.exp * 1000 < Date.now()) throw new Error('jwt');
  return pay.email || pay.common_name; // common_name: Service Token dùng cho máy quét
}
async function whoami(req, env) {
  if (env.ACCESS_TEAM_DOMAIN && env.ACCESS_AUD) {
    const t = req.headers.get('cf-access-jwt-assertion');
    if (!t) return null;
    try { return await verifyAccess(t, env) } catch { return null }
  }
  return env.ALLOW_DEV === '1' ? (env.DEV_EMAIL || 'dev@local') : null; // chỉ dùng khi chạy thử trên máy
}
const canWrite = (who, env) => { const w = (env.WRITERS || '').split(',').map(s => s.trim().toLowerCase()).filter(Boolean); return w.includes('*') || w.includes(String(who).toLowerCase()) };

// ---------- API ----------
export async function handle(req, env, store) {
  const url = new URL(req.url), p = url.pathname.split('/').filter(Boolean).map(decodeURIComponent);
  if (p[0] !== 'api') return env.ASSETS ? env.ASSETS.fetch(req) : new Response('Not found', { status: 404 });
  const who = await whoami(req, env);
  if (!who) return json({ error: 'Chưa đăng nhập (Cloudflare Access chưa cấu hình hoặc phiên hết hạn)' }, 401);
  const w = canWrite(who, env);
  if (p[1] === 'me') return json({ id: who, name: who, write: w });
  if (p[1] === 'vers') return json(await store.vers()); // một lần gọi cho biết nhóm nào vừa đổi
  const [, kind, col, id] = p;
  if (!COL.test(col || '') || (id !== undefined && !COL.test(id))) return json({ error: 'Tên không hợp lệ' }, 400);
  if (req.method === 'GET') {
    const since = url.searchParams.get('v');
    if (since !== null && String(await store.ver(col)) === since) return json({ same: true });
    return json(kind === 'col' ? await store.list(col) : await store.get(col, id));
  }
  if (req.method !== 'POST') return json({ error: 'Phương thức không hỗ trợ' }, 405);
  if (!w) return json({ error: 'Không có quyền sửa' }, 403);
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== 'object') return json({ error: 'Dữ liệu không hợp lệ' }, 400);
  if (kind === 'col') { // add: tạo mã ngẫu nhiên
    const nid = crypto.randomUUID().replace(/-/g, '').slice(0, 20);
    await store.set(col, nid, body.data || {}); return json({ id: nid });
  }
  if (kind !== 'doc' || !id) return json({ error: 'Đường dẫn không hợp lệ' }, 400);
  if (body.op === 'delete') await store.del(col, id);
  else if (body.op === 'update') await store.update(col, id, body.data || {});
  else if (body.op === 'set') await store.set(col, id, body.data || {});
  else return json({ error: 'op phải là set/update/delete' }, 400);
  return json({ ok: true });
}

export default { fetch: (req, env) => handle(req, env, d1Store(env.DB)) };
