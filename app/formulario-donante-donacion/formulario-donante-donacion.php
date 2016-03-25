<?php

include("../../librerias/CDatabase.php");
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

$oDB = new CDatabase();

switch($_REQUEST['action']) {
    case 'obtener-grupos-sanguineos':
        $sSQL = "
            SELECT 
                grupos_sanguineos.gru_id, 
                grupos_sanguineos.gru_nombre
            
            FROM 
                grupos_sanguineos
            
            ORDER BY 
                gru_id;
        ";

        // Creo una conexión.
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

    case 'obtener-frecuencias-de-donacion':
        $sSQL = "
            SELECT 
                frecuencias_donacion.fre_id, 
                frecuencias_donacion.fre_nombre || ' meses' AS fre_nombre 
            
            FROM 
                frecuencias_donacion 
            
            ORDER BY 
                fre_nombre;
        ";

        // Creo una conexión.
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

    case 'agregar-donante-donacion':
        echo ("String: ");
        $donanteDonacion = json_decode(file_get_contents("php://input"));
        //echo "$donanteDonacion->nombre";
        $valoresPersona = 
            "(" . 
            "'" . $donanteDonacion->per_nombre . "', " . 
            "'" . $donanteDonacion->per_apellido . "', " . 
            "'" . $donanteDonacion->per_dni . "', " . 
            "'" . $donanteDonacion->per_fecha_nacimiento . "', " . 
            "'" . $donanteDonacion->per_codigo_area . "', " . 
            "'" . $donanteDonacion->per_telefono . "', " . 
            "'" . $donanteDonacion->per_email . "', " . 
            "'" . $donanteDonacion->per_direccion . "', " . 
                  $donanteDonacion->per_gru_sanguineo . ", " . 
                  $donanteDonacion->per_frecuencia . ", " . 
            "'" . $donanteDonacion->per_nota . "'" . 
            ")"
        ;        
        
        $sSQLInsertPersonas = "
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
            
            VALUES " . $valoresPersona . "; "
        ;

        $valoresDonacion = 
            "(" . 
            "'" . $donanteDonacion->don_fecha . "', " . 
                  "currval('personas_per_id_seq')" .
            ")"
        ;
        
        $sSQLInsertDonaciones = "
            INSERT INTO donaciones (
                don_fecha, 
                don_persona) 
            
            VALUES " . $valoresDonacion . "; "
        ;

        $sSQL = $sSQLInsertPersonas . $sSQLInsertDonaciones;
        
        echo ("String: " . $sSQL);

        // Creo una conexión.
        $oDB->connect();        

        // Ejecutar la consulta SQL.
        $oDB->query($sSQL);

        // Desconectarse de la base de datos.
        $oDB->disconnect();

        // Guardar resultado de la consulta SQL en un arreglo.
        $arr = $oDB->resultToArray();
        print(json_encode($arr));
        break;
}

?>