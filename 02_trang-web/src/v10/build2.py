import sys, re
S, F = sys.argv[1], sys.argv[2]
V = S + '/v10/'
css = open(S + '/css_v9.css', encoding='utf-8').read().strip().replace('</style>', open(V + 'css_add.css', encoding='utf-8').read() + '</style>')
body = open(V + 'body.html', encoding='utf-8').read().replace('<!--QUYTRINH-->', open(V + 'qt_section.html', encoding='utf-8').read())
js = open(V + 'app.js', encoding='utf-8').read().replace('"Bộ, ban, ngành","Bộ, ngành"', '"Bộ, ngành"')
# thay showEdit + save cũ bằng bản mới
a = js.index('function showEdit(id){'); b = js.index('async function hist(){')
js = js[:a] + js[b:]
a = js.index('async function save(){'); b = js.index('function showForm(')
js = js[:a] + js[b:]
mark = '/* ---------- Sự kiện chung ---------- */'
NL = chr(10)
js = js.replace(mark, NL.join(open(V + n, encoding='utf-8').read() for n in ('edit.js', 'qt.js', 'docs.js', 'links.js', 'actions.js', 'dv.js')) + NL + mark)
js = js.replace('function rAll(){', 'function rAll(){rQt();', 1)
js = js.replace('[["qDv",rUnits]', '$("qtRef").innerHTML=QREF.map(([t,h])=>`<details class="card" data-k="qr:${t}"><summary class="grp"><h3>${t}</h3></summary><div class="pad prose">${h}</div></details>`).join("");\n[["qQt",rQt],["qDv",rUnits]')
out = '<title>Quản trị NDOP</title>\n<meta name="claude:viewport-fit-sides" content="cover">\n' + css + '\n\n' + body + '\n<script>\n' + js + '</script>\n'
open(F, 'w', encoding='utf-8').write(out)
open(V + 'check.js', 'w', encoding='utf-8').write(js)
print(len(out), out.count('tường lửa'))
