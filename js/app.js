import 'ionic';
import 'angular-translate';
import angular from 'angular';

import { ionicSetup } from 'js/config/ionic';
import { translationSetup } from 'js/config/translations';
import { routeSetup } from 'js/config/routes';

// boot it
const app =
    angular
        .module('todo', ['ionic', 'pascalprecht.translate']);

// configure it
app.run(ionicSetup);
app.config(translationSetup);
app.config(routeSetup);

// constants and values
import { platform } from 'js/platform.constant';
app.constant('platform', platform);

// services
import { colorsFactory } from 'js/colors.factory';
app.factory('colors', colorsFactory);

import { dateUtilityFactory } from 'js/dateUtility.factory';
app.factory('dateUtility', dateUtilityFactory);

import { notificationServiceFactory } from 'js/notificationService.factory';
app.factory('notificationService', notificationServiceFactory);

import { todoStorageFactory } from 'js/todoStorage.factory';
app.factory('todoStorage', todoStorageFactory);

import { todoRepositoryFactory } from 'js/todoRepository.factory';
app.factory('todoRepository', todoRepositoryFactory);

import { todoViewFactory } from 'js/todoView.factory';
app.factory('todoView', todoViewFactory);

// wrapping moment.js for injectability
import { momentFactory } from 'js/moment.factory';
app.factory('moment', momentFactory);

// directives
import { todoListDirective } from 'js/todoList.directive';
app.directive('cTodoList', todoListDirective);

import { utilityFooterDirective } from 'js/utilityFooter.directive';
app.directive('cUtilityFooter', utilityFooterDirective);

import { utilityHeaderDirective } from 'js/utilityHeader.directive';
app.directive('cUtilityHeader', utilityHeaderDirective);

import { newTodoButtonDirective } from 'js/newTodoButton.directive';
app.directive('cNewTodoButton', newTodoButtonDirective);

import { dateLabelDirective } from 'js/dateLabel.directive';
app.directive('cDateLabel', dateLabelDirective);

import { checkPlatformDirective } from 'js/checkPlatform.directive';
app.directive('cCheckPlatform', checkPlatformDirective);

angular.element(document).ready(() =>
    angular.bootstrap(document, ['todo'], { strictDi: true }));
