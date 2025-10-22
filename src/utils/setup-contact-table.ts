/**
 * Setup script to create contact_submissions table in Supabase
 * Run this once to initialize the database table
 */

import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './supabase/info';

const supabaseUrl = `https://${projectId}.supabase.co`;

// This uses the anon key for safety
const supabase = createClient(supabaseUrl, publicAnonKey);

export async function setupContactTable() {
  console.log('🔧 Setting up contact_submissions table...');
  
  const sql = `
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

    -- Enable Row Level Security (RLS)
    ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

    -- Drop existing policies if they exist
    DROP POLICY IF EXISTS "Service role can manage all contact submissions" ON contact_submissions;
    DROP POLICY IF EXISTS "Anyone can submit contact form" ON contact_submissions;
    DROP POLICY IF EXISTS "Authenticated users can read contact submissions" ON contact_submissions;

    -- Create policy to allow service role to manage all records
    CREATE POLICY "Service role can manage all contact submissions"
    ON contact_submissions
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

    -- Create policy to allow anyone to insert
    CREATE POLICY "Anyone can submit contact form"
    ON contact_submissions
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

    -- Create policy to allow authenticated users to read
    CREATE POLICY "Authenticated users can read contact submissions"
    ON contact_submissions
    FOR SELECT
    TO authenticated
    USING (true);
  `;

  try {
    const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });
    
    if (error) {
      console.error('❌ Error creating table:', error);
      return { success: false, error };
    }
    
    console.log('✅ Table created successfully!');
    return { success: true, data };
  } catch (err) {
    console.error('❌ Error:', err);
    return { success: false, error: err };
  }
}

// Test by inserting a sample record
export async function testContactTable() {
  console.log('🧪 Testing contact form submission...');
  
  try {
    const serverUrl = `https://${projectId}.supabase.co/functions/v1/make-server-786b768a`;
    
    const response = await fetch(`${serverUrl}/contact/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        phone: '+250 788 000 000',
        subject: 'Test Submission',
        message: 'This is a test message to verify the contact form is working correctly.',
      }),
    });

    const data = await response.json();
    
    if (response.ok && data.success) {
      console.log('✅ Test submission successful!');
      console.log('📝 Submission ID:', data.submissionId);
      return { success: true, data };
    } else {
      console.error('❌ Test submission failed:', data);
      return { success: false, error: data.error };
    }
  } catch (err) {
    console.error('❌ Error testing:', err);
    return { success: false, error: err };
  }
}
