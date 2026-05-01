<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS, POST");
use PHPMailer\PHPMailer\PHPMailer;

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
$status = 'OK';

$sql_request = "INSERT INTO verification_codes (email, code, expires_at, status) VALUES (?, ?, ?)";

try {
    if($_SERVER["REQUEST_METHOD"] === 'POST'){
        if(!filter_var($data['email'], FILTER_VALIDATE_EMAIL)){
            die(json_encode([
                'status' => 'failed',
                'error' => $data['email'],
                'msg' => 'Correo electrónico inválido'
            ]));
        };
        $params = array($data['email'], $codigo_hash, $expiration, $status);
        $stmt = sqlsrv_query($conexion, $sql_request, $params);
        if(!sqlsrv_errors()){
            require 'C:/xampp/htdocs/Ingenia/PHPMailer/src/PHPMailer.php';
            require 'C:/xampp/htdocs/Ingenia/PHPMailer/src/SMTP.php';
            require 'C:/xampp/htdocs/Ingenia/PHPMailer/src/Exception.php';

            $mail = new PHPMailer(true);

            $mail->isSMTP();
            if ($data['domain'] === 'microsoft'){
                $mail->Host = 'smtp.office365.com';
                $mail->Username = 'andre.alvarado2026@frech.superate.org';
                $mail->Password = 'un_O....1498'; /*Mi cuenta acam2700@gmail.com'ylgh hoxf jsyl igwi';*/
                $mail->setFrom('andre.alvarado2026@frech.superate.org', 'Ingenia');
            } else {
                $mail->Host = 'smtp.gmail.com';
                $mail->Username = 'angeelcostaa22@gmail.com';
                $mail->Password = 'divq jnjb iral mdel'; /*Mi cuenta acam2700@gmail.com'ylgh hoxf jsyl igwi';*/
                $mail->setFrom('angeelcostaa22@gmail.com', 'Ingenia');
            }
            
            $mail->SMTPAuth = true;
            $mail->SMTPSecure = 'tls';
            $mail->Port = 587;
            $mail->addAddress($data['email']);

            $mail->Subject = 'Código de Verificación';
            $mail->Body = 'Se ha detectado un dispositivo intentando ingresar a Ingenia con tu correo.' .
            '¿Eres tú? Si es así imprime el código en la ventana que estás viendo' .
            'En caso contrario, ignora este correo. CÓDIGO: ' . $codigo;

            $mail->send();

            echo json_encode([
                'status' => 'ok',
                'code' => $codigo,
                'msg' => 'Correo enviado',
                'sent_at' => $data['email'],
                'sent_to' => [$data['names'], $data['lastnames']],
                'expiration' => $expiration,
                'error' => null,
            ]);
            
        } else {
            echo json_encode([
                'error' => sqlsrv_errors(),
                'status' => 'failed',
                'msg' => 'Correo no enviado',
            ]);
        };
    } else {
        echo json_encode([
            'status' => 'failed',
            'error' => 'No POST',
            'msg' => 'fetch enviado con method no POST',
        ]);
    }
} catch(Error $e){
    echo json_encode([ 
        'error' => print_r($e), 
        'Exact_error' => ( $mail->SMTDebug = 2 ),
        'status' => 'error',
        'msg' => 'Revisar "Exact_error"',
        ]);
};


?>