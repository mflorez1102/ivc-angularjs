/*
* @Author: steve
* @Date:   2016-04-10 17:06:45
* @Last Modified by:   steve
* @Last Modified time: 2016-05-12 06:06:29
*/
(function() {

// Define controller function
var loginController = function($scope, $log, $state, $resource, auth) {

    $log.info('---- loginController ----- ');

    var login = $resource('http://rest-api-ivc.mybluemix.net/api/Funcionarios/login');

    $scope.pform = {};
    // variable para mostra mensaje en el template
    $scope.showMsg = false;

    $scope.sendForm = function(){
        if ($scope.mainForm.$valid){
            $log.info("---- usuario inicio sesion ----");
            $response = login.save($scope.pform).$promise;
            $response.then(function(result){
            	auth.loggedIn(result.id,result.userId);
            	$state.go("entidades.lista");
            });
            $scope.showMsg = true;
        }else{
            angular.forEach($scope.mainForm.$error, function (field) {
                angular.forEach(field, function(errorField){
	                errorField.$setTouched();
	            });
        	});
        }
    };

};

// Register controller with Angular App
angular
.module('ivcApp')
.controller('loginController', loginController);

}());