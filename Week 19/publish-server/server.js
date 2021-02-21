const http = require('http');
const https = require('https');
// const fs = require('fs');
const unzipper = require('unzipper');
const querystring = require('querystring');
const { info } = require('console');

// 2. auth路由：接收code，换取token回传给客户端
function auth(request, response) {
  const query = querystring.parse(request.url.match(/^\/auth\?([\s\S]+)$/)[1]);
  getToken(query.code, (body) => {
    // 返回一个发布页面
    response.write(`<a href=http://localhost:3303/publish?token=${body.access_token}>publish</a>`);
    response.end();
  });
}

function getToken(code, callback) {
  const request = https.request(
    {
      hostname: 'github.com',
      port: 443,
      path: `/login/oauth/access_token?code=${code}&client_id=Iv1.1c055c1d55454bd2&client_secret=c1b7fd42f936dbca44c32290de8ac6f9bfc70597`,
      method: 'POST',
    },
    function (response) {
      let body = '';
      response.on('data', (chunk) => {
        body += chunk;
      });
      response.on('end', () => {
        callback(querystring.parse(body));
      });
    }
  );
  request.end();
}

// 4. publish路由：用token获取用户信息，检查权限，接受发布
function publish(request, response) {
  const query = querystring.parse(request.url.match(/^\/publish\?([\s\S]+)$/)[1]);
  if (query.token) {
    getUser(query.token, function (info) {
      if (info.login === 'markgong-gd') {
        request.pipe(unzipper.Extract({ path: '../server/public' }));
        request.on('end', () => {
          response.end('success!');
        });
      }
    });
  }
}

function getUser(token, callback) {
  const request = https.request(
    {
      hostname: 'api.github.com',
      port: 443,
      path: '/user',
      method: 'GET',
      headers: {
        Authorization: `token ${token}`,
        'User-Agent': 'markgong-gd',
      },
    },
    function (response) {
      let body = '';
      response.on('data', (chunk) => {
        body += chunk;
      });
      response.on('end', () => {
        callback(JSON.parse(body));
      });
    }
  );
  request.end();
}

http
  .createServer((request, response) => {
    if (request.url.match(/^\/auth/) && request.url.match(/^\/auth/)[0] === '/auth') {
      return auth(request, response);
    }
    if (request.url.match(/^\/publish/) && request.url.match(/^\/publish/)[0] === '/publish') {
      return publish(request, response);
    }
  })
  .listen(3303);
