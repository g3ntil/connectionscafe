import { useState } from 'react';
import { Button } from './ui/button';
import { CheckCircle2, AlertCircle, Loader2, Database, TestTube2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function SetupDatabase() {
  const [isCreating, setIsCreating] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [createStatus, setCreateStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [testStatus, setTestStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleCreateTable = async () => {
    setIsCreating(true);
    setCreateStatus({ type: null, message: '' });

    try {
      const serverUrl = `https://${projectId}.supabase.co/functions/v1/make-server-786b768a`;
      
      const response = await fetch(`${serverUrl}/contact/create-table`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setCreateStatus({
          type: 'success',
          message: 'Database table created successfully! You can now use the contact form.',
        });
      } else {
        // If automated creation failed, show the SQL for manual execution
        const errorMsg = data.error || 'Failed to create table';
        const sqlInstructions = data.sql ? `\n\n${data.sql}` : '';
        throw new Error(errorMsg + sqlInstructions);
      }
    } catch (error) {
      console.error('Error creating table:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to create table. Please check console for details.';
      setCreateStatus({
        type: 'error',
        message: errorMessage.includes('Copy and paste') 
          ? 'Automated creation failed. Please see the SQL in the browser console and run it manually in Supabase SQL Editor.'
          : errorMessage,
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleTestForm = async () => {
    setIsTesting(true);
    setTestStatus({ type: null, message: '' });

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
        setTestStatus({
          type: 'success',
          message: `Test submission successful! Submission ID: ${data.submissionId}`,
        });
      } else {
        throw new Error(data.error || 'Failed to submit test');
      }
    } catch (error) {
      console.error('Error testing form:', error);
      setTestStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Test failed. Make sure the table is created first.',
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-8">
        <div className="text-center mb-8">
          <Database className="w-16 h-16 text-[#5B3A29] mx-auto mb-4" />
          <h1 className="text-white text-3xl mb-2">Database Setup</h1>
          <p className="text-gray-400">
            Create the contact_submissions table in your Supabase database
          </p>
        </div>

        <div className="space-y-6">
          {/* Create Table Section */}
          <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-6">
            <h2 className="text-white text-xl mb-2 flex items-center gap-2">
              <Database className="w-5 h-5 text-[#5B3A29]" />
              Step 1: Create Table
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              This will create the contact_submissions table with all necessary indexes and security policies.
            </p>

            <AnimatePresence>
              {createStatus.type && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={`mb-4 p-4 rounded-xl border flex items-start gap-3 ${
                    createStatus.type === 'success'
                      ? 'bg-green-500/10 border-green-500/30 text-green-400'
                      : 'bg-red-500/10 border-red-500/30 text-red-400'
                  }`}
                >
                  {createStatus.type === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  )}
                  <p className="text-sm leading-relaxed">{createStatus.message}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              onClick={handleCreateTable}
              disabled={isCreating || createStatus.type === 'success'}
              className="w-full bg-[#5B3A29] hover:bg-[#4A2F1F] text-white py-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isCreating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Creating Table...</span>
                </>
              ) : createStatus.type === 'success' ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Table Created</span>
                </>
              ) : (
                <>
                  <Database className="w-5 h-5" />
                  <span>Create Table</span>
                </>
              )}
            </Button>
          </div>

          {/* Test Form Section */}
          <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-6">
            <h2 className="text-white text-xl mb-2 flex items-center gap-2">
              <TestTube2 className="w-5 h-5 text-[#5B3A29]" />
              Step 2: Test Contact Form
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              Submit a test message to verify everything is working correctly.
            </p>

            <AnimatePresence>
              {testStatus.type && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={`mb-4 p-4 rounded-xl border flex items-start gap-3 ${
                    testStatus.type === 'success'
                      ? 'bg-green-500/10 border-green-500/30 text-green-400'
                      : 'bg-red-500/10 border-red-500/30 text-red-400'
                  }`}
                >
                  {testStatus.type === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  )}
                  <p className="text-sm leading-relaxed">{testStatus.message}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              onClick={handleTestForm}
              disabled={isTesting || createStatus.type !== 'success'}
              className="w-full bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isTesting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Testing...</span>
                </>
              ) : (
                <>
                  <TestTube2 className="w-5 h-5" />
                  <span>Test Form Submission</span>
                </>
              )}
            </Button>
          </div>

          {/* Instructions */}
          <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-6">
            <h3 className="text-[#5B3A29] mb-3">What This Does</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-[#5B3A29] mt-1">•</span>
                <span>Creates the contact_submissions table in your Supabase database</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#5B3A29] mt-1">•</span>
                <span>Sets up proper indexes for fast queries</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#5B3A29] mt-1">•</span>
                <span>Configures Row Level Security (RLS) policies</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#5B3A29] mt-1">•</span>
                <span>Allows anyone to submit contact forms</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#5B3A29] mt-1">•</span>
                <span>Tests the submission endpoint to verify it works</span>
              </li>
            </ul>
          </div>

          {/* Next Steps */}
          {testStatus.type === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-500/10 border border-green-500/30 rounded-xl p-6"
            >
              <h3 className="text-green-400 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Setup Complete!
              </h3>
              <p className="text-gray-300 text-sm mb-3">
                Your contact form is now ready to use. You can:
              </p>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Go to the Contact page and test the real form</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>View submissions in Supabase Table Editor</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Delete the test submission from your database</span>
                </li>
              </ul>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
