# Mã nguồn trang "Quản trị NDOP"

## Thành phần
- `src/css_v9.css` – giao diện nền (màu, chữ, bảng).
- `src/v10/` – các phần của trang:
  - `body.html` (khung trang, menu), `qt_section.html` (mục Quy trình), `css_add.css` (giao diện bổ sung)
  - `app.js` (lõi: tải dữ liệu, Tổng quan, Đơn vị, Việc của tôi, Mở mạng, Báo cáo, Stakeholder, Nhóm chat)
  - `edit.js` (form sửa luồng), `qt.js` (Quy trình), `docs.js` (cây Tài liệu, nút Mở), `links.js` (Hệ thống & tài khoản), `actions.js` (Sửa/Xoá mọi nơi, Duyệt tất cả, thu gọn menu), `dv.js` (danh mục đơn vị)
  - `build2.py` – ghép tất cả thành một trang.
- `src/cong-cu-mot-lan/` – các script đã dùng một lần (nhập BA DOCS, đánh số thư mục, tạo thư mục đơn vị…), giữ để tra cứu cách đã làm.
- `dau-noi-ndop.html` – trang đã dựng, đúng bản đang đăng (phiên bản 38, 19/11/2026).

## Dựng lại trang
```powershell
python "harness\02_trang-web\src\v10\build2.py" "harness\02_trang-web\src" "harness\02_trang-web\dau-noi-ndop.html"
```
(Chạy từ thư mục `Train AI NDOP`. Lệnh cũng tạo `src/v10/check.js` để kiểm tra lỗi cú pháp bằng `node --check`.)

Đã kiểm tra ngày 19/11: dựng lại từ thư mục này ra **giống hệt từng byte** với bản đang đăng.

## Đăng lại lên Claude
Trong Claude Code, yêu cầu: "đăng file `harness/02_trang-web/dau-noi-ndop.html` lên artifact https://claude.ai/artifact/CvCUHjfqp7Ye1545k7v3xH". Tài khoản đó phải được chủ trang cấp **quyền sửa** (nút Share trên trang); không có quyền sửa thì chỉ đăng được một trang mới (dữ liệu trống).

## Chạy ngoài Claude
Trang gọi `window.claude.use("db")` và `window.claude.use("user")` – chỉ có khi chạy trong claude.ai. Muốn chạy trên máy chủ riêng, xem `05_trien-khai-cloudflare/HUONG_DAN.md` (có lớp thay thế cho hai hàm này).
