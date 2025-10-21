"use client"

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Card, CardContent } from '@/components/ui/card'

interface Testimonial {
  quote: string
  name: string
  role: string
}

interface Props {
  testimonials: Testimonial[]
}

export default function TestimonialCarousel({ testimonials }: Props) {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  )

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container flex">
        {testimonials.map((testimonial, index) => (
          <div key={`${testimonial.name}-${index}`} className="embla__slide flex-[0_0_100%] px-4">
            <Card className="border border-border/60 bg-card/80 backdrop-blur h-full">
              <CardContent className="space-y-4 p-6 h-full flex flex-col justify-between">
                <p className="text-base leading-relaxed text-foreground flex-grow">"{testimonial.quote}"</p>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-primary">{testimonial.name}</p>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}
