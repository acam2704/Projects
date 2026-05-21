<?php
$endpoint = getenv("IDENTITY_ENDPOINT");
$secret = getenv("IDENTITY_HEADER");

$resource = "https://cognitiveservices.azure.com";
$url = $endpoint . "?api-version=2019-08-01&resource=" . urlencode($resource);

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "X-IDENTITY-HEADER: $secret"
]);

$response = curl_exec($ch);

var_dump($response);
var_dump(curl_errno($ch));
var_dump(curl_error($ch));
?>