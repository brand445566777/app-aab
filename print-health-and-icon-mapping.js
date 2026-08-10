const fs = require('fs');
const path = require('path');

const files = [
  'lib/icon-mapping.ts',
  'lib/icon-mapping.tsx',
  'lib/icon-mapping.js',
  'app/(tabs)/health-complaints.tsx',
  'app/(tabs)/health-complaints.ts',
];

console.log('🔍 Printing Icon Mapping & Healthcare Screen files...');
console.log('====================================================');

files.forEach(filePath => {
  const fullPath = path.join(process.cwd(), filePath);
  if (fs.existsSync(fullPath)) {
    console.log(`\n📄 FILE FOUND: ${filePath}`);
    console.log('--------------------------------------------------');
    const content = fs.readFileSync(fullPath, 'utf8');
    console.log(content);
    console.log('--------------------------------------------------\n');
  }
});