'use strict';

/**
 * @ngdoc function
 * @name miniTrello.controller:ListPage
 * @description
 * # ListPage
 * Controller of the miniTrello
 */
angular
    .module('miniTrello')
    .controller('ListPage', [
        '$scope', '$filter', '$http', '$state', '$stateParams', '$window',
        function ($scope, $filter, $http, $state, $stateParams, $window) {
            var listPage = this, allUsersBoards, currentUserBoards;
            listPage.newListForm = false;
            listPage.newList = {
                name: '',
                cards: []
            };

            listPage.newCard = {
                title: '',
                description: ''
            };

            listPage.newCardForm = [];

            listPage.toggleCardForm = function (index) {
                listPage.newCardForm[index] = !listPage.newCardForm[index];
            };

            function setUserBoard() {
                $window.localStorage.setItem('current-user-boards', JSON.stringify(listPage.boards));
                $window.localStorage.setItem('user-boards', JSON.stringify(allUsersBoards));
            }

            if ($window.localStorage.getItem('user-boards')) {
                allUsersBoards = JSON.parse($window.localStorage.getItem('user-boards'));
                currentUserBoards = $filter('filter')(allUsersBoards, { user_id: $stateParams.userId })[0];
                listPage.boards = $filter('filter')(currentUserBoards.boards, { id: $stateParams.boardId })[0];
                listPage.lists = listPage.boards.lists;
            } else {
                $state.go('board.boards', { userId: $stateParams.userId });
                return;
            }

            $scope.lists = listPage.lists;

            listPage.createNewList = function () {
                listPage.lists.push(angular.copy(listPage.newList));
                listPage.newList.name = '';
                listPage.newListForm = false;
                setUserBoard();
            };

            listPage.createNewCard = function (index) {
                if (listPage.newCard.title === '' ||
                    listPage.newCard.description === '') {
                    return;
                }
                listPage.lists[index].cards.push(angular.copy(listPage.newCard));
                listPage.newCard = {
                    title: '',
                    description: ''
                };
                listPage.toggleCardForm(index);
                setUserBoard();
            };

            $scope.$watch('lists', function() {
                setUserBoard();
            }, true);
        }
    ]);
