<?php
header("Access-Control-Allow-Origin: https://ingenia-a6dkhcarh6e3b0ak.mexicocentral-01.azurewebsites.net/");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS, POST");
use PHPMailer\PHPMailer\PHPMailer;

ini_set('display_errors', 0);
error_reporting(E_ALL);

date_default_timezone_set("America/El_Salvador");
$json_file = file_get_contents("php://input");
$data = json_decode($json_file, true);

include("conexion_to_Verification_Codes_DB.php");

if($conexion === false){
    die(json_encode([
        'status' => 'failed',
        'error' => print_r(sqlsrv_errors(), true),
        'msg' => 'error de conexión'
    ]));
} else if(!$data['email']){
    die(json_encode([
        'error' => 'no Email',
        'msg' => 'no se ha podido tomar el valor del correo electrónico',
        'status' => 'failed',
    ]));
};

$codigo = bin2hex(random_bytes(3));
$codigo_hash = password_hash($codigo, PASSWORD_DEFAULT);
$expiration = date("Y-m-d H:i:s", time() + 600);
$now = date("Y-m-d H:i:s", time());
$status = 'OK';

$sql_request = "INSERT INTO verification_codes (email, code, expires_at, status, created_at) VALUES (?, ?, ?, ?, ?)";

try {
    if($_SERVER["REQUEST_METHOD"] === 'POST'){
        if(!filter_var($data['email'], FILTER_VALIDATE_EMAIL)){
            die(json_encode([
                'status' => 'failed',
                'error' => 'Invalid email: ' . $data['email'],
                'msg' => 'Correo electrónico inválido'
            ]));
        };
        $params = array($data['email'], $codigo_hash, $expiration, $status, $now);
        $stmt = sqlsrv_query($conexion, $sql_request, $params);
        if($stmt === false){
            die(json_encode([
                'error' => sqlsrv_errors(),
                'status' => 'failed',
                'msg' => 'Correo no enviado',
            ]));
        }
        require '/home/site/wwwroot/Ingenia/PHPMailer/src/PHPMailer.php';
        require '/home/site/wwwroot/Ingenia/PHPMailer/src/SMTP.php';
        require '/home/site/wwwroot/Ingenia/PHPMailer/src/Exception.php';

        $mail = new PHPMailer(true);
        $mail->isSMTP();

        if ($data['domain'] === 'microsoft'){
            $admin_email = getenv('microsoft_email');
            $password = getenv('microsoft_email_password');
            $mail->Host = 'smtp.office365.com';
            $mail->Username = $admin_email;
            $mail->Password = $password;
            $mail->setFrom($admin_email, 'Ingenia');
        } else {
            $admin_email = getenv('google_email');
            $password = getenv('google_email_password');
            $mail->Host = 'smtp.gmail.com';
            $mail->Username = $admin_email;
            $mail->Password = $password;
            $mail->setFrom($admin_email, 'Ingenia');
        }
        
        $mail->SMTPAuth = true;
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;
        $mail->addAddress($data['email']);

        $mail->Subject = 'Código de Verificación';
        $mail->Body = 'Se ha detectado un dispositivo intentando ingresar a Ingenia con tu correo.' .
        '¿Eres tú? Si es así imprime el código en la ventana que estás viendo' .
        'En caso contrario, ignora este correo. CÓDIGO: ' . $codigo;

        sqlsrv_free_stmt($stmt);
        sqlsrv_close($conexion);

        $mail->send();

        echo json_encode([
            'status' => 'ok',
            'msg' => 'Correo enviado',
            'email' => $data['email'],
            'names' => $data['names'],
            'lastnames' => $data['lastnames'],
            'expiration' => $expiration,
            'error' => null,
        ]);
    } else {
        die(json_encode([
            'status' => 'failed',
            'error' => 'No POST',
            'msg' => 'fetch enviado con method no POST',
        ]));
    }
} catch(Error $e){
    die(json_encode([ 
        'error' => print_r($e), 
        'Exact_error' => $e->getMessage(),
        'status' => 'error',
        'msg' => 'Revisar "Exact_error"',
        ]));
}


?>