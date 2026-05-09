<?php
$serverName = "ingenia.database.windows.net";
$password = getenv('1ngeniaAyuda4Albañiles');
$db = getenv('free-sql-db-7867305');

$connectionOptions = array(
    "Database" => $db,
    "Uid" => "ingenia_admin",
    "PWD" => $password
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