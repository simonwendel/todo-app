import 'ionic';
import angular from 'angular';

import { ionicSetup } from 'js/ionic.config';
import { routes } from 'js/routes';

// boot app
const app =
    angular
        .module('todo', ['ionic']);

// configure it
app.run(ionicSetup);
app.config(routes);

// constants and values
import { colors } from 'js/colors.constant';
app.constant('colors', colors);

// services
import { dateUtilityFactory } from 'js/dateUtility.factory';
app.factory('dateUtility', dateUtilityFactory);

import { notificationServiceFactory } from 'js/notificationService.factory';
app.factory('notificationService', notificationServiceFactory);

import { todoStorageFactory } from 'js/todoStorage.factory';
app.factory('todoStorage', todoStorageFactory);

import { todoRepositoryFactory } from 'js/todoRepository.factory';
app.factory('todoRepository', todoRepositoryFactory);

// directives
import { todoListDirective } from 'js/todoList.directive';
app.directive('todoList', todoListDirective);

import { utilityFooter } from 'js/utilityFooter.directive';
app.directive('utilityFooter', utilityFooter);

import { utilityHeader } from 'js/utilityHeader.directive';
app.directive('utilityHeader', utilityHeader);

import { newTodoButtonDirective } from 'js/newTodoButton.directive';
app.directive('newTodoButton', newTodoButtonDirective);
