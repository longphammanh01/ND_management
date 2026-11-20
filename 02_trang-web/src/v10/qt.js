/* ---------- Quy trình: sơ đồ bước tương tác ---------- */
// mỗi bước: t tên, w [bên làm], io đầu vào → đầu ra, tg thời gian thực tế, ba việc BA, ng điểm nghẽn, cc căn cứ, live(): các mục đang ở bước này
const P={N:"NADAT",B:"BA",C:"C12",G:"Gtel",D:"Đối tác",V:"VDC"};
const liveDt=(nv,n)=>()=>S.luong.filter(r=>norm(r.nv).includes(nv)&&new RegExp("^\\s*(cs |th )?b"+n+"\\b","i").test(norm(r.dt_buoc))).map(r=>`${dvOf(r)} (${r.ma})`);
const liveMm=k=>()=>S.momang.filter(m=>stage(m)===k).map(m=>m.don_vi+(m.ma_luong?` (${m.ma_luong})`:""));
const QT=[
 {k:"khung",t:"Khung chung",d:"6 giai đoạn từ lúc mở nhóm tới go-live. Ba môi trường: DevTest (hạ tầng NADAT, đấu nối thử, ký BBNT DevTest) → 103NT (hạ tầng hiện hữu C12, hệ thống đang chạy thật, bản sửa lên đây trước) → NDC Hòa Lạc (chạy chính thức, ký BBNT riêng).",s:[
  {t:"Khởi tạo",w:"BN",io:"Yêu cầu đấu nối → nhóm chat, đầu mối, loại nghiệp vụ (TH / CS / ĐP)",ba:"Lập nhóm chat, ghi đầu mối hai bên, xác định luồng thuộc Tích hợp, Chia sẻ hay Điều phối."},
  {t:"Thu thập",w:"BD",io:"Họp → API spec, endpoint, bảng luồng IP – port",ba:"Xin API spec, endpoint; lập bảng luồng IP nguồn – IP đích – port ngay từ đầu để dùng lại cho Firewall NDC."},
  {t:"DevTest",w:"NDB",io:"Cấu hình → log, testcase, BBNT DevTest",ba:"Xác nhận qua log, xin testcase, soạn BBNT, theo dõi ký.",live:()=>S.luong.filter(r=>["Đang thực hiện","Chờ phản hồi","Bị block"].includes(stOf(r.dt_tt))).map(r=>`${dvOf(r)} (${r.ma})`)},
  {t:"Chuẩn bị NDC",w:"NCGD",io:"Kênh truyền, AgentNode, VPN, phiếu Firewall",ba:"Kiểm tra đủ 6 điều kiện lên NDC (API, bảng luồng, đầu mối mạng, tài khoản server/ESXi, testcase, BBNT DevTest)."},
  {t:"Triển khai NDC",w:"NCGD",io:"Quét CVE, cài, cấu hình Stateful, test → BBNT NDC",ba:"Chuẩn bị dữ liệu mẫu, testcase; lập BBNT NDC.",live:()=>S.luong.filter(r=>["Đang thực hiện","Chờ phản hồi","Bị block"].includes(stOf(r.ndc_tt))).map(r=>`${dvOf(r)} (${r.ma})`)},
  {t:"Go-live",w:"NCD",io:"Báo đối tác trước 2 tuần → giám sát, đối soát",ba:"Gửi thông báo go-live, theo dõi đối soát tuần đầu.",live:()=>S.luong.filter(r=>stOf(r.ndc_tt)==="Hoàn thành").map(r=>`${dvOf(r)} (${r.ma})`)}]},
 {k:"cs",t:"Chia sẻ (DevTest)",d:"9 bước cho luồng Chia sẻ (CS). Cột “Đang ở bước này” lấy theo ô Bước DevTest của từng luồng (B1…B9).",s:STEPS_CS.map((x,i)=>({t:x.replace(/^B\d\.\s*/,""),w:[ "BN","BD","BD","N","ND","BD","B","BD","B"][i],ba:["Tạo nhóm, thêm đầu mối hai bên.","Xác nhận đơn vị đang đấu nối trực tiếp với hệ thống nào.","Thu API spec, endpoint, tài khoản test.","Chuyển spec cho Dev, theo dõi hạn cấu hình.","Báo đối tác chuyển sang gọi qua NDOP.","Xin log hai đầu, xin testcase của đối tác.","Soạn BBNT theo mẫu, gửi lấy ý kiến.","Nhắc ký; quá 3 ngày làm việc thì báo lãnh đạo.","Lưu file BBNT đã ký vào thư mục đơn vị, gắn vào luồng."][i],live:liveDt("cs",i+1)}))},
 {k:"th",t:"Tích hợp (DevTest)",d:"5 bước cho luồng Tích hợp (TH): đơn vị đẩy dữ liệu về kho TTDLQG qua NDOP.",s:STEPS_TH.map((x,i)=>({t:x.replace(/^B\d\.\s*/,""),w:["BN","D","B","B","B"][i],ba:["Gửi API spec bản mới nhất và địa chỉ DevTest cho đơn vị.","Theo dõi số bản ghi đơn vị đẩy, đối chiếu với kho.","Nhắc hạn; nếu trễ thì xin hạn mới bằng văn bản.","Hoàn thiện BBNT kèm số liệu đối chiếu.","Lưu BBNT đã ký, gắn vào luồng."][i],live:liveDt("th",i+1)}))},
 {k:"fw",t:"Mở Firewall NDC",d:"Gtel không mở khi chỉ có IP đích: phải có bảng luồng toàn trình. Cột “Đang ở bước này” lấy từ mục Mở mạng NDC.",s:[
  {t:"Lập bảng luồng toàn trình",w:"BND",io:"IP nguồn, IP đích, port, mục đích",tg:"Thường chậm vì đối tác chưa chốt IP NAT (MoMo mất ~11 ngày)",ba:"Giữ một bảng IP duy nhất, ghi rõ ai còn nợ thông tin.",live:liveMm(0)},
  {t:"Viết phiếu Firewall",w:"N",io:"Bảng luồng → phiếu mẫu VDC_175_Dx_rule, đánh số từ 21",tg:"Trong ngày",ng:"Phiếu cũ sửa phải tô màu, giải thích; C12 yêu cầu bỏ “Jump sys”",cc:"28/10 Hùng; 03/11 danh sách phiếu 22–26",live:liveMm(1)},
  {t:"P5 C12 duyệt",w:"C",io:"Phiếu → duyệt / trả lại",tg:"Nhanh nhất ~6 giờ, thường 1–3 ngày",ba:"Theo dõi trạng thái từng phiếu; quá 3 ngày nhờ lãnh đạo nhắc.",live:liveMm(2)},
  {t:"Gtel / VDC mở Firewall",w:"GV",io:"Phiếu đã duyệt → luật chạy",tg:"Vài giờ – 1 ngày",live:liveMm(3)},
  {t:"Kiểm tra thông",w:"N",io:"ping / telnet / nc, mở giao diện → bằng chứng thông",ng:"Thường lộ thêm điểm tắc mới ngay sau khi thông; NDC cấm chụp ảnh",ba:"Ghi bằng chứng (nhờ C12 chụp hộ).",live:liveMm(4)},
  {t:"Đã thông",w:"",io:"Chuyển sang cấu hình luồng, bắn dữ liệu thử",live:liveMm(5)}]},
 {k:"ndc",t:"Cấu hình kỹ thuật NDC",d:"Suy ra từ nhóm Viber NDOP_NDC_LHL_103NT (26/10–14/11). Phần lớn do DevOps, Dev làm; BA theo dõi và giữ tài liệu.",s:[
  {t:"Xin tài nguyên hạ tầng",w:"NC",io:"Sizing → bucket S3, VM, IngressController, VIP/F5",tg:"S3 phải sizing một lần; IngressController mở trong ngày",cc:"28/10 Nicolas (anh Quang); 28/10 Lưu 3 phiếu gấp"},
  {t:"Quét CVE, chuyển file/image",w:"NC",io:"Image/file sạch + MD5 → file trên máy Jump",tg:"1–5 ngày",ng:"File 23/10 tới 26/10 chưa rõ ở đâu; sửa CVE ShareNode phải nâng Spring",cc:"26/10 Ngọc Lan; 05/11 Trung"},
  {t:"Viết phiếu Firewall",w:"N",io:"Bảng nguồn – đích – port → phiếu đánh số",tg:"Phiếu 21 (28/10) → 32 (14/11)"},
  {t:"Chờ duyệt, mở Firewall",w:"CGV",io:"Phiếu → luật chạy",tg:"~6 giờ đến 1–3 ngày",ng:"Quốc: “xin mở FW rất lâu”"},
  {t:"Kiểm tra thông",w:"N",io:"Luật đã mở → bằng chứng thông",ng:"Phát hiện thêm điểm tắc mới"},
  {t:"Cấu hình OpenShift, ShareNode",w:"N",io:"Route, cert → ShareNode đăng ký vào Central Server",ng:"mTLS bị F5 chặn (chỉ Layer 7) → sửa code sang HTTPS một chiều",cc:"30/10 → 06/11"},
  {t:"Dựng VM ShareNode đầu Bộ/Tỉnh",w:"NGC",io:"File OVF → VM IP tĩnh, ShareNode bật, port 4000",tg:"36 VM trong 3 ngày (02–04/11)",ng:"VNPAY, BIDV chưa có tài khoản ESXi"},
  {t:"Chốt IP theo quy hoạch C12",w:"C",io:"Bảng quy hoạch → IP chính thức đuôi .9",ng:"Đổi 2 lần .5 → .8 → .9",cc:"05/11 Lê Duy, Ngọc Anh"},
  {t:"Báo cáo hằng ngày",w:"N",io:"Checklist + file báo cáo → C12 P4.T1",tg:"Trước 19h"}]},
 {k:"file",t:"Đưa file lên NDC",d:"Áp dụng cho mọi file, image chuyển vào 103NT/NDC. Căn cứ QĐ 548/QĐ-C12-P4.",s:[
  {t:"Quét CVE, sửa lỗ hổng",w:"N",io:"Image/file → bản sạch",ng:"Image có CVE bị trả lại"},
  {t:"Tính MD5, dung lượng",w:"N",io:"File → danh sách MD5 + dung lượng"},
  {t:"Lập biểu mẫu BCDX",w:"NB",io:"Mẫu chính thức P4: khổ ngang, số công văn, chữ ký tay, mục “Đại diện nhà thầu”",ba:"Kiểm tra đủ 6 chữ ký, ghi rõ file phục vụ phần mềm nào."},
  {t:"Gửi nhóm Tele “Triển khai NDOP NDC”",w:"N",io:"Biểu mẫu + file → P4 tiếp nhận"},
  {t:"P5 quét, copy vào máy Jump",w:"C",io:"File → nằm trên Jump (ví dụ 10.19.30.70)",tg:"1–5 ngày"}]},
];
const QREF=[
 ["Các bên tham gia",`<div class="tbl"><table><thead><tr><th>Bên</th><th>Vai trò</th></tr></thead><tbody>${[["NADAT – Điều phối (Trần Huy Hùng)","Giao việc, thúc phiếu, báo cáo C12"],["NADAT – PM/Kỹ thuật (Quoc Le, anh Quang/Nicolas)","Làm việc với C12, quyết định hướng xử lý"],["NADAT – DevOps (Lê Trí Hùng, Phạm Đức Lưu, Nguyễn Hải Nam, Đào Mạnh Tùng, Đỗ Tiến Thuật)","Dựng VM, ShareNode, viết phiếu Firewall"],["NADAT – Dev (Le Thanh Trung, Văn Duy, Trần Minh Đức, Phan Đình Nghĩa)","Sửa image, CVE, cấu hình luồng"],["NADAT – BA/QA","Tài liệu, testcase, BBNT, theo dõi tiến độ"],["C12 – P4","Cấp S3, VM, IP; duyệt phiếu Firewall"],["C12 – P5","Quét CVE, copy file, an ninh phòng IOC"],["Gtel (D02)","IP trên AgentNode, NAT, Firewall đầu Bộ/Tỉnh"],["VDC","Mở IngressController, F5, Firewall NDC"],["Đối tác","Chốt IP NAT, định tuyến, gửi dữ liệu"]].map(([a,b])=>`<tr><td class="t">${a}</td><td>${b}</td></tr>`).join("")}</tbody></table></div>`],
 ["Phân loại vướng mắc",`<p><b>Kỹ thuật – mạng:</b> không kết nối được, WAF chặn, VPN chưa lên → C12 hạ tầng, P5, Gtel.</p><p><b>Kỹ thuật – ứng dụng:</b> lỗi trả về, sai định dạng, thiếu log → Dev trả lời trong 1 ngày.</p><p><b>Nghiệp vụ:</b> thiếu tài liệu, đầu mối, testcase, chờ chỉ đạo → BA xử lý; nhắc 2 lần quá 3 ngày làm việc thì báo lãnh đạo.</p>`],
 ["Điểm nghẽn lặp lại",`<ol><li>Phiếu Firewall: mỗi điểm tắc mới lại một phiếu, chờ 1–3 ngày; không có danh sách luật gộp từ đầu.</li><li>Quy hoạch IP không ổn định: .5 → .8 → .9.</li><li>Chuyển file vào hệ thống chậm, nhiều chữ ký.</li><li>F5 chỉ Layer 7 → mTLS ShareNode phải sửa.</li><li>Quy định phát sinh tại NDC: đăng ký laptop, cấm chụp ảnh, làm sau 17h30 phải đăng ký.</li><li>Đối tác nhầm thiết bị cũ, chậm chốt IP.</li></ol>`]];
