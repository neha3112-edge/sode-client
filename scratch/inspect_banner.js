const fs = require('fs');

async function main() {
  const res = await fetch('https://distanceeducationschool.com/upes/');
  const html = await res.text();

  const idx = html.indexOf('Turn Your Dreams');
  if (idx !== -1) {
    console.log('=== BANNER HTML ===');
    console.log(html.substring(Math.max(0, idx - 500), idx + 1800));
  }

  // Fetch style.css
  const cssRes = await fetch('https://distanceeducationschool.com/upes/style.css');
  const css = await cssRes.text();

  console.log('=== BANNER CSS ===');
  const bannerRules = css.match(/[^{}]*(?:banner|courses|btn1|custom_img_section)[^{}]*\{[^}]*\}/gi);
  if (bannerRules) {
    bannerRules.forEach(r => console.log(r.trim()));
  }

  // Media queries for banner
  console.log('=== BANNER MEDIA QUERIES ===');
  const mqMatches = [...css.matchAll(/@media[^{]+\{([\s\S]+?\}(?:\s*\})?)/gi)];
  for (const mq of mqMatches) {
    if (mq[0].includes('banner') || mq[0].includes('courses') || mq[0].includes('btn1')) {
      console.log('--- MQ BLOCK ---');
      console.log(mq[0]);
    }
  }
}

main();
