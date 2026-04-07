import React from 'react';
import { NodeViewWrapper } from '@tiptap/react';

export default function MathBlockComponent(props: any) {
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.updateAttributes({
      content: e.target.value,
    });
  };

return (
    <NodeViewWrapper 
      className="math-block bg-gray-100 p-2 rounded-md my-2 flex items-center shadow-sm"
      contentEditable={false} // <-- THIS TELLS TIPTAP TO BACK OFF
    >
      <input
        className="bg-transparent border-none outline-none flex-grow font-mono text-gray-800 placeholder-gray-400"
        type="text"
        placeholder="Type math here (e.g., rent = 1200)"
        value={props.node.attrs.content || ''}
        onChange={handleInputChange}
        onKeyDown={(e) => e.stopPropagation()} 
        onClick={(e) => e.stopPropagation()} // <-- PREVENTS CLICKS FROM LEAKING OUT
      />
      
      <div className="ml-4 font-mono font-bold text-blue-600 min-w-[3rem] text-right">
        = {props.node.attrs.result || '???'}
      </div>
    </NodeViewWrapper>
  );
}