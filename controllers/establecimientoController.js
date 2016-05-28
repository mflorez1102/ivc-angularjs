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
var establecimientoController = function($scope, $state, $log, $uibModal, auth) {

    $log.info('---- establecimientoController ----- ');

    $log.info('---- entidadController ----- ');

   $scope.abrir = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/establecimientos/modals/crear.html',
            controller: modalController,
        });
    };
    // -- bloque modal
    $scope.modal2 = function () {
        var modalInstance = $uibModal.open({
        	// cambiar nombre del template
            templateUrl: 'views/establecimientos/modals/crear.html',
            controller: modalController,
        });
    };

    // --
   	
};

// Register controller with Angular App
angular
.module('ivcApp')
.controller('establecimientoController', establecimientoController);

}());
