// Amharic translations for YegnaBiz
export const translations = {
  // Navigation
  nav: {
    home: "ዋና ገጽ",
    companies: "ኩባንያዎች",
    categories: "ምድቦች",
    promote: "ማስተዋወቅ",
    about: "ስለ እኛ",
    contact: "ተገናኚ",
    admin: "አስተዳደር",
    dashboard: "ዳሽቦርድ",
    signIn: "ግባ",
    signOut: "ውጣ",
    getStarted: "ጀምር"
  },

  // Hero Section
  hero: {
    title: "በኢትዮጵያ ውስጥ ምርጥ ንግዶችን ያግኙ",
    subtitle: "አስተማማኝ ንግዶችን ያግኙ፣ እውነተኛ ግምገማዎችን ያንብቡ፣ ከምርጥ ንግዶች ጋር ይገናኙ",
    searchPlaceholder: "ንግዶችን፣ አገልግሎቶችን ወይም ምድቦችን ይፈልጉ...",
    searchButton: "ንግዶች ይፈልጉ",
    popularSearches: "ታዋቂ ፍለጋዎች፡"
  },

  // Categories
  categories: {
    restaurants: "ምግብ ቤቶች",
    hotels: "ሆቴሎች",
    banks: "ባንኮች",
    technology: "ቴክኖሎጂ",
    healthcare: "ጤና አገልግሎቶች",
    education: "ትምህርት",
    shopping: "ገበያ",
    transportation: "ትራንስፖርት",
    construction: "ኮንስትራክሽን",
    agriculture: "ግብርና"
  },

  // Stats Section
  stats: {
    businesses: "ንግዶች",
    verifiedListings: "የተረጋገጡ ዝርዝሮች",
    reviews: "ግምገማዎች",
    businessesDesc: "የኢትዮጵያ ንግዶች ሙሉ ማውጫ",
    verifiedDesc: "ሁሉም ንግዶች ለትክክለኛነት የተረጋገጡ",
    reviewsDesc: "እውነተኛ የደንበኞች ግምገማዎች እና ደረጃዎች"
  },

  // CTA Section
  cta: {
    title: "ንግድዎን በ YegnaBiz ማሳደግ",
    subtitle: "በሺዎች የሚቆጠሩ ኢትዮጵያዊ ንግዶች ደንበኞችን በሀገር አቀፍ ደረጃ ማግኘት። ይገኙ፣ እምነት ይገንቡ፣ የደንበኞች መሰረትዎን ያሳድጉ።",
    addBusiness: "ንግድዎን ያክሉ",
    viewPricing: "ዋጋ ይመልከቱ",
    activeBusinesses: "ንቁ ንግዶች",
    monthlyVisitors: "ወርሃዊ ጎብኚዎች",
    satisfaction: "የደንበኛ እርካታ"
  },

  // Footer
  footer: {
    about: "ስለ YegnaBiz",
    aboutDesc: "ኢትዮጵያ ውስጥ ያሉ ምርጥ ንግዶችን ማግኘት እና ከእነሱ ጋር መገናኘት የሚችሉበት ቦታ።",
    quickLinks: "ፈጣን ማገናኚያዎች",
    support: "ድጋፍ",
    contact: "ተገናኚ",
    privacy: "ግላዊነት",
    terms: "ውልዎች",
    copyright: "© 2024 YegnaBiz. ሁሉም መብቶች የተጠበቁ ናቸው።"
  },

  // Company Status
  status: {
    verified: "የተረጋገጠ",
    premium: "ፕሪሚየም",
    featured: "ተለይቶ የቀረበ",
    active: "ንቁ",
    pending: "በመጠበቅ ላይ",
    suspended: "የተተገበ"
  },

  // Common Actions
  actions: {
    search: "ፈልግ",
    filter: "ማጣሪያ",
    sort: "ደርድር",
    viewAll: "ሁሉንም ይመልከቱ",
    readMore: "ተጨማሪ ያንብቡ",
    writeReview: "ግምገማ ይጻፉ",
    contactBusiness: "ንግድ ያግኙ",
    getDirections: "አቅጣጫ ያግኙ",
    call: "ደውል",
    email: "ኢሜይል",
    website: "ድህረ ገጽ"
  }
}

// Language context for switching between English and Amharic
export type Language = 'en' | 'am'

export const defaultLanguage: Language = 'en'

export function getTranslation(key: string, lang: Language = defaultLanguage): string {
  const keys = key.split('.')
  let value: any = translations

  for (const k of keys) {
    value = value?.[k]
  }

  return value || key
}
