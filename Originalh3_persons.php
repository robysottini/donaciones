<?php

include('classes/CDatabase.php');

$odb = new CDatabase();

switch($_REQUEST['action']) {
    case 'getAllActivePersons':
        $odb->connect();
        $odb->query("SELECT * 
            FROM persons WHERE statusper = 0 
            AND  (idper LIKE '%".$_REQUEST['word']."%' 
            OR UPPER(nameper) LIKE UPPER('%".$_REQUEST['word']."%') 
            OR numdocper LIKE '%".$_REQUEST['word']."%')
            ");
        $arr = $odb->resultToArray();
        $odb->disconnect();
        print(json_encode($arr));
        break;
}

?>