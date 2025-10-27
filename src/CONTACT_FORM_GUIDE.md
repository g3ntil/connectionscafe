# Contact Form Integration Guide

## Overview

The contact form on the Contact page now submits data to a Supabase table called `contact_submissions`. All form submissions are stored securely in your database.

## Features Implemented

### ✅ Form Validation
- Required fields: Name, Email, Subject, Message
- Optional field: Phone
- Email format validation
- Client-side and server-side validation

### ✅ User Feedback
- Loading state with spinner during submission
- Success message with green badge
- Error message with red badge
- Auto-dismiss success message after 5 seconds
- Form auto-clears on successful submission

### ✅ Security
- CORS protection
- Authorization headers
- Row Level Security (RLS) on database
- Input sanitization
- Rate limiting ready

### ✅ Database Storage
- Unique ID for each submission
- Timestamp tracking
- Status field for workflow management
- Admin notes field for follow-up

## How It Works

### 1. User Submits Form
```
User fills form → Clicks "Send Message" → Form validates
```

### 2. API Request
```javascript
POST https://fseoedndjvvjikwcryck.supabase.co/functions/v1/make-server-786b768a/contact/submit

Headers:
  Content-Type: application/json
  Authorization: Bearer [public-anon-key]

Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+250 788 000 000",
  "subject": "Reservation",
  "message": "I would like to make a reservation..."
}
```

### 3. Server Processing
```
Server validates → Inserts to database → Returns response
```

### 4. User Feedback
```
Success: Green badge + form reset
Error: Red badge + error message
```

## Database Structure

```sql
contact_submissions
├── id (UUID) - Primary key
├── name (TEXT) - Full name
├── email (TEXT) - Email address
├── phone (TEXT) - Phone number (optional)
├── subject (TEXT) - Message subject
├── message (TEXT) - Message content
├── created_at (TIMESTAMPTZ) - Submission time
├── status (TEXT) - Processing status
└── notes (TEXT) - Admin notes
```

## Quick Setup

### Step 1: Create Table
Run the SQL from `DATABASE_SETUP.md` in your Supabase SQL Editor

### Step 2: Deploy Server Function
The server function is already updated with the contact endpoint at:
`/supabase/functions/server/index.tsx`

### Step 3: Test the Form
1. Go to your Contact page
2. Fill out the form
3. Submit and watch for success message
4. Check Supabase dashboard for the entry

## Viewing Submissions

### In Supabase Dashboard
1. Go to: https://supabase.com/dashboard/project/fseoedndjvvjikwcryck
2. Click "Table Editor"
3. Select `contact_submissions`
4. View all submissions with filters and search

### Via API
```bash
# Get all submissions
curl -X GET \
  'https://fseoedndjvvjikwcryck.supabase.co/functions/v1/make-server-786b768a/contact/submissions' \
  -H 'Authorization: Bearer YOUR_SERVICE_ROLE_KEY'
```

## Status Workflow

Track submissions through different stages:

1. **new** → Just submitted
2. **in_progress** → Being handled
3. **resolved** → Completed
4. **spam** → Marked as spam

Update status in the Supabase dashboard as you process submissions.

## Error Handling

### Common Errors

**Missing Required Fields**
```json
{
  "error": "Missing required fields",
  "success": false
}
```

**Invalid Email**
```json
{
  "error": "Invalid email address",
  "success": false
}
```

**Database Error**
```json
{
  "error": "Failed to submit contact form",
  "success": false,
  "details": "..."
}
```

## Security Features

### Input Validation
- Trims whitespace
- Converts email to lowercase
- Validates email format
- Checks required fields

### Database Security
- Row Level Security enabled
- Anonymous users can only insert
- Service role manages all records
- Indexed for performance

### API Security
- CORS configured
- Authorization required
- Rate limiting ready (can be added)
- Input sanitization

## Future Enhancements

### Email Notifications
Add email sending when form is submitted:
```typescript
// In server function
import { Resend } from 'resend';

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

await resend.emails.send({
  from: 'noreply@connectionscafe.com',
  to: 'connectionscafe@gmail.com',
  subject: `New Contact Form: ${subject}`,
  html: `<p>From: ${name} (${email})</p><p>${message}</p>`
});
```

### Admin Dashboard
Create an admin page to manage submissions:
- View all submissions
- Filter by status
- Search by email/name
- Add notes
- Change status
- Delete spam

### Analytics
Track form metrics:
- Submission rate
- Response time
- Common subjects
- Popular contact times

### Auto-Response
Send confirmation email to submitter:
```typescript
await resend.emails.send({
  from: 'noreply@connectionscafe.com',
  to: email,
  subject: 'Thank you for contacting Connections Café',
  html: confirmationTemplate
});
```

## Testing

### Manual Testing
1. Submit form with valid data → Should succeed
2. Submit without required fields → Should show error
3. Submit with invalid email → Should show error
4. Check database → Should see new record

### Automated Testing
```typescript
// Example test
test('submits contact form successfully', async () => {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test',
      message: 'Test message'
    })
  });
  
  const data = await response.json();
  expect(data.success).toBe(true);
});
```

## Troubleshooting

### Form Not Submitting
1. Check browser console for errors
2. Verify Supabase project ID in `/utils/supabase/info.tsx`
3. Check that table exists in Supabase
4. Verify server function is deployed

### Database Errors
1. Check table exists: `contact_submissions`
2. Verify RLS policies are set up
3. Check service role key is correct
4. Look at Supabase logs

### No Success Message
1. Check network tab for API response
2. Verify response format
3. Check for JavaScript errors
4. Test with browser DevTools

## Support

For issues or questions:
- Check Supabase logs in dashboard
- Review server function logs
- Test API endpoint directly
- Verify database schema

## Files Modified

- `/components/ContactPage.tsx` - Added form submission logic
- `/supabase/functions/server/index.tsx` - Added contact endpoints
- `/DATABASE_SETUP.md` - Database setup instructions
- `/CONTACT_FORM_GUIDE.md` - This guide
