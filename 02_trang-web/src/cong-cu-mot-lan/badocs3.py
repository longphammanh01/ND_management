import json, os, re, sys, shutil, hashlib, datetime, csv
S, RUN = sys.argv[1], len(sys.argv) > 2 and sys.argv[2] == 'run'
SRC = r'C:\Users\admin\Downloads\Đấu nối với các bên - BA DOCS'
T8 = r'D:\[NADAT]\Project\NDOP\Train AI NDOP\NDOP_QuanLy_DauNoi\08_TaiLieu_TheoDonVi'
B = chr(92)
P3, P4 = '03_Phần mềm nội bộ', '04_Doanh nghiệp'
# 1. Đổi tên / chuyển thư mục đơn vị (cũ -> mới, tương đối T8)
REN = [
 (P3 + B + 'Cổng Dịch vụ công quốc gia', P3 + B + '01. Cổng Dịch vụ công quốc gia (DVC)'),
 (P3 + B + 'Danh mục dùng chung (DMDC)', P3 + B + '02. Hệ thống Quản lý danh mục dùng chung (DMDC)'),
 (P3 + B + 'HT Thanh toán trực tuyến (TTTT)', P3 + B + '04. Hệ thống Quản lý thanh toán tập trung (TTTT)'),
 (P3 + B + 'PAKN', P3 + B + '07. Hệ thống Hỗ trợ xử lý phản ánh kiến nghị (PAKN)'),
 (P3 + B + 'HT liên lạc', P3 + B + '09. Hệ thống Liên lạc với cá nhân và tổ chức (HTLL)'),
 (P3 + B + 'Sàn dữ liệu', P3 + B + '12. Sàn dữ liệu (SDL)'),
 ('01_Bộ, ngành' + B + 'Bộ Công an – C06 (SSO VNeID)', P3 + B + '21. VNeID (SSO) (C06)'),
 (P4 + B + 'MoMo', P4 + B + '01. MoMo'), (P4 + B + 'VNPAY', P4 + B + '02. VNPAY'), (P4 + B + 'VPBank', P4 + B + '03. VPBank'),
 (P4 + B + 'TPBank', P4 + B + '04. TPBank'), (P4 + B + 'SHB', P4 + B + '05. SHB'),
]
# thư mục BA DOCS (cấp đơn vị) -> (thư mục máy, đơn vị trên web)
UNIT = {
 '1. Cổng dịch vụ công quốc gia (DVC)': (P3 + B + '01. Cổng Dịch vụ công quốc gia (DVC)', 'Cổng dịch vụ công quốc gia'),
 '2. Hệ thống Quản lý danh mục dùng chung (DMDC)': (P3 + B + '02. Hệ thống Quản lý danh mục dùng chung (DMDC)', 'DMDC'),
 '4. Hệ thống Quản lý thanh toán tập trung (TTTT)': (P3 + B + '04. Hệ thống Quản lý thanh toán tập trung (TTTT)', 'TTTT'),
 '7. Hệ thống Hỗ trợ xử lý phản ánh kiến nghị (PAKN)': (P3 + B + '07. Hệ thống Hỗ trợ xử lý phản ánh kiến nghị (PAKN)', 'PAKN'),
 '9. Hệ thống Liên lạc với cá nhân và tổ chức (HTLL)': (P3 + B + '09. Hệ thống Liên lạc với cá nhân và tổ chức (HTLL)', 'HT liên lạc'),
 '12. Sàn dữ liệu (SDL)': (P3 + B + '12. Sàn dữ liệu (SDL)', 'Sàn dữ liệu'),
 '19. Cơ sở dữ liệu Thủ tục hành chính (CSDL TTHC)': (P3 + B + '19. Cơ sở dữ liệu Thủ tục hành chính (CSDL TTHC)', 'CSDL TTHC'),
 '21. VNEID (SSO) (C06)': (P3 + B + '21. VNeID (SSO) (C06)', 'Bộ Công an – C06'),
 '22. Trung gian dữ liệu (TGDL)': (P3 + B + '22. Trung gian dữ liệu (TGDL)', 'Trung gian dữ liệu (TGDL)'),
 '23. Hệ thống Chứng thực điện tử quốc gia (NEAC)': (P3 + B + '23. Hệ thống Chứng thực điện tử quốc gia (NEAC)', 'Hệ thống Chứng thực điện tử quốc gia (NEAC)'),
 '1. MoMo': (P4 + B + '01. MoMo', 'MoMo'), '3. VPBank': (P4 + B + '03. VPBank', 'VPBank'),
}
SENDER = {'Tài liệu nhận': 'Do đơn vị gửi', 'Tài liệu gốc': 'Do đơn vị gửi', 'Tài liệu gửi': 'Do NADAT – C12 gửi',
          'Tài liệu phái sinh': 'Do NADAT – C12 gửi', 'Tài liệu khác_': 'Tài liệu khác'}
