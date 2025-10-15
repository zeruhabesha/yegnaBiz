"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { categories } from "@/lib/mock-data"

interface CompanyFiltersProps {
  onFilterChange: (filters: FilterState) => void
}

export interface FilterState {
  category: string
  minRating: number
  searchQuery: string
}

export function CompanyFilters({ onFilterChange }: CompanyFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    category: "",
    minRating: 0,
    searchQuery: "",
  })

  const handleFilterChange = (key: keyof FilterState, value: string | number) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Category</Label>
          <select
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label>Minimum Rating</Label>
          <Input
            type="number"
            min="0"
            max="5"
            step="0.5"
            value={filters.minRating}
            onChange={(e) => handleFilterChange("minRating", parseFloat(e.target.value) || 0)}
          />
        </div>
      </CardContent>
    </Card>
  )
}
