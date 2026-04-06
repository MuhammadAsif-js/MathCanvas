import { EditorShell } from '@/components/EditorShell';
import { DocumentEditor } from '@/components/DocumentEditor';

export default function Home() {
  return (
    <EditorShell>
      <DocumentEditor />
    </EditorShell>
  );
}
