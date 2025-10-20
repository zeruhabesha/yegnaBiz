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
  // Headers for video serving and security
  async headers() {
    const csp = [
      "default-src 'self'",
      "base-uri 'self'",
      "font-src 'self' data:",
      "img-src 'self' data: blob:",
      // Allow video files with broader support
      "media-src 'self' data: blob: https:",
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
  webpack(config, { dev, isServer }) {
    if (!dev && !isServer) {
      if (typeof config.output?.filename === "string") {
        config.output.filename = config.output.filename
          .replace(/-\[chunkhash\]/g, "")
          .replace(/\.\[contenthash\]/g, "");
      }
      if (typeof config.output?.chunkFilename === "string") {
        config.output.chunkFilename = config.output.chunkFilename
          .replace(/-\[chunkhash\]/g, "")
          .replace(/\.\[contenthash\]/g, "");
      }
      config.plugins = config.plugins?.map((plugin) => {
        if (plugin?.constructor?.name === "MiniCssExtractPlugin") {
          if (plugin.options) {
            plugin.options.filename = "static/css/[name].css";
            plugin.options.chunkFilename = "static/css/[name].css";
          }
        }
        return plugin;
      });
    }
    return config;
  },
}

export default nextConfig
