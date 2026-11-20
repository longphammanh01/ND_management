import json, re, unicodedata, sys
S = sys.argv[1]
def slug(s):
    s = unicodedata.normalize('NFD', s); s = ''.join(c for c in s if unicodedata.category(c) != 'Mn').replace('đ', 'd').replace('Đ', 'D')
    return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')[:60]
D = []
def add(ten, nhom, lien_ket='', ma_td='', chu_quan='', dv_nguoi='', api='Chưa nhận', tl='', ngay='', cancu='', ghi_chu='', luong_chung=''):
    D.append(dict(ten=ten, nhom=nhom, lien_ket=lien_ket or ten, ma_tien_do=ma_td, chu_quan=chu_quan, dv_nguoi=dv_nguoi, api_spec=api, api_spec_tl=tl, api_spec_ngay=ngay, api_cancu=cancu, ghi_chu=ghi_chu, luong_chung=luong_chung, cap_nhat='19/11/2026'))
# --- Đơn vị đã có luồng (lien_ket = tên đơn vị trên luồng)
add('PAKN (MBFS)', 'HTPM', ma_td='3.14', chu_quan='Mobifone (D01)', dv_nguoi='PAKN', api='Đã nhận', tl='pakn-expose-api-cong-dvc (1).docx', ngay='08/10/2026', cancu='API expose PAKN gửi nhóm [MBF-NADAT-C12]')
add('CSDL TTHC', 'HTPM', ma_td='3.21', chu_quan='Mobifone (D01)', dv_nguoi='Cổng DVC', api='Đã nhận', tl='Tài liệu tích hợp Cổng DVC → CSDL TTHC (Google Docs); TTTT-DVC.docx', ngay='08/10/2026', cancu='Nhóm [MBF-NADAT-C12]')
add('TTTT (MBFS)', 'HTPM', ma_td='3.8', chu_quan='Mobifone (D01)', dv_nguoi='TTTT', api='Đã nhận', tl='DVCQG-Payment-API-Specification.docx; DVTT_Huong_dan_tich_hop_TTTT_v2.3.docx', ngay='07/10/2026', cancu='Nhóm DVC-NDOP-TTTT, MBFS-NADAT Nội bộ')
add('PAKN → CSDL TTHC', 'HTPM', ma_td='3.14', chu_quan='Mobifone (D01)', dv_nguoi='PAKN', api='Đã nhận', cancu='Suy ra: 3 API PAKN → CSDL TTHC đã thông từ 17/10')
add('Sàn dữ liệu (VNTDO)', 'HTPM', ma_td='3.18', chu_quan='Data X / VNTDO', dv_nguoi='Sàn dữ liệu', api='Đã nhận', tl='DVCCDV-Hướng dẫn tích hợp v3.1 - XML.docx', ngay='06/10/2026', cancu='Nhóm D01-NADAT-VNTDO')
add('Sàn dữ liệu – UC1, UC3', 'HTPM', ma_td='3.18', chu_quan='Data X / VNTDO', dv_nguoi='Sàn dữ liệu', api='Đã nhận', tl='NDOP_SanDL_APIspec_UC1_UC3_v1.docx; Ứng dụng 2_SDL-APISpec-TGDL-v1.3.docx', ngay='09/11/2026', cancu='WhatsApp NADAT-SÀN DỮ LIỆU, Sàn C12-TGDL FIS')
add('HT liên lạc CN-TC + SMS Brandname', 'HTPM', ma_td='3.17', chu_quan='Gtel (D02)', dv_nguoi='HT liên lạc', api='Đã nhận', tl='LLCNTC_Tài_Liệu_Kỹ_Thuật_Kết_Nối_Đến_Hệ_Thống_2_2.pdf; MDSCCBS_API_CSKH_HDSD_2026.doc', ngay='25/10/2026', cancu='Nhóm MBFS-NADAT Nội bộ')
add('DMDC (Teca/MBF)', 'HTPM', ma_td='3.4', chu_quan='TECAPRO', dv_nguoi='DMDC', api='Đã nhận', tl='C12_TichHop_MS02_HTDMDC_BTC_APISpecs_v1.1.7; DieuPhoi_APINoiBo_HTDMDC_*; 22102026_API Specs_DP_DMDC_DL Dân cư C06_v0.1', ngay='15/10/2026', cancu='Nhóm [DMDC-KTDLCN-NADAT]')
add('VNPT – Kho tổng hợp, PM phân tích, CĐĐH, Địa chỉ số', 'HTPM', ma_td='3.6; 3.7; 3.13', chu_quan='VNPT', dv_nguoi='VNPT', api='Đang chờ', cancu='Luồng TH-PM-06 đang ở bước "Chờ API spec"')
add('Bộ KHCN (GQTTHC, NEAC)', 'BBN', ma_td='4.1', dv_nguoi='Bộ KHCN', api='Đã nhận', tl='HTTT_GQ_TTHC_Hệ_thống_Giải_quyết_TTHC_V20260828.docx; 2. PL_Tai_lieu_dac_ta_eSign_v2.0_17.08.2026.pdf (tài liệu nghiệp vụ Cổng eSign)', ngay='14/11/2026', cancu='MBFS-NADAT Nội bộ 23/10; Viber NDOP 14/11')
add('Bộ KHCN – 3 CSDL', 'BBN', ma_td='4.1', dv_nguoi='Bộ KHCN', api='Đã nhận', cancu='Suy ra: đã ký BBNT DevTest 09/10')
add('Bộ Tư pháp', 'BBN', ma_td='4.11', dv_nguoi='Bộ Tư pháp', api='Đã nhận', cancu='Chat Zalo BTP–HTQL TTTT: TTTT gửi API dev 15/10, BTP gửi callback 17/10 (không có file)')
add('Bộ Tư pháp – TGPL', 'BBN', ma_td='4.11', dv_nguoi='Bộ Tư pháp', api='Đã nhận', tl='POC_MS02G15_APIspec_TD_BTP_TGPL@1.0.6.docx', ngay='29/09/2026', cancu='Zalo C12-TGPL')
add('Bộ Xây dựng – CSDL HĐXD', 'BBN', ma_td='4.4', dv_nguoi='Bộ Xây dựng', api='Đã nhận', tl='POC_MS02g17_APIspec_TD_BXD_CSDLQGHoatDongXayDung_@1.0.6.docx (+ CSDL Đăng kiểm, Hàng hải @1.0)', ngay='12/11/2026', cancu='Nhóm Xây dựng tài liệu đặc tả BXD/TTDLQG')
add('Bộ Nội vụ', 'BBN', ma_td='4.7', dv_nguoi='Bộ Nội vụ', api='Chưa rõ', cancu='Luồng TH-BBN-04 ở bước nhắc hạn; chưa thấy file đặc tả trong chat')
add('Bộ NN&MT – 04 CSDL', 'BBN', ma_td='4.5', dv_nguoi='Bộ NN&MT', api='Đang chờ', ngay='20/11/2026', cancu='Kế hoạch pha 1 (15/11): NADAT gửi 5 API DVC 19/11, API 49 DMDC 20/11; Bộ gửi XML mẫu')
add('NHNN', 'BBN', ma_td='4.16', dv_nguoi='NHNN', api='Đã nhận', tl='DA175_POC_MS02G19_APIspec_TD_NHNN@2.0.6.docx', ngay='23/09/2026', cancu='Zalo C12-NHNN (NHNN chưa góp ý)')
add('Rà soát UC 18 API Bộ ngành', 'BBN', ma_td='4', dv_nguoi='VNPT', api='Đã nhận', tl='RaSoatAPI_20261029.xlsx', ngay='29/10/2026', cancu='Nhóm rà soát UC dữ liệu')
add('Bộ Công an – C06 SSO', 'BBN', ma_td='4.3', dv_nguoi='Bộ Công an – C06', api='Chưa rõ', cancu='Cấu hình 2 API lấy token, thông tin user (Viber 10/11); chưa thấy file đặc tả SSO VNeID')
add('Hà Nội (DVC HN)', 'ĐP', ma_td='7.1', dv_nguoi='Hà Nội', api='Chưa rõ', cancu='Chưa thấy file đặc tả')
add('Thanh Hoá – HT GQTTHC', 'ĐP', ma_td='7.32', dv_nguoi='Cổng DVC', api='Chưa rõ', cancu='Đã cài ShareNode; chưa thấy file đặc tả')
add('32 tỉnh còn lại', 'ĐP', ma_td='7', dv_nguoi='Gtel', api='Không áp dụng', cancu='Luồng gộp, theo dõi từng tỉnh ở dòng riêng')
add('Dữ liệu sai khác (PAKN → NTTH → Kho sai khác)', 'Nội bộ NDC', dv_nguoi='PAKN', api='Đã nhận', tl='API_Spec_PAKN_SaiKhac_v2.docx', ngay='11/11/2026', cancu='Nhóm DA175-PAKN+PA-SaiKhac')
add('Kho dùng chung', 'Nội bộ NDC', ma_td='5.1', api='Không áp dụng', cancu='Việc nội bộ tại NDC')
add('Cụm ký số / xác thực ký số NDC', 'Nội bộ NDC', api='Đang chờ', cancu='17/11 NADAT xin FIS gửi API Specs phân hệ Ký số')
for b, n in [('VNPAY', 'VNPAY'), ('VPBank', 'VPBank'), ('SHB', 'SHB')]:
    add(b, 'DN', dv_nguoi=n, api='Đã nhận', cancu={'VNPAY': 'Suy ra: đang chạy live trên 103', 'VPBank': 'Suy ra: đã ký BBNT DevTest 24/09', 'SHB': 'Suy ra: BBNT 03/11 đạt 15/17'}[b])
