"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SearchHero() {
  const [searchQuery, setSearchQuery] = useState("")
  const [videoError, setVideoError] = useState(false)
  const [videoLoading, setVideoLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const router = useRouter()

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      const handleError = () => {
        console.warn("Video failed to load, using enhanced CSS background")
        setVideoError(true)
        setVideoLoading(false)
      }

      const handleLoad = () => {
        setVideoLoading(false)
      }

      const handleCanPlay = () => {
        setVideoLoading(false)
      }

      video.addEventListener('error', handleError)
      video.addEventListener('loadeddata', handleLoad)
      video.addEventListener('canplay', handleCanPlay)

      return () => {
        video.removeEventListener('error', handleError)
        video.removeEventListener('loadeddata', handleLoad)
        video.removeEventListener('canplay', handleCanPlay)
      }
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/companies?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Enhanced Background with Video + CSS Fallback */}
      <div className="absolute inset-0">
        {/* Video Background (when available) */}
        {!videoError && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              videoLoading ? 'opacity-0' : 'opacity-100'
            }`}
            style={{ filter: 'brightness(0.4) contrast(1.1)' }}
            preload="metadata"
            onError={() => setVideoError(true)}
          >
            {/* Primary video source */}
            <source src="/Map_Search.mp4" type="video/mp4" />
            {/* WebM fallback for better browser support */}
            <source src="/Map_Search.webm" type="video/webm" />
          </video>
        )}

        {/* Enhanced CSS Background Fallback */}
        <div className={`absolute inset-0 transition-all duration-1000 ${
          videoError || videoLoading ? 'opacity-100' : 'opacity-0'
        }`}>
          {/* Animated gradient background with Ethiopian-inspired colors */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-blue-600/25 to-purple-600/25"></div>
          {/* Animated overlay patterns */}
          <div className="absolute inset-0 opacity-15">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,_rgb(72_187_120)_0%,_transparent_50%)] animate-pulse"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgb(59_130_246)_0%,_transparent_50%)] animate-pulse delay-1000"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,_rgb(168_85_247)_0%,_transparent_50%)] animate-pulse delay-2000"></div>
          </div>
          {/* Base gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/65 to-primary/85"></div>
        </div>

        {/* Always show overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/65 to-primary/85"></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        {/* Ethiopian cultural elements */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-2xl"></div>
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight animate-fade-in">
              Discover Amazing
              <span className="block bg-gradient-to-r from-primary via-white to-accent bg-clip-text text-transparent animate-gradient">
                Ethiopian Businesses
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed animate-fade-in-delayed">
              Find trusted companies, read authentic reviews, and connect with the best businesses across Ethiopia
            </p>
          </div>

          <form onSubmit={handleSearch} className="mt-12 animate-fade-in-delayed">
            <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
              <div className="relative flex-1 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  type="text"
                  placeholder="Search for businesses, services, or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-lg border-2 border-white/20 bg-white/10 backdrop-blur-sm placeholder:text-gray-300 focus:border-primary focus:ring-primary/20 transition-all duration-200"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="h-14 px-8 text-lg font-semibold btn-gradient hover:scale-105 transition-all duration-200 animate-pulse-glow"
              >
                Search Businesses
              </Button>
            </div>
          </form>

          <div className="flex flex-wrap gap-3 justify-center pt-8 animate-fade-in-delayed">
            <span className="text-sm text-gray-200 font-medium">ታዋቂ ፍለጋዎች:</span>
            {[
              { label: "ምግብ ቤቶች", search: "restaurants" },
              { label: "ሆቴሎች", search: "hotels" },
              { label: "ባንኮች", search: "banks" },
              { label: "ቴክኖሎጂ", search: "technology" },
              { label: "ጤና አገልግሎቶች", search: "healthcare" }
            ].map((category) => (
              <Button
                key={category.search}
                variant="outline"
                size="sm"
                onClick={() => router.push(`/companies?search=${encodeURIComponent(category.search)}`)}
                className="border-white/30 text-white hover:bg-white/10 hover:border-primary transition-all duration-200 hover:scale-105"
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
