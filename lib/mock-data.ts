export interface Company {
  id: number
  name: string
  slug: string
  description: string
  category: string
  subcategory?: string
  logoUrl?: string
  coverImageUrl?: string
  email?: string
  phone?: string
  website?: string
  address?: string
  city?: string
  region?: string
  country: string
  isVerified: boolean
  isFeatured: boolean
  isPremium: boolean
  status: string
  viewCount: number
  rating: number
  reviewCount: number
  establishedYear?: number
  employeeCount?: string
  socialLinks?: SocialLink[]
  businessHours?: BusinessHours[]
}

export interface Review {
  id: number
  companyId: number
  userId: number
  userName: string
  userAvatar?: string
  rating: number
  title: string
  comment: string
  isVerified: boolean
  createdAt: string
}

export interface SocialLink {
  platform: string
  url: string
}

export interface BusinessHours {
  dayOfWeek: number
  openTime?: string
  closeTime?: string
  isClosed: boolean
}

export const mockCompanies: Company[] = [
  {
    id: 1,
    name: "Ethio Telecom",
    slug: "ethio-telecom",
    description:
      "Leading telecommunications service provider in Ethiopia offering mobile, internet, and enterprise solutions.",
    category: "Technology",
    subcategory: "Telecommunications",
    email: "info@ethiotelecom.et",
    phone: "+251-11-515-5000",
    website: "https://www.ethiotelecom.et",
    address: "Churchill Avenue",
    city: "Addis Ababa",
    region: "Addis Ababa",
    country: "Ethiopia",
    isVerified: true,
    isFeatured: true,
    isPremium: true,
    status: "active",
    viewCount: 15420,
    rating: 4.2,
    reviewCount: 1250,
    establishedYear: 1894,
    employeeCount: "1000+",
    socialLinks: [
      { platform: "facebook", url: "https://facebook.com/ethiotelecom" },
      { platform: "twitter", url: "https://twitter.com/ethiotelecom" },
    ],
    businessHours: [
      { dayOfWeek: 0, openTime: "08:00", closeTime: "17:00", isClosed: false },
      { dayOfWeek: 1, openTime: "08:00", closeTime: "17:00", isClosed: false },
      { dayOfWeek: 2, openTime: "08:00", closeTime: "17:00", isClosed: false },
      { dayOfWeek: 3, openTime: "08:00", closeTime: "17:00", isClosed: false },
      { dayOfWeek: 4, openTime: "08:00", closeTime: "17:00", isClosed: false },
      { dayOfWeek: 5, openTime: "08:00", closeTime: "13:00", isClosed: false },
      { dayOfWeek: 6, isClosed: true },
    ],
  },
  {
    id: 2,
    name: "Ethiopian Airlines",
    slug: "ethiopian-airlines",
    description:
      "Africa's largest and most profitable airline, connecting Ethiopia to the world with exceptional service.",
    category: "Transportation",
    subcategory: "Aviation",
    email: "contact@ethiopianairlines.com",
    phone: "+251-11-665-5666",
    website: "https://www.ethiopianairlines.com",
    address: "Bole International Airport",
    city: "Addis Ababa",
    region: "Addis Ababa",
    country: "Ethiopia",
    isVerified: true,
    isFeatured: true,
    isPremium: true,
    status: "active",
    viewCount: 28950,
    rating: 4.5,
    reviewCount: 3420,
    establishedYear: 1945,
    employeeCount: "1000+",
    socialLinks: [
      { platform: "facebook", url: "https://facebook.com/ethiopianairlines" },
      { platform: "twitter", url: "https://twitter.com/flyethiopian" },
      { platform: "instagram", url: "https://instagram.com/ethiopianairlines" },
    ],
  },
  {
    id: 3,
    name: "Dashen Bank",
    slug: "dashen-bank",
    description: "One of Ethiopia's leading private banks offering comprehensive banking and financial services.",
    category: "Finance",
    subcategory: "Banking",
    email: "info@dashenbanksc.com",
    phone: "+251-11-465-1010",
    website: "https://www.dashenbanksc.com",
    address: "Debre Zeit Road",
    city: "Addis Ababa",
    region: "Addis Ababa",
    country: "Ethiopia",
    isVerified: true,
    isFeatured: true,
    isPremium: true,
    status: "active",
    viewCount: 12340,
    rating: 4.3,
    reviewCount: 890,
    establishedYear: 1995,
    employeeCount: "500-1000",
    socialLinks: [
      { platform: "facebook", url: "https://facebook.com/dashenbank" },
      { platform: "linkedin", url: "https://linkedin.com/company/dashen-bank" },
    ],
    businessHours: [
      { dayOfWeek: 0, openTime: "08:00", closeTime: "16:00", isClosed: false },
      { dayOfWeek: 1, openTime: "08:00", closeTime: "16:00", isClosed: false },
      { dayOfWeek: 2, openTime: "08:00", closeTime: "16:00", isClosed: false },
      { dayOfWeek: 3, openTime: "08:00", closeTime: "16:00", isClosed: false },
      { dayOfWeek: 4, openTime: "08:00", closeTime: "16:00", isClosed: false },
      { dayOfWeek: 5, openTime: "08:00", closeTime: "12:00", isClosed: false },
      { dayOfWeek: 6, isClosed: true },
    ],
  },
  {
    id: 4,
    name: "Awash Bank",
    slug: "awash-bank",
    description: "Premier financial institution providing modern banking solutions across Ethiopia.",
    category: "Finance",
    subcategory: "Banking",
    email: "awashbank@ethionet.et",
    phone: "+251-11-156-6066",
    website: "https://www.awashbank.com",
    address: "Ras Abebe Aregay Street",
    city: "Addis Ababa",
    region: "Addis Ababa",
    country: "Ethiopia",
    isVerified: true,
    isFeatured: false,
    isPremium: true,
    status: "active",
    viewCount: 9870,
    rating: 4.1,
    reviewCount: 654,
    establishedYear: 1994,
    employeeCount: "500-1000",
  },
  {
    id: 5,
    name: "Habesha Breweries",
    slug: "habesha-breweries",
    description: "Premium Ethiopian brewery producing quality beers including Habesha Beer and Bedele Special.",
    category: "Food & Beverage",
    subcategory: "Brewery",
    email: "info@habeshabreweries.com",
    phone: "+251-11-618-2020",
    website: "https://www.habeshabreweries.com",
    address: "Addis Ababa-Debre Zeit Road",
    city: "Addis Ababa",
    region: "Addis Ababa",
    country: "Ethiopia",
    isVerified: true,
    isFeatured: true,
    isPremium: false,
    status: "active",
    viewCount: 8650,
    rating: 4.4,
    reviewCount: 432,
    establishedYear: 2009,
    employeeCount: "200-500",
  },
  {
    id: 6,
    name: "Zemen Insurance",
    slug: "zemen-insurance",
    description: "Trusted insurance company offering comprehensive coverage for individuals and businesses.",
    category: "Finance",
    subcategory: "Insurance",
    email: "info@zemeninsurance.com",
    phone: "+251-11-662-6027",
    website: "https://www.zemeninsurance.com",
    address: "Bole Road",
    city: "Addis Ababa",
    region: "Addis Ababa",
    country: "Ethiopia",
    isVerified: true,
    isFeatured: false,
    isPremium: false,
    status: "active",
    viewCount: 5430,
    rating: 4.0,
    reviewCount: 234,
    establishedYear: 2009,
    employeeCount: "100-200",
  },
  {
    id: 7,
    name: "Yoha Construction",
    slug: "yoha-construction",
    description: "Leading construction company specializing in residential and commercial projects.",
    category: "Construction",
    subcategory: "General Contracting",
    email: "info@yohaconstruction.com",
    phone: "+251-11-552-3344",
    website: "https://www.yohaconstruction.com",
    address: "Mexico Square",
    city: "Addis Ababa",
    region: "Addis Ababa",
    country: "Ethiopia",
    isVerified: true,
    isFeatured: false,
    isPremium: false,
    status: "active",
    viewCount: 4320,
    rating: 4.2,
    reviewCount: 156,
    establishedYear: 2005,
    employeeCount: "200-500",
  },
  {
    id: 8,
    name: "Sheba Leather",
    slug: "sheba-leather",
    description: "Premium leather goods manufacturer and exporter, showcasing Ethiopian craftsmanship.",
    category: "Manufacturing",
    subcategory: "Leather Goods",
    email: "sales@shebaleather.com",
    phone: "+251-11-618-5050",
    website: "https://www.shebaleather.com",
    address: "Industrial Area",
    city: "Addis Ababa",
    region: "Addis Ababa",
    country: "Ethiopia",
    isVerified: true,
    isFeatured: true,
    isPremium: false,
    status: "active",
    viewCount: 6540,
    rating: 4.3,
    reviewCount: 287,
    establishedYear: 1998,
    employeeCount: "100-200",
  },
  {
    id: 9,
    name: "Horizon Addis Hotel",
    slug: "horizon-addis-hotel",
    description: "Luxury hotel offering world-class accommodation and hospitality in the heart of Addis Ababa.",
    category: "Hospitality",
    subcategory: "Hotels",
    email: "reservations@horizonaddis.com",
    phone: "+251-11-618-8888",
    website: "https://www.horizonaddis.com",
    address: "Bole Road",
    city: "Addis Ababa",
    region: "Addis Ababa",
    country: "Ethiopia",
    isVerified: true,
    isFeatured: true,
    isPremium: true,
    status: "active",
    viewCount: 11230,
    rating: 4.6,
    reviewCount: 892,
    establishedYear: 2015,
    employeeCount: "100-200",
  },
  {
    id: 10,
    name: "Nile Insurance",
    slug: "nile-insurance",
    description: "Comprehensive insurance solutions for life, health, property, and business needs.",
    category: "Finance",
    subcategory: "Insurance",
    email: "info@nileinsurance.com",
    phone: "+251-11-551-5151",
    website: "https://www.nileinsurance.com",
    address: "Arat Kilo",
    city: "Addis Ababa",
    region: "Addis Ababa",
    country: "Ethiopia",
    isVerified: true,
    isFeatured: false,
    isPremium: false,
    status: "active",
    viewCount: 3890,
    rating: 3.9,
    reviewCount: 178,
    establishedYear: 1995,
    employeeCount: "50-100",
  },
  {
    id: 11,
    name: "Moha Soft Drinks",
    slug: "moha-soft-drinks",
    description: "Leading beverage company producing popular soft drinks and bottled water across Ethiopia.",
    category: "Food & Beverage",
    subcategory: "Beverages",
    email: "info@mohagroup.com",
    phone: "+251-11-618-3030",
    website: "https://www.mohagroup.com",
    address: "Kality",
    city: "Addis Ababa",
    region: "Addis Ababa",
    country: "Ethiopia",
    isVerified: true,
    isFeatured: false,
    isPremium: true,
    status: "active",
    viewCount: 9120,
    rating: 4.2,
    reviewCount: 543,
    establishedYear: 2007,
    employeeCount: "500-1000",
  },
  {
    id: 12,
    name: "Sunshine Construction",
    slug: "sunshine-construction",
    description: "Innovative construction firm delivering quality infrastructure and building projects.",
    category: "Construction",
    subcategory: "General Contracting",
    email: "info@sunshineconstruction.et",
    phone: "+251-11-662-7070",
    address: "CMC Road",
    city: "Addis Ababa",
    region: "Addis Ababa",
    country: "Ethiopia",
    isVerified: false,
    isFeatured: false,
    isPremium: false,
    status: "active",
    viewCount: 2340,
    rating: 3.8,
    reviewCount: 89,
    establishedYear: 2010,
    employeeCount: "50-100",
  },
]

