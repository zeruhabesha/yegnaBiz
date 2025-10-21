import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SearchHero } from "@/components/search-hero"
import { CategoryGrid } from "@/components/category-grid"
import { CompanyCard } from "@/components/company-card"
import { PinnedPromotions } from "@/components/pinned-promotions"
import { getCompanyStats, getFeaturedCompanies } from "@/lib/data/companies"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Building2,
  CheckCircle,
  Shield,
  Target,
  TrendingUp,
  Users,
} from "@/components/icons"

import TestimonialCarousel from '@/components/testimonial-carousel'

export default async function HomePage() {
  const [featuredCompanies, stats] = await Promise.all([getFeaturedCompanies(6), getCompanyStats()])

  const statHighlights = [
    {
      icon: Building2,
      label: "Businesses listed",
      value: stats.total.toLocaleString(),
      description: "Active Ethiopian businesses across every major industry.",
    },
    {
      icon: Award,
      label: "Verified partners",
      value: stats.verified.toLocaleString(),
      description: "Profiles vetted by the YegnaBiz team for accuracy and trust.",
    },
    {
      icon: Users,
      label: "Customer reviews",
      value: stats.totalReviews.toLocaleString(),
      description: "Real feedback from customers to help you choose with confidence.",
    },
    {
      icon: TrendingUp,
      label: "Premium campaigns",
      value: stats.premium.toLocaleString(),
      description: "High-impact placements built to put your business in the spotlight.",
    },
  ]

  const howItWorks = [
    {
      title: "Search & discover",
      description: "Filter by category, location, or rating to uncover the right partner in seconds.",
    },
    {
      title: "Evaluate with confidence",
      description:
        "Review verified badges, photos, and testimonials to quickly compare the businesses that stand out.",
    },
    {
      title: "Connect & grow",
      description:
        "Reach out directly, request quotes, or book services right from each profile to keep momentum high.",
    },
  ]

  const growthHighlights = [
    {
      icon: BadgeCheck,
      title: "Verified badges",
      description: "Earn the check mark by completing your profile and giving buyers total confidence.",
    },
    {
      icon: Shield,
      title: "Reputation management",
      description: "Respond to reviews, showcase success stories, and monitor engagement from a single dashboard.",
    },
    {
      icon: Target,
      title: "Targeted campaigns",
      description: "Run geo-targeted promotions that appear across search results and category pages.",
    },
  ]

  const testimonials = [
    {
      quote:
        "We listed on YegnaBiz and within the first month our inquiries doubled. The platform makes it easy for new customers to trust us.",
      name: "Meron A.",
      role: "Founder, Addis Digital Studio",
    },
    {
      quote:
        "The promotion tools keep our events front and center. It is easily the most effective local directory we have worked with.",
      name: "Samuel T.",
      role: "Marketing Lead, Habesha Events",
    },
    {
      quote:
        "I can filter by city and service, read honest reviews, and reach the right vendors without endless calls. A huge time saver.",
      name: "Liya K.",
      role: "Operations Manager, Sunrise Trading",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <PinnedPromotions />
        <SearchHero />

        <section className="relative overflow-hidden bg-gradient-to-br from-primary/8 via-background to-accent/10 py-20">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
          </div>
          <div className="container relative z-10 space-y-12">
            <div className="mx-auto max-w-3xl text-center space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
                Platform at a glance
              </span>
              <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Everything you need to discover and grow</h2>
              <p className="text-lg text-muted-foreground">
                YegnaBiz brings together trusted businesses, verified reviews, and growth tools so you can move faster
                with less guesswork.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {statHighlights.map(({ icon: Icon, label, value, description }) => (
                <Card
                  key={label}
                  className="border border-border/60 bg-card/70 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
                >
                  <CardContent className="space-y-4 p-6">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-primary/15 p-3 text-primary">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
                        <p className="text-2xl font-bold">{value}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <CategoryGrid />

        <section className="py-20">
          <div className="container space-y-12">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div className="space-y-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-secondary/20 px-3 py-1 text-sm font-semibold text-secondary-foreground">
                  Featured partners
                  <CheckCircle className="h-4 w-4" />
                </span>
                <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Top-rated businesses this week</h2>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  Handpicked listings with stellar reviews, premium experiences, and fast response times. Explore the
                  teams that customers love working with.
                </p>
              </div>
              <Button asChild size="lg" variant="outline" className="border-primary/40 text-primary hover:bg-primary/10">
                <Link href="/companies">
                  Browse all companies
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            {featuredCompanies.length === 0 ? (
              <Card className="border-dashed border-border/60 bg-card/60">
                <CardContent className="flex flex-col items-center gap-4 p-10 text-center text-muted-foreground">
                  <p className="text-lg font-semibold">Featured companies will appear here.</p>
                  <p className="max-w-md text-sm">
                    Mark a company as "featured" in the admin dashboard to spotlight it on the home page and inspire new
                    visitors.
                  </p>
                  <Button asChild className="btn-gradient px-6">
                    <Link href="/admin/companies">Manage companies</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {featuredCompanies.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="relative py-20 bg-fixed bg-cover bg-center" style={{backgroundImage: "url('/hero-home.jpg')"}}>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="container relative z-10 space-y-12">
            <div className="mx-auto max-w-2xl text-center space-y-4">
              <h2 className="text-white font-bold tracking-tight md:text-5xl">How YegnaBiz keeps you ahead</h2>
              <p className="text-lg text-white text-muted-foreground">
                From discovery to conversion, each step is designed to help Ethiopian businesses build lasting customer
                relationships.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {howItWorks.map((step, index) => (
                <Card key={step.title} className="border border-border/60 bg-card/70">
                  <CardContent className="space-y-4 p-6">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary font-semibold">
                        {index + 1}
                      </span>
                      <h3 className="text-lg font-semibold">{step.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container space-y-12">
            <div className="mx-auto max-w-2xl text-center space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
                Growth toolkit
              </span>
              <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Tools that help your business shine</h2>
              <p className="text-lg text-muted-foreground">
                Activate premium features to reach new audiences, build credibility, and stay top of mind.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {growthHighlights.map(({ icon: Icon, title, description }) => (
                <Card key={title} className="border border-border/60 bg-card/70">
                  <CardContent className="space-y-4 p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/20 text-secondary-foreground">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">{title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary/5 py-20">
          <div className="container space-y-12">
            <div className="mx-auto max-w-2xl text-center space-y-4">
              <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Loved by teams across Ethiopia</h2>
              <p className="text-lg text-muted-foreground">
                Hear how businesses are using YegnaBiz to gain traction and earn trusted relationships with customers.
              </p>
            </div>

            <div className="relative">
              <TestimonialCarousel testimonials={testimonials} />
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/15 via-primary/5 to-accent/10" />
          <div className="container">
            <div className="grid gap-10 lg:grid-cols-[1.2fr,1fr] lg:items-center">
              <div className="space-y-6">
                <span className="inline-flex items-center gap-2 rounded-full bg-blue/20 px-4 py-1 text-sm font-semibold text-blue">
                  Ready to launch
                </span>
                <h2 className="text-4xl font-bold tracking-tight text-blue-600 md:text-5xl">
                  Claim your space on the most trusted Ethiopian business directory
                </h2>
                <p className="text-lg text-blue">
                  Showcase your services, build instant credibility, and keep customers engaged with timely updates and
                  promotions.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button asChild size="lg" className="btn-gradient px-8">
                    <Link href="/add-business" className="font-semibold">
                      List your business
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white/60 text-blue hover:bg-white/10">
                    <Link href="/promote" className="font-semibold">
                      Explore promotion packages
                    </Link>
                  </Button>
                </div>
              </div>
              <Card className="border border-white/40 bg-white/10 backdrop-blur">
                <CardContent className="space-y-4 p-6 text-blue">
                  <h3 className="text-xl font-semibold">Why premium listings convert better</h3>
                  <ul className="space-y-3 text-sm text-blue">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-blue" />
                      <span>Priority placement on search results and category pages.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-blue" />
                      <span>Dedicated analytics showing profile views and engagement.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-blue" />
                      <span>Advanced media gallery to showcase projects, menus, or services.</span>
                    </li>
                  </ul>
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
