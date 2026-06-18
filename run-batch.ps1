Set-Location 'C:\Projects\metro-rs'
node batch-download.js
Write-Host "`nPress any key to close..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
