const obj = {
  a: 1,
  b: 2,
};

const pxy = new Proxy(obj, {
  get(o, prop, proxy) {
    return o[prop];
  },

  set(o, prop, val) {
    return (o[prop] = val);
  },
});

// 第二种实现方式
for (let prop in obj) {
  Object.defineProperty(obj, prop, {
    get() {
      return obj[`_${prop}`];
    },
    set(newVal) {
      obj[`_${prop}`] = newVal;
    },
  });
}
