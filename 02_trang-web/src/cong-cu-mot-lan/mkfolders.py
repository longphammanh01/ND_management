import json, glob, os, re, sys
S = sys.argv[1]
T8 = r'D:\[NADAT]\Project\NDOP\Train AI NDOP\NDOP_QuanLy_DauNoi\08_TaiLieu_TheoDonVi'
G = {'BBN': '01_Bộ, ngành', 'ĐP': '02_Địa phương', 'HTPM': '03_Phần mềm nội bộ', 'DN': '04_Doanh nghiệp'}
NUM = ['DVC', 'DMDC', 'SHTT', 'TTTT', 'ĐCS', 'CĐĐH', 'PAKN', 'DLCN', 'HTLL', 'TTCN', 'QLNNDL', 'SDL', 'QPTDL', 'KDLTH', 'PTDL', 'KDLM',
       'CDLM', 'QT BMĐKN', 'CSDL TTHC', 'UDDĐ', 'C06', 'TGDL', 'NEAC']
DN = ['MoMo', 'VNPAY', 'VPBank', 'TPBank', 'SHB', 'BIDV', 'NAPAS']
SAME = {'bo-tu-phap': 'Bộ Tư pháp – TGPL', 'nhnn': 'Ngân hàng Nhà nước', 'ra-soat-api-bo-nganh': 'Rà soát API Bộ, ngành'}
units = []
for f in glob.glob(S + '/db14/donvi/*.json'):
    d = json.load(open(f, encoding='utf-8')); d = d.get('data', d); units.append((os.path.basename(f)[:-5], d))
units.append(('napas', {'nhom': 'DN', 'ten': 'NAPAS'}))
made = []
for k, d in units:
    g = G.get(d.get('nhom'))
    if not g: continue  # Nội bộ NDC: đã có thư mục ở 02/05
    base = os.path.join(T8, g)
    if g.startswith('03'):
        ab = re.findall(r'\(([^()]+)\)\s*$', d.get('ten_hien_thi') or '')[-1]
        n = NUM.index(ab) + 1
        ex = [x for x in os.listdir(base) if x.startswith('%02d. ' % n)]
        name = ex[0] if ex else '%02d. %s' % (n, d['ten_hien_thi'])
    elif g.startswith('04'):
        n = DN.index(d['ten']) + 1
        ex = [x for x in os.listdir(base) if x.startswith('%02d. ' % n)]
        name = ex[0] if ex else '%02d. %s' % (n, d['ten'])
    else:
        name = SAME.get(k, d['ten'])
    p = os.path.join(base, name)
    new = not os.path.isdir(p)
    for sub in ('Do đơn vị gửi', 'Do NADAT – C12 gửi'):
        os.makedirs(os.path.join(p, sub), exist_ok=True)
    if new: made.append(os.path.join(g, name))
assert len(set(os.listdir(os.path.join(T8, G['HTPM'])))) == 23, os.listdir(os.path.join(T8, G['HTPM']))
print('tạo mới', len(made))
for m in sorted(made): print(' +', m)
