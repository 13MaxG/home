function Queue()
{
	var queue = [];
	var offset = 0;
	
	this.push = function(item)
	{
		queue.push(item);
	}
	
	this.pop = function()
	{
		if(queue.length ==  0)
			return undefined;
			
		offset++;
		if(2 * offset >= queue.length)
		{ 
			queue = queue.slice(offset);
			offset = 0;
		}	
	}
	
	this.front = function()
	{
		if(queue.length > 0)
			return queue[offset];
		return undefined;
	}
	
	this.size = function()
	{
		return queue.length - offset;
	}
	
	this.empty = function()
	{
		return this.size() == 0;
	}
	
}

function Stack()
{
	var stack = [];
	
	this.push = function(item)
	{
		stack.push(item);
	}
	
	this.pop = function()
	{
		stack.pop();
	}
	
	this.top = function()
	{
		return stack[stack.length - 1];
	}
	
	this.size = function()
	{
		return stack.length;
	}
	
	this.empty = function()
	{
		return this.size() == 0;
	}
	
}
var PascalLimit = 13;
var Pascal = new Array(PascalLimit);
for(var i = 0; i < PascalLimit; i++)
{
	Pascal[i] = new Array(i+1);
}
Pascal[0][0] = 1;
Pascal[1][0] = 1;
Pascal[1][1] = 1;
for(var i = 2; i < PascalLimit; i++)
{
	Pascal[i][0] = 1;
	Pascal[i][i] = 1;
	
	for(var j = 1; j < i; j++)
	{
		Pascal[i][j] = Pascal[i-1][j] + Pascal[i-1][j-1];
	}
}
