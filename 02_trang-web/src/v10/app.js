const ST=["Chưa bắt đầu","Đang thực hiện","Chờ phản hồi","Bị block","Pending","Hoàn thành"];
const CL={"Hoàn thành":"ok","Đang thực hiện":"run","Chờ phản hồi":"wait","Bị block":"block","Pending":"pend","Chưa bắt đầu":"none"};
const CAT={"BBN":"Bộ, ban, ngành","ĐP":"Địa phương","HTPM":"Phần mềm nội bộ","DN":"Doanh nghiệp","Nội bộ NDC":"Việc nội bộ tại NDC"};
const CATORDER=["BBN","ĐP","HTPM","DN","Nội bộ NDC"];
const DV={"CS-01":"PAKN","CS-13":"PAKN","CS-02":"CSDL TTHC","CS-03":"TTTT","CS-04":"Hà Nội","CS-05":"Bộ Tư pháp","TH-BBN-02":"Bộ Tư pháp","CS-06":"Sàn dữ liệu","TH-PM-02":"Sàn dữ liệu","CS-07":"VNPAY","CS-08":"MoMo","CS-09":"VPBank","CS-10":"TPBank","CS-11":"SHB","CS-12":"BIDV","CS-14":"Bộ KHCN","TH-BBN-01":"Bộ KHCN","CS-15":"HT liên lạc","CS-16/17":"Bộ Công an – C06","TH-PM-03":"DMDC","TH-PM-06":"VNPT","TH-BBN-03":"Bộ Xây dựng","TH-BBN-04":"Bộ Nội vụ","TH-BBN-05":"Bộ NN&MT","TH-BBN-06":"NHNN","TH-BBN-07":"Rà soát API Bộ ngành","ĐP-TH":"Thanh Hoá","ĐP-khác":"32 tỉnh còn lại","ĐP-DLSK":"Dữ liệu sai khác","KHO-5.1":"Kho dùng chung","KYSO":"Ký số NDC"};
const PEOPLE_OF={"CSDL TTHC":["Cổng DVC"],"HT liên lạc":["HT liên lạc","Gtel"],"Rà soát API Bộ ngành":["Gtel","VNPT"],"Thanh Hoá":["Cổng DVC"]};
const F={dv:"Đơn vị",luong:"Tên luồng",nhom:"Nhóm đơn vị",nv:"Nghiệp vụ",ba:"BA",dev:"Dev",dt_tt:"Trạng thái DevTest/103NT",dt_buoc:"Bước DevTest/103NT",bbnt_dt:"BBNT DevTest đã ký",ndc_tt:"Trạng thái NDC",ndc_buoc:"Bước NDC",bbnt_ndc:"BBNT NDC đã ký",blocker:"Vướng mắc",blocker_tu:"Vướng từ ngày",blocker_thuoc:"Thuộc",loai:"Loại",ai_chan:"Ai chặn",nguoi_nhan:"Người nhận xử lý",han_xu_ly:"Hạn xử lý",viec_tiep:"Việc tiếp theo",nguoi_lam:"Người làm tiếp",nhom_chat:"Nhóm chat",dk_ndc:"Điều kiện lên NDC"};
const DK=[["api","Danh mục API"],["bang_luong","Bảng luồng IP – port"],["dau_moi","Đầu mối mạng đối tác"],["tk_server","Tài khoản server/ESXi"],["testcase","Testcase"]];
const BENS=["Nội bộ NADAT","Chủ đầu tư – C12","Nhà thầu, hệ thống trong NDC","Bộ, ban, ngành","Bộ, ngành","Địa phương","Doanh nghiệp","Chưa rõ đơn vị"];
const TLTT=["Có sẵn","Đã tải","Chưa tải","Đang làm","Không tải"];
const S={donvi:[],quytrinh:[],lienket:[],luong:[],nhomchat:[],nguoi:[],tailieu:[],nhatky:[],momang:[],dexuat:[],quet:null,loaded:false,db:null,user:null,canWrite:null,ben:"",exp:null,tab:"luong",form:null,edit:null,bc:"noibo"};
const $=i=>document.getElementById(i);
const OPEN=new Set();document.addEventListener("toggle",e=>{const k=e.target.dataset&&e.target.dataset.k;if(k)e.target.open?OPEN.add(k):OPEN.delete(k)},true);
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const norm=s=>String(s||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/đ/gi,"d").toLowerCase();
const stOf=v=>{v=String(v||"").trim();if(!v||v==="—"||v==="-")return "Chưa bắt đầu";return ST.find(s=>v.startsWith(s))||v};
const pill=v=>{const s=stOf(v);return `<span class="pill p-${CL[s]||"none"}">${esc(s)}</span>`};
const pDate=s=>{const m=String(s||"").match(/(\d{1,2})\/(\d{1,2})(?:\/(\d{4}))?/);return m?new Date(+(m[3]||new Date().getFullYear()),+m[2]-1,+m[1]):null};
const today=()=>{const t=new Date();t.setHours(0,0,0,0);return t};
const days=d=>d?Math.max(0,Math.round((today()-d)/864e5)):null;
const wdays=d=>{if(!d)return null;let n=0;const x=new Date(d);x.setHours(0,0,0,0);const t=today();while(x<t){x.setDate(x.getDate()+1);const w=x.getDay();if(w&&w<6)n++}return n};
const vnd=d=>{const p2=n=>String(n).padStart(2,"0");return `${p2(d.getDate())}/${p2(d.getMonth()+1)}/${d.getFullYear()}`};
const bDate=r=>{if(r.blocker_tu)return pDate(r.blocker_tu);const m=String(r.blocker||"").match(/từ (\d{1,2}\/\d{1,2}(?:\/\d{4})?)/);return pDate(m?m[1]:r.cap_nhat)};
const isOpen=r=>{const b=String(r.blocker||"").trim();return !!b&&b!=="—"&&!(stOf(r.dt_tt)==="Hoàn thành"&&stOf(r.ndc_tt)==="Hoàn thành")};
const esc3=r=>isOpen(r)&&wdays(bDate(r))>3;
const owners=r=>{const t=norm(r.blocker_thuoc),o=[];if(t.includes("noi bo"))o.push("Nội bộ NADAT");if(/c12|ha tang/.test(t))o.push("C12 / hạ tầng");if(/khach|d01|tttt|gtel|vnpay|doi tac/.test(t))o.push("Đối tác");return o};
const ownTag=o=>`<span class="tag ${o.startsWith("Nội")?"in":o.startsWith("C12")?"c12":"ext"}">${esc(o)}</span>`;
const dvOf=r=>r.dv||DV[r.ma]||r.donvi||r.ma;
const staleTag=s=>{const d=days(pDate(s));return d!==null&&d>7?` <span class="stale" title="Cập nhật lần cuối ${esc(s)}">cũ ${d} ngày</span>`:""};
function toast(m){const t=$("toast");t.textContent=m;t.hidden=false;clearTimeout(toast.t);toast.t=setTimeout(()=>t.hidden=true,3500)}
const errMsg=e=>/permission|not_granted/.test(e&&e.code||"")?"Bạn chưa có quyền sửa. Nhờ chủ trang cấp quyền Contributor.":"Chưa lưu được. Kiểm tra kết nối rồi thử lại.";
async function who(){try{return S.user?await S.user.id():""}catch(e){return ""}}
async function log(id,ch,note){try{await S.db.collection("nhatky").add(Object.assign({luong:id,at:new Date().toISOString(),by:await who(),thay_doi:ch},note?{ghi_chu:note}:{}))}catch(e){}}

/* ---------- Người đã nghỉ ---------- */
const shortOf=p=>{const m=String(p.ho_ten||"").match(/\(([^)]+)\)/);const base=(m?m[1]:String(p.ho_ten||"")).replace(/\b(BA|QA|NADAT)\b/g,"").trim().split(/\s+/);return m?base[0]:base[base.length-1]};
function leftPeople(){return S.nguoi.flatMap(g=>(g.nguoi||[]).map((p,i)=>({g,p,i}))).filter(x=>x.p.tinh_trang==="Đã nghỉ")}
const wordRe=w=>new RegExp(`(^|[^\\p{L}])(${w.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})(?=$|[^\\p{L}])`,"gu");
const hasName=(txt,w)=>!!w&&wordRe(w).test(String(txt||""));
function leftIn(r){return leftPeople().filter(x=>["ba","nguoi_lam","nguoi_nhan","dev"].some(k=>hasName(r[k],shortOf(x.p))))}

