<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS, POST");
use PHPMailer\PHPMailer\PHPMailer;

date_default_timezone_set("America/El_Salvador");
$json_file = file_get_contents("php://input");
$data = json_decode($json_file, true);

include("conexion_to_Verification_Codes_DB.php");

if($conexion->connect_error){
    die(json_encode([
        'status' => 'failed',
        'error' => 'conexion nula',
        'msg' => 'error de conexión'
    ]));
} else if(!$data['email']){
    echo json_encode([
        'error' => 'no Email',
        'msg' => 'no se ha podido tomar el valor del correo electrónico',
        'status' => 'failed',
    ]);
};

$codigo = bin2hex(random_bytes(3));
$codigo_hash = password_hash($codigo, PASSWORD_DEFAULT);
$expiration = date("Y-m-d H:i:s", time() + 600);

$sql_request = $conexion->prepare("INSERT INTO verification_codes (email, code, expires_at) VALUES (?, ?, ?)");

try {
    if($_SERVER["REQUEST_METHOD"] === 'POST'){
        if(!$sql_request){
            die(json_encode([
                'error' => $conexion->connect_error,
                'status' => 'failed',
                'msg' => 'error en prepare',
            ]));
        }

        $sql_request->bind_param("sss", $data['email'], $codigo_hash, $expiration);
        if($sql_request->execute()){
            require 'C:/xampp/htdocs/Ingenia/PHPMailer/src/PHPMailer.php';
            require 'C:/xampp/htdocs/Ingenia/PHPMailer/src/SMTP.php';
            require 'C:/xampp/htdocs/Ingenia/PHPMailer/src/Exception.php';

            $mail = new PHPMailer(true);

            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'angeelcostaa22@gmail.com';
            $mail->Password = 'divq jnjb iral mdel'; /*Mi cuenta acam2700@gmail.com'ylgh hoxf jsyl igwi';*/
            $mail->SMTPSecure = 'tls';
            $mail->Port = 587;

            $mail->setFrom('angeelcostaa22@gmail.com', 'Ingenia');
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
                'expiration' => $expiration,
                'error' => null,
            ]);
            
        } else {
            echo json_encode([
                'error' => $sql_request->error,
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
