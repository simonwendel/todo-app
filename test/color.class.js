import 'JamieMason/Jasmine-Matchers';
import { Color } from 'js/color.class';

describe('Class: Color (color.class.js)', () => {

    describe('Constructor', () => {

        it('should set prop values from passed in parameters.', () => {

            let color = new Color('someKindOfColor', 'WhateverTheValueIs');
            expect(color.name).toBe('someKindOfColor');
            expect(color.value).toBe('WhateverTheValueIs');

        });

        it('should enforce argument types.', () => {

            expect(() => new Color(1, true)).toThrow();

        });

    });

});