const QS={g:"khung",i:0,q:""};
function rQt(){
  const q=norm($("qQt").value);QS.q=q;
  $("qtGroups").innerHTML=QT.map(g=>`<button type="button" data-qg="${g.k}" aria-pressed="${g.k===QS.g}">${esc(g.t)} <span class="d">${g.s.length}</span></button>`).join("");
  const hits=q?QT.flatMap(g=>qtSteps(g).map((s,i)=>({g,s,i}))).filter(({s})=>norm(Object.values(s).filter(v=>typeof v==="string").join(" ")).includes(q)):[];
  $("qtHits").hidden=!q;$("qtHits").innerHTML=q?(hits.length?hits.map(({g,s,i})=>`<button type="button" class="hit" data-qhit="${g.k}|${i}"><b>${esc(g.t)}</b> › ${i+1}. ${esc(s.t)}</button>`).join(""):`<span class="d">Không có bước nào khớp.</span>`):"";
  const G00=QT.find(g=>g.k===QS.g)||QT[0],G0={k:G00.k,t:G00.t,d:G00.d,s:qtSteps(G00)};if(QS.i>=G0.s.length)QS.i=0;const edited=(S.quytrinh||[]).some(x=>x._id===G0.k);
  $("qtDesc").textContent=G0.d;
  $("qtFlow").innerHTML=G0.s.map((s,i)=>{const n=s.live?s.live().length:null;return `<button type="button" class="qn ${i===QS.i?"on":""} ${q&&norm(Object.values(s).filter(v=>typeof v==="string").join(" ")).includes(q)?"hl":""}" data-qs="${i}" aria-pressed="${i===QS.i}"><span class="qi">${i+1}</span><span class="qt">${esc(s.t)}</span><span class="qw">${[...(s.w||"")].map(c=>`<i class="pw pw-${c}">${P[c]}</i>`).join("")}</span>${n?`<span class="qc">${n} đang ở đây</span>`:""}</button>`}).join("");
  const s=G0.s[QS.i],L=s.live?s.live():[];
  const row=(l,v)=>v?`<dt>${l}</dt><dd>${v}</dd>`:"";
  $("qtDetail").innerHTML=`<div class="top"><h3>${QS.i+1}. ${esc(s.t)}${edited?` <span class="warnchip">đã sửa so với bản gốc</span>`:""}</h3><div class="tools">${S.canWrite===false?"":`<button class="btn sm" type="button" data-qtact="edit">Sửa bước</button><button class="btn sm" type="button" data-qtact="add">+ Thêm bước sau</button><button class="btn sm danger" type="button" data-qtact="del">Xoá bước</button>${edited?`<button class="btn sm" type="button" data-qtact="reset">Khôi phục bản gốc</button>`:""}`}<button class="btn sm" type="button" data-qs="${Math.max(0,QS.i-1)}" ${QS.i?"":"disabled"}>← Bước trước</button><button class="btn sm" type="button" data-qs="${Math.min(G0.s.length-1,QS.i+1)}" ${QS.i<G0.s.length-1?"":"disabled"}>Bước sau →</button></div></div>
   <dl>${row("Ai làm",[...(s.w||"")].map(c=>`<i class="pw pw-${c}">${P[c]}</i>`).join(" "))}${row("Đầu vào → đầu ra",esc(s.io||""))}${row("Thời gian thực tế",esc(s.tg||""))}${row("Việc BA",esc(s.ba||""))}${row("Điểm nghẽn",esc(s.ng||""))}${row("Căn cứ",esc(s.cc||""))}${s.live?row("Đang ở bước này",L.length?L.map(x=>`<span class="tag">${esc(x)}</span>`).join(" "):`<span class="d">Không có</span>`):""}</dl>`;
}
document.addEventListener("click",e=>{const t=e.target.closest("[data-qhit]");if(t){const [g,i]=t.dataset.qhit.split("|");QS.g=g;QS.i=+i;$("qQt").value="";rQt()}});
document.addEventListener("keydown",e=>{if($("v-quy-trinh").hidden||/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)||!$("drawer").hidden)return;const G0={s:qtSteps(QT.find(g=>g.k===QS.g))};if(e.key==="ArrowRight"&&QS.i<G0.s.length-1){QS.i++;rQt()}if(e.key==="ArrowLeft"&&QS.i>0){QS.i--;rQt()}});
