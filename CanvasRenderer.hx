package;

import js.Browser;
import js.html.CanvasElement;
import js.html.CanvasRenderingContext2D;
import js.html.DivElement;
import shape.Shape;
import shape.ShapeTypes;
import shape.abstracts.Circle;
import shape.abstracts.Ellipse;
import shape.abstracts.Rectangle;
import shape.abstracts.RotatedEllipse;
import shape.abstracts.RotatedRectangle;
import shape.abstracts.Triangle;
import util.FlxColor;

/**
 * Code for rendering geometrized shapes using HTML5 Canvas.
 * @author Sam Twidale (https://www.geometrize.co.uk/)
 */
@:keep
class CanvasRenderer {
	private var canvas:CanvasElement;
	private var ctx:CanvasRenderingContext2D;
	
	public function new(container:DivElement, intrinsicWidth:Int, intrinsicHeight:Int) {
		container.innerHTML = "";
		
		canvas = Browser.window.document.createCanvasElement();
		canvas.width = intrinsicWidth;
		canvas.height = intrinsicHeight;
		canvas.className = "shapecanvas";
		ctx = canvas.getContext2d();
		
		container.appendChild(canvas);
	}
	
	public function render(shapes:Array<Shape>) {
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		
		ctx.save();
		ctx.translate(100, 100);
		
		for (shape in shapes) {
			renderShape(shape);
		}
		
		ctx.restore();
	}
	
	private inline function renderShape(shape:Shape) {
		ctx.fillStyle = "rgba(" + shape.color.red + "," + shape.color.green + "," + shape.color.blue + "," + shape.alpha + ")";
		
		switch(shape.type) {
			case ShapeTypes.RECTANGLE:
				drawRectangle(shape.data, shape.color);
			case ShapeTypes.ROTATED_RECTANGLE:
				drawRotatedRectangle(shape.data, shape.color);
			case ShapeTypes.TRIANGLE:
				drawTriangle(shape.data, shape.color);
			case ShapeTypes.ELLIPSE:
				drawEllipse(shape.data, shape.color);
			case ShapeTypes.ROTATED_ELLIPSE:
				drawRotatedEllipse(shape.data, shape.color);
			case ShapeTypes.CIRCLE:
				drawCircle(shape.data, shape.color);
			default:
				throw "Encountered unsupported shape type";
		}
	}
	
	private inline function drawRectangle(g:Rectangle, c:FlxColor) {
		ctx.fillRect(g.x1, g.y1, g.x2 - g.x1, g.y2 - g.y1);
	}
	
	private inline function drawRotatedRectangle(g:RotatedRectangle, c:FlxColor) {
		ctx.save();
		ctx.translate(g.x1 + (g.x2 - g.x1) / 2, g.y1 + (g.y2 - g.y1) / 2);
		ctx.rotate(g.angle * (Math.PI/180));
		ctx.fillRect(-(g.x2 - g.x1) / 2, -(g.y2 - g.y1) / 2, g.x2 - g.x1, g.y2 - g.y1);
		ctx.restore();
	}
	
	private inline function drawTriangle(g:Triangle, c:FlxColor) {
		ctx.beginPath();
		ctx.moveTo(g.x1, g.y1);
		ctx.lineTo(g.x2, g.y2);
		ctx.lineTo(g.x3, g.y3);
		ctx.lineTo(g.x1, g.y1);
		ctx.fill();
	}
	
	private inline function drawEllipse(g:Ellipse, c:FlxColor) {
		ctx.beginPath();
		ctx.ellipse(g.x, g.y, g.rx, g.ry, 0, 0, 360);
		ctx.fill();
	}
	
	private inline function drawRotatedEllipse(g:RotatedEllipse, c:FlxColor) {
		ctx.beginPath();
		ctx.ellipse(g.x, g.y, g.rx, g.ry, g.angle * (Math.PI/180), 0, 360);
		ctx.fill();
	}
	
	private inline function drawCircle(g:Circle, c:FlxColor) {
		ctx.beginPath();
		ctx.arc(g.x, g.y, g.r, 0, 2 * Math.PI);
		ctx.fill();
	}
}
