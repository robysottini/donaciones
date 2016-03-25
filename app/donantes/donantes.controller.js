/**
 * @desc Controlador. Llamadas a los archivos php que interactúan con la base de datos.
 * @author Roberto Sottini <robysottini@gmail.com>
 */
 
(function() {
    'use strict';

    angular
        .module('donacionesApp.donantes')
        .controller('DonantesController', DonantesController);

    DonantesController.$inject = ['$scope', '$http'];

    function DonantesController($scope, $http) {
        $scope.matrizPersonas = [];
        
        /* –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
         * Solicita todas las personas y sus respectivas próximas donaciones al
         * archivo personas.php y las guarda en el array matrizPersonas.
         */
        $http
            .get('app/donantes/donantes.php?action=obtener-personas')
            .then(function(response) {
                $scope.matrizPersonas = response.data;
                //console.log('JSON: ' + response[0].per_nombre);
                }, function(response) {
                    console.log('Error en donantes.controller.js (estado ' + response.status + ' ' + response.statusText + ').');
            });
    }
})();