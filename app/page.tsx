"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Activity, 
  ChevronDown, 
  FunctionSquare, 
  Type, 
  Settings, 
  MousePointer2, 
  Layers, 
  Palette,
  Share2,
  BoxSelect,
  Eye,
  Menu
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* 1. Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-slate-950/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-blue-500/10 p-2 rounded-lg group-hover:bg-blue-500/20 transition-colors">
              <Activity className="w-6 h-6 text-blue-500" />
            </div>
            <span className="text-xl font-bold tracking-tight">MathCanvas</span>
          </Link>

          {/* Center Links (Desktop) */}
          <div className="hidden md:flex items-center gap-8">
            <button className="flex items-center gap-1 text-sm font-medium text-slate-400 hover:text-white transition-colors">
              Product <ChevronDown className="w-4 h-4 opacity-50" />
            </button>
            <button className="flex items-center gap-1 text-sm font-medium text-slate-400 hover:text-white transition-colors">
              Solutions <ChevronDown className="w-4 h-4 opacity-50" />
            </button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white border border-slate-700 hover:border-slate-500 hover:bg-slate-800 rounded-full transition-all"
            >
              Sign In
            </Link>
            <button className="md:hidden text-slate-400 hover:text-white">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24">
        {/* 2. Hero Section */}
        <section className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center mt-12 mb-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide uppercase mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              MathCanvas 2.0 is live
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
                Visual. Precise. Collaborative.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed">
              Transform complex mathematical concepts into visual clarity with MathCanvas. 
              The ultimate infinite canvas built for educators, researchers, and students.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link 
                href="/editor"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-blue-600 rounded-full overflow-hidden transition-all hover:scale-105 hover:bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] ring-1 ring-blue-500/50"
              >
                <span>Get Started</span>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* 3. The App Preview Mockup */}
        <section className="max-w-[1200px] mx-auto px-4 md:px-6 relative">
          {/* Background Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative rounded-xl border border-slate-700/50 bg-slate-900 overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-white/10"
          >
            {/* Mockup Top Bar */}
            <div className="h-12 border-b border-slate-800 bg-slate-900/80 flex items-center px-4 justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                <div className="w-3 h-3 rounded-full bg-slate-700"></div>
              </div>
              <div className="flex items-center gap-4 text-slate-500">
                <span className="text-xs font-medium px-3 py-1.5 bg-slate-800/50 rounded-md border border-slate-700/50">
                  Calculus_Final_Notes.mc
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-1.5 text-xs font-medium text-slate-400 bg-slate-800 hover:text-white px-3 py-1.5 rounded-md transition-colors">
                  <Share2 className="w-3 h-3" /> Share
                </button>
              </div>
            </div>

            {/* Mockup Body Container */}
            <div className="flex h-[400px] md:h-[600px] bg-[#0B1120]">
              
              {/* Left Sidebar (Tools) */}
              <div className="w-14 border-r border-slate-800 bg-slate-900/50 flex flex-col items-center py-4 gap-6 z-10">
                <button className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400 cursor-default">
                  <BoxSelect className="w-5 h-5" />
                </button>
                <button className="p-2.5 rounded-xl text-slate-500 hover:text-slate-300 transition-colors cursor-default">
                  <FunctionSquare className="w-5 h-5" />
                </button>
                <button className="p-2.5 rounded-xl text-slate-500 hover:text-slate-300 transition-colors cursor-default">
                  <Type className="w-5 h-5" />
                </button>
                <button className="p-2.5 rounded-xl text-slate-500 hover:text-slate-300 transition-colors cursor-default">
                  <Activity className="w-5 h-5" />
                </button>
                <div className="flex-1" />
                <button className="p-2.5 rounded-xl text-slate-500 hover:text-slate-300 transition-colors cursor-default">
                  <Settings className="w-5 h-5" />
                </button>
              </div>

              {/* Center Canvas */}
              <div className="flex-1 relative overflow-hidden" 
                  style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)',
                    backgroundSize: '32px 32px'
                  }}>
                
                {/* Floating Math Node 1 */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="absolute top-20 left-8 md:left-24 border border-slate-700/60 bg-slate-900/90 backdrop-blur-md rounded-xl p-5 shadow-2xl min-w-[280px]"
                >
                  <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Equation</span>
                    <Eye className="w-4 h-4 text-slate-500" />
                  </div>
                  <div className="font-serif text-2xl text-center tracking-wide text-slate-100">
                    <span className="text-blue-400">f(x)</span> = ∫<sub className="text-sm">0</sub><sup className="text-sm">∞</sup> e<sup className="text-sm">-x²</sup> dx
                  </div>
                </motion.div>

                {/* Floating Graph Node 2 */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute top-48 right-8 md:right-32 border border-slate-700/60 bg-slate-900/90 backdrop-blur-md rounded-xl p-5 shadow-2xl w-[320px]"
                >
                  <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">3D Plot Preview</span>
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400/80"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-400/80"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80"></div>
                    </div>
                  </div>
                  <div className="h-40 w-full relative flex items-center justify-center bg-slate-950 rounded-lg border border-slate-800 overflow-hidden">
                    {/* Simulated 3D CSS Plot Shape */}
                    <svg viewBox="0 0 200 100" className="w-full h-full opacity-80" preserveAspectRatio="none">
                      <path d="M0,50 Q50,0 100,50 T200,50" fill="none" stroke="currentColor" className="text-blue-500" strokeWidth="2" />
                      <path d="M0,60 Q50,10 100,60 T200,60" fill="none" stroke="currentColor" className="text-blue-500/60" strokeWidth="1.5" />
                      <path d="M0,70 Q50,20 100,70 T200,70" fill="none" stroke="currentColor" className="text-blue-500/30" strokeWidth="1" />
                      
                      <path d="M0,40 Q50,-10 100,40 T200,40" fill="none" stroke="currentColor" className="text-blue-500/60" strokeWidth="1.5" />
                      <path d="M0,30 Q50,-20 100,30 T200,30" fill="none" stroke="currentColor" className="text-blue-500/30" strokeWidth="1" />
                    </svg>
                    
                    {/* Grid lines in graph */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                  </div>
                </motion.div>

                {/* Collaborative Cursor (Sarah) */}
                <motion.div 
                  initial={{ opacity: 0, x: 50, y: 50 }}
                  animate={{ 
                    opacity: 1, 
                    x: [50, -20, 0], 
                    y: [50, -10, 0] 
                  }}
                  transition={{ delay: 1.5, duration: 2, ease: "easeOut" }}
                  className="absolute top-[40%] left-[45%] z-20 pointer-events-none"
                >
                  <MousePointer2 className="text-blue-500 w-6 h-6 fill-blue-500 -rotate-12 drop-shadow-md" />
                  <div className="bg-blue-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full absolute top-6 left-4 whitespace-nowrap shadow-lg shadow-blue-500/30 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
                    Sarah
                  </div>
                </motion.div>

                {/* Connecting Line between nodes to show "Canvas" feature */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                  <motion.path 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    d="M 280 150 C 400 150, 400 250, 500 250" 
                    fill="none" 
                    stroke="#3B82F6" 
                    strokeWidth="2" 
                    strokeDasharray="6 6"
                  />
                </svg>
              </div>

              {/* Right Sidebar (Properties) */}
              <div className="w-56 border-l border-slate-800 bg-slate-900/50 hidden lg:flex flex-col z-10">
                <div className="p-4 border-b border-slate-800">
                  <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4">Properties</h3>
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs text-slate-500 mb-1.5 block">Color Style</span>
                      <div className="flex gap-2">
                        <div className="w-6 h-6 rounded border border-blue-500 bg-blue-500/20 cursor-pointer"></div>
                        <div className="w-6 h-6 rounded border border-slate-700 bg-slate-800 hover:border-slate-500 cursor-pointer transition-colors"></div>
                        <div className="w-6 h-6 rounded border border-slate-700 bg-slate-800 hover:border-slate-500 cursor-pointer transition-colors"></div>
                        <div className="w-6 h-6 rounded border border-slate-700 bg-slate-800 hover:border-slate-500 flex items-center justify-center cursor-pointer transition-colors">
                          <Palette className="w-3 h-3 text-slate-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Layers</h3>
                    <Layers className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm bg-slate-800/50 px-3 py-2 rounded-md border border-slate-700 text-slate-200">
                      <Eye className="w-3.5 h-3.5 text-slate-400" />
                      Function Node
                    </div>
                    <div className="flex items-center gap-2 text-sm px-3 py-2 rounded-md text-slate-400 hover:bg-slate-800/30 cursor-pointer transition-colors">
                      <Eye className="w-3.5 h-3.5" />
                      3D Plot
                    </div>
                    <div className="flex items-center gap-2 text-sm px-3 py-2 rounded-md text-slate-400 hover:bg-slate-800/30 cursor-pointer transition-colors">
                      <Eye className="w-3.5 h-3.5" />
                      Grid Base
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}