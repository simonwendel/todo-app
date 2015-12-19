import 'JamieMason/Jasmine-Matchers';

import { dateUtilityFactory } from 'js/dateUtility.factory';

const ken = 'February 4, 1943';

let dateUtility,
    momentMock,
    now,
    formatMock;

describe('Factory: dateUtilityFactory (dateUtility.factory.js)', () => {

    beforeEach(fixtureSetup);

    describe('Product: dateUtility', () => {

        it('should use moment for resolving a now() function return.', () => {

            let date = dateUtility.now();
            expect(date).toBe(now);
            expect(momentMock.called).toBe(true);

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
