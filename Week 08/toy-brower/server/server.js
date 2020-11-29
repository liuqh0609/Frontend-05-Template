const { Buffer } = require('buffer');
const http = require('http');

http
  .createServer((request, response) => {
    let body = [];

    request
      .on('error', (err) => {
        console.error(err);
      })
      .on('data', (chunk) => {
        console.log('%c 🥝 data: ', 'font-size:20px;background-color: #F5CE50;color:#fff;', data);
        body.push(chunk.toString());
      })
      .on('end', () => {
        body = Buffer.concat(body).toString();
        console.log(body);
        response.writeHead(200, { 'Content-type': 'text/html' });
        response.end('hellow world');
      });
  })
  .listen(5502);

console.log('server is runing');
