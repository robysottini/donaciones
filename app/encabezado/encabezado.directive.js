/**
 * @desc Directiva personalizada.
 * @example <encabezado></encabezado>
 * @author Roberto Sottini <robysottini@gmail.com>
 */
// Nombre de directiva (JavaScript): se usa camelcase.
// Nombre de la etiqueta (HTML): se usa guión medio.
(function() {
    'use strict';

    angular
        .module('donacionesApp.encabezado')
        .directive('encabezado', encabezado);

    function encabezado() {
        return {
            restrict: 'E', // Creo el nuevo elemento (E: Element).
            templateUrl: 'app/encabezado/encabezado.html'
        }
    }
})();