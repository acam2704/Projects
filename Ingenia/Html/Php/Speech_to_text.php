<?php
    $key = "1YnTlrdYAe9hxElKuQSOw4wKyXwaGSSfT2nMkXaz8T6ntThznofGJQQJ99CEACYeBjFXJ3w3AAAYACOGS6rp";
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