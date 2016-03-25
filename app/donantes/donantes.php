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
                personas.per_nota, 
                personas.per_email, 
                personas.per_codigo_area || ' ' || per_telefono AS per_telefono, 
                personas.per_direccion, 
                grupos_sanguineos.gru_id, 
                grupos_sanguineos.gru_nombre AS gru_nombre, 
                frecuencias_donacion.fre_id, 
                frecuencias_donacion.fre_nombre  || ' meses' AS fre_nombre, 
                donaciones2.don_ultima, 
                donaciones2.don_ultima + frecuencias_donacion.fre_nombre * 30 AS proxima_donacion 
            
            FROM 
                personas 
            
            LEFT JOIN 
                grupos_sanguineos 
            ON (personas.per_gru_sanguineo = grupos_sanguineos.gru_id) 
            
            LEFT JOIN 
                frecuencias_donacion 
            ON (personas.per_frecuencia = frecuencias_donacion.fre_id) 
            
            LEFT JOIN ( 
                SELECT 
                    personas.per_id, 
                    donaciones1.don_ultima 
                
                FROM 
                    personas 
                
                LEFT JOIN ( 
                    SELECT 
                        donaciones.don_persona, 
                        max(donaciones.don_fecha) AS don_ultima 
                    
                    FROM 
                        donaciones 
                    
                    GROUP BY 
                        donaciones.don_persona 
                ) AS donaciones1 
                ON (personas.per_id = donaciones1.don_persona) 
            ) AS donaciones2 
            ON (personas.per_id = donaciones2.per_id) 
            
            ORDER BY 
                donaciones2.don_ultima + frecuencias_donacion.fre_nombre * 30 DESC;
        ";
        /*
            "
            SELECT 
                row_number() OVER(ORDER BY per_apellido) AS numero_fila,
                personas.per_id, 
                personas.per_dni, 
                personas.per_nombre, 
                personas.per_apellido, 
                personas.per_fecha_nacimiento, 
                personas.per_nota, 
                personas.per_email, 
                personas.per_codigo_area || ' ' || per_telefono AS per_telefono, 
                personas.per_direccion, 
                grupos_sanguineos.gru_id, 
                grupos_sanguineos.gru_nombre AS gru_nombre, 
                frecuencias_donacion.fre_id, 
                frecuencias_donacion.fre_nombre  || ' meses' AS fre_nombre 
            FROM personas
            LEFT JOIN grupos_sanguineos ON (personas.per_gru_sanguineo = grupos_sanguineos.gru_id)
            LEFT JOIN frecuencias_donacion ON (personas.per_frecuencia = frecuencias_donacion.fre_id);
            ";
        */

        /*
        select don_persona, max(don_fecha), max(don_fecha) + 60 AS proxima
        from donaciones
        group by don_persona;
        */

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