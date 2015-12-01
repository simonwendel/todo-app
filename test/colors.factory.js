import 'JamieMason/Jasmine-Matchers';
import { colorsFactory } from 'js/colors.factory';

describe('Factory: colorsFactory (colors.factory.js)', () => {

    const colors = colorsFactory();

    describe('Product: colors', () => {

        it('should be an array of six color strings.', () => {

            expect(colors).toBeArray();
            expect(colors.length).toBe(6);

        });

    });

});
