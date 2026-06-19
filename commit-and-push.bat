@echo off
cd /d C:\Projects\metro-rs
git config user.email "just4metrors@gmail.com"
git config user.name "Sungwoon"
git add -A
git diff --cached --quiet
if errorlevel 1 (
    git commit -m "Update metro-rs site"
) else (
    echo Nothing new to commit.
)
git push origin main
pause
