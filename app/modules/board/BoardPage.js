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
        '$scope', '$filter', '$http', '$stateParams', '$window',
        function ($scope, $filter, $http, $stateParams, $window) {
            var boardPage = this, allUsersBoards, currentUserId, currentUserBoards;
            boardPage.newBoardForm = false;
            boardPage.newBoard = {
                id: '',
                name: '',
                lists: []
            };

            currentUserId = parseInt($stateParams.userId);

            function setUserBoard(data) {
                currentUserBoards = $filter('filter')(data, { user_id: currentUserId })[0];
                if (typeof currentUserBoards === 'undefined') {
                    currentUserBoards = {
                        user_id: currentUserId,
                        boards: []
                    };
                }
                boardPage.boards = currentUserBoards.boards;
            }

            if ($window.localStorage.getItem('user-boards')) {
                allUsersBoards = JSON.parse($window.localStorage.getItem('user-boards'));
                setUserBoard(allUsersBoards);
            } else {
                $http({
                    method: 'GET',
                    url: 'json/boards.json'
                }).then(function (response) {
                    allUsersBoards = response.data;
                    $window.localStorage.setItem('user-boards', JSON.stringify(allUsersBoards));
                    setUserBoard(allUsersBoards);
                });
            }

            boardPage.createNewBoard = function () {
                var i;
                angular.forEach(allUsersBoards, function (boards, index) {
                    if (boards.user_id === currentUserId) {
                        i = index;
                    }
                });

                boardPage.newBoard.id = boardPage.boards.length + 1;

                if (typeof i === 'undefined') {
                    allUsersBoards.push({
                        user_id: currentUserId,
                        boards: [angular.copy(boardPage.newBoard)]
                    });
                    setUserBoard(allUsersBoards);
                } else {
                    allUsersBoards[i].boards.push(angular.copy(boardPage.newBoard));
                }
                $window.localStorage.setItem('user-boards', JSON.stringify(allUsersBoards));
                boardPage.newBoardForm = false;
                boardPage.newBoard.id = '';
                boardPage.newBoard.name = '';
            };
        }
    ]);
