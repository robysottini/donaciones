/**
 * Módulo Donante con directiva personalizada.
 * Acá se agrega el código JavaScript del componente de UI-Bootrap que se
 * necesite, como el código para Tabs.
 * También se llaman los archivos php que interactúan con la base de datos.
 * 
 * @author Roberto Sottini <robysottini@gmail.com>
 * @version 1.0
 */

myApp.directive("modificarDonante", function() {
    return {
        restrict: "E", // Creo el modificar elemento (E: Element) con nombre "modificar-donante".
        templateUrl: "modificar-donante/modificar-donante.html"
    };
});

myApp.controller("ModificarDonanteController", function($scope, $filter, $http) {

    $scope.rowGruposSanguineos = [];
    $scope.rowFrecuenciasDeDonacion = [];
    $scope.rowPersonas = [];
    $scope.donanteSeleccionado = {};
    $scope.persona = {        
        /*
        dni: 33931635,
        nombre: "Elizabeth",
        apellido: "Ponce",
        per_fecha_nacimiento: "2000-12-25",
        nota: "",
        per_frecuencia: 3,
        direccion: "Las Vertientes 639",
        per_gru_sanguineo: 3,
        email: "lizi@gmail.com",
        telefono: "15123456",
        
        codigoDeArea: "02901"*/ // Valor por defecto que aparece en el formulario.
    };

    /* –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
     * Solicita todas las personas al archivo modificar-donante.php y las 
     * guarda en el array rowPersonas.
     */
    $http.get("modificar-donante/modificar-donante.php?action=obtener-personas")
        .success(function(response) {
            $scope.rowPersonas = response;
            //console.log(JSON.stringify($scope.rowPersonas, null, 2));
        }).
        error(function(data, status, headers, config) {
            console.log("Error en modificar-donante.js > modificar-donante.php?action=obtener-personas. Status: " + status + ".");
    });

    /* –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
     * Solicita todos los grupos sanguíneos al archivo modificar-donante.php y los
     * guarda en el array rowGruposSanguineos.
     */
    $http.get("modificar-donante/modificar-donante.php?action=obtener-grupos-sanguineos")
        .success(function(response) {
            $scope.rowGruposSanguineos = response;
            //console.log("Grupo Sanguineo[0]: " + response[0].gru_nombre);
        }).
        error(function(data, status, headers, config) {
            console.log("Error en modificar-donante.js > modificar-donante/modificar-donante.php?action=obtener-grupos-sanguineos. Status: " + status + ".");
    });    
    
    /* –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
     * Solicita las frecuencias de donación (3, 4 ó 6 meses) al archivo
     * modificar-donante.php y las guarda en el array rowFrecuenciasDeDonacion.
     */
    $http.get("modificar-donante/modificar-donante.php?action=obtener-frecuencias-de-donacion")
        .success(function(response) {
            $scope.rowFrecuenciasDeDonacion = response;
            //console.log("Frecuencia de donación[0]: " + response[0].fre_nombre);
        }).
        error(function(data, status, headers, config) {
            console.log("Error en modificar-donante.js > modificar-donante/modificar-donante.php?action=obtener-frecuencias-de-donacion. Status: " + status + ".");
    });

    /* –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
     * Envía el objeto persona al archivo modificar-donante.php para agregar
     * una nueva persona.
     */
    $scope.agregarPersona = function() {
        //console.log("Persona para agregar: " + $scope.persona.nombre);
        $http.post("modificar-donante/modificar-donante.php?action=agregar-persona", $scope.persona)
            .then(function(response) {
                //console.log("Respuesta: " + response.status);
                //console.log("Data: " + response.data);
                $scope.persona = {}; // Limpio los campos. Acá se puede mostrar un UI-Alert.
                $scope.modificarDonante.$setPristine(); // Establezco el formulario y todos sus controles al estado original.
            });
    };

    /* –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
     * Envía el objeto persona al archivo modificar-donante.php para modificar
     * una persona.
     */
    $scope.modificarPersona = function() {
        //console.log("Persona para modificar: " + $scope.persona.nombre);
        $http.post("modificar-donante/modificar-donante.php?action=modificar-persona", $scope.persona)
            .then(function(response) {
                //console.log("Respuesta: " + response.status);
                //console.log("Data: " + response.data);
                $scope.persona = {}; // Limpio los campos. Acá se puede mostrar un UI-Alert.
                $scope.formularioDonante.$setPristine(); // Establezco el formulario y todos sus controles al estado original.
            })
    };

/*
    $scope.today = function() {
        $scope.persona.per_fecha_nacimiento = new Date();
    };
    $scope.today();

    $scope.clear = function() {
        $scope.persona.per_fecha_nacimiento = null;
    };

    // Disable weekend selection
    $scope.desactivado = function(date, mode) {
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    };

    $scope.abrir = function() {
        $scope.popup.abierto = true;
    };

    $scope.setDate = function(year, month, day) {
        $scope.persona.per_fecha_nacimiento = new Date(year, month, day);
    };

    $scope.opcionesDeFecha = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.formats = ['dd/MM/yyyy', 'yyyy-MM-dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup = {
        abierto: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events =
        [
            {
                date: tomorrow,
                status: 'full'
            },
            {
                date: afterTomorrow,
                status: 'partially'
            }
        ];

    $scope.getDayClass = function(date, mode) {
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0,0,0,0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    };

*/

});