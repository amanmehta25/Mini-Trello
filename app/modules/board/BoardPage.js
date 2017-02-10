'use strict';

/**
 * @ngdoc function
 * @name miniTrello.controller:BoardPage
 * @description
 * # BoardPage
 * Controller of the miniTrello
 */
angular
    .module('miniTrello')
    .controller('BoardPage', [
        '$scope', '$filter', '$http', '$window',
        function ($scope, $filter, $http, $window) {
            var boardPage = this, allUsersBoards, currentUser, currentUserBoards;
            boardPage.newBoardForm = false;
            boardPage.newBoard = {
                id: '',
                name: '',
                lists: []
            };

            currentUser = JSON.parse($window.localStorage.getItem('current-user'));

            if ($window.localStorage.getItem('user-boards')) {
                allUsersBoards = JSON.parse($window.localStorage.getItem('user-boards'));
                currentUserBoards = $filter('filter')(allUsersBoards, { user_id: currentUser.id })[0];
                boardPage.boards = currentUserBoards.boards;
                $window.localStorage.setItem('current-user-boards', JSON.stringify(boardPage.boards));
            } else {
                $http({
                    method: 'GET',
                    url: 'json/boards.json'
                }).then(function (response) {
                    allUsersBoards = response.data;
                    $window.localStorage.setItem('user-boards', JSON.stringify(allUsersBoards));
                    currentUserBoards = $filter('filter')(allUsersBoards, { user_id: currentUser.id })[0];
                    boardPage.boards = currentUserBoards.boards;
                    $window.localStorage.setItem('current-user-boards', JSON.stringify(boardPage.boards));
                });
            }

            boardPage.createNewBoard = function () {
                var i;
                angular.forEach(allUsersBoards, function (boards, index) {
                    if (boards.user_id === parseInt(currentUser.id)) {
                        i = index;
                    }
                });

                boardPage.newBoard.id = boardPage.boards.length + 1;

                if (typeof i === 'undefined') {
                    i = allUsersBoards.length + 1;
                    allUsersBoards = allUsersBoards.concat({
                        user_id: i,
                        boards: [boardPage.newBoard]
                    });
                } else {
                    allUsersBoards[i].boards.push(angular.copy(boardPage.newBoard));
                }
                $window.localStorage.setItem('user-boards', JSON.stringify(allUsersBoards));
                $window.localStorage.setItem('current-user-boards', JSON.stringify(boardPage.boards));
                boardPage.newBoardForm = false;
                boardPage.newBoard.id = '';
                boardPage.newBoard.name = '';
            };
        }
    ]);
