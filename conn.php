<?php
$conn = mysql_connect("127.0.0.1","root","") or die(mysql_error());
if(!mysql_select_db("ballgame", $conn))
	echo mysql_error();
mysql_query("set names 'utf8' ");
?>