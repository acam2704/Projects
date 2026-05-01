<?php

$conexion = new mysqli('localhost', 'root', '', 'ingenia');

if ($conexion->connect_error){
    die(json_encode([
        'status' => 'failed on conexion',
        'error' => $conexion->connect_error,
        'msg' => 'Hubo un error de conexión',
    ]));
} 

?>