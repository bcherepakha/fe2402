// Метод join() объединяет все элементы массива (или массивоподобного объекта) в строку.
function join(arr, str) {
}

// arr.join(str)
console.log('join');
console.log( join(['Hello', 'world!'], ', ') ); // 'Hello, world!'
console.log( join( [1, 2, 3, 4, 'vasya'], ' - ' ) ); // '1 - 2 - 3 - 4 - vasya'

// Метод map() создаёт новый массив с результатом вызова указанной функции для каждого элемента массива.
function map( arr, transform) {
}

console.log('map');
console.log( map( [1, 2, 3, 4], function (el, idx, arr) { return arr.length + el * idx; } ) ); // [4, 6, 10, 16]

// Метод filter() создаёт новый массив со всеми элементами,
// прошедшими проверку, задаваемую в передаваемой функции.
function filter( arr, checkHandler) {
}

console.log('filter');
console.log( filter( [1, 2, 3, 4, 5, 6], function(el) { return el < 5 && el > 2; }) ); // [3, 4]

// Метод concat() возвращает новый массив, состоящий из массива, на котором он был вызван, соединённого с другими массивами и/или значениями, переданными в качестве аргументов.
function concat() {
}

console.log('concat');
console.log( concat([1, 2], '3', [4, 5], [6, 7, 8, 9], 10) ); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// Метод find() возвращает значение первого найденного в массиве элемента,
// которое удовлетворяет условию переданному в callback функции.
//  В противном случае возвращается undefined.
function find(arr, condition) {
}

console.log('find');
console.log( find( [1, 2, 3, 4, 5, 6], function(el) { return el < 5 && el > 2; }) ); // 3

// Метод every() проверяет, удовлетворяют ли все элементы массива условию,
// заданному в передаваемой функции.
function every(arr, condition) {
}

console.log('every');
console.log( every([1, 2, 3, 4, 5], function(el) { return el < 3; }) ); // false
console.log( every([1, 2, 3, 4, 5], function(el) { return el > 0; }) ); // true

// Метод some() проверяет, удовлетворяет ли какой-либо элемент массива условию, заданному в передаваемой функции.
function some(arr, condition) {
}

console.log('some');
console.log( some([1, 2, 3, 4, 5], function(el) { return el < 3; }) ); // true
console.log( some([1, 2, 3, 4, 5], function(el) { return el > 4; }) ); // true
console.log( some([1, 2, 3, 4, 5], function(el) { return el > 5; }) ); // false

// Метод reduce() применяет функцию reducer к каждому элементу массива (слева-направо),
// возвращая одно результирующее значение.
function reduce(arr, reducer, initialValue) {
}

console.log('reduce');
console.log(
    reduce(
        [1, 2, 3, 4],
        function (accumulator, el) { return el * accumulator; },
        1
    )
); // 24

console.log(
    reduce(
        [1, 2, 3, 4],
        function (accumulator, el) { return el + accumulator; },
        10
    )
); // 20
