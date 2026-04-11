"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { EditorShell } from '../../components/EditorShell';
import { DocumentEditor } from '../../components/DocumentEditor';
import { supabase } from '../../lib/supabaseAuth';
import { getUserDocuments, getDocumentById } from '../../lib/database';

function EditorContent() {
  const searchParams = useSearchParams();
  const docId = searchParams.get('id'); 

  const [documents, setDocuments] = useState<any[]>([]);
  
  // New States to hold the specific document data and save status
  const [activeDoc, setActiveDoc] = useState<any>(null);
  const [isEngineLoading, setIsEngineLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');

  useEffect(() => {
    async function loadEditorData() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          window.location.href = '/login';
          return;
        }

     // 1. Fetch the lightweight list for the sidebar
        const docs = await getUserDocuments(user.id);
        setDocuments(docs || []);

        // 2. Fetch the FULL, heavy document data for the actual canvas
        if (docId) {
          try {
            const fullDoc = await getDocumentById(docId);
            if (fullDoc) {
              setActiveDoc(fullDoc);
            }
          } catch (fetchError) {
            console.error("Could not fetch full document:", fetchError);
            // Fallback in case the ID is broken
            window.location.href = '/dashboard'; 
          }
        }
      } catch (error) {
        console.error("Failed to load editor data:", error);
      } finally {
        setIsEngineLoading(false);
      }
    }

    loadEditorData();
  }, [docId]);

  const handleSelectDoc = (id: string) => {
    if (id !== docId) window.location.href = `/editor?id=${id}`;
  };

  return (
    <EditorShell 
      documentTitle={activeDoc ? activeDoc.title : 'Loading...'}
      documents={documents}
      activeDocId={docId || ''}
      onSelectDoc={handleSelectDoc}
      onNewDoc={() => window.location.href = '/dashboard'}
      isLoading={isEngineLoading}
      saveStatus={saveStatus} // Connect the dynamic light to the UI!
    >
      {/* Only load the editor once we actually have the document data! */}
      {activeDoc && (
        <DocumentEditor 
          docId={activeDoc.id} 
          initialContent={activeDoc.content} 
          onSaveStatusChange={setSaveStatus} 
        />
      )}
    </EditorShell>
  );
}

export default function EditorPage() {
  return (
    <Suspense fallback={
      <div className="h-screen w-screen bg-slate-950 flex flex-col items-center justify-center text-blue-500">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-slate-400 tracking-widest uppercase text-sm">Loading Workspace...</p>
      </div>
    }>
      <EditorContent />
    </Suspense>
  );
}