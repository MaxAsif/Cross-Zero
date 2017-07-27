var arr=[["","",""],["","",""],["","",""]];
var prev,item,i,j,target;
function allowDrop(ev) {
    ev.preventDefault();
}
function isEmpty()
{
	for(i=0;i<3;i++)
	{
		for(j=0;j<3;j++)
		{
			if(arr[i][j]=="")
				return true;
		}
	}
	return false;
}
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
	
	item =(JSON.stringify(ev.target.id).charAt(5)=="1")? "X" : "0";
	console.log("item",item);
	if(prev==item)
		alert("Not ur turn");
}

function drop(ev) {
    ev.preventDefault();
	if(isEmpty()==true)
	{
		var data = ev.dataTransfer.getData("text");
		console.log("drop pos",ev.target.id);
		var canvas = document.getElementById(ev.target.id);
		target = JSON.stringify(ev.target.id);
		var x = Number(target.charAt(7));
		var y = Number(target.charAt(8));
		console.log("Target,x,y",target,x,y);
		if(arr[x][y]=="")
		{
			arr[x][y] = item;
			var ctx = canvas.getContext("2d");
			ev.target.appendChild(document.getElementById(data));
			ctx.drawImage(document.getElementById(data),0,0);
			prev = item;
			console.log("previous",prev);
			console.log(arr);
			console.log("update game called with x,y",x,y);
			updategame(x,y);
			
		}
		else
		{
			alert("Already there");
		}
	}
	else
	{
		console.log("Result is a tie");
		alert("Game Over. Its a tie");
		
	}
}
function updategame(x,y)
{
	
	if((arr[x][0]==item)&&(arr[x][1]==item)&&(arr[x][2]==item))
	{
		
		draw("row",x,0);
		//alert("Game Over");
	}
	else if((arr[0][y]==item)&&(arr[1][y]==item)&&(arr[2][y]==item))
	{
		draw("col",0,y);
		//alert("Game Over");
	}
	else if((x+y)%2==0)
	{
		if((arr[0][0]==item)&&(arr[1][1]==item)&&(arr[2][2]==item))
		{
			
			draw("leftdia",0,0);
			//alert("Game Over");
		}	
		else if((arr[0][2]==item)&&(arr[1][1]==item)&&(arr[2][0]==item))
		{
			
			draw("rightdia",0,2);
			//alert("Game Over");
		}	
	}

	if(isEmpty()==false)
	{
		console.log("Game over is empty also called");
		alert("Game over. Its a tie");
		document.getElementById("display").innerHTML="<hr><button onclick='location.reload()'>RESET</button><br><h1> TIE!</h1>";
	}
		
}
function draw(dir,x,y)
{
	if((x<3)&&(x>=0)&&(y>=0)&&(y<3))
	{
		console.log("direction",dir);
		console.log("canvasid",canvas);
		console.log("x,y",x,y);
		var str="canvas"+x+y;
		console.log("str",str);
		if(dir=="col")
		{
			
			var canvas = document.getElementById(str);
			ctx = canvas.getContext("2d")
			ctx.beginPath();
			ctx.moveTo(150,0);
			ctx.lineTo(150,300);
			ctx.lineWidth=5;
			ctx.strokeStyle="green";
			ctx.stroke();
			draw(dir,++x,y);
		}
		if(dir=="row")
		{
			var canvas = document.getElementById(str);
			ctx = canvas.getContext("2d")
			ctx.beginPath();
			ctx.moveTo(0,75);
			ctx.lineTo(300,75);
			ctx.lineWidth=5;
			ctx.strokeStyle="green";
			ctx.stroke();
			draw(dir,x,++y);
		}
		if(dir=="leftdia")
		{
			var canvas = document.getElementById(str);
			ctx = canvas.getContext("2d")
			ctx.beginPath();
			ctx.moveTo(0,0);
			ctx.lineTo(300,150);
			ctx.lineWidth=5;
			ctx.strokeStyle="green";
			ctx.stroke();
			draw(dir,++x,++y);
		}
		if(dir=="rightdia")
		{
			var canvas = document.getElementById(str);
			ctx = canvas.getContext("2d")
			ctx.beginPath();
			ctx.moveTo(0,150);
			ctx.lineTo(300,0);
			ctx.lineWidth=5;
			ctx.strokeStyle="green";
			ctx.stroke();
			draw(dir,++x,--y);
		}
		
	document.getElementById("display").innerHTML="<hr><button onclick='location.reload()'>RESET</button><br><h1>"+item+" WON!</h1>";
	}
	
}
	
	