OVR = {'NDOP_SanDL_APIspec_UC1_UC3_v1.docx': 'Do NADAT – C12 gửi'}  # bản đặc tả do NADAT viết

def target(rel):
    parts = rel.split(B); unit = parts[1]; f = parts[-1]; sub = parts[2:-1]
    folder, dv = UNIT[unit]
    if f in OVR: s = [OVR[f]]
    elif not sub: s = ['Do đơn vị gửi']
    elif sub[0] in SENDER: s = [SENDER[sub[0]]] + sub[1:]
    else:  # thư mục theo luồng (vd "3. DVC - SDL"), không rõ bên gửi
        s = [SENDER.get(sub[1], 'Chưa rõ người gửi') if len(sub) > 1 else 'Chưa rõ người gửi', re.sub(r'^\d+\.\s*', '', sub[0])] + sub[2:]
    return folder + B + B.join(s) + B + f, dv

def loai(f):
    l = f.lower()
    if re.search(r'api.?spec|expose', l): return 'API spec'
    if 'bbnt' in l: return 'BBNT'
    if re.search(r'hướng dẫn|hdsd|cấu hình', l): return 'HD tích hợp'
    if re.search(r'\.(png|vsdx)$', l): return 'Sơ đồ'
    if re.search(r'^(dm_|\d+\. db_)', l): return 'Danh mục'
    if 'fw_' in l: return 'Triển khai NDC'
    if 'kiến trúc' in l or 'kien-truc' in l or 'httt_gq' in l: return 'Tài liệu nghiệp vụ'
    return 'Khác'

ded = json.load(open(S + '/v10/badocs2_dedupe.json', encoding='utf-8'))
doc = json.load(open(S + '/db13/tailieu/chat.json', encoding='utf-8')); data = doc.get('data', doc); muc = data['muc']
log = []
# --- đổi tên thư mục
for a, b in REN:
    pa, pb = T8 + B + a, T8 + B + b
    if os.path.isdir(pa):
        if RUN: os.rename(pa, pb)
        log.append(('Đổi tên thư mục', pa, pb))
def repath(p):
    for a, b in REN:
        if (T8 + B + a + B) in p: return p.replace(T8 + B + a + B, T8 + B + b + B)
    return p
nre = 0
for m in muc:
    p = m.get('duong_dan') or ''
    q = repath(p)
    if q != p:
        m['duong_dan'] = q; parts = q.split(B); i = parts.index('08_TaiLieu_TheoDonVi')
        m['thu_muc'] = ' › '.join(parts[i + 1:-1]); nre += 1
        if '21. VNeID' in q: m['don_vi'] = 'Bộ Công an – C06'
# --- chép tệp mới / bổ sung tệp cho mục đã có
seen = {}; added = []; filled = []; skipped = []
today = '19/11/2026'
for o in ded:
    rel = o['rel']; src = SRC + B + rel; f = os.path.basename(rel)
    if o['st'] in ('trung_noi_dung', 'trung_ten_file', 'trung_ten_danh_muc'):
        skipped.append((rel, o['st'], repath(str(o['ref'])))); continue
    hh = hashlib.md5(open(src, 'rb').read()).hexdigest()
    if hh in seen: skipped.append((rel, 'trung_trong_BA_DOCS', seen[hh])); continue
    if rel.startswith('3. Phần mềm nội bộ' + B + '2.') and 'VNeID-SSO' in f: continue  # chép ở thư mục 21 (C06)
    dst_rel, dv = target(rel); dst = T8 + B + dst_rel; seen[hh] = dst
    if RUN:
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        if not os.path.exists(dst): shutil.copy2(src, dst)
    log.append(('Chép từ BA DOCS', src, dst))
    thu_muc = ' › '.join(dst_rel.split(B)[:-1])
    ngay = datetime.datetime.fromtimestamp(os.path.getmtime(src)).strftime('%d/%m/%Y')
    nguon = 'Thư mục BA DOCS (Đấu nối với các bên) › ' + ' › '.join(rel.split(B)[:-1])
    if o['st'] == 'co_trong_danh_muc_chua_co_file':
        m = muc[o['ref']]; m.update(duong_dan=dst, thu_muc=thu_muc, trang_thai='Đã tải', don_vi=m.get('don_vi') or dv)
        m['nguon'] = re.sub(r' \((không tải được|bỏ qua)[^)]*\)+$', '', m['nguon']) + ' · có bản trong BA DOCS'
        filled.append(f)
    else:
        muc.append({'ten': f, 'loai': loai(f), 'duong_dan': dst, 'mo_ta': '', 'trang_thai': 'Đã tải', 'nguon': nguon,
                    'ngay': ngay, 'don_vi': dv, 'thu_muc': thu_muc}); added.append(dst_rel)
