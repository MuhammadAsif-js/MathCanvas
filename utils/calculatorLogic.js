// File: utils/calculatorLogic.js
import { evaluate, format } from 'mathjs';

export function calculateDocument(textBlocks) {
  const scope = {};
  const results = [];

  for (const line of textBlocks) {
    // If the line is empty, skip the math and return empty
    if (!line || line.trim() === '') {
      results.push('');
      continue;
    }
    
    try {
      const result = evaluate(line, scope);
      
      // math.js returns Infinity for divide by zero, let's catch that specifically
      if (result === Infinity || result === -Infinity) {
        results.push('Div by 0');
      } 
      // Handle physical units (like 10 m)
      else if (typeof result === 'object' && result !== null) {
        results.push(result.toString()); 
      } 
      // Handle standard numbers (like 10)
      else if (result !== undefined && typeof result !== 'function') {
        results.push(format(result, { precision: 14 })); 
      } 
      else {
        results.push(''); 
      }
      
    } catch (error) {
      // ----------------------------------------------------
      // THE OOPS-PROOFING LOGIC
      // ----------------------------------------------------
      const msg = error.message || '';
      
      if (msg.includes('Units do not match')) {
        results.push('Unit Mismatch');
      } 
      else if (msg.includes('Unexpected end of expression') || msg.includes('Undefined symbol')) {
        // The user is mid-typing (e.g., "10 + " or "re" before finishing "rent"), stay quiet
        results.push('...');
      } 
      else {
        // Catch-all for any other weird syntax typos
        results.push('Error');
      }
    }
  }
  
  return results; 
}