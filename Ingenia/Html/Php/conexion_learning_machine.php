<?php
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Origin: https://ingenia-a6dkhcarh6e3b0ak.mexicocentral-01.azurewebsites.net');
header('Access-Control-Allow-Headers: Content-Type');

$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);

if($_SERVER['REQUEST_METHOD'] === 'POST'){
    echo '1';
    $output = shell_exec("python3 python/learning_machine.py '" . json_encode($data) . "'");
    
    if(!$output){
        echo json_encode([
        'status' => 'ok',
        'error' => null,
        'msg' => 'Python successfully ran', 
        'data' => $output
        ]);
    }

} else {
    echo json_encode([
        'status' => 'failed',
        'error' => 'Invalid request method',
        'msg' => 'Only POST admitted',
        'data' => null
    ]);
}
?>