# --- thư mục Drive (lối tắt .html) thành mục liên kết web
drive = json.load(open(S + '/v10/badocs_drive.json', encoding='utf-8'))
DRV = {'3. DVC - SDL': ('12. Sàn dữ liệu (SDL)', 'Sàn dữ liệu'), '1. DVC - CSDL TTHC': ('19. Cơ sở dữ liệu Thủ tục hành chính (CSDL TTHC)', 'CSDL TTHC'),
       '2. PAKN vs CSDL TTHC': ('19. Cơ sở dữ liệu Thủ tục hành chính (CSDL TTHC)', 'CSDL TTHC'), '1. PAKN vs DVC': ('07. Hệ thống Hỗ trợ xử lý phản ánh kiến nghị (PAKN)', 'PAKN'),
       '1. Sàn DL vs TTTT': ('04. Hệ thống Quản lý thanh toán tập trung (TTTT)', 'TTTT')}
BANK = {'1. MoMo': ('01. MoMo', 'MoMo'), '2. VNPay': ('02. VNPAY', 'VNPAY'), '3. VPBank': ('03. VPBank', 'VPBank'), '4. TPBank': ('04. TPBank', 'TPBank'),
        '5. SHB': ('05. SHB', 'SHB'), '6. BIDV (chưa có nhóm)': ('06. BIDV', 'BIDV'), '7. NAPAS (chưa có nhóm)': ('07. NAPAS', 'NAPAS')}
have = {m.get('duong_dan') for m in muc}
nd = 0
for k, url in drive.items():
    if url in have: continue
    if k in DRV: tm, dv = P3 + ' › ' + DRV[k][0], DRV[k][1]
    else: tm, dv = P4 + ' › ' + BANK[k][0], BANK[k][1]
    nm = re.sub(r'^\d+\.\s*', '', k)
    muc.append({'ten': 'Thư mục Google Drive: ' + nm, 'loai': 'Thư mục Drive', 'duong_dan': url, 'mo_ta': 'Lối tắt thư mục Drive trong BA DOCS' + (' (TTTT – ' + nm + ')' if k in BANK else ''),
                'trang_thai': 'Có sẵn', 'nguon': 'Thư mục BA DOCS (Đấu nối với các bên)', 'ngay': today, 'don_vi': dv, 'thu_muc': tm}); nd += 1
json.dump({k: v for k, v in data.items()}, open(S + '/v10/out/tl_chat_v14.json', 'w', encoding='utf-8'), ensure_ascii=False)
print('RUN' if RUN else 'DRY', '| đổi đường dẫn', nre, '| thêm mới', len(added), '| bổ sung tệp', len(filled), filled, '| link Drive', nd, '| bỏ qua trùng', len(skipped), '| tổng mục', len(muc))
for a in added: print('  +', a)
if RUN:
    with open(T8 + B + '_NhatKy_DiChuyen_19-11-2026.csv', 'w', encoding='utf-8-sig', newline='') as fh:
        w = csv.writer(fh); w.writerow(['Việc', 'Từ', 'Đến'])
        for r in log: w.writerow(r)
        for r in skipped: w.writerow(['Bỏ qua (trùng)', SRC + B + r[0], r[2] + ' [' + r[1] + ']'])
    json.dump(skipped, open(S + '/v10/badocs_skipped.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
