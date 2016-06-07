(function() {

eliminarFuncionarioCtrl = function  ($scope, $uibModalInstance, $state, Dependencia, dep) {
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.eliminar = function () {
        $response = Funcionario.remove({'id_funcionario':fun.id},function(){
            $uibModalInstance.close();
            $state.go("funcionarios.lista", null, {reload: true});
        });        
    };
};

function CrearFuncionarioCtrl ($scope, $log, $uibModalInstance, $state, Entidad, Dependencia, Funcionario) {
    $scope.pform = {permisos:0};

    $scope.sendForm = function(){
        if($scope.mainForm.$valid){
            $log.info($scope.pform);
            $response = Funcionario.save($scope.pform,function(msg){$log.info(msg);},function(msg){$log.info(msg);});
            $uibModalInstance.close();
            $state.go("funcionarios.lista", null, {reload: true});
        }
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.updateDependencia = function () {
        $scope.dependencias = Dependencia.query({entidadId:$scope.entidadId});
    }

    $scope.tipo_documento = [
        {nombre:"CC"},{nombre:"CE"},{nombre:"TI"}
    ];
    $scope.cargos = [
        {nombre:"inspector"},{nombre:"admin"},{nombre:"secretaria"}
    ];
    $scope.entidades = Entidad.query();  
    $scope.dependencias = {};   
};

function EditarFuncionarioCtrl ($scope, $uibModalInstance, $state, Entidad, Dependencia, Funcionario, fun) {
    $scope.pform = fun;

    $scope.sendForm = function(){
        if($scope.mainForm.$valid){
            $object = Funcionario.update($scope.pform, function(){
                $uibModalInstance.close();
                $state.go("funcionarios.lista", null, {reload: true});
            });         
        }
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.entidades = Entidad.query();
    $scope.dependencias = Dependencia.query();
};

// Define controller function
var funcionarioController = function($scope, $log, $uibModal, $resource, Funcionario, auth) {

    $log.info('---- funcionarioController ----- ');

    $scope.open = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/funcionarios/modals/crear.html',
            controller: CrearFuncionarioCtrl
        });
    };

    $scope.editar = function (funcionario) {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/funcionarios/modals/editar.html',
            controller: EditarFuncionarioCtrl,
            resolve: {
                fun: function () {
                  return funcionario;
                }
            }
        });
    };
    
    $scope.eliminarModal = function (funcionario) {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/common/modal-eliminar.html',
            controller: eliminarFuncionarioCtrl,
            resolve: {
                fun: function () {
                  return funcionario;
                }
            }
        });
    };  

    $scope.funcionarios =[];
    $scope.isLoading = true;

    // Functions to handle promise
    var onComplete = function(data) {
        $log.info("Funcionario.query(): OK");
        $scope.funcionarios = data;
        $scope.isLoading = false;        
    };

    var onError = function(err) {
        $log.info("ERROR: ");
        $log.info(err);
    };

    // para la busqueda
    $scope.search = {};

    // use promises
    Funcionario.query()
        .$promise
        .then(onComplete, onError);
};

// Register controller with Angular App
angular.module('ivcApp')
.controller('funcionarioController', funcionarioController);

}());