add('MoMo', 'DN', dv_nguoi='MoMo', api='Đã nhận', tl='[MoMo] [PROD] API Service.xlsx', ngay='26/10/2026', cancu='Nhóm MoMo x C12')
add('TPBank', 'DN', dv_nguoi='TPBank', api='Chưa nhận', cancu='Đang vướng kênh truyền, chưa trao đổi API')
add('BIDV', 'DN', dv_nguoi='', api='Chưa nhận', cancu='Chưa có nhóm chat, chưa có đầu mối')
# --- Đơn vị chưa có luồng (theo bảng tiến độ dự án, file Input NDOP_QL Đơn vị)
add('Cổng dịch vụ công quốc gia', 'HTPM', ma_td='3.5', chu_quan='Mobifone (D01)', dv_nguoi='Cổng DVC', api='Đã nhận', tl='DVCQG-Payment-API-Specification.docx; DVCCDV-Hướng dẫn tích hợp v3.1', ngay='07/10/2026', cancu='Là đầu nối của CS-01, CS-02, CS-03, CS-14', ghi_chu='Đối tác chung của các luồng CS-01/02/03/14')
for ma, ten, cq in [('3.3', 'HT Quản trị bảo mật điểm kết nối', 'Gtel (D02)'), ('3.9', 'HT Quản lý, khai thác dữ liệu chuyên ngành', 'TECAPRO'), ('3.10', 'HT Quản lý quyền truy cập thông tin cá nhân', 'TECAPRO'),
                    ('3.11', 'HT Quản lý nhà nước về dữ liệu (QLNNvDL)', 'TECAPRO'), ('3.12', 'HT Số hoá tập trung', 'TECAPRO'), ('3.15', 'HT Kho dữ liệu mở', 'TECAPRO'), ('3.16', 'Cổng dữ liệu mở', 'TECAPRO'),
                    ('3.19', 'HT Quản lý Quỹ phát triển dữ liệu quốc gia', 'TECAPRO'), ('3.20', 'Ứng dụng trên thiết bị di động', 'VNPT')]:
    add(ten, 'HTPM', ma_td=ma, chu_quan=cq, ghi_chu='Có trong bảng tiến độ dự án, chưa có luồng' + ('; 09/11 Cổng ↔ QLNNvDL đã kết nối trên NDC' if ma == '3.11' else ''))
