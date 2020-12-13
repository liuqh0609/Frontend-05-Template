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
<body>
  <div class="red">这是一个文本</div>
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
