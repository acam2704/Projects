<?php
header('Access-Control-Allow-Methods: OPTIONS, POST, GET');
header('Access-Control-Allow-Origin: https://ingenia-a6dkhcarh6e3b0ak.mexicocentral-01.azurewebsites.net');
header('Access-Control-Allow-Headers: Content-Type');

$json = file_get_contents('php://input', true);
$data = json_decode($json, true);

try{
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        $env = $data['env'] ?? null;
        if($env){ echo getenv($env); }
        else{ throw new Exception('Ingenia -failed'); }
    }
} catch(Exception $e){
    echo 'failed';
}
?>