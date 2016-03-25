/**
 * @desc Directiva personalizada.
 * @example <modificar-donante></modificar-donante>
 * @author Roberto Sottini <robysottini@gmail.com>
 */
// Nombre de directiva (JavaScript): se usa camelcase.
// Nombre de la etiqueta (HTML): se usa guión medio.
(function() {
    'use strict';

    angular
        .module('donacionesApp.modificarDonante')
        .directive('modificarDonante', modificarDonante);

    function modificarDonante() {
        return {
            restrict: 'E', // Creo el modificar elemento (E: Element) con nombre 'modificar-donante'.
            templateUrl: 'app/modificar-donante/modificar-donante.html'
        };
    }
})();