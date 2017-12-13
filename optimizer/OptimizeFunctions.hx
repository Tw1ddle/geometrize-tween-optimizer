package optimizer;

import flixel.FlxG;
import flixel.group.FlxGroup.FlxTypedGroup;
import haxe.ds.ObjectMap;

/**
 * Optimization methods for minimizing various measures of differences between shape properties.
 */
class OptimizeFunctions {
	// Try randomly switching target shapes
	public static function naiveRandomOptimize(shapes:FlxTypedGroup<CircleSprite>):Void {
		var temp:CircleData = { index : 0, type: 0, x: 0, y: 0, radius: 0, rgb: 0, alpha: 0 };
		for (i in 0...10) {
			for (shape in shapes) {
				var other:CircleSprite = FlxG.random.getObject(shapes.members);
				
				var currentScore:Float = CostFunctions.calculateScore(shape.startData, shape.endData) + CostFunctions.calculateScore(other.startData, other.endData);
				var swappedScore:Float = CostFunctions.calculateScore(shape.startData, other.endData) + CostFunctions.calculateScore(shape.endData, other.startData);
				
				if (swappedScore < currentScore) {
					swap(shape, other);
				}
			}
		}
	}
	
	// Calculate every possible switch, and greedily choose the best n switches
	public static function greedyBruteForceOptimize(shapes:FlxTypedGroup<CircleSprite>):Void {
		for (i in 0...shapes.length) {
			var shape = shapes.members[i];

			for (j in 0...shapes.length) {
				var other = shapes.members[j];
				
				var currentScore:Float = CostFunctions.calculateScore(shape.startData, shape.endData) + CostFunctions.calculateScore(other.startData, other.endData);
				var swappedScore:Float = CostFunctions.calculateScore(shape.startData, other.endData) + CostFunctions.calculateScore(shape.endData, other.startData);
				
				if (swappedScore < currentScore) {
					swap(shape, other);
				}
			}
		}
	}
	
	// Calculate every possible switch, and choose the best n switches
	
	// TODO broken
	/*
	public static function optimalBruteForceOptimize(shapes:FlxTypedGroup<CircleSprite>):Void {
		// Build map of shape->shape swapping improvements
		var results = new ObjectMap<CircleSprite, Array<{ index:Int, improvement:Float }>>();
		
		// Foreach shape
		for (i in 0...shapes.length) {
			var shape = shapes.members[i];
			
			// Calculate the scores for swapping with every other shape
			for (j in 0...shapes.length) {
				var other = shapes.members[j];
				
				var currentScore:Float = CostFunctions.calculateScore(shape.startData, shape.endData) + CostFunctions.calculateScore(other.startData, other.endData);
				var swappedScore:Float = CostFunctions.calculateScore(shape.startData, other.endData) + CostFunctions.calculateScore(shape.endData, other.startData);
				
				var improvement:Float = currentScore - swappedScore;
				
				var current = results.get(shape);
				if (current == null) {
					results.set(shape, [{ index: j, improvement: improvement }]);
				} else {
					current.push({ index: j, improvement: improvement });
				}
			}
		}
		
		var keys = results.keys();
		
		var usedIndices = [];
		for (key in keys) {
			var shape = key;
			var arr = results.get(key);
			arr.sort(function(a, b) {
				if (a.improvement > b.improvement) {
					return 1;
				}
				return -1;
			});
			
			var idx = 0;
			var bestIndex:Int = arr[idx].index;
			while (Lambda.has(usedIndices, bestIndex)) {
				bestIndex = arr[idx++].index;
			}
			usedIndices.push(bestIndex);
			swap(shape, shapes.members[bestIndex]);
		}
	}
	*/
	
	private static inline function swap(first:CircleSprite, second:CircleSprite):Void {
		temp = first.endData;
		first.endData = second.endData;
		second.endData = temp;
	}
	private static var temp:CircleData = { index : 0, type: 0, x: 0, y: 0, radius: 0, rgb: 0, alpha: 0 };
}