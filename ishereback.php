<?php
	include_once("functions.php");
	header("Content-Type:text/xml; charset=utf-8");
	
	if(isset($_SESSION['username']))    //判断新开的页面是否已有用户登陆过
	    echo "<div><span>ishere</span><span>".$_SESSION['nickname']."</span><span>Your highest score: ".$_SESSION['score']."</span></div>";
	else
	    echo "<div><span>nothere</span></div>";
?>
