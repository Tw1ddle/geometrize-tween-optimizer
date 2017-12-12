package optimizer;

import flixel.FlxG;
import flixel.FlxState;
import flixel.text.FlxText;
import flixel.tweens.FlxTween;
import flixel.ui.FlxButton;
import flixel.util.FlxAxes;
import flixel.util.FlxColor;
import flixel.util.FlxSignal;
import haxe.Json;
import openfl.Assets;

/**
 * The root state of the app. Handles input and loading/reloading of shape data.
 */
class PlayState extends FlxState {
	private var errorMessage:FlxText = null;
	private var errorText(never, set):String;
	private var scoreText:FlxText = new FlxText(0, 30, 0, "Score: ...", 20);
	private var score(never, set):Float;
	private var currentImageIndex:Int = 1;
	
	private var saveSignal:FlxSignal = new FlxSignal();
	
	override public function create():Void {
		bgColor = FlxColor.BLACK;
		persistentUpdate = true;
		persistentDraw = true;
		
		var reloadButton = new FlxButton(30, 30, "Reload", function() {
			reload();
		});
		add(reloadButton);
		
		var invertBackgroundButton = new FlxButton(30, 60, "Invert Bg", function() {
			bgColor = (bgColor == FlxColor.BLACK ? FlxColor.WHITE : FlxColor.BLACK);
		});
		add(invertBackgroundButton);
		
		errorMessage = new FlxText(0, 0, 0, "", 16);
		add(errorMessage);
		
		reloadButton.setPosition(30, FlxG.height - 30);
		invertBackgroundButton.setPosition(130, FlxG.height - 30);
		
		scoreText.screenCenter(FlxAxes.X);
		scoreText.color = FlxColor.WHITE;
		add(scoreText);
		
		reload();
	}
	
	override public function update(dt:Float):Void {
		super.update(dt);
		if (FlxG.keys.justPressed.RIGHT) {
			currentImageIndex++;
			reload();
		} else if (FlxG.keys.justPressed.LEFT) {
			currentImageIndex--;
			reload();
		}
		
		if (FlxG.keys.justPressed.S) {
			saveSignal.dispatch();
		}
	}
	
	private function reload():Void {
		// Cancel all tweens
		FlxTween.globalManager.clear();
		
		// Read the two shape data files
		var composePath = function(index:Int) {
			return "assets/data/image" + Std.string(index) + ".json";
		}
		var imagePath1:String = composePath(currentImageIndex);
		var imagePath2:String = composePath(currentImageIndex + 1);
		if (!imageDataExists(imagePath1, imagePath2)) {
			errorText = "Invalid image data paths specified";
			return;
		}
		
		// Load the image data
		var imageStr1:String = Assets.getText(imagePath1);
		var imageStr2:String = Assets.getText(imagePath2);
		
		// Unpack the JSON into shape data arrays
		var unpackShapeData = function(json:Array<Dynamic>):Array<CircleData> {
			var getShapeColor = function(color:Array<Int>):FlxColor {
				return ((color[0] << 16) | (color[1] << 8) | (color[2])) & 0xFFFFFF;
			}
			
			var data:Array<CircleData> = [];
			for (i in 0...json.length) {
				var s:Dynamic = json[i];
				if (s.type != 32) {
					continue; // Only handle circles for now
				}
				data.push({index: i, type: s.type, x: s.data[0], y: s.data[1], radius: s.data[2], rgb: getShapeColor(s.color), alpha: s.color[3] / 255});
			}
			
			return data;
		};
		
		var imageOne:Array<CircleData> = unpackShapeData(Json.parse(imageStr1).shapes);
		var imageTwo:Array<CircleData> = unpackShapeData(Json.parse(imageStr2).shapes);
		if (imageOne.length != imageTwo.length) {
			errorText = "Source image datas must contain same number of shapes";
		}
		
		closeSubState();
		
		var subState:OptimizeSubState = new OptimizeSubState(imageOne, imageTwo);
		subState.scoreUpdatedSignal.add(onScoreUpdated);
		
		saveSignal.removeAll();
		saveSignal.add(subState.saveMapping);
		
		openSubState(subState);
	}
	
	private function onScoreUpdated(score:Float):Void {
		this.score = score;
	}
	
	private function imageDataExists(path1:String, path2:String):Bool {
		return Assets.exists(path1) && Assets.exists(path2);
	}
	
	private function set_errorText(text:String):String {
		errorMessage.text = text;
		errorMessage.screenCenter(FlxAxes.X);
		return text;
	}
	
	private function set_score(score:Float):Float {
		scoreText.text = "Score: " + Std.string(Std.int(score));
		scoreText.screenCenter(FlxAxes.X);
		return score;
	}
}