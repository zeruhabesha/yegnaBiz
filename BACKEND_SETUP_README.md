# 🚀 YegnaBiz Backend Setup Guide

## 📋 Prerequisites

1. **PostgreSQL 15+** installed on your system
2. **Node.js 18+** (already installed)
3. **Git** (already configured)

## 🗄️ Database Setup

> 💡 **Tip:** Export `DATABASE_URL` and run `npm run seed` to let the project create the tables and starter data automatically. The command detects your environment, works with PostgreSQL or the bundled JSON files, and can be re-run safely.

### Option 1: Native PostgreSQL Installation

1. **Install PostgreSQL 15+**
   - Download from: https://www.postgresql.org/download/
   - Follow installation instructions for your OS

2. **Set up database**
   ```bash
   # Create database user (run as postgres user)
   createuser -P username

   # Create database
   createdb -O username yegnabiz
   ```

3. **Run migrations and seed data**
   ```bash
   # Run the setup script
   ./setup-database.sh
   ```

### Option 2: Docker (Recommended for development)

```bash
# Start PostgreSQL container
docker run -d --name yegnabiz-postgres \
  -e POSTGRES_DB=yegnabiz \
  -e POSTGRES_USER=username \
  -e POSTGRES_PASSWORD=password \
  -p 5432:5432 \
  postgres:15

# Run migrations
psql postgresql://username:password@localhost:5432/yegnabiz -f scripts/01-create-tables.sql

# Seed data
psql postgresql://username:password@localhost:5432/yegnabiz -f scripts/02-seed-data.sql
```

### Option 3: Windows Setup

```cmd
# Run the Windows setup script
setup-database.bat
```

## ⚙️ Environment Configuration

The `.env` file is already configured with:
- Database connection: `postgresql://username:password@localhost:5432/yegnabiz`
- Admin credentials: `admin@yegnabiz.com` / `admin123`
- JWT secret for API authentication

## 🏗️ Database Schema

### Core Tables

#### `users`
- User accounts, roles, authentication
- Fields: email, password_hash, role, status, etc.

#### `companies`
- Business listings and information
- Fields: name, category, location, verification status, etc.

#### `company_owners`
- Links users to companies they own
- Junction table for ownership relationships

#### `reviews`
- User reviews for companies
- Fields: rating, title, comment, verification status

#### `promotions`
- Marketing campaigns and advertisements
- Fields: title, type, budget, performance metrics

#### `business_hours`
- Operating hours for companies
- Day-by-day schedule management

## 🔗 API Endpoints

### Users Management
- `GET /api/admin/users` - List all users with filtering
- `POST /api/admin/users` - Create new user
- `GET /api/admin/users/[id]` - Get specific user
- `PUT /api/admin/users/[id]` - Update user
- `DELETE /api/admin/users/[id]` - Delete user

### Companies Management
- `GET /api/admin/companies` - List all companies with filtering
- `POST /api/admin/companies` - Create new company
- `GET /api/admin/companies/[id]` - Get specific company
- `PUT /api/admin/companies/[id]` - Update company
- `DELETE /api/admin/companies/[id]` - Delete company

### Promotions Management
- `GET /api/admin/promotions` - List all promotions with filtering
- `POST /api/admin/promotions` - Create new promotion
- `GET /api/admin/promotions/[id]` - Get specific promotion
- `PUT /api/admin/promotions/[id]` - Update promotion
- `DELETE /api/admin/promotions/[id]` - Delete promotion

## 🚀 Running the Application

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Access admin panel**
   - Navigate to `http://localhost:3000/admin`
   - Login with: `admin@yegnabiz.com` / `admin123`

3. **Test API endpoints**
   - Users: `http://localhost:3000/api/admin/users`
   - Companies: `http://localhost:3000/api/admin/companies`
   - Promotions: `http://localhost:3000/api/admin/promotions`

## 🛠️ Development Workflow

### Making Database Changes

1. **Update SQL files** in `scripts/` directory
2. **Run migrations** to apply changes
3. **Test in admin panel** to verify functionality

### API Development

1. **Create/update API routes** in `app/api/admin/`
2. **Update frontend API service** in `lib/api.ts`
3. **Test endpoints** with tools like Postman or curl
4. **Update admin pages** to use new API calls

### Frontend Integration

1. **API service layer** handles all database communication
2. **Admin pages** use React hooks for state management
3. **Real-time updates** with automatic data refresh
4. **Error handling** with user-friendly messages

## 🔧 Troubleshooting

### Database Connection Issues
```bash
# Check if PostgreSQL is running
pg_isready -h localhost -p 5432

# Test connection
psql postgresql://username:password@localhost:5432/yegnabiz

# View logs
docker logs yegnabiz-postgres
```

### API Errors
- Check browser console for frontend errors
- Check terminal for backend errors
- Verify database connectivity
- Check environment variables

### Common Issues

1. **"Connection refused"** - PostgreSQL not running
2. **"Password authentication failed"** - Wrong credentials
3. **"Database does not exist"** - Run migrations first
4. **"Module not found"** - Install missing packages

## 📊 Sample Data

The database includes sample data for:
- **4 companies** (Ethio Telecom, Ethiopian Airlines, etc.)
- **4 users** (admin, business owners, regular users)
- **Reviews and ratings** for companies
- **Business hours** and contact information
- **Social media links** for companies

## 🔐 Security Features

- **Password hashing** with bcrypt
- **JWT authentication** for API routes
- **Input validation** and sanitization
- **CORS protection** for API endpoints
- **SQL injection prevention** with parameterized queries

## 🚀 Production Deployment

For production deployment:

1. **Set up PostgreSQL** on your hosting provider
2. **Update environment variables** with production values
3. **Configure proper authentication** (not basic auth)
4. **Set up SSL certificates** for secure connections
5. **Configure database backups** and monitoring

## 📚 Additional Resources

- [Next.js API Routes Documentation](https://nextjs.org/docs/api-routes/introduction)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Prisma Documentation](https://www.prisma.io/docs/) (for future ORM integration)
- [bcrypt.js Documentation](https://www.npmjs.com/package/bcryptjs)
- [jsonwebtoken Documentation](https://www.npmjs.com/package/jsonwebtoken)

---

**🎉 Your YegnaBiz backend is now fully integrated with a complete admin management system!**
