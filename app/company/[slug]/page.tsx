import { notFound } from "next/navigation"
import Link from "next/link"
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Globe,
  BadgeCheck,
  Clock,
  Users,
  Calendar,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Share2,
  Heart,
} from "@/components/icons"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReviewCard } from "@/components/review-card"
import { WriteReviewDialog } from "@/components/write-review-dialog"
import { mockCompanies, mockReviews, mockSocialLinks, mockBusinessHours } from "@/lib/mock-data"

const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const socialIcons: Record<string, any> = {
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
}

export default function CompanyProfilePage({ params }: { params: { slug: string } }) {
  const company = mockCompanies.find((c) => c.slug === params.slug)

  if (!company) {
    notFound()
  }

  const reviews = mockReviews.filter((r) => r.companyId === company.id)
  const socialLinks = mockSocialLinks[company.id] || []
  const businessHours = mockBusinessHours[company.id] || []

  const ratingDistribution = [
    { stars: 5, count: Math.floor(company.reviewCount * 0.6) },
    { stars: 4, count: Math.floor(company.reviewCount * 0.25) },
    { stars: 3, count: Math.floor(company.reviewCount * 0.1) },
    { stars: 2, count: Math.floor(company.reviewCount * 0.03) },
    { stars: 1, count: Math.floor(company.reviewCount * 0.02) },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary/10 via-background to-primary/5 border-b">
          <div className="container py-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="h-24 w-24 rounded-lg bg-background border flex items-center justify-center flex-shrink-0">
                <span className="text-3xl font-bold text-primary">{company.name.charAt(0)}</span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-3 mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold">{company.name}</h1>
                  {company.isVerified && <BadgeCheck className="h-8 w-8 text-primary flex-shrink-0 mt-1" />}
                </div>

                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge variant="secondary">{company.category}</Badge>
                  {company.subcategory && <Badge variant="outline">{company.subcategory}</Badge>}
                  {company.isPremium && <Badge>Premium</Badge>}
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-lg">{company.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-muted-foreground">({company.reviewCount} reviews)</span>
                  </div>
                  <Separator orientation="vertical" className="h-6" />
                  <span className="text-muted-foreground">{company.viewCount.toLocaleString()} views</span>
                </div>

                <p className="text-muted-foreground mb-4">{company.description}</p>

                <div className="flex flex-wrap gap-3">
                  <WriteReviewDialog companyName={company.name} />
                  <Button variant="outline" className="bg-transparent">
                    <Heart className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" className="bg-transparent">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews ({company.reviewCount})</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>About {company.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">{company.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                        {company.establishedYear && (
                          <div className="flex items-center gap-3">
                            <Calendar className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm text-muted-foreground">Established</p>
                              <p className="font-medium">{company.establishedYear}</p>
                            </div>
                          </div>
                        )}
                        {company.employeeCount && (
                          <div className="flex items-center gap-3">
                            <Users className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm text-muted-foreground">Employees</p>
                              <p className="font-medium">{company.employeeCount}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {businessHours.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Clock className="h-5 w-5" />
                          Business Hours
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {businessHours.map((hours) => (
                            <div key={hours.dayOfWeek} className="flex items-center justify-between py-2">
                              <span className="font-medium">{dayNames[hours.dayOfWeek]}</span>
                              {hours.isClosed ? (
                                <span className="text-muted-foreground">Closed</span>
                              ) : (
                                <span className="text-muted-foreground">
                                  {hours.openTime} - {hours.closeTime}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="reviews" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Customer Reviews</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col md:flex-row gap-8">
                        <div className="text-center md:text-left">
                          <div className="text-5xl font-bold mb-2">{company.rating.toFixed(1)}</div>
                          <div className="flex items-center gap-1 justify-center md:justify-start mb-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-5 w-5 ${
                                  i < Math.round(company.rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground">{company.reviewCount} reviews</p>
                        </div>

                        <div className="flex-1 space-y-2">
                          {ratingDistribution.map((dist) => (
                            <div key={dist.stars} className="flex items-center gap-3">
                              <span className="text-sm w-12">{dist.stars} star</span>
                              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-yellow-400"
                                  style={{ width: `${(dist.count / company.reviewCount) * 100}%` }}
                                />
                              </div>
                              <span className="text-sm text-muted-foreground w-12 text-right">{dist.count}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-4">
                    {reviews.length > 0 ? (
                      reviews.map((review) => <ReviewCard key={review.id} review={review} />)
                    ) : (
                      <Card>
                        <CardContent className="py-12 text-center">
                          <p className="text-muted-foreground mb-4">No reviews yet</p>
                          <WriteReviewDialog companyName={company.name} />
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {company.phone && (
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-muted-foreground mb-1">Phone</p>
                        <a href={`tel:${company.phone}`} className="font-medium hover:text-primary break-all">
                          {company.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {company.email && (
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-muted-foreground mb-1">Email</p>
                        <a href={`mailto:${company.email}`} className="font-medium hover:text-primary break-all">
                          {company.email}
                        </a>
                      </div>
                    </div>
                  )}

                  {company.website && (
                    <div className="flex items-start gap-3">
                      <Globe className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-muted-foreground mb-1">Website</p>
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium hover:text-primary break-all"
                        >
                          {company.website}
                        </a>
                      </div>
                    </div>
                  )}

                  {company.address && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-muted-foreground mb-1">Address</p>
                        <p className="font-medium">
                          {company.address}
                          <br />
                          {company.city}, {company.region}
                          <br />
                          {company.country}
                        </p>
                      </div>
                    </div>
                  )}

                  {socialLinks.length > 0 && (
                    <div className="pt-4 border-t">
                      <p className="text-sm text-muted-foreground mb-3">Follow Us</p>
                      <div className="flex items-center gap-2">
                        {socialLinks.map((link) => {
                          const Icon = socialIcons[link.platform]
                          return (
                            <Button
                              key={link.platform}
                              variant="outline"
                              size="icon"
                              asChild
                              className="bg-transparent"
                            >
                              <a href={link.url} target="_blank" rel="noopener noreferrer">
                                <Icon className="h-4 w-4" />
                              </a>
                            </Button>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Get Directions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                    <MapPin className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <Button className="w-full" asChild>
                    <Link
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        `${company.name} ${company.address} ${company.city}`,
                      )}`}
                      target="_blank"
                    >
                      Open in Maps
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
