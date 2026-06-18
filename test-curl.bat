@echo off
cd /d C:\Projects\metro-rs\public\products
echo Testing single download...
curl.exe -v -L -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" -o test-xr19.jpg "https://assets.katomcdn.com/q_auto,f_auto/v1748937626/products/266/083-XR191N6/083-xr191n6.jpg"
echo Exit code: %errorlevel%
dir test-xr19.jpg
pause
