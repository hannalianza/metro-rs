#
# metro-rs sync watcher
# Watches the OneDrive project folder and mirrors changed files into
# C:\Projects\metro-rs (the folder the local dev server actually runs from),
# since OneDrive-synced folders cannot run the Next.js dev server directly.
#
# One-directional: OneDrive -> Projects only. Never writes back into OneDrive.
# Skips .git, node_modules, .next, .claude (not needed in the preview copy)
# and any file/folder starting with "_" (temp/diagnostic scripts).
#

$src = "C:\Users\just4\OneDrive\5744~1\metro-rs"
$dest = "C:\Projects\metro-rs"
$excludeDirs = @('.git', 'node_modules', '.next', '.claude')

Write-Host "metro-rs sync watcher started"
Write-Host "  Source: $src"
Write-Host "  Dest:   $dest"
Write-Host "Watching for changes... (close this window to stop syncing)"
Write-Host ""

function Sync-Item {
    param([string]$fullPath)

    if (-not (Test-Path -LiteralPath $fullPath)) { return }

    $rel = $fullPath.Substring($src.Length).TrimStart('\')
    if ([string]::IsNullOrWhiteSpace($rel)) { return }

    $firstSeg = $rel.Split('\')[0]
    if ($excludeDirs -contains $firstSeg) { return }
    if ($firstSeg.StartsWith('_')) { return }

    $destPath = Join-Path $dest $rel

    try {
        $item = Get-Item -LiteralPath $fullPath -Force
        if ($item.PSIsContainer) {
            New-Item -ItemType Directory -Path $destPath -Force -ErrorAction SilentlyContinue | Out-Null
        } else {
            $destDir = Split-Path $destPath -Parent
            if (-not (Test-Path -LiteralPath $destDir)) {
                New-Item -ItemType Directory -Path $destDir -Force | Out-Null
            }
            Copy-Item -LiteralPath $fullPath -Destination $destPath -Force -ErrorAction Stop
            Write-Host "$(Get-Date -Format 'HH:mm:ss')  synced  $rel"
        }
    } catch {
        # OneDrive may briefly lock a file mid-write; retry once after a short delay
        Start-Sleep -Milliseconds 400
        try {
            Copy-Item -LiteralPath $fullPath -Destination $destPath -Force -ErrorAction Stop
            Write-Host "$(Get-Date -Format 'HH:mm:ss')  synced  $rel (after retry)"
        } catch {
            Write-Host "$(Get-Date -Format 'HH:mm:ss')  FAILED  $rel - $($_.Exception.Message)"
        }
    }
}

$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $src
$watcher.IncludeSubdirectories = $true
$watcher.NotifyFilter = [System.IO.NotifyFilters]::LastWrite -bor `
                         [System.IO.NotifyFilters]::FileName -bor `
                         [System.IO.NotifyFilters]::DirectoryName -bor `
                         [System.IO.NotifyFilters]::Size

$action = {
    Sync-Item -fullPath $Event.SourceEventArgs.FullPath
}

Register-ObjectEvent $watcher 'Changed' -Action $action | Out-Null
Register-ObjectEvent $watcher 'Created' -Action $action | Out-Null
Register-ObjectEvent $watcher 'Renamed' -Action $action | Out-Null

$watcher.EnableRaisingEvents = $true

while ($true) { Start-Sleep -Seconds 1 }
