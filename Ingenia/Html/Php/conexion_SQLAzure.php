<?php
$serverName = getenv('DBServer_name');
$DataBase_password = getenv('DataBase_password');
$DataBase_name = getenv('DataBase');
$Uid = getenv('DBServer_UsernameId');
$connectionOptions = array(
    "Database" => $DataBase_name,
    "Uid" => $Uid,
    "PWD" => $DataBase_password
);

$conn = sqlsrv_connect($serverName, $connectionOptions);
if ($conn === false){
    die(json_encode([
        'status' => 'failed',
        'error' => print_r(sqlsrv_errors(), true),
        'msg' => 'No se logró la conexión'
    ]));
}
?>