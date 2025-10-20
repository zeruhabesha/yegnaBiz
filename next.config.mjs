/** @type {import('next').NextConfig} */
class EnsureSwcVendorChunkPlugin {
  constructor(webpack) {
    this.webpack = webpack
  }

  apply(compiler) {
    if (compiler.options.name && !compiler.options.name.includes('server')) {
      return
    }

    const {
      Compilation,
      sources: { RawSource },
    } = this.webpack

    compiler.hooks.thisCompilation.tap('EnsureSwcVendorChunkPlugin', (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: 'EnsureSwcVendorChunkPlugin',
          stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
        },
        () => {
          const assets = [
            {
              file: 'vendor-chunks/@swc.js',
              contents: "'use strict';module.exports = require('@swc/helpers');",
            },
            {
              file: 'vendor-chunks/@swc.mjs',
              contents: "export * from '@swc/helpers';",
            },
          ]

          for (const asset of assets) {
            if (!compilation.getAsset(asset.file)) {
              compilation.emitAsset(asset.file, new RawSource(asset.contents))
            }
          }
        }
      )
    })
  }
}

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
  webpack(config, options) {
    if (options.isServer) {
      config.plugins = config.plugins || []
      config.plugins.push(new EnsureSwcVendorChunkPlugin(options.webpack))
    }

    return config
  },
}

export default nextConfig
