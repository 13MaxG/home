
var gameOfLife = new Processing.Sketch();
gameOfLife.attachFunction = function(processing) {
	var width = 500;
	var height = 500;
	
	var size = 20;
	var board;
	var newBoard;
	var data;
	
	var init = function()
	{
		board = new Array(size); // aktualy stan gry; boolean
		newBoard = new Array(size); 
		data = new Array(size); // podsumowanie gie; double
		for(var i = 0; i < size; i++)
		{
			board[i] = new Array(size);
			newBoard[i] = new Array(size);
			data[i] = new Array(size);
			for(var j = 0; j < size; j++)
				data[i][j] = 0;
		}
	}

	
	var active = false;
	var statistics = false;
	var grid = false;
	var stepTime = 250;
	var stMax = 0;
	
	var step = function()
	{
		
		for(var i = 0; i < size; i++)
		for(var j = 0; j < size; j++)
		{
			newBoard[i][j] = false;;
			
			var neighbours = 0;
			
			if(i-1 >= 0 && board[i-1][j])
				neighbours++;
				
			if(i+1 < size && board[i+1][j])
				neighbours++;
				
			if(j-1 >= 0 && board[i][j-1])
				neighbours++;
				
			if(j+1 < size && board[i][j+1])
				neighbours++;
				
			if(i-1 >= 0 && j-1 >= 0 && board[i-1][j-1])
				neighbours++;
				
			if(i-1 >= 0 && j+1 < size && board[i-1][j+1])
				neighbours++;
				
			if(i+1 < size && j-1 >= 0 && board[i+1][j-1])
				neighbours++;
						
			if(i+1 < size && j+1 < size && board[i+1][j+1])
				neighbours++;	
				
				
				
			if(board[i][j])
			{
				if(neighbours == 2 || neighbours == 3)
					newBoard[i][j] = true;
				/*if(neighbours < 2)
					newBoard[i][j] = false;
				if(neighbours > 3)
					newBoard[i][j] = false;*/
			} else
			{
				if(neighbours == 3)
					newBoard[i][j] = true;
			}
		}
		
		stMax = 0;
		for(var i = 0; i < size; i++)
		for(var j = 0; j < size; j++)
		{
			board[i][j] = newBoard[i][j];
			
			if(board[i][j])
			{
				data[i][j]+=1;
				if(data[i][j] > stMax) stMax = data[i][j];	
			}
			
		}
	}
	
	processing.setup = function() {
		processing.size(width, height); 
		init();	
		//processing.frameRate(30);
	
		processing.draw();
		//processing.noLoop();
	}
		
	var _d = new Date();	
	var currentTime = _d.getTime();
	var previousTime = _d.getTime();
	var accumulator = 0;
	processing.draw = function() 
	{
		previousTime = currentTime;
		var date = new Date();
		currentTime = date.getTime(); 
		var dt = currentTime - previousTime;
		accumulator += dt;
		
		processing.background(255);
		
		if(active)
		{
		
			while(accumulator > stepTime)
			{
				accumulator -= stepTime;
				step();
			}
			
		}
		
		for(var i = 0; i < size; i++)
		{
			for(var j = 0; j < size; j++)
			{
				
				if(statistics)
				{
					var grey = 255 -  255 * data[i][j] / stMax;
					processing.fill(grey, grey, grey);
					processing.stroke(grey, grey, grey);
				} else
				{
					if(board[i][j] == true)
					{
						processing.fill(0, 0, 0);
						processing.stroke(0, 0, 0);
					}
					else
					{
						processing.fill(255, 255, 255);
						processing.stroke(255, 255, 255);
					}
				}
				processing.rect(i / size * width , j / size * height, (i+1)/size * width, (j+1)/size * height);
			}
		}
		if(grid)
		{
			for(var i = 0; i < size; i++)
			{
				processing.stroke(0, 255, 0);
				processing.line(i / size * width, 0, i / size * width, height);
			}
			for(var j = 0; j < size; j++)
			{
				processing.stroke(0, 255, 0);
				processing.line(0, (j+1)/size * height, width, (j+1)/size * height);
			}
		}
					

	}
	var piX = -1, piY = -1;
	var iX = -1, iY = -1;
	processing.mousePressed = function()
	{
		if(processing.mouseButton == processing.LEFT)
		{
			iX = Math.floor(processing.mouseX / width * size);
			iY = Math.floor(processing.mouseY / height * size);
			if(!(piX == iX && piY == iY)) 
			{
				board[iX][iY] = !board[iX][iY];
				piX = iX;
				piY = iY;
			}
		}
	}
	processing.mouseMoved = function() 
	{
		
	}
	processing.mouseDragged = function() 
	{
		if(processing.mouseButton == processing.LEFT)
		{
			
			iX = Math.floor(processing.mouseX / width * size);
			iY = Math.floor(processing.mouseY / height * size);
			if(!(piX == iX && piY == iY)) 
			{
				board[iX][iY] = !board[iX][iY];
				piX = iX;
				piY = iY;
			}
		}
	}
	processing.mouseReleased = function()
	{
		if(processing.mouseButton == processing.RIGHT)
		{
			active = !active;
		}
	}
	
	processing.keyReleased = function()
	{	
		if (processing.keyCode == 65)
		{
			statistics = !statistics;
		}
		if (processing.keyCode == 66)
		{
			for(var i = 0; i < size; i++)
			for(var j = 0; j < size; j++)
			{
				if(Math.floor((Math.random()*2)+1) == 1)
					board[i][j] = false;
				else 
					board[i][j] = true;
			}
		}
		if (processing.keyCode == 67)
			grid = !grid;
			
		if (processing.keyCode == 77)
		{
			if(size > 10)
			{
				size-=10;
				init();
			}
		}	
		if (processing.keyCode == 78)
		{
			if(size < 500)
			{
				size+=10;
				init();
			}
		}	
		
			
	}
	
	processing.mouseOver = function()
	{
		//processing.loop();
	}
	processing.mouseOut= function()
	{
		//processing.noLoop();
	}
								
}
