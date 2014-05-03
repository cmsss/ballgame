		var obj, con, mouseX, mouseY, i;
		var objFoot, conFoot;
		var num = Math.floor(Math.random() * 11) + 11;
		var num2 = 5;
		var circles = new Array();
		var circlesII = new Array();
		function init()
		{
		    document.getElementById("ishereButton").click();    //To see if someone had logged in, trigger the function ishereSend() in allAjax.js
			document.getElementById("rankingButton").click();    //To get the ranking
			hideStar();
			starInit();    //invoke the starInit() function to initialize the stars 
			
		    obj = document.getElementById("myCanvas");    //initialize the top canvas
			con = obj.getContext("2d");
			for (i = 0; i < num; i++)
			{
			    circles[i] = 
				{
				     x : Math.floor(Math.random() * obj.width),
					 y : Math.floor(Math.random() * obj.height),
					 r : Math.random() * 70 + 5
				}
			}
			draw(con, circles, num);
			obj.addEventListener("mousemove", updateXY, true);
			
			objFoot = document.getElementById("myFoot");    //initialize the foot canvas
			conFoot = objFoot.getContext("2d");
			for (i = 0; i < num2; i++)
			{
			    circlesII[i] = 
				{
				    x : Math.floor(Math.random() * objFoot.width),
					y : Math.floor(Math.random() * objFoot.height),
					r : Math.floor(Math.random() * 50) + 5
				}
			}
			draw(conFoot, circlesII, num2);
			objFoot.addEventListener("mousemove", updateXY2, true);
			
			obj2 = document.getElementById("myCan");    //the initial of the game canvas
		    con2 = obj2.getContext("2d");
		    con2.clearRect(0, 0, obj2.width, obj2.height);    //clear the canvas
			con2.save();    //draw the game's frame
			con2.beginPath();
			con2.rect(0, 0, obj2.width, obj2.height);    //frame's area
			var g = con2.createRadialGradient(430, 150, 0, 430, 150, 300);
			g.addColorStop(0.1, "#ffffff");
			g.addColorStop(1, "#fcfabb");
			con2.fillStyle = g;    //frame's background color
			con2.strokeStyle = "#fcfabb";    //frame's border color
			con2.lineWidth = "5";    //border weight
			con2.fill();
			con2.stroke();
			con2.closePath();
			con2.restore();
			
			window.document.onmousemove = hit;
		}
		
		function draw(conElem, circle, sum)
		{
		    conElem.save();
			conElem.fillStyle = "rgba(252, 207, 252, 0.7)";    //the top canvas's background color
			conElem.fillRect(0, 0, obj.width, obj.height);
			for (i = 0; i < sum; i++)
			{
			    conElem.beginPath();
			    conElem.arc(circle[i].x, circle[i].y, circle[i].r, 0, Math.PI * 2, false);
				conElem.fillStyle = "rgba(51, 0, 0, 0.6)";    //the circles' color
				if (conElem.isPointInPath(mouseX, mouseY))
				    conElem.fillStyle = "rgba(51, 0, 0, 0.2)"    //the hovered circles' color
                conElem.fill();
				conElem.closePath();
			}
			conElem.restore();
			
			if (conElem == conFoot)
			{
			    conElem.save();
				conElem.fillStyle = "#636363";    //the foot canvas's words color
				conElem.font = "17px Verdana";
				conElem.textAlign = "left";
				conElem.fillText("©2014 Cmss & Mp. All rights reserved.", 370, 50, 500);
				conElem.restore();
			}
		}
		function updateXY(evt)
		{
		    mouseX = evt.pageX - obj.offsetLeft;
			mouseY = evt.pageY - obj.offsetTop;
			con.clearRect(0, 0, obj.width, obj.height);
			draw(con, circles, num);
        }
		function updateXY2(evt)
		{
		    mouseX = evt.pageX - objFoot.offsetLeft;
			mouseY = evt.pageY - objFoot.offsetTop;
			conFoot.clearRect(0, 0, objFoot.width, objFoot.height);
			draw(conFoot, circlesII, num2);
		}
		
		var starNum = 51;    //the number of stars
        var starSize_max = 50;    // the max size of the star
        var starStepY = new Array();    //the step of the star
        function starInit()
        {
            var top_ = document.body.scrollTop;
            var i = 0;
            for (i = 0; i < starNum; i++)
            {
                var str = "star" + i;
                starStepY[i] = 5 + Math.random() * 25;
                var colorStr = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")";
                document.getElementById(str).style.pixelTop = top_ + Math.random() * 500;
                document.getElementById(str).style.pixelLeft = Math.random() * (document.body.clientWidth - 70)
                document.getElementById(str).style.fontSize = 10 + Math.random() * starSize_max + "px";
                document.getElementById(str).style.color = colorStr;
            }
        }
        function starFall()
        {
            var i = 0;
            for (i = 0; i < starNum; i++)
            {
                var str = "star" + i;
                document.getElementById(str).style.pixelTop += starStepY[i];
                if (document.getElementById(str).style.pixelTop > document.body.offsetHeight - 500)
                    document.getElementById(str).style.pixelTop = document.body.scrollTop;
            }
        }
        function showStar()
        {
            starInterval = setInterval(starFall, 50);
			setTimeout(deleteStar, 7000);
			seeStar();
        }
		function deleteStar()
		{
		    clearInterval(starInterval);
			hideStar();
		}
		
		function hideStar()
        {
            var i = 0;
            for (i = 0; i < starNum; i++)
            {
                var str = "star" + i;
                document.getElementById(str).style.visibility = "hidden";
            }
        }
        function seeStar()
        {
            var i = 0;
            for (i = 0; i < starNum; i++)
            {
                var str = "star" + i;
                document.getElementById(str).style.visibility = "visible";
            }
        }
		var musicState = "on";
		function switchMusic()
		{
		    if (musicState == "on")
			{
		        document.getElementById("bgMusic").pause();
				musicState = "off";
				document.getElementById("musicImg").src = "img/musicOff.png";
			}
			else
			{
			    document.getElementById("bgMusic").play();
				musicState = "on";
				document.getElementById("musicImg").src = "img/musicOn.png";
			}
		}
		