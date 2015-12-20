import 'JamieMason/Jasmine-Matchers';
import { Color } from 'js/types';
import { colorsFactory } from 'js/colors.factory';

let colors,
    mockTranslate;

describe('Factory: colorsFactory (colors.factory.js)', () => {

    beforeEach(fixtureSetup);

    describe('Product: colors', () => {

        it('should produce an array of six color strings.', () => {

            let allColors = colors.getAll();
            expect(allColors.length).toBe(6);
            expect(allColors.every(c => c instanceof Color)).toBe(true);

        });

        it('should make all names translated by the translate service.', () => {

            let allColors = colors.getAll();
            expect(mockTranslate.instant.callCount).toBe(6);
            expect(allColors.every(c => c.colorName === 'TRANSLATED!!1')).toBe(true);

        });

    });

});

function fixtureSetup() {
    mockTranslate = {
        instant: sinon.stub().returns('TRANSLATED!!1')
    };

    colors = colorsFactory(mockTranslate);
}
