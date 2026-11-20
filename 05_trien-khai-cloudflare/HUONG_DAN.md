# Đưa trang "Quản trị NDOP" lên máy chủ riêng (Cloudflare)

## Nên chọn cách nào?

| Cách | Làm gì | Ưu | Nhược |
|---|---|---|---|
| **A. Giữ trên Claude** (đang dùng) | Chủ trang bấm **Share** trên trang, cấp **quyền sửa** cho tài khoản khác | Không phải làm gì thêm; agent quét chat chạy được ngay | Phụ thuộc tài khoản Claude của chủ trang; người xem phải đăng nhập claude.ai trong tổ chức |
| **B. Cloudflare** (bộ này) | Trang + dữ liệu chạy trên Cloudflare Workers + D1, đăng nhập bằng Cloudflare Access | Độc lập với Claude, tên miền riêng, miễn phí ở quy mô đội nhỏ | Agent quét chat hiện ghi vào trang Claude – cần sửa để ghi vào máy chủ mới (xem mục 6) |
| C. Máy chủ nội bộ công ty | Dùng chung `worker.js` + `claude-shim.js` trên Node/Docker | Dữ liệu không ra ngoài | Phải tự lo đăng nhập, HTTPS, sao lưu |

**Khuyến nghị:** tiếp tục **A** để làm hằng ngày. Dựng **B** khi cần một bản độc lập (dự phòng, hoặc cho người không có Claude xem). Trang chứa tên người, nhóm chat và **mật khẩu dev/test** → **bắt buộc có đăng nhập** (Cloudflare Access), không bao giờ để công khai.

## Thành phần trong thư mục này
- `worker.js` – máy chủ: phục vụ trang, API dữ liệu `/api/*`, kiểm tra đăng nhập Cloudflare Access, phân quyền sửa theo email.
- `claude-shim.js` – thay cho `window.claude` của claude.ai, để trang chạy y nguyên mà không sửa mã trang. Cứ 10 giây hỏi máy chủ xem dữ liệu có đổi không (1 lượt gọi), chỉ tải lại phần đã đổi.
- `schema.sql` – bảng dữ liệu. `seed.sql` – dữ liệu ngày 19/11 (tạo từ `../03_du-lieu`).
- `build_web.py` – tạo `public/index.html` (trang + shim) và `seed.sql`.
- `wrangler.toml` – cấu hình Cloudflare.
- `chay_thu_tren_may.mjs` – chạy thử trên máy, không cần Cloudflare.

**Đã kiểm tra trên máy ngày 19/11:** kiểm thử tự động đạt (đọc, ghi, gộp trường, theo dõi thay đổi, quyền sửa, từ chối khi chưa đăng nhập); mở trang ở `http://127.0.0.1:8788` hiện đủ 84 đơn vị, 263 stakeholder, 45 nhóm chat, 362 tài liệu. **Chưa chạy trên Cloudflare thật** (cần tài khoản của anh/chị), phần kiểm tra chữ ký Cloudflare Access chưa thử được.

## 1. Chạy thử trên máy (5 phút)
Cần Node.js 22 trở lên và Python.
```powershell
cd "harness\05_trien-khai-cloudflare"
python build_web.py
node chay_thu_tren_may.mjs --test
node chay_thu_tren_may.mjs
```
Mở http://127.0.0.1:8788. Dữ liệu sửa khi chạy thử chỉ giữ trong bộ nhớ.

## 2. Chuẩn bị Cloudflare (một lần)
1. Tạo tài khoản Cloudflare (miễn phí). Nên có một tên miền đưa vào Cloudflare (vd `ndop.ten-mien-cong-ty.vn`).
2. Mở **Zero Trust** (miễn phí đến 50 người dùng) → đặt tên nhóm (team name) → được địa chỉ dạng `ten-nhom.cloudflareaccess.com`.
3. Đăng nhập công cụ dòng lệnh: `npx wrangler login`