export const categories = [
  "Technology",
  "Finance",
  "Transportation",
  "Food & Beverage",
  "Construction",
  "Manufacturing",
  "Hospitality",
  "Healthcare",
  "Education",
  "Retail",
  "Real Estate",
  "Agriculture",
]

export const mockReviews: Review[] = [
  {
    id: 1,
    companyId: 1,
    userId: 4,
    userName: "Dawit Tesfaye",
    rating: 4,
    title: "Good Service",
    comment: "Reliable network coverage across the country. Customer service could be improved.",
    isVerified: true,
    createdAt: "2024-12-15",
  },
  {
    id: 2,
    companyId: 2,
    userId: 4,
    userName: "Dawit Tesfaye",
    rating: 5,
    title: "Excellent Airline",
    comment: "World-class service and comfortable flights. Proud of Ethiopian Airlines!",
    isVerified: true,
    createdAt: "2024-11-20",
  },
  {
    id: 3,
    companyId: 3,
    userId: 4,
    userName: "Dawit Tesfaye",
    rating: 4,
    title: "Professional Banking",
    comment: "Good banking services with modern facilities. Mobile app is very convenient.",
    isVerified: true,
    createdAt: "2024-10-05",
  },
  {
    id: 4,
    companyId: 9,
    userId: 4,
    userName: "Dawit Tesfaye",
    rating: 5,
    title: "Amazing Stay",
    comment: "Beautiful hotel with excellent service. The staff were very welcoming and professional.",
    isVerified: true,
    createdAt: "2024-09-12",
  },
]

