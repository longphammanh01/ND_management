/* ---------- Liên kết hệ thống ---------- */
// Tài khoản dev/test: mật khẩu là dữ liệu chung của trang (người dùng yêu cầu), bấm là chép.
const LKNHOM=["Hệ thống v1","Hệ thống v2 (dev/test)","Prototype BA","Khác"];
const isLocal=u=>/^[a-z]:\\|^\\\\/i.test(String(u||""));
S.mkShow=new Set();
function mkCell(l){const v=l.mat_khau;if(!v)return `<button type="button" class="btn sm" data-lkedit="${esc(l._id)}">+ Thêm</button>`;
  return `<div class="tools" style="flex-wrap:nowrap"><button type="button" class="btn sm mkb" data-copy="${esc(v)}" data-quiet="1" title="Bấm để chép mật khẩu">${S.mkShow.has(l._id)?esc(v):"••••••"}</button><button type="button" class="btn sm" data-mkshow="${esc(l._id)}" title="${S.mkShow.has(l._id)?"Ẩn":"Hiện"} mật khẩu">${S.mkShow.has(l._id)?"Ẩn":"Hiện"}</button></div>`}
S.lkg="";
const lanNote=u=>/^https?:\/\/(192\.168\.|10\.|172\.(1[6-9]|2\d|3[01])\.)|\.ndop\//.test(u);
function lkCard(l){const loc=isLocal(l.url),h=l.mo||(loc?null:l.url);
  return `<div class="lkc"><div class="lkh"><button type="button" class="lkt" data-lk="${esc(l._id)}" title="Sửa liên kết">${esc(l.ten)}</button><div class="lka">${h?`<a class="btn sm primary" href="${esc(h)}" target="_blank" rel="noopener">Mở</a>`:`<button class="btn sm primary" type="button" data-openlocal="${esc(fileUrl(l.url))}" title="Chép địa chỉ để mở trong tab mới">Mở</button>`}<button class="btn sm" type="button" data-copy="${esc(l.url)}" title="${loc?"File trong máy: chép rồi dán vào thanh địa chỉ trình duyệt":"Chép địa chỉ"}">Chép</button></div></div>
   <div class="path c1" title="${esc(l.url)}">${esc(l.url)}</div>
   ${l.tai_khoan||l.mat_khau?`<div class="lkcred"><span class="d">TK</span>${l.tai_khoan?`<button type="button" class="btn sm" data-copy="${esc(l.tai_khoan)}" data-quiet="1" title="Bấm để chép tài khoản">${esc(l.tai_khoan)}</button>`:`<span class="d">—</span>`}<span class="d">MK</span>${mkCell(l)}</div>`:""}
   ${l.ghi_chu?`<div class="d c1" title="${esc(l.ghi_chu)}">${esc(l.ghi_chu)}</div>`:""}</div>`}
