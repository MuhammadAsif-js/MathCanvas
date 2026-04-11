"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FileText, MoreVertical, Plus, Menu, Search, 
  Calculator, LayoutDashboard, ChevronLeft, Save, LogOut, Loader2
} from 'lucide-react';
import { logOutUser } from '../lib/supabaseAuth';

interface EditorShellProps {
  children?: React.ReactNode;
  documentTitle?: string;
  documents?: Array<{ id: string; title: string }>;
  activeDocId?: string;
  onSelectDoc?: (id: string) => void;
  onNewDoc?: () => void;
  onTitleChange?: (newTitle: string) => void;
  isLoading?: boolean; 
  saveStatus?: 'saved' | 'saving' | 'unsaved'; 
}

export function EditorShell({ 
  children, 
  documentTitle = 'Untitled Document',
  documents = [],
  activeDocId = '',
  onSelectDoc = () => {},
  onNewDoc = () => {},
  onTitleChange = () => {},
  isLoading = false,
  saveStatus = 'saved'
}: EditorShellProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [localTitle, setLocalTitle] = useState(documentTitle);

  useEffect(() => {
    setLocalTitle(documentTitle);
  }, [documentTitle]);

  const handleLogOut = async () => {
    await logOutUser();
    window.location.href = '/login';
  };

  return (
    <div className="h-screen w-full flex overflow-hidden bg-slate-950 text-white font-sans">
      
      <aside className={`
        flex-col w-64 bg-slate-900/50 border-r border-slate-800 shrink-0 z-20 backdrop-blur-xl
        absolute md:relative h-full transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        md:flex
      `}>
        <div className="h-14 flex items-center px-4 border-b border-slate-800 shrink-0">
          <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg tracking-tight hover:opacity-80 transition-opacity">
            <LayoutDashboard size={20} className="text-blue-400" />
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">MathCanvas</span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <div className="px-3 mb-6 space-y-2">
            <Link href="/dashboard" className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-400 rounded-lg hover:text-white hover:bg-slate-800/50 transition-colors">
              <ChevronLeft size={16} />
              Back to Dashboard
            </Link>
            <button 
              onClick={onNewDoc}
              className="w-full flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-all shadow-[0_0_15px_rgba(37,99,235,0.2)]"
            >
              <Plus size={16} />
              New Document
            </button>
          </div>

          <div className="px-4 mb-3">
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Workspace Files</h2>
          </div>
          
          <nav className="px-2 space-y-1">
            {documents.map((doc) => {
              const isActive = doc.id === activeDocId;
              return (
                <button 
                  key={doc.id}
                  onClick={() => onSelectDoc(doc.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg transition-colors group
                    ${isActive ? 'bg-blue-500/10 text-blue-400 font-medium border border-blue-500/20' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent'}
                  `}
                >
                  <div className="flex items-center gap-3 truncate">
                    <FileText size={16} className={isActive ? "text-blue-400" : "text-slate-500"} />
                    <span className="truncate">{doc.title}</span>
                  </div>
                  <MoreVertical size={14} className="text-slate-600 opacity-0 group-hover:opacity-100 hover:text-slate-400 shrink-0" />
                </button>
              );
            })}
          </nav>
        </div>
        
        <div className="p-4 border-t border-slate-800 shrink-0 bg-slate-900/30">
          <button className="flex items-center gap-3 text-sm text-slate-400 hover:text-blue-400 transition-colors w-full p-2 rounded-lg hover:bg-slate-800/50">
            <Calculator size={18} />
            <span>Math Engine Status</span>
          </button>
        </div>
      </aside>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-10 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      <div className="flex-1 flex flex-col min-w-0 h-full relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>

        <header className="h-14 bg-slate-900/50 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-4 shrink-0 z-10">
          <div className="flex items-center gap-3">
            <button className="md:hidden p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={20} />
            </button>
            <input 
              type="text"
              value={localTitle}
              onChange={(e) => setLocalTitle(e.target.value)}
              onBlur={() => onTitleChange(localTitle)}
              onKeyDown={(e) => e.key === 'Enter' && onTitleChange(localTitle)}
              className="text-sm font-medium text-slate-200 bg-transparent hover:bg-slate-800 px-2 py-1 rounded cursor-text transition-colors border border-transparent focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 min-w-[200px]"
            />
          </div>

          <div className="flex items-center gap-4 relative">
            {saveStatus === 'saving' ? (
              <span className="text-xs text-blue-400 hidden sm:flex items-center gap-2">
                <Loader2 size={12} className="animate-spin" /> Saving...
              </span>
            ) : saveStatus === 'unsaved' ? (
              <span className="text-xs text-slate-400 hidden sm:flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-500"></div> Unsaved changes
              </span>
            ) : (
              <span className="text-xs text-slate-500 hidden sm:flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Saved to cloud
              </span>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-4 py-8 md:py-12 flex justify-center relative z-10">
          {isLoading ? (
            <div className="flex-1 flex flex-col items-center justify-center py-20 mt-20">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
                <div className="relative bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-2xl">
                  <LayoutDashboard size={32} className="text-blue-400 animate-pulse" />
                </div>
              </div>
              <p className="mt-6 text-slate-400 font-medium tracking-widest uppercase text-sm animate-pulse">Loading Math Engine...</p>
            </div>
          ) : (
            <div className="bg-slate-900/40 backdrop-blur-xl max-w-4xl w-full min-h-[11in] shadow-2xl border border-slate-800 rounded-2xl p-8 md:p-16">
              {children}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}