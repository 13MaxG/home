
var bezier3 = new Processing.Sketch();
bezier3.attachFunction = function(processing) {
	var width = 500;
	var height = 500;
	
	var tArg = 0;
	
	var N = 4;
	var points;
	
	var dragId = -1;
	
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
	
	
	var DTbezierX = function(a, n, t)
	{
		var x = 0;
		for(var i = 0; i <= n- 2; i++)
		{
			x += Pascal[n-2][i] * Math.pow(t, i) * Math.pow(1-t, n-1-i) * (a[i+1].x - a[i].x);
		}
	
		return x * (n-1);
	}
	var DTbezierY = function(a, n, t)
	{
		var x = 0;
		for(var i = 0; i <= n - 2; i++)
		{
			x += Pascal[n-2][i] * Math.pow(t, i) * Math.pow(1-t, n-1-i) * (a[i+1].y - a[i].y);
		}
		return x * (n-1);
	}
	
	var generatePoints = function()
	{
		points = new Array(N);
		for(var i = 0; i < N; i++)
			points[i] = new Point(Math.random()-0.5, Math.random() - 0.5);
	}
	


	
	var helpers = false;
	processing.setup = function() {
		generatePoints();
		processing.size(width, height); 

		processing.frameRate(24);
		processing.background(255);
		
				
		//var font = processing.loadFont("FreeMono.ttf"); 
		//processing.textFont(font);
		
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
					
					processing.line(width/2 + prev.x * width, height/2 + prev.y * height, width/2 + cur.x * width, height/2 +  cur.y * height);
				
				
					queue.push(new Point( 
									prev.x + tArg * (cur.x - prev.x),
									prev.y + tArg * (cur.y - prev.y) ));
				

					prev.x = cur.x;
					prev.y = cur.y;
				}
			}
		}
		processing.fill(255);
		
		processing.strokeWeight(1);
		
		var DTcur = new Point(0, 0);
		var DTprev = new Point(0, 0);
		for(var arg = 0; arg < tArg; arg+=0.001)
		{
			
			cur.x = bezierX(points, N, arg) ;
			cur.y = bezierY(points, N, arg);
			
			DTcur.x = DTbezierX(points, N, arg) ;
			DTcur.y = DTbezierY(points, N, arg);
			
			if(arg != 0)
			{
				processing.stroke(255, 0, 0);
				processing.line(width/2 + prev.x * width, height/2 + prev.y  * height, width/2 + cur.x * width, height/2 + cur.y * height);
			}
			
			if(arg != 0)
			{
				processing.stroke(0, 255, 255);
				processing.line(width/2 + DTprev.x * width, height/2+DTprev.y  * height, width/2 + DTcur.x * width, height/2+  DTcur.y * height);
			}
			
			prev.x = cur.x;
			prev.y = cur.y;
			DTprev.x = DTcur.x;
			DTprev.y = DTcur.y;
		
		}
		if(tArg==0) 
		{
			cur.x = points[0].x;
			cur.y = points[0].y;
		}
		processing.stroke(255, 0,0 );
		processing.ellipse(width/2 + cur.x * width, height/2 + cur.y * height, 3, 3);
		processing.stroke(0, 255, 255);
		processing.ellipse(width/2 + DTcur.x * width, height/2 + DTcur.y * height, 3, 3);

		
		processing.strokeWeight(1);
		for(var arg = tArg; arg < 1; arg+=0.001)
		{
			
			cur.x = bezierX(points, N, arg) ;
			cur.y = bezierY(points, N, arg);
			
			DTcur.x = DTbezierX(points, N, arg) ;
			DTcur.y = DTbezierY(points, N, arg);
			
			if(arg != 0)
			{
				processing.stroke(0, 0, 0);
				processing.line(width/2 + prev.x * width, height/2 + prev.y  * height, width/2 + cur.x * width, height/2 + cur.y * height);
			}
			
			if(arg != 0)
			{
				processing.stroke(0, 0, 0);
				processing.line(width/2 + DTprev.x * width, height/2 + DTprev.y  * height, width/2 + DTcur.x * width, height/2 + DTcur.y * height);
			}
			
			prev.x = cur.x;
			prev.y = cur.y;
			DTprev.x = DTcur.x;
			DTprev.y = DTcur.y;
		
		}
		

		
		
		processing.stroke(0, 0, 0);
		processing.strokeWeight(1);
		for(var i = 0; i < N; i++)
		{
			processing.ellipse(width/2 + points[i].x * width, height/2 + points[i].y * height, 6, 6);
		}
		//processing.textSize(14);
		//processing.fill(0);
		//processing.text("Ilość punktów: " + N.toString() , 10,10, 200,30);
				

	}
	
	var epsilon = 6;
	processing.mousePressed = function()
	{
		var found = false;
		for(var i = 0; i < N; i++)
		{
			var x = width/2 + points[i].x * width;
			var y = height/2 + points[i].y * height;
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
			points[dragId].x = processing.mouseX / width - 0.5;
			points[dragId].y = processing.mouseY / height - 0.5;
		} 
		//else
		//{
			tArg = processing.mouseX / width ;
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
