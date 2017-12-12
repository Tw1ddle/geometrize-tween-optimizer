package optimizer;

/**
 * Converts mapping from one set of shape indices to another into a string for saving.
 */
class MappingSaver {
	public static function save(sprites:Array<CircleSprite>):String {
		var data:String = "";
		
		for (sprite in sprites) {
			var start = sprite.startData.index;
			var end = sprite.endData.index;
			
			data += Std.string(start) + "," + Std.string(end) + "\r\n";
		}
	}
	return data;
}