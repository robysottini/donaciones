/**
 * @desc Controlador FormularioDonacionDatepicker.
 * @author Roberto Sottini <robysottini@gmail.com>
 */
 
(function() {
    'use strict';

    angular
        .module('donacionesApp.nuevoDonante')
        .controller('NuevoDonanteDatepickerController', NuevoDonanteDatepickerController);

    NuevoDonanteDatepickerController.$inject = ['$scope'];

    function NuevoDonanteDatepickerController($scope) {
        $scope.today = function() {
            $scope.fecha_nacimiento = new Date();
        };
        $scope.today();

        $scope.clear = function() {
            $scope.fecha_nacimiento = null;
        };

        // Disable weekend selection
        $scope.desactivado = function(date, mode) {
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        };

        $scope.abrir = function() {
            $scope.popup.abierto = true;
        };

        $scope.setDate = function(year, month, day) {
            $scope.fecha_nacimiento = new Date(year, month, day);
        };

        $scope.opcionesDeFecha = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.formats = ['dd/MM/yyyy', 'yyyy-MM-dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.popup = {
            abierto: false
        };

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        $scope.events =
            [
                {
                    date: tomorrow,
                    status: 'full'
                },
                {
                    date: afterTomorrow,
                    status: 'partially'
                }
            ];

        $scope.getDayClass = function(date, mode) {
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0,0,0,0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        };
    }
})();