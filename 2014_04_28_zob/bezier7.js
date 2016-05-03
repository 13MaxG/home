
var bezier7 = new Processing.Sketch();
bezier7.attachFunction = function(processing) {
	var width = 500;
	var height = 500;
	
	var tArg = 0;
	
	var K =2;
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
		 N = 3*K+1;
		points = new Array(N);
		for(var i = 0; i < N; i++)
			points[i] = new Point( 0.25 + Math.random()/2, 0.25 + Math.random()/2);
			
		points[2].x = points[3].x - (points[4].x - points[3].x);
		points[2].y = points[3].y - (points[4].y - points[3].y);
	}
	
var dragId = -1;
	var superDrag = false;
	var dragTransform = new Point(0, 0);
	var dragLen = 0;
	
	var editMode = 0;
	
	var helpers = true
	processing.setup = function() {
		generatePoints();
		processing.size(width, height); 

		processing.frameRate(24);
		processing.background(255);
		
				
		//var font = processing.loadFont("FreeMono.ttf"); 
		//processing.textFont(font);
		
		processing.noLoop();
		processing.frameRate(30);
	}
		var cur = new Point(0, 0), prev = new Point(0, 0);
	processing.draw = function() 
	{
		//processing.background(255);
		processing.fill(255, 255, 255, Math.round(8*Math.random())+5);
		processing.rect(-2, -2, processing.width+2, processing.height+2);
			
		for(var ll = 0; ll<5; ll++)
		{
	
		tArg += 1/100;
		processing.fill(255);
		
		processing.strokeWeight(1);
		
		
		if(tArg > 1)
		{
			tArg = 0;
			points[0] = points[3];
			points[1] = points[4];
			points[2] = points[5];
			points[3] = points[6];
			points[4] = new Point( 0.25 + Math.random()/2, 0.25 + Math.random()/2);;
			points[5] = new Point(0.25 + Math.random()/2,0.25 + Math.random()/2);;
			points[6] = new Point( 0.25 + Math.random()/2, 0.25 + Math.random()/2);;
		}
		points[2].x = points[3].x - (points[4].x - points[3].x);
		points[2].y = points[3].y - (points[4].y - points[3].y);
		

			for(var i = 1; i < N; i++)
			{
					processing.stroke(200,200, 200);
				if(i != 0)
					if(helpers) processing.line(points[i-1].x * width, points[i-1].y  * height, points[i].x * width, points[i].y * height);
				processing.stroke(150,150, 150);
				processing.ellipse(points[i].x * width, points[i].y * height, 3, 3);
				prev.x = cur.x;
				prev.y = cur.y;
			}
		
		
		
		//for(var m = 0; m < K; m++)
		var m = 0
		{
			var arg = tArg;
			//for(var arg = 0; arg <=tArg; arg+=0.001)
			{
			
				cur.x = bezier(points[3*m+0].x,points[3*m+1].x,points[3*m+2].x,points[3*m+3].x, arg) ;
				cur.y = bezier(points[3*m+0].y,points[3*m+1].y,points[3*m+2].y,points[3*m+3].y, arg) ;
			
				if(prev.x != 0 && prev.y != 0)
				{
					processing.stroke(255, 0, 0);
					processing.strokeWeight(2);
					//processing.point(cur.x * width, cur.y * height);
					processing.line(prev.x * width, prev.y  * height, cur.x * width, cur.y * height);
					processing.strokeWeight(1);
				}
				prev.x = cur.x;
				prev.y = cur.y;
		
			}
		
			if(arg==0) 
			{
				cur.x = points[0].x;
				cur.y = points[0].y;
			}
			
			}
		
			
		
		}
		
		

		
				
	}
	
	processing.mousePressed = function()
	{
	
	}
	processing.mouseMoved = function() 
	{

	}
	processing.mouseDragged = function() 
	{
		
		
		
	}
	processing.mouseReleased = function()
	{
		
	}
	
	processing.keyReleased = function()
	{	
	
		
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