add('Bộ Công an – Dữ liệu dân cư', 'BBN', ma_td='4.3', dv_nguoi='Bộ Công an – C06', ghi_chu='Liên quan luồng điều phối dữ liệu dân cư C06 trong TH-PM-03 (DMDC)')
for ma, ten in [('4.2', 'Bộ Tài chính'), ('4.6', 'Bộ Dân tộc và Tôn giáo'), ('4.8', 'Bộ Văn hoá, Thể thao và Du lịch'), ('4.9', 'Bộ Giáo dục và Đào tạo'), ('4.10', 'Bộ Y tế'),
                ('4.12', 'Bộ Công Thương'), ('4.13', 'Bộ Ngoại giao'), ('4.14', 'Bộ Quốc phòng'), ('4.15', 'Thanh tra Chính phủ'), ('4.17', 'Văn phòng Chính phủ')]:
    add(ten, 'BBN', ma_td=ma, ghi_chu={'4.2': 'Có nhóm Zalo "C12 - Bộ tài chính - BHXH", "C12-BTC-CSDL Tổng hợp về Tài chính" (chưa có trao đổi)', '4.10': 'Có nhóm Zalo "C12 - BYT - Tích hợp 04 CSDL" (chưa có trao đổi)'}.get(ma, 'Có trong bảng tiến độ dự án, chưa có luồng'))
