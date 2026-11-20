/* ---------- Nút Sửa / Xoá trên mọi danh sách ---------- */
// Gắn nút vào các dòng, thẻ đã vẽ (chạy lại sau mỗi lần vẽ). Xoá cần bấm 2 lần.
const ACT={
  luong:{edit:k=>showEdit(k),del:async k=>{const r=S.luong.find(x=>x._id===k);await S.db.collection("luong").doc(k).delete();return r?`Đã xoá luồng ${r.ma}.`:"Đã xoá."}},
  ng:{edit:k=>{const [g,i]=k.split("|");editPerson(g,+i)},del:async k=>{const [gid,i]=k.split("|"),g=S.nguoi.find(x=>x._id===gid);if(!g)return;const p=g.nguoi[+i];await S.db.collection("nguoi").doc(gid).set({dv:g.dv,ben:g.ben,nguoi:g.nguoi.filter((_,j)=>j!==+i)});return `Đã xoá ${p?p.ho_ten:"người"}.`}},
  nc:{edit:k=>editChat(k),del:async k=>{await S.db.collection("nhomchat").doc(k).delete();return "Đã xoá nhóm chat."}},
  tl:{edit:k=>{const [g,i]=k.split("|");editDoc(g,+i)},del:async k=>{const [gid,i]=k.split("|"),g=S.tailieu.find(x=>x._id===gid);if(!g)return;await S.db.collection("tailieu").doc(gid).set({ten:g.ten,thu_tu:g.thu_tu||9,muc:g.muc.filter((_,j)=>j!==+i)});return "Đã xoá tài liệu khỏi danh sách (file trong máy không bị xoá)."}},
  lk:{edit:k=>editLink(k),del:async k=>{await S.db.collection("lienket").doc(k).delete();return "Đã xoá liên kết."}},
  mm:{edit:k=>editMm(k),del:async k=>{await S.db.collection("momang").doc(k).delete();return "Đã xoá luồng mở mạng."}}
};
const actBtns=(t,k,cls)=>`<span class="ra ${cls||""}"><button type="button" class="btn sm" data-aedit="${t}|${esc(k)}" title="Sửa">Sửa</button><button type="button" class="btn sm danger" data-adel="${t}|${esc(k)}" title="Xoá (bấm 2 lần)">Xoá</button></span>`;
function decorate(){
  const ro=S.canWrite===false;
  document.querySelectorAll("main tr[data-ng],main tr[data-nc],main tr[data-tl],main tr[data-luong]").forEach(tr=>{
    if(tr.querySelector(".ra"))return;const t=tr.dataset.ng?"ng":tr.dataset.nc?"nc":tr.dataset.tl?"tl":"luong",k=tr.dataset[t==="luong"?"luong":t];
    const th=tr.closest("table")?.querySelector("thead tr");if(th&&!th.querySelector(".th-act"))th.insertAdjacentHTML("beforeend",`<th class="th-act"></th>`);
    tr.insertAdjacentHTML("beforeend",`<td class="td-act">${ro?"":actBtns(t,k)}</td>`)});
  document.querySelectorAll("main .fl .top").forEach(top=>{const b=top.querySelector("[data-luong]");if(!b||top.querySelector(".ra"))return;b.remove();top.insertAdjacentHTML("beforeend",ro?"":actBtns("luong",b.dataset.luong))});
  document.querySelectorAll("main .lkc").forEach(c=>{if(c.querySelector(".ra"))return;const k=c.querySelector("[data-lk]")?.dataset.lk;if(k&&!ro)c.querySelector(".lka").insertAdjacentHTML("beforeend",actBtns("lk",k,"mini"))});
  document.querySelectorAll("main .kc[data-mm]").forEach(c=>{if(c.querySelector(".ra")||ro)return;c.insertAdjacentHTML("beforeend",`<div class="row">${actBtns("mm",c.dataset.mm,"mini")}</div>`)});
}
{let raf=0;new MutationObserver(()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(decorate)}).observe(document.querySelector("main"),{childList:true,subtree:true})}
document.addEventListener("click",async e=>{
  const ed=e.target.closest("[data-aedit]");if(ed){e.stopPropagation();e.preventDefault();const [t,...k]=ed.dataset.aedit.split("|");ACT[t].edit(k.join("|"));return}
  const de=e.target.closest("[data-adel]");if(!de)return;e.stopPropagation();e.preventDefault();
  if(!de.classList.contains("arm")){document.querySelectorAll(".arm").forEach(b=>{b.classList.remove("arm");b.textContent="Xoá"});de.classList.add("arm");de.textContent="Xoá thật?";clearTimeout(de._t);de._t=setTimeout(()=>{de.classList.remove("arm");de.textContent="Xoá"},3500);return}
  const [t,...k]=de.dataset.adel.split("|");de.disabled=true;
  try{const m=await ACT[t].del(k.join("|"));toast(m||"Đã xoá.")}catch(err){toast(errMsg(err));de.disabled=false}},true);

/* Sửa giá trị đề xuất trước khi duyệt */
function editDx(id){const d=S.dexuat.find(x=>x._id===id);if(!d)return;
  showForm("Sửa đề xuất",`${d.dv||""} ${d.ma||""} · ${F[d.truong]||d.truong}`,[{k:"moi",l:"Giá trị đề xuất",v:d.moi,t:"area"},{k:"ly_do",l:"Lý do",v:d.ly_do,t:"area"}],
  async v=>{if(!v.moi){toast("Giá trị đề xuất không được trống.");return false}await S.db.collection("dexuat").doc(id).update({moi:v.moi,ly_do:v.ly_do})},null)}
