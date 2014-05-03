<?php
    include_once("conn.php");
	include_once("functions.php");
	header("Content-Type:text/xml; charset=utf-8");
	
	$log_username = $_POST['log_username'];
	$log_password = md5($_POST['log_password']);  //md5加密
	login($log_username, $log_password);  //建议增加容错
	
	//纯粹为验证session成功而存在，可忽略
	if(isset($_SESSION['nickname']))
	{
	    echo "<div><span>Welcome! </span><span>".$_SESSION['nickname']."</span><span>Your highest score: ".$_SESSION['score']."</span></div>";
	}
?>