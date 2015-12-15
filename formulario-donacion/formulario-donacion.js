/**
 * Módulo FormularioDonacion con directiva personalizada.
 * Acá se agrega el código JavaScript del componente de UI-Bootrap que se
 * necesite, como el código para Tabs.
 * También se llaman los archivos php que interactúan con la base de datos.
 * 
 * @author Roberto Sottini <robysottini@gmail.com>
 * @version 1.0
 */

// Nombre de directiva: se usa camelcase.
// Nombre de la etiqueta: se usa guión medio.
myApp.directive("formularioDonacion", function() {
    return {
        restrict: "E", // Creo el nuevo elemento (E: Element) con nombre "formularioDonacion".
        templateUrl: "formulario-donacion/formulario-donacion.html"
    };
});

myApp.controller("FormularioDonacionController", function($scope, $filter, $http) {

    $scope.donacion = {
		/*
	    nombre: "33931635",
	    dia: 17,
	    mes: 06,
	    ano: 1988
	    */
	};
	
	/* –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
	 * Envía el objeto donacion al archivo formulario-donacion.php para agregar
	 * una nueva donacion.
	 */
	$scope.agregarDonacion = function() {
	    //console.log("donacion para agregar: " + $scope.donacion.nombre);
	    $http.post("formulario-donacion/formulario-donacion.php?action=agregar-donacion", $scope.donacion)
	        .then(function(response) {
	            //console.log("Respuesta: " + response.status);
	            //console.log("Data: " + response.data);
	            $scope.donacion = {}; // Limpio los campos. Acá se puede mostrar un UI-Alert.
	        });
	};	

});