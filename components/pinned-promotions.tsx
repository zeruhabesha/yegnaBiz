import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle, TrendingUp } from "@/components/icons"
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
  const featureList = primaryPromotion.popup?.features?.slice(0, 4) ?? []

  return (
    <section className="bg-muted/40 py-12">
      <div className="container grid gap-8 lg:grid-cols-[2fr,1fr]">
        <Card className="overflow-hidden border border-border/60 bg-card/70 backdrop-blur">
          <CardContent className="grid gap-6 p-8 md:grid-cols-[1.2fr,1fr] md:items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
                Featured promotion
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="space-y-3">
                <h2 className="text-3xl font-bold leading-tight md:text-4xl">{primaryPromotion.title}</h2>
                <p className="text-muted-foreground text-base md:text-lg">{primaryPromotion.description}</p>
              </div>
              {featureList.length > 0 && (
                <ul className="grid gap-3 text-sm md:grid-cols-2 md:text-base">
                  {featureList.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-left text-muted-foreground">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="btn-gradient px-6 font-semibold">
                  <Link href={primaryPromotion.buttonLink}>
                    {primaryPromotion.buttonText}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary/40 text-primary hover:bg-primary/10 hover:text-primary"
                  asChild
                >
                  <Link href="/promote">Promote your business</Link>
                </Button>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-muted/60">
              {primaryPromotion.image ? (
                <Image
                  src={primaryPromotion.image}
                  alt={primaryPromotion.title}
                  width={640}
                  height={480}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
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
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold">More promotions</h3>
            <p className="text-sm text-muted-foreground">
              Quickly explore other campaigns currently running across YegnaBiz.
            </p>
          </div>
          <div className="space-y-3">
            {otherPromotions.length === 0 ? (
              <Card className="border-dashed border-border/60 bg-card/40">
                <CardContent className="space-y-3 p-6 text-muted-foreground text-sm">
                  <p>
                    Only one campaign is live right now. Add additional promotions to rotate multiple offers in this
                    space.
                  </p>
                  <Button variant="secondary" size="sm" asChild>
                    <Link href="/promote">Create another promotion</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              otherPromotions.map((promotion) => (
                <Card key={promotion.id} className="border border-border/60 bg-card/60 hover:border-primary/40">
                  <CardContent className="flex flex-col gap-3 p-5">
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-primary">Pinned slot</p>
                      <h4 className="text-lg font-bold leading-tight">{promotion.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{promotion.description}</p>
                    <Button asChild size="sm" className="self-start">
                      <Link href={promotion.buttonLink}>
                        {promotion.buttonText}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
