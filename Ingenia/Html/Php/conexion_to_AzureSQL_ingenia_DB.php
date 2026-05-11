<?php
header('Access-Control-Allow-Origin: https://ingenia-a6dkhcarh6e3b0ak.mexicocentral-01.azurewebsites.net/');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

include('conexion_SQLAzure.php');

try{
    if($_SERVER['REQUEST_METHOD'] !== 'POST'){
        throw new Exception('Invalid request method');
    }

    $name = $_POST[''];

    $query = 'INSERT INTO users (names, surnames, phonenumber, 
                                created_at, updated_at, last_login_at, 
                                degrees, picture, birthdate)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

    $now = date('Y-m-d H:i:s', time() + 600);
    $birthday = date('Y-m-d');
    $params = array('André', 'Alvarado', '61918826', $now, $now, $now, '', '', $birthday);

    echo json_encode([
        'status' => 'ok',
        'error' => null,
        'msg' => 'Conexion lograda',
        'contenido' => $conn,
    ]);

    $stmt2 = sqlsrv_query($conn, $query2);
    //$stmt = sqlsrv_query($conn, $query, $params);
    // echo sqlsrv_free_stmt($stmt);
    while ($row = sqlsrv_fetch_array($stmt2, SQLSRV_FETCH_ASSOC)) {
        echo ($row['names'] . ' ' . $row['surnames'] . ' ' . $row['phonenumber'] . ' ' . $row['created_at']->format('Y-m-d H:i:s') . ' ' . $row['birthdate']->format('Y-m-d') .  PHP_EOL);
        echo '<br>';
    }

    if ($stmt2 === false) {
        die(json_encode([
            'status' => 'failed',
            'error' => null,
            'msg' => 'Conexion con la tabla no lograda',
            'contenido' => print_r($stmt2),
        ]));
    } 
} catch(Exception $e){
    echo json_encode([
        'status' => 'failed',
        'error' => $e->getMessage(),
        'data' => null
    ]);
}
?>