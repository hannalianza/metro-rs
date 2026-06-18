@echo off
echo Downloading XST-72-30-N image...
powershell -Command "$dest = 'C:\Projects\metro-rs\public\products\xst-72-30-n.jpg'; try { Invoke-WebRequest -Uri 'https://primekitchensupply.com/cdn/shop/files/XST-72-30-N_1024x1024_ecad586b-95fc-4e0b-bcc8-2260f6747370_600x.jpg?v=1722628654' -OutFile $dest; $size = (Get-Item $dest).Length; Write-Host ('Downloaded: ' + $size + ' bytes') } catch { Write-Host ('ERROR: ' + $_.Exception.Message) }" > C:\Projects\metro-rs\download-log.txt 2>&1
type C:\Projects\metro-rs\download-log.txt
pause
