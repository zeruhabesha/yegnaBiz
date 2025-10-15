"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SearchHero() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/companies?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-home.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-primary/80"></div>
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
            Find the Best Businesses in <span className="text-primary">Ethiopia</span>
          </h1>
          <p className="text-xl text-gray-200">
            Discover, review, and connect with trusted businesses across the country
          </p>

          <form onSubmit={handleSearch} className="mt-8">
            <div className="flex gap-2 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for businesses, services, or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>
              <Button type="submit" size="lg" className="h-12 px-8">
                Search
              </Button>
            </div>
          </form>

          <div className="flex flex-wrap gap-2 justify-center pt-4">
            <span className="text-sm text-muted-foreground">Popular:</span>
            {["Restaurants", "Hotels", "Banks", "Technology", "Healthcare"].map((category) => (
              <Button
                key={category}
                variant="outline"
                size="sm"
                onClick={() => router.push(`/companies?category=${encodeURIComponent(category)}`)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
