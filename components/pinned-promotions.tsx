import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle, TrendingUp, Star } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { listPublicPromotions } from "@/lib/data/promotions"

export async function PinnedPromotions() {
  const promotions = await listPublicPromotions()

  if (promotions.length === 0) {
    return (
      <section className="bg-muted/40 py-12">
        <div className="container grid gap-8 justify-items-center text-center md:grid-cols-[2fr]">
          <div className="max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
              Promotion Spotlight
            </span>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Boost your visibility with a featured promotion slot
            </h2>
            <p className="text-muted-foreground">
              Highlight your business, event, or special offer across the directory. Pinned promotions appear above the
              fold and receive the highest engagement.
            </p>
            <Button asChild size="lg" className="btn-gradient px-8">
              <Link href="/promote" className="font-semibold">
                Create a promotion
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    )
  }

  const [primaryPromotion, ...otherPromotions] = promotions

  const testimonials = [
    {
      quote: "YegnaBiz helped us reach more customers than ever before. Highly recommended!",
      name: "Alemayehu T.",
      role: "CEO, Addis Tech Solutions"
    },
    {
      quote: "The platform is intuitive and our business visibility increased dramatically.",
      name: "Sara M.",
      role: "Marketing Manager, Habesha Cafe"
    },
    {
      quote: "Best directory for Ethiopian businesses. Our inquiries tripled in the first month.",
      name: "Dawit K.",
      role: "Founder, Mekelle Services"
    }
  ]

  return (
    <section className="bg-muted/40 py-12">
      <div className="container space-y-12">
        {/* Featured Promotion Carousel */}
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/70 backdrop-blur">
          <div className="grid gap-8 p-8 md:grid-cols-[1fr,1fr] md:items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
                Featured promotion
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="space-y-3">
                <h2 className="text-3xl font-bold leading-tight md:text-4xl">{primaryPromotion.title}</h2>
                <p className="text-muted-foreground text-base md:text-lg">{primaryPromotion.description}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="btn-gradient px-6 font-semibold">
                  <Link href={primaryPromotion.buttonLink}>
                    {primaryPromotion.buttonText}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-muted/60">
              {primaryPromotion.image ? (
                <Image
                  src={primaryPromotion.image}
                  alt={primaryPromotion.title}
                  width={640}
                  height={480}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full min-h-[240px] flex-col items-center justify-center gap-4 p-6 text-center">
                  <div className="rounded-full bg-primary/10 p-4 text-primary">
                    <TrendingUp className="h-8 w-8" />
                  </div>
                  <p className="text-muted-foreground">
                    Add an image to your promotion to capture attention instantly.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Other Promotions Carousel */}
        {otherPromotions.length > 0 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-semibold">More promotions</h3>
              <p className="text-muted-foreground">Discover other campaigns running across YegnaBiz</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {otherPromotions.slice(0, 6).map((promotion) => (
                <Card key={promotion.id} className="border border-border/60 bg-card/60 hover:border-primary/40 transition-colors">
                  <CardContent className="flex flex-col gap-3 p-5">
                    <h4 className="text-lg font-bold leading-tight">{promotion.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">{promotion.description}</p>
                    <Button asChild size="sm" className="self-start">
                      <Link href={promotion.buttonLink}>
                        {promotion.buttonText}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Testimonials Section */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-semibold">What our users say</h3>
            <p className="text-muted-foreground">Real experiences from Ethiopian businesses</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="border border-border/60 bg-card/80 backdrop-blur">
                <CardContent className="space-y-4 p-6">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-base leading-relaxed">"{testimonial.quote}"</p>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-primary">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
