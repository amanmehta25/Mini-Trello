'use strict';

/**
 * @ngdoc factory
 * @name miniTrello.Utils
 * @description
 * # commonUtils
 * factory in the miniTrello
 */
angular.module('miniTrello')
    .factory('Utils', [
        'toastr',
        function (toastr) {
            return {
                successToastr: function (message, title) {
                    title = title || 'Success';
                    toastr.success(message, title, {
                        toastClass: 'success-toastr',
                        titleClass: 'success-toastr-title',
                        messageClass: 'success-toastr-message',
                        tapToDismiss: false,
                        closeButton: true
                    });
                },

                infoToastr: function (message, title) {
                    title = title || 'Info';
                    toastr.info(message, title, {
                        toastClass: 'info-toastr',
                        titleClass: 'info-toastr-title',
                        messageClass: 'info-toastr-message',
                        tapToDismiss: false,
                        closeButton: true
                    });
                },

                errorToastr: function (message, title) {
                    title = title || 'Error';
                    toastr.error(message, title, {
                        toastClass: 'error-toastr',
                        titleClass: 'error-toastr-title',
                        messageClass: 'error-toastr-message',
                        tapToDismiss: false
                    });
                }
            };
        }
    ]);
