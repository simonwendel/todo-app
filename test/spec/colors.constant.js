;(function () {
    'use strict';

    var colors;

    describe('Constant: colors (colors.constant.js)', function () {

        beforeEach(module('todo'));

        beforeEach(inject(fixtureSetup));

        it('should be an array of six color strings.', function () {
            expect(colors instanceof Array).toBeTruthy();
            expect(colors.length).toBe(6);
        });
    });

    function fixtureSetup(_colors_) {
        colors = _colors_;
    }
})();
