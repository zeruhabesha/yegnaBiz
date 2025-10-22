# Contact Form Setup

## Current Status

✅ **reCAPTCHA has been removed** from the contact form for simplified setup.

## Contact Form Features

The contact form is now available at `/contact` and includes:

- ✅ Form validation
- ✅ Rate limiting protection (10 requests per minute per IP)
- ✅ Email integration (when SMTP is configured)
- ✅ Input sanitization and security measures
- ✅ User-friendly error handling

## Configuration

The contact form only requires email configuration:

```env
# Email Configuration
CONTACT_RECIPIENT_EMAIL=your-email@example.com
SMTP_FROM_EMAIL=YegnaBiz <no-reply@yegnabiz.com>
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_SECURE=false
```

## Usage

1. Navigate to `/contact` in your browser
2. Fill out the form with name, email, subject, and message
3. Click "Send Message"
4. The form will validate inputs and send the message via email

## Security

The contact form includes built-in protection:
- Rate limiting to prevent spam
- Input validation and sanitization
- Email format validation
- Message length limits

No additional API keys or external services are required.

---
*This replaces the previous reCAPTCHA setup. The contact form is now simpler to deploy and maintain.*
