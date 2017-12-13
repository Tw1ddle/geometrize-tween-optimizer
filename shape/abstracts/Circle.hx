package shape.abstracts;

/**
 * Abstract for manipulating circle data.
 * @author Sam Twidale (http://samcodes.co.uk/)
 */
abstract Circle(Array<Int>) from Array<Int> {
	public var x(get, set):Int;
	public var y(get, set):Int;
	public var r(get, set):Int;
	
	private function get_x():Int {
		return this[0];
	}
	private function set_x(x:Int) {
		return this[0] = x;
	}
	
	private function get_y():Int {
		return this[1];
	}
	private function set_y(y:Int) {
		return this[1] = y;
	}
	
	private function get_r():Int {
		return this[2];
	}
	private function set_r(r:Int) {
		return this[2] = r;
	}
	
	public function area():Float {
		return Math.PI * r * r;
	}
}