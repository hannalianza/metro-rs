$url = 'https://assets.katomcdn.com/q_auto,f_auto/v1748937626/products/266/083-XST7230N/083-xst7230n.jpg'
$dest = 'C:\Projects\metro-rs\public\products\xst-72-30-n.jpg'
curl.exe -L -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" -o $dest $url
$size = (Get-Item $dest).Length
Write-Host "Downloaded $size bytes to $dest"
Start-Sleep 3
