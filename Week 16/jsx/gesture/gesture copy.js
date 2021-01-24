let element = document.documentElement;
let isListeningMouse = false;

element.addEventListener("mousedown",event => {

    let context = Object.create(null);
    contexts.set("mouse"+ (1 << event.button),context);
    start(event,context);
    
    let mousemove = event =>{
        let button = 1;
        while(button <= event.buttons){
            if(button & event.buttons){
                let key;
                if(button === 2){
                    key = 4;
                }else if(button === 4){
                    key = 2;
                }else{
                    key = button;
                }
                let context = contexts.get("mouse"+key);
                //console.log("mouse"+button);
                move(event,context);
            }
            button = (button << 1);
        }
    }

    let mouseup = event =>{
        let context = contexts.get("mouse"+ (1 << event.button));
        //console.log("up = mouse"+ (1 << event.button));
        end(event,context);
        contexts.delete("mouse"+ (1 << event.button));
        if(event.buttons === 0){
            document.removeEventListener("mousemove",mousemove);
            document.removeEventListener("mouseup",mouseup);
            isListeningMouse = false;
        }
    }

    if(!isListeningMouse){
        document.addEventListener("mousemove",mousemove);
        document.addEventListener("mouseup",mouseup);
        isListeningMouse = true;
    }
   
})

let contexts = new Map();

element.addEventListener("touchstart",event =>{
    for (const iterator of event.changedTouches) {
        let context = Object.create(null);
        contexts.set(iterator.identifier,context);
        start(iterator,context);
    }
})

element.addEventListener("touchmove",event => {
    for (const iterator of event.changedTouches) {
        let context = contexts.get(iterator.identifier);
        move(iterator,context);
    }
})

element.addEventListener("touchend",event => {
    for (const iterator of event.changedTouches) {
        let context = contexts.get(iterator.identifier);
        end(iterator,context);
        contexts.delete(iterator.identifier);
    }
})

element.addEventListener("touchcancel",event => {
    for (const iterator of event.changedTouches) {
        let context = contexts.get(iterator.identifier);
        cancel(iterator,context);
        contexts.delete(iterator.identifier);
    }
})

let start = (point,context) => {
    //console.log("start",point.clientX,point.clientY);
    context.startX = point.clientX,context.startY = point.clientY;
    context.points = [{
        t: Date.now(),
        x: point.clientX,
        y: point.clientY
    }]
    context.isTap = true; 
    context.isPan = false; 
    context.isPress = false;

    context.handler = setTimeout(() => {
        context.isTap = false; 
        context.isPan = false; 
        context.isPress = true;
        context.handler = null;
        dispatch("press",context);
        //console.log("press");
    }, 500);
}

let move = (point,context) => {
    let dx = point.clientX - context.startX,dy = point.clientY - context.startY;
    if(!context.isPan && dx ** 2 + dy ** 2 > 100){
        //console.log("pan - start");
        context.isTap = false; 
        context.isPan = true; 
        context.isPress = false;
        dispatch("pan-start",context);
        clearTimeout(context.handler);
    }

    if(context.isPan){
        console.log(dx,dy);
        //console.log("pan");
        dispatch("pan",context);
    }

    //context.points = context.points.filter(point => Date.now - point.t < 500);
    context.points.push({
        t: Date.now(),
        x: point.clientX,
        y: point.clientY
    })

    //console.log("move",context.points.length);
}

let end = (point,context) => {
    if(context.isTap){
        //console.log("tap");
        dispatch("tap",{});
        clearTimeout(context.handler);
    }
    if(context.isPan){
        dispatch("pan-end",context);
        //console.log("pan-end");
    }
    if(context.isPress){
        dispatch("press-end",context);
        //console.log("press-end");
    }
    //context.points = context.points.filter(point => Date.now - point.t < 500);
    //console.log("length:"+context.points.length);
    let d, v ;
    if(!context.points.length){
        v = 0;
    }else{
        //console.log("oyc");
        d = Math.sqrt((point.clientX - context.points[0].x) ** 2 +
            (point.clientY - context.points[0].y));
        v = d / (Date.now() - context.points[0].t);
    }
    //console.log(v);
    if(v > 1.5){
        context.isFlick = true;
        //console.log("flick");
    }else{
        context.isFlick = false;
    }

}

let cancel = (event,context) => {
    dispatch("cancel",{});
    clearTimeout(context.handler);
    //console.log("cancel",event.clientX,event.clientY);
}

function dispatch(type,properties){
    let event = new Event(type);
    for (const key in properties) {
        event[key] = properties[key];
    }
    element.dispatchEvent(event);
}