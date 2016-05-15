/*
* @Author: steve
* @Date:   2016-04-06 16:16:06
* @Last Modified by:   steve
* @Last Modified time: 2016-04-11 15:17:45
*/

(function() {

// Define controller function
var atributoController = function($scope, $log, $resource, auth) {

    $log.info('---- atributoController ----- ');
   	
   	var atributo = $resource('http://localhost:3000/api/Atributos');

    $scope.atributo = atributo.query({access_token:auth.getToken()});
};

// Register controller with Angular App
angular
.module('ivcApp')
.controller('atributoController', atributoController);

}());