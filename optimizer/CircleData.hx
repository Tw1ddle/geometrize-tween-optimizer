package optimizer;

/**
 * Data describing one of the circles that makes up a geometrized image.
 */
typedef CircleData = {
	index:Int,
	type:Int,
	x:Float,
	y:Float,
	radius:Float,
	rgb:FlxColor,
	alpha:Float
}