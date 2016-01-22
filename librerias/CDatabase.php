<?php

/**
* Clase para la conexión y ejecución de queys en la base de datos
*
* @author MJB
* @version 1.0
*
*/

class CDatabase  {
    var $conn;
    var $rs ;

    /**
    * Conexión a la base de datos
    */
    function connect() {
        $this->conn = pg_connect("dbname=donaciones host=localhost user=roby password=ubuntu")
        or die( "No se puede realizar la conexión con la base de datos. " . pg_last_error());
    }

    /**
     * Desconexión a la base de datos
     * @author MJB
     */
    function disconnect() {
        pg_close($this->conn);
    }

    /**
    * Retorna el número de registros del Recordset actual.
    * @author MJB
    * @param ingteger $iArr Indice del array del query
    * @return integer Número de registros
    */
    function numrecords($iArr = 0) {
        return pg_num_rows ($this->rs[$iArr]);
    }

    /**
    * Retorna el n�mero de Campos del Recordset Actual.
    * @author MJB
    * @param ingteger $iArr Indice del array del query
    * @return integer N�mero de registros
    */

    /**
    * Retorna el número de registros del Recordset actual.
    * @author MJB
    * @param string $sSQL Query a ejecutar
    * @param integer $iArr Indice del array del query
    */
    function query($sSQL, $iArr = 0) {
        $this->rs[$iArr] = pg_query($this->conn, $sSQL);
    //                or return 0 ;
    }

/* Función antigua cuando no se usaba JSON.
    function f($sRow, $sField, $iArr = 0) {
    //    print( $this->rs[$iArr]."-".$sRow."-".$sField);
        return pg_fetch_result($this->rs[$iArr], $sRow, $sField);
    }
*/
    function resultToArray($iArr = 0){
        $aRet = array();
        if ($this->numrecords($iArr) > 0) {
            while ($row = pg_fetch_assoc($this->rs[$iArr])) {
                $aRet[] = $row;
            }
        }
        return $aRet;
    }
}


?>