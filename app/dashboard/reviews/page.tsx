"use client"

import { useEffect, useState } from "react"
import { Star, ThumbsUp, MessageSquare } from "@/components/icons"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Review } from "@/lib/types/company"

interface ReviewWithCompany extends Review {
  companyName: string
}

export default function MyReviewsPage() {
  const [reviews, setReviews] = useState<ReviewWithCompany[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchReviews() {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch("/api/dashboard/reviews", { signal: controller.signal })
        if (!response.ok) {
          throw new Error("Failed to load reviews")
        }
        const json = await response.json()
        if (!json.success) {
          throw new Error(json.error || "Failed to load reviews")
        }
        setReviews(json.data)
      } catch (err) {
        if (!(err instanceof DOMException && err.name === "AbortError")) {
          console.error(err)
          setError(err instanceof Error ? err.message : "Failed to load reviews")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()

    return () => controller.abort()
  }, [])

  const totalReviews = reviews.length
  const averageRating = totalReviews
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
    : 0
  const reviewsThisMonth = reviews.filter((review) => {
    const createdAt = new Date(review.createdAt)
    const now = new Date()
    return createdAt.getMonth() === now.getMonth() && createdAt.getFullYear() === now.getFullYear()
  }).length

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">My Reviews</h1>
        <p className="text-muted-foreground">Reviews received on your business listings</p>
      </div>

      {error && (
        <div className="rounded-md border border-destructive bg-destructive/10 px-4 py-3 text-destructive">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {loading ? <span className="h-8 w-16 rounded bg-muted animate-pulse block" /> : totalReviews}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-3xl font-bold">
                {loading ? <span className="h-8 w-16 rounded bg-muted animate-pulse block" /> : averageRating.toFixed(1)}
              </div>
              <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {loading ? <span className="h-8 w-16 rounded bg-muted animate-pulse block" /> : reviewsThisMonth}
            </div>
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
            {loading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="pb-6 border-b last:border-0 last:pb-0 space-y-3">
                    <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                    <div className="h-4 w-56 bg-muted animate-pulse rounded" />
                    <div className="h-24 bg-muted animate-pulse rounded" />
                  </div>
                ))
              : reviews.map((review) => (
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
