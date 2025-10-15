"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, TrendingUp, Eye, Star, Award, Users, Briefcase } from "@/components/icons"

const plans = [
  {
    name: "Basic",
    price: "Free",
    description: "Perfect for getting started",
    features: [
      "Business listing",
      "Basic contact information",
      "Customer reviews",
      "Search visibility",
    ],
    notIncluded: [
      "Featured placement",
      "Photo gallery",
      "Priority support",
      "Analytics dashboard",
    ],
  },
  {
    name: "Premium",
    price: "2,500 ETB",
    period: "/month",
    description: "Boost your visibility",
    popular: true,
    features: [
      "Everything in Basic",
      "Featured on category pages",
      "10 photos gallery",
      "Social media links",
      "Priority in search results",
      "Business hours display",
      "Email support",
    ],
    notIncluded: [
      "Homepage featured spot",
      "Premium analytics",
    ],
  },
  {
    name: "Featured",
    price: "5,000 ETB",
    period: "/month",
    description: "Maximum exposure",
    features: [
      "Everything in Premium",
      "Homepage featured placement",
      "Unlimited photos",
      "Video showcase",
      "Premium badge",
      "Advanced analytics",
      "Priority support",
      "Custom URL",
      "Promotional campaigns",
    ],
    notIncluded: [],
  },
]

const benefits = [
  {
    icon: Eye,
    title: "Increased Visibility",
    description: "Get discovered by thousands of potential customers searching for businesses like yours.",
  },
  {
    icon: TrendingUp,
    title: "Grow Your Business",
    description: "Connect with customers actively looking for your products or services.",
  },
  {
    icon: Star,
    title: "Build Credibility",
    description: "Showcase customer reviews and ratings to build trust with potential clients.",
  },
  {
    icon: Users,
    title: "Reach More Customers",
    description: "Tap into our growing community of 50,000+ monthly visitors.",
  },
]

export default function PromotePage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b">
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/hero-promote.jpg')" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-primary/70 to-black/80"></div>
          </div>

          <div className="container py-16 md:py-24 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Promote Your Business</h1>
              <p className="text-xl text-gray-100 mb-8">
                Reach thousands of customers and grow your business with YegnaBiz's powerful promotional tools.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href="#pricing">View Pricing Plans</a>
                </Button>
                <Button size="lg" variant="outline" asChild className="bg-white/10 text-white border-white/30 hover:bg-white/20">
                  <a href="/contact">Contact Sales</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Promote on YegnaBiz?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join thousands of successful businesses reaching customers across Ethiopia
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {benefits.map((benefit) => (
                <Card key={benefit.title}>
                  <CardContent className="pt-6 text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/40">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">50K+</div>
                <p className="text-muted-foreground">Monthly Visitors</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">2,500+</div>
                <p className="text-muted-foreground">Active Businesses</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">95%</div>
                <p className="text-muted-foreground">Customer Satisfaction</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Plan</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Select the perfect plan to grow your business
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan) => (
                <Card key={plan.name} className={plan.popular ? "border-primary shadow-lg relative" : ""}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="px-4 py-1">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                      {plan.name === "Basic" ? "Get Started Free" : "Start Free Trial"}
                    </Button>
                    <div className="space-y-3">
                      <p className="text-sm font-semibold">Includes:</p>
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                      {plan.notIncluded.length > 0 && (
                        <>
                          {plan.notIncluded.map((feature) => (
                            <div key={feature} className="flex items-start gap-2 opacity-50">
                              <div className="h-5 w-5 flex-shrink-0 mt-0.5" />
                              <span className="text-sm line-through">{feature}</span>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/40">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Premium Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Award className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Featured Placement</h3>
                        <p className="text-sm text-muted-foreground">
                          Get top placement on category pages and homepage for maximum visibility.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Eye className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Analytics Dashboard</h3>
                        <p className="text-sm text-muted-foreground">
                          Track views, clicks, and customer engagement with detailed analytics.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Star className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Priority Support</h3>
                        <p className="text-sm text-muted-foreground">
                          Get dedicated support from our team to help your business succeed.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Briefcase className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Enhanced Profile</h3>
                        <p className="text-sm text-muted-foreground">
                          Showcase unlimited photos, videos, and detailed business information.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Grow Your Business?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Start promoting your business today and reach thousands of potential customers across Ethiopia.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg">Start Free Trial</Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="/contact">Talk to Sales</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
