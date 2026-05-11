<?php
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Origin: https://ingenia-a6dkhcarh6e3b0ak.mexicocentral-01.azurewebsites.net/');
header('Access-Control-Allow-Headers: Content-Type');

include('conexion_learning_machine.php');

$json_data = file_get_contents('php://input');
$data = json_decode($jason_data, true);

if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $output = shell_exec("python3 script.py '" . $json . "'");
    echo json_encode([
        'status' => 'ok',
        'error' => null,
        'msg' => 'Python successfully ran', 
        'data' => $output
        ]);
} else {
    echo json_encode([
        'status' => 'failed',
        'error' => 'Invalid request method',
        'msg' => 'Only POST admitted',
        'data' => null
    ]);
}

?>