<?php
header("Access-Control-Allow-Origin: https://ingenia-a6dkhcarh6e3b0ak.mexicocentral-01.azurewebsites.net/");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS, POST");
header('Content-Type: application/json');

try{
    $endpoint = getenv('MSI_ENDPOINT');
    $secret = getenv('MSI_SECRET');

    $resource = urlencode('https://cognitiveservices.azure.com/');
    $url = $endpoint . '?resource=' . $resource . '&api-version=2019-08-01';
    $ch = curl_init($url);

    echo $url;

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Secret: . $secret"
    ]);

    $response = curl_exec($ch);
    if(curl_errno($ch)){
        throw new Error(curl_error($ch));
    }
    if($response === false){
        throw new Error('No se logró la conexión');
    }

    var_dump($response);

    $data = json_decode($response, true);
    if(!isset($data['access_token'])){
        throw new Error('No se logró la conexión');
    }

    $token = $data['access_token'];
    $endpoint = 'https://ingeniadinteliggence.cognitiveservices.azure.com/documentintelligence/documentModels/prebuilt-idDocument:analyze?api-version=2024-11-30';
    $file = $_FILES['document']['tmp_name'];
    $file_content = file_get_contents($file);

    $ch = curl_init($endpoint);
    curl_setopt($ch, CURLOPT_HEADER, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $file_content);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Authorization: Bearer $token",
        "Content-Type: application/octet-stream"
    ]);

    $response = curl_exec($ch);
    if(curl_errno($ch)){
        throw new Error(curl_error($ch));
    }
    $header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
    $headers = substr($response, 0, $header_size);

    preg_match('/Operation-Location:\s*(.*)/i', $headers, $matches);
    $operation_url = trim($matches[1]);
    sleep(3);

    $ch = curl_init($operation_url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Authorization: Bearer $token"
    ]);
    $result = curl_exec($ch);
    $data = json_decode($result, true);

    if(!isset($data['analyzeResult'])){
        throw new Error('No se obtuvo resultado OCR: ' . $data);
    }
    $text = $data['analyzeResult']['content'];
    echo $text;

    curl_close($ch);
} catch(Error $e){
    curl_close($ch);
    echo json_encode([
        'status' => 'failed',
        'error' => $e->getMessage(),
        'data' => $data,
        'response' => $response,
        'mg' => 'Check "error"'
    ]);
}
?>