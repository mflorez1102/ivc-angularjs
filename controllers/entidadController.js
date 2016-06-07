/*
* @Author: steve
* @Date:   2016-04-06 16:15:38
* @Last Modified by:   steve
* @Last Modified time: 2016-06-07 10:55:56
*/

(function() {

eliminarEntidadCtrl = function  ($scope, $uibModalInstance, $state, Entidad, ent) {
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.eliminar = function () {
        $response = Entidad.remove({'id_entidad':ent.id},function(){
            $uibModalInstance.close();
            $state.go("entidades.lista", null, {reload: true});
        });        
    };
};

var crearEntidadCtrl = function($scope, $log, $uibModalInstance, $state, Entidad) {
    $scope.pform = {};
    $scope.submitting = false;

    var onComplete = function(data) {
        $log.info("form OK");
        // datos de entidad con id asignado
        $log.info(data);
        $scope.submitting = false;
        $uibModalInstance.close();
        $state.go("entidades.lista", null, {reload: true});
    };

    var onError = function(err) {
        $log.info("ERROR: ");
        $log.info(err);
        $scope.submitting = false;
    };

    $scope.sendForm = function(){
        $scope.submitting = true;
        // use promise
        Entidad.save($scope.pform)
            .$promise
            .then(onComplete, onError);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};

var editarEntidadCtrl = function($scope, $log, $uibModalInstance, $state, Entidad, ent) {

    $scope.pform = ent;
    $scope.submitting = false;

    var onComplete = function(data) {
        $log.info("form OK");
        // datos de entidad con id asignado
        $log.info(data);
        $scope.submitting = false;
        $uibModalInstance.close();
        $state.go("entidades.lista", null, {reload: true});
    };

    var onError = function(err) {
        $log.info("ERROR: ");
        $log.info(err);
        $scope.submitting = false;
    };

    $scope.sendForm = function(){
        $scope.submitting = true;
        // use promise
        Entidad.update($scope.pform)
            .$promise
            .then(onComplete, onError);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    /*$scope.sendForm = function(){
        if($scope.mainForm.$valid){
            $object = Entidad.update($scope.pform, function(){
                $uibModalInstance.close();
                $state.go("entidades.lista", null, {reload: true});
            });         
        }
    };*/
};

var entidadController = function($scope, $state, $log, $uibModal, auth, Entidad, $timeout) {

    $log.info('---- entidadController ----- ');

    $scope.crear = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/entidades/modals/crear.html',
            controller: crearEntidadCtrl
        });
    };

    $scope.editar = function (entidad) {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/entidades/modals/editar.html',
            controller: editarEntidadCtrl,
            resolve: {
                ent: function () { return entidad; }
            }
        });
    };

    $scope.eliminarModal = function (entidad) {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/common/modal-eliminar.html',
            controller: eliminarEntidadCtrl,
            resolve: {
                ent: function () { return entidad; }
            }
        });
    };
    $scope.entidades =[];
    $scope.isLoading = true;

    // Functions to handle promise
    var onComplete = function(data) {
        $log.info("Entidad.query(): OK");
        $scope.entidades = data;
        $scope.isLoading = false;        
    };

    var onError = function(err) {
        $log.info("ERROR: ");
        $log.info(err);
    };

    // para la busqueda
    $scope.search = {};

    // use promises
    Entidad.query()
        .$promise
        .then(onComplete, onError);
};

// Register controller with Angular App
angular
.module('ivcApp')
.controller('entidadController', entidadController);

}());