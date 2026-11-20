import json, sys
S = sys.argv[1]
W = []
# Đổi tên hiển thị theo danh mục 23 phần mềm nội bộ (giữ khoá liên kết cũ để không đứt luồng, tài liệu, stakeholder)
REN = {'cong-dich-vu-cong-quoc-gia': 'Cổng dịch vụ công quốc gia (DVC)', 'dmdc': 'Hệ thống Quản lý danh mục dùng chung (DMDC)',
       'ht-so-hoa-tap-trung': 'Hệ thống Số hoá tập trung (SHTT)', 'tttt': 'Hệ thống Quản lý thanh toán tập trung (TTTT)',
       'pakn': 'Hệ thống Hỗ trợ xử lý phản ánh kiến nghị (PAKN)', 'ht-quan-ly-khai-thac-du-lieu-chuyen-nganh': 'Hệ thống Quản lý, khai thác dữ liệu chuyên ngành (DLCN)',
       'ht-lien-lac': 'Hệ thống Liên lạc với cá nhân và tổ chức (HTLL)', 'ht-quan-ly-quyen-truy-cap-thong-tin-ca-nhan': 'Hệ thống Quản lý quyền truy cập TT cá nhân (TTCN)',
       'ht-quan-ly-nha-nuoc-ve-du-lieu-qlnnvdl': 'Hệ thống Quản lý Nhà nước về dữ liệu (QLNNDL)', 'san-du-lieu': 'Sàn dữ liệu (SDL)',
       'ht-quan-ly-quy-phat-trien-du-lieu-quoc-gia': 'Hệ thống Quản lý quỹ phát triển dữ liệu Quốc gia (QPTDL)', 'ht-kho-du-lieu-mo': 'Hệ thống Kho dữ liệu mở (KDLM)',
       'cong-du-lieu-mo': 'Cổng dữ liệu mở (CDLM)', 'ht-quan-tri-bao-mat-diem-ket-noi': 'Hệ thống Quản trị bảo mật điểm kết nối (QT BMĐKN)',
       'csdl-tthc': 'Cơ sở dữ liệu Thủ tục hành chính (CSDL TTHC)', 'ung-dung-tren-thiet-bi-di-dong': 'Ứng dụng trên thiết bị di động (UDDĐ)'}
for k, v in REN.items():
    W.append({'op': 'update', 'collection': 'donvi', 'doc_id': k, 'if_version': 1, 'data': {'ten_hien_thi': v, 'nhom': 'HTPM'}})
# VNPT không phải hệ thống: khoá "VNPT" (luồng TH-PM-06) hiển thị là KDLTH, VNPT là bên triển khai
W.append({'op': 'update', 'collection': 'donvi', 'doc_id': 'vnpt', 'if_version': 1, 'data': {
    'ten_hien_thi': 'Hệ thống kho dữ liệu tổng hợp (KDLTH)', 'chu_quan': 'VNPT (bên triển khai)', 'ma_tien_do': '3.6',
    'ghi_chu': 'VNPT là bên triển khai KDLTH, PTDL, CĐĐH, ĐCS. Luồng TH-PM-06 hiện ghi chung cho cả 4 hệ thống, nên tách luồng riêng khi có đầu mối từng hệ thống.'}})
# VNeID (SSO) chuyển sang phần mềm nội bộ
W.append({'op': 'update', 'collection': 'donvi', 'doc_id': 'bo-cong-an-c06', 'if_version': 1, 'data': {
    'ten_hien_thi': 'VNeID (SSO) (C06)', 'nhom': 'HTPM', 'chu_quan': 'Bộ Công an – C06', 'ma_tien_do': '4.3'}})
NEW = [
    ('he-thong-dia-chi-so-quoc-gia', 'Hệ thống địa chỉ số Quốc gia (ĐCS)', '3.13', 'VNPT', 'VNPT', 'Chưa nhận', '', 'TH-PM-06 (chung với KDLTH)', 'Đầu mối VNPT @doanducGIS (theo bảng tiến độ)'),
    ('he-thong-chi-dao-dieu-hanh', 'Hệ thống Phục vụ chỉ đạo, điều hành của CP, TTCP (CĐĐH)', '3.7', 'VNPT', 'VNPT', 'Chưa nhận', '', 'TH-PM-06 (chung với KDLTH)', 'Đầu mối VNPT @QuyPV (theo bảng tiến độ)'),
    ('nen-tang-phan-tich-du-lieu', 'Nền tảng phân tích dữ liệu (PTDL)', '3.6', 'VNPT', 'VNPT', 'Chưa nhận', '', 'TH-PM-06 (chung với KDLTH)', 'Bảng tiến độ ghi chung mục 3.6 với kho dữ liệu tổng hợp'),
    ('trung-gian-du-lieu-tgdl', 'Trung gian dữ liệu (TGDL)', '', 'FIS', 'FIS', 'Đã nhận', 'Ứng dụng 2_SDL-APISpec-TGDL-v1.3.docx (09/11/2026); API Specs phân hệ Ký số: đang xin (17/11)', 'CS-06 (mạng FIS ↔ C12); TH-PM-02 (Sàn)', 'Nhóm WhatsApp "Sàn C12- TGDL FIS (test)"'),
    ('neac', 'Hệ thống Chứng thực điện tử quốc gia (NEAC)', '4.1', 'Bộ KHCN', 'Bộ KHCN', 'Đã nhận', '2. PL_Tai_lieu_dac_ta_eSign_v2.0_17.08.2026.pdf – tài liệu nghiệp vụ Cổng eSign (14/11/2026)', 'CS-14 (chung với Bộ KHCN)', '19/11 đề xuất: NDOP cấu hình 4 API Cổng eSign và kết nối ở NDC'),
]
for i, ten, ma, cq, dvn, api, tl, lc, gc in NEW:
    W.append({'op': 'set', 'collection': 'donvi', 'doc_id': i, 'data': {'ten': ten, 'ten_hien_thi': ten, 'lien_ket': ten, 'nhom': 'HTPM', 'ma_tien_do': ma, 'chu_quan': cq, 'dv_nguoi': dvn,
        'api_spec': api, 'api_spec_tl': tl, 'api_spec_ngay': '14/11/2026' if i == 'neac' else ('09/11/2026' if api == 'Đã nhận' else ''), 'api_cancu': tl and 'Chat dự án',
        'luong_chung': lc, 'nhom_chat': 'WA Sàn C12- TGDL FIS (test)' if i.startswith('trung') else '', 'ghi_chu': gc, 'cap_nhat': '19/11/2026'}})
json.dump(W, open(S + '/v10/pm_batch.json', 'w', encoding='utf-8'), ensure_ascii=False)
print(json.dumps(W, ensure_ascii=False))
