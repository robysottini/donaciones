/**
 * Módulo Donante y Donacion con directiva personalizada.
 * Acá se agrega el código JavaScript del componente de UI-Bootrap que se
 * necesite, como el código para Tabs.
 * También se llaman los archivos php que interactúan con la base de datos.
 * 
 * @author Roberto Sottini <robysottini@gmail.com>
 * @version 1.0
 */

myApp.directive("formularioDonanteDonacion", function() {
    return {
        restrict: "E", // Creo el nuevo elemento (E: Element) con nombre "formulario-donante-donacion".
        templateUrl: "formulario-donante-donacion/formulario-donante-donacion.html"
    };
});

myApp.controller("FormularioDonanteDonacionController", function($scope, $filter, $http) {

    $scope.rowGruposSanguineos = [];
    $scope.rowFrecuenciasDeDonacion = [];
    $scope.rowDonantes = [];
    $scope.donanteSeleccionado = {};
    $scope.donanteDonacion = {
        apellido: "Juan",
        nombre: "Pérez",
        dni: 30123456,
        dia: 17,
        mes: 06,
        ano: 1988,
        telefono: "15123456",
        email: "juanperez@gmail.com",
        direccion: "San Martín 1234",
        grupoSanguineo: 3,
        frecuenciaDeDonacion: 3,
        nota: "Presión baja.",
        diaDeDonacion: 05,
        mesDeDonacion: 01,
        anoDeDonacion: 2016,
        
        codigoDeArea: "02901" // Valor por defecto que aparece en el formulario.
    };

    /* –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
     * Solicita todos los grupos sanguíneos al archivo formulario-donante-donacion.php y los
     * guarda en el array rowGruposSanguineos.
     */
    $http.get("formulario-donante-donacion/formulario-donante-donacion.php?action=obtener-grupos-sanguineos")
        .success(function(response) {
            $scope.rowGruposSanguineos = response;
            //console.log("Grupo Sanguineo[0]: " + response[0].gru_nombre);
        }).
        error(function(data, status, headers, config) {
            console.log("Error en main.js > formulario-donante-donacion/formulario-donante-donacion.php?action=obtener-grupos-sanguineos. Status: " + status + ".");
    });    
    
    /* –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
     * Solicita las frecuencias de donación (3, 4 ó 6 meses) al archivo
     * formulario-donante-donacion.php y las guarda en el array rowFrecuenciasDeDonacion.
     */
    $http.get("formulario-donante-donacion/formulario-donante-donacion.php?action=obtener-frecuencias-de-donacion")
        .success(function(response) {
            $scope.rowFrecuenciasDeDonacion = response;
            //console.log("Frecuencia de donación[0]: " + response[0].fre_nombre);
        }).
        error(function(data, status, headers, config) {
            console.log("Error en main.js > formulario-donante-donacion/formulario-donante-donacion.php?action=obtener-frecuencias-de-donacion. Status: " + status + ".");
    });

    /* –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
     * Solicita todos los donantes al archivo formulario-donante-donacion.php y las
     * guarda en el array rowDonantes.
     */
    $http.get("formulario-donante-donacion/formulario-donante-donacion.php?action=obtener-donantes")
        .success(function(response) {
            $scope.rowDonantes = response;
            //console.log(JSON.stringify($scope.rowDonantes, null, 2));
        }).
        error(function(data, status, headers, config) {
            console.log("Error en main.js > formulario-donante-donacion/formulario-donante-donacion.php?action=obtener-donantes. Status: " + status + ".");
    });

    /* –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
     * Envía el objeto donanteDonacion al archivo
     * formulario-donante-donacion.php para agregar una nuevo donante y una
     * nueva donación.
     */
    $scope.agregarDonanteDonacion = function() {
        //$scope.donanteDonacion.donante = $scope.donanteSeleccionado.per_id;
        //console.log("donanteDonacion = " + JSON.stringify($scope.donanteDonacion, null, 2));
        //console.log("Donante para agregar: " + $scope.donante.nombre);
        $http.post("formulario-donante-donacion/formulario-donante-donacion.php?action=agregar-donante-donacion", $scope.donanteDonacion)
            .then(function(response) {
                //console.log("Respuesta: " + response.status);
                //console.log("Data: " + response.data);
                $scope.donanteDonacion = {}; // Limpio los campos. Acá se puede mostrar un UI-Alert.
                $scope.formularioDonanteDonacion.$setPristine(); // Establezco el formulario y todos sus controles al estado original.
            });
    };
});