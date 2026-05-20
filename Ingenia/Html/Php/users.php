<?php
header('Access-Control-Allow-Origin: *');
include('conexion_SQLAzure.php');

try{
    if($conn === false){
        throw new Error(print_r(sqlsrv_errors(), true));
    }

    $sql = 'SELECT * FROM users';
    $params = [5];
    $sql_request = sqlsrv_query($conn, $sql, $params);

    if($sql_request === false){
        throw new Error(print_r(sqlsrv_errors(), true));
    }

    while ($row = sqlsrv_fetch_array($sql_request, SQLSRV_FETCH_ASSOC)) {
        echo "ID: " . $row['ID'] .
            " - names: " . $row['names'] .
            " - lastnames: " . $row['lastnames'] .
            " - email: " . $row['email'] .
            " - password: " . $row['password'] .
            " - description: " . $row['description'] .
            " - phonenumber: " . $row['phonenumber'] .
            " - dui: " . $row['dui'] .
            " - rol: " . $row['rol'] .
            " - degrees: " . $row['degrees'] .
            " - picture: " . $row['picture'] .
            " - birthdate: " . $row['birthdate'] .
            " - created_at: " . $row['created_at'] .
            " - updated_at: " . $row['updated_at'] .
            " - status: " . $row['status'] .
            " <br />";
    }
}catch(Error $e){
    die(json_encode([
        'status' => 'failed',
        'error' => $e->getMessage(),
        'msg' => 'check "error"'
    ]));
}

sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);
?>