<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" lang=""> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="es-AR" ng-app="donacionesApp"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <!-- Indica que se use el motor de renderizado más nuevo que tenga el cliente instalado --> 
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Donaciones</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- AngularJS
        –––––––––––––––––––––––––––––––––––––––––––––––––– -->        
        <script src="scripts/angular.js"></script>
        <script src="scripts/angular-animate.js"></script>

        <!-- Librerías JS de terceras partes (siempre debajo de la librería de angular.js)
        –––––––––––––––––––––––––––––––––––––––––––––––––– -->
        <script src="scripts/ui-bootstrap-tpls.js"></script>

        <!-- Requerido por algunos módulos de AngularStrap -->
        <script src="scripts/angular-sanitize.js"></script>
        <!-- Código JavaScript de la librería AngularStrap -->
        <script src="scripts/angular-strap.js"></script>        
        <!-- Plantillas en línea HTML por defecto usadas por las directivas de AngularStrap -->
        <script src="scripts/angular-strap.tpl.js"></script>

        <script src="scripts/angular-smart-table.min.js"></script>
        <script src="scripts/lodash.min.js"></script>
        <!-- Configuraciones de la tabla Smart Table. -->
        <script src="scripts/smart-table.js"></script>
        <!-- Dos librerías para <select> de Angular Strap. -->
        <link rel="stylesheet" href="css/libs.min.css">
        <link rel="stylesheet" href="css/docs.min.css">

        <!-- Librerías CSS de terceras partes
        –––––––––––––––––––––––––––––––––––––––––––––––––– -->
        <!-- Angular Motion: Animaciones CSS3. -->
        <link rel="stylesheet" href="css/angular-motion.min.css">
        <!-- Bootstrap: Framework HTML, CSS y JS para desarrollo responsivo. -->
        <link rel="stylesheet" href="css/bootstrap.css">
        <!-- Normalize: Alternativa HTML5 a los resets de CSS. -->
        <link rel="stylesheet" href="css/normalize.css">

        <!-- donacionesApp (Proceso de bootstrapping)
        –––––––––––––––––––––––––––––––––––––––––––––––––– -->
        <script src="app/donacionesApp.module.js"></script>

        <!-- datepicker-personalizado
        –––––––––––––––––––––––––––––––––––––––––––––––––– -->
        <script src="app/datepicker-personalizado/datepicker-personalizado.module.js"></script>
        <script src="app/datepicker-personalizado/datepicker-personalizado.controller.js"></script>
        <script src="app/datepicker-personalizado/datepicker-personalizado.directive.js"></script>

        <!-- donantes
        –––––––––––––––––––––––––––––––––––––––––––––––––– -->
        <script src="app/donantes/donantes.module.js"></script>
        <script src="app/donantes/donantes.controller.js"></script>
        <script src="app/donantes/donantes.directive.js"></script>

        <!-- encabezado
        –––––––––––––––––––––––––––––––––––––––––––––––––– -->
        <script src="app/encabezado/encabezado.module.js"></script>
        <script src="app/encabezado/encabezado.directive.js"></script>

        <!-- encabezado
        –––––––––––––––––––––––––––––––––––––––––––––––––– -->
        <script src="app/formulario-donacion/formulario-donacion.module.js"></script>
        <script src="app/formulario-donacion/formulario-donacion.controller.js"></script>
        <script src="app/formulario-donacion/formulario-donacion.directive.js"></script>

        <!-- formulario-donante
        –––––––––––––––––––––––––––––––––––––––––––––––––– -->
        <script src="app/formulario-donante-donacion/formulario-donante-donacion.module.js"></script>
        <script src="app/formulario-donante-donacion/formulario-donante-donacion.controller.js"></script>
        <script src="app/formulario-donante-donacion/formulario-donante-donacion.directive.js"></script>

        <!-- modificar-donante
        –––––––––––––––––––––––––––––––––––––––––––––––––– -->
        <script src="app/modificar-donante/modificar-donante.module.js"></script>
        <script src="app/modificar-donante/modificar-donante.controller.js"></script>
        <script src="app/modificar-donante/modificar-donante.directive.js"></script>

        <!-- nuevo-donante
        –––––––––––––––––––––––––––––––––––––––––––––––––– -->
        <script src="app/nuevo-donante/nuevo-donante.module.js"></script>
        <script src="app/nuevo-donante/nuevo-donante.controller.js"></script>
        <script src="app/nuevo-donante/nuevo-donante.directive.js"></script>

        <!-- Estilos personalizados
        –––––––––––––––––––––––––––––––––––––––––––––––––– -->
        <link rel="stylesheet" href="css/main.css">
        <link rel="stylesheet" href="css/animaciones.css">
        <link rel="author" href="humans.txt" />

        <!-- Ícono
        –––––––––––––––––––––––––––––––––––––––––––––––––– -->
        <link rel="apple-touch-icon" href="apple-touch-icon.png">

    </head>
    <body ng-cloak>
        <!--[if lt IE 8]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
        
        <!-- Add your site or application content here -->
       
        <main>
            <div class="container">
                <!-- Encabezado con el título y nombres de las agencias -->
                <encabezado></encabezado>
                <uib-tabset>
                    <uib-tab heading="Nuevo donante">
                        <nuevo-donante></nuevo-donante>
                    </uib-tab>
                    <uib-tab heading="Modificar donante">
                        <modificar-donante></modificar-donante>
                    </uib-tab>
                    <uib-tab heading="Donantes">
                        <donantes></donantes>
                    </uib-tab>
                    <uib-tab heading="Nueva donación">
                        <formulario-donacion></formulario-donacion>
                    </uib-tab>
                    <uib-tab heading="Nuevo donante con donación">
                        <formulario-donante-donacion></formulario-donante-donacion>
                    </uib-tab>
                </uib-tabset>
            </div>
        </main>
    </body>
</html>