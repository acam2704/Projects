<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: OPTIONS, POST, GET');

if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $picture = $_FILES['picture'];
    echo $picture;
    $extension = pathinfo($picture['name'], PATHINFO_EXTENSION);
    echo $extension;

    $safeName = uniqid() . '.' . $extension;
    echo $safeName;
    $ruta = 'https://ingeniastorage.blob.core.windows.net/profile-pictures/' . $safeName;
    move_uploaded_file(
        $picture['tmp_name'],
        $ruta
    );

    echo $ruta;
}
?>