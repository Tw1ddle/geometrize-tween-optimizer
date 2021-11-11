package util;

@:access(util.FlxColor)
class ColorHelpers
{
    public function new(col:Int)
    {
        this.color = col;
    }

    public static function wrap(value:Int, min:Int, max:Int):Int
    {
        return FlxColor.wrap(value, min, max);
    }
        
    public static function roundDecimal(Value:Float, Precision:Int):Float
    {
        return FlxColor.roundDecimal(Value, Precision);
    }
        
    public static inline function bound(Value:Float, ?Min:Float, ?Max:Float):Float
    {
        return FlxColor.bound(Value, Min, Max);
    }
        
    public static inline var TRANSPARENT:FlxColor = 0x00000000;
    public static inline var WHITE:FlxColor =       0xFFFFFFFF;
    public static inline var GRAY:FlxColor =        0xFF808080;
    public static inline var BLACK:FlxColor =       0xFF000000;
    
    public static inline var GREEN:FlxColor =       0xFF008000;
    public static inline var LIME:FlxColor =        0xFF00FF00;
    public static inline var YELLOW:FlxColor =      0xFFFFFF00;
    public static inline var ORANGE:FlxColor =      0xFFFFA500;
    public static inline var RED:FlxColor =         0xFFFF0000;
    public static inline var PURPLE:FlxColor =      0xFF800080;
    public static inline var BLUE:FlxColor =        0xFF0000FF;
    public static inline var BROWN:FlxColor =       0xFF8B4513;
    public static inline var PINK:FlxColor =        0xFFFFC0CB;
    public static inline var MAGENTA:FlxColor =     0xFFFF00FF;
    public static inline var CYAN:FlxColor =        0xFF00FFFF;
    
    public var red(get, set):Int;
    public var blue(get, set):Int;
    public var green(get, set):Int;
    public var alpha(get, set):Int;
    
    public var redFloat(get, set):Float;
    public var blueFloat(get, set):Float;
    public var greenFloat(get, set):Float;
    public var alphaFloat(get, set):Float;
    
    public var cyan(get, set):Float;
    public var magenta(get, set):Float;
    public var yellow(get, set):Float;
    public var black(get, set):Float;
    
    public var hue(get, set):Float;
    public var saturation(get, set):Float;
    public var brightness(get, set):Float;
    public var lightness(get, set):Float;
    
