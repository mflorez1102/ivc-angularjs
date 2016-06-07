/*
* @Author: steve
* @Date:   2016-04-06 16:15:38
* @Last Modified by:   steve
* @Last Modified time: 2016-06-07 11:20:58
*/

(function() {

eliminarDependenciaCtrl = function  ($scope, $uibModalInstance, $state, Dependencia, dep) {
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.eliminar = function () {
        $response = Dependencia.remove({'id_dependencia':dep.id},function(){
            $uibModalInstance.close();
            $state.go("dependencias.lista", null, {reload: true});
        });        
    };
};

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

function EditarDependenciaCtrl ($scope, $uibModalInstance, $state, Entidad, Dependencia, dep) {
    $scope.pform = dep;
    $scope.dependencia = dep;

    $scope.sendForm = function(){
        if($scope.mainForm.$valid){
            $object = Dependencia.update($scope.pform, function(){
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

    $scope.editar = function (dependencia) {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/dependencias/modals/editar.html',
            controller: EditarDependenciaCtrl,
            resolve: {
                dep: function () {
                  return dependencia;
                }
            }
        });
    };
    
    $scope.eliminarModal = function (dependencia) {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/common/modal-eliminar.html',
            controller: eliminarDependenciaCtrl,
            resolve: {
                dep: function () {
                  return dependencia;
                }
            }
        });
    };  

    $scope.dependencias =[];
    $scope.isLoading = true;

    // Functions to handle promise
    var onComplete = function(data) {
        $log.info("Entidad.query(): OK");
        $scope.dependencias = data;
        $scope.isLoading = false;        
    };

    var onError = function(err) {
        $log.info("ERROR: ");
        $log.info(err);
    };

    // para la busqueda
    $scope.search = {};

    // use promises
    Dependencia.query()
        .$promise
        .then(onComplete, onError);
};

// Register controller with Angular App
angular
.module('ivcApp')
.controller('dependenciaController', dependenciaController);

}());