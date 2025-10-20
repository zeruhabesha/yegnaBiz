// English and Amharic translations for YegnaBiz UI copy
export type Language = 'en' | 'am'

interface TranslationTree {
  [key: string]: string | TranslationTree
}

const englishCopy: TranslationTree = {
  nav: {
    home: "Home",
    companies: "Companies",
    categories: "Categories",
    promote: "Promote",
    about: "About",
    contact: "Contact",
    admin: "Admin",
    dashboard: "Dashboard",
    signIn: "Sign In",
    signOut: "Sign Out",
    getStarted: "Get Started",
  },
  hero: {
    title: "Discover exceptional businesses across Ethiopia",
    subtitle: "Find trusted companies, read real customer reviews, and connect with services that deliver.",
    searchPlaceholder: "Search for businesses, services, or categories...",
    searchButton: "Search Businesses",
    popularSearches: "Popular searches:",
  },
  categories: {
    restaurants: "Restaurants",
    hotels: "Hotels",
    banks: "Banks",
    technology: "Technology",
    healthcare: "Healthcare",
    education: "Education",
    shopping: "Shopping",
    transportation: "Transportation",
    construction: "Construction",
    agriculture: "Agriculture",
  },
  stats: {
    businesses: "Businesses",
    verifiedListings: "Verified Listings",
    reviews: "Reviews",
    businessesDesc: "Comprehensive directory of Ethiopian businesses",
    verifiedDesc: "Every listing is carefully vetted for accuracy",
    reviewsDesc: "Authentic customer reviews and ratings",
  },
  cta: {
    title: "Grow your business with YegnaBiz",
    subtitle:
      "Thousands of Ethiopian businesses reach customers nationwide with YegnaBiz. Build trust, drive discovery, and expand your customer base.",
    addBusiness: "Add Your Business",
    viewPricing: "View Pricing",
    activeBusinesses: "Active Businesses",
    monthlyVisitors: "Monthly Visitors",
    satisfaction: "Customer Satisfaction",
  },
  footer: {
    about: "About YegnaBiz",
    aboutDesc: "A discovery platform that connects Ethiopia with remarkable businesses across every region.",
    quickLinks: "Quick Links",
    support: "Support",
    contact: "Contact",
    privacy: "Privacy",
    terms: "Terms",
    copyright: "© 2024 YegnaBiz. All rights reserved.",
  },
  status: {
    verified: "Verified",
    premium: "Premium",
    featured: "Featured",
    active: "Active",
    pending: "Pending",
    suspended: "Suspended",
  },
  actions: {
    search: "Search",
    filter: "Filter",
    sort: "Sort",
    viewAll: "View All",
    readMore: "Read More",
    writeReview: "Write a Review",
    contactBusiness: "Contact Business",
    getDirections: "Get Directions",
    call: "Call",
    email: "Email",
    website: "Website",
  },
}

const amharicCopy: TranslationTree = {
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
    getStarted: "ጀምር",
  },
  hero: {
    title: "በኢትዮጵያ ውስጥ ምርጥ ንግዶችን ያግኙ",
    subtitle: "አስተማማኝ ንግዶችን ያግኙ፣ እውነተኛ ግምገማዎችን ያንብቡ፣ ከምርጥ ንግዶች ጋር ይገናኙ",
    searchPlaceholder: "ንግዶችን፣ አገልግሎቶችን ወይም ምድቦችን ይፈልጉ...",
    searchButton: "ንግዶች ይፈልጉ",
    popularSearches: "ታዋቂ ፍለጋዎች፡",
  },
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
    agriculture: "ግብርና",
  },
  stats: {
    businesses: "ንግዶች",
    verifiedListings: "የተረጋገጡ ዝርዝሮች",
    reviews: "ግምገማዎች",
    businessesDesc: "የኢትዮጵያ ንግዶች ሙሉ ማውጫ",
    verifiedDesc: "ሁሉም ንግዶች ለትክክለኛነት የተረጋገጡ",
    reviewsDesc: "እውነተኛ የደንበኞች ግምገማዎች እና ደረጃዎች",
  },
  cta: {
    title: "ንግድዎን በ YegnaBiz ማሳደግ",
    subtitle:
      "በሺዎች የሚቆጠሩ ኢትዮጵያዊ ንግዶች ደንበኞችን በሀገር አቀፍ ደረጃ ማግኘት። ይገኙ፣ እምነት ይገንቡ፣ የደንበኞች መሰረትዎን ያሳድጉ።",
    addBusiness: "ንግድዎን ያክሉ",
    viewPricing: "ዋጋ ይመልከቱ",
    activeBusinesses: "ንቁ ንግዶች",
    monthlyVisitors: "ወርሃዊ ጎብኚዎች",
    satisfaction: "የደንበኛ እርካታ",
  },
  footer: {
    about: "ስለ YegnaBiz",
    aboutDesc: "ኢትዮጵያ ውስጥ ያሉ ምርጥ ንግዶችን ማግኘት እና ከእነሱ ጋር መገናኘት የሚችሉበት ቦታ።",
    quickLinks: "ፈጣን ማገናኚያዎች",
    support: "ድጋፍ",
    contact: "ተገናኚ",
    privacy: "ግላዊነት",
    terms: "ውልዎች",
    copyright: "© 2024 YegnaBiz. ሁሉም መብቶች የተጠበቁ ናቸው።",
  },
  status: {
    verified: "የተረጋገጠ",
    premium: "ፕሪሚየም",
    featured: "ተለይቶ የቀረበ",
    active: "ንቁ",
    pending: "በመጠበቅ ላይ",
    suspended: "የተተገበ",
  },
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
    website: "ድህረ ገጽ",
  },
}

export const translations: Record<Language, TranslationTree> = {
  en: englishCopy,
  am: amharicCopy,
}

export const defaultLanguage: Language = 'en'

function resolveTranslation(keys: string[], lang: Language): string | TranslationTree | undefined {
  return keys.reduce<string | TranslationTree | undefined>((value, key) => {
    if (value && typeof value === 'object') {
      return (value as TranslationTree)[key]
    }
    return undefined
  }, translations[lang])
}

export function getTranslation(key: string, lang: Language = defaultLanguage): string {
  const keys = key.split('.')
  const value = resolveTranslation(keys, lang)

  if (typeof value === 'string') {
    return value
  }

  const fallback = resolveTranslation(keys, 'en')
  return typeof fallback === 'string' ? fallback : key
}
