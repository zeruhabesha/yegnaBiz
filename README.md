# YegnaBiz

Modern Ethiopia Business Directory built with Next.js, TypeScript, and Tailwind CSS.

## Tech Stack
- Next.js 15
- React 19 + TypeScript
- Tailwind CSS v4
- Radix UI + shadcn/ui components

## Getting Started

### 1) Install dependencies
```bash
npm install
```

### 2) Run the dev server
```bash
npm run dev
# http://localhost:3000
```

## Environment Variables
Create a `.env.local` file in the project root (same level as `package.json`).

```env
# Google reCAPTCHA v2 (Optional but recommended)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here

# Email provider (Optional – integrate later, e.g., Resend)
# RESEND_API_KEY=your_api_key
```

Examples provided in `env.example`.

## Deployment
- Review the step-by-step [Deployment Guide](./DEPLOYMENT_GUIDE.md) for production configuration, build, and hosting options.
- Use `npm run setup-admin` before shipping to generate hashed admin credentials in `data/admin-users.json`.
- Run `npm run build` followed by `npm run start` (or deploy via Vercel) with your production environment variables in place.
- Prefer containers? Copy `.env.docker.example` to `.env.docker`, run `docker compose run --rm app npm run setup-admin`, then `docker compose up -d --build` to launch the frontend, API routes, and MailHog test SMTP in one command.

## Key Paths
- App layout: `app/layout.tsx`
- Home: `app/page.tsx`
- Companies: `app/companies/page.tsx`
- Promote: `app/promote/page.tsx`
- Contact (with API): 
  - Page: `app/contact/page.tsx`
  - API Route: `app/api/contact/route.ts`
- Add Business: `app/add-business/page.tsx`
- Edit Business: `app/edit-business/[id]/page.tsx`
- Admin/Dashboard: `app/dashboard/`

## Security Hardening
- `app/api/contact/route.ts` uses:
  - Zod validation for inputs
  - Sanitization (strip HTML, collapse whitespace)
  - Optional Google reCAPTCHA server verification
  - IP-based rate limiting (10 req/min per IP)
- `next.config.mjs` adds security headers:
  - CSP, HSTS, X-Frame-Options, Permissions-Policy, etc.

## Promotions System
- Top banner slider + popup modal:
  - Banner: `components/promo-banner.tsx`
  - Popup: `components/promo-popup.tsx`
  - Wrapper (global): `components/promo-wrapper.tsx` (mounted in `app/layout.tsx`)
- See `PROMO_BANNER_GUIDE.md` for customization.

## reCAPTCHA Setup
1. Install packages (already in package.json):
   - `react-google-recaptcha`
2. Get keys from: https://www.google.com/recaptcha/admin/create (v2 Checkbox)
3. Add to `.env.local` and restart dev server.
4. See `RECAPTCHA_SETUP.md`.

## Admin (Development Mode)
- Mock auth with localStorage in `lib/auth-context.tsx`.
- Login with any email containing `admin` to get admin role.
- Go to `/login`, then `/admin` or `/dashboard`.
- See `ADMIN_SETUP_GUIDE.md` for details.

## Scripts
- `npm run dev` – start dev server
- `npm run build` – production build
- `npm run start` – start production server

## Notes
- Email sending in `app/api/contact/route.ts` is stubbed. Integrate Resend/SendGrid/Nodemailer for production.
- Rate limiting is in-memory; use Redis in production.

## License
Proprietary – All rights reserved.
