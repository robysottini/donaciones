/**
 * Módulo Donante y Donacion con directiva personalizada.
 * Acá se agrega el código JavaScript del componente de UI-Bootrap que se
 * necesite, como el código para Tabs.
 * También se llaman los archivos php que interactúan con la base de datos.
 * 
 * @author Roberto Sottini <robysottini@gmail.com>
 * @version 1.0
 */

(function() {

    angular
        .module('donacionesApp.formularioDonanteDonacion')
        .controller('FormularioDonanteDonacionController', FormularioDonanteDonacionController);

    FormularioDonanteDonacionController.$inject = ['$scope', '$http'];

    function FormularioDonanteDonacionController($scope, $http) {
        $scope.matrizGruposSanguineos = [];
        $scope.matrizFrecuenciasDeDonacion = [];
        $scope.rowDonantes = [];
        $scope.donanteSeleccionado = {};
        $scope.donanteDonacion = {
            apellido: 'Juan',
            nombre: 'Pérez',
            dni: 30123456,
            dia: 17,
            mes: 06,
            ano: 1988,
            telefono: '15123456',
            email: 'juanperez@gmail.com',
            direccion: 'San Martín 1234',
            grupoSanguineo: 3,
            frecuenciaDeDonacion: 3,
            nota: 'Presión baja.',
            diaDeDonacion: 05,
            mesDeDonacion: 01,
            anoDeDonacion: 2016,
            
            codigoDeArea: '02901' // Valor por defecto que aparece en el formulario.
        };

        /* –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
         * Solicita todos los grupos sanguíneos al archivo formulario-donante-donacion.php y los
         * guarda en el array matrizGruposSanguineos.
         */
        $http.get('app/formulario-donante-donacion/formulario-donante-donacion.php?action=obtener-grupos-sanguineos')
            .success(function(response) {
                $scope.matrizGruposSanguineos = response;
                //console.log('Grupo Sanguineo[0]: ' + response[0].gru_nombre);
            }).
            error(function(data, status, headers, config) {
                console.log('Error en main.js > app/formulario-donante-donacion/formulario-donante-donacion.php?action=obtener-grupos-sanguineos. Status: ' + status + '.');
        });    
        
        /* –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
         * Solicita las frecuencias de donación (3, 4 ó 6 meses) al archivo
         * formulario-donante-donacion.php y las guarda en el array matrizFrecuenciasDeDonacion.
         */
        $http.get('app/formulario-donante-donacion/formulario-donante-donacion.php?action=obtener-frecuencias-de-donacion')
            .success(function(response) {
                $scope.matrizFrecuenciasDeDonacion = response;
                //console.log('Frecuencia de donación[0]: ' + response[0].fre_nombre);
            }).
            error(function(data, status, headers, config) {
                console.log('Error en main.js > app/formulario-donante-donacion/formulario-donante-donacion.php?action=obtener-frecuencias-de-donacion. Status: ' + status + '.');
        });

        /* –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
         * Solicita todos los donantes al archivo formulario-donante-donacion.php y las
         * guarda en el array rowDonantes.
         */
        $http.get('app/formulario-donante-donacion/formulario-donante-donacion.php?action=obtener-donantes')
            .success(function(response) {
                $scope.rowDonantes = response;
                //console.log(JSON.stringify($scope.rowDonantes, null, 2));
            }).
            error(function(data, status, headers, config) {
                console.log('Error en main.js > app/formulario-donante-donacion/formulario-donante-donacion.php?action=obtener-donantes. Status: ' + status + '.');
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
            $http.post('app/formulario-donante-donacion/formulario-donante-donacion.php?action=agregar-donante-donacion', $scope.donanteDonacion)
                .then(function(response) {
                    //console.log('Respuesta: ' + response.status);
                    //console.log('Data: ' + response.data);
                    $scope.donanteDonacion = {}; // Limpio los campos. Acá se puede mostrar un UI-Alert.
                    $scope.formularioDonanteDonacion.$setPristine(); // Establezco el formulario y todos sus controles al estado original.
                });
        };
    }
})();