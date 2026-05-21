<?php
header("Access-Control-Allow-Origin: https://ingenia-a6dkhcarh6e3b0ak.mexicocentral-01.azurewebsites.net/");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET");
header('Content-Type: application/json');

try{
    if($_SERVER['REQUEST_METHOD'] !== 'GET'){
        throw new Exception('NO GET');
    }
    if(empty($_GET)){
        throw new Exception('GET required');
    }

    $mandatories = ['names', 'lastnames', 'email', 'birthdate', 'phonenumber', 'dui', 'code'];
    $params = [];

    foreach($mandatories as $mandatory){
        $value = trim($_GET[$mandatory]);
        if($value === ''){ throw new Exception("$mandatory required"); }
        $params[$mandatory] = $value;
    }

} catch(Exception $e){
    die(json_encode([
        'status' => 'failed',
        'error' => $e->getMessage(),
        'msg' => 'check "error"'
    ]));
}
?>

<script>
    const user = <?php echo json_encode($params); ?>;
    sessionStorage.setItem('vth_email', JSON.stringify(user));
    window.location.href = 'https://ingenia-a6dkhcarh6e3b0ak.mexicocentral-01.azurewebsites.net/Ingenia/Html/session-log.html';
</script>