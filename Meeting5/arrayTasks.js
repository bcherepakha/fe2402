/* eslint-disable no-unused-vars */
const classNames = ['firstClass', 'secondClass', 'thirdClass'];

// task 1
/**
 * Написать функцию, которая будет возвращать строку в которой будут все классы
 * элмента через пробел
 *
 * @param {string[]} classNames
 * @return {string}
 */
function getClassName(classNames) {
    return classNames.join(' ');
}

// task 2
/**
 * удаляет класс из строки
 *
 * @param {string} classNameStr
 * @param {string} removedClass
 *
 * @returns {string}
 */
function removeClass(classNameStr, removedClass) {
    const classNames = classNameStr.split(' '); // ['t', 'g', 'm']
    const newClassNames = classNames.filter(function(className) {
        return className !== removedClass;
    });

    return getClassName(newClassNames);
}

// task 3
/**
 * проверяет существует ли класс
 *
 * @param {string} classNamesStr
 * @param {string} checkedClass
 *
 * @returns {boolean}
 */
function hasClass(classNamesStr, checkedClass) {
    return classNamesStr.indexOf(checkedClass) !== -1;
}

console.log('task 3', hasClass('t g m', 'g') === true);
console.log('task 3', hasClass('t g m', 'k') === false);

// task 4
/**
 * добавить класс в строку
 *
 * @param {string} classNameStr
 * @param {string} addedClass
 *
 * @return {string}
 */
function addClass(classNameStr, addedClass) {
    if (hasClass(classNameStr, addedClass)) {
        return classNameStr;
    }

    if (!classNameStr) {
        return addedClass;
    }

    return classNameStr + ' ' + addedClass;
}

console.log('task4', addClass('a b', 'c') === 'a b c' );
console.log('task4', addClass('a b c', 'c') === 'a b c' );

// task 4
/**
 * добавить класс, если его нет в строке и удалить, если он там есть
 *
 * @param {string} classNameStr
 * @param {string} toggledClass
 *
 * @returns {string}
 */
function toggleClass(classNameStr, toggledClass) {
    if (hasClass(classNameStr, toggledClass)) {
        return removeClass(classNameStr, toggledClass);
    }

    return addClass(classNameStr, toggledClass);
}

console.log('task 4', toggleClass('a b c', 'b') === 'a c');
console.log('task 4', toggleClass('a c', 'b') === 'a c b');

// task 5
/**
 * функция формирования классов из объекта
 * Ключами обьекта, являются имена классов, значениями булевые true/false
 * если стоит true, то класс добавляется к строке, если false, то не добавляется
 * Object.keys, Object.values, Object.entries, for in
 *
 * @param {string} classNameStr
 * @param {Object.<string, boolean> | string | null | undefined | false } classObj
 *
 * @result string
 */
function cn(classNameStr, classObj) {
    let result = classNameStr.split(' ');

    if (!classObj) {
        // string -> false -> string.length === 0
        // null -> false
        // undefined -> false
        return getClassName(result);
    }

    if (typeof classObj === 'string') {
        result.push(classObj);
    } else {
        for (const className in classObj) {
            if (classObj[className]) {
                result.push(className);
            }
        }
    }

    /**
     * Join unick classNames in string
     *
     * @param {string[]} classArr
     * @return {string}
     */
    function getClassName(classArr) {
        const classObj = {};

        for (let i=0; i<classArr.length; i++) {
            classObj[classArr[i]] = true;
        }

        // const result = [];

        // for (const className in classObj) {
        //     result.push(className);
        // }

        const result = Object.keys(classObj);

        return result.join(' ');
    }

    return getClassName(result);
}

console.log('task 5', cn('a b', { c: true, d: false, e: true }) === 'a b c e');
console.log('task 5', cn('a b', { c: false, d: false, e: true, b: true }) === 'a b e');

// task 6
// сформировать массив состоящий из elementsCount элементов
// первый и второй элемент этого массива передаются
// каждый следующий элемент получается путем суммы двух предидущих
function fib(firstElement, lastElement, elementsCount = 10) {
}

console.log('task 6', fib(1, 1, 10).join(',') === [1, 1, 2, 3, 5, 8, 13, 21, 34, 55].join(','));
console.log('task 6', fib(2, 4, 4).join(',') === [2, 4, 6, 10].join(','));

// task 7
// Найти произведение элементов массива
function mult(arr) {
}

console.log('task 7', mult([1, 2, 3, 1]) === 1*2*3*1 );
console.log('task 7', mult([1, 3, 3, 5]) === 1*3*3*5 );
