"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Search, CheckCircle } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const quickCategories = [
  { label: "Restaurants", search: "restaurants" },
  { label: "Hotels & Hospitality", search: "hotels" },
  { label: "Banks & Finance", search: "banks" },
  { label: "Tech & Innovation", search: "technology" },
  { label: "Healthcare", search: "healthcare" },
]

const highlights = [
  "15k+ verified Ethiopian businesses",
  "Real customer reviews you can trust",
  "Smart filters for faster discovery",
]

export function SearchHero() {
  const [searchQuery, setSearchQuery] = useState("")
  const [videoError, setVideoError] = useState(false)
  const [videoLoading, setVideoLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const router = useRouter()

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleError = () => {
      console.warn("Hero video failed to load, falling back to gradient background")
      setVideoError(true)
      setVideoLoading(false)
    }

    const markLoaded = () => setVideoLoading(false)

    video.addEventListener("error", handleError)
    video.addEventListener("loadeddata", markLoaded)
    video.addEventListener("canplay", markLoaded)

    return () => {
      video.removeEventListener("error", handleError)
      video.removeEventListener("loadeddata", markLoaded)
      video.removeEventListener("canplay", markLoaded)
    }
  }, [])

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = searchQuery.trim()
    if (trimmed.length === 0) return
    router.push(`/companies?search=${encodeURIComponent(trimmed)}`)
  }

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0">
        {!videoError && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              videoLoading ? "opacity-0" : "opacity-100"
            }`}
            style={{ filter: "brightness(0.45) contrast(1.08)" }}
            onError={() => setVideoError(true)}
          >
            <source src="/Map_Search.mp4" type="video/mp4" />
            <source src="/Map_Search.webm" type="video/webm" />
          </video>
        )}

        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            videoError || videoLoading ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-blue-600/25 to-purple-600/25" />
          <div className="absolute inset-0 opacity-15">
            <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_20%_50%,_rgb(72_187_120)_0%,_transparent_55%)]" />
            <div className="absolute inset-0 animate-pulse delay-1000 bg-[radial-gradient(circle_at_80%_20%,_rgb(59_130_246)_0%,_transparent_55%)]" />
            <div className="absolute inset-0 animate-pulse delay-2000 bg-[radial-gradient(circle_at_40%_80%,_rgb(168_85_247)_0%,_transparent_55%)]" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/65 to-primary/85" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/65 to-primary/85" />
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 animate-pulse rounded-full bg-primary/12 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 animate-pulse delay-1000 rounded-full bg-accent/12 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 blur-2xl" />
      </div>

      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl space-y-8 text-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-1 text-sm uppercase tracking-[0.2em] text-gray-200 backdrop-blur">
              YegnaBiz Directory
            </span>
            <h1 className="text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl">
              Discover Amazing
              <span className="block bg-gradient-to-r from-primary via-white to-accent bg-clip-text text-transparent">
                Ethiopian Businesses
              </span>
            </h1>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-100 md:text-2xl">
              Find trusted companies, read authentic reviews, and connect with the perfect partner for your next project anywhere in Ethiopia.
            </p>
          </div>

          <form onSubmit={handleSearch} className="mt-12 animate-fade-in-delayed">
            <div className="mx-auto flex max-w-3xl flex-col gap-4 md:flex-row">
              <div className="group relative flex-1">
                <Search className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <Input
                  type="text"
                  placeholder="Search for businesses, services, or categories..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="h-14 border-2 border-white/20 bg-white/10 pl-12 text-lg text-white placeholder:text-gray-300 backdrop-blur-sm transition-all duration-200 focus:border-primary focus:ring-primary/20"
                  aria-label="Search for businesses"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="btn-gradient h-14 px-8 text-lg font-semibold transition-all duration-200 hover:scale-105"
              >
                Search Businesses
              </Button>
            </div>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-8 animate-fade-in-delayed">
            <span className="text-sm font-medium text-gray-200">Popular quick searches:</span>
            {quickCategories.map((category) => (
              <Button
                key={category.search}
                variant="outline"
                size="sm"
                onClick={() => router.push(`/companies?search=${encodeURIComponent(category.search)}`)}
                className="border-white/30 text-blue transition-all duration-200 hover:scale-105 hover:border-primary hover:bg-white/10"
              >
                {category.label}
              </Button>
            ))}
          </div>

          <div className="grid gap-4 pt-6 text-left sm:grid-cols-3 animate-fade-in-delayed">
            {highlights.map((item) => (
              <div
                key={item}
                className="flex items-center justify-center gap-3 rounded-xl border border-white/15 bg-black/35 px-4 py-3 text-sm text-gray-100 backdrop-blur"
              >
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
