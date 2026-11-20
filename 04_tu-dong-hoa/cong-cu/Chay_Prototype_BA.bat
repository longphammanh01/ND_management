@echo off
rem Bat may chu noi bo de xem prototype BA tren trinh duyet (chi may nay truy cap duoc).
rem Stagging (v2): http://localhost:8701/ban-mau/index.html
rem Tra_main (v3): http://localhost:8702/ban-mau/index.html
rem Dong cua so nay hoac tat may la may chu dung. Chay lai file nay khi can.
cd /d "%~dp0"
powershell -NoProfile -Command "foreach($p in @(@{port=8701;dir='D:\[NADAT]\Project\NDOP\GitLAB\ndop_ba_harness-stagging'},@{port=8702;dir='D:\[NADAT]\Project\NDOP\GitLAB\ndop_ba_harness-tra-main'})){ if(-not (Get-NetTCPConnection -LocalPort $p.port -State Listen -ErrorAction SilentlyContinue)){ Start-Process python -ArgumentList '-m','http.server',$p.port,'--bind','127.0.0.1','--directory',('\"'+$p.dir+'\"') -WindowStyle Hidden; Write-Host ('Da bat cong '+$p.port) } else { Write-Host ('Cong '+$p.port+' dang chay san') } }"
echo.
echo Stagging (v2): http://localhost:8701/ban-mau/index.html
echo Tra_main (v3): http://localhost:8702/ban-mau/index.html
timeout /t 5 >nul
