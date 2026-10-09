const fs = require('fs');

const html = fs.readFileSync('scratch_mu_live.html', 'utf8');

// Find all comments or major sections
const matches = html.match(/<!--.*?-->|<section[^>]*>|<header[^>]*>|<div[^>]*class=["'][^"']*(?:banner|hero|header|about|course|why|recruit|process|faq|footer)[^"']*["']/gi) || [];
console.log('Sections/landmarks:');
matches.forEach(m => console.log(m.substring(0, 150)));

// Extract embedded styles
const styleMatches = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)];
console.log('\nFound ' + styleMatches.length + ' style blocks.');
fs.writeFileSync('scratch/live_styles.css', styleMatches.map(m => m[1]).join('\n\n/* ============ NEW STYLE BLOCK ============ */\n\n'));
console.log('Wrote styles to scratch/live_styles.css');
