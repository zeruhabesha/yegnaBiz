# reCAPTCHA Setup Instructions for YegnaBiz

## Prerequisites
You need to install the required packages first:

```bash
npm install react-google-recaptcha
npm install --save-dev @types/react-google-recaptcha
```

## Step 1: Get Google reCAPTCHA Keys

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin/create)
2. Log in with your Google account
3. Register a new site:
   - **Label:** YegnaBiz Contact Form
   - **reCAPTCHA Type:** Choose **reCAPTCHA v2** → "I'm not a robot" Checkbox
   - **Domains:** 
     - For development: `localhost`
     - For production: `yourdomain.com`
   - Accept the terms and click **Submit**

4. You'll receive two keys:
   - **Site Key** (public key - used in the browser)
   - **Secret Key** (private key - used on the server)

## Step 2: Configure Environment Variables

1. Create a file named `.env.local` in your project root (if it doesn't exist)
2. Add your reCAPTCHA keys:

```env
# Google reCAPTCHA v2 Keys
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here

# Email (already configured)
# Contact form sends to: zeruhabesha09@gmail.com
```

**Important:** 
- Replace `your_site_key_here` with your actual Site Key
- Replace `your_secret_key_here` with your actual Secret Key
- The `.env.local` file is already in `.gitignore` to keep your keys secure
- Never commit real keys to version control

## Step 3: Test the Implementation

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Navigate to the contact page:**
   ```
   http://localhost:3000/contact
   ```

3. **Test the form:**
   - Fill in all required fields
   - Check the "I'm not a robot" checkbox
   - Click "Send Message"
   - You should see a success message if everything works

## Step 4: What Happens When Form is Submitted

1. User fills the contact form
2. User checks "I'm not a robot" reCAPTCHA
3. Form validates all fields
4. reCAPTCHA token is sent to your API
5. Server verifies the token with Google
6. If verified, the message details are logged (and can be emailed if you set up email service)
7. User receives confirmation message

## Features Implemented

✅ Contact form with validation  
✅ Google reCAPTCHA v2 integration  
✅ Bot protection  
✅ Server-side verification  
✅ User-friendly error messages  
✅ Form submission to: zeruhabesha09@gmail.com (configured)  

## Troubleshooting

### Issue: reCAPTCHA not showing
- Make sure you've installed the packages
- Check that `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is set correctly
- Restart the dev server after adding environment variables

### Issue: Verification fails
- Ensure `RECAPTCHA_SECRET_KEY` is set on the server side
- Check that the domain is registered in reCAPTCHA admin
- For localhost testing, make sure `localhost` is in your reCAPTCHA domain list

### Issue: Package not found error
- Run: `npm install react-google-recaptcha @types/react-google-recaptcha`
- Restart your editor/IDE
- Restart the dev server

## Production Deployment

When deploying to production:

1. Add your production domain to the reCAPTCHA admin console
2. Set environment variables in your hosting platform:
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Environment Variables
   - Other platforms: Check their documentation

3. Ensure both keys are set:
   - `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
   - `RECAPTCHA_SECRET_KEY`

## Security Notes

- The Site Key is public and visible in the browser (that's okay)
- The Secret Key must NEVER be exposed to the client
- Always use environment variables for keys
- Never commit `.env.local` or real keys to Git
- reCAPTCHA verification happens server-side for security

---

**Questions?** Check the [Google reCAPTCHA Documentation](https://developers.google.com/recaptcha/docs/display)
