;(function() {
    'use strict';

    var element,
        pageScope,
        provide,
        todoRepository;

    describe('Directive: todoList', function() {

        beforeEach(module('todo.test.templates'));

        beforeEach(module('todo', function fetchProvide($provide) {
            provide = $provide;
        }));

        beforeEach(inject(fixtureSetup));

        it('should be defined.', function() {
            expect(element.html()).not.toBe('');
        });

        it('should call getTodo on todoRepository at init.', function() {
            expect(todoRepository.getTodo.called).toBeTruthy();
        });
    });

    function fixtureSetup($rootScope, $compile) {
        todoRepository = {
            getTodo: sinon.spy()
        };

        provide.value('todoRepository', todoRepository);
        pageScope = $rootScope.$new();

        element = angular.element('<todo-list></todo-list>');
        element = $compile(element)(pageScope);
        pageScope.$digest();
    }
})();
