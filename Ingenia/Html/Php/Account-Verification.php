<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

ini_set('display_errors', 0);
error_reporting(E_ALL);

session_start();

$data = json_decode(file_get_contents("php://input"), true);
$token = $data["token"];

// Verificar con Google
$verify = file_get_contents("https://oauth2.googleapis.com/tokeninfo?id_token=" . $token);
$user = json_decode($verify, true);

if (isset($user["email"])) {
    $respond = json_encode([
        "status" => "ok",
        "email" => $user["email"],
        "names" => explode(' ', $user["name"])[0],
        "lastnames" => explode(' ', $user["name"])[1]
    ]);
    echo $respond;
    $_SESSION['user'] = $respond;
} else {
    echo json_encode([
        "error" => "isset(user[email])",
        "status" => "error"
    ]);
}
?>