;(function() {
    'use strict';

    var element,
        pageScope;

    describe('Directive: todoList', function() {

        beforeEach(module('todo.test.templates'));

        beforeEach(module('todo'));

        beforeEach(fixtureSetup);

        it('should be defined.', function() {
            expect(element.html()).toBeDefined();
        });
    });

    function fixtureSetup() {
        inject(function($rootScope, $compile) {
            pageScope = $rootScope.$new();

            element = angular.element('<todo-list></todo-list>');
            element = $compile(element)(pageScope);
            pageScope.$digest();
        });
    }
})();
