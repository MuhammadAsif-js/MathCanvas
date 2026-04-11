"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, FileText, LogOut, Trash2, LayoutDashboard, Settings, X } from 'lucide-react';
import { supabase, logOutUser } from '../../lib/supabaseAuth';
import { getUserDocuments, deleteDocument, createDocument, updateDocumentTitle } from '../../lib/database';

export default function DashboardPage() {
  // --- CORE DATA STATES ---
  const [documents, setDocuments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- NEW: MODAL STATES ---
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  
  const [activeDoc, setActiveDoc] = useState<{id: string, title: string} | null>(null);
  const [modalInput, setModalInput] = useState("");

  // --- INITIAL LOAD ---
  useEffect(() => {
    async function loadDashboard() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          window.location.href = '/login';
          return;
        }
        const docs = await getUserDocuments(user.id);
        setDocuments(docs || []);
      } catch (error) {
        console.error("Error loading dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadDashboard();
  }, []);

  // --- UPGRADED ACTIONS (Using Modals) ---

  const executeCreate = async () => {
    if (!modalInput.trim()) return;
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      // Pass the custom name from the modal to the database
      const newDoc = await createDocument(user.id, modalInput.trim());
      window.location.href = `/editor?id=${newDoc.id}`;
    } catch (error: any) {
      console.error("Full Error Details:", error.message, error.details, error.hint);
      alert(`Database Error: ${error.message || "Unknown Supabase Rejection"}`);
    }
  };

  const executeRename = async () => {
    if (!activeDoc || !modalInput.trim() || modalInput === activeDoc.title) {
      setIsRenameOpen(false); // Close if they didn't change anything
      return;
    }
    try {
      await updateDocumentTitle(activeDoc.id, modalInput.trim());
      // Update UI instantly
      setDocuments(documents.map(doc => doc.id === activeDoc.id ? { ...doc, title: modalInput.trim() } : doc));
      setIsRenameOpen(false); // Close modal on success
    } catch (error) {
      console.error("Failed to rename:", error);
      alert("Failed to rename the document.");
    }
  };

  const executeDelete = async () => {
    if (!activeDoc) return;
    try {
      await deleteDocument(activeDoc.id);
      // Remove from UI instantly
      setDocuments(documents.filter(doc => doc.id !== activeDoc.id));
      setIsDeleteOpen(false); // Close modal on success
    } catch (error) {
      console.error("Failed to delete:", error);
      alert("Failed to delete the document.");
    }
  };

  const handleLogOut = async () => {
    await logOutUser(); 
    window.location.href = '/login'; 
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex h-screen overflow-hidden relative">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-slate-900/50 border-r border-slate-800 flex flex-col backdrop-blur-xl z-20">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent flex items-center gap-2">
            <LayoutDashboard size={20} className="text-blue-400" />
            MathCanvas
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Your Workspace</p>
          
          <button 
            onClick={() => {
              setModalInput("Untitled Canvas"); // Default text
              setIsCreateOpen(true);            // Open modal instead of teleporting
            }}
            className="w-full flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 rounded-lg font-medium transition-all shadow-[0_0_15px_rgba(37,99,235,0.2)]"
          >
            <Plus size={18} />
            New Canvas
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors">
            <Settings size={18} />
            Settings
          </button>
          <button 
            onClick={handleLogOut} 
            className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 flex flex-col relative z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>

        <header className="p-8 pb-4 relative z-10">
          <h2 className="text-3xl font-bold text-white mb-2">Recent Documents</h2>
          <p className="text-slate-400">Manage and edit your saved canvases.</p>
        </header>

        <div className="flex-1 p-8 pt-4 overflow-y-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {isLoading ? (
              <div className="col-span-full flex flex-col items-center justify-center py-20">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
                  <div className="relative bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-2xl">
                    <LayoutDashboard size={32} className="text-blue-400 animate-pulse" />
                  </div>
                </div>
                <p className="mt-6 text-slate-400 font-medium tracking-widest uppercase text-sm animate-pulse">Decrypting Workspace...</p>
              </div>
            ) : documents.length === 0 ? (
              <div className="col-span-full text-center bg-slate-900/40 border border-slate-800 rounded-2xl py-12">
                <FileText size={48} className="text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-slate-300 mb-2">No canvases yet</h3>
                <p className="text-slate-500">Click 'New Canvas' to start writing math.</p>
              </div>
            ) : (
              <>
                {/* Map through the user's documents */}
                {documents.map((doc) => (
                  <div 
                    key={doc.id}
                    onClick={() => window.location.href = `/editor?id=${doc.id}`}
                    className="group relative bg-slate-900/40 border border-slate-800 hover:border-blue-500/50 p-6 rounded-2xl transition-all duration-300 hover:shadow-[0_8px_32px_rgba(37,99,235,0.1)] backdrop-blur-sm cursor-pointer flex flex-col h-48"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                        <FileText size={24} />
                      </div>
                      
                      {/* Trash Button - Triggers Modal */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveDoc({ id: doc.id, title: doc.title });
                          setIsDeleteOpen(true);
                        }}
                        className="text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all p-2 rounded-lg z-20"
                        title="Delete Canvas"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    
                    {/* Title Clickable - Triggers Modal */}
                    <div 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveDoc({ id: doc.id, title: doc.title });
                        setModalInput(doc.title);
                        setIsRenameOpen(true);
                      }}
                      className="group/title relative"
                    >
                      <h3 className="font-semibold text-lg text-slate-200 group-hover/title:text-blue-400 transition-colors w-fit flex items-center gap-2" title="Click to rename">
                        {doc.title}
                        <span className="opacity-0 group-hover/title:opacity-100 text-slate-500 text-xs text-blue-400">✎</span>
                      </h3>
                    </div>

                    <p className="text-sm text-slate-500 mt-auto">
                      Created on {new Date(doc.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </>
            )}

          </div>
        </div>
      </main>

      {/* ========================================= */}
      {/* MODAL OVERLAYS                            */}
      {/* ========================================= */}

      {/* 1. CREATE MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm px-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
            <button onClick={() => setIsCreateOpen(false)} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors">
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold text-white mb-1">Create New Canvas</h3>
            <p className="text-slate-400 text-sm mb-6">Setup your new workspace.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Canvas Name</label>
                <input 
                  autoFocus
                  type="text" 
                  value={modalInput}
                  onChange={(e) => setModalInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && executeCreate()}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                  placeholder="e.g., Advanced Calculus Notes"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Starting Template</label>
                <select className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer">
                  <option>Blank Canvas</option>
                  <option>Engineering Report</option>
                  <option>Homework Assignment</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button onClick={() => setIsCreateOpen(false)} className="px-4 py-2 rounded-lg font-medium text-slate-300 hover:bg-slate-800 transition-colors">Cancel</button>
              <button onClick={executeCreate} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/20">Create Document</button>
            </div>
          </div>
        </div>
      )}

      {/* 2. RENAME MODAL */}
      {isRenameOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm px-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
            <button onClick={() => setIsRenameOpen(false)} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors">
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold text-white mb-4">Rename Canvas</h3>
            <input 
              autoFocus
              type="text" 
              value={modalInput}
              onChange={(e) => setModalInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && executeRename()}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:border-blue-500 outline-none"
            />
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setIsRenameOpen(false)} className="px-4 py-2 rounded-lg font-medium text-slate-300 hover:bg-slate-800 transition-colors">Cancel</button>
              <button onClick={executeRename} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors">Save Name</button>
            </div>
          </div>
        </div>
      )}

      {/* 3. DELETE MODAL */}
      {isDeleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm px-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
            <button onClick={() => setIsDeleteOpen(false)} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors">
              <X size={20} />
            </button>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-red-500/10 rounded-full text-red-500">
                <Trash2 size={24} />
              </div>
              <h3 className="text-xl font-bold text-white">Delete Canvas?</h3>
            </div>
            <p className="text-slate-400 mb-6 mt-2">
              Are you sure you want to delete <span className="text-slate-200 font-semibold">"{activeDoc?.title}"</span>? This action cannot be undone and the math will be lost forever.
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setIsDeleteOpen(false)} className="px-4 py-2 rounded-lg font-medium text-slate-300 hover:bg-slate-800 transition-colors">Cancel</button>
              <button onClick={executeDelete} className="px-4 py-2 bg-red-500 hover:bg-red-400 text-white rounded-lg font-medium transition-colors shadow-lg shadow-red-500/20">Yes, Delete It</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}