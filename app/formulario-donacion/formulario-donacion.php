<?php

include("../../librerias/CDatabase.php");
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

$oDB = new CDatabase();

switch($_REQUEST['action']) {
    case 'obtener-personas':
        $sSQL = "
            SELECT  
                personas.per_id, 
                personas.per_dni, 
                personas.per_nombre, 
                personas.per_apellido
            
            FROM 
                personas 
            
            ORDER BY 
                personas.per_dni
            ;
        ";
        //  Creo una conexión.
        $oDB->connect();

        // Ejecutar la consulta SQL.
        $oDB->query($sSQL);

        // Desconectarse de la base de datos.
        $oDB->disconnect();

        // Guardar resultado de la consulta SQL en un arreglo.
        $arr = $oDB->resultToArray();

        // Convierte un string a formato JSON.
        print(json_encode($arr));
        break;

    case 'agregar-donacion':
        $donacion = json_decode(file_get_contents("php://input"));
        //echo "$donacion->nombre";
        $valores = 
            "(" . 
            "'" . $donacion->don_fecha . "', " . 
                  $donacion->per_id .
            ")"
        ;
        
        $sSQL = "
            INSERT INTO donaciones (
                don_fecha, 
                don_persona) 
            
            VALUES " . $valores . ";"
        ;

        /*
        $stringPrueba = "abc";
        echo ("String: " . $sSQL);
        */

        // Creo una conexión.
        $oDB->connect();

        // Ejecuto la consulta.
        $oDB->query($sSQL);

        // Desconectarse de la base de datos.
        $oDB->disconnect();

        $arr = $oDB->resultToArray();
        print(json_encode($arr));
        break;

    case 'modificar-donacion':
    /*
        $donacion = json_decode(file_get_contents("php://input"));
        //echo "$donacion->nombre";
        $valores = 
            "(" . 
            "'" . $donacion->ano . "-" . $donacion->mes . "-" . $donacion->dia . "', " . 
                  $donacion->persona .
            ")"
        ;
        
        $sSQL = "
            INSERT INTO donaciones (
                don_fecha, 
                don_persona) 
            
            VALUES " . $valores . ";"
        ;

        // Creo una conexión.
        $oDB->connect();

        // Ejecuto la consulta.
        $oDB->query($sSQL);

        // Desconectarse de la base de datos.
        $oDB->disconnect();

        $arr = $oDB->resultToArray();
        print(json_encode($arr));
    */
        break;
}

?>