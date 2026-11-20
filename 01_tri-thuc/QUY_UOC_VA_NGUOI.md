# Quy ước làm việc và ghép người

*Đây là những điều người dùng đã xác nhận trong quá trình làm. Bắt buộc tuân theo.*

## Giao tiếp
- Trả lời **tiếng Việt**, ngôn ngữ nghiệp vụ; người dùng không lập trình.
- **Giữ nguyên thuật ngữ chuyên ngành tiếng Anh**: Firewall (không viết "tường lửa"), port, ESXi, TLS handshake, testcase, DNS, VPN, CVE, leased line, API Specs, BBNT, DevTest.
- Trang dùng chữ **"Stakeholder"** thay cho "Người".

## Quét chat – giới hạn bắt buộc
- **CHỈ ĐỌC** trên Telegram, Zalo, WhatsApp, Viber: không gửi tin, trả lời, thả cảm xúc, kết bạn, rời nhóm, đổi cài đặt; không bấm "Đồng bộ", quảng cáo, lấy tin cũ từ điện thoại. Không mở chat riêng hay nhóm ngoài danh sách. Chỉ gõ vào ô tìm kiếm danh sách chat.
- Không tải file đính kèm, chỉ ghi tên file, người gửi, ngày.
- Không chép mật khẩu/token/số giấy tờ vào kết quả quét. Máy khoá màn hình → dừng, không nhập mật khẩu.
- **Không bao giờ ghi đè bản chép chat cũ**, chỉ nối thêm.
- Thay đổi tiến độ đi vào **đề xuất chờ duyệt** (collection `dexuat`), không sửa thẳng luồng. Chỉ đổi trạng thái khi có bằng chứng rõ; "Hoàn thành" chỉ khi đã ký BBNT.
- Chi tiết: `04_tu-dong-hoa/cong-cu/_QuyTac_QuetChat.md`.

## Ghép người (đã xác nhận)
- **Viber là nhóm nội bộ NADAT** → tên Viber phải ghép vào người NADAT đã có, không tạo người trùng.
- **Anh Quang – DCEO NADAT**: Telegram `@itsmedukang`, Viber "Nicolas" / "Nicolas Nguyen".
- **"Linh" = "Linh Trần" = "Linh Tran Tan"** = Trần Tấn Nhật Linh, BA Lead Team 1 NADAT; luôn ghi "Linh Trần". Không nhầm với Linh Ngo, Phương Linh (VNPT), Linh Phạm (VNPAY).
- `@martintran` là **Trần Huy Hùng** (không phải Linh).
- **Đã nghỉ** (đánh dấu "Đã nghỉ", bàn giao cho **Long**, không xoá): Bùi Hiền, Kim Huệ, Yến Nguyễn.

## Gắn đơn vị / luồng (đã xác nhận)
- Nhóm WhatsApp "Sàn C12- TGDL FIS (test)" → luồng **CS-06** (FIS = nhà thầu Sàn dữ liệu).
- Ký số (luồng KYSO) thuộc **NEAC** – Hệ thống Chứng thực điện tử quốc gia (Cổng eSign).
- **VNPT là bên triển khai**, không phải một hệ thống: triển khai Địa chỉ số (ĐCS), Chỉ đạo điều hành (CĐĐH), Kho dữ liệu tổng hợp (KDLTH), PTDL.
- VNeID (SSO) (C06) là một phần mềm nội bộ, khoá đơn vị "Bộ Công an – C06" (luồng CS-16/17).
- "API Specs" gồm cả API expose, tài liệu nghiệp vụ, hướng dẫn tích hợp, đặc tả (vd NEAC: tài liệu đặc tả eSign v2.0).

## Phạm vi theo dõi của BA
- Không cần: sổ cam kết sau họp, danh mục phiếu Firewall (việc team hạ tầng), cảnh báo an toàn thông tin.

## Tài khoản dev/test trên trang
- Tab "Hệ thống & tài khoản" lưu tài khoản/mật khẩu **môi trường dev/test** theo yêu cầu của người dùng (không phải tài khoản thật). Claude không tự gõ mật khẩu vào bất kỳ ô nào; người dùng tự dán.

## Thư mục tài liệu
- Cấu trúc: `08_TaiLieu_TheoDonVi/<01_Bộ, ngành | 02_Địa phương | 03_Phần mềm nội bộ | 04_Doanh nghiệp | 05_Hạ tầng NDC – 103NT>/<đơn vị>/<Do đơn vị gửi | Do NADAT – C12 gửi | Chưa rõ người gửi | Tài liệu khác>`.
- Phần mềm nội bộ và doanh nghiệp đánh số (xem `BOI_CANH_DU_AN.md` mục 4). Mọi đơn vị trong danh mục đều có thư mục, kể cả chưa có tài liệu.
- Tài liệu trùng (cùng nội dung hoặc cùng tên) thì bỏ qua; chép (không di chuyển) từ nguồn; ghi nhật ký CSV.
