const fs = require('fs');

async function main() {
  const res = await fetch('https://distanceeducationschool.com/upes/');
  const html = await res.text();
  
  // Find linked css files
  const linkMatches = [...html.matchAll(/<link[^>]+href=["']([^"']+\.css[^"']*)["']/gi)];
  console.log('Linked CSS:');
  linkMatches.forEach(m => console.log(m[1]));

  // Find course cards in html
  const idx = html.indexOf('card-box');
  if (idx !== -1) {
    console.log('--- FOUND card-box ---');
    console.log(html.substring(Math.max(0, idx - 100), idx + 800));
  } else {
    // search for 'Master of Business Administration'
    const idxMba = html.indexOf('Master of Business Administration');
    if (idxMba !== -1) {
      console.log('--- FOUND MBA ---');
      console.log(html.substring(Math.max(0, idxMba - 400), idxMba + 600));
    }
  }

  // Fetch the main css file
  for (const m of linkMatches) {
    const href = m[1];
    if (href.includes('style') || href.includes('main') || href.includes('custom') || !href.includes('bootstrap')) {
      const cssUrl = href.startsWith('http') ? href : 'https://distanceeducationschool.com/upes/' + href;
      console.log('Fetching CSS:', cssUrl);
      try {
        const cssRes = await fetch(cssUrl);
        const css = await cssRes.text();
        const durationMatch = css.match(/[^{}]*(?:duration|badge|card-box|card_box)[^{}]*\{[^}]*\}/gi);
        if (durationMatch) {
          console.log('--- MATCHING CSS in', cssUrl, '---');
          durationMatch.forEach(dm => console.log(dm.trim()));
        }
      } catch (err) {
        console.error('Failed to fetch', cssUrl, err);
      }
    }
  }
}

main();
