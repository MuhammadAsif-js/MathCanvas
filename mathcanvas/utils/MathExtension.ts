import { Node, mergeAttributes, nodeInputRule } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import MathBlockComponent from '../components/MathBlockComponent';

/**
 * MathBlock Extension
 * * A custom TipTap block node for rendering mathematical equations.
 * Triggered by typing '/math ' at the start of a line.
 */
export const MathExtension = Node.create({
  name: 'mathBlock',

  group: 'block',

  atom: true,

  addAttributes() {
    return {
      content: {
        default: '',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="math-block"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'math-block' }), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(MathBlockComponent);
  },

  addInputRules() {
    return [
      nodeInputRule({
        /**
         * Matches '/math ' at the start of a line.
         * The slash is escaped, and \s matches the trailing space.
         */
        find: /^\/math\s$/,
        type: this.type,
        getAttributes: (match) => {
          return {
            content: '',
          };
        },
      }),
    ];
  },
});

export default MathExtension;