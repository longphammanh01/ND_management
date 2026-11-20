import json, os, re, glob, sys
S = sys.argv[1]
SRC = r'C:\Users\admin\Downloads\Đấu nối với các bên - BA DOCS'
cur = {os.path.basename(f)[:-5]: json.load(open(f, encoding='utf-8')) for f in glob.glob(S + '/db12/donvi/*.json')}
ver = {}
for f in glob.glob(S + '/db12/donvi/*.json'):
    pass
# Liên kết Google Drive trong các tệp lối tắt .html
drive = {}
for root, _, fs in os.walk(SRC):
    for fn in fs:
        if fn.endswith('.html'):
            t = open(os.path.join(root, fn), encoding='utf-8', errors='ignore').read()
            m = re.search(r'HREF="([^"]+)"', t)
            if m: drive[fn[:-5].strip()] = m.group(1)
print(json.dumps(drive, ensure_ascii=False, indent=1))
SRCN = 'Thư mục BA DOCS (Đấu nối với các bên)'
U = {  # doc_id: (thêm tài liệu, trạng thái mới nếu đổi, thêm căn cứ, liên kết Drive)
 'bo-cong-an-c06': ('API_SPECT_VNeID-SSO-V2.0-MT47.docx (đặc tả API VNeID SSO v2.0)', 'Đã nhận', 'BA DOCS: 21. VNEID (SSO) (C06); cũng nằm trong hồ sơ "Tài liệu bên DMDC gửi"', []),
 'neac': ('NEAC.pdf', None, 'BA DOCS: 23. NEAC', []),
 'trung-gian-du-lieu-tgdl': ('Ứng dụng 1_SDL_TGDL_v0.1.0.pdf', None, 'BA DOCS: 22. TGDL', []),
 'dmdc': ('DA175_POC_MS02G12_APIspec_TD_BoTaiChinh_DMDC@1.0.3_20250825.docx (POC); API_SPECT_VNeID-SSO-V2.0-MT47.docx', None, 'BA DOCS: 2. DMDC', []),
 'cong-dich-vu-cong-quoc-gia': ('HTTT_GQ_TTHC_Hệ_thống_Giải_quyết_TTHC_V20260824 (nhận 24/09/2026); Thuyết minh kiến trúc HT giải quyết TTHC', None, 'BA DOCS: 1. DVC', []),
 'tttt': ('DVCQG-Payment-Vnpay-API-Specification.docx', None, 'BA DOCS: 4. TTTT, 4. Doanh nghiệp/3. VPBank', ['1. Sàn DL vs TTTT']),
 'vpbank': ('DVCQG-Payment-Vnpay-API-Specification.docx; DVTT_Huong_dan_tich_hop_TTTT_v2.3.docx; DVCCDV-Hướng dẫn tích hợp v3.0 - XML.docx', None, 'BA DOCS: 4. Doanh nghiệp/3. VPBank (thay cho suy luận trước)', ['3. VPBank']),
 'momo': ('Momo cấu hình API gateway.docx', None, 'BA DOCS: 4. Doanh nghiệp/1. MoMo', ['1. MoMo']),
 'san-du-lieu': ('NDOP_SanDL_APIspec_UC1_UC3_v1.docx (đã có file)', None, 'BA DOCS: 12. SDL', ['3. DVC - SDL']),
 'ht-lien-lac': ('', None, 'BA DOCS: 9. HTLL', []),
 'pakn': ('3.14_pakn-expose-api-cong-dvc.docx', None, 'BA DOCS: 7. PAKN, 1. DVC/2. DVC - PAKN', ['1. PAKN vs DVC']),
 'csdl-tthc': ('', None, 'BA DOCS: 19. CSDL TTHC (chỉ có lối tắt thư mục Drive)', ['1. DVC - CSDL TTHC', '2. PAKN vs CSDL TTHC']),
 'vnpay': ('', None, '', ['2. VNPay']), 'tpbank': ('', None, '', ['4. TPBank']), 'shb': ('', None, '', ['5. SHB']), 'bidv': ('', None, '', ['6. BIDV (chưa có nhóm)']),
}
W = []
for k, (tl, st, cc, links) in U.items():
    d = cur[k]; data = d.get('data', d); v = d.get('version')
    p = {}
    if tl:
        add = [x for x in re.split(r';\s*', tl) if x and x.split(' (')[0] not in (data.get('api_spec_tl') or '')]
        if add: p['api_spec_tl'] = '; '.join([x for x in [data.get('api_spec_tl')] if x] + add)
    if st and data.get('api_spec') != st: p['api_spec'] = st
    if cc and cc not in (data.get('api_cancu') or ''): p['api_cancu'] = '; '.join([x for x in [data.get('api_cancu')] if x] + [cc])
    ls = [f'{n}: {drive[n]}' for n in links if n in drive]
    if ls: p['thu_muc_drive'] = '; '.join(ls)
    if p:
        p['cap_nhat'] = '19/11/2026'
        W.append({'op': 'update', 'collection': 'donvi', 'doc_id': k, 'data': p})
json.dump(W, open(S + '/v10/badocs1_batch.json', 'w', encoding='utf-8'), ensure_ascii=False)
json.dump(drive, open(S + '/v10/badocs_drive.json', 'w', encoding='utf-8'), ensure_ascii=False)
for w in W: print(w['doc_id'], json.dumps(w['data'], ensure_ascii=False)[:230])
