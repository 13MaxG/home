
function Rgb(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
}
function Hsv(h, s, v) {
    this.h = h;
    this.s = s;
    this.v = v;
}
var EPS = 0.00001;
function cmp(a, b)
{
	if(b-a >=-EPS && b-a <= EPS)
		return true;
	else
		return false;
}
function toRgb(colour) // colour Hsv
{
	if(cmp(colour.s, 0))
	{
		return new Rgb(colour.v, colour.v, colour.v);
	} else
	{
		if(cmp(colour.h,360))
			colour.h = 0;
		else
			colour.h /= 60.0;
			
		var i = Math.floor(colour.h);
		var f = colour.h - i;
		var m = colour.v*(1.0 - colour.s);
		var n = colour.v*(1.0 - colour.s * f);
		var k = colour.v*(1 - colour.s * (1.0 - f));
		
		switch(i)
		{
			case 0:
				return new Rgb(colour.v, k, m);
			break;
			case 1:
				return new Rgb(n, colour.v, m);
			break;
			case 2:
				return new Rgb(m, colour.v, k);
			break;
			case 3:
				return new Rgb(m, n, colour.v);
			break;
			case 4:
				return new Rgb(k, m, colour.v);
			break;
			case 5:
				return new Rgb(colour.v, m, n);
			break;
		}
	}
}
/*
var c = new Hsv(90, 0.5, 0.7);
alert(toRgb(c).r);


function toHsv(colour) // Rgb colour
{
	var out = new Hsv(0, 0, 0);
	out.v = Math.max(colour.r, Math.max(colour.g, colour.b));
	var tmp = Math.min(colour.r, Math.min(colour.g, colour.b));
	if(cmp(out.h, 0))
	{
		out.s = 0; out.h = 0;
		return out;
	} else
		out.s = (out.v - tmp) / out.v;
		
	var c = new Rgb(0, 0, 0);
	c.r = (out.v - colour.r) / (out.v - tmp);
	c.g = (out.v - colour.g) / (out.v - tmp);
	c.b = (out.v - colour.b) / (out.v - tmp);
	
	if(cmp(colour.r, out.v)) 
		out.h = c.b - c.g;
	if(cmp(colour.g, out.v)) 
		out.h = 2.0 + c.r - c.b;
	if(cmp(colour.b, out.v))
		out.h = 4.0 + c.g - c.r;
	out.h *=60.0;
	
	if(out.h < 0)
		out.h += 360.0;
		
	return out;
}

var c = new Hsv(90, 0.5, 0.7);
alert(toHsv(toRgb(c)).s);
*/
