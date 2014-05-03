<?php
    include_once("functions.php");
    header("Content-Type:text/xml; charset=utf-8");

    $nickname = mysql_real_escape_string($_POST['newnick']);
    modify_nickname($_SESSION['username'], $nickname);
?>