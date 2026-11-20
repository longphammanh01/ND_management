import os, json, sys
T8 = r'D:\[NADAT]\Project\NDOP\Train AI NDOP\NDOP_QuanLy_DauNoi\08_TaiLieu_TheoDonVi'
L = sorted(os.path.relpath(r, T8).replace(os.sep, '/') for r, ds, fs in os.walk(T8) if r != T8)
json.dump({'ten': 'Cây thư mục trong máy', 'thu_tu': 99, 'muc': [], 'goc': T8, 'thu_muc_may': L, 'cap_nhat': '19/11/2026'},
          open(sys.argv[1], 'w', encoding='utf-8'), ensure_ascii=False)
print(len(L), sum(1 for x in L if x.count('/') == 1 and x.startswith('03')))
