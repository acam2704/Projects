<?php
    $serverName = "ingenia.database.windows.net";
    $DataBase_password = getenv('DataBase_password');
    $connectionOptions = array(
        "Database" => "free-sql-db-7867305",
        "Uid" => "ingenia_admin",
        "PWD" => $DataBase_password
    );

    //Establishes the connection
    $conn = sqlsrv_connect($serverName, $connectionOptions);
    if ($conn === false){
        die(json_encode([
            'status' => 'failed',
            'error' => print_r(sqlsrv_errors(), true),
            'msg' => 'No se logró la conexión'
        ]));
    }

    $query = 'INSERT INTO users (names, surnames, phonenumber, 
                                created_at, updated_at, last_login_at, 
                                degrees, picture, birthdate)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

    $query2 = 'SELECT * FROM users';

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
?>