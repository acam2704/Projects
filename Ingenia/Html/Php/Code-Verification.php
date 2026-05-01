<?php
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST");

$json_file = file_get_contents("php://input");
$data = json_decode($json_file, true);

include("conexion_to_Verification_Codes_DB.php");
$now = date("Y-m-d H:i:s");
$sql_request = "SELECT * FROM verification_codes WHERE email = ? AND expires_at > ? ORDER BY expires_at DESC LIMIT 1";

try{
    if($_SERVER["REQUEST_METHOD"] === "POST"){
        $params = array($data['email'], $now);
        $stmt = sqlsrv_query($conexion, $sql_request, $params);
        if(!sqlsrv_errors()){
            $results = $sql_request->get_result();
            if ($results->num_rows === 0) {
                die(json_encode([
                    'status' => 'failed',
                    'error' => 'no results',
                    'msg' => 'No hubo resultados de búsqueda',
                ]));
            }
            $result = $results->fetch_assoc();

            echo $result[0];
            if(password_verify($data['code'], $result[0])){
                echo json_encode([
                    'status' => 'ok',
                    'msg' => 'correo verificado',
                    'error' => null,
                ]);
            } else{
                echo json_encode([
                    'status' => 'failed',
                    'msg' => 'código incorrecto',
                    'error' => 'result /= POST',
                ]);
            };
        } else {
            echo json_encode([
                'status' => 'failed',
                'error' => $sql_request->error,
                'msg' => 'error en execute',
            ]);
        };
    } else {
        echo json_encode([
                'error' => $conexion->connect_error,
                'status' => 'failed',
                'msg' => 'conexion no lograda',
            ]);
    }

} catch (Error $e){
    echo json_encode([
        'SERVER' => $_SERVER->error_get_last,
        'sql_request' => $sql_request->error,
        'msg' => 'Revisar los errores. Verificación de código no conseguida',
        'status' => 'fatal error',
        'error' => 'conexion error',
    ]);
}

?>