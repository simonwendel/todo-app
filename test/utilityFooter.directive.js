;(function() {
    'use strict';

    var element,
        pageScope;

    describe('Directive: utilityFooter', function() {

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

            element = angular.element('<utility-footer></utility-footer>');
            element = $compile(element)(pageScope);
            pageScope.$digest();
        });
    }
})();
