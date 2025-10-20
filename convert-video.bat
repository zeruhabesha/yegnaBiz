@echo off
REM Script to convert MP4 video to WebM format for better Vercel compatibility (Windows)

if not exist "public\Map_Search.mp4" (
    echo Error: Map_Search.mp4 not found in public directory
    pause
    exit /b 1
)

echo Converting Map_Search.mp4 to WebM format...
echo This may take a few minutes depending on file size...
echo.

REM Check if ffmpeg is installed
where ffmpeg >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ ffmpeg not found. Please install ffmpeg first.
    echo Download from: https://ffmpeg.org/download.html#build-windows
    echo.
    echo Alternative: Use online tools like cloudconvert.com to convert MP4 to WebM
    pause
    exit /b 1
)

REM Convert MP4 to WebM using ffmpeg with VP9 codec (better compression)
ffmpeg -i public/Map_Search.mp4 ^
    -c:v libvpx-vp9 ^
    -b:v 0 ^
    -crf 30 ^
    -c:a libopus ^
    -b:a 128k ^
    public/Map_Search.webm

if %errorlevel% equ 0 (
    echo ✅ Successfully created Map_Search.webm
    echo.
    echo File sizes:
    dir public\Map_Search.*
    echo.
    echo Both MP4 and WebM versions are now ready for deployment!
    echo The video component will automatically use the appropriate format.
) else (
    echo ❌ Conversion failed.
    echo Alternative: Use online tools like cloudconvert.com to convert MP4 to WebM
)

pause
