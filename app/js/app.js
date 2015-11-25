import 'ionic';
import angular from 'angular';

import ionicSetup from 'js/ionic.config';
import routes from 'js/routes';

// boot app
const app =
    angular
        .module('todo', ['ionic']);

// configure it
app.run(ionicSetup);
app.config(routes);

// constants and values
import getColorsConstant from 'js/colors.constant';
app.constant(getColorsConstant.name, getColorsConstant());

// services
import dateUtility from 'js/dateUtility.factory';
app.factory(dateUtility.name, dateUtility);

import notificationService from 'js/notificationService.factory';
app.factory(notificationService.name, notificationService);

import todoStorage from 'js/todoStorage.factory';
app.factory(todoStorage.name, todoStorage);

import todoRepository from 'js/todoRepository.factory';
app.factory(todoRepository.name, todoRepository);

// directives
import todoList from 'js/todoList.directive';
app.directive(todoList.name, todoList);

import utilityFooter from 'js/utilityFooter.directive';
app.directive(utilityFooter.name, utilityFooter);

import utilityHeader from 'js/utilityHeader.directive';
app.directive(utilityHeader.name, utilityHeader);

import newTodoButton from 'js/newTodoButton.directive';
app.directive(newTodoButton.name, newTodoButton);
