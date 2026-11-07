const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\acer\\.gemini\\antigravity\\brain\\78454ffa-1ebd-425b-8895-bf7fd0adbeb4';
const destDir = 'C:\\Users\\acer\\Desktop\\watch-project\\frontend\\public\\watches';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

fs.readdirSync(srcDir).forEach(file => {
  if (file.endsWith('.png') || file.endsWith('.jpg')) {
    const srcPath = path.join(srcDir, file);
    let destName = file;
    // Map complicated artifact names to simple names
    if (file.includes('omega_speedmaster')) destName = 'omega.png';
    else if (file.includes('audemars_piguet')) destName = 'ap.png';
    else if (file.includes('1775021312170')) destName = 'cartier.jpg';
    else if (file.includes('1775021681964')) destName = 'rolex-sub.png';
    else if (file.includes('1775017832288')) destName = 'patek-vintage.png';

    fs.copyFileSync(srcPath, path.join(destDir, destName));
    console.log(`Copied ${file} to ${destName}`);
  }
});
