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

            if (!$window.localStorage.getItem('isLoggedIn')) {
                $state.go('auth.log-in');
                return;
            }

            Board.logOut = function () {
                $window.localStorage.removeItem('isLoggedIn');
                $state.go('auth.log-in');
            };
        }
    ]);
