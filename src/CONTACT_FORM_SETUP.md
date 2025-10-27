# Contact Form Setup Guide

## ✅ Connection Status
Your contact form is now **connected to Supabase** with:
- **Project ID**: `fseoedndjvvjikwcryck`
- **Supabase URL**: `https://fseoedndjvvjikwcryck.supabase.co`

## 🔧 Final Setup Step

The contact form integration is complete, but you need to create the `contact_submissions` table in your Supabase database.

### Quick Setup Options

#### Option 1: Use Database Check Page (Recommended)
1. Navigate to: `/db-check` in your browser
2. The page will check if the table exists
3. If not, it will provide a "Copy SQL" button
4. Click the button to copy the SQL script
5. Open Supabase SQL Editor (link provided on the page)
6. Paste and run the SQL
7. Refresh the check page to verify

#### Option 2: Manual SQL Execution
1. Go to [Supabase SQL Editor](https://supabase.com/dashboard/project/fseoedndjvvjikwcryck/sql)
2. Copy and paste the following SQL:

```sql
-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'new',
  notes TEXT
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies (if any)
DROP POLICY IF EXISTS "Service role can manage all contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Anyone can submit contact form" ON contact_submissions;
DROP POLICY IF EXISTS "Authenticated users can read contact submissions" ON contact_submissions;

-- Create security policies
CREATE POLICY "Service role can manage all contact submissions"
ON contact_submissions FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Anyone can submit contact form"
ON contact_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can read contact submissions"
ON contact_submissions FOR SELECT TO authenticated USING (true);
```

3. Click "Run" to execute the SQL
4. You should see a success message

## ✨ Features Implemented

### Enhanced Contact Form
- ✅ Full form validation (name, email, subject, message)
- ✅ Email format validation
- ✅ Loading states with spinner
- ✅ Success/error messages with animations
- ✅ Auto-hide success message after 5 seconds
- ✅ Form reset on successful submission
- ✅ Disabled inputs during submission
- ✅ Detailed error logging for debugging
- ✅ User-friendly error messages
- ✅ Database connection status detection

### Enhanced Review Button (Menu Page)
- ✅ Correct Google Review link with Place ID
- ✅ Beautiful gradient background (yellow to brown)
- ✅ Animated glow effect
- ✅ Star icon with rotation animation
- ✅ Expandable text with "Leave a Review"
- ✅ Message icon animation
- ✅ Shine effect animation
- ✅ Pulsing ring effect
- ✅ Smooth hover and tap interactions
- ✅ Auto-expand every minute

## 🧪 Testing the Contact Form

After creating the table:

1. Visit the Contact page
2. Fill out all required fields
3. Click "Send Message"
4. You should see a success message
5. Check your Supabase database to see the submission

### View Submissions
To view all contact form submissions, you can:
- Use the Supabase Dashboard Table Editor
- Or make a GET request to: `https://fseoedndjvvjikwcryck.supabase.co/functions/v1/make-server-786b768a/contact/submissions`

## 🔍 Troubleshooting

### "Database setup incomplete" error
- The table hasn't been created yet
- Follow the setup steps above to create the table

### "Failed to submit contact form" error
- Check the browser console for detailed error messages
- Verify the Supabase URL and API key are correct
- Make sure the table exists and RLS policies are set up

### "Invalid email address" error
- Check that the email format is correct (e.g., user@example.com)

## 📊 Database Schema

The `contact_submissions` table stores:
- `id` - Unique identifier (auto-generated)
- `name` - Submitter's name
- `email` - Submitter's email
- `phone` - Optional phone number
- `subject` - Message subject
- `message` - Message content
- `created_at` - Submission timestamp
- `status` - Submission status (default: 'new')
- `notes` - Optional admin notes

## 🔒 Security

The table uses Row Level Security (RLS) with these policies:
- Service role has full access (for backend operations)
- Anyone can submit a contact form (INSERT permission)
- Authenticated users can read submissions (SELECT permission)

This ensures:
- ✅ Public visitors can submit forms
- ✅ Only authenticated users can view submissions
- ✅ Only service role can delete or update submissions

## 📝 Next Steps

After the table is created, your contact form will:
1. Accept submissions from visitors
2. Store them securely in Supabase
3. Show success messages to users
4. Allow you to view/manage submissions in Supabase Dashboard

That's it! Your contact form is fully integrated and ready to use. 🎉
