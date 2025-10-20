import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import {
  Building2,
  Plane,
  Utensils,
  Hammer,
  Factory,
  Hotel,
  Laptop,
  Banknote,
  GraduationCap,
  ShoppingBag,
  Home,
  Wheat,
} from "@/components/icons"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/page-hero"
import { PageSection } from "@/components/page-section"

const categoryIcons: Record<string, any> = {
  Technology: Laptop,
  Finance: Banknote,
  Transportation: Plane,
  "Food & Beverage": Utensils,
  Construction: Hammer,
  Manufacturing: Factory,
  Hospitality: Hotel,
  Healthcare: Building2,
  Education: GraduationCap,
  Retail: ShoppingBag,
  "Real Estate": Home,
  Agriculture: Wheat,
}

const categories = [
  {
    name: "Technology",
    count: 145,
    description: "Software, telecommunications, IT services, and tech startups",
  },
  {
    name: "Finance",
    count: 234,
    description: "Banks, insurance companies, investment firms, and financial services",
  },
  {
    name: "Transportation",
    count: 89,
    description: "Airlines, logistics, shipping, and transportation services",
  },
  {
    name: "Food & Beverage",
    count: 312,
    description: "Restaurants, breweries, food manufacturers, and catering services",
  },
  {
    name: "Construction",
    count: 178,
    description: "Contractors, builders, civil engineering, and construction firms",
  },
  {
    name: "Manufacturing",
    count: 156,
    description: "Factories, production facilities, and manufacturing companies",
  },
  {
    name: "Hospitality",
    count: 203,
    description: "Hotels, resorts, lodges, and hospitality services",
  },
  {
    name: "Healthcare",
    count: 267,
    description: "Hospitals, clinics, pharmacies, and medical services",
  },
  {
    name: "Education",
    count: 198,
    description: "Schools, universities, training centers, and educational institutions",
  },
  {
    name: "Retail",
    count: 421,
    description: "Shops, stores, supermarkets, and retail businesses",
  },
  {
    name: "Real Estate",
    count: 134,
    description: "Property developers, real estate agencies, and property management",
  },
  {
    name: "Agriculture",
    count: 167,
    description: "Farms, agricultural services, and agribusiness companies",
  },
]

export default function CategoriesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <PageHero
        eyebrow="Categories"
        title="Browse by Category"
        description="Explore businesses across all industries in Ethiopia and discover the leaders that power our economy."
        backgroundImage="/hero-companies.jpg"
      />

      <main className="flex-1">
        <PageSection
          align="center"
          title="Curated industry collections"
          description="Each category brings together verified businesses, customer stories, and the expertise you need."
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const Icon = categoryIcons[category.name] || Building2
              return (
                <Card
                  key={category.name}
                  className="h-full border-white/10 bg-background/70 transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-primary/20"
                >
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/15">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-foreground">{category.name}</CardTitle>
                    <CardDescription className="leading-relaxed text-muted-foreground">{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline" className="w-full rounded-full border-primary/40 py-2">
                      <Link href={`/companies?category=${encodeURIComponent(category.name)}`}>
                        View {category.count} Companies
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </PageSection>
      </main>

      <Footer />
    </div>
  )
}
