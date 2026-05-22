<style>
    *{
        color: white;
        background-color: white;
    }
</style>

<?php
session_start();

error_reporting(E_ALL);
ini_set('display_errors', 0);

function base64UrlDecode($data) {
    $remainder = strlen($data) % 4;
    if ($remainder) {
        $data .= str_repeat('=', 4 - $remainder);
    }
    return base64_decode(strtr($data, '-_', '+/'));
}

try{
    if($_SERVER['REQUEST_METHOD'] === 'GET'){
        $cliend_id = getenv('client_id');
        $client_secret = getenv('client_secret');
        $data = [
            'client_id' => $cliend_id,
            'client_secret' => $client_secret,
            'code' => $_GET['code'],
            'redirect_uri' => 'https://ingenia-a6dkhcarh6e3b0ak.mexicocentral-01.azurewebsites.net/Ingenia/Html/Php/Microsoft-Account-Verification.php',
            'grant_type' => 'authorization_code'
        ];

        $options = [
            'http' => [
                'header' => "Content-type: application/x-www-form-urlencoded\r\n",
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
        $respond = [
            'email' => $pay_load['email'],
            'names' => explode(' ', $pay_load['name'])[0],
            'lastnames' => explode(' ', $pay_load['name'])[1]
        ];
        $_SESSION['user'] = $respond;
    } else {
        error_log(json_encode([
            'code' => '',
            'status' => 'failed',
            'error' => 'No GET',
            'msg' => 'GET fallido'
        ]));
    }
} catch(Throwable $e){
    error_log(json_encode([
        'status' => 'failed',
        'error' => $e->getMessage(),
        'msg' => 'Error durante la ejecución de código',
    ]));
}
?>

<script>
    // Guardar datos en el navegador
    const user = <?php echo json_encode($respond)?>;
    sessionStorage.removeItem('vth_email');
    localStorage.setItem('user', JSON.stringify(user));

    // Redirigir al HTML
    window.location.href = "https://ingenia-a6dkhcarh6e3b0ak.mexicocentral-01.azurewebsites.net/Ingenia/Html/session-Log.html";
</script>
