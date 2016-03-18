/**
 * @desc Directiva personalizada.
 * @example <formulario-donante></formulario-donante>
 * @author Roberto Sottini <robysottini@gmail.com>
 */
// Nombre de directiva (JavaScript): se usa camelcase.
// Nombre de la etiqueta (HTML): se usa guión medio.
(function() {
    'use strict';

    angular
        .module('donacionesApp.formularioDonanteDonacion')
        .directive('formularioDonanteDonacion', formularioDonanteDonacion);

    function formularioDonanteDonacion() {
        return {
            restrict: 'E', // Creo el nuevo elemento (E: Element) con nombre 'formulario-donante-donacion'.
            templateUrl: 'app/formulario-donante-donacion/formulario-donante-donacion.html'
        };
    }
})();