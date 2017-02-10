'use strict';
/**
 * @ngdoc overview
 * @name miniTrello:routes
 * @description
 * # routes.js
 *
 * Configure routes for use with Angular
 */
angular
    .module('miniTrello')
    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('auth', {
                url: '/auth',
                templateUrl: 'modules/auth/main.html'
            })
            .state('auth.sign-up', {
                url: '/sign-up',
                templateUrl: 'modules/auth/sign-up.html',
                controller: 'SignUp as SignUp'
            })
            .state('auth.log-in', {
                url: '/log-in',
                templateUrl: 'modules/auth/log-in.html',
                controller: 'LogIn as LogIn'
            })
            .state('board', {
                url: '/:userId/board',
                controller: 'Board as Board',
                templateUrl: 'modules/board/main-board.html',
            })
            .state('board.boards', {
                url: '/',
                templateUrl: 'modules/board/boards-page.html',
                controller: 'BoardPage as BoardPage'
            })
            .state('board.lists', {
                url: '/:boardId/lists',
                templateUrl: 'modules/board/lists-page.html',
                controller: 'ListPage as ListPage'
            });

        $urlRouterProvider.otherwise('/auth/sign-up');
    });
