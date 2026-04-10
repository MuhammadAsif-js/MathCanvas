import { createClient } from '@supabase/supabase-js';

// 1. Establish the connection using your hidden keys from .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 2. Helper function for Dev A: Sign Up
export async function signUpUser(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  if (error) throw error;
  return data;
}

// 3. Helper function for Dev A: Log In (This creates the secure session!)
export async function signInUser(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) throw error;
  return data;
}

// 4. Helper function for Dev A: Log Out
export async function logOutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}