<?php
header("Access-Control-Allow-Origin: https://ingenia-a6dkhcarh6e3b0ak.mexicocentral-01.azurewebsites.net/");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS, POST");
header('Content-Type: application/json');

try{
    $endpoint = getenv("IDENTITY_ENDPOINT");
    $secret = getenv("IDENTITY_HEADER");
    $resource = urlencode("https://cognitiveservices.azure.com");
    $my_resource = urlencode("https://ingeniadinteliggence.cognitiveservices.azure.com/");
    
    $url = $endpoint . "?resource=$resource&api-version=2019-08-01"; // Para tomar token

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "X-IDENTITY-HEADER: $secret"
    ]);

    $response = curl_exec($ch);
    if(curl_errno($ch)){
        throw new Exception(curl_error($ch));
    }
    if($response === false){
        throw new Exception('Ingenia -No se logró la conexión');
    }

    $tokenData = json_decode($response, true);
    if(!isset($tokenData['access_token'])){
        throw new Exception('Ingenia -No se logró la conexión: ' . $tokenData['access_token']);
    }

    $token = $tokenData['access_token'];
    $endpoint = 'https://ingeniadinteliggence.cognitiveservices.azure.com/documentintelligence/documentModels/prebuilt-idDocument:analyze?api-version=2024-11-30';
    
    if (!isset($_FILES['file'])) {
        throw new Exception("Ingenia -No se recibió ningún archivo");
    }
    $maxSize = 10 * 1024 * 1024;
    if ($_FILES['file']['size'] > $maxSize) {
        throw new Exception("Ingenia -La imagen supera el límite de 10 MB");
    }

    $file = $_FILES['file']['tmp_name'];
    $mime = mime_content_type($file);
    $allowedMimes = [
        'image/jpeg',
        'image/png',
        'image/tiff'
    ];

    if (!in_array($mime, $allowedMimes)) {
        throw new Exception("Ingenia -Tipo de archivo no permitido: " . $mime);
    }
    $file_content = file_get_contents($file);
    curl_close($ch); 

    $ch = curl_init($endpoint);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $file_content);
    
    $operation_url = null;
    curl_setopt($ch, CURLOPT_HEADERFUNCTION, function($curl, $header) use (&$operation_url) {
        if (preg_match('/operation-location:\s*(.*)/i', $header, $matches)) {
            $operation_url = trim($matches[1]);
        }
        return strlen($header);
    });   
    
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Authorization: Bearer $token",
        "Content-Type: application/octet-stream"
    ]);

    $response = curl_exec($ch);
    if(curl_errno($ch)){
        throw new Exception(curl_error($ch));
    }
    curl_close($ch);

    $maxAttempts = 15;
    $attempts = 1;
    if (!$operation_url) { throw new Exception("Ingenia -No se obtuvo Operation-Location"); }

    do {
        sleep(2);
        $ch = curl_init($operation_url);
        curl_setopt($ch, CURLOPT_FAILONERROR, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            "Authorization: Bearer $token"
        ]);

        $result = curl_exec($ch);
        if (curl_errno($ch)) {
            $err = curl_error($ch);
            curl_close($ch);
            throw new Exception($err);
        }
        $ocrData = json_decode($result, true);
        $status = $ocrData['status'] ?? null;

        $attempts++;
        curl_close($ch);
    } while (($status === "running" || $status === "notStarted") && $attempts < $maxAttempts);
    if ($status !== "succeeded") {
        throw new Exception("OCR no completado: " . json_encode($ocrData));
    }

    $text = $ocrData['analyzeResult']['content'];
    $fields = $ocrData['analyzeResult']['documents'][0]['fields'];
    $valueAddress = $fields['Address']['valueAddress'] ?? null;
    $return = [];
    $fields_return = [];

    if( $valueAddress ){ $fields_return = $valueAddress; }
    else{ 
        $fields_return = $fields;
        foreach ( $fields_return as $key => $value ) {
            if(!$value){ throw new Exception('Ingenia -Campo no leído'); }
            $return[$key] = $value['content'] ?? null;
        }
    }

    $return['status'] = 'ok'; 
    $return['error'] = null; 
    $return['fields'] = $fields;

    echo json_encode($return);

} catch(Exception $e){
    echo json_encode([
        'status' => 'failed',
        'error' => $e->getMessage(),
        'ocrData' => $ocrData ?? [],
        'curl_error' => curl_error($ch),
        'curl_errno' => curl_errno($ch),
        'mg' => 'Check "error"',
    ]);
    if(isset($ch)){
        curl_close($ch);
    }
}
?>