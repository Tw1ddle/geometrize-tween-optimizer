package optimizer;

import flixel.FlxG;
import flixel.FlxSubState;
import flixel.group.FlxGroup.FlxTypedGroup;
import flixel.tweens.FlxTween;
import flixel.util.FlxSignal.FlxTypedSignal;

/**
 * Substate where the shape tweening visualization and fitting/optimization is called.
 */
class OptimizeSubState extends FlxSubState {
	private var startShapes:Array<CircleData> = [];
	private var endShapes:Array<CircleData> = [];
	private var transition(default, set):Float = 0;
	private var shapeGroup:FlxTypedGroup<CircleSprite> = new FlxTypedGroup<CircleSprite>();
	private var shouldOptimize:Bool = true;
	private var sprites:Array<CircleSprite> = [];
	public var scoreUpdatedSignal(default, null):FlxTypedSignal<Float->Void> = new FlxTypedSignal<Float->Void>();
	
	public function new(startShapes:Array<CircleData>, endShapes:Array<CircleData>) {
		super();
		this.startShapes = startShapes;
		this.endShapes = endShapes;
	}
	
	override public function create():Void {
		super.create();
		
		setupSprites();
		setupTweens();
		
		add(shapeGroup);
	}
	
	override public function update(dt:Float):Void {
		super.update(dt);
		if (FlxG.keys.justPressed.SPACE) {
			shouldOptimize = !shouldOptimize;
		}
	}
	
	public function saveMapping():Void {
		MappingSaver.save(sprites);
	}
	
	private function setupSprites():Void {
		sprites = new Array<CircleSprite>();
		
		for (i in 0...startShapes.length) {
			var shape = new CircleSprite(startShapes[i], endShapes[i]);
			shapeGroup.add(shape);
			sprites.push(shape);
			
			startShapes[i].x;
			startShapes[i].y;
		}
		
		// Setup the sprite tweens
		sprites.sort(function(a:CircleSprite, b:CircleSprite):Int {
			return Std.int(b.y - a.y); // Sort by y
		});
		var i:Int = 0;
		for (s in sprites) {
			s.lerpStart = 0 + 0.0005 * i;
			s.lerpEnd = 0.5 + 0.0005 * i;
			i++;
		}
	}
	
	private function setupTweens():Void {
		FlxTween.tween(this, { transition: 1 }, 2, {type: FlxTween.PINGPONG, onComplete: function(_) {
			if (!shouldOptimize) {
				return;
			}
			optimize();
		}});
	}
	
	private function optimize():Void {
		OptimizeFunctions.optimize(shapeGroup);
		calculateTotalScore();
	}
	
	private function interpolate(sprite:CircleSprite):Void {
		sprite.interpolate(transition);
	}
	
	private function calculateTotalScore():Float {
		var total:Float = 0;
		for (shape in shapeGroup) {
			total += CostFunctions.calculateScore(shape.startData, shape.endData);
		}
		scoreUpdatedSignal.dispatch(total);
		return total;
	}
	
	private function set_transition(t:Float):Float {
		this.transition = t;
		shapeGroup.forEach(interpolate);
		return t;
	}
}