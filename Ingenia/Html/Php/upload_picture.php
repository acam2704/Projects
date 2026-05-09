<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: OPTIONS, POST, GET');

require_once 'vendor/autoload.php';

use MicrosoftAzure\Storage\Blob\BlobRestProxy;
use MicrosoftAzure\Storage\Common\Exceptions\ServiceException;

if($_SERVER['REQUEST_METHOD'] === 'POST'){
    try {
        if(!isset($_FILES['pictue'])){throw new Error('No se envió ningún archivo');}

        $file = $_FILES['picture'];
        if($file['error'] !== 0){throw new Error('Error al subir el archivo');}
        if ($archivo['size'] > 5 * 1024 * 1024) {throw new Exception('La imagen supera los 5MB');}

        $allowedTypes = [
            'image/jpeg' => 'jpg',
            'image/png' => 'png',
            'image/webp' => 'webp'
        ];
        if(!isset($allowedTypes[$file['type']])){throw new Error('Tipo de imagen inválido');}

        $extention = $allowedTypes[$file['type']];
        $fileName = bin2hex(random_bytes(16)) . '.' . $extention;
        $connectionString = getenv('DefaultEndpointsProtocol=https;AccountName=ingeniastorage;AccountKey=roriagfGtj0yhp+RryMvh5aE178kjNUMBlelsf0feMDCgPceOTsCKCoyRElLSM0Jdj6ej/+xZpAm+AStOTQE9g==;EndpointSuffix=core.windows.net');
        $containerName = 'profile-pictures';
        $blobClient = BlobRestProxy::createBlobService($connectionString);
        $content = fopen($file['tmp_name'], 'r');

        $blobClient->createBlockBlob(
            $containerName,
            $fileName,
            $content
        );

        $url = "https://ingeniastorage.blob.core.windows.net/" . $containerName . "/" . $fileName;

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