/**
 * @desc Configuración de servicios. .
 * @author Roberto Sottini <robysottini@gmail.com>
 */

(function() {
    'use strict';

    angular
        .module('donacionesApp.pestanas')
        .config(pestanas);
        
    pestanas.$inject = ['$stateProvider', '$urlRouterProvider'];

    function pestanas($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/main/donantes');
        $stateProvider
            .state('main', {
                url:         '/main', 
                templateUrl: 'app/pestanas/pestanas.html', 
                abtract:     true
            })
            .state('main.estadoDonantes', {  
                url:          '/donantes',  
                templateUrl:  'app/donantes/donantes.html', 
                controller:   'DonantesController', 
                controllerAs: 'donantesCtrl' 
            }) 
            .state('main.estadoNuevoDonante', { 
                url:          '/nuevo-donante', 
                templateUrl:  'app/nuevo-donante/nuevo-donante.html',
                controller:   'NuevoDonanteController',
                controllerAs: 'nuevoDonanteCtrl'
            })
            .state('main.estadoModificarDonante', { 
                url:          '/modificar-donante', 
                templateUrl:  'app/modificar-donante/modificar-donante.html',
                controller:   'ModificarDonanteController',
                controllerAs: 'modificarDonanteCtrl'
            })
            .state('main.estadoFormularioDonacion', { 
                url:          '/nueva-donacion', 
                templateUrl:  'app/formulario-donacion/formulario-donacion.html',
                controller:   'FormularioDonacionController',
                controllerAs: 'formularioDonacionCtrl'
            })
            .state('main.estadoFormularioDonanteDonacion', { 
                url:          '/formulario-donante-donacion', 
                templateUrl:  'app/formulario-donante-donacion/formulario-donante-donacion.html',
                controller:   'FormularioDonanteDonacionController',
                controllerAs: 'formularioDonanteDonacionCtrl'
            });
    }
})();