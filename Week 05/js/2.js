const obj = {
  a: 1,
  b: 2,
};

const reactive = (target) => {
  return new Proxy(target, {
    get(target, prop) {
      return target[prop];
    },
    set(target, prop, value) {
      target[prop] = value;
    },
  });
};

const pxy = reactive(obj);
