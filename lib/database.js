import { supabase } from './supabaseAuth.js';

// 1. Fetch the user's documents (Dashboard List)
export async function getUserDocuments(userId) {
  const { data, error } = await supabase
    .from('documents')
    .select('id, title, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

// 2. Delete a specific document
export async function deleteDocument(docId) {
  const { error } = await supabase
    .from('documents')
    .delete()
    .eq('id', docId);

  if (error) throw error;
  return true; 
}