"use client";

import { EditorShell } from '../../components/EditorShell';
import { DocumentEditor } from '../../components/DocumentEditor';

export default function Home() {
  return (
    <EditorShell documentTitle="My First MathCanvas">
      
      {/* This actually loads the TipTap engine into the UI! */}
      <DocumentEditor />
      
    </EditorShell>
  );
}