// const Request = require('./request');
/**
 * 构造Request类
 */
const net = require('net');
class Request {
  constructor(options) {
    this.method = options.method || 'GET';
    this.url = options.url;
    this.path = options.path || '/';
    this.port = options.port || 80;
    this.headers = options.headers || {};
    this.body = options.body || {};
    // 如果用户没有设置content-type类型，需要给一个默认值
    if (!this.headers['Content-type']) {
      this.headers['Content-type'] = 'application/json';
    }
    // 如果是application/json的类型，则把请求体stringify一下
    if (this.headers['Content-type'] === 'application/json') {
      this.bodyText = JSON.stringify(this.body);
    }
    // 如果是x-www-form-urlencode类型
    if (this.headers['Content-type'] === 'application/x-www-form-urlencode') {
      this.bodyText = Object.keys(this.body)
        .map((key) => `${key}=${this.body[key]}`)
        .join('&');
    }
  }
  /**
   * 发送请求的方法
   * @params {Socket} net连接
   **/
  send(connection) {
    return new Promise((resolve, rejects) => {
      const parse = new ResponseParse();
      if (connection) {
        connection.write(this.createHeader());
      } else {
        // 构造请求
        connection = net.createConnection(
          {
            port: this.port,
            host: this.host,
          },
          () => {
            // 连接成功之后会拼接上请求行请求头请求体的信息
            // 如果这些信息拼接不正确的化会造成bad request的错误请求
            connection.write(this.createHeader());
          }
        );
      }
      connection.on('data', (data) => {
        const response = data.toString();
        parse.receive(response);
        resolve(response);
        connection.end();
      });
      // 捕获错误
      connection.on('error', (err) => {
        console.error(err);
        connection.end();
      });
    });
  }
  // 构建http请求数据- 请求行请求头请求体（请求体如果构建不符合格式就会造成400）
  createHeader() {
    return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers)
  .map((key) => `${key}: ${this.headers[key]}`)
  .join('\r\n')}
\r
${this.bodyText}`;
  }
}

class ResponseParse {
  constructor() {
    // 定义状态机的各个状态
    this.WAITTING_STATUS_LINE = 0;
    this.WAITTING_STATUS_LINE_END = 1;
    this.WAITTING_HEADER_NAME = 2;
    this.WAITTING_HEADER_SPACE = 3;
    this.WAITTING_HEADER_VALUE = 4;
    this.WAITTING_HEADER_LINE_END = 5;
    this.WAITTING_HEADER_BLOCK_END = 6;
    this.WAITTING_BODY = 7;

    this.current = this.WAITTING_STATUS_LINE; // 初时状态
    this.statusLine = '';
    this.headerName = '';
    this.headerValue = '';
    this.headers = {};
  }
  /**
   * 接受数据
   * @param {string} str 接受的字符串
   */
  receive(str) {
    for (let i = 0; i < str.length; i++) {
      this.receiveParse(str.charAt(i));
    }
  }
  /**
   * 判断字符的类型
   * @param {string} char 字符
   */
  receiveParse(char) {
    if (this.current === this.WAITTING_STATUS_LINE) {
      if (char === '\r') {
        this.current = this.WAITTING_STATUS_LINE_END;
      } else {
        this.statusLine += char;
      }
    } else if (this.current === this.WAITTING_STATUS_LINE_END) {
      if (char === '\n') {
        this.current = this.WAITTING_HEADER_NAME;
      }
    } else if (this.current === this.WAITTING_HEADER_NAME) {
      if (char === ':') {
        this.current = this.WAITTING_HEADER_SPACE;
      } else if (char === '\r') {
        // 没有响应头的情况
        this.current = this.WAITTING_HEADER_BLOCK_END;
      } else {
        this.headerName += char;
      }
    } else if (this.current === this.WAITTING_HEADER_SPACE) {
      if (char === ' ') {
        this.current = this.WAITTING_HEADER_VALUE;
      }
    } else if (this.current === this.WAITTING_HEADER_VALUE) {
      if (char === '\r') {
        this.current = this.WAITTING_HEADER_LINE_END;
        this.headers[this.headerName] = this.headerValue;
        this.headerName = '';
        this.headerValue = '';
      } else {
        this.headerValue += char;
      }
    } else if (this.current === this.WAITTING_HEADER_LINE_END) {
      if (char === '\n') {
        this.current = this.WAITTING_HEADER_NAME;
      }
    } else if (this.current === this.WAITTING_HEADER_BLOCK_END) {
      if (char === '\n') {
        this.current = this.WAITTING_BODY;
      }
    } else if (this.current === this.WAITTING_BODY) {
      console.log(char);
    }
  }

  finish() {}
}
/** 构造requset实例，发送请求 */
void (async function () {
  const request = new Request({
    method: 'POST',
    url: '127.0.0.1',
    path: '/',
    port: 3000,
    headers: {
      'Content-type': 'application/x-www-form-urlencode',
    },
    body: {
      name: '刘庆华',
      age: 23,
    },
  });
  const res = await request.send();
  console.log('%c 🥃 res: ', 'font-size:20px;background-color: #F5CE50;color:#fff;', res);
})();
