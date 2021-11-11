package;

import hscript.Interp;
import hscript.Parser;
import motion.Actuate;
import motion.easing.Quad;
import reader.ShapeJsonReader;
import shape.Shape;
import shape.ShapeTypes;
import shape.abstracts.Circle;
import util.FlxColor;

class ScriptUtil {
	public static function euclideanDistance(x1:Float, y1:Float, x2:Float, y2:Float):Float {
		var dx = x1 - x2;
		var dy = y1 - y2;
		
		var dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
		return dist;
	}
	
	public static function greedyBruteForceOptimize(firstShapes:Array<Shape>, secondShapes:Array<Shape>, indexMapping:Array<Int>, costFunction:Shape->Shape->Float):Void {
		for(i in 0...firstShapes.length) {
			for(j in 0...firstShapes.length) {
				var firstLeftIdx = i;
				var secondLeftIdx = j;
				var firstRightIdx = indexMapping[firstLeftIdx];
				var secondRightIdx = indexMapping[secondLeftIdx];
				
				var firstLeft = firstShapes[firstLeftIdx];
				var firstRight = secondShapes[firstRightIdx];
				var secondLeft = firstShapes[secondLeftIdx];
				var secondRight = secondShapes[secondRightIdx];
				
				var currentScore = costFunction(firstLeft, firstRight) + costFunction(secondLeft, secondRight);
				var swappedScore = costFunction(firstLeft, secondRight) + costFunction(secondLeft, firstRight);
				
				if(swappedScore < currentScore) {
					indexMapping[firstLeftIdx] = secondRightIdx;
					indexMapping[secondLeftIdx] = firstRightIdx;
				}
			}
		}
	}
	
	public static function hungarianAlgorithm(firstShapes:Array<Shape>, secondShapes:Array<Shape>, indexMapping:Array<Int>, costFunction:Shape->Shape->Float):Void {
		// TODO - https://en.wikipedia.org/wiki/Hungarian_algorithm
		var costMatrix = [];
	}
}

class ShapeInterpolator {
	public static function interpolate(firstShape:Shape, secondShape:Shape, outShape:Shape, lerpStart:Float, lerpEnd:Float, t:Float):Void {
		t = (t - lerpStart) / (lerpEnd - lerpStart);
		t = bound(t, 0, 1);
		
		// NOTE only works on pairs of circles at the moment
		if (firstShape.type == ShapeTypes.CIRCLE && secondShape.type == ShapeTypes.CIRCLE) {
			var firstData:Circle = firstShape.data;
			var secondData:Circle = secondShape.data;
			
			var outData:Circle = outShape.data;
			
			outData.x = cast lerp(cast firstData.x, cast secondData.x, t);
			outData.y = cast lerp(cast firstData.y, cast secondData.y, t);
			outData.r = cast lerp(cast firstData.r, cast secondData.r, t);
			outShape.color = FlxColor.interpolate(firstShape.color, secondShape.color, t);
			outShape.alpha = lerp(firstShape.alpha, secondShape.alpha, t);
		}
	}
	
	private static inline function lerp(a:Float, b:Float, ratio:Float):Float {
		return a + ratio * (b - a);
	}
	
	private static inline function bound(value:Float, min:Float, max:Float):Float {
		var lowerBound:Float = value < min ? min : value;
		return lowerBound > max ? max : lowerBound;
	}
}

/**
 * The main shape mapping/tween optimizer
 * @author Sam Twidale (http://www.geometrize.co.uk/)
 */
class ShapeTweenOptimizer {
	private var renderCallback:Array<Shape>->Void;
	public var firstShapes(default, null):Array<Shape>;
	public var secondShapes(default, null):Array<Shape>;
	private var indexMapping:Array<Int>;
	
	public var currentShapes(default, null):Array<Shape>;
	
	private var transition(default, set):Float = 0;
	private function set_transition(time:Float):Float {
		this.transition = time;
		
		var i = 0;
		while (i < currentShapes.length) {
			ShapeInterpolator.interpolate(firstShapes[i], secondShapes[indexMapping[i]], currentShapes[i], i * 0.0005, 0.5 + i * 0.0005, transition);
			i++;
		}
		
		return time;
	}
	
	private var parser:Parser;
	private var costInterpreter:Interp;
	private var optimizerInterpreter:Interp;
	private var costScript:String;
	private var optimizationScript:String;
	
	public function new(renderCallback:Array<Shape>->Void) {
		this.renderCallback = renderCallback;
		firstShapes = [];
		secondShapes = [];
		indexMapping = [];
		currentShapes = [];
		
		parser = new hscript.Parser();
		costInterpreter = new hscript.Interp();
		costInterpreter.variables.set("Math", Math);
		costInterpreter.variables.set("ScriptUtil", ScriptUtil);
		costInterpreter.variables.set("FlxColor", FlxColor);
		
		optimizerInterpreter = new hscript.Interp();
		optimizerInterpreter.variables.set("Math", Math);
		optimizerInterpreter.variables.set("ScriptUtil", ScriptUtil);
		optimizerInterpreter.variables.set("FlxColor", FlxColor);
		optimizerInterpreter.variables.set("Std", Std);
		optimizerInterpreter.variables.set("costFunction", calculateScore);
		
		costScript = "";
		optimizationScript = "";
	}
	
	public function optimize():Void {
		if (firstShapes.length != secondShapes.length) {
			throw "Shape datasets must each contain the same number of shapes";
		}
		
		optimizerInterpreter.variables.set("firstShapes", firstShapes);
		optimizerInterpreter.variables.set("secondShapes", secondShapes);
		optimizerInterpreter.variables.set("indexMapping", indexMapping);
		optimizerInterpreter.execute(parser.parseString(optimizationScript));
		
		Actuate.tween(this, 3, { transition: transition > 0.5 ? 0 : 1 }).onUpdate(function() {
			this.transition = transition;
			renderCallback(currentShapes);
		}).ease(Quad.easeInOut);
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
	
	public function calculateScore(first:Shape, second:Shape):Float {
		costInterpreter.variables.set("a", first);
		costInterpreter.variables.set("b", second);
		return costInterpreter.execute(parser.parseString(costScript));
	}
	
	public function calculateTotalScore():Float {
		var total:Float = 0;
		var idx:Int = 0;
		while (idx < currentShapes.length) {
			total += calculateScore(firstShapes[idx], secondShapes[indexMapping[idx]]);
			idx++;
		}
		return total;
	}
	
	/**
	 * Converts the current mapping from the first set of shape indices to the second as a string.
	 * @return A string mapping the shape indices from the first dataset to the second.
	 */
	public function getShapeIndicesMapping():String {
		var data:String = "";
		
		var idx:Int = 0;
		while (idx < currentShapes.length) {
			data += idx + "," + Std.string(indexMapping[idx]) + "\r\n";
			idx++;
		}
		
		return data;
	}
	
	private function unpackShapeData(json:Dynamic):Array<Shape> {
		return ShapeJsonReader.shapesFromJson(json);
	}
	
	private function setCurrentShapes():Void {
		currentShapes = [];
		indexMapping = [];
		var i = 0;
		while(i < firstShapes.length) {
			currentShapes.push(util.Cloner.clone(firstShapes[i]));
			indexMapping.push(i);
			i++;
		}
	}
}