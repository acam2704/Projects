<?php
$url = "http://169.254.169.254/metadata/instance?api-version=2021-02-01";

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