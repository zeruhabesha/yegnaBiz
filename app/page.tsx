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

        {/* Enhanced Stats Section with improved animations */}
        <section className="py-24 bg-gradient-to-br from-primary/8 via-background to-accent/8 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="container relative z-10">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                በሺዎች የሚቆጠሩ
                <span className="block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-gradient">
                  ኢትዮጵያዊ ንግዶች
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                በኢትዮጵያ ውስጥ ካሉ ምርጥ ንግዶች ጋር ይገናኙ፣ እውነተኛ ግምገማዎችን ያንብቡ፣ እምነት የሚጣልዩ አገልግሎቶችን ያግኙ
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {highlightItems.map(({ icon: Icon, title, amharic, description, descriptionAm }, index) => (
                <div
                  key={title}
                  className="group text-center space-y-6 p-8 rounded-3xl bg-card/60 backdrop-blur-sm border border-border/60 hover:bg-card/80 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="relative mx-auto w-fit">
                    <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                      <Icon className="h-10 w-10 text-primary" />
                    </div>
                    <div className="absolute inset-0 h-20 w-20 bg-primary/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-3xl text-foreground group-hover:text-primary transition-colors duration-300">{title}</h3>
                    <p className="text-sm text-muted-foreground/70 font-medium">{amharic}</p>
                  </div>
                  <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                    {description}
                    <span className="block text-sm text-muted-foreground/60 mt-2 font-medium">{descriptionAm}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Featured Businesses Section with improved animations */}
        <section className="py-24 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/3 -left-32 w-96 h-96 bg-gradient-to-r from-primary/3 to-accent/3 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-gradient-to-r from-accent/3 to-secondary/3 rounded-full blur-3xl"></div>
          </div>

          <div className="container relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
              <div className="space-y-4 text-center md:text-left flex-1">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                  ተለይተው የቀረቡ
                  <span className="block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-gradient">
                    ንግዶች
                  </span>
                </h2>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
                  በኢትዮጵያ ውስጥ ካሉ ታማኝ እና ከፍተኛ ደረጃ ያላቸው ኩባንያዎች ጋር ይተዋወቁ
                  <span className="block text-base text-muted-foreground/70 mt-2">
                    Discover trusted and top-rated companies across all industries in Ethiopia
                  </span>
                </p>
              </div>
              <Button asChild variant="outline" size="lg" className="hidden md:flex glass-effect hover:bg-primary/10 hover:scale-105 transition-all duration-300 shadow-lg border-2">
                <Link href="/companies" className="group">
                  ሁሉንም ይመልከቱ
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {featuredCompanies.map((company, index) => (
                <div
                  key={company.id}
                  className="group card-hover animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CompanyCard company={company} />
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-16 md:hidden">
              <Button asChild variant="outline" size="lg" className="glass-effect hover:bg-primary/10 hover:scale-105 transition-all duration-300 shadow-lg border-2">
                <Link href="/companies" className="group">
                  ሁሉንም ንግዶች ይመልከቱ
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <CategoryGrid />

        {/* Enhanced CTA Section with improved animations */}
        <section className="py-32 bg-gradient-to-br from-primary/8 via-accent/5 to-secondary/8 relative overflow-hidden">
          {/* Enhanced background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-2xl"></div>
          </div>

          <div className="container relative z-10">
            <div className="max-w-5xl mx-auto text-center space-y-12">
              <div className="space-y-6">
                <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
Grow Your Business 
                  <span className="block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-gradient">
with YegnaBiz                  </span>
                </h2>
                <p className="text-2xl md:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
                                     Join thousands of Ethiopian businesses reaching customers nationwide. Get discovered, build trust, and grow your customer base.

                  <span className="block text-lg text-muted-foreground/80 mt-4 font-medium">
                                    በሺዎች የሚቆጠሩ ኢትዮጵያዊ ንግዶች ደንበኞችን በሀገር አቀፍ ደረጃ ማግኘት። ይገኙ፣ እምነት ይገንቡ፣ የደንበኞች መሰረትዎን ያሳድጉ።

                  </span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                <Button asChild size="lg" className="btn-gradient hover:scale-105 transition-all duration-300 text-xl px-10 py-6 shadow-2xl animate-pulse-glow group">
                  <Link href="/add-business" className="font-bold">
                    Add Your Business
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="glass-effect hover:bg-primary/10 hover:scale-105 transition-all duration-300 text-xl px-10 py-6 shadow-xl border-2 group">
                  <Link href="/pricing" className="font-bold">
                    View Pricing
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20 pt-20 border-t border-border/60">
                <div className="text-center space-y-4 group">
                  <div className="relative mx-auto w-fit">
                    <div className="text-5xl md:text-6xl font-bold text-primary group-hover:scale-110 transition-all duration-500 animate-bounce">
                      10K+
                    </div>
                    <div className="absolute inset-0 text-5xl md:text-6xl font-bold text-primary/20 blur-sm animate-pulse">10K+</div>
                  </div>
                  <div className="text-lg font-semibold text-muted-foreground group-hover:text-foreground transition-colors duration-300">ንቁ ንግዶች</div>
                  <div className="text-sm text-muted-foreground/70">Active Businesses</div>
                </div>
                <div className="text-center space-y-4 group">
                  <div className="relative mx-auto w-fit">
                    <div className="text-5xl md:text-6xl font-bold text-primary group-hover:scale-110 transition-all duration-500 animate-bounce delay-300">
                      50K+
                    </div>
                    <div className="absolute inset-0 text-5xl md:text-6xl font-bold text-primary/20 blur-sm animate-pulse delay-300">50K+</div>
                  </div>
                  <div className="text-lg font-semibold text-muted-foreground group-hover:text-foreground transition-colors duration-300">ወርሃዊ ጎብኚዎች</div>
                  <div className="text-sm text-muted-foreground/70">Monthly Visitors</div>
                </div>
                <div className="text-center space-y-4 group">
                  <div className="relative mx-auto w-fit">
                    <div className="text-5xl md:text-6xl font-bold text-primary group-hover:scale-110 transition-all duration-500 animate-bounce delay-600">
                      95%
                    </div>
                    <div className="absolute inset-0 text-5xl md:text-6xl font-bold text-primary/20 blur-sm animate-pulse delay-600">95%</div>
                  </div>
                  <div className="text-lg font-semibold text-muted-foreground group-hover:text-foreground transition-colors duration-300">የደንበኛ እርካታ</div>
                  <div className="text-sm text-muted-foreground/70">Customer Satisfaction</div>
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
