/**
 * @desc Directiva personalizada.
 * @example <formulario-donacion></formulario-donacion>
 * @author Roberto Sottini <robysottini@gmail.com>
 */
// Nombre de directiva (JavaScript): se usa camelcase.
// Nombre de la etiqueta (HTML): se usa guión medio.
(function() {
    'use strict';

    angular
        .module('donacionesApp.formularioDonacion')
        .directive('formularioDonacion', formularioDonacion);

    function formularioDonacion() {
        return {
            restrict: 'E', // Creo el nuevo elemento (E: Element) con nombre 'formularioDonacion'.
            templateUrl: 'app/formulario-donacion/formulario-donacion.html'
        };
    }
})();