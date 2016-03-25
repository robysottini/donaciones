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
            'ui.router', 
            'ngSanitize', 
            'mgcrea.ngStrap', 
            'smart-table',
            'donacionesApp.donantes',
            'donacionesApp.formularioDonacion',
            'donacionesApp.formularioDonanteDonacion',
            'donacionesApp.modificarDonante',
            'donacionesApp.nuevoDonante',
            'donacionesApp.pestanas'
        ]);
})();