import 'ionic';
import 'angular-translate';
import angular from 'angular';

import { ionic } from 'js/config/ionic';
import { translations } from 'js/config/translations';
import { routes } from 'js/config/routes';

// define it
const app =
    angular
        .module('todo', ['ionic', 'pascalprecht.translate']);

// configure it
app.run(ionic);
app.config(translations);
app.config(routes);

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
import { listDirective } from 'js/list.directive';
app.directive('cList', listDirective);

import { footerDirective } from 'js/footer.directive';
app.directive('cFooter', footerDirective);

import { headerDirective } from 'js/header.directive';
app.directive('cHeader', headerDirective);

import { newTodoButtonDirective } from 'js/newTodoButton.directive';
app.directive('cNewTodoButton', newTodoButtonDirective);

import { dateDirective } from 'js/date.directive';
app.directive('cDate', dateDirective);

import { checkPlatformDirective } from 'js/checkPlatform.directive';
app.directive('cCheckPlatform', checkPlatformDirective);

// boot it
angular.element(document).ready(() =>
    angular.bootstrap(document, ['todo'], { strictDi: true }));
