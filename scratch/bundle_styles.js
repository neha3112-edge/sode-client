const fs = require('fs');

const css = fs.readFileSync('scratch/style6.css', 'utf8');

// Also load live_styles.css
const liveStyles = fs.readFileSync('scratch/live_styles.css', 'utf8');

// Combine and write a clean, well-formatted reference CSS file
fs.writeFileSync('scratch/all_mu_styles.css', '/* === LIVE STYLES IN HTML === */\n' + liveStyles + '\n\n/* === STYLE6.CSS === */\n' + css, 'utf8');
console.log('Saved scratch/all_mu_styles.css');
