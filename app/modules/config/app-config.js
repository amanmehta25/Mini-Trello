(function () {
    'use strict';

    angular
        .module('config', [])
        .config(function (toastrConfig) {
            angular.extend(toastrConfig, {
                containerId: 'toast-container',
                extendedTimeOut: 0,
                timeOut: 5000,
                newestOnTop: true,
                preventOpenDuplicates: true
            });
        });
})();
