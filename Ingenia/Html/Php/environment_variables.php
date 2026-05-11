<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://ingenia-a6dkhcarh6e3b0ak.mexicocentral-01.azurewebsites.net/');

echo json_encode([
    'client_id' => getenv('client_id')
]);
?>