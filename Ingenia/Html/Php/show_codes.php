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

$sql_request = "SELECT ? FROM verification_codes";
$params = array('*');

$stmt = sqlsrv_query($conexion, $sql_request, $params);

if($stmt === false){
    echo json_encode([
        'status' => 'fatal error',
        'error' => sqlsrv_errors(),
        'msg' => 'Muestra de códigos no conseguida'
    ]);
} else {
    $results = sqlsrv_free_stmt($stmt);
    $unique_result = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);

    echo $unique_result[0];
    if(password_verify($data['code'], $unique_result[0])){
        echo json_encode([
            'status' => 'ok',
            'msg' => 'correo verificado',
            'error' => null,
        ]);
    } else{
        echo json_encode([
            'status' => 'failed',
            'msg' => 'código incorrecto',
            'error' => 'unique_result /= POST',
        ]);
    };
}


?>