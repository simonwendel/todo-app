import 'JamieMason/Jasmine-Matchers';
import angular from 'angular';
import { ng } from 'test/utilities/mocks';

const dmr = 'September 9, 1941';

let element,
    scope,
    provide,
    viewMock;

describe('Directive: headerDirective', () => {

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
        expect(viewMock.nextDay.calledOnce).toBe(true);

    });

    it('should call add step to previous day fn to scope.', () => {

        scope.vm.previousDay();
        expect(viewMock.previousDay.calledOnce).toBe(true);

    });

    it('should have a date string from view on scope.', () => {

        expect(viewMock.showDate.called).toBe(true);
        expect(scope.vm.date).toBeString();
        expect(scope.vm.date).toBe(dmr);

    });

    it('should subscribe to the view.', () => {

        expect(viewMock.subscribe.called).toBe(true);

    });

    it('should own a flag tracking if viewing today or not.', () => {

        expect(viewMock.isToday.called).toBe(true);
        expect(scope.vm.isToday).toBe(true);

    });

});

function fixtureSetup($rootScope, $compile) {
    viewMock = {
        showDate: sinon.stub().returns(dmr),
        nextDay: sinon.stub(),
        previousDay: sinon.stub(),
        subscribe: sinon.stub(),
        viewingDate: sinon.stub(),
        isToday: sinon.stub().returns(true)
    };

    provide.value('view', viewMock);

    let pageScope = $rootScope.$new();

    element = angular.element('<c-header></c-header>');
    element = $compile(element)(pageScope);
    pageScope.$digest();

    scope = element.isolateScope();
}
