import React from 'react';
import { NodeViewWrapper } from '@tiptap/react';

export default function MathBlockComponent(props: any) {
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.updateAttributes({
      content: e.target.value,
    });
  };

  // 1. Check if the engine handed us an error message
  const resultText = props.node.attrs.result || '';
  const isError = resultText === 'Error' || resultText === 'Unit Mismatch' || resultText === 'Div by 0';

  return (
    <NodeViewWrapper 
      // 2. Premium glassmorphism container with glowing error states
      className={`math-block p-1 rounded-xl my-3 flex items-stretch shadow-lg transition-all duration-300 backdrop-blur-sm border group ${
        isError 
          ? 'bg-red-500/10 border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.1)]' 
          : 'bg-slate-900/60 border-slate-700/50 focus-within:border-blue-500/50 focus-within:shadow-[0_0_15px_rgba(37,99,235,0.15)]'
      }`}
      contentEditable={false} // <-- THIS TELLS TIPTAP TO BACK OFF
    >
      
      {/* 3. The Input Area */}
      <div className="flex-grow flex items-center px-3 py-2">
        <span className="text-slate-600 font-mono mr-3 select-none text-sm group-focus-within:text-blue-500 transition-colors">❯</span>
        <input
          className={`bg-transparent border-none outline-none w-full font-mono text-sm tracking-wide placeholder-slate-600 transition-colors ${
            isError ? 'text-red-300' : 'text-slate-200 focus:text-white'
          }`}
          type="text"
          placeholder="e.g., rent = 1200"
          value={props.node.attrs.content || ''}
          onChange={handleInputChange}
          onKeyDown={(e) => e.stopPropagation()} 
          onClick={(e) => e.stopPropagation()} // <-- PREVENTS CLICKS FROM LEAKING OUT
        />
      </div>
      
      {/* 4. The Answer Panel (Only shows if there is a result) */}
      <div className={`px-4 flex items-center justify-end font-mono font-bold text-sm tracking-wider min-w-[5rem] rounded-lg border-l transition-colors ${
        isError 
          ? 'text-red-400 border-red-500/20 bg-red-500/5' 
          : 'text-blue-400 border-slate-700/50 bg-slate-800/50'
      }`}>
        {resultText ? `= ${resultText}` : ''}
      </div>

    </NodeViewWrapper>
  );
}