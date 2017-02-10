'use strict';

/**
 * @ngdoc function
 * @name miniTrello.controller:Board
 * @description
 * # MainCtrl
 * Controller of the miniTrello
 */
angular
    .module('miniTrello')
    .controller('Board', [
        '$state', '$window',
        function ($state, $window) {
            var Board = this;
            Board.state = $state;

            Board.logOut = function () {
                $window.localStorage.removeItem('current-user');
                $window.localStorage.removeItem('current-user-boards');
                $state.go('auth.log-in');
            };
        }
    ]);
