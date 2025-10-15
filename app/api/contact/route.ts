import { NextResponse } from 'next/server'
import { z } from 'zod'

// Simple in-memory rate limiting (per server instance)
const RATE_LIMIT_WINDOW_MS = 60_000 // 1 minute
const RATE_LIMIT_MAX = 10 // max requests per window per IP
const ipRequests = new Map<string, number[]>()

function isRateLimited(ip: string) {
  const now = Date.now()
  const windowStart = now - RATE_LIMIT_WINDOW_MS
  const timestamps = (ipRequests.get(ip) || []).filter((t) => t > windowStart)
  if (timestamps.length >= RATE_LIMIT_MAX) return true
  timestamps.push(now)
  ipRequests.set(ip, timestamps)
  return false
}

// Zod schema for payload validation
const ContactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(254),
  subject: z.string().min(2).max(150),
  message: z.string().min(10).max(5000),
  recaptchaToken: z.string().optional(),
})

// Basic sanitizer to strip HTML tags and dangerous chars
function sanitize(input: string) {
  // Remove HTML tags and trim
  const withoutTags = input.replace(/<[^>]*>/g, '')
  // Collapse whitespace
  return withoutTags.replace(/\s+/g, ' ').trim()
}

export async function POST(request: Request) {
  try {
    // Enforce small body size via Next defaults; still guard parsing
    const body = await request.json()

    // Rate limit by IP
    const ip =
      // @ts-ignore - Forwarded headers exist behind proxies
      (request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
        request.headers.get('x-real-ip') ||
        'unknown') as string
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    // Validate shape
    const parsed = ContactSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input', details: parsed.error.flatten() }, { status: 400 })
    }

    const { name, email, subject, message, recaptchaToken } = parsed.data

    // Sanitize fields
    const safe = {
      name: sanitize(name),
      email: sanitize(email),
      subject: sanitize(subject),
      message: sanitize(message),
    }

    // Verify reCAPTCHA token (only if configured)
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY
    if (recaptchaSecret && recaptchaToken) {
      const verifyResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${recaptchaSecret}&response=${recaptchaToken}`,
      })

      const verifyData = await verifyResponse.json()

      if (!verifyData.success) {
        return NextResponse.json(
          { error: 'reCAPTCHA verification failed. Please try again.' },
          { status: 400 }
        )
      }
    }

    // Email configuration (placeholder)
    const RECIPIENT_EMAIL = 'zeruhabesha09@gmail.com'
    
    // For now, log safely on the server and return success.
    // Replace this with Resend/SendGrid/Nodemailer in production.
    console.log('Contact message (sanitized):', { ...safe, to: RECIPIENT_EMAIL, ip })

    return NextResponse.json({ success: true, message: 'Message received. We will get back to you shortly.' })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}
