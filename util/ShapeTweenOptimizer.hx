package util;

import hscript.Interp;
import hscript.Parser;
import motion.Actuate;
import motion.easing.Quad;
import reader.ShapeJsonReader;
import shape.Shape;
import shape.ShapeTypes;
import shape.abstracts.Circle;
import util.FlxColor;

/**
 * The main shape mapping/tween optimizer
 * @author Sam Twidale (https://www.geometrize.co.uk/)
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
		costInterpreter.variables.set("ScriptUtil", util.ScriptUtil);
		//costInterpreter.variables.set("FlxColor", FlxColor);
		
		costScript = "";
		optimizationScript = "";
	}
	
	public function optimize():Void {
		if (firstShapes.length != secondShapes.length) {
			throw "Shape datasets must each contain the same number of shapes";
		}
		
		optimizerInterpreter = new hscript.Interp();
		optimizerInterpreter.variables.set("Math", Math);
		optimizerInterpreter.variables.set("ScriptUtil", ScriptUtil);
		//optimizerInterpreter.variables.set("FlxColor", FlxColor);
		optimizerInterpreter.variables.set("Std", Std);
		optimizerInterpreter.variables.set("costFunction", calculateScore);
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