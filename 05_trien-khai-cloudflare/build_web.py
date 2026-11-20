# Tạo public/index.html (trang + lớp thay thế window.claude) và seed.sql (nạp dữ liệu từ 03_du-lieu).
# Cách dùng (từ thư mục này):  python build_web.py
import os, json, glob, shutil
HERE = os.path.dirname(os.path.abspath(__file__))
SRC_HTML = os.path.join(HERE, '..', '02_trang-web', 'dau-noi-ndop.html')
DATA = os.path.join(HERE, '..', '03_du-lieu')
PUB = os.path.join(HERE, 'public')
os.makedirs(PUB, exist_ok=True)
page = open(SRC_HTML, encoding='utf-8').read()
html = ('<!doctype html>\n<html lang="vi">\n<head>\n<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'
        '<style>[hidden]{display:none!important}</style>\n'  # claude.ai tự thêm luật này; chạy riêng phải tự có
        '<script src="claude-shim.js"></script>\n</head>\n<body>\n' + page + '\n</body>\n</html>\n')
open(os.path.join(PUB, 'index.html'), 'w', encoding='utf-8').write(html)
shutil.copy(os.path.join(HERE, 'claude-shim.js'), PUB)
q = lambda s: "'" + s.replace("'", "''") + "'"
rows, cols = [], set()
for f in sorted(glob.glob(os.path.join(glob.escape(DATA), '*', '*.json'))):
    col = os.path.basename(os.path.dirname(f)); did = os.path.basename(f)[:-5]
    data = json.load(open(f, encoding='utf-8'))
    rows.append(f"INSERT OR REPLACE INTO docs(col,id,data,updated) VALUES({q(col)},{q(did)},{q(json.dumps(data, ensure_ascii=False))},0);")
    cols.add(col)
rows += [f"INSERT OR REPLACE INTO colver(col,v) VALUES({q(c)},1);" for c in sorted(cols)]
open(os.path.join(HERE, 'seed.sql'), 'w', encoding='utf-8').write(open(os.path.join(HERE, 'schema.sql'), encoding='utf-8').read() + '\n'.join(rows) + '\n')
print('index.html:', len(html), 'ký tự | seed.sql:', len(rows) - len(cols), 'tài liệu,', len(cols), 'nhóm')
