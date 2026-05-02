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

$sql_request = "SELECT TOP 1 * FROM verification_codes ORDER BY created_at DESC";
$stmt = sqlsrv_query($conexion, $sql_request);
if($stmt === false){
    die(json_encode([
        'status' => 'fatal error',
        'error' => sqlsrv_errors(),
        'msg' => 'Muestra de códigos no conseguida'
    ]));
}
$unique_result = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);

while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
    echo "<pre>";
    print_r($row);
    echo "</pre>";
}

print_r($unique_result);
//if(password_verify($data['code'], $unique_result[0])){
//    echo json_encode([
//        'status' => 'ok',
//        'msg' => 'correo verificado',
//        'error' => null,
//    ]);
//} else{
//    echo json_encode([
//        'status' => 'failed',
//        'msg' => 'codigo incorrecto',
//        'error' => 'unique_result /= POST',
//    ]);
//};
sqlsrv_free_stmt($stmt);
sqlsrv_close($conexion);



?>