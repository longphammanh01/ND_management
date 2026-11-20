/* ---------- Danh mục đơn vị: đủ mọi đơn vị + API Specs ---------- */
const APIST=["Đã nhận","Đang chờ","Chưa nhận","Chưa rõ","Không áp dụng"];
const APICL={"Đã nhận":"ok","Đang chờ":"wait","Chưa nhận":"block","Chưa rõ":"none","Không áp dụng":"pend"};
const dvDoc=n=>S.donvi.find(d=>d.lien_ket===n||d.ten===n);
const apiPill=d=>{const v=(d&&d.api_spec)||"Chưa rõ";return `<span class="pill p-${APICL[v]||"none"}">${esc(v)}</span>`};
function unitInfo(u){const d=dvDoc(u.ten),k=norm(u.ten),codes=u.rs.map(r=>norm(r.ma));
  const chat=u.rs.some(r=>{const v=String(r.nhom_chat||"").trim();return v&&v!=="—"&&!/chưa thấy/i.test(v)})||S.nhomchat.some(c=>(c.don_vi&&norm(c.don_vi).includes(k))||codes.some(m=>m&&norm(c.ma_luong).includes(m)))||!!(d&&d.nhom_chat);
  const nguoi=peopleOf(u.ten).length>0;const luong=u.rs.length>0||!!(d&&d.luong_chung);
  return {d,chat,nguoi,luong,api:(d&&d.api_spec)||"Chưa rõ"}}
function allUnits(){const U=units(),have=new Set(U.map(u=>u.ten));
  if(G.ba||G.own)return U;
  S.donvi.filter(d=>!have.has(d.lien_ket||d.ten)&&(!G.cat||d.nhom===G.cat)).forEach(d=>U.push({ten:d.lien_ket||d.ten,cat:d.nhom||"BBN",rs:[],dt:"Chưa bắt đầu",ndc:"Chưa bắt đầu",ba:"",bl:[],rdy:0,last:d.cap_nhat||"",extra:true}));
  U.forEach(u=>u.info=unitInfo(u));return U}
