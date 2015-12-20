import 'JamieMason/Jasmine-Matchers';
import { Color } from 'js/types';

describe('Class: Color (types.js)', () => {

    describe('Constructor', () => {

        it('should set prop values from passed in parameters.', () => {

            let color = new Color('someKindOfColor', 'WhateverTheValueIs');
            expect(color.colorName).toBe('someKindOfColor');
            expect(color.colorValue).toBe('WhateverTheValueIs');

        });

        it('should enforce argument types.', () => {

            expect(() => new Color(1, true)).toThrow();

        });

    });

});
