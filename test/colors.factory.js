import 'JamieMason/Jasmine-Matchers';
import { colorsFactory } from 'js/colors.factory';

let colors,
    mockTranslate;

describe('Factory: colorsFactory (colors.factory.js)', () => {

    beforeEach(fixtureSetup);

    describe('Product: colors', () => {

        it('should produce an array of six color strings.', () => {

            let prod = colors.getAll();
            expect(prod).toBeArray();
            expect(prod.length).toBe(6);

        });

        it('should make all names translated by the translate service.', () => {

            let prod = colors.getAll();
            expect(mockTranslate.callCount).toBe(6);
            expect(prod.every(c => c.colorName === 'TRANSLATED!!1')).toBe(true);

        });

    });

});

function fixtureSetup() {
    mockTranslate = sinon.stub().returns('TRANSLATED!!1');
    colors = colorsFactory(mockTranslate);
}
