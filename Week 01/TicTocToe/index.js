// 棋盘数组
const map = [0, 0, 0, 0, 0, 0, 0, 0, 0];

// 初始棋子值
let color = 1;

/**
 * 展示棋子
 */
function show() {
  const wrapper = document.querySelector("#wrapper");
  // 每次展示前清空之前的棋盘和内容，重新绘制
  wrapper.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const piece = document.createElement("div");
      piece.classList.add("piece");
      piece.innerText =
        map[i * 3 + j] === 2 ? "❌" : map[i * 3 + j] === 1 ? "⭕" : "";
      // 将棋子添加到页面元素中
      wrapper.appendChild(piece);
      // 添加点击事件
      piece.addEventListener("click", () => move(i, j));
    }
  }
}

/**
 * 棋子的移动
 * @param {*} x 数组的横坐标
 * @param {*} y 数组的纵坐标
 */
function move(x, y) {
  // 严谨性判断，如果已经落子则不能改变
  if (map[x * 3 + y]) return;
  map[x * 3 + y] = color;

  // 每次落子之后检查是否胜利
  if (check(map, color)) {
    alert(color === 2 ? "❌ is WIN!" : "⭕ is WIN!");
  }
  color = 3 - color;
  show();
  computeMove();
}
/**
 * 机器AI
 */
function computeMove() {
  let choice = bestChoice(map, color);
  if (choice.point) {
    map[choice.point[0] * 3 + choice.point[1]] = color;
  }
  if (check(map, color)) {
    alert(color === 2 ? "❌ is WIN!" : "⭕ is WIN!");
  }
  color = 3 - color;
  show();
}
/**
 * 克隆
 * @param {*} params 需要克隆的数据
 */
function clone(params) {
  return Object.create(params);
}
/**
 * 下个落子是否可以胜利
 * @param {*} map 地图
 * @param {*} color 下个落子的颜色
 */
function willWin(map, _color) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (map[i * 3 + j]) continue;
      let temp = clone(map);
      temp[i * 3 + j] = _color;
      if (check(temp, _color)) {
        return [i, j];
      }
    }
  }
  return null;
}

/**
 * 最好的落子点和结果处理函数
 * @param {*} map 二维数组
 * @param {*} color 下一个棋子的值
 */
function bestChoice(map, _color) {
  let point = willWin(map, _color);
  if (point) {
    return {
      point,
      result: 1,
    };
  }

  let result = -1;

  outer: for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (map[i * 3 + j]) continue;
      let temp = clone(map);
      temp[i * 3 + j] = _color;

      let r = bestChoice(temp, 3 - _color);

      if (-r.result >= result) {
        point = [i, j];
        result = -r.result;
      }

      if (result === 1) {
        break outer;
      }
    }
  }

  return {
    point: point,
    result: point ? result : 0,
  };
}

/**
 * 检查是否胜利
 * @param {*} map 地图
 */
function check(map, _color) {
  // 横
  for (let i = 0; i < 3; i++) {
    let win = true;
    for (let j = 0; j < 3; j++) {
      // 每一行是否都是最后一个落子的颜色
      if (map[i * 3 + j] !== _color) {
        win = false;
      }
    }
    if (win) return true;
  }
  // 纵
  for (let j = 0; j < 3; j++) {
    let win = true;
    for (let i = 0; i < 3; i++) {
      // 每一列是否都是最后一个落子的颜色
      if (map[i * 3 + j] !== _color) {
        win = false;
      }
    }
    if (win) return true;
  }
  // 对角1：左上->右下
  {
    let win = true;
    for (let i = 0; i < 3; i++) {
      if (map[i * 3 + i] !== _color) win = false;
    }
    if (win) return true;
  }
  // 对角2：右上->左下
  {
    let win = true;
    for (let i = 0; i < 3; i++) {
      if (map[i * 3 + 2 - i] !== _color) win = false;
    }
    if (win) return true;
  }
  return false;
}
show();
