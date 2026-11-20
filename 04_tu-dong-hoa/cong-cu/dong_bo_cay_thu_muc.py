# Lấy danh sách mọi thư mục trong 08_TaiLieu_TheoDonVi để trang "Đấu nối NDOP" hiện đủ cây Tài liệu (kể cả thư mục trống).
# Cách dùng: python -I dong_bo_cay_thu_muc.py <file JSON đầu ra>
# Sau đó ghi file đầu ra vào document tailieu/cay trên trang (ArtifactData set, file_path, if_version).
import os, json, sys, datetime
T8 = r'D:\[NADAT]\Project\NDOP\Train AI NDOP\NDOP_QuanLy_DauNoi\08_TaiLieu_TheoDonVi'
L = sorted(os.path.relpath(r, T8).replace(os.sep, '/') for r, _, _ in os.walk(T8) if r != T8)
assert L, 'Không đọc được thư mục ' + T8
json.dump({'ten': 'Cây thư mục trong máy', 'thu_tu': 99, 'muc': [], 'goc': T8, 'thu_muc_may': L,
           'cap_nhat': datetime.date.today().strftime('%d/%m/%Y')}, open(sys.argv[1], 'w', encoding='utf-8'), ensure_ascii=False)
print(len(L), 'thư mục')
