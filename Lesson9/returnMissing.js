/*
function getMissingElement(superImportantArray) {
    // Пройтись в цикле от 0 до 9
    for (let lookingNumber = 0; lookingNumber <= 9; lookingNumber++) {
        // попытаться найти коробочку с нужной цифрой
        const inArray = superImportantArray.includes(lookingNumber);

        // find: возвращает значение первого найденного в массиве элемента,
        // которое удовлетворяет условию переданному в callback функции

        // findIndex: возвращает индекс в массиве, если элемент удовлетворяет
        // условию проверяющей функции. В противном случае возвращается -1.

        // includes определяет, содержит ли массив определённый элемент,
        // возвращая в зависимости от этого true или false

        // indexOf() возвращает первый индекс, по которому данный элемент может
        // быть найден в массиве или -1, если такого индекса нет

        // если не нашли, то этой цифры нету
        if (!inArray) {
            return lookingNumber;
        }
    }

    throw new Error('All digits in array');
}
*/

function getMissingElement(superImportantArray) {
    const arrSumm = superImportantArray.reduce(
        function (sum, el) {
            return sum + el;
        },
        0
    );
    const expectedSumm = 45;

    return expectedSumm - arrSumm;
}

console.log( getMissingElement([0, 2, 9, 3, 5, 6, 7, 8, 1]) ); // 4
