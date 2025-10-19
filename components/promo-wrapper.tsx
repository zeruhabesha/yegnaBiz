"use client"

import { useEffect, useMemo, useState } from "react"
import { PromoBanner } from "./promo-banner"
import { PromoPopup } from "./promo-popup"
import type { PublicPromotion } from "@/lib/types/promotions"

export function PromoWrapper() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [promotions, setPromotions] = useState<PublicPromotion[]>([])
  const [activePromoId, setActivePromoId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    async function loadPromotions() {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch("/api/promotions", { signal: controller.signal })
        if (!response.ok) {
          throw new Error("Failed to fetch promotions")
        }

        const payload = await response.json()
        if (!payload.success) {
          throw new Error(payload.error ?? "Failed to fetch promotions")
        }

        if (!isMounted) return

        const fetchedPromotions: PublicPromotion[] = payload.data
        setPromotions(fetchedPromotions)

        if (fetchedPromotions.length > 0) {
          setActivePromoId((previous) => {
            if (previous && fetchedPromotions.some((promo) => promo.id === previous)) {
              return previous
            }
            return fetchedPromotions[0].id
          })
        } else {
          setActivePromoId(null)
        }
      } catch (err) {
        if (controller.signal.aborted) {
          return
        }

        console.error("Error loading promotions:", err)
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load promotions")
          setPromotions([])
          setActivePromoId(null)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadPromotions()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  const handleOpenPromo = (promoId: string) => {
    if (!promotions.some((promo) => promo.id === promoId)) {
      return
    }

    setActivePromoId(promoId)
    setIsPopupOpen(true)
  }

  const handleClosePromo = () => {
    setIsPopupOpen(false)
  }

  const activePromotion = useMemo(() => {
    if (!activePromoId) {
      return promotions[0] ?? null
    }
    return promotions.find((promo) => promo.id === activePromoId) ?? promotions[0] ?? null
  }, [activePromoId, promotions])

  if (loading && promotions.length === 0) {
    return null
  }

  if (error || promotions.length === 0 || !activePromotion) {
    return null
  }

  return (
    <>
      <PromoBanner promotions={promotions} onOpenPromo={handleOpenPromo} />
      <PromoPopup isOpen={isPopupOpen} onClose={handleClosePromo} promotion={activePromotion} />
    </>
  )
}
