import 'JamieMason/Jasmine-Matchers';
import { ng } from 'test/utilities/mocks';

let element,
    modal,
    provide,
    scope,
    allColors,
    repositoryMock;

describe('Directive: createTodoDirective (createTodo.directive.js)', () => {

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

    it('should clean up after itself by destroying the modal on scope desctruction.', () => {

        scope.$broadcast('$destroy');
        expect(modal.remove.called).toBe(true);

    });

    it('should call modal.show when element is clicked.', () => {

        element.triggerHandler('click');
        expect(modal.show.called).toBe(true);

    });

    it('should attach the color array to vm.', () => {

        expect(scope.vm.availableColors).toEqual(allColors);

    });

    it('should set the first color as the selected color.', () => {

        expect(scope.vm.selectedColor).toEqual(allColors[0]);

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

        expect(repositoryMock.newTodo.called).toBe(true);

    });

    it('should remove the modal after save is completed.', () => {

        scope.vm.saveNewTodo();
        expect(modal.hide.called).toBe(true);

    });
});

function fixtureSetup($rootScope, $compile, colors) {
    modal = {
        show: sinon.spy(),
        hide: sinon.spy(),
        remove: sinon.spy()
    };

    repositoryMock = {
        newTodo: sinon.spy()
    };

    provide.value('repository', repositoryMock);

    let pageScope = $rootScope.$new(),
        ionicModal = {
            fromTemplate: () => modal
        };

    provide.value('$ionicModal', ionicModal);

    // lazyness makes me just go ahead and use the actual "colors" factory...
    allColors = colors.getAll();

    element = angular.element('<button c-create-todo></button>');
    element = $compile(element)(pageScope);
    pageScope.$digest();

    scope = element.isolateScope();
}
