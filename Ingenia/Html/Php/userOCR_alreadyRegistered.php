<?php
header('Access-Control-Allow-Methods: OPTIONS, POST, GET');
header('Access-Control-Allow-Origin: https://ingenia-a6dkhcarh6e3b0ak.mexicocentral-01.azurewebsites.net');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

date_default_timezone_set("America/El_Salvador");
include('conexion_SQLAzure.php');

$json_data = file_get_contents('php://input', true);
$prev_data = json_decode($json_data, true);
$data = $prev_data['data'];

try{
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        if($conn === false){ throw new Exception('Conexión no conseguida'); }

        if(!$data){ throw new Exception('Ingenia -Hubo un error. Inténtelo más tarde.'); }
        
        $dataType = $data[1] ?? null;
        if(!$dataType){ throw new Exception('Ingenia -Hubo un error. Inténtelo de nuevo.'); }
        if(!in_array($dataType, ['dui', 'email', 'phonenumber'])){ throw new Exception('Ingenia -Hubo un error. Inténtelo nuevamente.'); }
        if( $dataType === 'email' && ! ( filter_var($data[0], FILTER_VALIDATE_EMAIL) ) )
        { throw new Exception('Ingenia -Correo Inválido'); } 

        /* VERIFICAR QUE EL EMAIL NO SE HAYA REGISTRADO */
        $sql = "SELECT TOP 1 1 FROM users WHERE $dataType = ?";
        $params = [ &$data[0] ];
        $sql_request = sqlsrv_prepare($conn, $sql, $params);

        if($sql_request && sqlsrv_execute($sql_request) !== false){
            $data_from_DB = sqlsrv_fetch_array($sql_request, SQLSRV_FETCH_ASSOC);
            if($data_from_DB){ throw new Exception('Ingenia -en uso.'); } 
            else{
                sqlsrv_free_stmt($sql_request);
                sqlsrv_close($conn);

                echo json_encode([
                    'status' => 'ok',
                    'error' => null,
                    'msg' => 'No registered',
                    'user' => $data
                ]);
            }
        } else{ throw new Exception(print_r(sqlsrv_errors(), true)); }

    } else{ throw new Exception('No POST'); }
} catch(Throwable $e){
    if($sql_request){ sqlsrv_free_stmt($sql_request); }
    if($conn){ sqlsrv_close($conn); }

    echo json_encode([
        'status' => 'failed',
        'error' => $e->getMessage(),
        'email_registered' => 'failed',
        'phonenumber_registered' => 'failed',
        'dui_registered' => 'failed'
    ]);
}
?>