/* ---------- Bộ lọc chung ---------- */
const G={ba:"",cat:"",own:""};
try{Object.assign(G,JSON.parse(localStorage.getItem("ndop_g")||"{}"))}catch(e){}
const baNames=r=>String(r.ba||"").split(/[,/;+()]|\s–\s/).map(x=>x.replace(/theo dõi:/i,"").trim()).filter(x=>x&&x!=="—"&&x.length<24);
function passG(r){return (!G.ba||baNames(r).some(n=>norm(n)===norm(G.ba)))&&(!G.cat||r.nhom===G.cat)&&(!G.own||(isOpen(r)&&owners(r).includes(G.own)))}
const LF=()=>S.luong.filter(passG);
function dl(id,arr){let e=$(id);if(!e){e=document.createElement("datalist");e.id=id;document.body.appendChild(e)}e.innerHTML=[...new Set(arr.filter(Boolean))].map(x=>`<option value="${esc(x)}">`).join("")}
function rLists(){dl("dlUnit",units(S.luong).map(u=>u.ten));dl("dlPeople",S.nguoi.flatMap(g=>(g.nguoi||[]).filter(p=>p.tinh_trang!=="Đã nghỉ").map(p=>p.ho_ten.replace(/\s*\(.*$/,"")+" ("+g.dv+")")));dl("dlNadat",S.nguoi.filter(g=>g.dv==="NADAT").flatMap(g=>g.nguoi).filter(p=>p.tinh_trang!=="Đã nghỉ").map(shortOf));dl("dlChat",S.nhomchat.map(c=>c.ten));dl("dlDtStep",STEPS_DT);dl("dlNdcStep",STEPS_NDC)}
function rFilters(){rLists();
  const lefts=new Set(leftPeople().map(x=>norm(shortOf(x.p))));
  const bas=[...new Set(S.luong.flatMap(baNames))].filter(n=>!lefts.has(norm(n))).sort((a,b)=>a.localeCompare(b,"vi"));
  $("gBa").innerHTML=`<option value="">Tất cả</option>`+bas.map(n=>`<option ${n===G.ba?"selected":""}>${esc(n)}</option>`).join("");
  $("gCat").innerHTML=`<option value="">Tất cả</option>`+CATORDER.map(c=>`<option value="${c}" ${c===G.cat?"selected":""}>${CAT[c]}</option>`).join("");
  $("gOwn").value=G.own;
  ["gBa","gCat","gOwn"].forEach(i=>$(i).classList.toggle("on",!!$(i).value));
  $("gClear").hidden=!(G.ba||G.cat||G.own);
}
function setG(){G.ba=$("gBa").value;G.cat=$("gCat").value;G.own=$("gOwn").value;try{localStorage.setItem("ndop_g",JSON.stringify(G))}catch(e){}rAll()}
["gBa","gCat","gOwn"].forEach(i=>$(i).addEventListener("input",setG));
$("gClear").onclick=()=>{$("gBa").value=$("gCat").value=$("gOwn").value="";setG()};

/* ---------- Gộp theo đơn vị ---------- */
function agg(rs,k){const s=rs.map(r=>stOf(r[k]));if(s.includes("Bị block"))return "Bị block";if(s.every(x=>x==="Hoàn thành"))return "Hoàn thành";for(const x of ["Chờ phản hồi","Đang thực hiện","Pending","Hoàn thành"])if(s.includes(x))return x==="Hoàn thành"?"Đang thực hiện":x;return "Chưa bắt đầu"}
const ready=r=>DK.filter(([k])=>r.dk_ndc&&r.dk_ndc[k]).length+(r.bbnt_dt?1:0);
function units(rows){const m=new Map();(rows||LF()).forEach(r=>{const k=dvOf(r);if(!m.has(k))m.set(k,{ten:k,cat:r.nhom,rs:[]});m.get(k).rs.push(r)});
  return [...m.values()].map(u=>{const bl=u.rs.filter(isOpen).map(r=>({r,d:days(bDate(r)),e:esc3(r)})).sort((a,b)=>(b.e-a.e)||((b.d??-1)-(a.d??-1)));
    const last=u.rs.map(r=>pDate(r.cap_nhat)).filter(Boolean).sort((a,b)=>b-a)[0];
    const dd=typeof dvDoc==="function"&&dvDoc(u.ten);if(dd&&dd.nhom)u.cat=dd.nhom;
    return Object.assign(u,{dt:agg(u.rs,"dt_tt"),ndc:agg(u.rs,"ndc_tt"),ba:[...new Set(u.rs.flatMap(baNames))].join(", "),bl,rdy:Math.min(...u.rs.map(ready)),last:last?vnd(last):""})})}
function peopleOf(u){const keys=PEOPLE_OF[u]||[u,(dvDoc(u)||{}).dv_nguoi].filter(Boolean);return S.nguoi.filter(g=>keys.includes(g.dv)).flatMap(g=>(g.nguoi||[]).map((p,i)=>Object.assign({dv:g.dv,_g:g._id,_i:i},p)))}
const noBbnt=r=>(stOf(r.dt_tt)==="Hoàn thành"&&!r.bbnt_dt)||(stOf(r.ndc_tt)==="Hoàn thành"&&!r.bbnt_ndc);

/* ---------- Tổng quan ---------- */
function rOverview(){
  const L=LF(),U=units(L),o=L.filter(isOpen);
  if(!S.loaded){$("kpis").innerHTML=`<div class="card kpi"><div class="l">Đang tải dữ liệu…</div></div>`;return}
  const escN=o.filter(esc3).length,nob=L.filter(noBbnt).length,lw=S.luong.filter(r=>leftIn(r).length).length;
  $("kpis").innerHTML=[["Đơn vị, hệ thống",U.length,`${L.length} luồng`,""],["Xong DevTest/103NT",U.filter(u=>u.dt==="Hoàn thành").length,"đơn vị",""],["Xong NDC",U.filter(u=>u.ndc==="Hoàn thành").length,"đơn vị",""],["Cần báo lãnh đạo",escN,`vướng quá 3 ngày làm việc / ${o.length} đang mở`,escN?"warn":""],["Ghi xong nhưng thiếu BBNT",nob,"luồng chưa gắn file BBNT đã ký",nob?"warn":""]].concat(lw?[["Việc của người đã nghỉ",lw,"luồng chưa chuyển giao","warn"]]:[]).map(([l,v,s,c])=>`<div class="card kpi ${c}"><div class="v">${v}</div><div class="l">${l}</div><div class="s">${s}</div></div>`).join("");
  const sq=(s,t)=>`<i class="sq ${CL[s]||"none"}" title="${t}: ${esc(s)}">${t}</i>`;
  $("matrix").innerHTML=CATORDER.filter(c=>U.some(u=>u.cat===c)).map(c=>`<div class="mgrp"><h4>${CAT[c]}</h4><div class="tiles">${U.filter(u=>u.cat===c).map(u=>`<button type="button" class="tile ${u.bl.length?"bl":""}" data-go="${esc(u.ten)}" title="${esc(u.ten)}${u.bl.length?" – "+esc(u.bl[0].r.blocker):""}"><span class="n">${esc(u.ten)}</span>${sq(u.dt,"DT")}${sq(u.ndc,"NDC")}</button>`).join("")}</div></div>`).join("")||`<div class="empty">Không có đơn vị khớp bộ lọc.</div>`;
  const top=o.map(r=>({r,d:days(bDate(r)),e:esc3(r)})).sort((a,b)=>(b.e-a.e)||((b.d??-1)-(a.d??-1))).slice(0,5);
  $("tbTop").innerHTML=top.map(({r,d,e})=>`<tr class="go" data-go="${esc(dvOf(r))}"><td class="num ${d>=14?"hot":""}">${d??"?"} ngày${e?`<div><span class="flag">Báo lãnh đạo</span></div>`:""}</td><td><div class="t">${esc(dvOf(r))}</div><div class="d">${esc(r.ma)}</div></td><td><div class="clamp">${esc(r.blocker)}</div><div class="d">Nhận xử lý: ${esc(r.nguoi_nhan||"chưa giao")}</div></td><td>${owners(r).map(ownTag).join(" ")}</td></tr>`).join("")||`<tr><td class="empty">Không có vướng mắc đang mở.</td></tr>`;
  const lim=new Date(today()-7*864e5),ch=[];
  S.nhatky.filter(x=>new Date(x.at)>=lim).sort((a,b)=>String(b.at).localeCompare(String(a.at))).forEach(x=>{const r=S.luong.find(y=>y._id===x.luong);if(!r||!passG(r))return;(x.thay_doi||[]).forEach(c=>ch.push({d:new Date(x.at),r,txt:`${F[c.truong]||c.truong}: ${c.cu||"(trống)"} → ${c.moi||"(trống)"}`}))});
  const seen=new Set(ch.map(c=>c.r._id));
  L.filter(r=>!seen.has(r._id)&&pDate(r.cap_nhat)>=lim).forEach(r=>ch.push({d:pDate(r.cap_nhat),r,txt:r.ndc_buoc&&r.ndc_buoc!=="—"?"NDC: "+r.ndc_buoc:"DevTest: "+(r.dt_buoc||"—")}));
  ch.sort((a,b)=>b.d-a.d);$("chgN").textContent=`${ch.length} thay đổi`;
  $("tbChg").innerHTML=ch.slice(0,10).map(c=>`<tr class="go" data-go="${esc(dvOf(c.r))}"><td class="num">${esc(c.d.toLocaleDateString("vi-VN",{day:"2-digit",month:"2-digit"}))}</td><td><div class="t">${esc(dvOf(c.r))}</div><div class="d">${esc(c.r.ma)}</div></td><td><div class="clamp">${esc(c.txt)}</div></td></tr>`).join("")||`<tr><td class="empty">Không có thay đổi trong 7 ngày.</td></tr>`;
  const last=S.luong.map(r=>pDate(r.cap_nhat)).filter(Boolean).sort((a,b)=>b-a)[0];
  $("asof").textContent=`Cập nhật gần nhất ${last?last.toLocaleDateString("vi-VN"):"—"}`;
  $("nDv").textContent=Math.max(S.donvi.length,units(S.luong).length);$("nNc").textContent=S.nhomchat.length;$("nNg").textContent=S.nguoi.reduce((a,g)=>a+(g.nguoi||[]).filter(p=>p.tinh_trang!=="Đã nghỉ").length,0)||"";$("nTl").textContent=S.tailieu.reduce((a,g)=>a+(g.muc||[]).length,0)||"";
}

/* ---------- Đơn vị (gộp vướng mắc, mở rộng tại chỗ) ---------- */
function rUnits(){
  const sel=$("fDvSt");if(sel.options.length<2)sel.innerHTML+=ST.map(s=>`<option>${s}</option>`).join("");
  const q=norm($("qDv").value),f=sel.value,onlyBl=$("fOnlyBl").checked;
  const U=units().filter(u=>(!f||u.dt===f||u.ndc===f)&&(!onlyBl||u.bl.length)&&(!q||norm(u.ten+" "+u.ba+" "+u.rs.map(r=>Object.values(r).join(" ")).join(" ")).includes(q)));
  if(onlyBl)U.sort((a,b)=>((b.bl[0]&&b.bl[0].e)-(a.bl[0]&&a.bl[0].e))||(((b.bl[0]||{}).d??-1)-((a.bl[0]||{}).d??-1)));
  const row=u=>{const b=u.bl[0],lw=u.rs.some(r=>leftIn(r).length),nb=u.rs.some(noBbnt);
    return `<tr class="go ${S.exp===u.ten?"open-row":""}" data-unit="${esc(u.ten)}" aria-expanded="${S.exp===u.ten}"><td><div class="t">${esc(u.ten)}</div><div class="d">${u.rs.length} luồng</div></td><td>${pill(u.dt)}</td><td>${pill(u.ndc)}</td><td class="num">${u.rdy}/6</td><td>${b?`<div class="c1" title="${esc(b.r.blocker)}">${b.d!=null?`<b class="${b.d>=14?"num hot":"num"}">${b.d} ngày</b> · `:""}${esc(b.r.blocker)}</div><div>${owners(b.r).map(ownTag).join(" ")} ${b.e?`<span class="flag">Báo lãnh đạo</span>`:""}${u.bl.length>1?` <span class="d">+${u.bl.length-1} vướng mắc</span>`:""}</div>`:`<span class="d">Không vướng</span>`}${nb?` <span class="warnchip">Thiếu BBNT</span>`:""}</td><td>${esc(u.ba)}${lw?` <span class="warnchip">BA đã nghỉ</span>`:""}</td><td class="d">${esc(u.last)}${staleTag(u.last)}</td></tr>${S.exp===u.ten?`<tr class="xrow"><td colspan="7">${detail(u)}</td></tr>`:""}`};
  $("tbDv").innerHTML=CATORDER.filter(c=>U.some(u=>u.cat===c)).map(c=>`<tr class="cat"><td colspan="7">${CAT[c]} · ${U.filter(u=>u.cat===c).length}</td></tr>`+U.filter(u=>u.cat===c).map(row).join("")).join("")||`<tr><td colspan="7" class="empty">${S.loaded?"Không có đơn vị khớp bộ lọc.":"Đang tải…"}</td></tr>`;
}
function detail(u){
  const T=[["luong","Luồng","Thêm luồng"],["nguoi","Stakeholder","Thêm stakeholder"],["chat","Nhóm chat","Thêm nhóm chat"],["tl","Tài liệu","Thêm tài liệu"]];
  const cur=T.find(x=>x[0]===S.tab)||T[0];
  const tabs=`<div class="tabs" role="tablist">${T.map(([k,l])=>`<button type="button" role="tab" data-tab="${k}" aria-selected="${S.tab===k}">${l}</button>`).join("")}<span style="flex:1"></span><button class="btn sm primary" type="button" data-uadd="${esc(S.tab)}|${esc(u.ten)}" style="margin-bottom:4px">+ ${cur[2]}</button></div>`;
  let body="";
  if(S.tab==="luong")body=u.rs.map(r=>{const lp=leftIn(r);return `<div class="fl"><div class="top"><div><span class="t">${esc(r.ma)} · ${esc(r.luong)}</span> <span class="d">cập nhật ${esc(r.cap_nhat||"—")}</span>${staleTag(r.cap_nhat)}</div><button class="btn sm" type="button" data-luong="${esc(r._id)}">Sửa</button></div>
    <dl><dt>DevTest/103NT</dt><dd>${pill(r.dt_tt)} ${r.bbnt_dt?`<span class="tag in" title="${esc(r.bbnt_dt)}">BBNT đã gắn</span>`:stOf(r.dt_tt)==="Hoàn thành"?`<span class="warnchip">Thiếu BBNT</span>`:""} <span class="d">${esc(r.dt_buoc)}</span></dd>
    <dt>NDC</dt><dd>${pill(r.ndc_tt)} ${r.bbnt_ndc?`<span class="tag in" title="${esc(r.bbnt_ndc)}">BBNT đã gắn</span>`:stOf(r.ndc_tt)==="Hoàn thành"?`<span class="warnchip">Thiếu BBNT</span>`:""} <span class="d">${esc(r.ndc_buoc)}</span></dd>
    ${isOpen(r)?`<dt>Vướng mắc</dt><dd>${esc(r.blocker)} ${owners(r).map(ownTag).join(" ")} ${esc3(r)?`<span class="flag">Báo lãnh đạo</span>`:""}<div class="d">Đang chặn: ${esc(r.ai_chan||"—")} · Nhận xử lý: ${esc(r.nguoi_nhan||"chưa giao")} · Hạn: ${esc(r.han_xu_ly||"chưa đặt")}</div></dd>`:""}
    <dt>Việc tiếp theo</dt><dd>${esc(r.viec_tiep||"—")} <span class="d">(${esc(r.nguoi_lam||"chưa giao")})</span>${lp.length?` <span class="warnchip">${lp.map(x=>esc(shortOf(x.p))).join(", ")} đã nghỉ${lp[0].p.ban_giao_cho?" – bàn giao "+esc(lp[0].p.ban_giao_cho):" – chưa chuyển giao"}</span>`:""}</dd>
    <dt>Lên NDC</dt><dd><div class="chk">${DK.map(([k,l])=>`<label><input type="checkbox" data-dk="${esc(r._id)}|${k}" ${r.dk_ndc&&r.dk_ndc[k]?"checked":""} ${S.canWrite===false?"disabled":""}> ${l}</label>`).join("")}<label title="Tự đánh dấu khi đã gắn BBNT DevTest"><input type="checkbox" disabled ${r.bbnt_dt?"checked":""}> BBNT DevTest</label></div></dd></dl></div>`}).join("");
  if(S.tab==="nguoi"){const inn=[...new Set(u.rs.flatMap(r=>[["BA",r.ba],["Dev",r.dev]]).filter(x=>x[1]&&x[1]!=="—").map(x=>x[0]+": "+x[1]))],ps=peopleOf(u.ten);
    body=`<div><b>NADAT:</b> ${inn.map(esc).join(" · ")||"chưa giao"}</div>${ps.length?`<div class="tbl"><table><thead><tr><th>Họ tên</th><th>Tài khoản chat</th><th>Phòng ban</th><th>Vai trò</th></tr></thead><tbody>${ps.map(p=>`<tr class="go" data-ng="${esc(p._g)}|${p._i}"><td class="t">${esc(p.ho_ten)}</td><td class="d">${esc(p.tai_khoan)||"—"}</td><td>${esc(p.phong_ban)||"—"}</td><td class="d"><div class="clamp">${esc(p.vai_tro)}</div></td></tr>`).join("")}</tbody></table></div>`:`<div class="d">Chưa có đầu mối phía đơn vị.</div>`}`}
  if(S.tab==="chat"){const k=norm(u.ten),codes=u.rs.map(r=>norm(r.ma));const ncs=S.nhomchat.filter(c=>norm(c.don_vi).includes(k)||codes.some(m=>m&&norm(c.ma_luong).includes(m)));const named=new Set(ncs.map(c=>norm(c.ten)));
    const extra=[...new Set(u.rs.flatMap(r=>String(r.nhom_chat||"").split(/;\s*/)).filter(x=>x&&x!=="—"))].filter(x=>![...named].some(n=>norm(x).includes(n.slice(0,12))));
    body=(ncs.length?`<div class="tbl"><table><tbody>${ncs.map(chatRow).join("")}</tbody></table></div>`:"")+(extra.length?`<div class="d">Ghi trong luồng: ${extra.map(esc).join(" · ")}</div>`:"")||`<div class="d">Chưa có nhóm chat.</div>`}
  if(S.tab==="tl"){const k=norm(u.ten),ds=S.tailieu.flatMap(g=>(g.muc||[]).map((m,i)=>({m,g,i}))).filter(({m})=>m.don_vi?norm(m.don_vi).split(/\s*;\s*/).some(x=>x===k||norm(m.don_vi).includes(k)):norm(m.ten+" "+m.nguon+" "+m.mo_ta).includes(k)).slice(0,60);body=ds.length?`<div class="tbl"><table><tbody>${ds.map(({m,g,i})=>docRow(m).replace("<tr>",`<tr class="go" data-tl="${esc(g._id)}|${i}">`)).join("")}</tbody></table></div>`:`<div class="d">Chưa có tài liệu gắn với đơn vị này.</div>`}
  return `<div class="xin">${tabs}${body}</div>`;
}
async function toggleDk(id,k,val){
  const r=S.luong.find(x=>x._id===id);if(!r||!S.db)return;const dk=Object.assign({},r.dk_ndc||{},{[k]:val});
  try{await S.db.collection("luong").doc(id).update({dk_ndc:dk});await log(id,[{truong:"dk_ndc",cu:(DK.find(x=>x[0]===k)||[])[1]+": "+(val?"chưa":"có"),moi:val?"có":"chưa"}]);toast("Đã cập nhật điều kiện lên NDC.")}catch(e){toast(errMsg(e));rUnits()}
}
function seg(id,opts,cur,on){$(id).innerHTML=opts.map(([v,l])=>`<button type="button" aria-pressed="${v===cur}" data-v="${esc(v)}">${esc(l)}</button>`).join("");$(id).onclick=e=>{const b=e.target.closest("button");if(b)on(b.dataset.v)}}

const BEN_OF={"BBN":"Bộ, ngành","ĐP":"Địa phương","HTPM":"Nhà thầu, hệ thống trong NDC","DN":"Doanh nghiệp","Nội bộ NDC":"Nội bộ NADAT"};
function unitAdd(k,un){const u=units(S.luong).find(x=>x.ten===un)||{ten:un,rs:[]},r0=u.rs[0]||{};
  if(k==="luong")addFlow({dv:un,nhom:u.cat,ba:baNames(r0)[0]||""});
  else if(k==="nguoi"){const keys=PEOPLE_OF[un]||[un],g=S.nguoi.find(x=>keys.includes(x.dv));editPerson("",-1,{dv:g?g.dv:un,ben:g?g.ben:BEN_OF[u.cat]||"Chưa rõ đơn vị"})}
  else if(k==="chat")editChat("",{don_vi:un,ma_luong:u.rs.map(r=>r.ma).join(", "),ba:baNames(r0).join(", ")});
  else editDoc("",-1,{don_vi:un,trang_thai:"Có sẵn"})}
function baTeam(){return [...new Set(S.nguoi.filter(g=>g.dv==="NADAT").flatMap(g=>g.nguoi).filter(p=>/BA/.test(p.phong_ban||"")&&p.tinh_trang!=="Đã nghỉ").map(shortOf).concat(S.luong.flatMap(baNames)).filter(n=>!leftPeople().some(x=>norm(shortOf(x.p))===norm(n))))].sort((a,b)=>a.localeCompare(b,"vi"))}

/* ---------- Stakeholder ---------- */
const ownTagBen=b=>`<span class="tag ${b.startsWith("Nội")?"in":b.includes("C12")?"c12":b.startsWith("Chưa")?"":"ext"}">${esc(b)}</span>`;
function rPeople(){
  const showLeft=$("fShowLeft").checked;
  const cnt=b=>S.nguoi.filter(g=>g.ben===b).reduce((a,g)=>a+(g.nguoi||[]).length,0);
  seg("segBen",[["","Tất cả"],...BENS.filter(b=>cnt(b)).map(b=>[b,`${b} (${cnt(b)})`])],S.ben,v=>{S.ben=v;rPeople()});
  let dl=$("dlDv");if(!dl){dl=document.createElement("datalist");dl.id="dlDv";document.body.appendChild(dl)}dl.innerHTML=S.nguoi.map(g=>`<option>${esc(g.dv)}</option>`).join("");
  const q=norm($("qNg").value);
  const gs=S.nguoi.filter(g=>!S.ben||g.ben===S.ben).sort((a,b)=>BENS.indexOf(a.ben)-BENS.indexOf(b.ben)).map(g=>({g,ps:(g.nguoi||[]).map((p,i)=>({p,i})).filter(x=>(showLeft||q||x.p.tinh_trang!=="Đã nghỉ")&&(!q||norm(g.dv+" "+Object.values(x.p).join(" ")).includes(q)))})).filter(x=>x.ps.length);
  $("ngGroups").innerHTML=gs.map(({g,ps})=>`<details class="card" data-k="ng:${esc(g.dv)}"${q||OPEN.has("ng:"+g.dv)?" open":""}><summary class="grp"><h3>${esc(g.dv)}</h3><span>${ownTagBen(g.ben)} · ${ps.length} người</span></summary><div class="tbl"><table><thead><tr><th style="width:20%">Họ tên</th><th style="width:22%">Tài khoản chat (mọi nền tảng)</th><th style="width:14%">Phòng ban</th><th>Vai trò, phụ trách</th><th style="width:18%">Nhóm chat</th></tr></thead><tbody>${ps.map(({p,i})=>{const left=p.tinh_trang==="Đã nghỉ";return `<tr class="go ${left?"left":""}" data-ng="${esc(g._id)}|${i}"><td class="t"${p.can_cu?` title="Căn cứ: ${esc(p.can_cu)}"`:""}>${esc(p.ho_ten)}${left?`<div><span class="stale">Đã nghỉ${p.ngay_nghi?" "+esc(p.ngay_nghi):""}</span> ${p.ban_giao_cho?`<span class="d">→ ${esc(p.ban_giao_cho)}</span>`:`<span class="warnchip">chưa chuyển giao</span>`}</div>`:""}</td><td class="d"><div class="clamp" title="${esc(p.tai_khoan)}">${esc(p.tai_khoan)||"—"}</div></td><td>${esc(p.phong_ban)||`<span class="d">chưa rõ</span>`}</td><td class="d"><div class="clamp" title="${esc(p.vai_tro)}">${esc(p.vai_tro)}</div></td><td class="d"><div class="c1" title="${esc(p.nhom_chat)}">${esc(p.nhom_chat)}</div></td></tr>`}).join("")}</tbody></table></div></details>`).join("")||`<div class="card empty">${S.loaded?"Không có người khớp.":"Đang tải…"}</div>`;
}
function editPerson(gid,idx,pre){pre=pre||{};
  const g=S.nguoi.find(x=>x._id===gid)||S.nguoi.find(x=>pre.dv&&x.dv===pre.dv),p=gid&&g&&idx>=0?g.nguoi[idx]:{};if(!gid)idx=-1;
  showForm(p.ho_ten||"Thêm stakeholder",g?g.dv:"",[{k:"ho_ten",l:"Họ tên *",v:p.ho_ten},{k:"tai_khoan",l:"Tài khoản trên các nhóm chat (Tele, WhatsApp, Viber, Zalo)",v:p.tai_khoan,t:"area"},{k:"dv",l:"Đơn vị *",v:g?g.dv:pre.dv||"",list:"dlDv"},{k:"ben",l:"Thuộc bên *",o:BENS,v:g?g.ben:pre.ben||"Chưa rõ đơn vị"},{k:"phong_ban",l:"Phòng ban",v:p.phong_ban},{k:"vai_tro",l:"Vai trò, phụ trách việc gì",v:p.vai_tro,t:"area"},{k:"nhom_chat",l:"Tham gia nhóm chat",v:p.nhom_chat,t:"area"},{k:"can_cu",l:"Căn cứ (vì sao biết)",v:p.can_cu,t:"area"},{k:"tinh_trang",l:"Tình trạng",o:["Đang làm","Đã nghỉ"],v:p.tinh_trang||"Đang làm"},{k:"ngay_nghi",l:"Ngày nghỉ (nếu đã nghỉ)",v:p.ngay_nghi},{k:"ban_giao_cho",l:"Bàn giao việc cho (tên ngắn, ví dụ Long)",v:p.ban_giao_cho}],
  async v=>{if(!v.ho_ten||!v.dv){toast("Cần nhập họ tên và đơn vị.");return false}
    const person=Object.assign({},p,{ho_ten:v.ho_ten,tai_khoan:v.tai_khoan,phong_ban:v.phong_ban,vai_tro:v.vai_tro,nhom_chat:v.nhom_chat,can_cu:v.can_cu,tinh_trang:v.tinh_trang,ngay_nghi:v.ngay_nghi,ban_giao_cho:v.ban_giao_cho,nguon:p.nguon||"Nhập tay"});
    const col=S.db.collection("nguoi"),t=S.nguoi.find(x=>x.dv===v.dv);
    if(g&&t&&t._id===g._id){const a=[...g.nguoi];idx>=0?a[idx]=person:a.push(person);await col.doc(g._id).set({dv:g.dv,ben:v.ben,nguoi:a})}
    else{if(t)await col.doc(t._id).set({dv:t.dv,ben:t.ben,nguoi:[...t.nguoi,person]});else await col.doc("dv"+Date.now()).set({dv:v.dv,ben:v.ben,nguoi:[person]});
      if(g&&idx>=0)await col.doc(g._id).set({dv:g.dv,ben:g.ben,nguoi:g.nguoi.filter((_,i)=>i!==idx)})}},
  g&&idx>=0?()=>S.db.collection("nguoi").doc(g._id).set({dv:g.dv,ben:g.ben,nguoi:g.nguoi.filter((_,i)=>i!==idx)}):null);
  if(p.tinh_trang==="Đã nghỉ"&&p.ban_giao_cho){const sn=shortOf(p),rs=S.luong.filter(r=>["ba","nguoi_lam","nguoi_nhan","dev"].some(k=>hasName(r[k],sn))),cs=S.nhomchat.filter(c=>hasName(c.ba,sn));
    $("dBody").insertAdjacentHTML("afterbegin",`<div class="fl"><div><b>Chuyển việc của ${esc(sn)} sang ${esc(p.ban_giao_cho)}</b></div><div class="d">${rs.length} luồng, ${cs.length} nhóm chat còn ghi tên ${esc(sn)}${rs.length?": "+rs.map(r=>esc(r.ma)).join(", "):""}. Bấm để thay tên ở các ô BA, Dev, Người làm tiếp, Người nhận xử lý; có ghi lịch sử.</div><div><button class="btn sm primary" type="button" id="bHand" ${rs.length+cs.length&&S.canWrite!==false?"":"disabled"}>Chuyển ${rs.length+cs.length} mục</button></div></div>`);
    $("bHand").onclick=()=>run(async()=>{const re=wordRe(sn);for(const r of rs){const patch={},ch=[];["ba","nguoi_lam","nguoi_nhan","dev"].forEach(k=>{if(hasName(r[k],sn)){const nv=String(r[k]).replace(wordRe(sn),"$1"+p.ban_giao_cho);patch[k]=nv;ch.push({truong:k,cu:r[k],moi:nv})}});patch.cap_nhat=vnd(new Date());await S.db.collection("luong").doc(r._id).update(patch);await log(r._id,ch,`Chuyển giao từ ${sn} (đã nghỉ) sang ${p.ban_giao_cho}`)}
      for(const c of cs)await S.db.collection("nhomchat").doc(c._id).update({ba:String(c.ba).replace(wordRe(sn),"$1"+p.ban_giao_cho)});void re},`Đã chuyển việc sang ${p.ban_giao_cho}.`)}
}

/* ---------- Nhóm chat, Tài liệu ---------- */
const PLATS=["Telegram","WhatsApp","Zalo","Viber"];
const platOf=p=>/zalo/i.test(p||"")?"Zalo":p;
const platTag=p=>`<span class="plat plat-${esc(norm(platOf(p)))}">${esc(p||"—")}</span>`;
const chatRow=r=>`<tr class="go" data-nc="${esc(r._id)}"><td>${platTag(r.nen_tang)}${r.nen_tang==="Viber"?`<div class="d">nội bộ NADAT</div>`:""}</td><td class="t">${esc(r.ten)}${r.don_vi?`<div class="d">${esc(r.don_vi)}</div>`:""}</td><td class="d">${esc(r.ma_luong)}</td><td>${esc(r.ba)}</td><td>${/KHÔNG|CHƯA/.test(r.doc_cuoi)?`<span class="pill p-block">${esc(r.doc_cuoi)}</span>`:esc(r.doc_cuoi)}<div class="d">tin mới nhất ${esc(r.tin_moi)}</div></td><td class="d"><div class="clamp" title="${esc(r.ghi_chu)}">${esc(r.ghi_chu)}</div></td></tr>`;
S.plat="";
function rChat(){
  const q=norm($("qChat").value),cnt=p=>S.nhomchat.filter(r=>!p||platOf(r.nen_tang)===p).length;
  $("segPlat").innerHTML=[["","Tất cả"],...PLATS.map(p=>[p,p])].map(([v,l])=>`<button type="button" class="${v?"pf pf-"+norm(v):""}" aria-pressed="${v===S.plat}" data-plat="${esc(v)}">${esc(l)} (${cnt(v)})</button>`).join("");
  const rows=S.nhomchat.filter(r=>(!S.plat||platOf(r.nen_tang)===S.plat)&&(!q||norm(Object.values(r).join(" ")).includes(q))).sort((a,b)=>PLATS.indexOf(platOf(a.nen_tang))-PLATS.indexOf(platOf(b.nen_tang))||String(a.ten).localeCompare(String(b.ten),"vi"));
  $("tbChat").innerHTML=rows.map(chatRow).join("")||`<tr><td colspan="6" class="empty">${S.loaded?"Không có nhóm khớp.":"Đang tải…"}</td></tr>`;
}
function editChat(id,pre){
  const r=S.nhomchat.find(x=>x._id===id)||Object.assign({},pre||{});
  showForm(r.ten||"Thêm nhóm chat",r.don_vi||"",[{k:"nen_tang",l:"Nền tảng *",o:["Telegram","WhatsApp","Zalo","Viber"],v:r.nen_tang||"Telegram"},{k:"ten",l:"Tên nhóm *",v:r.ten},{k:"don_vi",l:"Đơn vị",v:r.don_vi,list:"dlUnit"},{k:"ma_luong",l:"Mã luồng liên quan",v:r.ma_luong},{k:"ba",l:"BA phụ trách",v:r.ba},{k:"doc_cuoi",l:"Đọc lần cuối",v:r.doc_cuoi},{k:"tin_moi",l:"Tin mới nhất",v:r.tin_moi},{k:"ghi_chu",l:"Ghi chú",v:r.ghi_chu,t:"area"}],
  async v=>{if(!v.ten){toast("Cần nhập tên nhóm.");return false}const c=S.db.collection("nhomchat");if(r._id)await c.doc(r._id).set(v);else await c.add(v)},
  r._id?()=>S.db.collection("nhomchat").doc(r._id).delete():null);
}
function editDoc(gid,idx,pre){pre=pre||{};
  const g=S.tailieu.find(x=>x._id===gid)||S.tailieu.find(x=>x._id==="chat")||S.tailieu[0],m=g&&idx>=0?g.muc[idx]:Object.assign({},pre);if(!g)return;
  showForm(m.ten||"Thêm tài liệu",g.ten,[{k:"nhom",l:"Nhóm tài liệu",o:S.tailieu.filter(x=>!x.thu_muc_may).map(x=>x.ten),v:g.ten},{k:"ten",l:"Tên tài liệu *",v:m.ten},{k:"don_vi",l:"Thuộc đơn vị",v:m.don_vi,list:"dlUnit"},{k:"loai",l:"Loại",o:["","API spec","BBNT","Biên bản họp","Phiếu Firewall","Hướng dẫn, runbook","Testcase","Công văn","Báo cáo","Biểu mẫu","Mô hình, sơ đồ","Khác",...(m.loai&&!["API spec","BBNT","Biên bản họp","Phiếu Firewall","Hướng dẫn, runbook","Testcase","Công văn","Báo cáo","Biểu mẫu","Mô hình, sơ đồ","Khác"].includes(m.loai)?[m.loai]:[])],v:m.loai||""},{k:"duong_dan",l:"Đường dẫn trong máy hoặc liên kết",v:m.duong_dan},{k:"mo_ta",l:"Mô tả",v:m.mo_ta,t:"area"},{k:"nguon",l:"Nguồn (nhóm chat, người gửi)",v:m.nguon},{k:"ngay",l:"Ngày",v:m.ngay},{k:"trang_thai",l:"Trạng thái",o:TLTT,v:TLTT.includes(m.trang_thai)?m.trang_thai:"Có sẵn"}],
  async v=>{if(!v.ten){toast("Cần nhập tên tài liệu.");return false}const it=Object.assign({},m,{ten:v.ten,don_vi:v.don_vi,loai:v.loai,duong_dan:v.duong_dan,mo_ta:v.mo_ta,nguon:v.nguon,ngay:v.ngay,trang_thai:v.trang_thai});
    const c=S.db.collection("tailieu"),t=S.tailieu.find(x=>x.ten===v.nhom)||g,body=(x,muc)=>({ten:x.ten,thu_tu:x.thu_tu||9,muc});
    if(t._id===g._id){const a=[...g.muc];idx>=0?a[idx]=it:a.push(it);await c.doc(g._id).set(body(g,a))}
    else{await c.doc(t._id).set(body(t,[...t.muc,it]));if(idx>=0)await c.doc(g._id).set(body(g,g.muc.filter((_,i)=>i!==idx)))}},
  idx>=0?()=>S.db.collection("tailieu").doc(g._id).set({ten:g.ten,thu_tu:g.thu_tu||9,muc:g.muc.filter((_,i)=>i!==idx)}):null);
}

/* ---------- Quét có duyệt ---------- */
function rScan(){
  const q=S.quet,b=$("scanBtn");const tm=s=>s?new Date(s).toLocaleString("vi-VN",{hour:"2-digit",minute:"2-digit",day:"2-digit",month:"2-digit"}):"";
  let t="Chưa có lần quét nào.",busy=false;
  if(q){if(q.trang_thai==="cho"){busy=true;t=`Đã ghi yêu cầu lúc ${tm(q.yeu_cau_luc)}. Mở ứng dụng Claude, mục Scheduled, tác vụ "Quét chat NDOP", bấm Run now.`}
    else if(q.trang_thai==="dang_chay"){busy=true;t=`Đang quét tin mới từ lần đọc trước, bắt đầu lúc ${tm(q.bat_dau)}.`}
    else t=`Lần quét gần nhất ${tm(q.ket_thuc)}. ${q.tom_tat||""}`}
  $("scanText").textContent=t;b.disabled=busy||!S.db||S.canWrite===false;b.textContent=busy?"Đã ghi yêu cầu":"Ghi yêu cầu quét";
  const ds=S.dexuat.filter(d=>d.trang_thai==="cho").sort((a,b)=>String(a.dv||"").localeCompare(String(b.dv||""),"vi"));
  $("dxCard").hidden=!ds.length;$("dxCount").textContent=`${ds.length} thay đổi`;
  $("dxList").innerHTML=ds.map(d=>{const col=d.col||"luong",cur=(S[col]||[]).find(x=>x._id===d.doc);return `<div class="it"><div><div><b>${esc(d.dv||(cur&&dvOf(cur))||d.doc)}</b> <span class="d">${esc(d.ma||"")} · ${esc(F[d.truong]||d.truong)}</span></div><div><span class="old">${esc(cur?cur[d.truong]:d.cu)||"(trống)"}</span> → <b>${esc(d.moi)}</b></div><div class="d">${esc(d.nguon||"")}${d.ly_do?" – "+esc(d.ly_do):""}</div></div><div class="acts"><button class="btn sm" type="button" data-dxedit="${esc(d._id)}" ${S.canWrite===false?"disabled":""}>Sửa</button><button class="btn sm primary" type="button" data-dx="${esc(d._id)}|ok" ${S.canWrite===false?"disabled":""}>Duyệt</button><button class="btn sm" type="button" data-dx="${esc(d._id)}|bo" ${S.canWrite===false?"disabled":""}>Bỏ</button></div></div>`}).join("");
}
async function decide(id,ok){
  const d=S.dexuat.find(x=>x._id===id);if(!d||!S.db)return;const col=d.col||"luong",cur=(S[col]||[]).find(x=>x._id===d.doc);
  try{if(ok){if(!cur){toast("Không còn mục này trên trang.");return}const patch={[d.truong]:d.moi};if(col!=="nhomchat")patch.cap_nhat=vnd(new Date());await S.db.collection(col).doc(d.doc).update(patch);if(col==="luong")await log(d.doc,[{truong:d.truong,cu:cur[d.truong]||"",moi:d.moi}],"Duyệt đề xuất từ quét chat: "+(d.nguon||""))}
    await S.db.collection("dexuat").doc(id).update({trang_thai:ok?"duyet":"bo",xu_ly_luc:new Date().toISOString()});toast(ok?"Đã áp dụng.":"Đã bỏ đề xuất.")}catch(e){toast(errMsg(e))}
}
async function scan(){
  if(!S.db)return;$("scanBtn").disabled=true;
  try{await S.db.doc("yeucau/quet").set({trang_thai:"cho",yeu_cau_luc:new Date().toISOString(),by:await who(),tom_tat:S.quet&&S.quet.tom_tat||"",ket_thuc:S.quet&&S.quet.ket_thuc||""});toast("Đã ghi yêu cầu quét.")}
  catch(e){toast("Chưa ghi được yêu cầu. Bạn cần quyền Contributor.");rScan()}
}

/* ---------- Ngăn sửa ---------- */
function openD(){$("scrim").hidden=false;$("drawer").hidden=false}
function closeD(){S.edit=null;S.form=null;$("scrim").hidden=true;$("drawer").hidden=true}
function showEdit(id){
  const r=S.luong.find(x=>x._id===id);if(!r)return;S.form=null;S.edit=id;
  $("dTitle").textContent=`${r.ma} · ${dvOf(r)}`;$("dSub").textContent=r.luong;$("dFoot").hidden=false;
  const opt=v=>ST.map(s=>`<option ${s===stOf(v)?"selected":""}>${s}</option>`).join("");
  const inp=(k,l,ph)=>`<div class="fld"><label for="f_${k}">${l}</label><input id="f_${k}" value="${esc(r[k]||"")}" ${ph?`placeholder="${esc(ph)}"`:""}></div>`;
  const ta=(k,l)=>`<div class="fld"><label for="f_${k}">${l}</label><textarea id="f_${k}">${esc(r[k]||"")}</textarea></div>`;
  $("dBody").innerHTML=`<div class="row2"><div class="fld"><label for="f_dv">Đơn vị</label><input id="f_dv" value="${esc(dvOf(r))}"></div>${inp("luong","Tên luồng")}</div><div class="row2"><div class="fld"><label for="f_nhom">Nhóm đơn vị</label><select id="f_nhom">${CATORDER.map(c=>`<option value="${c}" ${c===r.nhom?"selected":""}>${CAT[c]}</option>`).join("")}</select></div>${inp("nv","Nghiệp vụ (TH / CS / ĐP)")}</div><div class="row2">${inp("ba","BA phụ trách")}${inp("dev","Dev NADAT")}</div>
   <div class="sec"><h4>DevTest / 103NT</h4><div class="row2"><div class="fld"><label for="f_dt_tt">Trạng thái</label><select id="f_dt_tt">${opt(r.dt_tt)}</select></div>${inp("dt_buoc","Bước")}</div>${inp("bbnt_dt","BBNT đã ký (đường dẫn file hoặc số, ngày ký) – bắt buộc khi chọn Hoàn thành","D:\\…\\BBNT_….pdf")}</div>
   <div class="sec"><h4>NDC (Hòa Lạc)</h4><div class="row2"><div class="fld"><label for="f_ndc_tt">Trạng thái</label><select id="f_ndc_tt">${opt(r.ndc_tt)}</select></div>${inp("ndc_buoc","Bước")}</div>${inp("bbnt_ndc","BBNT NDC đã ký – bắt buộc khi chọn Hoàn thành")}</div>
   <div class="sec"><h4>Vướng mắc</h4>${ta("blocker",'Nội dung (ghi kèm "từ dd/mm")')}<div class="row2">${inp("blocker_thuoc","Thuộc (Nội bộ / C12 / Khách hàng)")}${inp("loai","Loại (Kỹ thuật / Nghiệp vụ)")}</div><div class="row2">${inp("ai_chan","Ai đang chặn")}${inp("nguoi_nhan","Người nhận xử lý")}</div>${inp("han_xu_ly","Hạn xử lý (dd/mm/yyyy)")}</div>
   ${ta("viec_tiep","Việc tiếp theo")}<div class="row2">${inp("nguoi_lam","Người làm tiếp")}${inp("nhom_chat","Nhóm chat")}</div>
   <div class="sec"><h4>Lịch sử thay đổi</h4><div class="hist" id="dHist"></div></div><div><button class="btn sm" type="button" id="lDel">Xoá luồng này</button></div>`;
  {let armed=false;$("lDel").onclick=async()=>{if(!armed){armed=true;$("lDel").textContent="Bấm lần nữa để xoá";return}try{await S.db.collection("luong").doc(r._id).delete();toast("Đã xoá luồng.");closeD()}catch(e){toast(errMsg(e))}}}
  const ro=S.canWrite===false;$("dSave").disabled=ro||!S.db;$("dPerm").textContent=ro?"Bạn chỉ có quyền xem.":"";
  openD();hist();
}
async function hist(){
  const h=S.nhatky.filter(x=>x.luong===S.edit).sort((a,b)=>String(b.at).localeCompare(String(a.at))).slice(0,15);const el=$("dHist");if(!el)return;
  if(!h.length){el.textContent="Chưa có thay đổi nào trên trang này.";return}
  const ids=[...new Set(h.map(x=>x.by).filter(x=>x&&!String(x).startsWith("Claude")))];let nm={};
  if(S.user&&ids.length){try{const ps=await S.user.profiles(ids);ids.forEach(i=>nm[i]=(ps[i]&&ps[i].name)||"")}catch(e){}}
  el.innerHTML=h.map(x=>`<div><b>${esc(String(x.by||"").startsWith("Claude")?x.by:(nm[x.by]||"Một thành viên"))}</b> · ${esc(new Date(x.at).toLocaleString("vi-VN"))}<br>${(x.thay_doi||[]).map(c=>`${esc(F[c.truong]||c.truong)}: ${esc(c.cu)||"(trống)"} → ${esc(c.moi)||"(trống)"}`).join("<br>")}${x.ghi_chu?`<br><i>${esc(x.ghi_chu)}</i>`:""}</div>`).join("");
}
async function save(){
  const r=S.luong.find(x=>x._id===S.edit);if(!r||!S.db)return;const patch={},ch=[];
  const val=k=>{const el=$("f_"+k);return el?el.value.trim():null};
  if(val("dt_tt")==="Hoàn thành"&&!val("bbnt_dt")){toast("DevTest chỉ được ghi Hoàn thành khi đã gắn BBNT đã ký.");$("f_bbnt_dt").focus();return}
  if(val("ndc_tt")==="Hoàn thành"&&!val("bbnt_ndc")){toast("NDC chỉ được ghi Hoàn thành khi đã gắn BBNT đã ký.");$("f_bbnt_ndc").focus();return}
  Object.keys(F).forEach(k=>{const v=val(k);if(v===null)return;const old=k.endsWith("_tt")?stOf(r[k]):k==="dv"?dvOf(r):(r[k]||"");if(v!==old){patch[k]=v;ch.push({truong:k,cu:old,moi:v})}});
  if(!ch.length){toast("Không có gì thay đổi.");return}
  patch.cap_nhat=vnd(new Date());$("dSave").disabled=true;
  try{await S.db.collection("luong").doc(r._id).update(patch);await log(r._id,ch);toast(`Đã lưu ${r.ma}.`);closeD()}
  catch(e){toast(errMsg(e))}finally{$("dSave").disabled=S.canWrite===false}
}
function showForm(title,sub,fields,onSave,onDel){
  S.edit=null;S.form={fields,onSave};
  $("dTitle").textContent=title;$("dSub").textContent=sub||"";$("dFoot").hidden=false;
  $("dBody").innerHTML=fields.map(f=>`<div class="fld"><label for="g_${f.k}">${esc(f.l)}</label>${f.o?`<select id="g_${f.k}">${f.o.map(o=>`<option ${o===f.v?"selected":""}>${esc(o)}</option>`).join("")}</select>`:f.t==="area"?`<textarea id="g_${f.k}">${esc(f.v||"")}</textarea>`:`<input id="g_${f.k}" value="${esc(f.v||"")}" ${f.list?`list="${f.list}"`:""}>`}</div>`).join("")+(onDel?`<div><button class="btn sm" type="button" id="gDel">Xoá mục này</button></div>`:"");
  if(onDel){let armed=false;$("gDel").onclick=()=>{if(!armed){armed=true;$("gDel").textContent="Bấm lần nữa để xoá";return}run(onDel,"Đã xoá.")}}
  const ro=S.canWrite===false;$("dSave").disabled=ro||!S.db;$("dPerm").textContent=ro?"Bạn chỉ có quyền xem.":"";openD();
}
async function run(fn,msg){if(!S.db)return;try{const r=await fn();if(r===false)return;toast(msg);closeD()}catch(e){toast(errMsg(e))}}
const vals=()=>{const o={};S.form.fields.forEach(f=>o[f.k]=$("g_"+f.k).value.trim());return o};
function addFlow(pre){pre=pre||{};
  showForm("Thêm luồng đấu nối",pre.dv?"Đơn vị: "+pre.dv:"Sau khi tạo, bấm Sửa để nhập trạng thái và vướng mắc.",[{k:"ma",l:"Mã luồng * (ví dụ CS-18)",v:""},{k:"dv",l:"Đơn vị *",v:pre.dv||"",list:"dlUnit"},{k:"nhom",l:"Nhóm đơn vị *",o:CATORDER.map(c=>CAT[c]),v:CAT[pre.nhom]||CAT.BBN},{k:"luong",l:"Tên luồng *",v:""},{k:"nv",l:"Nghiệp vụ *",o:["CS","TH","ĐP","TH + ĐP"],v:"CS"},{k:"ba",l:"BA phụ trách *",o:["",...baTeam()],v:pre.ba||""}],
  async v=>{if(!v.ma||!v.dv||!v.luong||!v.ba){toast("Cần nhập đủ các ô có dấu *.");return false}const id=norm(v.ma).replace(/[^a-z0-9]+/g,"-");if(S.luong.some(r=>r._id===id)){toast("Mã luồng này đã có.");return false}
    await S.db.collection("luong").doc(id).set({ma:v.ma,dv:v.dv,donvi:v.dv,nhom:CATORDER.find(c=>CAT[c]===v.nhom)||"BBN",luong:v.luong,nv:v.nv,ba:v.ba,dev:"",dt_tt:"Chưa bắt đầu",dt_buoc:"",ndc_tt:"Chưa bắt đầu",ndc_buoc:"",blocker:"",blocker_thuoc:"",loai:"",ai_chan:"",nguoi_nhan:"",viec_tiep:"",nguoi_lam:"",nhom_chat:"",cap_nhat:vnd(new Date())})});
}

/* ---------- Việc của tôi ---------- */
const dueOf=r=>pDate(r.han_xu_ly);
const lateDays=r=>{const d=dueOf(r);return d?Math.round((today()-d)/864e5):null};
function names(){const lefts=new Set(leftPeople().map(x=>norm(shortOf(x.p))));const set=new Set();S.luong.forEach(r=>[r.ba,r.nguoi_lam,r.nguoi_nhan].forEach(v=>String(v||"").split(/[,/;+()]|\s–\s/).map(x=>x.replace(/theo dõi:|^A |^anh |^chị /i,"").trim()).filter(x=>x&&x.length>1&&x.length<24&&x!=="—"&&!lefts.has(norm(x))).forEach(x=>set.add(x))));return [...set].sort((a,b)=>a.localeCompare(b,"vi"))}
function rMe(){
  const sel=$("fMe"),ns=names();let cur=sel.value;if(!cur){try{cur=localStorage.getItem("ndop_me")||""}catch(e){}}
  sel.innerHTML=`<option value="">Chọn tên…</option>`+ns.map(n=>`<option ${n===cur?"selected":""}>${esc(n)}</option>`).join("");
  const me=sel.value,only=$("fOnlyLate").checked;
  const mine=me?S.luong.filter(r=>["ba","nguoi_lam","nguoi_nhan"].some(k=>hasName(r[k],me))):[];
  const rows=mine.filter(r=>!only||lateDays(r)===null||lateDays(r)>0).sort((a,b)=>(dueOf(a)||9e15)-(dueOf(b)||9e15));
  const late=mine.filter(r=>lateDays(r)>0).length,nodue=mine.filter(r=>!dueOf(r)).length,soon=mine.filter(r=>{const l=lateDays(r);return l!==null&&l<=0&&l>=-3}).length;
  $("meKpi").innerHTML=me?[["Việc của bạn",mine.length,""],["Quá hạn",late,late?"warn":""],["Đến hạn trong 3 ngày",soon,""],["Chưa đặt hạn",nodue,nodue?"warn":""]].map(([l,v,c])=>`<div class="card kpi ${c}"><div class="v">${v}</div><div class="l">${l}</div></div>`).join(""):"";
  $("tbMe").innerHTML=!me?`<tr><td colspan="5" class="empty">Chọn tên của bạn ở ô phía trên.</td></tr>`:rows.map(r=>{const l=lateDays(r);return `<tr class="go" data-luong="${esc(r._id)}"><td class="num ${l>0?"hot":""}">${r.han_xu_ly?esc(r.han_xu_ly)+(l>0?`<div class="d">quá ${l} ngày</div>`:l===0?`<div class="d">hôm nay</div>`:""):`<span class="d">chưa đặt</span>`}</td><td><div class="t">${esc(dvOf(r))}</div><div class="d">${esc(r.ma)}</div></td><td><div class="clamp">${esc(r.viec_tiep)}</div></td><td class="d"><div class="clamp">${isOpen(r)?esc(r.blocker):"—"}</div>${esc3(r)?`<span class="flag">Báo lãnh đạo</span>`:""}</td><td class="d">${[hasName(r.ba,me)&&"BA",hasName(r.nguoi_lam,me)&&"Làm tiếp",hasName(r.nguoi_nhan,me)&&"Nhận xử lý vướng mắc"].filter(Boolean).join(", ")}</td></tr>`}).join("")||`<tr><td colspan="5" class="empty">Không có việc nào.</td></tr>`;
  $("nQh").textContent=S.luong.filter(r=>lateDays(r)>0).length||"";
}
$("fMe").addEventListener("input",()=>{try{localStorage.setItem("ndop_me",$("fMe").value)}catch(e){}rMe()});$("fOnlyLate").addEventListener("input",rMe);

/* ---------- Mở mạng NDC (cột theo chặng) ---------- */
const MMST={phieu:["Chưa gửi","Đã gửi"],p5:["Chưa duyệt","Đã duyệt","Trả lại"],gtel:["Chưa mở","Đã mở","Mở một phần"],kt:["Chưa kiểm tra","Đã thông","Lỗi"]};
const COLS=["Thiếu bảng luồng","Chưa gửi phiếu Firewall","Chờ P5 duyệt","Chờ Gtel mở Firewall","Chờ kiểm tra / lỗi","Đã thông"];
function stage(m){if(!m.ip_nguon||!m.ip_dich||!m.cong)return 0;if(m.phieu!=="Đã gửi")return 1;if(m.p5!=="Đã duyệt")return 2;if(m.gtel!=="Đã mở")return 3;if(m.kt!=="Đã thông")return 4;return 5}
function stagePatch(k){return [{},{phieu:"Chưa gửi",p5:"Chưa duyệt",gtel:"Chưa mở",kt:"Chưa kiểm tra"},{phieu:"Đã gửi",p5:"Chưa duyệt",gtel:"Chưa mở",kt:"Chưa kiểm tra"},{phieu:"Đã gửi",p5:"Đã duyệt",gtel:"Chưa mở",kt:"Chưa kiểm tra"},{phieu:"Đã gửi",p5:"Đã duyệt",gtel:"Đã mở",kt:"Chưa kiểm tra"},{phieu:"Đã gửi",p5:"Đã duyệt",gtel:"Đã mở",kt:"Đã thông"}][k]}
function rMm(){
  const ms=S.momang.slice().sort((a,b)=>String(a.don_vi).localeCompare(String(b.don_vi),"vi"));
  $("kanban").innerHTML=COLS.map((c,k)=>{const its=ms.filter(m=>stage(m)===k);return `<div class="kcol" data-col="${k}"><h4><span>${c}</span><span>${its.length}</span></h4><div class="klist">${its.map(m=>{const d=days(pDate(m.cap_nhat)),late=k<5&&d!==null&&d>3;return `<div class="kc ${late?"late":""}" draggable="${S.canWrite!==false}" data-mm="${esc(m._id)}"><div class="row"><span class="t">${esc(m.don_vi)}</span><span class="d">${esc(m.ma_luong||"")}</span></div><div class="d c1" title="${esc(m.chieu)}">${esc(m.chieu||"")}</div>${m.kt==="Lỗi"?`<span class="pill p-block">Lỗi kết nối</span>`:m.gtel==="Mở một phần"?`<span class="pill p-run">Mở một phần</span>`:""}<div class="row"><span class="d ${late?"num hot":""}">${d!==null?d+" ngày ở cột này":""}</span>${k>0&&k<5?`<button class="btn sm" type="button" data-next="${esc(m._id)}" title="Chuyển sang ${esc(COLS[k+1])}" ${S.canWrite===false?"disabled":""}>→</button>`:""}</div></div>`}).join("")}</div></div>`}).join("");
  $("nMm").textContent=ms.filter(m=>stage(m)<5).length||"";
}
async function moveMm(id,k){
  const m=S.momang.find(x=>x._id===id);if(!m||!S.db)return;
  if(k>0&&stage(m)===0){toast("Cần nhập IP nguồn, IP đích và port trước. Bấm vào thẻ để nhập.");return}
  if(k===0){toast("Muốn về cột Thiếu bảng luồng, bấm vào thẻ và xoá IP/port.");return}
  const patch=Object.assign(stagePatch(k),{cap_nhat:vnd(new Date())});if(k===2&&!m.ngay_phieu)patch.ngay_phieu=vnd(new Date());
  try{await S.db.collection("momang").doc(id).update(patch);toast(`${m.don_vi}: ${COLS[k]}.`)}catch(e){toast(errMsg(e))}
}
{let drag=null;const kb=$("kanban");
 kb.addEventListener("dragstart",e=>{const c=e.target.closest(".kc");if(c){drag=c.dataset.mm;e.dataTransfer.effectAllowed="move";try{e.dataTransfer.setData("text/plain",drag)}catch(x){}}});
 kb.addEventListener("dragover",e=>{const c=e.target.closest(".kcol");if(c&&drag){e.preventDefault();kb.querySelectorAll(".over").forEach(x=>x!==c&&x.classList.remove("over"));c.classList.add("over")}});
 kb.addEventListener("dragleave",e=>{const c=e.target.closest(".kcol");if(c&&!c.contains(e.relatedTarget))c.classList.remove("over")});
 kb.addEventListener("drop",e=>{const c=e.target.closest(".kcol");kb.querySelectorAll(".over").forEach(x=>x.classList.remove("over"));if(c&&drag){e.preventDefault();moveMm(drag,+c.dataset.col)}drag=null});
 kb.addEventListener("dragend",()=>{drag=null;kb.querySelectorAll(".over").forEach(x=>x.classList.remove("over"))});}
function editMm(id){
  const m=S.momang.find(x=>x._id===id)||{};
  showForm(m.don_vi?`Mở mạng · ${m.don_vi}`:"Thêm luồng mở mạng","",[{k:"don_vi",l:"Đơn vị",v:m.don_vi,list:"dlDv"},{k:"ma_luong",l:"Mã luồng",v:m.ma_luong},{k:"chieu",l:"Chiều kết nối (ví dụ NDOP DMZ → AGN MoMo)",v:m.chieu},{k:"ip_nguon",l:"IP nguồn",v:m.ip_nguon},{k:"ip_dich",l:"IP đích",v:m.ip_dich},{k:"cong",l:"Port",v:m.cong},{k:"phieu",l:"Phiếu Firewall",o:MMST.phieu,v:m.phieu||"Chưa gửi"},{k:"ngay_phieu",l:"Ngày gửi phiếu",v:m.ngay_phieu},{k:"p5",l:"P5 C12 duyệt",o:MMST.p5,v:m.p5||"Chưa duyệt"},{k:"gtel",l:"Gtel mở Firewall",o:MMST.gtel,v:m.gtel||"Chưa mở"},{k:"kt",l:"Kiểm tra kết nối",o:MMST.kt,v:m.kt||"Chưa kiểm tra"},{k:"ghi_chu",l:"Ghi chú, căn cứ",v:m.ghi_chu,t:"area"}],
  async v=>{if(!v.don_vi){toast("Cần nhập đơn vị.");return false}v.cap_nhat=vnd(new Date());const c=S.db.collection("momang");if(m._id)await c.doc(m._id).set(v);else await c.add(v)},
  m._id?()=>S.db.collection("momang").doc(m._id).delete():null);
}

/* ---------- Báo cáo tuần: 2 bản ---------- */
const iso=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
{const t=new Date(),f=new Date(t-6*864e5);$("bcFrom").value=iso(f);$("bcTo").value=iso(t)}
function rBc(){
  seg("segBc",[["noibo","Nội bộ (BOD)"],["c12","Gửi C12"]],S.bc,v=>{S.bc=v;rBc()});
  const f=new Date($("bcFrom").value+"T00:00:00"),t=new Date($("bcTo").value+"T23:59:59");if(isNaN(f)||isNaN(t))return;
  const inR=d=>d&&d>=f&&d<=t,vn=d=>d.toLocaleDateString("vi-VN"),L0=LF(),U=units(L0),o=L0.filter(isOpen),c12=S.bc==="c12";
  const upd=L0.filter(r=>inR(pDate(r.cap_nhat))).sort((a,b)=>String(dvOf(a)).localeCompare(String(dvOf(b)),"vi"));
  const moved=[],cleared=[];S.nhatky.filter(x=>inR(new Date(x.at))).forEach(x=>(x.thay_doi||[]).forEach(c=>{const r=S.luong.find(y=>y._id===x.luong);if(r&&!passG(r))return;const n=r?`${dvOf(r)} (${r.ma})`:x.luong;if(/_tt$/.test(c.truong))moved.push(`${n}: ${c.truong==="ndc_tt"?"NDC":"DevTest/103NT"} ${c.cu||"—"} → ${c.moi}`);if(c.truong==="blocker"&&(!c.moi||c.moi==="—")&&c.cu&&c.cu!=="—")cleared.push(`${n}: ${c.cu}`)}));
  const mmOpen=S.momang.filter(m=>stage(m)<5),L=[];let n=1;const H=s=>L.push(`${n++}. ${s}`);
  L.push(c12?"BÁO CÁO TIẾN ĐỘ TRIỂN KHAI NDOP – GỬI TTDLQG (C12)":"BÁO CÁO TIẾN ĐỘ ĐẤU NỐI NDOP – NỘI BỘ",`Kỳ báo cáo: ${vn(f)} – ${vn(t)}`,"");
  if(!c12){const e=o.filter(esc3);H(`Cần lãnh đạo xử lý (${e.length})`);L.push(...(e.length?e.map(r=>`- ${dvOf(r)} (${r.ma}, ${wdays(bDate(r))} ngày làm việc): ${r.blocker} – đang chặn: ${r.ai_chan||"—"}; nhận xử lý: ${r.nguoi_nhan||"chưa giao"}`):["- Không có."]),"")}
  H("Tổng quan");L.push(`- ${U.length} đơn vị, hệ thống; ${L0.length} luồng.`,`- Xong DevTest/103NT: ${U.filter(u=>u.dt==="Hoàn thành").length} đơn vị. Xong NDC: ${U.filter(u=>u.ndc==="Hoàn thành").length} đơn vị.`,c12?`- Đang chờ hỗ trợ từ C12/Gtel/đối tác: ${o.filter(r=>owners(r).some(x=>x!=="Nội bộ NADAT")).length} luồng.`:`- Vướng mắc đang mở: ${o.length} (nội bộ ${o.filter(r=>owners(r).includes("Nội bộ NADAT")).length}, C12/hạ tầng ${o.filter(r=>owners(r).includes("C12 / hạ tầng")).length}, đối tác ${o.filter(r=>owners(r).includes("Đối tác")).length}). Ghi xong nhưng thiếu BBNT: ${L0.filter(noBbnt).length}.`,"");
  H(`Chuyển trạng thái trong kỳ (${moved.length})`);L.push(...(moved.length?moved.map(x=>"- "+x):["- Không có thay đổi trạng thái được ghi trên trang."]),"");
  H(`Luồng có cập nhật trong kỳ (${upd.length})`);L.push(...(upd.length?upd.map(r=>`- ${dvOf(r)} (${r.ma}) – DevTest/103NT: ${stOf(r.dt_tt)}; NDC: ${stOf(r.ndc_tt)}.${c12?"":" Tiếp theo: "+(r.viec_tiep||"—")}`):["- Không có."]),"");
  if(c12){const need=o.filter(r=>owners(r).some(x=>x!=="Nội bộ NADAT")).map(r=>({r,d:days(bDate(r))})).sort((a,b)=>(b.d??-1)-(a.d??-1));H(`Đề nghị C12, Gtel, đối tác hỗ trợ (${need.length})`);L.push(...(need.length?need.map(({r,d})=>`- ${dvOf(r)} (${r.ma}, ${d??"?"} ngày): ${r.blocker} – đề nghị ${r.ai_chan||"các bên"} xử lý.`):["- Không có."]),"")}
  else{H(`Vướng mắc đã gỡ (${cleared.length})`);L.push(...(cleared.length?cleared.map(x=>"- "+x):["- Chưa ghi nhận trên trang."]),"");const late=L0.filter(r=>lateDays(r)>0);H(`Việc quá hạn (${late.length})`);L.push(...(late.length?late.map(r=>`- ${dvOf(r)} (${r.ma}): ${r.viec_tiep||"—"} – ${r.nguoi_lam||r.ba||"chưa giao"}, hạn ${r.han_xu_ly}`):["- Không có (hoặc chưa đặt hạn)."]),"");const lw=S.luong.filter(r=>leftIn(r).length);if(lw.length){H(`Việc của người đã nghỉ chưa chuyển giao (${lw.length})`);L.push(...lw.map(r=>`- ${dvOf(r)} (${r.ma}): ${leftIn(r).map(x=>shortOf(x.p)).join(", ")}`),"")}}
  H(`Mở mạng NDC chưa xong (${mmOpen.length})`);L.push(...(mmOpen.length?mmOpen.map(m=>`- ${m.don_vi}: ${m.chieu||""} – ${COLS[stage(m)]}`):["- Không có."]));
  $("bcText").textContent=L.join("\n");
}
["bcFrom","bcTo"].forEach(i=>$(i).addEventListener("input",rBc));
$("bcCopy").onclick=async()=>{const txt=$("bcText").textContent;try{await navigator.clipboard.writeText(txt);toast("Đã chép báo cáo.")}catch(e){const r=document.createRange();r.selectNodeContents($("bcText"));const s=getSelection();s.removeAllRanges();s.addRange(r);toast("Đã bôi đen báo cáo, bấm Ctrl+C để chép.")}};

/* ---------- Sự kiện chung ---------- */
function rAll(){rFilters();rLinks();rOverview();rUnits();rPeople();rChat();rDocs();rScan();rMe();rMm();rBc()}
$("dClose").onclick=closeD;$("scrim").onclick=closeD;$("dCancel").onclick=closeD;$("dSave").onclick=()=>S.form?run(()=>S.form.onSave(vals()),"Đã lưu."):save();$("scanBtn").onclick=scan;
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!$("drawer").hidden)closeD()});
document.addEventListener("change",e=>{const c=e.target.closest("[data-dk]");if(c){const [id,k]=c.dataset.dk.split("|");toggleDk(id,k,c.checked)}});
document.addEventListener("click",async e=>{
  if(e.target.closest("aside"))return;
  const c=e.target.closest("[data-copy]");if(c){const qt=c.dataset.quiet;try{await navigator.clipboard.writeText(c.dataset.copy);toast(qt?"Đã chép.":"Đã chép. Dán vào thanh địa chỉ (File Explorer hoặc trình duyệt).")}catch(x){toast(qt?"Trình duyệt chặn chép. Bấm Hiện rồi tự chép.":c.dataset.copy)}return}
  if(e.target.closest("[data-dk]")||e.target.closest(".chk label"))return;
  let t=e.target.closest("[data-dx]");if(t){const [id,a]=t.dataset.dx.split("|");decide(id,a==="ok");return}
  t=e.target.closest("[data-next]");if(t){const m=S.momang.find(x=>x._id===t.dataset.next);if(m)moveMm(m._id,stage(m)+1);return}
  t=e.target.closest("[data-tab]");if(t){S.tab=t.dataset.tab;rUnits();return}
  t=e.target.closest("[data-plat]");if(t){S.plat=t.dataset.plat;rChat();return}
  t=e.target.closest("[data-uadd]");if(t){const [k,un]=t.dataset.uadd.split("|");unitAdd(k,un);return}
  t=e.target.closest("[data-qg]");if(t){QS.g=t.dataset.qg;QS.i=0;rQt();return}
  t=e.target.closest("[data-qs]");if(t){QS.i=+t.dataset.qs;rQt();return}
  t=e.target.closest("[data-luong]");if(t){showEdit(t.dataset.luong);return}
  t=e.target.closest("[data-go]");if(t){S.exp=t.dataset.go;S.tab="luong";if(location.hash!=="#don-vi")location.hash="don-vi";else rUnits();setTimeout(()=>{const r=document.querySelector(`#tbDv tr[data-unit="${CSS.escape(S.exp)}"]`);if(r)r.scrollIntoView({block:"start"})},60);return}
  t=e.target.closest("[data-unit]");if(t){S.exp=S.exp===t.dataset.unit?null:t.dataset.unit;S.tab="luong";rUnits();return}
  const a=e.target.closest("[data-add]");if(a){({luong:addFlow,ng:()=>editPerson("",-1),nc:()=>editChat(""),tl:()=>editDoc("",-1),lk:()=>editLink(""),mm:()=>editMm("")})[a.dataset.add]();return}
  t=e.target.closest("[data-ng]");if(t){const [g,i]=t.dataset.ng.split("|");editPerson(g,+i);return}
  t=e.target.closest("[data-nc]");if(t){editChat(t.dataset.nc);return}
  t=e.target.closest("[data-tl]");if(t){const [g,i]=t.dataset.tl.split("|");editDoc(g,+i);return}
  t=e.target.closest("[data-mm]");if(t)editMm(t.dataset.mm)});
