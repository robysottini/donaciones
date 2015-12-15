<?php

/**
 * Clase para la conexi�n y ejecuci�n de queys en la base de datos
 *
 * @author MJB
 * @version 1.0
 *
 */


if (!function_exists('json_decode')) {
    function json_decode($content, $assoc=false) {
        require_once 'classes/json/JSON.php';
        if ($assoc) {
            $json = new Services_JSON(SERVICES_JSON_LOOSE_TYPE);
        }
        else {
            $json = new Services_JSON;
        }
        return $json->decode($content);
    }
}

if (!function_exists('json_encode')) {
    function json_encode($content) {
        require_once 'classes/json/JSON.php';
        $json = new Services_JSON;
        return $json->encode($content);
    }
}


if( !defined("__CLASS_DATABASE__") )
{
	define("__CLASS_DATABASE__",true);
	define('FPDF_FONTPATH','font/');
	include('classes/pdftable.inc.php');
//	include('classes/html2fpdf.php');

	class CDatabase extends PDFTable  {
		var $conn;
		var $rs ;

		/**
		 * Conexi�n a la base de datos
		 */
		function connect()
		{
                        $this->conn = pg_connect("dbname=haberes host=192.168.0.105 user=dpossdba password=dposs2015")
                                or die( "No se puede realizar la conexion con la base de datos" );
		}

		/**
		 * Retorna el n�mero de registros del Recordset actual.
		 * @author MJB
		 * @param ingteger $iArr Indice del array del query
		 * @return integer N�mero de registros
		 */
		function numrecords($iArr = 0){ return pg_num_rows( $this->rs[$iArr] ); }

		/**
		 * Retorna el n�mero de Campos del Recordset Actual.
		 * @author MJB
		 * @param ingteger $iArr Indice del array del query
		 * @return integer N�mero de registros
		*/
		function numfields($iArr = 0){ return pg_num_fields( $this->rs[$iArr] ); }

		/**
		 * Retorna el nombre del campo.
		 * @author MJB
		 * @param integer $iFld ID o N�mero de campo.
		 * @param integer $iArr Indice del array del query
		 * @return string Nombre del campo
		*/
		function namef( $iFld ,$iArr = 0){ return pg_field_name( $this->rs[$iArr] , $iFld ); }

		/**
		 * Retorna el n�mero de registros del Recordset actual.
		 * @author MJB
		 * @param string $sSQL Query a ejecutar
		 * @param integer $iArr Indice del array del query
		 */
		function query( $sSQL, $iArr = 0 )
		{
			$this->rs[$iArr] = pg_query($this->conn, $sSQL);
//				or return 0 ;
		}

		/**
		 * Desconexion a la base de datos
		 * @author MJB
		 */
		function disconnect() { pg_close($this->conn); }

		/**
		 * Retorna el valor de un campo del recordset actual.
		 * @author MJB
		 * @param mixed $sRow indice del record a consultar
		 * @param mixed $sField indice del campo a consultar
		 * @param integer $iArr Indice del array del query
		 * @return boolean tru or false
		 */
		function f( $sRow, $sField, $iArr = 0)
		{
//			print( $this->rs[$iArr]."-".$sRow."-".$sField);
			return pg_fetch_result( $this->rs[$iArr], $sRow, $sField);
		}

		/**
		 * Simula el COPY command del Postgresql
		 * @author MJB
		 * @param string $sTable Table a la que se le va a hacer el COPY
		 * @param array $aData Array de valores.
		 * @return boolean true or false
		 */
		function copyData($sTable,$aData)
		{
			return pg_copy_from($this->conn,$sTable,$aData);
		}

		/**
		 * Devuelve la cantidad de registros afectados a un query
		 * @author MJB
		 * @param integer $iArr Indice del array de query
		 * @return integer Cantidad de rows
		 */
		function affectedrows($iArr = 0){ return pg_affected_rows($this->rs[$iArr]); }


		/**
		 * Inserta en el debug sin conectarse
		 * @author MJB
		 * @param string $sTxt Texto a insertar
		 */
		function debug($sTxt, $iArr = 0)
		{
			$sTxt = str_replace("'","\'",$sTxt);
			$this->query("INSERT INTO wsdebug VALUES (now(), '".$sTxt."') ", $iArr);
		}

		/**
		 * Inserta en el debug sin conectarse
		 * @author MJB
		 * @param string $sTxt Texto a insertar
		 */
		function cdebug($sTxt)
		{
			$this->connect();
			$sTxt = str_replace("'","\'",$sTxt);
			$this->query("INSERT INTO wsdebug VALUES (now(), '".$sTxt."') ");
			$this->disconnect();
		}

		function getOID($id,$id0 = "")
		{
			date_default_timezone_set("America/Argentina/Buenos_Aires");
			return "G".date('Ymd').time().$id.$id0;
		}

		function meta_data($sTable){
			$meta =  pg_meta_data($this->conn, $sTable);
			if( is_array($meta) ){
				return $meta;
			}
			else{
				return "0";
			}
		}

		function resultToArray($iArr = 0){
			$aRet = array();
			if($this->numrecords($iArr) > 0){
				while($row = pg_fetch_assoc($this->rs[$iArr])) {
					$aRet[] = $row;
				}
			}
			return $aRet;
		}

		function metadata($table="",$iArr = 0) {
			$count = 0;
			$id    = 0;
			$res   = array();
			
			if ($table) {
				$this->connect();
				$id = pg_exec($this->conn, "select * from $table");
				if ($id < 0) {
					$this->Error = pg_ErrorMessage($id);
					$this->Errno = 1;
					$this->halt("Metadata query failed.");
				}
			} else {
				$id = $this->rs[$iArr];
				if (!$id) {
					$this->halt("No query specified.");
				}
			}
			
			$count = pg_NumFields($id);
			for ($i=0; $i<$count; $i++) {
				$res['fields'][$i]["name"]  = pg_FieldName  ($id, $i);
				$res['fields'][$i]["type"]  = pg_FieldType  ($id, $i);
				$res['fields'][$i]["pkey"]   = "0";
			}
			$this->query("select a.attname,	t.typname, case when a.attlen = -1 then 0 "
				."else a.attlen end + case when a.atttypmod = -1 then 0 "
				."else (a.atttypmod - 4) end ,"
				."case when d.description isnull THEN a.attname else d.description end , "
				."a.attnum from pg_class c "
				."inner join pg_attribute a ON (c.oid = a.attrelid AND a.attnum > 0) "
				."INNER JOIN pg_type t ON (a.atttypid = t.oid) "
				."LEFT OUTER JOIN pg_description d ON (c.relfilenode = d.objoid AND a.attnum = d.objsubid) "
				."where c.relname = '".$table."' order by a.attnum");
			for($i = 0; $i < $this->numrecords(); $i++ ){
				$res['fields'][$i]["size"]  = $this->f($i,2);
				$res['fields'][$i]["desc"]  = $this->f($i,3);
			}
;
			$j = 0;
			for ($i=0; $i<$count; $i++) {
				$this->query("SELECT relname, indkey[".$i."] "
					."FROM pg_catalog.pg_index join pg_catalog.pg_class "
    					."ON pg_index.indrelid = pg_class.oid "
					."WHERE indisprimary=true "
					."AND relname = '".$table."';",1);
				if( $this->f(0,1,1) != "0" ) {
					$res['fields'][ ($this->f(0,1,1)-1) ]["pkey"]   = "1";
					$res['pkey'][$j++] = pg_FieldName  ($id, $this->f(0,1,1)-1);;
				}
			}

			if ($table) {
				pg_FreeResult($id);
			}
			$this->query(' SELECT cl.relname AS table_name, a.attname AS column_name, '
				.'clf.relname AS foreign_table_name, af.attname AS foreign_column_name '
   				.'FROM pg_attribute a '
   				.'JOIN pg_class cl ON a.attrelid = cl.oid AND cl.relkind = \'r\'::"char" '
   				.'JOIN pg_namespace n ON n.oid = cl.relnamespace '
   				.'JOIN pg_constraint ct ON a.attrelid = ct.conrelid AND ct.confrelid <> 0::oid '
				.'AND ct.conkey[1] = a.attnum '
   				.'JOIN pg_class clf ON ct.confrelid = clf.oid AND clf.relkind = \'r\'::"char" '
   				.'JOIN pg_namespace nf ON nf.oid = clf.relnamespace '
   				.'JOIN pg_attribute af ON af.attrelid = ct.confrelid AND af.attnum = ct.confkey[1] '
				.'WHERE cl.relname = \''.$table.'\';');
			for( $i = 0 ; $i < $this->numrecords() ; $i++ ){
				$res['foreign'][$i]["idcol"]  = $this->f($i,'column_name');
				$res['foreign'][$i]["foretable"]  = $this->f($i,'foreign_table_name');
				$res['foreign'][$i]["forecol"]   = $this->f($i,'foreign_column_name');
			}
			$this->disconnect();
			return $res;
		}

	}

}
