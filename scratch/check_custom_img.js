const https = require('https');

https.get('https://distanceeducationschool.com/iim/assets/css/style.css', res => {
  let css = '';
  res.on('data', d => css += d);
  res.on('end', () => {
    const lines = css.split('\n');
    lines.forEach((line, idx) => {
      if (line.includes('custom_img_section')) {
        console.log(`--- custom_img_section at line ${idx + 1} ---`);
        console.log(lines.slice(Math.max(0, idx - 4), Math.min(lines.length, idx + 15)).join('\n'));
      }
    });
  });
});
