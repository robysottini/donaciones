/**
 * @desc Controlador NuevoDonanteController.
 * @author Roberto Sottini <robysottini@gmail.com>
 */

(function() {
    'use strict';

    angular
        .module('donacionesApp.nuevoDonante')
        .controller('NuevoDonanteController', NuevoDonanteController);

    NuevoDonanteController.$inject = ['$scope', '$http'];

    function NuevoDonanteController($scope, $http) {
        $scope.matrizGruposSanguineos = [];
        $scope.matrizFrecuenciasDeDonacion = [];
        $scope.persona = {
            /*
            per_apellido: 'Einstein',
            per_nombre: 'Albert',
            per_dni: '22',
            per_fecha_nacimiento: '1879-03-14',
            */
            per_codigo_area: '02901'//,  Valor por defecto.
            /*
            per_telefono: '15123456',
            per_email: 'albert.einstein@gmail.de',
            per_direccion: 'Ulm, Reino de Wurtemberg',
            per_gru_sanguineo: '1',
            per_frecuencia: '3',
            per_nota: 'Tatuaje E=MC2.'
            */
        };

        /* –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
         * Solicita todos los grupos sanguíneos al archivo nuevo-donante.php y los
         * guarda en el array matrizGruposSanguineos.
         */
        $http
            .get('app/nuevo-donante/nuevo-donante.php?action=obtener-grupos-sanguineos')
            .then(function(response) {
                $scope.matrizGruposSanguineos = response.data;
                //console.log('Grupo Sanguineo[0]: ' + response[0].gru_nombre);
            }, function(response) {
                console.log('Error nuevo-donante.controller.js (estado ' + response.status + ' ' + response.statusText + ').');
        });    
        
        /* –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
         * Solicita las frecuencias de donación (3, 4 ó 6 meses) al archivo
         * nuevo-donante.php y las guarda en el array matrizFrecuenciasDeDonacion.
         */
        $http
            .get('app/nuevo-donante/nuevo-donante.php?action=obtener-frecuencias-de-donacion')
            .then(function(response) {
                $scope.matrizFrecuenciasDeDonacion = response.data;
                //console.log('Frecuencia de donación[0]: ' + response[0].fre_nombre);
            }, function(response) {
                console.log('Error modificar-donante.controller.js (estado ' + response.status + ' ' + response.statusText + ').');
        });

        /* –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
         * Envía el objeto persona al archivo nuevo-donante.php para agregar una
         * nueva persona.
         */
        $scope.agregarPersona = function() {
            //console.log('Persona para agregar: ' + $scope.persona.nombre);
            $http
                .post('app/nuevo-donante/nuevo-donante.php?action=agregar-persona', $scope.persona)
                .then(function(response) {
                    //console.log('Respuesta: ' + response.status);
                    //console.log('Data: ' + response.data);
                    $scope.persona = {}; // Limpio los campos. Acá se puede mostrar un UI-Alert.
                    $scope.nuevoDonante.$setPristine(); // Establezco el nuevo y todos sus controles al estado original.
                });
        };
    }
})();