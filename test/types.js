import 'JamieMason/Jasmine-Matchers';
import { Todo, Color } from 'js/types';
import * as allExports from 'js/types';


describe('Types bundle: * (types.js)', () => {

    it('should have 2 (re-)exports.', () => {

        expect(Object.keys(allExports).length).toBe(2);

    });

    it('should export Todo class.', () => {

        expect(Todo).toBeFunction();

    });

    it('should export Color class.', () => {

        expect(Color).toBeFunction();

    });

});
