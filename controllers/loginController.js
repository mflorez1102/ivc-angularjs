/*
* @Author: steve
* @Date:   2016-04-10 17:06:45
* @Last Modified by:   steve
* @Last Modified time: 2016-06-07 10:18:06
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
            },function(result){
                $scope.showMsg = true;
            });            
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