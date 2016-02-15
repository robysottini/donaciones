(function() {
    'use strict';

    angular
        .module('donacionesApp.formularioDonanteDonacion')
        .directive('formularioDonanteDonacion', formularioDonanteDonacion);

    function formularioDonanteDonacion() {
        return {
            restrict: 'E', // Creo el nuevo elemento (E: Element) con nombre 'formulario-donante-donacion'.
            templateUrl: 'formulario-donante-donacion/formulario-donante-donacion.html'
        }
    }
})();