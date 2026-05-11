<?php
header('Access-Control-Allow-Methods: OPTIONS, GET, POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Origin: https://ingenia-a6dkhcarh6e3b0ak.mexicocentral-01.azurewebsites.net/');

$json = file_get_contents('php://input');
$data = json_decode($json, true);

include('conexion_to_user.php');

if($_SERVER['REQUEST_METHOD'] === 'POST'){
    if($conexion->error){
        die(json_encode([
            'status' => 'failed',
            'error' => $conexion->error,
            'msg' => 'Hubo un error de conexión'
        ]));
    }
    $sql_request = $conexion->prepare('SELECT ? FROM users');
    $sql_request->bind_param('s', 'username');
    $sql_request->execute();
    
    $usernames = $sql_request->get_results();
    if($usernames){  
        while ($u = $usernames->fetch_assoc()){
            if($u === $data['username']){
                die(json_encode([
                    'status' => 'failed',
                    'error' => null,
                    'msg' => 'Nombre de usuario existente'
                ]));
            };
        };
        echo(json_encode([
            'status' => 'ok',
            'error' => null, 
            'msg' => 'Nombre de usuario validado',
            'username' => $data['username']
        ]));
    };
} else{
    echo json_encode([
        'status' => 'failed',
        'error' => $_SERVER['REQUEST_METHOD'],
        'msg' => 'POST requerido'
    ]);
};
?>