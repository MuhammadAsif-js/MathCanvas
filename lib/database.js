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
// 3. Create a new document (Now accepts a custom title!)
export async function createDocument(userId, title = 'Untitled Canvas') {
  const { data, error } = await supabase
    .from('documents')
    .insert([
      { 
        user_id: userId, 
        title: title, // <-- Now it uses the custom name!
        content: '' 
      }
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}
// 4. Update a document's title
export async function updateDocumentTitle(docId, newTitle) {
  const { data, error } = await supabase
    .from('documents')
    .update({ title: newTitle })
    .eq('id', docId)
    .select();

  if (error) throw error;
  return data;
}
// 5. Auto-Save document content
export async function updateDocumentContent(docId, htmlContent) {
  const { error } = await supabase
    .from('documents')
    .update({ content: htmlContent })
    .eq('id', docId);

  if (error) throw error;
}
// 6. Fetch a single document with ALL its data (including the heavy content)
export async function getDocumentById(docId) {
  const { data, error } = await supabase
    .from('documents')
    .select('*') // The asterisk means "Get everything!"
    .eq('id', docId)
    .single();

  if (error) throw error;
  return data;
}