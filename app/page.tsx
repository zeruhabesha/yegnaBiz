import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SearchHero } from "@/components/search-hero"
import { CategoryGrid } from "@/components/category-grid"
import { CompanyCard } from "@/components/company-card"
import { getFeaturedCompanies, getCompanyStats } from "@/lib/data/companies"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Award, Users, Building2 } from "@/components/icons"

export default async function HomePage() {
  const [featuredCompanies, stats] = await Promise.all([getFeaturedCompanies(6), getCompanyStats()])

  const highlightItems = [
    {
      icon: Building2,
      title: `${stats.total.toLocaleString()} Businesses`,
      description: "Comprehensive directory of Ethiopian companies",
    },
    {
      icon: Award,
      title: `${stats.verified.toLocaleString()} Verified Listings`,
      description: "All businesses verified for authenticity",
    },
    {
      icon: Users,
      title: `${stats.totalReviews.toLocaleString()} Reviews`,
      description: "Real customer reviews and ratings",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <SearchHero />

        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {highlightItems.map(({ icon: Icon, title, description }) => (
                <div key={title} className="text-center space-y-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-xl">{title}</h3>
                  <p className="text-muted-foreground">{description}</p>
                </div>
              ))}
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
