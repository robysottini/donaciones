/**
 * Módulo Donante con directiva personalizada.
 * Acá se agrega el código JavaScript del componente de UI-Bootrap que se
 * necesite, como el código para Tabs.
 * También se llaman los archivos php que interactúan con la base de datos.
 * 
 * @author Roberto Sottini <robysottini@gmail.com>
 * @version 1.0
 */

(function() {
    'use strict';

    angular
    .module('donacionesApp')
    .directive('modificarDonante', modificarDonante);

    function modificarDonante() {
        return {
            restrict: 'E', // Creo el modificar elemento (E: Element) con nombre 'modificar-donante'.
            templateUrl: 'modificar-donante/modificar-donante.html'
        }
    }
})();