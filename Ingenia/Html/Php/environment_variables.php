<?php
header('Content-Type: application/json');

echo json_encode([
    'client_id' => getenv('client_id')
]);
?>