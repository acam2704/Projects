<?php
header('Access-Control-Allow-Methods: OPTIONS, POST, GET');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

date_default_timezone_set("America/El_Salvador");
include('conexion_SQLAzure.php');

$json_data = file_get_contents('php://input', true);
$data = json_decode($json_data, true);

try{
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        if($conn === false){
            throw new Error('Conexión no conseguida');
        }
        if(!filter_var($data['email'], FILTER_VALIDATE_EMAIL)){
            throw new Error('Invalid email: ' . $data['email']);
        }

        $sql = 'SELECT TOP 1 1 FROM users WHERE email = ?';
        $params = [ &$data['email'] ];
        $sql_request = sqlsrv_prepare($conn, $sql, $params);

        if($sql_request && sqlsrv_execute($sql_request) !== false){
            $email_from_DB = sqlsrv_fetch_array($sql_request, SQLSRV_FETCH_ASSOC);
            if($email_from_DB){
                throw new Error('Email registered');
            } else{
                sqlsrv_free_stmt($sql_request);
                sqlsrv_close($conn);

                echo json_encode([
                    'status' => 'ok',
                    'error' => null,
                    'msg' => 'No email registered'
                ]);
            }
        } else{
            throw new Error(print_r(sqlsrv_errors(), true));
        }
    } else{
        throw new Error('No POST');
    }
} catch(Error $e){
    sqlsrv_free_stmt($sql_request);
    sqlsrv_close($conn);

    die(json_encode([
        'status' => 'failed',
        'error' => $e->getMessage(),
        'msg' => 'check "error"'
    ]));
}
?>