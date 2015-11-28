import 'JamieMason/Jasmine-Matchers';
import angular from 'angular';
import 'js/app';

describe('Module: todo (app.js)', () => {

    it('should be defined and accessible through angular module system.', () => {

        expect(() => angular.module('todo')).not.toThrow();

    });

});
