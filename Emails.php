<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS, POST");
use PHPMailer\PHPMailer\PHPMailer;

$json_file = file_get_contents("php://input");
$data = json_decode($json_file, true);

try {
    if($_SERVER["REQUEST_METHOD"] === 'POST'){
        require 'C:/xampp/htdocs/Ingenia/PHPMailer/src/PHPMailer.php';
        require 'C:/xampp/htdocs/Ingenia/PHPMailer/src/SMTP.php';
        require 'C:/xampp/htdocs/Ingenia/PHPMailer/src/Exception.php';

        $mail = new PHPMailer(true);

        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'acam2708@gmail.com';
        $mail->Password = '';
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        $mail->setFrom('acam2708@gmail.com', 'Ingenia');
        $mail->addAddress($data['email']);

        $mail->Subject = 'Prueba';
        $mail->Body = 'Hola desde PHP';

        $mail->send();

        echo "Correo enviado";
    };
} catch(Error $e){
    echo [ 'error' => print_r($e), 'Exact_error' => ( $mail->SMTDebug = 2 ) ];
};


?>