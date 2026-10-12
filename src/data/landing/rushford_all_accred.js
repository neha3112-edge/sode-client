const https = require('https');

https.get('https://distanceeducationschool.com/rushford/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const idx = data.indexOf('class="b2-info"');
    if (idx !== -1) {
      console.log(data.substring(idx, idx + 2500));
    }
  });
});
