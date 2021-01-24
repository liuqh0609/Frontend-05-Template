import {Timeline,Animation} from "./animation.js";
import {linear} from "./ease.js";

let tl = new Timeline();
tl.start();

tl.add(new Animation(document.querySelector("#el").style,"transform",0,500,2000,0,linear,(v) => {return `translateX(${v}px)`}))

document.querySelector("#pause-btn").addEventListener("click",() => tl.pause());
document.querySelector("#resume-btn").addEventListener("click",() => tl.resume());
