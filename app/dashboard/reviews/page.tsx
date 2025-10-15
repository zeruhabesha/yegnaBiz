"use client"

import { Star, ThumbsUp, MessageSquare } from "@/components/icons"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function MyReviewsPage() {
  // Mock data - in production, this would come from an API
  const receivedReviews = [
    {
      id: 1,
      companyName: "Yoha Construction",
      userName: "Dawit Tesfaye",
      rating: 5,
      title: "Excellent Work",
      comment: "Professional team that delivered our project on time and within budget. Highly recommended!",
      createdAt: "2024-12-15",
      isVerified: true,
    },
    {
      id: 2,
      companyName: "Sheba Leather",
      userName: "Sara Ahmed",
      rating: 4,
      title: "Quality Products",
      comment: "Beautiful leather goods with great craftsmanship. Will definitely order again.",
      createdAt: "2024-12-10",
      isVerified: true,
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">My Reviews</h1>
        <p className="text-muted-foreground">Reviews received on your business listings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">443</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-3xl font-bold">4.3</div>
              <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <p className="text-sm text-muted-foreground">New reviews</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Reviews</CardTitle>
          <CardDescription>Latest customer feedback on your businesses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {receivedReviews.map((review) => (
              <div key={review.id} className="pb-6 border-b last:border-0 last:pb-0">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{review.userName}</h4>
                      {review.isVerified && <Badge variant="secondary">Verified</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Review for <span className="font-medium">{review.companyName}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <h5 className="font-medium mb-2">{review.title}</h5>
                <p className="text-muted-foreground mb-3">{review.comment}</p>

                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span>
                    {new Date(review.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <ThumbsUp className="h-3 w-3 mr-1" />
                    Helpful
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    Reply
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
