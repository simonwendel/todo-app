import 'JamieMason/Jasmine-Matchers';
import { dateUtilityFactory } from 'js/dateUtility.factory';

const ken = '1943-02-04';

let dateUtility,
    momentMock,
    now,
    formatMock;

describe('Factory: dateUtilityFactory (dateUtility.factory.js)', function() {

    beforeEach(fixtureSetup);

    describe('Product: dateUtility', () => {

        it('should use moment for resolving a now() function return.', () => {

            let date = dateUtility.now();
            expect(date).toBe(now);
            expect(momentMock.called).toBe(true);

        });

        it('should have an addDays function that can add a positive number of days to a date.', () => {

            let dec17 = new Date('December 17, 1995 03:24:00'),
                jan2 = dateUtility.addDays(16, dec17);

            expect(jan2).toEqual(new Date('January 2, 1996 03:24:00'));

        });

        it('should have an addDays function that can add a negative number of days to a date.', () => {

            let dec17 = new Date('December 17, 1995 03:24:00'),
                nov28 = dateUtility.addDays(-19, dec17);

            expect(nov28).toEqual(new Date('November 28, 1995 03:24:00'));

        });

        it('should have a display function to render a date for output.', () => {

            expect(dateUtility.display(new Date())).toBe(ken);
            expect(formatMock.called).toBe(true);

        });

    });

});

function fixtureSetup() {
    now = new Date();
    formatMock = sinon.stub().returns(ken);

    momentMock = sinon.stub().returns({
        toDate: () => now,
        format: formatMock
    });

    dateUtility = dateUtilityFactory(momentMock);
}
