const obj = {
  a: 1,
  b: 2,
};
const cbList = new Map();
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
  return new Proxy(target, {
    get(target, prop) {
      // 获取reactive的对应属性时，进行记录
      useRelativies.push([target, prop]);
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
};

const pxy = reactive(obj);

effect(() => {
  console.log(pxy.a);
});
