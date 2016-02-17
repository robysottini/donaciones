/**
 * Módulo Donante con directiva personalizada.
 * Acá se agrega el código JavaScript del componente de UI-Bootrap que se
 * necesite, como el código para Tabs.
 * También se llaman los archivos php que interactúan con la base de datos.
 * 
 * @author Roberto Sottini <robysottini@gmail.com>
 * @version 1.0
 */

(function() {
    'use strict';

    angular
        .module('donacionesApp.modificarDonante')
        .controller('ModificarDonanteController', ModificarDonanteController);

    ModificarDonanteController.$inject = ['$scope', '$http'];

    function ModificarDonanteController ($scope, $http) {
        $scope.matrizGruposSanguineos = [];
        $scope.matrizFrecuenciasDeDonacion = [];
        $scope.matrizPersonas = [];
        $scope.donanteSeleccionado = {};
        $scope.persona = {        
            /*
            dni: 33931635,
            nombre: 'Elizabeth',
            apellido: 'Ponce',
            per_fecha_nacimiento: '2000-12-25',
            nota: ',
            per_frecuencia: 3,
            direccion: 'Las Vertientes 639',
            per_gru_sanguineo: 3,
            email: 'lizi@gmail.com',
            telefono: '15123456',
            
            codigoDeArea: '02901'*/ // Valor por defecto que aparece en el formulario.
        };

        /* –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
         * Solicita todas las personas al archivo modificar-donante.php y las 
         * guarda en el array matrizPersonas.
         */
        $http
            .get('app/modificar-donante/modificar-donante.php?action=obtener-personas')
            .success(function(response) {
                $scope.matrizPersonas = response;
                //console.log(JSON.stringify($scope.matrizPersonas, null, 2));
            })
            .error(function(data, status, headers, config) {
                console.log('Error en modificar-donante.js > modificar-donante.php?action=obtener-personas. Status: ' + status + '.');
        });

        /* –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
         * Solicita todos los grupos sanguíneos al archivo modificar-donante.php y los
         * guarda en el array matrizGruposSanguineos.
         */
        $http
            .get('app/modificar-donante/modificar-donante.php?action=obtener-grupos-sanguineos')
            .success(function(response) {
                $scope.matrizGruposSanguineos = response;
                //console.log('Grupo Sanguineo[0]: ' + response[0].gru_nombre);
            })
            .error(function(data, status, headers, config) {
                console.log('Error en modificar-donante.js > app/modificar-donante/modificar-donante.php?action=obtener-grupos-sanguineos. Status: ' + status + '.');
        });    
        
        /* –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
         * Solicita las frecuencias de donación (3, 4 ó 6 meses) al archivo
         * modificar-donante.php y las guarda en el array matrizFrecuenciasDeDonacion.
         */
        $http
            .get('app/modificar-donante/modificar-donante.php?action=obtener-frecuencias-de-donacion')
            .success(function(response) {
                $scope.matrizFrecuenciasDeDonacion = response;
                //console.log('Frecuencia de donación[0]: ' + response[0].fre_nombre);
            })
            .error(function(data, status, headers, config) {
                console.log('Error en modificar-donante.js > app/modificar-donante/modificar-donante.php?action=obtener-frecuencias-de-donacion. Status: ' + status + '.');
        });

        /* –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
         * Envía el objeto persona al archivo modificar-donante.php para modificar
         * una persona.
         */
        $scope.modificarPersona = function() {
            //console.log('Persona para modificar: ' + $scope.persona.nombre);
            $http
                .post('app/modificar-donante/modificar-donante.php?action=modificar-persona', $scope.persona)
                .then(function(response) {
                    //console.log('Respuesta: ' + response.status);
                    //console.log('Data: ' + response.data);
                    $scope.persona = {}; // Limpio los campos. Acá se puede mostrar un UI-Alert.
                    $scope.modificarDonante.$setPristine(); // Establezco el formulario y todos sus controles al estado original.
                })
        };
        $scope.matrizAnos = [
            {ano: 2014}, 
            {ano: 2015}
        ];   
    }
})();