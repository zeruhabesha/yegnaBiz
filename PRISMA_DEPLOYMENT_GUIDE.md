# Prisma + Vercel Deployment Guide

## 🚀 Quick Setup

### 1. Database Configuration

**For Prisma Accelerate (Recommended for Edge Runtime):**
```bash
# In your .env file
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=YOUR_API_KEY"
```

**For Standard PostgreSQL:**
```bash
DATABASE_URL="postgresql://username:password@host:5432/database?schema=public"
```

### 2. Setup Database

```bash
# Generate Prisma client and create migration
npm run setup:db

# For production deployment
npm run setup:db:prod
```

### 3. Deploy to Vercel

1. **Push to Git** and connect your repository to Vercel
2. **Set Environment Variables** in Vercel Dashboard:
   - `DATABASE_URL` - Your Prisma Accelerate connection string
   - `JWT_SECRET` - A secure random string
   - Other required environment variables

3. **Deploy** - Vercel will automatically:
   - Install dependencies
   - Generate Prisma client
   - Run migrations
   - Deploy your application

## 📋 Environment Variables

### Required for Production

```env
# Database (Choose one)
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=YOUR_API_KEY"
# OR
DATABASE_URL="postgresql://user:pass@host:5432/db?schema=public"

# Authentication
JWT_SECRET="your-secure-jwt-secret"

# Email (for contact forms)
CONTACT_RECIPIENT_EMAIL="support@yegnabiz.com"
SMTP_FROM_EMAIL="YegnaBiz <no-reply@yegnabiz.com>"
SMTP_HOST="smtp.example.com"
SMTP_PORT="587"
SMTP_USER="your-smtp-username"
SMTP_PASS="your-smtp-password"
SMTP_SECURE="false"

# reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY="your-recaptcha-site-key"
RECAPTCHA_SECRET_KEY="your-recaptcha-secret-key"
```

## 🔧 Migration from JSON to Database

If you're migrating from the JSON-based storage:

1. **Set up database** using the setup script
2. **Existing data** will need to be migrated manually or use the migration script
3. **Update environment** variables in production

## 🏗️ Database Schema

The Prisma schema includes:

- **User** - Authentication and user management
- **Company** - Business listings with owner relationships
- **Review** - User reviews for companies
- **Promotion** - Marketing campaigns

## 🔒 Authentication

The authentication system now uses:
- **JWT tokens** for session management
- **Prisma** for user data storage
- **bcryptjs** for password hashing
- **Type-safe** operations throughout

## 📱 API Endpoints

### Authentication
- `POST /api/auth` - Login, register, logout
- `GET /api/auth/me` - Get current user info

### Protected Routes
All admin routes require authentication using the `requireAuth` middleware.

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Verify `DATABASE_URL` is correct
   - Check if Prisma Accelerate API key is valid
   - Ensure database is accessible

2. **Migration Issues**
   - Run `npx prisma migrate reset` to reset database
   - Check migration history: `npx prisma migrate status`

3. **Build Errors**
   - Ensure `prisma generate` runs successfully
   - Check TypeScript compilation: `npx tsc --noEmit`

### Production Deployment

1. **Set Environment Variables** in Vercel
2. **Deploy** - First deployment will create database tables
3. **Test** authentication and API endpoints

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Prisma Accelerate](https://www.prisma.io/accelerate)
- [Vercel Deployment Guide](https://vercel.com/docs)
