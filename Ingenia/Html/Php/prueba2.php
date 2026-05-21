<?php
$url = "http://169.254.169.254/metadata/identity/oauth2/token?api-version=2018-02-01&resource=https://ingeniadinteliggence.cognitiveservices.azure.com/";

$ch = curl_init($url);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Metadata: true"
]);

$response = curl_exec($ch);

var_dump($response);
var_dump(curl_errno($ch));
var_dump(curl_error($ch));
?>