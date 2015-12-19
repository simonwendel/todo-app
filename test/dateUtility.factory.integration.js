import 'JamieMason/Jasmine-Matchers';

import { momentFactory } from 'js/moment.factory';
import { dateUtilityFactory } from 'js/dateUtility.factory';

describe('Factory: dateUtilityFactory (dateUtility.factory.js) INTEGRATION TESTS', () => {

    const dateUtility = dateUtilityFactory(momentFactory());

    describe('Product: dateUtility', () => {

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

        it('should return -1 when comparing dates if first is less than second.', () => {

            let dec17 = new Date('December 29, 1994 03:24:00'),
                dec18 = new Date('December 18, 1995 00:01:00');

            expect(dateUtility.compareDatePart(dec17, dec18)).toBe(-1);

        });

        it('should return 0 when comparing dates if first is equal to second.', () => {

            let dec17 = new Date('December 17, 1995 03:24:00'),
                dec17asWell = new Date('December 17, 1995 00:01:00');

            expect(dateUtility.compareDatePart(dec17, dec17asWell)).toBe(0);

        });

        it('should return 1 when comparing dates if first is greater than second.', () => {

            let dec17 = new Date('December 17, 1995 03:24:00'),
                dec18 = new Date('December 18, 1995 00:01:00');

            expect(dateUtility.compareDatePart(dec18, dec17)).toBe(1);

        });

    });

});
