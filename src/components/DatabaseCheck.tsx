import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { CheckCircle2, AlertCircle, Loader2, Database, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

const DEFAULT_SQL = `-- Create contact_submissions table
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

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);

-- Enable RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Service role can manage all contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Anyone can submit contact form" ON contact_submissions;
DROP POLICY IF EXISTS "Authenticated users can read contact submissions" ON contact_submissions;

CREATE POLICY "Service role can manage all contact submissions"
ON contact_submissions FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Anyone can submit contact form"
ON contact_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can read contact submissions"
ON contact_submissions FOR SELECT TO authenticated USING (true);`;

export function DatabaseCheck() {
  const [checking, setChecking] = useState(false);
  const [tableExists, setTableExists] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sqlScript, setSqlScript] = useState<string>(DEFAULT_SQL);

  const checkTable = async () => {
    setChecking(true);
    setError(null);
    
    try {
      const serverUrl = `https://${projectId}.supabase.co/functions/v1/make-server-786b768a`;
      
      const response = await fetch(`${serverUrl}/contact/check-table`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      const data = await response.json();
      console.log('Table check response:', data);

      if (data.exists) {
        setTableExists(true);
      } else {
        setTableExists(false);
        // Try to get the SQL script
        const createResponse = await fetch(`${serverUrl}/contact/create-table`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        });
        
        const createData = await createResponse.json();
        if (createData.sql) {
          setSqlScript(createData.sql);
        }
      }
    } catch (err) {
      console.error('Error checking table:', err);
      setError(err instanceof Error ? err.message : 'Failed to check table');
      setTableExists(false);
    } finally {
      setChecking(false);
    }
  };

  const copySql = () => {
    if (sqlScript) {
      navigator.clipboard.writeText(sqlScript);
      alert('SQL copied to clipboard! Paste it in Supabase SQL Editor.');
    }
  };

  useEffect(() => {
    checkTable();
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-8"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-[#5B3A29]/20 rounded-full flex items-center justify-center">
            <Database className="w-6 h-6 text-[#5B3A29]" />
          </div>
          <div>
            <h1 className="text-white text-2xl">Database Setup Check</h1>
            <p className="text-gray-400 text-sm">Contact form table status</p>
          </div>
        </div>

        {checking ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-[#5B3A29] animate-spin" />
            <span className="ml-3 text-gray-400">Checking database...</span>
          </div>
        ) : (
          <>
            {tableExists === true && (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 mb-6"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-green-400 font-semibold mb-2">Table exists!</h3>
                    <p className="text-gray-300 text-sm">
                      The contact_submissions table is set up correctly. Your contact form is ready to accept submissions.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {tableExists === false && (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 mb-6"
              >
                <div className="flex items-start gap-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-yellow-400 font-semibold mb-2">Table not found</h3>
                    <p className="text-gray-300 text-sm mb-4">
                      The contact_submissions table hasn't been created yet. Follow these steps:
                    </p>
                    
                    <ol className="text-gray-300 text-sm space-y-3 mb-4 list-decimal list-inside">
                      <li>Copy the SQL script below</li>
                      <li>Open Supabase SQL Editor</li>
                      <li>Paste and run the SQL</li>
                      <li>Refresh this page to verify</li>
                    </ol>

                    {sqlScript && (
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-400 text-xs">SQL Script:</span>
                          <Button
                            onClick={copySql}
                            className="bg-[#5B3A29] hover:bg-[#4A2F1F] text-white text-xs px-3 py-1 h-auto"
                          >
                            Copy SQL
                          </Button>
                        </div>
                        <pre className="bg-black/50 border border-zinc-700/50 rounded-lg p-4 overflow-x-auto text-xs text-gray-300 max-h-64">
                          {sqlScript}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 mb-6"
              >
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-red-400 font-semibold mb-2">Error checking table</h3>
                    <p className="text-gray-300 text-sm">{error}</p>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="flex gap-3">
              <Button
                onClick={checkTable}
                disabled={checking}
                className="bg-[#5B3A29] hover:bg-[#4A2F1F] text-white"
              >
                {checking ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Checking...
                  </>
                ) : (
                  'Recheck Table'
                )}
              </Button>
              
              <a
                href={`https://supabase.com/dashboard/project/${projectId}/sql`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800/50 hover:bg-zinc-800 text-white rounded-lg transition-colors border border-zinc-700/50"
              >
                <span>Open SQL Editor</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
