<?php
header("Access-Control-Allow-Origin: *");//通信头设置
$outputarray = array('status' => 'OK', 'data' => $arr);
echo json_encode($outputarray);//数组转json，然后echo输出
?>