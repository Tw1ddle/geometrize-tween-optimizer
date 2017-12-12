package optimizer;

import flixel.FlxG;
import flixel.FlxSprite;
import flixel.math.FlxMath;
import flixel.tweens.FlxEase;
import flixel.util.FlxColor;
import flixel.util.FlxSpriteUtil;

/**
 * Flixel sprite that represents a circle shape.
 */
class CircleSprite extends FlxSprite {
	public var startData:CircleData;
	public var endData:CircleData;
	
	public var lerpStart:Float;
	public var lerpEnd:Float;
	public var radius(default, set):Float;
	private static var gfxRadius:Int = 200;
	
	public function new(startData:CircleData, endData:CircleData) {
		super(0, 0);
		this.startData = startData;
		this.endData = endData;
		
		if (FlxG.bitmap.get("circ") == null) {
			makeGraphic(gfxRadius * 2, gfxRadius * 2, 0, false, "circ");
			FlxSpriteUtil.drawCircle(this, -1, -1, gfxRadius);
		} else {
			loadGraphic("circ");
		}
		
		interpolate(0);
	}
	
	public function interpolate(t:Float):Void {
		var t = (t - lerpStart) / (lerpEnd - lerpStart);
		
		t = FlxMath.bound(t, 0, 1);
		t = FlxEase.quadInOut(t);
		
		x = FlxMath.lerp(startData.x, endData.x, t);
		y = FlxMath.lerp(startData.y, endData.y, t);
		
		color = FlxColor.interpolate(startData.rgb, endData.rgb, t);
		radius = FlxMath.lerp(startData.radius, endData.radius, t);
		alpha = FlxMath.lerp(startData.alpha, endData.alpha, t);
	}
	
	private function set_radius(r:Float):Float {
		if (this.radius == r) {
			return r;
		}
		this.radius = r;
		
		var s:Float = r / gfxRadius;
		scale.set(s, s);
		
		updateHitbox();
		
		offset.x += radius;
		offset.y += radius;
		
		return r;
	}
}