const promise = new Promise(function PromiseMaker(resolve, reject) {
    if (Math.random() > .5) {
        setTimeout(() => resolve({}), 2000);
    } else {
        setTimeout(reject, 7000);
    }
});

const newPromise = promise
    .then(
        function onSuccess(value) {
            console.log('promise resolved succesfull');
            console.log(promise, newPromise);
        }
    )
    .then()
    .then()
    .then()
    .catch(
        function onError() {
            console.log('promise rejected');
            console.log(promise, newPromise);
        }
    );

console.log( promise );
console.log( newPromise );
