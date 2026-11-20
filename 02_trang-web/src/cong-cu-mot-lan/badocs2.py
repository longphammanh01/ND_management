import json, os, re, hashlib, sys, unicodedata
S = sys.argv[1]
SRC = r'C:\Users\admin\Downloads\Đấu nối với các bên - BA DOCS'
ROOT = r'D:\[NADAT]\Project\NDOP\Train AI NDOP\NDOP_QuanLy_DauNoi'
T8 = ROOT + r'\08_TaiLieu_TheoDonVi'

def h(p):
    m = hashlib.md5()
    with open(p, 'rb') as f:
        for b in iter(lambda: f.read(1 << 20), b''): m.update(b)
    return m.hexdigest()

def nn(name):
    s = unicodedata.normalize('NFC', name).lower()
    s, ext = os.path.splitext(s)
    s = re.sub(r'^(received_|\d+\.\d+_)', '', s)
    s = re.sub(r'(_received_?\d*| \(\d+\)|_\d)$', '', s.strip())
    s = re.sub(r'(_received_?\d*| \(\d+\)|_\d)$', '', s.strip())
    return re.sub(r'[\s_\-]+', ' ', s).strip() + ext

local = {}  # hash -> path ; name -> path
lname = {}
for base in [T8, ROOT + r'\06_Nguon']:
    for r, _, fs in os.walk(base):
        for f in fs:
            p = os.path.join(r, f)
            if os.path.getsize(p) > 200e6: continue
            local.setdefault(h(p), p); lname.setdefault(nn(f), p)
cat = json.load(open(S + '/db13/tailieu/chat.json', encoding='utf-8'))
cat = cat.get('data', cat)['muc']
cname = {}
for i, x in enumerate(cat): cname.setdefault(nn(x['ten']), i)

out = []
for r, _, fs in os.walk(SRC):
    for f in fs:
        if f.startswith('~$') or f.endswith('.html'): continue
        p = os.path.join(r, f); rel = os.path.relpath(p, SRC)
        hh = h(p); k = nn(f)
        if hh in local: st, ref = 'trung_noi_dung', local[hh]
        elif k in lname: st, ref = 'trung_ten_file', lname[k]
        elif k in cname and not os.path.exists(cat[cname[k]].get('duong_dan', '') or 'x:'): st, ref = 'co_trong_danh_muc_chua_co_file', cname[k]
        elif k in cname: st, ref = 'trung_ten_danh_muc', cat[cname[k]].get('duong_dan')
        else: st, ref = 'moi', ''
        out.append({'rel': rel, 'st': st, 'ref': ref, 'size': os.path.getsize(p)})
json.dump(out, open(S + '/v10/badocs2_dedupe.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
for o in sorted(out, key=lambda o: (o['st'], o['rel'])):
    print(o['st'][:14].ljust(14), o['rel'][:110], '<=', str(o['ref']).replace(T8, '08')[-80:] if o['st'] != 'moi' else '')
