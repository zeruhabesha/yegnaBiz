import { Star, ThumbsUp } from "@/components/icons"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Review } from "@/lib/mock-data"

interface ReviewCardProps {
  review: Review
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold">{review.userName}</h4>
              {review.isVerified && (
                <Badge variant="secondary" className="text-xs">
                  Verified
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < review.rating
                      ? "fill-amber-400 text-amber-400"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
          </div>
          <span className="text-sm text-muted-foreground">
            {new Date(review.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div>
          <h5 className="font-medium mb-1">{review.title}</h5>
          <p className="text-sm text-muted-foreground">{review.comment}</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="gap-1">
            <ThumbsUp className="h-4 w-4" />
            Helpful
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
