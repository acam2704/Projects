<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include('Microsoft-Account-Verification.php');

if($_SERVER['REQUEST_METHOD'] === 'GET'){
    if($response['status'] === 'ok'){
        $data = [
            'client_id' => 'c3c3fd20-6fd8-4d78-9500-8ad1cb909b22',
            'client_secret' => 'b7a00361-873e-456a-b1b2-36be8367d2d2',
            'code' => $response['code'],
            'redirect_uri' => 'http://localhost/Ingenia/Html/Php/Main-Menu.html',
            'grant_type' => 'authorization_code'
        ];

        $options = [
            'http' => [
                'header' => 'Content_type: application/x-www-urlencoded',
                'method' => 'POST',
                'content' => http_build_query($data),
            ],
        ];

        $context = stream_context_create($options);
        $verification = file_get_contents(
            "https://login.microsoftonline.com/common/oauth2/v2.0/token",
            false,
            $context
        );
        $result = json_decode($verification, true);
        echo print_r($result);

    } else{
        echo json_encode($response);
    };
}
?>