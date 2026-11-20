import json, os, sys
S = sys.argv[1]
mv = json.load(open(S + '/v10/moved.json', encoding='utf-8'))
DVMAP = {'Bộ KHCN': 'Bộ KHCN', 'Bộ Công an – C06 (SSO VNeID)': 'Bộ Công an – C06', 'Bộ Xây dựng': 'Bộ Xây dựng', 'Bộ Tư pháp – TGPL': 'Bộ Tư pháp',
         'Ngân hàng Nhà nước': 'NHNN', 'Rà soát API Bộ, ngành': 'Rà soát API Bộ ngành', 'Dữ liệu sai khác (DA175)': 'Dữ liệu sai khác',
         'Cổng Dịch vụ công quốc gia': 'PAKN; CSDL TTHC; TTTT', 'HT Thanh toán trực tuyến (TTTT)': 'TTTT', 'Danh mục dùng chung (DMDC)': 'DMDC',
         'Sàn dữ liệu': 'Sàn dữ liệu', 'HT liên lạc': 'HT liên lạc', 'PAKN': 'PAKN', 'Kho dùng chung': 'Kho dùng chung',
         'MoMo': 'MoMo', 'SHB': 'SHB', 'TPBank': 'TPBank', 'VNPAY': 'VNPAY', 'VPBank': 'VPBank', 'Triển khai NDC – 103NT (nội bộ NADAT)': ''}
d = json.load(open(S + '/v10/out/tl_chat.json', encoding='utf-8'))
n = 0
for m in d['muc']:
    p = (m.get('duong_dan') or '').replace(chr(92), '/')
    b = os.path.basename(p)
    if '07_TaiLieu_TuChat' in p and b in mv:
        new = mv[b].replace('/', chr(92)); m['duong_dan'] = new
        parts = new.split(chr(92)); i = parts.index('08_TaiLieu_TheoDonVi')
        m['thu_muc'] = ' › '.join(parts[i + 1:-1]); m['don_vi'] = DVMAP.get(parts[i + 2], ''); n += 1
left = [m['ten'] for m in d['muc'] if '07_TaiLieu_TuChat' in (m.get('duong_dan') or '')]
json.dump(d, open(S + '/v10/out/tl_chat_v9.json', 'w', encoding='utf-8'), ensure_ascii=False)
print('cap nhat', n, 'con duong dan cu', len(left), left[:10])
