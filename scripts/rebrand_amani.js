const fs = require('fs');
const path = require('path');

const replacements = [
  // Emails
  ['concierge@amanioutfits.com', 'concierge@amanioutfits.com'],
  ['support@amanioutfits.com', 'support@amanioutfits.com'],
  ['info@amanioutfits.com', 'info@amanioutfits.com'],
  
  // Specific case-sensitive matches
  ['Amani Outfits', 'Amani Outfits'],
  ['AmaniOutfits', 'AmaniOutfits'],
  ['AMANI OUTFITS', 'AMANI OUTFITS'],
  ['amanioutfits-app', 'amanioutfits-app'],
  ['amanioutfits.com', 'amanioutfits.com'],
  ['AmaniOutfits.com', 'AmaniOutfits.com'],
  ['amani-outfits', 'amani-outfits'],
  ['amanioutfits', 'amanioutfits'],
];

const extensions = ['.ts', '.tsx', '.js', '.jsx', '.json', '.yml', '.yaml', '.md', '.css', '.html', '.env', '.local', '.dockerignore'];
const fileNames = ['Dockerfile', 'docker-compose.yml', '.env.local'];

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    // Skip version control and build folders
    if (stat.isDirectory() && file !== 'node_modules' && file !== '.next' && file !== '.git') {
      walkDir(fullPath);
    } else if (stat.isFile()) {
      const ext = path.extname(file);
      const isTargetFile = extensions.includes(ext) || fileNames.includes(file);
      
      // Specifically skip bd-locations.ts to avoid renaming geographic "Ruma"
      if (file === 'bd-locations.ts') {
        return;
      }
      
      // Skip binary/lock files
      if (file === 'package-lock.json') {
        return;
      }
      
      if (isTargetFile) {
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
    }
  });
}

console.log('Starting rebranding to Amani Outfits...');
walkDir(process.cwd());
console.log('\nDone! All branding updated.');
