<?php
    include_once("conn.php");
	include_once("functions.php");
	header("Content-Type:text/xml; charset=utf-8");
	
	$reg_username = $_POST['reg_username'];
	$reg_password = $_POST['reg_password'];
	$reg_nickname = mysql_real_escape_string($_POST['reg_nickname']);	//mysql_real_escape_string过滤部分特殊字符
	register($reg_username, $reg_password, $reg_nickname);
?>