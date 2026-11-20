// Chạy thử trang + API trên máy, không cần Cloudflare (dùng SQLite có sẵn trong Node 22+).
//   node chay_thu_tren_may.mjs          -> mở http://127.0.0.1:8788 (dữ liệu nạp từ seed.sql, lưu trong bộ nhớ)
//   node chay_thu_tren_may.mjs --test   -> chạy kiểm thử tự động rồi thoát
import { DatabaseSync } from 'node:sqlite';
import { readFileSync, existsSync } from 'node:fs';
import { createServer } from 'node:http';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { handle, d1Store } from './worker.js';

const HERE = dirname(fileURLToPath(import.meta.url));
// D1 giả lập trên SQLite: đủ cho prepare().bind().all()/first()/run() và batch()
function fakeD1() {
  const db = new DatabaseSync(':memory:');
  db.exec(readFileSync(join(HERE, 'seed.sql'), 'utf8'));
  const stmt = (sql, args = []) => ({
    bind: (...a) => stmt(sql, a),
    all: async () => ({ results: db.prepare(sql).all(...args) }),
    first: async () => db.prepare(sql).get(...args) ?? null,
    run: async () => (db.prepare(sql).run(...args), { success: true }),
  });
  return { prepare: sql => stmt(sql), batch: async ss => { db.exec('BEGIN'); try { for (const s of ss) await s.run(); db.exec('COMMIT') } catch (e) { db.exec('ROLLBACK'); throw e } } };
}
const DB = fakeD1(), store = d1Store(DB);
const ENV = { ALLOW_DEV: '1', DEV_EMAIL: 'ba@local', WRITERS: 'ba@local' };
const call = (path, init = {}, env = ENV) => handle(new Request('http://local' + path, init), env, store);

if (process.argv.includes('--test')) {
  // 1. API trực tiếp
  assert.equal((await call('/api/me', {}, {})).status, 401, 'không cấu hình đăng nhập thì phải từ chối');
  assert.equal((await call('/api/doc/luong/x', { method: 'POST', body: '{"op":"set","data":{}}' }, { ...ENV, WRITERS: 'khac@x' })).status, 403, 'không có quyền sửa thì phải từ chối');
  assert.equal((await call('/api/col/a b')).status, 400);
  const l = await (await call('/api/col/luong')).json();
  assert.equal(l.docs.length, 31); assert.ok(l.docs.find(d => d.id === 'cs-04').data.ba.includes('Linh Trần'));
  assert.deepEqual(await (await call('/api/col/luong?v=' + l.v)).json(), { same: true });
  const vs = await (await call('/api/vers')).json(); assert.equal(vs.luong, l.v);
  // 2. Lớp thay thế window.claude chạy như trong trình duyệt
  const win = { document: { hidden: false, addEventListener() {} }, setInterval: () => 0,
    fetch: (p, init) => call(p, init) };
  win.window = win; vm.createContext(win);
  vm.runInContext(readFileSync(join(HERE, 'claude-shim.js'), 'utf8'), win);
  const db = await win.claude.use('db'), user = await win.claude.use('user');
  assert.equal(await user.id(), 'ba@local'); assert.equal(await user.can('data.write'), true);
  const seen = [];
  db.collection('luong').onSnapshot(s => seen.push(s.docs.length));
  await new Promise(r => setTimeout(r, 50));
  await db.collection('luong').doc('cs-99').set({ ma: 'CS-99', ba: 'Long' });
  await db.collection('luong').doc('cs-99').update({ ba: 'Linh Trần', dt_tt: 'Đang thực hiện' });
  await new Promise(r => setTimeout(r, 50));
  const g = await db.collection('luong').doc('cs-99').get();
  assert.deepEqual(g.data(), { ma: 'CS-99', ba: 'Linh Trần', dt_tt: 'Đang thực hiện' }, 'update phải gộp trường');
  await db.collection('luong').doc('cs-99').delete();
  await new Promise(r => setTimeout(r, 50));
  assert.deepEqual(seen.slice(0, 1), [31]); assert.equal(seen.at(-1), 31); assert.ok(seen.includes(32), 'onSnapshot phải báo khi có thay đổi');
  const ref = await db.collection('nhatky').add({ ma: 'CS-99', ghi: 'thử' });
  assert.equal((await ref.get()).data().ghi, 'thử');
  let q = null; db.doc('yeucau/quet').onSnapshot(d => q = d.data());
  await db.doc('yeucau/quet').set({ trang_thai: 'cho' }); await new Promise(r => setTimeout(r, 50));
  assert.equal(q.trang_thai, 'cho');
  console.log('KIỂM THỬ ĐẠT: API, quyền, gộp trường, theo dõi thay đổi, add, doc("c/id")');
  process.exit(0);
}

const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8' };
createServer(async (req, res) => {
  const u = new URL(req.url, 'http://local');
  if (u.pathname.startsWith('/api/')) {
    const body = req.method === 'POST' ? await new Promise(r => { let b = ''; req.on('data', c => b += c); req.on('end', () => r(b)) }) : undefined;
    const r = await call(u.pathname + u.search, { method: req.method, body });
    res.writeHead(r.status, { 'content-type': 'application/json; charset=utf-8' }); res.end(await r.text()); return;
  }
  const f = join(HERE, 'public', u.pathname === '/' ? 'index.html' : u.pathname.slice(1));
  if (!f.startsWith(join(HERE, 'public')) || !existsSync(f)) { res.writeHead(404); res.end(); return }
  res.writeHead(200, { 'content-type': TYPES[extname(f)] || 'application/octet-stream', 'cache-control': 'no-store' }); res.end(readFileSync(f));
}).listen(8788, '127.0.0.1', () => console.log('Đang chạy: http://127.0.0.1:8788  (Ctrl+C để dừng; dữ liệu sửa chỉ giữ trong bộ nhớ)'));
