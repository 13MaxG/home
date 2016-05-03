
var bezier8 = new Processing.Sketch();
bezier8.attachFunction = function(processing) {
	var width = 500;
	var height = 500;
	
	var tArg = 0;
	
	var N = 4;
	var points;
	var points2;
	var dragId = -1;
	var dragSet = -1;
	var alpha = true;
	var total = true;
	function Point(X, Y)
	{
		this.x = X;
		this.y = Y;
	}
	var bezierX = function(a, n, t)
	{
		var x = 0;
		for(var i = 0; i < n; i++)
		{
			x += Pascal[n-1][i] * Math.pow(t, i) * Math.pow(1-t, n-1-i) * a[i].x;
		}
	
		return x;
	}
	var bezierY = function(a, n, t)
	{
		var x = 0;
		for(var i = 0; i < n; i++)
		{
			x += Pascal[n-1][i] * Math.pow(t, i) * Math.pow(1-t, n-1-i) * a[i].y;
		}
		return x;
	}
	
	var generatePoints = function()
	{
		points = new Array(N);
		for(var i = 0; i < N; i++)
			points[i] = new Point(Math.random(), Math.random());
		points2 = new Array(N);
		for(var i = 0; i < N; i++)
			points2[i] = new Point(Math.random(), Math.random());
	}
	


	
	var helpers = true;
	var kolorki = false;
	processing.setup = function() {
		generatePoints();
		processing.size(width, height); 

				
		processing.background(255);
		
				
		var font = processing.loadFont("FreeMono.ttf"); 
		processing.textFont(font);
		
		processing.noLoop();
	}
		
	processing.draw = function() 
	{
		processing.background(255);
		
		var cur = new Point(0, 0), prev = new Point(0, 0);
		
		
		
		;
		
		
		
		processing.fill(255);
		var cur2 = new Point(0, 0), prev2 = new Point(0, 0);
		for(var arg = 0; arg <= 1; arg+=0.002)
		{
			
			cur.x = bezierX(points, N, arg) ;
			cur.y = bezierY(points, N, arg);
			
			
			
			
			
			
			cur2.x = bezierX(points2, N, arg) ;
			cur2.y = bezierY(points2, N, arg);
			
			if(alpha)
				processing.stroke(cur.x*255, cur.y*255, cur2.x*255, cur2.y*255);	
			else
				processing.stroke(cur.x*255, cur.y*255, cur2.x*255);	
				
			if(total)
				processing.line(arg *width, 0, arg*width, 500);
			else
				processing.line(arg *width, 450, arg*width, 500);
			}
			
		
		var queue = new Queue();
		
		for(var i = 0; i < N; i++)	
			queue.push(new Point(points[i].x, points[i].y));
		
		processing.stroke(127, 127, 127);
		processing.strokeWeight(1);
		if(helpers)
		{
			i = 0;
			{
				prev = queue.front(); queue.pop();
				for(var j = 1; j < N - i; j++)
				{
					cur = queue.front(); queue.pop();
					
					processing.line(prev.x * width, prev.y * height, cur.x * width, cur.y * height);
				
				
					queue.push(new Point( 
									prev.x + tArg * (cur.x - prev.x),
									prev.y + tArg * (cur.y - prev.y) ));
				

					prev.x = cur.x;
					prev.y = cur.y;
				}
			}
		}
		queue = new Queue();
		
		for(var i = 0; i < N; i++)	
			queue.push(new Point(points2[i].x, points2[i].y));
		
		processing.stroke(127, 127, 127);
		processing.strokeWeight(1);
		if(helpers)
		{
			i = 0;
			{
				prev = queue.front(); queue.pop();
				for(var j = 1; j < N - i; j++)
				{
					cur = queue.front(); queue.pop();
					
					processing.line(prev.x * width, prev.y * height, cur.x * width, cur.y * height);
				
				
					queue.push(new Point( 
									prev.x + tArg * (cur.x - prev.x),
									prev.y + tArg * (cur.y - prev.y) ));
				

					prev.x = cur.x;
					prev.y = cur.y;
				}
			}
		}
		
		for(var arg = 0; arg <= 1; arg+=0.002)
		{
			cur.x = bezierX(points, N, arg) ;
			cur.y = bezierY(points, N, arg);
			
			
			
			
			
			
			cur2.x = bezierX(points2, N, arg) ;
			cur2.y = bezierY(points2, N, arg);
			
			processing.stroke(255, 0, 0);
			if(arg != 0)
				processing.line(prev.x * width, prev.y  * height, cur.x * width, cur.y * height);
			processing.stroke(0, 0, 255);
			if(arg != 0)
				processing.line(prev2.x * width, prev2.y  * height, cur2.x * width, cur2.y * height);
			
			
			
			prev.x = cur.x;
			prev.y = cur.y;
			
			prev2.x = cur2.x;
			prev2.y = cur2.y;
		
		}
		
		processing.stroke(0, 0, 0);
		processing.strokeWeight(1);
		for(var i = 0; i < N; i++)
		{
			processing.ellipse(points[i].x * width, points[i].y * height, 6, 6);
			processing.ellipse(points2[i].x * width, points2[i].y * height, 6, 6);
		}
///////////////////////////////////
	

		

				

	}
	
	var epsilon = 6;
	processing.mousePressed = function()
	{
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
					dragSet = -1;
					break;
				}
				dragId = i;
				dragSet = 0;
				found = true;
				break;
			}
		}
		for(var i = 0; i < N; i++)
		{
			var x = points2[i].x * width;
			var y = points2[i].y * height;
			if(processing.mouseY < y + epsilon && processing.mouseY > y - epsilon &&
			processing.mouseX < x + epsilon && processing.mouseX > x - epsilon)
			{
			
				if(dragId == i)
				{
					dragId = -1;
					dragSet = -1;
					break;
				}
				dragId = i;
				dragSet = 1;
				found = true;
				break;
			}
		}
		
		if(found == false)
			dragId = -1;
	}
	processing.mouseMoved = function() 
	{
		if(dragId != -1 && dragSet == 0 )
		{
			points[dragId].x = processing.mouseX / width;
			points[dragId].y = processing.mouseY / height;
		} 
		if(dragId != -1 && dragSet == 1 )
		{
			points2[dragId].x = processing.mouseX / width;
			points2[dragId].y = processing.mouseY / height;
		} 
		//else
		//{
			tArg = processing.mouseX / width;
			if(tArg < 0) tArg = 0;
			if(tArg > 1) tArg = 1;
		//}
	}
	processing.mouseDragged = function() 
	{
		
		
		
	}
	processing.mouseReleased = function()
	{
		
	}
	
	processing.keyReleased = function()
	{	
		if (processing.keyCode == 72)
		{
			alpha = !alpha;
		}
		if (processing.keyCode == 74)
		{
			total = !total;
		}
		if (processing.keyCode == 65)
		{
			helpers = !helpers;
		}
		if (processing.keyCode == 90)
		{
			N++;
			if(N > 13) N = 13;
			generatePoints();
		}
		if (processing.keyCode == 88)
		{
			N--;
			if(N < 2) N = 2;
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
