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

// --- EDITOR SHELL COMPONENT ---

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
            <span className="text-xs text-slate-400 hidden sm:inline-block">Edited 2 mins ago</span>
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
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}


// --- APP ENTRY POINT (Demo Usage) ---

interface DocData {
  id: string;
  title: string;
  type: string;
  author: string;
  content: string;
}

const initialDocs: DocData[] = [
  { id: '1', title: 'Project Structural Calc', type: 'Computation Sheet', author: 'Jane Doe', content: 'Use this space to define your structural variables and mathematical equations.' },
  { id: '2', title: 'Physics Homework', type: 'Assignment', author: 'Jane Doe', content: 'Kinematics and dynamics problems for week 3.' },
  { id: '3', title: 'Q3 Revenue Projections', type: 'Financial Model', author: 'Jane Doe', content: 'Quarterly projections based on current sales trajectory.' },
  { id: '4', title: 'Fluid Dynamics Model', type: 'Simulation', author: 'Jane Doe', content: 'Parameters for pipe flow.' },
  { id: '5', title: 'Machine Learning Matrices', type: 'Notes', author: 'Jane Doe', content: 'Linear algebra review for neural networks.' }
];

export default function App() {
  const [documents, setDocuments] = useState<DocData[]>(initialDocs);
  const [activeDocId, setActiveDocId] = useState<string>(initialDocs[0].id);

  // Find the currently active document data
  const activeDoc = documents.find(d => d.id === activeDocId) || documents[0];

  const handleNewDoc = () => {
    const newDoc: DocData = {
      id: Date.now().toString(),
      title: 'Untitled Document',
      type: 'Draft',
      author: 'Jane Doe',
      content: 'Start typing your new document here...'
    };
    // Add to top of the list and set as active
    setDocuments([newDoc, ...documents]);
    setActiveDocId(newDoc.id);
  };

  return (
    <EditorShell 
      documentTitle={activeDoc.title}
      documents={documents}
      activeDocId={activeDocId}
      onSelectDoc={setActiveDocId}
      onNewDoc={handleNewDoc}
    >
      <div className="group">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 outline-none empty:before:content-['Untitled_Document'] empty:before:text-slate-300">
          {activeDoc.title}
        </h1>
      </div>
      
      <div className="flex items-center gap-2 mb-8 border-b border-slate-100 pb-4">
        <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-2 py-1 rounded">{activeDoc.type}</span>
        <span className="text-slate-400 text-sm">Author: {activeDoc.author}</span>
      </div>

      <div className="prose prose-slate max-w-none">
        <p className="text-slate-500 text-lg">
          {activeDoc.content}
        </p>
        
        <div className="my-8 flex items-center gap-4 group cursor-text">
          <div className="w-6 h-6 flex items-center justify-center bg-slate-100 rounded text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
            <Plus size={16} />
          </div>
          <p className="text-slate-400 italic m-0">Type '/' for commands, or start typing equations...</p>
        </div>

        {/* Mocking a rendered math block for visual flavor (only on doc 1) */}
        {activeDoc.id === '1' && (
          <div className="bg-slate-50 rounded-lg p-6 border border-slate-100 my-6 font-mono text-sm shadow-inner">
            <div className="text-slate-400 mb-2">// Example Beam Load Calculation</div>
            <div className="flex justify-between items-center text-slate-700">
              <span>Force (F) = m * a</span>
              <span className="text-emerald-600 font-semibold">= 450.5 N</span>
            </div>
          </div>
        )}
      </div>
      
    </EditorShell>
  );
}