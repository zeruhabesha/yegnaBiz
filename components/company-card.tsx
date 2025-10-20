import Link from "next/link"
import { Star, MapPin, Eye, CheckCircle, BadgeCheck } from "@/components/icons"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Company } from "@/lib/types/company"
import Image from "next/image"

interface CompanyCardProps {
  company: Company
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Link href={`/company/${company.slug}`}>
      <Card className="group card-hover bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 h-full overflow-hidden animate-fade-in">
        <CardHeader className="p-0 relative">
          <div className="relative h-52 w-full bg-gradient-to-br from-primary/10 to-accent/10 rounded-t-xl overflow-hidden">
            {company.coverImageUrl ? (
              <Image
                src={company.coverImageUrl}
                alt={company.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-gradient-to-br from-muted/20 to-muted/10">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <span className="text-2xl font-bold text-primary">{company.name.charAt(0)}</span>
                  </div>
                  <span className="text-sm">ምስል የለም</span>
                </div>
              </div>
            )}

            {/* Status badges */}
            <div className="absolute top-3 right-3 flex flex-col gap-2">
              {company.isPremium && (
                <Badge className="bg-gradient-to-r from-amber-400 to-amber-600 text-white border-0 shadow-lg animate-pulse">
                  <BadgeCheck className="h-3 w-3 mr-1" />
                  ፕሪሚየም
                </Badge>
              )}
              {company.isVerified && (
                <Badge className="bg-green-500/90 text-white border-0 shadow-lg">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  የተረጋገጠ
                </Badge>
              )}
              {company.isFeatured && (
                <Badge className="bg-primary/90 text-white border-0 shadow-lg">
                  ተለይቶ የቀረበ
                </Badge>
              )}
            </div>

            {/* View count overlay */}
            <div className="absolute bottom-3 left-3">
              <div className="bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 text-white text-xs">
                <Eye className="h-3 w-3" />
                <span>{company.viewCount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-4">
          {/* Company info */}
          <div className="flex items-start gap-4">
            <div className="relative">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border-2 border-primary/10 group-hover:border-primary/30 transition-colors group-hover:scale-105 duration-300">
                {company.logoUrl ? (
                  <Image
                    src={company.logoUrl}
                    alt={company.name}
                    width={56}
                    height={56}
                    className="rounded-xl object-cover"
                  />
                ) : (
                  <span className="text-xl font-bold text-primary">
                    {company.name.charAt(0)}
                  </span>
                )}
              </div>
              {company.isVerified && (
                <div className="absolute -top-1 -right-1 h-5 w-5 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                  <CheckCircle className="h-3 w-3 text-white" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                {company.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-xs">
                  {company.category}
                </Badge>
                {company.subcategory && (
                  <span className="text-xs text-muted-foreground">• {company.subcategory}</span>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {company.description}
          </p>

          {/* Rating and location */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 transition-all duration-200 ${
                        i < Math.floor(company.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold text-sm">{company.rating.toFixed(1)}</span>
                <span className="text-xs text-muted-foreground">({company.reviewCount})</span>
              </div>
            </div>

            {company.city && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{company.city}</span>
              </div>
            )}
          </div>

          {/* Additional info */}
          <div className="pt-2 border-t border-border/50">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>የተቋቋመ {company.establishedYear || 'ያልታወቀ'}</span>
              {company.employeeCount && (
                <span>{company.employeeCount} ሰራተኞች</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
