package shape;

/**
 * Compact representation of data about a Geometrize shape used by renderers
 * @author Sam Twidale (http://samcodes.co.uk/)
 */
@:keep
typedef Shape = {
	var type:ShapeTypes; // Shape type id
	var color:Int; // RGBA888 color
	var alpha:Float; // Alpha 0-1
	var data:Array<Int>; // Geometry data, has a different structure per shape type
}