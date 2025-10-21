# YegnaBiz Deployment Guide

This guide walks through preparing production-ready build artifacts and hosting the Next.js application. It consolidates the configuration notes spread across the repository into one checklist so you can confidently deploy to Vercel, a VM, or any Node.js host.

## Quick Start

Choose the workflow that matches your target environment:

- **Docker Compose (all-in-one stack):**
  1. `cp .env.docker.example .env.docker` and fill in real secrets.
  2. `docker compose run --rm app npm run setup-admin` to seed admin credentials (optional but recommended).
  3. `docker compose up -d --build` to launch the Next.js app and the bundled MailHog SMTP sink.
  4. Visit `http://localhost:3000` and open MailHog at `http://localhost:8025` to inspect contact-form emails.
  5. Shut down with `docker compose down` when finished.

- **Node.js host / traditional deployment:**
  1. Copy `env.example` to `.env.production` (or configure equivalent host secrets) and provide real reCAPTCHA, JWT, and SMTP values.
  2. Run `npm install && npm run build` on your build machine or CI server.
  3. Provision persistent storage (JSON files under `data/` or configure PostgreSQL) and execute `npm run setup-admin` if you rely on the JSON store.
  4. Start the production server with `npm run start -- --hostname 0.0.0.0 --port ${PORT:-3000}` behind your preferred reverse proxy.

The following sections expand on each step and cover additional checks for production readiness.

## 1. Prerequisites
- **Node.js 18+** and **npm** on the build machine.
- Optional: **PostgreSQL 15+** if you do not want to rely on the JSON files stored under `data/`.
- Production SMTP credentials for the contact form.

## 2. Configure Environment Variables
1. Copy `env.example` to the appropriate environment file for your target (e.g., `.env.production` locally or provider secrets in Vercel).
2. Fill in:
   - `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` and `RECAPTCHA_SECRET_KEY` for Google reCAPTCHA v2.
   - `JWT_SECRET` with a long random value for signing auth tokens.
   - Contact email settings (`CONTACT_RECIPIENT_EMAIL`, `SMTP_FROM_EMAIL`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_SECURE`).
   - Optional `DATABASE_URL` if migrating away from JSON persistence.
3. Commit secrets to your hosting provider, not to source control.

> **Tip:** The contact form API route requires `SMTP_HOST` and `SMTP_PORT`. Missing values will make requests fail with a 500 response.

## 3. Prepare Data (Optional but Recommended)
If you are using the JSON data store, create or reset admin credentials before deployment:

```bash
npm run setup-admin
```

The script writes `data/admin-users.json` with hashed credentials you can share securely with your team.

## 4. Build the Application
Run the production build locally or in CI to validate configuration:

```bash
npm install
npm run build
```

The build script automatically cleans previous artifacts and runs `scripts/ensure-next-assets.mjs` so CSS bundles generated during the build are copied to predictable names for deployment.

## 5. Start the Production Server (Self-Hosted)
If you are hosting on your own infrastructure:

```bash
# Ensure environment variables are exported or stored in a .env.production file
npm run start -- --hostname 0.0.0.0 --port ${PORT:-3000}
```

Run the command under a process manager such as systemd or PM2 and place a reverse proxy (Nginx, Caddy, etc.) in front for TLS termination.

## 6. Deploying to Vercel
1. Connect your Git repository to Vercel or use the `vercel` CLI from the project root.
2. Add all environment variables (production and preview) in the Vercel dashboard before the first build.
3. Trigger a deployment. Vercel will execute `npm install`, `npm run build`, and host the app on its Node.js runtime automatically.
4. Remember that the JSON files under `data/` are **not persistent** on serverless platforms; switch to PostgreSQL or another managed store if you need durable writes.

## 7. Deploying to Other Hosts
1. Upload the repository (or CI build artifacts) to your server.
2. Run the commands from sections 2–5 during provisioning.
3. Optionally configure PostgreSQL using the scripts in `scripts/` if you require a relational backend.
4. Configure log rotation and health monitoring suitable for your host.

## 8. Post-Deployment Checks
- Visit `/`, `/companies`, `/dashboard`, and `/contact` to confirm routing works.
- Submit the contact form with reCAPTCHA enabled to verify SMTP connectivity and rate limiting behaviour.
- Check that security headers declared in `next.config.mjs` (CSP, HSTS, Permissions-Policy, etc.) appear in responses.
- If using PostgreSQL, run the SQL setup scripts in `scripts/` and confirm API endpoints under `/api/admin/*` return data.

## 9. Deploy with Docker Compose (Full Stack)

The repository now ships with a production-ready Docker image and a companion `docker-compose.yml` file that runs the Next.js application together with a local MailHog SMTP sink. This gives you a single command that boots the frontend, API routes, and a test mail server.

1. Copy `.env.docker.example` to `.env.docker` and update the secrets (`JWT_SECRET`, reCAPTCHA keys, SMTP sender/recipient addresses, etc.).
2. (Optional but recommended) Initialise admin credentials in the mounted `data/` volume:
   ```bash
   docker compose run --rm app npm run setup-admin
   ```
3. Build and start the stack in the background:
   ```bash
   docker compose up -d --build
   ```
4. The application is now available on `http://localhost:3000` (or the port you set via `APP_PORT`). The MailHog web UI lives on `http://localhost:8025` (override with `MAILHOG_UI_PORT`) so you can verify contact-form emails without touching a real SMTP inbox.
5. When promoting to production, replace the MailHog settings in `.env.docker` with your real SMTP host (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`) or remove the MailHog service and point the app at your provider.
6. When you are done, stop the containers with `docker compose down`. The `data/` directory on the host persists admin JSON files across restarts.

Following the checklist above ensures the application is ready for production regardless of the hosting provider you choose.
