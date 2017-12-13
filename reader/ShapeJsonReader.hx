package reader;

import haxe.Json;
import shape.Shape;

/**
 * Reads JSON data that describes shapes and converts it into data structures for convenient access at runtime
 * @author Sam Twidale (http://samcodes.co.uk/)
 */
 @:keep
class ShapeJsonReader {
	// Reads JSON into an array of data objects with all the info about the shapes
	public static function shapeDataFromJson(jsonData:String):Array<ShapeJsonData> {
		var json = Json.parse(jsonData);
		var shapeDatas:Array<ShapeJsonData> = json.shapes;
		return shapeDatas;
	}
	
	// Reads JSON into an array of compact shape objects with only the info renderers are likely to use
	public static function shapesFromJson(jsonData:String):Array<Shape> {
		var json = Json.parse(jsonData);
		
		var shapeDatas:Array<ShapeJsonData> = json.shapes;
		
		var shapes:Array<Shape> = [];
		
		var i = 0;
		for (shapeData in shapeDatas) {
			var colorArr:Array<Int> = shapeData.color;
			
			var r = Std.int(colorArr[0]) & 0xFF;
			var g = Std.int(colorArr[1]) & 0xFF;
			var b = Std.int(colorArr[2]) & 0xFF;
			var a = Std.int(colorArr[3]) & 0xFF;
			
			var rgba:Int = (r << 24) + (g << 16) + (b << 8) + (a);
			
			shapes.push({ index: i, type: shapeData.type, color: rgba, data: shapeData.data });
			
			i++;
		}
		
		return shapes;
	}
}