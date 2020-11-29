function match(str) {
  let state = start;
  for (let c of str) {
    state = state(c);
  }
  return state === end;
}

function start(c) {
  if (c === 'a') return foundA;
  return start;
}

function end(c) {
  return end;
}

function foundA(c) {
  if (c === 'b') return foundB;
  return start(c);
}

function foundB(c) {
  if (c === 'a') return foundA2;
  return start(c);
}

function foundA2(c) {
  if (c === 'b') return foundB2;
  return start(c);
}

function foundB2(c) {
  if (c === 'a') return foundA3;
  return start(c);
}

function foundA3(c) {
  if (c === 'b') return foundB3;
  return start(c);
}

function foundB3(c) {
  if (c === 'x') return end;
  return start(c);
}
console.log(match('abababzxabzx'));
