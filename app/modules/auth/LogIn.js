'use strict';

/**
 * @ngdoc function
 * @name miniTrello.controller:LogIn
 * @description
 * # LogIn
 * Controller of the miniTrello
 */
angular
    .module('miniTrello')
    .controller('LogIn', [
        '$scope', '$http', '$state', '$window', 'Utils',
        function ($scope, $http, $state, $window, Utils) {
            var logIn = this;
            logIn.user = {};

            if ($window.localStorage.getItem('users')) {
                logIn.users = JSON.parse($window.localStorage.getItem('users'));
            } else {
                $http({
                    method: 'GET',
                    url: 'json/users.json'
                }).then(function (response) {
                    logIn.users = response.data;
                });
            }

            logIn.verifyUser = function () {
                // Add this for proper validation on mobile
                if (logIn.user.name === '' || logIn.user.password === '') {
                    Utils.infoToastr('You need to enter both username and passowrd');
                    return;
                }
                var flag = 0, currentUser;
                angular.forEach(logIn.users, function (user) {
                    if (user.name === logIn.user.name &&
                        user.password === logIn.user.password) {
                        flag = 1;
                        currentUser = {
                            id: user.id,
                            name: user.name,
                            password: user.password
                        };
                        Utils.successToastr('You are successfully logged in!');
                    }
                });

                if (flag === 0) {
                    Utils.errorToastr('Your login credentials are not correct. Please retry.');
                } else {
                    $window.localStorage.setItem('current-user', JSON.stringify(currentUser));
                    $state.go('board.boards', { userId: currentUser.id});
                }
            };
        }
    ]);
