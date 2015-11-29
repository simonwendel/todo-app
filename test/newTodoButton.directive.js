import 'JamieMason/Jasmine-Matchers';
import { ng } from 'test/utilities/mocks';

let element,
    modal,
    provide,
    scope,
    colors,
    repository;

describe('Directive: newTodoButtonDirective', () => {

    beforeEach(ng.module('todo', ($provide) => {
        provide = $provide;
    }));

    beforeEach(ng.inject(fixtureSetup));

    it('should retrieve a modal instance from ionic.', () => {

        expect(scope.modal).toBe(modal);

    });

    it('should have a function for opening the modal attached to vm.', () => {

        scope.vm.openModal();
        expect(modal.show.called).toBeTruthy();

    });

    it('should have a function for closing the modal attached to vm.', () => {

        scope.vm.closeModal();
        expect(modal.hide.called).toBeTruthy();

    });

    it('should clean up after itself by destroying the modal on scope desctruction.', () => {

        scope.$broadcast('$destroy');
        expect(modal.remove.called).toBeTruthy();

    });

    it('should call modal.show when element is clicked.', () => {

        element.triggerHandler('click');
        expect(modal.show.called).toBeTruthy();

    });

    it('should attach the color array to vm.', () => {

        expect(scope.vm.availableColors).toBe(colors);

    });

    it('should set the first color as the selected color.', () => {

        expect(scope.vm.selectedColor).toBe(colors[0]);

    });

    it('should save a new todo item when save function on vm is called.', () => {

        let expected = {
            title: 'Some title',
            description: 'This is a longer description',
            color: 'color 1',
            recurring: 7
        };

        scope.vm.title = expected.title;
        scope.vm.description = expected.description;
        scope.vm.selectedColor = expected.color;
        scope.vm.reccuring = expected.recurring;

        scope.vm.saveNewTodo();

        expect(repository.newTodo.called).toBeTruthy();

    });

    it('should remove the modal after save is completed.', () => {

        scope.vm.saveNewTodo();
        expect(modal.hide.called).toBeTruthy();

    });
});

function fixtureSetup($rootScope, $compile) {
    modal = {
        show: sinon.spy(),
        hide: sinon.spy(),
        remove: sinon.spy()
    };

    repository = {
        newTodo: sinon.spy()
    };

    provide.value('todoRepository', repository);

    let pageScope = $rootScope.$new(),
        ionicModal = {
            fromTemplate: () => modal
        };

    provide.value('$ionicModal', ionicModal);

    colors = ['1', '2'];
    provide.constant('colors', colors);

    element = angular.element('<button new-todo-button></button>');
    element = $compile(element)(pageScope);
    pageScope.$digest();

    scope = element.isolateScope();
}
