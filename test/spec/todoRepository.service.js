;(function () {
    'use strict';

    var todoRepository;

    describe('Factory: todoRepository (todoRepository.service.js)', function () {

        beforeEach(module('todo'));

        beforeEach(inject(fixtureSetup));

        it('should be defined and accessible through the angular module system.', function () {
            expect(todoRepository).toBeDefined();
        });
    });

    function fixtureSetup(_todoRepository_) {
        todoRepository = _todoRepository_;
    }
})();
