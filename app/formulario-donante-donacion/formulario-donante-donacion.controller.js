/**
 * @desc Controlador FormularioDonanteDonacionController.
 * @author Roberto Sottini <robysottini@gmail.com>
 */

(function() {
    'use strict';

    angular
        .module('donacionesApp.formularioDonanteDonacion')
        .controller('FormularioDonanteDonacionController', FormularioDonanteDonacionController);

    FormularioDonanteDonacionController.$inject = ['$scope', '$http'];

    function FormularioDonanteDonacionController($scope, $http) {
        $scope.matrizGruposSanguineos = [];
        $scope.matrizFrecuenciasDeDonacion = [];
        //$scope.rowDonantes = [];
        //$scope.donanteSeleccionado = {};
        $scope.donanteDonacion = {
            /*
            per_apellido: 'Erlenmeyer',
            per_nombre: 'Richard August Carl Emil',
            per_dni: '23',
            per_fecha_nacimiento: '1825-06-28',
            */
            per_codigo_area: '02901'//, Valor por defecto que aparece en el formulario.
            /*
            per_telefono: '15000023',
            per_email: 'emil.erlenmeyer@gmail.de',
            per_direccion: 'Taunusstein, Hesse',
            per_gru_sanguineo: '2',
            per_frecuencia: '2',
            per_nota: 'Tatuaje de la Universidad de Gießen.',
            don_fecha: '2015-10-16'
            */
        };

        /* –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
         * Solicita todos los grupos sanguíneos al archivo formulario-donante-donacion.php y los
         * guarda en el array matrizGruposSanguineos.
         */
        $http
            .get('app/formulario-donante-donacion/formulario-donante-donacion.php?action=obtener-grupos-sanguineos')
            .then(function(response) {
                $scope.matrizGruposSanguineos = response.data;
                //console.log(JSON.stringify($scope.matrizGruposSanguineos, null, 2));
                }, function(response) {
                    console.log('Error en formulario-donante-donacion.controller.js (estado ' + response.status + ' ' + response.statusText + ').');
            });
        /*$http
            .get('app/formulario-donante-donacion/formulario-donante-donacion.php?action=obtener-grupos-sanguineos')
            .success(function(response) {
                $scope.matrizGruposSanguineos = response;
                //console.log('Grupo Sanguineo[0]: ' + response[0].gru_nombre);
            })
            .error(function(data, status, headers, config) {
                console.log('Error en main.js > app/formulario-donante-donacion/formulario-donante-donacion.php?action=obtener-grupos-sanguineos. Status: ' + status + '.');
        });*/
        
        /* –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
         * Solicita las frecuencias de donación (3, 4 ó 6 meses) al archivo
         * formulario-donante-donacion.php y las guarda en el array matrizFrecuenciasDeDonacion.
         */
        $http
            .get('app/formulario-donante-donacion/formulario-donante-donacion.php?action=obtener-frecuencias-de-donacion')
            .then(function(response) {
                $scope.matrizFrecuenciasDeDonacion = response.data;
                //console.log('Frecuencia de donación[0]: ' + response[0].fre_nombre);
                }, function(response) {
                    console.log('Error en formulario-donante-donacion.controller.js (estado ' + response.status + ' ' + response.statusText + ').');
            });

        /* –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
         * Envía el objeto donanteDonacion al archivo
         * formulario-donante-donacion.php para agregar una nuevo donante y una
         * nueva donación.
         */
        $scope.agregarDonanteDonacion = function() {
            //$scope.donanteDonacion.donante = $scope.donanteSeleccionado.per_id;
            //console.log('donanteDonacion = ' + JSON.stringify($scope.donanteDonacion, null, 2));
            //console.log('Donante para agregar: ' + $scope.donante.nombre);
            $http
                .post('app/formulario-donante-donacion/formulario-donante-donacion.php?action=agregar-donante-donacion', $scope.donanteDonacion)
                .then(function() {
                    //console.log('Respuesta: ' + response.status);
                    //console.log('Data: ' + response.data);
                    $scope.donanteDonacion = {}; // Limpio los campos. Acá se puede mostrar un UI-Alert.
                    $scope.formularioDonanteDonacion.$setPristine(); // Establezco el formulario y todos sus controles al estado original.
                }, function(response) {
                    console.log('Error en formulario-donante-donacion.controller.js (estado ' + response.status + ' ' + response.statusText + ').');
                });
        };
    }
})();