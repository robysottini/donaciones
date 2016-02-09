/**
 * @desc directiva personalizada del módulo Datepicker.
 * @example <datepickerPersonalizado></datepickerPersonalizado>
 * @author Roberto Sottini <robysottini@gmail.com>
 */
(function() {
    'use strict';

    angular
        .module('donacionesApp')
        .directive('datepickerPersonalizado', datepickerPersonalizado);

    function datepickerPersonalizado() {
        return {
	        restrict: 'E', // Creo el nuevo elemento (E: Element) con nombre 'datepicker-personalizado'.
	        templateUrl: 'datepicker-personalizado/datepicker-personalizado.html'
	    }
	}
})();