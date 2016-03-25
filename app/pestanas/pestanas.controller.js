/**
 * @desc Controlador PestanasController.
 * @author Roberto Sottini <robysottini@gmail.com>
 */

(function() {
    'use strict';

    angular
        .module('donacionesApp.pestanas')
        .controller('PestanasController', PestanasController);

    PestanasController.$inject = ['$scope', '$rootScope', '$state'];

    function PestanasController($scope, $rootScope, $state) {
        $scope.go = function(route) {
            $state.go(route);
        };

        $scope.active = function(route) {
            return $state.is(route);
        };

        $scope.tabs = [{
            heading: 'Nuevo donante', 
            route:   'main.estadoNuevoDonante', 
            active:  false
        }, 
        {
            heading: 'Modificar donante', 
            route:   'main.estadoModificarDonante', 
            active:  false
        }, 
        {
            heading: 'Donantes', 
            route:   'main.estadoDonantes', 
            active:  false
        }, 
        {
            heading: 'Nueva donación', 
            route:   'main.estadoFormularioDonacion', 
            active:  false
        }, 
        {
            heading: 'Nuevo donante con donación', 
            route:   'main.estadoFormularioDonanteDonacion', 
            active:  false
        }];

        $scope.$on('$stateChangeSuccess', function() {
            $scope.tabs.forEach(function(tab) {
                tab.active = $scope.active(tab.route);
            });
        });
    }
})();