import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SearchHero } from "@/components/search-hero"
import { CategoryGrid } from "@/components/category-grid"
import { CompanyCard } from "@/components/company-card"
import { getFeaturedCompanies, getCompanyStats } from "@/lib/data/companies"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Award, Users, Building2 } from "@/components/icons"
import { PageSection } from "@/components/page-section"

export default async function HomePage() {
  const [featuredCompanies, stats] = await Promise.all([getFeaturedCompanies(6), getCompanyStats()])

  const highlightItems = [
    {
      icon: Building2,
      title: `${stats.total.toLocaleString()} Businesses`,
      subtitle: "Nationwide reach",
      description: "The most comprehensive directory of Ethiopian companies, all in one place."
    },
    {
      icon: Award,
      title: `${stats.verified.toLocaleString()} Verified`,
      subtitle: "Trust assured",
      description: "Every listing is verified by our team to ensure accuracy and credibility."
    },
    {
      icon: Users,
      title: `${stats.totalReviews.toLocaleString()} Reviews`,
      subtitle: "Voices of customers",
      description: "Real experiences and ratings that help you choose with confidence."
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <SearchHero />

        <PageSection
          tone="muted"
          align="center"
          eyebrow="Impact in numbers"
          title="Why Ethiopia trusts YegnaBiz"
          description="Metrics that show how we help businesses thrive and how customers discover services they can count on."
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {highlightItems.map(({ icon: Icon, title, subtitle, description }) => (
              <div
                key={title}
                className="group space-y-4 rounded-3xl border border-white/10 bg-background/70 p-8 text-center shadow-lg shadow-black/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-primary/20"
              >
                <div className="relative mx-auto w-fit">
                  <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-10 w-10 text-primary" />
                  </div>
                  <div className="absolute inset-0 h-20 w-20 rounded-3xl bg-primary/15 blur-xl transition-all duration-300 group-hover:blur-2xl" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-foreground">{title}</h3>
                  <p className="-mt-1 text-sm uppercase tracking-[0.3em] text-muted-foreground/60">{subtitle}</p>
                </div>
                <p className="text-muted-foreground leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </PageSection>

        <PageSection
          eyebrow="Featured Directory"
          title="Trusted businesses curated for you"
          description="Discover top-rated Ethiopian companies spanning hospitality, finance, technology, retail, and more. Each listing is verified to help you choose with confidence."
        >
          <div className="flex flex-col items-start justify-between gap-6 pb-6 md:flex-row md:items-center">
            <div className="space-y-3 max-w-2xl">
              <p className="text-lg text-muted-foreground">
                Discover trusted, top-rated companies across every Ethiopian industry, curated by our research team.
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="hidden rounded-full border-primary/40 px-6 py-3 text-primary shadow-primary/30 hover:shadow-primary/40 md:inline-flex"
            >
              <Link href="/companies">
                Explore all listings <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredCompanies.map((company, index) => (
              <div
                key={company.id}
                className="animate-fade-in card-hover"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <CompanyCard company={company} />
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center md:hidden">
            <Button asChild variant="outline" size="lg" className="rounded-full border-primary/40 px-6 py-3 text-primary">
              <Link href="/companies">
                View all businesses <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </PageSection>

        <CategoryGrid />

        <PageSection
          tone="accent"
          align="center"
          eyebrow="Grow with confidence"
          title={
            <>
              Scale your business with
              <span className="block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                YegnaBiz
              </span>
            </>
          }
          description="Join thousands of Ethiopian businesses that reach new customers, build trust, and grow faster with YegnaBiz."
        >
          <div className="flex flex-col items-center justify-center gap-6 pt-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="btn-gradient animate-pulse-glow rounded-full px-10 py-4 text-lg shadow-primary/40"
            >
              <Link href="/add-business">Add your business</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-white/30 px-10 py-4 text-lg text-white"
            >
              <Link href="/pricing">View pricing</Link>
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 border-t border-white/10 pt-12 md:grid-cols-3">
            {[{ label: "Active businesses", value: "10K+" }, { label: "Monthly visitors", value: "50K+" }, { label: "Customer satisfaction", value: "95%" }].map((item) => (
              <div key={item.label} className="group text-center">
                <div className="text-4xl font-bold text-white transition-transform duration-300 group-hover:scale-110">
                  {item.value}
                </div>
                <div className="mt-2 text-sm uppercase tracking-wide text-white/80">{item.label}</div>
              </div>
            ))}
          </div>
        </PageSection>
      </main>

      <Footer />
    </div>
  )
}
