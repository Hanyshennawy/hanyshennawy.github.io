# One-time photo processing: resize chosen photos to web-friendly slugs and
# archive the originals (preserved, not shipped to the live site).
$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing

$srcDir = "public/images"
$archiveDir = "assets-source/photos"
New-Item -ItemType Directory -Force -Path $archiveDir | Out-Null

# Chosen source file -> clean web slug
$map = [ordered]@{
  "WhatsApp Image 2026-06-09 at 11.53.21 AM (1).jpeg" = "portrait-main.jpg"
  "WhatsApp Image 2026-06-09 at 11.53.21 AM (2).jpeg" = "portrait-editorial.jpg"
  "WhatsApp Image 2026-06-09 at 11.53.19 AM (2).jpeg" = "field-competency-framework.jpg"
  "WhatsApp Image 2026-06-09 at 11.53.09 AM (1).jpeg" = "field-skill-gap.jpg"
  "WhatsApp Image 2026-06-09 at 11.53.08 AM.jpeg"     = "field-power-bi.jpg"
  "WhatsApp Image 2026-06-09 at 11.53.07 AM.jpeg"     = "field-assessment.jpg"
  "WhatsApp Image 2026-06-09 at 11.53.20 AM (1).jpeg" = "field-stakeholders.jpg"
  "WhatsApp Image 2026-06-09 at 11.53.11 AM.jpeg"     = "field-leadership.jpg"
  "WhatsApp Image 2026-06-09 at 11.53.20 AM (3).jpeg" = "field-office.jpg"
  "WhatsApp Image 2026-06-09 at 11.53.09 AM.jpeg"     = "field-dialogue.jpg"
  "WhatsApp Image 2026-06-09 at 11.53.20 AM (4).jpeg" = "field-warm.jpg"
  "WhatsApp Image 2026-06-09 at 11.53.12 AM.jpeg"     = "field-personality.jpg"
}

$jpegEnc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }

function Resize-Jpeg([string]$inPath, [string]$outPath, [int]$maxSide, [int]$quality) {
  $img = [System.Drawing.Image]::FromFile($inPath)
  try {
    # Respect EXIF orientation so nothing ends up rotated.
    if ($img.PropertyIdList -contains 0x0112) {
      switch ($img.GetPropertyItem(0x0112).Value[0]) {
        3 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate180FlipNone) }
        6 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipNone) }
        8 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate270FlipNone) }
      }
    }
    $w = $img.Width; $h = $img.Height
    $scale = [Math]::Min(1.0, $maxSide / [double][Math]::Max($w, $h))
    $nw = [int][Math]::Round($w * $scale); $nh = [int][Math]::Round($h * $scale)
    $bmp = New-Object System.Drawing.Bitmap($nw, $nh)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.DrawImage($img, 0, 0, $nw, $nh)
    $ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$quality)
    $bmp.Save($outPath, $jpegEnc, $ep)
    $g.Dispose(); $bmp.Dispose()
    return "{0}x{1} -> {2}x{3}  {4:N0} KB" -f $w, $h, $nw, $nh, ((Get-Item $outPath).Length / 1KB)
  } finally { $img.Dispose() }
}

foreach ($src in $map.Keys) {
  $inPath = Join-Path $srcDir $src
  if (-not (Test-Path $inPath)) { Write-Host "MISSING: $src"; continue }
  $outPath = Join-Path $srcDir $map[$src]
  $info = Resize-Jpeg $inPath $outPath 1600 82
  Write-Host ("[ok] {0,-32} {1}" -f $map[$src], $info)
}

# Archive ALL original WhatsApp photos (chosen + unused) to preserve them.
Get-ChildItem $srcDir -Filter "WhatsApp Image*.jpeg" | ForEach-Object {
  Move-Item $_.FullName (Join-Path $archiveDir $_.Name) -Force
}

Write-Host "`n=== public/images now ==="
Get-ChildItem $srcDir | ForEach-Object { "{0,7:N0} KB  {1}" -f ($_.Length / 1KB), $_.Name }
Write-Host "`nArchived originals: $((Get-ChildItem $archiveDir).Count) files in $archiveDir"
