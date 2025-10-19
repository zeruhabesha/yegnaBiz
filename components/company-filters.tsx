"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { categories, mockCompanies } from "@/lib/mock-data"

export interface CompanyFiltersProps {
  selectedCategories: string[]
  onCategoriesChange: (categories: string[]) => void
  selectedCities: string[]
  onCitiesChange: (cities: string[]) => void
  sortBy: string
  onSortChange: (sort: string) => void
  showVerifiedOnly: boolean
  onVerifiedChange: (checked: boolean) => void
  showFeaturedOnly: boolean
  onFeaturedChange: (checked: boolean) => void
}

const availableCities = Array.from(
  new Set(
    mockCompanies
      .map((company) => company.city)
      .filter((city): city is string => Boolean(city)),
  ),
).sort()

export function CompanyFilters({
  selectedCategories,
  onCategoriesChange,
  selectedCities,
  onCitiesChange,
  sortBy,
  onSortChange,
  showVerifiedOnly,
  onVerifiedChange,
  showFeaturedOnly,
  onFeaturedChange,
}: CompanyFiltersProps) {
  const toggleValue = (values: string[], value: string, onChange: (next: string[]) => void) => {
    if (values.includes(value)) {
      onChange(values.filter((item) => item !== value))
    } else {
      onChange([...values, value])
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label className="font-medium">Categories</Label>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => toggleValue(selectedCategories, category, onCategoriesChange)}
                  className="h-4 w-4"
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
        </div>

        {availableCities.length > 0 && (
          <div className="space-y-3">
            <Label className="font-medium">Cities</Label>
            <div className="space-y-2">
              {availableCities.map((city) => (
                <label key={city} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedCities.includes(city)}
                    onChange={() => toggleValue(selectedCities, city, onCitiesChange)}
                    className="h-4 w-4"
                  />
                  <span>{city}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label className="font-medium">Sort by</Label>
          <select
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="relevance">Relevance</option>
            <option value="rating">Highest Rating</option>
            <option value="reviews">Most Reviews</option>
            <option value="newest">Newest Listings</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showVerifiedOnly}
              onChange={(event) => onVerifiedChange(event.target.checked)}
              className="h-4 w-4"
            />
            <span>Verified companies only</span>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showFeaturedOnly}
              onChange={(event) => onFeaturedChange(event.target.checked)}
              className="h-4 w-4"
            />
            <span>Featured companies only</span>
          </label>
        </div>
      </CardContent>
    </Card>
  )
}
