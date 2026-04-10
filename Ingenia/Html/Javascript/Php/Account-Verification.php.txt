<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

$data = json_decode(file_get_contents("php://input"), true);
$token = $data["token"];

// Verificar con Google
$verify = file_get_contents("https://oauth2.googleapis.com/tokeninfo?id_token=" . $token);
$user = json_decode($verify, true);

if (isset($user["email"])) {
    echo "Login válido: " . $user["email"];
} else {
    echo "Token inválido";
}
?>