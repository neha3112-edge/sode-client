const http = require('http');
http.get('http://localhost:4001/iim/', res => {
  let html = '';
  res.on('data', d => html += d);
  res.on('end', () => {
    console.log('HTML length:', html.length);
    console.log('Has benefits id:', html.includes('id="benefits"'));
  });
});
