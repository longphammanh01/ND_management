/* ---------- Tài liệu: cây thư mục + mở file ---------- */
const extOf=p=>(String(p||"").match(/\.([a-z0-9]+)$/i)||[])[1]?.toLowerCase()||"";
const fileUrl=p=>"file:///"+encodeURI(String(p).replace(/\\/g,"/")).replace(/#/g,"%23").replace(/\?/g,"%3F");
function openHref(m){const p=m.duong_dan||"";if(!p)return null;if(/^https?:/.test(p))return p;const e=extOf(p);
  if(["doc","docx","docm","rtf"].includes(e))return "ms-word:ofv|u|"+fileUrl(p);
  if(["xls","xlsx","xlsm","csv"].includes(e))return "ms-excel:ofv|u|"+fileUrl(p);
  if(["ppt","pptx"].includes(e))return "ms-powerpoint:ofv|u|"+fileUrl(p);
  if(["vsd","vsdx"].includes(e))return "ms-visio:ofv|u|"+fileUrl(p);
  return null}
function docBtns(m){const p=m.duong_dan||"",h=openHref(m),web=/^https?:/.test(p);if(!p)return "";
  return `<div class="tools" style="flex-wrap:nowrap">${h?`<a class="btn sm primary" href="${esc(h)}" target="_blank" rel="noopener" title="${web?"Mở liên kết":"Mở bằng ứng dụng Office trên máy"}">Mở</a>`:""}${web?"":`<button class="btn sm" type="button" data-copy="${esc(p)}" title="${h?"Chép đường dẫn":"Loại file này trình duyệt không mở thẳng được – chép đường dẫn rồi dán vào File Explorer"}">Chép</button>`}</div>`}
function docRow(m){const web=/^https?:/.test(m.duong_dan);return `<tr><td title="${esc(m.duong_dan)}"><div class="t c1"><span class="fx">${esc(extOf(m.duong_dan)||(web?"web":"—"))}</span> ${esc(m.ten)}</div>${m.mo_ta?`<div class="d c1" title="${esc(m.mo_ta)}">${esc(m.mo_ta)}</div>`:""}</td><td><span class="tag">${esc(m.loai||"—")}</span></td><td class="d"><div class="c1" title="${esc(m.nguon)}">${esc(m.nguon)}</div>${esc(m.ngay)}</td><td>${/Chưa|Không/.test(m.trang_thai)?`<span class="pill p-wait">${esc(m.trang_thai)}</span>`:/Đang/.test(m.trang_thai)?`<span class="pill p-run">${esc(m.trang_thai)}</span>`:`<span class="pill p-ok">${esc(m.trang_thai||"Có sẵn")}</span>`}</td><td>${docBtns(m)}</td></tr>`}
function folderOf(m,g){const p=String(m.duong_dan||"").replace(/\\/g,"/"),parts=p.split("/");
  if(/^https?:/.test(p))return m.thu_muc?["Tài liệu theo đơn vị",...m.thu_muc.split(" › ")]:["Kết quả tổng hợp","Liên kết web"];
  let i=parts.indexOf("08_TaiLieu_TheoDonVi");if(i>=0)return ["Tài liệu theo đơn vị",...parts.slice(i+1,-1)];
  i=parts.indexOf("Input");if(i>=0)return ["Tài liệu dự án (Input)",...parts.slice(i+1,-1)];
  i=parts.indexOf("NDOP_QuanLy_DauNoi");if(i>=0){const sub=parts.slice(i+1,-1).map(x=>x==="06_Nguon"?"Nguồn, bản chép chat":x);return ["Kết quả tổng hợp",...sub]}
  if(p)return ["Khác",g.ten];
  const src=String(m.nguon||""),plat=(src.match(/^([^:]+):/)||[])[1]||"Không rõ nguồn",grp=((src.split(":")[1]||"").split(/ – | · /)[0]||"").trim()||"Không rõ nhóm";
  return ["Chưa có file trong máy",plat.trim(),grp]}
const FORDER=["Tài liệu theo đơn vị","Tài liệu dự án (Input)","Kết quả tổng hợp","Chưa có file trong máy","Khác"];
function docTree(){const root={n:"",k:"",c:new Map(),f:[]};
  S.tailieu.forEach(g=>(g.muc||[]).forEach((m,i)=>{let node=root;const path=folderOf(m,g);path.forEach((seg,j)=>{if(!node.c.has(seg))node.c.set(seg,{n:seg,k:path.slice(0,j+1).join("›"),c:new Map(),f:[]});node=node.c.get(seg)});node.f.push({m,g,i})}));
  S.tailieu.forEach(g=>(g.thu_muc_may||[]).forEach(rel=>{let node=root;const path=["Tài liệu theo đơn vị",...rel.split("/")];path.forEach((seg,j)=>{if(!node.c.has(seg))node.c.set(seg,{n:seg,k:path.slice(0,j+1).join("›"),c:new Map(),f:[]});node=node.c.get(seg)})}));
  const cnt=n=>n.t=n.f.length+[...n.c.values()].reduce((a,c)=>a+cnt(c),0);cnt(root);return root}
S.folder="Tài liệu theo đơn vị";const TOPEN=new Set(["Tài liệu theo đơn vị"]);
function findNode(root,k){if(root.k===k)return root;for(const c of root.c.values()){const r=findNode(c,k);if(r)return r}return null}
function emptyDir(n){const g=S.tailieu.find(x=>x.goc),p=n.k.split("›");if(!g||p[0]!=="Tài liệu theo đơn vị"||p.length<2)return `<div class="empty">Thư mục trống.</div>`;
  const path=g.goc+"\\"+p.slice(1).join("\\");return `<div class="empty">Chưa có tài liệu. Bỏ tài liệu vào thư mục này trong máy:<div class="tools" style="justify-content:center;margin-top:8px"><code style="word-break:break-all">${esc(path)}</code><button class="btn sm" type="button" data-copy="${esc(path)}">Chép đường dẫn</button></div></div>`}
function rDocs(){
  const root=docTree(),q=norm($("qTl").value);
  const sortC=n=>[...n.c.values()].sort((a,b)=>n===root?FORDER.indexOf(a.n)-FORDER.indexOf(b.n):a.n.localeCompare(b.n,"vi",{numeric:true}));
  const tree=(n,d)=>sortC(n).map(c=>{const has=c.c.size>0,op=TOPEN.has(c.k);return `<div class="tn ${S.folder===c.k?"on":""}" style="padding-left:${6+d*14}px"><button type="button" class="tt" data-tog="${esc(c.k)}" ${has?"":"disabled"} aria-label="${op?"Thu gọn":"Mở rộng"}">${has?(op?"▾":"▸"):""}</button><button type="button" class="tf" data-fold="${esc(c.k)}">${esc(c.n)} <span class="d">${c.t}</span></button></div>${has&&op?tree(c,d+1):""}`}).join("");
  $("tlTree").innerHTML=tree(root,0);
  let head,rows;
  if(q){const all=[];const walk=n=>{n.f.forEach(x=>all.push(Object.assign({path:n.k},x)));n.c.forEach(walk)};walk(root);
    rows=all.filter(({m})=>norm(Object.values(m).join(" ")).includes(q));head=`Kết quả tìm “${esc($("qTl").value)}” · ${rows.length} tài liệu`;
    $("tlList").innerHTML=`<div class="grp"><h3>${head}</h3></div><div class="tbl"><table><thead><tr><th style="width:44%">Tài liệu</th><th>Loại</th><th style="width:20%">Nguồn</th><th>Trạng thái</th><th></th></tr></thead><tbody>${rows.map(({m,g,i,path})=>docRow(m).replace("<tr>",`<tr class="go" data-tl="${esc(g._id)}|${i}">`).replace('</div>',`</div><div class="d c1">Thư mục: ${esc(path.replace(/›/g," › "))}</div>`)).join("")||`<tr><td colspan="5" class="empty">Không có tài liệu khớp.</td></tr>`}</tbody></table></div>`;return}
  const n=findNode(root,S.folder)||root,crumbs=n.k?n.k.split("›"):[];
  const bc=`<button type="button" class="crumb" data-fold="">Tất cả</button>`+crumbs.map((c,j)=>` › <button type="button" class="crumb" data-fold="${esc(crumbs.slice(0,j+1).join("›"))}">${esc(c)}</button>`).join("");
  const subs=sortC(n);
  $("tlList").innerHTML=`<div class="grp" style="flex-wrap:wrap"><div class="bc">${bc}</div><span>${n.t} tài liệu</span></div>${subs.length?`<div class="subs">${subs.map(c=>`<button type="button" class="sub" data-fold="${esc(c.k)}"><b>${esc(c.n)}</b><span class="d">${c.t} tài liệu</span></button>`).join("")}</div>`:""}${n.f.length?`<div class="tbl"><table><thead><tr><th style="width:46%">Tài liệu</th><th>Loại</th><th style="width:20%">Nguồn</th><th>Trạng thái</th><th></th></tr></thead><tbody>${n.f.map(({m,g,i})=>docRow(m).replace("<tr>",`<tr class="go" data-tl="${esc(g._id)}|${i}">`)).join("")}</tbody></table></div>`:subs.length?"":emptyDir(n)}`;
}
document.addEventListener("click",e=>{if(e.target.closest("aside"))return;
  let t=e.target.closest("[data-tog]");if(t){const k=t.dataset.tog;TOPEN.has(k)?TOPEN.delete(k):TOPEN.add(k);rDocs();return}
  t=e.target.closest("[data-fold]");if(t){const k=t.dataset.fold;S.folder=k;const p=k.split("›");p.forEach((_,j)=>TOPEN.add(p.slice(0,j+1).join("›")));$("qTl").value="";rDocs();return}
  if(e.target.closest("#v-tai-lieu a.btn,#v-don-vi a.btn"))e.stopPropagation()},true);
