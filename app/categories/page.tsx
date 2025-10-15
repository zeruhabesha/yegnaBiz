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
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Browse by Category</h1>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Explore businesses across all industries in Ethiopia
            </p>
          </div>
        </div>
      </section>

      <main className="flex-1 py-12">
        <div className="container">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const Icon = categoryIcons[category.name] || Building2
              return (
                <Card key={category.name} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{category.name}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline" className="w-full bg-transparent">
                      <Link href={`/companies?category=${encodeURIComponent(category.name)}`}>
                        View {category.count} Companies
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
