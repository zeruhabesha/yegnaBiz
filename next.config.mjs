/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Headers for video serving
  async headers() {
    const csp = [
      "default-src 'self'",
      "base-uri 'self'",
      "font-src 'self' data:",
      "img-src 'self' data: blob:",
      // Allow video files
      "media-src 'self' data: blob:",
      // Allow Google reCAPTCHA
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/",
      "style-src 'self' 'unsafe-inline'",
      "connect-src 'self' https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/",
      "frame-src https://www.google.com/recaptcha/ https://recaptcha.google.com/",
      "worker-src 'self' blob:",
      "object-src 'none'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join('; ')

    const common = [
      { key: 'Content-Security-Policy', value: csp },
      { key: 'Referrer-Policy', value: 'no-referrer-when-downgrade' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'X-XSS-Protection', value: '0' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
      { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
      { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
    ]

    return [
      {
        source: '/:path*',
        headers: common,
      },
    ]
  },
}

export default nextConfig
