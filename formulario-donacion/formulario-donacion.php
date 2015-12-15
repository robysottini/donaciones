<?php

include("../librerias/CDatabase.php");
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

$oDB = new CDatabase();

switch($_REQUEST['action']) {
    case 'obtenerGruposSanguineos':
        $oDB->connect();
        $sSQL = "
            SELECT 
                grupos_sanguineos.gru_id, 
                grupos_sanguineos.gru_nombre
            FROM grupos_sanguineos
            ORDER BY gru_id;
            ";
        // Ejecutar la consulta SQL.
        $oDB->query($sSQL);
        // Desconectarse de la base de datos.
        $oDB->disconnect();
        // Guardar resultado de la consulta SQL en un arreglo.
        $arr = $oDB->resultToArray();
        // Convierte un string a formato JSON.
        print(json_encode($arr));
        break;

    case 'obtenerFrecuenciasDeDonacion':
        $oDB->connect();
        $sSQL = "
            SELECT 
                frecuencias_donacion.fre_id, 
                frecuencias_donacion.fre_nombre || ' meses' AS fre_nombre 
            FROM frecuencias_donacion 
            ORDER BY fre_nombre;
            ";
        // Ejecutar la consulta SQL.
        $oDB->query($sSQL);
        // Desconectarse de la base de datos.
        $oDB->disconnect();
        // Guardar resultado de la consulta SQL en un arreglo.
        $arr = $oDB->resultToArray();
        // Convierte un string a formato JSON.
        print(json_encode($arr));
        break;

    case 'agregarPersona':        
        $persona = json_decode(file_get_contents("php://input"));
        //echo "$persona->nombre";
        $valores = 
            "(" . 
            "'" . $persona->nombre . "', " . 
            "'" . $persona->apellido . "', " . 
            "'" . $persona->dni . "', " . 
            "'" . $persona->ano . "-" . $persona->mes . "-" . $persona->dia . "', " . 
            "'" . $persona->codigoDeArea . "', " . 
            "'" . $persona->telefono . "', " . 
            "'" . $persona->email . "', " . 
            "'" . $persona->direccion . "', " . 
                  $persona->grupoSanguineo . ", " . 
                  $persona->frecuenciaDeDonacion . ", " . 
            "'" . $persona->nota . "'" . 
            ")"
        ;        
        
        $oDB->connect();
        
        $sSQL = "
            INSERT INTO personas (
                per_nombre, 
                per_apellido, 
                per_dni, 
                per_fecha_nacimiento, 
                per_codigo_area, 
                per_telefono, 
                per_email, 
                per_direccion, 
                per_gru_sanguineo, 
                per_frecuencia, 
                per_nota) 
            VALUES " . $valores . ";"
        ;

        $stringPrueba = "abc";
        echo ("String: " . $sSQL);

        $oDB->query($sSQL);
        $arr = $oDB->resultToArray();
        print(json_encode($arr));
        break;
}

?>