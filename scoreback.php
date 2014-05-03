<?php
    include_once("conn.php");
	include_once("functions.php");
    header("Content-Type:text/xml; charset=utf-8");
	if(isset($_SESSION['username']))
	{
		$score = $_POST['score'];
		$username = $_SESSION['username'];
		set_score($score, $username);    //建议增加容错
	}
?>