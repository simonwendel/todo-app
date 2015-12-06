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

import { storageFactory } from 'js/storage.factory';
app.factory('storage', storageFactory);

import { repositoryFactory } from 'js/repository.factory';
app.factory('repository', repositoryFactory);

import { viewFactory } from 'js/view.factory';
app.factory('view', viewFactory);

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

import { createTodoDirective } from 'js/createTodo.directive';
app.directive('cCreateTodo', createTodoDirective);

import { dateDirective } from 'js/date.directive';
app.directive('cDate', dateDirective);

import { platformClassDirective } from 'js/platformClass.directive';
app.directive('cPlatformClass', platformClassDirective);

// boot it
angular.element(document).ready(() =>
    angular.bootstrap(document, ['todo'], { strictDi: true }));