const DVF={"":["Tất cả",()=>true],thieu:["Thiếu thông tin",u=>!u.info.luong||!u.info.chat||!u.info.nguoi],chuaapi:["Chưa có API Specs",u=>!["Đã nhận","Không áp dụng"].includes(u.info.api)],chualuong:["Chưa có luồng",u=>!u.info.luong],chuachat:["Chưa có nhóm chat",u=>!u.info.chat],chuanguoi:["Chưa có đầu mối",u=>!u.info.nguoi]};
S.dvf="";
const dname=u=>(u.info&&u.info.d&&u.info.d.ten_hien_thi)||u.ten;
const infoChips=u=>[!u.info.luong&&"Chưa có luồng",u.info.luong&&!u.rs.length&&u.info.d&&u.info.d.luong_chung&&("Gộp trong "+u.info.d.luong_chung),!u.info.chat&&"Chưa có nhóm chat",!u.info.nguoi&&"Chưa có đầu mối"].filter(Boolean).map(t=>`<span class="${/Gộp/.test(t)?"tag":"warnchip"}">${t}</span>`).join(" ");
function rUnits(){
  const sel=$("fDvSt");if(sel.options.length<2)sel.innerHTML+=ST.map(s=>`<option>${s}</option>`).join("");
  const q=norm($("qDv").value),f=sel.value,onlyBl=$("fOnlyBl").checked,A=allUnits();
  $("dvSum").innerHTML=Object.entries(DVF).map(([k,[l,fn]])=>`<button type="button" data-dvf="${k}" aria-pressed="${S.dvf===k}">${l} (${A.filter(fn).length})</button>`).join("");
  const U=A.filter(u=>DVF[S.dvf][1](u)&&(!f||u.dt===f||u.ndc===f)&&(!onlyBl||u.bl.length)&&(!q||norm(dname(u)+" "+u.ten+" "+u.ba+" "+JSON.stringify(u.info.d||{})+" "+u.rs.map(r=>Object.values(r).join(" ")).join(" ")).includes(q)));
  U.sort((a,b)=>(b.rs.length>0)-(a.rs.length>0));
  if(onlyBl)U.sort((a,b)=>((b.bl[0]&&b.bl[0].e)-(a.bl[0]&&a.bl[0].e))||(((b.bl[0]||{}).d??-1)-((a.bl[0]||{}).d??-1)));
  const row=(u,i)=>{const b=u.bl[0],lw=u.rs.some(r=>leftIn(r).length),nb=u.rs.some(noBbnt),d=u.info.d;
    return `<tr class="go ${S.exp===u.ten?"open-row":""} ${u.extra?"dv-extra":""}" data-unit="${esc(u.ten)}" aria-expanded="${S.exp===u.ten}"><td class="num stt">${i+1}</td><td><div class="t">${esc(dname(u))}</div><div class="d">${u.rs.length?u.rs.length+" luồng":"—"}${d&&d.chu_quan?" · "+esc(d.chu_quan):""}${d&&d.ma_tien_do?" · mục "+esc(d.ma_tien_do):""}</div><div>${infoChips(u)}</div></td>
    <td><button type="button" class="apib" data-dvedit="${esc(u.ten)}" title="${esc(d?(d.api_spec_tl||d.api_cancu||""):"Chưa có thông tin – bấm để nhập")}">${apiPill(d)}</button>${d&&d.api_spec_ngay?`<div class="d">${esc(d.api_spec_ngay)}</div>`:""}</td>
    <td>${u.rs.length?pill(u.dt):`<span class="d">—</span>`}</td><td>${u.rs.length?pill(u.ndc):`<span class="d">—</span>`}</td><td class="num">${u.rs.length?u.rdy+"/6":"—"}</td>
    <td>${b?`<div class="c1" title="${esc(b.r.blocker)}">${b.d!=null?`<b class="${b.d>=14?"num hot":"num"}">${b.d} ngày</b> · `:""}${esc(b.r.blocker)}</div><div>${owners(b.r).map(ownTag).join(" ")} ${b.e?`<span class="flag">Báo lãnh đạo</span>`:""}${u.bl.length>1?` <span class="d">+${u.bl.length-1} vướng mắc</span>`:""}</div>`:u.rs.length?`<span class="d">Không vướng</span>`:`<span class="d c1" title="${esc(d&&d.ghi_chu||"")}">${esc(d&&d.ghi_chu||"")}</span>`}${nb?` <span class="warnchip">Thiếu BBNT</span>`:""}</td>
    <td>${esc(u.ba)}${lw?` <span class="warnchip">BA đã nghỉ</span>`:""}</td><td class="d">${esc(u.last)}${u.rs.length?staleTag(u.last):""}</td></tr>${S.exp===u.ten?`<tr class="xrow"><td colspan="9">${dvHead(u)}${detail(u)}</td></tr>`:""}`};
  $("tbDv").innerHTML=CATORDER.filter(c=>U.some(u=>u.cat===c)).map(c=>{const us=U.filter(u=>u.cat===c);return `<tr class="cat"><td colspan="9">${CAT[c]} · ${us.length} đơn vị${us.some(u=>!u.rs.length)?` (${us.filter(u=>!u.rs.length).length} chưa có luồng riêng)`:""}</td></tr>`+us.map((u,i)=>row(u,i)).join("")}).join("")||`<tr><td colspan="9" class="empty">${S.loaded?"Không có đơn vị khớp bộ lọc.":"Đang tải…"}</td></tr>`;
}
const driveLinks=t=>t?`<div class="d">Thư mục Drive: ${t.split(/;\s*(?=[^;]*https?:)/).map(x=>{const m=x.match(/^(.*?):\s*(https?:\S+)$/);return m?`<a href="${esc(m[2])}" target="_blank" rel="noopener">${esc(m[1])}</a>`:esc(x)}).join(" · ")}</div>`:"";
function dvHead(u){const d=u.info.d||{};return `<div class="dvh"><div><b>API Specs:</b> ${apiPill(d)} ${d.api_spec_ngay?`<span class="d">${esc(d.api_spec_ngay)}</span>`:""}${d.api_spec_tl?`<div class="d">Tài liệu: ${esc(d.api_spec_tl)}</div>`:""}${d.api_cancu?`<div class="d">Căn cứ: ${esc(d.api_cancu)}</div>`:""}${driveLinks(d.thu_muc_drive)}${d.chu_quan?`<div class="d">Chủ quản/nhà thầu: ${esc(d.chu_quan)}</div>`:""}${d.ghi_chu?`<div class="d">Ghi chú: ${esc(d.ghi_chu)}</div>`:""}</div><button type="button" class="btn sm" data-dvedit="${esc(u.ten)}">Sửa thông tin đơn vị</button></div>`}
const slugDv=s=>norm(s).replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,60);
function editDv(name){const d=dvDoc(name)||{},u=units(S.luong).find(x=>x.ten===name);
  showForm(name?`Đơn vị · ${d.ten_hien_thi||name}`:"Thêm đơn vị","API Specs gồm cả API expose, tài liệu nghiệp vụ, hướng dẫn tích hợp/kết nối, đặc tả.",[
    {k:"ten",l:"Tên đơn vị *",v:d.ten||name},{k:"ten_hien_thi",l:"Tên hiển thị (đầy đủ, kèm viết tắt)",v:d.ten_hien_thi||d.ten||name},{k:"nhom",l:"Nhóm *",o:CATORDER.map(c=>CAT[c]),v:CAT[d.nhom||(u&&u.cat)]||CAT.BBN},
    {k:"api_spec",l:"API Specs *",o:APIST,v:d.api_spec||"Chưa rõ"},{k:"api_spec_ngay",l:"Ngày nhận (dd/mm/yyyy)",v:d.api_spec_ngay},{k:"api_spec_tl",l:"Tên tài liệu API Specs",v:d.api_spec_tl,t:"area"},{k:"api_cancu",l:"Căn cứ (nhóm chat, người gửi)",v:d.api_cancu},
    {k:"ma_tien_do",l:"Mục trong bảng tiến độ",v:d.ma_tien_do},{k:"chu_quan",l:"Chủ quản / nhà thầu",v:d.chu_quan},{k:"dv_nguoi",l:"Tên đơn vị trong Stakeholder (để tìm đầu mối)",v:d.dv_nguoi,list:"dlDv"},{k:"nhom_chat",l:"Nhóm chat (nếu chưa gắn luồng)",v:d.nhom_chat,list:"dlChat"},{k:"luong_chung",l:"Thuộc luồng gộp (nếu có)",v:d.luong_chung},{k:"thu_muc_drive",l:"Thư mục Drive (mỗi mục dạng \"tên: link\", cách nhau bằng ;)",v:d.thu_muc_drive,t:"area"},{k:"ghi_chu",l:"Ghi chú",v:d.ghi_chu,t:"area"}],
  async v=>{if(!v.ten){toast("Cần nhập tên đơn vị.");return false}const nh=CATORDER.find(c=>CAT[c]===v.nhom)||"BBN";
    const doc=Object.assign({},d,v,{nhom:nh,lien_ket:d.lien_ket||(u?name:v.ten),cap_nhat:vnd(new Date())});delete doc._id;
    await S.db.collection("donvi").doc(d._id||slugDv(v.ten)).set(doc)},
  d._id&&!(u&&u.rs.length)?()=>S.db.collection("donvi").doc(d._id).delete():null)}
document.addEventListener("click",e=>{let t=e.target.closest("[data-dvedit]");if(t){e.stopPropagation();editDv(t.dataset.dvedit);return}
  t=e.target.closest("[data-dvf]");if(t){S.dvf=t.dataset.dvf;rUnits();return}
  if(e.target.closest("#dvAdd")){e.stopPropagation();editDv("")}},true);
