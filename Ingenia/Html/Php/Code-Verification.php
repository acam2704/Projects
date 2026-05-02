<?php
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST");

$json_file = file_get_contents("php://input");
$data = json_decode($json_file, true);

include("conexion_to_Verification_Codes_DB.php");
$now = date("Y-m-d H:i:s", time());
$sql_request = "SELECT TOP 1 * FROM verification_codes WHERE email = ? AND expires_at > ? ORDER BY created_at DESC";

try{
    if($_SERVER["REQUEST_METHOD"] === "POST"){
        $params = array($data['email'], $now);
        $stmt = sqlsrv_query($conexion, $sql_request, $params);
        if($stmt === false){
            die(json_encode([
                'status' => 'failed',
                'error' => print_r(sqlsrv_errors(), true),
                'msg' => 'error en execute',
            ]));
        }
        $result = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);
        echo json_encode([
            'status' => 'on process',
            'error' => 'There is no error',
            'email' => $data['email'],
            'option1' => print_r($result),
            'option2' => print_r($result, true),
            'option3' => $result,
            'option4' => $result['code']
        ]);

        if (!$result) {
            die(json_encode([
                'status' => 'failed',
                'error' => 'No results',
                'msg' => 'No hubo resultados de búsqueda',
            ]));
        }
        echo json_encode([
            'status' => 'on process',
            'error' => null,
            'msg' => '',
            'data' => $result['code']
        ]);
        if(password_verify($data['code'], $result['code'])){
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

        sqlsrv_free_stmt($stmt);
        sqlsrv_close($conexion);
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
        'sql_request' => sqlsrv_errors(),
        'msg' => 'Revisar los errores. Verificación de código no conseguida',
        'status' => 'fatal error',
        'error' => 'conexion error',
    ]);
}

?>