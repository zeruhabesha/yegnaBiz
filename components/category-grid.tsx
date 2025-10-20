import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { getCategoryCounts } from "@/lib/data/companies"
import { Laptop, Building2, ShoppingBag, Home, Wheat, Briefcase } from "@/components/icons"
import { PageSection } from "@/components/page-section"

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
    <PageSection
      tone="muted"
      align="center"
      eyebrow="Categories"
      title="Browse by category"
      description="Explore businesses across Ethiopia's most vibrant industries"
    >
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {limitedCategories.map((category, index) => {
          const Icon = getCategoryIcon(category.name)
          const color = colorPalette[index % colorPalette.length]
          return (
            <Link key={category.name} href={`/companies?category=${encodeURIComponent(category.name)}`}>
              <Card className="group h-full cursor-pointer border-white/10 transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-primary/20">
                <CardContent className="space-y-4 p-6 text-center">
                  <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-muted/40 ${color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{category.name}</h3>
                    <p className="text-xs text-muted-foreground">{category.count} businesses</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </PageSection>
  )
}
