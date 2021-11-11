package util;

import shape.Shape;
import shape.ShapeTypes;
import shape.abstracts.Circle;

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