---
name: cap-nhat-dau-noi-ndop
description: Khi có yêu cầu từ nút "Ghi yêu cầu quét" trên trang Đấu nối NDOP, điều phối các agent quét chat NDOP song song (chỉ đọc) rồi đưa kết quả lên trang dưới dạng đề xuất chờ duyệt.
---

Tác vụ này chỉ quét chat khi người dùng ghi yêu cầu trên trang "Đấu nối NDOP" (https://claude.ai/artifact/CvCUHjfqp7Ye1545k7v3xH). Nếu lần chạy này do người dùng bấm "Run now" thì coi như có yêu cầu.
Thư mục dự án: `D:\[NADAT]\Project\NDOP\Train AI NDOP`. Quy tắc chung: `NDOP_QuanLy_DauNoi\06_Nguon\_QuyTac_QuetChat.md`.

BƯỚC 0 – kiểm tra yêu cầu: ArtifactData (nạp bằng ToolSearch "select:ArtifactData"), action "get", collection "yeucau", doc_id "quet".
- trang_thai KHÔNG phải "cho" (và không phải Run now): trả lời đúng một dòng "Không có yêu cầu quét." rồi dừng.
- trang_thai "dang_chay" và bat_dau cách hiện tại hơn 90 phút: xử lý như "cho".

BƯỚC 1 – nhận việc: update yeucau/quet (kèm if_version): {trang_thai:"dang_chay", bat_dau:<ISO>}. Tạo thư mục `RUN_DIR = D:\[NADAT]\Project\NDOP\Train AI NDOP\NDOP_QuanLy_DauNoi\06_Nguon\quet\<yyyymmdd-hhmm>`. Đọc collection "nhomchat" để lấy danh sách nhóm và `doc_cuoi` theo nền tảng.

BƯỚC 2 – quét song song: gọi CÙNG MỘT LÚC (cùng một tin nhắn, nhiều lệnh Agent) 3 agent:
- `quet-chat-telegram` – nhóm Telegram.
- `quet-chat-whatsapp-zalo` – nhóm WhatsApp và Zalo (Zalo đọc web trước).
- `quet-chat-may-tinh` với PHAN = "viber" – nhóm Viber.
Mỗi lời giao việc ghi rõ RUN_DIR và danh sách nhóm kèm doc_cuoi. Nếu không gọi được agent theo tên (subagent_type), dùng agent "general-purpose" và mở đầu lời giao việc bằng: "Read file D:\[NADAT]\Project\NDOP\Train AI NDOP\.claude\agents\<tên agent>.md và làm đúng theo đó."
Nếu Chrome không cho hai agent web chạy song song ổn định (lỗi tab, xung đột), chạy lại agent web bị lỗi sau khi agent kia xong.

BƯỚC 3 – Zalo dự phòng: khi `quet-chat-whatsapp-zalo` xong, đọc `can_doc_may_tinh` trong file kết quả của nó. Có nhóm thì gọi `quet-chat-may-tinh` với PHAN = "zalo" và đúng danh sách nhóm đó — chỉ sau khi lần `quet-chat-may-tinh` PHAN "viber" đã xong (hai lần không được chạy cùng lúc vì dùng chung màn hình).

BƯỚC 4 – tổng hợp: khi mọi agent quét xong, gọi `tong-hop-quet-chat` với RUN_DIR.

BƯỚC 4b – đồng bộ cây thư mục Tài liệu (luôn làm, kể cả khi không có tin mới): chạy `python -I "D:\[NADAT]\Project\NDOP\Train AI NDOP\NDOP_QuanLy_DauNoi\06_Nguon\dong_bo_cay_thu_muc.py" "<RUN_DIR>\cay_thu_muc.json"`. Sau đó ArtifactData "get" collection "tailieu", doc_id "cay" để lấy version, rồi "set" doc đó với file_path = file vừa tạo và if_version = version vừa đọc (chưa có doc thì set không kèm if_version). Lỗi ở bước này chỉ ghi vào tom_tat, không dừng cả lần chạy.

BƯỚC 5 – báo kết quả: update yeucau/quet: {trang_thai:"xong", ket_thuc:<ISO>, tom_tat:"<1–2 câu: số nhóm đã đọc theo nền tảng, số đề xuất chờ duyệt, nhóm bỏ qua>"}. Lỗi không làm tiếp được: {trang_thai:"loi", ket_thuc:<ISO>, tom_tat:"<lý do>"}. Báo cáo cuối lấy theo báo cáo của agent tổng hợp.

Ghi chú: file `QUY_TRINH_QUET.md` cùng thư mục là bản cũ (quét tuần tự, sửa thẳng luồng), chỉ để tham khảo mẹo đọc từng nền tảng; quy tắc trong `_QuyTac_QuetChat.md` và các file agent được ưu tiên.
