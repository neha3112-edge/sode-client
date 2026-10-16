const fs = require('fs');

const css = fs.readFileSync('scratch/style6.css', 'utf8');
console.log('style6.css size:', css.length);

const keywords = ['top-banner', 'welcome', 'yellow', 'approvals', 'pro-hd', 'course', 'about', 'why', 'sode_about', 'apply-section', 'faq'];

keywords.forEach(kw => {
  const regex = new RegExp(`([^}]*${kw}[^}]*\\{[^}]*\\})`, 'gi');
  let match;
  let count = 0;
  console.log(`\n=== KEYWORD: ${kw} ===`);
  while ((match = regex.exec(css)) !== null && count < 4) {
    console.log(match[1].replace(/\s+/g, ' ').trim());
    count++;
  }
});
