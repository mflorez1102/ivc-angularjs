/*
* @Author: steve
* @Date:   2016-04-06 16:01:54
* @Last Modified by:   steve
* @Last Modified time: 2016-04-11 15:17:23
*/

(function() {

// Define controller function
var alarmaController = function($scope, $log, $resource, auth) {

    $log.info('---- alarmaController ----- ');
   	
   	var alarma = $resource('http://localhost:3000/api/Alarmas');

    $scope.alarma = alarma.query({access_token:auth.getToken()});

};

// Register controller with Angular App
angular
.module('ivcApp')
.controller('alarmaController', alarmaController);

}());