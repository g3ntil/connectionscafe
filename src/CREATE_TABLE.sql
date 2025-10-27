-- ============================================================
-- CONNECTIONS CAFÉ - CONTACT FORM DATABASE TABLE
-- ============================================================
-- 
-- INSTRUCTIONS:
-- 1. Copy this entire SQL script
-- 2. Go to: https://supabase.com/dashboard/project/fseoedndjvvjikwcryck/sql
-- 3. Paste the SQL in the editor
-- 4. Click "Run" to execute
-- 5. Test the contact form
--
-- ============================================================

-- Create the contact_submissions table
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

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at 
  ON contact_submissions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_status 
  ON contact_submissions(status);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_email 
  ON contact_submissions(email);

-- Enable Row Level Security for data protection
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (safe to run multiple times)
DROP POLICY IF EXISTS "Service role can manage all contact submissions" 
  ON contact_submissions;

DROP POLICY IF EXISTS "Anyone can submit contact form" 
  ON contact_submissions;

DROP POLICY IF EXISTS "Authenticated users can read contact submissions" 
  ON contact_submissions;

-- Create security policies

-- 1. Service role has full access (for backend operations)
CREATE POLICY "Service role can manage all contact submissions"
  ON contact_submissions 
  FOR ALL 
  TO service_role 
  USING (true) 
  WITH CHECK (true);

-- 2. Anyone (including anonymous users) can submit the contact form
CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions 
  FOR INSERT 
  TO anon, authenticated 
  WITH CHECK (true);

-- 3. Only authenticated users can view submissions (for admin access)
CREATE POLICY "Authenticated users can read contact submissions"
  ON contact_submissions 
  FOR SELECT 
  TO authenticated 
  USING (true);

-- ============================================================
-- VERIFICATION QUERY (Optional - run this to verify)
-- ============================================================
-- Uncomment the line below to test if the table was created:
-- SELECT * FROM contact_submissions LIMIT 1;
