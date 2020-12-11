const EOF = Symbol('eof'); // End Of File
let currentToken = {};
let currentAttribute = {};

const matchStringREG = /^[a-zA-Z]$/;

function emit(token) {
  console.log(token);
}
const data = (c) => {
  if (c === '<') {
    return tagOpen;
  } else if (c === EOF) {
    emit({
      type: 'EOF',
    });
    return;
  } else {
    // 普通的文本节点
    emit({
      type: 'text',
      content: c,
    });
    return data;
  }
};
// 开始标签开始
const tagOpen = (c) => {
  if (c === '/') {
    // </
    return endTagOpen;
  } else if (c.match(matchStringREG)) {
    currentToken = {
      type: 'startTag',
      tagName: '',
    };
    return tagName(c);
  } else if (c === '!') {
    // <!DOCTYPE html>
    currentToken = {
      type: 'doctype',
      tagName: '!',
    };
    return tagName;
  } else {
    return;
  }
};
// 结束标签
const endTagOpen = (c) => {
  if (c.match(matchStringREG)) {
    currentToken = {
      type: 'endTag',
      tagName: '',
    };
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
    currentToken.tagName += c;
    return tagName;
  } else if (c === '/') {
    // <html /自闭和标签
    // </html 结束标签
    return selfClosingStartTag;
  } else if (c === '>') {
    // 标签解析结束，开始下一个标签解析
    emit(currentToken);
    return data;
  } else {
    return tagName;
  }
};

// 判定为html标签属性
const beforeAttributeName = (c) => {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c === '>') {
    // 标签结束
    emit(currentToken);
    return data;
  } else if (c === '=') {
    return beforeAttributeName;
  } else {
    // 进入属性名解析
    currentAttribute = {
      name: '',
      value: '',
    };
    return attributeName(c);
  }
};

// 属性名解析
const attributeName = (c) => {
  //  <div disabled/>、 <div disabled>
  if (c.match(/^[\t\n\f ]$/) || c === '/' || c === '>') {
    // 进入到属性值解析
    return afterAttributeName(c);
  } else if (c === '=') {
    // 判定为属性值
    return beforeAttributeValue;
  } else {
    currentAttribute.name += c;
    return attributeName;
  }
};

const afterAttributeName = (c) => {
  if (c.match(/^[\t\n\f ]$/)) {
    return afterAttributeName;
  } else if (c === '/') {
    return selfClosingStartTag;
  } else if (c === '>') {
    // 解析结束
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else {
    currentToken[currentAttribute.name] = currentAttribute.value;
    currentAttribute = {
      name: '',
      value: '',
    };
    return attributeName(c);
  }
};
const beforeAttributeValue = (c) => {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c === '"') {
    // 双引号
    return doubleQuotedAttributeValue;
  } else if (c === "'") {
    // 单引号
    return singleQuotedAttributeValue;
  } else if (c === '/' || c === '>') {
    console.error('错误的属性值解析');
  } else {
    // 没有引号
    return unQuotedAttributeValue;
  }
};
// 双引号属性值解析
const doubleQuotedAttributeValue = (c) => {
  if (c === '"') {
    // 属性值解析结束
    currentToken[currentAttribute.name] = currentAttribute.value;
    currentAttribute = {
      name: '',
      value: '',
    };
  } else if (c === '\u0000') {
  } else if (c === EOF) {
  } else {
    currentAttribute.value += c;
  }
};
// 单引号属性值解析
const singleQuotedAttributeValue = (c) => {
  if (c === "'") {
    // 属性值解析结束
    currentToken[currentAttribute.name] = currentAttribute.value;
    currentAttribute = {
      name: '',
      value: '',
    };
  } else if (c === '\u0000') {
  } else if (c === EOF) {
  } else {
    currentAttribute.value += c;
  }
};
// 没有引号属性值解析
const doubleQuotedAttributeValue = (c) => {
  if (c.match(/^[\t\n\f ]$/)) {
    // 属性值解析结束
    currentToken[currentAttribute.name] = currentAttribute.value;
    currentAttribute = {
      name: '',
      value: '',
    };
    return attributeName;
  } else if (c === '/') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    currentAttribute = {
      name: '',
      value: '',
    };
    return selfClosingStartTag;
  } else if (c === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    currentAttribute = {
      name: '',
      value: '',
    };
    emit(currentToken);
    return data;
  } else if (c === '\u0000') {
  } else if (c === EOF) {
  } else {
    currentAttribute.value += c;
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
