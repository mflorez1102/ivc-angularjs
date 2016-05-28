(function() {

// Define controller function
var funcionarioController = function($scope, $log, $resource, auth) {

    $log.info('---- funcionarioController ----- ');

    var funcionario = $resource('http://localhost:300/api/Funcionarios');

    $scope.funcionario = funcionario.query({access_token:auth.getToken()});

    $scope.pform = {};
    // variable para mostra mensaje en el template
    $scope.showMsg = false;

    $scope.sendForm = function(){

  

        // Verificar si la forma es valida

        if ($scope.mainForm.$valid){
            $log.info('Forma Valida: ');
            $log.info($scope.pform);
        }
        else{
            $log.info('Forma NO VALIDA ');
            $scope.showMsg = true;

            angular.forEach($scope.mainForm.$error, function (field) {
                angular.forEach(field, function(errorField){
                errorField.$setTouched();
            });
        });
        }


    };


	


};

// Register controller with Angular App
angular.module('ivcApp')
.controller('funcionarioController', funcionarioController);

}());