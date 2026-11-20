import os
B = chr(92)
web = r'D:\[NADAT]\Project\NDOP\Train AI NDOP\NDOP_QuanLy_DauNoi\web'
p = web + B + 'mo_prototype.ps1'
cmd = '"powershell.exe" -NoProfile -WindowStyle Hidden -ExecutionPolicy Bypass -File "' + p + '" "%1"'
esc = lambda s: s.replace(B, B + B).replace('"', B + '"')
lines = ['Windows Registry Editor Version 5.00', '',
         '; Dang ky nut "Mo" prototype BA tren trang Dau noi NDOP (chi cho tai khoan Windows hien tai).',
         '; Bam dup file nay, chon Yes. Muon go bo: bam dup file Go_bo_nut_Mo_prototype.reg.', '',
         '[HKEY_CURRENT_USER' + B + 'Software' + B + 'Classes' + B + 'ndop-proto]', '@="URL:NDOP Prototype BA"', '"URL Protocol"=""', '',
         '[HKEY_CURRENT_USER' + B + 'Software' + B + 'Classes' + B + 'ndop-proto' + B + 'shell' + B + 'open' + B + 'command]', '@="' + esc(cmd) + '"', '']
open(os.path.join(web, 'Dang_ky_nut_Mo_prototype.reg'), 'w', encoding='utf-16', newline='').write('\r\n'.join(lines))
open(os.path.join(web, 'Go_bo_nut_Mo_prototype.reg'), 'w', encoding='utf-16', newline='').write('\r\n'.join(['Windows Registry Editor Version 5.00', '', '[-HKEY_CURRENT_USER' + B + 'Software' + B + 'Classes' + B + 'ndop-proto]', '']))
print('\n'.join(lines))
