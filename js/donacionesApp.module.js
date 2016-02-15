/**
 * Módulo principal donacionesApp.
 * Dependencias: ngAnimate, ui.bootstrap, ngSanitize, mgcrea.ngStrap, smart-table, etc.
 * @author Roberto Sottini <robysottini@gmail.com>
 */
(function() {
    'use strict';

    angular
        .module('donacionesApp', [
            'ngAnimate', 
            'ui.bootstrap', 
            'ngSanitize', 
            'mgcrea.ngStrap', 
            'smart-table',
            'donacionesApp.datepickerPersonalizado',
            'donacionesApp.donantes',
            'donacionesApp.encabezado',
            'donacionesApp.formularioDonacion',
            'donacionesApp.formularioDonanteDonacion',
            'donacionesApp.modificarDonante',
            'donacionesApp.nuevoDonante'
        ]);
})();