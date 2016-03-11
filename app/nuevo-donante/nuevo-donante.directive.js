/**
 * @desc Directiva personalizada.
 * @example <nuevo-donante></nuevo-donante>
 * @author Roberto Sottini <robysottini@gmail.com>
 */
// Nombre de directiva (JavaScript): se usa camelcase.
// Nombre de la etiqueta (HTML): se usa guión medio.
(function() {
    'use strict';

    angular
        .module('donacionesApp.nuevoDonante')
        .directive('nuevoDonante', nuevoDonante);

    function nuevoDonante() {
        return {
            restrict: 'E', // Creo el nuevo elemento (E: Element) con nombre 'nuevo-donante'.
            templateUrl: 'app/nuevo-donante/nuevo-donante.html'
        };
    }
})();