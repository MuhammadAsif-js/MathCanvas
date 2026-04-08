import { Node, mergeAttributes, nodeInputRule } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import MathBlockComponent from '../components/MathBlockComponent'; 

// The magic regex: Looks for "/math" followed by a space
const mathInputRegex = /(?:^|\s)\/math\s$/;

export default Node.create({
  name: 'mathBlock',

  group: 'block',
  atom: true, 

  addAttributes() {
    return {
      content: {
        default: '', 
      },
      result: {
        default: '', 
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'math-block',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['math-block', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(MathBlockComponent);
  },

  // THIS IS THE NEW PART
  addInputRules() {
    return [
      nodeInputRule({
        find: mathInputRegex,
        type: this.type,
      }),
    ];
  },
});