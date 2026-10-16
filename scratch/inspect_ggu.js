const fs = require('fs');

async function main() {
  const res = await fetch('https://distanceeducationschool.com/ggu/');
  const html = await res.text();
  
  const idx = html.indexOf('Still Confused?');
  if (idx !== -1) {
    console.log('--- COMPARE SECTION ---');
    console.log(html.substring(idx - 300, idx + 600));
  } else {
    console.log('Still Confused not found in HTML');
  }

  const logoIdx = html.indexOf('School Of Online & Distance Education');
  if (logoIdx !== -1) {
    console.log('--- FOOTER LOGO ---');
    console.log(html.substring(logoIdx - 400, logoIdx + 400));
  } else {
    const desIdx = html.indexOf('Distance Education School');
    if (desIdx !== -1) {
      console.log('--- FOOTER LOGO (DES) ---');
      console.log(html.substring(desIdx - 400, desIdx + 400));
    }
  }
}

main();
