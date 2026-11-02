const fs = require('fs');

const menuCss = fs.readFileSync('scratch/menu.css', 'utf8');
console.log('=== MENU CSS ===\n', menuCss.substring(0, 1500));

const formCss = fs.readFileSync('scratch/form.css', 'utf8');
console.log('\n=== FORM CSS ===\n', formCss.substring(0, 1500));
