"use client"

import { useCallback, useEffect, useMemo, useState } from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CompanyCard } from "@/components/company-card"
import { CompanyFilters } from "@/components/company-filters"
import type { Company } from "@/lib/types/company"
import { Input } from "@/components/ui/input"
import { Search } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
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

export interface CompaniesPageClientProps {
  initialQuery?: string
  initialLocation?: string
  initialCategory?: string
}

export function CompaniesPageClient({
  initialQuery = "",
  initialLocation = "",
  initialCategory = "",
}: CompaniesPageClientProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [locationQuery, setLocationQuery] = useState(initialLocation)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : [],
  )
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

  const resetPagination = useCallback(() => setCurrentPage(1), [])

  const activeFilters = useMemo(() => {
    const filters: { label: string; value: string; onClear: () => void }[] = []

    if (searchQuery) {
      filters.push({
        label: "Search",
        value: searchQuery,
        onClear: () => {
          setSearchQuery("")
          resetPagination()
        },
      })
    }

    if (locationQuery) {
      filters.push({
        label: "Location",
        value: locationQuery,
        onClear: () => {
          setLocationQuery("")
          resetPagination()
        },
      })
    }

    selectedCategories.forEach((category) =>
      filters.push({
        label: "Category",
        value: category,
        onClear: () => {
          setSelectedCategories((prev) => prev.filter((value) => value !== category))
          resetPagination()
        },
      }),
    )

    selectedCities.forEach((city) =>
      filters.push({
        label: "City",
        value: city,
        onClear: () => {
          setSelectedCities((prev) => prev.filter((value) => value !== city))
          resetPagination()
        },
      }),
    )

    if (showVerifiedOnly) {
      filters.push({
        label: "Verified",
        value: "Verified",
        onClear: () => {
          setShowVerifiedOnly(false)
          resetPagination()
        },
      })
    }

    if (showFeaturedOnly) {
      filters.push({
        label: "Featured",
        value: "Featured",
        onClear: () => {
          setShowFeaturedOnly(false)
          resetPagination()
        },
      })
    }

    return filters
  }, [
    locationQuery,
    resetPagination,
    searchQuery,
    selectedCategories,
    selectedCities,
    showFeaturedOnly,
    showVerifiedOnly,
  ])

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

  const totalPages = Math.max(1, Math.ceil((totalCompanies || companies.length || 1) / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedCompanies = companies.slice(startIndex, endIndex)

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
    resetPagination()
  }

  useEffect(() => {
    if (!loading && totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, loading, totalPages])

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-foreground">
      <Header />

      <main className="flex-1 pb-16">
        <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-black">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_55%)]" />
          <div className="container relative z-10 py-16 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[1.15fr_auto] lg:items-center">
              <div className="space-y-6 text-white">
                <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.3em] text-white/70">
                  Discover Local Excellence
                </div>
                <div className="space-y-4">
                  <h1 className="text-3xl font-semibold leading-tight md:text-5xl">
                    Find trusted businesses across Ethiopia
                  </h1>
                  <p className="max-w-2xl text-base text-white/70 md:text-lg">
                    Explore a carefully curated marketplace of verified companies, vibrant startups, and established enterprises. Filter by category, city, or feature to pinpoint the perfect partner for your next project.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-6 text-sm text-white/60">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-white/40">Active listings</p>
                    <p className="text-2xl font-semibold text-white">{totalCompanies || companies.length}</p>
                  </div>
                  <Separator orientation="vertical" className="hidden h-12 lg:block bg-white/10" />
                  <div>
                    <p className="text-xs uppercase tracking-wide text-white/40">Verified partners</p>
                    <p className="text-2xl font-semibold text-white">{companies.filter((company) => company.isVerified).length}</p>
                  </div>
                  <Separator orientation="vertical" className="hidden h-12 lg:block bg-white/10" />
                  <div>
                    <p className="text-xs uppercase tracking-wide text-white/40">Top categories</p>
                    <p className="text-2xl font-semibold text-white">{availableCategories.slice(0, 3).length || 0}</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 rounded-3xl bg-primary/40 blur-3xl" />
                <div className="relative space-y-4 rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-white/60">Smart Search</p>
                    <p className="text-sm text-white/50">Start with a keyword and refine your results instantly.</p>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-semibold uppercase tracking-wide text-white/60">Company Name</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                      <Input
                        type="text"
                        placeholder="e.g. Creative Studio"
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value)
                          handleFilterChange()
                        }}
                        className="h-11 border-white/10 bg-white/10 pl-9 text-white placeholder:text-white/40 focus-visible:ring-white/30"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-semibold uppercase tracking-wide text-white/60">Location</label>
                    <Input
                      type="text"
                      placeholder="Search by city"
                      value={locationQuery}
                      onChange={(e) => {
                        setLocationQuery(e.target.value)
                        handleFilterChange()
                      }}
                      className="h-11 border-white/10 bg-white/10 text-white placeholder:text-white/40 focus-visible:ring-white/30"
                    />
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant="secondary"
                      className="h-11 flex-1 border border-white/10 bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
                      onClick={() => {
                        setShowVerifiedOnly((prev) => !prev)
                        handleFilterChange()
                      }}
                    >
                      {showVerifiedOnly ? "Showing verified" : "Verified only"}
                    </Button>
                    <Button
                      variant="secondary"
                      className="h-11 flex-1 border border-white/10 bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
                      onClick={() => {
                        setShowFeaturedOnly((prev) => !prev)
                        handleFilterChange()
                      }}
                    >
                      {showFeaturedOnly ? "Showing featured" : "Featured only"}
                    </Button>
                  </div>
                  {activeFilters.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-wide text-white/60">Active filters</p>
                      <div className="flex flex-wrap gap-2">
                        {activeFilters.map((filter) => (
                          <Badge
                            key={`${filter.label}-${filter.value}`}
                            variant="secondary"
                            className="bg-white/15 text-white hover:bg-white/20"
                            onClick={filter.onClear}
                          >
                            {filter.label}: {filter.value}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container -mt-10 space-y-10 md:-mt-20">
          <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
            <aside className="space-y-6 rounded-3xl border border-slate-800/60 bg-slate-950/70 p-6 shadow-[0_40px_80px_-60px_rgba(15,23,42,0.9)] backdrop-blur">
              <div className="space-y-4">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-white/60">Refine results</h2>
                <p className="text-sm text-white/40">
                  Adjust filters to instantly tailor the marketplace to your needs.
                </p>
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
                onSortChange={(sort) => {
                  setSortBy(sort)
                  handleFilterChange()
                }}
                showVerifiedOnly={showVerifiedOnly}
                onVerifiedChange={(verified) => {
                  setShowVerifiedOnly(verified)
                  handleFilterChange()
                }}
                showFeaturedOnly={showFeaturedOnly}
                onFeaturedChange={(featured) => {
                  setShowFeaturedOnly(featured)
                  handleFilterChange()
                }}
                availableCategories={availableCategories}
                availableCities={availableCities}
              />
            </aside>

            <div className="space-y-6 rounded-3xl border border-slate-800/60 bg-slate-950/70 p-6 shadow-[0_40px_80px_-60px_rgba(15,23,42,0.9)] backdrop-blur">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                {error ? (
                  <p className="text-sm text-destructive">{error}</p>
                ) : (
                  <p className="text-sm text-white/60">
                    {loading && companies.length === 0
                      ? "Loading companies..."
                      : `Showing ${companies.length === 0 ? 0 : startIndex + 1}-${Math.min(endIndex, companies.length)} of ${companies.length} ${companies.length === 1 ? "company" : "companies"}`}
                  </p>
                )}

                <div className="flex flex-wrap gap-2">
                  {activeFilters.map((filter) => (
                    <Badge
                      key={`list-${filter.label}-${filter.value}`}
                      variant="outline"
                      className="border-primary/40 bg-primary/10 text-primary hover:bg-primary/20"
                      onClick={filter.onClear}
                    >
                      {filter.value}
                    </Badge>
                  ))}
                  {activeFilters.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white/70 hover:bg-white/5 hover:text-white"
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
                      Clear all
                    </Button>
                  )}
                </div>
              </div>

              {loading && companies.length === 0 ? (
                <div className="grid gap-6 md:grid-cols-2">
                  {Array.from({ length: Math.min(ITEMS_PER_PAGE, 4) }).map((_, index) => (
                    <div
                      key={index}
                      className="h-52 rounded-2xl border border-white/5 bg-white/[0.04] animate-pulse"
                    />
                  ))}
                </div>
              ) : companies.length > 0 ? (
                <>
                  <div className="grid gap-6 md:grid-cols-2">
                    {paginatedCompanies.map((company) => (
                      <CompanyCard key={company.id} company={company} />
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <Pagination className="justify-center pt-2">
                      <PaginationContent className="gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1 backdrop-blur">
                        <PaginationItem>
                          <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              if (currentPage > 1) setCurrentPage(currentPage - 1)
                            }}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                          />
                        </PaginationItem>

                        {getPageNumbers().map((page, index) =>
                          page === "ellipsis" ? (
                            <PaginationItem key={`ellipsis-${index}`}>
                              <PaginationEllipsis className="text-white/60" />
                            </PaginationItem>
                          ) : (
                            <PaginationItem key={page}>
                              <PaginationLink
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault()
                                  setCurrentPage(page as number)
                                }}
                                isActive={currentPage === page}
                                className="cursor-pointer rounded-full px-4 py-2 text-sm data-[state=active]:bg-primary data-[state=active]:text-white"
                              >
                                {page}
                              </PaginationLink>
                            </PaginationItem>
                          ),
                        )}

                        <PaginationItem>
                          <PaginationNext
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                            }}
                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-white/15 bg-white/5 py-14 text-center">
                  <p className="text-lg font-medium text-white/80">No companies match your current filters.</p>
                  <p className="text-sm text-white/50">
                    Try broadening your search or removing a few filters to discover more great businesses.
                  </p>
                  <Button
                    variant="secondary"
                    className="border border-white/20 bg-white/10 text-white hover:bg-white/20"
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
                    Reset filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
