package reader;

import haxe.macro.Context;
import haxe.macro.Expr.Access.APublic;
import haxe.macro.Expr.Access.AStatic;
import haxe.macro.Expr.Field;
import haxe.macro.Expr.FieldType.FVar;
import reader.FileReader;
import sys.FileSystem;

using StringTools;

/**
 * Utility for reading folders of text files at compile time
 * @author Sam Twidale (http://www.geometrize.co.uk/)
 */
@:access(reader.FileReader)
class FolderReader {
	/**
	 * Reads all the files in a directory, and builds a type populated by strings, one per file in that directory at compile time.
	 * @param directoryPath   File path to the directory to be scanned.
	 * @return Array of string fields containing the contents of the files in the directory.
	 */
	public static function build(directoryPath:String):Array<Field> {
		var fields = Context.getBuildFields();
		
		var splitter = new EReg("[\r\n]", "g");
		
		try {
			var files = FileSystem.readDirectory(directoryPath);
			for (i in 0...files.length) {
				var data = FileReader.loadFileAsString(directoryPath + "/" + files[i]);
				
				var file = files[i];
				
				// Take a filename e.g. cooking_utensils.txt, replace spaces with underscores, remove the extension and ensure it only contains characters a-zA-Z0-9
				var name = file.split(".")[0].replace(" ", "_");
				var sanitizer = new EReg("^[a-zA-Z0-9_]*$", "i");
				if (!sanitizer.match(name)) {
					throw "Files must have alphanumeric names";
				}

				var field = {
					name: name,
					doc: file,
					meta: [],
					access: [APublic, AStatic],
					kind: FVar(macro:String, macro $v{data}),
					pos: Context.currentPos()
				};
				
				fields.push(field);
			}
		} catch (e:Dynamic) {
			Context.error('Failed to find directory $directoryPath: $e', Context.currentPos());
		}
		
		return fields;
	}
}
