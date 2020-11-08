const obj = {
  r: 0,
  g: 0,
  b: 0,
};
const cbList = new Map();
const relativies = new Map();
// 记录使用过的属性值
let useRelativies = [];

const effect = (callback) => {
  useRelativies = [];
  callback();

  for (let relatives of useRelativies) {
    // 判断map里是否有监听的对象
    if (!cbList.has(relatives[0])) {
      cbList.set(relatives[0], new Map());
    }
    // 判断当前对象对应的value是否有对应的prop值
    if (!cbList.get(relatives[0]).has(relatives[1])) {
      cbList.get(relatives[0]).set(relatives[1], []);
    }
    // 将回调放入对象对应的map中的属性值对应的数组中
    // Map({obj: Map({ prop: []})})
    cbList.get(relatives[0]).get(relatives[1]).push(callback);
  }
};

const reactive = (target) => {
  if (relativies.has(target)) {
    return relativies.get(target);
  }
  let proxy = new Proxy(target, {
    get(target, prop) {
      // 获取reactive的对应属性时，进行记录
      useRelativies.push([target, prop]);
      if (typeof target[prop] === "object") {
        return reactive(target[prop]);
      }
      return target[prop];
    },
    set(target, prop, value) {
      target[prop] = value;
      if (cbList.has(target)) {
        if (cbList.get(target).has(prop)) {
          for (let cb of cbList.get(target).get(prop)) {
            cb();
          }
        }
      }
    },
  });
  relativies.set(target);
  return proxy;
};

const pxy = reactive(obj);

effect(() => {
  document.getElementById("r").value = pxy.r;
});

effect(() => {
  document.getElementById("g").value = pxy.g;
});

effect(() => {
  document.getElementById("b").value = pxy.b;
});

effect(() => {
  document.getElementById(
    "colorPanl"
  ).style.backgroundColor = `rgb(${pxy.r},${pxy.g},${pxy.b})`;
});

document
  .getElementById("r")
  .addEventListener("input", (event) => (pxy.r = event.target.value));
document
  .getElementById("g")
  .addEventListener("input", (event) => (pxy.g = event.target.value));
document
  .getElementById("b")
  .addEventListener("input", (event) => (pxy.b = event.target.value));
