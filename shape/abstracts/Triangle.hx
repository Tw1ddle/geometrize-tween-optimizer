package shape.abstracts;

/**
 * Abstract for manipulating triangle data.
 * @author Sam Twidale (https://samcodes.co.uk/)
 */
abstract Triangle(Array<Int>) from Array<Int> {
	public var x1(get, set):Int;
	public var y1(get, set):Int;
	public var x2(get, set):Int;
	public var y2(get, set):Int;
	public var x3(get, set):Int;
	public var y3(get, set):Int;
	
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
	
	private function get_x3():Int {
		return this[4];
	}
	private function set_x3(x:Int) {
		return this[4] = x;
	}
	
	private function get_y3():Int {
		return this[5];
	}
	private function set_y3(y:Int) {
		return this[5] = y;
	}
	
	public function area():Float {
		var area = Math.abs(x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2;
		return area;
	}
}