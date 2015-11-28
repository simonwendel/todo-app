;(function() {
    'use strict';

    var element,
        pageScope;

    describe('Directive: utilityHeader', function() {

        beforeEach(module('todo.test.templates'));

        beforeEach(module('todo'));

        beforeEach(fixtureSetup);

        it('should be defined.', function() {
            expect(element.html()).not.toBe('');
        });
    });

    function fixtureSetup() {
        inject(function($rootScope, $compile) {
            pageScope = $rootScope.$new();

            element = angular.element('<utility-header></utility-header>');
            element = $compile(element)(pageScope);
            pageScope.$digest();
        });
    }
})();
