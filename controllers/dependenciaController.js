/*
* @Author: steve
* @Date:   2016-04-06 16:15:38
* @Last Modified by:   steve
* @Last Modified time: 2016-05-11 14:25:57
*/

(function() {

function CrearDependenciaCtrl ($scope, $uibModalInstance, $state, Entidad, Dependencia) {
    $scope.pform = {};

    $scope.sendForm = function(){
        if($scope.mainForm.$valid){
            $response = Dependencia.save($scope.pform);
            $uibModalInstance.close();
            $state.go("dependencias.lista", null, {reload: true});
        }
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.entidades = Entidad.query(); 
};

var dependenciaController = function($scope, $log, $resource, $state, $uibModal, auth, Dependencia) {
    $log.info('---- dependenciaController ----- ');

    $scope.open = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/dependencias/modals/crear.html',
            controller: CrearDependenciaCtrl
        });
    };

    $scope.dependencias = Dependencia.query();
};

// Register controller with Angular App
angular
.module('ivcApp')
.controller('dependenciaController', dependenciaController);

}());