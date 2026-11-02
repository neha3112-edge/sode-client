const https = require('https');
https.get('https://distanceeducationschool.com/iim/', (res) => {
  let data = '';
  res.on('data', d => data += d);
  res.on('end', () => {
    const links = data.match(/<link[^>]+rel=["']stylesheet["'][^>]*>/gi) || [];
    console.log('Stylesheets:', links);
  });
});
