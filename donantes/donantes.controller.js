/**
 * @desc Controlador. Llamadas a los archivos php que interactúan con la base de datos.
 * @author Roberto Sottini <robysottini@gmail.com>
 */
(function() {
    'use strict';

    angular
    .module('donacionesApp')
    .controller('DonantesController', DonantesController);

    function DonantesController($scope, $filter, $http) {
        $scope.matrizPersonas = [];
        
        /* –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
         * Solicita todas las personas y sus respectivas próximas donaciones al
         * archivo personas.php y las guarda en el array matrizPersonas.
         */
        $http.get('donantes/donantes.php?action=obtener-personas')
            .success(function(response) {
                $scope.matrizPersonas = response;
                //console.log('JSON: ' + response[0].per_nombre);
            }).
            error(function(data, status, headers, config) {
                console.log('Error en main.js > donantes.php?action=obtenerPersonas. Status: ' + status + '.');
            });
    }
})();