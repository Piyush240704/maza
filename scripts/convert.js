const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = '/tmp/MangoJuiceBackup';
const outputDir = path.join(__dirname, '../public/images/mango');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(inputDir)
  .filter(f => f.endsWith('.jpg'))
  .sort((a, b) => a.localeCompare(b)); // ezgif-frame-001.jpg etc.

// Only take first 120
const targetFiles = files.slice(0, 120);

(async () => {
  console.log(`Converting ${targetFiles.length} files...`);
  for (let i = 0; i < targetFiles.length; i++) {
    const src = path.join(inputDir, targetFiles[i]);
    const dest = path.join(outputDir, `${i + 1}.webp`);
    try {
      await sharp(src).webp({ quality: 80 }).toFile(dest);
    } catch (err) {
      console.error(`Error converting ${src}`, err);
    }
  }
  console.log('Conversion complete!');
})();
