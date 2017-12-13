package optimizer;

import hscript.Interp;
import hscript.Parser;
import reader.ShapeJsonReader;
import shape.Shape;

class ShapeInterpolator {
	public static function interpolate(firstData:Shape, secondData:Shape, outputData:Shape, lerpStart:Float, lerpEnd:Float, t:Float):Void {
		var t = (t - lerpStart) / (lerpEnd - lerpStart);
		//t = FlxMath.bound(t, 0, 1);
		//t = FlxEase.quadInOut(t);
		//x = FlxMath.lerp(startData.x, endData.x, t);
		//y = FlxMath.lerp(startData.y, endData.y, t);
		//color = FlxColor.interpolate(startData.rgb, endData.rgb, t);
		//radius = FlxMath.lerp(startData.radius, endData.radius, t);
		//alpha = FlxMath.lerp(startData.alpha, endData.alpha, t);
	}
}

/**
 * The main shape mapping/tween optimizer
 * @author Sam Twidale (http://www.geometrize.co.uk/)
 */
class ShapeTweenOptimizer {
	public var firstShapes(default, null):Array<Shape>;
	public var secondShapes(default, null):Array<Shape>;
	
	public var currentShapes(default, null):Array<Shape>;
	
	private var transition(default, set):Float = 0;
	private function set_transition(time:Float):Float {
		this.transition = time;
		
		// TODO interpolate all the shape data to this point
		/*		for (s in sprites) {
			s.lerpStart = 0 + 0.0005 * i;
			s.lerpEnd = 0.5 + 0.0005 * i;
			i++;
		}*/
		//ShapeInterpolator.interpolate();
		
		return time;
	}
	
	private var parser:Parser;
	private var interpreter:Interp;
	private var costScript:String;
	private var optimizationScript:String;
	
	public function new() {
		firstShapes = [];
		secondShapes = [];
		currentShapes = [];
		
		parser = new hscript.Parser();
		interpreter = new hscript.Interp();
		costScript = "";
		optimizationScript = "";
	}
	
	public function optimize():Void {
		if (firstShapes.length != secondShapes.length) {
			throw "Shape datasets must each contain the same number of shapes";
		}
		
		var parsedCode = parser.parseString(optimizationScript);
		interpreter.execute(parsedCode);
	}
	
	public function tween():Void {
		// TODO tween the transition time, and by extension tween the shape positions
		//FlxTween.tween(this, { transition: 1 }, 2, {type: FlxTween.PINGPONG, onComplete: function(_) {
		//	OptimizeFunctions.optimize(shapeGroup);
		//	calculateTotalScore();
		//}});
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
		setCurrentShapes();
	}
	
	public function setDatasetTwo(json:String):Void {
		secondShapes = unpackShapeData(json);
		setCurrentShapes();
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
	
	private function setCurrentShapes():Void {
		currentShapes = [];
		for (shape in firstShapes) {
			currentShapes.push(Reflect.copy(shape));
		}
	}
}