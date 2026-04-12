<?php

$conexion = new msqli("localhost", "root", "", "ingenia");

if($conexion->connect_error){
    die("Error: " . $conexion->connect_error);
}

?>