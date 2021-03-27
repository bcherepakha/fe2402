/* eslint-disable no-undef */

describe('arrayMethods', function() {
    describe('join(arr, str)', () => {
        it('Join array of string', () => {
            chai.assert.equal(
                join(
                    [
                        'Hello',
                        'world!'
                    ],
                    ', '
                ),
                'Hello, world!'
            );
        });

        it('Join array of different types', () => {
            chai.assert.equal(
                join(
                    [1, 2, 3, 4, 'vasya'],
                    ' - '
                ),
                '1 - 2 - 3 - 4 - vasya'
            );
        });
    });

    describe('map( arr, transformHandler )', () => {
        it('doubles array item', () => {
            const doubleHandler = function (el) { return el * 2; };

            chai.assert.equal(
                join(
                    map( [1, 2, 3, 4], doubleHandler ),
                    ','
                )
                ,
                join(
                    [2, 4, 6, 8],
                    ','
                )
            );
        });

        it('index array item', () => {
            const indexHandler = function (el, idx) { return el * idx; };

            chai.assert.deepEqual(
                map( [1, 2, 3, 4], indexHandler ),
                [0, 2, 6, 12]
            );
        });
    });

    describe('filter( arr, checkHandler)', () => {
        it('get only elements more than 5', () => {
            const filterHandler = function (el) {
                return el > 5;
            };

            chai.assert.deepEqual(
                filter([1, 2, 3, 4, 5, 6], filterHandler),
                [6]
            );
        });

        it('get only elements between 2 and 5', () => {
            const filterHandler = function (el) {
                return el > 2 && el < 5;
            };

            chai.assert.deepEqual(
                filter([1, 2, 3, 4, 5, 6], filterHandler),
                [3, 4]
            );
        });
    });

    describe('concat()', () => {
        it('concats arrays', () => {
            chai.assert.deepEqual(
                concat(
                    [1, 2],
                    '3',
                    [4, 5],
                    [6, true, '8', 9],
                    10
                ),
                [1, 2, '3', 4, 5, 6, true, '8', 9, 10]
            );
        });
    });

    describe('find(arr, conditionHandler)', () => {
        it('find 3', () => {
            chai.assert.equal(
                find(
                    [1, 2, 3, 4, 5, 6],
                    function(el) { return el < 5 && el > 2; }
                ),
                3
            );
        });
    });

    describe('every(arr, conditionHandler)', () => {
        it('is all elements smaller than 3', () => {
            chai.assert.strictEqual(
                every([1, 2, 3, 4, 5], function(el) { return el < 3; }),
                false
            );
        });
        it('is all elemnents more than 0', () => {
            chai.assert.strictEqual(
                every([1, 2, 3, 4, 5], function(el) { return el > 0; }),
                true
            );
        });
    });

    describe('some(arr, conditionHandler)', () => {
        it('has element smaller than 3', () => {
            chai.assert.equal(
                some([1, 2, 3, 4, 5], function(el) { return el < 3; }),
                true
            );
        });
        it('has element more than 4', () => {
            chai.assert.equal(
                some([1, 2, 3, 4, 5], function(el) { return el > 4; }),
                true
            );
        });
        it('has element more than 5', () => {
            chai.assert.equal(
                some([1, 2, 3, 4, 5], function(el) { return el > 5; }),
                false
            );
        });
    });

    describe('reduce(arr, reducer, initialResultValue)', () => {
        it('get arr mult', () => {
            chai.assert.equal(
                reduce(
                    [1, 2, 3, 4],
                    function (accumulator, el) { return el * accumulator; },
                    1
                ),
                24
            );
        });
        it('get arr sum', () => {
            chai.assert.equal(
                reduce(
                    [1, 2, 3, 4],
                    function (accumulator, el) { return el + accumulator; },
                    0
                ),
                10
            );
        });
    });
});