document.addEventListener("click",e=>{const b=e.target.closest("[data-dxedit]");if(b){e.stopPropagation();editDx(b.dataset.dxedit)}},true);

/* Quy trình: sửa, thêm, xoá bước (lưu bản sửa trong collection quytrinh; bản gốc giữ trong mã để khôi phục) */
const P_REV={nadat:"N",ba:"B",c12:"C",gtel:"G",vdc:"V","doi tac":"D","đối tác":"D"};
const wToText=w=>[...(w||"")].map(c=>P[c]).filter(Boolean).join(", ");
const textToW=t=>String(t||"").split(/[,;/+]/).map(x=>P_REV[norm(x).trim()]||P_REV[x.trim().toLowerCase()]||"").join("");
function qtSteps(g){const o=(S.quytrinh||[]).find(x=>x._id===g.k);return o&&Array.isArray(o.s)?o.s.map((s,i)=>Object.assign({},s,{live:(g.s[i]||{}).live&&s.t===(g.s[i]||{}).t?g.s[i].live:null})):g.s}
async function qtSave(g,steps){await S.db.collection("quytrinh").doc(g.k).set({s:steps.map(({live,...x})=>x),cap_nhat:vnd(new Date())})}
function qtEditStep(mode){const g=QT.find(x=>x.k===QS.g),steps=qtSteps(g),i=QS.i,s=mode==="add"?{}:steps[i];
  showForm(mode==="add"?`Thêm bước sau bước ${i+1}`:`Sửa bước ${i+1}`,g.t,[{k:"t",l:"Tên bước *",v:s.t},{k:"w",l:"Ai làm (NADAT, BA, C12, Gtel, VDC, Đối tác – cách nhau dấu phẩy)",v:wToText(s.w)},{k:"io",l:"Đầu vào → đầu ra",v:s.io,t:"area"},{k:"tg",l:"Thời gian thực tế",v:s.tg},{k:"ba",l:"Việc BA",v:s.ba,t:"area"},{k:"ng",l:"Điểm nghẽn",v:s.ng,t:"area"},{k:"cc",l:"Căn cứ",v:s.cc}],
  async v=>{if(!v.t){toast("Cần nhập tên bước.");return false}const ns={t:v.t,w:textToW(v.w),io:v.io,tg:v.tg,ba:v.ba,ng:v.ng,cc:v.cc},arr=steps.map(({live,...x})=>x);
    if(mode==="add"){arr.splice(i+1,0,ns);QS.i=i+1}else arr[i]=Object.assign({},arr[i],ns);await qtSave(g,arr)},null)}
document.addEventListener("click",async e=>{const b=e.target.closest("[data-qtact]");if(!b)return;e.stopPropagation();const a=b.dataset.qtact,g=QT.find(x=>x.k===QS.g);
  if(a==="edit"||a==="add")return qtEditStep(a);
  if(a==="del"){if(!b.classList.contains("arm")){b.classList.add("arm");b.textContent="Xoá thật?";setTimeout(()=>{b.classList.remove("arm");b.textContent="Xoá bước"},3500);return}
    const steps=qtSteps(g).map(({live,...x})=>x);if(steps.length<=1){toast("Quy trình phải còn ít nhất 1 bước.");return}steps.splice(QS.i,1);QS.i=Math.max(0,QS.i-1);try{await qtSave(g,steps);toast("Đã xoá bước.")}catch(err){toast(errMsg(err))}}
  if(a==="reset"){if(!b.classList.contains("arm")){b.classList.add("arm");b.textContent="Khôi phục thật?";setTimeout(()=>{b.classList.remove("arm");b.textContent="Khôi phục bản gốc"},3500);return}
    try{await S.db.collection("quytrinh").doc(g.k).delete();QS.i=0;toast("Đã khôi phục quy trình gốc.")}catch(err){toast(errMsg(err))}}},true);

/* Duyệt / bỏ tất cả đề xuất: bấm 2 lần để xác nhận */
function dxAll(ok,b){const ds=S.dexuat.filter(d=>d.trang_thai==="cho");if(!ds.length||S.canWrite===false)return;
  const lb=ok?"Duyệt tất cả":"Bỏ tất cả";
  if(!b.dataset.arm){b.dataset.arm=1;b.textContent=`Bấm lần nữa để ${ok?"duyệt":"bỏ"} ${ds.length} mục`;setTimeout(()=>{delete b.dataset.arm;b.textContent=lb},4000);return}
  delete b.dataset.arm;b.disabled=true;b.textContent="Đang xử lý…";
  (async()=>{for(const d of ds)await decide(d._id,ok);b.disabled=false;b.textContent=lb;toast(`${ok?"Đã duyệt":"Đã bỏ"} ${ds.length} đề xuất.`)})()}
$("dxAllOk").addEventListener("click",e=>dxAll(true,e.currentTarget));
$("dxAllBo").addEventListener("click",e=>dxAll(false,e.currentTarget));

/* Nút thu gọn menu trái, nhớ lựa chọn trên máy người xem */
(()=>{const app=document.querySelector(".app"),b=$("sideTog");
  const set=m=>{app.classList.toggle("mini",m);b.textContent=m?"»":"«";const l=m?"Mở rộng menu":"Thu gọn menu";b.title=l;b.setAttribute("aria-label",l);b.setAttribute("aria-expanded",String(!m))};
  let m=false;try{m=localStorage.getItem("ndop_mini")==="1"}catch(e){}set(m);
  b.addEventListener("click",()=>{m=!m;set(m);try{localStorage.setItem("ndop_mini",m?"1":"0")}catch(e){}})})();
