"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, FileText, LogOut, Trash2, LayoutDashboard, Settings } from 'lucide-react';

export default function DashboardPage() {
  // We will connect this to Dev B's Supabase functions later!
  const [documents, setDocuments] = useState([
    { id: 1, title: "Calculus Homework", created_at: "2023-10-24" },
    { id: 2, title: "Physics Lab Data", created_at: "2023-10-25" }
  ]);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex h-screen overflow-hidden">
      
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
          
          {/* This links directly to the Editor you already built! */}
          <Link href="/editor" className="w-full flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 rounded-lg font-medium transition-all shadow-[0_0_15px_rgba(37,99,235,0.2)]">
            <Plus size={18} />
            New Canvas
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors">
            <Settings size={18} />
            Settings
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors">
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 flex flex-col relative">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>

        <header className="p-8 pb-4 relative z-10">
          <h2 className="text-3xl font-bold text-white mb-2">Recent Documents</h2>
          <p className="text-slate-400">Manage and edit your saved canvases.</p>
        </header>

        <div className="flex-1 p-8 pt-4 overflow-y-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Map through the user's documents */}
            {documents.map((doc) => (
              <div 
                key={doc.id}
                className="group relative bg-slate-900/40 border border-slate-800 hover:border-blue-500/50 p-6 rounded-2xl transition-all duration-300 hover:shadow-[0_8px_32px_rgba(37,99,235,0.1)] backdrop-blur-sm cursor-pointer flex flex-col h-48"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                    <FileText size={24} />
                  </div>
                  <button className="text-slate-600 hover:text-red-400 transition-colors p-2 z-20">
                    <Trash2 size={18} />
                  </button>
                </div>
                
                <h3 className="font-semibold text-lg text-slate-200 group-hover:text-white transition-colors">{doc.title}</h3>
                <p className="text-sm text-slate-500 mt-auto">Edited on {doc.created_at}</p>
              </div>
            ))}

          </div>
        </div>
      </main>

    </div>
  );
}