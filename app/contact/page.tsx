"use client"

import { useState, useRef } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Clock } from "@/components/icons"
import { PageHero } from "@/components/page-hero"
import { PageSection } from "@/components/page-section"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Get reCAPTCHA token (only if reCAPTCHA is enabled)
    const recaptchaToken = recaptchaRef.current?.getValue()
    const recaptchaEnabled = !!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
    
    if (recaptchaEnabled && !recaptchaToken) {
      alert("Please complete the reCAPTCHA verification")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        alert("Thank you for contacting us! We'll get back to you soon at " + formData.email)
        setFormData({ name: "", email: "", subject: "", message: "" })
        recaptchaRef.current?.reset()
      } else {
        alert(data.error || "Failed to send message. Please try again.")
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert("An error occurred. Please try again or email us directly at zeruhabesha09@gmail.com")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <PageHero
          title="Contact us"
          description="Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible."
          backgroundImage="/hero-contact.jpg"
        />

        <PageSection tone="default">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card className="border-white/10 bg-background/70">
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                  <CardDescription>Fill out the form below and we'll get back to you shortly.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="What is this regarding?"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us more about your inquiry..."
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        required
                      />
                    </div>

                    <div className="space-y-4">
                      {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
                        <ReCAPTCHA
                          ref={recaptchaRef}
                          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                        />
                      )}
                      <Button type="submit" disabled={isSubmitting} className="w-full">
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: Mail,
                  title: 'Email',
                  lines: ['support@yegnabiz.com', 'zeruhabesha09@gmail.com'],
                },
                {
                  icon: Phone,
                  title: 'Phone',
                  lines: ['+251 911 123 456', '+251 912 654 321'],
                },
                {
                  icon: MapPin,
                  title: 'Office',
                  lines: ['Addis Ababa, Ethiopia', 'Bole, Africa Avenue'],
                },
                {
                  icon: Clock,
                  title: 'Hours',
                  lines: ['Monday - Friday: 9am - 6pm', 'Saturday: 10am - 4pm'],
                },
              ].map(({ icon: Icon, title, lines }) => (
                <Card key={title} className="border-white/10 bg-background/70">
                  <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>We're here to help with any questions you may have.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-start gap-3">
                      <Icon className="mt-1 h-5 w-5 text-primary" />
                      <div>
                        {lines.map((line) => (
                          <p key={line} className="text-sm text-muted-foreground">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </PageSection>
      </main>


      <Footer />
    </div>
  )
}
