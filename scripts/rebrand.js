const fs = require('fs');
const path = require('path');

const replacements = [
  ['x Apparels Atelier', 'Amani Outfits Atelier'],
  ['x Apparels Boutique', 'Amani Outfits Boutique'],
  ['x Apparels Curators', 'Amani Outfits Curators'],
  ['x Apparels Intelligence', 'Amani Outfits Intelligence'],
  ['x Apparels Editorial', 'Amani Outfits Editorial'],
  ['x Apparels Assistant', 'Amani Outfits Assistant'],
  ['x Apparels CO.', 'Amani Outfits CO.'],
  ['x Apparels Team', 'Amani Outfits Team'],
  ['x Apparels AI', 'Amani Outfits AI'],
  ['x Apparelsr', 'Amani Outfits'],  // typo fix in manifest.ts
  ['x Apparels', 'Amani Outfits'],
  ['xApparels', 'AmaniOutfits'],
  ['xapparels.com', 'amanioutfits.com'],
  ['xapparels', 'amanioutfits'],
];

const extensions = ['.ts', '.tsx', '.js', '.jsx'];

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory() && file !== 'node_modules' && file !== '.next') {
      walkDir(fullPath);
    } else if (stat.isFile() && extensions.includes(path.extname(file))) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let original = content;
      for (const [from, to] of replacements) {
        content = content.split(from).join(to);
      }
      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Updated:', fullPath.replace(process.cwd() + path.sep, ''));
      }
    }
  });
}

walkDir(path.join(process.cwd(), 'src'));
console.log('\nDone! All branding updated.');
