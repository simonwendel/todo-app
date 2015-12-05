import 'JamieMason/Jasmine-Matchers';
import { ng } from 'test/utilities/mocks';

let element,
    scope,
    provide,
    todoViewMock;

describe('Directive: utilityHeaderDirective', () => {

    beforeEach(ng.module('todo', $provide => {
        provide = $provide;
    }));

    beforeEach(ng.inject(fixtureSetup));

    it('should be defined.', () => {

        expect(element.html()).toBeDefined();
        expect(element.html()).not.toBe('');

    });

    it('should call add step to next day fn to scope.', () => {

        scope.vm.nextDay();
        expect(todoViewMock.nextDay.calledOnce).toBe(true);

    });

    it('should call add step to previous day fn to scope.', () => {

        scope.vm.previousDay();
        expect(todoViewMock.previousDay.calledOnce).toBe(true);

    });

});

function fixtureSetup($rootScope, $compile) {
    todoViewMock = {
        nextDay: sinon.stub(),
        previousDay: sinon.stub()
    };

    provide.value('todoView', todoViewMock);

    let pageScope = $rootScope.$new();

    element = angular.element('<c-utility-header></c-utility-header>');
    element = $compile(element)(pageScope);
    pageScope.$digest();

    scope = element.isolateScope();
}