function rLinks(){
  $("nLink").textContent=S.lienket.length?`(${S.lienket.length})`:"";
  const q=norm($("qLk").value),groups=[...new Set([...LKNHOM,...S.lienket.map(l=>l.nhom||"Khác")])].filter(g=>S.lienket.some(l=>(l.nhom||"Khác")===g));
  $("segLk").innerHTML=[["","Tất cả ("+S.lienket.length+")"],...groups.map(g=>[g,g+" ("+S.lienket.filter(l=>(l.nhom||"Khác")===g).length+")"])].map(([v,t])=>`<button type="button" data-lkg="${esc(v)}" aria-pressed="${v===S.lkg}">${esc(t)}</button>`).join("");
  const rows=S.lienket.filter(l=>(!S.lkg||(l.nhom||"Khác")===S.lkg)&&(!q||norm([l.nhom,l.ten,l.url,l.tai_khoan,l.ghi_chu].join(" ")).includes(q)));
  const gs=groups.map(g=>({g,ls:rows.filter(l=>(l.nhom||"Khác")===g).sort((a,b)=>(a.thu_tu||99)-(b.thu_tu||99)||String(a.ten).localeCompare(String(b.ten),"vi"))})).filter(x=>x.ls.length);
  $("lkGroups").innerHTML=gs.map(({g,ls})=>`<section class="lkgrp"><h3>${esc(g)} <span class="d">${ls.length} · ${ls.some(l=>lanNote(l.url))?"cần mạng NADAT/VPN":ls.some(l=>/^https?:\/\/(localhost|127\.0\.0\.1)/.test(l.url))?"bấm Mở: tự bật máy chủ nội bộ rồi mở trang (cần đăng ký nút Mở một lần trên máy này)":ls.some(l=>isLocal(l.url))?"file trong máy: bấm Mở để chép địa chỉ, rồi dán vào tab mới":""}</span></h3><div class="lkgrid">${ls.map(lkCard).join("")}</div></section>`).join("")||`<div class="card empty">${S.loaded?"Không có liên kết khớp.":"Đang tải…"}</div>`;
}
function editLink(id){
  const l=S.lienket.find(x=>x._id===id)||{};
  showForm(l.ten||"Thêm liên kết","Tài khoản dev/test: mật khẩu hiển thị cho mọi người mở trang.",[{k:"nhom",l:"Nhóm *",o:LKNHOM,v:l.nhom||LKNHOM[0]},{k:"ten",l:"Tên hệ thống *",v:l.ten},{k:"url",l:"Địa chỉ (URL hoặc đường dẫn file) *",v:l.url},{k:"tai_khoan",l:"Tài khoản",v:l.tai_khoan},{k:"mat_khau",l:"Mật khẩu",v:l.mat_khau},{k:"ghi_chu",l:"Ghi chú",v:l.ghi_chu,t:"area"},{k:"thu_tu",l:"Thứ tự hiển thị",v:l.thu_tu||""}],
  async v=>{if(!v.ten||!v.url){toast("Cần nhập tên hệ thống và địa chỉ.");return false}
    v.thu_tu=+v.thu_tu||99;const c=S.db.collection("lienket");if(l._id)await c.doc(l._id).set(v);else await c.add(v)},
  l._id?()=>S.db.collection("lienket").doc(l._id).delete():null);
}
/* Dán hàng loạt: người dùng dán nguyên đoạn danh sách (địa chỉ + "account: tk / mk"), trang tự khớp theo địa chỉ. */
function parseBulk(txt){
  const urls=S.lienket.map(l=>({l,u:String(l.url||"").trim()})).filter(x=>x.u);
  const hits=urls.map(x=>({...x,i:txt.indexOf(x.u)})).filter(x=>x.i>=0).sort((a,b)=>a.i-b.i);
  return hits.map((h,k)=>{const seg=txt.slice(h.i+h.u.length,k+1<hits.length?hits[k+1].i:undefined);
    let tk="",mk="";let m=seg.match(/account\s*:\s*([^\s/(]+)/i);if(m)tk=m[1];
    m=seg.match(/password\s*:\s*(\S+)/i)||seg.match(/account\s*:\s*[^\s/(]+(?:\s*\([^)]*\))?\s*\/\s*(\S+)/i);if(m)mk=m[1];
    return {l:h.l,tk,mk}}).filter(x=>x.mk||x.tk)}
function bulkForm(){S.edit=null;let found=[];
  S.form={fields:[],onSave:async()=>{if(!found.length){toast("Chưa khớp được liên kết nào.");return false}
    const ops=found.map(f=>S.db.collection("lienket").doc(f.l._id).update(Object.assign(f.mk?{mat_khau:f.mk}:{},f.tk&&!f.l.tai_khoan?{tai_khoan:f.tk}:{})));await Promise.all(ops)}};
  $("dTitle").textContent="Dán tài khoản, mật khẩu hàng loạt";$("dSub").textContent="Dán nguyên đoạn danh sách (mỗi địa chỉ kèm dòng “account: tài khoản / mật khẩu”). Trang tự khớp theo địa chỉ.";$("dFoot").hidden=false;
  $("dBody").innerHTML=`<div class="fld"><label for="g_bulk">Danh sách</label><textarea id="g_bulk" style="min-height:220px" placeholder="http://… \naccount: admin/ admin"></textarea></div><div id="g_prev" class="d">Chưa có gì để khớp.</div>`;
  $("g_bulk").addEventListener("input",()=>{found=parseBulk($("g_bulk").value);$("g_prev").innerHTML=found.length?`<b>Khớp ${found.length} liên kết:</b><br>`+found.map(f=>`${esc(f.l.ten)} – ${esc(f.tk||f.l.tai_khoan||"?")} / ${f.mk?"••••••":"(không có mật khẩu)"}`).join("<br>"):"Chưa khớp được liên kết nào."});
  $("dSave").disabled=S.canWrite===false;$("dPerm").textContent="";openD();setTimeout(()=>$("g_bulk").focus(),50)}
$("qLk").addEventListener("input",rLinks);
document.addEventListener("click",e=>{if(e.target.closest("aside"))return;
  const t=e.target.closest("[data-tltab]");if(t){const k=t.dataset.tltab;document.querySelectorAll("[data-tltab]").forEach(b=>b.setAttribute("aria-selected",b===t));$("tlCay").hidden=k!=="cay";$("tlLink").hidden=k!=="link";const ab=document.querySelector('#v-tai-lieu .head [data-add="tl"]');if(ab)ab.hidden=k!=="cay";return}
  const ol=e.target.closest("[data-openlocal]");if(ol){const u=ol.dataset.openlocal;navigator.clipboard.writeText(u).then(()=>toast("Trình duyệt không cho trang web mở file trong máy. Đã chép địa chỉ: mở tab mới (Ctrl+T), dán (Ctrl+V), Enter."),()=>toast(u));return}
  let g=e.target.closest("[data-lkg]");if(g){S.lkg=g.dataset.lkg;rLinks();return}
  let m=e.target.closest("[data-mkshow]");if(m){const k=m.dataset.mkshow;S.mkShow.has(k)?S.mkShow.delete(k):S.mkShow.add(k);rLinks();return}
  m=e.target.closest("[data-lkedit]");if(m){editLink(m.dataset.lkedit);return}
  if(e.target.closest("#lkBulk")){bulkForm();return}
  if(e.target.closest("[data-copy]")||e.target.closest("a.btn"))return;
  const r=e.target.closest("[data-lk]");if(r)editLink(r.dataset.lk)});
