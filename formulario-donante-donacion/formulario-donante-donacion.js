/**
 * Módulo Donante con directiva personalizada.
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
    $scope.persona = {
        /*
        dni: 33931635,
        nombre: "Elizabeth",
        apellido: "Ponce",
        dia: 17,
        mes: 06,
        ano: 1988,
        nota: "",
        frecuenciaDeDonacion: 3,
        direccion: "Las Vertientes 639",
        grupoSanguineo: 3,
        email: "lizi@gmail.com",
        telefono: "15123456",
        */
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
            console.log("Error en main.js > formulario-donante-donacion/formulario-donante-donacion.php?action=obtenerGruposSanguineos. Status: " + status + ".");
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
            console.log("Error en main.js > formulario-donante-donacion/formulario-donante-donacion.php?action=obtenerFrecuenciasDeDonacion. Status: " + status + ".");
    });

    /* –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
     * Envía el objeto persona al archivo formulario-donante-donacion.php para agregar una
     * nueva persona.
     */
    $scope.agregarPersona = function() {
        //console.log("Persona para agregar: " + $scope.persona.nombre);
        $http.post("formulario-donante-donacion/formulario-donante-donacion.php?action=agregar-persona", $scope.persona)
            .then(function(response) {
                //console.log("Respuesta: " + response.status);
                //console.log("Data: " + response.data);
                $scope.persona = {}; // Limpio los campos. Acá se puede mostrar un UI-Alert.
                $scope.formularioDonanteDonacion.$setPristine(); // Establezco el formulario y todos sus controles al estado original.
            });
    };    




    $scope.donacion = {
        /*
        fecha: "2015-10-16",
        persona: 45,
        */
    };

    $scope.donanteSeleccionado = {};

    $scope.rowPersonas = [];

    /* –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
     * Solicita todas las personas al archivo formulario-donacion.php y las 
     * guarda en el array rowPersonas.
     */
    $http.get("formulario-donacion/formulario-donacion.php?action=obtener-personas")
        .success(function(response) {
            $scope.rowPersonas = response;
            //console.log(JSON.stringify($scope.rowPersonas, null, 2));
        }).
        error(function(data, status, headers, config) {
            console.log("Error en main.js > formulario-donacion.php?action=obtener-personas. Status: " + status + ".");
    });
    
    /* –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
     * Envía el objeto donacion al archivo formulario-donacion.php para agregar
     * una nueva donación.
     */
    $scope.agregarDonacion = function() {
        $scope.donacion.persona = $scope.donanteSeleccionado.per_id;
        console.log(JSON.stringify($scope.donacion, null, 2));
        //console.log("donacion para agregar: " + $scope.donacion.nombre);
        $http.post("formulario-donacion/formulario-donacion.php?action=agregar-donacion", $scope.donacion)
            .then(function(response) {
                //console.log("Respuesta: " + response.status);
                //console.log("Data: " + response.data);
                $scope.donacion = {}; // Limpio los campos. Acá se puede mostrar un UI-Alert.
            });
    };    




});