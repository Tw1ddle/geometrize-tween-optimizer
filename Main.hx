package;

import js.Browser;
import js.html.ButtonElement;
import js.html.DivElement;
import js.html.Element;
import js.html.Event;
import js.html.ParagraphElement;
import js.html.SelectElement;
import js.html.TextAreaElement;
import shape.Shape;
import util.CanvasRenderer;
import util.ShapeTweenOptimizer;

using StringTools;

// Automatic HTML code completion, you need to point these to your HTML
@:build(util.CodeCompletion.buildLocalFile("bin/index.html"))
//@:build(CodeCompletion.buildUrl("https://tweenoptimizer.geometrize.co.uk/"))
class ID {}

@:build(reader.FolderReader.build("bin/assets/cost_scripts"))
@:keep
class CostScripts {
}

@:build(reader.FolderReader.build("bin/assets/optimization_scripts"))
@:keep
class OptimizationScripts {
}

@:build(reader.FolderReader.build("bin/assets/preset_datasets"))
@:keep
class ShapeDatasets {
}

/**
 * A shape tween optimization tool
 * @author Sam Twidale (https://www.geometrize.co.uk/)
 */
class Main {
	public static inline var demoUrl:String = "https://tweenoptimizer.geometrize.co.uk/"; // URL of the hosted website
	
	private var score(get, set):Float;
	private var passes(get, set):Int;
	
	// References to the HTML page elements we need
	private static inline function getElement(id:String):Dynamic {
		return Browser.document.getElementById(id);
	}
	private static var scoreText:Element = getElement(ID.scoretext);
	private static var optimizationPassesText:Element = getElement(ID.optimizationpassestext);
	
	private static var rendererContainer:DivElement = getElement(ID.shapecanvascontainer);
	
	private static var stepButton:ButtonElement = getElement(ID.stepbutton);
	private static var resetButton:ButtonElement = getElement(ID.resetbutton);
	private static var generalErrorsText:ParagraphElement = getElement(ID.generalerrors);
	
	private static var costFunctionTextArea:TextAreaElement = getElement(ID.costfunctiontextedit);
	private static var costFunctionPresetSelect:SelectElement = getElement(ID.costfunctionpresets);
	private static var costFunctionErrorsText:ParagraphElement = getElement(ID.costfunctionerrors);
	
	private static var optimizationFunctionTextArea:TextAreaElement = getElement(ID.optimizefunctiontextedit);
	private static var optimizationFunctionPresetSelect:SelectElement = getElement(ID.optimizefunctionspresets);
	private static var optimizationFunctionErrorsText:ParagraphElement = getElement(ID.optimizationfunctionerrors);
	
	private static var datasetOnePresetSelect:SelectElement = getElement(ID.datasetonepresets);
	private static var datasetOneTextArea:TextAreaElement = getElement(ID.datasetonetextedit);
	private static var datasetOneErrorsText:ParagraphElement = getElement(ID.datasetoneerrors);
	
	private static var datasetTwoPresetSelect:SelectElement = getElement(ID.datasettwopresets);
	private static var datasetTwoTextArea:TextAreaElement = getElement(ID.datasettwotextedit);
	private static var datasetTwoErrorsText:ParagraphElement = getElement(ID.datasettwoerrors);
	
	private static var resultsDataTextArea:TextAreaElement = getElement(ID.resultsdatatextedit);
	
	private var optimizer:ShapeTweenOptimizer;
	private var renderer:CanvasRenderer;
	
	private static function main():Void {
		var main = new Main();
	}
	
	private inline function new() {
		Browser.window.onload = onWindowLoaded;
	}
	
	private inline function onWindowLoaded():Void {
		init();
	}
	
	/**
	 * One-time initialization
	 */
	private inline function init():Void {
		setupEventListeners();
		populateSelectMenus();
		reset();
	}
	
	/**
	 * Reset everything to default settings
	 */
	private function reset():Void {
		optimizer = new ShapeTweenOptimizer(this.render);
		renderer = new CanvasRenderer(rendererContainer, 800, 800);
		score = 0;
		passes = 0;
		
		resetErrors();
		resetScripts();
		resetDatasets();
		
		step();
	}
	
