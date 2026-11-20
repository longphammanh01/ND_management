# Bối cảnh dự án – Quản trị đấu nối NDOP

*Cập nhật: 19/11/2026. Viết cho người (hoặc tài khoản Claude) mới tiếp nhận.*

## 1. Dự án là gì
- **NDOP** – Nền tảng tích hợp, chia sẻ, điều phối dữ liệu của **TTDLQG / C12, Bộ Công an**. NADAT là nhà thầu triển khai.
- Việc chính của đội BA: theo dõi **đấu nối** NDOP với từng bên (bộ ngành, địa phương, phần mềm nội bộ, doanh nghiệp) qua 2 môi trường:
  - **DevTest / 103NT** – môi trường thử nghiệm.
  - **NDC** (Hoà Lạc) – môi trường chính thức.
- Mỗi luồng đấu nối đi qua các bước: nhận **API Specs** (tài liệu tiên quyết) → cấu hình → mở mạng (Firewall, port) → kiểm thử (testcase) → ký **BBNT** (biên bản nghiệm thu).
- Người dùng chính: BA/PO/PM của NADAT, không lập trình. Trả lời bằng tiếng Việt, ngôn ngữ nghiệp vụ.

## 2. Công cụ đã dựng
| Thành phần | Ở đâu | Ghi chú |
|---|---|---|
| Trang theo dõi "Quản trị NDOP" | https://claude.ai/artifact/CvCUHjfqp7Ye1545k7v3xH | Trang Claude Artifact, chia sẻ trong tổ chức. Dữ liệu lưu trong cơ sở dữ liệu của trang. |
| Mã nguồn trang | `harness/02_trang-web/src` | Dựng bằng `build2.py` (xem `02_trang-web/HUONG_DAN.md`). |
| Bản sao dữ liệu trang | `harness/03_du-lieu` | Ảnh chụp ngày 19/11/2026, mỗi tài liệu một file JSON (tên file = mã tài liệu). |
| Agent quét chat | `harness/04_tu-dong-hoa/agents` (bản gốc ở `.claude/agents` của dự án) | Telegram, WhatsApp + Zalo, máy tính (Viber, Zalo PC), tổng hợp. |
| Tác vụ quét theo lịch | `harness/04_tu-dong-hoa/tac-vu-quet-chat/SKILL.md` (bản gốc ở `~/.claude/scheduled-tasks/cap-nhat-dau-noi-ndop`) | Chạy khi trên trang bấm "Ghi yêu cầu quét". |
| Tài liệu theo đơn vị | `NDOP_QuanLy_DauNoi/08_TaiLieu_TheoDonVi` | Không chép vào harness (185 MB) – nằm sẵn trong thư mục dự án. |
| Bản chép chat đầy đủ | `NDOP_QuanLy_DauNoi/06_Nguon/chat_day_du/<nền tảng>/` | Chỉ nối thêm, không bao giờ ghi đè. |
| Sơ đồ tri thức graphify | `harness/01_tri-thuc/graphify-out` | Mở `graph.html`; hỏi đáp bằng skill graphify. |

## 3. Các mục trên trang
- **Tổng quan**: ô quét chat; đề xuất chờ duyệt (Sửa/Duyệt/Bỏ, Duyệt tất cả/Bỏ tất cả – bấm 2 lần); chỉ số; ma trận đơn vị × môi trường; "Cần gỡ gấp"; "Thay đổi 7 ngày qua".
- **Đơn vị**: danh mục 84 đơn vị có STT, chia nhóm (Bộ ngành, Địa phương, Phần mềm nội bộ – 23 hệ thống, Doanh nghiệp, Nội bộ NDC); cột API Specs; lọc "Thiếu thông tin / Chưa có API Specs / Chưa có luồng / Chưa có nhóm chat / Chưa có đầu mối"; bấm vào đơn vị mở ngăn chi tiết (Luồng, Stakeholder, Nhóm chat, Tài liệu, link thư mục Drive).
- **Việc của tôi**, **Mở mạng NDC** (kanban kéo thả), **Báo cáo tuần** (chép báo cáo).
- **Tra cứu**: Stakeholder (người, tài khoản chat, người đã nghỉ), Nhóm chat (lọc theo nền tảng có màu), Tài liệu (cây thư mục theo máy + tab "Hệ thống & tài khoản" – liên kết, tài khoản dev/test bấm là chép), Quy trình (tương tác).
- Menu trái thu gọn được (« / »), bảng cuộn riêng và cố định dòng tiêu đề.

## 4. 23 phần mềm nội bộ (đánh số dùng cho thư mục)
01 DVC (Cổng DVC quốc gia) · 02 DMDC · 03 SHTT · 04 TTTT · 05 ĐCS · 06 CĐĐH · 07 PAKN · 08 DLCN · 09 HTLL · 10 TTCN · 11 QLNNDL · 12 SDL (Sàn dữ liệu) · 13 QPTDL · 14 KDLTH · 15 PTDL · 16 KDLM · 17 CDLM · 18 QT BMĐKN · 19 CSDL TTHC · 20 UDDĐ · 21 VNeID (SSO) (C06) · 22 TGDL · 23 NEAC.
Doanh nghiệp: 01 MoMo · 02 VNPAY · 03 VPBank · 04 TPBank · 05 SHB · 06 BIDV · 07 NAPAS.

## 5. Nguồn thông tin
- Chat (chỉ đọc): Telegram (folder "NDOP" + "VP Bank - C12"), WhatsApp (4 nhóm), Zalo (nhóm gắn thẻ "Khách hàng" – đọc web trước, không được thì Zalo máy tính), Viber (folder "NDOP" + "NDOP_NDC_LHL_103NT" – nội bộ NADAT).
- Thư mục BA DOCS: `C:\Users\admin\Downloads\Đấu nối với các bên - BA DOCS` (đã lọc trùng và chép vào 08 ngày 19/11; nhật ký `08_TaiLieu_TheoDonVi/_NhatKy_DiChuyen_19-11-2026.csv`).
- Tài liệu dự án: `Input/`, các file SRS/HDSD ở thư mục gốc dự án.

## 6. Việc còn mở (19/11/2026)
- Nút "Duyệt tất cả" chưa thử với đề xuất thật (lúc thêm không còn đề xuất chờ).
- 5 tệp BA DOCS trùng tên nhưng khác nội dung đang giữ bản cũ: DVTT v2.3, DVCCDV v3.0, DVCQG-Payment-API-Specification, Kế hoạch nghiệm thu DVC-TTTT, Tài liệu tích hợp DMDC v0.1.
- Loại tài liệu của 28 tệp mới từ BA DOCS do Claude gán theo tên, có thể cần chỉnh.
- Màn hình hẹp (điện thoại) chưa kiểm tra sau các thay đổi giao diện ngày 19/11.
