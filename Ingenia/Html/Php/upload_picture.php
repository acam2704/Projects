<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: OPTIONS, POST, GET');

require_once '/home/site/wwwroot/Ingenia/Html/vendor/autoload.php';

use MicrosoftAzure\Storage\Blob\BlobRestProxy;
echo json_encode([
    'status' => 'on process',
    'error' => null,
    'data' => null
]);

if($_SERVER['REQUEST_METHOD'] === 'POST'){
    try {
        if(!isset($_FILES['picture'])){throw new Error('No se envió ningún archivo');}

        $received_file = $_FILES['picture'];
        if($received_file['error'] !== 0){throw new Error('Error al subir el archivo');}
        if ($received_file['size'] > 5 * 1024 * 1024) {throw new Exception('La imagen supera los 5MB');}
        
        $allowedTypes = [
            'image/jpeg' => 'jpg',
            'image/png' => 'png',
            'image/webp' => 'webp'
        ];
        if(!isset($allowedTypes[$received_file['type']])){throw new Error('Tipo de imagen inválido');}

        $extention = $allowedTypes[$received_file['type']];
        $fileName = bin2hex(random_bytes(16)) . '.' . $extention;
        $connectionString = getenv('blobStorage_connectionString_1');
        $containerName = getenv('container1');
        echo json_encode([
            'status' => 'on process',
            'extention' => $extention,
            'fileName' => $fileName,
            'error' => null
        ]);
        $blobClient = BlobRestProxy::createBlobService($connectionString);
        $content = file_get_contents($received_file['tmp_name']);
        $blobClient->createBlockBlob(
            $containerName,
            $fileName,
            $content
        );

        $blobStorage_path = getenv('blobStorage_path');
        $url = $blobStorage_path . $containerName . "/" . $fileName;

        echo json_encode([
            'status' => 'ok',
            'error' => null,
            'msg' => 'Imágen guardada exitósamente',
            'url' => $url
        ]);

    } catch(Error $e){
        echo json_encode([
            'status' => 'failed',
            'error' => $e->getMessage(),
            'msg' => 'Para conocer el error, mira a "error"'
        ]);
    }
}
?>