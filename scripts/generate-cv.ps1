# Render the branded CV template to a real PDF using headless Chrome/Edge.
# No npm dependencies: uses an installed Chromium browser.
$ErrorActionPreference = "Stop"

$candidates = @(
  "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
  "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
  "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe",
  "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe"
)
$browser = $candidates | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $browser) { throw "No Chrome/Edge found to render the PDF." }

$src = (Resolve-Path "cv-template/cv.html").Path
$uri = "file:///" + ($src -replace '\\', '/' -replace ' ', '%20')
$out = (Join-Path (Resolve-Path "public").Path "Hany-Moussa-CV.pdf")

if (Test-Path $out) { Remove-Item $out -Force }

Write-Host "Browser : $browser"
Write-Host "Source  : $uri"
Write-Host "Output  : $out"

& $browser `
  --headless=new --disable-gpu --no-sandbox `
  --no-pdf-header-footer `
  --run-all-compositor-stages-before-draw `
  --virtual-time-budget=6000 `
  --print-to-pdf="$out" `
  $uri 2>&1 | Out-Null

Start-Sleep -Milliseconds 400
if (Test-Path $out) {
  "OK  {0:N0} KB  ->  {1}" -f ((Get-Item $out).Length / 1KB), $out
} else {
  throw "PDF was not produced."
}
