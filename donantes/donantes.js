/**
 * Módulo Donantes con directiva personalizada.
 * Acá se agrega el código JavaScript del componente de UI-Bootrap que se necesite, como el código para Tabs.
 * También se llaman los archivos php que interactúan con la base de datos.
 * 
 * @author Roberto Sottini <robysottini@gmail.com>
 * @version 1.0
 */

myApp.directive('donantes', function() {
    return {
        restrict: 'E', // Creo el nuevo elemento (E: Element) con nombre "donantes".
        templateUrl: 'donantes/donantes.html'
    };
});

myApp.controller("DonantesController", function($scope, $filter, $http) {
    
    $scope.rowPersonas = [];

    /* –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
     * Solicita todas las personas y sus respectivas próximas donaciones al
     * archivo personas.php y las guarda en el array rowPersonas.
     */
    $http.get("donantes/donantes.php?action=obtener-personas")
        .success(function(response) {
            $scope.rowPersonas = response;
            //console.log("JSON: " + response[0].per_nombre);
        }).
        error(function(data, status, headers, config) {
            console.log("Error en main.js > donantes.php?action=obtenerPersonas. Status: " + status + ".");
    });
    

});