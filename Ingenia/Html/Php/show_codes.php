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

echo '<pre>';
print_r($unique_result);
echo '<pre>';

echo 'CODE ---' . '<br>';
$code = $unique_result['code'];
echo $code . '<br>';

echo 'EMAIL ---' . '<br>';
$email = $unique_result['email'];
echo $email . '<br>';

echo 'PASSWORD_VERIFY ---' . '<br>';
echo $code . ' - ' . '746d22' . '<br>';
$password_verify = password_verify($code, '746d22');
echo '=' . $password_verify . '<br>';

echo 'SELECT TOP 1 * FROM verification_codes WHERE expires_at > $now ORDER BY created at DESC' . '<br>';
$now = date("Y-m-d H:i:s", time());
echo '$now = date("Y-m-d H:i:s", time())' . '<br>';
$sql_request = "SELECT TOP 1 * FROM verification_codes WHERE expires_at > ? ORDER BY created_at DESC";
echo 'SELECT TOP 1 * FROM verification_codes WHERE expires_at > ? ORDER BY created_at DESC' . '<br>';
$params = array($now);
echo '$params = array($now)' . '<br>';
$stmt = sqlsrv_query($conexion, $sql_request, $params);
echo '$stmt = sqlsrv_query($conexion, $sql_request, $params)' . '<br>';

$results_of_condition = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);
echo '$results_of_condition = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);' . '<br>';
echo 'results_of_condition["code"] = ' . $results_of_condition['code'];

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