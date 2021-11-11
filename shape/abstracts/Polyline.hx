package shape.abstracts;

/**
 * Abstract for manipulating polyline data.
 * @author Sam Twidale (https://samcodes.co.uk/)
 */
@:forward(length)
abstract Polyline(Array<Int>) from Array<Int> {
	@:arrayAccess public inline function get(idx:Int):Int {
		return this[idx];
	}
	
	@:arrayAccess public inline function set(idx:Int, value:Int) {
		this[idx] = value;
	}
}