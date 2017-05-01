<?php
header("Access-Control-Allow-Origin: *");
$outputarray = array('status' => 'error', 'data' => $arr);
echo json_encode($outputarray);
?>