import { NextResponse } from 'next/server'
import { z } from 'zod'
import nodemailer from 'nodemailer'
import type { Transporter } from 'nodemailer'

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

    const transporter = await getTransporter()
    const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL
    if (!recipientEmail) {
      console.error('Contact form misconfiguration: CONTACT_RECIPIENT_EMAIL is not set')
      return NextResponse.json(
        { error: 'Email delivery is not configured. Please try again later.' },
        { status: 500 }
      )
    }
    const fromAddress = process.env.SMTP_FROM_EMAIL || `YegnaBiz <${process.env.SMTP_USER ?? 'no-reply@yegnabiz.com'}>`

    const plainMessage = [
      `New contact form submission from YegnaBiz`,
      '',
      `Name: ${safe.name}`,
      `Email: ${safe.email}`,
      `Subject: ${safe.subject}`,
      '',
      safe.message,
      '',
      `IP Address: ${ip}`,
    ].join('\n')

    const htmlMessage = `<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.5;color:#1f2937;">
      <h2 style="margin:0 0 16px;">New contact form submission</h2>
      <p><strong>Name:</strong> ${safe.name}</p>
      <p><strong>Email:</strong> ${safe.email}</p>
      <p><strong>Subject:</strong> ${safe.subject}</p>
      <p style="white-space:pre-line;margin-top:16px;">${safe.message}</p>
      <hr style="margin:24px 0;border:none;border-top:1px solid #e5e7eb;" />
      <p style="color:#6b7280;font-size:12px;">Submitted from IP: ${ip}</p>
    </div>`

    await transporter.sendMail({
      from: fromAddress,
      to: recipientEmail,
      subject: `[YegnaBiz Contact] ${safe.subject}`,
      text: plainMessage,
      html: htmlMessage,
      replyTo: safe.email,
    })

    return NextResponse.json({ success: true, message: 'Message received. We will get back to you shortly.' })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}

let cachedTransporter: Transporter | null = null

async function getTransporter(): Promise<Transporter> {
  if (cachedTransporter) {
    return cachedTransporter
  }

  const host = process.env.SMTP_HOST
  const portString = process.env.SMTP_PORT
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !portString) {
    throw new Error('SMTP configuration is missing. Please set SMTP_HOST and SMTP_PORT environment variables.')
  }

  const port = Number(portString)
  if (Number.isNaN(port)) {
    throw new Error('SMTP_PORT must be a valid number.')
  }

  const secure = process.env.SMTP_SECURE === 'true' || port === 465

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: user && pass ? { user, pass } : undefined,
  })

  return cachedTransporter
}
