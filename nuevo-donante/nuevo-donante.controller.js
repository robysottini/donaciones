/**
 * Módulo Donante con directiva personalizada.
 * Acá se agrega el código JavaScript del componente de UI-Bootrap que se
 * necesite, como el código para Tabs.
 * También se llaman los archivos php que interactúan con la base de datos.
 * 
 * @author Roberto Sottini <robysottini@gmail.com>
 * @version 1.0
 */

// Nombre de directiva: se usa camelcase.
// Nombre de la etiqueta: se usa guión medio.
(function() {
    'use strict';

    angular
    .module('donacionesApp')
    .controller('NuevoDonanteController', NuevoDonanteController);

    function NuevoDonanteController($scope, $filter, $http) {
        $scope.matrizGruposSanguineos = [];
        $scope.matrizFrecuenciasDeDonacion = [];
        $scope.persona = {
            /*
            dni: 33931635,
            nombre: 'Elizabeth',
            apellido: 'Ponce',
            dia: 17,
            mes: 06,
            ano: 1988,
            nota: ',
            frecuenciaDeDonacion: 3,
            direccion: 'Las Vertientes 639',
            grupoSanguineo: 3,
            email: 'lizi@gmail.com',
            telefono: '15123456',
            */
            codigoDeArea: '02901' // Valor por defecto que aparece en el nuevo.
        };

        /* –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
         * Solicita todos los grupos sanguíneos al archivo nuevo-donante.php y los
         * guarda en el array matrizGruposSanguineos.
         */
        $http.get('nuevo-donante/nuevo-donante.php?action=obtener-grupos-sanguineos')
            .success(function(response) {
                $scope.matrizGruposSanguineos = response;
                //console.log('Grupo Sanguineo[0]: ' + response[0].gru_nombre);
            }).
            error(function(data, status, headers, config) {
                console.log('Error en main.js > nuevo-donante/nuevo-donante.php?action=obtenerGruposSanguineos. Status: ' + status + '.');
        });    
        
        /* –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
         * Solicita las frecuencias de donación (3, 4 ó 6 meses) al archivo
         * nuevo-donante.php y las guarda en el array matrizFrecuenciasDeDonacion.
         */
        $http.get('nuevo-donante/nuevo-donante.php?action=obtener-frecuencias-de-donacion')
            .success(function(response) {
                $scope.matrizFrecuenciasDeDonacion = response;
                //console.log('Frecuencia de donación[0]: ' + response[0].fre_nombre);
            }).
            error(function(data, status, headers, config) {
                console.log('Error en main.js > nuevo-donante/nuevo-donante.php?action=obtenerFrecuenciasDeDonacion. Status: ' + status + '.');
        });

        /* –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
         * Envía el objeto persona al archivo nuevo-donante.php para agregar una
         * nueva persona.
         */
        $scope.agregarPersona = function() {
            //console.log('Persona para agregar: ' + $scope.persona.nombre);
            $http.post('nuevo-donante/nuevo-donante.php?action=agregar-persona', $scope.persona)
                .then(function(response) {
                    //console.log('Respuesta: ' + response.status);
                    //console.log('Data: ' + response.data);
                    $scope.persona = {}; // Limpio los campos. Acá se puede mostrar un UI-Alert.
                    $scope.nuevoDonante.$setPristine(); // Establezco el nuevo y todos sus controles al estado original.
                });
        };
    }
})();