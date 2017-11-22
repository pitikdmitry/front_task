// Реализовать класс Futures
let PENDING = 0;
let FULFILLED = 1;
let REJECTED = 2;

function Futures(fn) {
    let state = PENDING;
    let callbacksResolve = [];
    let callbacksReject = [];

    this.then = function(res, rej) {
        if(res !== undefined && res !== null && typeof res === "function") {
            callbacksResolve.push(res);
        }
        if(rej !== undefined && rej !== null && typeof rej === "function") {
            callbacksReject.push(rej);
        }
    };

    function resolve(value) {
        if(state !== PENDING) {
            return;
        }

        setTimeout(function() {
            if(callbacksResolve.length > 0) {
                for(let i = 0; i < callbacksResolve.length; ++i) {
                    callbacksResolve[i](value);
                    callbacksResolve.splice(i, 1);
                    state = FULFILLED;
                }
            } else {
                return resolve(value);
            }

        }, 10);

    }

    function reject(value) {
        if(state !== PENDING) {
            return;
        }
        setTimeout(function() {
            if(callbacksReject.length > 0) {
                for(let i = 0; i < callbacksReject.length; ++i) {
                    callbacksReject[i](value);
                    callbacksReject.slice(i, 1);
                    state = REJECTED;
                }
            } else {
                return reject(value);
            }

        }, 10);
    }

    fn(resolve, reject);
}

// Тест #1
var foo = new Futures(function (resolve, reject) {
    resolve(123);
});

foo.then(function (val) {
    console.log("foo.resolved:", val === 123);
}, function () {
    console.log("foo.resolved: fail");
});


// Тест #2
var bar = new Futures(function (resolve, reject) {
    setTimeout(resolve.bind(null, "fail"), 300);
    setTimeout(reject.bind(null, "ok"), 200);
});

bar.then(function () {
    console.log("bar.rejected: fail");
}, function (val) {
    console.log("bar.rejected:", val === "ok");
});
