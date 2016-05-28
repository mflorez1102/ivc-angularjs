/*
* @Author: steve
* @Date:   2016-04-11 12:25:39
* @Last Modified by:   steve
* @Last Modified time: 2016-04-11 15:15:25
*/
(function() {

// Define controller function
var logoutController = function($log, $state, $resource, auth) {

    $log.info('---- logoutController ----- ');

    auth.logOut();
    $state.go("login");
};

// Register controller with Angular App
angular
.module('ivcApp')
.controller('logoutController', logoutController);

}());