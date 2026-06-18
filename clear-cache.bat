@echo off
cd /d "%~dp0"
echo Killing any process on port 3000...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":3000 "') do (
    taskkill /PID %%a /F >nul 2>&1
)
echo Clearing .next cache...
if exist ".next" rmdir /s /q ".next"
echo Done. Now run start-dev.
pause
