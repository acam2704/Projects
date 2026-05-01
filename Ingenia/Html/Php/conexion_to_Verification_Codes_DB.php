<?php
$serverName = "ingenia.database.windows.net"; // update me
$connectionOptions = array(
    "Database" => "free-sql-db-7867305", // update me
    "Uid" => "ingenia_admin", // update me
    "PWD" => "1ngeniaAyuda4Albañiles" // update me
);

$conexion = sqlsrv_connect($serverName, $connectionOptions);
if ($conexion === false){
    die(json_encode([
        'status' => 'failed',
        'error' => print_r(sqlsrv_errors(), true),
        'msg' => 'No se logró la conexión'
    ]));
}
?>