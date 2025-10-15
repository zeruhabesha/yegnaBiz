"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "@/components/icons"
import { Button } from "@/components/ui/button"

interface Promotion {
  id: string
  title: string
  description: string
  buttonText: string
  bgColor: string
  textColor: string
  image?: string
}

const promotions: Promotion[] = [
  {
    id: "1",
    title: "🎉 Special Offer - Get 50% OFF Premium Listing!",
    description: "Promote your business and reach 50,000+ customers across Ethiopia",
    buttonText: "Claim Offer",
    bgColor: "bg-gradient-to-r from-primary to-accent",
    textColor: "text-white",
  },
  {
    id: "2",
    title: "🚀 Launch Your Business on YegnaBiz Today!",
    description: "Join 2,500+ successful businesses already on our platform",
    buttonText: "Get Started Free",
    bgColor: "bg-gradient-to-r from-accent to-primary",
    textColor: "text-white",
  },
  {
    id: "3",
    title: "⭐ Featured Placement - Limited Slots Available!",
    description: "Get premium visibility and 10X more customer inquiries",
    buttonText: "Learn More",
    bgColor: "bg-gradient-to-r from-primary/90 to-black",
    textColor: "text-white",
  },
]

interface PromoBannerProps {
  onOpenPromo: (promoId: string) => void
}

export function PromoBanner({ onOpenPromo }: PromoBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % promotions.length)
      }, 5000) // Change slide every 5 seconds

      return () => clearInterval(interval)
    }
  }, [isPaused])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % promotions.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + promotions.length) % promotions.length)
  }

  const currentPromo = promotions[currentIndex]

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
            <Button
              size="sm"
              variant="secondary"
              className="flex-shrink-0 font-semibold"
            >
              {currentPromo.buttonText}
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
          {promotions.map((_, index) => (
            <button
              key={index}
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
