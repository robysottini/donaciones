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
                personas.per_apellido,
                personas.per_fecha_nacimiento,
                personas.per_codigo_area,
                personas.per_telefono,
                personas.per_email,
                personas.per_direccion,
                personas.per_nota, 
                grupos_sanguineos.gru_id AS per_gru_sanguineo, 
                frecuencias_donacion.fre_id AS per_frecuencia
            
            FROM 
                personas 
            
            LEFT JOIN 
                grupos_sanguineos 
            ON (personas.per_gru_sanguineo = grupos_sanguineos.gru_id) 
            
            LEFT JOIN 
                frecuencias_donacion 
            ON (personas.per_frecuencia = frecuencias_donacion.fre_id);
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

    case 'modificar-persona':
        $persona = json_decode(file_get_contents("php://input"));

        $per_id                 = $persona->per_id;
        $per_nombre             = $persona->per_nombre;
        $per_apellido           = $persona->per_apellido;
        $per_dni                = $persona->per_dni;
        $per_fecha_nacimiento   = $persona->per_fecha_nacimiento; //TODO: Convertir fecha a "Y-m-d". Si cambia el el formato que devuelve el datepicker, acá dará error.
        $per_codigo_area        = $persona->per_codigo_area;
        $per_telefono           = $persona->per_telefono;
        $per_email              = $persona->per_email;
        $per_direccion          = $persona->per_direccion; 
        $per_gru_sanguineo      = $persona->per_gru_sanguineo;
        $per_frecuencia         = $persona->per_frecuencia;
        $per_nota               = $persona->per_nota;
        
        $sSQL = "
            UPDATE 
                personas 
            
            SET 
                per_nombre = '" . $per_nombre . "',
                per_apellido = '" . $per_apellido . "',
                per_dni = '" . $per_dni . "',
                per_fecha_nacimiento = '" . $per_fecha_nacimiento . "',
                per_codigo_area = '" . $per_codigo_area . "',
                per_telefono = '" . $per_telefono . "',
                per_email = '" . $per_email . "',
                per_direccion = '" . $per_direccion . "',
                per_gru_sanguineo = '" . $per_gru_sanguineo . "',
                per_frecuencia = '" . $per_frecuencia . "',
                per_nota = '" . $per_nota . "'
            
            WHERE 
                per_id =  '" . $per_id . "'
            ;"
        ;

        $stringPrueba = "abc";
        echo ("String: " . $sSQL);

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
}

?>