import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { getCategoryCounts } from "@/lib/data/companies"
import { Laptop, Building2, ShoppingBag, Home, Wheat, Briefcase } from "@/components/icons"

const colorPalette = [
  "text-blue-500",
  "text-green-500",
  "text-purple-500",
  "text-orange-500",
  "text-yellow-500",
  "text-indigo-500",
]

function getCategoryIcon(category: string) {
  const normalized = category.toLowerCase()
  if (normalized.includes("tech")) return Laptop
  if (normalized.includes("finance") || normalized.includes("bank")) return Building2
  if (normalized.includes("retail") || normalized.includes("shop")) return ShoppingBag
  if (normalized.includes("real") || normalized.includes("estate") || normalized.includes("construction")) return Home
  if (normalized.includes("agri") || normalized.includes("food")) return Wheat
  return Briefcase
}

export async function CategoryGrid() {
  const categories = await getCategoryCounts()

  if (categories.length === 0) {
    return null
  }

  const limitedCategories = categories.slice(0, 6)

  return (
    <section className="py-16 bg-muted/40">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Browse by Category</h2>
          <p className="text-muted-foreground">Explore businesses across different industries</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {limitedCategories.map((category, index) => {
            const Icon = getCategoryIcon(category.name)
            const color = colorPalette[index % colorPalette.length]
            return (
              <Link key={category.name} href={`/companies?category=${encodeURIComponent(category.name)}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center space-y-3">
                    <div className={`h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto ${color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{category.name}</h3>
                      <p className="text-xs text-muted-foreground">{category.count} businesses</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
