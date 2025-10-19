import Link from "next/link"
import { Star, MapPin, Eye } from "@/components/icons"
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
      <Card className="hover:shadow-lg transition-shadow h-full">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full bg-muted rounded-t-xl overflow-hidden">
            {company.coverImageUrl ? (
              <Image
                src={company.coverImageUrl}
                alt={company.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                No image
              </div>
            )}
            {company.isPremium && (
              <div className="absolute top-3 right-3">
                <Badge className="bg-amber-500 text-white">Premium</Badge>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          <div className="flex items-start gap-3">
            <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
              {company.logoUrl ? (
                <Image
                  src={company.logoUrl}
                  alt={company.name}
                  width={48}
                  height={48}
                  className="rounded-lg"
                />
              ) : (
                <span className="text-lg font-bold text-muted-foreground">
                  {company.name.charAt(0)}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg line-clamp-1">{company.name}</h3>
              <p className="text-sm text-muted-foreground">{company.category}</p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {company.description}
          </p>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-medium">{company.rating.toFixed(1)}</span>
              <span className="text-muted-foreground">({company.reviewCount})</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Eye className="h-4 w-4" />
              <span>{company.viewCount.toLocaleString()}</span>
            </div>
          </div>

          {company.city && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{company.city}</span>
            </div>
          )}

          {company.isVerified && (
            <Badge variant="secondary" className="text-xs">
              Verified
            </Badge>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
