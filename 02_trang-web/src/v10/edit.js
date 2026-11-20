const STEPS_CS=["B1. Tạo nhóm chat","B2. Xác nhận đấu nối trực tiếp","B3. Thu thập API spec, endpoint","B4. Dev cấu hình","B5. Đấu nối lại qua NDOP","B6. Xác nhận qua log, xin testcase","B7. Soạn BBNT","B8. Chờ ký BBNT","B9. Đã ký BBNT"];
const STEPS_TH=["B1. Gửi API spec, địa chỉ DevTest","B2. Đơn vị đẩy dữ liệu","B3. Nhắc hạn / xin hạn mới","B4. Hoàn thiện BBNT","B5. Đã ký BBNT"];
const STEPS_DT=[...STEPS_CS.map(x=>"CS "+x),...STEPS_TH.map(x=>"TH "+x)];
const STEPS_NDC=["Chốt mô hình kết nối, danh mục API","Chốt IP NAT/LAN hai đầu","Gửi phiếu Firewall","Chờ P5 duyệt Firewall","Chờ Gtel mở Firewall","Dựng ShareNode/AgentNode","Kiểm tra thông mạng","Cấu hình luồng, bắn dữ liệu thử","Xác nhận dữ liệu, lập BBNT NDC","Đã ký BBNT NDC"];
const LOAI=["Kỹ thuật – mạng","Kỹ thuật – ứng dụng","Nghiệp vụ"];
const OWN3=[["Nội bộ NADAT","Nội bộ"],["C12 / hạ tầng","C12"],["Đối tác","Đối tác"]];
const toISO=s=>{const d=pDate(s);return d?`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`:""};
const fromISO=s=>{const m=String(s||"").match(/^(\d{4})-(\d{2})-(\d{2})$/);return m?`${m[3]}/${m[2]}/${m[1]}`:""};
function showEdit(id){
  const r=S.luong.find(x=>x._id===id);if(!r)return;S.form=null;S.edit=id;
  $("dTitle").textContent=`${r.ma} · ${dvOf(r)}`;$("dSub").textContent=r.luong;$("dFoot").hidden=false;
  const R=`<b class="req" aria-hidden="true">*</b>`,RC=`<b class="req" title="Bắt buộc khi có vướng mắc" aria-hidden="true">*</b>`;
  const optList=(arr,v)=>[...(v&&!arr.includes(v)?[v]:[]),...arr].map(o=>`<option ${o===v?"selected":""}>${esc(o)}</option>`).join("");
  const st=v=>ST.map(s=>`<option ${s===stOf(v)?"selected":""}>${s}</option>`).join("");
  const inp=(k,l,o={})=>`<div class="fld"><label for="f_${k}">${l}</label><input id="f_${k}" value="${esc(o.v??r[k]??"")}" ${o.list?`list="${o.list}"`:""} ${o.ph?`placeholder="${esc(o.ph)}"`:""} ${o.type?`type="${o.type}"`:""}>${o.hint?`<span class="d">${o.hint}</span>`:""}</div>`;
  const sel=(k,l,arr,v)=>`<div class="fld"><label for="f_${k}">${l}</label><select id="f_${k}">${arr}</select></div>`;
  const ta=(k,l,ph)=>`<div class="fld"><label for="f_${k}">${l}</label><textarea id="f_${k}" ${ph?`placeholder="${esc(ph)}"`:""}>${esc(r[k]||"")}</textarea></div>`;
  const own=owners(r);
  $("dBody").innerHTML=`<div class="d">${R} bắt buộc · ${RC} bắt buộc khi có vướng mắc · BBNT bắt buộc khi chọn Hoàn thành</div>
   <div class="row2">${inp("dv",`Đơn vị ${R}`,{v:dvOf(r),list:"dlUnit"})}${inp("luong",`Tên luồng ${R}`)}</div>
   <div class="row2">${sel("nhom",`Nhóm đơn vị ${R}`,CATORDER.map(c=>`<option value="${c}" ${c===r.nhom?"selected":""}>${CAT[c]}</option>`).join(""))}${sel("nv",`Nghiệp vụ ${R}`,optList(["CS","TH","ĐP","TH + ĐP"],r.nv))}</div>
   <div class="row2">${sel("ba",`BA phụ trách ${R}`,`<option value="">Chọn BA…</option>`+optList(baTeam(),r.ba))}${inp("dev","Dev NADAT",{list:"dlNadat",hint:"Nhiều người: cách nhau dấu phẩy"})}</div>
   <div class="sec"><h4>DevTest / 103NT</h4><div class="row2">${sel("dt_tt",`Trạng thái ${R}`,st(r.dt_tt))}${inp("dt_buoc","Bước hiện tại",{list:"dlDtStep",ph:"Chọn bước chuẩn hoặc ghi ngắn"})}</div>${inp("bbnt_dt","BBNT DevTest đã ký",{ph:"Đường dẫn file hoặc số, ngày ký"})}</div>
   <div class="sec"><h4>NDC (Hòa Lạc)</h4><div class="row2">${sel("ndc_tt",`Trạng thái ${R}`,st(r.ndc_tt))}${inp("ndc_buoc","Bước hiện tại",{list:"dlNdcStep",ph:"Chọn bước chuẩn hoặc ghi ngắn"})}</div>${inp("bbnt_ndc","BBNT NDC đã ký",{ph:"Đường dẫn file hoặc số, ngày ký"})}</div>
   <div class="sec"><h4>Vướng mắc</h4>${ta("blocker","Nội dung vướng mắc","Để trống nếu không vướng")}
     <div class="row2">${inp("blocker_tu",`Vướng từ ngày ${RC}`,{type:"date",v:toISO(r.blocker_tu||((String(r.blocker||"").match(/từ (\d{1,2}\/\d{1,2}(?:\/\d{4})?)/)||[])[1]))})}${sel("loai",`Loại ${RC}`,`<option value="">Chọn…</option>`+optList(LOAI,r.loai))}</div>
     <div class="fld"><span class="lbl">Bên đang chặn ${RC}</span><div class="chk" id="f_thuoc">${OWN3.map(([k,l])=>`<label><input type="checkbox" value="${k}" ${own.includes(k)?"checked":""}> ${l}</label>`).join("")}</div></div>
     <div class="row2">${inp("ai_chan","Ai đang chặn (người/đơn vị)",{list:"dlPeople"})}${inp("nguoi_nhan",`Người nhận xử lý ${RC}`,{list:"dlNadat"})}</div>
     ${inp("han_xu_ly",`Hạn xử lý ${RC}`,{type:"date",v:toISO(r.han_xu_ly)})}</div>
   ${ta("viec_tiep","Việc tiếp theo")}<div class="row2">${inp("nguoi_lam","Người làm tiếp",{list:"dlNadat"})}${inp("nhom_chat","Nhóm chat",{list:"dlChat"})}</div>
   <div class="sec"><h4>Lịch sử thay đổi</h4><div class="hist" id="dHist"></div></div><div><button class="btn sm" type="button" id="lDel">Xoá luồng này</button></div>`;
  {let armed=false;$("lDel").onclick=async()=>{if(!armed){armed=true;$("lDel").textContent="Bấm lần nữa để xoá";return}try{await S.db.collection("luong").doc(r._id).delete();toast("Đã xoá luồng.");closeD()}catch(e){toast(errMsg(e))}}}
  const ro=S.canWrite===false;$("dSave").disabled=ro||!S.db;$("dPerm").textContent=ro?"Bạn chỉ có quyền xem.":"";
  openD();hist();
}
async function save(){
  const r=S.luong.find(x=>x._id===S.edit);if(!r||!S.db)return;
  document.querySelectorAll("#dBody [aria-invalid]").forEach(e=>e.removeAttribute("aria-invalid"));
  const val=k=>{const el=$("f_"+k);return el?el.value.trim():null};
  const V={};Object.keys(F).forEach(k=>{if(k!=="dk_ndc"&&$("f_"+k))V[k]=val(k)});
  V.blocker_tu=fromISO(V.blocker_tu);V.han_xu_ly=fromISO(V.han_xu_ly);
  const th=[...document.querySelectorAll("#f_thuoc input:checked")].map(x=>x.value);V.blocker_thuoc=th.join(" + ");
  const miss=[];const need=(k,c)=>{if(c&&!V[k]){miss.push(k)}};
  ["dv","luong","nhom","nv","ba","dt_tt","ndc_tt"].forEach(k=>need(k,true));
  need("bbnt_dt",V.dt_tt==="Hoàn thành");need("bbnt_ndc",V.ndc_tt==="Hoàn thành");
  const hasB=V.blocker&&V.blocker!=="—";["blocker_tu","loai","nguoi_nhan","han_xu_ly"].forEach(k=>need(k,hasB));if(hasB&&!th.length)miss.push("thuoc");
  if(miss.length){miss.forEach(k=>{const el=$("f_"+k);if(el)el.setAttribute("aria-invalid","true")});const f=$("f_"+miss[0]);if(f&&f.focus)f.focus();
    toast("Còn thiếu: "+miss.map(k=>k==="thuoc"?"Bên đang chặn":F[k]||k).join(", ")+".");return}
  const patch={},ch=[];
  Object.keys(V).forEach(k=>{const v=V[k],old=k.endsWith("_tt")?stOf(r[k]):k==="dv"?dvOf(r):(r[k]||"");if(v!==old){patch[k]=v;ch.push({truong:k,cu:old,moi:v})}});
  if(!ch.length){toast("Không có gì thay đổi.");return}
  patch.cap_nhat=vnd(new Date());$("dSave").disabled=true;
  try{await S.db.collection("luong").doc(r._id).update(patch);await log(r._id,ch);toast(`Đã lưu ${r.ma}.`);closeD()}
  catch(e){toast(errMsg(e))}finally{$("dSave").disabled=S.canWrite===false}
}
