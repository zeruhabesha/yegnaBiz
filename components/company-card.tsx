import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { BadgeCheck, CheckCircle, Eye, MapPin, Star } from "@/components/icons"
import type { Company } from "@/lib/types/company"

interface CompanyCardProps {
  company: Company
}

export function CompanyCard({ company }: CompanyCardProps) {
  const ratingStars = Array.from({ length: 5 })

  return (
    <Link href={`/company/${company.slug}`}>
      <Card className="group h-full overflow-hidden border border-border/50 bg-card/60 backdrop-blur transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
        <CardHeader className="relative h-52 overflow-hidden p-0">
          <div className="relative h-full w-full bg-gradient-to-br from-primary/10 to-accent/10">
            {company.coverImageUrl ? (
              <Image
                src={company.coverImageUrl}
                alt={company.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority={false}
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-3 text-muted-foreground">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                  {company.name.charAt(0)}
                </div>
                <p className="text-sm">Add a cover image to make a stronger first impression.</p>
              </div>
            )}

            <div className="absolute top-3 right-3 flex flex-col items-end gap-2">
              {company.isPremium && (
                <Badge className="flex items-center gap-1 border-0 bg-gradient-to-r from-amber-400 to-amber-600 text-white shadow-lg">
                  <BadgeCheck className="h-3 w-3" />
                  Premium listing
                </Badge>
              )}
              {company.isVerified && (
                <Badge className="flex items-center gap-1 border-0 bg-green-500 text-white shadow-lg">
                  <CheckCircle className="h-3 w-3" />
                  Verified
                </Badge>
              )}
              {company.isFeatured && (
                <Badge className="border-0 bg-primary text-white shadow-lg">Featured</Badge>
              )}
            </div>

            <div className="absolute bottom-3 left-3">
              <div className="flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-xs text-white backdrop-blur">
                <Eye className="h-3 w-3" />
                <span>{company.viewCount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-5 p-6">
          <div className="flex items-start gap-4">
            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border-2 border-primary/10 bg-gradient-to-br from-primary/20 to-accent/20 transition duration-300 group-hover:border-primary/30 group-hover:scale-105">
                {company.logoUrl ? (
                  <Image
                    src={company.logoUrl}
                    alt={company.name}
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded-xl object-cover"
                  />
                ) : (
                  <span className="text-xl font-bold text-primary">{company.name.charAt(0)}</span>
                )}
              </div>
              {company.isVerified && (
                <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white shadow">
                  <CheckCircle className="h-3 w-3" />
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="line-clamp-1 text-lg font-semibold transition-colors group-hover:text-primary">
                {company.name}
              </h3>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="secondary" className="text-xs">
                  {company.category}
                </Badge>
                {company.subcategory && <span>- {company.subcategory}</span>}
              </div>
            </div>
          </div>

          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{company.description}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex">
                {ratingStars.map((_, index) => (
                  <Star
                    key={index}
                    className={`h-4 w-4 transition-colors ${
                      index < Math.round(company.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-muted-foreground/50"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold">{company.rating.toFixed(1)}</span>
              <span className="text-xs text-muted-foreground">({company.reviewCount})</span>
            </div>

            {company.city && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{company.city}</span>
              </div>
            )}
          </div>

          <div className="border-t border-border/60 pt-3 text-xs text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Established {company.establishedYear ? company.establishedYear : "N/A"}</span>
              {company.employeeCount && <span>{company.employeeCount} team members</span>}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
