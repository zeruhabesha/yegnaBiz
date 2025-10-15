"use client"

import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CompanyCard } from "@/components/company-card"
import { CompanyFilters } from "@/components/company-filters"
import { mockCompanies } from "@/lib/mock-data"
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

  const filteredCompanies = useMemo(() => {
    let filtered = [...mockCompanies]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (company) =>
          company.name.toLowerCase().includes(query) ||
          company.description.toLowerCase().includes(query) ||
          company.category.toLowerCase().includes(query) ||
          company.subcategory?.toLowerCase().includes(query),
      )
    }

    // Location filter
    if (locationQuery) {
      const location = locationQuery.toLowerCase()
      filtered = filtered.filter(
        (company) =>
          company.city?.toLowerCase().includes(location) ||
          company.region?.toLowerCase().includes(location) ||
          company.address?.toLowerCase().includes(location),
      )
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((company) => selectedCategories.includes(company.category))
    }

    // City filter
    if (selectedCities.length > 0) {
      filtered = filtered.filter((company) => (company.city ? selectedCities.includes(company.city) : false))
    }

    // Verified filter
    if (showVerifiedOnly) {
      filtered = filtered.filter((company) => company.isVerified)
    }

    // Featured filter
    if (showFeaturedOnly) {
      filtered = filtered.filter((company) => company.isFeatured)
    }

    // Sorting
    switch (sortBy) {
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "reviews":
        filtered.sort((a, b) => b.reviewCount - a.reviewCount)
        break
      case "newest":
        filtered.sort((a, b) => b.id - a.id)
        break
      default:
        // Relevance - featured first, then by rating
        filtered.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1
          if (!a.isFeatured && b.isFeatured) return 1
          return b.rating - a.rating
        })
    }

    return filtered
  }, [searchQuery, locationQuery, selectedCategories, selectedCities, sortBy, showVerifiedOnly, showFeaturedOnly])

  // Reset to page 1 when filters change
  const totalPages = Math.ceil(filteredCompanies.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedCompanies = filteredCompanies.slice(startIndex, endIndex)

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
            <p className="text-gray-200">Discover {mockCompanies.length}+ businesses across Ethiopia</p>
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
              />
            </aside>

            <div className="flex-1">
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredCompanies.length)} of {filteredCompanies.length}{" "}
                  {filteredCompanies.length === 1 ? "company" : "companies"}
                </p>
              </div>

              {filteredCompanies.length > 0 ? (
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
