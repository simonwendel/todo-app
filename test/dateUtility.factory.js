import 'JamieMason/Jasmine-Matchers';
import { dateUtility } from 'js/dateUtility.factory';

describe('Factory: dateUtility (dateUtility.factory.js)', function() {

    const service = dateUtility();

    it('should have an addDays function that can add a positive number of days to a date.', () => {

        var dec17 = new Date('December 17, 1995 03:24:00'),
            jan2 = service.addDays(dec17, 16);

        expect(jan2).toEqual(new Date('January 2, 1996 03:24:00'));

    });

    it('should have an addDays function that can add a negative number of days to a date.', () => {

        var dec17 = new Date('December 17, 1995 03:24:00'),
            nov28 = service.addDays(dec17, -19);

        expect(nov28).toEqual(new Date('November 28, 1995 03:24:00'));

    });

});
