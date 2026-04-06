"use client";

import React from 'react';
import { NodeViewWrapper } from '@tiptap/react';

const MathBlockComponent = ({ node, updateAttributes }: any) => {
  return (
    // We MUST use NodeViewWrapper here, otherwise TipTap ignores it
    <NodeViewWrapper className="math-block">
      <div className="bg-slate-100 rounded p-3 my-4 border-l-4 border-blue-500 flex items-center gap-3 shadow-sm transition-all focus-within:ring-2 focus-within:ring-blue-200">
        
        {/* Input area for the math formula */}
        <input 
          type="text" 
          className="bg-transparent focus:outline-none flex-1 text-slate-800 font-mono text-sm"
          placeholder="Enter equation (e.g. 50 + 50)..."
          value={node.attrs.content}
          onChange={(e) => updateAttributes({ content: e.target.value })}
        />
        
        {/* Hardcoded result span for Day 3 */}
        <span className="font-bold text-slate-700 whitespace-nowrap bg-white px-2 py-1 rounded shadow-sm border border-slate-200">
          = 999
        </span>
      </div>
    </NodeViewWrapper>
  );
};

export default MathBlockComponent;