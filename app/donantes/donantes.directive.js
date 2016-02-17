/**
 * @desc Directiva personalizada.
 * @author Roberto Sottini <robysottini@gmail.com>
 */
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