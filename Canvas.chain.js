/*!
 * Canvas JavaScript Library v0.0.1
 * http://bobholtwebdev.com/
 *
 * Copyright 2011, Bob Holt
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://bobholtwebdev.com/license
 *
 * Date: Thu Sep 1 17:20:56 2011 -0400
 */

// TODO: I built this object using jQuery as a model just to see how it worked. It doesn't need to stay this way.

// DONE: basic shapes and paths
// TODO: images - https://developer.mozilla.org/en/Canvas_tutorial/Using_images
// TODO: styles and colors - https://developer.mozilla.org/en/Canvas_tutorial/Applying_styles_and_colors
// TODO: transformations - https://developer.mozilla.org/en/Canvas_tutorial/Transformations
// TODO: compositing - https://developer.mozilla.org/en/Canvas_tutorial/Compositing
// TODO: animations - https://developer.mozilla.org/en/Canvas_tutorial/Basic_animations
/* TODO: At minimum, expose the core canvas versions of the following methods: createPattern, createRadialGradient, drawWindow, fillText, getImageData, isPointInPath, measureText, putImageData, rotate, scale, setTransform, strokeText, transform, translate,
*/
(function(window){
	"use strict";
    var document = window.document,
        navigator = window.navigator,
        location = window.location;

    var Canvas = (function(){
        // Define a local copy of Canvas
        var Canvas = function(selector){
            return new Canvas.fn.init(selector)
        };

        Canvas.fn = Canvas.prototype = {
            constructor: Canvas,
            init: function(selector){
				/*
				Do some basic error handling
				*/
				/* TODO: ?potentially CREATE a canvas element as a
				*  child of the body with teh specified id 
				* if the selector fails entirely
				*/
				if (document.getElementById(selector)){
					var container = document.getElementById(selector);
				} else {
					throw "Canvas expects a valid element ID as an argument";	
				}
				/* TODO: ?
				* create a canvas element as the child of this div instead?
				*/
				if (container.nodeName.toLowerCase() !== "canvas"){
					throw "Canvas operates on canvas elements";	
				}
                var xCurrentPos = 0,
                    yCurrentPos = 0,
                    context = container.getContext('2d'),
                    font = "normal 1em sans-serif",
                    fillStyle = "#000",
                    strokeStyle = "#000",
                    getCurrentPos = function(){
                        //TODO: Make sure all methods update currentPos where applicable
                        return {
                            x: xCurrentPos,
                            y: yCurrentPos
                        }
                    },
                    arc = function(params){
                        params = params || {};
                        var x = params.x || xCurrentPos,
                            y = params.y || yCurrentPos,
                            radius = params.radius || 0,
                            start = params.start || 0,
                            end = params.end || Math.PI * 2,
                            counter = params.counter || false;

                        context.arc(x,y,radius,start,end,counter);
                        return this;
                    },
					arcTo = function(x1, y1, x2, y2, radius){
						context.arcTo(x1, y1, x2, y2, radius);
						xCurrentPos = x2;
						yCurrentPos = y2;
						return this;
					},
                    beginPath = function(){
                        context.beginPath();
                        return this;
                    },
                    bezierCurveTo = function(cp1x, cp1y, cp2x, cp2y, x, y){
                        context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
                        return this;
                    },
                    circle = function(params){
                        params = params || {};
                        var x = params.x || xCurrentPos,
                            y = params.y || yCurrentPos,
                            radius = params.radius || 10,
                            fillStyle = params.fillStyle || false;
                        moveTo(x,y);
                        beginPath();
                        arc({
                            x: x,
                            y: y,
                            radius: radius
                        });
                        stroke();
                        if(fillStyle){
                            context.fillStyle = fillStyle;
                            context.fill();
                        }
                        closePath();
                        return this;
                    },

                    /*
                     * Function: clearRect
                     *
                     * Clears a rectangular area, making it fully transparent
                     *
                     * Parameters:
                     *  params.x - (Integer) Starting x coordinate. Defaults to the current position.
                     *  params.y - (Integer) Starting y coordinate. Defaults to the current position.
                     *  params.width - (Integer) Rectangle width. Defaults to 0.
                     *  params.height - (Integer) Rectangle height. Defaults to 0.
                     *
                     * Returns:
                     *  An object containing the current x and y positions.
                     *
                     * See Also:
                     *
                     *  <circle>
                     *  <rectangle>
                     */
                    clearRect = function(params){
                        params = params || {};
                        var x = params.x || xCurrentPos,
                            y = params.y || yCurrentPos,
                            width = params.width || 0,
                            height = params.height || 0;
                        context.clearRect(x,y,width,height);
                        return this;
                    },
					clip = function(){
						context.clip();
						return this;
					},
                    closePath = function(){
                        context.closePath();
                        return this;
                    },
					createImageData = function(height,width){
					    context.closePath(height,width);
                        return this;
					},
					createLinearGradient = function(x0, y0, x1, y1){
						context.createLinearGradient(x0, y0, x1, y1);
						return this;
					},
					drawImage= function(img,x,y){
						if (img.nodeName == undefined){
							var newImg = new Image();
							newImg.src=img;
							img = newImg;	
						}
						img.onload = function(){
							context.drawImage(img,x,y);
						};
						var x = x || xCurrentPos,
                            y = y || yCurrentPos;
						xCurrentPos = x;  
                        yCurrentPos = y; 
						return this;
					},
                    fill = function(){
                        context.fill();
                        return this;
                    },
                    fillRect = function(x,y,width,height){
                        context.fillRect(x,y,width,height);
                        return this;
                    },
                   	line = function(params){
						params = params || {};
                        var x = params.x || xCurrentPos,
                            y = params.y || yCurrentPos,
                            distance = params.distance || 0,
                            angle = params.angle || 0,
							opposite,
							adjacent,
							newX,
							newY,
							radians;
						  if ( angle < 45) {
							console.log(angle);radians = math.radians(angle);
							opposite = math.cosec(Math.sin(radians));
							adjacent = math.sec(Math.sin(radians));
							newX = x + Math.round(distance/adjacent);
							newY = y + Math.round(distance/opposite);
						  } else if (angle == 45){
							radians = radians = math.radians(angle);
							legs = distance/Math.sqrt(2);
							newX = x + legs;
							newY = y + legs;	  
						  }
							else if ( angle > 45 &&  angle <= 90 ) {
							angle = 90- angle;
							radians = radians = math.radians(angle);
							opposite = math.cosec(Math.sin(radians));
							adjacent = math.sec(Math.sin(radians));
							newX = x + Math.round(distance/opposite);
							newY = y + Math.round(distance/adjacent);
						  }  
						  else if ( angle > 90 &&  angle < 135 ) {
							angle =  angle - 90;
							radians = math.radians(angle);
							opposite = math.cosec(Math.sin(radians));
							adjacent = math.sec(Math.sin(radians));
							newX = x - Math.round(distance/opposite);
							newY = y + Math.round(distance/adjacent);
						  } 
						  else if (angle == 135){
							radians = radians = math.radians(angle);
							legs = distance/Math.sqrt(2);
							newX = x - legs;
							newY = y + legs;	  
						  }
						  else if ( angle > 135 &&  angle <= 180 ) { 
							angle = 180- angle;
							radians = math.radians(angle);
							opposite = math.cosec(Math.sin(radians));
							adjacent = math.sec(Math.sin(radians));
							newX = x - Math.round(distance/adjacent);
							newY = y + Math.round(distance/opposite);
						  }
						  else if ( angle > 180  &&  angle < 225) {
							angle =  angle -180;
							radians = math.radians(angle);
							opposite = math.cosec(Math.sin(radians));
							adjacent = math.sec(Math.sin(radians));
							newX = x - Math.round(distance/adjacent);
							newY = y - Math.round(distance/opposite);
						  } 
						  else if (angle == 225){
							radians = radians = math.radians(angle);
							legs = distance/Math.sqrt(2);
							newX = x - legs;
							newY = y - legs;	  
						  }
						  else if ( angle > 225 &&  angle <= 270 ) {
							angle = 270- angle;
							radians = math.radians(angle);
							opposite = math.cosec(Math.sin(radians));
							adjacent = math.sec(Math.sin(radians));	
							newX = x - Math.round(distance/opposite);
							newY = y - Math.round(distance/adjacent);
						  } 
						  else if ( angle > 270  &&  angle < 315) {
							angle =  angle - 270;
							radians = math.radians(angle);
							opposite = math.cosec(Math.sin(radians));
							adjacent = math.sec(Math.sin(radians));
							newX = x + Math.round(distance/opposite);
							newY = y - Math.round(distance/adjacent);
						  } 
						  else if (angle == 315){
							radians = radians = math.radians(angle);
							legs = distance/Math.sqrt(2);
							newX = x + legs;
							newY = y - legs;	  
						  } 
						  else if ( angle > 315 &&  angle < 360 ) {
							angle = 360 -  angle ;
							radians = math.radians(angle);
							opposite = math.cosec(Math.sin(radians));
							adjacent = math.sec(Math.sin(radians));
							newX = x + Math.round(distance/adjacent);
							newY = y - Math.round(distance/opposite)
						  } 
						  //TODO: handle angles greater than 360!
						  else if ( angle >= 360 ) {
							newX = x + Math.round(distance/adjacent);
							newY = y;
						  }
						context.moveTo(x,y);
						context.lineTo(newX,newY);
						xCurrentPos = newX;
                      	yCurrentPos = newY;
                        return this;
                    },
                    lineTo = function(x,y){
                      context.lineTo(x,y);
                      xCurrentPos = x;
                      yCurrentPos = y;
                      return this;
                    },
					math = {
						cosec : function(num){
     						return 1 / Math.sin(num);
   						},
						sec : function(num){
							return 1 / Math.cos(num);
						},
						radians : function(degrees){
						 	return degrees * (Math.PI / 180);
						}
					},
                    moveTo = function(x,y){
                      context.moveTo(x,y);
                      xCurrentPos = x;
                      yCurrentPos = y;
                      return this;
                    },
                    quadraticCurveTo = function(cp1x, cp1y, x, y){
                        context.quadraticCurveTo(cp1x, cp1y, x, y);
                        return this;
                    },
                    quadraticCurveToFixed = function ( cpx, cpy, x, y ) {  
                        /* for FF1.5 - from MDN: https://developer.mozilla.org/en/Canvas_tutorial/Drawing_shapes
                        /* 
                        For the equations below the following variable name prefixes are used: 
                            qp0 is the quadratic curve starting point (you must keep this from your last point sent to moveTo(), lineTo(), or bezierCurveTo() ). 
                            qp1 is the quadratic curve control point (this is the cpx,cpy you would have sent to quadraticCurveTo() ). 
                            qp2 is the quadratic curve ending point (this is the x,y arguments you would have sent to quadraticCurveTo() ). 
                        We will convert these points to compute the two needed cubic control points (the starting/ending points are the same for both 
                        the quadratic and cubic curves. 

                        The exact equations for the two cubic control points are: 
                            cp0 = qp0 and cp3 = qp2 
                            cp1 = qp0 + (qp1 - qp0) * ratio 
                            cp2 = cp1 + (qp2 - qp0) * (1 - ratio) 
                        where ratio = (sqrt(2) - 1) * 4 / 3 exactly (approx. 0.5522847498307933984022516322796) 
                        if the quadratic is an approximation of an elliptic arc, and the cubic must approximate the same arc, or 
                        ratio = 2.0 / 3.0 for keeping the same quadratic curve. 

                        In the code below, we must compute both the x and y terms for each point separately. 

                        cp1x = qp0x + (qp1x - qp0x) * ratio; 
                        cp1y = qp0y + (qp1y - qp0y) * ratio; 
                        cp2x = cp1x + (qp2x - qp0x) * (1 - ratio); 
                        cp2y = cp1y + (qp2y - qp0y) * (1 - ratio); 

                        We will now  
                            a) replace the qp0x and qp0y variables with currentX and currentY (which *you* must store for each moveTo/lineTo/bezierCurveTo) 
                            b) replace the qp1x and qp1y variables with cpx and cpy (which we would have passed to quadraticCurveTo) 
                            c) replace the qp2x and qp2y variables with x and y. 
                        which leaves us with:  
                        */  
                        var ratio = 2.0 / 3.0; // 0.5522847498307933984022516322796 if the Bezier is approximating an elliptic arc with best fitting  
                        var cp1x = xCurrentPos + (cpx - xCurrentPos) * ratio;  
                        var cp1y = yCurrentPos + (cpy - yCurrentPos) * ratio;  
                        var cp2x = cp1x + (x - xCurrentPos) * (1 - ratio);  
                        var cp2y = cp1y + (y - yCurrentPos) * (1 - ratio);  

                        // and now call cubic Bezier curve to function   
                        bezierCurveTo( cp1x, cp1y, cp2x, cp2y, x, y );  

                        xCurrentPos = x;  
                        yCurrentPos = y;  
						return this;
                    },
                    rect = function(x, y, width, height){
                        context.rect(x, y, width, height);
                        return this;
                    },

                    /*
                     * Function: rectangle
                     *
                     * Draws a rectangle in the canvas container
                     *
                     * Parameters:
                     *  params.x - (Integer) Starting x coordinate. Defaults to the current position.
                     *  params.y - (Integer) Starting y coordinate. Defaults to the current position.
                     *  params.width - (Integer) Rectangle width. Defaults to 0.
                     *  params.height - (Integer) Rectangle height. Defaults to 0.
                     *  params.fillStyle - (String) The valid fillStyle.
                     *
                     * Returns:
                     *  An object containing the current x and y positions.
                     *
                     * See Also:
                     *
                     *  <circle>
                     *  <clearRect>
                     */
                    rectangle = function(params){
                        params = params || {};
                        var x = params.x || xCurrentPos,
                            y = params.y || yCurrentPos,
                            width = params.width || 0,
                            height = params.height || 0,
                            fillStyle = params.fillStyle || false;
                        if (fillStyle) {
                            context.fillStyle = fillStyle;
                            fillRect(x,y,width,height);
                        } else {
                            strokeRect(x,y,width,height);
                        }
                        return this;
                    },
	                /*
                     * Function: reset
                     *
                     * Resets the canvas container, erasing the currently displayed drawings.
                     *
                     * Returns:
                     *  An object containing the current x and y positions.
                     *
                     */
                    reset = function(){
                        container.width = container.width;
                        xCurrentPos = yCurrentPos = 0;
                        return this;
                    },
					restore = function(){
						context.restore();
						return this;
					},
	                roundedRectangle = function(x,y,width,height,radius){
                        // from MDN: https://developer.mozilla.org/en/Canvas_tutorial/Drawing_shapes
                        beginPath();  
                        moveTo(x,y+radius);  
                        lineTo(x,y+height-radius);  
                        quadraticCurveTo(x,y+height,x+radius,y+height);  
                        lineTo(x+width-radius,y+height);  
                        quadraticCurveTo(x+width,y+height,x+width,y+height-radius);  
                        lineTo(x+width,y+radius);  
                        quadraticCurveTo(x+width,y,x+width-radius,y);  
                        lineTo(x+radius,y);  
                        quadraticCurveTo(x,y,x,y+radius);  
                        stroke(); 
                        return this;
                    },
					save = function(){
						context.save();
						return this;
					},
                    strokeRect = function(x,y,width,height){
                        context.strokeRect(x,y,width,height);
                        return this;
                    },
                    stroke = function(){
                        context.stroke();
                        return this;
                    };
	             return {
                    arc: arc,
					arcTo : arcTo,
                    beginPath: beginPath,
                    bezierCurveTo: bezierCurveTo,
                    circle: circle,
                    clearRect: clearRect,
					clip: clip,
                    closePath: closePath,
					drawImage: drawImage,
                    fill: fill,
                    fillRect: fillRect,
                    getCurrentPos: getCurrentPos,
                    line: line,
                    lineTo: lineTo,
                    moveTo: moveTo,
                    quadraticCurveTo: quadraticCurveTo,
                    rect: rect,
                    rectangle: rectangle,
                    reset: reset,
					save : save,
					restore : restore,
                    roundedRect: roundedRectangle,
                    stroke: stroke,
                    strokeRect: strokeRect
                }
            }
        }

        Canvas.fn.init.prototype = Canvas.fn;

        return Canvas;
    }());
    window.Canvas = Canvas;
}(window));