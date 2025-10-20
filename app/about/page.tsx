import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, Award, Users, Target, Heart, TrendingUp } from "@/components/icons"
import { PageHero } from "@/components/page-hero"
import { PageSection } from "@/components/page-section"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <PageHero
          eyebrow="Our Story"
          title="About YegnaBiz"
          description="Ethiopia's leading business directory, connecting customers with trusted businesses across the nation."
          backgroundImage="/hero-about.jpg"
        />

        <PageSection
          align="center"
          title="Our mission"
          description="To empower Ethiopian businesses and consumers by creating a transparent, accessible marketplace that fosters trust, growth, and economic development."
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {[
              {
                icon: Target,
                title: "Our Vision",
                description:
                  "To become the most trusted and comprehensive business directory in Ethiopia, driving economic growth and connecting communities.",
              },
              {
                icon: Heart,
                title: "Our Values",
                description:
                  "Trust, transparency, innovation, and community empowerment guide everything we do at YegnaBiz.",
              },
            ].map(({ icon: Icon, title, description }) => (
              <Card key={title} className="border-white/10 bg-background/70">
                <CardContent className="space-y-4 pt-8 text-left">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">{title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </PageSection>

        <PageSection tone="muted" align="center" eyebrow="Impact" title="A community built on trust">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { icon: Building2, value: "2,500+", label: "Registered Businesses" },
              { icon: Users, value: "50,000+", label: "Monthly Visitors" },
              { icon: Award, value: "15,000+", label: "Customer Reviews" },
            ].map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="rounded-3xl border border-white/10 bg-background/60 p-8 text-center shadow-lg shadow-black/5 backdrop-blur"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/15">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <div className="text-4xl font-bold text-foreground">{value}</div>
                <p className="mt-2 text-sm uppercase tracking-wide text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </PageSection>

        <PageSection
          align="center"
          eyebrow="Journey"
          title="Our story"
          description="YegnaBiz grew from a grassroots idea into Ethiopia's most trusted business directory by staying close to the entrepreneurs and communities we serve."
        >
          <div className="mx-auto max-w-3xl space-y-6 text-left text-muted-foreground">
            <p>
              YegnaBiz was founded with a simple yet powerful idea: to make it easier for Ethiopians to discover and connect with quality businesses in their communities. We recognized that while Ethiopia's business landscape was growing rapidly, there was no comprehensive, reliable platform where customers could find and review local businesses.
            </p>
            <p>
              What started as a small directory has grown into Ethiopia's most trusted business platform, serving thousands of businesses and hundreds of thousands of customers every month. We've helped small businesses reach new customers, enabled consumers to make informed decisions, and contributed to the growth of Ethiopia's digital economy.
            </p>
            <p>
              Today, YegnaBiz is more than just a directory—it's a community of businesses and customers working together to build a more transparent, efficient, and prosperous marketplace for all Ethiopians.
            </p>
          </div>
        </PageSection>

        <PageSection tone="muted" align="center" title="Why choose YegnaBiz?">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
            {[{ icon: Award, title: "Verified Businesses", description: "All businesses are vetted to ensure authenticity and reliability." }, { icon: Users, title: "Trusted Reviews", description: "Real customer reviews help you make informed decisions." }, { icon: TrendingUp, title: "Business Growth", description: "We help businesses grow by connecting them with customers." }].map(({ icon: Icon, title, description }) => (
              <Card key={title} className="border-white/10 bg-background/70">
                <CardContent className="space-y-3 pt-8 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/15">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </PageSection>
      </main>

      <Footer />
    </div>
  )
}