	private function resetErrors():Void {
		generalErrorsText.textContent = "";
		costFunctionErrorsText.textContent = "";
		optimizationFunctionErrorsText.textContent = "";
		datasetOneErrorsText.textContent = "";
		datasetTwoErrorsText.textContent = "";
	}
	
	private function resetScripts():Void {
		costFunctionPresetSelect.value = "simpleweightings";
		costFunctionPresetSelect.dispatchEvent(new Event("change"));
		
		optimizationFunctionPresetSelect.value = "randomswapping";
		optimizationFunctionPresetSelect.dispatchEvent(new Event("change"));
	}
	
	private function resetDatasets():Void {
		datasetOnePresetSelect.value = "cinderella";
		datasetOnePresetSelect.dispatchEvent(new Event("change"));
		
		datasetTwoPresetSelect.value = "windflowers";
		datasetTwoPresetSelect.dispatchEvent(new Event("change"));
	}
	
	/**
	 * Set up event listeners for page UI elements
	 */
	private inline function setupEventListeners():Void {
		stepButton.addEventListener("click", function() {
			step();
		});
		
		resetButton.addEventListener("click", function() {
			reset();
		});
		
		costFunctionPresetSelect.addEventListener("change", function() {
			var code = getPresetCostFunctionScript(costFunctionPresetSelect.value);
			costFunctionTextArea.value = code;
			setCostFunctionScript(code);
		});
		costFunctionTextArea.addEventListener("keypress", function() {
			setCostFunctionScript(costFunctionTextArea.value);
		});
		costFunctionTextArea.addEventListener("change", function() {
			setCostFunctionScript(costFunctionTextArea.value);
		});
		
		optimizationFunctionPresetSelect.addEventListener("change", function() {
			var code = getPresetOptimizationFunctionScript(optimizationFunctionPresetSelect.value);
			optimizationFunctionTextArea.value = code;
			setOptimizationFunctionScript(code);
		});
		optimizationFunctionTextArea.addEventListener("keypress", function() {
			setOptimizationFunctionScript(optimizationFunctionTextArea.value);
		});
		optimizationFunctionTextArea.addEventListener("change", function() {
			setOptimizationFunctionScript(optimizationFunctionTextArea.value);
		});
		
		datasetOnePresetSelect.addEventListener("change", function() {
			var data = getPresetShapeDataset(datasetOnePresetSelect.value);
			datasetOneTextArea.value = data;
			setDatasetOne(data);
		});
		datasetOneTextArea.addEventListener("keypress", function() {
			setDatasetOne(datasetOneTextArea.value);
		});
		datasetOneTextArea.addEventListener("change", function() {
			setDatasetOne(datasetOneTextArea.value);
		});
		
		datasetTwoPresetSelect.addEventListener("change", function() {
			var data = getPresetShapeDataset(datasetTwoPresetSelect.value);
			datasetTwoTextArea.value = data;
			setDatasetTwo(data);
		});
		datasetTwoTextArea.addEventListener("keypress", function() {
			setDatasetTwo(datasetTwoTextArea.value);
		});
		datasetTwoTextArea.addEventListener("change", function() {
			setDatasetTwo(datasetTwoTextArea.value);
		});
	}
	
	private function populateSelectMenus():Void {
		var costScripts = Type.getClassFields(CostScripts);
		var optimizeScripts = Type.getClassFields(OptimizationScripts);
		var datasets = Type.getClassFields(ShapeDatasets);
		
		var populateSelectMenu = function(fields:Array<String>, element:SelectElement):Void {
			for (field in fields) {
				var option = js.Browser.document.createOptionElement();
				option.value = field;
				option.appendChild(Browser.document.createTextNode(field));
				element.appendChild(option);
			}
		}
		
		populateSelectMenu(costScripts, costFunctionPresetSelect);
		populateSelectMenu(optimizeScripts, optimizationFunctionPresetSelect);
		populateSelectMenu(datasets, datasetOnePresetSelect);
		populateSelectMenu(datasets, datasetTwoPresetSelect);
	}
	
