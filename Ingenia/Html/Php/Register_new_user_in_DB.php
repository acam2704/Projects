<?php
header('Access-Control-Allow-Methods: OPTIONS, POST, GET');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');

date_default_timezone_set("America/El_Salvador");
$json = file_get_contents('php://input', true );
$data = json_decode($json, true);

include('conexion_to_user_DB.php');
$now = date("Y-m-d H:i:s", time());
$psw = $_POST['password'];
$h_psw = password_hash($psw, PASSWORD_DEFAULT);

try{
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        if(!$conexion->error){
            die(json_encode([
                'status' => 'failed',
                'error' => $conexion->connect_error,
                'msg' => 'No hubo conexión'
            ]));
        };

        $sql_request = $conexion->prepare('INSERT INTO users (username, names, lastnames, email, picture, degrees, 
                                        description, password, status, last_login, created_at, updated_at) 
                                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
        
        $sql_request->bind_param('ssssssssssss', $_POST['username'], $_POST['names'], $_POST['lastnames'], $_POST['email'], 
                        $_POST['picture'], '', '', $h_psw, "active", $now, $now, $now);

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
        };
    } else {
        echo json_encode([
            'status' => 'failed',
            'error' => 'POST',
            'msg' => 'El fetch no está enviando ningún POST'
        ]);
    };
} catch(Error $e){
    echo json_encode([
        'status' => 'failed',
        'error' => $_SERVER->error_get_last,
        'msg' => 'Hubo un error al correr el código'
    ]);
};
?>