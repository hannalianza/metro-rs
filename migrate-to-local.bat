@echo off
echo ============================================
echo  Moving metro-rs out of OneDrive
echo ============================================

set SOURCE=%~dp0
set DEST=C:\Projects\metro-rs

echo Creating C:\Projects\metro-rs...
if not exist "C:\Projects" mkdir "C:\Projects"
if exist "%DEST%" (
    echo Destination already exists. Removing...
    rmdir /s /q "%DEST%"
)

echo Copying project files (skipping node_modules and .next)...
robocopy "%SOURCE%" "%DEST%" /E /XD node_modules .next .git /XF migrate-to-local.bat /NFL /NDL /NJH /NJS

echo Installing dependencies...
cd /d "%DEST%"
npm install

echo Creating desktop shortcut...
set SHORTCUT=%USERPROFILE%\Desktop\start-metro-rs.bat
(
echo @echo off
echo cd /d "C:\Projects\metro-rs"
echo echo Killing any process on port 3000...
echo for /f "tokens=5" %%%%a in ^('netstat -aon ^| findstr ":3000 "'^) do ^(
echo     taskkill /PID %%%%a /F ^>nul 2^>^&1
echo ^)
echo timeout /t 1 /nobreak ^>nul
echo echo Starting... open http://localhost:3000 when you see Ready
echo npm run dev
) > "%SHORTCUT%"

echo.
echo ============================================
echo  Done!
echo  Project moved to C:\Projects\metro-rs
echo  Desktop shortcut: start-metro-rs
echo ============================================
pause
