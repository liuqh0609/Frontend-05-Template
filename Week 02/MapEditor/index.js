const map = localStorage["map"]
  ? JSON.parse(localStorage["map"])
  : Array(100 * 100).fill(0);

const mapWrapper = document.getElementById("map");

class Sorted {
  constructor(data, compare) {
    this.data = data;
    this.compare = compare || ((a, b) => a - b);
  }
  take() {
    if (!this.data.length) return;

    let min = this.data[0];
    let minIndex = 0;

    for (let i = 1; i < this.data.length; i++) {
      if (this.compare(this.data[i], min) < 0) {
        min = this.data[i];
        minIndex = i;
      }
    }

    // 找到最小的值之后，将这个值从data中移除，不用再进行比较
    this.data[minIndex] = this.data[this.data.length - 1];
    this.data.pop();

    return min;
  }
  give(v) {
    this.data.push(v);
  }

  get length() {
    return this.data.length;
  }
}

const delay = (t) => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve();
    }, t);
  });
};
const drawMap = () => {
  mapWrapper.innerHTML = "";
  for (let x = 0; x < 100; x++) {
    for (let y = 0; y < 100; y++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      if (map[100 * x + y] === 1) {
        cell.style.backgroundColor = "black";
      }
      cell.addEventListener("mousemove", () => {
        if (mouseDown) {
          if (clear) {
            map[100 * x + y] = 0;
            cell.style.backgroundColor = "";
          } else {
            map[100 * x + y] = 1;
            cell.style.backgroundColor = "black";
          }
        }
      });
      mapWrapper.appendChild(cell);
    }
  }
};
// 是否停止绘画
let mouseDown = false;
// 是否清空当前块
let clear = false;
//
mapWrapper.addEventListener("mousedown", (e) => {
  mouseDown = !mouseDown;
  clear = e.which === 3;
});
mapWrapper.addEventListener("contextmenu", (e) => e.preventDefault());

// 按钮事件
drawMap();

// 广度优先搜索
const path = async (_map, _start, _end) => {
  const queue = new Sorted([_start], (a, b) => distance(a) - distance(b));
  console.log(queue.length);
  const table = Object.create(_map);

  const findAround = (x, y, pre) => {
    // 判断临界值
    if (x >= 100 || x < 0 || y >= 100 || y < 0) return;
    // 1或者[]证明该点已经搜索过了，不需要进行重复搜索
    if (table[x * 100 + y]) return;

    mapWrapper.children[x * 100 + y].style.backgroundColor = "green";
    // 将上一个坐标存储在对应数组位置内，方便寻找路径时读取
    table[x * 100 + y] = pre;
    queue.give([x, y]);
  };

  // 某点到终点的距离
  const distance = (pointer) => {
    return (_end[0] - pointer[0]) ** 2 + (_end[1] - pointer[1]) ** 2;
  };

  while (queue.length) {
    await delay(10);
    // 每次取出队列中的第一项
    let [x, y] = queue.take();
    // 判断该项是不是结束的点,是 ：就停止查找
    if (x === _end[0] && y === _end[1]) {
      let _path = [];
      mapWrapper.children[x * 100 + y].style.backgroundColor = "red";
      while (x !== _start[0] || y !== _start[1]) {
        await delay(30);
        _path.push([x, y]);
        // 读取存放在table中的上一个点的路径
        [x, y] = table[x * 100 + y];
        mapWrapper.children[x * 100 + y].style.backgroundColor = "purple";
      }
      return _path;
    }
    // 否：查找该点的上下左右四个点
    findAround(x, y - 1, [x, y]); // 上
    findAround(x, y + 1, [x, y]); // 下
    findAround(x - 1, y, [x, y]); // 左
    findAround(x + 1, y, [x, y]); // 右

    findAround(x - 1, y - 1, [x, y]); // 左上
    findAround(x + 1, y + 1, [x, y]); // 右下
    findAround(x - 1, y + 1, [x, y]); // 左下
    findAround(x + 1, y - 1, [x, y]); // 右上
  }
  return null;
};
