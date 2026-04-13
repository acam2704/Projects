<?php

$conexion = new mysqli("localhost", "root", "", "ingenia");

if($conexion->connect_error){
    echo json_encode([
        'error' => $e,
        'status' => 'die',
        'msg' => 'error en conexión',
    ]);
}
?>
