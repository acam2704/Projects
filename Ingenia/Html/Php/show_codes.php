<?php
date_default_timezone_set("America/El_Salvador");

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

echo 'SELECT TOP 1 * FROM verification_codes WHERE expires_at > ? ORDER BY created_at DESC' . '<br>';
$now = date("Y-m-d H:i:s", time());
echo $now;
echo print_r($now);
$sql_request = "SELECT TOP 1 * FROM verification_codes WHERE expires_at > ? ORDER BY created_at DESC";
$params = array($now);
$stmt2 = sqlsrv_query($conexion, $sql_request, $params);
echo $stmt2;
echo print_r($stmt2) . '<br>';

$result_unique = sqlsrv_fetch_array($stmt2, SQLSRV_FETCH_ASSOC);

echo ' --------- STMT2 --------- ' . '<br>';
echo 'LAST CODE --- ';
echo $stmt2['code'] . '<br>';
echo 'EXPIRES_AT --- ';
echo $stmt2['email'] . '<br>';
echo 'PASSWORD_VERIFY ---';
echo password_verify('f7a23e', $stmt2['code']) . '<br>';

echo ' --------- RESULT_UNIQUE --------- ' . '<br>';
echo 'LAST CODE --- ';
echo $result_unique['code'] . '<br>';
echo 'EMAIL --- ';
echo $result_unique['email'] . '<br>';
echo 'PASSWORD_VERIFY ---';
$right_password = password_verify('d0a17a', $result_unique['code']);
echo $right_password . '<br>';
if($right_password){
    echo json_encode([
        'status' => 'ok',
        'error' => null,
        'msg' => 'password passed',
    ]);
}


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