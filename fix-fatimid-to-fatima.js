const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔄 Running Global Text Corrector: "Fatima" -> "Fatima"...');
console.log('---------------------------------------------------------');

const ignoreDirs = ['node_modules', '.git', '.expo', 'build', 'dist'];
const targetExtensions = ['.ts', '.tsx', '.json', '.js', '.jsx'];

let modifiedFilesCount = 0;

function scanAndReplace(dir) {
  const list = fs.readdirSync(dir);
  
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat && stat.isDirectory()) {
      if (!ignoreDirs.includes(file)) {
        scanAndReplace(filePath);
      }
    } else {
      const ext = path.extname(file).toLowerCase();
      if (targetExtensions.includes(ext)) {
        try {
          let content = fs.readFileSync(filePath, 'utf8');
          let isFileModified = false;

          // Replace "Fatima" -> "Fatima"
          if (content.includes('Fatima')) {
            content = content.replace(/Fatima/g, 'Fatima');
            isFileModified = true;
          }
          if (content.includes('fatima')) {
            content = content.replace(/fatima/g, 'fatima');
            isFileModified = true;
          }

          // Replace "فاطمہ" -> "فاطمہ"
          if (content.includes('فاطمہ')) {
            content = content.replace(/فاطمہ/g, 'فاطمہ');
            isFileModified = true;
          }

          if (isFileModified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Corrected File: ${path.relative(process.cwd(), filePath)}`);
            modifiedFilesCount++;
          }
        } catch (err) {
          // Ignore read/write errors
        }
      }
    }
  });
}

scanAndReplace(process.cwd());

if (modifiedFilesCount > 0) {
  console.log(`\n🎉 Done! Corrected ${modifiedFilesCount} files.`);
  
  // Push to GitHub
  try {
    console.log('Pushing text corrections to GitHub...');
    execSync('git add .', { stdio: 'inherit' });
    execSync('git commit -m "fix: globally correct Fatima to Fatima and فاطمہ to فاطمہ"', { stdio: 'inherit' });
    execSync('git push', { stdio: 'inherit' });
    console.log('🚀 Successfully pushed corrections to GitHub!');
  } catch (err) {
    console.warn('⚠️ Git push failed, please push manually.');
  }
} else {
  console.log('\nℹ️ No occurrences of "Fatima" or "فاطمہ" were found in your files.');
}