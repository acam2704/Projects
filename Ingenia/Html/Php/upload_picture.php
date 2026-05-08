<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: OPTIONS, POST, GET');

if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $picture = $_FILES['picture'];
    echo $_FILES;
    $extension = pathinfo($archivo['name'], PATHINFO_EXTENSION);

    $safeName = uniqid() . '.' . $extension;
    $ruta = 'https://ingeniastorage.blob.core.windows.net/profile-pictures/' . $safeName;
    move_uploaded_file(
        $archivo['tmp_name'],
        $ruta
    );

    echo $ruta;
}
?>