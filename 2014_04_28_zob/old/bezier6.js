
var bezier6 = new Processing.Sketch();
bezier6.attachFunction = function(processing) {
	var width = 500;
	var height = 500;
	
	var tArg = 0;
	
	var N = 4;
	var points;
	var weight;
	
	var dragId = -1;
	
	function Point(X, Y)
	{
		this.x = X;
		this.y = Y;
	}
	var bezierX = function(a, n, t)
	{
		var x = 0;
		var y = 0;
		for(var i = 0; i < n; i++)
		{
			x += Pascal[n-1][i] * Math.pow(t, i) * Math.pow(1-t, n-1-i) * a[i].x * weight[i];
			y += Pascal[n-1][i] * Math.pow(t, i) * Math.pow(1-t, n-1-i) * weight[i];
		}
	
		return x/y;
	}
	var bezierY = function(a, n, t)
	{
		var x = 0;
		var y = 0;
		for(var i = 0; i < n; i++)
		{
			x += Pascal[n-1][i] * Math.pow(t, i) * Math.pow(1-t, n-1-i) * a[i].y * weight[i];
			y += Pascal[n-1][i] * Math.pow(t, i) * Math.pow(1-t, n-1-i) * weight[i];
		}
		return x/y;
	}
	
	var generatePoints = function()
	{
		points = new Array(N);
		weight = new Array(N);
		for(var i = 0; i < N; i++)
		{
			points[i] = new Point(Math.random(), Math.random());
			weight[i] = 1;
		}
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
		processing.fill(255);
		processing.stroke(255, 0, 0);
		processing.strokeWeight(1);
		for(var arg = 0; arg <= 1; arg+=0.001)
		{
			
			cur.x = bezierX(points, N, arg) ;
			cur.y = bezierY(points, N, arg);
			
			if(arg != 0)
				processing.line(prev.x * width, prev.y  * height, cur.x * width, cur.y * height);
			prev.x = cur.x;
			prev.y = cur.y;
		
		}
		processing.stroke(0, 0, 0);
		processing.strokeWeight(1);
		for(var i = 0; i < N; i++)
		{
			processing.ellipse(points[i].x * width, points[i].y * height, 6, 6);
		}
		
		if(dragId != -1)
		{
			processing.textSize(14);
			processing.fill(0);
			processing.text("Waga: " + (weight[dragId]).toString() , 10,10, 200,30);	
		}
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
			points[dragId].x = processing.mouseX / width;
			points[dragId].y = processing.mouseY / height;
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
	processing.keyPressed = function()
	{
	
		if(dragId != -1)
		{	
			if (processing.keyCode == 78)
			{
				weight[dragId] += 0.1;
			}
			if (processing.keyCode == 77)
			{
				weight[dragId] += - 0.1;
			}
		}
		
	}
	
	processing.keyReleased = function()
	{	
	
	
	
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
