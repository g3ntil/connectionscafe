/**
 * Direct table creation utility for contact_submissions
 * This creates the table by making a direct API call to Supabase
 */

import { projectId, publicAnonKey } from './supabase/info';

export async function createContactTable() {
  console.log('🔧 Creating contact_submissions table...');

  const serverUrl = `https://${projectId}.supabase.co/functions/v1/make-server-786b768a`;

  try {
    const response = await fetch(`${serverUrl}/contact/create-table`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    });

    const data = await response.json();

    if (response.ok && data.success) {
      console.log('✅ Table created successfully!');
      return { success: true, message: data.message };
    } else {
      console.error('❌ Failed to create table:', data.error);
      return { success: false, error: data.error, details: data.details };
    }
  } catch (error) {
    console.error('❌ Error:', error);
    return { 
      success: false, 
      error: 'Network error. Please check your connection and try again.',
      details: error instanceof Error ? error.message : String(error)
    };
  }
}

export async function testContactSubmission() {
  console.log('🧪 Testing contact form submission...');

  const serverUrl = `https://${projectId}.supabase.co/functions/v1/make-server-786b768a`;

  try {
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
        subject: 'Test Submission from Setup',
        message: 'This is an automated test message to verify the contact form database is working correctly. You can safely delete this entry.',
      }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      console.log('✅ Test submission successful!');
      console.log('📝 Submission ID:', data.submissionId);
      return { success: true, submissionId: data.submissionId };
    } else {
      console.error('❌ Test failed:', data.error);
      return { success: false, error: data.error };
    }
  } catch (error) {
    console.error('❌ Error:', error);
    return { 
      success: false, 
      error: 'Network error. Please check your connection and try again.' 
    };
  }
}

export async function checkTableExists() {
  console.log('🔍 Checking if table exists...');

  const serverUrl = `https://${projectId}.supabase.co/functions/v1/make-server-786b768a`;

  try {
    const response = await fetch(`${serverUrl}/contact/check-table`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('❌ Error checking table:', error);
    return { exists: false, error: String(error) };
  }
}
