"use client"

import { useState, useEffect } from "react"
import { X, Star, TrendingUp, Eye, CheckCircle } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Link from "next/link"

interface PromoPopupProps {
  isOpen: boolean
  onClose: () => void
  promoId: string
}

const promoContent = {
  "1": {
    title: "🎉 Limited Time Offer - 50% OFF Premium Listing!",
    subtitle: "Boost Your Business Visibility Today",
    features: [
      "Featured placement on homepage",
      "Top position in category searches",
      "Priority in search results",
      "Premium badge on your listing",
      "Unlimited photos & videos",
      "Advanced analytics dashboard",
      "Priority customer support",
    ],
    price: {
      original: "5,000 ETB/month",
      discounted: "2,500 ETB/month",
    },
    cta: "Claim Your 50% Discount",
    ctaLink: "/promote",
    badge: "Limited Time",
    image: "/hero-promote.jpg",
  },
  "2": {
    title: "🚀 Launch Your Business on YegnaBiz",
    subtitle: "Join Ethiopia's Leading Business Directory",
    features: [
      "Free business listing",
      "Reach 50,000+ monthly visitors",
      "Customer reviews & ratings",
      "Direct contact information",
      "Mobile-optimized profile",
      "Social media integration",
      "Email notifications",
    ],
    price: {
      original: "FREE",
      discounted: "Start Today",
    },
    cta: "Create Free Listing",
    ctaLink: "/register",
    badge: "100% Free",
    image: "/hero-home.jpg",
  },
  "3": {
    title: "⭐ Featured Business Placement",
    subtitle: "Get Maximum Exposure & 10X More Customers",
    features: [
      "Homepage featured spot",
      "Category page highlights",
      "Premium badge & verification",
      "Top of search results",
      "Enhanced profile with videos",
      "Detailed analytics & insights",
      "Promotional campaign support",
    ],
    price: {
      original: "5,000 ETB/month",
      discounted: "Limited Slots",
    },
    cta: "Get Featured Now",
    ctaLink: "/promote",
    badge: "Best Value",
    image: "/hero-promote.jpg",
  },
}

export function PromoPopup({ isOpen, onClose, promoId }: PromoPopupProps) {
  const [showCloseButton, setShowCloseButton] = useState(false)
  const [countdown, setCountdown] = useState(5)
  const content = promoContent[promoId as keyof typeof promoContent] || promoContent["1"]

  useEffect(() => {
    if (isOpen) {
      setShowCloseButton(false)
      setCountdown(5)
      
      // Countdown timer
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      // Show close button after 5 seconds
      const timer = setTimeout(() => {
        setShowCloseButton(true)
      }, 5000)

      return () => {
        clearTimeout(timer)
        clearInterval(countdownInterval)
      }
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={showCloseButton ? onClose : undefined}>
      <DialogContent 
        className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 [&>button]:hidden"
        onInteractOutside={(e) => {
          if (!showCloseButton) {
            e.preventDefault()
          }
        }}
        onEscapeKeyDown={(e) => {
          if (!showCloseButton) {
            e.preventDefault()
          }
        }}
      >
        {/* Custom Close Button with Timer */}
        {showCloseButton ? (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-50 rounded-full bg-white/90 p-2 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 animate-in fade-in zoom-in duration-300"
          >
            <X className="h-4 w-4 text-gray-700" />
            <span className="sr-only">Close</span>
          </button>
        ) : (
          <div className="absolute right-4 top-4 z-50 rounded-full bg-white/90 px-3 py-2 text-xs font-semibold text-gray-700 shadow-lg">
            Close in {countdown}s
          </div>
        )}

        {/* Hero Image */}
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${content.image}')` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-black/70"></div>
          </div>
          <div className="relative h-full flex items-center justify-center text-white p-6">
            <div className="text-center">
              <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold mb-3">
                {content.badge}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">{content.title}</h2>
              <p className="text-sm md:text-base opacity-90">{content.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Pricing */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4 text-center">
            <div className="space-y-2">
              {content.price.original !== "FREE" && (
                <div className="text-sm text-muted-foreground line-through">{content.price.original}</div>
              )}
              <div className="text-3xl font-bold text-primary">{content.price.discounted}</div>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              What's Included
            </h3>
            <div className="grid gap-3">
              {content.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 py-4 border-t border-b">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">50K+</div>
              <div className="text-xs text-muted-foreground">Monthly Visitors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">2,500+</div>
              <div className="text-xs text-muted-foreground">Active Businesses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">95%</div>
              <div className="text-xs text-muted-foreground">Satisfaction Rate</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg" className="flex-1">
              <Link href={content.ctaLink}>{content.cta}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="flex-1">
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-6 pt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span>Grow Business</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span>More Visibility</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span>Trusted Platform</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
