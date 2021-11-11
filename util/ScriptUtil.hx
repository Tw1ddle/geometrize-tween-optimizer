package util;

import shape.Shape;

class ScriptUtil {
	public static function euclideanDistance(x1:Float, y1:Float, x2:Float, y2:Float):Float {
		var dx = x1 - x2;
		var dy = y1 - y2;
		
		var dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
		return dist;
	}
	
	public static function greedyBruteForceOptimize(firstShapes:Array<Shape>, secondShapes:Array<Shape>, indexMapping:Array<Int>, costFunction:Shape->Shape->Float):Void {
		for(i in 0...firstShapes.length) {
			for(j in 0...firstShapes.length) {
				var firstLeftIdx = i;
				var secondLeftIdx = j;
				var firstRightIdx = indexMapping[firstLeftIdx];
				var secondRightIdx = indexMapping[secondLeftIdx];
				
				var firstLeft = firstShapes[firstLeftIdx];
				var firstRight = secondShapes[firstRightIdx];
				var secondLeft = firstShapes[secondLeftIdx];
				var secondRight = secondShapes[secondRightIdx];
				
				var currentScore = costFunction(firstLeft, firstRight) + costFunction(secondLeft, secondRight);
				var swappedScore = costFunction(firstLeft, secondRight) + costFunction(secondLeft, firstRight);
				
				if(swappedScore < currentScore) {
					indexMapping[firstLeftIdx] = secondRightIdx;
					indexMapping[secondLeftIdx] = firstRightIdx;
				}
			}
		}
	}
	
	public static function hungarianAlgorithm(firstShapes:Array<Shape>, secondShapes:Array<Shape>, indexMapping:Array<Int>, costFunction:Shape->Shape->Float):Void {
		// TODO - https://en.wikipedia.org/wiki/Hungarian_algorithm
		var costMatrix = [];
	}

	public static function toInt(f:Float):Int {
		return Std.int(f);
	}
}