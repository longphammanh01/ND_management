"""Sắp xếp file tải từ chat theo đơn vị. python reorg.py <scratch> <root> [--apply]"""
import sys, os, json, glob, re, shutil, unicodedata, csv
S, ROOT = sys.argv[1], sys.argv[2]; APPLY = '--apply' in sys.argv
SRC, DST = os.path.join(ROOT, '07_TaiLieu_TuChat'), os.path.join(ROOT, '08_TaiLieu_TheoDonVi')
BN, DP, HT, DN, NDC = '01_Bộ, ngành', '02_Địa phương', '03_Hệ thống trong NDC', '04_Doanh nghiệp', '05_Hạ tầng NDC – 103NT'
UNIT = {  # nhóm chat -> (nhóm đơn vị, đơn vị)
 'agent-node-bo-khoa-hoc-cong-nghe': (BN, 'Bộ KHCN'), 'c12-c06-sso-ndop-lhl-dvcqg-pakn': (BN, 'Bộ Công an – C06 (SSO VNeID)'),
 'xay-dung-tai-lieu-dac-ta-ky-thuat-bxd-ttdlqg': (BN, 'Bộ Xây dựng'), 'c12-tgpl-nhom-trao-doi': (BN, 'Bộ Tư pháp – TGPL'),
 'c12-nhnn-tich-hop-du-lieu': (BN, 'Ngân hàng Nhà nước'), 'nhom-ra-soat-uc-du-lieu': (BN, 'Rà soát API Bộ, ngành'),
 'da175-pakn-pa-saikhac': (DP, 'Dữ liệu sai khác (DA175)'),
 'mbf-nadat-c12-tich-hop-cong-dvc-qg': (HT, 'Cổng Dịch vụ công quốc gia'), 'dvc-ndop-tttt-devtest': (HT, 'HT Thanh toán trực tuyến (TTTT)'),
 'dmdc-nadat-tich-hop-nen-tang': (HT, 'Danh mục dùng chung (DMDC)'), 'd01-nadat-vntdo-thanh-toan-sdl': (HT, 'Sàn dữ liệu'),
 'san-c12-tgdl-fis-test': (HT, 'Sàn dữ liệu'), 'mbfs-nadat-noi-bo': (HT, 'HT Thanh toán trực tuyến (TTTT)'),
 'c12-shb-ket-noi-dvcqg': (DN, 'SHB'), 'ha-tang-tpbank-c12': (DN, 'TPBank'), 'momo-x-c12-cai-dat-server-cho-cong-dvcqg': (DN, 'MoMo'),
 'ndop-c12-thanhtoan-vpbank': (DN, 'VPBank'), 'thanh-toan-c12-vpbank': (DN, 'VPBank'), 'thanh-toan-c12-vnpay': (DN, 'VNPAY'),
 'c12-nadat-quy-hoach-trien-khai-kho-dung-chung-luong-du-lieu': (NDC, 'Kho dùng chung'), 'c12-ndop-vnpt-nadat': (NDC, 'Kho dùng chung'),
 'ndop-ndc-lhl-103nt': (NDC, '_TYPE_'),
}
CODE = [(r'CS-15', (HT, 'HT liên lạc')), (r'CS-01|CS-13', (HT, 'PAKN')), (r'TH-BBN-01|CS-14', (BN, 'Bộ KHCN')), (r'CS-0[6-9]|CS-1[01]', (HT, 'HT Thanh toán trực tuyến (TTTT)'))]
def norm(s):
    s = unicodedata.normalize('NFD', str(s or '')); s = ''.join(c for c in s if unicodedata.category(c) != 'Mn').replace('đ', 'd').replace('Đ', 'D')
    return re.sub(r'[^a-z0-9]+', ' ', s.lower()).strip()
side_of = {}
for f in glob.glob(S + '/db6/nguoi/*.json'):
    d = json.load(open(f, encoding='utf-8'))
    for p in d['nguoi']:
        for k in [p['ho_ten']] + re.split(r';', p.get('tai_khoan') or ''):
            k = norm(re.sub(r'\([^)]*\)', '', k).replace('~', ''))
            if len(k) > 2: side_of.setdefault(k, d['dv'])
INSIDE = {'NADAT', 'C12', 'Gtel'}
def side(sender):
    s = norm(sender)
    if not s or s == 'chuyen tiep': return None
    if 'nadat' in s or s.startswith('toi') or 'c12' in s: return 'Do NADAT – C12 gửi'
    dv = side_of.get(s) or next((v for k, v in side_of.items() if s and (s in k or k in s) and min(len(s), len(k)) > 4), None)
    if dv is None: return None
    return 'Do NADAT – C12 gửi' if dv in INSIDE else 'Do đơn vị gửi'
def vtype(fn):
    if 'rule_Nadat_Phieu' in fn: return 'Phiếu Firewall'
    if re.search(r'BCDX|Bao_cao|BaoCao|bao_cao|Bao cao', fn): return 'Báo cáo, biểu mẫu chuyển file'
    return 'Tài liệu kỹ thuật, runbook'
rows = list(csv.reader(open(S + '/v10/files.tsv', encoding='utf-8'), delimiter='\t'))
plan = []
for grp_path, fn, nguon, loai in rows:
    grp = grp_path.split('/')[-1]; cat, unit = UNIT[grp]
    m = re.search(r'·\s*(.*)$', nguon); codes = m.group(1) if m else ''
    if grp == 'mbfs-nadat-noi-bo':
        cat, unit = next((v for p, v in CODE if re.search(p, codes)), (cat, unit))
    sender = nguon.split(' – ', 1)[1].split(' · ')[0] if ' – ' in nguon else ''
    if unit == '_TYPE_': unit, sub = 'Triển khai NDC – 103NT (nội bộ NADAT)', vtype(fn)
    else: sub = side(sender) or 'Chưa rõ người gửi'
    src = os.path.join(SRC, *grp_path.split('/'), fn); dst = os.path.join(DST, cat, unit, sub, fn)
    plan.append((src, dst, sender))
from collections import Counter
for k, n in sorted(Counter(os.path.relpath(os.path.dirname(d), DST) for _, d, _ in plan).items()): print(n, k)
unk = [(os.path.basename(s), snd) for s, d, snd in plan if 'Chưa rõ' in d]; print('CHUA RO', len(unk), unk[:40])
if APPLY:
    log = []
    for src, dst, _ in plan:
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        if os.path.exists(dst): raise SystemExit('trùng ' + dst)
        shutil.move(src, dst); log.append((src, dst))
    with open(os.path.join(DST, '_NhatKy_DiChuyen_16-11-2026.csv'), 'w', encoding='utf-8-sig', newline='') as f:
        w = csv.writer(f); w.writerow(['Vị trí cũ', 'Vị trí mới']); w.writerows(log)
    for d, _, _ in sorted(os.walk(SRC), key=lambda x: -len(x[0])):
        if not os.listdir(d): os.rmdir(d)
    json.dump({os.path.basename(s): d for s, d in log}, open(S + '/v10/moved.json', 'w', encoding='utf-8'), ensure_ascii=False)
    print('moved', len(log))
