<?php
header("Access-Control-Allow-Origin: https://ingenia-a6dkhcarh6e3b0ak.mexicocentral-01.azurewebsites.net/");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS, POST");
header('Content-Type: application/json');
use PHPMailer\PHPMailer\PHPMailer;

ini_set('display_errors', 0);
error_reporting(E_ALL);

date_default_timezone_set("America/El_Salvador");
$json_file = file_get_contents("php://input");
$data = json_decode($json_file, true);

include("conexion_to_Verification_Codes_DB.php");

try{
    if($conexion === false){
        throw new Error(print_r(sqlsrv_errors(), true));
    }
    if(!$data['email']){
        throw new Error('no Email');
    }

    $codigo = bin2hex(random_bytes(3));
    $codigo_hash = password_hash($codigo, PASSWORD_DEFAULT);
    $expiration = date("Y-m-d H:i:s", time() + 600);
    $now = date("Y-m-d H:i:s", time());
    $status = 'OK';

    $sql_request = "INSERT INTO verification_codes (email, code, expires_at, status, created_at) VALUES (?, ?, ?, ?, ?)";

    if($_SERVER["REQUEST_METHOD"] === 'POST'){
        if(!filter_var($data['email'], FILTER_VALIDATE_EMAIL)){
            throw new Error('Invalid email: ' . $data['email']);
        }
        $params = array($data['email'], $codigo_hash, $expiration, $status, $now);
        $stmt = sqlsrv_query($conexion, $sql_request, $params);
        if($stmt === false){
            throw new Error(print_r(sqlsrv_errors(), true));
        }
        require '/home/site/wwwroot/Ingenia/PHPMailer/src/PHPMailer.php';
        require '/home/site/wwwroot/Ingenia/PHPMailer/src/SMTP.php';
        require '/home/site/wwwroot/Ingenia/PHPMailer/src/Exception.php';

        $mail = new PHPMailer(true);
        $mail->isSMTP();

        if ($data['domain'] !== 'google'){
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
        $mail->isHTML(true);

        $params = [
            'email' => $data['email'],
            'lastnames' => $data['lastnames'],
            'names' => $data['names'],
            'birthdate' => $data['birthdate'],
            'phonenumber' => $data['phonenumber'],
            'dui' => $data['dui'],
            'code' => $codigo
        ];

        $url =  'https://ingenia-a6dkhcarh6e3b0ak.mexicocentral-01.azurewebsites.net/Ingenia/Html/Php/account_verification_th_email.php?' . http_build_query($params);
        $mail->Body = "
        <!DOCTYPE html>
            <html>
            <head>
                <meta charset='UTF-8'>
                <title>Verificación</title>
            </head>
            <body style='
                margin:0;
                padding:0;
                background-color:#f4f7fb;
                font-family:Arial, Helvetica, sans-serif;
            '>

            <table width='100%' cellpadding='0' cellspacing='0' border='0'>
            <tr>
            <td align='center'>

            <table width='600' cellpadding='0' cellspacing='0' border='0'
            style='
                background:#ffffff;
                margin-top:40px;
                border-radius:14px;
                overflow:hidden;
                box-shadow:0 4px 20px rgba(0,0,0,0.08);
            '>

            <tr>
            <td style='
                background:#0078D4;
                padding:30px;
                text-align:center;
                color:white;
            '>
                <h1 style='margin:0;font-size:28px;'>
                    Ingenia
                </h1>

                <p style='margin-top:10px;font-size:16px;opacity:0.9;'>
                    Verificación de correo
                </p>
            </td>
            </tr>

            <tr>
            <td style='padding:40px;'>

                <h2 style='
                    margin-top:0;
                    color:#222;
                    font-size:24px;
                '>
                    ¡Sigue así!
                </h2>

                <p style='
                    color:#555;
                    font-size:16px;
                    line-height:1.7;
                '>
                    Gracias por empezar a crear tu cuenta en Ingenia.\n
                    Para activar tu cuenta y continuar tu registro,
                    debes verificar tu correo electrónico.
                </p>

                <table cellpadding='0' cellspacing='0' border='0' width='100%'>
                <tr>
                <td align='center' style='padding:35px 0;'>

                    <a href='$url'
                    style='
                        background:#0078D4;
                        color:white;
                        text-decoration:none;
                        padding:16px 34px;
                        border-radius:10px;
                        font-size:16px;
                        font-weight:bold;
                        display:inline-block;
                    '>
                        Verificar cuenta
                    </a>

                </td>
                </tr>
                </table>

                <p style='
                    color:#777;
                    font-size:14px;
                    line-height:1.6;
                '>
                    Si no fuiste tú, puedes ignorar este correo.
                </p>

                <hr style='
                    border:none;
                    border-top:1px solid #e5e7eb;
                    margin:30px 0;
                '>

                <p style='
                    color:#999;
                    font-size:12px;
                    text-align:center;
                    line-height:1.5;
                '>
                    © 2026 Ingenia. Todos los derechos reservados.
                </p>

            </td>
            </tr>

            </table>

            </td>
            </tr>
            </table>

            </body>
        </html>
        ";


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
        throw new Error('No POST');
    }
} catch(Error $e){
    sqlsrv_free_stmt($stmt);
    sqlsrv_close($conn);

    die(json_encode([ 
        'error' => $e->getMessage(),
        'status' => 'error',
        'msg' => 'Check "error"',
    ]));
}
?>