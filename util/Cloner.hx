package util;

/**
 * Object deep-copier/cloner based on https://github.com/thomasuster/cloner by thomasuster
 * License is MIT
 */
class Cloner {
	public static function clone <T> (v:T):T {
		var outcome:T = _clone(v);
		return outcome;
	}

	public static function _clone <T> (v:T):T {
		#if js
		if(Std.is(v, String))
			return v;
		#end

		#if neko
		try {
		if(Type.getClassName(cast v) != null)
			return v;
		}catch(e:Dynamic) {}
		#else
		if(Type.getClassName(cast v) != null)
			return v;
		#end
		switch(Type.typeof(v)){
			case TNull:
				return null;
			case TInt:
				return v;
			case TFloat:
				return v;
			case TBool:
				return v;
			case TObject:
				return handleAnonymous(v);
			case TFunction:
				return null;
			case TClass(c):
				return handleClass(c, v);
			case TEnum(e):
				return v;
			case TUnknown:
				return null;
		}
	}

	private static function handleAnonymous (v:Dynamic):Dynamic {
		var properties:Array<String> = Reflect.fields(v);
		var anonymous:Dynamic = {};
		for (i in 0...properties.length) {
			var property:String = properties[i];
			Reflect.setField(anonymous, property, _clone(Reflect.getProperty(v, property)));
		}
		return anonymous;
	}

	 private static function handleClass < T > (c:Class<T>, inValue:T):T {
		 var handle:T->T = cloneClass;
		return handle(inValue);
	}

	 private static function cloneArray <T> (inValue:Array<T>):Array<T> {
		var array:Array<T> = inValue.copy();
		for (i in 0...array.length)
			array[i] = _clone(array[i]);
		return array;
	}

	 private static function cloneClass <T> (inValue:T):T {
		var outValue:T = Type.createEmptyInstance(Type.getClass(inValue));
		var fields:Array<String> = Reflect.fields(inValue);
		for (i in 0...fields.length) {
			var field = fields[i];
			var property = Reflect.getProperty(inValue, field);
			Reflect.setField(outValue, field, _clone(property));
		}
		return outValue;
	 }
}