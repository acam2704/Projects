<?php
header('Access-Control-Allow-Methods: OPTIONS, POST, GET');
header('Access-Control-Allow-Origin: https://ingenia-a6dkhcarh6e3b0ak.mexicocentral-01.azurewebsites.net/');
header('Access-Control-Allow-Headers: Content-Type');

date_default_timezone_set("America/El_Salvador");
$json = file_get_contents('php://input', true );
$data = json_decode($json, true);

include('conexion_to_user_DB.php');
$now = date("Y-m-d H:i:s", time());
$psw = $_POST['password'];
$h_psw = password_hash($psw, PASSWORD_DEFAULT);

try{
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        if(!$conexion->error){
            die(json_encode([
                'status' => 'failed',
                'error' => $conexion->connect_error,
                'msg' => 'No hubo conexión'
            ]));
        };

        $sql_request = $conexion->prepare('INSERT INTO users (names, surnames, email, password,description, phonenumber, role, degrees, picture, birthdate, 
                                        created_at, updated_at, status) 
                                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
        
        $sql_request->bind_param('ssssssssssss', $_POST['names'], $_POST['lastnames'], $_POST['email'], $h_psw, $_POST['description'], $_POST['phonenumber'],
                        $_POST['dui'], $_POST['role'], $_POST['degrees'], $_POST['picture'], $_POST['birthdate'], $now, $now, 'active');

        if($sql_request->execute()){
            echo json_encode([
                'status' => 'ok',
                'error' => null, 
                'msg' => 'Registrado con éxito'
            ]);
        } else{
            echo json_encode([
                'status' => 'failed',
                'error' => $sql_request->error,
                'msg' => 'Hubo un error al ejecutar el registro'
            ]);
        };
    } else {
        echo json_encode([
            'status' => 'failed',
            'error' => 'POST',
            'msg' => 'El fetch no está enviando ningún POST'
        ]);
    };
} catch(Error $e){
    echo json_encode([
        'status' => 'failed',
        'error' => $_SERVER->error_get_last,
        'msg' => 'Hubo un error al correr el código'
    ]);
};
?>

/*
CREATE TABLE [dbo].[users] (
    [Id]          INT            IDENTITY (1, 1) NOT NULL,
    [names]       NVARCHAR (100) CONSTRAINT [DEFAULT_users_names] DEFAULT 'no_names' NOT NULL,
    [surnames]    NVARCHAR (100) CONSTRAINT [DEFAULT_users_surnames] DEFAULT 'no_surnames' NOT NULL,
    [email]       NVARCHAR (255) CONSTRAINT [DEFAULT_users_email] DEFAULT 'no_email' NOT NULL,
    [description] NVARCHAR (255) CONSTRAINT [DEFAULT_users_description] DEFAULT 'no_description' NOT NULL,
    [password]    VARCHAR (255)  CONSTRAINT [DEFAULT_users_password] DEFAULT '0192837465' NOT NULL,
    [phonenumber] VARCHAR (20)   CONSTRAINT [DEFAULT_users_phonenumber] DEFAULT '0000-0000' NOT NULL,
    [dui]         VARCHAR (10)   CONSTRAINT [DEFAULT_users_dui] DEFAULT '000000000' NOT NULL,
    [rol]         NVARCHAR (20)  CONSTRAINT [DEFAULT_users_role] DEFAULT 'albañil' NOT NULL,
    [degrees]     VARCHAR (255)  NOT NULL,
    [picture]     VARCHAR (255)  NOT NULL,
    [birthdate]   DATE           CONSTRAINT [DEFAULT_users_birthdate] DEFAULT '01-01-1970' NOT NULL,
    [created_at]  DATETIME       CONSTRAINT [DEFAULT_users_created_at] DEFAULT GETDATE() NOT NULL,
    [updated_at]  DATETIME       CONSTRAINT [DEFAULT_users_updated_at] DEFAULT GETDATE() NOT NULL,
    [status]      VARCHAR (50)   CONSTRAINT [DEFAULT_users_status] DEFAULT 'active' NOT NULL,
    CONSTRAINT [PK_users] PRIMARY KEY CLUSTERED ([Id] ASC)
);
*/