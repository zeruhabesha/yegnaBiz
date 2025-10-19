"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "@/components/icons"
import { Button } from "@/components/ui/button"
import type { PublicPromotion } from "@/lib/types/promotions"

interface PromoBannerProps {
  promotions: PublicPromotion[]
  onOpenPromo: (promoId: string) => void
}

export function PromoBanner({ promotions, onOpenPromo }: PromoBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    setCurrentIndex(0)
  }, [promotions.length])

  useEffect(() => {
    if (!isPaused && promotions.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % promotions.length)
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [isPaused, promotions.length])

  if (promotions.length === 0) {
    return null
  }

  const safeIndex = Math.min(currentIndex, promotions.length - 1)
  const currentPromo = promotions[safeIndex]

  const nextSlide = () => {
    if (promotions.length <= 1) return
    setCurrentIndex((prev) => (prev + 1) % promotions.length)
  }

  const prevSlide = () => {
    if (promotions.length <= 1) return
    setCurrentIndex((prev) => (prev - 1 + promotions.length) % promotions.length)
  }

  return (
    <div
      className={`sticky top-0 z-40 ${currentPromo.bgColor} ${currentPromo.textColor} shadow-md transition-all duration-300`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4 py-3 relative">
          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              prevSlide()
            }}
            className="hidden md:flex items-center justify-center h-8 w-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex-shrink-0"
            aria-label="Previous promotion"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {/* Content */}
          <div
            className="flex-1 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-center md:text-left cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => onOpenPromo(currentPromo.id)}
          >
            <div className="flex-1">
              <h3 className="font-bold text-sm md:text-base mb-1">{currentPromo.title}</h3>
              <p className="text-xs md:text-sm opacity-90 hidden md:block">{currentPromo.description}</p>
            </div>
            <Button size="sm" variant="secondary" className="flex-shrink-0 font-semibold" asChild>
              <Link href={currentPromo.buttonLink}>{currentPromo.buttonText}</Link>
            </Button>
          </div>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              nextSlide()
            }}
            className="hidden md:flex items-center justify-center h-8 w-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex-shrink-0"
            aria-label="Next promotion"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 pb-2">
          {promotions.map((promotion, index) => (
            <button
              key={promotion.id}
              onClick={() => setCurrentIndex(index)}
              className={`h-1 rounded-full transition-all ${
                index === currentIndex ? "w-6 bg-white" : "w-2 bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
