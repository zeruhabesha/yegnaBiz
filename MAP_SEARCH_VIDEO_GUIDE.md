# Map Search Video Instructions

## 📹 Video Background for Home Hero Section

The `SearchHero` component now supports a video background. Here's what you need to know:

### 🎯 Current Setup
- **Component:** `components/search-hero.tsx` (lines 24-42)
- **Video Element:** `<source src="/Map_Search.mp4" type="video/mp4" />`
- **Fallback:** Static placeholder if video fails to load

### 📋 Video Requirements
- **Location:** `/public/Map_Search.mp4`
- **Format:** MP4 (H.264 codec recommended)
- **Resolution:** 1920x1080 (Full HD) minimum
- **Duration:** 30-60 seconds for looping
- **File Size:** Under 5MB for optimal web performance
- **Aspect Ratio:** 16:9

### 🎨 Content Suggestions
- **Animated map of Ethiopia** with search functionality
- **Business location pins** appearing on the map
- **Search animations** or location markers
- **Ethiopian landmarks** and business districts
- **Smooth transitions** between different regions

### 🛠️ Technical Features
- **Autoplay:** Video plays automatically (muted for browser policies)
- **Loop:** Continuous playback
- **Mobile Optimized:** `playsInline` for iOS compatibility
- **Styling:** Dark overlay (70% opacity) for text readability
- **Fallback:** Shows placeholder if video doesn't load

### 🚀 Implementation Steps

1. **Create/Edit Video:**
   ```bash
   # Place your video file here:
   /public/Map_Search.mp4
   ```

2. **Test Video:**
   - Refresh homepage: `http://localhost:3000`
   - Video should autoplay in background
   - Text should remain readable over video

3. **Optimize if needed:**
   - Use video compression tools
   - Convert to WebM for better performance
   - Add multiple source formats

### 📱 Browser Compatibility
- ✅ Chrome, Firefox, Safari, Edge
- ✅ Mobile browsers (iOS/Android)
- ✅ Autoplay requires video to be muted
- ⚠️ Some browsers may require user interaction for autoplay

### 🎨 Customization Options
You can modify the video styling in `components/search-hero.tsx`:
- **Brightness/Contrast:** `filter: 'brightness(0.4) contrast(1.1)'`
- **Overlay:** `bg-gradient-to-br from-black/70 via-black/60 to-primary/80`
- **Fallback:** Custom background image or color

### 🔧 Troubleshooting
- **Video not loading:** Check file path and permissions
- **No autoplay:** Ensure video is muted (`muted` attribute)
- **Performance issues:** Compress video or reduce resolution
- **Mobile issues:** Verify `playsInline` attribute is present

The current setup provides a professional video background that enhances the search experience while maintaining excellent performance and accessibility.
