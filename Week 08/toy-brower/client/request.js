const net = require('net');
/**
 * 构造Request类
 */
module.exports = class Request {
  constructor(options) {
    this.method = options.method || 'GET';
    this.url = options.url;
    this.port = this.port || 80;
    this.headers = options.headers || {};
    this.body = options.body || {};
    // 如果用户没有设置content-type类型，需要给一个默认值
    if (!this.headers['Contetnt-type']) {
      this.headers['Content-type'] = 'application/json';
    }
    // 如果是application/json的类型，则把请求体stringify一下
    if (this.headers['Content-type'] === 'application/json') {
      this.bodyText = JSON.stringify(this.body);
    }
    // 如果是x-www-form-urlencode类型
    if (this.headers['Content-type'] === 'application/x-www-form-urlencode') {
      Object.keys(this.body)
        .map((key) => `${key}=${this.body[key]}`)
        .join('&');
    }
  }
  /** 发送请求的方法 */
  send() {
    return new Promise((resolve, rejects) => {
      // 构造请求
      const connection = net.createConnection(
        {
          port: this.port,
          host: this.host,
        },
        () => {}
      );
      connection.on('data', (data) => {
        console.log(data);
      });
      // 捕获错误
      connection.on('error', (err) => console.error(err));
      resolve('send return result;');
    });
  }
};
