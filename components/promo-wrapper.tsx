"use client"

import { useState } from "react"
import { PromoBanner } from "./promo-banner"
import { PromoPopup } from "./promo-popup"

export function PromoWrapper() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [activePromoId, setActivePromoId] = useState("1")

  const handleOpenPromo = (promoId: string) => {
    setActivePromoId(promoId)
    setIsPopupOpen(true)
  }

  const handleClosePromo = () => {
    setIsPopupOpen(false)
  }

  return (
    <>
      <PromoBanner onOpenPromo={handleOpenPromo} />
      <PromoPopup isOpen={isPopupOpen} onClose={handleClosePromo} promoId={activePromoId} />
    </>
  )
}