TINH = ['Hồ Chí Minh', 'Cần Thơ', 'Đà Nẵng', 'Hải Phòng', 'Huế', 'An Giang', 'Bắc Ninh', 'Cà Mau', 'Cao Bằng', 'Đắk Lắk', 'Điện Biên', 'Đồng Nai', 'Đồng Tháp', 'Gia Lai', 'Hà Tĩnh', 'Hưng Yên',
        'Khánh Hoà', 'Lai Châu', 'Lâm Đồng', 'Lạng Sơn', 'Lào Cai', 'Nghệ An', 'Ninh Bình', 'Phú Thọ', 'Quảng Ngãi', 'Quảng Ninh', 'Quảng Trị', 'Sơn La', 'Tây Ninh', 'Thái Nguyên', 'Tuyên Quang', 'Vĩnh Long']
for i, t in enumerate(TINH):
    add('Tỉnh ' + t if t not in ('Hồ Chí Minh', 'Cần Thơ', 'Đà Nẵng', 'Hải Phòng', 'Huế') else 'TP ' + t, 'ĐP', ma_td='7.' + str(i + 2), luong_chung='ĐP-khác (32 tỉnh còn lại)', ghi_chu='Gộp trong luồng ĐP-khác')
LK = {'PAKN (MBFS)': 'PAKN', 'PAKN → CSDL TTHC': 'PAKN', 'TTTT (MBFS)': 'TTTT', 'Sàn dữ liệu (VNTDO)': 'Sàn dữ liệu', 'Sàn dữ liệu – UC1, UC3': 'Sàn dữ liệu',
      'HT liên lạc CN-TC + SMS Brandname': 'HT liên lạc', 'DMDC (Teca/MBF)': 'DMDC', 'VNPT – Kho tổng hợp, PM phân tích, CĐĐH, Địa chỉ số': 'VNPT',
      'Bộ KHCN (GQTTHC, NEAC)': 'Bộ KHCN', 'Bộ KHCN – 3 CSDL': 'Bộ KHCN', 'Bộ Tư pháp – TGPL': 'Bộ Tư pháp', 'Bộ Xây dựng – CSDL HĐXD': 'Bộ Xây dựng',
      'Bộ NN&MT – 04 CSDL': 'Bộ NN&MT', 'Rà soát UC 18 API Bộ ngành': 'Rà soát API Bộ ngành', 'Bộ Công an – C06 SSO': 'Bộ Công an – C06', 'Hà Nội (DVC HN)': 'Hà Nội',
      'Thanh Hoá – HT GQTTHC': 'Thanh Hoá', 'Dữ liệu sai khác (PAKN → NTTH → Kho sai khác)': 'Dữ liệu sai khác', 'Cụm ký số / xác thực ký số NDC': 'Ký số NDC'}
M = {}
for d in D:
    k = LK.get(d['ten'], d['ten']); d['ten'] = d['lien_ket'] = k
    if k not in M: M[k] = d; continue
    o = M[k]
    for f in ('api_spec_tl', 'api_cancu', 'ma_tien_do'):
        if d[f] and d[f] not in o[f]: o[f] = (o[f] + '; ' + d[f]).strip('; ')
    if d['api_spec_ngay'] > o['api_spec_ngay']: o['api_spec_ngay'] = d['api_spec_ngay']
D = list(M.values())
W = [{'op': 'set', 'collection': 'donvi', 'doc_id': slug(d['ten']), 'data': d} for d in D]
ids = [w['doc_id'] for w in W]; assert len(ids) == len(set(ids)), [i for i in ids if ids.count(i) > 1]
for k in range(0, len(W), 50):
    json.dump(W[k:k + 50], open(f'{S}/v10/donvi_batch_{k // 50}.json', 'w', encoding='utf-8'), ensure_ascii=False)
print(len(W))
