/**
 * @desc Directiva personalizada.
 * @example <donantes></donantes>
 * @author Roberto Sottini <robysottini@gmail.com>
 */
// Nombre de directiva (JavaScript): se usa camelcase.
// Nombre de la etiqueta (HTML): se usa guión medio.
(function() {
    'use strict';

    angular
        .module('donacionesApp.donantes')
    	.directive('donantes', donantes);

	function donantes() {
	    return {
	        restrict: 'E', // Creo el nuevo elemento (E: Element) con nombre 'donantes'.
	        templateUrl: 'app/donantes/donantes.html'
	    }
	}
})();