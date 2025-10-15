import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, Award, Users, Target, Heart, TrendingUp } from "@/components/icons"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b">
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/hero-about.jpg')" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-primary/70 to-black/80"></div>
          </div>

          <div className="container py-16 md:py-24 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">About YegnaBiz</h1>
              <p className="text-xl text-gray-100">
                Ethiopia's leading business directory, connecting customers with trusted businesses across the nation.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission</h2>
                <p className="text-lg text-muted-foreground">
                  To empower Ethiopian businesses and consumers by creating a transparent, accessible marketplace that
                  fosters trust, growth, and economic development.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardContent className="pt-6">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
                    <p className="text-muted-foreground">
                      To become the most trusted and comprehensive business directory in Ethiopia, driving economic
                      growth and connecting communities.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Our Values</h3>
                    <p className="text-muted-foreground">
                      Trust, transparency, innovation, and community empowerment guide everything we do at YegnaBiz.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/40">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-primary" />
                </div>
                <div className="text-4xl font-bold mb-2">2,500+</div>
                <p className="text-muted-foreground">Registered Businesses</p>
              </div>

              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div className="text-4xl font-bold mb-2">50,000+</div>
                <p className="text-muted-foreground">Monthly Visitors</p>
              </div>

              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <div className="text-4xl font-bold mb-2">15,000+</div>
                <p className="text-muted-foreground">Customer Reviews</p>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Our Story</h2>
              <div className="space-y-6 text-muted-foreground">
                <p>
                  YegnaBiz was founded with a simple yet powerful idea: to make it easier for Ethiopians to discover
                  and connect with quality businesses in their communities. We recognized that while Ethiopia's business
                  landscape was growing rapidly, there was no comprehensive, reliable platform where customers could
                  find and review local businesses.
                </p>
                <p>
                  What started as a small directory has grown into Ethiopia's most trusted business platform, serving
                  thousands of businesses and hundreds of thousands of customers every month. We've helped small
                  businesses reach new customers, enabled consumers to make informed decisions, and contributed to the
                  growth of Ethiopia's digital economy.
                </p>
                <p>
                  Today, YegnaBiz is more than just a directory—it's a community of businesses and customers working
                  together to build a more transparent, efficient, and prosperous marketplace for all Ethiopians.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 bg-muted/40">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Why Choose YegnaBiz?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">Verified Businesses</h3>
                  <p className="text-sm text-muted-foreground">
                    All businesses are verified to ensure authenticity and reliability.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">Trusted Reviews</h3>
                  <p className="text-sm text-muted-foreground">
                    Real customer reviews help you make informed decisions.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">Business Growth</h3>
                  <p className="text-sm text-muted-foreground">
                    We help businesses grow by connecting them with customers.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
