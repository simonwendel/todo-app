import 'JamieMason/Jasmine-Matchers';
import { ng } from 'test/utilities/mocks';

var element;

describe('Directive: utilityHeader', () => {

    beforeEach(ng.module('todo'));

    beforeEach(fixtureSetup);

    it('should be defined.', () => {

        expect(element.html()).toBeDefined();
        expect(element.html()).not.toBe('');

    });

});

function fixtureSetup() {
    ng.inject(($rootScope, $compile) => {
        pageScope = $rootScope.$new();

        element = angular.element('<utility-header></utility-header>');
        element = $compile(element)(pageScope);
        pageScope.$digest();
    });
}
