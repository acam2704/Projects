<?php
$serverName = getenv('DBServer_name');
$password = getenv('DataBase_password');
$db = getenv('DataBase');

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