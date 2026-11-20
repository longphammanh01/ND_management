// Thay cho window.claude của claude.ai khi trang chạy trên máy chủ riêng (worker.js).
// Trang chỉ dùng: use("db") -> collection(c).onSnapshot / doc(id).set|update|delete / add, doc("c/id").set|onSnapshot
//                 use("user") -> id(), can("data.write"), profiles(ids)
(function () {
  const POLL = 10000, subs = new Set(); // 10 giây/lần, chỉ 1 lượt gọi nếu không có gì đổi
  const api = async (path, opt) => {
    const r = await fetch(path, Object.assign({ credentials: 'same-origin', headers: { 'content-type': 'application/json' } }, opt));
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(j.error || ('Lỗi ' + r.status));
    return j;
  };
  const enc = encodeURIComponent;
  const docSnap = (id, data) => ({ id, exists: data != null, data: () => (data == null ? undefined : data) });
  function sub(path, toSnap, cb, err) {
    const s = { path, v: null, cb, err, toSnap, dead: false };
    s.poll = async () => {
      if (s.dead) return;
      try {
        const j = await api(path + (s.v === null ? '' : '?v=' + s.v));
        if (!j.same) { s.v = j.v; cb(toSnap(j)) }
      } catch (e) { err && err(e) }
    };
    subs.add(s); s.poll();
    return () => { s.dead = true; subs.delete(s) };
  }
  const colOf = s => decodeURIComponent(s.path.split('/')[3]);
  const refresh = col => subs.forEach(s => colOf(s) === col && s.poll());
  const tick = async () => { // hỏi phiên bản từng nhóm, chỉ tải lại nhóm đã đổi
    if (document.hidden || !subs.size) return;
    try { const v = await api('/api/vers'); subs.forEach(s => { if (s.v === null || String(v[colOf(s)] || 0) !== String(s.v)) s.poll() }) } catch (e) {}
  };
  setInterval(tick, POLL);
  document.addEventListener('visibilitychange', tick);

  function docRef(col, id) {
    const p = '/api/doc/' + enc(col) + '/' + enc(id);
    const write = async (op, data) => { await api(p, { method: 'POST', body: JSON.stringify({ op, data }) }); refresh(col) };
    return {
      id,
      set: d => write('set', d), update: d => write('update', d), delete: () => write('delete'),
      get: async () => docSnap(id, (await api(p)).data),
      onSnapshot: (cb, err) => sub(p, j => docSnap(id, j.data), cb, err),
    };
  }
  const db = {
    collection: col => ({
      doc: id => docRef(col, id),
      add: async d => { const j = await api('/api/col/' + enc(col), { method: 'POST', body: JSON.stringify({ data: d }) }); refresh(col); return docRef(col, j.id) },
      onSnapshot: (cb, err) => sub('/api/col/' + enc(col), j => ({ docs: j.docs.map(x => docSnap(x.id, x.data)), size: j.docs.length }), cb, err),
    }),
    doc: path => { const [c, i] = path.split('/'); return docRef(c, i) },
  };
  let me = null;
  const getMe = async () => me || (me = await api('/api/me'));
  const user = {
    id: async () => (await getMe()).id,
    can: async perm => perm === 'data.write' ? !!(await getMe()).write : true,
    profiles: async ids => Object.fromEntries(ids.map(i => [i, { name: i }])),
  };
  window.claude = { use: async name => name === 'db' ? db : name === 'user' ? user : null };
})();
