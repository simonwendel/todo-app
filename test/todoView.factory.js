import 'JamieMason/Jasmine-Matchers';
import { todoViewFactory } from 'js/todoView.factory';

const todoView = todoViewFactory();

describe('Factory: todoViewFactory (todoView.factory.js)', () => {

    describe('Product: todoView', () => {

        it('should exist.', () => {

            expect(todoView).toBeDefined();

        });

    });

});
