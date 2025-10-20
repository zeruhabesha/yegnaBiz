#!/bin/bash
# Script to convert MP4 video to WebM format for better Vercel compatibility

if [ ! -f "public/Map_Search.mp4" ]; then
    echo "Error: Map_Search.mp4 not found in public directory"
    exit 1
fi

echo "Converting Map_Search.mp4 to WebM format..."
echo "This may take a few minutes depending on file size..."

# Convert MP4 to WebM using ffmpeg with VP9 codec (better compression)
ffmpeg -i public/Map_Search.mp4 \
    -c:v libvpx-vp9 \
    -b:v 0 \
    -crf 30 \
    -c:a libopus \
    -b:a 128k \
    public/Map_Search.webm

if [ $? -eq 0 ]; then
    echo "✅ Successfully created Map_Search.webm"
    echo ""
    echo "File sizes:"
    ls -lh public/Map_Search.*
    echo ""
    echo "Both MP4 and WebM versions are now ready for deployment!"
    echo "The video component will automatically use the appropriate format."
else
    echo "❌ Conversion failed. Please install ffmpeg and try again."
    echo "Alternative: Use online tools like cloudconvert.com to convert MP4 to WebM"
fi
