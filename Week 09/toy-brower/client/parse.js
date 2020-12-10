const EOF = Symbol('eof'); // End Of File
const currentToken = {};
const matchStringREG = /^[a-zA-Z]$/;
const data = (c) => {
  if (c === '<') {
    return tagOpen;
  } else if (c === EOF) {
    return;
  } else {
    return data;
  }
};
// 开始标签开始
const tagOpen = (c) => {
  if (c === '/') {
    // </
    return endTagOpen;
  } else if (c.match(matchStringREG)) {
    return tagName(c);
  } else if (c === '!') {
    return tagName;
  } else {
    return;
  }
};
// 结束标签
const endTagOpen = (c) => {
  if (c.match(matchStringREG)) {
    return tagName(c);
  } else if (c === '>') {
    console.error();
  } else if (c === EOF) {
    console.error();
    return;
  } else {
    return;
  }
};
// 标签名称
const tagName = (c) => {
  // <html class="a"
  // 等待空格
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c.match(matchStringREG)) {
    return tagName;
  } else if (c === '/') {
    // <html /自闭和标签
    // </html 结束标签
    return selfClosingStartTag;
  } else if (c === '>') {
    // 标签解析结束，开始下一个标签解析
    return data;
  } else {
    return tagName;
  }
};

// 属性名
const beforeAttributeName = (c) => {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c === '>') {
    return data;
  } else if (c === '=') {
    return beforeAttributeName;
  } else {
    return beforeAttributeName;
  }
};
// 自闭和标签
const selfClosingStartTag = (c) => {
  if (c === '>') {
    currentToken.isSelfClose = true;
    return data;
  } else if (c === EOF) {
  } else {
    // 报错
  }
};

module.exports.parseHTML = (bodyText) => {
  let state = data;
  for (let c of bodyText) {
    state = state(c);
  }
  state = data(EOF);
};
