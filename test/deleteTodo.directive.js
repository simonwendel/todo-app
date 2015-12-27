import 'JamieMason/Jasmine-Matchers';
import angular from 'angular';
import { ng } from 'test/utilities/mocks';

let element,
    provide,
    scope,
    modal;

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

    it('should clean up after itself by destroying the modal on scope desctruction.', () => {

        scope.$broadcast('$destroy');
        expect(modal.remove.called).toBe(true);

    });

    it('should call modal.show when element is clicked.', () => {

        element.triggerHandler('click');
        expect(modal.show.called).toBe(true);

    });

});

function fixtureSetup($rootScope, $compile) {
    modal = {
        show: sinon.stub(),
        hide: sinon.stub(),
        remove: sinon.stub()
    };

    let pageScope = $rootScope.$new(),
        ionicModal = {
            fromTemplate: () => modal
        };

    provide.value('$ionicModal', ionicModal);

    element = angular.element('<button c-delete-todo></button>');
    element = $compile(element)(pageScope);
    pageScope.$digest();

    scope = element.isolateScope();
}
