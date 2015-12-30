import 'JamieMason/Jasmine-Matchers';
import angular from 'angular';
import { ng } from 'test/utilities/mocks';

let element,
    provide,
    scope,
    modal,
    todoToMark,
    repositoryMock;

describe('Directive: markAsDoneDirective (markAsDone.directive.js)', () => {

    beforeEach(ng.module('todo', ($provide) => {
        provide = $provide;
    }));

    beforeEach(ng.inject(fixtureSetup));

    it('should retrieve a modal instance from ionic.', () => {

        expect(scope.modal).toBe(modal);

    });

    it('should have a function for opening the modal attached to vm.', () => {

        scope.vm.openModal();
        expect(modal.show.called).toBe(true);

    });

    it('should have a function for closing the modal attached to vm.', () => {

        scope.vm.closeModal();
        expect(modal.hide.called).toBe(true);

    });

    it('should clean up after itself by destroying the modal on scope destruction.', () => {

        scope.$broadcast('$destroy');
        expect(modal.remove.called).toBe(true);

    });

    it('should call modal.show when element is clicked.', () => {

        element.triggerHandler('click');
        expect(modal.show.called).toBe(true);

    });

    it('should call the repo markTodo fn to mark the todo as done on vm.markTodo.', () => {

        scope.vm.markTodo();
        expect(repositoryMock.markTodo.calledWith(todoToMark)).toBe(true);

    });

    it('should hide the modal on scope vm.markTodo fn call.', () => {

        scope.vm.markTodo();
        expect(modal.hide.called).toBe(true);

    });

});

function fixtureSetup($rootScope, $compile) {
    repositoryMock = {
        markTodo: sinon.stub()
    };

    provide.value('repository', repositoryMock);

    modal = {
        show: sinon.stub(),
        hide: sinon.stub(),
        remove: sinon.stub()
    };

    let pageScope = $rootScope.$new(),
        ionicModal = {
            fromTemplate: () => modal
        };

    todoToMark = {};
    pageScope.todoToMark = todoToMark;

    provide.value('$ionicModal', ionicModal);

    element = angular.element('<button c-mark-as-done="todoToMark"></button>');
    element = $compile(element)(pageScope);
    pageScope.$digest();

    scope = element.isolateScope();
}
