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
      amharic: "ንግዶች",
      description: "Comprehensive directory of Ethiopian businesses",
      descriptionAm: "የኢትዮጵያ ንግዶች ሙሉ ማውጫ"
    },
    {
      icon: Award,
      title: `${stats.verified.toLocaleString()} Verified`,
      amharic: "የተረጋገጡ",
      description: "All businesses verified for accuracy",
      descriptionAm: "ሁሉም ንግዶች ለትክክለኛነት የተረጋገጡ"
    },
    {
      icon: Users,
      title: `${stats.totalReviews.toLocaleString()} Reviews`,
      amharic: "ግምገማዎች",
      description: "Genuine customer reviews and ratings",
      descriptionAm: "እውነተኛ የደንበኞች ግምገማዎች"
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
          eyebrow="ቁጥሮች"
          title="Why Ethiopia trusts YegnaBiz"
          description="Numbers that highlight our commitment to a vibrant, transparent Ethiopian business ecosystem"
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {highlightItems.map(({ icon: Icon, title, amharic, description, descriptionAm }) => (
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
                  <p className="-mt-1 text-sm text-muted-foreground/60">{amharic}</p>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {description}
                  <span className="mt-1 block text-xs text-muted-foreground/60">{descriptionAm}</span>
                </p>
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
                Discover trusted and top-rated companies across all industries in Ethiopia
                <span className="mt-1 block text-sm text-muted-foreground/60">
                  በኢትዮጵያ ውስጥ በጣም የታመኑ እና ከፍተኛ ደረጃ ያላቸው ኩባንያዎችን ያግኙ
                </span>
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="hidden rounded-full border-primary/40 px-6 py-3 text-primary shadow-primary/30 hover:shadow-primary/40 md:inline-flex"
            >
              <Link href="/companies">
                ሁሉንም ይመልከቱ <ArrowRight className="ml-2 h-5 w-5" />
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
                View All Businesses <ArrowRight className="ml-2 h-5 w-5" />
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
              ንግድዎን በ
              <span className="block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                YegnaBiz ማሳደግ
              </span>
            </>
          }
          description="በሺዎች የሚቆጠሩ ኢትዮጵያዊ ንግዶች ደንበኞችን በሀገር አቀፍ ደረጃ ማግኘት። ይገኙ፣ እምነት ይገንቡ፣ የደንበኞች መሰረትዎን ያሳድጉ።"
        >
          <div className="flex flex-col items-center justify-center gap-6 pt-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="btn-gradient animate-pulse-glow rounded-full px-10 py-4 text-lg shadow-primary/40"
            >
              <Link href="/add-business">ንግድዎን ያክሉ</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-white/30 px-10 py-4 text-lg text-white"
            >
              <Link href="/pricing">ዋጋ ይመልከቱ</Link>
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 border-t border-white/10 pt-12 md:grid-cols-3">
            {[{ label: "ንቁ ንግዶች", value: "10K+" }, { label: "ወርሃዊ ጎብኚዎች", value: "50K+" }, { label: "የደንበኛ እርካታ", value: "95%" }].map((item) => (
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
