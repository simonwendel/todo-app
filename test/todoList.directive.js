import 'JamieMason/Jasmine-Matchers';
import { ng } from 'test/utilities/mocks';

var element,
    pageScope,
    provide,
    todoRepository;

describe('Directive: todoList', () => {

    beforeEach(ng.module('todo', function fetchProvide($provide) {

        provide = $provide;

    }));

    beforeEach(ng.inject(fixtureSetup));

    it('should be defined.', () => {

        expect(element.html()).not.toBe('');

    });

    it('should call getTodo on todoRepository at init.', () => {

        expect(todoRepository.getTodo.called).toBeTruthy();

    });

    it('should subscribe to todoRepository updates.', () => {

        expect(todoRepository.subscribe.called).toBeTruthy();

    });

    it('should update when the subscriber is called.', () => {

        var callback = todoRepository.subscribe.getCall(0).args[1];
        todoRepository.getTodo.reset();
        callback();
        expect(todoRepository.getTodo.called).toBeTruthy();

    });
});

function fixtureSetup($rootScope, $compile) {
    todoRepository = {
        getTodo: sinon.spy(),
        subscribe: sinon.spy()
    };

    provide.value('todoRepository', todoRepository);
    pageScope = $rootScope.$new();

    element = angular.element('<todo-list></todo-list>');
    element = $compile(element)(pageScope);
    pageScope.$digest();
}
