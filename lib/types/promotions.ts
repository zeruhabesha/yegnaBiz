export type PromotionStatus = 'active' | 'inactive' | 'scheduled'

export interface PromotionStat {
  label: string
  value: string
}

export interface PromotionPrice {
  original: string
  discounted: string
}

export interface PromotionPopupContent {
  subtitle: string
  badge: string
  image: string
  cta: string
  ctaLink: string
  price: PromotionPrice
  features: string[]
  stats?: PromotionStat[]
}

export interface PublicPromotion {
  id: string
  title: string
  description: string
  buttonText: string
  buttonLink: string
  bgColor: string
  textColor: string
  image?: string
  status: PromotionStatus
  order: number
  popup: PromotionPopupContent
}
