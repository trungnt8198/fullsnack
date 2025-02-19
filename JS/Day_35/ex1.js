function taskA() {
    return new Promise(function(resolve) {
        setTimeout(() => {
            console.log("Task A Done");
            resolve();
        }, 3000);
    })
}

function taskB() {
    return new Promise(function(resolve) {
        setTimeout(() => {
            console.log("Task B Done");
            resolve();
        }, 2000);
    })
}

function taskC() {
    setTimeout(() => console.log("Task C Done"), 1000);
}

taskA()
.then(() => taskB())
.then(() => taskC());