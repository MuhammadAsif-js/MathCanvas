"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, FunctionSquare, AlertCircle } from 'lucide-react';

// --- Assets & Icons ---
// Fixed TypeScript implicit 'any' error by defining the prop type
const GoogleIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} width="24" height="24" xmlns="http://www.w3.org/2000/svg">
    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
      <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
      <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
      <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
      <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
    </g>
  </svg>
);

const MicrosoftIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 21 21" className={className} width="24" height="24" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="9" height="9" fill="#f25022"/>
    <rect x="1" y="11" width="9" height="9" fill="#00a4ef"/>
    <rect x="11" y="1" width="9" height="9" fill="#7fba00"/>
    <rect x="11" y="11" width="9" height="9" fill="#ffb900"/>
  </svg>
);

// --- Background Pattern Component ---
const MathBackground = () => {
  const equations = [
    "∫ e^x dx = e^x + C", "∇ × E = -∂B/∂t", "E = mc²", 
    "a² + b² = c²", "F = ma", "lim (x→0) sin(x)/x = 1",
    "∑ n=1 to ∞ 1/n² = π²/6", "i² = -1", "e^(iπ) + 1 = 0",
    "f'(x) = nx^(n-1)", "log(xy) = log(x) + log(y)"
  ];

  // Store the random styles in state so server and client match
  const [styles, setStyles] = useState<{ transform: string; marginTop: string; marginLeft: string }[]>([]);

  // Only generate random numbers AFTER the page mounts on the client
  React.useEffect(() => {
    const generatedStyles = Array.from({ length: 40 }).map(() => ({
      transform: `rotate(${Math.random() * 40 - 20}deg)`,
      marginTop: `${Math.random() * 10}vh`,
      marginLeft: `${Math.random() * 10}vw`,
    }));
    setStyles(generatedStyles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none flex flex-wrap gap-12 p-8 opacity-[0.08] text-white/50 text-xl font-serif">
      {/* Decorative gradient glowing orb */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />
      
      {/* Scattered Equations */}
      {styles.map((style, i) => (
        <div 
          key={i} 
          className="whitespace-nowrap transition-opacity duration-1000"
          style={style}
        >
          {equations[i % equations.length]}
        </div>
      ))}
    </div>
  );
};

// --- Main App Component ---
export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  
  // Dev B will hook this state up to Supabase error responses tomorrow
  const [hasError, setHasError] = useState(false);

  // Styles based on error state
  const inputBaseStyle = "w-full bg-slate-950/50 border rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-all duration-300";
  const inputNormalStyle = "border-slate-800 focus:border-blue-500/50 focus:ring-blue-500/50 hover:border-slate-700";
  const inputErrorStyle = "border-red-500/50 focus:border-red-500/80 focus:ring-red-500/50 bg-red-950/10";

  const getStyle = () => hasError ? inputErrorStyle : inputNormalStyle;

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 sm:p-8 font-sans relative">
      
      {/* Safe back button to Landing Page */}
      <Link href="/" className="absolute top-8 left-8 text-slate-500 hover:text-white transition-colors z-20 font-medium text-sm">
        &larr; Back home
      </Link>

      <MathBackground />

      {/* Main Glassmorphic Card */}

    {/* --- THE GLOWING AMBIENT LIGHT --- */}
      <div className="relative w-full max-w-md z-10">
        {/* This creates the colorful light that forces the glass to show up */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[120%] bg-gradient-to-tr from-blue-600/30 to-purple-600/30 blur-[80px] rounded-full pointer-events-none"></div>

        {/* --- THE FROSTED GLASS CARD --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full p-8 sm:p-10 bg-slate-900/40 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
        >

        {/* 1. Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-500/10 text-blue-400 rounded-xl mb-5 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
            <FunctionSquare size={24} strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">
            {isLogin ? 'Welcome to MathCanvas' : 'Create an Account'}
          </h1>
          <p className="text-sm text-slate-400">
            Sign in to visual creativity and clarity.
          </p>
        </div>

        {/* Error Notification */}
        {hasError && (
          <motion.div 
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
            className="flex items-center gap-2 p-3 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg"
          >
            <AlertCircle size={16} />
            <span>Invalid email or password. Please try again.</span>
          </motion.div>
        )}

        {/* 2. Form Inputs */}
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-300">
              Email Address
            </label>
            <div className="relative">
              <Mail className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${hasError ? 'text-red-400/70' : 'text-slate-500'} transition-colors`} size={18} />
              <input 
                type="email" 
                placeholder="you@example.com"
                className={`${inputBaseStyle} ${getStyle()}`}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-slate-300">
                Password
              </label>
              {isLogin && (
                <Link href="#" className="text-xs font-medium text-slate-400 hover:text-blue-400 transition-colors">
                  Forgot Password?
                </Link>
              )}
            </div>
            <div className="relative">
              <Lock className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${hasError ? 'text-red-400/70' : 'text-slate-500'} transition-colors`} size={18} />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••"
                className={`${inputBaseStyle} ${getStyle()} pr-10`}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* 3. Primary Action */}
          <button 
            type="submit"
            className="w-full mt-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg py-2.5 font-medium transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] active:scale-[0.98]"
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        {/* 4. Divider */}
        <div className="relative flex items-center py-6">
          <div className="flex-grow border-t border-slate-800"></div>
          <span className="flex-shrink-0 mx-4 text-xs font-medium text-slate-500 uppercase tracking-wider">
            or continue with
          </span>
          <div className="flex-grow border-t border-slate-800"></div>
        </div>

        {/* 5. Social Logins */}
        <div className="space-y-3">
          <button className="w-full flex items-center justify-center gap-3 bg-transparent border border-slate-700 hover:bg-slate-800/60 hover:border-slate-600 text-slate-300 hover:text-white rounded-lg py-2.5 text-sm font-medium transition-all duration-300">
            <GoogleIcon className="w-4 h-4" />
            Continue with Google
          </button>
          <button className="w-full flex items-center justify-center gap-3 bg-transparent border border-slate-700 hover:bg-slate-800/60 hover:border-slate-600 text-slate-300 hover:text-white rounded-lg py-2.5 text-sm font-medium transition-all duration-300">
            <MicrosoftIcon className="w-4 h-4" />
            Continue with Microsoft
          </button>
        </div>

        {/* 6. Footer Toggle */}
        <p className="mt-8 text-center text-sm text-slate-400">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            type="button" 
            onClick={() => setIsLogin(!isLogin)} 
            className="text-blue-500 hover:text-blue-400 font-medium transition-colors"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </motion.div>

      {/* Dev Note: Toggle for testing Error UI constraint */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setHasError(!hasError)}
          className={`px-3 py-1.5 rounded text-xs font-medium backdrop-blur-md border transition-colors ${
            hasError 
              ? 'bg-red-500/20 border-red-500/50 text-red-300 hover:bg-red-500/30' 
              : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800'
          }`}
        >
          Toggle Error State: {hasError ? 'ON' : 'OFF'}
        </button>
      </div>
      </div>
    </div>
  );
}