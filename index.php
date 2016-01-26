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

        <!-- Mis controladores
        –––––––––––––––––––––––––––––––––––––––––––––––––– -->
        <script src="js/vendor/angular.js"></script>
        <script src="js/vendor/angular-animate.js"></script>
        <script src="js/main.js"></script>

        <!-- Librerías JS de terceras partes (siempre debajo de la librería de angular.js)
        –––––––––––––––––––––––––––––––––––––––––––––––––– -->
        <script src="js/vendor/ui-bootstrap-tpls.js"></script>
        <script src="js/vendor/angular-sanitize.min.js"></script>

        <!-- Código JavaScript de la librería AngularStrap -->
        <script src="js/vendor/angular-strap.js"></script>
        
        <!-- Plantillas en línea HTML por defecto usadas por las directivas de AngularStrap -->
        <script src="js/vendor/angular-strap.tpl.js"></script>

        <script src="js/vendor/angular-smart-table.min.js"></script>
        <script src="js/vendor/lodash.min.js"></script>
        <!-- Configuraciones de la tabla Smart Table. -->
        <script src="js/vendor/smart-table.js"></script>
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

        <!-- Directivas personalizadas
        –––––––––––––––––––––––––––––––––––––––––––––––––– -->
        <script src="encabezado/encabezado.js"></script>
        <script src="nuevo-donante/nuevo-donante.js"></script>
        <script src="modificar-donante/modificar-donante.js"></script>
        <script src="donantes/donantes.js"></script>
        <script src="formulario-donacion/formulario-donacion.js"></script>
        <script src="formulario-donante-donacion/formulario-donante-donacion.js"></script>
        <!-- Controlador datepicker-personalizado. -->
        <script src="datepicker-personalizado/datepicker-personalizado.js"></script>

        <!-- Plugins
        –––––––––––––––––––––––––––––––––––––––––––––––––– -->
        <script src="js/plugins.js"></script>

        <link rel="apple-touch-icon" href="apple-touch-icon.png">

        <!-- Estilos personalizados
        –––––––––––––––––––––––––––––––––––––––––––––––––– -->
        <link rel="stylesheet" href="css/main.css">
        <link rel="stylesheet" href="css/animaciones.css">
        <link rel="author" href="humans.txt" />

    </head>
    <body ng-controller="MainController" ng-cloak>
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