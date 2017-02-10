'use strict';

/**
 * @ngdoc function
 * @name miniTrello.controller:SignUp
 * @description
 * # SignUp
 * Controller of the miniTrello
 */
angular
    .module('miniTrello')
    .controller('SignUp', [
        '$scope', '$http', '$state', '$window', 'Utils',
        function ($scope, $http, $state, $window, Utils) {
            var signUp = this;
            signUp.newUser = {};

            if($window.localStorage.getItem('users')){
                signUp.users = JSON.parse($window.localStorage.getItem('users'));
            } else {
                $http({
                    method: 'GET',
                    url: 'json/users.json'
                }).then(function (response) {
                    signUp.users = response.data;
                });
            }

            signUp.createNewUser = function () {
                var flag = 0; 
                angular.forEach(signUp.users, function (user) {
                    if(user.name === signUp.newUser.name &&
                        user.password === signUp.newUser.password) {
                        flag = 1;
                        Utils.infoToastr('Please log in to continue', 'You are already an existing user!');
                    }
                });

                if(flag === 0) {
                    signUp.newUser.id = signUp.users.length + 1;
                    signUp.users.push(signUp.newUser);
                    $window.localStorage.setItem('users', JSON.stringify(signUp.users));
                    Utils.successToastr('Please log in to continue', 'Hola, you are successfully signed up!');
                }
                $state.go('auth.log-in');
            };
        }
    ]);
