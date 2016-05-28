/*
* @Author: steve
* @Date:   2016-04-06 16:15:38
* @Last Modified by:   steve
* @Last Modified time: 2016-05-15 22:35:11
*/

(function() {

modalController = function  ($scope, $uibModalInstance, $state, Entidad) {
    
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};

var CrearEntidadCtrl = function($scope, $log, $uibModalInstance, $state, Entidad) {
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

var EditarEntidadCtrl = function($scope, $log, $uibModalInstance, $state, Entidad, ent) {

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
            controller: CrearEntidadCtrl
        });
    };

    $scope.editar = function (entidad) {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/entidades/modals/editar.html',
            controller: EditarEntidadCtrl,
            resolve: {
                ent: function () { return entidad; }
            }
        });
    };

    $scope.eliminar = function (id) {
        $response = Entidad.remove({'id_entidad':id},function(){
            $state.go("entidades.lista", null, {reload: true});
        });        
    };

    $scope.eliminarModal = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/modal-eliminar.html',
            controller: modalController,
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