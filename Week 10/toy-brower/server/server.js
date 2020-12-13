const { Buffer } = require("buffer");
const http = require("http");

// 创建server服务器对象
let server = http.createServer();
//监听对当前服务器对象的请求
server.on("request", function (req, res) {
  console.log("接受到请求");
  // 当服务器被请求时，会触发请求事件，并传入请求对象和响应对象
  res.writeHead(200, { "Content-type": "text/html" });
  // const result = {
  //   data: 'helloworld',
  // };
  const jsx = `<html lang="en">
  <head>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>hover</title>
      <style>
          #circle-btn {
              width: 800px;
              height: 300px;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: rgb(255,0,0);
          }
          .btn-container {
              widht: 200px;
              background-color: rgb(0,255,0);
          }
          button {
              border: 0;
              border-radius: 50px;
              color: white;
              background-color: rgb(0,0,255);
              padding: 15px 20px 16px 60px;
              text-transform: uppercase;
              background: linear-gradient(to right, #f72585 50%, #5f55af 50%);
              background-size: 200% 100%;
              background-position: right bottom;
              transition: all 2s ease;
          }
          .c {
              flex: 1;
              height: 50px;
              background-color: rgb(123,123,123);
          }
      </style>
  </head>
  <body>
      <div id="circle-btn" class="circle-btn">
          <div class="btn-container">
              <button>Hover me123123</button>
          </div>
          <div class="c"></div>
      </div>
  </body>
  </html>
`;
  res.end(jsx); // 服务器在页面上响应的数据'
});
server.on("error", (err) => {
  console.error(err);
  res.end(err);
});
// 服务器监听的端口号
server.listen(3000, function () {
  // 启动监听端口号成功时触发
  console.log("服务器启动成功！");
});
