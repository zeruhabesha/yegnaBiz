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

        {/* Enhanced Stats Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {highlightItems.map(({ icon: Icon, title, amharic, description, descriptionAm }) => (
                <div key={title} className="group text-center space-y-4 p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card hover:shadow-lg transition-all duration-300">
                  <div className="relative mx-auto w-fit">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="absolute inset-0 h-16 w-16 bg-primary/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-2xl text-foreground">{title}</h3>
                    <p className="text-sm text-muted-foreground/60 -mt-1">{amharic}</p>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {description}
                    <span className="block text-xs text-muted-foreground/60 mt-1">{descriptionAm}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Featured Businesses Section */}
        <section className="py-20">
          <div className="container">
            <div className="flex items-center justify-between mb-12">
              <div className="space-y-2">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                  Featured
                  <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-gradient">
                    Businesses
                  </span>
                </h2>
                <div>
                  <p className="text-xl text-muted-foreground max-w-2xl">
                    Discover trusted and top-rated companies across all industries in Ethiopia
                    <span className="block text-sm text-muted-foreground/60 mt-1">
                      በኢትዮጵያ ውስጥ በጣም የታመኑ እና ከፍተኛ ደረጃ ያላቸው ኩባንያዎችን ያግኙ
                    </span>
                  </p>
                </div>
              </div>
              <Button asChild variant="outline" size="lg" className="hidden md:flex glass-effect hover:bg-primary/10">
                <Link href="/companies">
                  ሁሉንም ይመልከቱ <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCompanies.map((company, index) => (
                <div
                  key={company.id}
                  className="group card-hover animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CompanyCard company={company} />
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-12 md:hidden">
              <Button asChild variant="outline" size="lg" className="glass-effect hover:bg-primary/10">
                <Link href="/companies">
View All Businesses <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <CategoryGrid />

        {/* Enhanced CTA Section */}
        <section className="py-24 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
          </div>

          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
                  ንግድዎን በ
                  <span className="block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-gradient">
                    YegnaBiz ማሳደግ
                  </span>
                </h2>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  በሺዎች የሚቆጠሩ ኢትዮጵያዊ ንግዶች ደንበኞችን በሀገር አቀፍ ደረጃ ማግኘት። ይገኙ፣ እምነት ይገንቡ፣ የደንበኞች መሰረትዎን ያሳድጉ።
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                <Button asChild size="lg" className="btn-gradient hover:scale-105 transition-all duration-200 text-lg px-8 py-4 animate-pulse-glow">
                  <Link href="/add-business">
                    ንግድዎን ያክሉ
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="glass-effect hover:bg-primary/10 text-lg px-8 py-4">
                  <Link href="/pricing">
                    ዋጋ ይመልከቱ
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-border/50">
                <div className="text-center space-y-2 group">
                  <div className="text-4xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">
                    10K+
                  </div>
                  <div className="text-muted-foreground">ንቁ ንግዶች</div>
                </div>
                <div className="text-center space-y-2 group">
                  <div className="text-4xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">
                    50K+
                  </div>
                  <div className="text-muted-foreground">ወርሃዊ ጎብኚዎች</div>
                </div>
                <div className="text-center space-y-2 group">
                  <div className="text-4xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">
                    95%
                  </div>
                  <div className="text-muted-foreground">የደንበኛ እርካታ</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
