@echo off
cd /d "%~dp0"
echo Killing any process on port 3000...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":3000 "') do (
    taskkill /PID %%a /F >nul 2>&1
)
timeout /t 1 /nobreak >nul
echo Starting dev server... Open http://localhost:3000 when you see "Ready"
npm run dev
