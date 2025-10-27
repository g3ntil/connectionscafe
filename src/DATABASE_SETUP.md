# Database Setup for Contact Form

## Contact Submissions Table

The contact form submissions are stored in a Supabase table called `contact_submissions`. 

### Setup Instructions

1. **Go to your Supabase Dashboard**
   - Navigate to: https://supabase.com/dashboard/project/fseoedndjvvjikwcryck/editor

2. **Open SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Run the following SQL to create the table:**

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

-- Create policy to allow service role to manage all records
CREATE POLICY "Service role can manage all contact submissions"
ON contact_submissions
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Optional: Create policy to allow authenticated users to insert
CREATE POLICY "Anyone can submit contact form"
ON contact_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Optional: Create policy to allow authenticated admins to read
CREATE POLICY "Authenticated users can read contact submissions"
ON contact_submissions
FOR SELECT
TO authenticated
USING (true);
```

4. **Click "Run" to execute the SQL**

### Table Schema

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key, auto-generated |
| `name` | TEXT | Full name of the person submitting (required) |
| `email` | TEXT | Email address (required) |
| `phone` | TEXT | Phone number (optional) |
| `subject` | TEXT | Subject of the message (required) |
| `message` | TEXT | The message content (required) |
| `created_at` | TIMESTAMPTZ | Timestamp of submission (auto-generated) |
| `status` | TEXT | Status of the submission (default: 'new') |
| `notes` | TEXT | Admin notes (optional) |

### Status Values

The `status` field can have the following values:
- `new` - Just submitted, not yet reviewed
- `in_progress` - Being handled
- `resolved` - Issue resolved
- `spam` - Marked as spam

### Viewing Submissions

#### Via Supabase Dashboard
1. Go to: https://supabase.com/dashboard/project/fseoedndjvvjikwcryck/editor
2. Click on "Table Editor" in the left sidebar
3. Select `contact_submissions` table
4. You can view, edit, and manage all submissions

#### Via API Endpoint
You can also fetch all submissions using the API endpoint:
```
GET https://fseoedndjvvjikwcryck.supabase.co/functions/v1/make-server-786b768a/contact/submissions
Authorization: Bearer YOUR_SERVICE_ROLE_KEY
```

### Testing the Form

1. Navigate to the Contact page on your website
2. Fill out the form with test data
3. Click "Send Message"
4. Check the Supabase dashboard to see the submission

### Security Notes

- Row Level Security (RLS) is enabled for security
- Anonymous users can only INSERT (submit forms)
- Only service role and authenticated users can read submissions
- The service role key is kept secure in Supabase environment variables

### Future Enhancements

Consider adding:
- Email notifications when new submissions arrive
- An admin dashboard to manage submissions
- Automatic spam detection
- Email verification for submissions
- File attachments support
