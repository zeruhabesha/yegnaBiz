import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SearchHero } from "@/components/search-hero"
import { CategoryGrid } from "@/components/category-grid"
import { CompanyCard } from "@/components/company-card"
import { mockCompanies } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Award, Users, Building2 } from "@/components/icons"

export default function HomePage() {
  const featuredCompanies = mockCompanies.filter((c) => c.isFeatured).slice(0, 6)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <SearchHero />

        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center space-y-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-xl">2,500+ Businesses</h3>
                <p className="text-muted-foreground">Comprehensive directory of Ethiopian companies</p>
              </div>
              <div className="text-center space-y-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-xl">Verified Listings</h3>
                <p className="text-muted-foreground">All businesses verified for authenticity</p>
              </div>
              <div className="text-center space-y-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-xl">Trusted Reviews</h3>
                <p className="text-muted-foreground">Real customer reviews and ratings</p>
              </div>
            </div>

            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Featured Businesses</h2>
                <p className="text-muted-foreground">Top-rated companies in Ethiopia</p>
              </div>
              <Button asChild variant="outline">
                <Link href="/companies">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCompanies.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          </div>
        </section>

        <CategoryGrid />

        <section className="py-16 bg-primary/5">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Grow Your Business with YegnaBiz</h2>
              <p className="text-lg text-muted-foreground">
                Join thousands of businesses reaching customers across Ethiopia. Get discovered, build trust, and grow
                your customer base.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button asChild size="lg">
                  <Link href="/add-business">Add Your Business</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
