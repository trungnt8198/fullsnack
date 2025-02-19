const taskA = new Promise(function(resolve) {
    setTimeout(() => {
            console.log("Task A Done");
            resolve("Task A");
    }, 3000);
});

const taskB = new Promise(function(resolve) {
    setTimeout(() => {
        console.log("Task B Done");
        resolve("Task B");
    }, 2000);
});


const taskC = new Promise(function(resolve) {
    setTimeout(() => {
        console.log("Task C Done");
        resolve("Task C");
    }, 1000);
});

Promise.all([taskA, taskB, taskC]).then(data => console.log(data));