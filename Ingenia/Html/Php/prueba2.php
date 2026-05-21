<?php
$endpoint = getenv("IDENTITY_ENDPOINT");
$secret = getenv("IDENTITY_HEADER");
$resource = urlencode("https://cognitiveservices.azure.com");
$url = $endpoint . "?resource=$resource&api-version=2019-08-01";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Metadata: true"
]);

$result = curl_exec($ch);

echo "<pre>";
var_dump($result);
var_dump(curl_errno($ch));
var_dump(curl_error($ch));
echo "</pre>";

echo getenv("IDENTITY_ENDPOINT");
echo "\n";
echo getenv("MSI_ENDPOINT");
?>