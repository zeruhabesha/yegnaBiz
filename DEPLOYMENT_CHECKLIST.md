# 🚀 Vercel Deployment Checklist

## ✅ Pre-Deployment Steps (Complete)

1. [x] Prisma packages installed (@prisma/client, @prisma/extension-accelerate)
2. [x] Database schema configured (schema.prisma)
3. [x] Authentication system migrated to Prisma
4. [x] Environment template created (DEPLOYMENT_ENV_TEMPLATE.txt)
5. [x] Setup scripts created (setup-database.js, test-db.js)
6. [x] Deployment guide created (PRISMA_DEPLOYMENT_GUIDE.md)

## 📋 Deployment Steps

### 1. Configure Environment Variables
- [ ] Copy DEPLOYMENT_ENV_TEMPLATE.txt to .env
- [ ] Get Prisma Accelerate API key from https://console.prisma.io/
- [ ] Get reCAPTCHA keys from https://www.google.com/recaptcha/admin/create
- [ ] Generate secure JWT_SECRET (32+ characters)
- [ ] Configure email settings (Gmail or other SMTP)

### 2. Database Setup
- [ ] Run: npm run setup:db
- [ ] Run: npm run test:db (verify connection)
- [ ] Push schema changes to production

### 3. Vercel Configuration
- [ ] Push code to GitHub/GitLab
- [ ] Connect repository to Vercel
- [ ] Set environment variables in Vercel dashboard
- [ ] Deploy!

### 4. Post-Deployment
- [ ] Test authentication endpoints
- [ ] Test database operations
- [ ] Verify email functionality
- [ ] Test admin panel access

## 🔧 Environment Variables for Vercel

Copy these to Vercel Dashboard > Project Settings > Environment Variables:

```
DATABASE_URL=prisma+postgres://accelerate.prisma-data.net/?api_key=YOUR_API_KEY
JWT_SECRET=your-secure-jwt-secret
CONTACT_RECIPIENT_EMAIL=support@yegnabiz.com
SMTP_FROM_EMAIL=YegnaBiz <no-reply@yegnabiz.com>
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_SECURE=false
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-site-key
RECAPTCHA_SECRET_KEY=your-secret-key
NODE_ENV=production
```

## 🧪 Testing Commands

```bash
npm run test:db           # Test database connection
npm run setup:db:prod     # Production database setup
npm run prisma:studio     # Database GUI (dev only)
```

## 📞 Need Help?

- Check PRISMA_DEPLOYMENT_GUIDE.md for detailed instructions
- Test database: npm run test:db
- Generate client: npm run prisma:generate
