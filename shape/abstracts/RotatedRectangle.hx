package shape.abstracts;

/**
 * Abstract for manipulating rotated rectangle data.
 * @author Sam Twidale (http://samcodes.co.uk/)
 */
abstract RotatedRectangle(Array<Int>) from Array<Int> {
	public var x1(get, set):Int;
	public var y1(get, set):Int;
	public var x2(get, set):Int;
	public var y2(get, set):Int;
	public var angle(get, set):Int;
	
	private function get_x1():Int {
		return this[0];
	}
	private function set_x1(x:Int) {
		return this[0] = x;
	}
	
	private function get_y1():Int {
		return this[1];
	}
	private function set_y1(y:Int) {
		return this[1] = y;
	}
	
	private function get_x2():Int {
		return this[2];
	}
	private function set_x2(x:Int) {
		return this[2] = x;
	}
	
	private function get_y2():Int {
		return this[3];
	}
	private function set_y2(y:Int) {
		return this[3] = y;
	}
	
	private function get_angle():Int {
		return this[4];
	}
	private function set_angle(y:Int) {
		return this[4] = y;
	}
	
	public function area():Float {
		return (x2 - x1) * (y2 - y1);
	}
}