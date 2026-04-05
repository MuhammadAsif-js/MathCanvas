import { evaluate } from 'mathjs';

export function calculateDocument(textBlocks) {
  // 1. Create an empty memory box for variables (like x = 10)
  let scope = {};
  
  // 2. Create an empty list for the final answers
  let results = [];

  // 3. Loop through every line your partner sends us
  for (let i = 0; i < textBlocks.length; i++) {
    let line = textBlocks[i];

    // 4. Ignore empty lines so the UI doesn't get messed up
    if (!line || line.trim() === '') {
      results.push('');
      continue;
    }

    try {
      // 5. Do the math!
      let result = evaluate(line, scope);
      
      // 6. Format the answer nicely
      if (typeof result === 'object' && result !== null) {
          results.push(result.toString()); // For units like '5 cm'
      } else if (result !== undefined && typeof result !== 'function') {
          results.push(String(result)); // For normal numbers
      } else {
          results.push(''); // For variable setups like 'x = 5'
      }
    } catch (error) {
      // 7. Catch bad math nicely instead of crashing the app
      results.push(`Error: ${error.message}`);
    }
  }

  // 8. Send the answers back to the frontend
  return results; 
}
