/* eslint-disable no-unused-vars */
/**
 * Метод join() объединяет все элементы массива в строку.
 *
 * @param {[]} arr
 * @param {string} str
 *
 * @return {string}
 */
function join(arr, str) {
    let i = 0;
    let result = '';

    while (i < arr.length) {
        result += arr[i];

        if (i !== arr.length -1) {
            result += str;
        }

        i++;
    }

    return result;
}

/**
 * @callback ArrTransformHandler
 * @param {*} el
 * @param {number} [index]
 * @param {[]} [arr]
 *
 * @returns {*}
 */

/**
 * Метод map() создаёт новый массив с результатом вызова указанной функции
 * для каждого элемента массива.
 *
 * @param {[]} arr
 * @param {ArrTransformHandler} transformHandler
 */
function map( arr, transformHandler ) {
    const result = [];

    for (let i=0; i<arr.length; i++) {
        result.push(
            transformHandler(arr[i], i, arr)
        );
    }

    return result;
}

/**
 * @callback ArrCheckHandler
 * @param {*} el
 * @param {number} [index]
 * @param {[]} [arr]
 *
 * @returns {boolean}
 */

/**
 * Метод filter() создаёт новый массив со всеми элементами,
 * прошедшими проверку, задаваемую в передаваемой функции.
 *
 * @param {[]} arr
 * @param {ArrCheckHandler} checkHandler
 *
 * @returns {[]}
 */
function filter( arr, checkHandler) {
    const result = [];

    for (let i = 0; i < arr.length; i++) {
        if (checkHandler(arr[i], i, arr)) {
            result.push(
                arr[i]
            );
            // result[result.length] = arr[i];
        }
    }

    return result;
}

/**
 * Метод concat() возвращает новый массив, состоящий из массива,
 * на котором он был вызван, соединённого с другими массивами и/или значениями,
 * переданными в качестве аргументов.
 *
 * @returns {[]}
 */
function concat() {
    const result = [];

    for (let i=0; i < arguments.length; i++) {
        const currentArgument = arguments[i];

        if (Array.isArray(currentArgument)) {
            for (let j=0; j < currentArgument.length; j++) {
                result.push(
                    currentArgument[j]
                );
            }
        } else {
            result.push(
                currentArgument
            );
        }
    }

    return result;
}

/**
 * @callback ArrConditionHandler
 * @param {*} el
 * @param {number} [index]
 * @param {[]} [arr]
 *
 * @returns {boolean}
 */

/**
 * Метод find() возвращает значение первого найденного в массиве элемента,
 * которое удовлетворяет условию переданному в condition функции.
 * В противном случае возвращается undefined.
 *
 * @param {[]} arr
 * @param {ArrConditionHandler} conditionHandler
 * @return {*}
 */
function find(arr, conditionHandler) {
    for (let i=0; i < arr.length; i++) {
        if (conditionHandler(arr[i], i, arr)) {
            return arr[i];
        }
    }
}

/**
 * Метод every() проверяет, удовлетворяют ли все элементы массива условию,
 * заданному в передаваемой функции.
 *
 * @param {[]} arr
 * @param {ArrConditionHandler} conditionHandler
 * @returns {boolean}
 */
function every(arr, conditionHandler) {
    for (let i=0; i < arr.length; i++) {
        if (!conditionHandler(arr[i], i, arr)) {
            return false;
        }
    }

    return true;
}

/**
 * Метод some() проверяет, удовлетворяет ли какой-либо элемент массива условию,
 * заданному в передаваемой функции.
 *
 * @param {[]} arr
 * @param {ArrConditionHandler} conditionHandler
 * @returns {boolean}
 */
function some(arr, conditionHandler) {
    for (let i=0; i < arr.length; i++) {
        if (conditionHandler(arr[i], i, arr)) {
            return true;
        }
    }

    return false;
}

/**
 * @callback ArrReducer
 * @param {*} resultValue
 * @param {*} el
 * @param {number} [index]
 * @param {[]} [arr]
 *
 * @returns {boolean}
 */

/**
 * Метод reduce() применяет функцию reducer к каждому элементу массива (слева-направо),
 * возвращая одно результирующее значение.
 *
 * @param {[]} arr
 * @param {ArrReducer} reducer
 * @param {*} initialResultValue
 * @returns {*}
 */
function reduce(arr, reducer, initialResultValue) {
    let result = initialResultValue;

    for (let i=0; i < arr.length; i++) {
        result = reducer(result, arr[i], i, arr);
    }

    return result;
}
