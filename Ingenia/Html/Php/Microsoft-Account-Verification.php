<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

function base64UrlDecode($data) {
    $remainder = strlen($data) % 4;
    if ($remainder) {
        $data .= str_repeat('=', 4 - $remainder);
    }
    return base64_decode(strtr($data, '-_', '+/'));
}

try{
    if($_SERVER['REQUEST_METHOD'] === 'GET'){

        $data = [
            'client_id' => 'c3c3fd20-6fd8-4d78-9500-8ad1cb909b22',
            'client_secret' => '8TP8Q~tGszBnJ3HVYvbNeX.jz.mi-9Bgcs3K.aVw',
            'code' => $_GET['code'],
            'redirect_uri' => 'https://ingenia-a6dkhcarh6e3b0ak.mexicocentral-01.azurewebsites.net/Ingenia/Html/Php/Microsoft-Account-Verification.php',
            'grant_type' => 'authorization_code'
        ];

        $options = [
            'http' => [
                'header' => 'Content_type: application/x-www-urlencoded\r\n',
                'method' => 'POST',
                'content' => http_build_query($data)
            ],
        ];

        $context = stream_context_create($options);
        $response = file_get_contents(
            "https://login.microsoftonline.com/common/oauth2/v2.0/token",
            false,
            $context
        );
        $result = json_decode($response, true);

        $id_token = $result['id_token'];

        $parts = explode('.', $id_token);
        $pay_load = json_decode(base64UrlDecode($parts[1]), true);
        $respond = json_encode([
            'email' => $pay_load['email'],
            'names' => explode(' ', $pay_load['name'])[0],
            'lastnames' => explode(' ', $pay_load['name'])[1]
        ]);
        $_SESSION['user'] = $respond;
    } else {
        echo json_encode([
            'code' => '',
            'status' => 'failed',
            'error' => 'No GET',
            'msg' => 'GET fallido'
        ]);
    }
} catch(Error $e){
    echo json_encode([
        'status' => 'failed',
        'error' => $e,
        'msg' => 'Error durante la ejecución de código',
    ]);
}

?>

<script>
    // Guardar datos en el navegador
    sessionStorage.setItem('user', '<?php echo $respond; ?>');

    // Redirigir al HTML
    window.location.href = "https://ingenia-a6dkhcarh6e3b0ak.mexicocentral-01.azurewebsites.net/Ingenia/Html/Session-Log.html";
</script>

<style>
    *{
        background-color: white;
        color: white;
    }
</style>