const https = require('https');

https.get('https://unionradio.radioca.st/listen', (res) => {
  console.log('STATUS:', res.statusCode);
  console.log('HEADERS:', res.headers);
  res.destroy();
}).on('error', (e) => {
  console.error('ERROR:', e.message);
});

https.get('https://unionradio.radioca.st/', (res) => {
  console.log('ROOT STATUS:', res.statusCode);
  console.log('ROOT HEADERS:', res.headers);
  res.destroy();
}).on('error', (e) => {
  console.error('ROOT ERROR:', e.message);
});
