import 'JamieMason/Jasmine-Matchers';
import angular from 'angular';
import { ng } from 'test/utilities/mocks';

let element,
    pageScope,
    provide,
    viewMock;

describe('Directive: listDirective (list.directive.js)', () => {

    beforeEach(ng.module('todo', ($provide) => {
        provide = $provide;
    }));

    beforeEach(ng.inject(fixtureSetup));

    it('should be defined.', () => {

        expect(element.html()).toBeDefined();
        expect(element.html()).not.toBe('');

    });

    it('should call getTodo on view at init.', () => {

        expect(viewMock.getTodo.called).toBe(true);

    });

    it('should subscribe to view updates.', () => {

        expect(viewMock.subscribe.called).toBe(true);

    });

    it('should update when the subscriber is called.', () => {

        let subscriber = viewMock.subscribe.getCall(0).args[0];
        viewMock.getTodo.reset();
        subscriber();
        expect(viewMock.getTodo.called).toBe(true);

    });
});

function fixtureSetup($rootScope, $compile) {
    viewMock = {
        getTodo: sinon.spy(),
        subscribe: sinon.spy()
    };

    provide.value('view', viewMock);
    pageScope = $rootScope.$new();

    element = angular.element('<c-list></c-list>');
    element = $compile(element)(pageScope);
    pageScope.$digest();
}
