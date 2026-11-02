const https = require('https');

https.get('https://distanceeducationschool.com/iim/assets/css/style.css', res => {
  let css = '';
  res.on('data', d => css += d);
  res.on('end', () => {
    // find all rules for #benefits
    const regex = /([^{}]*#benefits[^{]*)\{([^}]*)\}/gi;
    let m;
    while ((m = regex.exec(css)) !== null) {
      console.log('SELECTOR:', m[1].trim());
      console.log('RULES:\n' + m[2].trim());
      console.log('-------------------------');
    }
  });
});
