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
        throw new Exception('Ingenia -Inténtelo más tarde');
    }

    $tokenData = json_decode($response, true);
    if(!isset($tokenData['access_token'])){
        throw new Exception('Ingenia -Inténtelo más tarde');
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
        throw new Exception("Ingenia -Tipo de archivo no permitido");
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
    if (!$operation_url) { throw new Exception("Ingenia -Inténtelo nuevamente"); }

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

    if( $valueAddress ){ 
        $city = $valueAddress['city'] ?? null;
        $state = $valueAddress['state'] ?? null;
        $countryRegion = $valueAddress['countryRegion'] ?? null;

        $return = [
            'city' =>  $city,
            'state' => $state,
            'countryregion' => $countryRegion
        ];
    }
    else{ 
        $birthdate = $fields['DateOfBirth']['content'] ?? null;
        $dui = $fields['DocumentNumber']['content'] ?? null;
        $firstname = $fields['FirstName']['content'] ?? null;
        $lastname = $fields['LastName']['content'] ?? null;

        $return = [
            'birthdate' => $birthdate,
            'dui' => $dui,
            'firstname' => $firstname,
            'lastname' => $lastname
        ];
    }

    foreach ( $return as $key => $value ) 
    { if(!$value){ throw new Exception('Ingenia -No se logró captar los campos necesarios'); } }

    $return['status'] = 'ok'; 
    $return['error'] = null; 
    $return['fields'] = $fields;

    echo json_encode($return);

} catch(Exception $e){
    echo json_encode([
        'status' => 'failed',
        'error' => $e->getMessage(),
        'ocrData' => $ocrData ?? [],
        'state' => $state,
        'countryRegion' => $countryRegion,
        'city' => $city,
        'curl_error' => curl_error($ch),
        'curl_errno' => curl_errno($ch),
        'mg' => 'Check error',
    ]);
    if(isset($ch)){
        curl_close($ch);
    }
}
?>