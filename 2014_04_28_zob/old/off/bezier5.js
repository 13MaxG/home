
var bezier5 = new Processing.Sketch();
bezier5.attachFunction = function(processing) {
	var width = 500;
	var height = 500;
	
	var tArg = 0;
	
	var N = 6;
	var points;
	
	var dragId = -1;
	
	function Point(X, Y)
	{
		this.x = X;
		this.y = Y;
	}
	var bezier = function(a, b, d, e, t)
{
	var c =  d - (e - d);
	return (1-t)*(1-t)*(1-t) * a + 3 * (1-t)*(1-t)*t * b + 3 *  (1-t) * t*t * c + t*t*t*d;
}
	
	var generatePoints = function()
	{
		points = new Array(N);
		for(var i = 0; i < N; i++)
			points[i] = new Point(0.25 + Math.random()/2, 0.25+Math.random()/2);
	}
	
var dragId = -1;
	var superDrag = false;
	var dragTransform = new Point(0, 0);

	
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
		
		
		
		var queue = new Queue();
		
		
		
		
		processing.fill(255);
		
		processing.strokeWeight(1);
		
		
		
		for(var m = 0; m <= (N - 4)/2; m++)
		{
			var space = 1 / ((N - 4)/2+1);
			var argSpace = (m+1) / ((N - 4)/2+1);
			var cap = tArg;
			if(tArg > argSpace)
				cap = 1;
				
			else
			if(argSpace - space <= tArg && tArg <= argSpace)
			{
				
				cap = (tArg - (argSpace - space) ) /space
			} else
				cap = 0;
				
			for(var arg = 0; arg < cap; arg+=0.001)
			{
			
				cur.x = bezier(points[2*m+0].x,points[2*m+1].x,points[2*m+2].x,points[2*m+3].x, arg) ;
					cur.y = bezier(points[2*m+0].y,points[2*m+1].y,points[2*m+2].y,points[2*m+3].y, arg) ;
			
				if(arg != 0)
				{
					processing.stroke(255, 0, 0);
					processing.line(prev.x * width, prev.y  * height, cur.x * width, cur.y * height);
					
				}
				prev.x = cur.x;
				prev.y = cur.y;
		
			}
		
			if(cap==0) 
			{
				cur.x = points[0].x;
				cur.y = points[0].y;
			}
			processing.ellipse(cur.x * width, cur.y * height, 3, 3);
			processing.stroke(0, 0, 0);
			
			processing.strokeWeight(1);
			for(var arg = cap; arg < 1; arg+=0.001)
			{
			
				cur.x = bezier(points[2*m+0].x,points[2*m+1].x,points[2*m+2].x,points[2*m+3].x, arg) ;
					cur.y = bezier(points[2*m+0].y,points[2*m+1].y,points[2*m+2].y,points[2*m+3].y, arg) ;
			
				if(arg != 0)
				{
					processing.stroke(0, 0, 0);
					processing.line(prev.x * width, prev.y  * height, cur.x * width, cur.y * height);
					
				}
				prev.x = cur.x;
				prev.y = cur.y;
		
			}
		
		}
		
		
		for(var i = 0; i < N; i++)
		{
			if(i % 2 == 0 && i != 0 && i+1 != N)
			{
				processing.stroke(127, 127, 127);
				cur.x = points[i].x - (points[i+1].x - points[i].x);
				cur.y = points[i].y - (points[i+1].y - points[i].y);
				processing.ellipse(cur.x * width, cur.y * height, 6, 6);
				
				if(i != 0)
					processing.line(prev.x * width, prev.y  * height, cur.x * width, cur.y * height);
			
				prev.x = cur.x;
				prev.y = cur.y;
			} else processing.stroke(0, 0, 0);
			
			
			
			cur.x = points[i].x;
			cur.y = points[i].y;
			if(i != 0)
				processing.line(prev.x * width, prev.y  * height, cur.x * width, cur.y * height);
			processing.stroke(0, 0, 0);
			processing.ellipse(points[i].x * width, points[i].y * height, 6, 6);
			prev.x = cur.x;
			prev.y = cur.y;
		}
				
		processing.textSize(14);
		processing.fill(0);
		processing.text("Ilość punktów danych: " + N.toString() , 10,10, 200,30);
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
					dragTransform.x = 0;
					dragTransform.y = 0;
					superDrag = false;
					break;
				}
				dragId = i;
				if(i % 2 == 0 && i != 0 && i+1 != N)
				{
					dragTransform.x = ((points[dragId+1].x - points[dragId].x));
					dragTransform.y = ( (points[dragId+1].y - points[dragId].y));
				} else
				{
				dragTransform.x = 0;
				dragTransform.y = 0;
				}
				superDrag = false;
				found = true;
				break;
			} else
			
			if(i % 2 == 0 && i != 0 && i+1 != N)
			{
				x = (points[i].x - (points[i+1].x - points[i].x))*width;
				y = (points[i].y - (points[i+1].y - points[i].y))*height;
				if(processing.mouseY < y + epsilon && processing.mouseY > y - epsilon &&
				processing.mouseX < x + epsilon && processing.mouseX > x - epsilon)
				{
			
					if(dragId == i || superDrag == true)
					{
						dragId = -1;
						dragTransform.x = 0;dragTransform.y = 0;
						superDrag = false;
						found = false;
						break;
					}
					dragId = i+1;
					//dragTransform.x = (- (points[i+1].x - points[i].x))*width;
					//dragTransform.y = ( -(points[i+1].y - points[i].y))*height;
					found = true;
					superDrag = true;
					break;
				} else {dragTransform.x = 0;dragTransform.y = 0;superDrag = false;
				}
			} else {dragTransform.x = 0;dragTransform.y = 0;superDrag = false;}
			
		}
		
		if(found == false)
			dragId = -1;
	}
	processing.mouseMoved = function() 
	{
		if(dragId != -1)
		{
			if(superDrag)
			{
				points[dragId].x = points[dragId-1].x- ((processing.mouseX ) / width - points[dragId-1].x);
				points[dragId].y = points[dragId-1].y - ((processing.mouseY )/ height - points[dragId-1].y);
			} else
			{
				if(dragId % 2 == 0 && dragId != 0 && dragId+1 != N)
				{
					
					points[dragId].x = (processing.mouseX ) / width ;
					points[dragId].y = (processing.mouseY )/ height ;
				
					points[dragId+1].x = points[dragId].x + dragTransform.x;
					points[dragId+1].y = points[dragId].y + dragTransform.y;
				} else
				{
					points[dragId].x = (processing.mouseX ) / width ;
					points[dragId].y = (processing.mouseY )/ height ;
				}
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
			N+=2;
			generatePoints();
		}
		if (processing.keyCode == 88)
		{
			N-=2;
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
