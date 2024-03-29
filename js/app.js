/**
 * INSPINIA - Responsive Admin Theme
 *
 */
(function () {
    angular.module('ivcApp', [
        'ui.router',                    // Routing
        'oc.lazyLoad',                  // ocLazyLoad
        'ui.bootstrap',                 // Ui Bootstrap
        'pascalprecht.translate',       // Angular Translate
        'ngIdle',                       // Idle timer
        'ngSanitize',                    // ngSanitize
        'ngMessages',
        'ngResource',
        'angular-cache',
        'angularSpinner',
        'angular-ladda',
        'jcs-autoValidate'

    ]);
})();

// Other libraries are loaded dynamically in the config.js file using the library ocLazyLoad