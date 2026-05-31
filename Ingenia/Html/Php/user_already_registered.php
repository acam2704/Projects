<?php
header('Access-Control-Allow-Methods: OPTIONS, POST, GET');
header('Access-Control-Allow-Origin: https://ingenia-a6dkhcarh6e3b0ak.mexicocentral-01.azurewebsites.net');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

date_default_timezone_set("America/El_Salvador");
include('conexion_SQLAzure.php');

$json_data = file_get_contents('php://input', true);
$data = json_decode($json_data, true);

try{
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        if($conn === false){
            throw new Exception('Conexión no conseguida');
        }
        if(!filter_var($data['email'], FILTER_VALIDATE_EMAIL)){
            $email = $data['email'] ?? null;
            throw new Exception("Invalid email:  $email");
        }
        echo json_encode(['number' => '3', 'status' => 'failed']);

        /* VERIFICAR QUE EL EMAIL NO SE HAYA REGISTRADO */
        $sql = 'SELECT TOP 1 1 FROM users WHERE email = ?';
        $params = [ &$data['email'] ];
        $sql_request = sqlsrv_prepare($conn, $sql, $params);

        if($sql_request && sqlsrv_execute($sql_request) !== false){
            $email_from_DB = sqlsrv_fetch_array($sql_request, SQLSRV_FETCH_ASSOC);
            if($email_from_DB){ throw new Exception('Email registered'); }
        } else{ throw new Exception(print_r(sqlsrv_errors(), true)); }
        echo json_encode(['number' => '4', 'status' => 'failed']);

        /* VERIFICAR QUE EL NÚMERO DE CONTACTO NO SE HAYA REGISTRADO */
        $sql = 'SELECT TOP 1 1 FROM users WHERE phonenumber = ?';
        $params = [ &$data['phonenumber'] ];
        $sql_request = sqlsrv_prepare($conn, $sql, $params);

        if($sql_request && sqlsrv_execute($sql_request) !== false){
            $phonenumber_from_DB = sqlsrv_fetch_array($sql_request, SQLSRV_FETCH_ASSOC);
            if($phonenumber_from_DB){ throw new Exception('Phonenumber registered'); }
        } else{ throw new Exception(print_r(sqlsrv_errors(), true)); }
        echo json_encode(['number' => '5', 'status' => 'failed']);

        /* VERIFICAR QUE EL DUI NO SE HAYA REGISTRADO */
        $sql = 'SELECT TOP 1 1 FROM users WHERE dui = ?';
        $params = [ &$data['dui'] ];
        $sql_request = sqlsrv_prepare($conn, $sql, $params);

        if($sql_request && sqlsrv_execute($sql_request) !== false){
            $dui_from_DB = sqlsrv_fetch_array($sql_request, SQLSRV_FETCH_ASSOC);
            if($dui_from_DB){ throw new Exception('DUI registered'); } 
            else{
                sqlsrv_free_stmt($sql_request);
                sqlsrv_close($conn);

                echo json_encode([
                    'status' => 'ok',
                    'error' => null,
                    'msg' => 'No dui, email and phonenumber registered',
                    'user' => $data
                ]);
            }
        } else{ throw new Exception(print_r(sqlsrv_errors(), true)); }

    } else{ throw new Exception('No POST'); }
} catch(Exception $e){
    sqlsrv_free_stmt($sql_request);
    sqlsrv_close($conn);

    echo json_encode(['number' => '7', 'status' => 'failed']);
    die(json_encode([
        'status' => 'failed',
        'error' => $e->getMessage(),
        'msg' => 'check "error"',
    ]));
}
?>