# Cấu trúc dữ liệu của trang

Dữ liệu nằm trong cơ sở dữ liệu của trang (Claude Artifact). Mỗi nhóm dữ liệu (collection) gồm nhiều tài liệu (document), mỗi tài liệu có mã (id). Bản sao: `harness/03_du-lieu/<nhóm>/<mã>.json`.

| Nhóm | Mã tài liệu | Nội dung | Trường chính |
|---|---|---|---|
| `luong` | `cs-01`… `th-bbn-07`, `kyso`, `kho-5-1` | Luồng đấu nối | `ma`, `dv`/`donvi`, `nhom`, `nv`, `ba`, `dev`, `dt_tt`/`dt_buoc` (DevTest), `ndc_tt`/`ndc_buoc` (NDC), `bbnt_dt`/`bbnt_ndc`, `blocker`, `blocker_tu`, `blocker_thuoc`, `loai`, `ai_chan`, `nguoi_nhan`, `han_xu_ly`, `viec_tiep`, `nguoi_lam`, `nhom_chat`, `dk_ndc`, `cap_nhat` |
| `donvi` | slug tên đơn vị | Danh mục 84 đơn vị | `ten`, `ten_hien_thi`, `lien_ket`, `nhom` (BBN/ĐP/HTPM/DN/Nội bộ NDC), `ma_tien_do`, `chu_quan`, `dv_nguoi`, `api_spec` (Đã nhận/Đang chờ/Chưa nhận/Chưa rõ/Không áp dụng), `api_spec_tl`, `api_spec_ngay`, `api_cancu`, `thu_muc_drive` ("tên: link; tên: link"), `ghi_chu`, `luong_chung`, `nhom_chat`, `cap_nhat` |
| `nguoi` | `s00`… `s24` (mỗi đơn vị một tài liệu) | Stakeholder | `dv`, `ben`, `nguoi: [{ho_ten, tai_khoan, phong_ban, vai_tro, nhom_chat, can_cu, tinh_trang, ngay_nghi, ban_giao_cho}]` |
| `nhomchat` | `g01…g45` | Nhóm chat | `nen_tang`, `ten`, `ma_luong`, `ba`, `doc_cuoi`, `tin_moi`, `ghi_chu`, `don_vi` |
| `tailieu` | `chat`, `input`, `kq`, `cay` | Danh mục tài liệu | `ten`, `thu_tu`, `muc: [{ten, loai, duong_dan, mo_ta, trang_thai, nguon, ngay, don_vi, thu_muc}]`; riêng `cay` có `goc` + `thu_muc_may` (danh sách thư mục trong máy để cây hiện cả thư mục trống) |
| `dexuat` | `dx-<yyyymmddhhmm>-<n>` | Đề xuất từ quét chat | `col`, `doc`, `dv`, `ma`, `truong`, `cu`, `moi`, `nguon`, `ly_do`, `trang_thai` (cho/duyet/bo) |
| `nhatky` | tự sinh | Nhật ký thay đổi luồng | mã luồng, các thay đổi cũ → mới, người, thời gian |
| `momang` | `mm01…` | Kanban mở mạng NDC | `don_vi`, `ma_luong`, `chieu`, `ip_nguon`, … , cột trạng thái |
| `lienket` | `v1-xx`, `v2-xx`, `pt-xx` | Hệ thống & tài khoản dev/test | `nhom`, `ten`, `url`, `tai_khoan`, `mat_khau`, `ghi_chu`, `thu_tu`, `mo` |
| `quytrinh` | (trống) | Sửa đè bước quy trình | |
| `yeucau` | `quet` | Yêu cầu quét chat từ nút trên trang | `trang_thai` (cho/dang_chay/xong/loi), `yeu_cau_luc`, `bat_dau`, `ket_thuc`, `tom_tat` |

**Khoá đơn vị:** `dvOf(luồng) = dv || DV[ma] || donvi`; hiển thị dùng `donvi.ten_hien_thi`; nhóm đơn vị lấy theo `donvi.nhom`.

**Ghi dữ liệu bằng Claude:** công cụ ArtifactData (url trang ở trên), luôn kèm `if_version` của bản vừa đọc; ghi nhiều tài liệu dùng `batch`. Tài liệu lớn ghi bằng `file_path`.

⚠️ `lienket` chứa mật khẩu dev/test – không đưa thư mục `03_du-lieu` lên nơi công khai.
