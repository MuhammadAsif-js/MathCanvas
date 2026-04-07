"use client";
import React, { useState } from 'react';

// Simple icon fallbacks to avoid lucide-react dependency
interface IconProps { size?: number; className?: string }
const FileText = ({ className }: IconProps) => <span className={className}>📄</span>;
const MoreVertical = ({ className }: IconProps) => <span className={className}>⋮</span>;
const Plus = ({ className }: IconProps) => <span className={className}>＋</span>;
const Menu = ({ className }: IconProps) => <span className={className}>☰</span>;
const Search = ({ className }: IconProps) => <span className={className}>🔍</span>;
const Calculator = ({ className }: IconProps) => <span className={className}>🧮</span>;

interface EditorShellProps {
  children?: React.ReactNode;
  documentTitle?: string;
  documents?: Array<{ id: string; title: string }>;
  activeDocId?: string;
  onSelectDoc?: (id: string) => void;
  onNewDoc?: () => void;
}

export function EditorShell({ 
  children, 
  documentTitle = 'Untitled Document',
  documents = [],
  activeDocId = '',
  onSelectDoc = () => {},
  onNewDoc = () => {}
}: EditorShellProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="h-screen w-full flex overflow-hidden bg-slate-50 text-slate-900 font-sans">
      
      {/* Left Sidebar (Hidden on mobile, visible on md+) */}
      <aside className={`
        flex-col w-64 bg-white border-r border-slate-200 shrink-0 z-20
        absolute md:relative h-full transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        md:flex
      `}>
        {/* Logo Area */}
        <div className="h-14 flex items-center px-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2 font-bold text-lg tracking-tight text-slate-800">
            <span className="text-blue-600 text-xl font-black">∑</span>
            MathCanvas
          </div>
        </div>

        {/* Sidebar Content Scrollable Area */}
        <div className="flex-1 overflow-y-auto py-4">
          {/* Action Buttons */}
          <div className="px-3 mb-6 space-y-1">
            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 rounded-md hover:bg-slate-100 transition-colors">
              <Search size={16} className="text-slate-400" />
              Search
            </button>
            <button 
              onClick={onNewDoc}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 rounded-md hover:bg-slate-100 transition-colors"
            >
              <Plus size={16} className="text-slate-400" />
              New Document
            </button>
          </div>

          {/* My Documents Section */}
          <div className="px-4 mb-2">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              My Documents
            </h2>
          </div>
          
          <nav className="px-2 space-y-[2px]">
            {documents.map((doc) => {
              const isActive = doc.id === activeDocId;
              return (
                <button 
                  key={doc.id}
                  onClick={() => onSelectDoc(doc.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors group
                    ${isActive ? 'bg-slate-100 text-slate-900 font-medium' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}
                  `}
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileText size={16} className={isActive ? "text-blue-500" : "text-slate-400"} />
                    <span className="truncate">{doc.title}</span>
                  </div>
                  <MoreVertical size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 hover:text-slate-600 shrink-0" />
                </button>
              );
            })}
          </nav>
        </div>
        
        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-100 shrink-0">
          <button className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors">
            <Calculator size={16} />
            <span>Computations Library</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 z-10 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        
        {/* Top Navbar */}
        <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 shrink-0 z-10">
          <div className="flex items-center gap-3">
            {/* Mobile menu toggle */}
            <button 
              className="md:hidden p-1.5 text-slate-500 hover:bg-slate-100 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={20} />
            </button>
            
            <div className="text-sm font-medium text-slate-700 hover:bg-slate-100 px-2 py-1 rounded cursor-pointer transition-colors">
              {documentTitle}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-400 hidden sm:inline-block">Edited just now</span>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-1.5 rounded-md shadow-sm transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-1">
              Save
            </button>
            {/* Dummy User Profile */}
            <button className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm shadow-sm ring-2 ring-white hover:opacity-90 transition-opacity">
              JD
            </button>
          </div>
        </header>

        {/* Main Canvas Area */}
        <main className="flex-1 overflow-y-auto px-4 py-8 md:py-12 flex justify-center">
          {/* The "Page" Container */}
          <div className="bg-white max-w-4xl w-full min-h-[11in] shadow-sm ring-1 ring-slate-200/50 rounded-sm p-8 md:p-16">
            
            {/* This is where DocumentEditor gets injected! */}
            {children}
            
          </div>
        </main>

      </div>
    </div>
  );
}