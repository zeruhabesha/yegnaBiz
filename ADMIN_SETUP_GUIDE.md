# Admin Account Setup Guide for YegnaBiz

## Quick Start - Create Admin Account

### Current System (Mock Authentication)

Your app currently uses **mock authentication** with localStorage (no real backend yet). This is perfect for development and testing.

### How to Create an Admin Account

**Method 1: Login with Admin Email (Easiest)**

1. Go to the login page: `http://localhost:3000/login`

2. Enter any email that **contains the word "admin"**:
   - ✅ `admin@yegnabiz.com`
   - ✅ `admin@gmail.com`
   - ✅ `myadmin@example.com`
   - ✅ `zeruhabesha.admin@gmail.com`

3. Enter any password (it doesn't matter in mock mode)

4. Click "Sign In"

5. You're now logged in as an **admin** with full access! 🎉

**Method 2: Update the Auth Context**

You can also manually create a default admin user in the code.

---

## Testing Admin Access

After logging in with an admin email:

1. **Check the Header Navigation**
   - You should see an "Admin" link in the navigation menu

2. **Visit Admin Dashboard**
   - Click "Admin" or go to: `http://localhost:3000/admin`

3. **Admin Features Available:**
   - View all companies
   - Manage reviews
   - View analytics
   - Moderate content

---

## Admin vs Regular User

### Admin User
- **Email contains:** "admin"
- **Role:** `admin`
- **Access:**
  - ✅ Dashboard
  - ✅ Admin Panel
  - ✅ Analytics
  - ✅ Manage Companies
  - ✅ Manage Reviews
  - ✅ All user features

### Regular User
- **Email:** Any other email
- **Role:** `user`
- **Access:**
  - ✅ Dashboard
  - ✅ Company listings
  - ✅ Leave reviews
  - ❌ No admin panel access

---

## Code Reference

The admin logic is in `lib/auth-context.tsx`:

```typescript
const login = async (email: string, password: string) => {
  // Mock authentication
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const mockUser: User = {
    id: 1,
    email,
    fullName: "Demo User",
    role: email.includes("admin") ? "admin" : "user", // <-- Admin check
  }

  setUser(mockUser)
  localStorage.setItem("user", JSON.stringify(mockUser))
}
```

---

## Customizing Admin Creation

### Option 1: Add Multiple Admin Emails

Edit `lib/auth-context.tsx`:

```typescript
const login = async (email: string, password: string) => {
  const adminEmails = [
    "zeruhabesha09@gmail.com",
    "admin@yegnabiz.com",
    "superadmin@yegnabiz.com"
  ]

  const mockUser: User = {
    id: 1,
    email,
    fullName: "Demo User",
    role: adminEmails.includes(email) ? "admin" : "user",
  }

  setUser(mockUser)
  localStorage.setItem("user", JSON.stringify(mockUser))
}
```

### Option 2: Create Default Admin

Edit `lib/auth-context.tsx` to add a default admin:

```typescript
useEffect(() => {
  // Check for stored user session
  const storedUser = localStorage.getItem("user")
  if (storedUser) {
    setUser(JSON.parse(storedUser))
  } else {
    // Auto-login as admin for development
    const defaultAdmin: User = {
      id: 1,
      email: "admin@yegnabiz.com",
      fullName: "Admin User",
      role: "admin",
    }
    setUser(defaultAdmin)
    localStorage.setItem("user", JSON.stringify(defaultAdmin))
  }
  setIsLoading(false)
}, [])
```

---

## Testing Different Roles

### Test as Admin:
1. Login with: `admin@yegnabiz.com`
2. Password: (any password)
3. Check for "Admin" link in navigation
4. Access `/admin` dashboard

### Test as Regular User:
1. Login with: `user@gmail.com`
2. Password: (any password)
3. No "Admin" link should appear
4. Cannot access `/admin` (will be redirected)

---

## Production Setup (Future)

When you're ready to move to production with real authentication:

### Step 1: Choose Backend
- **Supabase** (Recommended - includes auth)
- **Firebase Authentication**
- **NextAuth.js** with PostgreSQL
- **Custom API** with JWT

### Step 2: Database Schema

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create first admin
INSERT INTO users (email, password_hash, full_name, role)
VALUES ('admin@yegnabiz.com', 'hashed_password_here', 'Admin User', 'admin');
```

### Step 3: Secure Auth Flow
1. Hash passwords with bcrypt
2. Use JWT tokens
3. Implement refresh tokens
4. Add email verification
5. Add password reset

---

## Quick Commands

### Create Admin Account
```bash
# Just login with any email containing "admin"
Email: admin@yegnabiz.com
Password: (anything)
```

### Check Current User
Open browser console:
```javascript
JSON.parse(localStorage.getItem('user'))
```

### Logout
Click "Sign Out" in the navigation menu, or run in console:
```javascript
localStorage.removeItem('user')
location.reload()
```

### Switch Roles Manually
Open browser console:
```javascript
// Make current user an admin
let user = JSON.parse(localStorage.getItem('user'))
user.role = 'admin'
localStorage.setItem('user', JSON.stringify(user))
location.reload()

// Make current user a regular user
let user = JSON.parse(localStorage.getItem('user'))
user.role = 'user'
localStorage.setItem('user', JSON.stringify(user))
location.reload()
```

---

## Admin Pages & Features

Your app already has these admin pages built:

1. **Admin Dashboard** - `/admin`
   - Overview statistics
   - Quick actions
   - Recent activity

2. **Companies Management** - `/admin/companies`
   - View all companies
   - Approve/reject listings
   - Edit company info

3. **Reviews Management** - `/admin/reviews`
   - Moderate reviews
   - Flag inappropriate content
   - Respond to reviews

4. **Analytics** - `/admin/analytics`
   - User statistics
   - Traffic data
   - Revenue metrics

---

## Troubleshooting

### "I can't access the admin panel"
- Make sure your email contains "admin"
- Check browser console: `localStorage.getItem('user')`
- Clear cache and login again

### "Admin link doesn't appear"
- The link only shows for users with `role: "admin"`
- Check your user data in localStorage
- Try logging out and back in

### "I want to test both roles"
- Use two different browser profiles
- Use incognito mode for one account
- Or manually switch roles in console (see commands above)

---

## Security Note

⚠️ **Current Setup is for Development Only**

The mock authentication:
- ✅ Perfect for development and testing
- ✅ Easy to use and debug
- ❌ NOT secure for production
- ❌ No password verification
- ❌ No encryption

Before launching to production, implement proper authentication with a backend service!

---

## Next Steps

1. **For Development:**
   - Login with `admin@yegnabiz.com`
   - Test all admin features
   - Build out admin functionality

2. **For Production:**
   - Choose auth service (Supabase recommended)
   - Set up database
   - Implement secure authentication
   - Add role-based access control (RBAC)

---

**Need Help?** Check the code in:
- `lib/auth-context.tsx` - Authentication logic
- `app/login/page.tsx` - Login page
- `app/admin/*` - Admin pages
- `components/admin-nav.tsx` - Admin navigation

Happy Coding! 🚀
