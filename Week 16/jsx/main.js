import {createElement} from "./framework.js";
import {List} from "./List.js";

let d = [
    {
        img: "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
        url:"https://time.geekbang.org/",
        title:"1号猫"
    }
   ,
   {
        img: "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
        url:"https://time.geekbang.org/",
        title:"2号猫"
    },
    {
        img: "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
        url:"https://time.geekbang.org/",
        title:"3号猫"
    },
    {
        img: "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
        url:"https://time.geekbang.org/",
        title:"4号猫"
    }
]

// let a = <Carousel src={d} 
//     onChange={event => {console.log(event.detail.position)}}
//     onClick={event => window.location.href = event.detail.data}
//     />

//document.body.appendChild(a);
let a = <List data={d}>
    {(record) =>
        <div>
            <img src={record.img} />
            <a href={record.url}>{record.title}</a>
        </div>
    }
</List>
a.mountTo(document.body);

// let tl = new Timeline();
// window.tl = tl;
// window.animation = new Animation({set a(v){ console.log(v) }},"a",0,100,1000,null);
// //tl.add(new Animation({set a(v){ console.log(v) }},"a",0,100,1000,null));
// tl.start();