export const mockSocialLinks: Record<number, SocialLink[]> = {
  1: [
    { platform: "facebook", url: "https://facebook.com/ethiotelecom" },
    { platform: "twitter", url: "https://twitter.com/ethiotelecom" },
  ],
  2: [
    { platform: "facebook", url: "https://facebook.com/ethiopianairlines" },
    { platform: "twitter", url: "https://twitter.com/flyethiopian" },
    { platform: "instagram", url: "https://instagram.com/ethiopianairlines" },
  ],
  3: [
    { platform: "facebook", url: "https://facebook.com/dashenbank" },
    { platform: "linkedin", url: "https://linkedin.com/company/dashen-bank" },
  ],
}

export const mockBusinessHours: Record<number, BusinessHours[]> = {
  1: [
    { dayOfWeek: 0, openTime: "08:00", closeTime: "17:00", isClosed: false },
    { dayOfWeek: 1, openTime: "08:00", closeTime: "17:00", isClosed: false },
    { dayOfWeek: 2, openTime: "08:00", closeTime: "17:00", isClosed: false },
    { dayOfWeek: 3, openTime: "08:00", closeTime: "17:00", isClosed: false },
    { dayOfWeek: 4, openTime: "08:00", closeTime: "17:00", isClosed: false },
    { dayOfWeek: 5, openTime: "08:00", closeTime: "13:00", isClosed: false },
    { dayOfWeek: 6, isClosed: true },
  ],
  3: [
    { dayOfWeek: 0, openTime: "08:00", closeTime: "16:00", isClosed: false },
    { dayOfWeek: 1, openTime: "08:00", closeTime: "16:00", isClosed: false },
    { dayOfWeek: 2, openTime: "08:00", closeTime: "16:00", isClosed: false },
    { dayOfWeek: 3, openTime: "08:00", closeTime: "16:00", isClosed: false },
    { dayOfWeek: 4, openTime: "08:00", closeTime: "16:00", isClosed: false },
    { dayOfWeek: 5, openTime: "08:00", closeTime: "12:00", isClosed: false },
    { dayOfWeek: 6, isClosed: true },
  ],
}
