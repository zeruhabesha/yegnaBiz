# YegnaBiz - Default Admin Credentials

## 🚀 Quick Start

After running the setup, you can access the application with these default credentials:

### Admin Access (Only)
- **Email:** `admin@yegnabiz.com`
- **Password:** `admin123`
- **Role:** `admin`
- **Access:** Full administrative privileges

## 🔧 Setup Commands

### Set up admin credentials:
- **PostgreSQL or JSON auto-detect:**
  ```bash
  npm run seed
  ```
- **Force JSON reset only:**
  ```bash
  npm run setup-admin
  ```

### Start development server:
```bash
npm run dev
```

### Access the application:
- **Frontend:** http://localhost:3000
- **Admin Panel:** http://localhost:3000/dashboard (requires admin login)

## 🔒 Security Notes

- **Change default passwords** in production
- **Set JWT_SECRET** environment variable
- **Use strong passwords** for production deployment

## 📋 What's Included

The setup creates:
- ✅ Admin user with full permissions
- ✅ Sample Ethiopian business data
- ✅ JWT-based authentication system
- ✅ Role-based authorization

## 🎯 Next Steps

1. **Login as admin** to access the dashboard
2. **Manage companies** through the admin panel
3. **Change default passwords** for your needs
4. **Deploy with secure credentials** for production

---

**Happy developing!** 🎉
