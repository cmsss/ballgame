
    var myLogin = new XMLHttpRequest();
	var myScore = new XMLHttpRequest();
	var Register = new XMLHttpRequest();
	var Ishere_ = new XMLHttpRequest();
	var Rank = new XMLHttpRequest();
	var myNewNick = new XMLHttpRequest();
	
	function createLogStr()
	{
	    var name_ = document.getElementById("log_username").value;
		var pass_ = document.getElementById("log_password").value;
		var str = "log_username=" + name_ + "&log_password=" + pass_;
		return str;
	}
	function createRegStr()
	{
	    var name_ = document.getElementById("reg_username").value;
		var pass_ = document.getElementById("reg_password").value;
		var nickname_ = document.getElementById("reg_nickname").value;
		var str = "reg_username=" + name_ + "&reg_password=" + pass_ + "&reg_nickname=" + nickname_;
		return str;
	}
	function logSend()
	{
	    var str = createLogStr();
	    var url = "logback.php";
		myLogin.open("POST", url, true);
		myLogin.setRequestHeader("content-type", "application/x-www-form-urlencoded");
		myLogin.send(str);
		myLogin.onreadystatechange = logFeedback;
	}
	function logFeedback()
	{
	    if (myLogin.readyState == 4)
		    if (myLogin.status == 200)
			{
			    var xml = myLogin.responseXML;
				var messages = xml.getElementsByTagName("span");
				if (messages[0].firstChild.data.indexOf("Welcome") != -1)
				{
				    document.getElementById("welNickname").innerText = messages[1].firstChild.data;
					document.getElementById("welHighestScore").innerText = messages[2].firstChild.data;
					document.getElementById("logAlarm").innerText = "";
					myWelcome();
				}
				else
				    document.getElementById("logAlarm").innerText = messages[1].firstChild.data;
			}
			else
			    document.getElementById("logAlarm").innerText = "登录出现错误! 请刷新或退出页面";
	}
	function scoreSend()
	{
	    if (document.getElementById("welNickname").innerText != "")
		{
	        var str = "score=" + document.getElementById("score").value;
		    var url = "scoreback.php";
			myScore.open("POST", url, true);
			myScore.setRequestHeader("content-type", "application/x-www-form-urlencoded");
			myScore.send(str);
			myScore.onreadystatechange = scoreFeedback;
		}
	}
	function scoreFeedback()
	{
	    if (myScore.readyState == 4)
		    if (myScore.status == 200)
			{
			    var xml = myScore.responseXML;
			    var messages = xml.getElementsByTagName("span");
				document.getElementById("welHighestScore").innerText = messages[1].firstChild.data;
			    document.getElementById("rankingButton").click();    // To refresh the ranking
			    if (messages[0].firstChild.data.indexOf("Congrats") != -1)
				{
					document.getElementById("congratsAlarm").innerText = messages[0].firstChild.data;
					document.getElementById("starFallButton").click();    //star fall
					document.getElementById("congratsList").className = "dropSub";
					function tmp()
					{
				        document.getElementById("congratsList").className = "closeSub";
					    document.getElementById("congratsAlarm").innerText = "";
				    }
				    setTimeout(tmp, 7000);
				}
			}
			else
		        document.getElementById("welHighestScore").innerText = "failure!";
	}
	function regSend()
	{
	    var str = createRegStr();
		var url = "regback.php";
		Register.open("POST", url, true);
		Register.setRequestHeader("content-type", "application/x-www-form-urlencoded");
		Register.send(str);
		Register.onreadystatechange = regFeedback;
	}
	function regFeedback()
	{
	    if (Register.readyState == 4)
		    if (Register.status == 200)
			{
			    var responseStr = Register.responseText;
				document.getElementById("regAlarm").innerText = responseStr;
				function tmp()
				{
				    document.getElementById("regList").className = "closeSub";
					document.getElementById("regAlarm").innerText = "";
				}
				if (responseStr.indexOf("注册成功") != -1)    //if registered successfully 
				    setTimeout(tmp, 1700);
			}
			else
			    document.getElementById("regAlarm").innerText = "注册出现错误! 请刷新或退出页面";
	}
	function ishereSend()
	{
	    var url = "ishereback.php";
		Ishere_.open("POST", url, true);
		Ishere_.setRequestHeader("content-type", "application/x-www-form-urlencoded");
		Ishere_.send(null);
		Ishere_.onreadystatechange = ishereFeedback;
	}
	function ishereFeedback()
	{
	    if (Ishere_.readyState == 4)
		    if (Ishere_.status == 200)
			{
			    var xml = Ishere_.responseXML;
				var messages = xml.getElementsByTagName("span");
				if (messages[0].firstChild.data.indexOf("ishere") != -1)
				{
				    document.getElementById("myLogin").className = "hideSth";
					document.getElementById("welcomeList").style.display = "block";
				    document.getElementById("welNickname").innerText = messages[1].firstChild.data;
					document.getElementById("welHighestScore").innerText = messages[2].firstChild.data;
				}
				else
				    document.getElementById("myLogin").className = "showSth";
			}
	}
	function rankingSend()
	{
	    var url = "rankingback.php";
		Rank.open("POST", url, true);
		Rank.setRequestHeader("content-type", "application/x-www-form-urlencoded");
		Rank.send(null);
		Rank.onreadystatechange = rankingFeedback;
	}
	function rankingFeedback()
	{
	    var i = 0;
	    if (Rank.readyState == 4)
		    if (Rank.status == 200)
			{
			    var xml = Rank.responseXML;
				var messages = xml.getElementsByTagName("span");
				document.getElementById("sunName").value = messages[0].firstChild.data;
				document.getElementById("moonName").value = messages[2].firstChild.data;
				document.getElementById("starName").value = messages[4].firstChild.data;
				document.getElementById("ghostName1").value = messages[6].firstChild.data;
				document.getElementById("ghostName2").value = messages[8].firstChild.data;
				
				document.getElementById("sunScore").value = messages[1].firstChild.data;
				document.getElementById("moonScore").value = messages[3].firstChild.data;
				document.getElementById("starScore").value = messages[5].firstChild.data;
				document.getElementById("ghostScore1").value = messages[7].firstChild.data;
				document.getElementById("ghostScore2").value = messages[9].firstChild.data;
			}
	}
	function newnickSend()
	{
	    var str = "newnick=" + document.getElementById("new_nickname").value;
		var url = "newnickback.php";
		myNewNick.open("POST", url, true);
		myNewNick.setRequestHeader("content-type", "application/x-www-form-urlencoded");
		myNewNick.send(str);
		myNewNick.onreadystatechange = newnickFeedback;
	}
	function newnickFeedback()
	{
	    if (myNewNick.readyState == 4)
		    if (myNewNick.status == 200)
			{
			    var xml = myNewNick.responseXML;
				var messages = xml.getElementsByTagName("span");
				document.getElementById("newnickAlarm").innerText = messages[0].firstChild.data;
				function tmp()
				{
				    document.getElementById("changeNickname").className = "closeSub";
					document.getElementById("newnickAlarm").innerText = "";
					document.getElementById("welNickname").innerText = messages[1].firstChild.data;
				}
				if (messages[0].firstChild.data.indexOf("更改成功") != -1)    //if registered successfully
				    setTimeout(tmp, 1700);
			}
			else
			    document.getElementById("newnickAlarm").innerText = "更改昵称过程发生错误! 请刷新或退出页面";
	}