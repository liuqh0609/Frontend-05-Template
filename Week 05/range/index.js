let dragable = document.getElementById("dragable");
let baseX = 0,
  baseY = 0;
dragable.addEventListener("mousedown", (event) => {
  let startX = event.clientX;
  let startY = event.clientY;
  let move = (event) => {
    getNearst(event.clientX, event.clientY).insertNode(dragable);
  };
  let up = (event) => {
    baseX = baseX + event.clientX - startX;
    baseY = baseY + event.clientY - startY;
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
  };
  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
});

let container = document.getElementById("container");
let rangeList = [];
for (let i = 0; i < container.childNodes[0].textContent.length; i++) {
  let range = document.createRange();
  range.setStart(container.childNodes[0], i);
  range.setEnd(container.childNodes[0], i);
  rangeList.push(range);
}
function getNearst(x, y) {
  let min = Infinity;
  let minRange = null;
  rangeList.forEach((item) => {
    let rect = item.getBoundingClientRect();
    let distance = (rect.x - x) ** 2 + (rect.y - y) ** 2;
    if (distance < min) {
      min = distance;
      minRange = item;
    }
  });
  return minRange;
}
document.addEventListener("selectstart", (event) => event.preventDefault());
