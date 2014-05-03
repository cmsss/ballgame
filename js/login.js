
		function myLog()
		{
		    var Elem = document.getElementById("logList");
			if (Elem.className != "dropSub")
			    Elem.className = "dropSub";
			if (document.getElementById("regList").className == "dropSub")
			    document.getElementById("regList").className = "closeSub";
		}
		function myReg()
		{
		    var Elem = document.getElementById("regList");
			if (Elem.className != "dropSub")
			    Elem.className = "dropSub";
			if (document.getElementById("logList").className == "dropSub")
			    document.getElementById("logList").className = "closeSub";
		}
		function myPass()
		{
			document.getElementById("myLogin").className = "closeLog";
			if (document.getElementById("regList").className == "dropSub")
			    document.getElementById("regList").className = "closeSub";
			if (document.getElementById("logList").className == "dropSub")
			    document.getElementById("logList").className = "closeSub";
		}
		function myWelcome()
		{
		    var Elem = document.getElementById("welcomeList");
		    if (Elem.className != "dropWelcome")
			    Elem.className = "dropWelcome";
			myPass();
		}
		function callNewNick()
		{
		    var Elem = document.getElementById("changeNickname");
			if (Elem.className != "dropSub")
			    Elem.className = "dropSub";
			else
			    Elem.className = "closeSub";
		}