# Cài tự động hoá trên máy / tài khoản mới

## Thành phần
- `agents/` – 4 agent: `quet-chat-telegram`, `quet-chat-whatsapp-zalo`, `quet-chat-may-tinh` (Viber, Zalo PC – điều khiển màn hình), `tong-hop-quet-chat` (gộp kết quả, đưa đề xuất lên trang).
- `tac-vu-quet-chat/SKILL.md` – tác vụ điều phối (chạy khi trên trang bấm "Ghi yêu cầu quét"; có bước đồng bộ cây thư mục). `QUY_TRINH_QUET.md` là bản cũ, chỉ tham khảo.
- `cong-cu/_QuyTac_QuetChat.md` – quy tắc chung của các agent (bản gốc: `NDOP_QuanLy_DauNoi/06_Nguon/`).
- `cong-cu/dong_bo_cay_thu_muc.py` – lấy danh sách thư mục `08_TaiLieu_TheoDonVi` cho cây Tài liệu trên trang.
- `cong-cu/Chay_Prototype_BA.bat`, `mo_prototype.ps1`, `Dang_ky_nut_Mo_prototype.reg`, `Go_bo_nut_Mo_prototype.reg` – nút "Mở" prototype BA (máy chủ cục bộ 127.0.0.1:8701/8702).

## Cài đặt
1. **Agent**: đã nằm trong thư mục dự án `Train AI NDOP\.claude\agents\` → mở dự án bằng Claude Code là có. (Nếu mất, chép từ `agents/` vào đó.)
2. **Tác vụ quét theo lịch**: tác vụ nằm theo tài khoản/máy, không đi theo thư mục. Trong Claude Code của tài khoản mới, yêu cầu: "tạo scheduled task `cap-nhat-dau-noi-ndop` theo nội dung file `harness/04_tu-dong-hoa/tac-vu-quet-chat/SKILL.md`".
3. **Nút Mở prototype**: người dùng tự bấm đúp `Dang_ky_nut_Mo_prototype.reg` (thay đổi registry – Claude không tự chạy). Đường dẫn trong file .reg và `mo_prototype.ps1` đang trỏ tới `D:\[NADAT]\Project\NDOP\Train AI NDOP\NDOP_QuanLy_DauNoi\web\` – máy khác thư mục thì sửa lại.
4. **Đăng nhập các nền tảng chat** trên trình duyệt (Telegram web, WhatsApp web, Zalo web) và ứng dụng Viber / Zalo PC: người dùng tự đăng nhập; agent chỉ đọc.

## Đường dẫn cứng cần sửa nếu đổi thư mục
Tìm và thay `D:\[NADAT]\Project\NDOP\Train AI NDOP` trong: `agents/*.md`, `tac-vu-quet-chat/SKILL.md`, `cong-cu/_QuyTac_QuetChat.md`, `cong-cu/dong_bo_cay_thu_muc.py`, `cong-cu/mo_prototype.ps1`, `cong-cu/*.reg`.
