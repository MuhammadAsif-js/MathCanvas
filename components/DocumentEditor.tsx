"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import MathExtension from '../utils/MathExtension';
import { calculateDocument } from '../utils/calculatorLogic';
import { updateDocumentContent } from '../lib/database';

interface DocumentEditorProps {
  docId: string;
  initialContent?: string;
  onSaveStatusChange?: (status: 'saved' | 'saving' | 'unsaved') => void;
}

export const DocumentEditor = ({ docId, initialContent = '<p></p>', onSaveStatusChange }: DocumentEditorProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    // Load the existing math from the database!
    content: initialContent || '<p></p>', 

    editorProps: {
      attributes: {
        class: 'ProseMirror prose prose-stone max-w-none w-full focus:outline-none min-h-[80vh] leading-relaxed',
      },
    },
    
    onUpdate: ({ editor }) => {
      // 1. Instantly tell the UI we have unsaved changes
      if (onSaveStatusChange) onSaveStatusChange('unsaved');

      // --- DEV B's MATH LOGIC ---
      const mathNodes: { pos: number; content: string; result: string }[] = [];
      editor.state.doc.descendants((node, pos) => {
        if (node.type.name === 'mathBlock') {
          mathNodes.push({ pos, content: node.attrs.content || '', result: node.attrs.result || '' });
        }
      });

      const expressions = mathNodes.map((n) => n.content);
      const mathAnswers = calculateDocument(expressions);

      let tr = editor.state.tr;
      let modified = false;

      mathNodes.forEach((node, index) => {
        const newResult = mathAnswers[index] || '';
        if (node.result !== newResult) {
          const currentAttrs = editor.state.doc.nodeAt(node.pos)?.attrs;
          tr = tr.setNodeMarkup(node.pos, undefined, { ...currentAttrs, result: newResult });
          modified = true;
        }
      });

      if (modified) editor.view.dispatch(tr);

      // --- AUTO SAVE LOGIC (DEBOUNCING) ---
      // Clear the previous timer if they are still typing
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      
      // Wait 1.5 seconds after they stop typing, then save to Supabase
      saveTimeoutRef.current = setTimeout(async () => {
        if (onSaveStatusChange) onSaveStatusChange('saving');
        try {
          await updateDocumentContent(docId, editor.getHTML());
          if (onSaveStatusChange) onSaveStatusChange('saved');
        } catch (error) {
          console.error("Auto-save failed:", error);
          if (onSaveStatusChange) onSaveStatusChange('unsaved'); // Keep it unsaved if it failed
        }
      }, 1500);
    },
  });

  if (!isMounted) return <div className="text-slate-500 animate-pulse">Loading engine...</div>;

  return (
    <div 
      className="w-full cursor-text" 
      onClick={(e) => {
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