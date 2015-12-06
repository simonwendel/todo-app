import 'JamieMason/Jasmine-Matchers';
import { ng } from 'test/utilities/mocks';

let element,
    pageScope,
    provide,
    repositoryMock;

describe('Directive: listDirective (list.directive.js)', () => {

    beforeEach(ng.module('todo', ($provide) => {
        provide = $provide;
    }));

    beforeEach(ng.inject(fixtureSetup));

    it('should be defined.', () => {

        expect(element.html()).toBeDefined();
        expect(element.html()).not.toBe('');

    });

    it('should call getTodo on repository at init.', () => {

        expect(repositoryMock.getTodo.called).toBe(true);

    });

    it('should subscribe to repository updates.', () => {

        expect(repositoryMock.subscribe.called).toBe(true);

    });

    it('should update when the subscriber is called.', () => {

        let callback = repositoryMock.subscribe.getCall(0).args[1];
        repositoryMock.getTodo.reset();
        callback();
        expect(repositoryMock.getTodo.called).toBe(true);

    });
});

function fixtureSetup($rootScope, $compile) {
    repositoryMock = {
        getTodo: sinon.spy(),
        subscribe: sinon.spy()
    };

    provide.value('repository', repositoryMock);
    pageScope = $rootScope.$new();

    element = angular.element('<c-list></c-list>');
    element = $compile(element)(pageScope);
    pageScope.$digest();
}
