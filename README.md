# Harness – toàn bộ tri thức "Quản trị đấu nối NDOP"

Xuất ngày **19/11/2026**. Thư mục này gom mọi thứ cần để một người hoặc một tài khoản Claude khác hiểu và làm tiếp công việc quản trị đấu nối NDOP, kể cả những phần trước đây chỉ nằm trên máy/tài khoản cũ.

## Cấu trúc
| Thư mục | Có gì | Đọc khi nào |
|---|---|---|
| `CLAUDE.md` | Hướng dẫn cho Claude (tài khoản mới) – tự đọc khi mở thư mục | Luôn |
| `01_tri-thuc/` | `BOI_CANH_DU_AN.md` (dự án, công cụ, việc còn mở) · `QUY_UOC_VA_NGUOI.md` (quy ước bắt buộc, ghép người) · `CAU_TRUC_DU_LIEU.md` · `LICH_SU_CONG_VIEC.md` · `tri-nho/` (trí nhớ Claude) · `graphify-out/` (sơ đồ tri thức, mở `graph.html`) | Đầu tiên |
| `02_trang-web/` | Mã nguồn trang + bản đã dựng (giống hệt bản đang đăng) + cách dựng/đăng lại | Khi sửa giao diện |
| `03_du-lieu/` | Bản sao toàn bộ dữ liệu trang (262 tài liệu, 10 nhóm) | Khôi phục / chuyển máy chủ |
| `04_tu-dong-hoa/` | 4 agent quét chat, tác vụ quét theo lịch, quy tắc quét, công cụ (đồng bộ cây thư mục, mở prototype) | Khi cài trên máy mới |
| `05_trien-khai-cloudflare/` | Bộ đưa trang lên máy chủ riêng (Cloudflare), đã chạy thử trên máy | Khi muốn độc lập với Claude |
| `06_lich-su-tro-chuyen/` | Toàn bộ trao đổi với Claude (phiên trước + phiên hiện tại, kèm agent con) | Khi cần tra lại vì sao đã làm vậy |

## Những gì KHÔNG nằm trong harness (vẫn ở thư mục dự án)
- `NDOP_QuanLy_DauNoi/08_TaiLieu_TheoDonVi` – tài liệu theo đơn vị (185 MB).
- `NDOP_QuanLy_DauNoi/06_Nguon/chat_day_du` – bản chép chat đầy đủ.
- `Input/`, các file SRS/HDSD dự án.
Khi chuyển máy, chép cả thư mục `Train AI NDOP`, không chỉ `harness`.

## Tài khoản khác tiếp tục làm thế nào
1. **Quyền trên trang**: chủ trang mở https://claude.ai/artifact/CvCUHjfqp7Ye1545k7v3xH → **Share** → cấp quyền sửa cho tài khoản mới (cùng tổ chức). Không có bước này, tài khoản mới chỉ xem được.
2. **Mở thư mục dự án** `Train AI NDOP` trong Claude Code bằng tài khoản mới. Claude tự đọc `CLAUDE.md` ở thư mục gốc → được dẫn sang `harness/CLAUDE.md`.
3. **Cài tự động hoá** (nếu tài khoản mới sẽ quét chat): làm theo `04_tu-dong-hoa/HUONG_DAN.md`.
4. Muốn độc lập hẳn với Claude: `05_trien-khai-cloudflare/HUONG_DAN.md`.

## Bảo mật
- `03_du-lieu/lienket` chứa **mật khẩu môi trường dev/test**; `06_lich-su-tro-chuyen` chứa toàn bộ nội dung trao đổi (có tên người, nội dung chat công việc). **Không đưa thư mục harness lên nơi công khai** (GitHub công khai, link chia sẻ mở…).
- Các đường dẫn trong agent/công cụ đang là `D:\[NADAT]\Project\NDOP\Train AI NDOP\…`. Máy mới đặt thư mục khác thì cần sửa đường dẫn (xem `04_tu-dong-hoa/HUONG_DAN.md`).

## Làm mới harness
Khi trang hoặc dữ liệu thay đổi nhiều, yêu cầu Claude: "xuất lại harness" – Claude chép lại mã nguồn trang, xuất lại dữ liệu và cập nhật `01_tri-thuc`.
