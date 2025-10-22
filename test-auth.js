const http = require('http');

const data = JSON.stringify({
  action: 'login',
  email: 'admin@yegnabiz.com',
  password: 'admin2024'
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/auth',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  console.log('Status:', res.statusCode);
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log('Response:', body.substring(0, 200) + (body.length > 200 ? '...' : ''));
  });
});

req.on('error', (e) => {
  console.error('Error:', e.message);
});

req.write(data);
req.end();
