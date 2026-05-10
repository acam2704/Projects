<?php
header('Content-Type: application/json');

echo json_encode([
    'status' => 'ok',
    'client_id' => getenv('client_id')
]);
?>