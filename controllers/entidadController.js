/*
* @Author: steve
* @Date:   2016-04-06 16:15:38
* @Last Modified by:   steve
* @Last Modified time: 2016-05-15 22:35:11
*/

(function() {

function CrearEntidadCtrl ($scope, $uibModalInstance, $state, Entidad) {
    $scope.pform = {};

    $scope.sendForm = function(){
        if($scope.mainForm.$valid){
        	$response = Entidad.save($scope.pform,function(){
                $uibModalInstance.close();
                $state.go("entidades.lista", null, {reload: true});
            });        	
        }
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};

function EditarEntidadCtrl ($scope, $uibModalInstance, $state, Entidad, ID) {
    $scope.entidad = Entidad.get({id_entidad:ID});
    $scope.pform = {'id':ID};

    $scope.sendForm = function(){
        if($scope.mainForm.$valid){
            $object = Entidad.update($scope.pform, function(){
                $uibModalInstance.close();
                $state.go("entidades.lista", null, {reload: true});
            });         
        }
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};

var entidadController = function($scope, $state, $log, $uibModal, auth, Entidad) {

    $log.info('---- entidadController ----- ');

    $scope.crear = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/entidades/modals/crear.html',
            controller: CrearEntidadCtrl
        });
    };

    $scope.editar = function (id) {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/entidades/modals/editar.html',
            controller: EditarEntidadCtrl,
            resolve: {
                ID: function () {
                  return id;
                }
            }
        });
    };

    $scope.eliminar = function (id) {
        $response = Entidad.remove({'id_entidad':id},function(){
            $state.go("entidades.lista", null, {reload: true});
        });        
    };

    $scope.entidades = Entidad.query();
};

// Register controller with Angular App
angular
.module('ivcApp')
.controller('entidadController', entidadController);

}());