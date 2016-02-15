/**
 * @desc directiva personalizada.
 * @example <encabezado></encabezado>
 * @author Roberto Sottini <robysottini@gmail.com>
 */
(function() {
    'use strict';

    angular
    .module('donacionesApp.encabezado')
    .directive('encabezado', encabezado);

    function encabezado() {
        return {
            restrict: 'E', // Creo el nuevo elemento (E: Element) con nombre "encabezado".
            templateUrl: 'encabezado/encabezado.html'
        }
    }
})();