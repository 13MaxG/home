
var bezier6 = new Processing.Sketch();
bezier6.attachFunction = function(processing) {
	var width = 500;
	var height = 500;
	
	var tArg = 0;
	
	var N = 7;
	var points;
	
	var dragId = -1;
	
	function Point(X, Y)
	{
		this.x = X;
		this.y = Y;
	}
	var bezier = function(a, b, c, d, t)
{
	return (1-t)*(1-t)*(1-t) * a + 3 * (1-t)*(1-t)*t * b + 3 *  (1-t) * t*t * c + t*t*t*d;
}
	
	var generatePoints = function()
	{
		points = new Array(N);
		for(var i = 0; i < N; i++)
			points[i] = new Point(0.25 + Math.random()/2, 0.25+Math.random()/2);
			
		for(var i = 3; i < N; i+=3)
		{
			if(i+1 < N)
			{
			points[i-1].x =  points[i].x - (points[i].x - points[i+1].x);
			points[i-1].y =  points[i].y - (points[i].y - points[i+1].y);
			}
		}
	}
	
var dragId = -1;
	var superDrag = false;
	var dragTransform = new Point(0, 0);
	var dragLen = 0;
	
	var helpers = true
	processing.setup = function() {
		generatePoints();
		processing.size(width, height); 

		processing.frameRate(24);
		processing.background(255);
		
				
		var font = processing.loadFont("FreeMono.ttf"); 
		processing.textFont(font);
		
		processing.noLoop();
	}
		
	processing.draw = function() 
	{
		processing.background(255);
		
		var cur = new Point(0, 0), prev = new Point(0, 0);
		
	
		
		processing.fill(255);
		
		processing.strokeWeight(1);
		
		
		
		for(var m = 0; m < (N - 1)/3; m++)
		{
				
			for(var arg = 0; arg <=1; arg+=0.001)
			{
			
				cur.x = bezier(points[3*m+0].x,points[3*m+1].x,points[3*m+2].x,points[3*m+3].x, arg) ;
				cur.y = bezier(points[3*m+0].y,points[3*m+1].y,points[3*m+2].y,points[3*m+3].y, arg) ;
			
				if(arg != 0)
				{
					processing.stroke(255, 0, 0);
					processing.line(prev.x * width, prev.y  * height, cur.x * width, cur.y * height);
					
				}
				prev.x = cur.x;
				prev.y = cur.y;
		
			}
		
			if(arg==0) 
			{
				cur.x = points[0].x;
				cur.y = points[0].y;
			}
			processing.ellipse(cur.x * width, cur.y * height, 3, 3);
		
		
		}
		
		if(helpers)
		for(var i = 0; i < N; i++)
		{
			
			cur.x = points[i].x;
			cur.y = points[i].y;
			if(i != 0)
				processing.line(prev.x * width, prev.y  * height, cur.x * width, cur.y * height);
			processing.stroke(0, 0, 0);
			processing.ellipse(points[i].x * width, points[i].y * height, 6, 6);
			prev.x = cur.x;
			prev.y = cur.y;
		}
				
	}
	
	var epsilon = 3;
	processing.mousePressed = function()
	{
		if(superDrag)
		{
			dragId = -1;
			superDrag = false;
			return;
		}

			var found = false;
		for(var i = 0; i < N; i++)
		{
			var x = points[i].x * width;
			var y = points[i].y * height;
			if(processing.mouseY < y + epsilon && processing.mouseY > y - epsilon &&
			processing.mouseX < x + epsilon && processing.mouseX > x - epsilon)
			{
			
				if(dragId == i)
				{
					dragId = -1;
					break;
				}
				dragId = i;
				found = true;
				break;
			}
		}
		if(found == false)
			dragId = -1;
	}
	processing.mouseMoved = function() 
	{
		if(dragId != -1)
		{

			if(dragId  %3 == 1 && dragId != 0)
			{
				
				points[dragId].x = processing.mouseX / width;
				points[dragId].y = processing.mouseY / height;
				
				var len = Math.sqrt( (points[dragId-2].x - points[dragId-1].x)*(points[dragId-2].x - points[dragId-1].x) +  (points[dragId-2].y - points[dragId-1].y)*(points[dragId-2].y - points[dragId-1].y) ) ;
				
				points[dragId-2].x = points[dragId-1].x - (points[dragId].x- points[dragId-1].x)/(points[dragId].y- points[dragId-1].y) * len;
				points[dragId-2].y = points[dragId-1].y - (points[dragId].y- points[dragId-1].y)/(points[dragId].yx- points[dragId-1].x) * len;
				
			} else
			if(dragId %3 == 2 && dragId != 0)
			{
				
				points[dragId].x = processing.mouseX / width;
				points[dragId].y = processing.mouseY / height;
			} else
			{
				points[dragId].x = processing.mouseX / width;
				points[dragId].y = processing.mouseY / height;
			}
		} 
		//else
		//{
			tArg = processing.mouseX / width;
			if(tArg < 0) tArg = 0;
			if(tArg > 1) tArg = 1;
	}
	processing.mouseDragged = function() 
	{
		
		
		
	}
	processing.mouseReleased = function()
	{
		
	}
	
	processing.keyReleased = function()
	{	
		if (processing.keyCode == 65)
		{
			helpers = !helpers;
		}
		if (processing.keyCode == 90)
		{
			N+=3;
			generatePoints();
		}
		if (processing.keyCode == 88)
		{
			N-=3;
			if(N < 4) N = 4;
			generatePoints();
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
