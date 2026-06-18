Set shell = CreateObject("WScript.Shell")
shell.Run "cmd /c taskkill /f /im node.exe 2>nul & cd /d C:\Projects\metro-rs && npm run dev > C:\Projects\metro-rs\dev-server.log 2>&1", 1, False
