<?php
    $url = "http://169.254.169.254/metadata/instance?api-version=2021-02-01";

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ["Metadata: true"]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    echo curl_exec($ch);
?>