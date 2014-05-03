<?php
	include_once("conn.php");
	session_start();
	function login($log_username, $log_password)    //登陆 Login
	{
		$sql= "SELECT * FROM `player` WHERE `username` = \"".$log_username."\" AND password = \"".$log_password."\"";
		$result = mysql_query($sql);
		if($row = mysql_fetch_array($result))
		{
			$_SESSION['id'] = $row['id'];
			$_SESSION['username'] = $row['username'];
			$_SESSION['nickname'] = recover_keyword($row['nickname']);
			$_SESSION['score'] = $row['score'];
			$_SESSION['ranking'] = $row['ranking'];
		}
		else    //若登陆失败，返回错误信息
		{
		    echo "<div><span>w</span><span>登录失败，ID或密码错误</span></div>";
		}
	}
	
	function register($reg_username, $reg_password, $reg_nickname)    //注册 Register
	{
		$reg_score = 0;
		if ($reg_username == "" || $reg_password == "" || $reg_nickname == "")    //判断是否所有空格都已被填满
		{
		    echo "请填满所有空格！";
			return;
		}
		$reg_nickname = check_keyword($reg_nickname);
		if(!check_username($reg_username))	//检查ID、密码、昵称的格式
			return;
		if(!check_password($reg_password))
			return;
		if(!check_nicknameI($reg_nickname))
			return;
		$reg_password = md5($reg_password);	//md5加密
		//将用户信息加入数据库，初始排名一律为“6”
		$sql= "INSERT INTO `player`(`id`,`username`,`password`,`nickname`,`score`,`ranking`) VALUES(NULL,\"".$reg_username."\" ,\"".$reg_password."\",\"".$reg_nickname."\",\"".$reg_score."\",6)";
		$result = mysql_query($sql);
		if($result)    
			echo "注册成功!";
		else
			echo "注册失败!";
	}
	
	function set_score($score, $username)    //分数 Score
	{
		$sql= "SELECT * FROM `player` WHERE `username` = \"".$username."\"";
		$result = mysql_query($sql);
		$row = mysql_fetch_array($result);
		echo "<div>";
		if($score > $row['score'])	//如果用户的新分数高于原来的最高分，则执行以下步骤
		{
			$sql= "UPDATE `player` SET `score` = \"".$score."\" WHERE `username` = \"".$username."\"";	//更新用户的分数
			$result = mysql_query($sql);
				//获取比用户分数更高的玩家的人数
			$sql_count = "SELECT COUNT(`score`) FROM `player` WHERE `score` > (SELECT `score`  FROM `player`  WHERE `username` = \"".$username."\")";
			$count = mysql_fetch_array(mysql_query($sql_count));
			$new_rank = $count['COUNT(`score`)']+1;		//得到用户的新排名
			if($new_rank < 6 && $_SESSION['ranking'] > $new_rank)	//如果用户的新排名在前五，并且新的排名比原来的排名高，则执行以下步骤
			{				
				for($i = $new_rank; $i < $_SESSION['ranking']; $i++)	//原来排在用户前面，现在分数却比用户低的玩家，排名均往后移一位
				{
					$sql = "SELECT `username` FROM `player` WHERE `ranking` = \"".$i."\"";
					$result = mysql_fetch_array(mysql_query($sql));
					$sql= "UPDATE `player` SET `ranking` = `ranking`+1 WHERE `username` =	\"".$result['username']."\"";
					mysql_query($sql);
				}
				echo "<span>Congrats！您的排名上升至第".$new_rank."位！</span>";
				$sql= "UPDATE `player` SET `ranking` = \"".$new_rank."\" WHERE `username` = \"".$username."\"";	//更新用户的排名
				$result = mysql_query($sql);
				$_SESSION['ranking'] = $new_rank;
			}
			else
			    echo "<span>blank</span>";
		}
		else
		{
			$score = $row['score'];
			echo "<span>blank</span>";
		}
		$_SESSION['score'] = $score;
		echo "<span>Your highest score: ".$score."</span></div>";
	}
	
	function ranking()	//排名 Ranking
	{
		$sql= "SELECT * FROM `player` ORDER BY `score` DESC LIMIT 5";
		$result = mysql_query($sql);
		$i = 0;
		echo "<div>";
		while($row = mysql_fetch_array($result))
		{
			echo "<span>".$row['nickname']."</span><span>".$row['score']."</span>";
			$i ++;
		}
		echo "<span>".$_SESSION['nickname']."</span>";
		echo "</div>";
	}
	
	function check_keyword($string)		//过滤用户昵称中的sql关键词
	{
		$patterns = array();
		$patterns[0] = '/select/i';
		$patterns[1] = '/insert/i';
		$patterns[2] = '/delete/i';
		$patterns[3] = '/update/i';
		$patterns[4] = '/create/i';
		$patterns[5] = '/from/i';
		$patterns[6] = '/where/i';
		$patterns[7] = '/or/i';
		$patterns[8] = '/and/i';
		$patterns[9] = '/null/i';
		
		$replacements = array();
		$replacements[0] = '0select0';
		$replacements[1] = '0insert0';
		$replacements[2] = '0delete0';
		$replacements[3] = '0update0';
		$replacements[4] = '0create0';
		$replacements[5] = '0from0';
		$replacements[6] = '0where0';
		$replacements[7] = '0or0';
		$replacements[8] = '0and0';
		$replacements[9] = '0null0';

		$string = preg_replace($patterns, $replacements, $string);
		return $string;
	}
	
	function recover_keyword($string)		//简单恢复用户昵称中涉及sql关键词的部分
	{
		$patterns = array();
		$patterns[0] = '/0select0/';
		$patterns[1] = '/0insert0/';
		$patterns[2] = '/0delete0/';
		$patterns[3] = '/0update0/';
		$patterns[4] = '/0create0/';
		$patterns[5] = '/0from0/';
		$patterns[6] = '/0where0/';
		$patterns[7] = '/0or0/';
		$patterns[8] = '/0and0/';
		$patterns[9] = '/0null0/';
		
		$replacements = array();
		$replacements[0] = 'select';
		$replacements[1] = 'insert';
		$replacements[2] = 'delete';
		$replacements[3] = 'update';
		$replacements[4] = 'create';
		$replacements[5] = 'from';
		$replacements[6] = 'where';
		$replacements[7] = 'or';
		$replacements[8] = 'and';
		$replacements[9] = 'null';

		$string = preg_replace($patterns, $replacements, $string);
		return $string;
	}
	
	
	function check_username($username)		//检查用户名格式
	{
		$sql= "SELECT * FROM `player` WHERE `username` = \"".$username."\"";
		$result = mysql_query($sql);
		if($row = mysql_fetch_array($result))
		{
			echo "此ID已被注册！请重新填写";
			return false;
		}
		if(!preg_match("/^[\x{4e00}-\x{9fa5}A-Za-z\d]+$/u" , $username))
		{
			echo "您输入的格式不正确！ID只允许中英文,数字";
			return false;
		}
		if(strlen($username) > 12)
		{
			echo "ID须不大于12个字符长度";
			return false;
		}
		return true;
	}
	
	function check_password($password)		//检查密码格式
	{
		if(!preg_match("/^[0-9A-Za-z]+$/" , $password))
		{
			echo "您输入的格式不正确！密码只允许英文,数字";
			return false;
		}
		if(strlen($password) > 12)
		{
			echo "密码须不大于12个字符长度";
			return false;
		}
		return true;
	}
	
	function check_nicknameI($nickname)		//检查昵称格式
	{
		$sql= "SELECT * FROM `player` WHERE `nickname` = \"".$nickname."\"";
		$result = mysql_query($sql);
		if($row = mysql_fetch_array($result))
		{
			echo "此昵称已被注册！请重新填写";
			return false;
		}
		if(strlen($nickname) > 16)
		{
			echo "昵称须不大于16个字符长度（utf-8: 1汉字=3字符）";
			return false;
		}
		return true;
	}
	
	function check_nicknameII($nickname)		//检查昵称格式
	{
		$sql= "SELECT * FROM `player` WHERE `nickname` = \"".$nickname."\"";
		$result = mysql_query($sql);
		if($row = mysql_fetch_array($result))
		{
			echo "<div><span>此昵称已被注册！请重新填写</span></div>";
			return false;
		}
		if(strlen($nickname) > 16)
		{
			echo "<div><span>昵称须不大于16个字符长度（utf-8: 1汉字=3字符）</span></div>";
			return false;
		}
		return true;
	}
	
	
	function modify_nickname($username, $nickname)	//修改昵称
	{
		if ($nickname == "")    
		{
		    echo "<div><span>昵称不能为空！</span></div>";
			return;
		}
		$nickname = check_keyword($nickname);
		if(!check_nicknameII($nickname))
			return;
		$sql= "UPDATE `player` SET `nickname` = \"".$nickname."\" WHERE `username` = \"".$username."\"";
		$result = mysql_query($sql);
		echo "<div><span>更改成功！</span><span>".$nickname."</span></div>";
		$_SESSION['nickname'] = $nickname;
	}

?>