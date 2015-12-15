/**
 * Módulo Encabezado con directiva personalizada.
 *
 * @author Roberto Sottini <robysottini@gmail.com>
 * @version 1.0
 */

myApp.directive('encabezado', function() {
    return {
    	restrict: 'E', // Creo el nuevo elemento (E: Element) con nombre "encabezado".
    	templateUrl: 'encabezado/encabezado.html'
    };
});