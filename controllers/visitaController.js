/*
* @Author: steve
* @Date:   2016-04-06 16:17:07
* @Last Modified by:   steve
* @Last Modified time: 2016-04-11 15:28:10
*/

(function() {

// Define controller function
var visitaController = function($scope, $log, $resource, auth) {

    $log.info('---- visitaController ----- ');

    var visita = $resource('http://localhost:3000/api/Visitas');

    $scope.visita = visita.query({access_token:auth.getToken()});

};

// Register controller with Angular App
angular
.module('ivcApp')
.controller('visitaController', visitaController);

}());