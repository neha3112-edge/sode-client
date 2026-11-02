const https = require('https');

https.get('https://distanceeducationschool.com/iim/assets/css/style.css', res => {
  let css = '';
  res.on('data', d => css += d);
  res.on('end', () => {
    const lines = css.split('\n');
    lines.forEach((line, idx) => {
      if (line.includes('custom_img_section') || line.includes('banner') || line.includes('hero-section')) {
        console.log(`--- Match at line ${idx + 1} ---`);
        console.log(lines.slice(Math.max(0, idx - 4), Math.min(lines.length, idx + 20)).join('\n'));
      }
    });
  });
});
