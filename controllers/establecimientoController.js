/*
* @Author: steve
* @Date:   2016-04-06 16:16:43
* @Last Modified by:   steve
* @Last Modified time: 2016-04-11 15:26:48
*/

(function() {

// Define controller function
var establecimientoController = function($scope, $log, $resources, auth) {

    $log.info('---- establecimientoController ----- ');

    var establecimiento = $resource('http://localhost:3000/api/Establecimientos');

    $scope.establecimiento = establecimiento.query({access_token:auth.getToken()});
   	
};

// Register controller with Angular App
angular
.module('ivcApp')
.controller('establecimientoController', establecimientoController);

}());