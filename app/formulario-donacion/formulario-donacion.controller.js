/**
 * @desc Controlador FormularioDonacionController.
 * @author Roberto Sottini <robysottini@gmail.com>
 */

// Nombre de directiva (JavaScript): se usa camelcase.
// Nombre de la etiqueta (HTML): se usa guión medio.
(function() {
    'use strict';

    angular
        .module('donacionesApp.formularioDonacion')
        .controller('FormularioDonacionController', FormularioDonacionController);

    FormularioDonacionController.$inject = ['$scope', '$http'];

    function FormularioDonacionController($scope, $http) {
        // Inicializo el 
        $scope.donacion = {
            /*
            fecha: '2015-10-16',
            persona: 45,
            */
        };
        $scope.donanteSeleccionado = {};
        $scope.matrizPersonas = [];
        /*var myAlert = $alert({
            title: 'Holy guacamole!', 
            content: 'Best check yo self, you\'re not looking too good.', 
            placement: 'top', 
            type: 'info', 
            show: true
        });
        */
        /**
         * Diálogo de alerta que hereda comportamiento de los diálogos modales.
         * Directiva nativa de AngularStrap.
         */
        /*$scope.alerta = {
            'title': 'Nueva donación exitosa',
            'dismissable': false,
            'type': 'success',
            'show': false
        };*/

        /* –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
         * Solicita todas las personas al archivo formulario-donacion.php y las 
         * guarda en el array matrizPersonas.
         */
        $http
            .get('app/formulario-donacion/formulario-donacion.php?action=obtener-personas')
            .then(function(response) {
                $scope.matrizPersonas = response.data;
                //console.log(JSON.stringify($scope.matrizPersonas, null, 2));
                }, function(response) {
                    console.log('Error en formulario-donacion.controller.js (estado ' + response.status + ' ' + response.statusText + ').');
            });
        
        /*$http
            .get('app/formulario-donacion/formulario-donacion.php?action=obtener-personas')
            .success(function(response) {
                $scope.matrizPersonas = response;
                //console.log(JSON.stringify($scope.matrizPersonas, null, 2));
            })
            .error(function(data, status, headers, config) {
                console.log('Error en main.js > app/formulario-donacion/formulario-donacion.php?action=obtener-personas. Status: ' + status + '.');
        });*/

        /* –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
         * Envía el objeto donacion al archivo formulario-donacion.php para agregar
         * una nueva donación.
         */
        $scope.agregarDonacion = function() {
            $scope.donacion.persona = $scope.donanteSeleccionado.per_id;
            console.log(JSON.stringify($scope.donacion, null, 2));
            //console.log('donacion para agregar: ' + $scope.donacion.nombre);
            $http
                .post('app/formulario-donacion/formulario-donacion.php?action=agregar-donacion', $scope.donacion)
                .then(function() {
                    //console.log('Respuesta: ' + response.status);
                    //console.log('Data: ' + response.data);
                    $scope.donacion = {}; // Limpio los campos.
                    $scope.donanteSeleccionado = {}; // Limpio los campos. Acá se puede mostrar un UI-Alert.
                    $scope.formularioDonacion.$setPristine(); // Establezco el formulario y todos sus controles al estado original.
                }, function(response) {
                    console.log('Error en formulario-donacion.controller.js (estado ' + response.status + ' ' + response.statusText + ').');
                });
        };
        
        /* –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
         * Envía el objeto donacion al archivo formulario-donacion.php para
         * modificar una donación.
         */
        $scope.modificarDonacion = function() {
            $scope.donacion.persona = $scope.donanteSeleccionado.per_id;
            console.log(JSON.stringify($scope.donacion, null, 2));
            //console.log('donacion para modificar: ' + $scope.donacion.nombre);
            $http
                .post('app/formulario-donacion/formulario-donacion.php?action=modificar-donacion', $scope.donacion)
                .then(function() {
                    //console.log('Respuesta: ' + response.status);
                    //console.log('Data: ' + response.data);
                    $scope.donacion = {}; // Limpio los campos.
                    $scope.donanteSeleccionado = {}; // Limpio los campos. Acá se puede mostrar un UI-Alert.
                    $scope.formularioDonacion.$setPristine(); // Establezco el formulario y todos sus controles al estado original.
                }, function(response) {
                    console.log('Error en formulario-donacion.controller.js (estado ' + response.status + ' ' + response.statusText + ').');
                });
        };
    }
})();