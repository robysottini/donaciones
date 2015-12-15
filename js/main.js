/**
 * Funciones requeridas por index.html.
 * Acá se llaman los archivos php de la base de datos.
 *
 * @author Roberto Sottini <robysottini@gmail.com>
 * @version 2.0
 */

var myApp = angular.module("mainApp", ["ngAnimate", "ui.bootstrap", "ngSanitize", "mgcrea.ngStrap", "smart-table"]);

myApp.controller("MainController", function($scope, $filter, $http) {
    $scope.rowPersonas2 = [];

    /* –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
     * Solicita todas las personas al archivo personas.php y las guarda en el 
     * array rowPersonas2.
     */
   /* $http.get("personas.php?action=obtenerPersonas")
        .success(function(response) {
            $scope.rowPersonas2 = response;
            //console.log("JSON Base: " + response[0].per_nombre);
        }).
        error(function(data, status, headers, config) {
            console.log("Error en main.js > personas.php?action=obtenerPersonas. Status: " + status + ".");
    });*/
    
});