    private static var COLOR_REGEX = ~/^(0x|#)(([A-F0-9]{2}){3,4})$/i;

    public static inline function fromInt(Value:Int):FlxColor
    {
        return new FlxColor(Value);
    }
    
    public static inline function fromRGB(Red:Int, Green:Int, Blue:Int, Alpha:Int = 255):FlxColor
    {
        var color = new FlxColor();
        return color.setRGB(Red, Green, Blue, Alpha);
    }
    public static inline function fromRGBFloat(Red:Float, Green:Float, Blue:Float, Alpha:Float = 1):FlxColor
    {
        var color = new FlxColor();
        return color.setRGBFloat(Red, Green, Blue, Alpha);
    }
    public static inline function fromCMYK(Cyan:Float, Magenta:Float, Yellow:Float, Black:Float, Alpha:Float = 1):FlxColor
    {
        var color = new FlxColor();
        return color.setCMYK(Cyan, Magenta, Yellow, Black, Alpha);
    }
    public static function fromHSB(Hue:Float, Saturation:Float, Brightness:Float, Alpha:Float = 1):FlxColor
    {
        var color = new FlxColor();
        return color.setHSB(Hue, Saturation, Brightness, Alpha);
    }
    public static inline function fromHSL(Hue:Float, Saturation:Float, Lightness:Float, Alpha:Float = 1):FlxColor
    {
        var color = new FlxColor();
        return color.setHSL(Hue, Saturation, Lightness, Alpha);
    }
    public static function getHSBColorWheel(Alpha:Int = 255):Array<FlxColor>
    {
        return [for (c in 0...360) fromHSB(c, 1.0, 1.0, Alpha)];
    }
    public static inline function interpolate(Color1:FlxColor, Color2:FlxColor, Factor:Float = 0.5):FlxColor
    {
        var r:Int = Std.int((Color2.red - Color1.red) * Factor + Color1.red);
        var g:Int = Std.int((Color2.green - Color1.green) * Factor + Color1.green);
        var b:Int = Std.int((Color2.blue - Color1.blue) * Factor + Color1.blue);
        var a:Int = Std.int((Color2.alpha - Color1.alpha) * Factor + Color1.alpha);
        
        return fromRGB(r, g, b, a);
    }
    public static function gradient(Color1:FlxColor, Color2:FlxColor, Steps:Int, ?Ease:Float->Float):Array<FlxColor>
    {
        var output = new Array<FlxColor>();
        
        if (Ease == null)
        {
            Ease = function(t:Float):Float
            {
                return t;
            }
        }
        
        for (step in 0...Steps)
        {
            output[step] = interpolate(Color1, Color2, Ease(step / (Steps - 1)));
        }
        
        return output;
    }
    
    @:op(A * B)
    public static inline function multiply(lhs:FlxColor, rhs:FlxColor):FlxColor
    {
        return FlxColor.fromRGBFloat(lhs.redFloat * rhs.redFloat, lhs.greenFloat * rhs.greenFloat, lhs.blueFloat * rhs.blueFloat);
    }
    @:op(A + B)
    public static inline function add(lhs:FlxColor, rhs:FlxColor):FlxColor
    {
        return FlxColor.fromRGB(lhs.red + rhs.red, lhs.green + rhs.green, lhs.blue + rhs.blue);
    }
    @:op(A - B)
    public static inline function subtract(lhs:FlxColor, rhs:FlxColor):FlxColor
    {
        return FlxColor.fromRGB(lhs.red - rhs.red, lhs.green - rhs.green, lhs.blue - rhs.blue);
    }
    public inline function getComplementHarmony():FlxColor
    {
        return fromHSB(wrap(Std.int(hue) + 180, 0, 350), brightness, saturation, alphaFloat);
    }
    
    public inline function getAnalogousHarmony(Threshold:Int = 30):FlxColor.Harmony
    {
        var warmer:Int = fromHSB(wrap(Std.int(hue) - Threshold, 0, 350), saturation, brightness, alphaFloat);
        var colder:Int = fromHSB(wrap(Std.int(hue) + Threshold, 0, 350), saturation, brightness, alphaFloat);
        
        return {original: color, warmer: warmer, colder: colder};
    }
    public inline function getSplitComplementHarmony(Threshold:Int = 30):FlxColor.Harmony
    {
        var oppositeHue:Int = wrap(Std.int(hue) + 180, 0, 350);
        var warmer:FlxColor = fromHSB(wrap(oppositeHue - Threshold, 0, 350), saturation, brightness, alphaFloat);
        var colder:FlxColor = fromHSB(wrap(oppositeHue + Threshold, 0, 350), saturation, brightness, alphaFloat);
        
        return {original: color, warmer: warmer, colder: colder};
    }
    public inline function getTriadicHarmony():FlxColor.TriadicHarmony
    {
        var triadic1:FlxColor = fromHSB(wrap(Std.int(hue) + 120, 0, 359), saturation, brightness, alphaFloat);
        var triadic2:FlxColor = fromHSB(wrap(Std.int(triadic1.hue) + 120, 0, 359), saturation, brightness, alphaFloat);
        
        return {color1: color, color2: triadic1, color3: triadic2};
    }
    
    public inline function to24Bit():FlxColor
    {
        return color & 0xffffff;
    }
    public inline function toHexString(Alpha:Bool = true, Prefix:Bool = true):String
    {
        return (Prefix ? "0x" : "") + (Alpha ? StringTools.hex(alpha, 2) : "") +
            StringTools.hex(red, 2) + StringTools.hex(green, 2) + StringTools.hex(blue, 2);
    }
    
    public inline function toWebString():String
    {
        return "#" + toHexString(false, false);
    }
    public function getColorInfo():String
    {
        // Hex format
        var result:String = toHexString() + "\n";
        // RGB format
        result += "Alpha: " + alpha + " Red: " + red + " Green: " + green + " Blue: " + blue + "\n";
        // HSB/HSL info
        result += "Hue: " + roundDecimal(hue, 2) + " Saturation: " + roundDecimal(saturation, 2) +
            " Brightness: " + roundDecimal(brightness, 2) + " Lightness: " + roundDecimal(lightness, 2);
        
        return result;
    }
    public function getDarkened(Factor:Float = 0.2):FlxColor
    {
        Factor = bound(Factor, 0, 1);
        var output:FlxColor = color;
        output.lightness = output.lightness * (1 - Factor);
        return output;
    }
    public inline function getLightened(Factor:Float = 0.2):FlxColor
    {
        Factor = bound(Factor, 0, 1);
        var output:FlxColor = color;
        output.lightness = output.lightness + (1 - lightness) * Factor;
        return output;
    }
    public inline function getInverted():FlxColor
    {
        var oldAlpha = alpha;
        var output:FlxColor = FlxColor.WHITE - color;
        output.alpha = oldAlpha;
        return output;
    }
    public inline function setRGB(Red:Int, Green:Int, Blue:Int, Alpha:Int = 255):FlxColor
    {
        red = Red;
        green = Green;
        blue = Blue;
        alpha = Alpha;
        return color;
    }
    public inline function setRGBFloat(Red:Float, Green:Float, Blue:Float, Alpha:Float = 1):FlxColor
    {
        redFloat = Red;
        greenFloat = Green;
        blueFloat = Blue;
        alphaFloat = Alpha;
        return color;
    }
    public inline function setCMYK(Cyan:Float, Magenta:Float, Yellow:Float, Black:Float, Alpha:Float = 1):FlxColor
    {
        redFloat = (1 - Cyan) * (1 - Black);
        greenFloat = (1 - Magenta) * (1 - Black);
        blueFloat = (1 - Yellow) * (1 - Black);
        alphaFloat = Alpha;
        return color;
    }
    public inline function setHSB(Hue:Float, Saturation:Float, Brightness:Float, Alpha:Float):FlxColor
    {
        var chroma = Brightness * Saturation;
        var match = Brightness - chroma;
        return setHSChromaMatch(Hue, Saturation, chroma, match, Alpha);
    }
    public inline function setHSL(Hue:Float, Saturation:Float, Lightness:Float, Alpha:Float):FlxColor
    {
        var chroma = (1 - Math.abs(2 * Lightness - 1)) * Saturation;
        var match = Lightness - chroma / 2;
        return setHSChromaMatch(Hue, Saturation, chroma, match, Alpha);
    }

    /**
     * Private utility function to perform common operations between setHSB and setHSL
     */
    private inline function setHSChromaMatch(Hue:Float, Saturation:Float, Chroma:Float, Match:Float, Alpha:Float):FlxColor
    {
        Hue %= 360;
        var hueD = Hue / 60;
        var mid = Chroma * (1 - Math.abs(hueD % 2 - 1)) + Match;
        Chroma += Match;
        
        switch (Std.int(hueD))
        {
            case 0: setRGBFloat(Chroma, mid, Match, Alpha);
            case 1: setRGBFloat(mid, Chroma, Match, Alpha);
            case 2: setRGBFloat(Match, Chroma, mid, Alpha);
            case 3: setRGBFloat(Match, mid, Chroma, Alpha);
            case 4: setRGBFloat(mid, Match, Chroma, Alpha);
            case 5: setRGBFloat(Chroma, Match, mid, Alpha);
        }
        
        return color;
    }

    private inline function getThis():Int
    {
        #if neko
        return Std.int(color);
        #else
        return color;
        #end
    }

    private inline function validate():Void
    {
        #if neko
        color = Std.int(color);
        #end
    }

    public static function redPart(color:FlxColor):Int {
        return color.red;
    }

    public static function greenPart(color:FlxColor):Int {
        return color.green;
    }

    public static function bluePart(color:FlxColor):Int {
        return color.blue;
    }

    public static function alphaPart(color:FlxColor):Int {
        return color.alpha;
    }

    public static function redFloatPart(color:FlxColor):Float {
        return color.redFloat;
    }

    public static function greenFloatPart(color:FlxColor):Float {
        return color.greenFloat;
    }

    public static function blueFloatPart(color:FlxColor):Float {
        return color.blueFloat;
    }

    public static function alphaFloatPart(color:FlxColor):Float {
        return color.alphaFloat;
    }

    private inline function get_red():Int
    {
        return (getThis() >> 16) & 0xff;
    }

    private inline function get_green():Int
    {
        return (getThis() >> 8) & 0xff;
    }

    private inline function get_blue():Int
    {
        return getThis() & 0xff;
    }

    private inline function get_alpha():Int
    {
        return (getThis() >> 24) & 0xff;
    }

    private inline function get_redFloat():Float
    {
        return red / 255;
    }

    private inline function get_greenFloat():Float
    {
        return green / 255;
    }

    private inline function get_blueFloat():Float
    {
        return blue / 255;
    }

    private inline function get_alphaFloat():Float
    {
        return alpha / 255;
    }

    private inline function set_red(Value:Int):Int
    {
        validate();
        color &= 0xff00ffff;
        color |= boundChannel(Value) << 16;
        return Value;
    }

    private inline function set_green(Value:Int):Int
    {
        validate();
        color &= 0xffff00ff;
        color |= boundChannel(Value) << 8;
        return Value;
    }

    private inline function set_blue(Value:Int):Int
    {
        validate();
        color &= 0xffffff00;
        color |= boundChannel(Value);
        return Value;
    }

    private inline function set_alpha(Value:Int):Int
    {
        validate();
        color &= 0x00ffffff;
        color |= boundChannel(Value) << 24;
        return Value;
    }

    private inline function set_redFloat(Value:Float):Float
    {
        red = Math.round(Value * 255);
        return Value;
    }

    private inline function set_greenFloat(Value:Float):Float
    {
        green = Math.round(Value * 255);
        return Value;
    }

    private inline function set_blueFloat(Value:Float):Float
    {
        blue = Math.round(Value * 255);
        return Value;
    }

    private inline function set_alphaFloat(Value:Float):Float
    {
        alpha = Math.round(Value * 255);
        return Value;
    }

    private inline function get_cyan():Float
    {
        return (1 - redFloat - black) / brightness;
    }

    private inline function get_magenta():Float
    {
        return (1 - greenFloat - black) / brightness;
    }

    private inline function get_yellow():Float
    {
        return (1 - blueFloat - black) / brightness;
    }

    private inline function get_black():Float
    {
        return 1 - brightness;
    }

    private inline function set_cyan(Value:Float):Float
    {
        setCMYK(Value, magenta, yellow, black, alphaFloat);
        return Value;
    }

    private inline function set_magenta(Value:Float):Float
    {
        setCMYK(cyan, Value, yellow, black, alphaFloat);
        return Value;
    }

    private inline function set_yellow(Value:Float):Float
    {
        setCMYK(cyan, magenta, Value, black, alphaFloat);
        return Value;
    }

    private inline function set_black(Value:Float):Float
    {
        setCMYK(cyan, magenta, yellow, Value, alphaFloat);
        return Value;
    }

    private function get_hue():Float
    {
        var hueRad = Math.atan2(Math.sqrt(3) * (greenFloat - blueFloat), 2 * redFloat - greenFloat - blueFloat);
        var hue:Float = 0;
        if (hueRad != 0)
        {
            hue = 180 / Math.PI * Math.atan2(Math.sqrt(3) * (greenFloat - blueFloat), 2 * redFloat - greenFloat - blueFloat);
        }
            
        return hue < 0 ? hue + 360 : hue;
    }

    private inline function get_brightness():Float
    {
        return maxColor();
    }

    private inline function get_saturation():Float
    {
        return (maxColor() - minColor()) / brightness;
    }

    public static function getLightness(color:FlxColor):Float {
        return (getMaxColor(color) + getMinColor(color)) / 2;
    }

    private inline function get_lightness():Float
    {
        return (maxColor() + minColor()) / 2;
    }

    private inline function set_hue(Value:Float):Float
    {
        setHSB(Value, saturation, brightness, alphaFloat);
        return Value;
    }

    private inline function set_saturation(Value:Float):Float
    {
        setHSB(hue, Value, brightness, alphaFloat);
        return Value;
    }

    private inline function set_brightness(Value:Float):Float
    {
        setHSB(hue, saturation, Value, alphaFloat);
        return Value;
    }

    private inline function set_lightness(Value:Float):Float
    {
        setHSL(hue, saturation, Value, alphaFloat);
        return Value;
    }

    public static function getMaxColor(color:FlxColor):Float {
        return color.maxColor();
    }

    private inline function maxColor():Float
    {
        return Math.max(redFloat, Math.max(greenFloat, blueFloat));
    }

    public static function getMinColor(color:FlxColor):Float {
        return color.minColor();
    }

    private inline function minColor():Float
    {
        return Math.min(redFloat, Math.min(greenFloat, blueFloat));
    }

    private inline function boundChannel(Value:Int):Int
    {
        return Value > 0xff ? 0xff : Value < 0 ? 0 : Value;
    }    

    var color:FlxColor;
}