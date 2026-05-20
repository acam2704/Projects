<?php
header('Access-Control-Allow-Methods: OPTIONS, POST, GET');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');

date_default_timezone_set("America/El_Salvador");
$json = file_get_contents('php://input', true );
$data = json_decode($json, true);

include('conexion_SQLAzure.php');
$now = date("Y-m-d H:i:s", time());
$psw = $data['password'];
$h_psw = password_hash($psw, PASSWORD_DEFAULT);

$dui = $data['dui'];
$h_dui = password_hash($dui, PASSWORD_DEFAULT);

try{
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        if($conn === false){
            throw new Error('Conexión no lograda');
        };

        $sql = 'INSERT INTO users (
            names, 
            surnames, 
            email, 
            password, 
            description, 
            phonenumber, 
            dui, 
            rol, 
            degrees, 
            picture, 
            birthdate, 
            created_at, 
            updated_at, 
            status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

        $status = 'active';
        $degress = json_encode($data['degrees'], true);
        $params = [
            &$data['name'], 
            &$data['lastname'], 
            &$data['email'], 
            &$h_psw, 
            &$data['description'], 
            &$data['phonenumber'],
            &$h_dui, 
            &$data['rol'], 
            &$degrees, 
            &$data['picture'], 
            &$data['birthdate'], 
            &$now, 
            &$now, 
            &$status
        ];

        $sql_request = sqlsrv_prepare($conn, $sql, $params);

        if($sql_request && sqlsrv_execute($sql_request) !== false){
            echo json_encode([
                'status' => 'ok',
                'error' => null, 
                'msg' => 'Registrado con éxito'
            ]);

            sqlsrv_free_stmt($sql_request);
            sqlsrv_close($conn);
            
        } else{
            throw new Error(print_r(sqlsrv_errors(), true));
        }
    } else {
        throw new Error('Inválid Request');
    }
} catch(Error $e){
    sqlsrv_free_stmt($sql_request);
    sqlsrv_close($conn);

    die(json_encode([
        'status' => 'failed',
        'error' => $e->getMessage(),
        'msg' => 'Ocurrió un error'
    ]));
};
?>