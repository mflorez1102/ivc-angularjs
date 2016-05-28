/**
 * INSPINIA - Responsive Admin Theme
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written state for all view in theme.
 *
 */
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, IdleProvider, KeepaliveProvider, CacheFactoryProvider) {

    // Configure Idle settings
    IdleProvider.idle(5); // in seconds
    IdleProvider.timeout(120); // in seconds

    $urlRouterProvider.otherwise("/login");

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });

    $stateProvider

    .state('entidades',{
        abstract: true,
        url: "/entidades",
        templateUrl: "views/common/content.html",
    })
    .state('entidades.lista', {
        url: "/lista",
        templateUrl: "views/entidades/lista.html",
        controller: 'entidadController'
    })
    .state('dependencias',{
        abstract: true,
        url: "/dependencias",
        templateUrl: "views/common/content.html",
    })
    .state('dependencias.lista', {
        url: "/lista",
        templateUrl: "views/dependencias/lista.html",
        controller: 'dependenciaController',
    })
    .state('funcionarios',{
        abstract: true,
        url: "/funcionarios",
        templateUrl: "views/common/content.html",
    })
    .state('funcionarios.lista', {
        url: "/lista",
        templateUrl: "views/funcionarios/lista.html",
        controller: 'funcionarioController',
    })
    .state('establecimientos',{
        abstract: true,
        url: "/establecimientos",
        templateUrl: "views/common/content.html",
    })
    .state('establecimientos.lista', {
        url: "/lista",
        templateUrl: "views/establecimientos/lista.html",
        controller: 'establecimientoController',
    })
    .state('visitas',{
        abstract: true,
        url: "/visitas",
        templateUrl: "views/common/content.html",
    })
    .state('visitas.lista', {
        url: "/lista",
        templateUrl: "views/visitas/lista.html",
        controller: 'visitaController',
    })
    .state('alarmas',{
        abstract: true,
        url: "/alarmas",
        templateUrl: "views/common/content.html",
    })
    .state('alarmas.lista', {
        url: "/alarmas",
        templateUrl: "views/alarmas/lista.html",
        controller: 'alarmaController',
    })
    .state('checklist',{
        abstract: true,
        url: "/checklist",
        templateUrl: "views/common/content.html",
    })
    .state('checklist.lista', {
        url: "/lista",
        templateUrl: "views/checklist/lista.html",
        controller: 'checklistController',
    })
    .state('atributos',{
        abstract: true,
        url: "/atributos",
        templateUrl: "views/common/content.html",
    })
    .state('atributos.lista', {
        url: "/lista",
        templateUrl: "views/atributo.html",
        controller: 'alarmaController',
    })
    .state('login', {
        url: "/login",
        templateUrl: "views/login.html",
        controller: 'loginController',
        data: { pageTitle: 'Login', specialClass: 'login-page' }
    })
    .state('logout', {
        url: "/logout",
        controller: 'logoutController'
    });

    angular.extend(CacheFactoryProvider.defaults, {
        maxAge: 60 * 60 * 1000, // 1 hour,
        deleteOnExpire: 'aggressive',
    });

}
angular
    .module('ivcApp')
    .config(config)
    .run(function($log, $rootScope, $location, auth, $state){
        // mensaje en la consola
        $log.debug("App Cargada");
        
        $rootScope.$state = $state;

        //validar si el usuario ha iniciado session
        $rootScope.$on('$stateChangeSuccess', function() {
            var restrictedPage = ['/login', '/register'].indexOf($location.path()) === -1;
            if (restrictedPage && !auth.isLoggedIn())    
                $state.go('login');  
            if (!restrictedPage && auth.isLoggedIn())
                $state.go('entidades.lista');
        });
    });
