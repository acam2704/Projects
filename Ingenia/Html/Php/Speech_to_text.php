<?php
header('Access-Control-Allow-Methods: OPTIONS, POST, GET');
header('Access-Control-Allow-Origin: https://ingenia-a6dkhcarh6e3b0ak.mexicocentral-01.azurewebsites.net');
header('Access-Control-Allow-Headers: Content-Type');
    
$key = getenv("VoiceFeatures_key1");
$region = "eastus";
$url = "https://$region.api.cognitive.microsoft.com/sts/v1.0/issuetoken";
$headers = [
    "Ocp-Apim-Subscription-Key: $key",
    "Content-Length: 0"
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$token = curl_exec($ch);
curl_close($ch);

echo $token;
?>