		var obj2;
		var con2;
		var BallX, BallY, AddX, AddY, func, funcTime;
		var mouseX2, oldTime, diffsec, totalsec;
		var offleft, flag = 0, speedLevel = 0;
		var BallX2, BallY2, AddX2, AddY2;
		
		function start_()    //start the game
		{			
		    obj2 = document.getElementById("myCan");
			con2 = obj2.getContext("2d");
		    BallX = Math.random() * obj2.width;    //Ball 1
			BallY = Math.random() * (obj2.height - 150);
			while (BallY < 15)    //To avoid the Ball being too closed to the ceiling that will cause a bug
			    BallY = Math.random() * (obj2.height - 150);
			while (BallX < 15 || BallX > 765)
			    BallX = Math.random() * obj2.width;
			AddX = AddY = 2.1;    //the step of the ball
			
			BallX2 = Math.random() * obj2.width;    //Ball 2
			BallY2 = Math.random() * (obj2.height - 150);
			while (BallY2 < 15)    //To avoid the Ball being too closed to the ceiling that will cause a bug
			    BallY2 = Math.random() * (obj2.height - 150);
			while (BallX2 < 15 || BallX2 > 765)
			    BallX2 = Math.random() * obj2.width;
			AddX2 = AddY2 = -2;    //the step of the ball
			
			document.getElementById("myBtn").disabled = "disabled";    //disable the start button
			document.getElementById("myBtn").className = "dispress";    //set the button's style
			flag = 1;
			speedLevel = 0;
			diffsec = 0;
			totalsec = 0;
			
			func = setInterval(drawBall, 10);    //every 3ms draw the ball again
			funcTime = setInterval(addTime, 1000);
		}
		function addTime()
		{
		    totalsec += 1000;
		}
		
		function drawBall()
		{
		    offleft = obj2.offsetLeft;	
		    obj2 = document.getElementById("myCan");
		    con2 = document.getElementById("myCan").getContext("2d");
		    con2.clearRect(0, 0, obj2.width, obj2.height);    //clear the canvas
			con2.save();
			
			con2.save();    //draw the game's frame
			con2.beginPath();
			con2.rect(0, 0, obj2.width, obj2.height);    //frame's area
			var g = con2.createRadialGradient(430, 150, 0, 430, 150, 300);
			g.addColorStop(0.1, "#ffffff");
			g.addColorStop(1, "#fcfabb");
			con2.fillStyle = g;    //frame's background color
			con2.fill();
			con2.closePath();
			con2.restore();
			
			con2.save();    //draw the ball 1
			con2.beginPath();
			var g1 = con2.createRadialGradient(BallX, BallY, 0, BallX, BallY, 9);    //the ball's color
			g1.addColorStop(0.1, "rgba(150, 30, 75, 0.5)");
			g1.addColorStop(1, "rgba(150, 30, 75, 1)");
			con2.arc(BallX, BallY, 9, 0, Math.PI * 2, false);    //draw ball
			con2.fillStyle = g1;
			con2.fill();
			con2.closePath();
			con2.restore();
			
			con2.save();    //draw the ball 2
			con2.beginPath();
			var g4 = con2.createRadialGradient(BallX2, BallY2, 0, BallX2, BallY2, 9);    //the ball's color
			g4.addColorStop(0.1, "rgba(240, 205, 155, 0.8)");
			g4.addColorStop(1, "rgba(205, 130, 10, 1)");
			con2.arc(BallX2, BallY2, 9, 0, Math.PI * 2, false);    //draw ball
			con2.fillStyle = g4;
			con2.fill();
			con2.closePath();
			con2.restore();
			
			con2.save();    //draw the pad
			con2.beginPath();
			con2.rect(mouseX2 - offleft - 30, 310, 70, 10);    //pad's area
			var g2 = con2.createLinearGradient(mouseX2 - offleft - 30, 310, mouseX2 - offleft - 30, 320);
			g2.addColorStop(0, "red");    //pad's color
			g2.addColorStop(0.5, "rgba(255, 0, 0, 0.5)");
			g2.addColorStop(1, "red");
			con2.fillStyle = g2;
			con2.fill();
			con2.closePath();
			con2.restore();
			
			BallX += AddX;
			BallY += AddY;
			if (BallX <= 11 || BallX >= obj2.width - 11)
				AddX = -AddX;
			if (BallY <= 11)
				AddY = -AddY;
			if (BallX >= mouseX2 - 30 - offleft - 8 && BallX <= mouseX2 + 40 - offleft + 8)
			    if (BallY >= 310 - 7 - speedLevel * 0.1 && BallY < 310 - 4)
				    AddY = -AddY;
			
			BallX2 += AddX2;
			BallY2 += AddY2;
			if (BallX2 <= 11 || BallX2 >= obj2.width - 11)
				AddX2 = -AddX2;
			if (BallY2 <= 11)
				AddY2 = -AddY2;
			if (BallX2 >= mouseX2 - 30 - offleft - 8 && BallX2 <= mouseX2 + 40 - offleft + 8)
			    if (BallY2 >= 310 - 7 - speedLevel * 0.1 && BallY2 < 310 - 4)
				    AddY2 = -AddY2;
			
			if (BallY >= obj2.height - 10 || BallY2 >= obj2.height - 10)
			{
			    gameOver();
			}
			
			con2.restore();
			
			speedUp();    //speed up
			
			diffsec = Math.floor(totalsec / 1000);    //show the time counter
			var h = Math.floor(diffsec / 3600);
			var m = Math.floor((diffsec - h * 3600) / 60);
			var s = Math.floor(diffsec - h * 3600 - m * 60);
		    document.getElementById("H").value = h;
			document.getElementById("M").value = m;
			document.getElementById("S").value = s;
			
			if (document.getElementById("H").value.length == 1)
			    document.getElementById("H").value = "0" + h;
			if (document.getElementById("M").value.length == 1)
			    document.getElementById("M").value = "0" + m;
			if (document.getElementById("S").value.length == 1)
			    document.getElementById("S").value = "0" + s;
		}
		function hit(evt)    //get the mouse's coordinates in the canvas
		{
			obj2 = document.getElementById("myCan");
			con2 = obj2.getContext("2d");
			mouseX2 = evt.pageX;
			if (evt.pageX >= obj2.width - 40 + offleft)
			    mouseX2 = obj2.width - 40 + offleft - 3;
			if (evt.pageX <= 30 + offleft)
			    mouseX2 = 30 + offleft + 3;
		}
		function gameOver()
		{
			con2.save();
			con2.textAlign = "left";    //the Game canvas show "Game Over"
			con2.textBaseline = "bottom";
			con2.font = "70px Ske";
			con2.strokeStyle = "#ea2b2b";
			con2.strokeText("Game Over", 200, 200, 400);
			con2.restore();
				
			clearInterval(func);    //stop the ball jumping
			clearInterval(funcTime);
			document.getElementById("myBtn").disabled = "";    //enable the start button
			document.getElementById("myBtn").className = "enpress";
			flag = 0;
			document.getElementById("score").value = totalsec;
			if (document.getElementById("welNickname").innerText != "")
			    document.getElementById("score_submit").click();    //send the score
		}
		function offFocus()
		{
		    if (flag == 1)
			    gameOver();
		}
		function speedUp()
		{
		    if (!speedLevel && diffsec >= 11 && diffsec <= 20)
			{
			    if (AddX > 0) AddX += 0.2;
				else AddX -= 0.2;
				if (AddY > 0) AddY += 0.3;
				else AddY -= 0.3;
				
				if (AddX2 > 0) AddX2 += 0.2;
				else AddX2 -= 0.2;
				if (AddY2 > 0) AddY2 += 0.3;
				else AddY2 -= 0.3;
				speedLevel = 1;
			}
			if (speedLevel == 1 && diffsec > 20 && diffsec <= 30)
			{
			    if (AddX > 0) AddX += 0.3;
				else AddX -= 0.3;
				if (AddY > 0) AddY += 0.2;
				else AddY -= 0.2;
				
				if (AddX2 > 0) AddX2 += 0.3;
				else AddX2 -= 0.3;
				if (AddY2 > 0) AddY2 += 0.2;
				else AddY2 -= 0.2;
				speedLevel = 2;
			}
			if (speedLevel == 2 && diffsec > 30 && diffsec <= 45)
			{
			    if (AddX > 0) AddX += 0.2;
				else AddX -= 0.2;
				if (AddY > 0) AddY += 0.3;
				else AddY -= 0.3;
				
				if (AddX2 > 0) AddX2 += 0.2;
				else AddX2 -= 0.2;
				if (AddY2 > 0) AddY2 += 0.3;
				else AddY2 -= 0.3;
				speedLevel = 3;
			}
			if (speedLevel == 3 && diffsec > 45 && diffsec <= 60)
			{
			    if (AddX > 0) AddX += 0.3;
				else AddX -= 0.3;
				if (AddY > 0) AddY += 0.2;
				else AddY -= 0.2;
				
				if (AddX2 > 0) AddX2 += 0.3;
				else AddX2 -= 0.3;
				if (AddY2 > 0) AddY2 += 0.2;
				else AddY2 -= 0.2;
				speedLevel = 4;
			}
			if (speedLevel == 4 && diffsec > 60 && diffsec < 75)
			{
			    if (AddX > 0) AddX += 0.2;
				else AddX -= 0.2;
				if (AddY > 0) AddY += 0.3;
				else AddY -= 0.3;
				
				if (AddX2 > 0) AddX2 += 0.2;
				else AddX2 -= 0.2;
				if (AddY2 > 0) AddY2 += 0.3;
				else AddY2 -= 0.3;
				speedLevel = 5;
			}
			if (speedLevel == 5 && diffsec >= 75 && diffsec < 90)
			{
			    if (AddX > 0) AddX += 0.3;
				else AddX -= 0.3;
				if (AddY > 0) AddY += 0.2;
				else AddY -= 0.2;
				
				if (AddX2 > 0) AddX2 += 0.3;
				else AddX2 -= 0.3;
				if (AddY2 > 0) AddY2 += 0.2;
				else AddY2 -= 0.2;
				speedLevel = 6;
			}
			if (speedLevel == 6 && diffsec >= 90 && diffsec < 110)
			{
			    if (AddX > 0) AddX += 0.2;
				else AddX -= 0.2;
				if (AddY > 0) AddY += 0.3;
				else AddY -= 0.3;
				
				if (AddX2 > 0) AddX2 += 0.2;
				else AddX2 -= 0.2;
				if (AddY2 > 0) AddY2 += 0.3;
				else AddY2 -= 0.3;
				speedLevel = 7;
			}
			if (speedLevel == 7 && diffsec >= 115)
			{
			    if (AddX > 0) AddX += 0.3;
				else AddX -= 0.3;
				if (AddY > 0) AddY += 0.2;
				else AddY -= 0.2;
				
				if (AddX2 > 0) AddX2 += 0.3;
				else AddX2 -= 0.3;
				if (AddY2 > 0) AddY2 += 0.2;
				else AddY2 -= 0.2;
				speedLevel = 8;
			}
		}
		    