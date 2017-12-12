package optimizer;

import flixel.math.FlxPoint;

/**
 * Scoring methods for minimizing various measures of differences between shape properties.
 * The goal of the optimization code is to minimize the differences.
 */
class CostFunctions {
	public static var calculateScore:CircleData->CircleData->Float = naiveCalculateCost;
	
	/**
	 * A simple/naive method to score differences between two shapes - simple weightings of the difference in area, distance and color.
	 */
	public static function naiveCalculateCost(d1:CircleData, d2:CircleData):Float {
		var smallerRad:Float = Math.min(d1.radius, d2.radius);
		var largerRad:Float = Math.max(d1.radius, d2.radius);
		var areaRatio:Float = Math.pow(largerRad / smallerRad, 2);
		
		var averageDiameter:Float = d1.radius + d2.radius;
		var startPos:FlxPoint = FlxPoint.get(d1.x, d1.y);
		var endPos:FlxPoint = FlxPoint.get(d2.x, d2.y);
		var centerDistance:Float = startPos.distanceTo(endPos);
		startPos.put();
		endPos.put();
		var distanceRatio:Float = centerDistance / averageDiameter;
		
		var smallerColor:Float = Math.max(Math.min(d1.rgb.lightness, d2.rgb.lightness), 0.05);
		var largerColor:Float = Math.max(d1.rgb.lightness, d2.rgb.lightness);
		var colorRatio:Float = largerColor / smallerColor;
		
		return areaRatio + distanceRatio + colorRatio;
	}
}