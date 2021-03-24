// 1. Проверить является ли число круглым
// 2. Получить у пользователя два числа и узнать остаток от деления первого на второе
// 3. Получить у пользователя строку и узнать ее длину
// 4. Получить у пользователя два числа и назвать наибольшее
// 5. Получить у пользователя число и сказать входит ли оно в диаппазон от 30 до 50
// 6. Для доступа на сайт нужно ввести логин и пароль.
//    На сайте зарегистрировано четыре пользователя с паролями.
//    Получите у пользователя логин и пароль и скажите имеет ли он доступ на сайт

function hasAccess(login, password) {
    const user1 = 'Vasya';
    const pass1 = 'qwerty';

    const user2 = 'Petya';
    const pass2 = 'asdfg';

    const user3 = 'Tanya';
    const pass3 = 'yujh';

    const user4 = 'Andrey';
    const pass4 = 'uiol';

    function isUser(user, pass) {
        return login === user && password === pass;
    }

    return (login === user1 && password === pass1)
        || isUser(user2, pass2)
        || isUser(user3, pass3)
        || (login === user4 && password === pass4);
}

console.log( 'hasAccess', hasAccess('Vasya', 'qwerty') === true );
console.log( 'hasAccess', hasAccess('Vasya', 'asdfg') === false );
console.log( 'hasAccess', hasAccess('Ефтнф', 'qwerty') === false );

function inRange(num, startRange = 30, endRange = 50) {
    // Or || (+)
    // первое true или последнее false
    // true || true => true
    // true || false => true
    // false || true => true
    // false || false => false

    // Если num < 30 === true
    // или
    // Если num > endRange, то число не в диаппазоне

    // if (num < startRange || num > endRange) {
    //     return false;
    // }

    // return true;

    // Способ 2
    // And && (*)
    // первое false или последнее true
    // true && true => true
    // false && true => false
    // true && false => false
    // false && false => false

    // Если num >= 30
    // и
    // Если num <= endRange, то число в диаппазоне
    return (num >= startRange) && (num <= endRange);
}

console.log( 'inRange', inRange(20, 20, 60) );
console.log( 'inRange', inRange(40, 30) === true );
console.log( 'inRange', inRange(80) === false );
console.log( 'inRange', inRange(40) === true );

function getMax(a, b) {
    if (a > b) {
        return a;
    }

    return b;
}

console.log('getMax', getMax(3, 8) === 8 );
console.log('getMax', getMax(-3, -8) === -3 );
console.log('getMax', getMax(5, 5) === 5 );
console.log('getMax', getMax(5, 2) === 5 );

function getStrLength(str) {
    return str.length;
}

console.log( getStrLength('a') === 1 );
console.log( getStrLength('a b') === 3 );
console.log( getStrLength('hello, world') );

function getMod(a, b) {
    return a % b;
}

console.log('2 % 5', getMod(2, 5));
console.log('12 % 10', getMod(12, 10));
console.log('-15 % 4', getMod(-15, 4));

function isDividedByTen(num) {
    // +, -, *, /, %
    const mod = num % 10;

    return mod === 0;
}

console.log(10, isDividedByTen(10) );
console.log(12, isDividedByTen(12) );
console.log(24, isDividedByTen(24) );
console.log(58, isDividedByTen(58) );
console.log(60, isDividedByTen(60) );
console.log(-40, isDividedByTen(-40) );
console.log(32.23, isDividedByTen(32.23) );
