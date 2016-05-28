/*
* @Author: steve
* @Date:   2016-04-06 16:15:38
* @Last Modified by:   steve
* @Last Modified time: 2016-05-15 23:44:43
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

function EditarDependenciaCtrl ($scope, $uibModalInstance, $state, Entidad, Dependencia, ID) {
    $scope.dependencia = Dependencia.get({id_dependencia:ID});
    $scope.pform = {'id':ID};

    $scope.sendForm = function(){
        if($scope.mainForm.$valid){
            $object = Entidad.update($scope.pform, function(){
                $uibModalInstance.close();
                $state.go("dependencias.lista", null, {reload: true});
            });         
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

    $scope.editar = function (id) {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/dependencias/modals/editar.html',
            controller: EditarDependenciaCtrl,
            resolve: {
                ID: function () {
                  return id;
                }
            }
        });
    };

    $scope.eliminar = function (id) {
        $response = Dependencia.remove({'id_dependencia':id},function(){
            $state.go("dependencias.lista", null, {reload: true});
        });        
    };
    
    $scope.eliminarModal = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/modal-eliminar.html',
            controller: modalController,
        });
    };  

    $scope.dependencias = Dependencia.query();
};

// Register controller with Angular App
angular
.module('ivcApp')
.controller('dependenciaController', dependenciaController);

}());