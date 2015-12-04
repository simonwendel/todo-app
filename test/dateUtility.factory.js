import 'JamieMason/Jasmine-Matchers';
import { dateUtilityFactory } from 'js/dateUtility.factory';

let dateUtility,
    momentMock,
    now;

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
                jan2 = dateUtility.addDays(dec17, 16);

            expect(jan2).toEqual(new Date('January 2, 1996 03:24:00'));

        });

        it('should have an addDays function that can add a negative number of days to a date.', () => {

            let dec17 = new Date('December 17, 1995 03:24:00'),
                nov28 = dateUtility.addDays(dec17, -19);

            expect(nov28).toEqual(new Date('November 28, 1995 03:24:00'));

        });

    });

});

function fixtureSetup() {
    now = new Date();
    momentMock = sinon.stub().returns({
        toDate: () => now
    });
    
    dateUtility = dateUtilityFactory(momentMock);
}
