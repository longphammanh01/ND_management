# Hướng dẫn cho Claude – Quản trị đấu nối NDOP

Bạn đang tiếp nhận công việc quản trị đấu nối NDOP từ một phiên Claude trước. Trước khi làm bất cứ việc gì:

1. Đọc `harness/01_tri-thuc/BOI_CANH_DU_AN.md` và `harness/01_tri-thuc/QUY_UOC_VA_NGUOI.md` (bắt buộc). Khi cần đọc/ghi dữ liệu trang, đọc `harness/01_tri-thuc/CAU_TRUC_DU_LIEU.md`.
2. Người dùng là BA/PO/PM của NADAT, **không lập trình**: trả lời **tiếng Việt**, ngôn ngữ nghiệp vụ; **giữ nguyên thuật ngữ tiếng Anh** (Firewall, port, ESXi, TLS handshake, testcase, DNS, VPN, CVE, API Specs, BBNT…).
3. Trang theo dõi: https://claude.ai/artifact/CvCUHjfqp7Ye1545k7v3xH ("Quản trị NDOP"). Dữ liệu đọc/ghi bằng công cụ **ArtifactData** (luôn kèm `if_version`; nhiều tài liệu → `batch`). Giao diện sửa trong `harness/02_trang-web/src`, dựng bằng `build2.py`, đăng lại bằng công cụ Artifact với `url` trên (cần quyền sửa).
4. Quét chat: dùng các agent trong `.claude/agents/` (bản sao ở `harness/04_tu-dong-hoa/agents`) theo `harness/04_tu-dong-hoa/cong-cu/_QuyTac_QuetChat.md`. **CHỈ ĐỌC** trên mọi nền tảng chat; không bao giờ ghi đè bản chép chat cũ; thay đổi tiến độ đi vào đề xuất chờ duyệt.
5. Không tự nhập mật khẩu vào bất kỳ ô nào; thay đổi registry/hệ thống thì đưa file cho người dùng tự chạy.
6. Khi cần tra lại một quyết định cũ: `harness/01_tri-thuc/LICH_SU_CONG_VIEC.md`, rồi `harness/06_lich-su-tro-chuyen/`, hoặc sơ đồ graphify `harness/01_tri-thuc/graphify-out`.
7. Sau mỗi thay đổi lớn (giao diện, cấu trúc dữ liệu, quy ước mới), cập nhật các file trong `harness/01_tri-thuc` và chép lại mã nguồn vào `harness/02_trang-web/src`.
