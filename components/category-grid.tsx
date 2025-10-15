import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Laptop,
  Building2,
  ShoppingBag,
  Home,
  Wheat,
  Briefcase,
} from "@/components/icons"

const categories = [
  { name: "Technology", icon: Laptop, count: 125, color: "text-blue-500" },
  { name: "Finance", icon: Building2, count: 89, color: "text-green-500" },
  { name: "Retail", icon: ShoppingBag, count: 234, color: "text-purple-500" },
  { name: "Real Estate", icon: Home, count: 156, color: "text-orange-500" },
  { name: "Agriculture", icon: Wheat, count: 78, color: "text-yellow-500" },
  { name: "Professional Services", icon: Briefcase, count: 167, color: "text-indigo-500" },
]

export function CategoryGrid() {
  return (
    <section className="py-16 bg-muted/40">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Browse by Category</h2>
          <p className="text-muted-foreground">Explore businesses across different industries</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link key={category.name} href={`/companies?category=${encodeURIComponent(category.name)}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center space-y-3">
                    <div className={`h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto ${category.color}`}>
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
