package reader;

/**
 * Shape data as it is represented in JSON data exported from Geometrize
 * @author Sam Twidale (http://samcodes.co.uk/)
 */
typedef ShapeJsonData = {
	var type:Int; // Shape type id
	var data:Array<Int>; // Geometry data, has a different structure per shape type
	var color:Array<Int>; // R,G,B,A color components
	var score:Float;
}