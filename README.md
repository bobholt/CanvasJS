#CanvasJS


CanvasJS is a small helper library for the canvas 2d API. The goal is to extend and enhance the basic API while still remaining familiar. 

##API and Enhancements

There are currently two areas of focus

* _Chaining_ any method that doesn't return an explicit value is chainable. 
* _API Enhancements_ These range from new concepts (getting the boundingBox of the last operation, getting the currentPos (x and y) of the 'cursor',) missing methods (circle, rectangle) to convenience methods (canvas properties are now getter/setter methods.)

A simple example might look like this

```javascript
    var drawCanvas = function(id){
        var ctx = new Canvas(id); // creates a new Canvas object in the canvas with id="ctx"
        ctx.reset();
        for (var i = 0; i<1000; i++){
            var color = 'rgb(0,' + Math.floor(255 - i/7) + ',' +   
                         Math.floor(255 - i/100) + ')';  
            
            ctx.beginPath().line({x:.4*i,y:.4*i,angle: i, distance:i * .40 }).strokeStyle(color).stroke();
        }
        
    };
```    
    