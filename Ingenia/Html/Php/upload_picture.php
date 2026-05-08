<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: OPTIONS, POST, GET');

if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $picture = $_FILES['imagen'];
    echo $archivo['name'];
    $extension = pathinfo($archivo['name'], PATHINFO_EXTENSION);
    echo $extension;

    $safeName = uniqid() . '.' . $extension;
    echo $safeName;
    $ruta = 'uploads/' . $safeName;
    echo $ruta;

    echo $archivo['tmp_name'];

    echo $archivo;
    /* move_uploaded_file(
        $archivo['tmp_name'],
        $ruta
    );

    echo $ruta; */
}
?>