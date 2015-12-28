import 'JamieMason/Jasmine-Matchers';
import angular from 'angular';
import { ng } from 'test/utilities/mocks';

let element,
    provide,
    scope,
    modal,
    todoToDelete,
    repositoryMock;

describe('Directive: deleteTodoDirective (deleteTodo.directive.js)', () => {

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

    it('should call the repository remove fn to delete the todo on vm.removeTodo.', () => {

        scope.vm.removeTodo();
        expect(repositoryMock.removeTodo.calledWith(todoToDelete.id)).toBe(true);

    });

    it('should destroy the modal on scope vm.removeTodo fn call.', () => {

        scope.vm.removeTodo();
        expect(modal.remove.called).toBe(true);

    });

});

function fixtureSetup($rootScope, $compile) {
    repositoryMock = {
        removeTodo: sinon.stub()
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

    todoToDelete = { id: 8 };
    pageScope.todoToDelete = todoToDelete;

    provide.value('$ionicModal', ionicModal);

    element = angular.element('<button c-delete-todo="todoToDelete"></button>');
    element = $compile(element)(pageScope);
    pageScope.$digest();

    scope = element.isolateScope();
}
