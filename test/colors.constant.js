import 'JamieMason/Jasmine-Matchers';
import { colors } from 'js/colors.constant';

describe('Constant: colors (colors.constant.js)', () => {

    it('should be an array of six color strings.', () => {

        expect(colors).toBeArray();
        expect(colors.length).toBe(6);

    });

});
