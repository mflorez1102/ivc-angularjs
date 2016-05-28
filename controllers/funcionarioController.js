/*
* @Author: steve
* @Date:   2016-04-06 16:16:43
* @Last Modified by:   steve
* @Last Modified time: 2016-04-11 15:26:48
*/

(function() {

modalController = function  ($scope, $uibModalInstance, $state, Entidad) {
    
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};

// Define controller function
var funcionarioController = function($scope, $state, $log, $uibModal, auth) {

    $log.info('---- funcionarioController ----- ');
    
// -- bloque modal
   $scope.funcionarioModal = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/funcionarios/modals/crear.html',
            controller: modalController,
        });
    };   
// --
   	
};

// Register controller with Angular App
angular.module('ivcApp')
.controller('funcionarioController', funcionarioController);

}());
