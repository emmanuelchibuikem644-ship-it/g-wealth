import fs from 'fs';
const filePath = 'src/app/properties/page.js';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');
// Keep lines 1-151 (0-indexed: 0-150) and from line 229 onwards (0-indexed: 228)
// Remove the orphaned broken code (lines 152-228, 0-indexed: 151-227)
const cleaned = [...lines.slice(0, 151), '', ...lines.slice(228)];
fs.writeFileSync(filePath, cleaned.join('\n'));
console.log('Fixed! Before:', lines.length, 'lines, After:', cleaned.length, 'lines');