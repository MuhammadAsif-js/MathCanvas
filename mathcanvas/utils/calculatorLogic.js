// File: utils/calculatorLogic.js
import { evaluate, format } from 'mathjs';

export function calculateDocument(textBlocks) {
  const scope = {};
  const results = [];

  for (const line of textBlocks) {
    if (!line || line.trim() === '') {
      results.push('');
      continue;
    }
    try {
      const result = evaluate(line, scope);
      if (typeof result === 'object' && result !== null) {
          results.push(result.toString()); 
      } else if (result !== undefined && typeof result !== 'function') {
          results.push(format(result, { precision: 14 })); 
      } else {
          results.push(''); 
      }
    } catch (error) {
      results.push(`Error: ${error.message}`);
    }
  }
  return results; 
}