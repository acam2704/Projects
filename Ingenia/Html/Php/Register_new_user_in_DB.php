<?php
header('Access-Control-Allow-Methods: OPTIONS, POST, GET');
header('Access-Control-Allow-Origin: https://ingenia-a6dkhcarh6e3b0ak.mexicocentral-01.azurewebsites.net/');
header('Access-Control-Allow-Headers: Content-Type');

date_default_timezone_set("America/El_Salvador");
$json = file_get_contents('php://input', true );
$data = json_decode($json, true);

include('conexion_to_user_DB.php');
$now = date("Y-m-d H:i:s", time());
$psw = $data['password'];
$h_psw = password_hash($psw, PASSWORD_DEFAULT);

$dui = $data['dui'];
$h_dui = password_hash($dui, PASSWORD_DEFAULT);

try{
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        if(!$conexion->error){
            die(json_encode([
                'status' => 'failed',
                'error' => $conexion->connect_error,
                'msg' => 'No hubo conexión'
            ]));
        };

        $sql_request = $conexion->prepare('INSERT INTO users (names, surnames, email, password, description, phonenumber, dui, rol, degrees, picture, birthdate, 
                                        created_at, updated_at, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
        $sql_request->bind_param('ssssssssssss', $data['names'], $data['lastnames'], $data['email'], $h_psw, $data['description'], $data['phonenumber'],
                        $h_dui, $data['rol'], $data['degrees'], $data['picture'], $data['birthdate'], $now, $now, 'active');

        if($sql_request->execute()){
            echo json_encode([
                'status' => 'ok',
                'error' => null, 
                'msg' => 'Registrado con éxito'
            ]);
        } else{
            echo json_encode([
                'status' => 'failed',
                'error' => $sql_request->error,
                'msg' => 'Hubo un error al ejecutar el registro'
            ]);
        }
    } else {
        echo json_encode([
            'status' => 'failed',
            'error' => 'POST',
            'msg' => 'El fetch no está enviando ningún POST'
        ]);
    }
} catch(Error $e){
    echo json_encode([
        'status' => 'failed',
        'error' => $_SERVER->error_get_last,
        'msg' => 'Hubo un error al correr el código'
    ]);
};
?>