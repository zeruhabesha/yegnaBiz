# Video Background Troubleshooting for Vercel

## 🚨 Problem: Video Background Not Working on Vercel

Your video background works locally but fails on Vercel deployment. Here are the solutions:

## ✅ Solution 1: Optimize Video for Vercel

### Video Requirements for Vercel:
- **Format:** MP4 (H.264) + WebM (VP8/VP9)
- **Size:** Under 5MB per file
- **Resolution:** 1920x1080 maximum
- **Duration:** 30-60 seconds
- **Codec:** H.264 for MP4, VP8/VP9 for WebM

### Steps:
1. **Create WebM version:**
   ```bash
   # Convert MP4 to WebM (better compression)
   ffmpeg -i Map_Search.mp4 -c:v libvpx-vp9 -b:v 0 -crf 30 -c:a libopus Map_Search.webm
   ```

2. **Place both files:**
   ```
   /public/Map_Search.mp4    (1.4MB - your current file)
   /public/Map_Search.webm   (create this)
   ```

3. **Updated component already supports both formats**

## ✅ Solution 2: Alternative Background Image

If video still doesn't work, use a high-quality static image:

```tsx
// In components/search-hero.tsx, replace video section with:
<div
  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: "url('/hero-map-background.jpg')"
  }}
>
  <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-primary/80"></div>
</div>
```

## ✅ Solution 3: CSS Animation Background

Simple animated gradient background:

```tsx
{/* Replace video section with: */}
<div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-blue-500/20 to-purple-500/20 animate-pulse">
  <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-primary/80"></div>
</div>
```

## 🔧 Vercel-Specific Optimizations Applied

I've updated your `next.config.mjs` with:
- ✅ `experimental.video: true` - Enables video support
- ✅ `media-src 'self' data: blob:` - Allows video in CSP
- ✅ Proper headers for video serving

## 🧪 Testing on Vercel

1. **Deploy to Vercel:**
   ```bash
   git add .
   git commit -m "Fix video background for Vercel deployment"
   git push origin main
   ```

2. **Check deployment:**
   - Go to your Vercel dashboard
   - Check build logs for video-related errors
   - Test homepage: `https://your-app.vercel.app`

3. **Debug steps:**
   - Open browser DevTools → Network tab
   - Look for `Map_Search.mp4` requests
   - Check if file loads (200 status) or fails (404)

## 📊 File Size Check

Your current video: **1.4MB** ✅ (Good for Vercel)

If still having issues:
1. **Compress further:** Use online tools like TinyPNG or CloudConvert
2. **Check file format:** Ensure H.264 codec
3. **Alternative hosting:** Use Vercel Blob or external CDN for video

## 🚀 Quick Fix Options

### Option A: Keep Video (Recommended)
- Ensure both MP4 and WebM formats exist
- Check Vercel build logs for errors

### Option B: Static Image Fallback
- Use high-quality map image as background
- Maintains visual appeal without video complexity

### Option C: CSS Animation
- Lightweight animated background
- Works perfectly on all platforms

## 🔍 Common Vercel Video Issues

1. **File not found:** Video file not in `/public/`
2. **Size too large:** Vercel has file size limits
3. **CORS issues:** Headers not properly set
4. **Codec incompatibility:** Unsupported video codec

The updated component now handles multiple fallback scenarios and should work better on Vercel! 🎉
