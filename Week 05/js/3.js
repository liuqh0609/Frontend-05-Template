const obj = {
  a: 1,
  b: 2,
};
const cbList = [];

const effect = (callback) => {
  cbList.push(callback);
};

const reactive = (target) => {
  return new Proxy(target, {
    get(target, prop) {
      return target[prop];
    },
    set(target, prop, value) {
      target[prop] = value;
      for (let cb of cbList) {
        cb();
      }
    },
  });
};
effect(() => console.log("effect is runing "));
const pxy = reactive(obj);
