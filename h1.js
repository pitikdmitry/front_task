// Реализовать класс Futures
let PENDING = 0;
let FULFILLED = 1;
let REJECTED = 2;

function Futures(fn) {
    let state = PENDING;
    let callbackResolve = null;
    let callbackReject = null;

    this.then = function(res, rej) {
        callbackResolve = res;
        callbackReject = rej;
    };

    function resolve(value) {
        if(state !== PENDING) {
            return;
        }

        setTimeout(function() {
            callbackResolve(value);
        }, 0);

        state = FULFILLED;
    }

    function reject(value) {
        if(state !== PENDING) {
            return;
        }

        setTimeout(function() {
            callbackReject(value);
        }, 0);

        state = REJECTED;
    }

    fn(resolve, reject);
}

Futures.prototype.then = function () {
};



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
