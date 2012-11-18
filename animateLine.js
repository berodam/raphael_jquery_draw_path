/**
 * @author Damian Bero
 * raphael_jquery_draw_path
 * 
 * working example found at:
 * http://jsfiddle.net/eA8bj/
 * 
 * found on github
 * https://github.com/berodam/raphael_jquery_draw_path.git
 * 
 */

$(function() {
	// create function animateLine
	// canvas = Raphael canvas object
	// hoverDivName = name of the hover over div (string)
	// colorNumber = any name or number recognised by raphael (string)
	// pathString = path string in SVG format
    animateLine = function(canvas, hoverDivName, colorNumber, pathString) {
        //select hover div
        $('#' + hoverDivName).hover(
		
		//on mouse enter
        function() {
        	
        	//create path object
            var line = canvas.path(pathString).attr({
                stroke: colorNumber
            });
            
            //get length of path object
            var length = line.getTotalLength();

			//select the path object you just created
			// use jQuery animate to animate it
            $('path[fill*="none"]').animate({
                'to': 1
            }, {
            	//animation speed
                duration: 5000,
                
                // movement done at each step 
                //(pos = now from jQuery documentation)
                step: function(pos, fx) {
                	
                	//get the position where the drawing ends at current moment
                    var offset = length * fx.pos;
                    
                    //get a path string for new extended path 
                    var subpath = line.getSubpath(0, offset);
                    
                    //clear old subpath
                    canvas.clear();
                    
                    //draw a new subpath
                    canvas.path(subpath).attr({
                        stroke: colorNumber
                    });

                },
            });
           
           // mouse leave function
        }, function() {
        	// select the path element, stop the animation, fade the path element away.
            $('path[fill*="none"]').stop(true, false).fadeOut();
        });
    };

});​