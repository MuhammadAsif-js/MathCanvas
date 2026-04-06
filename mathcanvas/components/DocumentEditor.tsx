"use client";

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import MathExtension from '../utils/MathExtension'; // <-- Here is your custom extension!

export const DocumentEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Type / for commands...',
      }),
      MathExtension, // <-- This is where extensions get registered in TipTap
    ],
    content: '',
    immediatelyRender: false, // Important for client-side rendering
    editorProps: {
      attributes: {
        // Tailwind classes applied directly to the TipTap editor instance
        class: 'prose prose-stone max-w-none w-full focus:outline-none min-h-screen',
      },
    },
    onUpdate: ({ editor }) => {
      // The REAL TipTap JSON export, no faking it!
      console.log('Document JSON Output:', editor.getJSON());
    },
  });

  return (
    <div className="w-full min-h-screen bg-white flex justify-center py-16 px-6 sm:px-12">
      <div className="w-full max-w-3xl relative">
        {/* TipTap completely replaces your manual <div> */}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default DocumentEditor;