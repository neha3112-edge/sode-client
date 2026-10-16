const https = require('https');
https.get('https://distanceeducationschool.com/rushford/assets/css/style.css', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const re = /([^{}]*bnf[^{}]*\{[^}]*\})/gi;
    let m;
    while (m = re.exec(data)) {
      console.log(m[1].replace(/\s+/g, ' '));
    }
    const re2 = /([^{}]*black-btn[^{}]*\{[^}]*\})/gi;
    while (m = re2.exec(data)) {
      console.log(m[1].replace(/\s+/g, ' '));
    }
  });
});
