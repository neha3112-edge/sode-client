const https = require('https');

https.get('https://distanceeducationschool.com/iim/assets/css/style.css', res => {
  let css = '';
  res.on('data', d => css += d);
  res.on('end', () => {
    const rules = [];
    // extract media query max-width: 768px
    const m768Regex = /@media[^{]+max-width:\s*768px[^{]*\{([\s\S]*?)(?=@media|$)/gi;
    let m;
    while ((m = m768Regex.exec(css)) !== null) {
      rules.push(m[1]);
    }
    console.log('--- ALL @media (max-width: 768px) blocks ---');
    rules.forEach((block, idx) => {
      console.log(`=== BLOCK ${idx + 1} ===`);
      block.split('}').forEach(r => {
        if (r.includes('hero') || r.includes('banner') || r.includes('custom_img') || r.includes('form') || r.includes('achieve') || r.includes('t1')) {
          console.log(r.trim() + '}');
        }
      });
    });
  });
});
