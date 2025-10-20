"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CompanyCard } from "@/components/company-card"
import { CompanyFilters } from "@/components/company-filters"
import type { Company } from "@/lib/types/company"
import { Input } from "@/components/ui/input"
import { Search } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/page-hero"
import { PageSection } from "@/components/page-section"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const ITEMS_PER_PAGE = 12

export default function CompaniesPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""
  const initialLocation = searchParams.get("location") || ""
  const initialCategory = searchParams.get("category") || ""

  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [locationQuery, setLocationQuery] = useState(initialLocation)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategory ? [initialCategory] : [])
  const [selectedCities, setSelectedCities] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("relevance")
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false)
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [companies, setCompanies] = useState<Company[]>([])
  const [availableCategories, setAvailableCategories] = useState<string[]>([])
  const [availableCities, setAvailableCities] = useState<string[]>([])
  const [totalCompanies, setTotalCompanies] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchCompanies() {
      try {
        setLoading(true)
        setError(null)

        const params = new URLSearchParams()
        if (searchQuery) params.set("search", searchQuery)
        if (locationQuery) params.set("location", locationQuery)
        if (selectedCategories.length > 0) params.set("categories", selectedCategories.join(","))
        if (selectedCities.length > 0) params.set("cities", selectedCities.join(","))
        if (showVerifiedOnly) params.set("verified", "true")
        if (showFeaturedOnly) params.set("featured", "true")
        if (sortBy && sortBy !== "relevance") params.set("sort", sortBy)

        const response = await fetch(`/api/companies?${params.toString()}`, { signal: controller.signal })
        if (!response.ok) {
          throw new Error("Failed to load companies")
        }

        const json = await response.json()
        if (!json.success) {
          throw new Error(json.error || "Failed to load companies")
        }

        setCompanies(json.data.companies)
        setAvailableCategories(json.data.allCategories)
        setAvailableCities(json.data.allCities)
        setTotalCompanies(json.data.total)
      } catch (err) {
        if (!(err instanceof DOMException && err.name === "AbortError")) {
          setError(err instanceof Error ? err.message : "Failed to load companies")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchCompanies()

    return () => controller.abort()
  }, [searchQuery, locationQuery, selectedCategories, selectedCities, showVerifiedOnly, showFeaturedOnly, sortBy])

  const totalPages = Math.ceil(companies.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedCompanies = companies.slice(startIndex, endIndex)

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i)
        pages.push("ellipsis")
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push("ellipsis")
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i)
      } else {
        pages.push(1)
        pages.push("ellipsis")
        pages.push(currentPage - 1)
        pages.push(currentPage)
        pages.push(currentPage + 1)
        pages.push("ellipsis")
        pages.push(totalPages)
      }
    }

    return pages
  }

  const handleFilterChange = () => {
    setCurrentPage(1)
  }

  useEffect(() => {
    if (!loading && totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, loading, totalPages])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <PageHero
        eyebrow="Directory"
        title="Browse Companies"
        description={`Discover ${totalCompanies.toLocaleString()}+ businesses across Ethiopia and connect with the teams powering our economy.`}
        backgroundImage="/hero-companies.jpg"
      />

      <main className="flex-1">
        <PageSection tone="default" className="py-12">
          <div className="flex flex-col gap-8 lg:flex-row">
            <aside className="space-y-5 rounded-3xl border border-white/10 bg-background/70 p-6 shadow-lg shadow-black/5 backdrop-blur lg:w-72">
              <div className="space-y-3">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search companies..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      handleFilterChange()
                    }}
                    className="pl-9"
                  />
                </div>
                <Input
                  type="text"
                  placeholder="Location"
                  value={locationQuery}
                  onChange={(e) => {
                    setLocationQuery(e.target.value)
                    handleFilterChange()
                  }}
                />
              </div>

              <CompanyFilters
                selectedCategories={selectedCategories}
                onCategoriesChange={(categories) => {
                  setSelectedCategories(categories)
                  handleFilterChange()
                }}
                selectedCities={selectedCities}
                onCitiesChange={(cities) => {
                  setSelectedCities(cities)
                  handleFilterChange()
                }}
                sortBy={sortBy}
                onSortByChange={(value) => {
                  setSortBy(value)
                  handleFilterChange()
                }}
                showVerifiedOnly={showVerifiedOnly}
                onShowVerifiedOnlyChange={(checked) => {
                  setShowVerifiedOnly(checked)
                  handleFilterChange()
                }}
                showFeaturedOnly={showFeaturedOnly}
                onShowFeaturedOnlyChange={(checked) => {
                  setShowFeaturedOnly(checked)
                  handleFilterChange()
                }}
                availableCategories={availableCategories}
                availableCities={availableCities}
              />

              <Button
                variant="outline"
                className="w-full rounded-full border-primary/40"
                onClick={() => {
                  setSearchQuery("")
                  setLocationQuery("")
                  setSelectedCategories([])
                  setSelectedCities([])
                  setShowVerifiedOnly(false)
                  setShowFeaturedOnly(false)
                  setSortBy("relevance")
                  setCurrentPage(1)
                }}
              >
                Reset Filters
              </Button>
            </aside>

            <div className="flex-1 space-y-6">
              {error && (
                <div className="rounded-3xl border border-destructive/40 bg-destructive/10 p-4 text-destructive">
                  {error}
                </div>
              )}

              {loading ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="h-48 animate-pulse rounded-3xl border border-white/10 bg-muted/30" />
                  ))}
                </div>
              ) : paginatedCompanies.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {paginatedCompanies.map((company) => (
                      <CompanyCard key={company.id} company={company} />
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              if (currentPage > 1) {
                                setCurrentPage(currentPage - 1)
                              }
                            }}
                          />
                        </PaginationItem>
                        {getPageNumbers().map((page, index) => (
                          <PaginationItem key={index}>
                            {page === "ellipsis" ? (
                              <PaginationEllipsis />
                            ) : (
                              <PaginationLink
                                href="#"
                                isActive={currentPage === page}
                                onClick={(e) => {
                                  e.preventDefault()
                                  if (typeof page === "number") {
                                    setCurrentPage(page)
                                  }
                                }}
                              >
                                {page}
                              </PaginationLink>
                            )}
                          </PaginationItem>
                        ))}
                        <PaginationItem>
                          <PaginationNext
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              if (currentPage < totalPages) {
                                setCurrentPage(currentPage + 1)
                              }
                            }}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )}
                </>
              ) : (
                <div className="rounded-3xl border border-dashed border-white/30 bg-background/60 p-12 text-center backdrop-blur">
                  <h2 className="mb-2 text-2xl font-semibold">No companies found</h2>
                  <p className="mb-4 text-muted-foreground">
                    Try adjusting your filters or search terms to discover more businesses.
                  </p>
                  <Button
                    variant="outline"
                    className="rounded-full border-primary/40"
                    onClick={() => {
                      setSearchQuery("")
                      setLocationQuery("")
                      setSelectedCategories([])
                      setSelectedCities([])
                      setShowVerifiedOnly(false)
                      setShowFeaturedOnly(false)
                      setSortBy("relevance")
                      setCurrentPage(1)
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </PageSection>
      </main>


      <Footer />
    </div>
  )
}
