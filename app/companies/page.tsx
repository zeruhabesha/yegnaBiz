"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CompanyCard } from "@/components/company-card"
import { CompanyFilters } from "@/components/company-filters"
import type { Company } from "@/lib/types/company"
import { Input } from "@/components/ui/input"
import { Search } from "@/components/icons"
import { Button } from "@/components/ui/button"
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

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/hero-companies.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-primary/70 to-black/80"></div>
        </div>

        <div className="container py-12 md:py-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">Browse Companies</h1>
            <p className="text-gray-200">Discover {totalCompanies}+ businesses across Ethiopia</p>
          </div>
        </div>
      </section>

      <main className="flex-1 py-8">
        <div className="container">

          <div className="flex flex-col lg:flex-row gap-6">
            <aside className="lg:w-64 space-y-4">
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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

            <div className="flex-1">
              <div className="mb-6 flex items-center justify-between">
                {error ? (
                  <p className="text-sm text-destructive">{error}</p>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {loading && companies.length === 0
                      ? "Loading companies..."
                      : `Showing ${companies.length === 0 ? 0 : startIndex + 1}-${Math.min(endIndex, companies.length)} of ${companies.length} ${companies.length === 1 ? "company" : "companies"}`}
                  </p>
                )}
              </div>

              {loading && companies.length === 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {Array.from({ length: Math.min(ITEMS_PER_PAGE, 4) }).map((_, index) => (
                    <div key={index} className="h-48 rounded-xl bg-muted animate-pulse" />
                  ))}
                </div>
              ) : companies.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
                              if (currentPage > 1) setCurrentPage(currentPage - 1)
                            }}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                          />
                        </PaginationItem>

                        {getPageNumbers().map((page, index) =>
                          page === "ellipsis" ? (
                            <PaginationItem key={`ellipsis-${index}`}>
                              <PaginationEllipsis />
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
                                className="cursor-pointer"
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
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground mb-4">No companies found matching your criteria</p>
                  <Button
                    variant="outline"
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
                    Clear Filters
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
