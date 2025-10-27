# Contact Form Troubleshooting Guide

## 🔍 Current Issue
The contact form isn't working because the `contact_submissions` table hasn't been created in your Supabase database yet.

## ✅ Step-by-Step Fix

### Step 1: Create the Database Table

1. **Open Supabase Dashboard**
   - Go to: https://supabase.com/dashboard/project/fseoedndjvvjikwcryck
   - Login if needed

2. **Open SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click the "+ New Query" button

3. **Copy and Paste This SQL**
   ```sql
   -- Create contact_submissions table
   CREATE TABLE contact_submissions (
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
   CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
   CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
   CREATE INDEX idx_contact_submissions_email ON contact_submissions(email);

   -- Enable Row Level Security (RLS)
   ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

   -- Allow service role to manage all records
   CREATE POLICY "Service role can manage all contact submissions"
   ON contact_submissions
   FOR ALL
   TO service_role
   USING (true)
   WITH CHECK (true);

   -- Allow anyone to submit contact forms
   CREATE POLICY "Anyone can submit contact form"
   ON contact_submissions
   FOR INSERT
   TO anon, authenticated
   WITH CHECK (true);

   -- Allow authenticated users to read submissions
   CREATE POLICY "Authenticated users can read contact submissions"
   ON contact_submissions
   FOR SELECT
   TO authenticated
   USING (true);
   ```

4. **Run the SQL**
   - Click the "Run" button (or press Ctrl/Cmd + Enter)
   - You should see "Success. No rows returned" message

5. **Verify Table Creation**
   - Click on "Table Editor" in the left sidebar
   - You should see `contact_submissions` in the list of tables
   - Click on it to view the empty table

### Step 2: Test the Contact Form

1. **Go to Your Website**
   - Navigate to the Contact page

2. **Fill Out the Form**
   - Name: Test User
   - Email: test@example.com
   - Phone: +250 788 000 000 (optional)
   - Subject: Test Submission
   - Message: This is a test message

3. **Submit the Form**
   - Click "Send Message"
   - You should see a green success message
   - The form should clear automatically

4. **Verify in Supabase**
   - Go back to Supabase Dashboard
   - Click "Table Editor" → `contact_submissions`
   - You should see your test submission

## 🐛 Common Issues & Solutions

### Issue: "Failed to submit form" Error

**Possible Causes:**
1. Table doesn't exist yet → Follow Step 1 above
2. RLS policies not set correctly → Re-run the SQL from Step 1
3. Server function not deployed → Check Supabase Functions

**Check Server Function:**
```bash
# In your terminal, verify the function exists
# Go to: https://supabase.com/dashboard/project/fseoedndjvvjikwcryck/functions
# You should see "make-server-786b768a" function
```

### Issue: Form Submits but No Data in Database

**Solution:**
1. Check browser console (F12) for errors
2. Check Supabase logs:
   - Go to: https://supabase.com/dashboard/project/fseoedndjvvjikwcryck/logs/edge-functions
   - Look for errors from `make-server-786b768a` function

### Issue: "Invalid email address" Error

**Solution:**
- Make sure the email field contains a valid email format
- Example: user@domain.com

### Issue: CORS Error in Browser Console

**Solution:**
The server function already has CORS configured. If you see CORS errors:
1. Make sure you're using the correct Supabase project ID
2. Check `/utils/supabase/info.tsx` has the right credentials
3. Try clearing browser cache

## 📊 Viewing Submissions

### Via Supabase Dashboard (Recommended)
1. Go to: https://supabase.com/dashboard/project/fseoedndjvvjikwcryck/editor
2. Click "Table Editor"
3. Select `contact_submissions`
4. View, filter, and manage submissions

### Via API (Advanced)
```bash
curl -X GET \
  'https://fseoedndjvvjikwcryck.supabase.co/functions/v1/make-server-786b768a/contact/submissions' \
  -H 'Authorization: Bearer YOUR_SERVICE_ROLE_KEY'
```

## 🔒 Security Verification

### Check Row Level Security (RLS)
1. Go to Table Editor → `contact_submissions`
2. Click on the table settings (gear icon)
3. Verify "Enable RLS" is ON
4. Check policies are in place:
   - Service role can manage all
   - Anyone can insert
   - Authenticated can read

### Check Policies
```sql
-- Run this to see all policies
SELECT * FROM pg_policies 
WHERE tablename = 'contact_submissions';
```

## 📝 Expected Behavior

### When Form is Submitted Successfully:
1. Form shows loading state with spinner
2. Data is sent to server
3. Server validates and stores in database
4. Success message appears (green badge)
5. Form clears automatically
6. Success message disappears after 5 seconds

### When There's an Error:
1. Form shows loading state
2. Error is detected
3. Error message appears (red badge)
4. Form data remains (user can edit and retry)
5. Error message stays until user submits again

## 🧪 Manual Testing Checklist

- [ ] Table `contact_submissions` exists in Supabase
- [ ] RLS is enabled on the table
- [ ] Policies are in place
- [ ] Can submit form with all fields
- [ ] Can submit form with only required fields (name, email, subject, message)
- [ ] Invalid email shows error
- [ ] Empty required fields show error
- [ ] Success message appears after submission
- [ ] Form clears after successful submission
- [ ] Data appears in Supabase Table Editor

## 🔧 Quick Diagnostics

Run this checklist to identify the issue:

1. **Check if table exists:**
   - Supabase Dashboard → Table Editor → Look for `contact_submissions`

2. **Check browser console:**
   - Open DevTools (F12)
   - Go to Console tab
   - Submit form and look for errors

3. **Check network requests:**
   - Open DevTools (F12)
   - Go to Network tab
   - Submit form
   - Look for request to `/contact/submit`
   - Check response status and body

4. **Check Supabase logs:**
   - Supabase Dashboard → Logs → Edge Functions
   - Look for errors or failed requests

## 📞 Need More Help?

If you're still having issues:

1. **Check the exact error message**
   - In browser console
   - In Supabase logs

2. **Verify project configuration**
   - File: `/utils/supabase/info.tsx`
   - Should have correct project ID and anon key

3. **Test the API directly**
   ```bash
   curl -X POST \
     'https://fseoedndjvvjikwcryck.supabase.co/functions/v1/make-server-786b768a/contact/submit' \
     -H 'Content-Type: application/json' \
     -H 'Authorization: Bearer YOUR_ANON_KEY' \
     -d '{
       "name": "Test User",
       "email": "test@example.com",
       "subject": "Test",
       "message": "Test message"
     }'
   ```

## ✨ Once It's Working

After successful setup:

1. **Test with real data** - Submit an actual inquiry
2. **Set up notifications** (optional) - Get emails when forms are submitted
3. **Create admin dashboard** (optional) - Manage submissions easily
4. **Monitor submissions** - Check Table Editor regularly

## 🎯 Success Indicators

You'll know it's working when:
- ✅ Form submits without errors
- ✅ Green success message appears
- ✅ Form clears automatically
- ✅ Data appears in Supabase Table Editor
- ✅ Timestamp is set correctly
- ✅ Status is "new" by default
