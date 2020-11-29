const findStr = (str) => {
  let flagA = false;
  let flagB = false;
  let flagC = false;

  for (let c of str) {
    if (c === 'a') {
      flagA = true;
    } else if (c === 'b' && flagA) {
      // 每次进入下一个字符串寻找时就将上一个标志位置为false，避免 aabbccdd这种格式也可以返回true
      flagA = false;
      flagB = true;
    } else if (c === 'c' && flagB) {
      flagB = false;
      flagC = true;
    } else if (c === 'd' && flagC) {
      return true;
    } else {
      flagA = false;
      flagB = false;
      flagC = false;
    }
  }
  return false;
};

console.log(findStr('aabbccddaebcdabc'));
