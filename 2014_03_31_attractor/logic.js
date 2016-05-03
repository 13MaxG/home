var fitCreator = new Processing.Sketch(); // Deklaracja nowego szkicu ProcessingJS
		var width = 600;
			var height = 600;
		fitCreator.attachFunction = function(processing) {
			// Zmienne i funkcje użytkowe
			var FPS = 30;
			var DT = 1.0 / FPS;
			

			
			var xMousePositionPixels = 0;
			var yMousePositionPixels = 0;

			// ------------------------------------------------
			// "Konstruktor"
			processing.setup = function() {
				// Ustawienia ogólne
				processing.size(width, height); 
				processing.frameRate(FPS);
				processing.smooth();
				
				processing.background(0);
				processing.fill(255);
				processing.rect(0, 0, width, height);
			}
		
				
				var b = -2;
				var d = 1;;
				var f = 3;
				var g = -1;;
				var e = 1;
				var f = 1;
				var g = 1;
				var h = 1;
				
				var x0 = 1;
				var y0 = 1;
				var z0 = 1;
				
				var ips = 2500;
				
				var scale = 0.35;
			// Grafika + obliczenia
			processing.draw = function() {
				// Czyść ekran
	
				processing.fill(255, 34);
				processing.rect(-1, -1, width+1, height+1);
				
				//processing.line(0, 0, xMousePositionPixels, xMousePositionPixels);
				for(var i = 0; i < ips; i++)
				{
					processing.strokeWeight(5);
					processing.stroke(0, 50);
					var x,y;
				
					x = a * Math.sin( b * (y0 )  ) + * c Math.cos( d * (x0 ) );
		    		y = e* Math.sin( f * (x0 ) ) + g*Math.cos( h * (y0) );
				
				
					 processing.point(  width/2 + ((x)/2 ) * width * scale, height/2 +  (y)/2 * height * scale);
					 
					z = Math.sin(x0) + Math.cos(z0);
				
					x0 = x;
					y0 = y;
					z0 = z;
				
				}
				
			}
			// Wejście
			processing.mouseDragged = function() {
				xMousePositionPixels = processing.mouseX;
				yMousePositionPixels = processing.mouseY;
				
			}
			processing.mouseMoved = function() {
				xMousePositionPixels = processing.mouseX;
				yMousePositionPixels = processing.mouseY;
				a = ( 1+ (0.5 - xMousePositionPixels / width )*2) ;
				b = (1+ (0.5 - yMousePositionPixels / width )*2) ;
			}
			processing.mousePressed = function() {
				xMousePositionPixels = processing.mouseX;
				yMousePositionPixels = processing.mouseY;
				
				
				processing.background(255);
				
			}
		}
