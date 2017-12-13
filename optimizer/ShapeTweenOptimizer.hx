package optimizer;

import hscript.Interp;
import hscript.Parser;
import reader.ShapeJsonReader;
import shape.Shape;

/*
// Data describing one of the circles that makes up a geometrized image.
typedef CircleData = {
	index:Int,
	type:Int,
	x:Float,
	y:Float,
	radius:Float,
	rgb:FlxColor,
	alpha:Float
}
*/

 /*
class CircleSprite extends FlxSprite {
	public var startData:CircleData;
	public var endData:CircleData;
	
	public var lerpStart:Float;
	public var lerpEnd:Float;
	public var radius(default, set):Float;
	private static var gfxRadius:Int = 200;
	
	public function new(startData:CircleData, endData:CircleData) {
		super(0, 0);
		this.startData = startData;
		this.endData = endData;
		
		if (FlxG.bitmap.get("circ") == null) {
			makeGraphic(gfxRadius * 2, gfxRadius * 2, 0, false, "circ");
			FlxSpriteUtil.drawCircle(this, -1, -1, gfxRadius);
		} else {
			loadGraphic("circ");
		}
		
		interpolate(0);
	}
	
	public function interpolate(t:Float):Void {
		var t = (t - lerpStart) / (lerpEnd - lerpStart);
		
		t = FlxMath.bound(t, 0, 1);
		t = FlxEase.quadInOut(t);
		
		x = FlxMath.lerp(startData.x, endData.x, t);
		y = FlxMath.lerp(startData.y, endData.y, t);
		
		color = FlxColor.interpolate(startData.rgb, endData.rgb, t);
		radius = FlxMath.lerp(startData.radius, endData.radius, t);
		alpha = FlxMath.lerp(startData.alpha, endData.alpha, t);
	}
	
	private function set_radius(r:Float):Float {
		if (this.radius == r) {
			return r;
		}
		this.radius = r;
		
		var s:Float = r / gfxRadius;
		scale.set(s, s);
		
		updateHitbox();
		
		offset.x += radius;
		offset.y += radius;
		
		return r;
	}
}
*/

/**
 * The main shape mapping/tween optimizer
 * @author Sam Twidale (http://www.geometrize.co.uk/)
 */
class ShapeTweenOptimizer {
	public var firstShapes(default, null):Array<Shape>;
	public var secondShapes(default, null):Array<Shape>;
	
	public var currentShapes(get, never):Array<Shape>;
	public function get_currentShapes():Array<Shape> {
		return firstShapes; // TODO return a lerped set of shapes
	}
	
	private var parser:Parser;
	private var interpreter:Interp;
	private var costScript:String;
	private var optimizationScript:String;
	
	public function new() {
		firstShapes = [];
		secondShapes = [];
		parser = new hscript.Parser();
		interpreter = new hscript.Interp();
		costScript = "";
		optimizationScript = "";
	}
	
	public function step():Void {
		if (firstShapes.length != secondShapes.length) {
			throw "Shape datasets must each contain the same number of shapes";
		}
		
		var parsedCode = parser.parseString(optimizationScript);
		interpreter.execute(parsedCode);
	}
	
	public function setCostScript(script:String):Void {
		var parsedCode = parser.parseString(script);
		this.costScript = script;
	}
	
	public function setOptimizationScript(script:String):Void {
		var parsedCode = parser.parseString(script);
		this.optimizationScript = script;
	}
	
	public function setDatasetOne(json:String):Void {
		firstShapes = unpackShapeData(json);
	}
	
	public function setDatasetTwo(json:String):Void {
		secondShapes = unpackShapeData(json);
	}
	
	public function calculateScore():Float {
		/*
			var total:Float = 0;
			for (shape in shapeGroup) {
				total += CostFunctions.calculateScore(shape.startData, shape.endData);
			}
			scoreUpdatedSignal.dispatch(total);
			return total;
		}
		*/
		
		return 0;
	}
	
	/**
	 * Converts the current mapping from one set of shape indices to the other into a string.
	 * @return A string mapping the shape indices from the first dataset to the second.
	 */
	public function getShapeIndicesMapping():String {
		var data:String = "";
		
		for (shape in currentShapes) {
			//	var start = sprite.startData.index;
			//	var end = sprite.endData.index;
			//	data += Std.string(start) + "," + Std.string(end) + "\r\n";
		}
		
		return data;
	}
	
	private function unpackShapeData(json:Dynamic):Array<Shape> {
		return ShapeJsonReader.shapesFromJson(json);
	}
}