[["qDv",rUnits],["fDvSt",rUnits],["fOnlyBl",rUnits],["qNg",rPeople],["fShowLeft",rPeople],["qChat",rChat],["qTl",rDocs]].forEach(([i,f])=>$(i).addEventListener("input",f));
[["v-don-vi","luong","Thêm luồng"],["v-nguoi","ng","Thêm người"],["v-nhom-chat","nc","Thêm nhóm"],["v-tai-lieu","tl","Thêm tài liệu"],["v-mo-mang","mm","Thêm luồng mở mạng"]].forEach(([s,k,l])=>document.querySelector("#"+s+" .head").insertAdjacentHTML("beforeend",`<button class="btn sm primary" type="button" data-add="${k}">${l}</button>`));
const VIEWS=["tong-quan","don-vi","viec-cua-toi","mo-mang","bao-cao","nguoi","nhom-chat","tai-lieu","quy-trinh"],FILTERED=["tong-quan","don-vi","bao-cao"];
function route(){let v=location.hash.slice(1);if(v==="vuong-mac"){$("fOnlyBl").checked=true;v="don-vi"}if(!VIEWS.includes(v))v="tong-quan";document.querySelectorAll("[data-view]").forEach(s=>s.hidden=s.id!=="v-"+v);$("gFilters").hidden=!FILTERED.includes(v);document.querySelectorAll(".side a").forEach(a=>a.setAttribute("aria-current",a.getAttribute("href")==="#"+v?"page":"false"));if(v!=="don-vi"||!S.exp)scrollTo(0,0);if(v==="don-vi")rUnits()}
addEventListener("hashchange",route);route();

