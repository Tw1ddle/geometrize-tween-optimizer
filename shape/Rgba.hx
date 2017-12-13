package shape;

/**
 * Represents a color in RGBA8888 format with underlying type Int.
 * @author Sam Twidale (http://samcodes.co.uk/)
 */
abstract Rgba(Int) from Int to Int {
	/**
	 * Red color component.
	 */
	public var r(get, never):Int;
	/**
	 * Green color component.
	 */
	public var g(get, never):Int;
	/**
	 * Blue color component.
	 */
	public var b(get, never):Int;
	/**
	 * Alpha color component.
	 */
	public var a(get, never):Int;
	
	/**
	 * Creates a new color.
	 * @param	rgba	The color value. It will be interpreted in RGBA8888 format.
	 */
	public inline function new(rgba:Int) {
		this = rgba;
	}
	
	/**
	 * Converts the color to a CSS3 rgba(r,g,b,a/255.0) string.
	 */
	public inline function toRgbaAttrib():String {
		return "rgba(" + r + "," + g + "," + b + "," + a / 255.0 + ")";
	}
	
	/**
	 * Converts an integer to a RGBA8888 color.
	 * @param	rgba The integer to convert to the color.
	 * @return	The RGBA color.
	 */
	@:from public static inline function fromInt(rgba:Int):Rgba {
		return rgba;
	}
	
	private inline function get_r():Int {
		return (this >> 24) & 0xFF;
	}
	private inline function get_g():Int {
		return (this >> 16) & 0xFF;
	}
	private inline function get_b():Int {
		return (this >> 8) & 0xFF;
	}
	private inline function get_a():Int {
		return this & 0xFF;
	}
}