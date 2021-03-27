/* eslint-disable no-undef */

describe('arrayTasks', function () {
    const classNames = ['firstClass', 'secondClass', 'thirdClass'];

    describe('getClassName(classNames)', function() {
        it('should by a class string', function() {
            chai.assert.strictEqual(
                getClassName(classNames),
                'firstClass secondClass thirdClass'
            );
        });
    });

    describe('removeClass(classNameStr, removedClass)', function() {
        it('should remove g', function() {
            chai.assert.strictEqual(
                removeClass('t g m', 'g'),
                't m'
            );
        });

        it('should not remove g', function() {
            chai.assert.strictEqual(
                removeClass('t k m', 'g'),
                't k m'
            );
        });

        it('should remove g double', function() {
            chai.assert.strictEqual(
                removeClass('t g g m', 'g'),
                't m'
            );
        });
    });
});
