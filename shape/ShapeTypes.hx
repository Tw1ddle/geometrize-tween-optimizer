package shape;

/**
 * Type ids for shapes. Must match the ShapeTypes enum in the Geometrize library (see https://github.com/Tw1ddle/geometrize-lib or http://www.geometrize.co.uk/)
 * @author Sam Twidale (http://samcodes.co.uk/)
 */
@:enum abstract ShapeTypes(Int) from Int to Int {
	var RECTANGLE = 1;
	var ROTATED_RECTANGLE = 2;
	var TRIANGLE = 4;
	var ELLIPSE = 8;
	var ROTATED_ELLIPSE = 16;
	var CIRCLE = 32;
	var LINE = 64;
	var QUADRATIC_BEZIER = 128;
	var POLYLINE = 256;
	var SHAPE_COUNT = 9;
}