	/**
	 * Step the shape tween optimizer
	 */
	private function step():Void {
		try {
			optimizer.optimize();
			generalErrorsText.textContent = "";
			score = optimizer.calculateTotalScore();
			passes = passes + 1;
		} catch (e:Dynamic) {
			generalErrorsText.textContent = Std.string(e);
			return;
		}
		
		render(optimizer.currentShapes);
		updateResultsData();
	}
	
	/**
	 * Renders the shape data to the canvas
	 */
	public function render(shapes:Array<Shape>):Void {
		renderer.render(shapes);
	}
	
	/**
	 * Sets the cost function used by the shape tween optimizer
	 * @param	script hscript code for the cost function
	 */
	private function setCostFunctionScript(script:String):Void {
		try {
			optimizer.setCostScript(script);
			costFunctionErrorsText.textContent = "";
		} catch (e:Dynamic) {
			costFunctionErrorsText.textContent = Std.string(e);
		}
	}
	
	/**
	 * Sets the optimization function used by the shape tween optimizer
	 * @param	script hscript code for the optimization function
	 */
	private function setOptimizationFunctionScript(script:String):Void {
		try {
			optimizer.setOptimizationScript(script);
			optimizationFunctionErrorsText.textContent = "";
		} catch (e:Dynamic) {
			optimizationFunctionErrorsText.textContent = Std.string(e);
		}
	}
	
	/**
	 * Updates the first set of shape data used by the shape tween optimizer
	 * @param	json String containing JSON data describing the shapes
	 */
	private function setDatasetOne(json:String):Void {
		try {
			optimizer.setDatasetOne(json);
			datasetOneErrorsText.textContent = "";
		} catch (e:Dynamic) {
			datasetOneErrorsText.textContent = Std.string(e);
		}
	}
	
	/**
	 * Updates the second set of shape data used by the shape tween optimizer
	 * @param	data String containing JSON data describing the shapes
	 */
	private function setDatasetTwo(json:String):Void {
		try {
			optimizer.setDatasetTwo(json);
			datasetTwoErrorsText.textContent = "";
		} catch (e:Dynamic) {
			datasetTwoErrorsText.textContent = Std.string(e);
		}
	}
	
	/**
	 * Updates the results data text area on the page
	 */
	private function updateResultsData():Void {
		resultsDataTextArea.value = optimizer.getShapeIndicesMapping();
	}
	
	/**
	 * Gets the score value on the page
	 */
	private function get_score():Float {
		return Std.parseFloat(scoreText.textContent);
	}
	
	/**
	 * Updates the score text value on the page
	 * @param	score The tween optimization score value
	 */
	private function set_score(score:Float):Float {
		scoreText.textContent = Std.string(Std.int(score));
		return score;
	}
	
	/**
	 * Gets the number of passes text value on the page
	 */
	private function get_passes():Int {
		return Std.parseInt(optimizationPassesText.textContent);
	}
	
	/**
	 * Updates the number of passes text value on the page
	 * @param	passes The number of optimization passes
	 */
	private function set_passes(passes:Int):Int {
		optimizationPassesText.textContent = Std.string(Std.int(passes));
		return passes;
	}
	
	/**
	 * Gets the given cost function hscript code for the given id
	 * @param	id The id (select element item) for the given preset
	 * @return Cost function code for the given script id
	 */
	private function getPresetCostFunctionScript(id:String):String {
		return Reflect.field(CostScripts, id);
	}
	
	/**
	 * Gets the given optimization function hscript code for the given id
	 * @param	id The id (select element item) for the given preset
	 * @return Optimization function code for the given script id
	 */
	private function getPresetOptimizationFunctionScript(id:String):String {
		return Reflect.field(OptimizationScripts, id);
	}
	
	/**
	 * Gets the given preset shape dataset for the given id
	 * @param	id The id (select element item) for the given preset
	 * @return Preset JSON code for the given shape dataset id
	 */
	private function getPresetShapeDataset(id:String):String {
		return Reflect.field(ShapeDatasets, id);
	}
}
