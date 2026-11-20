# Graph Report - NDOP_QuanLy_DauNoi  (2026-11-16)

## Corpus Check
- 68 files · ~241,610 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: .drawio 6, .doc 1, .vsdx 1)

## Summary
- 868 nodes · 2192 edges · 43 communities (37 shown, 6 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 1% AMBIGUOUS · INFERRED: 143 edges (avg confidence: 0.8)
- Token cost: 1,029,781 input · 0 output

## Community Hubs (Navigation)
- Tổng quan NDOP & hệ thống trong NDC
- C12 & rà soát dữ liệu Bộ, ngành
- Bộ Xây dựng – dữ liệu mẫu
- MoMo, TPBank & phân công BA
- Báo cáo cài ShareNode
- Tài liệu quản lý đấu nối
- NHNN
- VNPT & kho dùng chung
- Quy trình triển khai NDC
- DMDC – tích hợp, điều phối
- Nhóm Viber NDC – 103NT
- Nhóm BA nội bộ (WhatsApp)
- VPBank
- Sàn dữ liệu – FIS
- SHB
- Bộ KHCN
- Thanh toán Sàn dữ liệu (VNTDO)
- Dữ liệu sai khác (DA175)
- Phân công BA & luồng TH
- SSO C06 & mở mạng
- Cổng DVCQG – MBFS
- D01 – PAKN, Cổng DVC
- HT liên lạc (HTLL)
- Hiện trường NADAT & Bộ NNMT
- Kho dùng chung (KHO-5.1)
- Luồng VPBank, VNPAY – TTTT
- Hiện trạng kết nối NDC 09/11
- VNPAY, BIDV & văn bản C12
- Họp luồng sai khác
- ShareNode & Central Server
- Sửa CVE, mTLS ShareNode
- Thanh toán Cổng DVCQG – TTTT
- Bộ KHCN – Cổng DVCQG
- Công cụ BA & prototype
- 103NT vs NDC Hòa Lạc
- Tài liệu Input dự án
- Sàn dữ liệu – NEAC
- LGSP Bộ Xây dựng
- Mốc dự án
- Lịch dự án
- Bùi Tình
- Đoàn Trung Nam
- MinhNV

## God Nodes (most connected - your core abstractions)
1. `NDOP – Nền tảng tích hợp, chia sẻ, điều phối dữ liệu` - 69 edges
2. `NADAT` - 63 edges
3. `C12 – Trung tâm Dữ liệu quốc gia (TTDLQG, Bộ Công an)` - 60 edges
4. `Báo cáo triển khai ShareNode` - 47 edges
5. `Nhóm WhatsApp ND_BA_NDOP` - 44 edges
6. `Tóm tắt tài liệu từ các nhóm chat – báo cáo đối chiếu (15/11/2026)` - 39 edges
7. `D01 – Mobifone / MBFS` - 38 edges
8. `Trần Huy Hùng (a Hùng, NADAT – PM)` - 36 edges
9. `Nhóm Tele: DA175- PAKN+PA-SaiKhac` - 35 edges
10. `D02 / Gtel ICT` - 32 edges

## Surprising Connections (you probably didn't know these)
- `Linh Ngo – BA/kho dữ liệu (cấu hình topic tại TTDLQG)` --conceptually_related_to--> `D02 / Gtel ICT`  [AMBIGUOUS]
  06_Nguon/chat_day_du/Telegram/xay-dung-tai-lieu-dac-ta-ky-thuat-bxd-ttdlqg.txt → 01_TraCuu_ThuatNgu.md
- `Lỗi phản hồi 1000: Sai cấu trúc bản tin XML (dòng 20, cột 366 – trường TenQuyHoach)` --references--> `C12 – Trung tâm Dữ liệu quốc gia (TTDLQG, Bộ Công an)`  [INFERRED]
  08_TaiLieu_TheoDonVi/01_Bộ, ngành/Bộ Xây dựng/Do đơn vị gửi/012631267453-qh.md → 01_TraCuu_ThuatNgu.md
- `Hoàng Anh (Hoang_anh970)` --conceptually_related_to--> `C12 – Trung tâm Dữ liệu quốc gia (TTDLQG, Bộ Công an)`  [AMBIGUOUS]
  06_Nguon/GhiChu_DocChat_13-11-2026.md → 01_TraCuu_ThuatNgu.md
- `Question (quản trị nhóm)` --conceptually_related_to--> `C12 – Trung tâm Dữ liệu quốc gia (TTDLQG, Bộ Công an)`  [AMBIGUOUS]
  06_Nguon/chat_day_du/Zalo_PC/c12-tgpl-nhom-trao-doi.txt → 01_TraCuu_ThuatNgu.md
- `Đức Hòa – team DMDC (D01)` --conceptually_related_to--> `D01 – Mobifone / MBFS`  [INFERRED]
  06_Nguon/chat_day_du/Telegram/dmdc-nadat-tich-hop-nen-tang.txt → 01_TraCuu_ThuatNgu.md

## Hyperedges (group relationships)
- **Quy trình mở mạng NDC: bảng luồng → phiếu → P5 duyệt → Gtel mở FW/WAF** — 02_quytrinh_trienkhai_quy_trinh_mo_mang, entity_c12_p5, entity_gtel, entity_tran_huy_hung, entity_luu_pham [EXTRACTED 1.00]
- **CS-11 SHB test pilot TTTT qua NDOP / agent-ttdlqg** — entity_shb, entity_tttt, entity_ndop, 06_nguon_chat_day_du_telegram_c12_shb_ket_noi_dvcqg_agent_ttdlqg, entity_cs_11 [EXTRACTED 1.00]
- **Mô hình luồng dữ liệu sai khác (PAKN → NTTH → Kho dùng chung)** — entity_pakn, entity_ntth, entity_kho_du_lieu_dung_chung, entity_vnpt, entity_c12, entity_dp_dlsk [EXTRACTED 1.00]
- **Luồng thanh toán Cổng DVCQG – NDOP – Cổng TTTT – ngân hàng/trung gian thanh toán** — entity_cong_dvcqg, entity_ndop, entity_ht_qlttt, entity_vpbank, entity_momo, entity_vnpay [EXTRACTED 1.00]
- **Triển khai ShareNode/AgentNode kết nối Central Server NDOP tại NDC** — entity_sharenode, entity_agentnode, entity_central_server, entity_f5_ndc, entity_ndc_hoa_lac, entity_ndop [EXTRACTED 1.00]
- **Rà soát UC dữ liệu: C12 điều phối nhà G, nhà V, D01 làm việc với BBN** — entity_c12, entity_gtel, entity_vnpt, entity_d01, entity_qua_trinh_ra_soat_uc_du_lieu_bbn, entity_kho_dung_chung [EXTRACTED 1.00]
- **Các phân hệ NDOP v2 do team BA thiết kế** — 06_nguon_chat_day_du_whatsapp_nd_ba_ndop_ph_qtht, 06_nguon_chat_day_du_whatsapp_nd_ba_ndop_ph_tcdl, 06_nguon_chat_day_du_whatsapp_nd_ba_ndop_ph_tich_hop, 06_nguon_chat_day_du_whatsapp_nd_ba_ndop_ph_dieu_phoi, 06_nguon_chat_day_du_whatsapp_nd_ba_ndop_ph_chia_se, 06_nguon_chat_day_du_whatsapp_nd_ba_ndop_ph_trang_chu [EXTRACTED 1.00]
- **Đấu nối TGDL FIS vào NDC qua C12** — entity_fis, entity_c12, entity_ndop, 06_nguon_chat_day_du_whatsapp_san_c12_tgdl_fis_test_ket_noi_xlsx, 06_nguon_chat_day_du_whatsapp_san_c12_tgdl_fis_test_phieu_fw29 [EXTRACTED 1.00]
- **Quy trình mở mạng / FW trên NDC** — entity_nadat, entity_c12_p4, entity_c12_p5, entity_gtel, entity_vdc, 06_nguon_quy_trinh_ndc_tu_viber_phieu_fw [EXTRACTED 1.00]
- **Nhóm đơn vị cùng lỗi không vào được ESXi UI** — entity_bo_cong_an, entity_kiem_toan_nha_nuoc, entity_vien_han_lam_kh_cn_viet_nam, entity_vien_han_lam_khxh_viet_nam, entity_dai_truyen_hinh_viet_nam, entity_dai_tieng_noi_viet_nam, entity_thong_tan_xa_viet_nam, 08_tailieu_theodonvi_05_hạ_tầng_ndc___103nt_triển_khai_ndc___103nt__nội_bộ_nadat__báo_cáo__biểu_mẫu_chuyển_file_bao_cao_sharenode_loi_esxi_ui [EXTRACTED 1.00]
- **Bộ bản tin mẫu G17 do Bộ Xây dựng gửi** — 08_tailieu_theodonvi_01_bộ__ngành_bộ_xây_dựng_do_đơn_vị_gửi_012631287170_qh_ban_tin, 08_tailieu_theodonvi_01_bộ__ngành_bộ_xây_dựng_do_đơn_vị_gửi_4826118269100_da_ban_tin, 08_tailieu_theodonvi_01_bộ__ngành_bộ_xây_dựng_do_đơn_vị_gửi_8626419643600_da_ban_tin, 08_tailieu_theodonvi_01_bộ__ngành_bộ_xây_dựng_do_đơn_vị_gửi_data_green_g17_gcnhuanluyenvien_ban_tin, 08_tailieu_theodonvi_01_bộ__ngành_bộ_xây_dựng_do_đơn_vị_gửi_data_green_g17_giaychungnhanthuyenvien_ban_tin, entity_g17_nguon_du_lieu, entity_bo_xay_dung [INFERRED 0.85]

## Communities (43 total, 6 thin omitted)

### Community 0 - "Tổng quan NDOP & hệ thống trong NDC"
Cohesion: 0.05
Nodes (81): Bộ hướng dẫn BNĐP 01_HD_TichHop, 02_HD_ChiaSe, 03_HD_DieuPhoi v1.0.0, Hướng dẫn đọc đầy đủ lịch sử chat NDOP, Nhóm Tele: C12-D01-DMDC-NDOP-NADAT, agent-ttdlqg (AGN tại TTDLQG – môi trường pilot), Nhóm Tele: [DEVTEST] HANOI - NADAT - TTTT, Báo cáo Cổng–PAKN 83% (10/12 API ghi nhận log); create-without-captcha ↔ petition-expose/create-petition, API lấy thông tin công dân từ hệ thống điều phối phục vụ fillform (đã cung cấp trên NDC), 6 API Cổng → CSDL TTHC (formality, procedure-proposal) qua https://gw.op.nadat.com.vn/dvc/ (+73 more)

### Community 1 - "C12 & rà soát dữ liệu Bộ, ngành"
Cohesion: 0.05
Nodes (68): BNV: Bộ trưởng cho hạn 10/10; 9 nhóm trong TKCT + 69 nhóm ngoài TKCT; 17 nhóm devtest thành công, Mốc 05/10/2026 đóng các nhóm thông tin chốt được API spec, Mốc 15/10/2026 điều chỉnh TKCT (thay thế UC), BTC phản ánh: D01 trao đổi trực tiếp chưa thống nhất với C12 (214 vs 54 danh mục DL mở); tài liệu D02 quá chung chung, Biên bản họp rà soát BBN (BTP 07/09, BNNMT 08/09, BTC 08/09), Thiếu 8/12 tài liệu API spec BBN đã đồng bộ về 103NT, Các buổi họp rà soát BBN do C12 tổ chức (07-14/09), Họp online C12, VPBank, D01 về đấu nối DevTest và LHL (16/09) (+60 more)

### Community 2 - "Bộ Xây dựng – dữ liệu mẫu"
Cohesion: 0.05
Nodes (52): C12 xây dựng API cho Bộ lấy danh sách gói tin đồng bộ không đáp ứng (mô tả lỗi) để đối soát số liệu, Bảng_đề_xuất_chỉ_tiêu_đồng_bộ_CSDLQG_về_hoạt_động_xây_dựng, Công văn 4173 về triển khai AGN mới: bổ sung accept/content-type; xây API trả kết quả tra cứu (đối soát), BXD đồng bộ bước đầu 10/10 CSDL với CSDL tổng hợp quốc gia (Kế hoạch 05), Xây dựng tài liệu đặc tả kỹ thuật BXD/TTDLQG (Telegram), POC_MS02g17_APIspec_TD_BXD_CSDLDangKiem_CSDLHangHai_TongHop v1.0.2, POC_MS02g17_APIspec_TD_BXD_CSDLQGHoatDongXayDung (v1.0.4 → v1.0.6), TenQuyHoach tăng độ dài 255→500; sai thứ tự thẻ MaSoThue ở API dự án (+44 more)

### Community 3 - "MoMo, TPBank & phân công BA"
Cohesion: 0.07
Nodes (38): List vướng mắc NADAT gửi C12 (chưa gửi), Nhóm Tele: C12_NDOP bộ tài liệu, 20260827_Nadat_VNPT_Coop Plan_NDOP.docx, Hạ Tầng TPBank - C12 (Telegram), TTDLQG quy hoạch lại IP kết nối ngân hàng & trung gian thanh toán (TPBank 100.64.4.x→100.64.7.x; dải partner 100.64.6.0/24), DVTT_Huong_dan_tich_hop_TTTT_v2.3 (MoMo, SHB), Chưa chốt phương án NAT / IP đầu MoMo – chưa thể thông luồng mới, Lỗi timeout giao dịch MoMo trên Cổng DVCQG (07–08/2026): kênh 5M→100M Intercom; 12 request MoMo chưa nhận, 62 request C12 chưa nhận response (+30 more)

### Community 4 - "Báo cáo cài ShareNode"
Cohesion: 0.11
Nodes (38): Báo cáo triển khai ShareNode, 24 tỉnh/thành khác đã cài ShareNode thành công (Cần Thơ, Đà Nẵng, Hồ Chí Minh, Huế, …, Vĩnh Long), Vấn đề: dùng dải IP qua NAT, khác quy hoạch 10.2.x.x, Khối Bộ/ngành/đơn vị trung ương (25; 12 thành công, 13 chưa), Khối Tỉnh/thành phố (34; 25 thành công, 9 chưa), Vấn đề: không vào được ESXi UI, Vấn đề: chưa có thông tin / thiếu IP gateway, IP sharenode, Tổng hợp: 59 đơn vị, 37 thành công, 22 chưa hoàn thành (+30 more)

### Community 5 - "Tài liệu quản lý đấu nối"
Cohesion: 0.09
Nodes (16): Danh mục – Quản lý đấu nối NDOP, Tra cứu viết tắt NDOP, Cấu hình phần mềm chia sẻ, Hướng dẫn kết nối nền tảng điều phối V1.0.0, Hướng dẫn vận hành NDOP – Tích hợp (draft 1.1), Quy trình triển khai đấu nối NDOP, Tài liệu triển khai luồng tích hợp G01, Tài liệu triển khai thủ công trên OpenShift (+8 more)

### Community 6 - "NHNN"
Cohesion: 0.11
Nodes (29): Ý kiến của NHNN & pháp lý tổng quan triển khai HT Quản lý thanh toán tập trung, Nhóm Zalo C12 - NHNN Tích hợp dữ liệu (web), Biên bản làm việc NHNN final.docx, Webhook/API login Cổng DVCQG → NHNN lỗi 502 do WAF F5 TTDLQG chặn (rate limit), Nhóm Zalo DVCQG vs NHNN, NHNN_G19_20260601-20261103_CHAM_HAN.zip (hồ sơ đồng bộ QG quá hạn), NHNN nâng cấp 15 TTHC lên DVCTT (TTHC 2.001399) – chưa đủ thành phần hồ sơ, Chiều BTP→TTTT createPayment lỗi 500 TLS handshake_failure tới paygate-dev mbfs (chưa xử lý; chưa có testcase/BBNT) (+21 more)

### Community 7 - "VNPT & kho dùng chung"
Cohesion: 0.11
Nodes (25): Nhóm Tele: C12_NDOP_VNPT_NADAT, 18 API còn vướng mắc: SoTrichLuc bắt buộc; 9 API thiếu thẻ bọc Array; 9 API BTC còn cấu trúc gói tin (phải chuyển sang bản ghi theo BB 21/07/2026), Huệ (VNPT) chuyển công tác 03/11 – Sơn LV tiếp nhận đầu mối BA nhà V; Kim Anh phụ trách chung, Công văn gửi các Cục nghiệp vụ & BBN; CV số 3531/TTDLQG-P4, Hiện trạng 28/09: Kho DLTH cần 169 nhóm thông tin – đã làm việc 94 (64 không cung cấp, 30 đồng ý), còn 75, Nhóm rà soát UC Dữ liệu (Telegram), Clone NAS sang VM / copy dữ liệu NAS vào kho dùng chung (Clone_NAS_to_VM_20261102), 20260827_Nadat_VNPT_Coop Plan_NDOP.docx (Kế hoạch phối hợp NADAT-VNPT) (+17 more)

### Community 8 - "Quy trình triển khai NDC"
Cohesion: 0.11
Nodes (27): Công văn yêu cầu C06 cung cấp dữ liệu (cư trú cho D01, chỉ đạo điều hành cho VNPT), Họp với D01 12/09: thống nhất đấu nối trước ở DevTest (NDC chưa dựng xong), Bao cao cai dat ShareNode v20261106 / bao_cao_sharenode.txt (37/59 thành công), Báo cáo đề xuất việc chuyển dữ liệu ra/vào hệ thống (BCDX_CopyFile_TTDLQG_20261112.docx, căn cứ QĐ 548/QĐ-C12-P4), Điểm nghẽn: chuyển file vào hệ thống chậm (quét, copy qua P5, nhiều chữ ký), Điểm nghẽn: phiếu tường lửa mỗi lần 1-3 ngày, không có danh sách luật gộp từ đầu, Kho điều phối / Data Importer đặt tại DMZ (phiếu 32 chờ duyệt), Quy trình thực tế triển khai NDOP trên NDC – suy ra từ nhóm Viber NDOP_NDC_LHL_103NT (+19 more)

### Community 9 - "DMDC – tích hợp, điều phối"
Cohesion: 0.10
Nodes (24): 22102026_API Specs_DP_DMDC_DL Dân cư C06_v0.1, 20261110_BBNT_HTDMDC_TichHop_BTC_DieuPhoi_C06_BCT_v1, C12_TichHop_MS02_HTDMDC_BTC_APISpecs_v1.1.7, data_green_htdmdc_tc039, data_green_htdmdc_tc040 (119 bản ghi), DieuPhoi_APINoiBo_HTDMDC_C06 (v1.0.0/v1.0.6), DieuPhoi_APINoiBo_HTDMDC_DMDC_BCT (v1.0.0→v1.0.6), Lỗi 415 UNSUPPORTED_MEDIA_TYPE khi đẩy nhiều bản ghi liên tục (đã sửa) (+16 more)

### Community 10 - "Nhóm Viber NDC – 103NT"
Cohesion: 0.10
Nodes (22): bao_cao_sharenode.txt (06/11): 25 Bộ/ngành – 12 thành công; 34 tỉnh – 25 thành công; tổng 37/59, Cài VM + ShareNode tại AGN 36 đơn vị (Bộ/ngành, 34 tỉnh): 36/36 VM, 26/36 lên UI, Danh sách phiếu FW: 21 Jump/DMZ, 22 BKHCN (mẫu AGN→NDOP), 23 ShareNode DVC, 24 Thanh Hóa, 25 S3, 26 MoMo, 27 AgentNode tỉnh thành, 28 Egress IP, 29 FIS, 30 VPBank, 31 C06, 32 Data Importer DMZ, EGRESS IP OCP lỗi – phương án VNPT & C12.P4 (phiếu 28), Viber – NDOP_NDC_LHL_103NT (nhóm triển khai NDOP tại NDC), Quy định mới: đăng ký laptop với P5 mới được mang vào phòng IOC, S3 NDC: sizing bucket (C12 P4), đếm 827.460.508 file trong "bucket"; phân loại green/yellow theo path, Báo cáo ngày 12/11 của Lê Trí Hùng (ShareNode MoMo/VPBank/VNPAY) (+14 more)

### Community 11 - "Nhóm BA nội bộ (WhatsApp)"
Cohesion: 0.10
Nodes (26): Tiến độ team BA là bottleneck, trễ deadline SRS (31/08 → 12/09), Thiếu token / hết quota tài khoản Claude, Cách cấu hình sharenode.docx, NDOP_Checklist (rà soát UC theo TKCT), Nhóm WhatsApp ND_BA_NDOP, Đối soát / truy vết NDOP (TH-CS-ĐP), DVCCDV-Hướng dẫn tích hợp v30 - XML, Hướng dẫn sử dụng NDOP (HDSD tổng hợp 1.132 trang, 30/09) (+18 more)

### Community 12 - "VPBank"
Cohesion: 0.12
Nodes (24): BBNT SHB-HT QLTTTT final (nghiệm thu 03/11 tại 47 PVĐ), NDOP-C12-ThanhToan-VPBank (Telegram), BBNT VPB-HT QLTTTT 260605, Đề_xuất_triển_khai_HT_QLTTTT_VPBank_20_01_2026, Đối soát VPBank vẫn sai (chưa tách ngày cuối tuần), VPBank đề xuất lên live 22:00 ngày 31/07/2026 (MID/TID theo luồng phí-lệ phí-BHXH, thuế, kho bạc), Thanh toán C12 VpBank (Telegram), VP Bank - C12 (Telegram) (+16 more)

### Community 13 - "Sàn dữ liệu – FIS"
Cohesion: 0.13
Nodes (24): FIS chậm cấu hình IP đấu nối, VPN STS (vướng dựng firewall, phân vùng mạng), Yêu cầu demo sản phẩm Sàn (sếp Cương, thứ 4/5), Nhóm WhatsApp Sàn C12- TGDL FIS (test), Kết nôi NDC C12-FIS-backup.xlsx, Kết nối NDC C12-FIS.xlsx (Profile VPN, quy hoạch IP), Demo luồng offline Sàn–TGDL trước (bên bán thẩm định trước rồi upload), Quy hoạch IP kết nối C12-FIS: NAT sang dải 100.65.4.x, tunnel 100.65.126.25/26, 29_FIS.SDL_20261110_VDC_175_Dx_rule_Nadat_Phieu.docx (phiếu FW) (+16 more)

### Community 14 - "SHB"
Cohesion: 0.15
Nodes (16): NDC_Template_Đăng ký chia sẻ và khai thác SHB (file mapping API), Nhóm Tele: C12 - SHB kết nối DVCQG, A Dũng (TTTT D01 – PM HT TTTT), DuongBH (SHB), Hoàng Anh (Hoang_anh970), Hoàng Vũ Thuỷ (SHB), Ngọc Bích (SHB), Nguyễn Sỹ Chiến (SHB) (+8 more)

### Community 15 - "Bộ KHCN"
Cohesion: 0.15
Nodes (17): Nhóm Tele: Agent Node - Bộ KHCN, Mốc 31/10/2026: giọt dữ liệu đầu tiên (Nhiệm vụ KHCN từ STI/B.KHCN) vào Kho tập kết tại NDC, Phạm vi test nghiệm thu: Bộ KHCN; hệ thống DVC, Thanh toán, Quyết định 1762/QĐ-BKHCN 2025 danh mục CSDL chuyên ngành, Bỏ header data-enc khi đồng bộ (lệch tài liệu LGSP), Hướng dẫn tích hợp HT GQTTHC V20260828, Bộ Khoa học và Công nghệ (Bộ KHCN), Bộ Quốc phòng (BQP) (+9 more)

### Community 16 - "Thanh toán Sàn dữ liệu (VNTDO)"
Cohesion: 0.18
Nodes (14): Nhóm Tele: D01-NADAT-VNTDO Thanh toán SDL, TTTT triển khai chức năng Hoàn tiền bán phần (hủy biên lai gốc, xuất biên lai mới), Sàn đề nghị NADAT hỗ trợ rà quét dữ liệu cốt lõi/quan trọng (VNDATAX_NADAT_Data_classification), Đức Anh Lê (VNTDO – lead BA), DVCCDV-Hướng dẫn tích hợp v3.1 - XML, Giang NADAT (Dev), Giang (hg11022 – TTTT/MBFS), Hệ thống Quản lý Thanh toán tập trung (Cổng TTTT) (+6 more)

### Community 17 - "Dữ liệu sai khác (DA175)"
Cohesion: 0.21
Nodes (13): API_Spec_PAKN_SaiKhac_v2, Bao_cao_Thong_bao_du_lieu_sai_khac_KTDLCN_v3, BBH mô hình tổ chức XLDL sai khác 202611.pdf, DL-SK.drawio (mô hình luồng dữ liệu sai khác), QUY TRÌNH THEO DÕI XỬ LÝ DLSK-v0.1, Nhóm Tele: DA175- PAKN+PA-SaiKhac, Đỗ Đan (D01), PM khai thác dữ liệu chuyên ngành (KTDLCN) (+5 more)

### Community 18 - "Phân công BA & luồng TH"
Cohesion: 0.15
Nodes (17): BA tham gia hỗ trợ triển khai prod tại NDC (chỉ đạo BOD 11/10), Không dùng DVC của Hệ thống GQ TTHC BQP(BQG) và BCA khi thiết kế luồng điều phối (hệ thống đặc thù), Chia team keep track TH-ĐP-CS trên prod (NDC-LHL) và DevTest (22/10), Luồng liên thông: đăng ký khai sinh - thường trú (BHXH), Phân hệ Điều phối dữ liệu (ĐP), Phân hệ Quản trị hệ thống (QTHT), Phân hệ Tích hợp dữ liệu (TH), Quy trình tích hợp dữ liệu đơn vị vào NDOP (vai trò BA).docx (+9 more)

### Community 19 - "SSO C06 & mở mạng"
Cohesion: 0.22
Nodes (11): Phụ lục 5 Mẫu danh sách đính kèm (template đăng ký API), Nhóm Tele: C12 - C06 SSO - NDOP LHL - DVCQG.PAKN, Nhóm Tele: Demo sàn, Kết nối C12-VNPAY.xlsx (quy hoạch IP, tham số VPN), C12 Phòng 8, CS-16/17 SSO C06, Đặng Hoàng (D01), Do Uy (Gtel Network) (+3 more)

### Community 20 - "Cổng DVCQG – MBFS"
Cohesion: 0.17
Nodes (14): BBNT Tích hợp thanh toán Cổng DVCQG – HT QLTTTT qua NDOP (09102026), KeHoach_NghiemThu_DVCQG_TTTT_NDOP_v1_03102026, Kịch bản kiểm thử "NDOP Thanh Toán.xlsx" (MBFS QC), Tổ chức nghiệm thu tại 47 Phạm Văn Đồng (dự kiến 07/10, ký sau rà soát), [MBF-NADAT-C12] Tích hợp Cổng DVC QG (Telegram), pakn-expose-api-cong-dvc.docx, Bộ test case UAT cho 3 nền tảng tích hợp DVC với Bộ KHCN, 14102026_NADAT_CV_Triển khai NDC-v0.5 (+6 more)

### Community 21 - "D01 – PAKN, Cổng DVC"
Cohesion: 0.18
Nodes (15): 21 API PAKN cho Cổng DVC (qua https://gw.op.nadat.com.vn/pakn/); PAKN không gọi API nào của DVC, 11–12/11: QC PAKN gọi API đồng bộ danh mục nhưng NDOP chưa thấy log (DevTest), PAKN-NDOP-DVC # DevTest (Telegram), D01 – Mobifone / MBFS, Em Hiền Trung Kính – NADAT (kiểm tra log NDOP), khoa nguyen – dev Cổng DVCQG (D01), Mike_thanh – NADAT, Mr Tommy – D01 (Cổng DVCQG) (+7 more)

### Community 22 - "HT liên lạc (HTLL)"
Cohesion: 0.19
Nodes (9): Nhóm Tele: [C12] DVCQG - HTLL - NADAT, C12 P4 – Tổ 5, Dương Đoàn (C12 – Tổ 5 P4), Giang Nv (C12 – Tổ trưởng Tổ 5 P4), Mike Truong (TCT MBF), SMS Brandname, Tổng công ty Mobifone (TCT MBF), Teddy Nguyen (Bách – HT LLCNTC/Gtel) (+1 more)

### Community 23 - "Hiện trường NADAT & Bộ NNMT"
Cohesion: 0.20
Nodes (11): 13/11: MoMo, VPBank, C06 thông SSH 2222 từ NDC tới ShareNode (C06 IP LAN 100.64.2.13), Team BA NDOP (NADAT), Nhóm WhatsApp Về đích _ Bộ NNMT, Bảo Trung, C Trà COO NADAT, Đào Mạnh Tùng (NADAT – Dev CS), Lưu Phạm / Phạm Đức Lưu (NADAT – Dev ĐP), NADAT (+3 more)

### Community 24 - "Kho dùng chung (KHO-5.1)"
Cohesion: 0.23
Nodes (11): BAO_CAO_TIEN_DO_TICH_HOP_NDOP - v20261028.pdf, BaoCaoTienDo_KeHoachTrienKhai_27sep2026.pdf, Nhóm Tele: C12 - Nadat Quy hoạch, triển khai kho dùng chung, luồng dữ liệu, VM_yeu_cau_cap_phat_tai_nguyen_DV_S3_TAM_THOI_vung_ChuyenDung.xlsx, A Quang (NADAT – PM), BAO CAO TIEN DO TICH HỌP NDOP TTDLQG - v20261108.docx, Hiếu Phạm Minh (C12), KHO-5.1 Quy hoạch kho dùng chung, luồng dữ liệu (+3 more)

### Community 25 - "Luồng VPBank, VNPAY – TTTT"
Cohesion: 0.14
Nodes (10): BBNT VPB-HT QLTTTT-NADAT/NDOP (v1.1 → v2.0/v2.1 pass), Chờ VPBank mở WAF (cần NDA, ISD duyệt) – điểm tắc chiều TTTT→NDOP→VPBank, Lỗi NDOP: route_not_found, destination_not_allowed, upstream_failure "X-Road request failed", 405 (API xóa biên lai DELETE→POST), Nghiệm thu đấu nối TTTT–NDOP–VPBank trên DevTest 24/09 tại 47 PVĐ (họp thống nhất 23/09), File đối soát VNPAY xuất theo thời gian tạo QR thay vì thời gian giao dịch, IPN VNPAY gọi agent-ttdlqg bị "Request Rejected" (WAF) / Read timed out, Mã dịch vụ 8 – chỉ chi hộ qua TMCP (không KBNN/CITAD), không xuất biên lai, Luồng thanh toán VNPAY – Cổng TTTT (QR, IPN, chi hộ CITAD, đối soát) (+2 more)

### Community 26 - "Hiện trạng kết nối NDC 09/11"
Cohesion: 0.21
Nodes (14): Đã kết nối trên NDC: Cổng↔QLNNvDL, Cổng↔TTTT, Cổng↔PAKN, Hiện trạng kết nối NDOP 09/11: DMDC chưa mở rule; VNPOST & LLCNTC chưa đầu mối; Thanh Hóa & MoMo đã gửi phiếu chưa mở; B.KHCN thông FW tới AGN nhưng phần mềm chưa thông, HTTT_GQ_TTHC_Hệ_thống_Giải_quyết_TTHC_V20260828, Kết nối tiếp theo của Cổng DVCQG trên NDC: HT GQ TTHC Bộ KHCN, LLCNvTC (SMS), VPBank, ký số NEAC, LLCNTC_Tài_Liệu_Kỹ_Thuật_Kết_Nối_Đến_Hệ_Thống_2_2, MDSCCBS_API_CSKH_HDSD_2026 (SMS Brandname), MBFS-NADAT Nội bộ (Telegram), Chu Thái (+6 more)

### Community 27 - "VNPAY, BIDV & văn bản C12"
Cohesion: 0.22
Nodes (14): Thanh toán C12 VNPAY (Telegram), Thiếu tài khoản ESXi vào AgentNode (VNPAY, BIDV) → chưa cài ShareNode, CV MobiFone đề nghị phê duyệt kế hoạch cài đặt NDOP tại TTDLQG v0.5 (14/10), Anh Hoang – VNPAY, BIDV, Danh Dũng Nguyễn – network VNPAY, MobiFone, My Hang – VNPAY (+6 more)

### Community 28 - "Họp luồng sai khác"
Cohesion: 0.21
Nodes (9): BBH về luồng sai khác (03/11), Aequitas, BBH_20261105_Thống nhất mô hình luồng dữ liệu sai khác_Final, Đỗ Trung Thành (C12), Tiến Dũng / Dung Tien (C12 – PTP P4), D02 / Gtel ICT, Hoang Long (Gtel), Hoàng Nguyên (Gtel) (+1 more)

### Community 29 - "ShareNode & Central Server"
Cohesion: 0.19
Nodes (13): Lỗi cấu hình ShareNode B.KHCN: IMPORT CONFIGURATION ANCHOR (500) – định tuyến sai sang cổng 4000, NDC_Runbook đăng ký SS vào CS + ShareNode mô hình kết nối v4, Phân hệ Chia sẻ dữ liệu (CS), Cổng chuẩn ShareNode: SSH 2222, HTTP 4000, peer mTLS 5500, NDC_Runbook đăng ký ShareNode vào Central Server, MoMo: ShareNode 100.64.0.29 – 13/11 thông SSH, cổng 5500 còn vướng (18 ngày từ họp đầu), API Gateway, Central Server (nền tảng chia sẻ) (+5 more)

### Community 30 - "Sửa CVE, mTLS ShareNode"
Cohesion: 0.18
Nodes (10): Điểm tắc mTLS: F5 chỉ cho L7, không TLS passthrough – ShareNode B.KHCN không verify được CA ShareNode DVC, BAN-GIAO-CHUC-NANG-NDOP.xlsx, Chưa rõ cấu hình ShareNode lên v2 (1 tuần không tiến triển), Quy trình 9 bước chuyển đổi API Stateless (targetURL) sang Stateful trên NDOP/APIC, Team Dev/DevOps NADAT chia 3 team (22/10), DA175_NDOP_Hướng dẫn… (tài liệu ShareNode, không tải được), Quân (scrum master NADAT), DoThuat (+2 more)

### Community 31 - "Thanh toán Cổng DVCQG – TTTT"
Cohesion: 0.27
Nodes (11): Danh sách 10 API thanh toán (createPayment, checkStatus, retrieveReceipt, refunds, IPN update-payment-status, refund/update-status, get-category, reconciliation, list-department, department-fee-account), DVCCDV-Hướng dẫn tích hợp v3.0 - XML, DVCQG-Payment-API-Specification, Họp 09/10 thống nhất kịch bản nghiệm thu Cổng DVCQG – NDOP – Cổng TTTT, QC gọi API đầu Cổng (check-dossier-payment-status) không có trong đặc tả NDOP, DVC-NDOP-TTTT # DevTest (Telegram), TTTT-NADAT-DVC.docx, BBNT_DVCQG_QLTTTT_NDOP_v1.0_02102026 (khởi thảo bởi NADAT) (+3 more)

### Community 32 - "Bộ KHCN – Cổng DVCQG"
Cohesion: 0.20
Nodes (8): Chờ mở firewall (lệnh đã duyệt, thực hiện chậm), Core DVC → DMZ NDOP (F5 :5500) báo connection reset – phải đi qua 10.6.40.36:5500 và set host, DLP/Endpoint trên máy Jump chặn cấu hình, Mốc 08/11: đấu thông B.KHCN để test HT GQ TTHC và NEAC sang DVCQG; 12/11 login xuống được, OCP Egress lỗi do hạ tầng thay đổi (06/11), Sự cố kênh quang đầu AGN B.KHCN (29/10), Luồng Cổng DVCQG ↔ HT GQ TTHC & NEAC Bộ KHCN qua NDOP, Quyết Nguyễn Xuân (D01 – PGĐ)

### Community 33 - "Công cụ BA & prototype"
Cohesion: 0.25
Nodes (8): Bất cập NADAT Design: chậm, nóng máy, mất tính năng khi chuyển, tạo MR lâu, GitLab nadat/ndop_ba_harness (merge request BA), Trang chủ / Dashboard / Giám sát NDOP, NADAT Design (open-design) – công cụ prototype BA, anh Quang, Ngọc Anh (AI coding, NADAT), Tung UIUX, Yen Nguyen

### Community 34 - "103NT vs NDC Hòa Lạc"
Cohesion: 0.38
Nodes (6): CV C12 chuyển hạ tầng từ Nguyễn Tuân về NDC Hòa Lạc (yêu cầu trước 10/10), Văn bản 4229/C12-P4 (07/10/2026) – kết nối hệ thống chính thức tại TTDLQG Hòa Lạc, AGN VPBank IP LAN 100.64.1.20 đổi sang 100.64.1.22 (do .20 đang chạy dịch vụ khác), Kênh VPBank ↔ C12 Hòa Lạc: VPLS/MPLS L2 FPT, IPsec IKEv2; NAT VPBank 100.65.2.0/25, C12 100.65.2.128/25, Hệ thống thí điểm 103 Nguyễn Tuân (103NT), NDC Hòa Lạc (LHL) – TTDLQG

### Community 35 - "Tài liệu Input dự án"
Cohesion: 0.29
Nodes (7): Tài liệu dự án (thư mục Input), CS-M1 / CS-M3-UC – Nền tảng Chia sẻ, ĐP-M1 / ĐP-M3-UC – Nền tảng Điều phối, Non requirements NDOP – yêu cầu phi chức năng, NDOP_QL Đơn vị TH ĐP CS – sheet theo dõi cũ, TH-M1 / TH-M3-UC – Nền tảng Tích hợp, TKCT v6 – Thiết kế chi tiết tổng thể

### Community 36 - "Sàn dữ liệu – NEAC"
Cohesion: 0.33
Nodes (6): WhatsApp – NADAT-SÀN DỮ LIỆU, Tài liệu NEAC (CamScanner 16-7-26), Chị Trà COO NADAT, LÊ SỸ DŨNG – lãnh đạo NADAT, NEAC – hệ thống chữ ký số (Bộ KHCN), Nhung (Sàn dữ liệu)

## Ambiguous Edges - Review These
- `C12 – Trung tâm Dữ liệu quốc gia (TTDLQG, Bộ Công an)` → `Hoàng Anh (Hoang_anh970)`  [AMBIGUOUS]
  06_Nguon/GhiChu_DocChat_13-11-2026.md · relation: conceptually_related_to
- `C12 – Trung tâm Dữ liệu quốc gia (TTDLQG, Bộ Công an)` → `Question (quản trị nhóm)`  [AMBIGUOUS]
  06_Nguon/chat_day_du/Zalo_PC/c12-tgpl-nhom-trao-doi.txt · relation: conceptually_related_to
- `D01 – Mobifone / MBFS` → `LongLV / Long Lê Văn`  [AMBIGUOUS]
  06_Nguon/GhiChu_DocChat_13-11-2026.md · relation: conceptually_related_to
- `D02 / Gtel ICT` → `Bùi Quang Bình`  [AMBIGUOUS]
  06_Nguon/chat_day_du/Telegram/ha-tang-tpbank-c12.txt · relation: conceptually_related_to
- `D02 / Gtel ICT` → `Hoàng Anh (Hoang_anh970)`  [AMBIGUOUS]
  06_Nguon/chat_day_du/Telegram/c12-shb-ket-noi-dvcqg.txt · relation: conceptually_related_to
- `D02 / Gtel ICT` → `Linh Ngo – BA/kho dữ liệu (cấu hình topic tại TTDLQG)`  [AMBIGUOUS]
  06_Nguon/chat_day_du/Telegram/xay-dung-tai-lieu-dac-ta-ky-thuat-bxd-ttdlqg.txt · relation: conceptually_related_to
- `D02 / Gtel ICT` → `LongLV / Long Lê Văn`  [AMBIGUOUS]
  06_Nguon/chat_day_du/Telegram/da175-pakn-pa-saikhac.txt · relation: conceptually_related_to
- `VNPT` → `Ngọc Trâm – Kho dùng chung`  [AMBIGUOUS]
  06_Nguon/chat_day_du/Telegram/nhom-ra-soat-uc-du-lieu.txt · relation: conceptually_related_to
- `MoMo` → `Hưng Bảo – điều phối MoMo x C12`  [AMBIGUOUS]
  06_Nguon/chat_day_du/Telegram/momo-x-c12-cai-dat-server-cho-cong-dvcqg.txt · relation: conceptually_related_to
- `MoMo` → `Sàn dữ liệu (SDL)`  [AMBIGUOUS]
  06_Nguon/chat_day_du/Telegram/d01-nadat-vntdo-thanh-toan-sdl.txt · relation: conceptually_related_to
- `Bộ Tư pháp (BTP)` → `Lưu Huy Hoàng`  [AMBIGUOUS]
  06_Nguon/chat_day_du/Zalo_PC/btp-nadat-htql-tttt.txt · relation: conceptually_related_to
- `Ngân hàng Nhà nước (NHNN)` → `Lưu Huy Hoàng`  [AMBIGUOUS]
  06_Nguon/chat_day_du/Zalo/dvcqg-vs-nhnn.txt · relation: conceptually_related_to
- `Quốc Lê (Anh Quốc CTO NADAT)` → `Bộ Quy chuẩn NDOP (trạng thái-mã lỗi, đặt mã, RequestID, luồng DL kho/dịch vụ, đối soát, thông báo sự kiện)`  [AMBIGUOUS]
  06_Nguon/chat_day_du/WhatsApp/nd-ba-ndop.txt · relation: references
- `Nam Nguyen (NADAT)` → `Backward compatibility: BN thêm thẻ bọc cho dữ liệu mới, Kho lọc theo timestamp`  [AMBIGUOUS]
  06_Nguon/GhiChu_DocChat_13-11-2026.md · relation: conceptually_related_to
- `Yen Nguyen` → `anh Quang`  [AMBIGUOUS]
  06_Nguon/chat_day_du/WhatsApp/nd-ba-ndop.txt · relation: conceptually_related_to
- `Chi cục Hàng hải và Đường thuỷ phía Bắc` → `VIMAWA (tiền tố mã bản ghi – Cục Hàng hải và Đường thủy Việt Nam)`  [AMBIGUOUS]
  08_TaiLieu_TheoDonVi/01_Bộ, ngành/Bộ Xây dựng/Do đơn vị gửi/data_green_g17_giaychungnhanthuyenvien.txt · relation: conceptually_related_to

## Knowledge Gaps
- **126 isolated node(s):** `Bộ Quốc phòng (BQP)`, `Tổng công ty Mobifone (TCT MBF)`, `Môi trường UAT`, `Hướng dẫn vận hành NDOP – Tích hợp (draft 1.1)`, `Tài liệu triển khai luồng tích hợp G01` (+121 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 144 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `NDOP – Nền tảng tích hợp, chia sẻ, điều phối dữ liệu` connect `Tổng quan NDOP & hệ thống trong NDC` to `C12 & rà soát dữ liệu Bộ, ngành`, `MoMo, TPBank & phân công BA`, `Tài liệu quản lý đấu nối`, `NHNN`, `VNPT & kho dùng chung`, `DMDC – tích hợp, điều phối`, `Nhóm Viber NDC – 103NT`, `Nhóm BA nội bộ (WhatsApp)`, `SHB`, `Bộ KHCN`, `Thanh toán Sàn dữ liệu (VNTDO)`, `Dữ liệu sai khác (DA175)`, `Phân công BA & luồng TH`, `SSO C06 & mở mạng`, `Hiện trường NADAT & Bộ NNMT`, `Kho dùng chung (KHO-5.1)`, `Luồng VPBank, VNPAY – TTTT`, `Hiện trạng kết nối NDC 09/11`, `ShareNode & Central Server`, `Sửa CVE, mTLS ShareNode`, `Thanh toán Cổng DVCQG – TTTT`, `Bộ KHCN – Cổng DVCQG`, `Công cụ BA & prototype`, `103NT vs NDC Hòa Lạc`?**
  _High betweenness centrality (0.173) - this node is a cross-community bridge._
- **Are the 34 inferred relationships involving `NDOP – Nền tảng tích hợp, chia sẻ, điều phối dữ liệu` (e.g. with `Cổng Dịch vụ công quốc gia (DVCQG)` and `CS-01/CS-13 PAKN–Cổng DVC–CSDL TTHC (DevTest)`) actually correct?**
  _`NDOP – Nền tảng tích hợp, chia sẻ, điều phối dữ liệu` has 34 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Bộ Quốc phòng (BQP)`, `Tổng công ty Mobifone (TCT MBF)`, `Môi trường UAT` to the rest of the system?**
  _126 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Tổng quan NDOP & hệ thống trong NDC` be split into smaller, more focused modules?**
  _Cohesion score 0.0506872852233677 - nodes in this community are weakly interconnected._
- **Why does `C12 – Trung tâm Dữ liệu quốc gia (TTDLQG, Bộ Công an)` connect `C12 & rà soát dữ liệu Bộ, ngành` to `Tổng quan NDOP & hệ thống trong NDC`, `Bộ Xây dựng – dữ liệu mẫu`, `MoMo, TPBank & phân công BA`, `Tài liệu quản lý đấu nối`, `NHNN`, `Quy trình triển khai NDC`, `Nhóm Viber NDC – 103NT`, `VPBank`, `Sàn dữ liệu – FIS`, `SHB`, `Thanh toán Sàn dữ liệu (VNTDO)`, `Dữ liệu sai khác (DA175)`, `SSO C06 & mở mạng`, `HT liên lạc (HTLL)`, `Kho dùng chung (KHO-5.1)`, `VNPAY, BIDV & văn bản C12`, `Họp luồng sai khác`, `Sửa CVE, mTLS ShareNode`?**
  _High betweenness centrality (0.136) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `C12 – Trung tâm Dữ liệu quốc gia (TTDLQG, Bộ Công an)` and `Hoàng Anh (Hoang_anh970)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `C12 – Trung tâm Dữ liệu quốc gia (TTDLQG, Bộ Công an)` and `Question (quản trị nhóm)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._