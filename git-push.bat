@echo off
cd /d "%~dp0"
if exist ".git\index.lock" del ".git\index.lock"
git add -A
git commit -m "Add all Refrigeration-X products"
git push origin main
echo.
echo Done! Press any key to close.
pause
