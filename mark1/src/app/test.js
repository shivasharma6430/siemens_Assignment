

    let promise = new Promise((resolve,reject)=>
setTimeout(()=>
resolve("shiva")
),20000
)


let output = promise.then((val)=>{
    console.log(val);
});

x = 5; 
console.log(x);

// var x;