const fs = require('fs');

async function main() {
  const res = await fetch('http://localhost:4001/upes/');
  const text = await res.text();
  const styleMatch = text.match(/<style[^>]*id="landing-custom-css-upes"[^>]*>([\s\S]*?)<\/style>/);
  if (styleMatch) {
    const css = styleMatch[1];
    const regex = /[^{}]*compare[^{}]*\{[^{}]*\}/gi;
    let match;
    while ((match = regex.exec(css)) !== null) {
      console.log('--- COMPARE CSS MATCH ---');
      console.log(match[0].trim());
    }
  }
}

main();
