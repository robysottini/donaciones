/**
 * Módulo Donante con directiva personalizada.
 * Acá se agrega el código JavaScript del componente de UI-Bootrap que se
 * necesite, como el código para Tabs.
 * También se llaman los archivos php que interactúan con la base de datos.
 * 
 * @author Roberto Sottini <robysottini@gmail.com>
 * @version 1.0
 */

// Nombre de directiva: se usa camelcase.
// Nombre de la etiqueta: se usa guión medio.
(function() {
    'use strict';

    angular
    .module('donacionesApp.nuevoDonante')
    .directive('nuevoDonante', nuevoDonante);

    function nuevoDonante() {
        return {
            restrict: 'E', // Creo el nuevo elemento (E: Element) con nombre 'nuevo-donante'.
            templateUrl: 'nuevo-donante/nuevo-donante.html'
        }
    }
})();