"use client";

import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import MathExtension from '../utils/MathExtension';
import { calculateDocument } from '../utils/calculatorLogic';

export const DocumentEditor = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Type /math to calculate...',  
      }),
      MathExtension,
    ],
    // Clean, empty paragraph so the placeholder text shows up
    content: '<p></p>', 

  

    editorProps: {
      attributes: {
        class: 'ProseMirror prose prose-stone max-w-none w-full focus:outline-none min-h-[80vh] leading-relaxed',
      },
    },
    
    onUpdate: ({ editor }) => {
      const mathNodes: { pos: number; content: string; result: string }[] = [];
      
      editor.state.doc.descendants((node, pos) => {
        if (node.type.name === 'mathBlock') {
          mathNodes.push({ 
            pos, 
            content: node.attrs.content || '', 
            result: node.attrs.result || '' 
          });
        }
      });

      // Extract array of strings for Dev B's math engine
      const expressions = mathNodes.map((n) => n.content);
      
      // Dev B's engine processes the array and returns an array of answers
      const mathAnswers = calculateDocument(expressions);

      let tr = editor.state.tr;
      let modified = false;

      mathNodes.forEach((node, index) => {
        const newResult = mathAnswers[index] || '';
        
        // Only update if the result actually changed to prevent UI glitches
        if (node.result !== newResult) {
          const currentAttrs = editor.state.doc.nodeAt(node.pos)?.attrs;
          tr = tr.setNodeMarkup(node.pos, undefined, { ...currentAttrs, result: newResult });
          modified = true;
        }
      });

      // Dispatch the update silently so the user's text cursor doesn't jump
      if (modified) editor.view.dispatch(tr);
    },
  });

  if (!isMounted) return <div className="text-gray-400">Loading engine...</div>;

return (
    <div 
      className="w-full cursor-text" 
      onClick={(e) => {
        // Only focus the end if they clicked the empty wrapper, not inner elements
        if (e.target === e.currentTarget) {
          editor?.chain().focus('end').run();
        }
      }}
    >
      <EditorContent editor={editor} className="min-h-[80vh] w-full" />
    </div>
  );
};

export default DocumentEditor;