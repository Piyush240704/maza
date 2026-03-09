const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const flavors = [
    { name: 'chocolate', inputDir: path.join(__dirname, '../src/choclate') },
    { name: 'pomegranate', inputDir: path.join(__dirname, '../src/pomegranate') },
];

(async () => {
    for (const { name, inputDir } of flavors) {
        const outputDir = path.join(__dirname, `../public/images/${name}`);

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Clean old placeholder files
        const existing = fs.readdirSync(outputDir).filter(f => f.endsWith('.webp'));
        for (const f of existing) {
            fs.unlinkSync(path.join(outputDir, f));
        }

        const files = fs.readdirSync(inputDir)
            .filter(f => f.endsWith('.jpg'))
            .sort((a, b) => a.localeCompare(b));

        const targetFiles = files.slice(0, 200);

        console.log(`Converting ${targetFiles.length} frames for ${name}...`);
        for (let i = 0; i < targetFiles.length; i++) {
            const src = path.join(inputDir, targetFiles[i]);
            const dest = path.join(outputDir, `${i + 1}.webp`);
            try {
                await sharp(src).webp({ quality: 80 }).toFile(dest);
            } catch (err) {
                console.error(`Error converting ${src}`, err);
            }
        }
        console.log(`✅ ${name} done.`);
    }
    console.log('\n🎉 All conversions complete!');
})();
