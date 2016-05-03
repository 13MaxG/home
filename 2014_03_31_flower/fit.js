// FIT v1.01

function fitPoint(Value, Time) 
{
	this.value = Value;
	this.time = Time;
}

function fitPointCompare(a, b)
{
	return a.time - b.time;
}

function fitSchema()
{
	this.keyPoints = new Array();
	this.keyPointsSize = 0;
	this.controlPoints = new Array();
	this.controlPointsSize = 0;
	this.sorted = false;
	
	this.sort = function()
	{
		this.keyPoints.sort(fitPointCompare);
		this.controlPoints.sort(fitPointCompare);
		
		this.sorted = true;
	};
	
	this.addKeyPoint = function(Value, Time)
	{
		this.keyPoints.push(new fitPoint(Value, Time));
		this.keyPointsSize++;
		this.sorted = false;
	};
	this.addControlPoint = function(Value, Time)
	{
		this.controlPoints.push(new fitPoint(Value, Time));
		this.controlPointsSize++;
		this.sorted = false;
	};
}

function fitCoefficient()
{
	this.deep = 0;
	this.data = new Array();
	
	this.get = function(n, k)
	{
		if(n > 36 || n < 0 || k < 0 || k > 36)
        {
            
            return 0;
        }
        
        if(this.deep == 0)
        {
        	this.data[0] = new Array();
        	this.data[0][0] = 1;
        	
        	this.data[1] = new Array();
        	this.data[1][0] = 1;
        	this.data[1][1] = 1;
        	
        	this.data[2] = new Array();
        	this.data[2][0] = 1;
        	this.data[2][1] = 2;
        	this.data[2][2] = 1;
        	this.data[3] = new Array();
        	this.data[3][0] = 1;
        	this.data[3][1] = 3;
        	this.data[3][2] = 3;
        	this.data[3][3] = 1;
        	this.deep = 4;
        }
        
        if(this.deep <= n)
        {

            for(var i = this.deep; i <=n; i++)
            {

                this.data[i] = new Array();// int[(i)/2+2+1];
                this.data[i][0] = 1;
                for(var j = 1; j <=(i)/2; j++)
                {
                   // this.data[i][j] = this.data[i-1][j-1] + this.data[i-1][j];
                   this.data[i][j] = this.get(i-1, j-1) + this.get(i-1, j);
                }
                if(i % 2 == 1 ) {this.data[i][i/2+1] = this.data[i][i/2];
                }
            }
        }
        if(k <= n/2)
            return this.data[n][k];
        else return this.data[n][n-k];
        
	}
}

var pascal = new fitCoefficient();

function fitFloating(Schema)
{
	this.schema = Schema; // fitSchema;
	this.value; // double
	this.time; // double
	
	this.points = new Array(); // array of points
	this.pointsSize = 0;
	this.nextKey; // int
	this.control; // int
	
	this.clear = function()
	{
		this.time = 0;
		this.nextKey = 0;
		this.control = 0;
		this.pointsSize = 0;
		
		this.points = new Array();
		this.points.push(this.schema.keyPoints[0]);
		this.pointsSize++;
		
		while( this.control < this.schema.controlPointsSize && this.schema.controlPoints[this.control].time < this.schema.keyPoints[1].time)
		{
			this.points.push(this.schema.controlPoints[this.control]);
			this.pointsSize++;
			this.control++;
		}	
		
		this.points.push(this.schema.keyPoints[1]);
		this.pointsSize++;
		
		this.update(0);
		
	}
	
	this.update = function(dt)
	{
		
		this.time += dt;
		
		// Przygotuj punkty do obliczeń
		if(this.time > this.points[this.pointsSize-1].time && this.time < 1.0)
		{
			
			while(this.nextKey < this.schema.keyPointsSize && this.time > this.schema.keyPoints[this.nextKey].time )
			{
				this.nextKey++;
			} 
			
			this.points = new Array();
			this.pointsSize = 0;
			
			this.points.push(this.schema.keyPoints[this.nextKey-1] );
			this.pointsSize++;
			
			while(this.control < this.schema.controlPointsSize && this.schema.controlPoints[this.control].time > this.schema.keyPoints[this.nextKey-1].time && this.schema.controlPoints[this.control].time < this.schema.keyPoints[this.nextKey].time )
			{
				this.points.push(this.schema.controlPoints[this.control]);
				this.pointsSize++;
				
				this.control++;
			}
			
			this.points.push(this.schema.keyPoints[this.nextKey] );
			this.pointsSize++;
		}
		
		// Metoda Newtona-Raphsona
		
		var bezierTime = ( this.time - this.points[0].time ) / ( this.points[this.pointsSize-1].time - this.points[0].time);
		var precision = 2;
		
		for( var p = 0; p < precision; p++)
		{
			var guessBezier = 0;
			var slopeOfBezier = 0;
			
			for( var i = 0; i < this.pointsSize; i++)
			{
				var b = pascal.get( this.pointsSize -1, i) * Math.pow(bezierTime, i) * Math.pow(1.0 - bezierTime, this.pointsSize-1  -i);
				guessBezier += this.points[i].time * b;
				
				if(i < this.pointsSize -1)
					slopeOfBezier += (this.points[i+1].time - this.points[i].time)  * b;
			}
			
			slopeOfBezier *= this.pointsSize-1;
			bezierTime -= (guessBezier - this.time) * slopeOfBezier;
			
			if(bezierTime > 1) bezierTime = 1;
			if(bezierTime < 0) bezierTime = 0;
		}
		
		
		this.value = 0;
		for( var i = 0; i < this.pointsSize; i++)
		{
			var b = pascal.get(this.pointsSize-1, i) * Math.pow(bezierTime, i) * Math.pow(1.0 - bezierTime, this.pointsSize  -1- i)
			
			this.value += this.points[i].value * b;
		}
		
		return this.value;
		
	}
}



