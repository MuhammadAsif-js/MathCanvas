import React from 'react';
import { NodeViewWrapper } from '@tiptap/react';

export default function MathBlockComponent(props: any) {
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.updateAttributes({
      content: e.target.value,
    });
  };

  // 1. Check if the engine handed us an error message
  const resultText = props.node.attrs.result || '???';
  const isError = resultText === 'Error' || resultText === 'Unit Mismatch' || resultText === 'Div by 0';

  return (
    <NodeViewWrapper 
      // 2. Conditionally swap out the background for a subtle red warning
      className={`math-block p-2 rounded-md my-2 flex items-center shadow-sm transition-colors ${
        isError ? 'bg-red-50 border border-red-300' : 'bg-gray-100 border border-transparent'
      }`}
      contentEditable={false} // <-- THIS TELLS TIPTAP TO BACK OFF
    >
      <input
        className={`bg-transparent border-none outline-none flex-grow font-mono placeholder-gray-400 ${
          isError ? 'text-red-900' : 'text-gray-800'
        }`}
        type="text"
        placeholder="Type math here (e.g., rent = 1200)"
        value={props.node.attrs.content || ''}
        onChange={handleInputChange}
        onKeyDown={(e) => e.stopPropagation()} 
        onClick={(e) => e.stopPropagation()} // <-- PREVENTS CLICKS FROM LEAKING OUT
      />
      
      {/* 3. Conditionally change the answer text to Red if it's broken */}
      <div className={`ml-4 font-mono font-bold min-w-[3rem] text-right ${
        isError ? 'text-red-600' : 'text-blue-600'
      }`}>
        = {resultText}
      </div>
    </NodeViewWrapper>
  );
}