## 3. Tạo cơ sở dữ liệu và nạp dữ liệu
```powershell
npx wrangler d1 create quan-tri-ndop
```
Chép `database_id` vừa hiện vào `wrangler.toml`. Sau đó:
```powershell
python build_web.py
npx wrangler d1 execute quan-tri-ndop --remote --file=seed.sql
```

## 4. Bật đăng nhập (Cloudflare Access)
1. Zero Trust → **Access → Applications → Add → Self-hosted**: tên miền = tên miền của trang (vd `ndop.ten-mien-cong-ty.vn`).
2. Policy: **Allow** – Emails ending in `@<tên miền email công ty>` (hoặc liệt kê từng email). Cách đăng nhập: mã gửi qua email (One-time PIN) hoặc Google.
3. Chép **Application Audience (AUD) Tag** vào `ACCESS_AUD`, và `ten-nhom.cloudflareaccess.com` vào `ACCESS_TEAM_DOMAIN` trong `wrangler.toml`.
4. `WRITERS` = danh sách email được sửa (cách nhau dấu phẩy), hoặc `*` để mọi người đã đăng nhập đều sửa được.

## 5. Đưa lên
Thêm vào `wrangler.toml` (thay tên miền):
```toml
routes = [{ pattern = "ndop.ten-mien-cong-ty.vn", custom_domain = true }]
```
```powershell
npx wrangler deploy
```
Không có tên miền riêng: đặt `workers_dev = true`, rồi trong trang quản trị Cloudflare: Workers → quan-tri-ndop → Settings → Domains & Routes → workers.dev → **bật Cloudflare Access**. Phải bật trước khi chia sẻ link.

**Cập nhật giao diện sau này:** sửa mã trong `02_trang-web/src` → chạy `build2.py` (xem `02_trang-web/HUONG_DAN.md`) → `python build_web.py` → `npx wrangler deploy`. Dữ liệu trên D1 giữ nguyên. **Không chạy lại `seed.sql`** vì sẽ ghi đè dữ liệu đang có bằng bản ngày 19/11.

**Sao lưu dữ liệu:** `npx wrangler d1 export quan-tri-ndop --remote --output=saoluu.sql`

## 6. Agent quét chat với máy chủ mới
Agent hiện ghi bằng công cụ ArtifactData vào trang Claude. Muốn ghi vào Cloudflare cần:
1. Zero Trust → Access → **Service Tokens** → tạo token, thêm vào policy (Action: Service Auth). Thêm `common_name` của token vào `WRITERS`.
2. Đổi bước ghi trong agent `tong-hop-quet-chat` và tác vụ quét: gọi `POST https://<tên miền>/api/doc/<nhóm>/<mã>` với `{"op":"set|update|delete","data":{...}}`, kèm header `CF-Access-Client-Id` / `CF-Access-Client-Secret`. Đọc: `GET /api/col/<nhóm>`.
(Chưa làm sẵn: cần làm khi anh/chị chọn chuyển hẳn sang Cloudflare.)

## Chi phí ước tính (gói miễn phí)
- Workers: 100.000 lượt gọi/ngày. Mỗi tab đang mở ≈ 360 lượt/giờ (hỏi 10 giây/lần, tạm dừng khi tab ẩn). 10 người mở 8 tiếng ≈ 29.000 lượt/ngày.
- D1: 5 GB, 5 triệu lượt đọc/ngày – dư.
- Access: miễn phí đến 50 người dùng.
- Vượt mức: gói Workers Paid ~5 USD/tháng.

## Khác biệt so với bản trên Claude
- Dữ liệu cập nhật sau tối đa ~10 giây giữa các người dùng (bản Claude gần như tức thì).
- "Tên hiển thị" người sửa là email đăng nhập.
- Nút "Mở" file trên máy (Word/Excel) và nút mở prototype hoạt động như cũ, vì chạy trên máy người dùng.
