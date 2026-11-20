# Bat may chu noi bo (neu chua chay) roi mo prototype BA tren trinh duyet mac dinh.
# Duoc goi tu nut "Mo" tren trang Dau noi NDOP qua dia chi ndop-proto:stagging hoac ndop-proto:tramain
param([string]$Link = "ndop-proto:stagging")
$map = @{
  'stagging' = @{ port = 8701; dir = 'D:\[NADAT]\Project\NDOP\GitLAB\ndop_ba_harness-stagging' }
  'tramain'  = @{ port = 8702; dir = 'D:\[NADAT]\Project\NDOP\GitLAB\ndop_ba_harness-tra-main' }
}
$key = ($Link -replace '^ndop-proto:/*', '' -replace '[^a-z]', '').ToLower()
if (-not $map.ContainsKey($key)) { $key = 'stagging' }
$p = $map[$key]
if (-not (Get-NetTCPConnection -LocalPort $p.port -State Listen -ErrorAction SilentlyContinue)) {
  Start-Process python -ArgumentList '-m', 'http.server', $p.port, '--bind', '127.0.0.1', '--directory', ('"' + $p.dir + '"') -WindowStyle Hidden
  for ($i = 0; $i -lt 20; $i++) {
    Start-Sleep -Milliseconds 300
    if (Get-NetTCPConnection -LocalPort $p.port -State Listen -ErrorAction SilentlyContinue) { break }
  }
}
Start-Process ("http://localhost:{0}/ban-mau/index.html" -f $p.port)
