package shape.abstracts;

/**
 * Abstract for manipulating rotated ellipse data.
 * @author Sam Twidale (https://samcodes.co.uk/)
 */
abstract RotatedEllipse(Array<Int>) from Array<Int> {
	public var x(get, set):Int;
	public var y(get, set):Int;
	public var rx(get, set):Int;
	public var ry(get, set):Int;
	public var angle(get, set):Int;
	
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
	
	private function get_rx():Int {
		return this[2];
	}
	private function set_rx(rx:Int) {
		return this[2] = rx;
	}
	
	private function get_ry():Int {
		return this[3];
	}
	private function set_ry(ry:Int) {
		return this[3] = ry;
	}
	
	private function get_angle():Int {
		return this[4];
	}
	private function set_angle(y:Int) {
		return this[4] = y;
	}
	
	public function area():Float {
		return Math.PI * rx * ry;
	}
}