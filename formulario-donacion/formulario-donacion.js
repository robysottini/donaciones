/**
 * Módulo FormularioDonacion con directiva personalizada.
 * Acá se agrega el código JavaScript del componente de UI-Bootrap que se
 * necesite, como el código para Tabs.
 * También se llaman los archivos php que interactúan con la base de datos.
 * 
 * @author Roberto Sottini <robysottini@gmail.com>
 * @version 1.0
 */

// Nombre de directiva: se usa camelcase.
// Nombre de la etiqueta: se usa guión medio.
myApp.directive("formularioDonacion", function() {
    return {
        restrict: "E", // Creo el nuevo elemento (E: Element) con nombre "formularioDonacion".
        templateUrl: "formulario-donacion/formulario-donacion.html"
    };
});

myApp.controller("FormularioDonacionController", function($scope, $filter, $http) {

    $scope.donacion = {
        /*
        fecha: "2015-10-16",
        persona: 45,
        */
    };
    $scope.donanteSeleccionado = {};
    $scope.rowPersonas = [];
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
        "title": "Nueva donación exitosa",
        "dismissable": false,
        "type": "success",
        "show": false
    };*/

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