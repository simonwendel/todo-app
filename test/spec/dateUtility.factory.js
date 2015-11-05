;(function () {
    'use strict';

    var dateUtility;

    describe('Factory: dateUtility (dateUtility.factory.js)', function () {

        beforeEach(module('todo'));

        beforeEach(inject(fixtureSetup));

        it('should have an addDays function that can add a positive number of days to a date.', function () {
            var dec17 = new Date('December 17, 1995 03:24:00');
            var jan2 = dateUtility.addDays(dec17, 16);
            expect(jan2).toEqual(new Date('January 2, 1996 03:24:00'));
        });

        it('should have an addDays function that can add a negative number of days to a date.', function () {
            var dec17 = new Date('December 17, 1995 03:24:00');
            var nov28 = dateUtility.addDays(dec17, -19);
            expect(nov28).toEqual(new Date('November 28, 1995 03:24:00'));
        });
    });

    function fixtureSetup(_dateUtility_) {
        dateUtility = _dateUtility_;
    }
})();
