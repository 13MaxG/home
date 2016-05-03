
var fibonacciWords = new Array(21);
fibonacciWords[0] = "a";
fibonacciWords[1] = "ab";
for(var i = 2; i < 21; i++)
{
	fibonacciWords[i] = fibonacciWords[i-1] + fibonacciWords[i-2];
}


var walk = new Processing.Sketch();
walk.attachFunction = function(processing) {
	var width = 500;
	var height = 500;
	var fib = 12;



	
	var helpers = true;
	var kolorki = false;
	processing.setup = function() {
		processing.size(width, height); 

		processing.background(255);
		
				
		
		processing.noLoop();
		
			var font = processing.loadFont("./FreeMono.ttf"); 
processing.textFont(font); 
	}
		
	var dAleft = Math.PI / 2.0;
	var dAright = Math.PI / 2.0;
	var Rleft = 20;
	var Rright = 20;
	processing.draw = function() 
	{
		processing.background(255);
		processing.fill(255);
	
			
		var x = width/2;
		var y = height/2;
		var a = -Math.PI/2;
		
		var word = fibonacciWords[fib];//"abaababaabaab";
		
		
		for(var i = 0; i < word.length; i++)
		{
			if(word[i] == "a")
			{
				a -= dAleft
				r = Rleft;
			}
			else 
			{
				a += dAright;
				r = Rright;
			}
				
		

			var nx = x + Math.cos(a) * r;
			var ny = y + Math.sin(a) * r;

			processing.line(x, y, nx, ny);
			
			x = nx;
			y = ny;
		}	
		
		processing.fill(50);
				processing.rect(1, 1, 75, 69);
				processing.fill(255);
				
		processing.text( "a = " + dAleft.toFixed(2).toString() , 5, 12);
				processing.text( "b = " + dAright.toFixed(2).toString() , 5, 26);
				processing.text( "c = " + Rleft.toFixed(2).toString() , 5, 40);
				processing.text( "d = " + Rright.toFixed(2).toString() , 5, 54);
				processing.text( "n = " + fib.toString() , 5, 68);

	}
	

	processing.mousePressed = function()
	{
		
	}
	processing.mouseMoved = function() 
	{
		
	}
	processing.mouseDragged = function() 
	{
		if(processing.mouseButton == processing.LEFT)
		{
			dAleft += (processing.mouseX - processing.pmouseX) / width * Math.PI / 100;
			dAright += (processing.mouseY - processing.pmouseY) / height * Math.PI / 100;
		
		}
		if(processing.mouseButton == processing.RIGHT)
		{
			Rleft += (processing.mouseX - processing.pmouseX) / width * 100;
			Rright += (processing.mouseY - processing.pmouseY) / height *100;
		
		}
		
		
	}
	processing.mouseReleased = function()
	{
		
	}
	
	processing.keyReleased = function()
	{	
		if (processing.keyCode == 32)
		{
			 dAleft = Math.PI / 2.0;
		 	dAright = Math.PI / 2.0;
		 	Rleft = 20;
		 	Rright = 20;
		}
		if (processing.keyCode == 65)
		{
			if(fib < 15) fib++;
		}
		if (processing.keyCode == 90)
		{
			if(fib >0) fib--;
		}
	}
	
	processing.mouseOver = function()
	{
		processing.loop();
	}
	processing.mouseOut= function()
	{
		processing.noLoop();
	}
								
}
