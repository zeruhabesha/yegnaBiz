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

# Contact form SMTP configuration (required in production)
CONTACT_RECIPIENT_EMAIL=support@yegnabiz.com
SMTP_FROM_EMAIL=YegnaBiz <no-reply@yegnabiz.com>
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=smtp_username
SMTP_PASS=smtp_password
SMTP_SECURE=false

# PostgreSQL (required on Vercel or any stateless host)
# DATABASE_URL=postgresql://username:password@host:5432/yegnabiz
# DATABASE_SSL=true
```

Examples provided in `env.example`.

> ℹ️ When `DATABASE_URL` is set the server automatically switches from the JSON files under `data/` to PostgreSQL for all admin routes.

## Deployment
- Read the [Deployment Guide](./DEPLOYMENT_GUIDE.md) for a full checklist covering secrets, build steps, hosting targets, and post-deploy checks.
- **Vercel (with Vercel Postgres):**
  1. Create a Vercel Postgres database and copy the generated `DATABASE_URL` (it already includes `sslmode=require`).
  2. Add `DATABASE_URL`, `JWT_SECRET`, SMTP, and reCAPTCHA variables to the Vercel dashboard (Production + Preview).
  3. Seed the data locally by exporting the same `DATABASE_URL` and running `npm run seed`. The script will use PostgreSQL when the variable is present (creating tables on the fly) and falls back to the JSON store otherwise. You can also execute the SQL files in `scripts/` if you prefer manual control.
  4. Trigger a deployment via the Vercel dashboard or CLI. When the database is configured the JSON files under `data/` are ignored and all admin changes persist through PostgreSQL.
- **Docker quick start:**
  1. `cp .env.docker.example .env.docker`
  2. `docker compose run --rm app npm run setup-admin`
  3. `docker compose up -d --build`
  4. Visit `http://localhost:3000` (app) and `http://localhost:8025` (MailHog)
- **Traditional Node host:**
  1. Copy `env.example` to `.env.production` (or configure host secrets)
  2. `npm install && npm run build`
  3. `npm run start -- --hostname 0.0.0.0 --port ${PORT:-3000}`
  4. Place a reverse proxy (Nginx/Caddy) in front and persist the `data/` directory or configure PostgreSQL.

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
