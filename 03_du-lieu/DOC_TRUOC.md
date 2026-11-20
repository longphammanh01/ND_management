# Bản sao dữ liệu trang – 19/11/2026

- Mỗi thư mục là một nhóm dữ liệu (collection), mỗi file là một tài liệu; **tên file (bỏ `.json`) là mã tài liệu**. Ý nghĩa các trường: `../01_tri-thuc/CAU_TRUC_DU_LIEU.md`.
- 262 tài liệu: luong 31 · donvi 84 · nguoi 25 · nhomchat 45 · tailieu 4 · dexuat 22 · nhatky 22 · momang 14 · lienket 14 · yeucau 1 (quytrinh trống).
- Khôi phục lên trang Claude: dùng ArtifactData `set` với `file_path` từng file (hoặc `batch`, tối đa 50 tài liệu/lần).
- Nạp vào Cloudflare: `../05_trien-khai-cloudflare/build_web.py` tự tạo `seed.sql` từ thư mục này.

⚠️ `lienket/` có **mật khẩu môi trường dev/test**. Không đưa lên nơi công khai.
