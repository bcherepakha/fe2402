'use strict';
// 1. Init
// global = { Number, String, Boolean, null, undefined, Bigint, Object, Array, console: { log }}
// var, function
// a = 5

// 2. Exectute
let a = 1;

const sum = (b) => a + b;

console.log( sum(3) ); // 4

a = 5;

console.log( sum(3) ); // 8

const mult = (a, b) => {
    // {
    // a = 6
    // b = 3
    // }
    return a = a * b;
};

console.log( mult(2, 3) ); // 6
console.log( mult(5, 3) ); // 15
