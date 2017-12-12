package;

import js.Browser;
import js.html.ButtonElement;
import optimizer.ShapeTweenOptimizer;

// Automatic HTML code completion, you need to point these to your HTML
@:build(CodeCompletion.buildLocalFile("bin/index.html"))
//@:build(CodeCompletion.buildUrl("http://shapetweens.geometrize.co.uk/"))
class ID {}

/**
 * A shape tween optimization tool
 * @author Sam Twidale (http://www.geometrize.co.uk/)
 */
class Main {
	public static inline var demoUrl:String = "http://shapetweens.geometrize.co.uk/"; // URL of the hosted website
	private static inline var updateFrameRate:Float = 30.0;
	
	// References to the HTML page elements we need
	private static inline function getElement(id:String):Dynamic {
		return Browser.document.getElementById(id);
	}
	private static var runPauseButton:ButtonElement = getElement(ID.runpausebutton);
	private static var stepButton:ButtonElement = getElement(ID.stepbutton);
	private static var resetButton:ButtonElement = getElement(ID.resetbutton);
	
	private var shapeTweenOptimizer:ShapeTweenOptimizer;
	
	private static function main():Void {
		var main = new Main();
	}
	
	private inline function new() {
		Browser.window.onload = onWindowLoaded;
	}
	
	private inline function onWindowLoaded():Void {
		init();
	}
	
	private inline function init():Void {
		shapeTweenOptimizer = new ShapeTweenOptimizer();
		
		animate();
	}
	
	/**
	 * Main update loop.
	 * @param	time	The time since the last frame of animation.
	 */
	private function animate():Void {
		shapeTweenOptimizer.step();
		
		var nextFrameDelay = Std.int((1.0 / Main.updateFrameRate) * 1000.0);
		Browser.window.setTimeout(function():Void {
			this.animate();
		}, nextFrameDelay);
	}
}