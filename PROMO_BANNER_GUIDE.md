# Promotional Banner & Popup System

## Overview
A sticky promotional banner with auto-sliding advertisements that appears at the top of every page. Clicking the buttons opens detailed popup modals with promotional content (similar to Google Ads).

## Features

### 🎯 **Promotional Banner**
- **Sticky Position:** Always visible at the top of the page
- **Auto-Slide:** Rotates between 3 promotions every 5 seconds
- **Pause on Hover:** Stops sliding when user hovers over banner
- **Manual Navigation:** Previous/Next arrows for manual control
- **Progress Indicators:** Dots showing current slide position
- **Closeable:** Users can dismiss the banner with X button
- **Responsive:** Optimized for mobile and desktop

### 🎨 **Design Features**
- **Gradient Backgrounds:** Eye-catching blue gradients
- **Smooth Animations:** Seamless slide transitions
- **Mobile Optimized:** Touch-friendly on mobile devices
- **Professional Look:** Modern, clean design

### 📱 **Popup Modals**
When users click promotional buttons, they see:
- **Full-screen Modal:** Professional popup dialog
- **Hero Image:** Visual background with overlay
- **Pricing Display:** Clear pricing information
- **Feature List:** Bullet points with checkmarks
- **Stats Section:** Trust indicators (50K+ visitors, etc.)
- **Call-to-Action Buttons:** Direct links to relevant pages
- **Trust Badges:** Additional credibility elements

## Current Promotions

### Promotion 1: 50% OFF Premium Listing
- **Offer:** 50% discount on premium business listings
- **Price:** 2,500 ETB/month (originally 5,000 ETB)
- **CTA:** Claim Offer → Links to `/promote`

### Promotion 2: Free Business Launch
- **Offer:** Free business listing signup
- **Price:** 100% Free
- **CTA:** Get Started Free → Links to `/register`

### Promotion 3: Featured Placement
- **Offer:** Premium featured placement for businesses
- **Price:** 5,000 ETB/month (limited slots)
- **CTA:** Get Featured Now → Links to `/promote`

## Files Structure

```
components/
├── promo-banner.tsx      # Main sliding banner component
├── promo-popup.tsx       # Modal popup with promotion details
└── promo-wrapper.tsx     # Wrapper connecting banner & popup

app/
└── layout.tsx            # Integrated into global layout
```

## How It Works

### 1. Banner Display
```tsx
// Banner rotates automatically every 5 seconds
// Shows 1 of 3 promotions at a time
// User can navigate manually or close banner
```

### 2. User Clicks Button
```tsx
// onClick → Opens popup modal
// Passes promotion ID to show correct content
// Modal displays detailed promotion information
```

### 3. User Takes Action
```tsx
// Clicks CTA button → Redirects to relevant page
// /promote → Pricing plans
// /register → Sign up
// /contact → Contact sales
```

## Customization

### Adding New Promotions

Edit `components/promo-banner.tsx`:

```typescript
const promotions: Promotion[] = [
  {
    id: "4", // Unique ID
    title: "🎁 Your New Promotion Title",
    description: "Description text here",
    buttonText: "Click Here",
    bgColor: "bg-gradient-to-r from-primary to-accent",
    textColor: "text-white",
  },
  // ... existing promotions
]
```

Edit `components/promo-popup.tsx`:

```typescript
const promoContent = {
  "4": {
    title: "Your Popup Title",
    subtitle: "Subtitle here",
    features: [
      "Feature 1",
      "Feature 2",
      // ... more features
    ],
    price: {
      original: "10,000 ETB",
      discounted: "5,000 ETB",
    },
    cta: "Take Action",
    ctaLink: "/your-link",
    badge: "Limited Time",
    image: "/hero-image.jpg",
  },
}
```

### Changing Slide Duration

In `promo-banner.tsx`, modify the interval:

```typescript
const interval = setInterval(() => {
  setCurrentIndex((prev) => (prev + 1) % promotions.length)
}, 5000) // Change this number (milliseconds)
```

### Changing Colors

Each promotion has its own gradient:

```typescript
bgColor: "bg-gradient-to-r from-primary to-accent"
// Can use any Tailwind gradient classes
```

### Disabling Auto-Slide

Remove or comment out the `useEffect` with the interval in `promo-banner.tsx`.

## User Experience

### Desktop View
- Full promotional message visible
- Previous/Next navigation arrows
- Hover to pause auto-rotation
- Click button to open detailed popup

### Mobile View
- Condensed layout for small screens
- Swipeable (via manual navigation)
- Touch-optimized buttons
- Responsive popup modal

## Performance

- **Lightweight:** Minimal JavaScript overhead
- **Lazy Loading:** Images load as needed
- **Smooth Animations:** GPU-accelerated transitions
- **Zero External Dependencies:** Uses built-in React hooks

## Analytics Integration (Future)

To track banner performance, you can add:

```typescript
// In promo-banner.tsx
const handlePromoClick = (promoId: string) => {
  // Track click event
  gtag('event', 'promo_click', {
    promo_id: promoId,
    promo_name: currentPromo.title,
  })
  
  onOpenPromo(promoId)
}
```

## Accessibility

- ✅ Keyboard navigation support
- ✅ ARIA labels for screen readers
- ✅ Focus management in modals
- ✅ Closeable with Escape key
- ✅ Clear button labels

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS/Android)

## Tips

1. **Test on Mobile:** Always check mobile responsiveness
2. **Keep Text Short:** Banner space is limited
3. **Strong CTAs:** Use action-oriented button text
4. **Update Regularly:** Rotate promotions to keep content fresh
5. **A/B Testing:** Try different messages to see what converts best

## Example Use Cases

- **Seasonal Promotions:** Holiday discounts, special events
- **New Features:** Announce platform updates
- **Limited Offers:** Create urgency with countdown timers
- **Onboarding:** Welcome new users with special offers
- **Partnerships:** Cross-promote partner businesses

---

**Need help?** Check the component files or contact the development team.
