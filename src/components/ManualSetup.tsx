import { useState } from 'react';
import { Button } from './ui/button';
import { Copy, CheckCircle2, ExternalLink, Database } from 'lucide-react';
import { motion } from 'motion/react';

export function ManualSetup() {
  const [copied, setCopied] = useState(false);

  const SQL_CODE = `-- Contact Form Database Setup for Connections Café
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/fseoedndjvvjikwcryck/sql

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
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at 
  ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status 
  ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email 
  ON contact_submissions(email);

-- Enable Row Level Security (RLS)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (cleanup)
DROP POLICY IF EXISTS "Service role can manage all contact submissions" 
  ON contact_submissions;
DROP POLICY IF EXISTS "Anyone can submit contact form" 
  ON contact_submissions;
DROP POLICY IF EXISTS "Authenticated users can read contact submissions" 
  ON contact_submissions;

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

-- Success! The table is now ready to use.`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SQL_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-4xl w-full bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6 sm:p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Database className="w-16 h-16 text-[#5B3A29] mx-auto mb-4" />
          <h1 className="text-white text-3xl mb-2">Contact Form Setup</h1>
          <p className="text-gray-400">
            Follow these simple steps to create the database table
          </p>
        </div>

        {/* Instructions */}
        <div className="space-y-6 mb-8">
          <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#5B3A29]/20 flex items-center justify-center flex-shrink-0">
                <span className="text-[#5B3A29]">1</span>
              </div>
              <div className="flex-1">
                <h3 className="text-white mb-2">Copy the SQL Code</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Click the button below to copy the SQL code to your clipboard.
                </p>
                <Button
                  onClick={handleCopy}
                  className="bg-[#5B3A29] hover:bg-[#4A2F1F] text-white px-6 py-2 rounded-lg transition-all duration-300 flex items-center gap-2"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy SQL Code</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#5B3A29]/20 flex items-center justify-center flex-shrink-0">
                <span className="text-[#5B3A29]">2</span>
              </div>
              <div className="flex-1">
                <h3 className="text-white mb-2">Open Supabase SQL Editor</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Navigate to your Supabase project's SQL Editor.
                </p>
                <a
                  href="https://supabase.com/dashboard/project/fseoedndjvvjikwcryck/sql"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-2 rounded-lg transition-all duration-300"
                >
                  <span>Open SQL Editor</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#5B3A29]/20 flex items-center justify-center flex-shrink-0">
                <span className="text-[#5B3A29]">3</span>
              </div>
              <div className="flex-1">
                <h3 className="text-white mb-2">Paste and Run</h3>
                <p className="text-gray-400 text-sm">
                  In the SQL Editor, click "+ New Query", paste the SQL code, and click "Run" or press Ctrl/Cmd + Enter.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-white mb-2">Done!</h3>
                <p className="text-gray-400 text-sm">
                  Your contact form database is now ready. Test it by submitting the contact form on your website.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SQL Code Preview */}
        <div className="bg-zinc-950 border border-zinc-800/50 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-gray-400 text-sm">SQL Code Preview</h3>
            <Button
              onClick={handleCopy}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
            >
              {copied ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
          <pre className="text-gray-300 text-xs sm:text-sm overflow-x-auto max-h-96 overflow-y-auto">
            <code>{SQL_CODE}</code>
          </pre>
        </div>

        {/* Help Section */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
          <h3 className="text-blue-400 mb-3 flex items-center gap-2">
            <Database className="w-5 h-5" />
            What This Does
          </h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>Creates a <code className="bg-zinc-800 px-1 rounded">contact_submissions</code> table to store form submissions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>Adds indexes for fast queries and searching</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>Sets up Row Level Security (RLS) policies for data protection</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>Allows anyone to submit forms (insert), but only authenticated users can read submissions</span>
            </li>
          </ul>
        </div>

        {/* Success Animation */}
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 text-center"
          >
            <p className="text-green-400 flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              SQL code copied! Now paste it in Supabase SQL Editor.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
