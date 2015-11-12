;(function() {
    'use strict';

    var element,
        modal,
        provide,
        scope;

    describe('Directive: newTodoButton', function() {

        beforeEach(module('todo.test.templates'));

        beforeEach(module('todo.test.utils'));

        beforeEach(module('todo', function fetchProvide($provide) {
            provide = $provide;
        }));

        beforeEach(fixtureSetup);

        it('should retrieve a modal instance from ionic.', function() {
            expect(scope.modal).toBe(modal);
        });

        it('should have a function for opening the modal attached to vm.', function() {
            scope.vm.openModal();
            expect(modal.show.called).toBeTruthy();
        });

        it('should have a function for closing the modal attached to vm.', function() {
            scope.vm.closeModal();
            expect(modal.hide.called).toBeTruthy();
        });

        it('should clean up after itself by destroying the modal on scope desctruction.', function() {
            scope.$broadcast('$destroy');
            expect(modal.remove.called).toBeTruthy();
        });

        it('should call modal.show when element is clicked.', function() {
            element.triggerHandler('click');
            expect(modal.show.called).toBeTruthy();
        });
    });

    function fixtureSetup() {
        inject(function($rootScope, $compile, fakePromise) {
            modal = {
                show: sinon.spy(),
                hide: sinon.spy(),
                remove: sinon.spy()
            };

            fakePromise.init(modal);
            var pageScope = $rootScope.$new(),
                ionicModal = {
                    fromTemplateUrl: fakePromise.resolved
                };

            provide.value('$ionicModal', ionicModal);
            element = angular.element('<button new-todo-button></button>');
            element = $compile(element)(pageScope);
            pageScope.$digest();

            scope = element.isolateScope();
        });
    }
})();
