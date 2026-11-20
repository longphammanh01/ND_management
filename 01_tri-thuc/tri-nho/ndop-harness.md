---
name: ndop-harness
description: "All NDOP tracker knowledge (page source, data export, agents, Cloudflare deploy kit, transcripts) is exported to Train AI NDOP/harness; keep it in sync after big changes"
metadata:
  node_type: memory
  type: project
  originSessionId: a3ee91ab-a830-4247-a1df-9badebb26daf
  modified: 2026-11-19T08:50:12.859Z
---

Ngày 19/11/2026 người dùng yêu cầu xuất toàn bộ tri thức ra `D:\[NADAT]\Project\NDOP\Train AI NDOP\harness` để tài khoản khác làm tiếp: tri thức (`01_tri-thuc`), mã nguồn trang (`02_trang-web/src`, dựng bằng build2.py – bản gốc trước đó nằm ở scratchpad tạm), dữ liệu trang (`03_du-lieu`), agent + tác vụ quét (`04_tu-dong-hoa`), bộ Cloudflare Workers + D1 + Access (`05_trien-khai-cloudflare`, đã test trên máy, chưa deploy thật), lịch sử chat (`06`). `CLAUDE.md` ở gốc dự án trỏ sang `harness/CLAUDE.md`.

**Why:** người dùng muốn tri thức không phụ thuộc phiên/tài khoản và có phương án tự host.
**How to apply:** sửa giao diện thì sửa trong `harness/02_trang-web/src` (không dùng scratchpad); sau thay đổi lớn cập nhật `harness/01_tri-thuc`. Liên quan [[ndop-thuat-ngu-va-nguoi]].
