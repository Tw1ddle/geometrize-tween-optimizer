package reader;

import haxe.macro.Context;
import haxe.macro.Expr.Access.APublic;
import haxe.macro.Expr.Access.AStatic;
import haxe.macro.Expr.Field;
import haxe.macro.Expr.FieldType.FVar;
import shape.Shape;

#if macro
import sys.FileSystem;
#end

using StringTools;

/**
 * Reads JSON shape data and embeds it in the program at compile time
 * @author Sam Twidale (http://samcodes.co.uk/)
 */
class ShapeEmbedder {
	#if macro
	
	static private function readFileAsString(filePath:String) {
		try {
			var p = Context.resolvePath(filePath);
			Context.registerModuleDependency(Context.getLocalModule(),p);
			return sys.io.File.getContent(p);
		}
		catch(e:Dynamic) {
			return haxe.macro.Context.error('Failed to load file $filePath: $e', Context.currentPos());
		}
	}
	
	// Reads the given directory and embeds the files therein as static arrays of shape data
	macro public static function buildDirectory(directoryPath:String):Array<Field> {
		var fields = Context.getBuildFields();
		
		try {
			var files:Array<String> = FileSystem.readDirectory(directoryPath);
			if (files.length == 0) {
				trace("Failed to read any files in directory " + directoryPath);
			}
			
			for (file in files) {
				var filePath:String = directoryPath + file;
				
				var data:String = readFileAsString(filePath);
				var name:String = toVarName(file);
				var shapes:Array<Shape> = ShapeJsonReader.shapesFromJson(data);
				
				var field = {
					name: name,
					doc: null,
					meta: [],
					access: [APublic, AStatic],
					kind: FVar(macro:Array<Shape>, macro $v{shapes}),
					pos: Context.currentPos()
				}
				fields.push(field);
			}
		} catch (e:Dynamic) {
			Context.error('Failed to find file $directoryPath: $e', Context.currentPos());
		}
		
		return fields;
	}
	
	#end
	
	public static function toVarName(path:String) {
		return path.replace("/", "_").replace(".", "_").replace(" ", "_").replace("-", "_");
	}
}