/* ---------- Dữ liệu ---------- */
rAll();
const sync=(live,t)=>{$("dot").className="dot"+(live?" live":"");$("synctext").textContent=t;$("syncbox").hidden=live};
(async()=>{
  const timer=setTimeout(()=>{if(!S.loaded)sync(false,"Chưa kết nối được dữ liệu. Tải lại trang để thử lại.")},10000);
  const c=window.claude,db=c&&c.use?await c.use("db"):null;S.user=c&&c.use?await c.use("user"):null;
  try{S.canWrite=S.user?await S.user.can("data.write"):null}catch(e){}
  if(!db){clearTimeout(timer);sync(false,"Cần đăng nhập claude.ai để xem dữ liệu.");S.loaded=true;rAll();return}
  S.db=db;
  ["luong","nhomchat","nguoi","tailieu","nhatky","momang","dexuat","lienket","quytrinh","donvi"].forEach(col=>db.collection(col).onSnapshot(s=>{
    S[col]=s.docs.map(d=>Object.assign({_id:d.id},d.data()));
    if(col==="luong"){S.luong.sort((a,b)=>String(a.ma).localeCompare(String(b.ma),"vi",{numeric:true}));S.loaded=true;clearTimeout(timer);sync(true,"Dữ liệu đang đồng bộ")}
    rAll();if(S.edit&&col==="nhatky")hist()},()=>{clearTimeout(timer);sync(false,"Mất kết nối dữ liệu. Tải lại trang.")}));
  db.doc("yeucau/quet").onSnapshot(d=>{S.quet=d.data()||null;rScan()},()=>{});
})();
