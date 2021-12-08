(function ($global) { "use strict";
var $hxClasses = {},$estr = function() { return js_Boot.__string_rec(this,''); },$hxEnums = $hxEnums || {},$_;
function $extend(from, fields) {
	var proto = Object.create(from);
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	this.r = new RegExp(r,opt.split("u").join(""));
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = "EReg";
EReg.escape = function(s) {
	return s.replace(EReg.escapeRe,"\\$&");
};
EReg.prototype = {
	r: null
	,match: function(s) {
		if(this.r.global) {
			this.r.lastIndex = 0;
		}
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) {
			return this.r.m[n];
		} else {
			throw haxe_Exception.thrown("EReg::matched");
		}
	}
	,matchedLeft: function() {
		if(this.r.m == null) {
			throw haxe_Exception.thrown("No string matched");
		}
		return HxOverrides.substr(this.r.s,0,this.r.m.index);
	}
	,matchedRight: function() {
		if(this.r.m == null) {
			throw haxe_Exception.thrown("No string matched");
		}
		var sz = this.r.m.index + this.r.m[0].length;
		return HxOverrides.substr(this.r.s,sz,this.r.s.length - sz);
	}
	,matchedPos: function() {
		if(this.r.m == null) {
			throw haxe_Exception.thrown("No string matched");
		}
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	,matchSub: function(s,pos,len) {
		if(len == null) {
			len = -1;
		}
		if(this.r.global) {
			this.r.lastIndex = pos;
			this.r.m = this.r.exec(len < 0 ? s : HxOverrides.substr(s,0,pos + len));
			var b = this.r.m != null;
			if(b) {
				this.r.s = s;
			}
			return b;
		} else {
			var b = this.match(len < 0 ? HxOverrides.substr(s,pos,null) : HxOverrides.substr(s,pos,len));
			if(b) {
				this.r.s = s;
				this.r.m.index += pos;
			}
			return b;
		}
	}
	,split: function(s) {
		var d = "#__delim__#";
		return s.replace(this.r,d).split(d);
	}
	,replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,map: function(s,f) {
		var offset = 0;
		var buf_b = "";
		while(true) {
			if(offset >= s.length) {
				break;
			} else if(!this.matchSub(s,offset)) {
				buf_b += Std.string(HxOverrides.substr(s,offset,null));
				break;
			}
			var p = this.matchedPos();
			buf_b += Std.string(HxOverrides.substr(s,offset,p.pos - offset));
			buf_b += Std.string(f(this));
			if(p.len == 0) {
				buf_b += Std.string(HxOverrides.substr(s,p.pos,1));
				offset = p.pos + 1;
			} else {
				offset = p.pos + p.len;
			}
			if(!this.r.global) {
				break;
			}
		}
		if(!this.r.global && offset > 0 && offset < s.length) {
			buf_b += Std.string(HxOverrides.substr(s,offset,null));
		}
		return buf_b;
	}
	,__class__: EReg
};
var EnumValue = {};
EnumValue.match = function(this1,pattern) {
	return false;
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = "HxOverrides";
HxOverrides.dateStr = function(date) {
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var mi = date.getMinutes();
	var s = date.getSeconds();
	return date.getFullYear() + "-" + (m < 10 ? "0" + m : "" + m) + "-" + (d < 10 ? "0" + d : "" + d) + " " + (h < 10 ? "0" + h : "" + h) + ":" + (mi < 10 ? "0" + mi : "" + mi) + ":" + (s < 10 ? "0" + s : "" + s);
};
HxOverrides.strDate = function(s) {
	switch(s.length) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d["setTime"](0);
		d["setUTCHours"](k[0]);
		d["setUTCMinutes"](k[1]);
		d["setUTCSeconds"](k[2]);
		return d;
	case 10:
		var k = s.split("-");
		return new Date(k[0],k[1] - 1,k[2],0,0,0);
	case 19:
		var k = s.split(" ");
		var y = k[0].split("-");
		var t = k[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw haxe_Exception.thrown("Invalid date format : " + s);
	}
};
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) {
		return undefined;
	}
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(len == null) {
		len = s.length;
	} else if(len < 0) {
		if(pos == 0) {
			len = s.length + len;
		} else {
			return "";
		}
	}
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) {
			i = 0;
		}
	}
	while(i < len) {
		if(((a[i]) === obj)) {
			return i;
		}
		++i;
	}
	return -1;
};
HxOverrides.lastIndexOf = function(a,obj,i) {
	var len = a.length;
	if(i >= len) {
		i = len - 1;
	} else if(i < 0) {
		i += len;
	}
	while(i >= 0) {
		if(((a[i]) === obj)) {
			return i;
		}
		--i;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = a.indexOf(obj);
	if(i == -1) {
		return false;
	}
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
HxOverrides.keyValueIter = function(a) {
	return new haxe_iterators_ArrayKeyValueIterator(a);
};
HxOverrides.now = function() {
	return Date.now();
};
var IntIterator = function(min,max) {
	this.min = min;
	this.max = max;
};
$hxClasses["IntIterator"] = IntIterator;
IntIterator.__name__ = "IntIterator";
IntIterator.prototype = {
	min: null
	,max: null
	,hasNext: function() {
		return this.min < this.max;
	}
	,next: function() {
		return this.min++;
	}
	,__class__: IntIterator
};
var Lambda = function() { };
$hxClasses["Lambda"] = Lambda;
Lambda.__name__ = "Lambda";
Lambda.array = function(it) {
	var a = [];
	var i = $getIterator(it);
	while(i.hasNext()) {
		var i1 = i.next();
		a.push(i1);
	}
	return a;
};
Lambda.list = function(it) {
	var l = new haxe_ds_List();
	var i = $getIterator(it);
	while(i.hasNext()) {
		var i1 = i.next();
		l.add(i1);
	}
	return l;
};
Lambda.map = function(it,f) {
	var _g = [];
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		_g.push(f(x1));
	}
	return _g;
};
Lambda.mapi = function(it,f) {
	var i = 0;
	var _g = [];
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		_g.push(f(i++,x1));
	}
	return _g;
};
Lambda.flatten = function(it) {
	var _g = [];
	var e = $getIterator(it);
	while(e.hasNext()) {
		var e1 = e.next();
		var x = $getIterator(e1);
		while(x.hasNext()) {
			var x1 = x.next();
			_g.push(x1);
		}
	}
	return _g;
};
Lambda.flatMap = function(it,f) {
	var _g = [];
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		_g.push(f(x1));
	}
	var _g1 = [];
	var e = $getIterator(_g);
	while(e.hasNext()) {
		var e1 = e.next();
		var x = $getIterator(e1);
		while(x.hasNext()) {
			var x1 = x.next();
			_g1.push(x1);
		}
	}
	return _g1;
};
Lambda.has = function(it,elt) {
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		if(x1 == elt) {
			return true;
		}
	}
	return false;
};
Lambda.exists = function(it,f) {
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		if(f(x1)) {
			return true;
		}
	}
	return false;
};
Lambda.foreach = function(it,f) {
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		if(!f(x1)) {
			return false;
		}
	}
	return true;
};
Lambda.iter = function(it,f) {
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		f(x1);
	}
};
Lambda.filter = function(it,f) {
	var _g = [];
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		if(f(x1)) {
			_g.push(x1);
		}
	}
	return _g;
};
Lambda.fold = function(it,f,first) {
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		first = f(x1,first);
	}
	return first;
};
Lambda.foldi = function(it,f,first) {
	var i = 0;
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		first = f(x1,first,i);
		++i;
	}
	return first;
};
Lambda.count = function(it,pred) {
	var n = 0;
	if(pred == null) {
		var _ = $getIterator(it);
		while(_.hasNext()) {
			var _1 = _.next();
			++n;
		}
	} else {
		var x = $getIterator(it);
		while(x.hasNext()) {
			var x1 = x.next();
			if(pred(x1)) {
				++n;
			}
		}
	}
	return n;
};
Lambda.empty = function(it) {
	return !$getIterator(it).hasNext();
};
Lambda.indexOf = function(it,v) {
	var i = 0;
	var v2 = $getIterator(it);
	while(v2.hasNext()) {
		var v21 = v2.next();
		if(v == v21) {
			return i;
		}
		++i;
	}
	return -1;
};
Lambda.find = function(it,f) {
	var v = $getIterator(it);
	while(v.hasNext()) {
		var v1 = v.next();
		if(f(v1)) {
			return v1;
		}
	}
	return null;
};
Lambda.findIndex = function(it,f) {
	var i = 0;
	var v = $getIterator(it);
	while(v.hasNext()) {
		var v1 = v.next();
		if(f(v1)) {
			return i;
		}
		++i;
	}
	return -1;
};
Lambda.concat = function(a,b) {
	var l = [];
	var x = $getIterator(a);
	while(x.hasNext()) {
		var x1 = x.next();
		l.push(x1);
	}
	var x = $getIterator(b);
	while(x.hasNext()) {
		var x1 = x.next();
		l.push(x1);
	}
	return l;
};
var ID = function() { };
$hxClasses["ID"] = ID;
ID.__name__ = "ID";
var CostScripts = function() { };
$hxClasses["CostScripts"] = CostScripts;
CostScripts.__name__ = "CostScripts";
var OptimizationScripts = function() { };
$hxClasses["OptimizationScripts"] = OptimizationScripts;
OptimizationScripts.__name__ = "OptimizationScripts";
var ShapeDatasets = function() { };
$hxClasses["ShapeDatasets"] = ShapeDatasets;
ShapeDatasets.__name__ = "ShapeDatasets";
var Main = function() {
	window.onload = $bind(this,this.onWindowLoaded);
};
$hxClasses["Main"] = Main;
Main.__name__ = "Main";
Main.getElement = function(id) {
	return window.document.getElementById(id);
};
Main.main = function() {
	var main = new Main();
};
Main.prototype = {
	optimizer: null
	,renderer: null
	,onWindowLoaded: function() {
		var _gthis = this;
		Main.stepButton.addEventListener("click",function() {
			_gthis.step();
		});
		Main.resetButton.addEventListener("click",function() {
			_gthis.reset();
		});
		Main.costFunctionPresetSelect.addEventListener("change",function() {
			var code = _gthis.getPresetCostFunctionScript(Main.costFunctionPresetSelect.value);
			Main.costFunctionTextArea.value = code;
			_gthis.setCostFunctionScript(code);
		});
		Main.costFunctionTextArea.addEventListener("keypress",function() {
			_gthis.setCostFunctionScript(Main.costFunctionTextArea.value);
		});
		Main.costFunctionTextArea.addEventListener("change",function() {
			_gthis.setCostFunctionScript(Main.costFunctionTextArea.value);
		});
		Main.optimizationFunctionPresetSelect.addEventListener("change",function() {
			var code = _gthis.getPresetOptimizationFunctionScript(Main.optimizationFunctionPresetSelect.value);
			Main.optimizationFunctionTextArea.value = code;
			_gthis.setOptimizationFunctionScript(code);
		});
		Main.optimizationFunctionTextArea.addEventListener("keypress",function() {
			_gthis.setOptimizationFunctionScript(Main.optimizationFunctionTextArea.value);
		});
		Main.optimizationFunctionTextArea.addEventListener("change",function() {
			_gthis.setOptimizationFunctionScript(Main.optimizationFunctionTextArea.value);
		});
		Main.datasetOnePresetSelect.addEventListener("change",function() {
			var data = _gthis.getPresetShapeDataset(Main.datasetOnePresetSelect.value);
			Main.datasetOneTextArea.value = data;
			_gthis.setDatasetOne(data);
		});
		Main.datasetOneTextArea.addEventListener("keypress",function() {
			_gthis.setDatasetOne(Main.datasetOneTextArea.value);
		});
		Main.datasetOneTextArea.addEventListener("change",function() {
			_gthis.setDatasetOne(Main.datasetOneTextArea.value);
		});
		Main.datasetTwoPresetSelect.addEventListener("change",function() {
			var data = _gthis.getPresetShapeDataset(Main.datasetTwoPresetSelect.value);
			Main.datasetTwoTextArea.value = data;
			_gthis.setDatasetTwo(data);
		});
		Main.datasetTwoTextArea.addEventListener("keypress",function() {
			_gthis.setDatasetTwo(Main.datasetTwoTextArea.value);
		});
		Main.datasetTwoTextArea.addEventListener("change",function() {
			_gthis.setDatasetTwo(Main.datasetTwoTextArea.value);
		});
		this.populateSelectMenus();
		this.reset();
	}
	,init: function() {
		var _gthis = this;
		Main.stepButton.addEventListener("click",function() {
			_gthis.step();
		});
		Main.resetButton.addEventListener("click",function() {
			_gthis.reset();
		});
		Main.costFunctionPresetSelect.addEventListener("change",function() {
			var code = _gthis.getPresetCostFunctionScript(Main.costFunctionPresetSelect.value);
			Main.costFunctionTextArea.value = code;
			_gthis.setCostFunctionScript(code);
		});
		Main.costFunctionTextArea.addEventListener("keypress",function() {
			_gthis.setCostFunctionScript(Main.costFunctionTextArea.value);
		});
		Main.costFunctionTextArea.addEventListener("change",function() {
			_gthis.setCostFunctionScript(Main.costFunctionTextArea.value);
		});
		Main.optimizationFunctionPresetSelect.addEventListener("change",function() {
			var code = _gthis.getPresetOptimizationFunctionScript(Main.optimizationFunctionPresetSelect.value);
			Main.optimizationFunctionTextArea.value = code;
			_gthis.setOptimizationFunctionScript(code);
		});
		Main.optimizationFunctionTextArea.addEventListener("keypress",function() {
			_gthis.setOptimizationFunctionScript(Main.optimizationFunctionTextArea.value);
		});
		Main.optimizationFunctionTextArea.addEventListener("change",function() {
			_gthis.setOptimizationFunctionScript(Main.optimizationFunctionTextArea.value);
		});
		Main.datasetOnePresetSelect.addEventListener("change",function() {
			var data = _gthis.getPresetShapeDataset(Main.datasetOnePresetSelect.value);
			Main.datasetOneTextArea.value = data;
			_gthis.setDatasetOne(data);
		});
		Main.datasetOneTextArea.addEventListener("keypress",function() {
			_gthis.setDatasetOne(Main.datasetOneTextArea.value);
		});
		Main.datasetOneTextArea.addEventListener("change",function() {
			_gthis.setDatasetOne(Main.datasetOneTextArea.value);
		});
		Main.datasetTwoPresetSelect.addEventListener("change",function() {
			var data = _gthis.getPresetShapeDataset(Main.datasetTwoPresetSelect.value);
			Main.datasetTwoTextArea.value = data;
			_gthis.setDatasetTwo(data);
		});
		Main.datasetTwoTextArea.addEventListener("keypress",function() {
			_gthis.setDatasetTwo(Main.datasetTwoTextArea.value);
		});
		Main.datasetTwoTextArea.addEventListener("change",function() {
			_gthis.setDatasetTwo(Main.datasetTwoTextArea.value);
		});
		this.populateSelectMenus();
		this.reset();
	}
	,reset: function() {
		this.optimizer = new util_ShapeTweenOptimizer($bind(this,this.render));
		this.renderer = new util_CanvasRenderer(Main.rendererContainer,800,800);
		this.set_score(0);
		this.set_passes(0);
		this.resetErrors();
		this.resetScripts();
		this.resetDatasets();
		this.step();
	}
	,resetErrors: function() {
		Main.generalErrorsText.textContent = "";
		Main.costFunctionErrorsText.textContent = "";
		Main.optimizationFunctionErrorsText.textContent = "";
		Main.datasetOneErrorsText.textContent = "";
		Main.datasetTwoErrorsText.textContent = "";
	}
	,resetScripts: function() {
		Main.costFunctionPresetSelect.value = "simpleweightings";
		Main.costFunctionPresetSelect.dispatchEvent(new Event("change"));
		Main.optimizationFunctionPresetSelect.value = "randomswapping";
		Main.optimizationFunctionPresetSelect.dispatchEvent(new Event("change"));
	}
	,resetDatasets: function() {
		Main.datasetOnePresetSelect.value = "cinderella";
		Main.datasetOnePresetSelect.dispatchEvent(new Event("change"));
		Main.datasetTwoPresetSelect.value = "windflowers";
		Main.datasetTwoPresetSelect.dispatchEvent(new Event("change"));
	}
	,setupEventListeners: function() {
		var _gthis = this;
		Main.stepButton.addEventListener("click",function() {
			_gthis.step();
		});
		Main.resetButton.addEventListener("click",function() {
			_gthis.reset();
		});
		Main.costFunctionPresetSelect.addEventListener("change",function() {
			var code = _gthis.getPresetCostFunctionScript(Main.costFunctionPresetSelect.value);
			Main.costFunctionTextArea.value = code;
			_gthis.setCostFunctionScript(code);
		});
		Main.costFunctionTextArea.addEventListener("keypress",function() {
			_gthis.setCostFunctionScript(Main.costFunctionTextArea.value);
		});
		Main.costFunctionTextArea.addEventListener("change",function() {
			_gthis.setCostFunctionScript(Main.costFunctionTextArea.value);
		});
		Main.optimizationFunctionPresetSelect.addEventListener("change",function() {
			var code = _gthis.getPresetOptimizationFunctionScript(Main.optimizationFunctionPresetSelect.value);
			Main.optimizationFunctionTextArea.value = code;
			_gthis.setOptimizationFunctionScript(code);
		});
		Main.optimizationFunctionTextArea.addEventListener("keypress",function() {
			_gthis.setOptimizationFunctionScript(Main.optimizationFunctionTextArea.value);
		});
		Main.optimizationFunctionTextArea.addEventListener("change",function() {
			_gthis.setOptimizationFunctionScript(Main.optimizationFunctionTextArea.value);
		});
		Main.datasetOnePresetSelect.addEventListener("change",function() {
			var data = _gthis.getPresetShapeDataset(Main.datasetOnePresetSelect.value);
			Main.datasetOneTextArea.value = data;
			_gthis.setDatasetOne(data);
		});
		Main.datasetOneTextArea.addEventListener("keypress",function() {
			_gthis.setDatasetOne(Main.datasetOneTextArea.value);
		});
		Main.datasetOneTextArea.addEventListener("change",function() {
			_gthis.setDatasetOne(Main.datasetOneTextArea.value);
		});
		Main.datasetTwoPresetSelect.addEventListener("change",function() {
			var data = _gthis.getPresetShapeDataset(Main.datasetTwoPresetSelect.value);
			Main.datasetTwoTextArea.value = data;
			_gthis.setDatasetTwo(data);
		});
		Main.datasetTwoTextArea.addEventListener("keypress",function() {
			_gthis.setDatasetTwo(Main.datasetTwoTextArea.value);
		});
		Main.datasetTwoTextArea.addEventListener("change",function() {
			_gthis.setDatasetTwo(Main.datasetTwoTextArea.value);
		});
	}
	,populateSelectMenus: function() {
		var costScripts = Type.getClassFields(CostScripts);
		var optimizeScripts = Type.getClassFields(OptimizationScripts);
		var datasets = Type.getClassFields(ShapeDatasets);
		var populateSelectMenu = function(fields,element) {
			var _g = 0;
			while(_g < fields.length) {
				var field = fields[_g];
				++_g;
				var option = window.document.createElement("option");
				option.value = field;
				option.appendChild(window.document.createTextNode(field));
				element.appendChild(option);
			}
		};
		populateSelectMenu(costScripts,Main.costFunctionPresetSelect);
		populateSelectMenu(optimizeScripts,Main.optimizationFunctionPresetSelect);
		populateSelectMenu(datasets,Main.datasetOnePresetSelect);
		populateSelectMenu(datasets,Main.datasetTwoPresetSelect);
	}
	,step: function() {
		try {
			this.optimizer.optimize();
			Main.generalErrorsText.textContent = "";
			this.set_score(this.optimizer.calculateTotalScore());
			this.set_passes(this.get_passes() + 1);
		} catch( _g ) {
			haxe_NativeStackTrace.lastError = _g;
			var e = haxe_Exception.caught(_g).unwrap();
			Main.generalErrorsText.textContent = Std.string(e);
			return;
		}
		this.render(this.optimizer.currentShapes);
		this.updateResultsData();
	}
	,render: function(shapes) {
		this.renderer.render(shapes);
	}
	,setCostFunctionScript: function(script) {
		try {
			this.optimizer.setCostScript(script);
			Main.costFunctionErrorsText.textContent = "";
		} catch( _g ) {
			haxe_NativeStackTrace.lastError = _g;
			var e = haxe_Exception.caught(_g).unwrap();
			Main.costFunctionErrorsText.textContent = Std.string(e);
		}
	}
	,setOptimizationFunctionScript: function(script) {
		try {
			this.optimizer.setOptimizationScript(script);
			Main.optimizationFunctionErrorsText.textContent = "";
		} catch( _g ) {
			haxe_NativeStackTrace.lastError = _g;
			var e = haxe_Exception.caught(_g).unwrap();
			Main.optimizationFunctionErrorsText.textContent = Std.string(e);
		}
	}
	,setDatasetOne: function(json) {
		try {
			this.optimizer.setDatasetOne(json);
			Main.datasetOneErrorsText.textContent = "";
		} catch( _g ) {
			haxe_NativeStackTrace.lastError = _g;
			var e = haxe_Exception.caught(_g).unwrap();
			Main.datasetOneErrorsText.textContent = Std.string(e);
		}
	}
	,setDatasetTwo: function(json) {
		try {
			this.optimizer.setDatasetTwo(json);
			Main.datasetTwoErrorsText.textContent = "";
		} catch( _g ) {
			haxe_NativeStackTrace.lastError = _g;
			var e = haxe_Exception.caught(_g).unwrap();
			Main.datasetTwoErrorsText.textContent = Std.string(e);
		}
	}
	,updateResultsData: function() {
		Main.resultsDataTextArea.value = this.optimizer.getShapeIndicesMapping();
	}
	,get_score: function() {
		return parseFloat(Main.scoreText.textContent);
	}
	,set_score: function(score) {
		Main.scoreText.textContent = Std.string(score | 0);
		return score;
	}
	,get_passes: function() {
		return Std.parseInt(Main.optimizationPassesText.textContent);
	}
	,set_passes: function(passes) {
		Main.optimizationPassesText.textContent = Std.string(passes | 0);
		return passes;
	}
	,getPresetCostFunctionScript: function(id) {
		return Reflect.field(CostScripts,id);
	}
	,getPresetOptimizationFunctionScript: function(id) {
		return Reflect.field(OptimizationScripts,id);
	}
	,getPresetShapeDataset: function(id) {
		return Reflect.field(ShapeDatasets,id);
	}
	,__class__: Main
	,__properties__: {set_passes:"set_passes",get_passes:"get_passes",set_score:"set_score",get_score:"get_score"}
};
Math.__name__ = "Math";
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = "Reflect";
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
};
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( _g ) {
		haxe_NativeStackTrace.lastError = _g;
		return null;
	}
};
Reflect.setField = function(o,field,value) {
	o[field] = value;
};
Reflect.getProperty = function(o,field) {
	var tmp;
	if(o == null) {
		return null;
	} else {
		var tmp1;
		if(o.__properties__) {
			tmp = o.__properties__["get_" + field];
			tmp1 = tmp;
		} else {
			tmp1 = false;
		}
		if(tmp1) {
			return o[tmp]();
		} else {
			return o[field];
		}
	}
};
Reflect.setProperty = function(o,field,value) {
	var tmp;
	var tmp1;
	if(o.__properties__) {
		tmp = o.__properties__["set_" + field];
		tmp1 = tmp;
	} else {
		tmp1 = false;
	}
	if(tmp1) {
		o[tmp](value);
	} else {
		o[field] = value;
	}
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) {
			a.push(f);
		}
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	if(typeof(f) == "function") {
		return !(f.__name__ || f.__ename__);
	} else {
		return false;
	}
};
Reflect.compare = function(a,b) {
	if(a == b) {
		return 0;
	} else if(a > b) {
		return 1;
	} else {
		return -1;
	}
};
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) {
		return true;
	}
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) {
		return false;
	}
	if(f1.scope == f2.scope && f1.method == f2.method) {
		return f1.method != null;
	} else {
		return false;
	}
};
Reflect.isObject = function(v) {
	if(v == null) {
		return false;
	}
	var t = typeof(v);
	if(!(t == "string" || t == "object" && v.__enum__ == null)) {
		if(t == "function") {
			return (v.__name__ || v.__ename__) != null;
		} else {
			return false;
		}
	} else {
		return true;
	}
};
Reflect.isEnumValue = function(v) {
	if(v != null) {
		return v.__enum__ != null;
	} else {
		return false;
	}
};
Reflect.deleteField = function(o,field) {
	if(!Object.prototype.hasOwnProperty.call(o,field)) {
		return false;
	}
	delete(o[field]);
	return true;
};
Reflect.copy = function(o) {
	if(o == null) {
		return null;
	}
	var o2 = { };
	var _g = 0;
	var _g1 = Reflect.fields(o);
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		o2[f] = Reflect.field(o,f);
	}
	return o2;
};
Reflect.makeVarArgs = function(f) {
	return function() {
		var a = Array.prototype.slice;
		var a1 = arguments;
		var a2 = a.call(a1);
		return f(a2);
	};
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = "Std";
Std.is = function(v,t) {
	return js_Boot.__instanceof(v,t);
};
Std.isOfType = function(v,t) {
	return js_Boot.__instanceof(v,t);
};
Std.downcast = function(value,c) {
	if(js_Boot.__downcastCheck(value,c)) {
		return value;
	} else {
		return null;
	}
};
Std.instance = function(value,c) {
	if(js_Boot.__downcastCheck(value,c)) {
		return value;
	} else {
		return null;
	}
};
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.int = function(x) {
	return x | 0;
};
Std.parseInt = function(x) {
	if(x != null) {
		var _g = 0;
		var _g1 = x.length;
		while(_g < _g1) {
			var i = _g++;
			var c = x.charCodeAt(i);
			if(c <= 8 || c >= 14 && c != 32 && c != 45) {
				var nc = x.charCodeAt(i + 1);
				var v = parseInt(x,nc == 120 || nc == 88 ? 16 : 10);
				if(isNaN(v)) {
					return null;
				} else {
					return v;
				}
			}
		}
	}
	return null;
};
Std.parseFloat = function(x) {
	return parseFloat(x);
};
Std.random = function(x) {
	if(x <= 0) {
		return 0;
	} else {
		return Math.floor(Math.random() * x);
	}
};
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = "StringBuf";
StringBuf.prototype = {
	b: null
	,get_length: function() {
		return this.b.length;
	}
	,add: function(x) {
		this.b += Std.string(x);
	}
	,addChar: function(c) {
		this.b += String.fromCodePoint(c);
	}
	,addSub: function(s,pos,len) {
		this.b += len == null ? HxOverrides.substr(s,pos,null) : HxOverrides.substr(s,pos,len);
	}
	,toString: function() {
		return this.b;
	}
	,__class__: StringBuf
	,__properties__: {get_length:"get_length"}
};
var haxe_SysTools = function() { };
$hxClasses["haxe.SysTools"] = haxe_SysTools;
haxe_SysTools.__name__ = "haxe.SysTools";
haxe_SysTools.quoteUnixArg = function(argument) {
	if(argument == "") {
		return "''";
	}
	if(!new EReg("[^a-zA-Z0-9_@%+=:,./-]","").match(argument)) {
		return argument;
	}
	return "'" + StringTools.replace(argument,"'","'\"'\"'") + "'";
};
haxe_SysTools.quoteWinArg = function(argument,escapeMetaCharacters) {
	if(!new EReg("^[^ \t\\\\\"]+$","").match(argument)) {
		var result_b = "";
		var needquote = argument.indexOf(" ") != -1 || argument.indexOf("\t") != -1 || argument == "";
		if(needquote) {
			result_b += "\"";
		}
		var bs_buf = new StringBuf();
		var _g = 0;
		var _g1 = argument.length;
		while(_g < _g1) {
			var i = _g++;
			var _g2 = HxOverrides.cca(argument,i);
			if(_g2 == null) {
				var c = _g2;
				if(bs_buf.b.length > 0) {
					result_b += Std.string(bs_buf.b);
					bs_buf = new StringBuf();
				}
				result_b += String.fromCodePoint(c);
			} else {
				switch(_g2) {
				case 34:
					var bs = bs_buf.b;
					result_b += bs == null ? "null" : "" + bs;
					result_b += bs == null ? "null" : "" + bs;
					bs_buf = new StringBuf();
					result_b += "\\\"";
					break;
				case 92:
					bs_buf.b += "\\";
					break;
				default:
					var c1 = _g2;
					if(bs_buf.b.length > 0) {
						result_b += Std.string(bs_buf.b);
						bs_buf = new StringBuf();
					}
					result_b += String.fromCodePoint(c1);
				}
			}
		}
		result_b += Std.string(bs_buf.b);
		if(needquote) {
			result_b += Std.string(bs_buf.b);
			result_b += "\"";
		}
		argument = result_b;
	}
	if(escapeMetaCharacters) {
		var result_b = "";
		var _g = 0;
		var _g1 = argument.length;
		while(_g < _g1) {
			var i = _g++;
			var c = HxOverrides.cca(argument,i);
			if(haxe_SysTools.winMetaCharacters.indexOf(c) >= 0) {
				result_b += String.fromCodePoint(94);
			}
			result_b += String.fromCodePoint(c);
		}
		return result_b;
	} else {
		return argument;
	}
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = "StringTools";
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
};
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
};
StringTools.htmlEscape = function(s,quotes) {
	var buf_b = "";
	var _g_offset = 0;
	var _g_s = s;
	while(_g_offset < _g_s.length) {
		var s = _g_s;
		var index = _g_offset++;
		var c = s.charCodeAt(index);
		if(c >= 55296 && c <= 56319) {
			c = c - 55232 << 10 | s.charCodeAt(index + 1) & 1023;
		}
		var c1 = c;
		if(c1 >= 65536) {
			++_g_offset;
		}
		var code = c1;
		switch(code) {
		case 34:
			if(quotes) {
				buf_b += "&quot;";
			} else {
				buf_b += String.fromCodePoint(code);
			}
			break;
		case 38:
			buf_b += "&amp;";
			break;
		case 39:
			if(quotes) {
				buf_b += "&#039;";
			} else {
				buf_b += String.fromCodePoint(code);
			}
			break;
		case 60:
			buf_b += "&lt;";
			break;
		case 62:
			buf_b += "&gt;";
			break;
		default:
			buf_b += String.fromCodePoint(code);
		}
	}
	return buf_b;
};
StringTools.htmlUnescape = function(s) {
	return s.split("&gt;").join(">").split("&lt;").join("<").split("&quot;").join("\"").split("&#039;").join("'").split("&amp;").join("&");
};
StringTools.contains = function(s,value) {
	return s.indexOf(value) != -1;
};
StringTools.startsWith = function(s,start) {
	if(s.length >= start.length) {
		return s.lastIndexOf(start,0) == 0;
	} else {
		return false;
	}
};
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	if(slen >= elen) {
		return s.indexOf(end,slen - elen) == slen - elen;
	} else {
		return false;
	}
};
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	if(!(c > 8 && c < 14)) {
		return c == 32;
	} else {
		return true;
	}
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) ++r;
	if(r > 0) {
		return HxOverrides.substr(s,r,l - r);
	} else {
		return s;
	}
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) ++r;
	if(r > 0) {
		return HxOverrides.substr(s,0,l - r);
	} else {
		return s;
	}
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.lpad = function(s,c,l) {
	if(c.length <= 0) {
		return s;
	}
	var buf_b = "";
	l -= s.length;
	while(buf_b.length < l) buf_b += c == null ? "null" : "" + c;
	buf_b += s == null ? "null" : "" + s;
	return buf_b;
};
StringTools.rpad = function(s,c,l) {
	if(c.length <= 0) {
		return s;
	}
	var buf_b = "";
	buf_b += s == null ? "null" : "" + s;
	while(buf_b.length < l) buf_b += c == null ? "null" : "" + c;
	return buf_b;
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	while(true) {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
		if(!(n > 0)) {
			break;
		}
	}
	if(digits != null) {
		while(s.length < digits) s = "0" + s;
	}
	return s;
};
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
StringTools.unsafeCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
StringTools.iterator = function(s) {
	return new haxe_iterators_StringIterator(s);
};
StringTools.keyValueIterator = function(s) {
	return new haxe_iterators_StringKeyValueIterator(s);
};
StringTools.isEof = function(c) {
	return c != c;
};
StringTools.quoteUnixArg = function(argument) {
	if(argument == "") {
		return "''";
	} else if(!new EReg("[^a-zA-Z0-9_@%+=:,./-]","").match(argument)) {
		return argument;
	} else {
		return "'" + StringTools.replace(argument,"'","'\"'\"'") + "'";
	}
};
StringTools.quoteWinArg = function(argument,escapeMetaCharacters) {
	var argument1 = argument;
	if(!new EReg("^[^ \t\\\\\"]+$","").match(argument1)) {
		var result_b = "";
		var needquote = argument1.indexOf(" ") != -1 || argument1.indexOf("\t") != -1 || argument1 == "";
		if(needquote) {
			result_b += "\"";
		}
		var bs_buf = new StringBuf();
		var _g = 0;
		var _g1 = argument1.length;
		while(_g < _g1) {
			var i = _g++;
			var _g2 = HxOverrides.cca(argument1,i);
			if(_g2 == null) {
				var c = _g2;
				if(bs_buf.b.length > 0) {
					result_b += Std.string(bs_buf.b);
					bs_buf = new StringBuf();
				}
				result_b += String.fromCodePoint(c);
			} else {
				switch(_g2) {
				case 34:
					var bs = bs_buf.b;
					result_b += Std.string(bs);
					result_b += Std.string(bs);
					bs_buf = new StringBuf();
					result_b += "\\\"";
					break;
				case 92:
					bs_buf.b += "\\";
					break;
				default:
					var c1 = _g2;
					if(bs_buf.b.length > 0) {
						result_b += Std.string(bs_buf.b);
						bs_buf = new StringBuf();
					}
					result_b += String.fromCodePoint(c1);
				}
			}
		}
		result_b += Std.string(bs_buf.b);
		if(needquote) {
			result_b += Std.string(bs_buf.b);
			result_b += "\"";
		}
		argument1 = result_b;
	}
	if(escapeMetaCharacters) {
		var result_b = "";
		var _g = 0;
		var _g1 = argument1.length;
		while(_g < _g1) {
			var i = _g++;
			var c = HxOverrides.cca(argument1,i);
			if(haxe_SysTools.winMetaCharacters.indexOf(c) >= 0) {
				result_b += String.fromCodePoint(94);
			}
			result_b += String.fromCodePoint(c);
		}
		return result_b;
	} else {
		return argument1;
	}
};
StringTools.utf16CodePointAt = function(s,index) {
	var c = s.charCodeAt(index);
	if(c >= 55296 && c <= 56319) {
		c = c - 55232 << 10 | s.charCodeAt(index + 1) & 1023;
	}
	return c;
};
var ValueType = $hxEnums["ValueType"] = { __ename__:"ValueType",__constructs__:null
	,TNull: {_hx_name:"TNull",_hx_index:0,__enum__:"ValueType",toString:$estr}
	,TInt: {_hx_name:"TInt",_hx_index:1,__enum__:"ValueType",toString:$estr}
	,TFloat: {_hx_name:"TFloat",_hx_index:2,__enum__:"ValueType",toString:$estr}
	,TBool: {_hx_name:"TBool",_hx_index:3,__enum__:"ValueType",toString:$estr}
	,TObject: {_hx_name:"TObject",_hx_index:4,__enum__:"ValueType",toString:$estr}
	,TFunction: {_hx_name:"TFunction",_hx_index:5,__enum__:"ValueType",toString:$estr}
	,TClass: ($_=function(c) { return {_hx_index:6,c:c,__enum__:"ValueType",toString:$estr}; },$_._hx_name="TClass",$_.__params__ = ["c"],$_)
	,TEnum: ($_=function(e) { return {_hx_index:7,e:e,__enum__:"ValueType",toString:$estr}; },$_._hx_name="TEnum",$_.__params__ = ["e"],$_)
	,TUnknown: {_hx_name:"TUnknown",_hx_index:8,__enum__:"ValueType",toString:$estr}
};
ValueType.__constructs__ = [ValueType.TNull,ValueType.TInt,ValueType.TFloat,ValueType.TBool,ValueType.TObject,ValueType.TFunction,ValueType.TClass,ValueType.TEnum,ValueType.TUnknown];
ValueType.__empty_constructs__ = [ValueType.TNull,ValueType.TInt,ValueType.TFloat,ValueType.TBool,ValueType.TObject,ValueType.TFunction,ValueType.TUnknown];
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = "Type";
Type.getClass = function(o) {
	return js_Boot.getClass(o);
};
Type.getEnum = function(o) {
	if(o == null) {
		return null;
	}
	return $hxEnums[o.__enum__];
};
Type.getSuperClass = function(c) {
	return c.__super__;
};
Type.getClassName = function(c) {
	return c.__name__;
};
Type.getEnumName = function(e) {
	return e.__ename__;
};
Type.resolveClass = function(name) {
	return $hxClasses[name];
};
Type.resolveEnum = function(name) {
	return $hxEnums[name];
};
Type.createInstance = function(cl,args) {
	var ctor = Function.prototype.bind.apply(cl,[null].concat(args));
	return new (ctor);
};
Type.createEmptyInstance = function(cl) {
	return Object.create(cl.prototype);
};
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) {
		throw haxe_Exception.thrown("No such constructor " + constr);
	}
	if(Reflect.isFunction(f)) {
		if(params == null) {
			throw haxe_Exception.thrown("Constructor " + constr + " need parameters");
		}
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) {
		throw haxe_Exception.thrown("Constructor " + constr + " does not need parameters");
	}
	return f;
};
Type.createEnumIndex = function(e,index,params) {
	var c;
	var _g = e.__constructs__[index];
	if(_g == null) {
		c = null;
	} else {
		var ctor = _g;
		c = ctor._hx_name;
	}
	if(c == null) {
		throw haxe_Exception.thrown(index + " is not a valid enum constructor index");
	}
	return Type.createEnum(e,c,params);
};
Type.getInstanceFields = function(c) {
	var a = [];
	for(var i in c.prototype) a.push(i);
	HxOverrides.remove(a,"__class__");
	HxOverrides.remove(a,"__properties__");
	return a;
};
Type.getClassFields = function(c) {
	var a = Reflect.fields(c);
	HxOverrides.remove(a,"__name__");
	HxOverrides.remove(a,"__interfaces__");
	HxOverrides.remove(a,"__properties__");
	HxOverrides.remove(a,"__super__");
	HxOverrides.remove(a,"__meta__");
	HxOverrides.remove(a,"prototype");
	return a;
};
Type.getEnumConstructs = function(e) {
	var _this = e.__constructs__;
	var result = new Array(_this.length);
	var _g = 0;
	var _g1 = _this.length;
	while(_g < _g1) {
		var i = _g++;
		result[i] = _this[i]._hx_name;
	}
	return result;
};
Type.typeof = function(v) {
	switch(typeof(v)) {
	case "boolean":
		return ValueType.TBool;
	case "function":
		if(v.__name__ || v.__ename__) {
			return ValueType.TObject;
		}
		return ValueType.TFunction;
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) {
			return ValueType.TInt;
		}
		return ValueType.TFloat;
	case "object":
		if(v == null) {
			return ValueType.TNull;
		}
		var e = v.__enum__;
		if(e != null) {
			return ValueType.TEnum($hxEnums[e]);
		}
		var c = js_Boot.getClass(v);
		if(c != null) {
			return ValueType.TClass(c);
		}
		return ValueType.TObject;
	case "string":
		return ValueType.TClass(String);
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
};
Type.enumEq = function(a,b) {
	if(a == b) {
		return true;
	}
	try {
		var e = a.__enum__;
		if(e == null || e != b.__enum__) {
			return false;
		}
		if(a._hx_index != b._hx_index) {
			return false;
		}
		var enm = $hxEnums[e];
		var params = enm.__constructs__[a._hx_index].__params__;
		var _g = 0;
		while(_g < params.length) {
			var f = params[_g];
			++_g;
			if(!Type.enumEq(a[f],b[f])) {
				return false;
			}
		}
	} catch( _g ) {
		haxe_NativeStackTrace.lastError = _g;
		return false;
	}
	return true;
};
Type.enumConstructor = function(e) {
	return $hxEnums[e.__enum__].__constructs__[e._hx_index]._hx_name;
};
Type.enumParameters = function(e) {
	var enm = $hxEnums[e.__enum__];
	var params = enm.__constructs__[e._hx_index].__params__;
	if(params != null) {
		var _g = [];
		var _g1 = 0;
		while(_g1 < params.length) {
			var p = params[_g1];
			++_g1;
			_g.push(e[p]);
		}
		return _g;
	} else {
		return [];
	}
};
Type.enumIndex = function(e) {
	return e._hx_index;
};
Type.allEnums = function(e) {
	return e.__empty_constructs__.slice();
};
var UInt = {};
UInt.add = function(a,b) {
	return a + b;
};
UInt.div = function(a,b) {
	return UInt.toFloat(a) / UInt.toFloat(b);
};
UInt.mul = function(a,b) {
	return a * b;
};
UInt.sub = function(a,b) {
	return a - b;
};
UInt.gt = function(a,b) {
	var aNeg = a < 0;
	var bNeg = b < 0;
	if(aNeg != bNeg) {
		return aNeg;
	} else {
		return a > b;
	}
};
UInt.gte = function(a,b) {
	var aNeg = a < 0;
	var bNeg = b < 0;
	if(aNeg != bNeg) {
		return aNeg;
	} else {
		return a >= b;
	}
};
UInt.lt = function(a,b) {
	return UInt.gt(b,a);
};
UInt.lte = function(a,b) {
	return UInt.gte(b,a);
};
UInt.and = function(a,b) {
	return a & b;
};
UInt.or = function(a,b) {
	return a | b;
};
UInt.xor = function(a,b) {
	return a ^ b;
};
UInt.shl = function(a,b) {
	return a << b;
};
UInt.shr = function(a,b) {
	return a >>> b;
};
UInt.ushr = function(a,b) {
	return a >>> b;
};
UInt.mod = function(a,b) {
	return UInt.toFloat(a) % UInt.toFloat(b) | 0;
};
UInt.addWithFloat = function(a,b) {
	return UInt.toFloat(a) + b;
};
UInt.mulWithFloat = function(a,b) {
	return UInt.toFloat(a) * b;
};
UInt.divFloat = function(a,b) {
	return UInt.toFloat(a) / b;
};
UInt.floatDiv = function(a,b) {
	return a / UInt.toFloat(b);
};
UInt.subFloat = function(a,b) {
	return UInt.toFloat(a) - b;
};
UInt.floatSub = function(a,b) {
	return a - UInt.toFloat(b);
};
UInt.gtFloat = function(a,b) {
	return UInt.toFloat(a) > b;
};
UInt.equalsInt = function(a,b) {
	return a == b;
};
UInt.notEqualsInt = function(a,b) {
	return a != b;
};
UInt.equalsFloat = function(a,b) {
	return UInt.toFloat(a) == b;
};
UInt.notEqualsFloat = function(a,b) {
	return UInt.toFloat(a) != b;
};
UInt.gteFloat = function(a,b) {
	return UInt.toFloat(a) >= b;
};
UInt.floatGt = function(a,b) {
	return a > UInt.toFloat(b);
};
UInt.floatGte = function(a,b) {
	return a >= UInt.toFloat(b);
};
UInt.ltFloat = function(a,b) {
	return UInt.toFloat(a) < b;
};
UInt.lteFloat = function(a,b) {
	return UInt.toFloat(a) <= b;
};
UInt.floatLt = function(a,b) {
	return a < UInt.toFloat(b);
};
UInt.floatLte = function(a,b) {
	return a <= UInt.toFloat(b);
};
UInt.modFloat = function(a,b) {
	return UInt.toFloat(a) % b;
};
UInt.floatMod = function(a,b) {
	return a % UInt.toFloat(b);
};
UInt.negBits = function(this1) {
	return ~this1;
};
UInt.prefixIncrement = function(this1) {
	return ++this1;
};
UInt.postfixIncrement = function(this1) {
	return this1++;
};
UInt.prefixDecrement = function(this1) {
	return --this1;
};
UInt.postfixDecrement = function(this1) {
	return this1--;
};
UInt.toString = function(this1,radix) {
	return Std.string(UInt.toFloat(this1));
};
UInt.toInt = function(this1) {
	return this1;
};
UInt.toFloat = function(this1) {
	var int = this1;
	if(int < 0) {
		return 4294967296.0 + int;
	} else {
		return int + 0.0;
	}
};
var haxe_StackItem = $hxEnums["haxe.StackItem"] = { __ename__:"haxe.StackItem",__constructs__:null
	,CFunction: {_hx_name:"CFunction",_hx_index:0,__enum__:"haxe.StackItem",toString:$estr}
	,Module: ($_=function(m) { return {_hx_index:1,m:m,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="Module",$_.__params__ = ["m"],$_)
	,FilePos: ($_=function(s,file,line,column) { return {_hx_index:2,s:s,file:file,line:line,column:column,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="FilePos",$_.__params__ = ["s","file","line","column"],$_)
	,Method: ($_=function(classname,method) { return {_hx_index:3,classname:classname,method:method,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="Method",$_.__params__ = ["classname","method"],$_)
	,LocalFunction: ($_=function(v) { return {_hx_index:4,v:v,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="LocalFunction",$_.__params__ = ["v"],$_)
};
haxe_StackItem.__constructs__ = [haxe_StackItem.CFunction,haxe_StackItem.Module,haxe_StackItem.FilePos,haxe_StackItem.Method,haxe_StackItem.LocalFunction];
haxe_StackItem.__empty_constructs__ = [haxe_StackItem.CFunction];
var haxe_CallStack = {};
haxe_CallStack.__properties__ = {get_length:"get_length"};
haxe_CallStack.get_length = function(this1) {
	return this1.length;
};
haxe_CallStack.callStack = function() {
	return haxe_NativeStackTrace.toHaxe(haxe_NativeStackTrace.callStack());
};
haxe_CallStack.exceptionStack = function(fullStack) {
	if(fullStack == null) {
		fullStack = false;
	}
	var eStack = haxe_NativeStackTrace.toHaxe(haxe_NativeStackTrace.exceptionStack());
	return fullStack ? eStack : haxe_CallStack.subtract(eStack,haxe_CallStack.callStack());
};
haxe_CallStack.toString = function(stack) {
	var b = new StringBuf();
	var _g = 0;
	var _g1 = stack;
	while(_g < _g1.length) {
		var s = _g1[_g];
		++_g;
		b.b += "\nCalled from ";
		haxe_CallStack.itemToString(b,s);
	}
	return b.b;
};
haxe_CallStack.subtract = function(this1,stack) {
	var startIndex = -1;
	var i = -1;
	while(++i < this1.length) {
		var _g = 0;
		var _g1 = stack.length;
		while(_g < _g1) {
			var j = _g++;
			if(haxe_CallStack.equalItems(this1[i],stack[j])) {
				if(startIndex < 0) {
					startIndex = i;
				}
				++i;
				if(i >= this1.length) {
					break;
				}
			} else {
				startIndex = -1;
			}
		}
		if(startIndex >= 0) {
			break;
		}
	}
	if(startIndex >= 0) {
		return this1.slice(0,startIndex);
	} else {
		return this1;
	}
};
haxe_CallStack.copy = function(this1) {
	return this1.slice();
};
haxe_CallStack.get = function(this1,index) {
	return this1[index];
};
haxe_CallStack.asArray = function(this1) {
	return this1;
};
haxe_CallStack.equalItems = function(item1,item2) {
	if(item1 == null) {
		if(item2 == null) {
			return true;
		} else {
			return false;
		}
	} else {
		switch(item1._hx_index) {
		case 0:
			if(item2 == null) {
				return false;
			} else if(item2._hx_index == 0) {
				return true;
			} else {
				return false;
			}
			break;
		case 1:
			if(item2 == null) {
				return false;
			} else if(item2._hx_index == 1) {
				var m2 = item2.m;
				var m1 = item1.m;
				return m1 == m2;
			} else {
				return false;
			}
			break;
		case 2:
			if(item2 == null) {
				return false;
			} else if(item2._hx_index == 2) {
				var item21 = item2.s;
				var file2 = item2.file;
				var line2 = item2.line;
				var col2 = item2.column;
				var col1 = item1.column;
				var line1 = item1.line;
				var file1 = item1.file;
				var item11 = item1.s;
				if(file1 == file2 && line1 == line2 && col1 == col2) {
					return haxe_CallStack.equalItems(item11,item21);
				} else {
					return false;
				}
			} else {
				return false;
			}
			break;
		case 3:
			if(item2 == null) {
				return false;
			} else if(item2._hx_index == 3) {
				var class2 = item2.classname;
				var method2 = item2.method;
				var method1 = item1.method;
				var class1 = item1.classname;
				if(class1 == class2) {
					return method1 == method2;
				} else {
					return false;
				}
			} else {
				return false;
			}
			break;
		case 4:
			if(item2 == null) {
				return false;
			} else if(item2._hx_index == 4) {
				var v2 = item2.v;
				var v1 = item1.v;
				return v1 == v2;
			} else {
				return false;
			}
			break;
		}
	}
};
haxe_CallStack.exceptionToString = function(e) {
	if(e.get_previous() == null) {
		var tmp = "Exception: " + e.toString();
		var tmp1 = e.get_stack();
		return tmp + (tmp1 == null ? "null" : haxe_CallStack.toString(tmp1));
	}
	var result = "";
	var e1 = e;
	var prev = null;
	while(e1 != null) {
		if(prev == null) {
			var result1 = "Exception: " + e1.get_message();
			var tmp = e1.get_stack();
			result = result1 + (tmp == null ? "null" : haxe_CallStack.toString(tmp)) + result;
		} else {
			var prevStack = haxe_CallStack.subtract(e1.get_stack(),prev.get_stack());
			result = "Exception: " + e1.get_message() + (prevStack == null ? "null" : haxe_CallStack.toString(prevStack)) + "\n\nNext " + result;
		}
		prev = e1;
		e1 = e1.get_previous();
	}
	return result;
};
haxe_CallStack.itemToString = function(b,s) {
	switch(s._hx_index) {
	case 0:
		b.b += "a C function";
		break;
	case 1:
		var m = s.m;
		b.b += "module ";
		b.b += m == null ? "null" : "" + m;
		break;
	case 2:
		var s1 = s.s;
		var file = s.file;
		var line = s.line;
		var col = s.column;
		if(s1 != null) {
			haxe_CallStack.itemToString(b,s1);
			b.b += " (";
		}
		b.b += file == null ? "null" : "" + file;
		b.b += " line ";
		b.b += line == null ? "null" : "" + line;
		if(col != null) {
			b.b += " column ";
			b.b += col == null ? "null" : "" + col;
		}
		if(s1 != null) {
			b.b += ")";
		}
		break;
	case 3:
		var cname = s.classname;
		var meth = s.method;
		b.b += Std.string(cname == null ? "<unknown>" : cname);
		b.b += ".";
		b.b += meth == null ? "null" : "" + meth;
		break;
	case 4:
		var n = s.v;
		b.b += "local function #";
		b.b += n == null ? "null" : "" + n;
		break;
	}
};
var haxe_IMap = function() { };
$hxClasses["haxe.IMap"] = haxe_IMap;
haxe_IMap.__name__ = "haxe.IMap";
haxe_IMap.__isInterface__ = true;
haxe_IMap.prototype = {
	get: null
	,set: null
	,exists: null
	,remove: null
	,keys: null
	,iterator: null
	,keyValueIterator: null
	,copy: null
	,toString: null
	,clear: null
	,__class__: haxe_IMap
};
var haxe_DynamicAccess = {};
haxe_DynamicAccess._new = function() {
	var this1 = { };
	return this1;
};
haxe_DynamicAccess.get = function(this1,key) {
	return this1[key];
};
haxe_DynamicAccess.set = function(this1,key,value) {
	return this1[key] = value;
};
haxe_DynamicAccess.exists = function(this1,key) {
	return Object.prototype.hasOwnProperty.call(this1,key);
};
haxe_DynamicAccess.remove = function(this1,key) {
	return Reflect.deleteField(this1,key);
};
haxe_DynamicAccess.keys = function(this1) {
	return Reflect.fields(this1);
};
haxe_DynamicAccess.copy = function(this1) {
	return Reflect.copy(this1);
};
haxe_DynamicAccess.iterator = function(this1) {
	return new haxe_iterators_DynamicAccessIterator(this1);
};
haxe_DynamicAccess.keyValueIterator = function(this1) {
	return new haxe_iterators_DynamicAccessKeyValueIterator(this1);
};
var haxe_Exception = function(message,previous,native) {
	Error.call(this,message);
	this.message = message;
	this.__previousException = previous;
	this.__nativeException = native != null ? native : this;
	this.__skipStack = 0;
	var old = Error.prepareStackTrace;
	Error.prepareStackTrace = function(e) { return e.stack; }
	if(((native) instanceof Error)) {
		this.stack = native.stack;
	} else {
		var e = null;
		if(Error.captureStackTrace) {
			Error.captureStackTrace(this,haxe_Exception);
			e = this;
		} else {
			e = new Error();
			if(typeof(e.stack) == "undefined") {
				try { throw e; } catch(_) {}
				this.__skipStack++;
			}
		}
		this.stack = e.stack;
	}
	Error.prepareStackTrace = old;
};
$hxClasses["haxe.Exception"] = haxe_Exception;
haxe_Exception.__name__ = "haxe.Exception";
haxe_Exception.caught = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value;
	} else if(((value) instanceof Error)) {
		return new haxe_Exception(value.message,null,value);
	} else {
		return new haxe_ValueException(value,null,value);
	}
};
haxe_Exception.thrown = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value.get_native();
	} else if(((value) instanceof Error)) {
		return value;
	} else {
		var e = new haxe_ValueException(value);
		e.__skipStack++;
		return e;
	}
};
haxe_Exception.__super__ = Error;
haxe_Exception.prototype = $extend(Error.prototype,{
	__skipStack: null
	,__nativeException: null
	,__previousException: null
	,unwrap: function() {
		return this.__nativeException;
	}
	,toString: function() {
		return this.get_message();
	}
	,details: function() {
		if(this.get_previous() == null) {
			var tmp = "Exception: " + this.toString();
			var tmp1 = this.get_stack();
			return tmp + (tmp1 == null ? "null" : haxe_CallStack.toString(tmp1));
		} else {
			var result = "";
			var e = this;
			var prev = null;
			while(e != null) {
				if(prev == null) {
					var result1 = "Exception: " + e.get_message();
					var tmp = e.get_stack();
					result = result1 + (tmp == null ? "null" : haxe_CallStack.toString(tmp)) + result;
				} else {
					var prevStack = haxe_CallStack.subtract(e.get_stack(),prev.get_stack());
					result = "Exception: " + e.get_message() + (prevStack == null ? "null" : haxe_CallStack.toString(prevStack)) + "\n\nNext " + result;
				}
				prev = e;
				e = e.get_previous();
			}
			return result;
		}
	}
	,__shiftStack: function() {
		this.__skipStack++;
	}
	,get_message: function() {
		return this.message;
	}
	,get_previous: function() {
		return this.__previousException;
	}
	,get_native: function() {
		return this.__nativeException;
	}
	,get_stack: function() {
		var _g = this.__exceptionStack;
		if(_g == null) {
			var value = haxe_NativeStackTrace.toHaxe(haxe_NativeStackTrace.normalize(this.stack),this.__skipStack);
			this.setProperty("__exceptionStack",value);
			return value;
		} else {
			var s = _g;
			return s;
		}
	}
	,setProperty: function(name,value) {
		try {
			Object.defineProperty(this,name,{ value : value});
		} catch( _g ) {
			this[name] = value;
		}
	}
	,get___exceptionStack: function() {
		return this.__exceptionStack;
	}
	,set___exceptionStack: function(value) {
		this.setProperty("__exceptionStack",value);
		return value;
	}
	,get___skipStack: function() {
		return this.__skipStack;
	}
	,set___skipStack: function(value) {
		this.setProperty("__skipStack",value);
		return value;
	}
	,get___nativeException: function() {
		return this.__nativeException;
	}
	,set___nativeException: function(value) {
		this.setProperty("__nativeException",value);
		return value;
	}
	,get___previousException: function() {
		return this.__previousException;
	}
	,set___previousException: function(value) {
		this.setProperty("__previousException",value);
		return value;
	}
	,__class__: haxe_Exception
	,__properties__: {set___exceptionStack:"set___exceptionStack",get___exceptionStack:"get___exceptionStack",get_native:"get_native",get_previous:"get_previous",get_stack:"get_stack",get_message:"get_message"}
});
var haxe_Log = function() { };
$hxClasses["haxe.Log"] = haxe_Log;
haxe_Log.__name__ = "haxe.Log";
haxe_Log.formatOutput = function(v,infos) {
	var str = Std.string(v);
	if(infos == null) {
		return str;
	}
	var pstr = infos.fileName + ":" + infos.lineNumber;
	if(infos.customParams != null) {
		var _g = 0;
		var _g1 = infos.customParams;
		while(_g < _g1.length) {
			var v = _g1[_g];
			++_g;
			str += ", " + Std.string(v);
		}
	}
	return pstr + ": " + str;
};
haxe_Log.trace = function(v,infos) {
	var str = haxe_Log.formatOutput(v,infos);
	if(typeof(console) != "undefined" && console.log != null) {
		console.log(str);
	}
};
var haxe_NativeStackTrace = function() { };
$hxClasses["haxe.NativeStackTrace"] = haxe_NativeStackTrace;
haxe_NativeStackTrace.__name__ = "haxe.NativeStackTrace";
haxe_NativeStackTrace.lastError = null;
haxe_NativeStackTrace.wrapCallSite = null;
haxe_NativeStackTrace.saveStack = function(e) {
	haxe_NativeStackTrace.lastError = e;
};
haxe_NativeStackTrace.callStack = function() {
	var e = new Error("");
	var stack = haxe_NativeStackTrace.tryHaxeStack(e);
	if(typeof(stack) == "undefined") {
		try {
			throw e;
		} catch( _g ) {
		}
		stack = e.stack;
	}
	return haxe_NativeStackTrace.normalize(stack,2);
};
haxe_NativeStackTrace.exceptionStack = function() {
	return haxe_NativeStackTrace.normalize(haxe_NativeStackTrace.tryHaxeStack(haxe_NativeStackTrace.lastError));
};
haxe_NativeStackTrace.toHaxe = function(s,skip) {
	if(skip == null) {
		skip = 0;
	}
	if(s == null) {
		return [];
	} else if(typeof(s) == "string") {
		var stack = s.split("\n");
		if(stack[0] == "Error") {
			stack.shift();
		}
		var m = [];
		var _g = 0;
		var _g1 = stack.length;
		while(_g < _g1) {
			var i = _g++;
			if(skip > i) {
				continue;
			}
			var line = stack[i];
			var matched = line.match(/^    at ([A-Za-z0-9_. ]+) \(([^)]+):([0-9]+):([0-9]+)\)$/);
			if(matched != null) {
				var path = matched[1].split(".");
				if(path[0] == "$hxClasses") {
					path.shift();
				}
				var meth = path.pop();
				var file = matched[2];
				var line1 = Std.parseInt(matched[3]);
				var column = Std.parseInt(matched[4]);
				m.push(haxe_StackItem.FilePos(meth == "Anonymous function" ? haxe_StackItem.LocalFunction() : meth == "Global code" ? null : haxe_StackItem.Method(path.join("."),meth),file,line1,column));
			} else {
				m.push(haxe_StackItem.Module(StringTools.trim(line)));
			}
		}
		return m;
	} else if(skip > 0 && Array.isArray(s)) {
		return s.slice(skip);
	} else {
		return s;
	}
};
haxe_NativeStackTrace.tryHaxeStack = function(e) {
	if(e == null) {
		return [];
	}
	var oldValue = Error.prepareStackTrace;
	Error.prepareStackTrace = haxe_NativeStackTrace.prepareHxStackTrace;
	var stack = e.stack;
	Error.prepareStackTrace = oldValue;
	return stack;
};
haxe_NativeStackTrace.prepareHxStackTrace = function(e,callsites) {
	var stack = [];
	var _g = 0;
	while(_g < callsites.length) {
		var site = callsites[_g];
		++_g;
		if(haxe_NativeStackTrace.wrapCallSite != null) {
			site = haxe_NativeStackTrace.wrapCallSite(site);
		}
		var method = null;
		var fullName = site.getFunctionName();
		if(fullName != null) {
			var idx = fullName.lastIndexOf(".");
			if(idx >= 0) {
				var className = fullName.substring(0,idx);
				var methodName = fullName.substring(idx + 1);
				method = haxe_StackItem.Method(className,methodName);
			} else {
				method = haxe_StackItem.Method(null,fullName);
			}
		}
		var fileName = site.getFileName();
		var fileAddr = fileName == null ? -1 : fileName.indexOf("file:");
		if(haxe_NativeStackTrace.wrapCallSite != null && fileAddr > 0) {
			fileName = fileName.substring(fileAddr + 6);
		}
		stack.push(haxe_StackItem.FilePos(method,fileName,site.getLineNumber(),site.getColumnNumber()));
	}
	return stack;
};
haxe_NativeStackTrace.normalize = function(stack,skipItems) {
	if(skipItems == null) {
		skipItems = 0;
	}
	if(Array.isArray(stack) && skipItems > 0) {
		return stack.slice(skipItems);
	} else if(typeof(stack) == "string") {
		switch(stack.substring(0,6)) {
		case "Error\n":case "Error:":
			++skipItems;
			break;
		default:
		}
		return haxe_NativeStackTrace.skipLines(stack,skipItems);
	} else {
		return stack;
	}
};
haxe_NativeStackTrace.skipLines = function(stack,skip,pos) {
	if(pos == null) {
		pos = 0;
	}
	if(skip > 0) {
		pos = stack.indexOf("\n",pos);
		if(pos < 0) {
			return "";
		} else {
			return haxe_NativeStackTrace.skipLines(stack,--skip,pos + 1);
		}
	} else {
		return stack.substring(pos);
	}
};
var haxe_Rest = {};
haxe_Rest.__properties__ = {get_length:"get_length"};
haxe_Rest.get_length = function(this1) {
	return this1.length;
};
haxe_Rest.of = function(array) {
	var this1 = array;
	return this1;
};
haxe_Rest._new = function(array) {
	var this1 = array;
	return this1;
};
haxe_Rest.get = function(this1,index) {
	return this1[index];
};
haxe_Rest.toArray = function(this1) {
	return this1.slice();
};
haxe_Rest.iterator = function(this1) {
	return new haxe_iterators_RestIterator(this1);
};
haxe_Rest.keyValueIterator = function(this1) {
	return new haxe_iterators_RestKeyValueIterator(this1);
};
haxe_Rest.append = function(this1,item) {
	var result = this1.slice();
	result.push(item);
	var this1 = result;
	return this1;
};
haxe_Rest.prepend = function(this1,item) {
	var result = this1.slice();
	result.unshift(item);
	var this1 = result;
	return this1;
};
haxe_Rest.toString = function(this1) {
	return "[" + this1.toString() + "]";
};
var haxe_ValueException = function(value,previous,native) {
	haxe_Exception.call(this,String(value),previous,native);
	this.value = value;
	this.__skipStack++;
};
$hxClasses["haxe.ValueException"] = haxe_ValueException;
haxe_ValueException.__name__ = "haxe.ValueException";
haxe_ValueException.__super__ = haxe_Exception;
haxe_ValueException.prototype = $extend(haxe_Exception.prototype,{
	value: null
	,unwrap: function() {
		return this.value;
	}
	,__class__: haxe_ValueException
});
var haxe_ds_BalancedTree = function() {
};
$hxClasses["haxe.ds.BalancedTree"] = haxe_ds_BalancedTree;
haxe_ds_BalancedTree.__name__ = "haxe.ds.BalancedTree";
haxe_ds_BalancedTree.__interfaces__ = [haxe_IMap];
haxe_ds_BalancedTree.iteratorLoop = function(node,acc) {
	if(node != null) {
		haxe_ds_BalancedTree.iteratorLoop(node.left,acc);
		acc.push(node.value);
		haxe_ds_BalancedTree.iteratorLoop(node.right,acc);
	}
};
haxe_ds_BalancedTree.prototype = {
	root: null
	,set: function(key,value) {
		this.root = this.setLoop(key,value,this.root);
	}
	,get: function(key) {
		var node = this.root;
		while(node != null) {
			var c = this.compare(key,node.key);
			if(c == 0) {
				return node.value;
			}
			if(c < 0) {
				node = node.left;
			} else {
				node = node.right;
			}
		}
		return null;
	}
	,remove: function(key) {
		try {
			this.root = this.removeLoop(key,this.root);
			return true;
		} catch( _g ) {
			haxe_NativeStackTrace.lastError = _g;
			if(typeof(haxe_Exception.caught(_g).unwrap()) == "string") {
				return false;
			} else {
				throw _g;
			}
		}
	}
	,exists: function(key) {
		var node = this.root;
		while(node != null) {
			var c = this.compare(key,node.key);
			if(c == 0) {
				return true;
			} else if(c < 0) {
				node = node.left;
			} else {
				node = node.right;
			}
		}
		return false;
	}
	,iterator: function() {
		var ret = [];
		haxe_ds_BalancedTree.iteratorLoop(this.root,ret);
		return new haxe_iterators_ArrayIterator(ret);
	}
	,keyValueIterator: function() {
		return new haxe_iterators_MapKeyValueIterator(this);
	}
	,keys: function() {
		var ret = [];
		this.keysLoop(this.root,ret);
		return new haxe_iterators_ArrayIterator(ret);
	}
	,copy: function() {
		var copied = new haxe_ds_BalancedTree();
		copied.root = this.root;
		return copied;
	}
	,setLoop: function(k,v,node) {
		if(node == null) {
			return new haxe_ds_TreeNode(null,k,v,null);
		}
		var c = this.compare(k,node.key);
		if(c == 0) {
			return new haxe_ds_TreeNode(node.left,k,v,node.right,node == null ? 0 : node._height);
		} else if(c < 0) {
			var nl = this.setLoop(k,v,node.left);
			return this.balance(nl,node.key,node.value,node.right);
		} else {
			var nr = this.setLoop(k,v,node.right);
			return this.balance(node.left,node.key,node.value,nr);
		}
	}
	,removeLoop: function(k,node) {
		if(node == null) {
			throw haxe_Exception.thrown("Not_found");
		}
		var c = this.compare(k,node.key);
		if(c == 0) {
			return this.merge(node.left,node.right);
		} else if(c < 0) {
			return this.balance(this.removeLoop(k,node.left),node.key,node.value,node.right);
		} else {
			return this.balance(node.left,node.key,node.value,this.removeLoop(k,node.right));
		}
	}
	,keysLoop: function(node,acc) {
		if(node != null) {
			this.keysLoop(node.left,acc);
			acc.push(node.key);
			this.keysLoop(node.right,acc);
		}
	}
	,merge: function(t1,t2) {
		if(t1 == null) {
			return t2;
		}
		if(t2 == null) {
			return t1;
		}
		var t = this.minBinding(t2);
		return this.balance(t1,t.key,t.value,this.removeMinBinding(t2));
	}
	,minBinding: function(t) {
		if(t == null) {
			throw haxe_Exception.thrown("Not_found");
		} else if(t.left == null) {
			return t;
		} else {
			return this.minBinding(t.left);
		}
	}
	,removeMinBinding: function(t) {
		if(t.left == null) {
			return t.right;
		} else {
			return this.balance(this.removeMinBinding(t.left),t.key,t.value,t.right);
		}
	}
	,balance: function(l,k,v,r) {
		var hl = l == null ? 0 : l._height;
		var hr = r == null ? 0 : r._height;
		if(hl > hr + 2) {
			var _this = l.left;
			var _this1 = l.right;
			if((_this == null ? 0 : _this._height) >= (_this1 == null ? 0 : _this1._height)) {
				return new haxe_ds_TreeNode(l.left,l.key,l.value,new haxe_ds_TreeNode(l.right,k,v,r));
			} else {
				return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l.left,l.key,l.value,l.right.left),l.right.key,l.right.value,new haxe_ds_TreeNode(l.right.right,k,v,r));
			}
		} else if(hr > hl + 2) {
			var _this = r.right;
			var _this1 = r.left;
			if((_this == null ? 0 : _this._height) > (_this1 == null ? 0 : _this1._height)) {
				return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l,k,v,r.left),r.key,r.value,r.right);
			} else {
				return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l,k,v,r.left.left),r.left.key,r.left.value,new haxe_ds_TreeNode(r.left.right,r.key,r.value,r.right));
			}
		} else {
			return new haxe_ds_TreeNode(l,k,v,r,(hl > hr ? hl : hr) + 1);
		}
	}
	,compare: function(k1,k2) {
		return Reflect.compare(k1,k2);
	}
	,toString: function() {
		if(this.root == null) {
			return "{}";
		} else {
			return "{" + this.root.toString() + "}";
		}
	}
	,clear: function() {
		this.root = null;
	}
	,__class__: haxe_ds_BalancedTree
};
var haxe_ds_TreeNode = function(l,k,v,r,h) {
	if(h == null) {
		h = -1;
	}
	this.left = l;
	this.key = k;
	this.value = v;
	this.right = r;
	if(h == -1) {
		var tmp;
		var _this = this.left;
		var _this1 = this.right;
		if((_this == null ? 0 : _this._height) > (_this1 == null ? 0 : _this1._height)) {
			var _this = this.left;
			tmp = _this == null ? 0 : _this._height;
		} else {
			var _this = this.right;
			tmp = _this == null ? 0 : _this._height;
		}
		this._height = tmp + 1;
	} else {
		this._height = h;
	}
};
$hxClasses["haxe.ds.TreeNode"] = haxe_ds_TreeNode;
haxe_ds_TreeNode.__name__ = "haxe.ds.TreeNode";
haxe_ds_TreeNode.prototype = {
	left: null
	,right: null
	,key: null
	,value: null
	,_height: null
	,toString: function() {
		return (this.left == null ? "" : this.left.toString() + ", ") + ("" + Std.string(this.key) + "=" + Std.string(this.value)) + (this.right == null ? "" : ", " + this.right.toString());
	}
	,__class__: haxe_ds_TreeNode
};
var haxe_ds_EnumValueMap = function() {
	haxe_ds_BalancedTree.call(this);
};
$hxClasses["haxe.ds.EnumValueMap"] = haxe_ds_EnumValueMap;
haxe_ds_EnumValueMap.__name__ = "haxe.ds.EnumValueMap";
haxe_ds_EnumValueMap.__interfaces__ = [haxe_IMap];
haxe_ds_EnumValueMap.__super__ = haxe_ds_BalancedTree;
haxe_ds_EnumValueMap.prototype = $extend(haxe_ds_BalancedTree.prototype,{
	compare: function(k1,k2) {
		var d = k1._hx_index - k2._hx_index;
		if(d != 0) {
			return d;
		}
		var p1 = Type.enumParameters(k1);
		var p2 = Type.enumParameters(k2);
		if(p1.length == 0 && p2.length == 0) {
			return 0;
		}
		return this.compareArgs(p1,p2);
	}
	,compareArgs: function(a1,a2) {
		var ld = a1.length - a2.length;
		if(ld != 0) {
			return ld;
		}
		var _g = 0;
		var _g1 = a1.length;
		while(_g < _g1) {
			var i = _g++;
			var d = this.compareArg(a1[i],a2[i]);
			if(d != 0) {
				return d;
			}
		}
		return 0;
	}
	,compareArg: function(v1,v2) {
		if(Reflect.isEnumValue(v1) && Reflect.isEnumValue(v2)) {
			return this.compare(v1,v2);
		} else if(((v1) instanceof Array) && ((v2) instanceof Array)) {
			return this.compareArgs(v1,v2);
		} else {
			return Reflect.compare(v1,v2);
		}
	}
	,copy: function() {
		var copied = new haxe_ds_EnumValueMap();
		copied.root = this.root;
		return copied;
	}
	,__class__: haxe_ds_EnumValueMap
});
var haxe_ds_HashMap = {};
haxe_ds_HashMap._new = function() {
	var this1 = new haxe_ds__$HashMap_HashMapData();
	return this1;
};
haxe_ds_HashMap.set = function(this1,k,v) {
	var _this = this1.keys;
	var key = k.hashCode();
	_this.h[key] = k;
	var _this = this1.values;
	var key = k.hashCode();
	_this.h[key] = v;
};
haxe_ds_HashMap.get = function(this1,k) {
	var _this = this1.values;
	var key = k.hashCode();
	return _this.h[key];
};
haxe_ds_HashMap.exists = function(this1,k) {
	var _this = this1.values;
	var key = k.hashCode();
	return _this.h.hasOwnProperty(key);
};
haxe_ds_HashMap.remove = function(this1,k) {
	this1.values.remove(k.hashCode());
	return this1.keys.remove(k.hashCode());
};
haxe_ds_HashMap.keys = function(this1) {
	return this1.keys.iterator();
};
haxe_ds_HashMap.copy = function(this1) {
	var copied = new haxe_ds__$HashMap_HashMapData();
	copied.keys = this1.keys.copy();
	copied.values = this1.values.copy();
	return copied;
};
haxe_ds_HashMap.iterator = function(this1) {
	return this1.values.iterator();
};
haxe_ds_HashMap.keyValueIterator = function(this1) {
	return new haxe_iterators_HashMapKeyValueIterator(this1);
};
haxe_ds_HashMap.clear = function(this1) {
	this1.keys.h = { };
	this1.values.h = { };
};
var haxe_ds__$HashMap_HashMapData = function() {
	this.keys = new haxe_ds_IntMap();
	this.values = new haxe_ds_IntMap();
};
$hxClasses["haxe.ds._HashMap.HashMapData"] = haxe_ds__$HashMap_HashMapData;
haxe_ds__$HashMap_HashMapData.__name__ = "haxe.ds._HashMap.HashMapData";
haxe_ds__$HashMap_HashMapData.prototype = {
	keys: null
	,values: null
	,__class__: haxe_ds__$HashMap_HashMapData
};
var haxe_ds_IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe_ds_IntMap;
haxe_ds_IntMap.__name__ = "haxe.ds.IntMap";
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	h: null
	,set: function(key,value) {
		this.h[key] = value;
	}
	,get: function(key) {
		return this.h[key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty(key);
	}
	,remove: function(key) {
		if(!this.h.hasOwnProperty(key)) {
			return false;
		}
		delete(this.h[key]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) if(this.h.hasOwnProperty(key)) a.push(+key);
		return new haxe_iterators_ArrayIterator(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i];
		}};
	}
	,keyValueIterator: function() {
		return new haxe_iterators_MapKeyValueIterator(this);
	}
	,copy: function() {
		var copied = new haxe_ds_IntMap();
		var key = this.keys();
		while(key.hasNext()) {
			var key1 = key.next();
			copied.h[key1] = this.h[key1];
		}
		return copied;
	}
	,toString: function() {
		var s_b = "";
		s_b += "{";
		var it = this.keys();
		var i = it;
		while(i.hasNext()) {
			var i1 = i.next();
			s_b += i1 == null ? "null" : "" + i1;
			s_b += " => ";
			s_b += Std.string(Std.string(this.h[i1]));
			if(it.hasNext()) {
				s_b += ", ";
			}
		}
		s_b += "}";
		return s_b;
	}
	,clear: function() {
		this.h = { };
	}
	,__class__: haxe_ds_IntMap
};
var haxe_ds_List = function() {
	this.length = 0;
};
$hxClasses["haxe.ds.List"] = haxe_ds_List;
haxe_ds_List.__name__ = "haxe.ds.List";
haxe_ds_List.prototype = {
	h: null
	,q: null
	,length: null
	,add: function(item) {
		var x = new haxe_ds__$List_ListNode(item,null);
		if(this.h == null) {
			this.h = x;
		} else {
			this.q.next = x;
		}
		this.q = x;
		this.length++;
	}
	,push: function(item) {
		var x = new haxe_ds__$List_ListNode(item,this.h);
		this.h = x;
		if(this.q == null) {
			this.q = x;
		}
		this.length++;
	}
	,first: function() {
		if(this.h == null) {
			return null;
		} else {
			return this.h.item;
		}
	}
	,last: function() {
		if(this.q == null) {
			return null;
		} else {
			return this.q.item;
		}
	}
	,pop: function() {
		if(this.h == null) {
			return null;
		}
		var x = this.h.item;
		this.h = this.h.next;
		if(this.h == null) {
			this.q = null;
		}
		this.length--;
		return x;
	}
	,isEmpty: function() {
		return this.h == null;
	}
	,clear: function() {
		this.h = null;
		this.q = null;
		this.length = 0;
	}
	,remove: function(v) {
		var prev = null;
		var l = this.h;
		while(l != null) {
			if(l.item == v) {
				if(prev == null) {
					this.h = l.next;
				} else {
					prev.next = l.next;
				}
				if(this.q == l) {
					this.q = prev;
				}
				this.length--;
				return true;
			}
			prev = l;
			l = l.next;
		}
		return false;
	}
	,iterator: function() {
		return new haxe_ds__$List_ListIterator(this.h);
	}
	,keyValueIterator: function() {
		return new haxe_ds__$List_ListKeyValueIterator(this.h);
	}
	,toString: function() {
		var s_b = "";
		var first = true;
		var l = this.h;
		s_b += "{";
		while(l != null) {
			if(first) {
				first = false;
			} else {
				s_b += ", ";
			}
			s_b += Std.string(Std.string(l.item));
			l = l.next;
		}
		s_b += "}";
		return s_b;
	}
	,join: function(sep) {
		var s_b = "";
		var first = true;
		var l = this.h;
		while(l != null) {
			if(first) {
				first = false;
			} else {
				s_b += sep == null ? "null" : "" + sep;
			}
			s_b += Std.string(l.item);
			l = l.next;
		}
		return s_b;
	}
	,filter: function(f) {
		var l2 = new haxe_ds_List();
		var l = this.h;
		while(l != null) {
			var v = l.item;
			l = l.next;
			if(f(v)) {
				l2.add(v);
			}
		}
		return l2;
	}
	,map: function(f) {
		var b = new haxe_ds_List();
		var l = this.h;
		while(l != null) {
			var v = l.item;
			l = l.next;
			b.add(f(v));
		}
		return b;
	}
	,__class__: haxe_ds_List
};
var haxe_ds__$List_ListNode = function(item,next) {
	this.item = item;
	this.next = next;
};
$hxClasses["haxe.ds._List.ListNode"] = haxe_ds__$List_ListNode;
haxe_ds__$List_ListNode.__name__ = "haxe.ds._List.ListNode";
haxe_ds__$List_ListNode.prototype = {
	item: null
	,next: null
	,__class__: haxe_ds__$List_ListNode
};
var haxe_ds__$List_ListIterator = function(head) {
	this.head = head;
};
$hxClasses["haxe.ds._List.ListIterator"] = haxe_ds__$List_ListIterator;
haxe_ds__$List_ListIterator.__name__ = "haxe.ds._List.ListIterator";
haxe_ds__$List_ListIterator.prototype = {
	head: null
	,hasNext: function() {
		return this.head != null;
	}
	,next: function() {
		var val = this.head.item;
		this.head = this.head.next;
		return val;
	}
	,__class__: haxe_ds__$List_ListIterator
};
var haxe_ds__$List_ListKeyValueIterator = function(head) {
	this.head = head;
	this.idx = 0;
};
$hxClasses["haxe.ds._List.ListKeyValueIterator"] = haxe_ds__$List_ListKeyValueIterator;
haxe_ds__$List_ListKeyValueIterator.__name__ = "haxe.ds._List.ListKeyValueIterator";
haxe_ds__$List_ListKeyValueIterator.prototype = {
	idx: null
	,head: null
	,hasNext: function() {
		return this.head != null;
	}
	,next: function() {
		var val = this.head.item;
		this.head = this.head.next;
		return { value : val, key : this.idx++};
	}
	,__class__: haxe_ds__$List_ListKeyValueIterator
};
var haxe_ds_Map = {};
haxe_ds_Map.set = function(this1,key,value) {
	this1.set(key,value);
};
haxe_ds_Map.get = function(this1,key) {
	return this1.get(key);
};
haxe_ds_Map.exists = function(this1,key) {
	return this1.exists(key);
};
haxe_ds_Map.remove = function(this1,key) {
	return this1.remove(key);
};
haxe_ds_Map.keys = function(this1) {
	return this1.keys();
};
haxe_ds_Map.iterator = function(this1) {
	return this1.iterator();
};
haxe_ds_Map.keyValueIterator = function(this1) {
	return this1.keyValueIterator();
};
haxe_ds_Map.copy = function(this1) {
	return this1.copy();
};
haxe_ds_Map.toString = function(this1) {
	return this1.toString();
};
haxe_ds_Map.clear = function(this1) {
	this1.clear();
};
haxe_ds_Map.arrayWrite = function(this1,k,v) {
	this1.set(k,v);
	return v;
};
haxe_ds_Map.toStringMap = function(t) {
	return new haxe_ds_StringMap();
};
haxe_ds_Map.toIntMap = function(t) {
	return new haxe_ds_IntMap();
};
haxe_ds_Map.toEnumValueMapMap = function(t) {
	return new haxe_ds_EnumValueMap();
};
haxe_ds_Map.toObjectMap = function(t) {
	return new haxe_ds_ObjectMap();
};
haxe_ds_Map.fromStringMap = function(map) {
	return map;
};
haxe_ds_Map.fromIntMap = function(map) {
	return map;
};
haxe_ds_Map.fromObjectMap = function(map) {
	return map;
};
var haxe_ds_ObjectMap = function() {
	this.h = { __keys__ : { }};
};
$hxClasses["haxe.ds.ObjectMap"] = haxe_ds_ObjectMap;
haxe_ds_ObjectMap.__name__ = "haxe.ds.ObjectMap";
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
haxe_ds_ObjectMap.count = null;
haxe_ds_ObjectMap.assignId = function(obj) {
	return (obj.__id__ = $global.$haxeUID++);
};
haxe_ds_ObjectMap.getId = function(obj) {
	return obj.__id__;
};
haxe_ds_ObjectMap.prototype = {
	h: null
	,set: function(key,value) {
		var id = key.__id__;
		if(id == null) {
			id = (key.__id__ = $global.$haxeUID++);
		}
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,get: function(key) {
		return this.h[key.__id__];
	}
	,exists: function(key) {
		return this.h.__keys__[key.__id__] != null;
	}
	,remove: function(key) {
		var id = key.__id__;
		if(this.h.__keys__[id] == null) {
			return false;
		}
		delete(this.h[id]);
		delete(this.h.__keys__[id]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) {
			a.push(this.h.__keys__[key]);
		}
		}
		return new haxe_iterators_ArrayIterator(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i.__id__];
		}};
	}
	,keyValueIterator: function() {
		return new haxe_iterators_MapKeyValueIterator(this);
	}
	,copy: function() {
		var copied = new haxe_ds_ObjectMap();
		var key = this.keys();
		while(key.hasNext()) {
			var key1 = key.next();
			copied.set(key1,this.h[key1.__id__]);
		}
		return copied;
	}
	,toString: function() {
		var s_b = "";
		s_b += "{";
		var it = this.keys();
		var i = it;
		while(i.hasNext()) {
			var i1 = i.next();
			s_b += Std.string(Std.string(i1));
			s_b += " => ";
			s_b += Std.string(Std.string(this.h[i1.__id__]));
			if(it.hasNext()) {
				s_b += ", ";
			}
		}
		s_b += "}";
		return s_b;
	}
	,clear: function() {
		this.h = { __keys__ : { }};
	}
	,__class__: haxe_ds_ObjectMap
};
var haxe_ds_ReadOnlyArray = {};
haxe_ds_ReadOnlyArray.__properties__ = {get_length:"get_length"};
haxe_ds_ReadOnlyArray.get_length = function(this1) {
	return this1.length;
};
haxe_ds_ReadOnlyArray.get = function(this1,i) {
	return this1[i];
};
haxe_ds_ReadOnlyArray.concat = function(this1,a) {
	return this1.concat(a);
};
var haxe_ds_StringMap = function() {
	this.h = Object.create(null);
};
$hxClasses["haxe.ds.StringMap"] = haxe_ds_StringMap;
haxe_ds_StringMap.__name__ = "haxe.ds.StringMap";
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.createCopy = function(h) {
	var copy = new haxe_ds_StringMap();
	for (var key in h) copy.h[key] = h[key];
	return copy;
};
haxe_ds_StringMap.stringify = function(h) {
	var s = "{";
	var first = true;
	for (var key in h) {
		if (first) first = false; else s += ',';
		s += key + ' => ' + Std.string(h[key]);
	}
	return s + "}";
};
haxe_ds_StringMap.prototype = {
	h: null
	,exists: function(key) {
		return Object.prototype.hasOwnProperty.call(this.h,key);
	}
	,get: function(key) {
		return this.h[key];
	}
	,set: function(key,value) {
		this.h[key] = value;
	}
	,remove: function(key) {
		if(Object.prototype.hasOwnProperty.call(this.h,key)) {
			delete(this.h[key]);
			return true;
		} else {
			return false;
		}
	}
	,keys: function() {
		return new haxe_ds__$StringMap_StringMapKeyIterator(this.h);
	}
	,iterator: function() {
		return new haxe_ds__$StringMap_StringMapValueIterator(this.h);
	}
	,keyValueIterator: function() {
		return new haxe_ds__$StringMap_StringMapKeyValueIterator(this.h);
	}
	,copy: function() {
		return haxe_ds_StringMap.createCopy(this.h);
	}
	,clear: function() {
		this.h = Object.create(null);
	}
	,toString: function() {
		return haxe_ds_StringMap.stringify(this.h);
	}
	,__class__: haxe_ds_StringMap
};
var haxe_ds__$StringMap_StringMapKeyIterator = function(h) {
	this.h = h;
	this.keys = Object.keys(h);
	this.length = this.keys.length;
	this.current = 0;
};
$hxClasses["haxe.ds._StringMap.StringMapKeyIterator"] = haxe_ds__$StringMap_StringMapKeyIterator;
haxe_ds__$StringMap_StringMapKeyIterator.__name__ = "haxe.ds._StringMap.StringMapKeyIterator";
haxe_ds__$StringMap_StringMapKeyIterator.prototype = {
	h: null
	,keys: null
	,length: null
	,current: null
	,hasNext: function() {
		return this.current < this.length;
	}
	,next: function() {
		return this.keys[this.current++];
	}
	,__class__: haxe_ds__$StringMap_StringMapKeyIterator
};
var haxe_ds__$StringMap_StringMapValueIterator = function(h) {
	this.h = h;
	this.keys = Object.keys(h);
	this.length = this.keys.length;
	this.current = 0;
};
$hxClasses["haxe.ds._StringMap.StringMapValueIterator"] = haxe_ds__$StringMap_StringMapValueIterator;
haxe_ds__$StringMap_StringMapValueIterator.__name__ = "haxe.ds._StringMap.StringMapValueIterator";
haxe_ds__$StringMap_StringMapValueIterator.prototype = {
	h: null
	,keys: null
	,length: null
	,current: null
	,hasNext: function() {
		return this.current < this.length;
	}
	,next: function() {
		return this.h[this.keys[this.current++]];
	}
	,__class__: haxe_ds__$StringMap_StringMapValueIterator
};
var haxe_ds__$StringMap_StringMapKeyValueIterator = function(h) {
	this.h = h;
	this.keys = Object.keys(h);
	this.length = this.keys.length;
	this.current = 0;
};
$hxClasses["haxe.ds._StringMap.StringMapKeyValueIterator"] = haxe_ds__$StringMap_StringMapKeyValueIterator;
haxe_ds__$StringMap_StringMapKeyValueIterator.__name__ = "haxe.ds._StringMap.StringMapKeyValueIterator";
haxe_ds__$StringMap_StringMapKeyValueIterator.prototype = {
	h: null
	,keys: null
	,length: null
	,current: null
	,hasNext: function() {
		return this.current < this.length;
	}
	,next: function() {
		var key = this.keys[this.current++];
		return { key : key, value : this.h[key]};
	}
	,__class__: haxe_ds__$StringMap_StringMapKeyValueIterator
};
var haxe_ds_WeakMap = function() {
	throw new haxe_exceptions_NotImplementedException("Not implemented for this platform",null,{ fileName : "haxe/ds/WeakMap.hx", lineNumber : 39, className : "haxe.ds.WeakMap", methodName : "new"});
};
$hxClasses["haxe.ds.WeakMap"] = haxe_ds_WeakMap;
haxe_ds_WeakMap.__name__ = "haxe.ds.WeakMap";
haxe_ds_WeakMap.__interfaces__ = [haxe_IMap];
haxe_ds_WeakMap.prototype = {
	set: function(key,value) {
	}
	,get: function(key) {
		return null;
	}
	,exists: function(key) {
		return false;
	}
	,remove: function(key) {
		return false;
	}
	,keys: function() {
		return null;
	}
	,iterator: function() {
		return null;
	}
	,keyValueIterator: function() {
		return null;
	}
	,copy: function() {
		return null;
	}
	,toString: function() {
		return null;
	}
	,clear: function() {
	}
	,__class__: haxe_ds_WeakMap
};
var haxe_exceptions_PosException = function(message,previous,pos) {
	haxe_Exception.call(this,message,previous);
	if(pos == null) {
		this.posInfos = { fileName : "(unknown)", lineNumber : 0, className : "(unknown)", methodName : "(unknown)"};
	} else {
		this.posInfos = pos;
	}
	this.__skipStack++;
};
$hxClasses["haxe.exceptions.PosException"] = haxe_exceptions_PosException;
haxe_exceptions_PosException.__name__ = "haxe.exceptions.PosException";
haxe_exceptions_PosException.__super__ = haxe_Exception;
haxe_exceptions_PosException.prototype = $extend(haxe_Exception.prototype,{
	posInfos: null
	,toString: function() {
		return "" + haxe_Exception.prototype.toString.call(this) + " in " + this.posInfos.className + "." + this.posInfos.methodName + " at " + this.posInfos.fileName + ":" + this.posInfos.lineNumber;
	}
	,__class__: haxe_exceptions_PosException
});
var haxe_exceptions_NotImplementedException = function(message,previous,pos) {
	if(message == null) {
		message = "Not implemented";
	}
	haxe_exceptions_PosException.call(this,message,previous,pos);
	this.__skipStack++;
};
$hxClasses["haxe.exceptions.NotImplementedException"] = haxe_exceptions_NotImplementedException;
haxe_exceptions_NotImplementedException.__name__ = "haxe.exceptions.NotImplementedException";
haxe_exceptions_NotImplementedException.__super__ = haxe_exceptions_PosException;
haxe_exceptions_NotImplementedException.prototype = $extend(haxe_exceptions_PosException.prototype,{
	__class__: haxe_exceptions_NotImplementedException
});
var haxe_iterators_ArrayIterator = function(array) {
	this.current = 0;
	this.array = array;
};
$hxClasses["haxe.iterators.ArrayIterator"] = haxe_iterators_ArrayIterator;
haxe_iterators_ArrayIterator.__name__ = "haxe.iterators.ArrayIterator";
haxe_iterators_ArrayIterator.prototype = {
	array: null
	,current: null
	,hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return this.array[this.current++];
	}
	,__class__: haxe_iterators_ArrayIterator
};
var haxe_iterators_ArrayKeyValueIterator = function(array) {
	this.current = 0;
	this.array = array;
};
$hxClasses["haxe.iterators.ArrayKeyValueIterator"] = haxe_iterators_ArrayKeyValueIterator;
haxe_iterators_ArrayKeyValueIterator.__name__ = "haxe.iterators.ArrayKeyValueIterator";
haxe_iterators_ArrayKeyValueIterator.prototype = {
	current: null
	,array: null
	,hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return { value : this.array[this.current], key : this.current++};
	}
	,__class__: haxe_iterators_ArrayKeyValueIterator
};
var haxe_iterators_DynamicAccessIterator = function(access) {
	this.access = access;
	this.keys = Reflect.fields(access);
	this.index = 0;
};
$hxClasses["haxe.iterators.DynamicAccessIterator"] = haxe_iterators_DynamicAccessIterator;
haxe_iterators_DynamicAccessIterator.__name__ = "haxe.iterators.DynamicAccessIterator";
haxe_iterators_DynamicAccessIterator.prototype = {
	access: null
	,keys: null
	,index: null
	,hasNext: function() {
		return this.index < this.keys.length;
	}
	,next: function() {
		return this.access[this.keys[this.index++]];
	}
	,__class__: haxe_iterators_DynamicAccessIterator
};
var haxe_iterators_DynamicAccessKeyValueIterator = function(access) {
	this.access = access;
	this.keys = Reflect.fields(access);
	this.index = 0;
};
$hxClasses["haxe.iterators.DynamicAccessKeyValueIterator"] = haxe_iterators_DynamicAccessKeyValueIterator;
haxe_iterators_DynamicAccessKeyValueIterator.__name__ = "haxe.iterators.DynamicAccessKeyValueIterator";
haxe_iterators_DynamicAccessKeyValueIterator.prototype = {
	access: null
	,keys: null
	,index: null
	,hasNext: function() {
		return this.index < this.keys.length;
	}
	,next: function() {
		var key = this.keys[this.index++];
		return { value : this.access[key], key : key};
	}
	,__class__: haxe_iterators_DynamicAccessKeyValueIterator
};
var haxe_iterators_HashMapKeyValueIterator = function(map) {
	this.map = map;
	this.keys = map.keys.iterator();
};
$hxClasses["haxe.iterators.HashMapKeyValueIterator"] = haxe_iterators_HashMapKeyValueIterator;
haxe_iterators_HashMapKeyValueIterator.__name__ = "haxe.iterators.HashMapKeyValueIterator";
haxe_iterators_HashMapKeyValueIterator.prototype = {
	map: null
	,keys: null
	,hasNext: function() {
		return this.keys.hasNext();
	}
	,next: function() {
		var key = this.keys.next();
		var _this = this.map.values;
		var key1 = key.hashCode();
		return { value : _this.h[key1], key : key};
	}
	,__class__: haxe_iterators_HashMapKeyValueIterator
};
var haxe_iterators_MapKeyValueIterator = function(map) {
	this.map = map;
	this.keys = map.keys();
};
$hxClasses["haxe.iterators.MapKeyValueIterator"] = haxe_iterators_MapKeyValueIterator;
haxe_iterators_MapKeyValueIterator.__name__ = "haxe.iterators.MapKeyValueIterator";
haxe_iterators_MapKeyValueIterator.prototype = {
	map: null
	,keys: null
	,hasNext: function() {
		return this.keys.hasNext();
	}
	,next: function() {
		var key = this.keys.next();
		return { value : this.map.get(key), key : key};
	}
	,__class__: haxe_iterators_MapKeyValueIterator
};
var haxe_iterators_RestIterator = function(args) {
	this.current = 0;
	this.args = args;
};
$hxClasses["haxe.iterators.RestIterator"] = haxe_iterators_RestIterator;
haxe_iterators_RestIterator.__name__ = "haxe.iterators.RestIterator";
haxe_iterators_RestIterator.prototype = {
	args: null
	,current: null
	,hasNext: function() {
		return this.current < this.args.length;
	}
	,next: function() {
		return this.args[this.current++];
	}
	,__class__: haxe_iterators_RestIterator
};
var haxe_iterators_RestKeyValueIterator = function(args) {
	this.current = 0;
	this.args = args;
};
$hxClasses["haxe.iterators.RestKeyValueIterator"] = haxe_iterators_RestKeyValueIterator;
haxe_iterators_RestKeyValueIterator.__name__ = "haxe.iterators.RestKeyValueIterator";
haxe_iterators_RestKeyValueIterator.prototype = {
	args: null
	,current: null
	,hasNext: function() {
		return this.current < this.args.length;
	}
	,next: function() {
		return { key : this.current, value : this.args[this.current++]};
	}
	,__class__: haxe_iterators_RestKeyValueIterator
};
var haxe_iterators_StringIterator = function(s) {
	this.offset = 0;
	this.s = s;
};
$hxClasses["haxe.iterators.StringIterator"] = haxe_iterators_StringIterator;
haxe_iterators_StringIterator.__name__ = "haxe.iterators.StringIterator";
haxe_iterators_StringIterator.prototype = {
	offset: null
	,s: null
	,hasNext: function() {
		return this.offset < this.s.length;
	}
	,next: function() {
		return this.s.charCodeAt(this.offset++);
	}
	,__class__: haxe_iterators_StringIterator
};
var haxe_iterators_StringIteratorUnicode = function(s) {
	this.offset = 0;
	this.s = s;
};
$hxClasses["haxe.iterators.StringIteratorUnicode"] = haxe_iterators_StringIteratorUnicode;
haxe_iterators_StringIteratorUnicode.__name__ = "haxe.iterators.StringIteratorUnicode";
haxe_iterators_StringIteratorUnicode.unicodeIterator = function(s) {
	return new haxe_iterators_StringIteratorUnicode(s);
};
haxe_iterators_StringIteratorUnicode.prototype = {
	offset: null
	,s: null
	,hasNext: function() {
		return this.offset < this.s.length;
	}
	,next: function() {
		var s = this.s;
		var index = this.offset++;
		var c = s.charCodeAt(index);
		if(c >= 55296 && c <= 56319) {
			c = c - 55232 << 10 | s.charCodeAt(index + 1) & 1023;
		}
		var c1 = c;
		if(c1 >= 65536) {
			this.offset++;
		}
		return c1;
	}
	,__class__: haxe_iterators_StringIteratorUnicode
};
var haxe_iterators_StringKeyValueIterator = function(s) {
	this.offset = 0;
	this.s = s;
};
$hxClasses["haxe.iterators.StringKeyValueIterator"] = haxe_iterators_StringKeyValueIterator;
haxe_iterators_StringKeyValueIterator.__name__ = "haxe.iterators.StringKeyValueIterator";
haxe_iterators_StringKeyValueIterator.prototype = {
	offset: null
	,s: null
	,hasNext: function() {
		return this.offset < this.s.length;
	}
	,next: function() {
		return { key : this.offset, value : this.s.charCodeAt(this.offset++)};
	}
	,__class__: haxe_iterators_StringKeyValueIterator
};
var hscript_Const = $hxEnums["hscript.Const"] = { __ename__:"hscript.Const",__constructs__:null
	,CInt: ($_=function(v) { return {_hx_index:0,v:v,__enum__:"hscript.Const",toString:$estr}; },$_._hx_name="CInt",$_.__params__ = ["v"],$_)
	,CFloat: ($_=function(f) { return {_hx_index:1,f:f,__enum__:"hscript.Const",toString:$estr}; },$_._hx_name="CFloat",$_.__params__ = ["f"],$_)
	,CString: ($_=function(s) { return {_hx_index:2,s:s,__enum__:"hscript.Const",toString:$estr}; },$_._hx_name="CString",$_.__params__ = ["s"],$_)
};
hscript_Const.__constructs__ = [hscript_Const.CInt,hscript_Const.CFloat,hscript_Const.CString];
hscript_Const.__empty_constructs__ = [];
var hscript_ExprDef = $hxEnums["hscript.ExprDef"] = { __ename__:"hscript.ExprDef",__constructs__:null
	,EConst: ($_=function(c) { return {_hx_index:0,c:c,__enum__:"hscript.ExprDef",toString:$estr}; },$_._hx_name="EConst",$_.__params__ = ["c"],$_)
	,EIdent: ($_=function(v) { return {_hx_index:1,v:v,__enum__:"hscript.ExprDef",toString:$estr}; },$_._hx_name="EIdent",$_.__params__ = ["v"],$_)
	,EVar: ($_=function(n,t,e) { return {_hx_index:2,n:n,t:t,e:e,__enum__:"hscript.ExprDef",toString:$estr}; },$_._hx_name="EVar",$_.__params__ = ["n","t","e"],$_)
	,EParent: ($_=function(e) { return {_hx_index:3,e:e,__enum__:"hscript.ExprDef",toString:$estr}; },$_._hx_name="EParent",$_.__params__ = ["e"],$_)
	,EBlock: ($_=function(e) { return {_hx_index:4,e:e,__enum__:"hscript.ExprDef",toString:$estr}; },$_._hx_name="EBlock",$_.__params__ = ["e"],$_)
	,EField: ($_=function(e,f) { return {_hx_index:5,e:e,f:f,__enum__:"hscript.ExprDef",toString:$estr}; },$_._hx_name="EField",$_.__params__ = ["e","f"],$_)
	,EBinop: ($_=function(op,e1,e2) { return {_hx_index:6,op:op,e1:e1,e2:e2,__enum__:"hscript.ExprDef",toString:$estr}; },$_._hx_name="EBinop",$_.__params__ = ["op","e1","e2"],$_)
	,EUnop: ($_=function(op,prefix,e) { return {_hx_index:7,op:op,prefix:prefix,e:e,__enum__:"hscript.ExprDef",toString:$estr}; },$_._hx_name="EUnop",$_.__params__ = ["op","prefix","e"],$_)
	,ECall: ($_=function(e,params) { return {_hx_index:8,e:e,params:params,__enum__:"hscript.ExprDef",toString:$estr}; },$_._hx_name="ECall",$_.__params__ = ["e","params"],$_)
	,EIf: ($_=function(cond,e1,e2) { return {_hx_index:9,cond:cond,e1:e1,e2:e2,__enum__:"hscript.ExprDef",toString:$estr}; },$_._hx_name="EIf",$_.__params__ = ["cond","e1","e2"],$_)
	,EWhile: ($_=function(cond,e) { return {_hx_index:10,cond:cond,e:e,__enum__:"hscript.ExprDef",toString:$estr}; },$_._hx_name="EWhile",$_.__params__ = ["cond","e"],$_)
	,EFor: ($_=function(v,it,e) { return {_hx_index:11,v:v,it:it,e:e,__enum__:"hscript.ExprDef",toString:$estr}; },$_._hx_name="EFor",$_.__params__ = ["v","it","e"],$_)
	,EBreak: {_hx_name:"EBreak",_hx_index:12,__enum__:"hscript.ExprDef",toString:$estr}
	,EContinue: {_hx_name:"EContinue",_hx_index:13,__enum__:"hscript.ExprDef",toString:$estr}
	,EFunction: ($_=function(args,e,name,ret) { return {_hx_index:14,args:args,e:e,name:name,ret:ret,__enum__:"hscript.ExprDef",toString:$estr}; },$_._hx_name="EFunction",$_.__params__ = ["args","e","name","ret"],$_)
	,EReturn: ($_=function(e) { return {_hx_index:15,e:e,__enum__:"hscript.ExprDef",toString:$estr}; },$_._hx_name="EReturn",$_.__params__ = ["e"],$_)
	,EArray: ($_=function(e,index) { return {_hx_index:16,e:e,index:index,__enum__:"hscript.ExprDef",toString:$estr}; },$_._hx_name="EArray",$_.__params__ = ["e","index"],$_)
	,EArrayDecl: ($_=function(e) { return {_hx_index:17,e:e,__enum__:"hscript.ExprDef",toString:$estr}; },$_._hx_name="EArrayDecl",$_.__params__ = ["e"],$_)
	,ENew: ($_=function(cl,params) { return {_hx_index:18,cl:cl,params:params,__enum__:"hscript.ExprDef",toString:$estr}; },$_._hx_name="ENew",$_.__params__ = ["cl","params"],$_)
	,EThrow: ($_=function(e) { return {_hx_index:19,e:e,__enum__:"hscript.ExprDef",toString:$estr}; },$_._hx_name="EThrow",$_.__params__ = ["e"],$_)
	,ETry: ($_=function(e,v,t,ecatch) { return {_hx_index:20,e:e,v:v,t:t,ecatch:ecatch,__enum__:"hscript.ExprDef",toString:$estr}; },$_._hx_name="ETry",$_.__params__ = ["e","v","t","ecatch"],$_)
	,EObject: ($_=function(fl) { return {_hx_index:21,fl:fl,__enum__:"hscript.ExprDef",toString:$estr}; },$_._hx_name="EObject",$_.__params__ = ["fl"],$_)
	,ETernary: ($_=function(cond,e1,e2) { return {_hx_index:22,cond:cond,e1:e1,e2:e2,__enum__:"hscript.ExprDef",toString:$estr}; },$_._hx_name="ETernary",$_.__params__ = ["cond","e1","e2"],$_)
	,ESwitch: ($_=function(e,cases,defaultExpr) { return {_hx_index:23,e:e,cases:cases,defaultExpr:defaultExpr,__enum__:"hscript.ExprDef",toString:$estr}; },$_._hx_name="ESwitch",$_.__params__ = ["e","cases","defaultExpr"],$_)
	,EDoWhile: ($_=function(cond,e) { return {_hx_index:24,cond:cond,e:e,__enum__:"hscript.ExprDef",toString:$estr}; },$_._hx_name="EDoWhile",$_.__params__ = ["cond","e"],$_)
	,EMeta: ($_=function(name,args,e) { return {_hx_index:25,name:name,args:args,e:e,__enum__:"hscript.ExprDef",toString:$estr}; },$_._hx_name="EMeta",$_.__params__ = ["name","args","e"],$_)
	,ECheckType: ($_=function(e,t) { return {_hx_index:26,e:e,t:t,__enum__:"hscript.ExprDef",toString:$estr}; },$_._hx_name="ECheckType",$_.__params__ = ["e","t"],$_)
};
hscript_ExprDef.__constructs__ = [hscript_ExprDef.EConst,hscript_ExprDef.EIdent,hscript_ExprDef.EVar,hscript_ExprDef.EParent,hscript_ExprDef.EBlock,hscript_ExprDef.EField,hscript_ExprDef.EBinop,hscript_ExprDef.EUnop,hscript_ExprDef.ECall,hscript_ExprDef.EIf,hscript_ExprDef.EWhile,hscript_ExprDef.EFor,hscript_ExprDef.EBreak,hscript_ExprDef.EContinue,hscript_ExprDef.EFunction,hscript_ExprDef.EReturn,hscript_ExprDef.EArray,hscript_ExprDef.EArrayDecl,hscript_ExprDef.ENew,hscript_ExprDef.EThrow,hscript_ExprDef.ETry,hscript_ExprDef.EObject,hscript_ExprDef.ETernary,hscript_ExprDef.ESwitch,hscript_ExprDef.EDoWhile,hscript_ExprDef.EMeta,hscript_ExprDef.ECheckType];
hscript_ExprDef.__empty_constructs__ = [hscript_ExprDef.EBreak,hscript_ExprDef.EContinue];
var hscript_CType = $hxEnums["hscript.CType"] = { __ename__:"hscript.CType",__constructs__:null
	,CTPath: ($_=function(path,params) { return {_hx_index:0,path:path,params:params,__enum__:"hscript.CType",toString:$estr}; },$_._hx_name="CTPath",$_.__params__ = ["path","params"],$_)
	,CTFun: ($_=function(args,ret) { return {_hx_index:1,args:args,ret:ret,__enum__:"hscript.CType",toString:$estr}; },$_._hx_name="CTFun",$_.__params__ = ["args","ret"],$_)
	,CTAnon: ($_=function(fields) { return {_hx_index:2,fields:fields,__enum__:"hscript.CType",toString:$estr}; },$_._hx_name="CTAnon",$_.__params__ = ["fields"],$_)
	,CTParent: ($_=function(t) { return {_hx_index:3,t:t,__enum__:"hscript.CType",toString:$estr}; },$_._hx_name="CTParent",$_.__params__ = ["t"],$_)
	,CTOpt: ($_=function(t) { return {_hx_index:4,t:t,__enum__:"hscript.CType",toString:$estr}; },$_._hx_name="CTOpt",$_.__params__ = ["t"],$_)
	,CTNamed: ($_=function(n,t) { return {_hx_index:5,n:n,t:t,__enum__:"hscript.CType",toString:$estr}; },$_._hx_name="CTNamed",$_.__params__ = ["n","t"],$_)
};
hscript_CType.__constructs__ = [hscript_CType.CTPath,hscript_CType.CTFun,hscript_CType.CTAnon,hscript_CType.CTParent,hscript_CType.CTOpt,hscript_CType.CTNamed];
hscript_CType.__empty_constructs__ = [];
var hscript_Error = function(e,pmin,pmax,origin,line) {
	this.e = e;
	this.pmin = pmin;
	this.pmax = pmax;
	this.origin = origin;
	this.line = line;
};
$hxClasses["hscript.Error"] = hscript_Error;
hscript_Error.__name__ = "hscript.Error";
hscript_Error.prototype = {
	e: null
	,pmin: null
	,pmax: null
	,origin: null
	,line: null
	,toString: function() {
		return hscript_Printer.errorToString(this);
	}
	,__class__: hscript_Error
};
var hscript_ErrorDef = $hxEnums["hscript.ErrorDef"] = { __ename__:"hscript.ErrorDef",__constructs__:null
	,EInvalidChar: ($_=function(c) { return {_hx_index:0,c:c,__enum__:"hscript.ErrorDef",toString:$estr}; },$_._hx_name="EInvalidChar",$_.__params__ = ["c"],$_)
	,EUnexpected: ($_=function(s) { return {_hx_index:1,s:s,__enum__:"hscript.ErrorDef",toString:$estr}; },$_._hx_name="EUnexpected",$_.__params__ = ["s"],$_)
	,EUnterminatedString: {_hx_name:"EUnterminatedString",_hx_index:2,__enum__:"hscript.ErrorDef",toString:$estr}
	,EUnterminatedComment: {_hx_name:"EUnterminatedComment",_hx_index:3,__enum__:"hscript.ErrorDef",toString:$estr}
	,EInvalidPreprocessor: ($_=function(msg) { return {_hx_index:4,msg:msg,__enum__:"hscript.ErrorDef",toString:$estr}; },$_._hx_name="EInvalidPreprocessor",$_.__params__ = ["msg"],$_)
	,EUnknownVariable: ($_=function(v) { return {_hx_index:5,v:v,__enum__:"hscript.ErrorDef",toString:$estr}; },$_._hx_name="EUnknownVariable",$_.__params__ = ["v"],$_)
	,EInvalidIterator: ($_=function(v) { return {_hx_index:6,v:v,__enum__:"hscript.ErrorDef",toString:$estr}; },$_._hx_name="EInvalidIterator",$_.__params__ = ["v"],$_)
	,EInvalidOp: ($_=function(op) { return {_hx_index:7,op:op,__enum__:"hscript.ErrorDef",toString:$estr}; },$_._hx_name="EInvalidOp",$_.__params__ = ["op"],$_)
	,EInvalidAccess: ($_=function(f) { return {_hx_index:8,f:f,__enum__:"hscript.ErrorDef",toString:$estr}; },$_._hx_name="EInvalidAccess",$_.__params__ = ["f"],$_)
	,ECustom: ($_=function(msg) { return {_hx_index:9,msg:msg,__enum__:"hscript.ErrorDef",toString:$estr}; },$_._hx_name="ECustom",$_.__params__ = ["msg"],$_)
};
hscript_ErrorDef.__constructs__ = [hscript_ErrorDef.EInvalidChar,hscript_ErrorDef.EUnexpected,hscript_ErrorDef.EUnterminatedString,hscript_ErrorDef.EUnterminatedComment,hscript_ErrorDef.EInvalidPreprocessor,hscript_ErrorDef.EUnknownVariable,hscript_ErrorDef.EInvalidIterator,hscript_ErrorDef.EInvalidOp,hscript_ErrorDef.EInvalidAccess,hscript_ErrorDef.ECustom];
hscript_ErrorDef.__empty_constructs__ = [hscript_ErrorDef.EUnterminatedString,hscript_ErrorDef.EUnterminatedComment];
var hscript_ModuleDecl = $hxEnums["hscript.ModuleDecl"] = { __ename__:"hscript.ModuleDecl",__constructs__:null
	,DPackage: ($_=function(path) { return {_hx_index:0,path:path,__enum__:"hscript.ModuleDecl",toString:$estr}; },$_._hx_name="DPackage",$_.__params__ = ["path"],$_)
	,DImport: ($_=function(path,everything) { return {_hx_index:1,path:path,everything:everything,__enum__:"hscript.ModuleDecl",toString:$estr}; },$_._hx_name="DImport",$_.__params__ = ["path","everything"],$_)
	,DClass: ($_=function(c) { return {_hx_index:2,c:c,__enum__:"hscript.ModuleDecl",toString:$estr}; },$_._hx_name="DClass",$_.__params__ = ["c"],$_)
	,DTypedef: ($_=function(c) { return {_hx_index:3,c:c,__enum__:"hscript.ModuleDecl",toString:$estr}; },$_._hx_name="DTypedef",$_.__params__ = ["c"],$_)
};
hscript_ModuleDecl.__constructs__ = [hscript_ModuleDecl.DPackage,hscript_ModuleDecl.DImport,hscript_ModuleDecl.DClass,hscript_ModuleDecl.DTypedef];
hscript_ModuleDecl.__empty_constructs__ = [];
var hscript_FieldAccess = $hxEnums["hscript.FieldAccess"] = { __ename__:"hscript.FieldAccess",__constructs__:null
	,APublic: {_hx_name:"APublic",_hx_index:0,__enum__:"hscript.FieldAccess",toString:$estr}
	,APrivate: {_hx_name:"APrivate",_hx_index:1,__enum__:"hscript.FieldAccess",toString:$estr}
	,AInline: {_hx_name:"AInline",_hx_index:2,__enum__:"hscript.FieldAccess",toString:$estr}
	,AOverride: {_hx_name:"AOverride",_hx_index:3,__enum__:"hscript.FieldAccess",toString:$estr}
	,AStatic: {_hx_name:"AStatic",_hx_index:4,__enum__:"hscript.FieldAccess",toString:$estr}
	,AMacro: {_hx_name:"AMacro",_hx_index:5,__enum__:"hscript.FieldAccess",toString:$estr}
};
hscript_FieldAccess.__constructs__ = [hscript_FieldAccess.APublic,hscript_FieldAccess.APrivate,hscript_FieldAccess.AInline,hscript_FieldAccess.AOverride,hscript_FieldAccess.AStatic,hscript_FieldAccess.AMacro];
hscript_FieldAccess.__empty_constructs__ = [hscript_FieldAccess.APublic,hscript_FieldAccess.APrivate,hscript_FieldAccess.AInline,hscript_FieldAccess.AOverride,hscript_FieldAccess.AStatic,hscript_FieldAccess.AMacro];
var hscript_FieldKind = $hxEnums["hscript.FieldKind"] = { __ename__:"hscript.FieldKind",__constructs__:null
	,KFunction: ($_=function(f) { return {_hx_index:0,f:f,__enum__:"hscript.FieldKind",toString:$estr}; },$_._hx_name="KFunction",$_.__params__ = ["f"],$_)
	,KVar: ($_=function(v) { return {_hx_index:1,v:v,__enum__:"hscript.FieldKind",toString:$estr}; },$_._hx_name="KVar",$_.__params__ = ["v"],$_)
};
hscript_FieldKind.__constructs__ = [hscript_FieldKind.KFunction,hscript_FieldKind.KVar];
hscript_FieldKind.__empty_constructs__ = [];
var hscript__$Interp_Stop = $hxEnums["hscript._Interp.Stop"] = { __ename__:"hscript._Interp.Stop",__constructs__:null
	,SBreak: {_hx_name:"SBreak",_hx_index:0,__enum__:"hscript._Interp.Stop",toString:$estr}
	,SContinue: {_hx_name:"SContinue",_hx_index:1,__enum__:"hscript._Interp.Stop",toString:$estr}
	,SReturn: {_hx_name:"SReturn",_hx_index:2,__enum__:"hscript._Interp.Stop",toString:$estr}
};
hscript__$Interp_Stop.__constructs__ = [hscript__$Interp_Stop.SBreak,hscript__$Interp_Stop.SContinue,hscript__$Interp_Stop.SReturn];
hscript__$Interp_Stop.__empty_constructs__ = [hscript__$Interp_Stop.SBreak,hscript__$Interp_Stop.SContinue,hscript__$Interp_Stop.SReturn];
var hscript_Interp = function() {
	this.locals = new haxe_ds_StringMap();
	this.declared = [];
	this.resetVariables();
	this.initOps();
};
$hxClasses["hscript.Interp"] = hscript_Interp;
hscript_Interp.__name__ = "hscript.Interp";
hscript_Interp.prototype = {
	variables: null
	,locals: null
	,binops: null
	,depth: null
	,inTry: null
	,declared: null
	,returnValue: null
	,curExpr: null
	,resetVariables: function() {
		var _gthis = this;
		this.variables = new haxe_ds_StringMap();
		this.variables.h["null"] = null;
		this.variables.h["true"] = true;
		this.variables.h["false"] = false;
		var this1 = this.variables;
		var value = Reflect.makeVarArgs(function(el) {
			var inf = _gthis.posInfos();
			var v = el.shift();
			if(el.length > 0) {
				inf.customParams = el;
			}
			haxe_Log.trace(Std.string(v),inf);
		});
		this1.h["trace"] = value;
	}
	,posInfos: function() {
		if(this.curExpr != null) {
			return { fileName : this.curExpr.origin, lineNumber : this.curExpr.line};
		}
		return { fileName : "hscript", lineNumber : 0};
	}
	,initOps: function() {
		var me = this;
		this.binops = new haxe_ds_StringMap();
		this.binops.h["+"] = function(e1,e2) {
			return me.expr(e1) + me.expr(e2);
		};
		this.binops.h["-"] = function(e1,e2) {
			return me.expr(e1) - me.expr(e2);
		};
		this.binops.h["*"] = function(e1,e2) {
			return me.expr(e1) * me.expr(e2);
		};
		this.binops.h["/"] = function(e1,e2) {
			return me.expr(e1) / me.expr(e2);
		};
		this.binops.h["%"] = function(e1,e2) {
			return me.expr(e1) % me.expr(e2);
		};
		this.binops.h["&"] = function(e1,e2) {
			return me.expr(e1) & me.expr(e2);
		};
		this.binops.h["|"] = function(e1,e2) {
			return me.expr(e1) | me.expr(e2);
		};
		this.binops.h["^"] = function(e1,e2) {
			return me.expr(e1) ^ me.expr(e2);
		};
		this.binops.h["<<"] = function(e1,e2) {
			return me.expr(e1) << me.expr(e2);
		};
		this.binops.h[">>"] = function(e1,e2) {
			return me.expr(e1) >> me.expr(e2);
		};
		this.binops.h[">>>"] = function(e1,e2) {
			return me.expr(e1) >>> me.expr(e2);
		};
		this.binops.h["=="] = function(e1,e2) {
			return me.expr(e1) == me.expr(e2);
		};
		this.binops.h["!="] = function(e1,e2) {
			return me.expr(e1) != me.expr(e2);
		};
		this.binops.h[">="] = function(e1,e2) {
			return me.expr(e1) >= me.expr(e2);
		};
		this.binops.h["<="] = function(e1,e2) {
			return me.expr(e1) <= me.expr(e2);
		};
		this.binops.h[">"] = function(e1,e2) {
			return me.expr(e1) > me.expr(e2);
		};
		this.binops.h["<"] = function(e1,e2) {
			return me.expr(e1) < me.expr(e2);
		};
		this.binops.h["||"] = function(e1,e2) {
			if(me.expr(e1) != true) {
				return me.expr(e2) == true;
			} else {
				return true;
			}
		};
		this.binops.h["&&"] = function(e1,e2) {
			if(me.expr(e1) == true) {
				return me.expr(e2) == true;
			} else {
				return false;
			}
		};
		this.binops.h["="] = $bind(this,this.assign);
		this.binops.h["..."] = function(e1,e2) {
			return new IntIterator(me.expr(e1),me.expr(e2));
		};
		this.assignOp("+=",function(v1,v2) {
			return v1 + v2;
		});
		this.assignOp("-=",function(v1,v2) {
			return v1 - v2;
		});
		this.assignOp("*=",function(v1,v2) {
			return v1 * v2;
		});
		this.assignOp("/=",function(v1,v2) {
			return v1 / v2;
		});
		this.assignOp("%=",function(v1,v2) {
			return v1 % v2;
		});
		this.assignOp("&=",function(v1,v2) {
			return v1 & v2;
		});
		this.assignOp("|=",function(v1,v2) {
			return v1 | v2;
		});
		this.assignOp("^=",function(v1,v2) {
			return v1 ^ v2;
		});
		this.assignOp("<<=",function(v1,v2) {
			return v1 << v2;
		});
		this.assignOp(">>=",function(v1,v2) {
			return v1 >> v2;
		});
		this.assignOp(">>>=",function(v1,v2) {
			return v1 >>> v2;
		});
	}
	,assign: function(e1,e2) {
		var v = this.expr(e2);
		var _g = e1.e;
		switch(_g._hx_index) {
		case 1:
			var id = _g.v;
			var l = this.locals.h[id];
			if(l == null) {
				this.variables.h[id] = v;
			} else {
				l.r = v;
			}
			break;
		case 5:
			var e = _g.e;
			var f = _g.f;
			v = this.set(this.expr(e),f,v);
			break;
		case 16:
			var e = _g.e;
			var index = _g.index;
			var arr = this.expr(e);
			var index1 = this.expr(index);
			if(js_Boot.__implements(arr,haxe_IMap)) {
				(js_Boot.__cast(arr , haxe_IMap)).set(index1,v);
			} else {
				arr[index1] = v;
			}
			break;
		default:
			var e = new hscript_Error(hscript_ErrorDef.EInvalidOp("="),this.curExpr.pmin,this.curExpr.pmax,this.curExpr.origin,this.curExpr.line);
			throw haxe_Exception.thrown(e);
		}
		return v;
	}
	,assignOp: function(op,fop) {
		var me = this;
		this.binops.h[op] = function(e1,e2) {
			return me.evalAssignOp(op,fop,e1,e2);
		};
	}
	,evalAssignOp: function(op,fop,e1,e2) {
		var v;
		var _g = e1.e;
		switch(_g._hx_index) {
		case 1:
			var id = _g.v;
			var l = this.locals.h[id];
			v = fop(this.expr(e1),this.expr(e2));
			if(l == null) {
				this.variables.h[id] = v;
			} else {
				l.r = v;
			}
			break;
		case 5:
			var e = _g.e;
			var f = _g.f;
			var obj = this.expr(e);
			v = fop(this.get(obj,f),this.expr(e2));
			v = this.set(obj,f,v);
			break;
		case 16:
			var e = _g.e;
			var index = _g.index;
			var arr = this.expr(e);
			var index1 = this.expr(index);
			if(js_Boot.__implements(arr,haxe_IMap)) {
				v = fop((js_Boot.__cast(arr , haxe_IMap)).get(index1),this.expr(e2));
				(js_Boot.__cast(arr , haxe_IMap)).set(index1,v);
			} else {
				v = fop(arr[index1],this.expr(e2));
				arr[index1] = v;
			}
			break;
		default:
			var e = new hscript_Error(hscript_ErrorDef.EInvalidOp(op),this.curExpr.pmin,this.curExpr.pmax,this.curExpr.origin,this.curExpr.line);
			throw haxe_Exception.thrown(e);
		}
		return v;
	}
	,increment: function(e,prefix,delta) {
		this.curExpr = e;
		var e1 = e.e;
		switch(e1._hx_index) {
		case 1:
			var id = e1.v;
			var l = this.locals.h[id];
			var v = l == null ? this.variables.h[id] : l.r;
			if(prefix) {
				v += delta;
				if(l == null) {
					this.variables.h[id] = v;
				} else {
					l.r = v;
				}
			} else if(l == null) {
				this.variables.h[id] = v + delta;
			} else {
				l.r = v + delta;
			}
			return v;
		case 5:
			var e = e1.e;
			var f = e1.f;
			var obj = this.expr(e);
			var v = this.get(obj,f);
			if(prefix) {
				v += delta;
				this.set(obj,f,v);
			} else {
				this.set(obj,f,v + delta);
			}
			return v;
		case 16:
			var e = e1.e;
			var index = e1.index;
			var arr = this.expr(e);
			var index1 = this.expr(index);
			if(js_Boot.__implements(arr,haxe_IMap)) {
				var v = (js_Boot.__cast(arr , haxe_IMap)).get(index1);
				if(prefix) {
					v += delta;
					(js_Boot.__cast(arr , haxe_IMap)).set(index1,v);
				} else {
					(js_Boot.__cast(arr , haxe_IMap)).set(index1,v + delta);
				}
				return v;
			} else {
				var v = arr[index1];
				if(prefix) {
					v += delta;
					arr[index1] = v;
				} else {
					arr[index1] = v + delta;
				}
				return v;
			}
			break;
		default:
			var e = new hscript_Error(hscript_ErrorDef.EInvalidOp(delta > 0 ? "++" : "--"),this.curExpr.pmin,this.curExpr.pmax,this.curExpr.origin,this.curExpr.line);
			throw haxe_Exception.thrown(e);
		}
	}
	,execute: function(expr) {
		this.depth = 0;
		this.locals = new haxe_ds_StringMap();
		this.declared = [];
		return this.exprReturn(expr);
	}
	,exprReturn: function(e) {
		try {
			return this.expr(e);
		} catch( _g ) {
			haxe_NativeStackTrace.lastError = _g;
			var _g1 = haxe_Exception.caught(_g).unwrap();
			if(js_Boot.__instanceof(_g1,hscript__$Interp_Stop)) {
				var e = _g1;
				switch(e._hx_index) {
				case 0:
					throw haxe_Exception.thrown("Invalid break");
				case 1:
					throw haxe_Exception.thrown("Invalid continue");
				case 2:
					var v = this.returnValue;
					this.returnValue = null;
					return v;
				}
			} else {
				throw _g;
			}
		}
	}
	,duplicate: function(h) {
		var h2 = new haxe_ds_StringMap();
		var h1 = h.h;
		var k_h = h1;
		var k_keys = Object.keys(h1);
		var k_length = k_keys.length;
		var k_current = 0;
		while(k_current < k_length) {
			var k = k_keys[k_current++];
			h2.h[k] = h.h[k];
		}
		return h2;
	}
	,restore: function(old) {
		while(this.declared.length > old) {
			var d = this.declared.pop();
			this.locals.h[d.n] = d.old;
		}
	}
	,error: function(e,rethrow) {
		if(rethrow == null) {
			rethrow = false;
		}
		var e1 = new hscript_Error(e,this.curExpr.pmin,this.curExpr.pmax,this.curExpr.origin,this.curExpr.line);
		if(rethrow) {
			throw haxe_Exception.thrown(e1);
		} else {
			throw haxe_Exception.thrown(e1);
		}
	}
	,rethrow: function(e) {
		throw haxe_Exception.thrown(e);
	}
	,resolve: function(id) {
		var l = this.locals.h[id];
		if(l != null) {
			return l.r;
		}
		var v = this.variables.h[id];
		if(v == null && !Object.prototype.hasOwnProperty.call(this.variables.h,id)) {
			var e = new hscript_Error(hscript_ErrorDef.EUnknownVariable(id),this.curExpr.pmin,this.curExpr.pmax,this.curExpr.origin,this.curExpr.line);
			throw haxe_Exception.thrown(e);
		}
		return v;
	}
	,expr: function(e) {
		var _gthis = this;
		this.curExpr = e;
		var e1 = e.e;
		switch(e1._hx_index) {
		case 0:
			var c = e1.c;
			switch(c._hx_index) {
			case 0:
				var v = c.v;
				return v;
			case 1:
				var f = c.f;
				return f;
			case 2:
				var s = c.s;
				return s;
			}
			break;
		case 1:
			var id = e1.v;
			return this.resolve(id);
		case 2:
			var _g = e1.t;
			var n = e1.n;
			var e = e1.e;
			this.declared.push({ n : n, old : this.locals.h[n]});
			var this1 = this.locals;
			var value = e == null ? null : this.expr(e);
			this1.h[n] = { r : value};
			return null;
		case 3:
			var e = e1.e;
			return this.expr(e);
		case 4:
			var exprs = e1.e;
			var old = this.declared.length;
			var v = null;
			var _g = 0;
			while(_g < exprs.length) {
				var e = exprs[_g];
				++_g;
				v = this.expr(e);
			}
			this.restore(old);
			return v;
		case 5:
			var e = e1.e;
			var f = e1.f;
			return this.get(this.expr(e),f);
		case 6:
			var op = e1.op;
			var e11 = e1.e1;
			var e2 = e1.e2;
			var fop = this.binops.h[op];
			if(fop == null) {
				var e = new hscript_Error(hscript_ErrorDef.EInvalidOp(op),this.curExpr.pmin,this.curExpr.pmax,this.curExpr.origin,this.curExpr.line);
				throw haxe_Exception.thrown(e);
			}
			return fop(e11,e2);
		case 7:
			var op = e1.op;
			var prefix = e1.prefix;
			var e = e1.e;
			switch(op) {
			case "!":
				return this.expr(e) != true;
			case "++":
				return this.increment(e,prefix,1);
			case "-":
				return -this.expr(e);
			case "--":
				return this.increment(e,prefix,-1);
			case "~":
				return ~this.expr(e);
			default:
				var e = new hscript_Error(hscript_ErrorDef.EInvalidOp(op),this.curExpr.pmin,this.curExpr.pmax,this.curExpr.origin,this.curExpr.line);
				throw haxe_Exception.thrown(e);
			}
			break;
		case 8:
			var e = e1.e;
			var params = e1.params;
			var args = [];
			var _g = 0;
			while(_g < params.length) {
				var p = params[_g];
				++_g;
				args.push(this.expr(p));
			}
			var _g = e.e;
			if(_g._hx_index == 5) {
				var e2 = _g.e;
				var f = _g.f;
				var obj = this.expr(e2);
				if(obj == null) {
					var e2 = new hscript_Error(hscript_ErrorDef.EInvalidAccess(f),this.curExpr.pmin,this.curExpr.pmax,this.curExpr.origin,this.curExpr.line);
					throw haxe_Exception.thrown(e2);
				}
				return this.fcall(obj,f,args);
			} else {
				return this.call(null,this.expr(e),args);
			}
			break;
		case 9:
			var econd = e1.cond;
			var e11 = e1.e1;
			var e2 = e1.e2;
			if(this.expr(econd) == true) {
				return this.expr(e11);
			} else if(e2 == null) {
				return null;
			} else {
				return this.expr(e2);
			}
			break;
		case 10:
			var econd = e1.cond;
			var e = e1.e;
			this.whileLoop(econd,e);
			return null;
		case 11:
			var v = e1.v;
			var it = e1.it;
			var e = e1.e;
			this.forLoop(v,it,e);
			return null;
		case 12:
			throw haxe_Exception.thrown(hscript__$Interp_Stop.SBreak);
		case 13:
			throw haxe_Exception.thrown(hscript__$Interp_Stop.SContinue);
		case 14:
			var _g = e1.ret;
			var params = e1.args;
			var fexpr = e1.e;
			var name = e1.name;
			var capturedLocals = this.duplicate(this.locals);
			var me = this;
			var hasOpt = false;
			var minParams = 0;
			var _g = 0;
			while(_g < params.length) {
				var p = params[_g];
				++_g;
				if(p.opt) {
					hasOpt = true;
				} else {
					minParams += 1;
				}
			}
			var f = function(args) {
				if((args == null ? 0 : args.length) != params.length) {
					if(args.length < minParams) {
						var str = "Invalid number of parameters. Got " + args.length + ", required " + minParams;
						if(name != null) {
							str += " for function '" + name + "'";
						}
						var e = new hscript_Error(hscript_ErrorDef.ECustom(str),_gthis.curExpr.pmin,_gthis.curExpr.pmax,_gthis.curExpr.origin,_gthis.curExpr.line);
						throw haxe_Exception.thrown(e);
					}
					var args2 = [];
					var extraParams = args.length - minParams;
					var pos = 0;
					var _g = 0;
					while(_g < params.length) {
						var p = params[_g];
						++_g;
						if(p.opt) {
							if(extraParams > 0) {
								args2.push(args[pos++]);
								--extraParams;
							} else {
								args2.push(null);
							}
						} else {
							args2.push(args[pos++]);
						}
					}
					args = args2;
				}
				var old = me.locals;
				var depth = me.depth;
				me.depth++;
				me.locals = me.duplicate(capturedLocals);
				var _g = 0;
				var _g1 = params.length;
				while(_g < _g1) {
					var i = _g++;
					me.locals.h[params[i].name] = { r : args[i]};
				}
				var r = null;
				if(_gthis.inTry) {
					try {
						r = me.exprReturn(fexpr);
					} catch( _g ) {
						haxe_NativeStackTrace.lastError = _g;
						var e = haxe_Exception.caught(_g).unwrap();
						me.locals = old;
						me.depth = depth;
						throw haxe_Exception.thrown(e);
					}
				} else {
					r = me.exprReturn(fexpr);
				}
				me.locals = old;
				me.depth = depth;
				return r;
			};
			var f1 = Reflect.makeVarArgs(f);
			if(name != null) {
				if(this.depth == 0) {
					this.variables.h[name] = f1;
				} else {
					this.declared.push({ n : name, old : this.locals.h[name]});
					var ref = { r : f1};
					this.locals.h[name] = ref;
					capturedLocals.h[name] = ref;
				}
			}
			return f1;
		case 15:
			var e = e1.e;
			this.returnValue = e == null ? null : this.expr(e);
			throw haxe_Exception.thrown(hscript__$Interp_Stop.SReturn);
		case 16:
			var e = e1.e;
			var index = e1.index;
			var arr = this.expr(e);
			var index1 = this.expr(index);
			if(js_Boot.__implements(arr,haxe_IMap)) {
				return (js_Boot.__cast(arr , haxe_IMap)).get(index1);
			} else {
				return arr[index1];
			}
			break;
		case 17:
			var arr = e1.e;
			var tmp;
			if(arr.length > 0) {
				var _g = arr[0].e;
				if(_g._hx_index == 6) {
					var _g1 = _g.e1;
					var _g1 = _g.e2;
					tmp = _g.op == "=>";
				} else {
					tmp = false;
				}
			} else {
				tmp = false;
			}
			if(tmp) {
				var isAllString = true;
				var isAllInt = true;
				var isAllObject = true;
				var isAllEnum = true;
				var keys = [];
				var values = [];
				var _g = 0;
				while(_g < arr.length) {
					var e = arr[_g];
					++_g;
					var _g1 = e.e;
					if(_g1._hx_index == 6) {
						if(_g1.op == "=>") {
							var eKey = _g1.e1;
							var eValue = _g1.e2;
							var key = this.expr(eKey);
							var value = this.expr(eValue);
							isAllString = isAllString && typeof(key) == "string";
							isAllInt = isAllInt && (typeof(key) == "number" && ((key | 0) === key));
							isAllObject = isAllObject && Reflect.isObject(key);
							isAllEnum = isAllEnum && Reflect.isEnumValue(key);
							keys.push(key);
							values.push(value);
						} else {
							throw haxe_Exception.thrown("=> expected");
						}
					} else {
						throw haxe_Exception.thrown("=> expected");
					}
				}
				var map;
				if(isAllInt) {
					map = new haxe_ds_IntMap();
				} else if(isAllString) {
					map = new haxe_ds_StringMap();
				} else if(isAllEnum) {
					map = new haxe_ds_EnumValueMap();
				} else if(isAllObject) {
					map = new haxe_ds_ObjectMap();
				} else {
					throw haxe_Exception.thrown("Inconsistent key types");
				}
				var _g = 0;
				var _g1 = keys.length;
				while(_g < _g1) {
					var n = _g++;
					(js_Boot.__cast(map , haxe_IMap)).set(keys[n],values[n]);
				}
				return map;
			} else {
				var a = [];
				var _g = 0;
				while(_g < arr.length) {
					var e = arr[_g];
					++_g;
					a.push(this.expr(e));
				}
				return a;
			}
			break;
		case 18:
			var cl = e1.cl;
			var params1 = e1.params;
			var a = [];
			var _g = 0;
			while(_g < params1.length) {
				var e = params1[_g];
				++_g;
				a.push(this.expr(e));
			}
			return this.cnew(cl,a);
		case 19:
			var e = e1.e;
			throw haxe_Exception.thrown(this.expr(e));
		case 20:
			var _g = e1.t;
			var e = e1.e;
			var n = e1.v;
			var ecatch = e1.ecatch;
			var old = this.declared.length;
			var oldTry = this.inTry;
			try {
				this.inTry = true;
				var v = this.expr(e);
				this.restore(old);
				this.inTry = oldTry;
				return v;
			} catch( _g ) {
				haxe_NativeStackTrace.lastError = _g;
				var _g1 = haxe_Exception.caught(_g).unwrap();
				if(js_Boot.__instanceof(_g1,hscript__$Interp_Stop)) {
					var err = _g1;
					this.inTry = oldTry;
					throw haxe_Exception.thrown(err);
				} else {
					var err = _g1;
					this.restore(old);
					this.inTry = oldTry;
					this.declared.push({ n : n, old : this.locals.h[n]});
					this.locals.h[n] = { r : err};
					var v = this.expr(ecatch);
					this.restore(old);
					return v;
				}
			}
			break;
		case 21:
			var fl = e1.fl;
			var o = { };
			var _g = 0;
			while(_g < fl.length) {
				var f = fl[_g];
				++_g;
				this.set(o,f.name,this.expr(f.e));
			}
			return o;
		case 22:
			var econd = e1.cond;
			var e11 = e1.e1;
			var e2 = e1.e2;
			if(this.expr(econd) == true) {
				return this.expr(e11);
			} else {
				return this.expr(e2);
			}
			break;
		case 23:
			var e = e1.e;
			var cases = e1.cases;
			var def = e1.defaultExpr;
			var val = this.expr(e);
			var match = false;
			var _g = 0;
			while(_g < cases.length) {
				var c = cases[_g];
				++_g;
				var _g1 = 0;
				var _g2 = c.values;
				while(_g1 < _g2.length) {
					var v = _g2[_g1];
					++_g1;
					if(this.expr(v) == val) {
						match = true;
						break;
					}
				}
				if(match) {
					val = this.expr(c.expr);
					break;
				}
			}
			if(!match) {
				val = def == null ? null : this.expr(def);
			}
			return val;
		case 24:
			var econd = e1.cond;
			var e = e1.e;
			this.doWhileLoop(econd,e);
			return null;
		case 25:
			var _g = e1.name;
			var _g = e1.args;
			var e = e1.e;
			return this.expr(e);
		case 26:
			var _g = e1.t;
			var e = e1.e;
			return this.expr(e);
		}
	}
	,doWhileLoop: function(econd,e) {
		var old = this.declared.length;
		_hx_loop1: while(true) {
			try {
				this.expr(e);
			} catch( _g ) {
				haxe_NativeStackTrace.lastError = _g;
				var _g1 = haxe_Exception.caught(_g).unwrap();
				if(js_Boot.__instanceof(_g1,hscript__$Interp_Stop)) {
					var err = _g1;
					switch(err._hx_index) {
					case 0:
						break _hx_loop1;
					case 1:
						break;
					case 2:
						throw haxe_Exception.thrown(err);
					}
				} else {
					throw _g;
				}
			}
			if(!(this.expr(econd) == true)) {
				break;
			}
		}
		this.restore(old);
	}
	,whileLoop: function(econd,e) {
		var old = this.declared.length;
		_hx_loop1: while(this.expr(econd) == true) try {
			this.expr(e);
		} catch( _g ) {
			haxe_NativeStackTrace.lastError = _g;
			var _g1 = haxe_Exception.caught(_g).unwrap();
			if(js_Boot.__instanceof(_g1,hscript__$Interp_Stop)) {
				var err = _g1;
				switch(err._hx_index) {
				case 0:
					break _hx_loop1;
				case 1:
					break;
				case 2:
					throw haxe_Exception.thrown(err);
				}
			} else {
				throw _g;
			}
		}
		this.restore(old);
	}
	,makeIterator: function(v) {
		try {
			v = $getIterator(v);
		} catch( _g ) {
			haxe_NativeStackTrace.lastError = _g;
		}
		if(v.hasNext == null || v.next == null) {
			var e = new hscript_Error(hscript_ErrorDef.EInvalidIterator(v),this.curExpr.pmin,this.curExpr.pmax,this.curExpr.origin,this.curExpr.line);
			throw haxe_Exception.thrown(e);
		}
		return v;
	}
	,forLoop: function(n,it,e) {
		var old = this.declared.length;
		this.declared.push({ n : n, old : this.locals.h[n]});
		var it1 = this.makeIterator(this.expr(it));
		_hx_loop1: while(it1.hasNext()) {
			var this1 = this.locals;
			var value = { r : it1.next()};
			this1.h[n] = value;
			try {
				this.expr(e);
			} catch( _g ) {
				haxe_NativeStackTrace.lastError = _g;
				var _g1 = haxe_Exception.caught(_g).unwrap();
				if(js_Boot.__instanceof(_g1,hscript__$Interp_Stop)) {
					var err = _g1;
					switch(err._hx_index) {
					case 0:
						break _hx_loop1;
					case 1:
						break;
					case 2:
						throw haxe_Exception.thrown(err);
					}
				} else {
					throw _g;
				}
			}
		}
		this.restore(old);
	}
	,isMap: function(o) {
		return js_Boot.__implements(o,haxe_IMap);
	}
	,getMapValue: function(map,key) {
		return (js_Boot.__cast(map , haxe_IMap)).get(key);
	}
	,setMapValue: function(map,key,value) {
		(js_Boot.__cast(map , haxe_IMap)).set(key,value);
	}
	,get: function(o,f) {
		if(o == null) {
			var e = new hscript_Error(hscript_ErrorDef.EInvalidAccess(f),this.curExpr.pmin,this.curExpr.pmax,this.curExpr.origin,this.curExpr.line);
			throw haxe_Exception.thrown(e);
		}
		return Reflect.getProperty(o,f);
	}
	,set: function(o,f,v) {
		if(o == null) {
			var e = new hscript_Error(hscript_ErrorDef.EInvalidAccess(f),this.curExpr.pmin,this.curExpr.pmax,this.curExpr.origin,this.curExpr.line);
			throw haxe_Exception.thrown(e);
		}
		Reflect.setProperty(o,f,v);
		return v;
	}
	,fcall: function(o,f,args) {
		return this.call(o,this.get(o,f),args);
	}
	,call: function(o,f,args) {
		return f.apply(o,args);
	}
	,cnew: function(cl,args) {
		var c = $hxClasses[cl];
		if(c == null) {
			c = this.resolve(cl);
		}
		return Type.createInstance(c,args);
	}
	,__class__: hscript_Interp
};
var hscript_Token = $hxEnums["hscript.Token"] = { __ename__:"hscript.Token",__constructs__:null
	,TEof: {_hx_name:"TEof",_hx_index:0,__enum__:"hscript.Token",toString:$estr}
	,TConst: ($_=function(c) { return {_hx_index:1,c:c,__enum__:"hscript.Token",toString:$estr}; },$_._hx_name="TConst",$_.__params__ = ["c"],$_)
	,TId: ($_=function(s) { return {_hx_index:2,s:s,__enum__:"hscript.Token",toString:$estr}; },$_._hx_name="TId",$_.__params__ = ["s"],$_)
	,TOp: ($_=function(s) { return {_hx_index:3,s:s,__enum__:"hscript.Token",toString:$estr}; },$_._hx_name="TOp",$_.__params__ = ["s"],$_)
	,TPOpen: {_hx_name:"TPOpen",_hx_index:4,__enum__:"hscript.Token",toString:$estr}
	,TPClose: {_hx_name:"TPClose",_hx_index:5,__enum__:"hscript.Token",toString:$estr}
	,TBrOpen: {_hx_name:"TBrOpen",_hx_index:6,__enum__:"hscript.Token",toString:$estr}
	,TBrClose: {_hx_name:"TBrClose",_hx_index:7,__enum__:"hscript.Token",toString:$estr}
	,TDot: {_hx_name:"TDot",_hx_index:8,__enum__:"hscript.Token",toString:$estr}
	,TComma: {_hx_name:"TComma",_hx_index:9,__enum__:"hscript.Token",toString:$estr}
	,TSemicolon: {_hx_name:"TSemicolon",_hx_index:10,__enum__:"hscript.Token",toString:$estr}
	,TBkOpen: {_hx_name:"TBkOpen",_hx_index:11,__enum__:"hscript.Token",toString:$estr}
	,TBkClose: {_hx_name:"TBkClose",_hx_index:12,__enum__:"hscript.Token",toString:$estr}
	,TQuestion: {_hx_name:"TQuestion",_hx_index:13,__enum__:"hscript.Token",toString:$estr}
	,TDoubleDot: {_hx_name:"TDoubleDot",_hx_index:14,__enum__:"hscript.Token",toString:$estr}
	,TMeta: ($_=function(s) { return {_hx_index:15,s:s,__enum__:"hscript.Token",toString:$estr}; },$_._hx_name="TMeta",$_.__params__ = ["s"],$_)
	,TPrepro: ($_=function(s) { return {_hx_index:16,s:s,__enum__:"hscript.Token",toString:$estr}; },$_._hx_name="TPrepro",$_.__params__ = ["s"],$_)
};
hscript_Token.__constructs__ = [hscript_Token.TEof,hscript_Token.TConst,hscript_Token.TId,hscript_Token.TOp,hscript_Token.TPOpen,hscript_Token.TPClose,hscript_Token.TBrOpen,hscript_Token.TBrClose,hscript_Token.TDot,hscript_Token.TComma,hscript_Token.TSemicolon,hscript_Token.TBkOpen,hscript_Token.TBkClose,hscript_Token.TQuestion,hscript_Token.TDoubleDot,hscript_Token.TMeta,hscript_Token.TPrepro];
hscript_Token.__empty_constructs__ = [hscript_Token.TEof,hscript_Token.TPOpen,hscript_Token.TPClose,hscript_Token.TBrOpen,hscript_Token.TBrClose,hscript_Token.TDot,hscript_Token.TComma,hscript_Token.TSemicolon,hscript_Token.TBkOpen,hscript_Token.TBkClose,hscript_Token.TQuestion,hscript_Token.TDoubleDot];
var hscript_Parser = function() {
	this.uid = 0;
	this.preprocesorValues = new haxe_ds_StringMap();
	this.line = 1;
	this.opChars = "+*/-=!><&|^%~";
	this.identChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";
	var priorities = [["%"],["*","/"],["+","-"],["<<",">>",">>>"],["|","&","^"],["==","!=",">","<",">=","<="],["..."],["&&"],["||"],["=","+=","-=","*=","/=","%=","<<=",">>=",">>>=","|=","&=","^=","=>"]];
	this.opPriority = new haxe_ds_StringMap();
	this.opRightAssoc = new haxe_ds_StringMap();
	this.unops = new haxe_ds_StringMap();
	var _g = 0;
	var _g1 = priorities.length;
	while(_g < _g1) {
		var i = _g++;
		var _g2 = 0;
		var _g3 = priorities[i];
		while(_g2 < _g3.length) {
			var x = _g3[_g2];
			++_g2;
			this.opPriority.h[x] = i;
			if(i == 9) {
				this.opRightAssoc.h[x] = true;
			}
		}
	}
	var x = "!";
	this.unops.h[x] = x == "++" || x == "--";
	var x = "++";
	this.unops.h[x] = x == "++" || x == "--";
	var x = "--";
	this.unops.h[x] = x == "++" || x == "--";
	var x = "-";
	this.unops.h[x] = x == "++" || x == "--";
	var x = "~";
	this.unops.h[x] = x == "++" || x == "--";
};
$hxClasses["hscript.Parser"] = hscript_Parser;
hscript_Parser.__name__ = "hscript.Parser";
hscript_Parser.prototype = {
	line: null
	,opChars: null
	,identChars: null
	,opPriority: null
	,opRightAssoc: null
	,unops: null
	,preprocesorValues: null
	,allowJSON: null
	,allowTypes: null
	,allowMetadata: null
	,resumeErrors: null
	,input: null
	,readPos: null
	,char: null
	,ops: null
	,idents: null
	,uid: null
	,origin: null
	,tokenMin: null
	,tokenMax: null
	,oldTokenMin: null
	,oldTokenMax: null
	,tokens: null
	,error: function(err,pmin,pmax) {
		if(!this.resumeErrors) {
			throw haxe_Exception.thrown(new hscript_Error(err,pmin,pmax,this.origin,this.line));
		}
	}
	,invalidChar: function(c) {
		if(!this.resumeErrors) {
			throw haxe_Exception.thrown(new hscript_Error(hscript_ErrorDef.EInvalidChar(c),this.readPos - 1,this.readPos - 1,this.origin,this.line));
		}
	}
	,initParser: function(origin) {
		this.preprocStack = [];
		this.origin = origin;
		this.readPos = 0;
		this.tokenMin = this.oldTokenMin = 0;
		this.tokenMax = this.oldTokenMax = 0;
		this.tokens = new haxe_ds_List();
		this.char = -1;
		this.ops = [];
		this.idents = [];
		this.uid = 0;
		var _g = 0;
		var _g1 = this.opChars.length;
		while(_g < _g1) {
			var i = _g++;
			this.ops[HxOverrides.cca(this.opChars,i)] = true;
		}
		var _g = 0;
		var _g1 = this.identChars.length;
		while(_g < _g1) {
			var i = _g++;
			this.idents[HxOverrides.cca(this.identChars,i)] = true;
		}
	}
	,parseString: function(s,origin) {
		if(origin == null) {
			origin = "hscript";
		}
		this.initParser(origin);
		this.input = s;
		this.readPos = 0;
		var a = [];
		while(true) {
			var tk = this.token();
			if(tk == hscript_Token.TEof) {
				break;
			}
			this.tokens.push({ t : tk, min : this.tokenMin, max : this.tokenMax});
			this.tokenMin = this.oldTokenMin;
			this.tokenMax = this.oldTokenMax;
			this.parseFullExpr(a);
		}
		if(a.length == 1) {
			return a[0];
		} else {
			var e = hscript_ExprDef.EBlock(a);
			var pmin = 0;
			var pmax = null;
			if(e == null) {
				return null;
			} else {
				if(pmin == null) {
					pmin = this.tokenMin;
				}
				if(pmax == null) {
					pmax = this.tokenMax;
				}
				return { e : e, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
			}
		}
	}
	,unexpected: function(tk) {
		var err = hscript_ErrorDef.EUnexpected(this.tokenString(tk));
		if(!this.resumeErrors) {
			throw haxe_Exception.thrown(new hscript_Error(err,this.tokenMin,this.tokenMax,this.origin,this.line));
		}
		return null;
	}
	,push: function(tk) {
		this.tokens.push({ t : tk, min : this.tokenMin, max : this.tokenMax});
		this.tokenMin = this.oldTokenMin;
		this.tokenMax = this.oldTokenMax;
	}
	,ensure: function(tk) {
		var t = this.token();
		if(t != tk) {
			this.unexpected(t);
		}
	}
	,ensureToken: function(tk) {
		var t = this.token();
		if(!Type.enumEq(t,tk)) {
			this.unexpected(t);
		}
	}
	,maybe: function(tk) {
		var t = this.token();
		if(Type.enumEq(t,tk)) {
			return true;
		}
		this.tokens.push({ t : t, min : this.tokenMin, max : this.tokenMax});
		this.tokenMin = this.oldTokenMin;
		this.tokenMax = this.oldTokenMax;
		return false;
	}
	,getIdent: function() {
		var tk = this.token();
		if(tk._hx_index == 2) {
			var id = tk.s;
			return id;
		} else {
			this.unexpected(tk);
			return null;
		}
	}
	,expr: function(e) {
		return e.e;
	}
	,pmin: function(e) {
		if(e == null) {
			return 0;
		} else {
			return e.pmin;
		}
	}
	,pmax: function(e) {
		if(e == null) {
			return 0;
		} else {
			return e.pmax;
		}
	}
	,mk: function(e,pmin,pmax) {
		if(e == null) {
			return null;
		}
		if(pmin == null) {
			pmin = this.tokenMin;
		}
		if(pmax == null) {
			pmax = this.tokenMax;
		}
		return { e : e, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
	}
	,isBlock: function(e) {
		if(e == null) {
			return false;
		}
		var _g = e.e;
		switch(_g._hx_index) {
		case 2:
			var _g1 = _g.n;
			var t = _g.t;
			var e = _g.e;
			if(e != null) {
				return this.isBlock(e);
			} else if(t != null) {
				if(t == null) {
					return false;
				} else if(t._hx_index == 2) {
					var _g1 = t.fields;
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
			break;
		case 4:
			var _g1 = _g.e;
			return true;
		case 6:
			var _g1 = _g.op;
			var _g1 = _g.e1;
			var e = _g.e2;
			return this.isBlock(e);
		case 7:
			var _g1 = _g.op;
			var prefix = _g.prefix;
			var e = _g.e;
			if(!prefix) {
				return this.isBlock(e);
			} else {
				return false;
			}
			break;
		case 9:
			var _g1 = _g.cond;
			var e1 = _g.e1;
			var e2 = _g.e2;
			if(e2 != null) {
				return this.isBlock(e2);
			} else {
				return this.isBlock(e1);
			}
			break;
		case 10:
			var _g1 = _g.cond;
			var e = _g.e;
			return this.isBlock(e);
		case 11:
			var _g1 = _g.v;
			var _g1 = _g.it;
			var e = _g.e;
			return this.isBlock(e);
		case 14:
			var _g1 = _g.args;
			var _g1 = _g.name;
			var _g1 = _g.ret;
			var e = _g.e;
			return this.isBlock(e);
		case 15:
			var e = _g.e;
			if(e != null) {
				return this.isBlock(e);
			} else {
				return false;
			}
			break;
		case 20:
			var _g1 = _g.e;
			var _g1 = _g.v;
			var _g1 = _g.t;
			var e = _g.ecatch;
			return this.isBlock(e);
		case 21:
			var _g1 = _g.fl;
			return true;
		case 23:
			var _g1 = _g.e;
			var _g1 = _g.cases;
			var _g1 = _g.defaultExpr;
			return true;
		case 24:
			var _g1 = _g.cond;
			var e = _g.e;
			return this.isBlock(e);
		case 25:
			var _g1 = _g.name;
			var _g1 = _g.args;
			var e = _g.e;
			return this.isBlock(e);
		default:
			return false;
		}
	}
	,parseFullExpr: function(exprs) {
		var e = this.parseExpr();
		exprs.push(e);
		var tk = this.token();
		while(true) {
			var tmp;
			if(tk == hscript_Token.TComma && e != null) {
				var _g = e.e;
				if(_g._hx_index == 2) {
					var _g1 = _g.n;
					var _g2 = _g.t;
					var _g3 = _g.e;
					tmp = true;
				} else {
					tmp = false;
				}
			} else {
				tmp = false;
			}
			if(!tmp) {
				break;
			}
			e = this.parseStructure("var");
			exprs.push(e);
			tk = this.token();
		}
		if(tk != hscript_Token.TSemicolon && tk != hscript_Token.TEof) {
			if(this.isBlock(e)) {
				this.tokens.push({ t : tk, min : this.tokenMin, max : this.tokenMax});
				this.tokenMin = this.oldTokenMin;
				this.tokenMax = this.oldTokenMax;
			} else {
				this.unexpected(tk);
			}
		}
	}
	,parseObject: function(p1) {
		var fl = [];
		_hx_loop1: while(true) {
			var tk = this.token();
			var id = null;
			switch(tk._hx_index) {
			case 1:
				var c = tk.c;
				if(!this.allowJSON) {
					this.unexpected(tk);
				}
				if(c._hx_index == 2) {
					var s = c.s;
					id = s;
				} else {
					this.unexpected(tk);
				}
				break;
			case 2:
				var i = tk.s;
				id = i;
				break;
			case 7:
				break _hx_loop1;
			default:
				this.unexpected(tk);
				break _hx_loop1;
			}
			var t = this.token();
			if(t != hscript_Token.TDoubleDot) {
				this.unexpected(t);
			}
			fl.push({ name : id, e : this.parseExpr()});
			tk = this.token();
			switch(tk._hx_index) {
			case 7:
				break _hx_loop1;
			case 9:
				break;
			default:
				this.unexpected(tk);
			}
		}
		var e = hscript_ExprDef.EObject(fl);
		var pmin = p1;
		var pmax = null;
		var tmp;
		if(e == null) {
			tmp = null;
		} else {
			if(pmin == null) {
				pmin = this.tokenMin;
			}
			if(pmax == null) {
				pmax = this.tokenMax;
			}
			tmp = { e : e, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
		}
		return this.parseExprNext(tmp);
	}
	,parseExpr: function() {
		var tk = this.token();
		var p1 = this.tokenMin;
		switch(tk._hx_index) {
		case 1:
			var c = tk.c;
			var e = hscript_ExprDef.EConst(c);
			var pmin = null;
			var pmax = null;
			var tmp;
			if(e == null) {
				tmp = null;
			} else {
				if(pmin == null) {
					pmin = this.tokenMin;
				}
				if(pmax == null) {
					pmax = this.tokenMax;
				}
				tmp = { e : e, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
			}
			return this.parseExprNext(tmp);
		case 2:
			var id = tk.s;
			var e = this.parseStructure(id);
			if(e == null) {
				var e1 = hscript_ExprDef.EIdent(id);
				var pmin = null;
				var pmax = null;
				if(e1 == null) {
					e = null;
				} else {
					if(pmin == null) {
						pmin = this.tokenMin;
					}
					if(pmax == null) {
						pmax = this.tokenMax;
					}
					e = { e : e1, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
				}
			}
			return this.parseExprNext(e);
		case 3:
			var op = tk.s;
			if(Object.prototype.hasOwnProperty.call(this.unops.h,op)) {
				var start = this.tokenMin;
				var e = this.parseExpr();
				if(op == "-" && e != null) {
					var _g = e.e;
					if(_g._hx_index == 0) {
						var _g1 = _g.c;
						switch(_g1._hx_index) {
						case 0:
							var i = _g1.v;
							var e1 = hscript_ExprDef.EConst(hscript_Const.CInt(-i));
							var pmin = start;
							var pmax = e == null ? 0 : e.pmax;
							if(e1 == null) {
								return null;
							} else {
								if(pmin == null) {
									pmin = this.tokenMin;
								}
								if(pmax == null) {
									pmax = this.tokenMax;
								}
								return { e : e1, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
							}
							break;
						case 1:
							var f = _g1.f;
							var e1 = hscript_ExprDef.EConst(hscript_Const.CFloat(-f));
							var pmin = start;
							var pmax = e == null ? 0 : e.pmax;
							if(e1 == null) {
								return null;
							} else {
								if(pmin == null) {
									pmin = this.tokenMin;
								}
								if(pmax == null) {
									pmax = this.tokenMax;
								}
								return { e : e1, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
							}
							break;
						default:
						}
					}
				}
				return this.makeUnop(op,e);
			}
			return this.unexpected(tk);
		case 4:
			var e = this.parseExpr();
			tk = this.token();
			switch(tk._hx_index) {
			case 5:
				var e1 = hscript_ExprDef.EParent(e);
				var pmin = p1;
				var pmax = this.tokenMax;
				var tmp;
				if(e1 == null) {
					tmp = null;
				} else {
					if(pmin == null) {
						pmin = this.tokenMin;
					}
					if(pmax == null) {
						pmax = this.tokenMax;
					}
					tmp = { e : e1, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
				}
				return this.parseExprNext(tmp);
			case 9:
				var _g = e.e;
				if(_g._hx_index == 1) {
					var v = _g.v;
					return this.parseLambda([{ name : v}],e == null ? 0 : e.pmin);
				}
				break;
			case 14:
				var t = this.parseType();
				tk = this.token();
				switch(tk._hx_index) {
				case 5:
					var e1 = hscript_ExprDef.ECheckType(e,t);
					var pmin = p1;
					var pmax = this.tokenMax;
					var tmp;
					if(e1 == null) {
						tmp = null;
					} else {
						if(pmin == null) {
							pmin = this.tokenMin;
						}
						if(pmax == null) {
							pmax = this.tokenMax;
						}
						tmp = { e : e1, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
					}
					return this.parseExprNext(tmp);
				case 9:
					var _g = e.e;
					if(_g._hx_index == 1) {
						var v = _g.v;
						return this.parseLambda([{ name : v, t : t}],e == null ? 0 : e.pmin);
					}
					break;
				default:
				}
				break;
			default:
			}
			return this.unexpected(tk);
		case 6:
			tk = this.token();
			switch(tk._hx_index) {
			case 1:
				var c = tk.c;
				if(this.allowJSON) {
					if(c._hx_index == 2) {
						var _g = c.s;
						var tk2 = this.token();
						this.tokens.push({ t : tk2, min : this.tokenMin, max : this.tokenMax});
						this.tokenMin = this.oldTokenMin;
						this.tokenMax = this.oldTokenMax;
						this.tokens.push({ t : tk, min : this.tokenMin, max : this.tokenMax});
						this.tokenMin = this.oldTokenMin;
						this.tokenMax = this.oldTokenMax;
						if(tk2._hx_index == 14) {
							return this.parseExprNext(this.parseObject(p1));
						}
					} else {
						this.tokens.push({ t : tk, min : this.tokenMin, max : this.tokenMax});
						this.tokenMin = this.oldTokenMin;
						this.tokenMax = this.oldTokenMax;
					}
				} else {
					this.tokens.push({ t : tk, min : this.tokenMin, max : this.tokenMax});
					this.tokenMin = this.oldTokenMin;
					this.tokenMax = this.oldTokenMax;
				}
				break;
			case 2:
				var _g = tk.s;
				var tk2 = this.token();
				this.tokens.push({ t : tk2, min : this.tokenMin, max : this.tokenMax});
				this.tokenMin = this.oldTokenMin;
				this.tokenMax = this.oldTokenMax;
				this.tokens.push({ t : tk, min : this.tokenMin, max : this.tokenMax});
				this.tokenMin = this.oldTokenMin;
				this.tokenMax = this.oldTokenMax;
				if(tk2._hx_index == 14) {
					return this.parseExprNext(this.parseObject(p1));
				}
				break;
			case 7:
				var e = hscript_ExprDef.EObject([]);
				var pmin = p1;
				var pmax = null;
				var tmp;
				if(e == null) {
					tmp = null;
				} else {
					if(pmin == null) {
						pmin = this.tokenMin;
					}
					if(pmax == null) {
						pmax = this.tokenMax;
					}
					tmp = { e : e, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
				}
				return this.parseExprNext(tmp);
			default:
				this.tokens.push({ t : tk, min : this.tokenMin, max : this.tokenMax});
				this.tokenMin = this.oldTokenMin;
				this.tokenMax = this.oldTokenMax;
			}
			var a = [];
			while(true) {
				this.parseFullExpr(a);
				tk = this.token();
				if(tk == hscript_Token.TBrClose || this.resumeErrors && tk == hscript_Token.TEof) {
					break;
				}
				this.tokens.push({ t : tk, min : this.tokenMin, max : this.tokenMax});
				this.tokenMin = this.oldTokenMin;
				this.tokenMax = this.oldTokenMax;
			}
			var e = hscript_ExprDef.EBlock(a);
			var pmin = p1;
			var pmax = null;
			if(e == null) {
				return null;
			} else {
				if(pmin == null) {
					pmin = this.tokenMin;
				}
				if(pmax == null) {
					pmax = this.tokenMax;
				}
				return { e : e, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
			}
			break;
		case 11:
			var a = [];
			tk = this.token();
			while(tk != hscript_Token.TBkClose && (!this.resumeErrors || tk != hscript_Token.TEof)) {
				this.tokens.push({ t : tk, min : this.tokenMin, max : this.tokenMax});
				this.tokenMin = this.oldTokenMin;
				this.tokenMax = this.oldTokenMax;
				a.push(this.parseExpr());
				tk = this.token();
				if(tk == hscript_Token.TComma) {
					tk = this.token();
				}
			}
			if(a.length == 1 && a[0] != null) {
				var _g = a[0].e;
				switch(_g._hx_index) {
				case 10:
					var _g1 = _g.cond;
					var _g1 = _g.e;
					var tmp = "__a_" + this.uid++;
					var e = hscript_ExprDef.EArrayDecl([]);
					var pmin = p1;
					var pmax = null;
					var e1;
					if(e == null) {
						e1 = null;
					} else {
						if(pmin == null) {
							pmin = this.tokenMin;
						}
						if(pmax == null) {
							pmax = this.tokenMax;
						}
						e1 = { e : e, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
					}
					var e = hscript_ExprDef.EVar(tmp,null,e1);
					var pmin = p1;
					var pmax = null;
					var e1;
					if(e == null) {
						e1 = null;
					} else {
						if(pmin == null) {
							pmin = this.tokenMin;
						}
						if(pmax == null) {
							pmax = this.tokenMax;
						}
						e1 = { e : e, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
					}
					var e = this.mapCompr(tmp,a[0]);
					var e2 = hscript_ExprDef.EIdent(tmp);
					var pmin = p1;
					var pmax = null;
					var e3;
					if(e2 == null) {
						e3 = null;
					} else {
						if(pmin == null) {
							pmin = this.tokenMin;
						}
						if(pmax == null) {
							pmax = this.tokenMax;
						}
						e3 = { e : e2, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
					}
					var e2 = hscript_ExprDef.EBlock([e1,e,e3]);
					var pmin = p1;
					var pmax = null;
					var e;
					if(e2 == null) {
						e = null;
					} else {
						if(pmin == null) {
							pmin = this.tokenMin;
						}
						if(pmax == null) {
							pmax = this.tokenMax;
						}
						e = { e : e2, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
					}
					return this.parseExprNext(e);
				case 11:
					var _g1 = _g.v;
					var _g1 = _g.it;
					var _g1 = _g.e;
					var tmp = "__a_" + this.uid++;
					var e = hscript_ExprDef.EArrayDecl([]);
					var pmin = p1;
					var pmax = null;
					var e1;
					if(e == null) {
						e1 = null;
					} else {
						if(pmin == null) {
							pmin = this.tokenMin;
						}
						if(pmax == null) {
							pmax = this.tokenMax;
						}
						e1 = { e : e, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
					}
					var e = hscript_ExprDef.EVar(tmp,null,e1);
					var pmin = p1;
					var pmax = null;
					var e1;
					if(e == null) {
						e1 = null;
					} else {
						if(pmin == null) {
							pmin = this.tokenMin;
						}
						if(pmax == null) {
							pmax = this.tokenMax;
						}
						e1 = { e : e, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
					}
					var e = this.mapCompr(tmp,a[0]);
					var e2 = hscript_ExprDef.EIdent(tmp);
					var pmin = p1;
					var pmax = null;
					var e3;
					if(e2 == null) {
						e3 = null;
					} else {
						if(pmin == null) {
							pmin = this.tokenMin;
						}
						if(pmax == null) {
							pmax = this.tokenMax;
						}
						e3 = { e : e2, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
					}
					var e2 = hscript_ExprDef.EBlock([e1,e,e3]);
					var pmin = p1;
					var pmax = null;
					var e;
					if(e2 == null) {
						e = null;
					} else {
						if(pmin == null) {
							pmin = this.tokenMin;
						}
						if(pmax == null) {
							pmax = this.tokenMax;
						}
						e = { e : e2, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
					}
					return this.parseExprNext(e);
				case 24:
					var _g1 = _g.cond;
					var _g1 = _g.e;
					var tmp = "__a_" + this.uid++;
					var e = hscript_ExprDef.EArrayDecl([]);
					var pmin = p1;
					var pmax = null;
					var e1;
					if(e == null) {
						e1 = null;
					} else {
						if(pmin == null) {
							pmin = this.tokenMin;
						}
						if(pmax == null) {
							pmax = this.tokenMax;
						}
						e1 = { e : e, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
					}
					var e = hscript_ExprDef.EVar(tmp,null,e1);
					var pmin = p1;
					var pmax = null;
					var e1;
					if(e == null) {
						e1 = null;
					} else {
						if(pmin == null) {
							pmin = this.tokenMin;
						}
						if(pmax == null) {
							pmax = this.tokenMax;
						}
						e1 = { e : e, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
					}
					var e = this.mapCompr(tmp,a[0]);
					var e2 = hscript_ExprDef.EIdent(tmp);
					var pmin = p1;
					var pmax = null;
					var e3;
					if(e2 == null) {
						e3 = null;
					} else {
						if(pmin == null) {
							pmin = this.tokenMin;
						}
						if(pmax == null) {
							pmax = this.tokenMax;
						}
						e3 = { e : e2, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
					}
					var e2 = hscript_ExprDef.EBlock([e1,e,e3]);
					var pmin = p1;
					var pmax = null;
					var e;
					if(e2 == null) {
						e = null;
					} else {
						if(pmin == null) {
							pmin = this.tokenMin;
						}
						if(pmax == null) {
							pmax = this.tokenMax;
						}
						e = { e : e2, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
					}
					return this.parseExprNext(e);
				default:
				}
			}
			var e = hscript_ExprDef.EArrayDecl(a);
			var pmin = p1;
			var pmax = null;
			var tmp;
			if(e == null) {
				tmp = null;
			} else {
				if(pmin == null) {
					pmin = this.tokenMin;
				}
				if(pmax == null) {
					pmax = this.tokenMax;
				}
				tmp = { e : e, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
			}
			return this.parseExprNext(tmp);
		case 15:
			var id = tk.s;
			if(this.allowMetadata) {
				var args = this.parseMetaArgs();
				var e = hscript_ExprDef.EMeta(id,args,this.parseExpr());
				var pmin = p1;
				var pmax = null;
				if(e == null) {
					return null;
				} else {
					if(pmin == null) {
						pmin = this.tokenMin;
					}
					if(pmax == null) {
						pmax = this.tokenMax;
					}
					return { e : e, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
				}
			} else {
				return this.unexpected(tk);
			}
			break;
		default:
			return this.unexpected(tk);
		}
	}
	,parseLambda: function(args,pmin) {
		_hx_loop1: while(true) {
			var id = this.getIdent();
			var t = this.maybe(hscript_Token.TDoubleDot) ? this.parseType() : null;
			args.push({ name : id, t : t});
			var tk = this.token();
			switch(tk._hx_index) {
			case 5:
				break _hx_loop1;
			case 9:
				break;
			default:
				this.unexpected(tk);
				break _hx_loop1;
			}
		}
		var t = this.token();
		if(!Type.enumEq(t,hscript_Token.TOp("->"))) {
			this.unexpected(t);
		}
		var eret = this.parseExpr();
		var e = hscript_ExprDef.EReturn(eret);
		var pmin1 = pmin;
		var pmax = null;
		var e1;
		if(e == null) {
			e1 = null;
		} else {
			if(pmin1 == null) {
				pmin1 = this.tokenMin;
			}
			if(pmax == null) {
				pmax = this.tokenMax;
			}
			e1 = { e : e, pmin : pmin1, pmax : pmax, origin : this.origin, line : this.line};
		}
		var e = hscript_ExprDef.EFunction(args,e1);
		var pmin1 = pmin;
		var pmax = null;
		if(e == null) {
			return null;
		} else {
			if(pmin1 == null) {
				pmin1 = this.tokenMin;
			}
			if(pmax == null) {
				pmax = this.tokenMax;
			}
			return { e : e, pmin : pmin1, pmax : pmax, origin : this.origin, line : this.line};
		}
	}
	,parseMetaArgs: function() {
		var tk = this.token();
		if(tk != hscript_Token.TPOpen) {
			this.tokens.push({ t : tk, min : this.tokenMin, max : this.tokenMax});
			this.tokenMin = this.oldTokenMin;
			this.tokenMax = this.oldTokenMax;
			return null;
		}
		var args = [];
		tk = this.token();
		if(tk != hscript_Token.TPClose) {
			this.tokens.push({ t : tk, min : this.tokenMin, max : this.tokenMax});
			this.tokenMin = this.oldTokenMin;
			this.tokenMax = this.oldTokenMax;
			_hx_loop1: while(true) {
				args.push(this.parseExpr());
				var _g = this.token();
				switch(_g._hx_index) {
				case 5:
					break _hx_loop1;
				case 9:
					break;
				default:
					var tk = _g;
					this.unexpected(tk);
				}
			}
		}
		return args;
	}
	,mapCompr: function(tmp,e) {
		if(e == null) {
			return null;
		}
		var edef;
		var _g = e.e;
		switch(_g._hx_index) {
		case 3:
			var e2 = _g.e;
			edef = hscript_ExprDef.EParent(this.mapCompr(tmp,e2));
			break;
		case 4:
			var _g1 = _g.e;
			if(_g1.length == 1) {
				var e1 = _g1[0];
				edef = hscript_ExprDef.EBlock([this.mapCompr(tmp,e1)]);
			} else {
				var e1 = hscript_ExprDef.EIdent(tmp);
				var pmin = e == null ? 0 : e.pmin;
				var pmax = e == null ? 0 : e.pmax;
				var e2;
				if(e1 == null) {
					e2 = null;
				} else {
					if(pmin == null) {
						pmin = this.tokenMin;
					}
					if(pmax == null) {
						pmax = this.tokenMax;
					}
					e2 = { e : e1, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
				}
				var e1 = hscript_ExprDef.EField(e2,"push");
				var pmin = e == null ? 0 : e.pmin;
				var pmax = e == null ? 0 : e.pmax;
				var edef1;
				if(e1 == null) {
					edef1 = null;
				} else {
					if(pmin == null) {
						pmin = this.tokenMin;
					}
					if(pmax == null) {
						pmax = this.tokenMax;
					}
					edef1 = { e : e1, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
				}
				edef = hscript_ExprDef.ECall(edef1,[e]);
			}
			break;
		case 9:
			var cond = _g.cond;
			var e1 = _g.e1;
			var e2 = _g.e2;
			if(e2 == null) {
				edef = hscript_ExprDef.EIf(cond,this.mapCompr(tmp,e1),null);
			} else {
				var e1 = hscript_ExprDef.EIdent(tmp);
				var pmin = e == null ? 0 : e.pmin;
				var pmax = e == null ? 0 : e.pmax;
				var e2;
				if(e1 == null) {
					e2 = null;
				} else {
					if(pmin == null) {
						pmin = this.tokenMin;
					}
					if(pmax == null) {
						pmax = this.tokenMax;
					}
					e2 = { e : e1, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
				}
				var e1 = hscript_ExprDef.EField(e2,"push");
				var pmin = e == null ? 0 : e.pmin;
				var pmax = e == null ? 0 : e.pmax;
				var edef1;
				if(e1 == null) {
					edef1 = null;
				} else {
					if(pmin == null) {
						pmin = this.tokenMin;
					}
					if(pmax == null) {
						pmax = this.tokenMax;
					}
					edef1 = { e : e1, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
				}
				edef = hscript_ExprDef.ECall(edef1,[e]);
			}
			break;
		case 10:
			var cond = _g.cond;
			var e2 = _g.e;
			edef = hscript_ExprDef.EWhile(cond,this.mapCompr(tmp,e2));
			break;
		case 11:
			var v = _g.v;
			var it = _g.it;
			var e2 = _g.e;
			edef = hscript_ExprDef.EFor(v,it,this.mapCompr(tmp,e2));
			break;
		case 24:
			var cond = _g.cond;
			var e2 = _g.e;
			edef = hscript_ExprDef.EDoWhile(cond,this.mapCompr(tmp,e2));
			break;
		default:
			var e1 = hscript_ExprDef.EIdent(tmp);
			var pmin = e == null ? 0 : e.pmin;
			var pmax = e == null ? 0 : e.pmax;
			var e2;
			if(e1 == null) {
				e2 = null;
			} else {
				if(pmin == null) {
					pmin = this.tokenMin;
				}
				if(pmax == null) {
					pmax = this.tokenMax;
				}
				e2 = { e : e1, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
			}
			var e1 = hscript_ExprDef.EField(e2,"push");
			var pmin = e == null ? 0 : e.pmin;
			var pmax = e == null ? 0 : e.pmax;
			var edef1;
			if(e1 == null) {
				edef1 = null;
			} else {
				if(pmin == null) {
					pmin = this.tokenMin;
				}
				if(pmax == null) {
					pmax = this.tokenMax;
				}
				edef1 = { e : e1, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
			}
			edef = hscript_ExprDef.ECall(edef1,[e]);
		}
		var pmin = e == null ? 0 : e.pmin;
		var pmax = e == null ? 0 : e.pmax;
		if(edef == null) {
			return null;
		} else {
			if(pmin == null) {
				pmin = this.tokenMin;
			}
			if(pmax == null) {
				pmax = this.tokenMax;
			}
			return { e : edef, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
		}
	}
	,makeUnop: function(op,e) {
		if(e == null && this.resumeErrors) {
			return null;
		}
		var _g = e.e;
		switch(_g._hx_index) {
		case 6:
			var bop = _g.op;
			var e1 = _g.e1;
			var e2 = _g.e2;
			var e3 = hscript_ExprDef.EBinop(bop,this.makeUnop(op,e1),e2);
			var pmin = e1 == null ? 0 : e1.pmin;
			var pmax = e2 == null ? 0 : e2.pmax;
			if(e3 == null) {
				return null;
			} else {
				if(pmin == null) {
					pmin = this.tokenMin;
				}
				if(pmax == null) {
					pmax = this.tokenMax;
				}
				return { e : e3, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
			}
			break;
		case 22:
			var e1 = _g.cond;
			var e2 = _g.e1;
			var e3 = _g.e2;
			var e4 = hscript_ExprDef.ETernary(this.makeUnop(op,e1),e2,e3);
			var pmin = e1 == null ? 0 : e1.pmin;
			var pmax = e3 == null ? 0 : e3.pmax;
			if(e4 == null) {
				return null;
			} else {
				if(pmin == null) {
					pmin = this.tokenMin;
				}
				if(pmax == null) {
					pmax = this.tokenMax;
				}
				return { e : e4, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
			}
			break;
		default:
			var e1 = hscript_ExprDef.EUnop(op,true,e);
			var pmin = e == null ? 0 : e.pmin;
			var pmax = e == null ? 0 : e.pmax;
			if(e1 == null) {
				return null;
			} else {
				if(pmin == null) {
					pmin = this.tokenMin;
				}
				if(pmax == null) {
					pmax = this.tokenMax;
				}
				return { e : e1, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
			}
		}
	}
	,makeBinop: function(op,e1,e) {
		if(e == null && this.resumeErrors) {
			var e2 = hscript_ExprDef.EBinop(op,e1,e);
			var pmin = e1 == null ? 0 : e1.pmin;
			var pmax = e1 == null ? 0 : e1.pmax;
			if(e2 == null) {
				return null;
			} else {
				if(pmin == null) {
					pmin = this.tokenMin;
				}
				if(pmax == null) {
					pmax = this.tokenMax;
				}
				return { e : e2, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
			}
		}
		var _g = e.e;
		switch(_g._hx_index) {
		case 6:
			var op2 = _g.op;
			var e2 = _g.e1;
			var e3 = _g.e2;
			if(this.opPriority.h[op] <= this.opPriority.h[op2] && !Object.prototype.hasOwnProperty.call(this.opRightAssoc.h,op)) {
				var e4 = hscript_ExprDef.EBinop(op2,this.makeBinop(op,e1,e2),e3);
				var pmin = e1 == null ? 0 : e1.pmin;
				var pmax = e3 == null ? 0 : e3.pmax;
				if(e4 == null) {
					return null;
				} else {
					if(pmin == null) {
						pmin = this.tokenMin;
					}
					if(pmax == null) {
						pmax = this.tokenMax;
					}
					return { e : e4, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
				}
			} else {
				var e2 = hscript_ExprDef.EBinop(op,e1,e);
				var pmin = e1 == null ? 0 : e1.pmin;
				var pmax = e == null ? 0 : e.pmax;
				if(e2 == null) {
					return null;
				} else {
					if(pmin == null) {
						pmin = this.tokenMin;
					}
					if(pmax == null) {
						pmax = this.tokenMax;
					}
					return { e : e2, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
				}
			}
			break;
		case 22:
			var e2 = _g.cond;
			var e3 = _g.e1;
			var e4 = _g.e2;
			if(Object.prototype.hasOwnProperty.call(this.opRightAssoc.h,op)) {
				var e5 = hscript_ExprDef.EBinop(op,e1,e);
				var pmin = e1 == null ? 0 : e1.pmin;
				var pmax = e == null ? 0 : e.pmax;
				if(e5 == null) {
					return null;
				} else {
					if(pmin == null) {
						pmin = this.tokenMin;
					}
					if(pmax == null) {
						pmax = this.tokenMax;
					}
					return { e : e5, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
				}
			} else {
				var e5 = hscript_ExprDef.ETernary(this.makeBinop(op,e1,e2),e3,e4);
				var pmin = e1 == null ? 0 : e1.pmin;
				var pmax = e == null ? 0 : e.pmax;
				if(e5 == null) {
					return null;
				} else {
					if(pmin == null) {
						pmin = this.tokenMin;
					}
					if(pmax == null) {
						pmax = this.tokenMax;
					}
					return { e : e5, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
				}
			}
			break;
		default:
			var e2 = hscript_ExprDef.EBinop(op,e1,e);
			var pmin = e1 == null ? 0 : e1.pmin;
			var pmax = e == null ? 0 : e.pmax;
			if(e2 == null) {
				return null;
			} else {
				if(pmin == null) {
					pmin = this.tokenMin;
				}
				if(pmax == null) {
					pmax = this.tokenMax;
				}
				return { e : e2, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
			}
		}
	}
	,parseStructure: function(id) {
		var p1 = this.tokenMin;
		switch(id) {
		case "break":
			var e = hscript_ExprDef.EBreak;
			var pmin = null;
			var pmax = null;
			if(e == null) {
				return null;
			} else {
				if(pmin == null) {
					pmin = this.tokenMin;
				}
				if(pmax == null) {
					pmax = this.tokenMax;
				}
				return { e : e, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
			}
			break;
		case "continue":
			var e = hscript_ExprDef.EContinue;
			var pmin = null;
			var pmax = null;
			if(e == null) {
				return null;
			} else {
				if(pmin == null) {
					pmin = this.tokenMin;
				}
				if(pmax == null) {
					pmax = this.tokenMax;
				}
				return { e : e, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
			}
			break;
		case "do":
			var e = this.parseExpr();
			var tk = this.token();
			if(tk._hx_index == 2) {
				if(tk.s != "while") {
					this.unexpected(tk);
				}
			} else {
				this.unexpected(tk);
			}
			var econd = this.parseExpr();
			var e1 = hscript_ExprDef.EDoWhile(econd,e);
			var pmin = p1;
			var pmax = econd == null ? 0 : econd.pmax;
			if(e1 == null) {
				return null;
			} else {
				if(pmin == null) {
					pmin = this.tokenMin;
				}
				if(pmax == null) {
					pmax = this.tokenMax;
				}
				return { e : e1, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
			}
			break;
		case "else":
			return this.unexpected(hscript_Token.TId(id));
		case "for":
			var t = this.token();
			if(t != hscript_Token.TPOpen) {
				this.unexpected(t);
			}
			var vname = this.getIdent();
			var t = this.token();
			if(!Type.enumEq(t,hscript_Token.TId("in"))) {
				this.unexpected(t);
			}
			var eiter = this.parseExpr();
			var t = this.token();
			if(t != hscript_Token.TPClose) {
				this.unexpected(t);
			}
			var e = this.parseExpr();
			var e1 = hscript_ExprDef.EFor(vname,eiter,e);
			var pmin = p1;
			var pmax = e == null ? 0 : e.pmax;
			if(e1 == null) {
				return null;
			} else {
				if(pmin == null) {
					pmin = this.tokenMin;
				}
				if(pmax == null) {
					pmax = this.tokenMax;
				}
				return { e : e1, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
			}
			break;
		case "function":
			var tk = this.token();
			var name = null;
			if(tk._hx_index == 2) {
				var id = tk.s;
				name = id;
			} else {
				this.tokens.push({ t : tk, min : this.tokenMin, max : this.tokenMax});
				this.tokenMin = this.oldTokenMin;
				this.tokenMax = this.oldTokenMax;
			}
			var inf = this.parseFunctionDecl();
			var e = hscript_ExprDef.EFunction(inf.args,inf.body,name,inf.ret);
			var pmin = p1;
			var e1 = inf.body;
			var pmax = e1 == null ? 0 : e1.pmax;
			if(e == null) {
				return null;
			} else {
				if(pmin == null) {
					pmin = this.tokenMin;
				}
				if(pmax == null) {
					pmax = this.tokenMax;
				}
				return { e : e, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
			}
			break;
		case "if":
			var t = this.token();
			if(t != hscript_Token.TPOpen) {
				this.unexpected(t);
			}
			var cond = this.parseExpr();
			var t = this.token();
			if(t != hscript_Token.TPClose) {
				this.unexpected(t);
			}
			var e1 = this.parseExpr();
			var e2 = null;
			var semic = false;
			var tk = this.token();
			if(tk == hscript_Token.TSemicolon) {
				semic = true;
				tk = this.token();
			}
			if(Type.enumEq(tk,hscript_Token.TId("else"))) {
				e2 = this.parseExpr();
			} else {
				this.tokens.push({ t : tk, min : this.tokenMin, max : this.tokenMax});
				this.tokenMin = this.oldTokenMin;
				this.tokenMax = this.oldTokenMax;
				if(semic) {
					this.tokens.push({ t : hscript_Token.TSemicolon, min : this.tokenMin, max : this.tokenMax});
					this.tokenMin = this.oldTokenMin;
					this.tokenMax = this.oldTokenMax;
				}
			}
			var e = hscript_ExprDef.EIf(cond,e1,e2);
			var pmin = p1;
			var pmax = e2 == null ? this.tokenMax : e2 == null ? 0 : e2.pmax;
			if(e == null) {
				return null;
			} else {
				if(pmin == null) {
					pmin = this.tokenMin;
				}
				if(pmax == null) {
					pmax = this.tokenMax;
				}
				return { e : e, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
			}
			break;
		case "inline":
			if(!this.maybe(hscript_Token.TId("function"))) {
				this.unexpected(hscript_Token.TId("inline"));
			}
			return this.parseStructure("function");
		case "new":
			var a = [];
			a.push(this.getIdent());
			_hx_loop1: while(true) {
				var tk = this.token();
				switch(tk._hx_index) {
				case 4:
					break _hx_loop1;
				case 8:
					a.push(this.getIdent());
					break;
				default:
					this.unexpected(tk);
					break _hx_loop1;
				}
			}
			var args = this.parseExprList(hscript_Token.TPClose);
			var e = hscript_ExprDef.ENew(a.join("."),args);
			var pmin = p1;
			var pmax = null;
			if(e == null) {
				return null;
			} else {
				if(pmin == null) {
					pmin = this.tokenMin;
				}
				if(pmax == null) {
					pmax = this.tokenMax;
				}
				return { e : e, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
			}
			break;
		case "return":
			var tk = this.token();
			this.tokens.push({ t : tk, min : this.tokenMin, max : this.tokenMax});
			this.tokenMin = this.oldTokenMin;
			this.tokenMax = this.oldTokenMax;
			var e = tk == hscript_Token.TSemicolon ? null : this.parseExpr();
			var e1 = hscript_ExprDef.EReturn(e);
			var pmin = p1;
			var pmax = e == null ? this.tokenMax : e == null ? 0 : e.pmax;
			if(e1 == null) {
				return null;
			} else {
				if(pmin == null) {
					pmin = this.tokenMin;
				}
				if(pmax == null) {
					pmax = this.tokenMax;
				}
				return { e : e1, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
			}
			break;
		case "switch":
			var e = this.parseExpr();
			var def = null;
			var cases = [];
			var t = this.token();
			if(t != hscript_Token.TBrOpen) {
				this.unexpected(t);
			}
			_hx_loop2: while(true) {
				var tk = this.token();
				switch(tk._hx_index) {
				case 2:
					switch(tk.s) {
					case "case":
						var c = { values : [], expr : null};
						cases.push(c);
						_hx_loop3: while(true) {
							var e1 = this.parseExpr();
							c.values.push(e1);
							tk = this.token();
							switch(tk._hx_index) {
							case 9:
								break;
							case 14:
								break _hx_loop3;
							default:
								this.unexpected(tk);
								break _hx_loop3;
							}
						}
						var exprs = [];
						_hx_loop4: while(true) {
							tk = this.token();
							this.tokens.push({ t : tk, min : this.tokenMin, max : this.tokenMax});
							this.tokenMin = this.oldTokenMin;
							this.tokenMax = this.oldTokenMax;
							switch(tk._hx_index) {
							case 0:
								if(this.resumeErrors) {
									break _hx_loop4;
								} else {
									this.parseFullExpr(exprs);
								}
								break;
							case 2:
								switch(tk.s) {
								case "case":case "default":
									break _hx_loop4;
								default:
									this.parseFullExpr(exprs);
								}
								break;
							case 7:
								break _hx_loop4;
							default:
								this.parseFullExpr(exprs);
							}
						}
						var tmp;
						if(exprs.length == 1) {
							tmp = exprs[0];
						} else if(exprs.length == 0) {
							var e2 = hscript_ExprDef.EBlock([]);
							var pmin = this.tokenMin;
							var pmax = this.tokenMin;
							if(e2 == null) {
								tmp = null;
							} else {
								if(pmin == null) {
									pmin = this.tokenMin;
								}
								if(pmax == null) {
									pmax = this.tokenMax;
								}
								tmp = { e : e2, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
							}
						} else {
							var e3 = hscript_ExprDef.EBlock(exprs);
							var e4 = exprs[0];
							var pmin1 = e4 == null ? 0 : e4.pmin;
							var e5 = exprs[exprs.length - 1];
							var pmax1 = e5 == null ? 0 : e5.pmax;
							if(e3 == null) {
								tmp = null;
							} else {
								if(pmin1 == null) {
									pmin1 = this.tokenMin;
								}
								if(pmax1 == null) {
									pmax1 = this.tokenMax;
								}
								tmp = { e : e3, pmin : pmin1, pmax : pmax1, origin : this.origin, line : this.line};
							}
						}
						c.expr = tmp;
						break;
					case "default":
						if(def != null) {
							this.unexpected(tk);
						}
						var t = this.token();
						if(t != hscript_Token.TDoubleDot) {
							this.unexpected(t);
						}
						var exprs1 = [];
						_hx_loop5: while(true) {
							tk = this.token();
							this.tokens.push({ t : tk, min : this.tokenMin, max : this.tokenMax});
							this.tokenMin = this.oldTokenMin;
							this.tokenMax = this.oldTokenMax;
							switch(tk._hx_index) {
							case 0:
								if(this.resumeErrors) {
									break _hx_loop5;
								} else {
									this.parseFullExpr(exprs1);
								}
								break;
							case 2:
								switch(tk.s) {
								case "case":case "default":
									break _hx_loop5;
								default:
									this.parseFullExpr(exprs1);
								}
								break;
							case 7:
								break _hx_loop5;
							default:
								this.parseFullExpr(exprs1);
							}
						}
						if(exprs1.length == 1) {
							def = exprs1[0];
						} else if(exprs1.length == 0) {
							var e6 = hscript_ExprDef.EBlock([]);
							var pmin2 = this.tokenMin;
							var pmax2 = this.tokenMin;
							if(e6 == null) {
								def = null;
							} else {
								if(pmin2 == null) {
									pmin2 = this.tokenMin;
								}
								if(pmax2 == null) {
									pmax2 = this.tokenMax;
								}
								def = { e : e6, pmin : pmin2, pmax : pmax2, origin : this.origin, line : this.line};
							}
						} else {
							var e7 = hscript_ExprDef.EBlock(exprs1);
							var e8 = exprs1[0];
							var pmin3 = e8 == null ? 0 : e8.pmin;
							var e9 = exprs1[exprs1.length - 1];
							var pmax3 = e9 == null ? 0 : e9.pmax;
							if(e7 == null) {
								def = null;
							} else {
								if(pmin3 == null) {
									pmin3 = this.tokenMin;
								}
								if(pmax3 == null) {
									pmax3 = this.tokenMax;
								}
								def = { e : e7, pmin : pmin3, pmax : pmax3, origin : this.origin, line : this.line};
							}
						}
						break;
					default:
						this.unexpected(tk);
						break _hx_loop2;
					}
					break;
				case 7:
					break _hx_loop2;
				default:
					this.unexpected(tk);
					break _hx_loop2;
				}
			}
			var e1 = hscript_ExprDef.ESwitch(e,cases,def);
			var pmin = p1;
			var pmax = this.tokenMax;
			if(e1 == null) {
				return null;
			} else {
				if(pmin == null) {
					pmin = this.tokenMin;
				}
				if(pmax == null) {
					pmax = this.tokenMax;
				}
				return { e : e1, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
			}
			break;
		case "throw":
			var e = this.parseExpr();
			var e1 = hscript_ExprDef.EThrow(e);
			var pmin = p1;
			var pmax = e == null ? 0 : e.pmax;
			if(e1 == null) {
				return null;
			} else {
				if(pmin == null) {
					pmin = this.tokenMin;
				}
				if(pmax == null) {
					pmax = this.tokenMax;
				}
				return { e : e1, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
			}
			break;
		case "try":
			var e = this.parseExpr();
			var t = this.token();
			if(!Type.enumEq(t,hscript_Token.TId("catch"))) {
				this.unexpected(t);
			}
			var t = this.token();
			if(t != hscript_Token.TPOpen) {
				this.unexpected(t);
			}
			var vname = this.getIdent();
			var t = this.token();
			if(t != hscript_Token.TDoubleDot) {
				this.unexpected(t);
			}
			var t = null;
			if(this.allowTypes) {
				t = this.parseType();
			} else {
				var t1 = this.token();
				if(!Type.enumEq(t1,hscript_Token.TId("Dynamic"))) {
					this.unexpected(t1);
				}
			}
			var t1 = this.token();
			if(t1 != hscript_Token.TPClose) {
				this.unexpected(t1);
			}
			var ec = this.parseExpr();
			var e1 = hscript_ExprDef.ETry(e,vname,t,ec);
			var pmin = p1;
			var pmax = ec == null ? 0 : ec.pmax;
			if(e1 == null) {
				return null;
			} else {
				if(pmin == null) {
					pmin = this.tokenMin;
				}
				if(pmax == null) {
					pmax = this.tokenMax;
				}
				return { e : e1, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
			}
			break;
		case "var":
			var ident = this.getIdent();
			var tk = this.token();
			var t = null;
			if(tk == hscript_Token.TDoubleDot && this.allowTypes) {
				t = this.parseType();
				tk = this.token();
			}
			var e = null;
			if(Type.enumEq(tk,hscript_Token.TOp("="))) {
				e = this.parseExpr();
			} else {
				this.tokens.push({ t : tk, min : this.tokenMin, max : this.tokenMax});
				this.tokenMin = this.oldTokenMin;
				this.tokenMax = this.oldTokenMax;
			}
			var e1 = hscript_ExprDef.EVar(ident,t,e);
			var pmin = p1;
			var pmax = e == null ? this.tokenMax : e == null ? 0 : e.pmax;
			if(e1 == null) {
				return null;
			} else {
				if(pmin == null) {
					pmin = this.tokenMin;
				}
				if(pmax == null) {
					pmax = this.tokenMax;
				}
				return { e : e1, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
			}
			break;
		case "while":
			var econd = this.parseExpr();
			var e = this.parseExpr();
			var e1 = hscript_ExprDef.EWhile(econd,e);
			var pmin = p1;
			var pmax = e == null ? 0 : e.pmax;
			if(e1 == null) {
				return null;
			} else {
				if(pmin == null) {
					pmin = this.tokenMin;
				}
				if(pmax == null) {
					pmax = this.tokenMax;
				}
				return { e : e1, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
			}
			break;
		default:
			return null;
		}
	}
	,parseExprNext: function(e1) {
		var tk = this.token();
		switch(tk._hx_index) {
		case 3:
			var op = tk.s;
			if(op == "->") {
				var _g = e1.e;
				switch(_g._hx_index) {
				case 1:
					var i = _g.v;
					var eret = this.parseExpr();
					var e = hscript_ExprDef.EReturn(eret);
					var pmin = eret == null ? 0 : eret.pmin;
					var pmax = null;
					var e2;
					if(e == null) {
						e2 = null;
					} else {
						if(pmin == null) {
							pmin = this.tokenMin;
						}
						if(pmax == null) {
							pmax = this.tokenMax;
						}
						e2 = { e : e, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
					}
					var e = hscript_ExprDef.EFunction([{ name : i}],e2);
					var pmin = e1 == null ? 0 : e1.pmin;
					var pmax = null;
					if(e == null) {
						return null;
					} else {
						if(pmin == null) {
							pmin = this.tokenMin;
						}
						if(pmax == null) {
							pmax = this.tokenMax;
						}
						return { e : e, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
					}
					break;
				case 3:
					var _hx_tmp = _g.e.e;
					if(_hx_tmp._hx_index == 1) {
						var i = _hx_tmp.v;
						var eret = this.parseExpr();
						var e = hscript_ExprDef.EReturn(eret);
						var pmin = eret == null ? 0 : eret.pmin;
						var pmax = null;
						var e2;
						if(e == null) {
							e2 = null;
						} else {
							if(pmin == null) {
								pmin = this.tokenMin;
							}
							if(pmax == null) {
								pmax = this.tokenMax;
							}
							e2 = { e : e, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
						}
						var e = hscript_ExprDef.EFunction([{ name : i}],e2);
						var pmin = e1 == null ? 0 : e1.pmin;
						var pmax = null;
						if(e == null) {
							return null;
						} else {
							if(pmin == null) {
								pmin = this.tokenMin;
							}
							if(pmax == null) {
								pmax = this.tokenMax;
							}
							return { e : e, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
						}
					}
					break;
				case 26:
					var _hx_tmp = _g.e.e;
					if(_hx_tmp._hx_index == 1) {
						var i = _hx_tmp.v;
						var t = _g.t;
						var eret = this.parseExpr();
						var e = hscript_ExprDef.EReturn(eret);
						var pmin = eret == null ? 0 : eret.pmin;
						var pmax = null;
						var e2;
						if(e == null) {
							e2 = null;
						} else {
							if(pmin == null) {
								pmin = this.tokenMin;
							}
							if(pmax == null) {
								pmax = this.tokenMax;
							}
							e2 = { e : e, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
						}
						var e = hscript_ExprDef.EFunction([{ name : i, t : t}],e2);
						var pmin = e1 == null ? 0 : e1.pmin;
						var pmax = null;
						if(e == null) {
							return null;
						} else {
							if(pmin == null) {
								pmin = this.tokenMin;
							}
							if(pmax == null) {
								pmax = this.tokenMax;
							}
							return { e : e, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
						}
					}
					break;
				default:
				}
				this.unexpected(tk);
			}
			if(this.unops.h[op]) {
				var tmp;
				if(!this.isBlock(e1)) {
					var _g = e1.e;
					if(_g._hx_index == 3) {
						var _g1 = _g.e;
						tmp = true;
					} else {
						tmp = false;
					}
				} else {
					tmp = true;
				}
				if(tmp) {
					this.tokens.push({ t : tk, min : this.tokenMin, max : this.tokenMax});
					this.tokenMin = this.oldTokenMin;
					this.tokenMax = this.oldTokenMax;
					return e1;
				}
				var e = hscript_ExprDef.EUnop(op,false,e1);
				var pmin = e1 == null ? 0 : e1.pmin;
				var pmax = null;
				var tmp;
				if(e == null) {
					tmp = null;
				} else {
					if(pmin == null) {
						pmin = this.tokenMin;
					}
					if(pmax == null) {
						pmax = this.tokenMax;
					}
					tmp = { e : e, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
				}
				return this.parseExprNext(tmp);
			}
			return this.makeBinop(op,e1,this.parseExpr());
		case 4:
			var e = hscript_ExprDef.ECall(e1,this.parseExprList(hscript_Token.TPClose));
			var pmin = e1 == null ? 0 : e1.pmin;
			var pmax = null;
			var tmp;
			if(e == null) {
				tmp = null;
			} else {
				if(pmin == null) {
					pmin = this.tokenMin;
				}
				if(pmax == null) {
					pmax = this.tokenMax;
				}
				tmp = { e : e, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
			}
			return this.parseExprNext(tmp);
		case 8:
			var field = this.getIdent();
			var e = hscript_ExprDef.EField(e1,field);
			var pmin = e1 == null ? 0 : e1.pmin;
			var pmax = null;
			var tmp;
			if(e == null) {
				tmp = null;
			} else {
				if(pmin == null) {
					pmin = this.tokenMin;
				}
				if(pmax == null) {
					pmax = this.tokenMax;
				}
				tmp = { e : e, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
			}
			return this.parseExprNext(tmp);
		case 11:
			var e2 = this.parseExpr();
			var t = this.token();
			if(t != hscript_Token.TBkClose) {
				this.unexpected(t);
			}
			var e = hscript_ExprDef.EArray(e1,e2);
			var pmin = e1 == null ? 0 : e1.pmin;
			var pmax = null;
			var tmp;
			if(e == null) {
				tmp = null;
			} else {
				if(pmin == null) {
					pmin = this.tokenMin;
				}
				if(pmax == null) {
					pmax = this.tokenMax;
				}
				tmp = { e : e, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
			}
			return this.parseExprNext(tmp);
		case 13:
			var e2 = this.parseExpr();
			var t = this.token();
			if(t != hscript_Token.TDoubleDot) {
				this.unexpected(t);
			}
			var e3 = this.parseExpr();
			var e = hscript_ExprDef.ETernary(e1,e2,e3);
			var pmin = e1 == null ? 0 : e1.pmin;
			var pmax = e3 == null ? 0 : e3.pmax;
			if(e == null) {
				return null;
			} else {
				if(pmin == null) {
					pmin = this.tokenMin;
				}
				if(pmax == null) {
					pmax = this.tokenMax;
				}
				return { e : e, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
			}
			break;
		default:
			this.tokens.push({ t : tk, min : this.tokenMin, max : this.tokenMax});
			this.tokenMin = this.oldTokenMin;
			this.tokenMax = this.oldTokenMax;
			return e1;
		}
	}
	,parseFunctionArgs: function() {
		var args = [];
		var tk = this.token();
		if(tk != hscript_Token.TPClose) {
			var done = false;
			while(!done) {
				var name = null;
				var opt = false;
				if(tk._hx_index == 13) {
					opt = true;
					tk = this.token();
				}
				if(tk._hx_index == 2) {
					var id = tk.s;
					name = id;
				} else {
					this.unexpected(tk);
					break;
				}
				var arg = { name : name};
				args.push(arg);
				if(opt) {
					arg.opt = true;
				}
				if(this.allowTypes) {
					if(this.maybe(hscript_Token.TDoubleDot)) {
						arg.t = this.parseType();
					}
					if(this.maybe(hscript_Token.TOp("="))) {
						arg.value = this.parseExpr();
					}
				}
				tk = this.token();
				switch(tk._hx_index) {
				case 5:
					done = true;
					break;
				case 9:
					tk = this.token();
					break;
				default:
					this.unexpected(tk);
				}
			}
		}
		return args;
	}
	,parseFunctionDecl: function() {
		var t = this.token();
		if(t != hscript_Token.TPOpen) {
			this.unexpected(t);
		}
		var args = this.parseFunctionArgs();
		var ret = null;
		if(this.allowTypes) {
			var tk = this.token();
			if(tk != hscript_Token.TDoubleDot) {
				this.tokens.push({ t : tk, min : this.tokenMin, max : this.tokenMax});
				this.tokenMin = this.oldTokenMin;
				this.tokenMax = this.oldTokenMax;
			} else {
				ret = this.parseType();
			}
		}
		return { args : args, ret : ret, body : this.parseExpr()};
	}
	,parsePath: function() {
		var path = [this.getIdent()];
		while(true) {
			var t = this.token();
			if(t != hscript_Token.TDot) {
				this.tokens.push({ t : t, min : this.tokenMin, max : this.tokenMax});
				this.tokenMin = this.oldTokenMin;
				this.tokenMax = this.oldTokenMax;
				break;
			}
			path.push(this.getIdent());
		}
		return path;
	}
	,parseType: function() {
		var _gthis = this;
		var t = this.token();
		switch(t._hx_index) {
		case 2:
			var v = t.s;
			this.tokens.push({ t : t, min : this.tokenMin, max : this.tokenMax});
			this.tokenMin = this.oldTokenMin;
			this.tokenMax = this.oldTokenMax;
			var path = this.parsePath();
			var params = null;
			t = this.token();
			if(t._hx_index == 3) {
				var op = t.s;
				if(op == "<") {
					params = [];
					_hx_loop1: while(true) {
						params.push(this.parseType());
						t = this.token();
						switch(t._hx_index) {
						case 3:
							var op = t.s;
							if(op == ">") {
								break _hx_loop1;
							}
							if(HxOverrides.cca(op,0) == 62) {
								this.tokens.add({ t : hscript_Token.TOp(HxOverrides.substr(op,1,null)), min : this.tokenMax - op.length - 1, max : this.tokenMax});
								break _hx_loop1;
							}
							break;
						case 9:
							continue;
						default:
						}
						this.unexpected(t);
						break;
					}
				} else {
					this.tokens.push({ t : t, min : this.tokenMin, max : this.tokenMax});
					this.tokenMin = this.oldTokenMin;
					this.tokenMax = this.oldTokenMax;
				}
			} else {
				this.tokens.push({ t : t, min : this.tokenMin, max : this.tokenMax});
				this.tokenMin = this.oldTokenMin;
				this.tokenMax = this.oldTokenMax;
			}
			return this.parseTypeNext(hscript_CType.CTPath(path,params));
		case 4:
			var a = this.token();
			var b = this.token();
			this.tokens.push({ t : b, min : this.tokenMin, max : this.tokenMax});
			this.tokenMin = this.oldTokenMin;
			this.tokenMax = this.oldTokenMax;
			this.tokens.push({ t : a, min : this.tokenMin, max : this.tokenMax});
			this.tokenMin = this.oldTokenMin;
			this.tokenMax = this.oldTokenMax;
			var withReturn = function(args) {
				var _g = _gthis.token();
				if(_g._hx_index == 3) {
					if(_g.s != "->") {
						var t = _g;
						_gthis.unexpected(t);
					}
				} else {
					var t = _g;
					_gthis.unexpected(t);
				}
				return hscript_CType.CTFun(args,_gthis.parseType());
			};
			switch(a._hx_index) {
			case 2:
				var _g = a.s;
				if(b._hx_index == 14) {
					var _g = [];
					var _g1 = 0;
					var _g2 = this.parseFunctionArgs();
					while(_g1 < _g2.length) {
						var arg = _g2[_g1];
						++_g1;
						var _g3 = arg.value;
						if(_g3 != null) {
							var v = _g3;
							if(!this.resumeErrors) {
								throw haxe_Exception.thrown(new hscript_Error(hscript_ErrorDef.ECustom("Default values not allowed in function types"),v.pmin,v.pmax,this.origin,this.line));
							}
						}
						_g.push(hscript_CType.CTNamed(arg.name,arg.opt ? hscript_CType.CTOpt(arg.t) : arg.t));
					}
					var args = _g;
					return withReturn(args);
				} else {
					var t1 = this.parseType();
					var _g = this.token();
					switch(_g._hx_index) {
					case 5:
						return this.parseTypeNext(hscript_CType.CTParent(t1));
					case 9:
						var args = [t1];
						while(true) {
							args.push(this.parseType());
							if(!this.maybe(hscript_Token.TComma)) {
								break;
							}
						}
						var t1 = this.token();
						if(t1 != hscript_Token.TPClose) {
							this.unexpected(t1);
						}
						return withReturn(args);
					default:
						var t1 = _g;
						return this.unexpected(t1);
					}
				}
				break;
			case 5:
				var _g = [];
				var _g1 = 0;
				var _g2 = this.parseFunctionArgs();
				while(_g1 < _g2.length) {
					var arg = _g2[_g1];
					++_g1;
					var _g3 = arg.value;
					if(_g3 != null) {
						var v = _g3;
						if(!this.resumeErrors) {
							throw haxe_Exception.thrown(new hscript_Error(hscript_ErrorDef.ECustom("Default values not allowed in function types"),v.pmin,v.pmax,this.origin,this.line));
						}
					}
					_g.push(hscript_CType.CTNamed(arg.name,arg.opt ? hscript_CType.CTOpt(arg.t) : arg.t));
				}
				var args = _g;
				return withReturn(args);
			default:
				var t1 = this.parseType();
				var _g = this.token();
				switch(_g._hx_index) {
				case 5:
					return this.parseTypeNext(hscript_CType.CTParent(t1));
				case 9:
					var args = [t1];
					while(true) {
						args.push(this.parseType());
						if(!this.maybe(hscript_Token.TComma)) {
							break;
						}
					}
					var t1 = this.token();
					if(t1 != hscript_Token.TPClose) {
						this.unexpected(t1);
					}
					return withReturn(args);
				default:
					var t1 = _g;
					return this.unexpected(t1);
				}
			}
			break;
		case 6:
			var fields = [];
			var meta = null;
			_hx_loop6: while(true) {
				t = this.token();
				switch(t._hx_index) {
				case 2:
					var _g = t.s;
					if(_g == "var") {
						var name = this.getIdent();
						var t1 = this.token();
						if(t1 != hscript_Token.TDoubleDot) {
							this.unexpected(t1);
						}
						fields.push({ name : name, t : this.parseType(), meta : meta});
						meta = null;
						var t2 = this.token();
						if(t2 != hscript_Token.TSemicolon) {
							this.unexpected(t2);
						}
					} else {
						var name1 = _g;
						var t3 = this.token();
						if(t3 != hscript_Token.TDoubleDot) {
							this.unexpected(t3);
						}
						fields.push({ name : name1, t : this.parseType(), meta : meta});
						t = this.token();
						switch(t._hx_index) {
						case 7:
							break _hx_loop6;
						case 9:
							break;
						default:
							this.unexpected(t);
						}
					}
					break;
				case 7:
					break _hx_loop6;
				case 15:
					var name2 = t.s;
					if(meta == null) {
						meta = [];
					}
					meta.push({ name : name2, params : this.parseMetaArgs()});
					break;
				default:
					this.unexpected(t);
					break _hx_loop6;
				}
			}
			return this.parseTypeNext(hscript_CType.CTAnon(fields));
		default:
			return this.unexpected(t);
		}
	}
	,parseTypeNext: function(t) {
		var tk = this.token();
		if(tk._hx_index == 3) {
			var op = tk.s;
			if(op != "->") {
				this.tokens.push({ t : tk, min : this.tokenMin, max : this.tokenMax});
				this.tokenMin = this.oldTokenMin;
				this.tokenMax = this.oldTokenMax;
				return t;
			}
		} else {
			this.tokens.push({ t : tk, min : this.tokenMin, max : this.tokenMax});
			this.tokenMin = this.oldTokenMin;
			this.tokenMax = this.oldTokenMax;
			return t;
		}
		var t2 = this.parseType();
		if(t2._hx_index == 1) {
			var _g = t2.ret;
			var args = t2.args;
			args.unshift(t);
			return t2;
		} else {
			return hscript_CType.CTFun([t],t2);
		}
	}
	,parseExprList: function(etk) {
		var args = [];
		var tk = this.token();
		if(tk == etk) {
			return args;
		}
		this.tokens.push({ t : tk, min : this.tokenMin, max : this.tokenMax});
		this.tokenMin = this.oldTokenMin;
		this.tokenMax = this.oldTokenMax;
		while(true) {
			args.push(this.parseExpr());
			tk = this.token();
			if(tk._hx_index != 9) {
				if(tk == etk) {
					break;
				}
				this.unexpected(tk);
				break;
			}
		}
		return args;
	}
	,parseModule: function(content,origin) {
		if(origin == null) {
			origin = "hscript";
		}
		this.initParser(origin);
		this.input = content;
		this.readPos = 0;
		this.allowTypes = true;
		this.allowMetadata = true;
		var decls = [];
		while(true) {
			var tk = this.token();
			if(tk == hscript_Token.TEof) {
				break;
			}
			this.tokens.push({ t : tk, min : this.tokenMin, max : this.tokenMax});
			this.tokenMin = this.oldTokenMin;
			this.tokenMax = this.oldTokenMax;
			decls.push(this.parseModuleDecl());
		}
		return decls;
	}
	,parseMetadata: function() {
		var meta = [];
		while(true) {
			var tk = this.token();
			if(tk._hx_index == 15) {
				var name = tk.s;
				meta.push({ name : name, params : this.parseMetaArgs()});
			} else {
				this.tokens.push({ t : tk, min : this.tokenMin, max : this.tokenMax});
				this.tokenMin = this.oldTokenMin;
				this.tokenMax = this.oldTokenMax;
				break;
			}
		}
		return meta;
	}
	,parseParams: function() {
		if(this.maybe(hscript_Token.TOp("<"))) {
			if(!this.resumeErrors) {
				throw haxe_Exception.thrown(new hscript_Error(hscript_ErrorDef.EInvalidOp("Unsupported class type parameters"),this.readPos,this.readPos,this.origin,this.line));
			}
		}
		return { };
	}
	,parseModuleDecl: function() {
		var meta = this.parseMetadata();
		var ident = this.getIdent();
		var isPrivate = false;
		var isExtern = false;
		_hx_loop1: while(true) {
			switch(ident) {
			case "extern":
				isExtern = true;
				break;
			case "private":
				isPrivate = true;
				break;
			default:
				break _hx_loop1;
			}
			ident = this.getIdent();
		}
		switch(ident) {
		case "class":
			var name = this.getIdent();
			var params = this.parseParams();
			var extend = null;
			var implement = [];
			_hx_loop2: while(true) {
				var t = this.token();
				if(t._hx_index == 2) {
					switch(t.s) {
					case "extends":
						extend = this.parseType();
						break;
					case "implements":
						implement.push(this.parseType());
						break;
					default:
						this.tokens.push({ t : t, min : this.tokenMin, max : this.tokenMax});
						this.tokenMin = this.oldTokenMin;
						this.tokenMax = this.oldTokenMax;
						break _hx_loop2;
					}
				} else {
					this.tokens.push({ t : t, min : this.tokenMin, max : this.tokenMax});
					this.tokenMin = this.oldTokenMin;
					this.tokenMax = this.oldTokenMax;
					break;
				}
			}
			var fields = [];
			var t = this.token();
			if(t != hscript_Token.TBrOpen) {
				this.unexpected(t);
			}
			while(!this.maybe(hscript_Token.TBrClose)) fields.push(this.parseField());
			return hscript_ModuleDecl.DClass({ name : name, meta : meta, params : params, extend : extend, implement : implement, fields : fields, isPrivate : isPrivate, isExtern : isExtern});
		case "import":
			var path = [this.getIdent()];
			var star = false;
			while(true) {
				var t = this.token();
				if(t != hscript_Token.TDot) {
					this.tokens.push({ t : t, min : this.tokenMin, max : this.tokenMax});
					this.tokenMin = this.oldTokenMin;
					this.tokenMax = this.oldTokenMax;
					break;
				}
				t = this.token();
				switch(t._hx_index) {
				case 2:
					var id = t.s;
					path.push(id);
					break;
				case 3:
					if(t.s == "*") {
						star = true;
					} else {
						this.unexpected(t);
					}
					break;
				default:
					this.unexpected(t);
				}
			}
			var t = this.token();
			if(t != hscript_Token.TSemicolon) {
				this.unexpected(t);
			}
			return hscript_ModuleDecl.DImport(path,star);
		case "package":
			var path = this.parsePath();
			var t = this.token();
			if(t != hscript_Token.TSemicolon) {
				this.unexpected(t);
			}
			return hscript_ModuleDecl.DPackage(path);
		case "typedef":
			var name = this.getIdent();
			var params = this.parseParams();
			var t = this.token();
			if(!Type.enumEq(t,hscript_Token.TOp("="))) {
				this.unexpected(t);
			}
			var t = this.parseType();
			return hscript_ModuleDecl.DTypedef({ name : name, meta : meta, params : params, isPrivate : isPrivate, t : t});
		default:
			this.unexpected(hscript_Token.TId(ident));
		}
		return null;
	}
	,parseField: function() {
		var meta = this.parseMetadata();
		var access = [];
		_hx_loop1: while(true) {
			var id = this.getIdent();
			switch(id) {
			case "function":
				var name = this.getIdent();
				var inf = this.parseFunctionDecl();
				return { name : name, meta : meta, access : access, kind : hscript_FieldKind.KFunction({ args : inf.args, expr : inf.body, ret : inf.ret})};
			case "inline":
				access.push(hscript_FieldAccess.AInline);
				break;
			case "macro":
				access.push(hscript_FieldAccess.AMacro);
				break;
			case "override":
				access.push(hscript_FieldAccess.AOverride);
				break;
			case "private":
				access.push(hscript_FieldAccess.APrivate);
				break;
			case "public":
				access.push(hscript_FieldAccess.APublic);
				break;
			case "static":
				access.push(hscript_FieldAccess.AStatic);
				break;
			case "var":
				var name1 = this.getIdent();
				var get = null;
				var set = null;
				if(this.maybe(hscript_Token.TPOpen)) {
					get = this.getIdent();
					var t = this.token();
					if(t != hscript_Token.TComma) {
						this.unexpected(t);
					}
					set = this.getIdent();
					var t1 = this.token();
					if(t1 != hscript_Token.TPClose) {
						this.unexpected(t1);
					}
				}
				var type = this.maybe(hscript_Token.TDoubleDot) ? this.parseType() : null;
				var expr = this.maybe(hscript_Token.TOp("=")) ? this.parseExpr() : null;
				if(expr != null) {
					if(this.isBlock(expr)) {
						this.maybe(hscript_Token.TSemicolon);
					} else {
						var t2 = this.token();
						if(t2 != hscript_Token.TSemicolon) {
							this.unexpected(t2);
						}
					}
				} else {
					var tmp;
					if(type != null) {
						if(type == null) {
							tmp = false;
						} else if(type._hx_index == 2) {
							var _g = type.fields;
							tmp = true;
						} else {
							tmp = false;
						}
					} else {
						tmp = false;
					}
					if(tmp) {
						this.maybe(hscript_Token.TSemicolon);
					} else {
						var t3 = this.token();
						if(t3 != hscript_Token.TSemicolon) {
							this.unexpected(t3);
						}
					}
				}
				return { name : name1, meta : meta, access : access, kind : hscript_FieldKind.KVar({ get : get, set : set, type : type, expr : expr})};
			default:
				this.unexpected(hscript_Token.TId(id));
				break _hx_loop1;
			}
		}
		return null;
	}
	,readChar: function() {
		return this.input.charCodeAt(this.readPos++);
	}
	,readString: function(until) {
		var c = 0;
		var b_b = "";
		var esc = false;
		var old = this.line;
		var s = this.input;
		var p1 = this.readPos - 1;
		while(true) {
			var c = this.input.charCodeAt(this.readPos++);
			if(c != c) {
				this.line = old;
				if(!this.resumeErrors) {
					throw haxe_Exception.thrown(new hscript_Error(hscript_ErrorDef.EUnterminatedString,p1,p1,this.origin,this.line));
				}
				break;
			}
			if(esc) {
				esc = false;
				switch(c) {
				case 34:case 39:case 92:
					b_b += String.fromCodePoint(c);
					break;
				case 47:
					if(this.allowJSON) {
						b_b += String.fromCodePoint(c);
					} else {
						this.invalidChar(c);
					}
					break;
				case 110:
					b_b += String.fromCodePoint(10);
					break;
				case 114:
					b_b += String.fromCodePoint(13);
					break;
				case 116:
					b_b += String.fromCodePoint(9);
					break;
				case 117:
					if(!this.allowJSON) {
						this.invalidChar(c);
					}
					var k = 0;
					var _g = 0;
					while(_g < 4) {
						var i = _g++;
						k <<= 4;
						var char = this.input.charCodeAt(this.readPos++);
						switch(char) {
						case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
							k += char - 48;
							break;
						case 65:case 66:case 67:case 68:case 69:case 70:
							k += char - 55;
							break;
						case 97:case 98:case 99:case 100:case 101:case 102:
							k += char - 87;
							break;
						default:
							if(char != char) {
								this.line = old;
								if(!this.resumeErrors) {
									throw haxe_Exception.thrown(new hscript_Error(hscript_ErrorDef.EUnterminatedString,p1,p1,this.origin,this.line));
								}
							}
							this.invalidChar(char);
						}
					}
					b_b += String.fromCodePoint(k);
					break;
				default:
					this.invalidChar(c);
				}
			} else if(c == 92) {
				esc = true;
			} else if(c == until) {
				break;
			} else {
				if(c == 10) {
					this.line++;
				}
				b_b += String.fromCodePoint(c);
			}
		}
		return b_b;
	}
	,token: function() {
		var t = this.tokens.pop();
		if(t != null) {
			this.tokenMin = t.min;
			this.tokenMax = t.max;
			return t.t;
		}
		this.oldTokenMin = this.tokenMin;
		this.oldTokenMax = this.tokenMax;
		this.tokenMin = this.char < 0 ? this.readPos : this.readPos - 1;
		var t = this._token();
		this.tokenMax = this.char < 0 ? this.readPos - 1 : this.readPos - 2;
		return t;
	}
	,_token: function() {
		var char;
		if(this.char < 0) {
			char = this.input.charCodeAt(this.readPos++);
		} else {
			char = this.char;
			this.char = -1;
		}
		while(true) {
			if(char != char) {
				this.char = char;
				return hscript_Token.TEof;
			}
			switch(char) {
			case 0:
				return hscript_Token.TEof;
			case 10:
				this.line++;
				this.tokenMin++;
				break;
			case 9:case 13:case 32:
				this.tokenMin++;
				break;
			case 35:
				char = this.input.charCodeAt(this.readPos++);
				if(this.idents[char]) {
					var id = String.fromCodePoint(char);
					while(true) {
						char = this.input.charCodeAt(this.readPos++);
						if(!this.idents[char]) {
							this.char = char;
							return this.preprocess(id);
						}
						id += String.fromCodePoint(char);
					}
				}
				this.invalidChar(char);
				break;
			case 34:case 39:
				return hscript_Token.TConst(hscript_Const.CString(this.readString(char)));
			case 40:
				return hscript_Token.TPOpen;
			case 41:
				return hscript_Token.TPClose;
			case 44:
				return hscript_Token.TComma;
			case 46:
				char = this.input.charCodeAt(this.readPos++);
				switch(char) {
				case 46:
					char = this.input.charCodeAt(this.readPos++);
					if(char != 46) {
						this.invalidChar(char);
					}
					return hscript_Token.TOp("...");
				case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
					var n = char - 48;
					var exp = 1;
					while(true) {
						char = this.input.charCodeAt(this.readPos++);
						exp *= 10;
						switch(char) {
						case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
							n = n * 10 + (char - 48);
							break;
						default:
							this.char = char;
							return hscript_Token.TConst(hscript_Const.CFloat(n / exp));
						}
					}
					break;
				default:
					this.char = char;
					return hscript_Token.TDot;
				}
				break;
			case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
				var n1 = (char - 48) * 1.0;
				var exp1 = 0.;
				while(true) {
					char = this.input.charCodeAt(this.readPos++);
					exp1 *= 10;
					switch(char) {
					case 46:
						if(exp1 > 0) {
							if(exp1 == 10 && this.input.charCodeAt(this.readPos++) == 46) {
								this.tokens.push({ t : hscript_Token.TOp("..."), min : this.tokenMin, max : this.tokenMax});
								this.tokenMin = this.oldTokenMin;
								this.tokenMax = this.oldTokenMax;
								var i = n1 | 0;
								return hscript_Token.TConst(i == n1 ? hscript_Const.CInt(i) : hscript_Const.CFloat(n1));
							}
							this.invalidChar(char);
						}
						exp1 = 1.;
						break;
					case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
						n1 = n1 * 10 + (char - 48);
						break;
					case 69:case 101:
						var tk = this.token();
						var pow = null;
						switch(tk._hx_index) {
						case 1:
							var _g = tk.c;
							if(_g._hx_index == 0) {
								var e = _g.v;
								pow = e;
							} else {
								this.tokens.push({ t : tk, min : this.tokenMin, max : this.tokenMax});
								this.tokenMin = this.oldTokenMin;
								this.tokenMax = this.oldTokenMax;
							}
							break;
						case 3:
							if(tk.s == "-") {
								tk = this.token();
								if(tk._hx_index == 1) {
									var _g1 = tk.c;
									if(_g1._hx_index == 0) {
										var e1 = _g1.v;
										pow = -e1;
									} else {
										this.tokens.push({ t : tk, min : this.tokenMin, max : this.tokenMax});
										this.tokenMin = this.oldTokenMin;
										this.tokenMax = this.oldTokenMax;
									}
								} else {
									this.tokens.push({ t : tk, min : this.tokenMin, max : this.tokenMax});
									this.tokenMin = this.oldTokenMin;
									this.tokenMax = this.oldTokenMax;
								}
							} else {
								this.tokens.push({ t : tk, min : this.tokenMin, max : this.tokenMax});
								this.tokenMin = this.oldTokenMin;
								this.tokenMax = this.oldTokenMax;
							}
							break;
						default:
							this.tokens.push({ t : tk, min : this.tokenMin, max : this.tokenMax});
							this.tokenMin = this.oldTokenMin;
							this.tokenMax = this.oldTokenMax;
						}
						if(pow == null) {
							this.invalidChar(char);
						}
						return hscript_Token.TConst(hscript_Const.CFloat(Math.pow(10,pow) / exp1 * n1 * 10));
					case 120:
						if(n1 > 0 || exp1 > 0) {
							this.invalidChar(char);
						}
						var n2 = 0;
						while(true) {
							char = this.input.charCodeAt(this.readPos++);
							switch(char) {
							case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
								n2 = (n2 << 4) + char - 48;
								break;
							case 65:case 66:case 67:case 68:case 69:case 70:
								n2 = (n2 << 4) + (char - 55);
								break;
							case 97:case 98:case 99:case 100:case 101:case 102:
								n2 = (n2 << 4) + (char - 87);
								break;
							default:
								this.char = char;
								return hscript_Token.TConst(hscript_Const.CInt(n2));
							}
						}
						break;
					default:
						this.char = char;
						var i1 = n1 | 0;
						return hscript_Token.TConst(exp1 > 0 ? hscript_Const.CFloat(n1 * 10 / exp1) : i1 == n1 ? hscript_Const.CInt(i1) : hscript_Const.CFloat(n1));
					}
				}
				break;
			case 58:
				return hscript_Token.TDoubleDot;
			case 59:
				return hscript_Token.TSemicolon;
			case 61:
				char = this.input.charCodeAt(this.readPos++);
				if(char == 61) {
					return hscript_Token.TOp("==");
				} else if(char == 62) {
					return hscript_Token.TOp("=>");
				}
				this.char = char;
				return hscript_Token.TOp("=");
			case 63:
				return hscript_Token.TQuestion;
			case 64:
				char = this.input.charCodeAt(this.readPos++);
				if(this.idents[char] || char == 58) {
					var id1 = String.fromCodePoint(char);
					while(true) {
						char = this.input.charCodeAt(this.readPos++);
						if(!this.idents[char]) {
							this.char = char;
							return hscript_Token.TMeta(id1);
						}
						id1 += String.fromCodePoint(char);
					}
				}
				this.invalidChar(char);
				break;
			case 91:
				return hscript_Token.TBkOpen;
			case 93:
				return hscript_Token.TBkClose;
			case 123:
				return hscript_Token.TBrOpen;
			case 125:
				return hscript_Token.TBrClose;
			default:
				if(this.ops[char]) {
					var op = String.fromCodePoint(char);
					var prev = -1;
					while(true) {
						char = this.input.charCodeAt(this.readPos++);
						if(char != char) {
							char = 0;
						}
						if(!this.ops[char] || prev == 61) {
							if(HxOverrides.cca(op,0) == 47) {
								return this.tokenComment(op,char);
							}
							this.char = char;
							return hscript_Token.TOp(op);
						}
						prev = char;
						op += String.fromCodePoint(char);
					}
				}
				if(this.idents[char]) {
					var id2 = String.fromCodePoint(char);
					while(true) {
						char = this.input.charCodeAt(this.readPos++);
						if(char != char) {
							char = 0;
						}
						if(!this.idents[char]) {
							this.char = char;
							return hscript_Token.TId(id2);
						}
						id2 += String.fromCodePoint(char);
					}
				}
				this.invalidChar(char);
			}
			char = this.input.charCodeAt(this.readPos++);
		}
	}
	,preprocValue: function(id) {
		return this.preprocesorValues.h[id];
	}
	,preprocStack: null
	,parsePreproCond: function() {
		var tk = this.token();
		switch(tk._hx_index) {
		case 2:
			var id = tk.s;
			var e = hscript_ExprDef.EIdent(id);
			var pmin = this.tokenMin;
			var pmax = this.tokenMax;
			if(e == null) {
				return null;
			} else {
				if(pmin == null) {
					pmin = this.tokenMin;
				}
				if(pmax == null) {
					pmax = this.tokenMax;
				}
				return { e : e, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
			}
			break;
		case 3:
			if(tk.s == "!") {
				var e = hscript_ExprDef.EUnop("!",true,this.parsePreproCond());
				var pmin = this.tokenMin;
				var pmax = this.tokenMax;
				if(e == null) {
					return null;
				} else {
					if(pmin == null) {
						pmin = this.tokenMin;
					}
					if(pmax == null) {
						pmax = this.tokenMax;
					}
					return { e : e, pmin : pmin, pmax : pmax, origin : this.origin, line : this.line};
				}
			} else {
				return this.unexpected(tk);
			}
			break;
		case 4:
			this.tokens.push({ t : hscript_Token.TPOpen, min : this.tokenMin, max : this.tokenMax});
			this.tokenMin = this.oldTokenMin;
			this.tokenMax = this.oldTokenMax;
			return this.parseExpr();
		default:
			return this.unexpected(tk);
		}
	}
	,evalPreproCond: function(e) {
		var _g = e.e;
		switch(_g._hx_index) {
		case 1:
			var id = _g.v;
			return this.preprocValue(id) != null;
		case 3:
			var e1 = _g.e;
			return this.evalPreproCond(e1);
		case 6:
			var _g1 = _g.e1;
			var _g2 = _g.e2;
			switch(_g.op) {
			case "&&":
				var e1 = _g1;
				var e2 = _g2;
				if(this.evalPreproCond(e1)) {
					return this.evalPreproCond(e2);
				} else {
					return false;
				}
				break;
			case "||":
				var e1 = _g1;
				var e2 = _g2;
				if(!this.evalPreproCond(e1)) {
					return this.evalPreproCond(e2);
				} else {
					return true;
				}
				break;
			default:
				var e1 = e.e;
				if(!this.resumeErrors) {
					throw haxe_Exception.thrown(new hscript_Error(hscript_ErrorDef.EInvalidPreprocessor("Can't eval " + $hxEnums[e1.__enum__].__constructs__[e1._hx_index]._hx_name),this.readPos,this.readPos,this.origin,this.line));
				}
				return false;
			}
			break;
		case 7:
			var _g1 = _g.prefix;
			if(_g.op == "!") {
				var e1 = _g.e;
				return !this.evalPreproCond(e1);
			} else {
				var e1 = e.e;
				if(!this.resumeErrors) {
					throw haxe_Exception.thrown(new hscript_Error(hscript_ErrorDef.EInvalidPreprocessor("Can't eval " + $hxEnums[e1.__enum__].__constructs__[e1._hx_index]._hx_name),this.readPos,this.readPos,this.origin,this.line));
				}
				return false;
			}
			break;
		default:
			var e1 = e.e;
			if(!this.resumeErrors) {
				throw haxe_Exception.thrown(new hscript_Error(hscript_ErrorDef.EInvalidPreprocessor("Can't eval " + $hxEnums[e1.__enum__].__constructs__[e1._hx_index]._hx_name),this.readPos,this.readPos,this.origin,this.line));
			}
			return false;
		}
	}
	,preprocess: function(id) {
		switch(id) {
		case "else":case "elseif":
			if(this.preprocStack.length > 0) {
				if(this.preprocStack[this.preprocStack.length - 1].r) {
					this.preprocStack[this.preprocStack.length - 1].r = false;
					this.skipTokens();
					return this.token();
				} else if(id == "else") {
					this.preprocStack.pop();
					this.preprocStack.push({ r : true});
					return this.token();
				} else {
					this.preprocStack.pop();
					return this.preprocess("if");
				}
			} else {
				return hscript_Token.TPrepro(id);
			}
			break;
		case "end":
			if(this.preprocStack.length > 0) {
				this.preprocStack.pop();
				return this.token();
			} else {
				return hscript_Token.TPrepro(id);
			}
			break;
		case "if":
			var e = this.parsePreproCond();
			if(this.evalPreproCond(e)) {
				this.preprocStack.push({ r : true});
				return this.token();
			}
			this.preprocStack.push({ r : false});
			this.skipTokens();
			return this.token();
		default:
			return hscript_Token.TPrepro(id);
		}
	}
	,skipTokens: function() {
		var spos = this.preprocStack.length - 1;
		var obj = this.preprocStack[spos];
		var pos = this.readPos;
		while(true) {
			var tk = this.token();
			if(tk == hscript_Token.TEof) {
				if(!this.resumeErrors) {
					throw haxe_Exception.thrown(new hscript_Error(hscript_ErrorDef.EInvalidPreprocessor("Unclosed"),pos,pos,this.origin,this.line));
				}
			}
			if(this.preprocStack[spos] != obj) {
				this.tokens.push({ t : tk, min : this.tokenMin, max : this.tokenMax});
				this.tokenMin = this.oldTokenMin;
				this.tokenMax = this.oldTokenMax;
				break;
			}
		}
	}
	,tokenComment: function(op,char) {
		var c = HxOverrides.cca(op,1);
		var s = this.input;
		if(c == 47) {
			while(char != 13 && char != 10) {
				char = this.input.charCodeAt(this.readPos++);
				if(char != char) {
					break;
				}
			}
			this.char = char;
			return this.token();
		}
		if(c == 42) {
			var old = this.line;
			if(op == "/**/") {
				this.char = char;
				return this.token();
			}
			while(true) {
				while(char != 42) {
					if(char == 10) {
						this.line++;
					}
					char = this.input.charCodeAt(this.readPos++);
					if(char != char) {
						this.line = old;
						if(!this.resumeErrors) {
							throw haxe_Exception.thrown(new hscript_Error(hscript_ErrorDef.EUnterminatedComment,this.tokenMin,this.tokenMin,this.origin,this.line));
						}
						break;
					}
				}
				char = this.input.charCodeAt(this.readPos++);
				if(char != char) {
					this.line = old;
					if(!this.resumeErrors) {
						throw haxe_Exception.thrown(new hscript_Error(hscript_ErrorDef.EUnterminatedComment,this.tokenMin,this.tokenMin,this.origin,this.line));
					}
					break;
				}
				if(char == 47) {
					break;
				}
			}
			return this.token();
		}
		this.char = char;
		return hscript_Token.TOp(op);
	}
	,constString: function(c) {
		switch(c._hx_index) {
		case 0:
			var v = c.v;
			if(v == null) {
				return "null";
			} else {
				return "" + v;
			}
			break;
		case 1:
			var f = c.f;
			if(f == null) {
				return "null";
			} else {
				return "" + f;
			}
			break;
		case 2:
			var s = c.s;
			return s;
		}
	}
	,tokenString: function(t) {
		switch(t._hx_index) {
		case 0:
			return "<eof>";
		case 1:
			var c = t.c;
			return this.constString(c);
		case 2:
			var s = t.s;
			return s;
		case 3:
			var s = t.s;
			return s;
		case 4:
			return "(";
		case 5:
			return ")";
		case 6:
			return "{";
		case 7:
			return "}";
		case 8:
			return ".";
		case 9:
			return ",";
		case 10:
			return ";";
		case 11:
			return "[";
		case 12:
			return "]";
		case 13:
			return "?";
		case 14:
			return ":";
		case 15:
			var id = t.s;
			return "@" + id;
		case 16:
			var id = t.s;
			return "#" + id;
		}
	}
	,__class__: hscript_Parser
};
var hscript_Printer = function() {
};
$hxClasses["hscript.Printer"] = hscript_Printer;
hscript_Printer.__name__ = "hscript.Printer";
hscript_Printer.toString = function(e) {
	return new hscript_Printer().exprToString(e);
};
hscript_Printer.errorToString = function(e) {
	var message;
	var _g = e.e;
	switch(_g._hx_index) {
	case 0:
		var c = _g.c;
		message = "Invalid character: '" + (c != c ? "EOF" : String.fromCodePoint(c)) + "' (" + c + ")";
		break;
	case 1:
		var s = _g.s;
		message = "Unexpected token: \"" + s + "\"";
		break;
	case 2:
		message = "Unterminated string";
		break;
	case 3:
		message = "Unterminated comment";
		break;
	case 4:
		var str = _g.msg;
		message = "Invalid preprocessor (" + str + ")";
		break;
	case 5:
		var v = _g.v;
		message = "Unknown variable: " + v;
		break;
	case 6:
		var v = _g.v;
		message = "Invalid iterator: " + v;
		break;
	case 7:
		var op = _g.op;
		message = "Invalid operator: " + op;
		break;
	case 8:
		var f = _g.f;
		message = "Invalid access to field " + f;
		break;
	case 9:
		var msg = _g.msg;
		message = msg;
		break;
	}
	return e.origin + ":" + e.line + ": " + message;
};
hscript_Printer.prototype = {
	buf: null
	,tabs: null
	,exprToString: function(e) {
		this.buf = new StringBuf();
		this.tabs = "";
		this.expr(e);
		return this.buf.b;
	}
	,typeToString: function(t) {
		this.buf = new StringBuf();
		this.tabs = "";
		this.type(t);
		return this.buf.b;
	}
	,add: function(s) {
		this.buf.b += Std.string(s);
	}
	,type: function(t) {
		switch(t._hx_index) {
		case 0:
			var path = t.path;
			var params = t.params;
			var s = path.join(".");
			this.buf.b += Std.string(s);
			if(params != null) {
				this.buf.b += "<";
				var first = true;
				var _g = 0;
				while(_g < params.length) {
					var p = params[_g];
					++_g;
					if(first) {
						first = false;
					} else {
						this.buf.b += ", ";
					}
					this.type(p);
				}
				this.buf.b += ">";
			}
			break;
		case 1:
			var _g = t.args;
			var _g1 = t.ret;
			var args = _g;
			var ret = _g1;
			if(Lambda.exists(args,function(a) {
				if(a._hx_index == 5) {
					var _g = a.n;
					var _g = a.t;
					return true;
				} else {
					return false;
				}
			})) {
				this.buf.b += "(";
				var _g2 = 0;
				while(_g2 < args.length) {
					var a = args[_g2];
					++_g2;
					if(a._hx_index == 5) {
						var _g3 = a.n;
						var _g4 = a.t;
						this.type(a);
					} else {
						this.type(hscript_CType.CTNamed("_",a));
					}
				}
				this.buf.b += ")->";
				this.type(ret);
			} else {
				var args = _g;
				var ret = _g1;
				if(args.length == 0) {
					this.buf.b += "Void -> ";
				} else {
					var _g = 0;
					while(_g < args.length) {
						var a = args[_g];
						++_g;
						this.type(a);
						this.buf.b += " -> ";
					}
				}
				this.type(ret);
			}
			break;
		case 2:
			var fields = t.fields;
			this.buf.b += "{";
			var first = true;
			var _g = 0;
			while(_g < fields.length) {
				var f = fields[_g];
				++_g;
				if(first) {
					first = false;
					this.buf.b += " ";
				} else {
					this.buf.b += ", ";
				}
				this.buf.b += Std.string(f.name + " : ");
				this.type(f.t);
			}
			this.buf.b += first ? "}" : " }";
			break;
		case 3:
			var t1 = t.t;
			this.buf.b += "(";
			this.type(t1);
			this.buf.b += ")";
			break;
		case 4:
			var t1 = t.t;
			this.buf.b += "?";
			this.type(t1);
			break;
		case 5:
			var name = t.n;
			var t1 = t.t;
			this.buf.b += name == null ? "null" : "" + name;
			this.buf.b += ":";
			this.type(t1);
			break;
		}
	}
	,addType: function(t) {
		if(t != null) {
			this.buf.b += " : ";
			this.type(t);
		}
	}
	,expr: function(e) {
		if(e == null) {
			this.buf.b += "??NULL??";
			return;
		}
		var _g = e.e;
		switch(_g._hx_index) {
		case 0:
			var c = _g.c;
			switch(c._hx_index) {
			case 0:
				var i = c.v;
				this.buf.b += i == null ? "null" : "" + i;
				break;
			case 1:
				var f = c.f;
				this.buf.b += f == null ? "null" : "" + f;
				break;
			case 2:
				var s = c.s;
				this.buf.b += "\"";
				var s1 = s.split("\"").join("\\\"").split("\n").join("\\n").split("\r").join("\\r").split("\t").join("\\t");
				this.buf.b += Std.string(s1);
				this.buf.b += "\"";
				break;
			}
			break;
		case 1:
			var v = _g.v;
			this.buf.b += v == null ? "null" : "" + v;
			break;
		case 2:
			var n = _g.n;
			var t = _g.t;
			var e = _g.e;
			this.buf.b += Std.string("var " + n);
			this.addType(t);
			if(e != null) {
				this.buf.b += " = ";
				this.expr(e);
			}
			break;
		case 3:
			var e = _g.e;
			this.buf.b += "(";
			this.expr(e);
			this.buf.b += ")";
			break;
		case 4:
			var el = _g.e;
			if(el.length == 0) {
				this.buf.b += "{}";
			} else {
				this.tabs += "\t";
				this.buf.b += "{\n";
				var _g1 = 0;
				while(_g1 < el.length) {
					var e = el[_g1];
					++_g1;
					this.buf.b += Std.string(this.tabs);
					this.expr(e);
					this.buf.b += ";\n";
				}
				this.tabs = HxOverrides.substr(this.tabs,1,null);
				this.buf.b += "}";
			}
			break;
		case 5:
			var e = _g.e;
			var f = _g.f;
			this.expr(e);
			this.buf.b += Std.string("." + f);
			break;
		case 6:
			var op = _g.op;
			var e1 = _g.e1;
			var e2 = _g.e2;
			this.expr(e1);
			this.buf.b += Std.string(" " + op + " ");
			this.expr(e2);
			break;
		case 7:
			var op = _g.op;
			var pre = _g.prefix;
			var e = _g.e;
			if(pre) {
				this.buf.b += op == null ? "null" : "" + op;
				this.expr(e);
			} else {
				this.expr(e);
				this.buf.b += op == null ? "null" : "" + op;
			}
			break;
		case 8:
			var e = _g.e;
			var args = _g.params;
			if(e == null) {
				this.expr(e);
			} else {
				var _g1 = e.e;
				switch(_g1._hx_index) {
				case 0:
					var _g2 = _g1.c;
					this.expr(e);
					break;
				case 1:
					var _g2 = _g1.v;
					this.expr(e);
					break;
				case 5:
					var _g2 = _g1.e;
					var _g2 = _g1.f;
					this.expr(e);
					break;
				default:
					this.buf.b += "(";
					this.expr(e);
					this.buf.b += ")";
				}
			}
			this.buf.b += "(";
			var first = true;
			var _g1 = 0;
			while(_g1 < args.length) {
				var a = args[_g1];
				++_g1;
				if(first) {
					first = false;
				} else {
					this.buf.b += ", ";
				}
				this.expr(a);
			}
			this.buf.b += ")";
			break;
		case 9:
			var cond = _g.cond;
			var e1 = _g.e1;
			var e2 = _g.e2;
			this.buf.b += "if( ";
			this.expr(cond);
			this.buf.b += " ) ";
			this.expr(e1);
			if(e2 != null) {
				this.buf.b += " else ";
				this.expr(e2);
			}
			break;
		case 10:
			var cond = _g.cond;
			var e = _g.e;
			this.buf.b += "while( ";
			this.expr(cond);
			this.buf.b += " ) ";
			this.expr(e);
			break;
		case 11:
			var v = _g.v;
			var it = _g.it;
			var e = _g.e;
			this.buf.b += Std.string("for( " + v + " in ");
			this.expr(it);
			this.buf.b += " ) ";
			this.expr(e);
			break;
		case 12:
			this.buf.b += "break";
			break;
		case 13:
			this.buf.b += "continue";
			break;
		case 14:
			var params = _g.args;
			var e = _g.e;
			var name = _g.name;
			var ret = _g.ret;
			this.buf.b += "function";
			if(name != null) {
				this.buf.b += Std.string(" " + name);
			}
			this.buf.b += "(";
			var first = true;
			var _g1 = 0;
			while(_g1 < params.length) {
				var a = params[_g1];
				++_g1;
				if(first) {
					first = false;
				} else {
					this.buf.b += ", ";
				}
				if(a.opt) {
					this.buf.b += "?";
				}
				this.buf.b += Std.string(a.name);
				this.addType(a.t);
			}
			this.buf.b += ")";
			this.addType(ret);
			this.buf.b += " ";
			this.expr(e);
			break;
		case 15:
			var e = _g.e;
			this.buf.b += "return";
			if(e != null) {
				this.buf.b += " ";
				this.expr(e);
			}
			break;
		case 16:
			var e = _g.e;
			var index = _g.index;
			this.expr(e);
			this.buf.b += "[";
			this.expr(index);
			this.buf.b += "]";
			break;
		case 17:
			var el = _g.e;
			this.buf.b += "[";
			var first = true;
			var _g1 = 0;
			while(_g1 < el.length) {
				var e = el[_g1];
				++_g1;
				if(first) {
					first = false;
				} else {
					this.buf.b += ", ";
				}
				this.expr(e);
			}
			this.buf.b += "]";
			break;
		case 18:
			var cl = _g.cl;
			var args = _g.params;
			this.buf.b += Std.string("new " + cl + "(");
			var first = true;
			var _g1 = 0;
			while(_g1 < args.length) {
				var e = args[_g1];
				++_g1;
				if(first) {
					first = false;
				} else {
					this.buf.b += ", ";
				}
				this.expr(e);
			}
			this.buf.b += ")";
			break;
		case 19:
			var e = _g.e;
			this.buf.b += "throw ";
			this.expr(e);
			break;
		case 20:
			var e = _g.e;
			var v = _g.v;
			var t = _g.t;
			var ecatch = _g.ecatch;
			this.buf.b += "try ";
			this.expr(e);
			this.buf.b += Std.string(" catch( " + v);
			this.addType(t);
			this.buf.b += ") ";
			this.expr(ecatch);
			break;
		case 21:
			var fl = _g.fl;
			if(fl.length == 0) {
				this.buf.b += "{}";
			} else {
				this.tabs += "\t";
				this.buf.b += "{\n";
				var _g1 = 0;
				while(_g1 < fl.length) {
					var f = fl[_g1];
					++_g1;
					this.buf.b += Std.string(this.tabs);
					this.buf.b += Std.string(f.name + " : ");
					this.expr(f.e);
					this.buf.b += ",\n";
				}
				this.tabs = HxOverrides.substr(this.tabs,1,null);
				this.buf.b += "}";
			}
			break;
		case 22:
			var c = _g.cond;
			var e1 = _g.e1;
			var e2 = _g.e2;
			this.expr(c);
			this.buf.b += " ? ";
			this.expr(e1);
			this.buf.b += " : ";
			this.expr(e2);
			break;
		case 23:
			var e = _g.e;
			var cases = _g.cases;
			var def = _g.defaultExpr;
			this.buf.b += "switch( ";
			this.expr(e);
			this.buf.b += ") {";
			var _g1 = 0;
			while(_g1 < cases.length) {
				var c = cases[_g1];
				++_g1;
				this.buf.b += "case ";
				var first = true;
				var _g2 = 0;
				var _g3 = c.values;
				while(_g2 < _g3.length) {
					var v = _g3[_g2];
					++_g2;
					if(first) {
						first = false;
					} else {
						this.buf.b += ", ";
					}
					this.expr(v);
				}
				this.buf.b += ": ";
				this.expr(c.expr);
				this.buf.b += ";\n";
			}
			if(def != null) {
				this.buf.b += "default: ";
				this.expr(def);
				this.buf.b += ";\n";
			}
			this.buf.b += "}";
			break;
		case 24:
			var cond = _g.cond;
			var e = _g.e;
			this.buf.b += "do ";
			this.expr(e);
			this.buf.b += " while ( ";
			this.expr(cond);
			this.buf.b += " )";
			break;
		case 25:
			var name = _g.name;
			var args = _g.args;
			var e = _g.e;
			this.buf.b += "@";
			this.buf.b += name == null ? "null" : "" + name;
			if(args != null && args.length > 0) {
				this.buf.b += "(";
				var first = true;
				var _g1 = 0;
				while(_g1 < args.length) {
					var a = args[_g1];
					++_g1;
					if(first) {
						first = false;
					} else {
						this.buf.b += ", ";
					}
					this.expr(e);
				}
				this.buf.b += ")";
			}
			this.buf.b += " ";
			this.expr(e);
			break;
		case 26:
			var e = _g.e;
			var t = _g.t;
			this.buf.b += "(";
			this.expr(e);
			this.buf.b += " : ";
			this.addType(t);
			this.buf.b += ")";
			break;
		}
	}
	,__class__: hscript_Printer
};
var hscript_Tools = function() { };
$hxClasses["hscript.Tools"] = hscript_Tools;
hscript_Tools.__name__ = "hscript.Tools";
hscript_Tools.iter = function(e,f) {
	var _g = e.e;
	switch(_g._hx_index) {
	case 0:
		var _g1 = _g.c;
		break;
	case 1:
		var _g1 = _g.v;
		break;
	case 2:
		var _g1 = _g.n;
		var _g1 = _g.t;
		var e = _g.e;
		if(e != null) {
			f(e);
		}
		break;
	case 3:
		var e = _g.e;
		f(e);
		break;
	case 4:
		var el = _g.e;
		var _g1 = 0;
		while(_g1 < el.length) {
			var e = el[_g1];
			++_g1;
			f(e);
		}
		break;
	case 5:
		var _g1 = _g.f;
		var e = _g.e;
		f(e);
		break;
	case 6:
		var _g1 = _g.op;
		var e1 = _g.e1;
		var e2 = _g.e2;
		f(e1);
		f(e2);
		break;
	case 7:
		var _g1 = _g.op;
		var _g1 = _g.prefix;
		var e = _g.e;
		f(e);
		break;
	case 8:
		var e = _g.e;
		var args = _g.params;
		f(e);
		var _g1 = 0;
		while(_g1 < args.length) {
			var a = args[_g1];
			++_g1;
			f(a);
		}
		break;
	case 9:
		var c = _g.cond;
		var e1 = _g.e1;
		var e2 = _g.e2;
		f(c);
		f(e1);
		if(e2 != null) {
			f(e2);
		}
		break;
	case 10:
		var c = _g.cond;
		var e = _g.e;
		f(c);
		f(e);
		break;
	case 11:
		var _g1 = _g.v;
		var it = _g.it;
		var e = _g.e;
		f(it);
		f(e);
		break;
	case 12:case 13:
		break;
	case 14:
		var _g1 = _g.args;
		var _g1 = _g.name;
		var _g1 = _g.ret;
		var e = _g.e;
		f(e);
		break;
	case 15:
		var e = _g.e;
		if(e != null) {
			f(e);
		}
		break;
	case 16:
		var e = _g.e;
		var i = _g.index;
		f(e);
		f(i);
		break;
	case 17:
		var el = _g.e;
		var _g1 = 0;
		while(_g1 < el.length) {
			var e = el[_g1];
			++_g1;
			f(e);
		}
		break;
	case 18:
		var _g1 = _g.cl;
		var el = _g.params;
		var _g1 = 0;
		while(_g1 < el.length) {
			var e = el[_g1];
			++_g1;
			f(e);
		}
		break;
	case 19:
		var e = _g.e;
		f(e);
		break;
	case 20:
		var _g1 = _g.v;
		var _g1 = _g.t;
		var e = _g.e;
		var c = _g.ecatch;
		f(e);
		f(c);
		break;
	case 21:
		var fl = _g.fl;
		var _g1 = 0;
		while(_g1 < fl.length) {
			var fi = fl[_g1];
			++_g1;
			f(fi.e);
		}
		break;
	case 22:
		var c = _g.cond;
		var e1 = _g.e1;
		var e2 = _g.e2;
		f(c);
		f(e1);
		f(e2);
		break;
	case 23:
		var e = _g.e;
		var cases = _g.cases;
		var def = _g.defaultExpr;
		f(e);
		var _g1 = 0;
		while(_g1 < cases.length) {
			var c = cases[_g1];
			++_g1;
			var _g2 = 0;
			var _g3 = c.values;
			while(_g2 < _g3.length) {
				var v = _g3[_g2];
				++_g2;
				f(v);
			}
			f(c.expr);
		}
		if(def != null) {
			f(def);
		}
		break;
	case 24:
		var c = _g.cond;
		var e = _g.e;
		f(c);
		f(e);
		break;
	case 25:
		var name = _g.name;
		var args = _g.args;
		var e = _g.e;
		if(args != null) {
			var _g1 = 0;
			while(_g1 < args.length) {
				var a = args[_g1];
				++_g1;
				f(a);
			}
		}
		f(e);
		break;
	case 26:
		var _g1 = _g.t;
		var e = _g.e;
		f(e);
		break;
	}
};
hscript_Tools.map = function(e,f) {
	var edef;
	var _g = e.e;
	switch(_g._hx_index) {
	case 0:
		var _g1 = _g.c;
		edef = e.e;
		break;
	case 1:
		var _g1 = _g.v;
		edef = e.e;
		break;
	case 2:
		var n = _g.n;
		var t = _g.t;
		var e1 = _g.e;
		edef = hscript_ExprDef.EVar(n,t,e1 != null ? f(e1) : null);
		break;
	case 3:
		var e1 = _g.e;
		edef = hscript_ExprDef.EParent(f(e1));
		break;
	case 4:
		var el = _g.e;
		var _g1 = [];
		var _g2 = 0;
		while(_g2 < el.length) {
			var e1 = el[_g2];
			++_g2;
			_g1.push(f(e1));
		}
		edef = hscript_ExprDef.EBlock(_g1);
		break;
	case 5:
		var e1 = _g.e;
		var fi = _g.f;
		edef = hscript_ExprDef.EField(f(e1),fi);
		break;
	case 6:
		var op = _g.op;
		var e1 = _g.e1;
		var e2 = _g.e2;
		edef = hscript_ExprDef.EBinop(op,f(e1),f(e2));
		break;
	case 7:
		var op = _g.op;
		var pre = _g.prefix;
		var e1 = _g.e;
		edef = hscript_ExprDef.EUnop(op,pre,f(e1));
		break;
	case 8:
		var e1 = _g.e;
		var args = _g.params;
		var edef1 = f(e1);
		var _g1 = [];
		var _g2 = 0;
		while(_g2 < args.length) {
			var a = args[_g2];
			++_g2;
			_g1.push(f(a));
		}
		edef = hscript_ExprDef.ECall(edef1,_g1);
		break;
	case 9:
		var c = _g.cond;
		var e1 = _g.e1;
		var e2 = _g.e2;
		edef = hscript_ExprDef.EIf(f(c),f(e1),e2 != null ? f(e2) : null);
		break;
	case 10:
		var c = _g.cond;
		var e1 = _g.e;
		edef = hscript_ExprDef.EWhile(f(c),f(e1));
		break;
	case 11:
		var v = _g.v;
		var it = _g.it;
		var e1 = _g.e;
		edef = hscript_ExprDef.EFor(v,f(it),f(e1));
		break;
	case 12:case 13:
		edef = e.e;
		break;
	case 14:
		var args = _g.args;
		var e1 = _g.e;
		var name = _g.name;
		var t = _g.ret;
		edef = hscript_ExprDef.EFunction(args,f(e1),name,t);
		break;
	case 15:
		var e1 = _g.e;
		edef = hscript_ExprDef.EReturn(e1 != null ? f(e1) : null);
		break;
	case 16:
		var e1 = _g.e;
		var i = _g.index;
		edef = hscript_ExprDef.EArray(f(e1),f(i));
		break;
	case 17:
		var el = _g.e;
		var _g1 = [];
		var _g2 = 0;
		while(_g2 < el.length) {
			var e1 = el[_g2];
			++_g2;
			_g1.push(f(e1));
		}
		edef = hscript_ExprDef.EArrayDecl(_g1);
		break;
	case 18:
		var cl = _g.cl;
		var el = _g.params;
		var _g1 = [];
		var _g2 = 0;
		while(_g2 < el.length) {
			var e1 = el[_g2];
			++_g2;
			_g1.push(f(e1));
		}
		edef = hscript_ExprDef.ENew(cl,_g1);
		break;
	case 19:
		var e1 = _g.e;
		edef = hscript_ExprDef.EThrow(f(e1));
		break;
	case 20:
		var e1 = _g.e;
		var v = _g.v;
		var t = _g.t;
		var c = _g.ecatch;
		edef = hscript_ExprDef.ETry(f(e1),v,t,f(c));
		break;
	case 21:
		var fl = _g.fl;
		var _g1 = [];
		var _g2 = 0;
		while(_g2 < fl.length) {
			var fi = fl[_g2];
			++_g2;
			_g1.push({ name : fi.name, e : f(fi.e)});
		}
		edef = hscript_ExprDef.EObject(_g1);
		break;
	case 22:
		var c = _g.cond;
		var e1 = _g.e1;
		var e2 = _g.e2;
		edef = hscript_ExprDef.ETernary(f(c),f(e1),f(e2));
		break;
	case 23:
		var e1 = _g.e;
		var cases = _g.cases;
		var def = _g.defaultExpr;
		var edef1 = f(e1);
		var _g1 = [];
		var _g2 = 0;
		while(_g2 < cases.length) {
			var c = cases[_g2];
			++_g2;
			var _g3 = [];
			var _g4 = 0;
			var _g5 = c.values;
			while(_g4 < _g5.length) {
				var v = _g5[_g4];
				++_g4;
				_g3.push(f(v));
			}
			_g1.push({ values : _g3, expr : f(c.expr)});
		}
		edef = hscript_ExprDef.ESwitch(edef1,_g1,def == null ? null : f(def));
		break;
	case 24:
		var c = _g.cond;
		var e1 = _g.e;
		edef = hscript_ExprDef.EDoWhile(f(c),f(e1));
		break;
	case 25:
		var name = _g.name;
		var args = _g.args;
		var e1 = _g.e;
		var edef1;
		if(args == null) {
			edef1 = null;
		} else {
			var _g1 = [];
			var _g2 = 0;
			while(_g2 < args.length) {
				var a = args[_g2];
				++_g2;
				_g1.push(f(a));
			}
			edef1 = _g1;
		}
		edef = hscript_ExprDef.EMeta(name,edef1,f(e1));
		break;
	case 26:
		var e1 = _g.e;
		var t = _g.t;
		edef = hscript_ExprDef.ECheckType(f(e1),t);
		break;
	}
	return { e : edef, pmin : e.pmin, pmax : e.pmax, origin : e.origin, line : e.line};
};
hscript_Tools.expr = function(e) {
	return e.e;
};
hscript_Tools.mk = function(e,p) {
	return { e : e, pmin : p.pmin, pmax : p.pmax, origin : p.origin, line : p.line};
};
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = "js.Boot";
js_Boot.isClass = function(o) {
	return o.__name__;
};
js_Boot.isInterface = function(o) {
	return o.__isInterface__;
};
js_Boot.isEnum = function(e) {
	return e.__ename__;
};
js_Boot.getClass = function(o) {
	if(o == null) {
		return null;
	} else if(((o) instanceof Array)) {
		return Array;
	} else {
		var cl = o.__class__;
		if(cl != null) {
			return cl;
		}
		var name = js_Boot.__nativeClassName(o);
		if(name != null) {
			return js_Boot.__resolveNativeClass(name);
		}
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(o.__enum__) {
			var e = $hxEnums[o.__enum__];
			var con = e.__constructs__[o._hx_index];
			var n = con._hx_name;
			if(con.__params__) {
				s = s + "\t";
				return n + "(" + ((function($this) {
					var $r;
					var _g = [];
					{
						var _g1 = 0;
						var _g2 = con.__params__;
						while(true) {
							if(!(_g1 < _g2.length)) {
								break;
							}
							var p = _g2[_g1];
							_g1 = _g1 + 1;
							_g.push(js_Boot.__string_rec(o[p],s));
						}
					}
					$r = _g;
					return $r;
				}(this))).join(",") + ")";
			} else {
				return n;
			}
		}
		if(((o) instanceof Array)) {
			var str = "[";
			s += "\t";
			var _g = 0;
			var _g1 = o.length;
			while(_g < _g1) {
				var i = _g++;
				str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( _g ) {
			haxe_NativeStackTrace.lastError = _g;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		var k = null;
		for( k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) {
			str += ", \n";
		}
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) {
		return false;
	}
	if(cc == cl) {
		return true;
	}
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g = 0;
		var _g1 = intf.length;
		while(_g < _g1) {
			var i = _g++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) {
				return true;
			}
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) {
		return false;
	}
	switch(cl) {
	case Array:
		return ((o) instanceof Array);
	case Bool:
		return typeof(o) == "boolean";
	case Dynamic:
		return o != null;
	case Float:
		return typeof(o) == "number";
	case Int:
		if(typeof(o) == "number") {
			return ((o | 0) === o);
		} else {
			return false;
		}
		break;
	case String:
		return typeof(o) == "string";
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(js_Boot.__downcastCheck(o,cl)) {
					return true;
				}
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(((o) instanceof cl)) {
					return true;
				}
			}
		} else {
			return false;
		}
		if(cl == Class ? o.__name__ != null : false) {
			return true;
		}
		if(cl == Enum ? o.__ename__ != null : false) {
			return true;
		}
		return o.__enum__ != null ? $hxEnums[o.__enum__] == cl : false;
	}
};
js_Boot.__downcastCheck = function(o,cl) {
	if(!((o) instanceof cl)) {
		if(cl.__isInterface__) {
			return js_Boot.__interfLoop(js_Boot.getClass(o),cl);
		} else {
			return false;
		}
	} else {
		return true;
	}
};
js_Boot.__implements = function(o,iface) {
	return js_Boot.__interfLoop(js_Boot.getClass(o),iface);
};
js_Boot.__cast = function(o,t) {
	if(o == null || js_Boot.__instanceof(o,t)) {
		return o;
	} else {
		throw haxe_Exception.thrown("Cannot cast " + Std.string(o) + " to " + Std.string(t));
	}
};
js_Boot.__toStr = null;
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") {
		return null;
	}
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var js_Browser = function() { };
$hxClasses["js.Browser"] = js_Browser;
js_Browser.__name__ = "js.Browser";
js_Browser.__properties__ = {get_supported:"get_supported",get_self:"get_self"};
js_Browser.get_self = function() {
	return $global;
};
js_Browser.get_supported = function() {
	if(typeof(window) != "undefined" && typeof(window.location) != "undefined") {
		return typeof(window.location.protocol) == "string";
	} else {
		return false;
	}
};
js_Browser.getLocalStorage = function() {
	try {
		var s = window.localStorage;
		s.getItem("");
		if(s.length == 0) {
			var key = "_hx_" + Math.random();
			s.setItem(key,key);
			s.removeItem(key);
		}
		return s;
	} catch( _g ) {
		haxe_NativeStackTrace.lastError = _g;
		return null;
	}
};
js_Browser.getSessionStorage = function() {
	try {
		var s = window.sessionStorage;
		s.getItem("");
		if(s.length == 0) {
			var key = "_hx_" + Math.random();
			s.setItem(key,key);
			s.removeItem(key);
		}
		return s;
	} catch( _g ) {
		haxe_NativeStackTrace.lastError = _g;
		return null;
	}
};
js_Browser.createXMLHttpRequest = function() {
	if(typeof XMLHttpRequest != "undefined") {
		return new XMLHttpRequest();
	}
	if(typeof ActiveXObject != "undefined") {
		return new ActiveXObject("Microsoft.XMLHTTP");
	}
	throw haxe_Exception.thrown("Unable to create XMLHttpRequest object.");
};
js_Browser.alert = function(v) {
	window.alert(Std.string(v));
};
var js_Lib = function() { };
$hxClasses["js.Lib"] = js_Lib;
js_Lib.__name__ = "js.Lib";
js_Lib.__properties__ = {get_undefined:"get_undefined"};
js_Lib.debug = function() {
	debugger;
};
js_Lib.alert = function(v) {
	alert(js_Boot.__string_rec(v,""));
};
js_Lib.eval = function(code) {
	return eval(code);
};
js_Lib.get_undefined = function() {
	return undefined;
};
js_Lib.rethrow = function() {
};
js_Lib.getOriginalException = function() {
	return null;
};
js_Lib.getNextHaxeUID = function() {
	return $global.$haxeUID++;
};
var js_html__$CanvasElement_CanvasUtil = function() { };
$hxClasses["js.html._CanvasElement.CanvasUtil"] = js_html__$CanvasElement_CanvasUtil;
js_html__$CanvasElement_CanvasUtil.__name__ = "js.html._CanvasElement.CanvasUtil";
js_html__$CanvasElement_CanvasUtil.getContextWebGL = function(canvas,attribs) {
	var name = "webgl";
	var ctx = canvas.getContext(name,attribs);
	if(ctx != null) {
		return ctx;
	}
	var name = "experimental-webgl";
	var ctx = canvas.getContext(name,attribs);
	if(ctx != null) {
		return ctx;
	}
	return null;
};
var js_lib__$ArrayBuffer_ArrayBufferCompat = function() { };
$hxClasses["js.lib._ArrayBuffer.ArrayBufferCompat"] = js_lib__$ArrayBuffer_ArrayBufferCompat;
js_lib__$ArrayBuffer_ArrayBufferCompat.__name__ = "js.lib._ArrayBuffer.ArrayBufferCompat";
js_lib__$ArrayBuffer_ArrayBufferCompat.sliceImpl = function(begin,end) {
	var u = new Uint8Array(this,begin,end == null ? null : end - begin);
	var resultArray = new Uint8Array(u.byteLength);
	resultArray.set(u);
	return resultArray.buffer;
};
var js_lib_KeyValue = {};
js_lib_KeyValue.__properties__ = {get_value:"get_value",get_key:"get_key"};
js_lib_KeyValue.get_key = function(this1) {
	return this1[0];
};
js_lib_KeyValue.get_value = function(this1) {
	return this1[1];
};
var js_lib_ObjectEntry = {};
js_lib_ObjectEntry.__properties__ = {get_value:"get_value",get_key:"get_key"};
js_lib_ObjectEntry.get_key = function(this1) {
	return this1[0];
};
js_lib_ObjectEntry.get_value = function(this1) {
	return this1[1];
};
var motion_actuators_IGenericActuator = function() { };
$hxClasses["motion.actuators.IGenericActuator"] = motion_actuators_IGenericActuator;
motion_actuators_IGenericActuator.__name__ = "motion.actuators.IGenericActuator";
motion_actuators_IGenericActuator.__isInterface__ = true;
motion_actuators_IGenericActuator.prototype = {
	autoVisible: null
	,delay: null
	,ease: null
	,onComplete: null
	,onRepeat: null
	,onUpdate: null
	,reflect: null
	,repeat: null
	,reverse: null
	,smartRotation: null
	,snapping: null
	,onPause: null
	,onResume: null
	,apply: null
	,move: null
	,pause: null
	,resume: null
	,stop: null
	,__class__: motion_actuators_IGenericActuator
};
var motion_actuators_GenericActuator = function(target,duration,properties) {
	this._autoVisible = true;
	this._delay = 0;
	this._reflect = false;
	this._repeat = 0;
	this._reverse = false;
	this._smartRotation = false;
	this._snapping = false;
	this.special = false;
	this.target = target;
	this.properties = properties;
	this.duration = duration;
	this._ease = motion_Actuate.defaultEase;
};
$hxClasses["motion.actuators.GenericActuator"] = motion_actuators_GenericActuator;
motion_actuators_GenericActuator.__name__ = "motion.actuators.GenericActuator";
motion_actuators_GenericActuator.__interfaces__ = [motion_actuators_IGenericActuator];
motion_actuators_GenericActuator.prototype = {
	duration: null
	,id: null
	,properties: null
	,target: null
	,_autoVisible: null
	,_delay: null
	,_ease: null
	,_onComplete: null
	,_onCompleteParams: null
	,_onRepeat: null
	,_onRepeatParams: null
	,_onUpdate: null
	,_onUpdateParams: null
	,_onResume: null
	,_onResumeParams: null
	,_onPause: null
	,_onPauseParams: null
	,_reflect: null
	,_repeat: null
	,_reverse: null
	,_smartRotation: null
	,_snapping: null
	,special: null
	,apply: function() {
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			if(Object.prototype.hasOwnProperty.call(this.target,i)) {
				this.target[i] = Reflect.field(this.properties,i);
			} else {
				Reflect.setProperty(this.target,i,Reflect.field(this.properties,i));
			}
		}
	}
	,autoVisible: function(value) {
		if(value == null) {
			value = true;
		}
		this._autoVisible = value;
		return this;
	}
	,callMethod: function(method,params) {
		if(params == null) {
			params = [];
		}
		return method.apply(method,params);
	}
	,change: function() {
		if(this._onUpdate != null) {
			var method = this._onUpdate;
			var params = this._onUpdateParams;
			if(params == null) {
				params = [];
			}
			method.apply(method,params);
		}
	}
	,complete: function(sendEvent) {
		if(sendEvent == null) {
			sendEvent = true;
		}
		if(sendEvent) {
			this.change();
			if(this._onComplete != null) {
				var method = this._onComplete;
				var params = this._onCompleteParams;
				if(params == null) {
					params = [];
				}
				method.apply(method,params);
			}
		}
		motion_Actuate.unload(this);
	}
	,delay: function(duration) {
		this._delay = duration;
		return this;
	}
	,ease: function(easing) {
		this._ease = easing;
		return this;
	}
	,move: function() {
	}
	,onComplete: function(handler,parameters) {
		this._onComplete = handler;
		if(parameters == null) {
			this._onCompleteParams = [];
		} else {
			this._onCompleteParams = parameters;
		}
		if(this.duration == 0) {
			this.complete();
		}
		return this;
	}
	,onRepeat: function(handler,parameters) {
		this._onRepeat = handler;
		if(parameters == null) {
			this._onRepeatParams = [];
		} else {
			this._onRepeatParams = parameters;
		}
		return this;
	}
	,onUpdate: function(handler,parameters) {
		this._onUpdate = handler;
		if(parameters == null) {
			this._onUpdateParams = [];
		} else {
			this._onUpdateParams = parameters;
		}
		return this;
	}
	,onPause: function(handler,parameters) {
		this._onPause = handler;
		if(parameters == null) {
			this._onPauseParams = [];
		} else {
			this._onPauseParams = parameters;
		}
		return this;
	}
	,onResume: function(handler,parameters) {
		this._onResume = handler;
		if(parameters == null) {
			this._onResumeParams = [];
		} else {
			this._onResumeParams = parameters;
		}
		return this;
	}
	,pause: function() {
		if(this._onPause != null) {
			var method = this._onPause;
			var params = this._onPauseParams;
			if(params == null) {
				params = [];
			}
			method.apply(method,params);
		}
	}
	,reflect: function(value) {
		if(value == null) {
			value = true;
		}
		this._reflect = value;
		this.special = true;
		return this;
	}
	,repeat: function(times) {
		if(times == null) {
			times = -1;
		}
		this._repeat = times;
		return this;
	}
	,resume: function() {
		if(this._onResume != null) {
			var method = this._onResume;
			var params = this._onResumeParams;
			if(params == null) {
				params = [];
			}
			method.apply(method,params);
		}
	}
	,reverse: function(value) {
		if(value == null) {
			value = true;
		}
		this._reverse = value;
		this.special = true;
		return this;
	}
	,smartRotation: function(value) {
		if(value == null) {
			value = true;
		}
		this._smartRotation = value;
		this.special = true;
		return this;
	}
	,snapping: function(value) {
		if(value == null) {
			value = true;
		}
		this._snapping = value;
		this.special = true;
		return this;
	}
	,stop: function(properties,complete,sendEvent) {
	}
	,__class__: motion_actuators_GenericActuator
};
var motion_actuators_SimpleActuator = function(target,duration,properties) {
	this.active = true;
	this.propertyDetails = [];
	this.sendChange = false;
	this.paused = false;
	this.cacheVisible = false;
	this.initialized = false;
	this.setVisible = false;
	this.toggleVisible = false;
	this.startTime = window.performance.now() / 1000;
	motion_actuators_GenericActuator.call(this,target,duration,properties);
	if(!motion_actuators_SimpleActuator.addedEvent) {
		motion_actuators_SimpleActuator.addedEvent = true;
		window.requestAnimationFrame(motion_actuators_SimpleActuator.stage_onEnterFrame);
	}
};
$hxClasses["motion.actuators.SimpleActuator"] = motion_actuators_SimpleActuator;
motion_actuators_SimpleActuator.__name__ = "motion.actuators.SimpleActuator";
motion_actuators_SimpleActuator.stage_onEnterFrame = function(deltaTime) {
	var currentTime = deltaTime / 1000;
	var actuator;
	var j = 0;
	var cleanup = false;
	var _g = 0;
	var _g1 = motion_actuators_SimpleActuator.actuatorsLength;
	while(_g < _g1) {
		var i = _g++;
		actuator = motion_actuators_SimpleActuator.actuators[j];
		if(actuator != null && actuator.active) {
			if(currentTime >= actuator.timeOffset) {
				actuator.update(currentTime);
			}
			++j;
		} else {
			motion_actuators_SimpleActuator.actuators.splice(j,1);
			--motion_actuators_SimpleActuator.actuatorsLength;
		}
	}
	window.requestAnimationFrame(motion_actuators_SimpleActuator.stage_onEnterFrame);
};
motion_actuators_SimpleActuator.__super__ = motion_actuators_GenericActuator;
motion_actuators_SimpleActuator.prototype = $extend(motion_actuators_GenericActuator.prototype,{
	timeOffset: null
	,active: null
	,cacheVisible: null
	,detailsLength: null
	,initialized: null
	,paused: null
	,pauseTime: null
	,propertyDetails: null
	,sendChange: null
	,setVisible: null
	,startTime: null
	,toggleVisible: null
	,apply: function() {
		motion_actuators_GenericActuator.prototype.apply.call(this);
		if(this.toggleVisible && Object.prototype.hasOwnProperty.call(this.properties,"alpha")) {
			var target = this.target;
			var value = null;
			if(Object.prototype.hasOwnProperty.call(target,"visible")) {
				value = Reflect.field(target,"visible");
			} else {
				value = Reflect.getProperty(target,"visible");
			}
			if(value != null) {
				var target = this.target;
				var value = Reflect.field(this.properties,"alpha") > 0;
				if(Object.prototype.hasOwnProperty.call(target,"visible")) {
					target["visible"] = value;
				} else {
					Reflect.setProperty(target,"visible",value);
				}
			}
		}
	}
	,autoVisible: function(value) {
		if(value == null) {
			value = true;
		}
		this._autoVisible = value;
		if(!value) {
			this.toggleVisible = false;
			if(this.setVisible) {
				var target = this.target;
				var value = this.cacheVisible;
				if(Object.prototype.hasOwnProperty.call(target,"visible")) {
					target["visible"] = value;
				} else {
					Reflect.setProperty(target,"visible",value);
				}
			}
		}
		return this;
	}
	,delay: function(duration) {
		this._delay = duration;
		this.timeOffset = this.startTime + duration;
		return this;
	}
	,getField: function(target,propertyName) {
		var value = null;
		if(Object.prototype.hasOwnProperty.call(target,propertyName)) {
			value = Reflect.field(target,propertyName);
		} else {
			value = Reflect.getProperty(target,propertyName);
		}
		return value;
	}
	,initialize: function() {
		var details;
		var start;
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			var isField = true;
			if(Object.prototype.hasOwnProperty.call(this.target,i)) {
				start = Reflect.field(this.target,i);
			} else {
				isField = false;
				start = Reflect.getProperty(this.target,i);
			}
			if(typeof(start) == "number") {
				var target = this.properties;
				var value = null;
				if(Object.prototype.hasOwnProperty.call(target,i)) {
					value = Reflect.field(target,i);
				} else {
					value = Reflect.getProperty(target,i);
				}
				var value1 = value;
				if(start == null) {
					start = 0;
				}
				if(value1 == null) {
					value1 = 0;
				}
				details = new motion_actuators_PropertyDetails(this.target,i,start,value1 - start,isField);
				this.propertyDetails.push(details);
			}
		}
		this.detailsLength = this.propertyDetails.length;
		this.initialized = true;
	}
	,move: function() {
		this.toggleVisible = Object.prototype.hasOwnProperty.call(this.properties,"alpha") && Object.prototype.hasOwnProperty.call(this.properties,"visible");
		var tmp;
		if(this.toggleVisible && this.properties.alpha != 0) {
			var target = this.target;
			var value = null;
			if(Object.prototype.hasOwnProperty.call(target,"visible")) {
				value = Reflect.field(target,"visible");
			} else {
				value = Reflect.getProperty(target,"visible");
			}
			tmp = !value;
		} else {
			tmp = false;
		}
		if(tmp) {
			this.setVisible = true;
			var target = this.target;
			var value = null;
			if(Object.prototype.hasOwnProperty.call(target,"visible")) {
				value = Reflect.field(target,"visible");
			} else {
				value = Reflect.getProperty(target,"visible");
			}
			this.cacheVisible = value;
			var target = this.target;
			var value = true;
			if(Object.prototype.hasOwnProperty.call(target,"visible")) {
				target["visible"] = value;
			} else {
				Reflect.setProperty(target,"visible",value);
			}
		}
		this.timeOffset = this.startTime;
		motion_actuators_SimpleActuator.actuators.push(this);
		++motion_actuators_SimpleActuator.actuatorsLength;
	}
	,onUpdate: function(handler,parameters) {
		this._onUpdate = handler;
		if(parameters == null) {
			this._onUpdateParams = [];
		} else {
			this._onUpdateParams = parameters;
		}
		this.sendChange = true;
		return this;
	}
	,pause: function() {
		if(!this.paused) {
			this.paused = true;
			motion_actuators_GenericActuator.prototype.pause.call(this);
			this.pauseTime = window.performance.now() / 1000;
		}
	}
	,resume: function() {
		if(this.paused) {
			this.paused = false;
			this.timeOffset += (window.performance.now() - this.pauseTime) / 1000;
			motion_actuators_GenericActuator.prototype.resume.call(this);
		}
	}
	,setField: function(target,propertyName,value) {
		if(Object.prototype.hasOwnProperty.call(target,propertyName)) {
			target[propertyName] = value;
		} else {
			Reflect.setProperty(target,propertyName,value);
		}
	}
	,setProperty: function(details,value) {
		if(details.isField) {
			details.target[details.propertyName] = value;
		} else {
			Reflect.setProperty(details.target,details.propertyName,value);
		}
	}
	,stop: function(properties,complete,sendEvent) {
		if(this.active) {
			if(properties == null) {
				this.active = false;
				if(complete) {
					this.apply();
				}
				this.complete(sendEvent);
				return;
			}
			var _g = 0;
			var _g1 = Reflect.fields(properties);
			while(_g < _g1.length) {
				var i = _g1[_g];
				++_g;
				if(Object.prototype.hasOwnProperty.call(this.properties,i)) {
					this.active = false;
					if(complete) {
						this.apply();
					}
					this.complete(sendEvent);
					return;
				}
			}
		}
	}
	,update: function(currentTime) {
		if(!this.paused) {
			var details;
			var easing;
			var i;
			var tweenPosition = (currentTime - this.timeOffset) / this.duration;
			if(tweenPosition > 1) {
				tweenPosition = 1;
			}
			if(!this.initialized) {
				this.initialize();
			}
			if(!this.special) {
				easing = this._ease.calculate(tweenPosition);
				var _g = 0;
				var _g1 = this.detailsLength;
				while(_g < _g1) {
					var i = _g++;
					details = this.propertyDetails[i];
					var value = details.start + details.change * easing;
					if(details.isField) {
						details.target[details.propertyName] = value;
					} else {
						Reflect.setProperty(details.target,details.propertyName,value);
					}
				}
			} else {
				if(!this._reverse) {
					easing = this._ease.calculate(tweenPosition);
				} else {
					easing = this._ease.calculate(1 - tweenPosition);
				}
				var endValue;
				var _g = 0;
				var _g1 = this.detailsLength;
				while(_g < _g1) {
					var i = _g++;
					details = this.propertyDetails[i];
					if(this._smartRotation && (details.propertyName == "rotation" || details.propertyName == "rotationX" || details.propertyName == "rotationY" || details.propertyName == "rotationZ")) {
						var rotation = details.change % 360;
						if(rotation > 180) {
							rotation -= 360;
						} else if(rotation < -180) {
							rotation += 360;
						}
						endValue = details.start + rotation * easing;
					} else {
						endValue = details.start + details.change * easing;
					}
					if(!this._snapping) {
						var value = endValue;
						if(details.isField) {
							details.target[details.propertyName] = value;
						} else {
							Reflect.setProperty(details.target,details.propertyName,value);
						}
					} else {
						var value1 = Math.round(endValue);
						if(details.isField) {
							details.target[details.propertyName] = value1;
						} else {
							Reflect.setProperty(details.target,details.propertyName,value1);
						}
					}
				}
			}
			if(tweenPosition == 1) {
				if(this._repeat == 0) {
					this.active = false;
					var tmp;
					if(this.toggleVisible) {
						var target = this.target;
						var value = null;
						if(Object.prototype.hasOwnProperty.call(target,"alpha")) {
							value = Reflect.field(target,"alpha");
						} else {
							value = Reflect.getProperty(target,"alpha");
						}
						tmp = value == 0;
					} else {
						tmp = false;
					}
					if(tmp) {
						var target = this.target;
						var value = false;
						if(Object.prototype.hasOwnProperty.call(target,"visible")) {
							target["visible"] = value;
						} else {
							Reflect.setProperty(target,"visible",value);
						}
					}
					this.complete(true);
					return;
				} else {
					if(this._onRepeat != null) {
						var method = this._onRepeat;
						var params = this._onRepeatParams;
						if(params == null) {
							params = [];
						}
						method.apply(method,params);
					}
					if(this._reflect) {
						this._reverse = !this._reverse;
					}
					this.startTime = currentTime;
					this.timeOffset = this.startTime + this._delay;
					if(this._repeat > 0) {
						this._repeat--;
					}
				}
			}
			if(this.sendChange) {
				this.change();
			}
		}
	}
	,__class__: motion_actuators_SimpleActuator
});
var motion_easing_IEasing = function() { };
$hxClasses["motion.easing.IEasing"] = motion_easing_IEasing;
motion_easing_IEasing.__name__ = "motion.easing.IEasing";
motion_easing_IEasing.__isInterface__ = true;
motion_easing_IEasing.prototype = {
	calculate: null
	,ease: null
	,__class__: motion_easing_IEasing
};
var motion_easing__$Expo_ExpoEaseIn = function() {
};
$hxClasses["motion.easing._Expo.ExpoEaseIn"] = motion_easing__$Expo_ExpoEaseIn;
motion_easing__$Expo_ExpoEaseIn.__name__ = "motion.easing._Expo.ExpoEaseIn";
motion_easing__$Expo_ExpoEaseIn.__interfaces__ = [motion_easing_IEasing];
motion_easing__$Expo_ExpoEaseIn.prototype = {
	calculate: function(k) {
		if(k == 0) {
			return 0;
		} else {
			return Math.exp(6.931471805599453 * (k - 1));
		}
	}
	,ease: function(t,b,c,d) {
		if(t == 0) {
			return b;
		} else {
			return c * Math.exp(6.931471805599453 * (t / d - 1)) + b;
		}
	}
	,__class__: motion_easing__$Expo_ExpoEaseIn
};
var motion_easing__$Expo_ExpoEaseInOut = function() {
};
$hxClasses["motion.easing._Expo.ExpoEaseInOut"] = motion_easing__$Expo_ExpoEaseInOut;
motion_easing__$Expo_ExpoEaseInOut.__name__ = "motion.easing._Expo.ExpoEaseInOut";
motion_easing__$Expo_ExpoEaseInOut.__interfaces__ = [motion_easing_IEasing];
motion_easing__$Expo_ExpoEaseInOut.prototype = {
	calculate: function(k) {
		if(k == 0) {
			return 0;
		}
		if(k == 1) {
			return 1;
		}
		if((k /= 0.5) < 1.0) {
			return 0.5 * Math.exp(6.931471805599453 * (k - 1));
		}
		return 0.5 * (2 - Math.exp(-6.931471805599453 * --k));
	}
	,ease: function(t,b,c,d) {
		if(t == 0) {
			return b;
		}
		if(t == d) {
			return b + c;
		}
		if((t /= d / 2.0) < 1.0) {
			return c / 2 * Math.exp(6.931471805599453 * (t - 1)) + b;
		}
		return c / 2 * (2 - Math.exp(-6.931471805599453 * --t)) + b;
	}
	,__class__: motion_easing__$Expo_ExpoEaseInOut
};
var motion_easing__$Expo_ExpoEaseOut = function() {
};
$hxClasses["motion.easing._Expo.ExpoEaseOut"] = motion_easing__$Expo_ExpoEaseOut;
motion_easing__$Expo_ExpoEaseOut.__name__ = "motion.easing._Expo.ExpoEaseOut";
motion_easing__$Expo_ExpoEaseOut.__interfaces__ = [motion_easing_IEasing];
motion_easing__$Expo_ExpoEaseOut.prototype = {
	calculate: function(k) {
		if(k == 1) {
			return 1;
		} else {
			return 1 - Math.exp(-6.931471805599453 * k);
		}
	}
	,ease: function(t,b,c,d) {
		if(t == d) {
			return b + c;
		} else {
			return c * (1 - Math.exp(-6.931471805599453 * t / d)) + b;
		}
	}
	,__class__: motion_easing__$Expo_ExpoEaseOut
};
var motion_easing_Expo = function() { };
$hxClasses["motion.easing.Expo"] = motion_easing_Expo;
motion_easing_Expo.__name__ = "motion.easing.Expo";
var motion_Actuate = function() { };
$hxClasses["motion.Actuate"] = motion_Actuate;
motion_Actuate.__name__ = "motion.Actuate";
motion_Actuate.apply = function(target,properties,customActuator) {
	motion_Actuate.stop(target,properties);
	if(customActuator == null) {
		customActuator = motion_Actuate.defaultActuator;
	}
	var actuator = Type.createInstance(customActuator,[target,0,properties]);
	actuator.apply();
	return actuator;
};
motion_Actuate.getLibrary = function(target,allowCreation) {
	if(allowCreation == null) {
		allowCreation = true;
	}
	if(motion_Actuate.targetLibraries.h.__keys__[target.__id__] == null && allowCreation) {
		motion_Actuate.targetLibraries.set(target,[]);
	}
	return motion_Actuate.targetLibraries.h[target.__id__];
};
motion_Actuate.isActive = function() {
	var result = false;
	var library = motion_Actuate.targetLibraries.iterator();
	while(library.hasNext()) {
		var library1 = library.next();
		result = true;
		break;
	}
	return result;
};
motion_Actuate.motionPath = function(target,duration,properties,overwrite) {
	if(overwrite == null) {
		overwrite = true;
	}
	return motion_Actuate.tween(target,duration,properties,overwrite,motion_actuators_MotionPathActuator);
};
motion_Actuate.pause = function(target) {
	if(js_Boot.__implements(target,motion_actuators_IGenericActuator)) {
		var actuator = target;
		actuator.pause();
	} else {
		var library = motion_Actuate.getLibrary(target,false);
		if(library != null) {
			var _g = 0;
			while(_g < library.length) {
				var actuator = library[_g];
				++_g;
				actuator.pause();
			}
		}
	}
};
motion_Actuate.pauseAll = function() {
	var library = motion_Actuate.targetLibraries.iterator();
	while(library.hasNext()) {
		var library1 = library.next();
		var _g = 0;
		while(_g < library1.length) {
			var actuator = library1[_g];
			++_g;
			actuator.pause();
		}
	}
};
motion_Actuate.reset = function() {
	var library = motion_Actuate.targetLibraries.iterator();
	while(library.hasNext()) {
		var library1 = library.next();
		var i = library1.length - 1;
		while(i >= 0) {
			library1[i].stop(null,false,false);
			--i;
		}
	}
	motion_Actuate.targetLibraries = new haxe_ds_ObjectMap();
};
motion_Actuate.resume = function(target) {
	if(js_Boot.__implements(target,motion_actuators_IGenericActuator)) {
		var actuator = target;
		actuator.resume();
	} else {
		var library = motion_Actuate.getLibrary(target,false);
		if(library != null) {
			var _g = 0;
			while(_g < library.length) {
				var actuator = library[_g];
				++_g;
				actuator.resume();
			}
		}
	}
};
motion_Actuate.resumeAll = function() {
	var library = motion_Actuate.targetLibraries.iterator();
	while(library.hasNext()) {
		var library1 = library.next();
		var _g = 0;
		while(_g < library1.length) {
			var actuator = library1[_g];
			++_g;
			actuator.resume();
		}
	}
};
motion_Actuate.stop = function(target,properties,complete,sendEvent) {
	if(sendEvent == null) {
		sendEvent = true;
	}
	if(complete == null) {
		complete = false;
	}
	if(target != null) {
		if(js_Boot.__implements(target,motion_actuators_IGenericActuator)) {
			var actuator = target;
			actuator.stop(null,complete,sendEvent);
		} else {
			var library = motion_Actuate.getLibrary(target,false);
			if(library != null) {
				if(typeof(properties) == "string") {
					var temp = { };
					temp[properties] = null;
					properties = temp;
				} else if(((properties) instanceof Array)) {
					var temp = { };
					var _g = 0;
					var _g1 = js_Boot.__cast(properties , Array);
					while(_g < _g1.length) {
						var property = _g1[_g];
						++_g;
						temp[property] = null;
					}
					properties = temp;
				}
				var i = library.length - 1;
				while(i >= 0) {
					library[i].stop(properties,complete,sendEvent);
					--i;
				}
			}
		}
	}
};
motion_Actuate.timer = function(duration,customActuator) {
	return motion_Actuate.tween(new motion__$Actuate_TweenTimer(0),duration,new motion__$Actuate_TweenTimer(1),false,customActuator);
};
motion_Actuate.tween = function(target,duration,properties,overwrite,customActuator) {
	if(overwrite == null) {
		overwrite = true;
	}
	if(target != null) {
		if(duration > 0) {
			if(customActuator == null) {
				customActuator = motion_Actuate.defaultActuator;
			}
			var actuator = Type.createInstance(customActuator,[target,duration,properties]);
			var library = motion_Actuate.getLibrary(actuator.target);
			if(overwrite) {
				var i = library.length - 1;
				while(i >= 0) {
					library[i].stop(actuator.properties,false,false);
					--i;
				}
				library = motion_Actuate.getLibrary(actuator.target);
			}
			library.push(actuator);
			actuator.move();
			return actuator;
		} else {
			return motion_Actuate.apply(target,properties,customActuator);
		}
	}
	return null;
};
motion_Actuate.unload = function(actuator) {
	var target = actuator.target;
	if(motion_Actuate.targetLibraries.h.__keys__[target.__id__] != null) {
		HxOverrides.remove(motion_Actuate.targetLibraries.h[target.__id__],actuator);
		if(motion_Actuate.targetLibraries.h[target.__id__].length == 0) {
			motion_Actuate.targetLibraries.remove(target);
		}
	}
};
motion_Actuate.update = function(target,duration,start,end,overwrite) {
	if(overwrite == null) {
		overwrite = true;
	}
	var properties = { start : start, end : end};
	return motion_Actuate.tween(target,duration,properties,overwrite,motion_actuators_MethodActuator);
};
var motion__$Actuate_TweenTimer = function(progress) {
	this.progress = progress;
};
$hxClasses["motion._Actuate.TweenTimer"] = motion__$Actuate_TweenTimer;
motion__$Actuate_TweenTimer.__name__ = "motion._Actuate.TweenTimer";
motion__$Actuate_TweenTimer.prototype = {
	progress: null
	,__class__: motion__$Actuate_TweenTimer
};
var motion_MotionPath = function() {
	this._x = new motion__$MotionPath_ComponentPath();
	this._y = new motion__$MotionPath_ComponentPath();
	this._rotation = null;
};
$hxClasses["motion.MotionPath"] = motion_MotionPath;
motion_MotionPath.__name__ = "motion.MotionPath";
motion_MotionPath.prototype = {
	_rotation: null
	,_x: null
	,_y: null
	,bezier: function(x,y,controlX,controlY,strength) {
		if(strength == null) {
			strength = 1;
		}
		return this.bezierN(x,y,[controlX],[controlY],strength);
	}
	,bezierN: function(x,y,controlX,controlY,strength) {
		if(strength == null) {
			strength = 1;
		}
		this._x.addPath(new motion__$MotionPath_BezierPath(x,controlX,strength));
		this._y.addPath(new motion__$MotionPath_BezierPath(y,controlY,strength));
		return this;
	}
	,bezierSpline: function(x,y,strength) {
		if(strength == null) {
			strength = 1;
		}
		this._x.addPath(new motion__$MotionPath_BezierSplinePath(x,strength));
		this._y.addPath(new motion__$MotionPath_BezierSplinePath(y,strength));
		return this;
	}
	,line: function(x,y,strength) {
		if(strength == null) {
			strength = 1;
		}
		return this.bezierN(x,y,[],[],strength);
	}
	,get_rotation: function() {
		if(this._rotation == null) {
			this._rotation = new motion__$MotionPath_RotationPath(this._x,this._y);
		}
		return this._rotation;
	}
	,get_x: function() {
		return this._x;
	}
	,get_y: function() {
		return this._y;
	}
	,__class__: motion_MotionPath
	,__properties__: {get_y:"get_y",get_x:"get_x",get_rotation:"get_rotation"}
};
var motion_IComponentPath = function() { };
$hxClasses["motion.IComponentPath"] = motion_IComponentPath;
motion_IComponentPath.__name__ = "motion.IComponentPath";
motion_IComponentPath.__isInterface__ = true;
motion_IComponentPath.prototype = {
	get_start: null
	,set_start: null
	,get_end: null
	,end: null
	,strength: null
	,calculate: null
	,__class__: motion_IComponentPath
	,__properties__: {get_end:"get_end",set_start:"set_start",get_start:"get_start"}
};
var motion__$MotionPath_ComponentPath = function() {
	this.paths = [];
	this.strength = 0;
};
$hxClasses["motion._MotionPath.ComponentPath"] = motion__$MotionPath_ComponentPath;
motion__$MotionPath_ComponentPath.__name__ = "motion._MotionPath.ComponentPath";
motion__$MotionPath_ComponentPath.__interfaces__ = [motion_IComponentPath];
motion__$MotionPath_ComponentPath.prototype = {
	strength: null
	,paths: null
	,addPath: function(path) {
		if(this.paths.length > 0) {
			path.set_start(this.paths[this.paths.length - 1].get_end());
		}
		this.paths.push(path);
		this.strength += path.strength;
	}
	,calculate: function(k) {
		if(this.paths.length == 1) {
			return this.paths[0].calculate(k);
		} else {
			var ratio = k * this.strength;
			var _g = 0;
			var _g1 = this.paths;
			while(_g < _g1.length) {
				var path = _g1[_g];
				++_g;
				if(ratio > path.strength) {
					ratio -= path.strength;
				} else {
					return path.calculate(ratio / path.strength);
				}
			}
		}
		return 0;
	}
	,get_start: function() {
		if(this.paths.length > 0) {
			return this.paths[0].get_start();
		} else {
			return 0;
		}
	}
	,set_start: function(value) {
		if(this.paths.length > 0) {
			return this.paths[0].set_start(value);
		} else {
			return 0;
		}
	}
	,get_end: function() {
		if(this.paths.length > 0) {
			var path = this.paths[this.paths.length - 1];
			return path.get_end();
		} else {
			return this.get_start();
		}
	}
	,__class__: motion__$MotionPath_ComponentPath
	,__properties__: {get_end:"get_end",set_start:"set_start",get_start:"get_start"}
};
var motion__$MotionPath_BezierPath = function(end,control,strength) {
	this._end = end;
	this.control = control;
	this.strength = strength;
};
$hxClasses["motion._MotionPath.BezierPath"] = motion__$MotionPath_BezierPath;
motion__$MotionPath_BezierPath.__name__ = "motion._MotionPath.BezierPath";
motion__$MotionPath_BezierPath.__interfaces__ = [motion_IComponentPath];
motion__$MotionPath_BezierPath.prototype = {
	control: null
	,end: null
	,strength: null
	,_start: null
	,_end: null
	,calculate: function(k) {
		var l = 1 - k;
		switch(this.control.length) {
		case 0:
			return l * this._start + k * this._end;
		case 1:
			return l * l * this._start + 2 * l * k * this.control[0] + k * k * this._end;
		case 2:
			return l * l * l * this._start + 3 * l * l * k * this.control[0] + 3 * l * k * k * this.control[1] + k * k * k * this._end;
		default:
			if(l < 1e-7) {
				return this._end;
			}
			var r = k / l;
			var n = this.control.length + 1;
			var coeff = Math.pow(l,n);
			var res = coeff * this._start;
			var _g = 1;
			var _g1 = n;
			while(_g < _g1) {
				var i = _g++;
				coeff *= r * (n + 1 - i) / i;
				res += coeff * this.control[i - 1];
			}
			coeff *= r / n;
			return res + coeff * this._end;
		}
	}
	,get_start: function() {
		return this._start;
	}
	,set_start: function(value) {
		return this._start = value;
	}
	,get_end: function() {
		return this._end;
	}
	,__class__: motion__$MotionPath_BezierPath
	,__properties__: {get_end:"get_end",set_start:"set_start",get_start:"get_start"}
};
var motion__$MotionPath_BezierSplinePath = function(through,strength) {
	motion__$MotionPath_ComponentPath.call(this);
	this.through = through;
	this.strength = strength;
};
$hxClasses["motion._MotionPath.BezierSplinePath"] = motion__$MotionPath_BezierSplinePath;
motion__$MotionPath_BezierSplinePath.__name__ = "motion._MotionPath.BezierSplinePath";
motion__$MotionPath_BezierSplinePath.__super__ = motion__$MotionPath_ComponentPath;
motion__$MotionPath_BezierSplinePath.prototype = $extend(motion__$MotionPath_ComponentPath.prototype,{
	through: null
	,computeControlPoints: function(start) {
		var K = [start].concat(this.through);
		var n = K.length;
		var _g = [];
		var _g1 = 0;
		var _g2 = n;
		while(_g1 < _g2) {
			var _ = _g1++;
			_g.push([0.0,0.0]);
		}
		var control = _g;
		var a = [];
		var b = [];
		var c = [];
		var r = [];
		a[0] = 0;
		b[0] = 2;
		c[0] = 1;
		r[0] = K[0] + 2 * K[1];
		var _g = 1;
		var _g1 = n - 1;
		while(_g < _g1) {
			var i = _g++;
			a[i] = 1;
			b[i] = 4;
			c[i] = 1;
			r[i] = 4 * K[i] + 2 * K[i + 1];
		}
		a[n - 1] = 1;
		b[n - 1] = 2;
		c[n - 1] = 0;
		r[n - 1] = 3 * K[n - 1];
		var _g = 1;
		var _g1 = n;
		while(_g < _g1) {
			var i = _g++;
			var m = a[i] / b[i - 1];
			b[i] -= m * c[i - 1];
			r[i] -= m * r[i - 1];
		}
		control[n - 1][0] = r[n - 1] / b[n - 1];
		var i = n - 2;
		while(i >= 0) {
			control[i][0] = (r[i] - c[i] * control[i + 1][0]) / b[i];
			--i;
		}
		var _g = 0;
		var _g1 = n - 1;
		while(_g < _g1) {
			var i = _g++;
			control[i][1] = 2 * K[i + 1] - control[i + 1][0];
		}
		control[n - 1][1] = 0.5 * (K[n] + control[n - 1][0]);
		control.pop();
		return control;
	}
	,set_start: function(value) {
		if(this.paths.length == 0 || Math.abs(value - this.get_start()) > 1e-7) {
			var control = this.computeControlPoints(value);
			var pathStrength = this.strength / control.length;
			this.strength = 0;
			this.paths.splice(0,this.paths.length);
			var _g = 0;
			var _g1 = control.length;
			while(_g < _g1) {
				var i = _g++;
				this.addPath(new motion__$MotionPath_BezierPath(this.through[i],control[i],pathStrength));
			}
		}
		return motion__$MotionPath_ComponentPath.prototype.set_start.call(this,value);
	}
	,get_end: function() {
		return this.through[this.through.length - 1];
	}
	,__class__: motion__$MotionPath_BezierSplinePath
});
var motion__$MotionPath_RotationPath = function(x,y) {
	this.step = 0.01;
	this._x = x;
	this._y = y;
	this.offset = 0;
	this.set_start(this.calculate(0.0));
};
$hxClasses["motion._MotionPath.RotationPath"] = motion__$MotionPath_RotationPath;
motion__$MotionPath_RotationPath.__name__ = "motion._MotionPath.RotationPath";
motion__$MotionPath_RotationPath.__interfaces__ = [motion_IComponentPath];
motion__$MotionPath_RotationPath.prototype = {
	offset: null
	,strength: null
	,_start: null
	,step: null
	,_x: null
	,_y: null
	,calculate: function(k) {
		var dX = this._x.calculate(k) - this._x.calculate(k + this.step);
		var dY = this._y.calculate(k) - this._y.calculate(k + this.step);
		var angle = Math.atan2(dY,dX) * (180 / Math.PI);
		angle = (angle + this.offset) % 360;
		return angle;
	}
	,get_start: function() {
		return this._start;
	}
	,set_start: function(value) {
		return this._start;
	}
	,get_end: function() {
		return this.calculate(1.0);
	}
	,__class__: motion__$MotionPath_RotationPath
	,__properties__: {set_start:"set_start",get_start:"get_start",get_end:"get_end"}
};
var motion_actuators_MethodActuator = function(target,duration,properties) {
	this.currentParameters = [];
	this.tweenProperties = { };
	motion_actuators_SimpleActuator.call(this,target,duration,properties);
	if(!Object.prototype.hasOwnProperty.call(properties,"start")) {
		this.properties.start = [];
	}
	if(!Object.prototype.hasOwnProperty.call(properties,"end")) {
		this.properties.end = this.properties.start;
	}
	var _g = 0;
	var _g1 = this.properties.start.length;
	while(_g < _g1) {
		var i = _g++;
		this.currentParameters.push(this.properties.start[i]);
	}
};
$hxClasses["motion.actuators.MethodActuator"] = motion_actuators_MethodActuator;
motion_actuators_MethodActuator.__name__ = "motion.actuators.MethodActuator";
motion_actuators_MethodActuator.__super__ = motion_actuators_SimpleActuator;
motion_actuators_MethodActuator.prototype = $extend(motion_actuators_SimpleActuator.prototype,{
	currentParameters: null
	,tweenProperties: null
	,apply: function() {
		var method = this.target;
		var params = this.properties.end;
		if(params == null) {
			params = [];
		}
		method.apply(method,params);
	}
	,complete: function(sendEvent) {
		if(sendEvent == null) {
			sendEvent = true;
		}
		var _g = 0;
		var _g1 = this.properties.start.length;
		while(_g < _g1) {
			var i = _g++;
			this.currentParameters[i] = Reflect.field(this.tweenProperties,"param" + i);
		}
		var method = this.target;
		var params = this.currentParameters;
		if(params == null) {
			params = [];
		}
		method.apply(method,params);
		motion_actuators_SimpleActuator.prototype.complete.call(this,sendEvent);
	}
	,initialize: function() {
		var details;
		var propertyName;
		var start;
		var _g = 0;
		var _g1 = this.properties.start.length;
		while(_g < _g1) {
			var i = _g++;
			propertyName = "param" + i;
			start = this.properties.start[i];
			this.tweenProperties[propertyName] = start;
			if(typeof(start) == "number" || typeof(start) == "number" && ((start | 0) === start)) {
				details = new motion_actuators_PropertyDetails(this.tweenProperties,propertyName,start,this.properties.end[i] - start);
				this.propertyDetails.push(details);
			}
		}
		this.detailsLength = this.propertyDetails.length;
		this.initialized = true;
	}
	,update: function(currentTime) {
		motion_actuators_SimpleActuator.prototype.update.call(this,currentTime);
		if(this.active && !this.paused) {
			var _g = 0;
			var _g1 = this.properties.start.length;
			while(_g < _g1) {
				var i = _g++;
				this.currentParameters[i] = Reflect.field(this.tweenProperties,"param" + i);
			}
			var method = this.target;
			var params = this.currentParameters;
			if(params == null) {
				params = [];
			}
			method.apply(method,params);
		}
	}
	,__class__: motion_actuators_MethodActuator
});
var motion_actuators_MotionPathActuator = function(target,duration,properties) {
	motion_actuators_SimpleActuator.call(this,target,duration,properties);
};
$hxClasses["motion.actuators.MotionPathActuator"] = motion_actuators_MotionPathActuator;
motion_actuators_MotionPathActuator.__name__ = "motion.actuators.MotionPathActuator";
motion_actuators_MotionPathActuator.__super__ = motion_actuators_SimpleActuator;
motion_actuators_MotionPathActuator.prototype = $extend(motion_actuators_SimpleActuator.prototype,{
	apply: function() {
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var propertyName = _g1[_g];
			++_g;
			if(Object.prototype.hasOwnProperty.call(this.target,propertyName)) {
				this.target[propertyName] = (js_Boot.__cast(Reflect.field(this.properties,propertyName) , motion_IComponentPath)).get_end();
			} else {
				Reflect.setProperty(this.target,propertyName,(js_Boot.__cast(Reflect.field(this.properties,propertyName) , motion_IComponentPath)).get_end());
			}
		}
	}
	,initialize: function() {
		var details;
		var path;
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var propertyName = _g1[_g];
			++_g;
			path = js_Boot.__cast(Reflect.field(this.properties,propertyName) , motion_IComponentPath);
			if(path != null) {
				var isField = true;
				if(Object.prototype.hasOwnProperty.call(this.target,propertyName)) {
					path.set_start(Reflect.field(this.target,propertyName));
				} else {
					isField = false;
					path.set_start(Reflect.getProperty(this.target,propertyName));
				}
				details = new motion_actuators_PropertyPathDetails(this.target,propertyName,path,isField);
				this.propertyDetails.push(details);
			}
		}
		this.detailsLength = this.propertyDetails.length;
		this.initialized = true;
	}
	,update: function(currentTime) {
		if(!this.paused) {
			var details;
			var easing;
			var tweenPosition = (currentTime - this.timeOffset) / this.duration;
			if(tweenPosition > 1) {
				tweenPosition = 1;
			}
			if(!this.initialized) {
				this.initialize();
			}
			if(!this.special) {
				easing = this._ease.calculate(tweenPosition);
				var _g = 0;
				var _g1 = this.propertyDetails;
				while(_g < _g1.length) {
					var details = _g1[_g];
					++_g;
					if(details.isField) {
						details.target[details.propertyName] = (js_Boot.__cast(details , motion_actuators_PropertyPathDetails)).path.calculate(easing);
					} else {
						Reflect.setProperty(details.target,details.propertyName,(js_Boot.__cast(details , motion_actuators_PropertyPathDetails)).path.calculate(easing));
					}
				}
			} else {
				if(!this._reverse) {
					easing = this._ease.calculate(tweenPosition);
				} else {
					easing = this._ease.calculate(1 - tweenPosition);
				}
				var endValue;
				var _g = 0;
				var _g1 = this.propertyDetails;
				while(_g < _g1.length) {
					var details = _g1[_g];
					++_g;
					if(!this._snapping) {
						if(details.isField) {
							details.target[details.propertyName] = (js_Boot.__cast(details , motion_actuators_PropertyPathDetails)).path.calculate(easing);
						} else {
							Reflect.setProperty(details.target,details.propertyName,(js_Boot.__cast(details , motion_actuators_PropertyPathDetails)).path.calculate(easing));
						}
					} else if(details.isField) {
						details.target[details.propertyName] = Math.round((js_Boot.__cast(details , motion_actuators_PropertyPathDetails)).path.calculate(easing));
					} else {
						Reflect.setProperty(details.target,details.propertyName,Math.round((js_Boot.__cast(details , motion_actuators_PropertyPathDetails)).path.calculate(easing)));
					}
				}
			}
			if(tweenPosition == 1) {
				if(this._repeat == 0) {
					this.active = false;
					var tmp;
					if(this.toggleVisible) {
						var target = this.target;
						var value = null;
						if(Object.prototype.hasOwnProperty.call(target,"alpha")) {
							value = Reflect.field(target,"alpha");
						} else {
							value = Reflect.getProperty(target,"alpha");
						}
						tmp = value == 0;
					} else {
						tmp = false;
					}
					if(tmp) {
						var target = this.target;
						var value = false;
						if(Object.prototype.hasOwnProperty.call(target,"visible")) {
							target["visible"] = value;
						} else {
							Reflect.setProperty(target,"visible",value);
						}
					}
					this.complete(true);
					return;
				} else {
					if(this._onRepeat != null) {
						var method = this._onRepeat;
						var params = this._onRepeatParams;
						if(params == null) {
							params = [];
						}
						method.apply(method,params);
					}
					if(this._reflect) {
						this._reverse = !this._reverse;
					}
					this.startTime = currentTime;
					this.timeOffset = this.startTime + this._delay;
					if(this._repeat > 0) {
						this._repeat--;
					}
				}
			}
			if(this.sendChange) {
				this.change();
			}
		}
	}
	,__class__: motion_actuators_MotionPathActuator
});
var motion_actuators_PropertyDetails = function(target,propertyName,start,change,isField) {
	if(isField == null) {
		isField = true;
	}
	this.target = target;
	this.propertyName = propertyName;
	this.start = start;
	this.change = change;
	this.isField = isField;
};
$hxClasses["motion.actuators.PropertyDetails"] = motion_actuators_PropertyDetails;
motion_actuators_PropertyDetails.__name__ = "motion.actuators.PropertyDetails";
motion_actuators_PropertyDetails.prototype = {
	change: null
	,isField: null
	,propertyName: null
	,start: null
	,target: null
	,__class__: motion_actuators_PropertyDetails
};
var motion_actuators_PropertyPathDetails = function(target,propertyName,path,isField) {
	if(isField == null) {
		isField = true;
	}
	motion_actuators_PropertyDetails.call(this,target,propertyName,0,0,isField);
	this.path = path;
};
$hxClasses["motion.actuators.PropertyPathDetails"] = motion_actuators_PropertyPathDetails;
motion_actuators_PropertyPathDetails.__name__ = "motion.actuators.PropertyPathDetails";
motion_actuators_PropertyPathDetails.__super__ = motion_actuators_PropertyDetails;
motion_actuators_PropertyPathDetails.prototype = $extend(motion_actuators_PropertyDetails.prototype,{
	path: null
	,__class__: motion_actuators_PropertyPathDetails
});
var motion_easing__$Quad_QuadEaseIn = function() {
};
$hxClasses["motion.easing._Quad.QuadEaseIn"] = motion_easing__$Quad_QuadEaseIn;
motion_easing__$Quad_QuadEaseIn.__name__ = "motion.easing._Quad.QuadEaseIn";
motion_easing__$Quad_QuadEaseIn.__interfaces__ = [motion_easing_IEasing];
motion_easing__$Quad_QuadEaseIn.prototype = {
	calculate: function(k) {
		return k * k;
	}
	,ease: function(t,b,c,d) {
		return c * (t /= d) * t + b;
	}
	,__class__: motion_easing__$Quad_QuadEaseIn
};
var motion_easing__$Quad_QuadEaseInOut = function() {
};
$hxClasses["motion.easing._Quad.QuadEaseInOut"] = motion_easing__$Quad_QuadEaseInOut;
motion_easing__$Quad_QuadEaseInOut.__name__ = "motion.easing._Quad.QuadEaseInOut";
motion_easing__$Quad_QuadEaseInOut.__interfaces__ = [motion_easing_IEasing];
motion_easing__$Quad_QuadEaseInOut.prototype = {
	calculate: function(k) {
		if((k *= 2) < 1) {
			return 0.5 * k * k;
		}
		return -0.5 * ((k - 1) * (k - 3) - 1);
	}
	,ease: function(t,b,c,d) {
		if((t /= d / 2) < 1) {
			return c / 2 * t * t + b;
		}
		return -c / 2 * ((t - 1) * (t - 3) - 1) + b;
	}
	,__class__: motion_easing__$Quad_QuadEaseInOut
};
var motion_easing__$Quad_QuadEaseOut = function() {
};
$hxClasses["motion.easing._Quad.QuadEaseOut"] = motion_easing__$Quad_QuadEaseOut;
motion_easing__$Quad_QuadEaseOut.__name__ = "motion.easing._Quad.QuadEaseOut";
motion_easing__$Quad_QuadEaseOut.__interfaces__ = [motion_easing_IEasing];
motion_easing__$Quad_QuadEaseOut.prototype = {
	calculate: function(k) {
		return -k * (k - 2);
	}
	,ease: function(t,b,c,d) {
		return -c * (t /= d) * (t - 2) + b;
	}
	,__class__: motion_easing__$Quad_QuadEaseOut
};
var motion_easing_Quad = function() { };
$hxClasses["motion.easing.Quad"] = motion_easing_Quad;
motion_easing_Quad.__name__ = "motion.easing.Quad";
var reader_ShapeJsonReader = function() { };
$hxClasses["reader.ShapeJsonReader"] = reader_ShapeJsonReader;
reader_ShapeJsonReader.__name__ = "reader.ShapeJsonReader";
reader_ShapeJsonReader.shapeDataFromJson = function(jsonData) {
	var json = JSON.parse(jsonData);
	var shapeDatas = json.shapes;
	return shapeDatas;
};
reader_ShapeJsonReader.shapesFromJson = function(jsonData) {
	var json = JSON.parse(jsonData);
	var shapeDatas = json.shapes;
	var shapes = [];
	var i = 0;
	var _g = 0;
	while(_g < shapeDatas.length) {
		var shapeData = shapeDatas[_g];
		++_g;
		var colorArr = shapeData.color;
		var r = (colorArr[0] | 0) & 255;
		var g = (colorArr[1] | 0) & 255;
		var b = (colorArr[2] | 0) & 255;
		var a = (colorArr[3] | 0) & 255;
		var color = util_FlxColor._new();
		var Alpha = 255;
		if(Alpha == null) {
			Alpha = 255;
		}
		color &= -16711681;
		color |= (r > 255 ? 255 : r < 0 ? 0 : r) << 16;
		color &= -65281;
		color |= (g > 255 ? 255 : g < 0 ? 0 : g) << 8;
		color &= -256;
		color |= b > 255 ? 255 : b < 0 ? 0 : b;
		color &= 16777215;
		color |= (Alpha > 255 ? 255 : Alpha < 0 ? 0 : Alpha) << 24;
		var color1 = color;
		var alpha = a / 255;
		shapes.push({ type : shapeData.type, color : color1, alpha : alpha, data : shapeData.data});
		++i;
	}
	return shapes;
};
var shape_abstracts_Circle = {};
shape_abstracts_Circle.__properties__ = {set_r:"set_r",get_r:"get_r",set_y:"set_y",get_y:"get_y",set_x:"set_x",get_x:"get_x"};
shape_abstracts_Circle.get_x = function(this1) {
	return this1[0];
};
shape_abstracts_Circle.set_x = function(this1,x) {
	return this1[0] = x;
};
shape_abstracts_Circle.get_y = function(this1) {
	return this1[1];
};
shape_abstracts_Circle.set_y = function(this1,y) {
	return this1[1] = y;
};
shape_abstracts_Circle.get_r = function(this1) {
	return this1[2];
};
shape_abstracts_Circle.set_r = function(this1,r) {
	return this1[2] = r;
};
shape_abstracts_Circle.area = function(this1) {
	return Math.PI * shape_abstracts_Circle.get_r(this1) * shape_abstracts_Circle.get_r(this1);
};
var shape_abstracts_Ellipse = {};
shape_abstracts_Ellipse.__properties__ = {set_ry:"set_ry",get_ry:"get_ry",set_rx:"set_rx",get_rx:"get_rx",set_y:"set_y",get_y:"get_y",set_x:"set_x",get_x:"get_x"};
shape_abstracts_Ellipse.get_x = function(this1) {
	return this1[0];
};
shape_abstracts_Ellipse.set_x = function(this1,x) {
	return this1[0] = x;
};
shape_abstracts_Ellipse.get_y = function(this1) {
	return this1[1];
};
shape_abstracts_Ellipse.set_y = function(this1,y) {
	return this1[1] = y;
};
shape_abstracts_Ellipse.get_rx = function(this1) {
	return this1[2];
};
shape_abstracts_Ellipse.set_rx = function(this1,rx) {
	return this1[2] = rx;
};
shape_abstracts_Ellipse.get_ry = function(this1) {
	return this1[3];
};
shape_abstracts_Ellipse.set_ry = function(this1,ry) {
	return this1[3] = ry;
};
shape_abstracts_Ellipse.area = function(this1) {
	return Math.PI * shape_abstracts_Ellipse.get_rx(this1) * shape_abstracts_Ellipse.get_ry(this1);
};
var shape_abstracts_Rectangle = {};
shape_abstracts_Rectangle.__properties__ = {set_y2:"set_y2",get_y2:"get_y2",set_x2:"set_x2",get_x2:"get_x2",set_y1:"set_y1",get_y1:"get_y1",set_x1:"set_x1",get_x1:"get_x1"};
shape_abstracts_Rectangle.get_x1 = function(this1) {
	return this1[0];
};
shape_abstracts_Rectangle.set_x1 = function(this1,x) {
	return this1[0] = x;
};
shape_abstracts_Rectangle.get_y1 = function(this1) {
	return this1[1];
};
shape_abstracts_Rectangle.set_y1 = function(this1,y) {
	return this1[1] = y;
};
shape_abstracts_Rectangle.get_x2 = function(this1) {
	return this1[2];
};
shape_abstracts_Rectangle.set_x2 = function(this1,x) {
	return this1[2] = x;
};
shape_abstracts_Rectangle.get_y2 = function(this1) {
	return this1[3];
};
shape_abstracts_Rectangle.set_y2 = function(this1,y) {
	return this1[3] = y;
};
shape_abstracts_Rectangle.area = function(this1) {
	return (shape_abstracts_Rectangle.get_x2(this1) - shape_abstracts_Rectangle.get_x1(this1)) * (shape_abstracts_Rectangle.get_y2(this1) - shape_abstracts_Rectangle.get_y1(this1));
};
var shape_abstracts_RotatedEllipse = {};
shape_abstracts_RotatedEllipse.__properties__ = {set_angle:"set_angle",get_angle:"get_angle",set_ry:"set_ry",get_ry:"get_ry",set_rx:"set_rx",get_rx:"get_rx",set_y:"set_y",get_y:"get_y",set_x:"set_x",get_x:"get_x"};
shape_abstracts_RotatedEllipse.get_x = function(this1) {
	return this1[0];
};
shape_abstracts_RotatedEllipse.set_x = function(this1,x) {
	return this1[0] = x;
};
shape_abstracts_RotatedEllipse.get_y = function(this1) {
	return this1[1];
};
shape_abstracts_RotatedEllipse.set_y = function(this1,y) {
	return this1[1] = y;
};
shape_abstracts_RotatedEllipse.get_rx = function(this1) {
	return this1[2];
};
shape_abstracts_RotatedEllipse.set_rx = function(this1,rx) {
	return this1[2] = rx;
};
shape_abstracts_RotatedEllipse.get_ry = function(this1) {
	return this1[3];
};
shape_abstracts_RotatedEllipse.set_ry = function(this1,ry) {
	return this1[3] = ry;
};
shape_abstracts_RotatedEllipse.get_angle = function(this1) {
	return this1[4];
};
shape_abstracts_RotatedEllipse.set_angle = function(this1,y) {
	return this1[4] = y;
};
shape_abstracts_RotatedEllipse.area = function(this1) {
	return Math.PI * shape_abstracts_RotatedEllipse.get_rx(this1) * shape_abstracts_RotatedEllipse.get_ry(this1);
};
var shape_abstracts_RotatedRectangle = {};
shape_abstracts_RotatedRectangle.__properties__ = {set_angle:"set_angle",get_angle:"get_angle",set_y2:"set_y2",get_y2:"get_y2",set_x2:"set_x2",get_x2:"get_x2",set_y1:"set_y1",get_y1:"get_y1",set_x1:"set_x1",get_x1:"get_x1"};
shape_abstracts_RotatedRectangle.get_x1 = function(this1) {
	return this1[0];
};
shape_abstracts_RotatedRectangle.set_x1 = function(this1,x) {
	return this1[0] = x;
};
shape_abstracts_RotatedRectangle.get_y1 = function(this1) {
	return this1[1];
};
shape_abstracts_RotatedRectangle.set_y1 = function(this1,y) {
	return this1[1] = y;
};
shape_abstracts_RotatedRectangle.get_x2 = function(this1) {
	return this1[2];
};
shape_abstracts_RotatedRectangle.set_x2 = function(this1,x) {
	return this1[2] = x;
};
shape_abstracts_RotatedRectangle.get_y2 = function(this1) {
	return this1[3];
};
shape_abstracts_RotatedRectangle.set_y2 = function(this1,y) {
	return this1[3] = y;
};
shape_abstracts_RotatedRectangle.get_angle = function(this1) {
	return this1[4];
};
shape_abstracts_RotatedRectangle.set_angle = function(this1,y) {
	return this1[4] = y;
};
shape_abstracts_RotatedRectangle.area = function(this1) {
	return (shape_abstracts_RotatedRectangle.get_x2(this1) - shape_abstracts_RotatedRectangle.get_x1(this1)) * (shape_abstracts_RotatedRectangle.get_y2(this1) - shape_abstracts_RotatedRectangle.get_y1(this1));
};
var shape_abstracts_Triangle = {};
shape_abstracts_Triangle.__properties__ = {set_y3:"set_y3",get_y3:"get_y3",set_x3:"set_x3",get_x3:"get_x3",set_y2:"set_y2",get_y2:"get_y2",set_x2:"set_x2",get_x2:"get_x2",set_y1:"set_y1",get_y1:"get_y1",set_x1:"set_x1",get_x1:"get_x1"};
shape_abstracts_Triangle.get_x1 = function(this1) {
	return this1[0];
};
shape_abstracts_Triangle.set_x1 = function(this1,x) {
	return this1[0] = x;
};
shape_abstracts_Triangle.get_y1 = function(this1) {
	return this1[1];
};
shape_abstracts_Triangle.set_y1 = function(this1,y) {
	return this1[1] = y;
};
shape_abstracts_Triangle.get_x2 = function(this1) {
	return this1[2];
};
shape_abstracts_Triangle.set_x2 = function(this1,x) {
	return this1[2] = x;
};
shape_abstracts_Triangle.get_y2 = function(this1) {
	return this1[3];
};
shape_abstracts_Triangle.set_y2 = function(this1,y) {
	return this1[3] = y;
};
shape_abstracts_Triangle.get_x3 = function(this1) {
	return this1[4];
};
shape_abstracts_Triangle.set_x3 = function(this1,x) {
	return this1[4] = x;
};
shape_abstracts_Triangle.get_y3 = function(this1) {
	return this1[5];
};
shape_abstracts_Triangle.set_y3 = function(this1,y) {
	return this1[5] = y;
};
shape_abstracts_Triangle.area = function(this1) {
	var area = Math.abs(shape_abstracts_Triangle.get_x1(this1) * (shape_abstracts_Triangle.get_y2(this1) - shape_abstracts_Triangle.get_y3(this1)) + shape_abstracts_Triangle.get_x2(this1) * (shape_abstracts_Triangle.get_y3(this1) - shape_abstracts_Triangle.get_y1(this1)) + shape_abstracts_Triangle.get_x3(this1) * (shape_abstracts_Triangle.get_y1(this1) - shape_abstracts_Triangle.get_y2(this1))) / 2;
	return area;
};
var util_CanvasRenderer = function(container,intrinsicWidth,intrinsicHeight) {
	container.innerHTML = "";
	this.canvas = window.document.createElement("canvas");
	this.canvas.width = intrinsicWidth;
	this.canvas.height = intrinsicHeight;
	this.canvas.className = "shapecanvas";
	this.ctx = this.canvas.getContext("2d",null);
	container.appendChild(this.canvas);
};
$hxClasses["util.CanvasRenderer"] = util_CanvasRenderer;
util_CanvasRenderer.__name__ = "util.CanvasRenderer";
util_CanvasRenderer.prototype = {
	canvas: null
	,ctx: null
	,render: function(shapes) {
		this.ctx.fillStyle = "black";
		this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
		this.ctx.save();
		this.ctx.translate(100,100);
		var _g = 0;
		while(_g < shapes.length) {
			var shape = shapes[_g];
			++_g;
			this.ctx.fillStyle = "rgba(" + (shape.color >> 16 & 255) + "," + (shape.color >> 8 & 255) + "," + (shape.color & 255) + "," + shape.alpha + ")";
			switch(shape.type) {
			case 1:
				var g = shape.data;
				var c = shape.color;
				this.ctx.fillRect(shape_abstracts_Rectangle.get_x1(g),shape_abstracts_Rectangle.get_y1(g),shape_abstracts_Rectangle.get_x2(g) - shape_abstracts_Rectangle.get_x1(g),shape_abstracts_Rectangle.get_y2(g) - shape_abstracts_Rectangle.get_y1(g));
				break;
			case 2:
				var g1 = shape.data;
				var c1 = shape.color;
				this.ctx.save();
				this.ctx.translate(shape_abstracts_RotatedRectangle.get_x1(g1) + (shape_abstracts_RotatedRectangle.get_x2(g1) - shape_abstracts_RotatedRectangle.get_x1(g1)) / 2,shape_abstracts_RotatedRectangle.get_y1(g1) + (shape_abstracts_RotatedRectangle.get_y2(g1) - shape_abstracts_RotatedRectangle.get_y1(g1)) / 2);
				this.ctx.rotate(shape_abstracts_RotatedRectangle.get_angle(g1) * (Math.PI / 180));
				this.ctx.fillRect(-(shape_abstracts_RotatedRectangle.get_x2(g1) - shape_abstracts_RotatedRectangle.get_x1(g1)) / 2,-(shape_abstracts_RotatedRectangle.get_y2(g1) - shape_abstracts_RotatedRectangle.get_y1(g1)) / 2,shape_abstracts_RotatedRectangle.get_x2(g1) - shape_abstracts_RotatedRectangle.get_x1(g1),shape_abstracts_RotatedRectangle.get_y2(g1) - shape_abstracts_RotatedRectangle.get_y1(g1));
				this.ctx.restore();
				break;
			case 4:
				var g2 = shape.data;
				var c2 = shape.color;
				this.ctx.beginPath();
				this.ctx.moveTo(shape_abstracts_Triangle.get_x1(g2),shape_abstracts_Triangle.get_y1(g2));
				this.ctx.lineTo(shape_abstracts_Triangle.get_x2(g2),shape_abstracts_Triangle.get_y2(g2));
				this.ctx.lineTo(shape_abstracts_Triangle.get_x3(g2),shape_abstracts_Triangle.get_y3(g2));
				this.ctx.lineTo(shape_abstracts_Triangle.get_x1(g2),shape_abstracts_Triangle.get_y1(g2));
				this.ctx.fill();
				break;
			case 8:
				var g3 = shape.data;
				var c3 = shape.color;
				this.ctx.beginPath();
				this.ctx.ellipse(shape_abstracts_Ellipse.get_x(g3),shape_abstracts_Ellipse.get_y(g3),shape_abstracts_Ellipse.get_rx(g3),shape_abstracts_Ellipse.get_ry(g3),0,0,360);
				this.ctx.fill();
				break;
			case 16:
				var g4 = shape.data;
				var c4 = shape.color;
				this.ctx.beginPath();
				this.ctx.ellipse(shape_abstracts_RotatedEllipse.get_x(g4),shape_abstracts_RotatedEllipse.get_y(g4),shape_abstracts_RotatedEllipse.get_rx(g4),shape_abstracts_RotatedEllipse.get_ry(g4),shape_abstracts_RotatedEllipse.get_angle(g4) * (Math.PI / 180),0,360);
				this.ctx.fill();
				break;
			case 32:
				var g5 = shape.data;
				var c5 = shape.color;
				this.ctx.beginPath();
				this.ctx.arc(shape_abstracts_Circle.get_x(g5),shape_abstracts_Circle.get_y(g5),shape_abstracts_Circle.get_r(g5),0,2 * Math.PI);
				this.ctx.fill();
				break;
			default:
				throw haxe_Exception.thrown("Encountered unsupported shape type");
			}
		}
		this.ctx.restore();
	}
	,renderShape: function(shape) {
		this.ctx.fillStyle = "rgba(" + (shape.color >> 16 & 255) + "," + (shape.color >> 8 & 255) + "," + (shape.color & 255) + "," + shape.alpha + ")";
		switch(shape.type) {
		case 1:
			var g = shape.data;
			var c = shape.color;
			this.ctx.fillRect(shape_abstracts_Rectangle.get_x1(g),shape_abstracts_Rectangle.get_y1(g),shape_abstracts_Rectangle.get_x2(g) - shape_abstracts_Rectangle.get_x1(g),shape_abstracts_Rectangle.get_y2(g) - shape_abstracts_Rectangle.get_y1(g));
			break;
		case 2:
			var g = shape.data;
			var c = shape.color;
			this.ctx.save();
			this.ctx.translate(shape_abstracts_RotatedRectangle.get_x1(g) + (shape_abstracts_RotatedRectangle.get_x2(g) - shape_abstracts_RotatedRectangle.get_x1(g)) / 2,shape_abstracts_RotatedRectangle.get_y1(g) + (shape_abstracts_RotatedRectangle.get_y2(g) - shape_abstracts_RotatedRectangle.get_y1(g)) / 2);
			this.ctx.rotate(shape_abstracts_RotatedRectangle.get_angle(g) * (Math.PI / 180));
			this.ctx.fillRect(-(shape_abstracts_RotatedRectangle.get_x2(g) - shape_abstracts_RotatedRectangle.get_x1(g)) / 2,-(shape_abstracts_RotatedRectangle.get_y2(g) - shape_abstracts_RotatedRectangle.get_y1(g)) / 2,shape_abstracts_RotatedRectangle.get_x2(g) - shape_abstracts_RotatedRectangle.get_x1(g),shape_abstracts_RotatedRectangle.get_y2(g) - shape_abstracts_RotatedRectangle.get_y1(g));
			this.ctx.restore();
			break;
		case 4:
			var g = shape.data;
			var c = shape.color;
			this.ctx.beginPath();
			this.ctx.moveTo(shape_abstracts_Triangle.get_x1(g),shape_abstracts_Triangle.get_y1(g));
			this.ctx.lineTo(shape_abstracts_Triangle.get_x2(g),shape_abstracts_Triangle.get_y2(g));
			this.ctx.lineTo(shape_abstracts_Triangle.get_x3(g),shape_abstracts_Triangle.get_y3(g));
			this.ctx.lineTo(shape_abstracts_Triangle.get_x1(g),shape_abstracts_Triangle.get_y1(g));
			this.ctx.fill();
			break;
		case 8:
			var g = shape.data;
			var c = shape.color;
			this.ctx.beginPath();
			this.ctx.ellipse(shape_abstracts_Ellipse.get_x(g),shape_abstracts_Ellipse.get_y(g),shape_abstracts_Ellipse.get_rx(g),shape_abstracts_Ellipse.get_ry(g),0,0,360);
			this.ctx.fill();
			break;
		case 16:
			var g = shape.data;
			var c = shape.color;
			this.ctx.beginPath();
			this.ctx.ellipse(shape_abstracts_RotatedEllipse.get_x(g),shape_abstracts_RotatedEllipse.get_y(g),shape_abstracts_RotatedEllipse.get_rx(g),shape_abstracts_RotatedEllipse.get_ry(g),shape_abstracts_RotatedEllipse.get_angle(g) * (Math.PI / 180),0,360);
			this.ctx.fill();
			break;
		case 32:
			var g = shape.data;
			var c = shape.color;
			this.ctx.beginPath();
			this.ctx.arc(shape_abstracts_Circle.get_x(g),shape_abstracts_Circle.get_y(g),shape_abstracts_Circle.get_r(g),0,2 * Math.PI);
			this.ctx.fill();
			break;
		default:
			throw haxe_Exception.thrown("Encountered unsupported shape type");
		}
	}
	,drawRectangle: function(g,c) {
		this.ctx.fillRect(shape_abstracts_Rectangle.get_x1(g),shape_abstracts_Rectangle.get_y1(g),shape_abstracts_Rectangle.get_x2(g) - shape_abstracts_Rectangle.get_x1(g),shape_abstracts_Rectangle.get_y2(g) - shape_abstracts_Rectangle.get_y1(g));
	}
	,drawRotatedRectangle: function(g,c) {
		this.ctx.save();
		this.ctx.translate(shape_abstracts_RotatedRectangle.get_x1(g) + (shape_abstracts_RotatedRectangle.get_x2(g) - shape_abstracts_RotatedRectangle.get_x1(g)) / 2,shape_abstracts_RotatedRectangle.get_y1(g) + (shape_abstracts_RotatedRectangle.get_y2(g) - shape_abstracts_RotatedRectangle.get_y1(g)) / 2);
		this.ctx.rotate(shape_abstracts_RotatedRectangle.get_angle(g) * (Math.PI / 180));
		this.ctx.fillRect(-(shape_abstracts_RotatedRectangle.get_x2(g) - shape_abstracts_RotatedRectangle.get_x1(g)) / 2,-(shape_abstracts_RotatedRectangle.get_y2(g) - shape_abstracts_RotatedRectangle.get_y1(g)) / 2,shape_abstracts_RotatedRectangle.get_x2(g) - shape_abstracts_RotatedRectangle.get_x1(g),shape_abstracts_RotatedRectangle.get_y2(g) - shape_abstracts_RotatedRectangle.get_y1(g));
		this.ctx.restore();
	}
	,drawTriangle: function(g,c) {
		this.ctx.beginPath();
		this.ctx.moveTo(shape_abstracts_Triangle.get_x1(g),shape_abstracts_Triangle.get_y1(g));
		this.ctx.lineTo(shape_abstracts_Triangle.get_x2(g),shape_abstracts_Triangle.get_y2(g));
		this.ctx.lineTo(shape_abstracts_Triangle.get_x3(g),shape_abstracts_Triangle.get_y3(g));
		this.ctx.lineTo(shape_abstracts_Triangle.get_x1(g),shape_abstracts_Triangle.get_y1(g));
		this.ctx.fill();
	}
	,drawEllipse: function(g,c) {
		this.ctx.beginPath();
		this.ctx.ellipse(shape_abstracts_Ellipse.get_x(g),shape_abstracts_Ellipse.get_y(g),shape_abstracts_Ellipse.get_rx(g),shape_abstracts_Ellipse.get_ry(g),0,0,360);
		this.ctx.fill();
	}
	,drawRotatedEllipse: function(g,c) {
		this.ctx.beginPath();
		this.ctx.ellipse(shape_abstracts_RotatedEllipse.get_x(g),shape_abstracts_RotatedEllipse.get_y(g),shape_abstracts_RotatedEllipse.get_rx(g),shape_abstracts_RotatedEllipse.get_ry(g),shape_abstracts_RotatedEllipse.get_angle(g) * (Math.PI / 180),0,360);
		this.ctx.fill();
	}
	,drawCircle: function(g,c) {
		this.ctx.beginPath();
		this.ctx.arc(shape_abstracts_Circle.get_x(g),shape_abstracts_Circle.get_y(g),shape_abstracts_Circle.get_r(g),0,2 * Math.PI);
		this.ctx.fill();
	}
	,__class__: util_CanvasRenderer
};
var util_Cloner = function() { };
$hxClasses["util.Cloner"] = util_Cloner;
util_Cloner.__name__ = "util.Cloner";
util_Cloner.clone = function(v) {
	var outcome = util_Cloner._clone(v);
	return outcome;
};
util_Cloner._clone = function(v) {
	if(typeof(v) == "string") {
		return v;
	}
	if(v.__name__ != null) {
		return v;
	}
	var _g = Type.typeof(v);
	switch(_g._hx_index) {
	case 0:
		return null;
	case 1:
		return v;
	case 2:
		return v;
	case 3:
		return v;
	case 4:
		return util_Cloner.handleAnonymous(v);
	case 5:
		return null;
	case 6:
		var c = _g.c;
		return util_Cloner.handleClass(c,v);
	case 7:
		var e = _g.e;
		return v;
	case 8:
		return null;
	}
};
util_Cloner.handleAnonymous = function(v) {
	var properties = Reflect.fields(v);
	var anonymous = { };
	var _g = 0;
	var _g1 = properties.length;
	while(_g < _g1) {
		var i = _g++;
		var property = properties[i];
		anonymous[property] = util_Cloner._clone(Reflect.getProperty(v,property));
	}
	return anonymous;
};
util_Cloner.handleClass = function(c,inValue) {
	var handle = util_Cloner.cloneClass;
	return handle(inValue);
};
util_Cloner.cloneArray = function(inValue) {
	var array = inValue.slice();
	var _g = 0;
	var _g1 = array.length;
	while(_g < _g1) {
		var i = _g++;
		array[i] = util_Cloner._clone(array[i]);
	}
	return array;
};
util_Cloner.cloneClass = function(inValue) {
	var outValue = Object.create(js_Boot.getClass(inValue).prototype);
	var fields = Reflect.fields(inValue);
	var _g = 0;
	var _g1 = fields.length;
	while(_g < _g1) {
		var i = _g++;
		var field = fields[i];
		var property = Reflect.getProperty(inValue,field);
		outValue[field] = util_Cloner._clone(property);
	}
	return outValue;
};
var util_ColorHelpers = function(col) {
	this.color = col;
};
$hxClasses["util.ColorHelpers"] = util_ColorHelpers;
util_ColorHelpers.__name__ = "util.ColorHelpers";
util_ColorHelpers.wrap = function(value,min,max) {
	return util_FlxColor.wrap(value,min,max);
};
util_ColorHelpers.roundDecimal = function(Value,Precision) {
	return util_FlxColor.roundDecimal(Value,Precision);
};
util_ColorHelpers.bound = function(Value,Min,Max) {
	var lowerBound = Min != null && Value < Min ? Min : Value;
	if(Max != null && lowerBound > Max) {
		return Max;
	} else {
		return lowerBound;
	}
};
util_ColorHelpers.fromInt = function(Value) {
	return util_FlxColor._new(Value);
};
util_ColorHelpers.fromRGB = function(Red,Green,Blue,Alpha) {
	if(Alpha == null) {
		Alpha = 255;
	}
	var color = util_FlxColor._new();
	var Alpha1 = Alpha;
	if(Alpha1 == null) {
		Alpha1 = 255;
	}
	color &= -16711681;
	color |= (Red > 255 ? 255 : Red < 0 ? 0 : Red) << 16;
	color &= -65281;
	color |= (Green > 255 ? 255 : Green < 0 ? 0 : Green) << 8;
	color &= -256;
	color |= Blue > 255 ? 255 : Blue < 0 ? 0 : Blue;
	color &= 16777215;
	color |= (Alpha1 > 255 ? 255 : Alpha1 < 0 ? 0 : Alpha1) << 24;
	return color;
};
util_ColorHelpers.fromRGBFloat = function(Red,Green,Blue,Alpha) {
	if(Alpha == null) {
		Alpha = 1;
	}
	var color = util_FlxColor._new();
	var Alpha1 = Alpha;
	if(Alpha1 == null) {
		Alpha1 = 1;
	}
	var Value = Math.round(Red * 255);
	color &= -16711681;
	color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
	var Value = Math.round(Green * 255);
	color &= -65281;
	color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
	var Value = Math.round(Blue * 255);
	color &= -256;
	color |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
	var Value = Math.round(Alpha1 * 255);
	color &= 16777215;
	color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
	return color;
};
util_ColorHelpers.fromCMYK = function(Cyan,Magenta,Yellow,Black,Alpha) {
	if(Alpha == null) {
		Alpha = 1;
	}
	var color = util_FlxColor._new();
	var Alpha1 = Alpha;
	if(Alpha1 == null) {
		Alpha1 = 1;
	}
	var Value = (1 - Cyan) * (1 - Black);
	var Value1 = Math.round(Value * 255);
	color &= -16711681;
	color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
	var Value = (1 - Magenta) * (1 - Black);
	var Value1 = Math.round(Value * 255);
	color &= -65281;
	color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
	var Value = (1 - Yellow) * (1 - Black);
	var Value1 = Math.round(Value * 255);
	color &= -256;
	color |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
	var Value = Math.round(Alpha1 * 255);
	color &= 16777215;
	color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
	return color;
};
util_ColorHelpers.fromHSB = function(Hue,Saturation,Brightness,Alpha) {
	if(Alpha == null) {
		Alpha = 1;
	}
	var color = util_FlxColor._new();
	var chroma = Brightness * Saturation;
	var match = Brightness - chroma;
	var Hue1 = Hue;
	var Chroma = chroma;
	Hue1 %= 360;
	var hueD = Hue1 / 60;
	var mid = Chroma * (1 - Math.abs(hueD % 2 - 1)) + match;
	Chroma += match;
	switch(hueD | 0) {
	case 0:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(Chroma * 255);
		color &= -16711681;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(mid * 255);
		color &= -65281;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(match * 255);
		color &= -256;
		color |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		color &= 16777215;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	case 1:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(mid * 255);
		color &= -16711681;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(Chroma * 255);
		color &= -65281;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(match * 255);
		color &= -256;
		color |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		color &= 16777215;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	case 2:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(match * 255);
		color &= -16711681;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(Chroma * 255);
		color &= -65281;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(mid * 255);
		color &= -256;
		color |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		color &= 16777215;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	case 3:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(match * 255);
		color &= -16711681;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(mid * 255);
		color &= -65281;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(Chroma * 255);
		color &= -256;
		color |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		color &= 16777215;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	case 4:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(mid * 255);
		color &= -16711681;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(match * 255);
		color &= -65281;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(Chroma * 255);
		color &= -256;
		color |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		color &= 16777215;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	case 5:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(Chroma * 255);
		color &= -16711681;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(match * 255);
		color &= -65281;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(mid * 255);
		color &= -256;
		color |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		color &= 16777215;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	}
	return color;
};
util_ColorHelpers.fromHSL = function(Hue,Saturation,Lightness,Alpha) {
	if(Alpha == null) {
		Alpha = 1;
	}
	var color = util_FlxColor._new();
	var chroma = (1 - Math.abs(2 * Lightness - 1)) * Saturation;
	var match = Lightness - chroma / 2;
	var Hue1 = Hue;
	var Chroma = chroma;
	Hue1 %= 360;
	var hueD = Hue1 / 60;
	var mid = Chroma * (1 - Math.abs(hueD % 2 - 1)) + match;
	Chroma += match;
	switch(hueD | 0) {
	case 0:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(Chroma * 255);
		color &= -16711681;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(mid * 255);
		color &= -65281;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(match * 255);
		color &= -256;
		color |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		color &= 16777215;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	case 1:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(mid * 255);
		color &= -16711681;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(Chroma * 255);
		color &= -65281;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(match * 255);
		color &= -256;
		color |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		color &= 16777215;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	case 2:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(match * 255);
		color &= -16711681;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(Chroma * 255);
		color &= -65281;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(mid * 255);
		color &= -256;
		color |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		color &= 16777215;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	case 3:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(match * 255);
		color &= -16711681;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(mid * 255);
		color &= -65281;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(Chroma * 255);
		color &= -256;
		color |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		color &= 16777215;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	case 4:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(mid * 255);
		color &= -16711681;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(match * 255);
		color &= -65281;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(Chroma * 255);
		color &= -256;
		color |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		color &= 16777215;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	case 5:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(Chroma * 255);
		color &= -16711681;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(match * 255);
		color &= -65281;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(mid * 255);
		color &= -256;
		color |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		color &= 16777215;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	}
	return color;
};
util_ColorHelpers.getHSBColorWheel = function(Alpha) {
	if(Alpha == null) {
		Alpha = 255;
	}
	var _g = [];
	var _g1 = 0;
	while(_g1 < 360) {
		var c = _g1++;
		_g.push(util_ColorHelpers.fromHSB(c,1.0,1.0,Alpha));
	}
	return _g;
};
util_ColorHelpers.interpolate = function(Color1,Color2,Factor) {
	if(Factor == null) {
		Factor = 0.5;
	}
	var r = ((Color2 >> 16 & 255) - (Color1 >> 16 & 255)) * Factor + (Color1 >> 16 & 255) | 0;
	var g = ((Color2 >> 8 & 255) - (Color1 >> 8 & 255)) * Factor + (Color1 >> 8 & 255) | 0;
	var b = ((Color2 & 255) - (Color1 & 255)) * Factor + (Color1 & 255) | 0;
	var a = ((Color2 >> 24 & 255) - (Color1 >> 24 & 255)) * Factor + (Color1 >> 24 & 255) | 0;
	var Alpha = a;
	if(Alpha == null) {
		Alpha = 255;
	}
	var color = util_FlxColor._new();
	var Alpha1 = Alpha;
	if(Alpha1 == null) {
		Alpha1 = 255;
	}
	color &= -16711681;
	color |= (r > 255 ? 255 : r < 0 ? 0 : r) << 16;
	color &= -65281;
	color |= (g > 255 ? 255 : g < 0 ? 0 : g) << 8;
	color &= -256;
	color |= b > 255 ? 255 : b < 0 ? 0 : b;
	color &= 16777215;
	color |= (Alpha1 > 255 ? 255 : Alpha1 < 0 ? 0 : Alpha1) << 24;
	return color;
};
util_ColorHelpers.gradient = function(Color1,Color2,Steps,Ease) {
	var output = [];
	if(Ease == null) {
		Ease = function(t) {
			return t;
		};
	}
	var _g = 0;
	var _g1 = Steps;
	while(_g < _g1) {
		var step = _g++;
		var Factor = Ease(step / (Steps - 1));
		if(Factor == null) {
			Factor = 0.5;
		}
		var r = ((Color2 >> 16 & 255) - (Color1 >> 16 & 255)) * Factor + (Color1 >> 16 & 255) | 0;
		var g = ((Color2 >> 8 & 255) - (Color1 >> 8 & 255)) * Factor + (Color1 >> 8 & 255) | 0;
		var b = ((Color2 & 255) - (Color1 & 255)) * Factor + (Color1 & 255) | 0;
		var a = ((Color2 >> 24 & 255) - (Color1 >> 24 & 255)) * Factor + (Color1 >> 24 & 255) | 0;
		var Alpha = a;
		if(Alpha == null) {
			Alpha = 255;
		}
		var color = util_FlxColor._new();
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 255;
		}
		color &= -16711681;
		color |= (r > 255 ? 255 : r < 0 ? 0 : r) << 16;
		color &= -65281;
		color |= (g > 255 ? 255 : g < 0 ? 0 : g) << 8;
		color &= -256;
		color |= b > 255 ? 255 : b < 0 ? 0 : b;
		color &= 16777215;
		color |= (Alpha1 > 255 ? 255 : Alpha1 < 0 ? 0 : Alpha1) << 24;
		output[step] = color;
	}
	return output;
};
util_ColorHelpers.multiply = function(lhs,rhs) {
	var Red = (lhs >> 16 & 255) / 255 * ((rhs >> 16 & 255) / 255);
	var Green = (lhs >> 8 & 255) / 255 * ((rhs >> 8 & 255) / 255);
	var Blue = (lhs & 255) / 255 * ((rhs & 255) / 255);
	var color = util_FlxColor._new();
	var Alpha = 1;
	if(Alpha == null) {
		Alpha = 1;
	}
	var Value = Math.round(Red * 255);
	color &= -16711681;
	color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
	var Value = Math.round(Green * 255);
	color &= -65281;
	color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
	var Value = Math.round(Blue * 255);
	color &= -256;
	color |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
	var Value = Math.round(Alpha * 255);
	color &= 16777215;
	color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
	return color;
};
util_ColorHelpers.add = function(lhs,rhs) {
	var Red = (lhs >> 16 & 255) + (rhs >> 16 & 255);
	var Green = (lhs >> 8 & 255) + (rhs >> 8 & 255);
	var Blue = (lhs & 255) + (rhs & 255);
	var color = util_FlxColor._new();
	var Alpha = 255;
	if(Alpha == null) {
		Alpha = 255;
	}
	color &= -16711681;
	color |= (Red > 255 ? 255 : Red < 0 ? 0 : Red) << 16;
	color &= -65281;
	color |= (Green > 255 ? 255 : Green < 0 ? 0 : Green) << 8;
	color &= -256;
	color |= Blue > 255 ? 255 : Blue < 0 ? 0 : Blue;
	color &= 16777215;
	color |= (Alpha > 255 ? 255 : Alpha < 0 ? 0 : Alpha) << 24;
	return color;
};
util_ColorHelpers.subtract = function(lhs,rhs) {
	var Red = (lhs >> 16 & 255) - (rhs >> 16 & 255);
	var Green = (lhs >> 8 & 255) - (rhs >> 8 & 255);
	var Blue = (lhs & 255) - (rhs & 255);
	var color = util_FlxColor._new();
	var Alpha = 255;
	if(Alpha == null) {
		Alpha = 255;
	}
	color &= -16711681;
	color |= (Red > 255 ? 255 : Red < 0 ? 0 : Red) << 16;
	color &= -65281;
	color |= (Green > 255 ? 255 : Green < 0 ? 0 : Green) << 8;
	color &= -256;
	color |= Blue > 255 ? 255 : Blue < 0 ? 0 : Blue;
	color &= 16777215;
	color |= (Alpha > 255 ? 255 : Alpha < 0 ? 0 : Alpha) << 24;
	return color;
};
util_ColorHelpers.redPart = function(color) {
	return color >> 16 & 255;
};
util_ColorHelpers.greenPart = function(color) {
	return color >> 8 & 255;
};
util_ColorHelpers.bluePart = function(color) {
	return color & 255;
};
util_ColorHelpers.alphaPart = function(color) {
	return color >> 24 & 255;
};
util_ColorHelpers.redFloatPart = function(color) {
	return (color >> 16 & 255) / 255;
};
util_ColorHelpers.greenFloatPart = function(color) {
	return (color >> 8 & 255) / 255;
};
util_ColorHelpers.blueFloatPart = function(color) {
	return (color & 255) / 255;
};
util_ColorHelpers.alphaFloatPart = function(color) {
	return (color >> 24 & 255) / 255;
};
util_ColorHelpers.getLightness = function(color) {
	return (util_ColorHelpers.getMaxColor(color) + util_ColorHelpers.getMinColor(color)) / 2;
};
util_ColorHelpers.getMaxColor = function(color) {
	return Math.max((color >> 16 & 255) / 255,Math.max((color >> 8 & 255) / 255,(color & 255) / 255));
};
util_ColorHelpers.getMinColor = function(color) {
	return Math.min((color >> 16 & 255) / 255,Math.min((color >> 8 & 255) / 255,(color & 255) / 255));
};
util_ColorHelpers.prototype = {
	getComplementHarmony: function() {
		return util_ColorHelpers.fromHSB(util_ColorHelpers.wrap((this.get_hue() | 0) + 180,0,350),Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255)),(Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255)) - Math.min((this.color >> 16 & 255) / 255,Math.min((this.color >> 8 & 255) / 255,(this.color & 255) / 255))) / Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255)),(this.color >> 24 & 255) / 255);
	}
	,getAnalogousHarmony: function(Threshold) {
		if(Threshold == null) {
			Threshold = 30;
		}
		var warmer = util_ColorHelpers.fromHSB(util_ColorHelpers.wrap((this.get_hue() | 0) - Threshold,0,350),(Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255)) - Math.min((this.color >> 16 & 255) / 255,Math.min((this.color >> 8 & 255) / 255,(this.color & 255) / 255))) / Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255)),Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255)),(this.color >> 24 & 255) / 255);
		var colder = util_ColorHelpers.fromHSB(util_ColorHelpers.wrap((this.get_hue() | 0) + Threshold,0,350),(Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255)) - Math.min((this.color >> 16 & 255) / 255,Math.min((this.color >> 8 & 255) / 255,(this.color & 255) / 255))) / Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255)),Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255)),(this.color >> 24 & 255) / 255);
		return { original : this.color, warmer : warmer, colder : colder};
	}
	,getSplitComplementHarmony: function(Threshold) {
		if(Threshold == null) {
			Threshold = 30;
		}
		var oppositeHue = util_ColorHelpers.wrap((this.get_hue() | 0) + 180,0,350);
		var warmer = util_ColorHelpers.fromHSB(util_ColorHelpers.wrap(oppositeHue - Threshold,0,350),(Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255)) - Math.min((this.color >> 16 & 255) / 255,Math.min((this.color >> 8 & 255) / 255,(this.color & 255) / 255))) / Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255)),Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255)),(this.color >> 24 & 255) / 255);
		var colder = util_ColorHelpers.fromHSB(util_ColorHelpers.wrap(oppositeHue + Threshold,0,350),(Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255)) - Math.min((this.color >> 16 & 255) / 255,Math.min((this.color >> 8 & 255) / 255,(this.color & 255) / 255))) / Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255)),Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255)),(this.color >> 24 & 255) / 255);
		return { original : this.color, warmer : warmer, colder : colder};
	}
	,getTriadicHarmony: function() {
		var triadic1 = util_ColorHelpers.fromHSB(util_ColorHelpers.wrap((this.get_hue() | 0) + 120,0,359),(Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255)) - Math.min((this.color >> 16 & 255) / 255,Math.min((this.color >> 8 & 255) / 255,(this.color & 255) / 255))) / Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255)),Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255)),(this.color >> 24 & 255) / 255);
		var triadic2 = util_ColorHelpers.fromHSB(util_ColorHelpers.wrap((util_FlxColor.get_hue(triadic1) | 0) + 120,0,359),(Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255)) - Math.min((this.color >> 16 & 255) / 255,Math.min((this.color >> 8 & 255) / 255,(this.color & 255) / 255))) / Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255)),Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255)),(this.color >> 24 & 255) / 255);
		return { color1 : this.color, color2 : triadic1, color3 : triadic2};
	}
	,to24Bit: function() {
		return this.color & 16777215;
	}
	,toHexString: function(Alpha,Prefix) {
		if(Prefix == null) {
			Prefix = true;
		}
		if(Alpha == null) {
			Alpha = true;
		}
		var tmp = Alpha ? StringTools.hex(this.color >> 24 & 255,2) : "";
		return (Prefix ? "0x" : "") + tmp + StringTools.hex(this.color >> 16 & 255,2) + StringTools.hex(this.color >> 8 & 255,2) + StringTools.hex(this.color & 255,2);
	}
	,toWebString: function() {
		var Alpha = false;
		var Prefix = false;
		if(Prefix == null) {
			Prefix = true;
		}
		if(Alpha == null) {
			Alpha = true;
		}
		var tmp = Alpha ? StringTools.hex(this.color >> 24 & 255,2) : "";
		return "#" + ((Prefix ? "0x" : "") + tmp + StringTools.hex(this.color >> 16 & 255,2) + StringTools.hex(this.color >> 8 & 255,2) + StringTools.hex(this.color & 255,2));
	}
	,getColorInfo: function() {
		var result = "0x" + StringTools.hex(this.color >> 24 & 255,2) + StringTools.hex(this.color >> 16 & 255,2) + StringTools.hex(this.color >> 8 & 255,2) + StringTools.hex(this.color & 255,2) + "\n";
		result += "Alpha: " + (this.color >> 24 & 255) + " Red: " + (this.color >> 16 & 255) + " Green: " + (this.color >> 8 & 255) + " Blue: " + (this.color & 255) + "\n";
		result += "Hue: " + util_ColorHelpers.roundDecimal(this.get_hue(),2) + " Saturation: " + util_ColorHelpers.roundDecimal((Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255)) - Math.min((this.color >> 16 & 255) / 255,Math.min((this.color >> 8 & 255) / 255,(this.color & 255) / 255))) / Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255)),2) + " Brightness: " + util_ColorHelpers.roundDecimal(Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255)),2) + " Lightness: " + util_ColorHelpers.roundDecimal((Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255)) + Math.min((this.color >> 16 & 255) / 255,Math.min((this.color >> 8 & 255) / 255,(this.color & 255) / 255))) / 2,2);
		return result;
	}
	,getDarkened: function(Factor) {
		if(Factor == null) {
			Factor = 0.2;
		}
		var lowerBound = Factor < 0 ? 0 : Factor;
		Factor = lowerBound > 1 ? 1 : lowerBound;
		var output = this.color;
		var Value = (Math.max((output >> 16 & 255) / 255,Math.max((output >> 8 & 255) / 255,(output & 255) / 255)) + Math.min((output >> 16 & 255) / 255,Math.min((output >> 8 & 255) / 255,(output & 255) / 255))) / 2 * (1 - Factor);
		var Hue = util_FlxColor.get_hue(output);
		var Alpha = (output >> 24 & 255) / 255;
		var chroma = (1 - Math.abs(2 * Value - 1)) * ((Math.max((output >> 16 & 255) / 255,Math.max((output >> 8 & 255) / 255,(output & 255) / 255)) - Math.min((output >> 16 & 255) / 255,Math.min((output >> 8 & 255) / 255,(output & 255) / 255))) / Math.max((output >> 16 & 255) / 255,Math.max((output >> 8 & 255) / 255,(output & 255) / 255)));
		var match = Value - chroma / 2;
		var Hue1 = Hue;
		var Chroma = chroma;
		Hue1 %= 360;
		var hueD = Hue1 / 60;
		var mid = Chroma * (1 - Math.abs(hueD % 2 - 1)) + match;
		Chroma += match;
		switch(hueD | 0) {
		case 0:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value = Math.round(Chroma * 255);
			output &= -16711681;
			output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
			var Value = Math.round(mid * 255);
			output &= -65281;
			output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
			var Value = Math.round(match * 255);
			output &= -256;
			output |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
			var Value = Math.round(Alpha1 * 255);
			output &= 16777215;
			output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
			break;
		case 1:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value = Math.round(mid * 255);
			output &= -16711681;
			output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
			var Value = Math.round(Chroma * 255);
			output &= -65281;
			output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
			var Value = Math.round(match * 255);
			output &= -256;
			output |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
			var Value = Math.round(Alpha1 * 255);
			output &= 16777215;
			output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
			break;
		case 2:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value = Math.round(match * 255);
			output &= -16711681;
			output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
			var Value = Math.round(Chroma * 255);
			output &= -65281;
			output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
			var Value = Math.round(mid * 255);
			output &= -256;
			output |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
			var Value = Math.round(Alpha1 * 255);
			output &= 16777215;
			output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
			break;
		case 3:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value = Math.round(match * 255);
			output &= -16711681;
			output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
			var Value = Math.round(mid * 255);
			output &= -65281;
			output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
			var Value = Math.round(Chroma * 255);
			output &= -256;
			output |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
			var Value = Math.round(Alpha1 * 255);
			output &= 16777215;
			output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
			break;
		case 4:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value = Math.round(mid * 255);
			output &= -16711681;
			output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
			var Value = Math.round(match * 255);
			output &= -65281;
			output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
			var Value = Math.round(Chroma * 255);
			output &= -256;
			output |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
			var Value = Math.round(Alpha1 * 255);
			output &= 16777215;
			output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
			break;
		case 5:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value = Math.round(Chroma * 255);
			output &= -16711681;
			output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
			var Value = Math.round(match * 255);
			output &= -65281;
			output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
			var Value = Math.round(mid * 255);
			output &= -256;
			output |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
			var Value = Math.round(Alpha1 * 255);
			output &= 16777215;
			output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
			break;
		}
		return output;
	}
	,getLightened: function(Factor) {
		if(Factor == null) {
			Factor = 0.2;
		}
		var lowerBound = Factor < 0 ? 0 : Factor;
		Factor = lowerBound > 1 ? 1 : lowerBound;
		var output = this.color;
		var Value = (Math.max((output >> 16 & 255) / 255,Math.max((output >> 8 & 255) / 255,(output & 255) / 255)) + Math.min((output >> 16 & 255) / 255,Math.min((output >> 8 & 255) / 255,(output & 255) / 255))) / 2 + (1 - (Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255)) + Math.min((this.color >> 16 & 255) / 255,Math.min((this.color >> 8 & 255) / 255,(this.color & 255) / 255))) / 2) * Factor;
		var Hue = util_FlxColor.get_hue(output);
		var Alpha = (output >> 24 & 255) / 255;
		var chroma = (1 - Math.abs(2 * Value - 1)) * ((Math.max((output >> 16 & 255) / 255,Math.max((output >> 8 & 255) / 255,(output & 255) / 255)) - Math.min((output >> 16 & 255) / 255,Math.min((output >> 8 & 255) / 255,(output & 255) / 255))) / Math.max((output >> 16 & 255) / 255,Math.max((output >> 8 & 255) / 255,(output & 255) / 255)));
		var match = Value - chroma / 2;
		var Hue1 = Hue;
		var Chroma = chroma;
		Hue1 %= 360;
		var hueD = Hue1 / 60;
		var mid = Chroma * (1 - Math.abs(hueD % 2 - 1)) + match;
		Chroma += match;
		switch(hueD | 0) {
		case 0:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value = Math.round(Chroma * 255);
			output &= -16711681;
			output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
			var Value = Math.round(mid * 255);
			output &= -65281;
			output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
			var Value = Math.round(match * 255);
			output &= -256;
			output |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
			var Value = Math.round(Alpha1 * 255);
			output &= 16777215;
			output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
			break;
		case 1:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value = Math.round(mid * 255);
			output &= -16711681;
			output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
			var Value = Math.round(Chroma * 255);
			output &= -65281;
			output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
			var Value = Math.round(match * 255);
			output &= -256;
			output |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
			var Value = Math.round(Alpha1 * 255);
			output &= 16777215;
			output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
			break;
		case 2:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value = Math.round(match * 255);
			output &= -16711681;
			output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
			var Value = Math.round(Chroma * 255);
			output &= -65281;
			output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
			var Value = Math.round(mid * 255);
			output &= -256;
			output |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
			var Value = Math.round(Alpha1 * 255);
			output &= 16777215;
			output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
			break;
		case 3:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value = Math.round(match * 255);
			output &= -16711681;
			output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
			var Value = Math.round(mid * 255);
			output &= -65281;
			output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
			var Value = Math.round(Chroma * 255);
			output &= -256;
			output |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
			var Value = Math.round(Alpha1 * 255);
			output &= 16777215;
			output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
			break;
		case 4:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value = Math.round(mid * 255);
			output &= -16711681;
			output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
			var Value = Math.round(match * 255);
			output &= -65281;
			output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
			var Value = Math.round(Chroma * 255);
			output &= -256;
			output |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
			var Value = Math.round(Alpha1 * 255);
			output &= 16777215;
			output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
			break;
		case 5:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value = Math.round(Chroma * 255);
			output &= -16711681;
			output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
			var Value = Math.round(match * 255);
			output &= -65281;
			output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
			var Value = Math.round(mid * 255);
			output &= -256;
			output |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
			var Value = Math.round(Alpha1 * 255);
			output &= 16777215;
			output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
			break;
		}
		return output;
	}
	,getInverted: function() {
		var oldAlpha = this.color >> 24 & 255;
		var lhs = -1;
		var rhs = this.color;
		var Red = (lhs >> 16 & 255) - (rhs >> 16 & 255);
		var Green = (lhs >> 8 & 255) - (rhs >> 8 & 255);
		var Blue = (lhs & 255) - (rhs & 255);
		var color = util_FlxColor._new();
		var Alpha = 255;
		if(Alpha == null) {
			Alpha = 255;
		}
		color &= -16711681;
		color |= (Red > 255 ? 255 : Red < 0 ? 0 : Red) << 16;
		color &= -65281;
		color |= (Green > 255 ? 255 : Green < 0 ? 0 : Green) << 8;
		color &= -256;
		color |= Blue > 255 ? 255 : Blue < 0 ? 0 : Blue;
		color &= 16777215;
		color |= (Alpha > 255 ? 255 : Alpha < 0 ? 0 : Alpha) << 24;
		var output = color;
		output &= 16777215;
		output |= (oldAlpha > 255 ? 255 : oldAlpha < 0 ? 0 : oldAlpha) << 24;
		return output;
	}
	,setRGB: function(Red,Green,Blue,Alpha) {
		if(Alpha == null) {
			Alpha = 255;
		}
		this.color &= -16711681;
		this.color |= (Red > 255 ? 255 : Red < 0 ? 0 : Red) << 16;
		this.color &= -65281;
		this.color |= (Green > 255 ? 255 : Green < 0 ? 0 : Green) << 8;
		this.color &= -256;
		this.color |= Blue > 255 ? 255 : Blue < 0 ? 0 : Blue;
		this.color &= 16777215;
		this.color |= (Alpha > 255 ? 255 : Alpha < 0 ? 0 : Alpha) << 24;
		return this.color;
	}
	,setRGBFloat: function(Red,Green,Blue,Alpha) {
		if(Alpha == null) {
			Alpha = 1;
		}
		var Value = Math.round(Red * 255);
		this.color &= -16711681;
		this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(Green * 255);
		this.color &= -65281;
		this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(Blue * 255);
		this.color &= -256;
		this.color |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha * 255);
		this.color &= 16777215;
		this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		return this.color;
	}
	,setCMYK: function(Cyan,Magenta,Yellow,Black,Alpha) {
		if(Alpha == null) {
			Alpha = 1;
		}
		var Value = (1 - Cyan) * (1 - Black);
		var Value1 = Math.round(Value * 255);
		this.color &= -16711681;
		this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
		var Value = (1 - Magenta) * (1 - Black);
		var Value1 = Math.round(Value * 255);
		this.color &= -65281;
		this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
		var Value = (1 - Yellow) * (1 - Black);
		var Value1 = Math.round(Value * 255);
		this.color &= -256;
		this.color |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
		var Value = Math.round(Alpha * 255);
		this.color &= 16777215;
		this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		return this.color;
	}
	,setHSB: function(Hue,Saturation,Brightness,Alpha) {
		var chroma = Brightness * Saturation;
		var match = Brightness - chroma;
		var Hue1 = Hue;
		var Chroma = chroma;
		Hue1 %= 360;
		var hueD = Hue1 / 60;
		var mid = Chroma * (1 - Math.abs(hueD % 2 - 1)) + match;
		Chroma += match;
		switch(hueD | 0) {
		case 0:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value = Math.round(Chroma * 255);
			this.color &= -16711681;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
			var Value = Math.round(mid * 255);
			this.color &= -65281;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
			var Value = Math.round(match * 255);
			this.color &= -256;
			this.color |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
			var Value = Math.round(Alpha1 * 255);
			this.color &= 16777215;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
			break;
		case 1:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value = Math.round(mid * 255);
			this.color &= -16711681;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
			var Value = Math.round(Chroma * 255);
			this.color &= -65281;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
			var Value = Math.round(match * 255);
			this.color &= -256;
			this.color |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
			var Value = Math.round(Alpha1 * 255);
			this.color &= 16777215;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
			break;
		case 2:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value = Math.round(match * 255);
			this.color &= -16711681;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
			var Value = Math.round(Chroma * 255);
			this.color &= -65281;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
			var Value = Math.round(mid * 255);
			this.color &= -256;
			this.color |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
			var Value = Math.round(Alpha1 * 255);
			this.color &= 16777215;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
			break;
		case 3:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value = Math.round(match * 255);
			this.color &= -16711681;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
			var Value = Math.round(mid * 255);
			this.color &= -65281;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
			var Value = Math.round(Chroma * 255);
			this.color &= -256;
			this.color |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
			var Value = Math.round(Alpha1 * 255);
			this.color &= 16777215;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
			break;
		case 4:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value = Math.round(mid * 255);
			this.color &= -16711681;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
			var Value = Math.round(match * 255);
			this.color &= -65281;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
			var Value = Math.round(Chroma * 255);
			this.color &= -256;
			this.color |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
			var Value = Math.round(Alpha1 * 255);
			this.color &= 16777215;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
			break;
		case 5:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value = Math.round(Chroma * 255);
			this.color &= -16711681;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
			var Value = Math.round(match * 255);
			this.color &= -65281;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
			var Value = Math.round(mid * 255);
			this.color &= -256;
			this.color |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
			var Value = Math.round(Alpha1 * 255);
			this.color &= 16777215;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
			break;
		}
		return this.color;
	}
	,setHSL: function(Hue,Saturation,Lightness,Alpha) {
		var chroma = (1 - Math.abs(2 * Lightness - 1)) * Saturation;
		var match = Lightness - chroma / 2;
		var Hue1 = Hue;
		var Chroma = chroma;
		Hue1 %= 360;
		var hueD = Hue1 / 60;
		var mid = Chroma * (1 - Math.abs(hueD % 2 - 1)) + match;
		Chroma += match;
		switch(hueD | 0) {
		case 0:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value = Math.round(Chroma * 255);
			this.color &= -16711681;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
			var Value = Math.round(mid * 255);
			this.color &= -65281;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
			var Value = Math.round(match * 255);
			this.color &= -256;
			this.color |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
			var Value = Math.round(Alpha1 * 255);
			this.color &= 16777215;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
			break;
		case 1:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value = Math.round(mid * 255);
			this.color &= -16711681;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
			var Value = Math.round(Chroma * 255);
			this.color &= -65281;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
			var Value = Math.round(match * 255);
			this.color &= -256;
			this.color |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
			var Value = Math.round(Alpha1 * 255);
			this.color &= 16777215;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
			break;
		case 2:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value = Math.round(match * 255);
			this.color &= -16711681;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
			var Value = Math.round(Chroma * 255);
			this.color &= -65281;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
			var Value = Math.round(mid * 255);
			this.color &= -256;
			this.color |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
			var Value = Math.round(Alpha1 * 255);
			this.color &= 16777215;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
			break;
		case 3:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value = Math.round(match * 255);
			this.color &= -16711681;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
			var Value = Math.round(mid * 255);
			this.color &= -65281;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
			var Value = Math.round(Chroma * 255);
			this.color &= -256;
			this.color |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
			var Value = Math.round(Alpha1 * 255);
			this.color &= 16777215;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
			break;
		case 4:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value = Math.round(mid * 255);
			this.color &= -16711681;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
			var Value = Math.round(match * 255);
			this.color &= -65281;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
			var Value = Math.round(Chroma * 255);
			this.color &= -256;
			this.color |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
			var Value = Math.round(Alpha1 * 255);
			this.color &= 16777215;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
			break;
		case 5:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value = Math.round(Chroma * 255);
			this.color &= -16711681;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
			var Value = Math.round(match * 255);
			this.color &= -65281;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
			var Value = Math.round(mid * 255);
			this.color &= -256;
			this.color |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
			var Value = Math.round(Alpha1 * 255);
			this.color &= 16777215;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
			break;
		}
		return this.color;
	}
	,setHSChromaMatch: function(Hue,Saturation,Chroma,Match,Alpha) {
		Hue %= 360;
		var hueD = Hue / 60;
		var mid = Chroma * (1 - Math.abs(hueD % 2 - 1)) + Match;
		Chroma += Match;
		switch(hueD | 0) {
		case 0:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value = Math.round(Chroma * 255);
			this.color &= -16711681;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
			var Value = Math.round(mid * 255);
			this.color &= -65281;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
			var Value = Math.round(Match * 255);
			this.color &= -256;
			this.color |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
			var Value = Math.round(Alpha1 * 255);
			this.color &= 16777215;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
			break;
		case 1:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value = Math.round(mid * 255);
			this.color &= -16711681;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
			var Value = Math.round(Chroma * 255);
			this.color &= -65281;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
			var Value = Math.round(Match * 255);
			this.color &= -256;
			this.color |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
			var Value = Math.round(Alpha1 * 255);
			this.color &= 16777215;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
			break;
		case 2:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value = Math.round(Match * 255);
			this.color &= -16711681;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
			var Value = Math.round(Chroma * 255);
			this.color &= -65281;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
			var Value = Math.round(mid * 255);
			this.color &= -256;
			this.color |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
			var Value = Math.round(Alpha1 * 255);
			this.color &= 16777215;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
			break;
		case 3:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value = Math.round(Match * 255);
			this.color &= -16711681;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
			var Value = Math.round(mid * 255);
			this.color &= -65281;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
			var Value = Math.round(Chroma * 255);
			this.color &= -256;
			this.color |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
			var Value = Math.round(Alpha1 * 255);
			this.color &= 16777215;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
			break;
		case 4:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value = Math.round(mid * 255);
			this.color &= -16711681;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
			var Value = Math.round(Match * 255);
			this.color &= -65281;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
			var Value = Math.round(Chroma * 255);
			this.color &= -256;
			this.color |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
			var Value = Math.round(Alpha1 * 255);
			this.color &= 16777215;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
			break;
		case 5:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value = Math.round(Chroma * 255);
			this.color &= -16711681;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
			var Value = Math.round(Match * 255);
			this.color &= -65281;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
			var Value = Math.round(mid * 255);
			this.color &= -256;
			this.color |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
			var Value = Math.round(Alpha1 * 255);
			this.color &= 16777215;
			this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
			break;
		}
		return this.color;
	}
	,getThis: function() {
		return this.color;
	}
	,validate: function() {
	}
	,get_red: function() {
		return this.color >> 16 & 255;
	}
	,get_green: function() {
		return this.color >> 8 & 255;
	}
	,get_blue: function() {
		return this.color & 255;
	}
	,get_alpha: function() {
		return this.color >> 24 & 255;
	}
	,get_redFloat: function() {
		return (this.color >> 16 & 255) / 255;
	}
	,get_greenFloat: function() {
		return (this.color >> 8 & 255) / 255;
	}
	,get_blueFloat: function() {
		return (this.color & 255) / 255;
	}
	,get_alphaFloat: function() {
		return (this.color >> 24 & 255) / 255;
	}
	,set_red: function(Value) {
		this.color &= -16711681;
		this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		return Value;
	}
	,set_green: function(Value) {
		this.color &= -65281;
		this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		return Value;
	}
	,set_blue: function(Value) {
		this.color &= -256;
		this.color |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		return Value;
	}
	,set_alpha: function(Value) {
		this.color &= 16777215;
		this.color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		return Value;
	}
	,set_redFloat: function(Value) {
		var Value1 = Math.round(Value * 255);
		this.color &= -16711681;
		this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
		return Value;
	}
	,set_greenFloat: function(Value) {
		var Value1 = Math.round(Value * 255);
		this.color &= -65281;
		this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
		return Value;
	}
	,set_blueFloat: function(Value) {
		var Value1 = Math.round(Value * 255);
		this.color &= -256;
		this.color |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
		return Value;
	}
	,set_alphaFloat: function(Value) {
		var Value1 = Math.round(Value * 255);
		this.color &= 16777215;
		this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
		return Value;
	}
	,get_cyan: function() {
		return (1 - (this.color >> 16 & 255) / 255 - (1 - Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255)))) / Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255));
	}
	,get_magenta: function() {
		return (1 - (this.color >> 8 & 255) / 255 - (1 - Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255)))) / Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255));
	}
	,get_yellow: function() {
		return (1 - (this.color & 255) / 255 - (1 - Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255)))) / Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255));
	}
	,get_black: function() {
		return 1 - Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255));
	}
	,set_cyan: function(Value) {
		var Magenta = (1 - (this.color >> 8 & 255) / 255 - (1 - Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255)))) / Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255));
		var Yellow = (1 - (this.color & 255) / 255 - (1 - Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255)))) / Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255));
		var Black = 1 - Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255));
		var Alpha = (this.color >> 24 & 255) / 255;
		if(Alpha == null) {
			Alpha = 1;
		}
		var Value1 = (1 - Value) * (1 - Black);
		var Value2 = Math.round(Value1 * 255);
		this.color &= -16711681;
		this.color |= (Value2 > 255 ? 255 : Value2 < 0 ? 0 : Value2) << 16;
		var Value1 = (1 - Magenta) * (1 - Black);
		var Value2 = Math.round(Value1 * 255);
		this.color &= -65281;
		this.color |= (Value2 > 255 ? 255 : Value2 < 0 ? 0 : Value2) << 8;
		var Value1 = (1 - Yellow) * (1 - Black);
		var Value2 = Math.round(Value1 * 255);
		this.color &= -256;
		this.color |= Value2 > 255 ? 255 : Value2 < 0 ? 0 : Value2;
		var Value1 = Math.round(Alpha * 255);
		this.color &= 16777215;
		this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
		return Value;
	}
	,set_magenta: function(Value) {
		var Yellow = (1 - (this.color & 255) / 255 - (1 - Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255)))) / Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255));
		var Black = 1 - Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255));
		var Alpha = (this.color >> 24 & 255) / 255;
		if(Alpha == null) {
			Alpha = 1;
		}
		var Value1 = (1 - (1 - (this.color >> 16 & 255) / 255 - (1 - Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255)))) / Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255))) * (1 - Black);
		var Value2 = Math.round(Value1 * 255);
		this.color &= -16711681;
		this.color |= (Value2 > 255 ? 255 : Value2 < 0 ? 0 : Value2) << 16;
		var Value1 = (1 - Value) * (1 - Black);
		var Value2 = Math.round(Value1 * 255);
		this.color &= -65281;
		this.color |= (Value2 > 255 ? 255 : Value2 < 0 ? 0 : Value2) << 8;
		var Value1 = (1 - Yellow) * (1 - Black);
		var Value2 = Math.round(Value1 * 255);
		this.color &= -256;
		this.color |= Value2 > 255 ? 255 : Value2 < 0 ? 0 : Value2;
		var Value1 = Math.round(Alpha * 255);
		this.color &= 16777215;
		this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
		return Value;
	}
	,set_yellow: function(Value) {
		var Magenta = (1 - (this.color >> 8 & 255) / 255 - (1 - Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255)))) / Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255));
		var Black = 1 - Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255));
		var Alpha = (this.color >> 24 & 255) / 255;
		if(Alpha == null) {
			Alpha = 1;
		}
		var Value1 = (1 - (1 - (this.color >> 16 & 255) / 255 - (1 - Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255)))) / Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255))) * (1 - Black);
		var Value2 = Math.round(Value1 * 255);
		this.color &= -16711681;
		this.color |= (Value2 > 255 ? 255 : Value2 < 0 ? 0 : Value2) << 16;
		var Value1 = (1 - Magenta) * (1 - Black);
		var Value2 = Math.round(Value1 * 255);
		this.color &= -65281;
		this.color |= (Value2 > 255 ? 255 : Value2 < 0 ? 0 : Value2) << 8;
		var Value1 = (1 - Value) * (1 - Black);
		var Value2 = Math.round(Value1 * 255);
		this.color &= -256;
		this.color |= Value2 > 255 ? 255 : Value2 < 0 ? 0 : Value2;
		var Value1 = Math.round(Alpha * 255);
		this.color &= 16777215;
		this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
		return Value;
	}
	,set_black: function(Value) {
		var Magenta = (1 - (this.color >> 8 & 255) / 255 - (1 - Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255)))) / Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255));
		var Yellow = (1 - (this.color & 255) / 255 - (1 - Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255)))) / Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255));
		var Alpha = (this.color >> 24 & 255) / 255;
		if(Alpha == null) {
			Alpha = 1;
		}
		var Value1 = (1 - (1 - (this.color >> 16 & 255) / 255 - (1 - Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255)))) / Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255))) * (1 - Value);
		var Value2 = Math.round(Value1 * 255);
		this.color &= -16711681;
		this.color |= (Value2 > 255 ? 255 : Value2 < 0 ? 0 : Value2) << 16;
		var Value1 = (1 - Magenta) * (1 - Value);
		var Value2 = Math.round(Value1 * 255);
		this.color &= -65281;
		this.color |= (Value2 > 255 ? 255 : Value2 < 0 ? 0 : Value2) << 8;
		var Value1 = (1 - Yellow) * (1 - Value);
		var Value2 = Math.round(Value1 * 255);
		this.color &= -256;
		this.color |= Value2 > 255 ? 255 : Value2 < 0 ? 0 : Value2;
		var Value1 = Math.round(Alpha * 255);
		this.color &= 16777215;
		this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
		return Value;
	}
	,get_hue: function() {
		var hueRad = Math.atan2(Math.sqrt(3) * ((this.color >> 8 & 255) / 255 - (this.color & 255) / 255),2 * ((this.color >> 16 & 255) / 255) - (this.color >> 8 & 255) / 255 - (this.color & 255) / 255);
		var hue = 0;
		if(hueRad != 0) {
			hue = 180 / Math.PI * Math.atan2(Math.sqrt(3) * ((this.color >> 8 & 255) / 255 - (this.color & 255) / 255),2 * ((this.color >> 16 & 255) / 255) - (this.color >> 8 & 255) / 255 - (this.color & 255) / 255);
		}
		if(hue < 0) {
			return hue + 360;
		} else {
			return hue;
		}
	}
	,get_brightness: function() {
		return Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255));
	}
	,get_saturation: function() {
		return (Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255)) - Math.min((this.color >> 16 & 255) / 255,Math.min((this.color >> 8 & 255) / 255,(this.color & 255) / 255))) / Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255));
	}
	,get_lightness: function() {
		return (Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255)) + Math.min((this.color >> 16 & 255) / 255,Math.min((this.color >> 8 & 255) / 255,(this.color & 255) / 255))) / 2;
	}
	,set_hue: function(Value) {
		var Brightness = Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255));
		var Alpha = (this.color >> 24 & 255) / 255;
		var chroma = Brightness * ((Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255)) - Math.min((this.color >> 16 & 255) / 255,Math.min((this.color >> 8 & 255) / 255,(this.color & 255) / 255))) / Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255)));
		var match = Brightness - chroma;
		var Hue = Value;
		var Chroma = chroma;
		Hue %= 360;
		var hueD = Hue / 60;
		var mid = Chroma * (1 - Math.abs(hueD % 2 - 1)) + match;
		Chroma += match;
		switch(hueD | 0) {
		case 0:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value1 = Math.round(Chroma * 255);
			this.color &= -16711681;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
			var Value1 = Math.round(mid * 255);
			this.color &= -65281;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
			var Value1 = Math.round(match * 255);
			this.color &= -256;
			this.color |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
			var Value1 = Math.round(Alpha1 * 255);
			this.color &= 16777215;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
			break;
		case 1:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value1 = Math.round(mid * 255);
			this.color &= -16711681;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
			var Value1 = Math.round(Chroma * 255);
			this.color &= -65281;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
			var Value1 = Math.round(match * 255);
			this.color &= -256;
			this.color |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
			var Value1 = Math.round(Alpha1 * 255);
			this.color &= 16777215;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
			break;
		case 2:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value1 = Math.round(match * 255);
			this.color &= -16711681;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
			var Value1 = Math.round(Chroma * 255);
			this.color &= -65281;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
			var Value1 = Math.round(mid * 255);
			this.color &= -256;
			this.color |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
			var Value1 = Math.round(Alpha1 * 255);
			this.color &= 16777215;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
			break;
		case 3:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value1 = Math.round(match * 255);
			this.color &= -16711681;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
			var Value1 = Math.round(mid * 255);
			this.color &= -65281;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
			var Value1 = Math.round(Chroma * 255);
			this.color &= -256;
			this.color |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
			var Value1 = Math.round(Alpha1 * 255);
			this.color &= 16777215;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
			break;
		case 4:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value1 = Math.round(mid * 255);
			this.color &= -16711681;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
			var Value1 = Math.round(match * 255);
			this.color &= -65281;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
			var Value1 = Math.round(Chroma * 255);
			this.color &= -256;
			this.color |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
			var Value1 = Math.round(Alpha1 * 255);
			this.color &= 16777215;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
			break;
		case 5:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value1 = Math.round(Chroma * 255);
			this.color &= -16711681;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
			var Value1 = Math.round(match * 255);
			this.color &= -65281;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
			var Value1 = Math.round(mid * 255);
			this.color &= -256;
			this.color |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
			var Value1 = Math.round(Alpha1 * 255);
			this.color &= 16777215;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
			break;
		}
		return Value;
	}
	,set_saturation: function(Value) {
		var Hue = this.get_hue();
		var Brightness = Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255));
		var Alpha = (this.color >> 24 & 255) / 255;
		var chroma = Brightness * Value;
		var match = Brightness - chroma;
		var Hue1 = Hue;
		var Chroma = chroma;
		Hue1 %= 360;
		var hueD = Hue1 / 60;
		var mid = Chroma * (1 - Math.abs(hueD % 2 - 1)) + match;
		Chroma += match;
		switch(hueD | 0) {
		case 0:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value1 = Math.round(Chroma * 255);
			this.color &= -16711681;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
			var Value1 = Math.round(mid * 255);
			this.color &= -65281;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
			var Value1 = Math.round(match * 255);
			this.color &= -256;
			this.color |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
			var Value1 = Math.round(Alpha1 * 255);
			this.color &= 16777215;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
			break;
		case 1:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value1 = Math.round(mid * 255);
			this.color &= -16711681;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
			var Value1 = Math.round(Chroma * 255);
			this.color &= -65281;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
			var Value1 = Math.round(match * 255);
			this.color &= -256;
			this.color |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
			var Value1 = Math.round(Alpha1 * 255);
			this.color &= 16777215;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
			break;
		case 2:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value1 = Math.round(match * 255);
			this.color &= -16711681;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
			var Value1 = Math.round(Chroma * 255);
			this.color &= -65281;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
			var Value1 = Math.round(mid * 255);
			this.color &= -256;
			this.color |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
			var Value1 = Math.round(Alpha1 * 255);
			this.color &= 16777215;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
			break;
		case 3:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value1 = Math.round(match * 255);
			this.color &= -16711681;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
			var Value1 = Math.round(mid * 255);
			this.color &= -65281;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
			var Value1 = Math.round(Chroma * 255);
			this.color &= -256;
			this.color |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
			var Value1 = Math.round(Alpha1 * 255);
			this.color &= 16777215;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
			break;
		case 4:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value1 = Math.round(mid * 255);
			this.color &= -16711681;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
			var Value1 = Math.round(match * 255);
			this.color &= -65281;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
			var Value1 = Math.round(Chroma * 255);
			this.color &= -256;
			this.color |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
			var Value1 = Math.round(Alpha1 * 255);
			this.color &= 16777215;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
			break;
		case 5:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value1 = Math.round(Chroma * 255);
			this.color &= -16711681;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
			var Value1 = Math.round(match * 255);
			this.color &= -65281;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
			var Value1 = Math.round(mid * 255);
			this.color &= -256;
			this.color |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
			var Value1 = Math.round(Alpha1 * 255);
			this.color &= 16777215;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
			break;
		}
		return Value;
	}
	,set_brightness: function(Value) {
		var Hue = this.get_hue();
		var Alpha = (this.color >> 24 & 255) / 255;
		var chroma = Value * ((Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255)) - Math.min((this.color >> 16 & 255) / 255,Math.min((this.color >> 8 & 255) / 255,(this.color & 255) / 255))) / Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255)));
		var match = Value - chroma;
		var Hue1 = Hue;
		var Chroma = chroma;
		Hue1 %= 360;
		var hueD = Hue1 / 60;
		var mid = Chroma * (1 - Math.abs(hueD % 2 - 1)) + match;
		Chroma += match;
		switch(hueD | 0) {
		case 0:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value1 = Math.round(Chroma * 255);
			this.color &= -16711681;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
			var Value1 = Math.round(mid * 255);
			this.color &= -65281;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
			var Value1 = Math.round(match * 255);
			this.color &= -256;
			this.color |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
			var Value1 = Math.round(Alpha1 * 255);
			this.color &= 16777215;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
			break;
		case 1:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value1 = Math.round(mid * 255);
			this.color &= -16711681;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
			var Value1 = Math.round(Chroma * 255);
			this.color &= -65281;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
			var Value1 = Math.round(match * 255);
			this.color &= -256;
			this.color |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
			var Value1 = Math.round(Alpha1 * 255);
			this.color &= 16777215;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
			break;
		case 2:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value1 = Math.round(match * 255);
			this.color &= -16711681;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
			var Value1 = Math.round(Chroma * 255);
			this.color &= -65281;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
			var Value1 = Math.round(mid * 255);
			this.color &= -256;
			this.color |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
			var Value1 = Math.round(Alpha1 * 255);
			this.color &= 16777215;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
			break;
		case 3:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value1 = Math.round(match * 255);
			this.color &= -16711681;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
			var Value1 = Math.round(mid * 255);
			this.color &= -65281;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
			var Value1 = Math.round(Chroma * 255);
			this.color &= -256;
			this.color |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
			var Value1 = Math.round(Alpha1 * 255);
			this.color &= 16777215;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
			break;
		case 4:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value1 = Math.round(mid * 255);
			this.color &= -16711681;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
			var Value1 = Math.round(match * 255);
			this.color &= -65281;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
			var Value1 = Math.round(Chroma * 255);
			this.color &= -256;
			this.color |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
			var Value1 = Math.round(Alpha1 * 255);
			this.color &= 16777215;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
			break;
		case 5:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value1 = Math.round(Chroma * 255);
			this.color &= -16711681;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
			var Value1 = Math.round(match * 255);
			this.color &= -65281;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
			var Value1 = Math.round(mid * 255);
			this.color &= -256;
			this.color |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
			var Value1 = Math.round(Alpha1 * 255);
			this.color &= 16777215;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
			break;
		}
		return Value;
	}
	,set_lightness: function(Value) {
		var Hue = this.get_hue();
		var Alpha = (this.color >> 24 & 255) / 255;
		var chroma = (1 - Math.abs(2 * Value - 1)) * ((Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255)) - Math.min((this.color >> 16 & 255) / 255,Math.min((this.color >> 8 & 255) / 255,(this.color & 255) / 255))) / Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255)));
		var match = Value - chroma / 2;
		var Hue1 = Hue;
		var Chroma = chroma;
		Hue1 %= 360;
		var hueD = Hue1 / 60;
		var mid = Chroma * (1 - Math.abs(hueD % 2 - 1)) + match;
		Chroma += match;
		switch(hueD | 0) {
		case 0:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value1 = Math.round(Chroma * 255);
			this.color &= -16711681;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
			var Value1 = Math.round(mid * 255);
			this.color &= -65281;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
			var Value1 = Math.round(match * 255);
			this.color &= -256;
			this.color |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
			var Value1 = Math.round(Alpha1 * 255);
			this.color &= 16777215;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
			break;
		case 1:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value1 = Math.round(mid * 255);
			this.color &= -16711681;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
			var Value1 = Math.round(Chroma * 255);
			this.color &= -65281;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
			var Value1 = Math.round(match * 255);
			this.color &= -256;
			this.color |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
			var Value1 = Math.round(Alpha1 * 255);
			this.color &= 16777215;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
			break;
		case 2:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value1 = Math.round(match * 255);
			this.color &= -16711681;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
			var Value1 = Math.round(Chroma * 255);
			this.color &= -65281;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
			var Value1 = Math.round(mid * 255);
			this.color &= -256;
			this.color |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
			var Value1 = Math.round(Alpha1 * 255);
			this.color &= 16777215;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
			break;
		case 3:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value1 = Math.round(match * 255);
			this.color &= -16711681;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
			var Value1 = Math.round(mid * 255);
			this.color &= -65281;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
			var Value1 = Math.round(Chroma * 255);
			this.color &= -256;
			this.color |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
			var Value1 = Math.round(Alpha1 * 255);
			this.color &= 16777215;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
			break;
		case 4:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value1 = Math.round(mid * 255);
			this.color &= -16711681;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
			var Value1 = Math.round(match * 255);
			this.color &= -65281;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
			var Value1 = Math.round(Chroma * 255);
			this.color &= -256;
			this.color |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
			var Value1 = Math.round(Alpha1 * 255);
			this.color &= 16777215;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
			break;
		case 5:
			var Alpha1 = Alpha;
			if(Alpha1 == null) {
				Alpha1 = 1;
			}
			var Value1 = Math.round(Chroma * 255);
			this.color &= -16711681;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
			var Value1 = Math.round(match * 255);
			this.color &= -65281;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
			var Value1 = Math.round(mid * 255);
			this.color &= -256;
			this.color |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
			var Value1 = Math.round(Alpha1 * 255);
			this.color &= 16777215;
			this.color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
			break;
		}
		return Value;
	}
	,maxColor: function() {
		return Math.max((this.color >> 16 & 255) / 255,Math.max((this.color >> 8 & 255) / 255,(this.color & 255) / 255));
	}
	,minColor: function() {
		return Math.min((this.color >> 16 & 255) / 255,Math.min((this.color >> 8 & 255) / 255,(this.color & 255) / 255));
	}
	,boundChannel: function(Value) {
		if(Value > 255) {
			return 255;
		} else if(Value < 0) {
			return 0;
		} else {
			return Value;
		}
	}
	,color: null
	,__class__: util_ColorHelpers
	,__properties__: {set_lightness:"set_lightness",get_lightness:"get_lightness",set_brightness:"set_brightness",get_brightness:"get_brightness",set_saturation:"set_saturation",get_saturation:"get_saturation",set_hue:"set_hue",get_hue:"get_hue",set_black:"set_black",get_black:"get_black",set_yellow:"set_yellow",get_yellow:"get_yellow",set_magenta:"set_magenta",get_magenta:"get_magenta",set_cyan:"set_cyan",get_cyan:"get_cyan",set_alphaFloat:"set_alphaFloat",get_alphaFloat:"get_alphaFloat",set_greenFloat:"set_greenFloat",get_greenFloat:"get_greenFloat",set_blueFloat:"set_blueFloat",get_blueFloat:"get_blueFloat",set_redFloat:"set_redFloat",get_redFloat:"get_redFloat",set_alpha:"set_alpha",get_alpha:"get_alpha",set_green:"set_green",get_green:"get_green",set_blue:"set_blue",get_blue:"get_blue",set_red:"set_red",get_red:"get_red"}
};
var util_FlxColor = {};
util_FlxColor.__properties__ = {set_lightness:"set_lightness",get_lightness:"get_lightness",set_brightness:"set_brightness",get_brightness:"get_brightness",set_saturation:"set_saturation",get_saturation:"get_saturation",set_hue:"set_hue",get_hue:"get_hue",set_black:"set_black",get_black:"get_black",set_yellow:"set_yellow",get_yellow:"get_yellow",set_magenta:"set_magenta",get_magenta:"get_magenta",set_cyan:"set_cyan",get_cyan:"get_cyan",set_alphaFloat:"set_alphaFloat",get_alphaFloat:"get_alphaFloat",set_greenFloat:"set_greenFloat",get_greenFloat:"get_greenFloat",set_blueFloat:"set_blueFloat",get_blueFloat:"get_blueFloat",set_redFloat:"set_redFloat",get_redFloat:"get_redFloat",set_alpha:"set_alpha",get_alpha:"get_alpha",set_green:"set_green",get_green:"get_green",set_blue:"set_blue",get_blue:"get_blue",set_red:"set_red",get_red:"get_red"};
util_FlxColor.wrap = function(value,min,max) {
	var range = max - min + 1;
	if(value < min) {
		value += range * ((min - value) / range + 1 | 0);
	}
	return min + (value - min) % range;
};
util_FlxColor.roundDecimal = function(Value,Precision) {
	var mult = 1;
	var _g = 0;
	var _g1 = Precision;
	while(_g < _g1) {
		var i = _g++;
		mult *= 10;
	}
	return Math.round(Value * mult) / mult;
};
util_FlxColor.bound = function(Value,Min,Max) {
	var lowerBound = Min != null && Value < Min ? Min : Value;
	if(Max != null && lowerBound > Max) {
		return Max;
	} else {
		return lowerBound;
	}
};
util_FlxColor.fromInt = function(Value) {
	return util_FlxColor._new(Value);
};
util_FlxColor.fromRGB = function(Red,Green,Blue,Alpha) {
	if(Alpha == null) {
		Alpha = 255;
	}
	var color = util_FlxColor._new();
	var Alpha1 = Alpha;
	if(Alpha1 == null) {
		Alpha1 = 255;
	}
	color &= -16711681;
	color |= (Red > 255 ? 255 : Red < 0 ? 0 : Red) << 16;
	color &= -65281;
	color |= (Green > 255 ? 255 : Green < 0 ? 0 : Green) << 8;
	color &= -256;
	color |= Blue > 255 ? 255 : Blue < 0 ? 0 : Blue;
	color &= 16777215;
	color |= (Alpha1 > 255 ? 255 : Alpha1 < 0 ? 0 : Alpha1) << 24;
	return color;
};
util_FlxColor.fromRGBFloat = function(Red,Green,Blue,Alpha) {
	if(Alpha == null) {
		Alpha = 1;
	}
	var color = util_FlxColor._new();
	var Alpha1 = Alpha;
	if(Alpha1 == null) {
		Alpha1 = 1;
	}
	var Value = Math.round(Red * 255);
	color &= -16711681;
	color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
	var Value = Math.round(Green * 255);
	color &= -65281;
	color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
	var Value = Math.round(Blue * 255);
	color &= -256;
	color |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
	var Value = Math.round(Alpha1 * 255);
	color &= 16777215;
	color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
	return color;
};
util_FlxColor.fromCMYK = function(Cyan,Magenta,Yellow,Black,Alpha) {
	if(Alpha == null) {
		Alpha = 1;
	}
	var color = util_FlxColor._new();
	var Alpha1 = Alpha;
	if(Alpha1 == null) {
		Alpha1 = 1;
	}
	var Value = (1 - Cyan) * (1 - Black);
	var Value1 = Math.round(Value * 255);
	color &= -16711681;
	color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
	var Value = (1 - Magenta) * (1 - Black);
	var Value1 = Math.round(Value * 255);
	color &= -65281;
	color |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
	var Value = (1 - Yellow) * (1 - Black);
	var Value1 = Math.round(Value * 255);
	color &= -256;
	color |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
	var Value = Math.round(Alpha1 * 255);
	color &= 16777215;
	color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
	return color;
};
util_FlxColor.fromHSB = function(Hue,Saturation,Brightness,Alpha) {
	if(Alpha == null) {
		Alpha = 1;
	}
	var color = util_FlxColor._new();
	var chroma = Brightness * Saturation;
	var match = Brightness - chroma;
	var Hue1 = Hue;
	var Chroma = chroma;
	Hue1 %= 360;
	var hueD = Hue1 / 60;
	var mid = Chroma * (1 - Math.abs(hueD % 2 - 1)) + match;
	Chroma += match;
	switch(hueD | 0) {
	case 0:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(Chroma * 255);
		color &= -16711681;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(mid * 255);
		color &= -65281;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(match * 255);
		color &= -256;
		color |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		color &= 16777215;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	case 1:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(mid * 255);
		color &= -16711681;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(Chroma * 255);
		color &= -65281;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(match * 255);
		color &= -256;
		color |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		color &= 16777215;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	case 2:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(match * 255);
		color &= -16711681;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(Chroma * 255);
		color &= -65281;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(mid * 255);
		color &= -256;
		color |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		color &= 16777215;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	case 3:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(match * 255);
		color &= -16711681;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(mid * 255);
		color &= -65281;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(Chroma * 255);
		color &= -256;
		color |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		color &= 16777215;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	case 4:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(mid * 255);
		color &= -16711681;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(match * 255);
		color &= -65281;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(Chroma * 255);
		color &= -256;
		color |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		color &= 16777215;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	case 5:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(Chroma * 255);
		color &= -16711681;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(match * 255);
		color &= -65281;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(mid * 255);
		color &= -256;
		color |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		color &= 16777215;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	}
	return color;
};
util_FlxColor.fromHSL = function(Hue,Saturation,Lightness,Alpha) {
	if(Alpha == null) {
		Alpha = 1;
	}
	var color = util_FlxColor._new();
	var chroma = (1 - Math.abs(2 * Lightness - 1)) * Saturation;
	var match = Lightness - chroma / 2;
	var Hue1 = Hue;
	var Chroma = chroma;
	Hue1 %= 360;
	var hueD = Hue1 / 60;
	var mid = Chroma * (1 - Math.abs(hueD % 2 - 1)) + match;
	Chroma += match;
	switch(hueD | 0) {
	case 0:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(Chroma * 255);
		color &= -16711681;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(mid * 255);
		color &= -65281;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(match * 255);
		color &= -256;
		color |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		color &= 16777215;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	case 1:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(mid * 255);
		color &= -16711681;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(Chroma * 255);
		color &= -65281;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(match * 255);
		color &= -256;
		color |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		color &= 16777215;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	case 2:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(match * 255);
		color &= -16711681;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(Chroma * 255);
		color &= -65281;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(mid * 255);
		color &= -256;
		color |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		color &= 16777215;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	case 3:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(match * 255);
		color &= -16711681;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(mid * 255);
		color &= -65281;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(Chroma * 255);
		color &= -256;
		color |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		color &= 16777215;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	case 4:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(mid * 255);
		color &= -16711681;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(match * 255);
		color &= -65281;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(Chroma * 255);
		color &= -256;
		color |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		color &= 16777215;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	case 5:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(Chroma * 255);
		color &= -16711681;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(match * 255);
		color &= -65281;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(mid * 255);
		color &= -256;
		color |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		color &= 16777215;
		color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	}
	return color;
};
util_FlxColor.getHSBColorWheel = function(Alpha) {
	if(Alpha == null) {
		Alpha = 255;
	}
	var _g = [];
	var _g1 = 0;
	while(_g1 < 360) {
		var c = _g1++;
		_g.push(util_FlxColor.fromHSB(c,1.0,1.0,Alpha));
	}
	return _g;
};
util_FlxColor.interpolate = function(Color1,Color2,Factor) {
	if(Factor == null) {
		Factor = 0.5;
	}
	var r = ((Color2 >> 16 & 255) - (Color1 >> 16 & 255)) * Factor + (Color1 >> 16 & 255) | 0;
	var g = ((Color2 >> 8 & 255) - (Color1 >> 8 & 255)) * Factor + (Color1 >> 8 & 255) | 0;
	var b = ((Color2 & 255) - (Color1 & 255)) * Factor + (Color1 & 255) | 0;
	var a = ((Color2 >> 24 & 255) - (Color1 >> 24 & 255)) * Factor + (Color1 >> 24 & 255) | 0;
	var Alpha = a;
	if(Alpha == null) {
		Alpha = 255;
	}
	var color = util_FlxColor._new();
	var Alpha1 = Alpha;
	if(Alpha1 == null) {
		Alpha1 = 255;
	}
	color &= -16711681;
	color |= (r > 255 ? 255 : r < 0 ? 0 : r) << 16;
	color &= -65281;
	color |= (g > 255 ? 255 : g < 0 ? 0 : g) << 8;
	color &= -256;
	color |= b > 255 ? 255 : b < 0 ? 0 : b;
	color &= 16777215;
	color |= (Alpha1 > 255 ? 255 : Alpha1 < 0 ? 0 : Alpha1) << 24;
	return color;
};
util_FlxColor.gradient = function(Color1,Color2,Steps,Ease) {
	var output = [];
	if(Ease == null) {
		Ease = function(t) {
			return t;
		};
	}
	var _g = 0;
	var _g1 = Steps;
	while(_g < _g1) {
		var step = _g++;
		var Factor = Ease(step / (Steps - 1));
		if(Factor == null) {
			Factor = 0.5;
		}
		var r = ((Color2 >> 16 & 255) - (Color1 >> 16 & 255)) * Factor + (Color1 >> 16 & 255) | 0;
		var g = ((Color2 >> 8 & 255) - (Color1 >> 8 & 255)) * Factor + (Color1 >> 8 & 255) | 0;
		var b = ((Color2 & 255) - (Color1 & 255)) * Factor + (Color1 & 255) | 0;
		var a = ((Color2 >> 24 & 255) - (Color1 >> 24 & 255)) * Factor + (Color1 >> 24 & 255) | 0;
		var Alpha = a;
		if(Alpha == null) {
			Alpha = 255;
		}
		var color = util_FlxColor._new();
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 255;
		}
		color &= -16711681;
		color |= (r > 255 ? 255 : r < 0 ? 0 : r) << 16;
		color &= -65281;
		color |= (g > 255 ? 255 : g < 0 ? 0 : g) << 8;
		color &= -256;
		color |= b > 255 ? 255 : b < 0 ? 0 : b;
		color &= 16777215;
		color |= (Alpha1 > 255 ? 255 : Alpha1 < 0 ? 0 : Alpha1) << 24;
		output[step] = color;
	}
	return output;
};
util_FlxColor.multiply = function(lhs,rhs) {
	var Red = (lhs >> 16 & 255) / 255 * ((rhs >> 16 & 255) / 255);
	var Green = (lhs >> 8 & 255) / 255 * ((rhs >> 8 & 255) / 255);
	var Blue = (lhs & 255) / 255 * ((rhs & 255) / 255);
	var color = util_FlxColor._new();
	var Alpha = 1;
	if(Alpha == null) {
		Alpha = 1;
	}
	var Value = Math.round(Red * 255);
	color &= -16711681;
	color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
	var Value = Math.round(Green * 255);
	color &= -65281;
	color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
	var Value = Math.round(Blue * 255);
	color &= -256;
	color |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
	var Value = Math.round(Alpha * 255);
	color &= 16777215;
	color |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
	return color;
};
util_FlxColor.add = function(lhs,rhs) {
	var Red = (lhs >> 16 & 255) + (rhs >> 16 & 255);
	var Green = (lhs >> 8 & 255) + (rhs >> 8 & 255);
	var Blue = (lhs & 255) + (rhs & 255);
	var color = util_FlxColor._new();
	var Alpha = 255;
	if(Alpha == null) {
		Alpha = 255;
	}
	color &= -16711681;
	color |= (Red > 255 ? 255 : Red < 0 ? 0 : Red) << 16;
	color &= -65281;
	color |= (Green > 255 ? 255 : Green < 0 ? 0 : Green) << 8;
	color &= -256;
	color |= Blue > 255 ? 255 : Blue < 0 ? 0 : Blue;
	color &= 16777215;
	color |= (Alpha > 255 ? 255 : Alpha < 0 ? 0 : Alpha) << 24;
	return color;
};
util_FlxColor.subtract = function(lhs,rhs) {
	var Red = (lhs >> 16 & 255) - (rhs >> 16 & 255);
	var Green = (lhs >> 8 & 255) - (rhs >> 8 & 255);
	var Blue = (lhs & 255) - (rhs & 255);
	var color = util_FlxColor._new();
	var Alpha = 255;
	if(Alpha == null) {
		Alpha = 255;
	}
	color &= -16711681;
	color |= (Red > 255 ? 255 : Red < 0 ? 0 : Red) << 16;
	color &= -65281;
	color |= (Green > 255 ? 255 : Green < 0 ? 0 : Green) << 8;
	color &= -256;
	color |= Blue > 255 ? 255 : Blue < 0 ? 0 : Blue;
	color &= 16777215;
	color |= (Alpha > 255 ? 255 : Alpha < 0 ? 0 : Alpha) << 24;
	return color;
};
util_FlxColor.getComplementHarmony = function(this1) {
	return util_FlxColor.fromHSB(util_FlxColor.wrap((util_FlxColor.get_hue(this1) | 0) + 180,0,350),Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255)),(Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255)) - Math.min((this1 >> 16 & 255) / 255,Math.min((this1 >> 8 & 255) / 255,(this1 & 255) / 255))) / Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255)),(this1 >> 24 & 255) / 255);
};
util_FlxColor.getAnalogousHarmony = function(this1,Threshold) {
	if(Threshold == null) {
		Threshold = 30;
	}
	var warmer = util_FlxColor.fromHSB(util_FlxColor.wrap((util_FlxColor.get_hue(this1) | 0) - Threshold,0,350),(Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255)) - Math.min((this1 >> 16 & 255) / 255,Math.min((this1 >> 8 & 255) / 255,(this1 & 255) / 255))) / Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255)),Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255)),(this1 >> 24 & 255) / 255);
	var colder = util_FlxColor.fromHSB(util_FlxColor.wrap((util_FlxColor.get_hue(this1) | 0) + Threshold,0,350),(Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255)) - Math.min((this1 >> 16 & 255) / 255,Math.min((this1 >> 8 & 255) / 255,(this1 & 255) / 255))) / Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255)),Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255)),(this1 >> 24 & 255) / 255);
	return { original : this1, warmer : warmer, colder : colder};
};
util_FlxColor.getSplitComplementHarmony = function(this1,Threshold) {
	if(Threshold == null) {
		Threshold = 30;
	}
	var oppositeHue = util_FlxColor.wrap((util_FlxColor.get_hue(this1) | 0) + 180,0,350);
	var warmer = util_FlxColor.fromHSB(util_FlxColor.wrap(oppositeHue - Threshold,0,350),(Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255)) - Math.min((this1 >> 16 & 255) / 255,Math.min((this1 >> 8 & 255) / 255,(this1 & 255) / 255))) / Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255)),Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255)),(this1 >> 24 & 255) / 255);
	var colder = util_FlxColor.fromHSB(util_FlxColor.wrap(oppositeHue + Threshold,0,350),(Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255)) - Math.min((this1 >> 16 & 255) / 255,Math.min((this1 >> 8 & 255) / 255,(this1 & 255) / 255))) / Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255)),Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255)),(this1 >> 24 & 255) / 255);
	return { original : this1, warmer : warmer, colder : colder};
};
util_FlxColor.getTriadicHarmony = function(this1) {
	var triadic1 = util_FlxColor.fromHSB(util_FlxColor.wrap((util_FlxColor.get_hue(this1) | 0) + 120,0,359),(Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255)) - Math.min((this1 >> 16 & 255) / 255,Math.min((this1 >> 8 & 255) / 255,(this1 & 255) / 255))) / Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255)),Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255)),(this1 >> 24 & 255) / 255);
	var triadic2 = util_FlxColor.fromHSB(util_FlxColor.wrap((util_FlxColor.get_hue(triadic1) | 0) + 120,0,359),(Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255)) - Math.min((this1 >> 16 & 255) / 255,Math.min((this1 >> 8 & 255) / 255,(this1 & 255) / 255))) / Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255)),Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255)),(this1 >> 24 & 255) / 255);
	return { color1 : this1, color2 : triadic1, color3 : triadic2};
};
util_FlxColor.to24Bit = function(this1) {
	return this1 & 16777215;
};
util_FlxColor.toHexString = function(this1,Alpha,Prefix) {
	if(Prefix == null) {
		Prefix = true;
	}
	if(Alpha == null) {
		Alpha = true;
	}
	var tmp = Alpha ? StringTools.hex(this1 >> 24 & 255,2) : "";
	return (Prefix ? "0x" : "") + tmp + StringTools.hex(this1 >> 16 & 255,2) + StringTools.hex(this1 >> 8 & 255,2) + StringTools.hex(this1 & 255,2);
};
util_FlxColor.toWebString = function(this1) {
	var Alpha = false;
	var Prefix = false;
	if(Prefix == null) {
		Prefix = true;
	}
	if(Alpha == null) {
		Alpha = true;
	}
	var tmp = Alpha ? StringTools.hex(this1 >> 24 & 255,2) : "";
	return "#" + ((Prefix ? "0x" : "") + tmp + StringTools.hex(this1 >> 16 & 255,2) + StringTools.hex(this1 >> 8 & 255,2) + StringTools.hex(this1 & 255,2));
};
util_FlxColor.getColorInfo = function(this1) {
	var result = "0x" + StringTools.hex(this1 >> 24 & 255,2) + StringTools.hex(this1 >> 16 & 255,2) + StringTools.hex(this1 >> 8 & 255,2) + StringTools.hex(this1 & 255,2) + "\n";
	result += "Alpha: " + (this1 >> 24 & 255) + " Red: " + (this1 >> 16 & 255) + " Green: " + (this1 >> 8 & 255) + " Blue: " + (this1 & 255) + "\n";
	result += "Hue: " + util_FlxColor.roundDecimal(util_FlxColor.get_hue(this1),2) + " Saturation: " + util_FlxColor.roundDecimal((Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255)) - Math.min((this1 >> 16 & 255) / 255,Math.min((this1 >> 8 & 255) / 255,(this1 & 255) / 255))) / Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255)),2) + " Brightness: " + util_FlxColor.roundDecimal(Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255)),2) + " Lightness: " + util_FlxColor.roundDecimal((Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255)) + Math.min((this1 >> 16 & 255) / 255,Math.min((this1 >> 8 & 255) / 255,(this1 & 255) / 255))) / 2,2);
	return result;
};
util_FlxColor.getDarkened = function(this1,Factor) {
	if(Factor == null) {
		Factor = 0.2;
	}
	var lowerBound = Factor < 0 ? 0 : Factor;
	Factor = lowerBound > 1 ? 1 : lowerBound;
	var output = this1;
	var Value = (Math.max((output >> 16 & 255) / 255,Math.max((output >> 8 & 255) / 255,(output & 255) / 255)) + Math.min((output >> 16 & 255) / 255,Math.min((output >> 8 & 255) / 255,(output & 255) / 255))) / 2 * (1 - Factor);
	var Hue = util_FlxColor.get_hue(output);
	var Alpha = (output >> 24 & 255) / 255;
	var chroma = (1 - Math.abs(2 * Value - 1)) * ((Math.max((output >> 16 & 255) / 255,Math.max((output >> 8 & 255) / 255,(output & 255) / 255)) - Math.min((output >> 16 & 255) / 255,Math.min((output >> 8 & 255) / 255,(output & 255) / 255))) / Math.max((output >> 16 & 255) / 255,Math.max((output >> 8 & 255) / 255,(output & 255) / 255)));
	var match = Value - chroma / 2;
	var Hue1 = Hue;
	var Chroma = chroma;
	Hue1 %= 360;
	var hueD = Hue1 / 60;
	var mid = Chroma * (1 - Math.abs(hueD % 2 - 1)) + match;
	Chroma += match;
	switch(hueD | 0) {
	case 0:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(Chroma * 255);
		output &= -16711681;
		output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(mid * 255);
		output &= -65281;
		output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(match * 255);
		output &= -256;
		output |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		output &= 16777215;
		output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	case 1:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(mid * 255);
		output &= -16711681;
		output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(Chroma * 255);
		output &= -65281;
		output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(match * 255);
		output &= -256;
		output |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		output &= 16777215;
		output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	case 2:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(match * 255);
		output &= -16711681;
		output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(Chroma * 255);
		output &= -65281;
		output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(mid * 255);
		output &= -256;
		output |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		output &= 16777215;
		output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	case 3:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(match * 255);
		output &= -16711681;
		output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(mid * 255);
		output &= -65281;
		output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(Chroma * 255);
		output &= -256;
		output |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		output &= 16777215;
		output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	case 4:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(mid * 255);
		output &= -16711681;
		output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(match * 255);
		output &= -65281;
		output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(Chroma * 255);
		output &= -256;
		output |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		output &= 16777215;
		output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	case 5:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(Chroma * 255);
		output &= -16711681;
		output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(match * 255);
		output &= -65281;
		output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(mid * 255);
		output &= -256;
		output |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		output &= 16777215;
		output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	}
	return output;
};
util_FlxColor.getLightened = function(this1,Factor) {
	if(Factor == null) {
		Factor = 0.2;
	}
	var lowerBound = Factor < 0 ? 0 : Factor;
	Factor = lowerBound > 1 ? 1 : lowerBound;
	var output = this1;
	var Value = (Math.max((output >> 16 & 255) / 255,Math.max((output >> 8 & 255) / 255,(output & 255) / 255)) + Math.min((output >> 16 & 255) / 255,Math.min((output >> 8 & 255) / 255,(output & 255) / 255))) / 2 + (1 - (Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255)) + Math.min((this1 >> 16 & 255) / 255,Math.min((this1 >> 8 & 255) / 255,(this1 & 255) / 255))) / 2) * Factor;
	var Hue = util_FlxColor.get_hue(output);
	var Alpha = (output >> 24 & 255) / 255;
	var chroma = (1 - Math.abs(2 * Value - 1)) * ((Math.max((output >> 16 & 255) / 255,Math.max((output >> 8 & 255) / 255,(output & 255) / 255)) - Math.min((output >> 16 & 255) / 255,Math.min((output >> 8 & 255) / 255,(output & 255) / 255))) / Math.max((output >> 16 & 255) / 255,Math.max((output >> 8 & 255) / 255,(output & 255) / 255)));
	var match = Value - chroma / 2;
	var Hue1 = Hue;
	var Chroma = chroma;
	Hue1 %= 360;
	var hueD = Hue1 / 60;
	var mid = Chroma * (1 - Math.abs(hueD % 2 - 1)) + match;
	Chroma += match;
	switch(hueD | 0) {
	case 0:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(Chroma * 255);
		output &= -16711681;
		output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(mid * 255);
		output &= -65281;
		output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(match * 255);
		output &= -256;
		output |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		output &= 16777215;
		output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	case 1:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(mid * 255);
		output &= -16711681;
		output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(Chroma * 255);
		output &= -65281;
		output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(match * 255);
		output &= -256;
		output |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		output &= 16777215;
		output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	case 2:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(match * 255);
		output &= -16711681;
		output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(Chroma * 255);
		output &= -65281;
		output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(mid * 255);
		output &= -256;
		output |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		output &= 16777215;
		output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	case 3:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(match * 255);
		output &= -16711681;
		output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(mid * 255);
		output &= -65281;
		output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(Chroma * 255);
		output &= -256;
		output |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		output &= 16777215;
		output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	case 4:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(mid * 255);
		output &= -16711681;
		output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(match * 255);
		output &= -65281;
		output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(Chroma * 255);
		output &= -256;
		output |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		output &= 16777215;
		output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	case 5:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(Chroma * 255);
		output &= -16711681;
		output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(match * 255);
		output &= -65281;
		output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(mid * 255);
		output &= -256;
		output |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		output &= 16777215;
		output |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	}
	return output;
};
util_FlxColor.getInverted = function(this1) {
	var oldAlpha = this1 >> 24 & 255;
	var lhs = -1;
	var Red = (lhs >> 16 & 255) - (this1 >> 16 & 255);
	var Green = (lhs >> 8 & 255) - (this1 >> 8 & 255);
	var Blue = (lhs & 255) - (this1 & 255);
	var color = util_FlxColor._new();
	var Alpha = 255;
	if(Alpha == null) {
		Alpha = 255;
	}
	color &= -16711681;
	color |= (Red > 255 ? 255 : Red < 0 ? 0 : Red) << 16;
	color &= -65281;
	color |= (Green > 255 ? 255 : Green < 0 ? 0 : Green) << 8;
	color &= -256;
	color |= Blue > 255 ? 255 : Blue < 0 ? 0 : Blue;
	color &= 16777215;
	color |= (Alpha > 255 ? 255 : Alpha < 0 ? 0 : Alpha) << 24;
	var output = color;
	output &= 16777215;
	output |= (oldAlpha > 255 ? 255 : oldAlpha < 0 ? 0 : oldAlpha) << 24;
	return output;
};
util_FlxColor.setRGB = function(this1,Red,Green,Blue,Alpha) {
	if(Alpha == null) {
		Alpha = 255;
	}
	this1 &= -16711681;
	this1 |= (Red > 255 ? 255 : Red < 0 ? 0 : Red) << 16;
	this1 &= -65281;
	this1 |= (Green > 255 ? 255 : Green < 0 ? 0 : Green) << 8;
	this1 &= -256;
	this1 |= Blue > 255 ? 255 : Blue < 0 ? 0 : Blue;
	this1 &= 16777215;
	this1 |= (Alpha > 255 ? 255 : Alpha < 0 ? 0 : Alpha) << 24;
	return this1;
};
util_FlxColor.setRGBFloat = function(this1,Red,Green,Blue,Alpha) {
	if(Alpha == null) {
		Alpha = 1;
	}
	var Value = Math.round(Red * 255);
	this1 &= -16711681;
	this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
	var Value = Math.round(Green * 255);
	this1 &= -65281;
	this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
	var Value = Math.round(Blue * 255);
	this1 &= -256;
	this1 |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
	var Value = Math.round(Alpha * 255);
	this1 &= 16777215;
	this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
	return this1;
};
util_FlxColor.setCMYK = function(this1,Cyan,Magenta,Yellow,Black,Alpha) {
	if(Alpha == null) {
		Alpha = 1;
	}
	var Value = (1 - Cyan) * (1 - Black);
	var Value1 = Math.round(Value * 255);
	this1 &= -16711681;
	this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
	var Value = (1 - Magenta) * (1 - Black);
	var Value1 = Math.round(Value * 255);
	this1 &= -65281;
	this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
	var Value = (1 - Yellow) * (1 - Black);
	var Value1 = Math.round(Value * 255);
	this1 &= -256;
	this1 |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
	var Value = Math.round(Alpha * 255);
	this1 &= 16777215;
	this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
	return this1;
};
util_FlxColor.setHSB = function(this1,Hue,Saturation,Brightness,Alpha) {
	var chroma = Brightness * Saturation;
	var match = Brightness - chroma;
	var Hue1 = Hue;
	var Chroma = chroma;
	Hue1 %= 360;
	var hueD = Hue1 / 60;
	var mid = Chroma * (1 - Math.abs(hueD % 2 - 1)) + match;
	Chroma += match;
	switch(hueD | 0) {
	case 0:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(Chroma * 255);
		this1 &= -16711681;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(mid * 255);
		this1 &= -65281;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(match * 255);
		this1 &= -256;
		this1 |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		this1 &= 16777215;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	case 1:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(mid * 255);
		this1 &= -16711681;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(Chroma * 255);
		this1 &= -65281;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(match * 255);
		this1 &= -256;
		this1 |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		this1 &= 16777215;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	case 2:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(match * 255);
		this1 &= -16711681;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(Chroma * 255);
		this1 &= -65281;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(mid * 255);
		this1 &= -256;
		this1 |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		this1 &= 16777215;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	case 3:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(match * 255);
		this1 &= -16711681;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(mid * 255);
		this1 &= -65281;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(Chroma * 255);
		this1 &= -256;
		this1 |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		this1 &= 16777215;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	case 4:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(mid * 255);
		this1 &= -16711681;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(match * 255);
		this1 &= -65281;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(Chroma * 255);
		this1 &= -256;
		this1 |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		this1 &= 16777215;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	case 5:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(Chroma * 255);
		this1 &= -16711681;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(match * 255);
		this1 &= -65281;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(mid * 255);
		this1 &= -256;
		this1 |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		this1 &= 16777215;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	}
	return this1;
};
util_FlxColor.setHSL = function(this1,Hue,Saturation,Lightness,Alpha) {
	var chroma = (1 - Math.abs(2 * Lightness - 1)) * Saturation;
	var match = Lightness - chroma / 2;
	var Hue1 = Hue;
	var Chroma = chroma;
	Hue1 %= 360;
	var hueD = Hue1 / 60;
	var mid = Chroma * (1 - Math.abs(hueD % 2 - 1)) + match;
	Chroma += match;
	switch(hueD | 0) {
	case 0:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(Chroma * 255);
		this1 &= -16711681;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(mid * 255);
		this1 &= -65281;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(match * 255);
		this1 &= -256;
		this1 |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		this1 &= 16777215;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	case 1:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(mid * 255);
		this1 &= -16711681;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(Chroma * 255);
		this1 &= -65281;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(match * 255);
		this1 &= -256;
		this1 |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		this1 &= 16777215;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	case 2:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(match * 255);
		this1 &= -16711681;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(Chroma * 255);
		this1 &= -65281;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(mid * 255);
		this1 &= -256;
		this1 |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		this1 &= 16777215;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	case 3:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(match * 255);
		this1 &= -16711681;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(mid * 255);
		this1 &= -65281;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(Chroma * 255);
		this1 &= -256;
		this1 |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		this1 &= 16777215;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	case 4:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(mid * 255);
		this1 &= -16711681;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(match * 255);
		this1 &= -65281;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(Chroma * 255);
		this1 &= -256;
		this1 |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		this1 &= 16777215;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	case 5:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(Chroma * 255);
		this1 &= -16711681;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(match * 255);
		this1 &= -65281;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(mid * 255);
		this1 &= -256;
		this1 |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		this1 &= 16777215;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	}
	return this1;
};
util_FlxColor.setHSChromaMatch = function(this1,Hue,Saturation,Chroma,Match,Alpha) {
	Hue %= 360;
	var hueD = Hue / 60;
	var mid = Chroma * (1 - Math.abs(hueD % 2 - 1)) + Match;
	Chroma += Match;
	switch(hueD | 0) {
	case 0:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(Chroma * 255);
		this1 &= -16711681;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(mid * 255);
		this1 &= -65281;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(Match * 255);
		this1 &= -256;
		this1 |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		this1 &= 16777215;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	case 1:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(mid * 255);
		this1 &= -16711681;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(Chroma * 255);
		this1 &= -65281;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(Match * 255);
		this1 &= -256;
		this1 |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		this1 &= 16777215;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	case 2:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(Match * 255);
		this1 &= -16711681;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(Chroma * 255);
		this1 &= -65281;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(mid * 255);
		this1 &= -256;
		this1 |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		this1 &= 16777215;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	case 3:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(Match * 255);
		this1 &= -16711681;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(mid * 255);
		this1 &= -65281;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(Chroma * 255);
		this1 &= -256;
		this1 |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		this1 &= 16777215;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	case 4:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(mid * 255);
		this1 &= -16711681;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(Match * 255);
		this1 &= -65281;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(Chroma * 255);
		this1 &= -256;
		this1 |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		this1 &= 16777215;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	case 5:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value = Math.round(Chroma * 255);
		this1 &= -16711681;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
		var Value = Math.round(Match * 255);
		this1 &= -65281;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
		var Value = Math.round(mid * 255);
		this1 &= -256;
		this1 |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
		var Value = Math.round(Alpha1 * 255);
		this1 &= 16777215;
		this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
		break;
	}
	return this1;
};
util_FlxColor._new = function(Value) {
	if(Value == null) {
		Value = 0;
	}
	var this1 = Value;
	return this1;
};
util_FlxColor.getThis = function(this1) {
	return this1;
};
util_FlxColor.validate = function(this1) {
};
util_FlxColor.redPart = function(color) {
	return color >> 16 & 255;
};
util_FlxColor.greenPart = function(color) {
	return color >> 8 & 255;
};
util_FlxColor.bluePart = function(color) {
	return color & 255;
};
util_FlxColor.alphaPart = function(color) {
	return color >> 24 & 255;
};
util_FlxColor.redFloatPart = function(color) {
	return (color >> 16 & 255) / 255;
};
util_FlxColor.greenFloatPart = function(color) {
	return (color >> 8 & 255) / 255;
};
util_FlxColor.blueFloatPart = function(color) {
	return (color & 255) / 255;
};
util_FlxColor.alphaFloatPart = function(color) {
	return (color >> 24 & 255) / 255;
};
util_FlxColor.get_red = function(this1) {
	return this1 >> 16 & 255;
};
util_FlxColor.get_green = function(this1) {
	return this1 >> 8 & 255;
};
util_FlxColor.get_blue = function(this1) {
	return this1 & 255;
};
util_FlxColor.get_alpha = function(this1) {
	return this1 >> 24 & 255;
};
util_FlxColor.get_redFloat = function(this1) {
	return (this1 >> 16 & 255) / 255;
};
util_FlxColor.get_greenFloat = function(this1) {
	return (this1 >> 8 & 255) / 255;
};
util_FlxColor.get_blueFloat = function(this1) {
	return (this1 & 255) / 255;
};
util_FlxColor.get_alphaFloat = function(this1) {
	return (this1 >> 24 & 255) / 255;
};
util_FlxColor.set_red = function(this1,Value) {
	this1 &= -16711681;
	this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 16;
	return Value;
};
util_FlxColor.set_green = function(this1,Value) {
	this1 &= -65281;
	this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 8;
	return Value;
};
util_FlxColor.set_blue = function(this1,Value) {
	this1 &= -256;
	this1 |= Value > 255 ? 255 : Value < 0 ? 0 : Value;
	return Value;
};
util_FlxColor.set_alpha = function(this1,Value) {
	this1 &= 16777215;
	this1 |= (Value > 255 ? 255 : Value < 0 ? 0 : Value) << 24;
	return Value;
};
util_FlxColor.set_redFloat = function(this1,Value) {
	var Value1 = Math.round(Value * 255);
	this1 &= -16711681;
	this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
	return Value;
};
util_FlxColor.set_greenFloat = function(this1,Value) {
	var Value1 = Math.round(Value * 255);
	this1 &= -65281;
	this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
	return Value;
};
util_FlxColor.set_blueFloat = function(this1,Value) {
	var Value1 = Math.round(Value * 255);
	this1 &= -256;
	this1 |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
	return Value;
};
util_FlxColor.set_alphaFloat = function(this1,Value) {
	var Value1 = Math.round(Value * 255);
	this1 &= 16777215;
	this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
	return Value;
};
util_FlxColor.get_cyan = function(this1) {
	return (1 - (this1 >> 16 & 255) / 255 - (1 - Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255)))) / Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255));
};
util_FlxColor.get_magenta = function(this1) {
	return (1 - (this1 >> 8 & 255) / 255 - (1 - Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255)))) / Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255));
};
util_FlxColor.get_yellow = function(this1) {
	return (1 - (this1 & 255) / 255 - (1 - Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255)))) / Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255));
};
util_FlxColor.get_black = function(this1) {
	return 1 - Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255));
};
util_FlxColor.set_cyan = function(this1,Value) {
	var Magenta = (1 - (this1 >> 8 & 255) / 255 - (1 - Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255)))) / Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255));
	var Yellow = (1 - (this1 & 255) / 255 - (1 - Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255)))) / Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255));
	var Black = 1 - Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255));
	var Alpha = (this1 >> 24 & 255) / 255;
	if(Alpha == null) {
		Alpha = 1;
	}
	var Value1 = (1 - Value) * (1 - Black);
	var Value2 = Math.round(Value1 * 255);
	this1 &= -16711681;
	this1 |= (Value2 > 255 ? 255 : Value2 < 0 ? 0 : Value2) << 16;
	var Value1 = (1 - Magenta) * (1 - Black);
	var Value2 = Math.round(Value1 * 255);
	this1 &= -65281;
	this1 |= (Value2 > 255 ? 255 : Value2 < 0 ? 0 : Value2) << 8;
	var Value1 = (1 - Yellow) * (1 - Black);
	var Value2 = Math.round(Value1 * 255);
	this1 &= -256;
	this1 |= Value2 > 255 ? 255 : Value2 < 0 ? 0 : Value2;
	var Value1 = Math.round(Alpha * 255);
	this1 &= 16777215;
	this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
	return Value;
};
util_FlxColor.set_magenta = function(this1,Value) {
	var Yellow = (1 - (this1 & 255) / 255 - (1 - Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255)))) / Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255));
	var Black = 1 - Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255));
	var Alpha = (this1 >> 24 & 255) / 255;
	if(Alpha == null) {
		Alpha = 1;
	}
	var Value1 = (1 - (1 - (this1 >> 16 & 255) / 255 - (1 - Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255)))) / Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255))) * (1 - Black);
	var Value2 = Math.round(Value1 * 255);
	this1 &= -16711681;
	this1 |= (Value2 > 255 ? 255 : Value2 < 0 ? 0 : Value2) << 16;
	var Value1 = (1 - Value) * (1 - Black);
	var Value2 = Math.round(Value1 * 255);
	this1 &= -65281;
	this1 |= (Value2 > 255 ? 255 : Value2 < 0 ? 0 : Value2) << 8;
	var Value1 = (1 - Yellow) * (1 - Black);
	var Value2 = Math.round(Value1 * 255);
	this1 &= -256;
	this1 |= Value2 > 255 ? 255 : Value2 < 0 ? 0 : Value2;
	var Value1 = Math.round(Alpha * 255);
	this1 &= 16777215;
	this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
	return Value;
};
util_FlxColor.set_yellow = function(this1,Value) {
	var Magenta = (1 - (this1 >> 8 & 255) / 255 - (1 - Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255)))) / Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255));
	var Black = 1 - Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255));
	var Alpha = (this1 >> 24 & 255) / 255;
	if(Alpha == null) {
		Alpha = 1;
	}
	var Value1 = (1 - (1 - (this1 >> 16 & 255) / 255 - (1 - Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255)))) / Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255))) * (1 - Black);
	var Value2 = Math.round(Value1 * 255);
	this1 &= -16711681;
	this1 |= (Value2 > 255 ? 255 : Value2 < 0 ? 0 : Value2) << 16;
	var Value1 = (1 - Magenta) * (1 - Black);
	var Value2 = Math.round(Value1 * 255);
	this1 &= -65281;
	this1 |= (Value2 > 255 ? 255 : Value2 < 0 ? 0 : Value2) << 8;
	var Value1 = (1 - Value) * (1 - Black);
	var Value2 = Math.round(Value1 * 255);
	this1 &= -256;
	this1 |= Value2 > 255 ? 255 : Value2 < 0 ? 0 : Value2;
	var Value1 = Math.round(Alpha * 255);
	this1 &= 16777215;
	this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
	return Value;
};
util_FlxColor.set_black = function(this1,Value) {
	var Magenta = (1 - (this1 >> 8 & 255) / 255 - (1 - Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255)))) / Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255));
	var Yellow = (1 - (this1 & 255) / 255 - (1 - Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255)))) / Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255));
	var Alpha = (this1 >> 24 & 255) / 255;
	if(Alpha == null) {
		Alpha = 1;
	}
	var Value1 = (1 - (1 - (this1 >> 16 & 255) / 255 - (1 - Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255)))) / Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255))) * (1 - Value);
	var Value2 = Math.round(Value1 * 255);
	this1 &= -16711681;
	this1 |= (Value2 > 255 ? 255 : Value2 < 0 ? 0 : Value2) << 16;
	var Value1 = (1 - Magenta) * (1 - Value);
	var Value2 = Math.round(Value1 * 255);
	this1 &= -65281;
	this1 |= (Value2 > 255 ? 255 : Value2 < 0 ? 0 : Value2) << 8;
	var Value1 = (1 - Yellow) * (1 - Value);
	var Value2 = Math.round(Value1 * 255);
	this1 &= -256;
	this1 |= Value2 > 255 ? 255 : Value2 < 0 ? 0 : Value2;
	var Value1 = Math.round(Alpha * 255);
	this1 &= 16777215;
	this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
	return Value;
};
util_FlxColor.get_hue = function(this1) {
	var hueRad = Math.atan2(Math.sqrt(3) * ((this1 >> 8 & 255) / 255 - (this1 & 255) / 255),2 * ((this1 >> 16 & 255) / 255) - (this1 >> 8 & 255) / 255 - (this1 & 255) / 255);
	var hue = 0;
	if(hueRad != 0) {
		hue = 180 / Math.PI * Math.atan2(Math.sqrt(3) * ((this1 >> 8 & 255) / 255 - (this1 & 255) / 255),2 * ((this1 >> 16 & 255) / 255) - (this1 >> 8 & 255) / 255 - (this1 & 255) / 255);
	}
	if(hue < 0) {
		return hue + 360;
	} else {
		return hue;
	}
};
util_FlxColor.get_brightness = function(this1) {
	return Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255));
};
util_FlxColor.get_saturation = function(this1) {
	return (Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255)) - Math.min((this1 >> 16 & 255) / 255,Math.min((this1 >> 8 & 255) / 255,(this1 & 255) / 255))) / Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255));
};
util_FlxColor.getLightness = function(color) {
	return (util_FlxColor.getMaxColor(color) + util_FlxColor.getMinColor(color)) / 2;
};
util_FlxColor.get_lightness = function(this1) {
	return (Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255)) + Math.min((this1 >> 16 & 255) / 255,Math.min((this1 >> 8 & 255) / 255,(this1 & 255) / 255))) / 2;
};
util_FlxColor.set_hue = function(this1,Value) {
	var Brightness = Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255));
	var Alpha = (this1 >> 24 & 255) / 255;
	var chroma = Brightness * ((Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255)) - Math.min((this1 >> 16 & 255) / 255,Math.min((this1 >> 8 & 255) / 255,(this1 & 255) / 255))) / Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255)));
	var match = Brightness - chroma;
	var Hue = Value;
	var Chroma = chroma;
	Hue %= 360;
	var hueD = Hue / 60;
	var mid = Chroma * (1 - Math.abs(hueD % 2 - 1)) + match;
	Chroma += match;
	switch(hueD | 0) {
	case 0:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value1 = Math.round(Chroma * 255);
		this1 &= -16711681;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
		var Value1 = Math.round(mid * 255);
		this1 &= -65281;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
		var Value1 = Math.round(match * 255);
		this1 &= -256;
		this1 |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
		var Value1 = Math.round(Alpha1 * 255);
		this1 &= 16777215;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
		break;
	case 1:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value1 = Math.round(mid * 255);
		this1 &= -16711681;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
		var Value1 = Math.round(Chroma * 255);
		this1 &= -65281;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
		var Value1 = Math.round(match * 255);
		this1 &= -256;
		this1 |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
		var Value1 = Math.round(Alpha1 * 255);
		this1 &= 16777215;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
		break;
	case 2:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value1 = Math.round(match * 255);
		this1 &= -16711681;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
		var Value1 = Math.round(Chroma * 255);
		this1 &= -65281;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
		var Value1 = Math.round(mid * 255);
		this1 &= -256;
		this1 |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
		var Value1 = Math.round(Alpha1 * 255);
		this1 &= 16777215;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
		break;
	case 3:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value1 = Math.round(match * 255);
		this1 &= -16711681;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
		var Value1 = Math.round(mid * 255);
		this1 &= -65281;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
		var Value1 = Math.round(Chroma * 255);
		this1 &= -256;
		this1 |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
		var Value1 = Math.round(Alpha1 * 255);
		this1 &= 16777215;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
		break;
	case 4:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value1 = Math.round(mid * 255);
		this1 &= -16711681;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
		var Value1 = Math.round(match * 255);
		this1 &= -65281;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
		var Value1 = Math.round(Chroma * 255);
		this1 &= -256;
		this1 |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
		var Value1 = Math.round(Alpha1 * 255);
		this1 &= 16777215;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
		break;
	case 5:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value1 = Math.round(Chroma * 255);
		this1 &= -16711681;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
		var Value1 = Math.round(match * 255);
		this1 &= -65281;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
		var Value1 = Math.round(mid * 255);
		this1 &= -256;
		this1 |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
		var Value1 = Math.round(Alpha1 * 255);
		this1 &= 16777215;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
		break;
	}
	return Value;
};
util_FlxColor.set_saturation = function(this1,Value) {
	var Hue = util_FlxColor.get_hue(this1);
	var Brightness = Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255));
	var Alpha = (this1 >> 24 & 255) / 255;
	var chroma = Brightness * Value;
	var match = Brightness - chroma;
	var Hue1 = Hue;
	var Chroma = chroma;
	Hue1 %= 360;
	var hueD = Hue1 / 60;
	var mid = Chroma * (1 - Math.abs(hueD % 2 - 1)) + match;
	Chroma += match;
	switch(hueD | 0) {
	case 0:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value1 = Math.round(Chroma * 255);
		this1 &= -16711681;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
		var Value1 = Math.round(mid * 255);
		this1 &= -65281;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
		var Value1 = Math.round(match * 255);
		this1 &= -256;
		this1 |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
		var Value1 = Math.round(Alpha1 * 255);
		this1 &= 16777215;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
		break;
	case 1:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value1 = Math.round(mid * 255);
		this1 &= -16711681;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
		var Value1 = Math.round(Chroma * 255);
		this1 &= -65281;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
		var Value1 = Math.round(match * 255);
		this1 &= -256;
		this1 |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
		var Value1 = Math.round(Alpha1 * 255);
		this1 &= 16777215;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
		break;
	case 2:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value1 = Math.round(match * 255);
		this1 &= -16711681;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
		var Value1 = Math.round(Chroma * 255);
		this1 &= -65281;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
		var Value1 = Math.round(mid * 255);
		this1 &= -256;
		this1 |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
		var Value1 = Math.round(Alpha1 * 255);
		this1 &= 16777215;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
		break;
	case 3:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value1 = Math.round(match * 255);
		this1 &= -16711681;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
		var Value1 = Math.round(mid * 255);
		this1 &= -65281;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
		var Value1 = Math.round(Chroma * 255);
		this1 &= -256;
		this1 |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
		var Value1 = Math.round(Alpha1 * 255);
		this1 &= 16777215;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
		break;
	case 4:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value1 = Math.round(mid * 255);
		this1 &= -16711681;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
		var Value1 = Math.round(match * 255);
		this1 &= -65281;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
		var Value1 = Math.round(Chroma * 255);
		this1 &= -256;
		this1 |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
		var Value1 = Math.round(Alpha1 * 255);
		this1 &= 16777215;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
		break;
	case 5:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value1 = Math.round(Chroma * 255);
		this1 &= -16711681;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
		var Value1 = Math.round(match * 255);
		this1 &= -65281;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
		var Value1 = Math.round(mid * 255);
		this1 &= -256;
		this1 |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
		var Value1 = Math.round(Alpha1 * 255);
		this1 &= 16777215;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
		break;
	}
	return Value;
};
util_FlxColor.set_brightness = function(this1,Value) {
	var Hue = util_FlxColor.get_hue(this1);
	var Alpha = (this1 >> 24 & 255) / 255;
	var chroma = Value * ((Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255)) - Math.min((this1 >> 16 & 255) / 255,Math.min((this1 >> 8 & 255) / 255,(this1 & 255) / 255))) / Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255)));
	var match = Value - chroma;
	var Hue1 = Hue;
	var Chroma = chroma;
	Hue1 %= 360;
	var hueD = Hue1 / 60;
	var mid = Chroma * (1 - Math.abs(hueD % 2 - 1)) + match;
	Chroma += match;
	switch(hueD | 0) {
	case 0:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value1 = Math.round(Chroma * 255);
		this1 &= -16711681;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
		var Value1 = Math.round(mid * 255);
		this1 &= -65281;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
		var Value1 = Math.round(match * 255);
		this1 &= -256;
		this1 |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
		var Value1 = Math.round(Alpha1 * 255);
		this1 &= 16777215;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
		break;
	case 1:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value1 = Math.round(mid * 255);
		this1 &= -16711681;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
		var Value1 = Math.round(Chroma * 255);
		this1 &= -65281;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
		var Value1 = Math.round(match * 255);
		this1 &= -256;
		this1 |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
		var Value1 = Math.round(Alpha1 * 255);
		this1 &= 16777215;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
		break;
	case 2:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value1 = Math.round(match * 255);
		this1 &= -16711681;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
		var Value1 = Math.round(Chroma * 255);
		this1 &= -65281;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
		var Value1 = Math.round(mid * 255);
		this1 &= -256;
		this1 |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
		var Value1 = Math.round(Alpha1 * 255);
		this1 &= 16777215;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
		break;
	case 3:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value1 = Math.round(match * 255);
		this1 &= -16711681;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
		var Value1 = Math.round(mid * 255);
		this1 &= -65281;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
		var Value1 = Math.round(Chroma * 255);
		this1 &= -256;
		this1 |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
		var Value1 = Math.round(Alpha1 * 255);
		this1 &= 16777215;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
		break;
	case 4:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value1 = Math.round(mid * 255);
		this1 &= -16711681;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
		var Value1 = Math.round(match * 255);
		this1 &= -65281;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
		var Value1 = Math.round(Chroma * 255);
		this1 &= -256;
		this1 |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
		var Value1 = Math.round(Alpha1 * 255);
		this1 &= 16777215;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
		break;
	case 5:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value1 = Math.round(Chroma * 255);
		this1 &= -16711681;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
		var Value1 = Math.round(match * 255);
		this1 &= -65281;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
		var Value1 = Math.round(mid * 255);
		this1 &= -256;
		this1 |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
		var Value1 = Math.round(Alpha1 * 255);
		this1 &= 16777215;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
		break;
	}
	return Value;
};
util_FlxColor.set_lightness = function(this1,Value) {
	var Hue = util_FlxColor.get_hue(this1);
	var Alpha = (this1 >> 24 & 255) / 255;
	var chroma = (1 - Math.abs(2 * Value - 1)) * ((Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255)) - Math.min((this1 >> 16 & 255) / 255,Math.min((this1 >> 8 & 255) / 255,(this1 & 255) / 255))) / Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255)));
	var match = Value - chroma / 2;
	var Hue1 = Hue;
	var Chroma = chroma;
	Hue1 %= 360;
	var hueD = Hue1 / 60;
	var mid = Chroma * (1 - Math.abs(hueD % 2 - 1)) + match;
	Chroma += match;
	switch(hueD | 0) {
	case 0:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value1 = Math.round(Chroma * 255);
		this1 &= -16711681;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
		var Value1 = Math.round(mid * 255);
		this1 &= -65281;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
		var Value1 = Math.round(match * 255);
		this1 &= -256;
		this1 |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
		var Value1 = Math.round(Alpha1 * 255);
		this1 &= 16777215;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
		break;
	case 1:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value1 = Math.round(mid * 255);
		this1 &= -16711681;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
		var Value1 = Math.round(Chroma * 255);
		this1 &= -65281;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
		var Value1 = Math.round(match * 255);
		this1 &= -256;
		this1 |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
		var Value1 = Math.round(Alpha1 * 255);
		this1 &= 16777215;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
		break;
	case 2:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value1 = Math.round(match * 255);
		this1 &= -16711681;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
		var Value1 = Math.round(Chroma * 255);
		this1 &= -65281;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
		var Value1 = Math.round(mid * 255);
		this1 &= -256;
		this1 |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
		var Value1 = Math.round(Alpha1 * 255);
		this1 &= 16777215;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
		break;
	case 3:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value1 = Math.round(match * 255);
		this1 &= -16711681;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
		var Value1 = Math.round(mid * 255);
		this1 &= -65281;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
		var Value1 = Math.round(Chroma * 255);
		this1 &= -256;
		this1 |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
		var Value1 = Math.round(Alpha1 * 255);
		this1 &= 16777215;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
		break;
	case 4:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value1 = Math.round(mid * 255);
		this1 &= -16711681;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
		var Value1 = Math.round(match * 255);
		this1 &= -65281;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
		var Value1 = Math.round(Chroma * 255);
		this1 &= -256;
		this1 |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
		var Value1 = Math.round(Alpha1 * 255);
		this1 &= 16777215;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
		break;
	case 5:
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 1;
		}
		var Value1 = Math.round(Chroma * 255);
		this1 &= -16711681;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 16;
		var Value1 = Math.round(match * 255);
		this1 &= -65281;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 8;
		var Value1 = Math.round(mid * 255);
		this1 &= -256;
		this1 |= Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1;
		var Value1 = Math.round(Alpha1 * 255);
		this1 &= 16777215;
		this1 |= (Value1 > 255 ? 255 : Value1 < 0 ? 0 : Value1) << 24;
		break;
	}
	return Value;
};
util_FlxColor.getMaxColor = function(color) {
	return Math.max((color >> 16 & 255) / 255,Math.max((color >> 8 & 255) / 255,(color & 255) / 255));
};
util_FlxColor.maxColor = function(this1) {
	return Math.max((this1 >> 16 & 255) / 255,Math.max((this1 >> 8 & 255) / 255,(this1 & 255) / 255));
};
util_FlxColor.getMinColor = function(color) {
	return Math.min((color >> 16 & 255) / 255,Math.min((color >> 8 & 255) / 255,(color & 255) / 255));
};
util_FlxColor.minColor = function(this1) {
	return Math.min((this1 >> 16 & 255) / 255,Math.min((this1 >> 8 & 255) / 255,(this1 & 255) / 255));
};
util_FlxColor.boundChannel = function(this1,Value) {
	if(Value > 255) {
		return 255;
	} else if(Value < 0) {
		return 0;
	} else {
		return Value;
	}
};
var util_ScriptUtil = function() { };
$hxClasses["util.ScriptUtil"] = util_ScriptUtil;
util_ScriptUtil.__name__ = "util.ScriptUtil";
util_ScriptUtil.euclideanDistance = function(x1,y1,x2,y2) {
	var dx = x1 - x2;
	var dy = y1 - y2;
	var dist = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
	return dist;
};
util_ScriptUtil.greedyBruteForceOptimize = function(firstShapes,secondShapes,indexMapping,costFunction) {
	var _g = 0;
	var _g1 = firstShapes.length;
	while(_g < _g1) {
		var i = _g++;
		var _g2 = 0;
		var _g3 = firstShapes.length;
		while(_g2 < _g3) {
			var j = _g2++;
			var firstLeftIdx = i;
			var secondLeftIdx = j;
			var firstRightIdx = indexMapping[firstLeftIdx];
			var secondRightIdx = indexMapping[secondLeftIdx];
			var firstLeft = firstShapes[firstLeftIdx];
			var firstRight = secondShapes[firstRightIdx];
			var secondLeft = firstShapes[secondLeftIdx];
			var secondRight = secondShapes[secondRightIdx];
			var currentScore = costFunction(firstLeft,firstRight) + costFunction(secondLeft,secondRight);
			var swappedScore = costFunction(firstLeft,secondRight) + costFunction(secondLeft,firstRight);
			if(swappedScore < currentScore) {
				indexMapping[firstLeftIdx] = secondRightIdx;
				indexMapping[secondLeftIdx] = firstRightIdx;
			}
		}
	}
};
util_ScriptUtil.hungarianAlgorithm = function(firstShapes,secondShapes,indexMapping,costFunction) {
};
util_ScriptUtil.toInt = function(f) {
	return f | 0;
};
var util_ShapeInterpolator = function() { };
$hxClasses["util.ShapeInterpolator"] = util_ShapeInterpolator;
util_ShapeInterpolator.__name__ = "util.ShapeInterpolator";
util_ShapeInterpolator.interpolate = function(firstShape,secondShape,outShape,lerpStart,lerpEnd,t) {
	t = (t - lerpStart) / (lerpEnd - lerpStart);
	var lowerBound = t < 0 ? 0 : t;
	t = lowerBound > 1 ? 1 : lowerBound;
	if(firstShape.type == 32 && secondShape.type == 32) {
		var firstData = firstShape.data;
		var secondData = secondShape.data;
		var outData = outShape.data;
		var a = shape_abstracts_Circle.get_x(firstData);
		shape_abstracts_Circle.set_x(outData,a + t * (shape_abstracts_Circle.get_x(secondData) - a));
		var a = shape_abstracts_Circle.get_y(firstData);
		shape_abstracts_Circle.set_y(outData,a + t * (shape_abstracts_Circle.get_y(secondData) - a));
		var a = shape_abstracts_Circle.get_r(firstData);
		shape_abstracts_Circle.set_r(outData,a + t * (shape_abstracts_Circle.get_r(secondData) - a));
		var Color1 = firstShape.color;
		var Color2 = secondShape.color;
		var Factor = t;
		if(Factor == null) {
			Factor = 0.5;
		}
		var r = ((Color2 >> 16 & 255) - (Color1 >> 16 & 255)) * Factor + (Color1 >> 16 & 255) | 0;
		var g = ((Color2 >> 8 & 255) - (Color1 >> 8 & 255)) * Factor + (Color1 >> 8 & 255) | 0;
		var b = ((Color2 & 255) - (Color1 & 255)) * Factor + (Color1 & 255) | 0;
		var a = ((Color2 >> 24 & 255) - (Color1 >> 24 & 255)) * Factor + (Color1 >> 24 & 255) | 0;
		var Alpha = a;
		if(Alpha == null) {
			Alpha = 255;
		}
		var color = util_FlxColor._new();
		var Alpha1 = Alpha;
		if(Alpha1 == null) {
			Alpha1 = 255;
		}
		color &= -16711681;
		color |= (r > 255 ? 255 : r < 0 ? 0 : r) << 16;
		color &= -65281;
		color |= (g > 255 ? 255 : g < 0 ? 0 : g) << 8;
		color &= -256;
		color |= b > 255 ? 255 : b < 0 ? 0 : b;
		color &= 16777215;
		color |= (Alpha1 > 255 ? 255 : Alpha1 < 0 ? 0 : Alpha1) << 24;
		outShape.color = color;
		var a = firstShape.alpha;
		outShape.alpha = a + t * (secondShape.alpha - a);
	}
};
util_ShapeInterpolator.lerp = function(a,b,ratio) {
	return a + ratio * (b - a);
};
util_ShapeInterpolator.bound = function(value,min,max) {
	var lowerBound = value < min ? min : value;
	if(lowerBound > max) {
		return max;
	} else {
		return lowerBound;
	}
};
var util_ShapeTweenOptimizer = function(renderCallback) {
	this.transition = 0;
	this.renderCallback = renderCallback;
	this.firstShapes = [];
	this.secondShapes = [];
	this.indexMapping = [];
	this.currentShapes = [];
	this.parser = new hscript_Parser();
	this.costInterpreter = new hscript_Interp();
	this.costInterpreter.variables.h["Math"] = Math;
	this.costInterpreter.variables.h["ScriptUtil"] = util_ScriptUtil;
	this.costInterpreter.variables.h["ColorHelpers"] = util_ColorHelpers;
	this.costScript = "";
	this.optimizationScript = "";
};
$hxClasses["util.ShapeTweenOptimizer"] = util_ShapeTweenOptimizer;
util_ShapeTweenOptimizer.__name__ = "util.ShapeTweenOptimizer";
util_ShapeTweenOptimizer.prototype = {
	renderCallback: null
	,firstShapes: null
	,secondShapes: null
	,indexMapping: null
	,currentShapes: null
	,transition: null
	,set_transition: function(time) {
		this.transition = time;
		var i = 0;
		while(i < this.currentShapes.length) {
			util_ShapeInterpolator.interpolate(this.firstShapes[i],this.secondShapes[this.indexMapping[i]],this.currentShapes[i],i * 0.0005,0.5 + i * 0.0005,this.transition);
			++i;
		}
		return time;
	}
	,parser: null
	,costInterpreter: null
	,optimizerInterpreter: null
	,costScript: null
	,optimizationScript: null
	,optimize: function() {
		var _gthis = this;
		if(this.firstShapes.length != this.secondShapes.length) {
			throw haxe_Exception.thrown("Shape datasets must each contain the same number of shapes");
		}
		this.optimizerInterpreter = new hscript_Interp();
		this.optimizerInterpreter.variables.h["Math"] = Math;
		this.optimizerInterpreter.variables.h["ScriptUtil"] = util_ScriptUtil;
		this.optimizerInterpreter.variables.h["Std"] = Std;
		this.optimizerInterpreter.variables.h["ColorHelpers"] = util_ColorHelpers;
		this.optimizerInterpreter.variables.h["costFunction"] = $bind(this,this.calculateScore);
		this.optimizerInterpreter.variables.h["firstShapes"] = this.firstShapes;
		this.optimizerInterpreter.variables.h["secondShapes"] = this.secondShapes;
		this.optimizerInterpreter.variables.h["indexMapping"] = this.indexMapping;
		this.optimizerInterpreter.execute(this.parser.parseString(this.optimizationScript));
		motion_Actuate.tween(this,3,{ transition : this.transition > 0.5 ? 0 : 1}).onUpdate(function() {
			_gthis.set_transition(_gthis.transition);
			_gthis.renderCallback(_gthis.currentShapes);
		}).ease(motion_easing_Quad.easeInOut);
	}
	,setCostScript: function(script) {
		var parsedCode = this.parser.parseString(script);
		this.costScript = script;
	}
	,setOptimizationScript: function(script) {
		var parsedCode = this.parser.parseString(script);
		this.optimizationScript = script;
	}
	,setDatasetOne: function(json) {
		this.firstShapes = this.unpackShapeData(json);
		this.setCurrentShapes();
	}
	,setDatasetTwo: function(json) {
		this.secondShapes = this.unpackShapeData(json);
		this.setCurrentShapes();
	}
	,calculateScore: function(first,second) {
		this.costInterpreter.variables.h["a"] = first;
		this.costInterpreter.variables.h["b"] = second;
		return this.costInterpreter.execute(this.parser.parseString(this.costScript));
	}
	,calculateTotalScore: function() {
		var total = 0;
		var idx = 0;
		while(idx < this.currentShapes.length) {
			total += this.calculateScore(this.firstShapes[idx],this.secondShapes[this.indexMapping[idx]]);
			++idx;
		}
		return total;
	}
	,getShapeIndicesMapping: function() {
		var data = "";
		var idx = 0;
		while(idx < this.currentShapes.length) {
			data += idx + "," + Std.string(this.indexMapping[idx]) + "\r\n";
			++idx;
		}
		return data;
	}
	,unpackShapeData: function(json) {
		return reader_ShapeJsonReader.shapesFromJson(json);
	}
	,setCurrentShapes: function() {
		this.currentShapes = [];
		this.indexMapping = [];
		var i = 0;
		while(i < this.firstShapes.length) {
			this.currentShapes.push(util_Cloner.clone(this.firstShapes[i]));
			this.indexMapping.push(i);
			++i;
		}
	}
	,__class__: util_ShapeTweenOptimizer
	,__properties__: {set_transition:"set_transition"}
};
function $getIterator(o) { if( o instanceof Array ) return new haxe_iterators_ArrayIterator(o); else return o.iterator(); }
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance);
}
$hxClasses["Math"] = Math;
if( String.fromCodePoint == null ) String.fromCodePoint = function(c) { return c < 0x10000 ? String.fromCharCode(c) : String.fromCharCode((c>>10)+0xD7C0)+String.fromCharCode((c&0x3FF)+0xDC00); }
String.prototype.__class__ = $hxClasses["String"] = String;
String.__name__ = "String";
$hxClasses["Array"] = Array;
Array.__name__ = "Array";
Date.prototype.__class__ = $hxClasses["Date"] = Date;
Date.__name__ = "Date";
var Int = { };
var Dynamic = { };
var Float = Number;
var Bool = Boolean;
var Class = { };
var Enum = { };
haxe_ds_ObjectMap.count = 0;
js_Boot.__toStr = ({ }).toString;
if(ArrayBuffer.prototype.slice == null) {
	ArrayBuffer.prototype.slice = js_lib__$ArrayBuffer_ArrayBufferCompat.sliceImpl;
}
EReg.escapeRe = new RegExp("[.*+?^${}()|[\\]\\\\]","g");
ID.header = "header";
ID.optimizer = "optimizer";
ID.shapecanvascontainer = "shapecanvascontainer";
ID.generalerrors = "generalerrors";
ID.buttoncontainer = "buttoncontainer";
ID.stepbutton = "stepbutton";
ID.resetbutton = "resetbutton";
ID.scoretext = "scoretext";
ID.optimizationpassestext = "optimizationpassestext";
ID.costfunctionscontainer = "costfunctionscontainer";
ID.costfunctionpresets = "costfunctionpresets";
ID.costfunctiontextedit = "costfunctiontextedit";
ID.costfunctionerrors = "costfunctionerrors";
ID.optimizefunctionscontainer = "optimizefunctionscontainer";
ID.optimizefunctionspresets = "optimizefunctionspresets";
ID.optimizefunctiontextedit = "optimizefunctiontextedit";
ID.optimizationfunctionerrors = "optimizationfunctionerrors";
ID.datasetonecontainer = "datasetonecontainer";
ID.datasetonepresets = "datasetonepresets";
ID.datasetonetextedit = "datasetonetextedit";
ID.datasetoneerrors = "datasetoneerrors";
ID.datasettwocontainer = "datasettwocontainer";
ID.datasettwopresets = "datasettwopresets";
ID.datasettwotextedit = "datasettwotextedit";
ID.datasettwoerrors = "datasettwoerrors";
ID.resultscontainer = "resultscontainer";
ID.resultsdatatextedit = "resultsdatatextedit";
ID.howitworks = "howitworks";
CostScripts.simpleweightings = "// Simple weighting-based cost/scoring function for two circles, a and b\n// Note this does not work for any shape type other than circles\n\nvar x1 = a.data[0];\nvar y1 = a.data[1];\nvar r1 = a.data[2];\n\nvar x2 = b.data[0];\nvar y2 = b.data[1];\nvar r2 = b.data[2];\n\nvar color1 = a.color;\nvar color2 = b.color;\n\nvar smallerRad = Math.min(r1, r2);\nvar largerRad = Math.max(r1, r2);\nvar areaRatio = Math.pow(largerRad / smallerRad, 2);\n\nvar averageDiameter = r1 + r2;\nvar centerDistance = ScriptUtil.euclideanDistance(x1, y1, x2, y2);\nvar distanceRatio = centerDistance / averageDiameter;\n\nvar smallerColor = Math.max(Math.min(ColorHelpers.getLightness(color1), ColorHelpers.getLightness(color2)), 0.05);\nvar largerColor = Math.max(ColorHelpers.getLightness(color1), ColorHelpers.getLightness(color2));\nvar colorRatio = largerColor / smallerColor;\n\nreturn areaRatio + distanceRatio + colorRatio;";
OptimizationScripts.greedybruteforce = "// Calculate every possible switch, and greedily choose the best n switches\n// Very slow, so implemented in Haxe instead of hscript\n\nScriptUtil.greedyBruteForceOptimize(firstShapes, secondShapes, indexMapping, costFunction);";
OptimizationScripts.optimalassignment = "// Measures the cost of every possible combination of shapes,\n// creating a cost matrix, solves the linear sum assignment problem,\n// finding the optimal mapping for the shapes\n\n// NOT IMPLEMENTED YET! It will be very slow on the js target - https://en.wikipedia.org/wiki/Hungarian_algorithm\n\nScriptUtil.hungarianAlgorithm(firstShapes, secondShapes, indexMapping, costFunction);";
OptimizationScripts.randomswapping = "// Naive approach that randomly swaps target shapes\n// Picks random pairs from the sets of shapes and tries swapping them\n// Only swaps shapes when this improves the overall fit of the shapes according to the cost/scoring function\n\nfor(i in 0...500) {\n\tvar firstLeftIdx = Std.int(Math.random() * firstShapes.length - 1);\n\tvar secondLeftIdx = Std.int(Math.random() * firstShapes.length - 1);\n\tvar firstRightIdx = indexMapping[firstLeftIdx];\n\tvar secondRightIdx = indexMapping[secondLeftIdx];\n\t\n\tvar firstLeft = firstShapes[firstLeftIdx];\n\tvar firstRight = secondShapes[firstRightIdx];\n\tvar secondLeft = firstShapes[secondLeftIdx];\n\tvar secondRight = secondShapes[secondRightIdx];\n\t\n\tvar currentScore = costFunction(firstLeft, firstRight) + costFunction(secondLeft, secondRight);\n\tvar swappedScore = costFunction(firstLeft, secondRight) + costFunction(secondLeft, firstRight);\n\t\n\tif(swappedScore < currentScore) {\n\t\tindexMapping[firstLeftIdx] = secondRightIdx;\n\t\tindexMapping[secondLeftIdx] = firstRightIdx;\n\t}\n}";
ShapeDatasets.swan = "{\"shapes\":\n[{\"type\":32, \"data\":[245,229,128],\"color\":[205,255,255,128],\"score\":0.227449},\n{\"type\":32, \"data\":[445,288,122],\"color\":[89,175,255,128],\"score\":0.186822},\n{\"type\":32, \"data\":[67,270,99],\"color\":[100,173,255,128],\"score\":0.14614},\n{\"type\":32, \"data\":[203,157,67],\"color\":[215,203,213,128],\"score\":0.134699},\n{\"type\":32, \"data\":[180,91,55],\"color\":[73,70,64,128],\"score\":0.126414},\n{\"type\":32, \"data\":[344,269,128],\"color\":[57,99,176,128],\"score\":0.11946},\n{\"type\":32, \"data\":[163,73,22],\"color\":[250,250,248,128],\"score\":0.113996},\n{\"type\":32, \"data\":[207,93,34],\"color\":[0,0,0,128],\"score\":0.109748},\n{\"type\":32, \"data\":[234,170,51],\"color\":[235,233,232,128],\"score\":0.105319},\n{\"type\":32, \"data\":[85,251,71],\"color\":[57,101,172,128],\"score\":0.10295},\n{\"type\":32, \"data\":[317,151,28],\"color\":[191,196,210,128],\"score\":0.100838},\n{\"type\":32, \"data\":[166,107,15],\"color\":[255,255,255,128],\"score\":0.0973791},\n{\"type\":32, \"data\":[167,301,100],\"color\":[58,96,163,128],\"score\":0.0953106},\n{\"type\":32, \"data\":[230,85,32],\"color\":[0,0,0,128],\"score\":0.0938571},\n{\"type\":32, \"data\":[160,131,15],\"color\":[255,255,255,128],\"score\":0.0919258},\n{\"type\":32, \"data\":[188,124,20],\"color\":[0,0,0,128],\"score\":0.0898981},\n{\"type\":32, \"data\":[357,150,11],\"color\":[255,255,255,128],\"score\":0.0881123},\n{\"type\":32, \"data\":[339,238,68],\"color\":[45,86,141,128],\"score\":0.0867621},\n{\"type\":32, \"data\":[275,131,24],\"color\":[200,195,207,128],\"score\":0.0856348},\n{\"type\":32, \"data\":[502,224,55],\"color\":[59,112,186,128],\"score\":0.0844769},\n{\"type\":32, \"data\":[399,158,27],\"color\":[28,22,0,128],\"score\":0.0835247},\n{\"type\":32, \"data\":[123,88,33],\"color\":[1,0,0,128],\"score\":0.0821591},\n{\"type\":32, \"data\":[116,178,25],\"color\":[65,72,77,128],\"score\":0.0813489},\n{\"type\":32, \"data\":[159,167,16],\"color\":[255,255,252,128],\"score\":0.0805308},\n{\"type\":32, \"data\":[171,89,14],\"color\":[236,231,223,128],\"score\":0.0797811},\n{\"type\":32, \"data\":[361,177,20],\"color\":[32,31,11,128],\"score\":0.0789225},\n{\"type\":32, \"data\":[204,100,26],\"color\":[0,0,0,128],\"score\":0.0781289},\n{\"type\":32, \"data\":[155,61,15],\"color\":[219,217,214,128],\"score\":0.0769247},\n{\"type\":32, \"data\":[157,269,18],\"color\":[202,169,129,128],\"score\":0.0761379},\n{\"type\":32, \"data\":[255,79,31],\"color\":[0,0,0,128],\"score\":0.0754954},\n{\"type\":32, \"data\":[261,211,28],\"color\":[126,144,167,128],\"score\":0.0746558},\n{\"type\":32, \"data\":[188,173,17],\"color\":[255,255,255,128],\"score\":0.0738747},\n{\"type\":32, \"data\":[318,194,20],\"color\":[42,44,43,128],\"score\":0.073148},\n{\"type\":32, \"data\":[444,156,26],\"color\":[9,4,0,128],\"score\":0.0724752},\n{\"type\":32, \"data\":[293,150,32],\"color\":[139,150,165,128],\"score\":0.0718525},\n{\"type\":32, \"data\":[11,201,24],\"color\":[64,112,171,128],\"score\":0.0712417},\n{\"type\":32, \"data\":[377,136,13],\"color\":[108,111,115,128],\"score\":0.0705722},\n{\"type\":32, \"data\":[247,300,70],\"color\":[45,97,171,128],\"score\":0.0699249},\n{\"type\":32, \"data\":[393,235,58],\"color\":[62,113,173,128],\"score\":0.0693083},\n{\"type\":32, \"data\":[57,165,22],\"color\":[18,13,0,128],\"score\":0.0686778},\n{\"type\":32, \"data\":[347,155,14],\"color\":[192,202,211,128],\"score\":0.068147},\n{\"type\":32, \"data\":[214,47,37],\"color\":[0,0,0,128],\"score\":0.0676258},\n{\"type\":32, \"data\":[120,146,23],\"color\":[0,0,0,128],\"score\":0.0670871},\n{\"type\":32, \"data\":[163,119,14],\"color\":[250,241,226,128],\"score\":0.0663277},\n{\"type\":32, \"data\":[158,216,20],\"color\":[162,157,152,128],\"score\":0.0658351},\n{\"type\":32, \"data\":[179,144,9],\"color\":[0,0,0,128],\"score\":0.0650749},\n{\"type\":32, \"data\":[243,208,25],\"color\":[149,170,194,128],\"score\":0.0647293},\n{\"type\":32, \"data\":[148,150,8],\"color\":[255,255,255,128],\"score\":0.0641998},\n{\"type\":32, \"data\":[95,244,61],\"color\":[59,103,160,128],\"score\":0.0635652},\n{\"type\":32, \"data\":[149,79,8],\"color\":[0,0,0,128],\"score\":0.0630517},\n{\"type\":32, \"data\":[122,119,28],\"color\":[0,0,0,128],\"score\":0.0623795},\n{\"type\":32, \"data\":[207,159,24],\"color\":[242,239,236,128],\"score\":0.0618762},\n{\"type\":32, \"data\":[190,120,16],\"color\":[0,0,0,128],\"score\":0.0615307},\n{\"type\":32, \"data\":[279,204,21],\"color\":[77,90,110,128],\"score\":0.0610464},\n{\"type\":32, \"data\":[272,122,15],\"color\":[211,212,215,128],\"score\":0.0607806},\n{\"type\":32, \"data\":[165,244,10],\"color\":[218,190,157,128],\"score\":0.0604111},\n{\"type\":32, \"data\":[136,265,12],\"color\":[89,56,43,128],\"score\":0.0600239},\n{\"type\":32, \"data\":[131,163,11],\"color\":[4,1,0,128],\"score\":0.0596094},\n{\"type\":32, \"data\":[237,134,20],\"color\":[216,217,217,128],\"score\":0.059264},\n{\"type\":32, \"data\":[368,144,5],\"color\":[255,255,255,128],\"score\":0.0588186},\n{\"type\":32, \"data\":[176,212,19],\"color\":[73,101,140,128],\"score\":0.058518},\n{\"type\":32, \"data\":[136,68,8],\"color\":[171,97,34,128],\"score\":0.0581302},\n{\"type\":32, \"data\":[376,117,21],\"color\":[0,0,0,128],\"score\":0.057755},\n{\"type\":32, \"data\":[288,146,22],\"color\":[116,128,141,128],\"score\":0.0574468},\n{\"type\":32, \"data\":[339,181,9],\"color\":[10,0,0,128],\"score\":0.0570691},\n{\"type\":32, \"data\":[334,261,61],\"color\":[57,104,166,128],\"score\":0.0567544},\n{\"type\":32, \"data\":[32,174,13],\"color\":[30,28,16,128],\"score\":0.0565268},\n{\"type\":32, \"data\":[17,225,40],\"color\":[53,102,166,128],\"score\":0.0563422},\n{\"type\":32, \"data\":[166,111,13],\"color\":[217,212,204,128],\"score\":0.0560421},\n{\"type\":32, \"data\":[202,93,22],\"color\":[0,0,0,128],\"score\":0.0558561},\n{\"type\":32, \"data\":[154,144,10],\"color\":[255,246,228,128],\"score\":0.0555907},\n{\"type\":32, \"data\":[118,123,31],\"color\":[0,0,0,128],\"score\":0.0553805},\n{\"type\":32, \"data\":[203,234,22],\"color\":[55,112,194,128],\"score\":0.0551485},\n{\"type\":32, \"data\":[407,151,23],\"color\":[0,0,0,128],\"score\":0.0549428},\n{\"type\":32, \"data\":[169,150,10],\"color\":[103,95,87,128],\"score\":0.0546761},\n{\"type\":32, \"data\":[240,78,33],\"color\":[0,0,0,128],\"score\":0.0544039},\n{\"type\":32, \"data\":[145,85,14],\"color\":[0,0,0,128],\"score\":0.0540924},\n{\"type\":32, \"data\":[150,200,11],\"color\":[172,188,213,128],\"score\":0.0539129},\n{\"type\":32, \"data\":[160,280,10],\"color\":[220,216,202,128],\"score\":0.0536124},\n{\"type\":32, \"data\":[107,220,41],\"color\":[64,109,168,128],\"score\":0.0533808},\n{\"type\":32, \"data\":[129,175,13],\"color\":[59,53,43,128],\"score\":0.0531252},\n{\"type\":32, \"data\":[451,307,75],\"color\":[45,93,157,128],\"score\":0.0529215},\n{\"type\":32, \"data\":[373,146,7],\"color\":[195,200,205,128],\"score\":0.0526261},\n{\"type\":32, \"data\":[476,160,19],\"color\":[18,18,9,128],\"score\":0.0524299},\n{\"type\":32, \"data\":[264,222,13],\"color\":[156,178,206,128],\"score\":0.052224},\n{\"type\":32, \"data\":[354,121,22],\"color\":[0,0,0,128],\"score\":0.0518355},\n{\"type\":32, \"data\":[128,75,4],\"color\":[255,127,78,128],\"score\":0.0516039},\n{\"type\":32, \"data\":[216,210,8],\"color\":[233,253,255,128],\"score\":0.0514012},\n{\"type\":32, \"data\":[389,154,14],\"color\":[0,0,0,128],\"score\":0.0511801},\n{\"type\":32, \"data\":[275,90,18],\"color\":[0,0,0,128],\"score\":0.0509592},\n{\"type\":32, \"data\":[81,148,31],\"color\":[7,6,4,128],\"score\":0.0507744},\n{\"type\":32, \"data\":[73,309,75],\"color\":[49,93,151,128],\"score\":0.0505665},\n{\"type\":32, \"data\":[330,156,21],\"color\":[154,169,185,128],\"score\":0.0503077},\n{\"type\":32, \"data\":[297,127,13],\"color\":[165,181,210,128],\"score\":0.0500994},\n{\"type\":32, \"data\":[256,121,12],\"color\":[224,225,228,128],\"score\":0.0499139},\n{\"type\":32, \"data\":[162,217,12],\"color\":[183,165,139,128],\"score\":0.049748},\n{\"type\":32, \"data\":[449,208,31],\"color\":[59,110,171,128],\"score\":0.0495948},\n{\"type\":32, \"data\":[192,26,32],\"color\":[0,0,0,128],\"score\":0.0494153},\n{\"type\":32, \"data\":[357,181,13],\"color\":[15,23,30,128],\"score\":0.0492197},\n{\"type\":32, \"data\":[167,199,13],\"color\":[105,113,125,128],\"score\":0.0490775},\n{\"type\":32, \"data\":[373,189,13],\"color\":[55,84,105,128],\"score\":0.0489571},\n{\"type\":32, \"data\":[162,99,8],\"color\":[255,255,249,128],\"score\":0.0487303},\n{\"type\":32, \"data\":[13,180,12],\"color\":[53,53,36,128],\"score\":0.0485713},\n{\"type\":32, \"data\":[254,152,17],\"color\":[167,164,160,128],\"score\":0.0483703},\n{\"type\":32, \"data\":[156,308,19],\"color\":[43,84,149,128],\"score\":0.0482282},\n{\"type\":32, \"data\":[272,174,12],\"color\":[212,214,213,128],\"score\":0.0480572},\n{\"type\":32, \"data\":[140,99,15],\"color\":[0,0,0,128],\"score\":0.0478418},\n{\"type\":32, \"data\":[304,197,17],\"color\":[46,63,82,128],\"score\":0.0477264},\n{\"type\":32, \"data\":[165,75,6],\"color\":[255,255,254,128],\"score\":0.0475123},\n{\"type\":32, \"data\":[301,152,29],\"color\":[133,151,170,128],\"score\":0.0473907},\n{\"type\":32, \"data\":[502,173,13],\"color\":[67,80,65,128],\"score\":0.0472347},\n{\"type\":32, \"data\":[340,99,32],\"color\":[0,0,0,128],\"score\":0.0471012},\n{\"type\":32, \"data\":[119,142,24],\"color\":[0,0,0,128],\"score\":0.0469107},\n{\"type\":32, \"data\":[163,137,11],\"color\":[200,185,169,128],\"score\":0.0467154},\n{\"type\":32, \"data\":[184,135,9],\"color\":[0,0,0,128],\"score\":0.0465007},\n{\"type\":32, \"data\":[304,239,34],\"color\":[72,115,172,128],\"score\":0.0463797},\n{\"type\":32, \"data\":[323,312,64],\"color\":[51,95,154,128],\"score\":0.0462572},\n{\"type\":32, \"data\":[263,201,17],\"color\":[110,125,142,128],\"score\":0.0461107},\n{\"type\":32, \"data\":[362,114,28],\"color\":[0,0,0,128],\"score\":0.0459472},\n{\"type\":32, \"data\":[84,174,12],\"color\":[62,61,50,128],\"score\":0.045825},\n{\"type\":32, \"data\":[213,59,33],\"color\":[0,0,0,128],\"score\":0.0457401},\n{\"type\":32, \"data\":[114,180,9],\"color\":[104,95,67,128],\"score\":0.0456062},\n{\"type\":32, \"data\":[238,177,9],\"color\":[250,246,241,128],\"score\":0.0454958},\n{\"type\":32, \"data\":[176,174,10],\"color\":[255,255,255,128],\"score\":0.0453395},\n{\"type\":32, \"data\":[289,176,9],\"color\":[159,182,207,128],\"score\":0.0452285},\n{\"type\":32, \"data\":[376,159,11],\"color\":[2,0,0,128],\"score\":0.045006},\n{\"type\":32, \"data\":[327,139,11],\"color\":[148,174,209,128],\"score\":0.044881},\n{\"type\":32, \"data\":[143,108,10],\"color\":[0,0,0,128],\"score\":0.0447791},\n{\"type\":32, \"data\":[64,217,35],\"color\":[60,106,165,128],\"score\":0.0446751},\n{\"type\":32, \"data\":[400,172,9],\"color\":[63,69,39,128],\"score\":0.0446055},\n{\"type\":32, \"data\":[150,156,10],\"color\":[252,247,237,128],\"score\":0.0444573},\n{\"type\":32, \"data\":[401,218,31],\"color\":[66,113,174,128],\"score\":0.0443793},\n{\"type\":32, \"data\":[297,214,12],\"color\":[82,99,124,128],\"score\":0.0443473},\n{\"type\":32, \"data\":[449,150,25],\"color\":[1,1,0,128],\"score\":0.0442656},\n{\"type\":32, \"data\":[234,243,18],\"color\":[68,117,177,128],\"score\":0.0441913},\n{\"type\":32, \"data\":[229,218,6],\"color\":[221,239,255,128],\"score\":0.044071},\n{\"type\":32, \"data\":[248,86,24],\"color\":[0,0,0,128],\"score\":0.0439716},\n{\"type\":32, \"data\":[154,174,13],\"color\":[232,229,224,128],\"score\":0.0438819},\n{\"type\":32, \"data\":[171,20,27],\"color\":[0,0,0,128],\"score\":0.0438274},\n{\"type\":32, \"data\":[49,149,32],\"color\":[3,3,3,128],\"score\":0.0437606},\n{\"type\":32, \"data\":[230,85,28],\"color\":[0,0,0,128],\"score\":0.043685},\n{\"type\":32, \"data\":[167,60,12],\"color\":[160,166,166,128],\"score\":0.0435588},\n{\"type\":32, \"data\":[498,191,14],\"color\":[55,106,171,128],\"score\":0.0434964},\n{\"type\":32, \"data\":[142,54,3],\"color\":[219,214,211,128],\"score\":0.0433799},\n{\"type\":32, \"data\":[320,165,13],\"color\":[156,170,182,128],\"score\":0.0433138},\n{\"type\":32, \"data\":[0,255,34],\"color\":[49,95,156,128],\"score\":0.0432884},\n{\"type\":32, \"data\":[235,159,13],\"color\":[197,196,193,128],\"score\":0.0432485},\n{\"type\":32, \"data\":[220,312,54],\"color\":[56,97,154,128],\"score\":0.0431909},\n{\"type\":32, \"data\":[28,199,16],\"color\":[54,101,158,128],\"score\":0.0431634},\n{\"type\":32, \"data\":[159,59,11],\"color\":[199,196,192,128],\"score\":0.0430726},\n{\"type\":32, \"data\":[208,136,6],\"color\":[198,206,216,128],\"score\":0.0430243},\n{\"type\":32, \"data\":[421,158,18],\"color\":[8,7,2,128],\"score\":0.0429454},\n{\"type\":32, \"data\":[278,154,7],\"color\":[107,108,110,128],\"score\":0.0428868},\n{\"type\":32, \"data\":[204,259,21],\"color\":[61,106,167,128],\"score\":0.0428567},\n{\"type\":32, \"data\":[374,312,55],\"color\":[50,95,153,128],\"score\":0.042835},\n{\"type\":32, \"data\":[106,260,22],\"color\":[60,102,159,128],\"score\":0.0428165},\n{\"type\":32, \"data\":[130,96,18],\"color\":[0,0,0,128],\"score\":0.0427932},\n{\"type\":32, \"data\":[280,190,6],\"color\":[35,47,57,128],\"score\":0.0426567},\n{\"type\":32, \"data\":[281,77,32],\"color\":[0,0,0,128],\"score\":0.0425628},\n{\"type\":32, \"data\":[239,216,10],\"color\":[168,190,215,128],\"score\":0.0425008},\n{\"type\":32, \"data\":[35,204,21],\"color\":[57,102,159,128],\"score\":0.0424859},\n{\"type\":32, \"data\":[132,214,17],\"color\":[64,111,176,128],\"score\":0.0424494},\n{\"type\":32, \"data\":[250,178,9],\"color\":[238,233,226,128],\"score\":0.0423667},\n{\"type\":32, \"data\":[155,258,6],\"color\":[30,86,165,128],\"score\":0.0422735},\n{\"type\":32, \"data\":[471,213,37],\"color\":[53,103,166,128],\"score\":0.0422434},\n{\"type\":32, \"data\":[223,196,12],\"color\":[150,167,185,128],\"score\":0.0421537},\n{\"type\":32, \"data\":[171,112,7],\"color\":[156,150,144,128],\"score\":0.0420789},\n{\"type\":32, \"data\":[170,55,5],\"color\":[97,108,111,128],\"score\":0.0419998},\n{\"type\":32, \"data\":[222,246,24],\"color\":[65,110,170,128],\"score\":0.0419713},\n{\"type\":32, \"data\":[143,266,8],\"color\":[127,87,58,128],\"score\":0.0419111},\n{\"type\":32, \"data\":[370,164,11],\"color\":[18,19,6,128],\"score\":0.0418558},\n{\"type\":32, \"data\":[152,66,7],\"color\":[193,193,196,128],\"score\":0.0417732},\n{\"type\":32, \"data\":[258,85,24],\"color\":[0,0,0,128],\"score\":0.0417203},\n{\"type\":32, \"data\":[192,195,5],\"color\":[234,255,255,128],\"score\":0.0416449},\n{\"type\":32, \"data\":[240,189,6],\"color\":[144,136,122,128],\"score\":0.0415749},\n{\"type\":32, \"data\":[135,257,9],\"color\":[61,65,89,128],\"score\":0.0415319},\n{\"type\":32, \"data\":[475,271,43],\"color\":[47,94,155,128],\"score\":0.0415073},\n{\"type\":32, \"data\":[225,138,9],\"color\":[242,240,239,128],\"score\":0.0414571},\n{\"type\":32, \"data\":[215,54,35],\"color\":[0,0,0,128],\"score\":0.0414364},\n{\"type\":32, \"data\":[325,144,16],\"color\":[131,151,175,128],\"score\":0.0413672},\n{\"type\":32, \"data\":[146,248,13],\"color\":[58,108,175,128],\"score\":0.0412602},\n{\"type\":32, \"data\":[179,144,7],\"color\":[0,0,0,128],\"score\":0.0410496},\n{\"type\":32, \"data\":[192,94,11],\"color\":[0,0,0,128],\"score\":0.0410207},\n{\"type\":32, \"data\":[281,222,13],\"color\":[109,130,160,128],\"score\":0.0409682},\n{\"type\":32, \"data\":[375,142,5],\"color\":[199,206,218,128],\"score\":0.0408472},\n{\"type\":32, \"data\":[173,78,10],\"color\":[183,182,178,128],\"score\":0.040802},\n{\"type\":32, \"data\":[339,241,33],\"color\":[62,109,171,128],\"score\":0.0407719},\n{\"type\":32, \"data\":[258,191,6],\"color\":[109,103,89,128],\"score\":0.0407056},\n{\"type\":32, \"data\":[186,203,7],\"color\":[51,119,204,128],\"score\":0.0406323},\n{\"type\":32, \"data\":[484,176,7],\"color\":[64,91,96,128],\"score\":0.0405987},\n{\"type\":32, \"data\":[132,158,8],\"color\":[1,2,1,128],\"score\":0.0405639},\n{\"type\":32, \"data\":[189,191,6],\"color\":[217,231,248,128],\"score\":0.04051},\n{\"type\":32, \"data\":[327,181,5],\"color\":[0,0,0,128],\"score\":0.0403922},\n{\"type\":32, \"data\":[105,53,31],\"color\":[0,0,0,128],\"score\":0.0402897},\n{\"type\":32, \"data\":[159,233,6],\"color\":[208,205,195,128],\"score\":0.0401801},\n{\"type\":32, \"data\":[182,150,2],\"color\":[179,193,198,128],\"score\":0.0401285},\n{\"type\":32, \"data\":[488,135,32],\"color\":[0,0,0,128],\"score\":0.0401055},\n{\"type\":32, \"data\":[291,255,26],\"color\":[62,109,171,128],\"score\":0.0400832},\n{\"type\":32, \"data\":[468,174,8],\"color\":[60,64,46,128],\"score\":0.0400363},\n{\"type\":32, \"data\":[165,85,7],\"color\":[255,253,242,128],\"score\":0.039879},\n{\"type\":32, \"data\":[208,95,27],\"color\":[0,0,0,128],\"score\":0.0397886},\n{\"type\":32, \"data\":[248,222,11],\"color\":[156,181,212,128],\"score\":0.0397453},\n{\"type\":32, \"data\":[216,166,19],\"color\":[223,222,219,128],\"score\":0.0397172},\n{\"type\":32, \"data\":[264,178,8],\"color\":[213,213,210,128],\"score\":0.0396784},\n{\"type\":32, \"data\":[251,194,9],\"color\":[140,146,151,128],\"score\":0.0396362},\n{\"type\":32, \"data\":[164,153,10],\"color\":[164,159,151,128],\"score\":0.0394982},\n{\"type\":32, \"data\":[287,116,7],\"color\":[221,223,229,128],\"score\":0.0393851},\n{\"type\":32, \"data\":[377,102,34],\"color\":[0,0,0,128],\"score\":0.0393543},\n{\"type\":32, \"data\":[180,243,12],\"color\":[87,97,114,128],\"score\":0.0392858},\n{\"type\":32, \"data\":[62,312,35],\"color\":[50,90,144,128],\"score\":0.0392717},\n{\"type\":32, \"data\":[118,173,11],\"color\":[61,64,57,128],\"score\":0.0392307},\n{\"type\":32, \"data\":[159,185,8],\"color\":[141,149,157,128],\"score\":0.039129},\n{\"type\":32, \"data\":[149,162,9],\"color\":[250,249,244,128],\"score\":0.0390369},\n{\"type\":32, \"data\":[138,69,4],\"color\":[230,153,48,128],\"score\":0.0389291},\n{\"type\":32, \"data\":[150,184,9],\"color\":[198,199,197,128],\"score\":0.0388545},\n{\"type\":32, \"data\":[8,172,10],\"color\":[29,28,22,128],\"score\":0.0388208},\n{\"type\":32, \"data\":[187,161,8],\"color\":[236,234,233,128],\"score\":0.0387882},\n{\"type\":32, \"data\":[273,187,3],\"color\":[58,55,57,128],\"score\":0.0387532},\n{\"type\":32, \"data\":[179,196,5],\"color\":[54,118,191,128],\"score\":0.0387078},\n{\"type\":32, \"data\":[191,219,16],\"color\":[62,113,182,128],\"score\":0.0386141},\n{\"type\":32, \"data\":[203,187,5],\"color\":[155,154,151,128],\"score\":0.0385654},\n{\"type\":32, \"data\":[253,206,11],\"color\":[140,164,194,128],\"score\":0.0385263},\n{\"type\":32, \"data\":[385,179,8],\"color\":[66,96,76,128],\"score\":0.0384715},\n{\"type\":32, \"data\":[173,181,4],\"color\":[198,198,195,128],\"score\":0.0384504},\n{\"type\":32, \"data\":[173,122,4],\"color\":[165,162,158,128],\"score\":0.0383869},\n{\"type\":32, \"data\":[116,122,32],\"color\":[0,0,0,128],\"score\":0.0383368},\n{\"type\":32, \"data\":[62,120,41],\"color\":[0,0,0,128],\"score\":0.0383238},\n{\"type\":32, \"data\":[177,257,8],\"color\":[114,98,81,128],\"score\":0.0382497},\n{\"type\":32, \"data\":[351,178,8],\"color\":[12,11,13,128],\"score\":0.0382073},\n{\"type\":32, \"data\":[5,213,28],\"color\":[54,100,158,128],\"score\":0.0381647},\n{\"type\":32, \"data\":[301,147,17],\"color\":[117,133,154,128],\"score\":0.0381023},\n{\"type\":32, \"data\":[171,219,8],\"color\":[103,98,92,128],\"score\":0.0380105},\n{\"type\":32, \"data\":[36,174,9],\"color\":[30,28,21,128],\"score\":0.0379714},\n{\"type\":32, \"data\":[511,309,23],\"color\":[37,83,145,128],\"score\":0.0379659},\n{\"type\":32, \"data\":[141,273,6],\"color\":[119,80,53,128],\"score\":0.0379059},\n{\"type\":32, \"data\":[102,203,17],\"color\":[66,112,174,128],\"score\":0.0378804},\n{\"type\":32, \"data\":[244,254,24],\"color\":[63,110,170,128],\"score\":0.0378474},\n{\"type\":32, \"data\":[376,224,25],\"color\":[64,110,171,128],\"score\":0.0378327},\n{\"type\":32, \"data\":[131,256,4],\"color\":[51,26,6,128],\"score\":0.0377814},\n{\"type\":32, \"data\":[102,173,9],\"color\":[53,48,34,128],\"score\":0.0377475},\n{\"type\":32, \"data\":[285,138,17],\"color\":[134,142,151,128],\"score\":0.0376979},\n{\"type\":32, \"data\":[253,312,34],\"color\":[54,96,152,128],\"score\":0.0376889},\n{\"type\":32, \"data\":[439,176,12],\"color\":[60,72,52,128],\"score\":0.037617},\n{\"type\":32, \"data\":[442,148,23],\"color\":[0,0,0,128],\"score\":0.0375905},\n{\"type\":32, \"data\":[227,164,10],\"color\":[197,197,195,128],\"score\":0.0375653},\n{\"type\":32, \"data\":[198,125,8],\"color\":[0,0,0,128],\"score\":0.0374959},\n{\"type\":32, \"data\":[340,161,4],\"color\":[244,238,234,128],\"score\":0.0374433},\n{\"type\":32, \"data\":[178,99,4],\"color\":[125,125,123,128],\"score\":0.0373712},\n{\"type\":32, \"data\":[142,61,5],\"color\":[34,34,31,128],\"score\":0.0372341},\n{\"type\":32, \"data\":[156,134,10],\"color\":[242,237,228,128],\"score\":0.037054},\n{\"type\":32, \"data\":[304,133,14],\"color\":[151,171,199,128],\"score\":0.0369728},\n{\"type\":32, \"data\":[168,132,8],\"color\":[163,152,139,128],\"score\":0.0368143},\n{\"type\":32, \"data\":[122,272,13],\"color\":[58,101,161,128],\"score\":0.0367856},\n{\"type\":32, \"data\":[315,186,8],\"color\":[25,33,44,128],\"score\":0.0367136},\n{\"type\":32, \"data\":[191,31,27],\"color\":[0,0,0,128],\"score\":0.0366767},\n{\"type\":32, \"data\":[506,172,5],\"color\":[64,64,28,128],\"score\":0.0366572},\n{\"type\":32, \"data\":[120,183,7],\"color\":[92,94,82,128],\"score\":0.0366332},\n{\"type\":32, \"data\":[264,157,7],\"color\":[134,135,135,128],\"score\":0.0365863},\n{\"type\":32, \"data\":[267,138,7],\"color\":[192,189,181,128],\"score\":0.0365617},\n{\"type\":32, \"data\":[337,182,6],\"color\":[15,21,22,128],\"score\":0.0365252},\n{\"type\":32, \"data\":[207,198,11],\"color\":[195,217,241,128],\"score\":0.0364666},\n{\"type\":32, \"data\":[338,120,12],\"color\":[0,0,0,128],\"score\":0.0364013},\n{\"type\":32, \"data\":[227,189,5],\"color\":[142,134,121,128],\"score\":0.0363401},\n{\"type\":32, \"data\":[135,170,8],\"color\":[26,27,25,128],\"score\":0.0362346},\n{\"type\":32, \"data\":[286,174,10],\"color\":[152,172,196,128],\"score\":0.0362144},\n{\"type\":32, \"data\":[128,110,24],\"color\":[0,0,0,128],\"score\":0.0361432},\n{\"type\":32, \"data\":[316,130,6],\"color\":[165,186,216,128],\"score\":0.0361193},\n{\"type\":32, \"data\":[208,125,2],\"color\":[0,0,0,128],\"score\":0.03608},\n{\"type\":32, \"data\":[142,89,15],\"color\":[0,0,0,128],\"score\":0.0359975},\n{\"type\":32, \"data\":[344,168,6],\"color\":[104,117,132,128],\"score\":0.0359199},\n{\"type\":32, \"data\":[362,117,25],\"color\":[0,0,0,128],\"score\":0.0358699},\n{\"type\":32, \"data\":[196,134,2],\"color\":[0,0,0,128],\"score\":0.035846},\n{\"type\":32, \"data\":[360,149,7],\"color\":[200,213,226,128],\"score\":0.035741},\n{\"type\":32, \"data\":[347,155,8],\"color\":[198,205,216,128],\"score\":0.0356768},\n{\"type\":32, \"data\":[213,255,31],\"color\":[62,107,167,128],\"score\":0.0356477},\n{\"type\":32, \"data\":[297,119,5],\"color\":[232,231,236,128],\"score\":0.0355508},\n{\"type\":32, \"data\":[176,102,4],\"color\":[140,139,136,128],\"score\":0.035505},\n{\"type\":32, \"data\":[493,168,9],\"color\":[32,34,24,128],\"score\":0.0354686},\n{\"type\":32, \"data\":[180,305,20],\"color\":[58,97,156,128],\"score\":0.0354617},\n{\"type\":32, \"data\":[289,142,15],\"color\":[127,138,150,128],\"score\":0.0354291},\n{\"type\":32, \"data\":[248,120,10],\"color\":[206,211,218,128],\"score\":0.0353071},\n{\"type\":32, \"data\":[165,141,6],\"color\":[156,145,133,128],\"score\":0.035256},\n{\"type\":32, \"data\":[154,199,8],\"color\":[191,190,180,128],\"score\":0.0352118},\n{\"type\":32, \"data\":[436,216,34],\"color\":[57,106,167,128],\"score\":0.035183},\n{\"type\":32, \"data\":[211,189,6],\"color\":[162,164,160,128],\"score\":0.0351357},\n{\"type\":32, \"data\":[47,176,9],\"color\":[39,39,27,128],\"score\":0.0351174},\n{\"type\":32, \"data\":[328,163,6],\"color\":[192,200,210,128],\"score\":0.0350791},\n{\"type\":32, \"data\":[216,124,2],\"color\":[189,205,227,128],\"score\":0.0350535},\n{\"type\":32, \"data\":[130,149,12],\"color\":[0,0,0,128],\"score\":0.034998},\n{\"type\":32, \"data\":[181,69,2],\"color\":[157,174,183,128],\"score\":0.0349747},\n{\"type\":32, \"data\":[404,256,21],\"color\":[54,100,160,128],\"score\":0.0349701},\n{\"type\":32, \"data\":[409,175,7],\"color\":[64,77,55,128],\"score\":0.0349415},\n{\"type\":32, \"data\":[205,86,23],\"color\":[0,0,0,128],\"score\":0.0349179},\n{\"type\":32, \"data\":[405,147,15],\"color\":[0,0,0,128],\"score\":0.0349037},\n{\"type\":32, \"data\":[374,128,12],\"color\":[0,0,0,128],\"score\":0.0348628},\n{\"type\":32, \"data\":[184,185,8],\"color\":[213,220,224,128],\"score\":0.0348251},\n{\"type\":32, \"data\":[232,101,13],\"color\":[0,0,0,128],\"score\":0.0348007},\n{\"type\":32, \"data\":[319,312,32],\"color\":[51,96,153,128],\"score\":0.0347938},\n{\"type\":32, \"data\":[259,227,7],\"color\":[171,191,218,128],\"score\":0.034757},\n{\"type\":32, \"data\":[143,301,16],\"color\":[58,98,152,128],\"score\":0.0347386},\n{\"type\":32, \"data\":[238,239,12],\"color\":[67,114,178,128],\"score\":0.0347219},\n{\"type\":32, \"data\":[179,269,6],\"color\":[90,88,85,128],\"score\":0.0346783},\n{\"type\":32, \"data\":[278,115,7],\"color\":[211,216,219,128],\"score\":0.0346403},\n{\"type\":32, \"data\":[316,199,13],\"color\":[58,79,103,128],\"score\":0.034595},\n{\"type\":32, \"data\":[158,221,8],\"color\":[181,185,188,128],\"score\":0.0345269},\n{\"type\":32, \"data\":[380,140,4],\"color\":[243,249,255,128],\"score\":0.034116},\n{\"type\":32, \"data\":[482,169,4],\"color\":[41,46,39,128],\"score\":0.0341039},\n{\"type\":32, \"data\":[338,194,9],\"color\":[72,93,114,128],\"score\":0.0340583},\n{\"type\":32, \"data\":[152,272,6],\"color\":[195,190,179,128],\"score\":0.0339779},\n{\"type\":32, \"data\":[134,229,19],\"color\":[62,107,169,128],\"score\":0.0339548},\n{\"type\":32, \"data\":[312,210,9],\"color\":[58,87,124,128],\"score\":0.0339382},\n{\"type\":32, \"data\":[300,190,7],\"color\":[39,57,75,128],\"score\":0.0339173},\n{\"type\":32, \"data\":[392,133,3],\"color\":[58,59,64,128],\"score\":0.0338945},\n{\"type\":32, \"data\":[157,107,4],\"color\":[250,251,248,128],\"score\":0.0338587},\n{\"type\":32, \"data\":[174,233,8],\"color\":[123,114,102,128],\"score\":0.033812},\n{\"type\":32, \"data\":[186,126,9],\"color\":[0,0,0,128],\"score\":0.0337342},\n{\"type\":32, \"data\":[292,193,10],\"color\":[46,68,95,128],\"score\":0.0336809},\n{\"type\":32, \"data\":[239,153,2],\"color\":[117,118,117,128],\"score\":0.0336619},\n{\"type\":32, \"data\":[215,203,12],\"color\":[197,214,234,128],\"score\":0.0336243},\n{\"type\":32, \"data\":[468,196,18],\"color\":[56,106,169,128],\"score\":0.0336123},\n{\"type\":32, \"data\":[409,140,18],\"color\":[0,0,0,128],\"score\":0.033603},\n{\"type\":32, \"data\":[297,79,32],\"color\":[0,0,0,128],\"score\":0.0335515},\n{\"type\":32, \"data\":[164,160,7],\"color\":[156,153,152,128],\"score\":0.0335012},\n{\"type\":32, \"data\":[236,222,2],\"color\":[188,208,227,128],\"score\":0.0334962},\n{\"type\":32, \"data\":[47,197,14],\"color\":[59,104,156,128],\"score\":0.033486},\n{\"type\":32, \"data\":[292,153,4],\"color\":[185,186,184,128],\"score\":0.0334575},\n{\"type\":32, \"data\":[152,141,7],\"color\":[247,246,241,128],\"score\":0.033396},\n{\"type\":32, \"data\":[224,129,10],\"color\":[194,199,208,128],\"score\":0.0333584},\n{\"type\":32, \"data\":[176,104,5],\"color\":[144,142,139,128],\"score\":0.0333257},\n{\"type\":32, \"data\":[374,113,25],\"color\":[0,0,0,128],\"score\":0.0332619},\n{\"type\":32, \"data\":[92,145,24],\"color\":[1,1,1,128],\"score\":0.0332513},\n{\"type\":32, \"data\":[386,140,3],\"color\":[168,168,171,128],\"score\":0.033173},\n{\"type\":32, \"data\":[66,173,10],\"color\":[46,46,36,128],\"score\":0.0331187},\n{\"type\":32, \"data\":[424,185,11],\"color\":[65,103,131,128],\"score\":0.0330931},\n{\"type\":32, \"data\":[420,205,17],\"color\":[62,110,172,128],\"score\":0.0330839},\n{\"type\":32, \"data\":[6,298,34],\"color\":[44,87,146,128],\"score\":0.0330742},\n{\"type\":32, \"data\":[351,187,8],\"color\":[46,61,81,128],\"score\":0.0330451},\n{\"type\":32, \"data\":[166,253,7],\"color\":[187,184,177,128],\"score\":0.0329677},\n{\"type\":32, \"data\":[213,142,15],\"color\":[216,218,221,128],\"score\":0.032943},\n{\"type\":32, \"data\":[368,145,6],\"color\":[190,202,217,128],\"score\":0.0328176},\n{\"type\":32, \"data\":[292,138,8],\"color\":[109,128,152,128],\"score\":0.0328046},\n{\"type\":32, \"data\":[261,115,7],\"color\":[190,197,206,128],\"score\":0.032755},\n{\"type\":32, \"data\":[391,144,6],\"color\":[0,0,0,128],\"score\":0.0326902},\n{\"type\":32, \"data\":[185,134,9],\"color\":[0,0,0,128],\"score\":0.0326335},\n{\"type\":32, \"data\":[464,244,24],\"color\":[50,100,159,128],\"score\":0.0326272},\n{\"type\":32, \"data\":[108,82,15],\"color\":[2,1,1,128],\"score\":0.0326267},\n{\"type\":32, \"data\":[315,154,6],\"color\":[100,117,136,128],\"score\":0.0325879},\n{\"type\":32, \"data\":[304,185,5],\"color\":[23,31,39,128],\"score\":0.0325607},\n{\"type\":32, \"data\":[157,118,6],\"color\":[254,253,249,128],\"score\":0.0324735},\n{\"type\":32, \"data\":[370,192,6],\"color\":[42,48,66,128],\"score\":0.0324262},\n{\"type\":32, \"data\":[119,78,6],\"color\":[42,22,19,128],\"score\":0.032396},\n{\"type\":32, \"data\":[54,245,26],\"color\":[54,98,157,128],\"score\":0.0323903},\n{\"type\":32, \"data\":[353,224,28],\"color\":[62,110,171,128],\"score\":0.0323802},\n{\"type\":32, \"data\":[238,125,12],\"color\":[210,213,216,128],\"score\":0.0323076},\n{\"type\":32, \"data\":[149,170,6],\"color\":[255,255,255,128],\"score\":0.0322695},\n{\"type\":32, \"data\":[136,199,9],\"color\":[66,108,171,128],\"score\":0.0322316},\n{\"type\":32, \"data\":[77,203,23],\"color\":[60,105,164,128],\"score\":0.0322047},\n{\"type\":32, \"data\":[160,60,6],\"color\":[225,223,217,128],\"score\":0.0321626},\n{\"type\":32, \"data\":[255,140,7],\"color\":[203,204,203,128],\"score\":0.0321469},\n{\"type\":32, \"data\":[5,179,7],\"color\":[50,48,35,128],\"score\":0.0321283},\n{\"type\":32, \"data\":[169,198,12],\"color\":[108,121,139,128],\"score\":0.032099},\n{\"type\":32, \"data\":[181,204,7],\"color\":[64,117,190,128],\"score\":0.0320703},\n{\"type\":32, \"data\":[458,177,5],\"color\":[66,81,76,128],\"score\":0.032053},\n{\"type\":32, \"data\":[173,61,7],\"color\":[105,115,120,128],\"score\":0.0319832},\n{\"type\":32, \"data\":[159,88,2],\"color\":[255,255,255,128],\"score\":0.031916},\n{\"type\":32, \"data\":[149,146,6],\"color\":[246,245,244,128],\"score\":0.0318695},\n{\"type\":32, \"data\":[375,186,6],\"color\":[52,106,161,128],\"score\":0.0318337},\n{\"type\":32, \"data\":[190,99,10],\"color\":[0,0,0,128],\"score\":0.0318254},\n{\"type\":32, \"data\":[166,270,6],\"color\":[177,175,173,128],\"score\":0.0317954},\n{\"type\":32, \"data\":[199,234,20],\"color\":[68,112,174,128],\"score\":0.0317622},\n{\"type\":32, \"data\":[338,147,9],\"color\":[129,153,181,128],\"score\":0.0317144},\n{\"type\":32, \"data\":[95,84,27],\"color\":[0,0,0,128],\"score\":0.0317029},\n{\"type\":32, \"data\":[140,261,5],\"color\":[53,43,50,128],\"score\":0.0316777},\n{\"type\":32, \"data\":[196,184,3],\"color\":[169,166,159,128],\"score\":0.0316454},\n{\"type\":32, \"data\":[357,171,5],\"color\":[7,6,0,128],\"score\":0.0315965},\n{\"type\":32, \"data\":[243,269,25],\"color\":[60,103,161,128],\"score\":0.0315906},\n{\"type\":32, \"data\":[321,131,6],\"color\":[165,187,218,128],\"score\":0.0315258},\n{\"type\":32, \"data\":[327,152,5],\"color\":[113,126,141,128],\"score\":0.0315036},\n{\"type\":32, \"data\":[164,94,9],\"color\":[227,222,214,128],\"score\":0.0314613},\n{\"type\":32, \"data\":[231,123,8],\"color\":[182,189,200,128],\"score\":0.0314078},\n{\"type\":32, \"data\":[229,158,5],\"color\":[181,181,179,128],\"score\":0.0313941},\n{\"type\":32, \"data\":[235,101,12],\"color\":[0,0,0,128],\"score\":0.0313811},\n{\"type\":32, \"data\":[359,112,30],\"color\":[0,0,0,128],\"score\":0.0313323},\n{\"type\":32, \"data\":[178,172,11],\"color\":[248,247,245,128],\"score\":0.0313005},\n{\"type\":32, \"data\":[236,133,11],\"color\":[231,229,223,128],\"score\":0.0312548},\n{\"type\":32, \"data\":[151,193,7],\"color\":[187,195,201,128],\"score\":0.0312268},\n{\"type\":32, \"data\":[108,295,34],\"color\":[55,96,152,128],\"score\":0.0312208},\n{\"type\":32, \"data\":[504,185,9],\"color\":[57,102,146,128],\"score\":0.0312053},\n{\"type\":32, \"data\":[179,184,5],\"color\":[195,200,206,128],\"score\":0.0311794},\n{\"type\":32, \"data\":[448,312,27],\"color\":[46,91,148,128],\"score\":0.0311738},\n{\"type\":32, \"data\":[176,69,6],\"color\":[118,126,129,128],\"score\":0.0311416},\n{\"type\":32, \"data\":[173,275,7],\"color\":[123,122,117,128],\"score\":0.0311135},\n{\"type\":32, \"data\":[340,176,2],\"color\":[5,3,3,128],\"score\":0.031107},\n{\"type\":32, \"data\":[207,102,22],\"color\":[0,0,0,128],\"score\":0.0310658},\n{\"type\":32, \"data\":[235,201,11],\"color\":[159,180,202,128],\"score\":0.0310424},\n{\"type\":32, \"data\":[234,178,8],\"color\":[230,230,229,128],\"score\":0.0310238},\n{\"type\":32, \"data\":[305,167,5],\"color\":[168,183,199,128],\"score\":0.0310032},\n{\"type\":32, \"data\":[245,163,10],\"color\":[200,200,201,128],\"score\":0.0309871},\n{\"type\":32, \"data\":[115,54,22],\"color\":[0,0,1,128],\"score\":0.0309469},\n{\"type\":32, \"data\":[152,212,3],\"color\":[217,227,228,128],\"score\":0.0308973},\n{\"type\":32, \"data\":[286,200,8],\"color\":[69,97,138,128],\"score\":0.0308813},\n{\"type\":32, \"data\":[145,253,8],\"color\":[60,107,169,128],\"score\":0.0308441},\n{\"type\":32, \"data\":[309,112,7],\"color\":[4,3,4,128],\"score\":0.03082},\n{\"type\":32, \"data\":[320,281,19],\"color\":[57,102,161,128],\"score\":0.0308143},\n{\"type\":32, \"data\":[172,283,2],\"color\":[142,142,139,128],\"score\":0.0308085},\n{\"type\":32, \"data\":[177,148,4],\"color\":[0,0,0,128],\"score\":0.0307377},\n{\"type\":32, \"data\":[191,148,3],\"color\":[173,177,185,128],\"score\":0.0307224},\n{\"type\":32, \"data\":[190,223,13],\"color\":[68,113,173,128],\"score\":0.0307165},\n{\"type\":32, \"data\":[194,154,7],\"color\":[233,233,233,128],\"score\":0.0307001},\n{\"type\":32, \"data\":[477,182,7],\"color\":[53,102,160,128],\"score\":0.0306847},\n{\"type\":32, \"data\":[234,187,3],\"color\":[124,119,110,128],\"score\":0.0306447},\n{\"type\":32, \"data\":[360,260,18],\"color\":[56,102,161,128],\"score\":0.0306391},\n{\"type\":32, \"data\":[214,130,5],\"color\":[144,158,175,128],\"score\":0.0305852},\n{\"type\":32, \"data\":[242,178,8],\"color\":[228,229,230,128],\"score\":0.030568},\n{\"type\":32, \"data\":[409,183,5],\"color\":[68,101,103,128],\"score\":0.0305553},\n{\"type\":32, \"data\":[299,198,10],\"color\":[51,74,102,128],\"score\":0.0305431},\n{\"type\":32, \"data\":[474,268,23],\"color\":[49,95,154,128],\"score\":0.0305394},\n{\"type\":32, \"data\":[167,216,9],\"color\":[121,117,112,128],\"score\":0.0305144},\n{\"type\":32, \"data\":[37,277,26],\"color\":[51,94,150,128],\"score\":0.0305097},\n{\"type\":32, \"data\":[220,198,9],\"color\":[170,186,203,128],\"score\":0.0304917},\n{\"type\":32, \"data\":[26,173,10],\"color\":[20,21,17,128],\"score\":0.0304767},\n{\"type\":32, \"data\":[258,235,3],\"color\":[69,122,191,128],\"score\":0.030471},\n{\"type\":32, \"data\":[146,53,4],\"color\":[184,180,178,128],\"score\":0.0304216},\n{\"type\":32, \"data\":[310,183,4],\"color\":[13,14,14,128],\"score\":0.0303949},\n{\"type\":32, \"data\":[203,159,16],\"color\":[225,224,223,128],\"score\":0.0303829},\n{\"type\":32, \"data\":[143,277,3],\"color\":[26,34,43,128],\"score\":0.0303364},\n{\"type\":32, \"data\":[124,78,2],\"color\":[255,121,97,128],\"score\":0.0302394},\n{\"type\":32, \"data\":[211,236,20],\"color\":[69,114,174,128],\"score\":0.0302357},\n{\"type\":32, \"data\":[366,148,7],\"color\":[183,191,202,128],\"score\":0.0301858},\n{\"type\":32, \"data\":[132,73,2],\"color\":[255,148,44,128],\"score\":0.0301249},\n{\"type\":32, \"data\":[205,265,22],\"color\":[59,103,161,128],\"score\":0.0301144},\n{\"type\":32, \"data\":[19,151,23],\"color\":[1,1,1,128],\"score\":0.0301084},\n{\"type\":32, \"data\":[164,22,24],\"color\":[0,0,0,128],\"score\":0.030088},\n{\"type\":32, \"data\":[248,146,7],\"color\":[168,168,170,128],\"score\":0.0300701},\n{\"type\":32, \"data\":[228,216,7],\"color\":[195,213,233,128],\"score\":0.0300492},\n{\"type\":32, \"data\":[124,139,20],\"color\":[0,0,0,128],\"score\":0.0300031},\n{\"type\":32, \"data\":[147,281,5],\"color\":[124,120,112,128],\"score\":0.0299669},\n{\"type\":32, \"data\":[153,207,5],\"color\":[191,189,183,128],\"score\":0.0299512},\n{\"type\":32, \"data\":[209,190,7],\"color\":[173,179,181,128],\"score\":0.029943},\n{\"type\":32, \"data\":[278,193,4],\"color\":[84,108,134,128],\"score\":0.0299351},\n{\"type\":32, \"data\":[215,147,14],\"color\":[231,229,227,128],\"score\":0.0299032},\n{\"type\":32, \"data\":[223,218,3],\"color\":[235,247,255,128],\"score\":0.029873},\n{\"type\":32, \"data\":[142,245,11],\"color\":[64,108,166,128],\"score\":0.0298686},\n{\"type\":32, \"data\":[377,160,10],\"color\":[9,9,4,128],\"score\":0.0298381},\n{\"type\":32, \"data\":[209,38,36],\"color\":[0,0,0,128],\"score\":0.0298293},\n{\"type\":32, \"data\":[304,139,13],\"color\":[132,152,177,128],\"score\":0.0298221},\n{\"type\":32, \"data\":[254,245,13],\"color\":[67,114,177,128],\"score\":0.0298149},\n{\"type\":32, \"data\":[76,165,8],\"color\":[21,22,20,128],\"score\":0.0298067},\n{\"type\":32, \"data\":[134,72,3],\"color\":[232,113,42,128],\"score\":0.029767},\n{\"type\":32, \"data\":[165,173,5],\"color\":[255,255,255,128],\"score\":0.0297382},\n{\"type\":32, \"data\":[194,176,6],\"color\":[251,252,253,128],\"score\":0.0297205},\n{\"type\":32, \"data\":[163,261,4],\"color\":[180,180,177,128],\"score\":0.0297046},\n{\"type\":32, \"data\":[381,199,4],\"color\":[71,77,83,128],\"score\":0.0296732},\n{\"type\":32, \"data\":[369,179,5],\"color\":[53,95,112,128],\"score\":0.0296498},\n{\"type\":32, \"data\":[199,121,10],\"color\":[0,0,0,128],\"score\":0.0296209},\n{\"type\":32, \"data\":[159,54,9],\"color\":[181,180,176,128],\"score\":0.0295744},\n{\"type\":32, \"data\":[473,169,5],\"color\":[39,41,34,128],\"score\":0.0295663},\n{\"type\":32, \"data\":[216,210,6],\"color\":[226,235,249,128],\"score\":0.0295452},\n{\"type\":32, \"data\":[317,164,6],\"color\":[170,187,211,128],\"score\":0.0295192},\n{\"type\":32, \"data\":[93,239,28],\"color\":[59,104,163,128],\"score\":0.0295149},\n{\"type\":32, \"data\":[203,136,4],\"color\":[147,158,174,128],\"score\":0.029485},\n{\"type\":32, \"data\":[211,105,17],\"color\":[0,0,0,128],\"score\":0.0294819},\n{\"type\":32, \"data\":[348,118,20],\"color\":[0,0,1,128],\"score\":0.029464},\n{\"type\":32, \"data\":[419,119,31],\"color\":[0,0,0,128],\"score\":0.02946},\n{\"type\":32, \"data\":[219,178,6],\"color\":[240,240,239,128],\"score\":0.0294398},\n{\"type\":32, \"data\":[274,169,8],\"color\":[192,197,201,128],\"score\":0.0294222},\n{\"type\":32, \"data\":[272,266,21],\"color\":[61,105,164,128],\"score\":0.0294194},\n{\"type\":32, \"data\":[484,132,31],\"color\":[0,0,0,128],\"score\":0.0294156},\n{\"type\":32, \"data\":[148,69,5],\"color\":[189,185,181,128],\"score\":0.0292918},\n{\"type\":32, \"data\":[202,228,16],\"color\":[69,114,176,128],\"score\":0.0292836},\n{\"type\":32, \"data\":[349,201,9],\"color\":[72,113,166,128],\"score\":0.0292669},\n{\"type\":32, \"data\":[130,155,11],\"color\":[5,6,5,128],\"score\":0.0292513},\n{\"type\":32, \"data\":[153,136,7],\"color\":[242,239,231,128],\"score\":0.0292015},\n{\"type\":32, \"data\":[168,156,7],\"color\":[141,143,146,128],\"score\":0.0291707},\n{\"type\":32, \"data\":[146,63,3],\"color\":[199,201,203,128],\"score\":0.0291019},\n{\"type\":32, \"data\":[188,185,5],\"color\":[200,200,194,128],\"score\":0.0290833},\n{\"type\":32, \"data\":[202,308,31],\"color\":[58,98,154,128],\"score\":0.0290797},\n{\"type\":32, \"data\":[511,271,19],\"color\":[43,91,150,128],\"score\":0.0290764},\n{\"type\":32, \"data\":[187,119,10],\"color\":[0,0,0,128],\"score\":0.0290432},\n{\"type\":32, \"data\":[105,267,25],\"color\":[57,99,157,128],\"score\":0.0290398},\n{\"type\":32, \"data\":[108,179,6],\"color\":[82,78,66,128],\"score\":0.0290237},\n{\"type\":32, \"data\":[165,202,8],\"color\":[134,123,112,128],\"score\":0.0290001},\n{\"type\":32, \"data\":[454,169,6],\"color\":[34,33,18,128],\"score\":0.0289907},\n{\"type\":32, \"data\":[235,206,12],\"color\":[157,177,201,128],\"score\":0.0289698},\n{\"type\":32, \"data\":[220,217,2],\"color\":[244,255,255,128],\"score\":0.0289488},\n{\"type\":32, \"data\":[148,194,6],\"color\":[190,200,210,128],\"score\":0.0289294},\n{\"type\":32, \"data\":[172,118,5],\"color\":[160,155,149,128],\"score\":0.0288875},\n{\"type\":32, \"data\":[129,210,18],\"color\":[68,112,171,128],\"score\":0.0288772},\n{\"type\":32, \"data\":[133,187,8],\"color\":[67,75,81,128],\"score\":0.0288493},\n{\"type\":32, \"data\":[489,198,22],\"color\":[54,104,166,128],\"score\":0.0288426},\n{\"type\":32, \"data\":[175,98,6],\"color\":[151,150,146,128],\"score\":0.0287922},\n{\"type\":32, \"data\":[377,212,13],\"color\":[63,111,172,128],\"score\":0.0287849},\n{\"type\":32, \"data\":[274,120,4],\"color\":[144,158,173,128],\"score\":0.0287645},\n{\"type\":32, \"data\":[141,268,2],\"color\":[255,155,84,128],\"score\":0.0287283},\n{\"type\":32, \"data\":[299,160,6],\"color\":[97,112,128,128],\"score\":0.0286998},\n{\"type\":32, \"data\":[184,199,5],\"color\":[88,125,169,128],\"score\":0.0286882},\n{\"type\":32, \"data\":[24,180,7],\"color\":[38,42,33,128],\"score\":0.0286591},\n{\"type\":32, \"data\":[264,92,16],\"color\":[0,0,0,128],\"score\":0.028641},\n{\"type\":32, \"data\":[429,170,4],\"color\":[32,30,22,128],\"score\":0.0286347},\n{\"type\":32, \"data\":[302,181,1],\"color\":[94,122,151,128],\"score\":0.0286292},\n{\"type\":32, \"data\":[336,144,8],\"color\":[142,165,192,128],\"score\":0.0286115},\n{\"type\":32, \"data\":[164,110,6],\"color\":[231,225,215,128],\"score\":0.0285793},\n{\"type\":32, \"data\":[365,191,7],\"color\":[41,55,74,128],\"score\":0.0285597},\n{\"type\":32, \"data\":[276,154,10],\"color\":[131,134,137,128],\"score\":0.0285397},\n{\"type\":32, \"data\":[178,248,5],\"color\":[96,92,88,128],\"score\":0.0285254},\n{\"type\":32, \"data\":[209,132,3],\"color\":[120,132,152,128],\"score\":0.0284866},\n{\"type\":32, \"data\":[278,102,5],\"color\":[0,0,0,128],\"score\":0.0284797},\n{\"type\":32, \"data\":[246,219,4],\"color\":[132,154,177,128],\"score\":0.0284705},\n{\"type\":32, \"data\":[231,236,12],\"color\":[69,114,177,128],\"score\":0.028468},\n{\"type\":32, \"data\":[224,177,8],\"color\":[229,228,227,128],\"score\":0.0284532},\n{\"type\":32, \"data\":[277,141,6],\"color\":[159,161,157,128],\"score\":0.0284351},\n{\"type\":32, \"data\":[405,205,19],\"color\":[61,111,172,128],\"score\":0.0284295},\n{\"type\":32, \"data\":[322,198,4],\"color\":[49,46,39,128],\"score\":0.0284072},\n{\"type\":32, \"data\":[111,233,25],\"color\":[60,104,164,128],\"score\":0.0284026},\n{\"type\":32, \"data\":[391,189,8],\"color\":[51,108,157,128],\"score\":0.0283957},\n{\"type\":32, \"data\":[276,154,4],\"color\":[90,99,115,128],\"score\":0.0283796},\n{\"type\":32, \"data\":[344,195,2],\"color\":[126,136,149,128],\"score\":0.0283733},\n{\"type\":32, \"data\":[126,209,19],\"color\":[68,111,169,128],\"score\":0.0283643},\n{\"type\":32, \"data\":[305,104,12],\"color\":[2,3,3,128],\"score\":0.0282979},\n{\"type\":32, \"data\":[162,237,7],\"color\":[176,175,171,128],\"score\":0.0282798},\n{\"type\":32, \"data\":[382,168,7],\"color\":[32,36,22,128],\"score\":0.028266},\n{\"type\":32, \"data\":[169,122,7],\"color\":[174,165,153,128],\"score\":0.0282397},\n{\"type\":32, \"data\":[231,170,7],\"color\":[213,214,211,128],\"score\":0.0282321},\n{\"type\":32, \"data\":[0,177,6],\"color\":[40,40,32,128],\"score\":0.0282275},\n{\"type\":32, \"data\":[226,141,10],\"color\":[228,227,226,128],\"score\":0.0282173},\n{\"type\":32, \"data\":[391,135,2],\"color\":[155,155,157,128],\"score\":0.0281581},\n{\"type\":32, \"data\":[195,106,15],\"color\":[0,0,0,128],\"score\":0.0281465},\n{\"type\":32, \"data\":[147,115,4],\"color\":[0,0,0,128],\"score\":0.0281382},\n{\"type\":32, \"data\":[198,245,17],\"color\":[62,108,169,128],\"score\":0.0281283},\n{\"type\":32, \"data\":[322,180,1],\"color\":[0,0,0,128],\"score\":0.028118},\n{\"type\":32, \"data\":[84,306,27],\"color\":[52,93,147,128],\"score\":0.0281151},\n{\"type\":32, \"data\":[328,93,32],\"color\":[0,0,0,128],\"score\":0.0280465},\n{\"type\":32, \"data\":[248,164,9],\"color\":[189,189,189,128],\"score\":0.0280442},\n{\"type\":32, \"data\":[158,263,3],\"color\":[81,87,97,128],\"score\":0.0280174},\n{\"type\":32, \"data\":[333,142,9],\"color\":[142,165,190,128],\"score\":0.0279844},\n{\"type\":32, \"data\":[432,271,24],\"color\":[50,97,155,128],\"score\":0.0279808},\n{\"type\":32, \"data\":[155,126,6],\"color\":[245,245,239,128],\"score\":0.027937},\n{\"type\":32, \"data\":[160,184,4],\"color\":[145,153,159,128],\"score\":0.0279249},\n{\"type\":32, \"data\":[267,207,10],\"color\":[109,131,162,128],\"score\":0.0279138},\n{\"type\":32, \"data\":[511,228,21],\"color\":[49,97,161,128],\"score\":0.0279116},\n{\"type\":32, \"data\":[108,60,23],\"color\":[0,0,0,128],\"score\":0.0278903},\n{\"type\":32, \"data\":[267,248,15],\"color\":[64,111,173,128],\"score\":0.0278827},\n{\"type\":32, \"data\":[451,181,6],\"color\":[48,95,133,128],\"score\":0.0278637},\n{\"type\":32, \"data\":[174,152,2],\"color\":[0,0,0,128],\"score\":0.0277985},\n{\"type\":32, \"data\":[218,188,5],\"color\":[162,157,151,128],\"score\":0.0277725},\n{\"type\":32, \"data\":[382,140,4],\"color\":[192,195,200,128],\"score\":0.0277255},\n{\"type\":32, \"data\":[23,172,6],\"color\":[17,18,14,128],\"score\":0.0277213},\n{\"type\":32, \"data\":[376,195,5],\"color\":[55,70,92,128],\"score\":0.0277142},\n{\"type\":32, \"data\":[210,124,2],\"color\":[0,0,0,128],\"score\":0.0276986},\n{\"type\":32, \"data\":[171,143,3],\"color\":[197,196,192,128],\"score\":0.0276236},\n{\"type\":32, \"data\":[177,88,5],\"color\":[129,128,125,128],\"score\":0.0275722},\n{\"type\":32, \"data\":[352,214,16],\"color\":[60,109,173,128],\"score\":0.0275689},\n{\"type\":32, \"data\":[402,165,5],\"color\":[21,20,15,128],\"score\":0.0275596},\n{\"type\":32, \"data\":[310,195,9],\"color\":[55,71,93,128],\"score\":0.027553},\n{\"type\":32, \"data\":[267,149,4],\"color\":[184,183,176,128],\"score\":0.0275401},\n{\"type\":32, \"data\":[155,149,5],\"color\":[229,223,214,128],\"score\":0.0275174},\n{\"type\":32, \"data\":[100,180,4],\"color\":[86,85,75,128],\"score\":0.0275084},\n{\"type\":32, \"data\":[160,275,6],\"color\":[196,197,199,128],\"score\":0.0274925},\n{\"type\":32, \"data\":[511,176,5],\"color\":[63,78,52,128],\"score\":0.0274869},\n{\"type\":32, \"data\":[183,171,10],\"color\":[243,244,244,128],\"score\":0.0274824},\n{\"type\":32, \"data\":[81,198,11],\"color\":[61,108,169,128],\"score\":0.0274808},\n{\"type\":32, \"data\":[266,190,5],\"color\":[104,104,98,128],\"score\":0.0274485},\n{\"type\":32, \"data\":[432,241,14],\"color\":[51,101,164,128],\"score\":0.0274469},\n{\"type\":32, \"data\":[236,152,3],\"color\":[167,166,164,128],\"score\":0.0274382},\n{\"type\":32, \"data\":[2,186,4],\"color\":[61,89,87,128],\"score\":0.0274306},\n{\"type\":32, \"data\":[443,136,31],\"color\":[0,0,0,128],\"score\":0.0274283},\n{\"type\":32, \"data\":[397,178,5],\"color\":[70,88,72,128],\"score\":0.0274183},\n{\"type\":32, \"data\":[150,285,3],\"color\":[139,130,121,128],\"score\":0.0274027},\n{\"type\":32, \"data\":[239,115,3],\"color\":[159,176,202,128],\"score\":0.0273706},\n{\"type\":32, \"data\":[277,226,7],\"color\":[125,148,178,128],\"score\":0.0273441},\n{\"type\":32, \"data\":[169,131,5],\"color\":[167,159,150,128],\"score\":0.0273185},\n{\"type\":32, \"data\":[158,117,7],\"color\":[232,229,223,128],\"score\":0.0272998},\n{\"type\":32, \"data\":[203,73,20],\"color\":[0,0,0,128],\"score\":0.0272794},\n{\"type\":32, \"data\":[242,140,6],\"color\":[197,197,197,128],\"score\":0.0272732},\n{\"type\":32, \"data\":[219,222,3],\"color\":[79,127,194,128],\"score\":0.0272684},\n{\"type\":32, \"data\":[163,283,8],\"color\":[173,178,176,128],\"score\":0.0272531},\n{\"type\":32, \"data\":[325,183,6],\"color\":[25,33,40,128],\"score\":0.0272443},\n{\"type\":32, \"data\":[243,116,5],\"color\":[162,175,195,128],\"score\":0.0272209},\n{\"type\":32, \"data\":[325,133,5],\"color\":[156,179,209,128],\"score\":0.0272094},\n{\"type\":32, \"data\":[83,277,21],\"color\":[54,96,153,128],\"score\":0.0272068},\n{\"type\":32, \"data\":[162,248,4],\"color\":[200,199,194,128],\"score\":0.0271851},\n{\"type\":32, \"data\":[226,123,6],\"color\":[159,168,183,128],\"score\":0.0271243},\n{\"type\":32, \"data\":[350,148,5],\"color\":[133,161,198,128],\"score\":0.027102},\n{\"type\":32, \"data\":[269,134,5],\"color\":[193,193,190,128],\"score\":0.0270916},\n{\"type\":32, \"data\":[0,177,7],\"color\":[37,37,30,128],\"score\":0.0270896},\n{\"type\":32, \"data\":[147,184,6],\"color\":[199,204,202,128],\"score\":0.0270763},\n{\"type\":32, \"data\":[352,136,7],\"color\":[0,0,0,128],\"score\":0.0270375},\n{\"type\":32, \"data\":[261,198,8],\"color\":[126,145,169,128],\"score\":0.0270213},\n{\"type\":32, \"data\":[185,148,1],\"color\":[206,213,218,128],\"score\":0.0269824},\n{\"type\":32, \"data\":[168,276,5],\"color\":[150,154,153,128],\"score\":0.0269648},\n{\"type\":32, \"data\":[43,128,36],\"color\":[0,0,0,128],\"score\":0.0269617},\n{\"type\":32, \"data\":[220,126,5],\"color\":[157,167,180,128],\"score\":0.0269405},\n{\"type\":32, \"data\":[163,103,8],\"color\":[229,225,217,128],\"score\":0.0269254},\n{\"type\":32, \"data\":[7,254,15],\"color\":[49,94,151,128],\"score\":0.026924},\n{\"type\":32, \"data\":[357,221,25],\"color\":[63,109,169,128],\"score\":0.0269204},\n{\"type\":32, \"data\":[315,170,9],\"color\":[147,165,183,128],\"score\":0.0269015},\n{\"type\":32, \"data\":[304,154,7],\"color\":[108,124,141,128],\"score\":0.0268932},\n{\"type\":32, \"data\":[202,203,3],\"color\":[246,251,255,128],\"score\":0.026876},\n{\"type\":32, \"data\":[53,174,8],\"color\":[28,27,20,128],\"score\":0.0268687},\n{\"type\":32, \"data\":[481,192,10],\"color\":[55,107,172,128],\"score\":0.0268665},\n{\"type\":32, \"data\":[364,177,4],\"color\":[45,73,86,128],\"score\":0.0268545},\n{\"type\":32, \"data\":[290,312,23],\"color\":[53,95,154,128],\"score\":0.0268528},\n{\"type\":32, \"data\":[321,143,9],\"color\":[146,164,186,128],\"score\":0.0268435},\n{\"type\":32, \"data\":[379,135,3],\"color\":[0,0,0,128],\"score\":0.0268036},\n{\"type\":32, \"data\":[384,155,11],\"color\":[2,2,0,128],\"score\":0.0267502},\n{\"type\":32, \"data\":[186,190,3],\"color\":[233,251,255,128],\"score\":0.0267346},\n{\"type\":32, \"data\":[116,130,30],\"color\":[0,0,0,128],\"score\":0.0267245},\n{\"type\":32, \"data\":[507,164,6],\"color\":[38,39,25,128],\"score\":0.0267181},\n{\"type\":32, \"data\":[316,198,2],\"color\":[50,33,13,128],\"score\":0.0267066},\n{\"type\":32, \"data\":[1,312,16],\"color\":[40,81,138,128],\"score\":0.0267039},\n{\"type\":32, \"data\":[155,227,3],\"color\":[199,206,201,128],\"score\":0.0266886},\n{\"type\":32, \"data\":[127,287,15],\"color\":[56,97,156,128],\"score\":0.0266846},\n{\"type\":32, \"data\":[50,185,4],\"color\":[64,87,79,128],\"score\":0.0266712},\n{\"type\":32, \"data\":[152,14,32],\"color\":[0,0,0,128],\"score\":0.026646},\n{\"type\":32, \"data\":[135,198,7],\"color\":[71,115,170,128],\"score\":0.026641},\n{\"type\":32, \"data\":[247,148,3],\"color\":[142,142,142,128],\"score\":0.026628},\n{\"type\":32, \"data\":[277,208,9],\"color\":[92,112,142,128],\"score\":0.0266152},\n{\"type\":32, \"data\":[396,103,30],\"color\":[0,0,0,128],\"score\":0.0266141},\n{\"type\":32, \"data\":[340,108,23],\"color\":[0,0,0,128],\"score\":0.0265928},\n{\"type\":32, \"data\":[287,189,5],\"color\":[42,54,67,128],\"score\":0.0265625},\n{\"type\":32, \"data\":[169,150,4],\"color\":[187,182,170,128],\"score\":0.0265302},\n{\"type\":32, \"data\":[400,194,11],\"color\":[59,113,176,128],\"score\":0.0265221},\n{\"type\":32, \"data\":[178,276,5],\"color\":[77,91,105,128],\"score\":0.0265075},\n{\"type\":32, \"data\":[130,105,23],\"color\":[0,0,0,128],\"score\":0.026492},\n{\"type\":32, \"data\":[408,166,7],\"color\":[27,28,21,128],\"score\":0.0264829},\n{\"type\":32, \"data\":[196,284,16],\"color\":[61,101,160,128],\"score\":0.0264811},\n{\"type\":32, \"data\":[327,190,6],\"color\":[56,83,114,128],\"score\":0.0264688},\n{\"type\":32, \"data\":[165,84,7],\"color\":[231,224,216,128],\"score\":0.0264422},\n{\"type\":32, \"data\":[344,157,5],\"color\":[213,215,220,128],\"score\":0.0264229},\n{\"type\":32, \"data\":[119,194,7],\"color\":[75,105,136,128],\"score\":0.0264071},\n{\"type\":32, \"data\":[291,282,12],\"color\":[57,102,159,128],\"score\":0.0264057},\n{\"type\":32, \"data\":[183,151,3],\"color\":[137,146,155,128],\"score\":0.0263778},\n{\"type\":32, \"data\":[347,140,3],\"color\":[9,13,19,128],\"score\":0.0263676},\n{\"type\":32, \"data\":[133,163,8],\"color\":[19,19,17,128],\"score\":0.0263327},\n{\"type\":32, \"data\":[158,162,4],\"color\":[209,205,199,128],\"score\":0.0263145},\n{\"type\":32, \"data\":[254,159,8],\"color\":[180,180,179,128],\"score\":0.0262987},\n{\"type\":32, \"data\":[154,170,6],\"color\":[246,245,242,128],\"score\":0.0262871},\n{\"type\":32, \"data\":[282,178,7],\"color\":[160,176,196,128],\"score\":0.0262739},\n{\"type\":32, \"data\":[219,165,11],\"color\":[212,212,210,128],\"score\":0.0262666},\n{\"type\":32, \"data\":[510,184,4],\"color\":[63,99,119,128],\"score\":0.0262605},\n{\"type\":32, \"data\":[106,166,6],\"color\":[24,26,20,128],\"score\":0.0262502},\n{\"type\":32, \"data\":[46,170,7],\"color\":[15,16,16,128],\"score\":0.026247},\n{\"type\":32, \"data\":[144,237,11],\"color\":[65,110,172,128],\"score\":0.026228},\n{\"type\":32, \"data\":[394,153,15],\"color\":[5,5,4,128],\"score\":0.0261841},\n{\"type\":32, \"data\":[156,78,3],\"color\":[0,0,0,128],\"score\":0.0260071},\n{\"type\":32, \"data\":[327,312,19],\"color\":[50,94,153,128],\"score\":0.026006},\n{\"type\":32, \"data\":[175,240,6],\"color\":[108,107,103,128],\"score\":0.0259957},\n{\"type\":32, \"data\":[273,181,3],\"color\":[184,195,202,128],\"score\":0.0259902},\n{\"type\":32, \"data\":[127,254,1],\"color\":[45,0,0,128],\"score\":0.0259735},\n{\"type\":32, \"data\":[18,180,6],\"color\":[45,44,31,128],\"score\":0.0259655},\n{\"type\":32, \"data\":[195,188,3],\"color\":[187,193,195,128],\"score\":0.0259554},\n{\"type\":32, \"data\":[42,207,15],\"color\":[57,103,165,128],\"score\":0.025952},\n{\"type\":32, \"data\":[421,170,6],\"color\":[34,34,18,128],\"score\":0.0259351},\n{\"type\":32, \"data\":[272,115,8],\"color\":[194,200,206,128],\"score\":0.0259173},\n{\"type\":32, \"data\":[262,220,5],\"color\":[134,155,181,128],\"score\":0.0259111},\n{\"type\":32, \"data\":[248,153,2],\"color\":[205,205,205,128],\"score\":0.0259087},\n{\"type\":32, \"data\":[257,187,2],\"color\":[88,76,64,128],\"score\":0.0258965},\n{\"type\":32, \"data\":[251,89,21],\"color\":[0,0,0,128],\"score\":0.0258783},\n{\"type\":32, \"data\":[233,249,14],\"color\":[63,108,167,128],\"score\":0.0258754},\n{\"type\":32, \"data\":[163,137,6],\"color\":[184,171,156,128],\"score\":0.0258639},\n{\"type\":32, \"data\":[57,194,10],\"color\":[59,103,155,128],\"score\":0.025861},\n{\"type\":32, \"data\":[116,217,16],\"color\":[63,108,169,128],\"score\":0.0258589},\n{\"type\":32, \"data\":[152,81,7],\"color\":[0,0,0,128],\"score\":0.0258187},\n{\"type\":32, \"data\":[172,107,6],\"color\":[160,155,149,128],\"score\":0.0257967},\n{\"type\":32, \"data\":[157,217,5],\"color\":[185,183,179,128],\"score\":0.0257815},\n{\"type\":32, \"data\":[365,114,27],\"color\":[0,0,0,128],\"score\":0.0257521},\n{\"type\":32, \"data\":[147,71,1],\"color\":[191,179,170,128],\"score\":0.0257498},\n{\"type\":32, \"data\":[402,143,13],\"color\":[0,0,0,128],\"score\":0.0257274},\n{\"type\":32, \"data\":[363,147,6],\"color\":[186,197,215,128],\"score\":0.0256905},\n{\"type\":32, \"data\":[101,204,12],\"color\":[64,110,170,128],\"score\":0.0256889},\n{\"type\":32, \"data\":[211,181,3],\"color\":[254,254,248,128],\"score\":0.0256783},\n{\"type\":32, \"data\":[389,168,8],\"color\":[38,43,29,128],\"score\":0.0256637},\n{\"type\":32, \"data\":[151,303,14],\"color\":[58,99,156,128],\"score\":0.0256609},\n{\"type\":32, \"data\":[248,189,4],\"color\":[133,124,110,128],\"score\":0.0256262},\n{\"type\":32, \"data\":[154,77,4],\"color\":[0,0,0,128],\"score\":0.0255698},\n{\"type\":32, \"data\":[185,208,11],\"color\":[71,118,182,128],\"score\":0.0255485},\n{\"type\":32, \"data\":[133,263,2],\"color\":[165,130,157,128],\"score\":0.025525},\n{\"type\":32, \"data\":[233,121,4],\"color\":[162,169,183,128],\"score\":0.0255122},\n{\"type\":32, \"data\":[490,179,4],\"color\":[55,87,109,128],\"score\":0.0255011},\n{\"type\":32, \"data\":[385,200,3],\"color\":[81,93,110,128],\"score\":0.0254924},\n{\"type\":32, \"data\":[179,260,5],\"color\":[86,87,91,128],\"score\":0.0254824},\n{\"type\":32, \"data\":[292,175,8],\"color\":[130,157,184,128],\"score\":0.025465},\n{\"type\":32, \"data\":[178,135,4],\"color\":[0,0,0,128],\"score\":0.025446},\n{\"type\":32, \"data\":[243,166,6],\"color\":[210,210,209,128],\"score\":0.0254394},\n{\"type\":32, \"data\":[395,223,22],\"color\":[62,108,168,128],\"score\":0.0254379},\n{\"type\":32, \"data\":[190,147,4],\"color\":[153,158,167,128],\"score\":0.0253916},\n{\"type\":32, \"data\":[304,122,5],\"color\":[190,200,215,128],\"score\":0.0253449},\n{\"type\":32, \"data\":[215,231,13],\"color\":[70,116,177,128],\"score\":0.0253396},\n{\"type\":32, \"data\":[216,253,19],\"color\":[62,107,166,128],\"score\":0.0253374},\n{\"type\":32, \"data\":[308,242,20],\"color\":[61,108,170,128],\"score\":0.0253357},\n{\"type\":32, \"data\":[115,50,24],\"color\":[1,1,1,128],\"score\":0.0253335},\n{\"type\":32, \"data\":[154,188,6],\"color\":[159,164,169,128],\"score\":0.0253145},\n{\"type\":32, \"data\":[380,188,7],\"color\":[54,105,156,128],\"score\":0.0252969},\n{\"type\":32, \"data\":[345,187,5],\"color\":[34,46,61,128],\"score\":0.0252834},\n{\"type\":32, \"data\":[308,129,8],\"color\":[151,171,195,128],\"score\":0.025277},\n{\"type\":32, \"data\":[282,161,7],\"color\":[149,161,171,128],\"score\":0.0252698},\n{\"type\":32, \"data\":[193,154,7],\"color\":[232,232,232,128],\"score\":0.0252432},\n{\"type\":32, \"data\":[248,219,10],\"color\":[156,177,201,128],\"score\":0.0252381},\n{\"type\":32, \"data\":[177,225,2],\"color\":[118,113,114,128],\"score\":0.0252341},\n{\"type\":32, \"data\":[435,211,23],\"color\":[58,107,168,128],\"score\":0.0252312},\n{\"type\":32, \"data\":[292,162,4],\"color\":[92,109,129,128],\"score\":0.0252143},\n{\"type\":32, \"data\":[135,228,18],\"color\":[64,109,170,128],\"score\":0.0252097},\n{\"type\":32, \"data\":[258,228,5],\"color\":[165,186,214,128],\"score\":0.0252066},\n{\"type\":32, \"data\":[384,138,3],\"color\":[204,205,204,128],\"score\":0.0251408},\n{\"type\":32, \"data\":[167,77,7],\"color\":[226,223,216,128],\"score\":0.0251043},\n{\"type\":32, \"data\":[253,180,6],\"color\":[234,233,230,128],\"score\":0.0250872},\n{\"type\":32, \"data\":[136,272,3],\"color\":[40,35,56,128],\"score\":0.0250636},\n{\"type\":32, \"data\":[343,284,18],\"color\":[53,98,157,128],\"score\":0.0250622},\n{\"type\":32, \"data\":[340,198,2],\"color\":[48,73,109,128],\"score\":0.0250591},\n{\"type\":32, \"data\":[63,206,16],\"color\":[58,104,166,128],\"score\":0.0250562},\n{\"type\":32, \"data\":[168,250,4],\"color\":[146,145,142,128],\"score\":0.0250479},\n{\"type\":32, \"data\":[241,212,10],\"color\":[151,171,196,128],\"score\":0.0250435},\n{\"type\":32, \"data\":[127,147,14],\"color\":[0,0,0,128],\"score\":0.0250377},\n{\"type\":32, \"data\":[264,172,6],\"color\":[194,197,199,128],\"score\":0.025031},\n{\"type\":32, \"data\":[209,185,3],\"color\":[156,153,148,128],\"score\":0.0250198},\n{\"type\":32, \"data\":[354,175,6],\"color\":[13,15,11,128],\"score\":0.0250104},\n{\"type\":32, \"data\":[386,136,2],\"color\":[203,202,205,128],\"score\":0.0249527},\n{\"type\":32, \"data\":[281,143,3],\"color\":[175,177,173,128],\"score\":0.0249452},\n{\"type\":32, \"data\":[26,226,17],\"color\":[55,99,158,128],\"score\":0.0249437},\n{\"type\":32, \"data\":[63,312,18],\"color\":[50,90,144,128],\"score\":0.0249423},\n{\"type\":32, \"data\":[462,165,6],\"color\":[11,12,11,128],\"score\":0.0249378},\n{\"type\":32, \"data\":[291,212,7],\"color\":[88,108,137,128],\"score\":0.0249291},\n{\"type\":32, \"data\":[237,305,27],\"color\":[55,97,154,128],\"score\":0.0249274},\n{\"type\":32, \"data\":[262,263,18],\"color\":[61,105,164,128],\"score\":0.0249251},\n{\"type\":32, \"data\":[400,133,9],\"color\":[1,1,1,128],\"score\":0.0249227},\n{\"type\":32, \"data\":[272,120,3],\"color\":[152,165,177,128],\"score\":0.0249166},\n{\"type\":32, \"data\":[192,206,5],\"color\":[74,123,193,128],\"score\":0.0248982},\n{\"type\":32, \"data\":[295,181,2],\"color\":[146,169,193,128],\"score\":0.0248901},\n{\"type\":32, \"data\":[232,133,8],\"color\":[230,230,227,128],\"score\":0.0248765},\n{\"type\":32, \"data\":[277,127,7],\"color\":[155,162,169,128],\"score\":0.0248598},\n{\"type\":32, \"data\":[370,170,7],\"color\":[30,35,25,128],\"score\":0.0248442},\n{\"type\":32, \"data\":[141,270,3],\"color\":[233,157,103,128],\"score\":0.0247762},\n{\"type\":32, \"data\":[428,176,3],\"color\":[69,85,74,128],\"score\":0.0247664},\n{\"type\":32, \"data\":[223,136,6],\"color\":[232,231,231,128],\"score\":0.0247625},\n{\"type\":32, \"data\":[151,274,6],\"color\":[175,177,173,128],\"score\":0.0247343},\n{\"type\":32, \"data\":[317,260,14],\"color\":[60,104,164,128],\"score\":0.0247327},\n{\"type\":32, \"data\":[509,169,3],\"color\":[49,53,36,128],\"score\":0.0247292},\n{\"type\":32, \"data\":[332,186,4],\"color\":[40,58,78,128],\"score\":0.0247194},\n{\"type\":32, \"data\":[366,154,2],\"color\":[80,89,82,128],\"score\":0.0246906},\n{\"type\":32, \"data\":[158,59,5],\"color\":[225,223,218,128],\"score\":0.0246622},\n{\"type\":32, \"data\":[340,117,16],\"color\":[0,0,0,128],\"score\":0.024651},\n{\"type\":32, \"data\":[248,127,10],\"color\":[221,219,215,128],\"score\":0.0246431},\n{\"type\":32, \"data\":[22,190,5],\"color\":[48,89,130,128],\"score\":0.0246363},\n{\"type\":32, \"data\":[177,143,4],\"color\":[0,0,0,128],\"score\":0.0245943},\n{\"type\":32, \"data\":[188,122,11],\"color\":[0,0,0,128],\"score\":0.0245829},\n{\"type\":32, \"data\":[51,190,6],\"color\":[60,97,123,128],\"score\":0.0245745},\n{\"type\":32, \"data\":[363,156,2],\"color\":[81,93,103,128],\"score\":0.0245415},\n{\"type\":32, \"data\":[144,87,13],\"color\":[0,0,0,128],\"score\":0.0244944},\n{\"type\":32, \"data\":[337,151,6],\"color\":[128,143,161,128],\"score\":0.0244742},\n{\"type\":32, \"data\":[356,167,2],\"color\":[13,19,21,128],\"score\":0.0244679},\n{\"type\":32, \"data\":[274,189,3],\"color\":[75,82,84,128],\"score\":0.0244599},\n{\"type\":32, \"data\":[153,205,6],\"color\":[180,183,183,128],\"score\":0.0244539},\n{\"type\":32, \"data\":[255,162,4],\"color\":[164,163,163,128],\"score\":0.0244469},\n{\"type\":32, \"data\":[173,312,24],\"color\":[59,99,155,128],\"score\":0.0244404},\n{\"type\":32, \"data\":[3,201,9],\"color\":[53,99,160,128],\"score\":0.0244385},\n{\"type\":32, \"data\":[166,52,4],\"color\":[119,123,121,128],\"score\":0.0243915},\n{\"type\":32, \"data\":[263,287,12],\"color\":[54,100,159,128],\"score\":0.0243897},\n{\"type\":32, \"data\":[392,175,4],\"color\":[57,70,53,128],\"score\":0.0243842},\n{\"type\":32, \"data\":[332,197,1],\"color\":[39,59,60,128],\"score\":0.0243824},\n{\"type\":32, \"data\":[162,40,6],\"color\":[0,0,0,128],\"score\":0.0243746},\n{\"type\":32, \"data\":[229,88,26],\"color\":[0,0,0,128],\"score\":0.0243646},\n{\"type\":32, \"data\":[294,133,9],\"color\":[119,138,162,128],\"score\":0.0243536},\n{\"type\":32, \"data\":[160,312,22],\"color\":[58,99,155,128],\"score\":0.0243529},\n{\"type\":32, \"data\":[178,74,5],\"color\":[137,144,146,128],\"score\":0.0243124},\n{\"type\":32, \"data\":[305,158,3],\"color\":[95,113,130,128],\"score\":0.024309},\n{\"type\":32, \"data\":[117,34,30],\"color\":[0,0,0,128],\"score\":0.0242725},\n{\"type\":32, \"data\":[74,180,6],\"color\":[58,75,78,128],\"score\":0.0242469},\n{\"type\":32, \"data\":[151,264,3],\"color\":[89,80,60,128],\"score\":0.0242119},\n{\"type\":32, \"data\":[197,165,18],\"color\":[230,230,230,128],\"score\":0.024197},\n{\"type\":32, \"data\":[142,281,2],\"color\":[112,132,166,128],\"score\":0.0241919},\n{\"type\":32, \"data\":[484,297,13],\"color\":[44,89,151,128],\"score\":0.024191},\n{\"type\":32, \"data\":[29,307,14],\"color\":[47,87,143,128],\"score\":0.0241902},\n{\"type\":32, \"data\":[411,180,5],\"color\":[69,97,99,128],\"score\":0.0241787},\n{\"type\":32, \"data\":[127,232,20],\"color\":[62,105,165,128],\"score\":0.0241747},\n{\"type\":32, \"data\":[148,21,26],\"color\":[0,0,0,128],\"score\":0.0241707},\n{\"type\":32, \"data\":[69,129,31],\"color\":[0,0,0,128],\"score\":0.0241688},\n{\"type\":32, \"data\":[213,129,3],\"color\":[147,159,174,128],\"score\":0.0241634},\n{\"type\":32, \"data\":[188,39,19],\"color\":[0,0,0,128],\"score\":0.0241601},\n{\"type\":32, \"data\":[136,265,2],\"color\":[186,107,95,128],\"score\":0.0241331},\n{\"type\":32, \"data\":[419,183,6],\"color\":[56,98,146,128],\"score\":0.0241301},\n{\"type\":32, \"data\":[178,191,2],\"color\":[98,143,214,128],\"score\":0.024122},\n{\"type\":32, \"data\":[131,215,18],\"color\":[67,113,174,128],\"score\":0.024118},\n{\"type\":32, \"data\":[190,176,6],\"color\":[252,252,254,128],\"score\":0.0241053},\n{\"type\":32, \"data\":[418,202,15],\"color\":[62,109,168,128],\"score\":0.0241035},\n{\"type\":32, \"data\":[268,198,7],\"color\":[114,131,158,128],\"score\":0.0240989},\n{\"type\":32, \"data\":[155,162,7],\"color\":[217,215,209,128],\"score\":0.0240917},\n{\"type\":32, \"data\":[422,312,30],\"color\":[48,93,151,128],\"score\":0.0240906},\n{\"type\":32, \"data\":[324,208,8],\"color\":[65,93,132,128],\"score\":0.0240822},\n{\"type\":32, \"data\":[391,150,10],\"color\":[0,0,0,128],\"score\":0.0240741},\n{\"type\":32, \"data\":[382,280,21],\"color\":[52,98,157,128],\"score\":0.0240732},\n{\"type\":32, \"data\":[220,95,22],\"color\":[0,0,0,128],\"score\":0.0240652},\n{\"type\":32, \"data\":[208,82,26],\"color\":[0,0,0,128],\"score\":0.0240557},\n{\"type\":32, \"data\":[335,134,1],\"color\":[178,200,219,128],\"score\":0.0240422},\n{\"type\":32, \"data\":[139,266,1],\"color\":[255,139,68,128],\"score\":0.0240185},\n{\"type\":32, \"data\":[326,92,32],\"color\":[0,0,0,128],\"score\":0.0240101},\n{\"type\":32, \"data\":[319,131,6],\"color\":[156,176,201,128],\"score\":0.0240037},\n{\"type\":32, \"data\":[468,164,8],\"color\":[10,10,8,128],\"score\":0.0240021},\n{\"type\":32, \"data\":[315,181,2],\"color\":[4,0,0,128],\"score\":0.0239827},\n{\"type\":32, \"data\":[336,229,18],\"color\":[62,110,172,128],\"score\":0.0239805},\n{\"type\":32, \"data\":[165,234,5],\"color\":[151,148,147,128],\"score\":0.0239679},\n{\"type\":32, \"data\":[248,137,5],\"color\":[194,194,193,128],\"score\":0.0239605},\n{\"type\":32, \"data\":[91,165,7],\"color\":[23,23,22,128],\"score\":0.0239507},\n{\"type\":32, \"data\":[114,89,10],\"color\":[0,0,1,128],\"score\":0.0239501},\n{\"type\":32, \"data\":[432,177,4],\"color\":[73,91,81,128],\"score\":0.0239386},\n{\"type\":32, \"data\":[161,127,5],\"color\":[223,211,196,128],\"score\":0.0239267},\n{\"type\":32, \"data\":[37,207,20],\"color\":[56,102,161,128],\"score\":0.0239247},\n{\"type\":32, \"data\":[149,282,2],\"color\":[48,56,58,128],\"score\":0.0238945},\n{\"type\":32, \"data\":[172,182,4],\"color\":[185,191,195,128],\"score\":0.0238743},\n{\"type\":32, \"data\":[468,156,8],\"color\":[0,0,0,128],\"score\":0.0238719},\n{\"type\":32, \"data\":[163,243,6],\"color\":[176,175,171,128],\"score\":0.0238622},\n{\"type\":32, \"data\":[287,139,7],\"color\":[116,128,141,128],\"score\":0.0238526},\n{\"type\":32, \"data\":[125,238,14],\"color\":[59,103,162,128],\"score\":0.0238497},\n{\"type\":32, \"data\":[212,193,6],\"color\":[187,201,213,128],\"score\":0.0238333},\n{\"type\":32, \"data\":[175,263,4],\"color\":[118,118,116,128],\"score\":0.0238281},\n{\"type\":32, \"data\":[360,156,1],\"color\":[29,44,50,128],\"score\":0.0237925},\n{\"type\":32, \"data\":[380,130,7],\"color\":[0,0,0,128],\"score\":0.0237424},\n{\"type\":32, \"data\":[227,278,14],\"color\":[59,101,159,128],\"score\":0.0237412},\n{\"type\":32, \"data\":[388,136,2],\"color\":[247,247,248,128],\"score\":0.0236156},\n{\"type\":32, \"data\":[143,123,5],\"color\":[0,0,0,128],\"score\":0.0236134},\n{\"type\":32, \"data\":[267,159,5],\"color\":[128,131,134,128],\"score\":0.0235966},\n{\"type\":32, \"data\":[319,155,4],\"color\":[103,117,126,128],\"score\":0.023578},\n{\"type\":32, \"data\":[0,294,10],\"color\":[43,86,141,128],\"score\":0.0235776},\n{\"type\":32, \"data\":[252,157,5],\"color\":[196,196,196,128],\"score\":0.0235703},\n{\"type\":32, \"data\":[246,236,5],\"color\":[65,117,182,128],\"score\":0.0235686},\n{\"type\":32, \"data\":[471,171,3],\"color\":[59,64,54,128],\"score\":0.0235648},\n{\"type\":32, \"data\":[344,247,13],\"color\":[62,107,166,128],\"score\":0.0235634},\n{\"type\":32, \"data\":[242,88,23],\"color\":[0,0,0,128],\"score\":0.0235404},\n{\"type\":32, \"data\":[136,269,2],\"color\":[30,15,17,128],\"score\":0.0235164},\n{\"type\":32, \"data\":[136,219,15],\"color\":[67,112,173,128],\"score\":0.0235121},\n{\"type\":32, \"data\":[160,279,4],\"color\":[206,209,210,128],\"score\":0.0234997},\n{\"type\":32, \"data\":[197,312,25],\"color\":[59,98,153,128],\"score\":0.0234984},\n{\"type\":32, \"data\":[244,148,5],\"color\":[162,162,163,128],\"score\":0.0234874},\n{\"type\":32, \"data\":[124,252,3],\"color\":[69,76,105,128],\"score\":0.0234721},\n{\"type\":32, \"data\":[172,85,5],\"color\":[179,172,164,128],\"score\":0.0234588},\n{\"type\":32, \"data\":[330,205,5],\"color\":[59,88,124,128],\"score\":0.0234557},\n{\"type\":32, \"data\":[185,213,9],\"color\":[68,113,173,128],\"score\":0.0234519},\n{\"type\":32, \"data\":[26,259,15],\"color\":[52,95,152,128],\"score\":0.0234513},\n{\"type\":32, \"data\":[159,284,6],\"color\":[183,185,182,128],\"score\":0.023447},\n{\"type\":32, \"data\":[439,168,6],\"color\":[26,22,15,128],\"score\":0.0234312},\n{\"type\":32, \"data\":[420,140,23],\"color\":[0,0,0,128],\"score\":0.0234301},\n{\"type\":32, \"data\":[182,82,1],\"color\":[66,66,66,128],\"score\":0.0234195},\n{\"type\":32, \"data\":[221,201,8],\"color\":[172,192,213,128],\"score\":0.0234122},\n{\"type\":32, \"data\":[206,205,3],\"color\":[238,246,255,128],\"score\":0.0233984},\n{\"type\":32, \"data\":[470,229,13],\"color\":[52,102,163,128],\"score\":0.0233971},\n{\"type\":32, \"data\":[217,140,8],\"color\":[229,229,229,128],\"score\":0.0233892},\n{\"type\":32, \"data\":[147,167,5],\"color\":[254,255,255,128],\"score\":0.0233626},\n{\"type\":32, \"data\":[389,257,15],\"color\":[54,101,160,128],\"score\":0.0233617},\n{\"type\":32, \"data\":[84,172,6],\"color\":[42,38,35,128],\"score\":0.0233554},\n{\"type\":32, \"data\":[146,155,5],\"color\":[247,247,243,128],\"score\":0.0233361},\n{\"type\":32, \"data\":[447,255,13],\"color\":[50,99,158,128],\"score\":0.0233351},\n{\"type\":32, \"data\":[149,200,4],\"color\":[196,210,218,128],\"score\":0.0233216},\n{\"type\":32, \"data\":[170,261,4],\"color\":[146,148,152,128],\"score\":0.0233109},\n{\"type\":32, \"data\":[220,186,1],\"color\":[103,100,98,128],\"score\":0.0233013},\n{\"type\":32, \"data\":[164,269,3],\"color\":[193,187,188,128],\"score\":0.0232912},\n{\"type\":32, \"data\":[274,170,7],\"color\":[192,199,206,128],\"score\":0.0232861},\n{\"type\":32, \"data\":[274,144,2],\"color\":[118,120,124,128],\"score\":0.0232813},\n{\"type\":32, \"data\":[121,224,15],\"color\":[62,106,167,128],\"score\":0.0232787},\n{\"type\":32, \"data\":[181,154,1],\"color\":[77,81,102,128],\"score\":0.023267},\n{\"type\":32, \"data\":[286,131,2],\"color\":[95,110,132,128],\"score\":0.0232627},\n{\"type\":32, \"data\":[353,167,1],\"color\":[77,94,107,128],\"score\":0.0232584},\n{\"type\":32, \"data\":[203,130,1],\"color\":[19,26,29,128],\"score\":0.0232519},\n{\"type\":32, \"data\":[13,184,3],\"color\":[65,69,46,128],\"score\":0.0232493},\n{\"type\":32, \"data\":[199,159,14],\"color\":[223,223,222,128],\"score\":0.0232342},\n{\"type\":32, \"data\":[186,133,8],\"color\":[0,0,0,128],\"score\":0.023225},\n{\"type\":32, \"data\":[137,67,2],\"color\":[149,121,72,128],\"score\":0.0232188},\n{\"type\":32, \"data\":[59,199,10],\"color\":[58,105,165,128],\"score\":0.0232173},\n{\"type\":32, \"data\":[133,260,2],\"color\":[88,49,40,128],\"score\":0.023213},\n{\"type\":32, \"data\":[179,83,4],\"color\":[117,117,117,128],\"score\":0.0231912},\n{\"type\":32, \"data\":[322,163,5],\"color\":[170,185,201,128],\"score\":0.0231852},\n{\"type\":32, \"data\":[212,209,5],\"color\":[225,237,248,128],\"score\":0.0231749},\n{\"type\":32, \"data\":[351,164,3],\"color\":[76,88,107,128],\"score\":0.0231454},\n{\"type\":32, \"data\":[217,179,5],\"color\":[236,236,235,128],\"score\":0.0231392},\n{\"type\":32, \"data\":[147,180,6],\"color\":[199,203,198,128],\"score\":0.0231248},\n{\"type\":32, \"data\":[157,206,4],\"color\":[153,150,144,128],\"score\":0.0231124},\n{\"type\":32, \"data\":[471,185,6],\"color\":[52,99,151,128],\"score\":0.0231102},\n{\"type\":32, \"data\":[207,142,6],\"color\":[230,230,226,128],\"score\":0.023095},\n{\"type\":32, \"data\":[437,178,3],\"color\":[81,97,73,128],\"score\":0.0230847},\n{\"type\":32, \"data\":[358,159,3],\"color\":[95,114,132,128],\"score\":0.0230485},\n{\"type\":32, \"data\":[385,132,3],\"color\":[0,0,0,128],\"score\":0.0230261},\n{\"type\":32, \"data\":[377,174,4],\"color\":[54,67,56,128],\"score\":0.0230188},\n{\"type\":32, \"data\":[272,84,23],\"color\":[0,0,0,128],\"score\":0.0230042},\n{\"type\":32, \"data\":[467,289,13],\"color\":[46,92,152,128],\"score\":0.0230037},\n{\"type\":32, \"data\":[456,183,4],\"color\":[47,102,169,128],\"score\":0.0229975},\n{\"type\":32, \"data\":[240,158,3],\"color\":[209,209,208,128],\"score\":0.022995},\n{\"type\":32, \"data\":[376,160,9],\"color\":[9,10,8,128],\"score\":0.0229883},\n{\"type\":32, \"data\":[232,157,3],\"color\":[168,167,165,128],\"score\":0.0229799},\n{\"type\":32, \"data\":[37,291,14],\"color\":[50,92,146,128],\"score\":0.0229791},\n{\"type\":32, \"data\":[146,63,1],\"color\":[220,221,221,128],\"score\":0.0229704},\n{\"type\":32, \"data\":[148,60,3],\"color\":[126,124,124,128],\"score\":0.0229521},\n{\"type\":32, \"data\":[283,93,15],\"color\":[0,0,0,128],\"score\":0.022943},\n{\"type\":32, \"data\":[243,213,5],\"color\":[169,189,211,128],\"score\":0.022937},\n{\"type\":32, \"data\":[172,298,9],\"color\":[61,101,157,128],\"score\":0.0229363},\n{\"type\":32, \"data\":[359,190,6],\"color\":[44,63,88,128],\"score\":0.0229324},\n{\"type\":32, \"data\":[216,212,5],\"color\":[222,232,247,128],\"score\":0.0229223},\n{\"type\":32, \"data\":[241,312,12],\"color\":[54,94,153,128],\"score\":0.0229219},\n{\"type\":32, \"data\":[487,281,13],\"color\":[47,93,153,128],\"score\":0.0229214},\n{\"type\":32, \"data\":[136,259,3],\"color\":[53,34,20,128],\"score\":0.0229024},\n{\"type\":32, \"data\":[170,189,5],\"color\":[114,132,159,128],\"score\":0.0228891},\n{\"type\":32, \"data\":[59,290,13],\"color\":[52,94,149,128],\"score\":0.0228885},\n{\"type\":32, \"data\":[297,148,5],\"color\":[147,157,169,128],\"score\":0.0228806},\n{\"type\":32, \"data\":[253,228,3],\"color\":[187,205,231,128],\"score\":0.0228708},\n{\"type\":32, \"data\":[441,229,8],\"color\":[52,103,167,128],\"score\":0.0228702},\n{\"type\":32, \"data\":[374,145,2],\"color\":[222,223,232,128],\"score\":0.0228536},\n{\"type\":32, \"data\":[331,179,3],\"color\":[8,9,7,128],\"score\":0.0228396},\n{\"type\":32, \"data\":[477,200,15],\"color\":[55,106,169,128],\"score\":0.0228373},\n{\"type\":32, \"data\":[280,189,4],\"color\":[55,66,74,128],\"score\":0.0228233},\n{\"type\":32, \"data\":[228,219,3],\"color\":[223,235,252,128],\"score\":0.0228146},\n{\"type\":32, \"data\":[313,165,4],\"color\":[169,186,210,128],\"score\":0.0228073},\n{\"type\":32, \"data\":[93,139,22],\"color\":[0,0,0,128],\"score\":0.0228056},\n{\"type\":32, \"data\":[151,247,7],\"color\":[66,111,172,128],\"score\":0.0227976},\n{\"type\":32, \"data\":[176,143,2],\"color\":[0,0,0,128],\"score\":0.0227908},\n{\"type\":32, \"data\":[458,150,14],\"color\":[0,0,0,128],\"score\":0.0227902},\n{\"type\":32, \"data\":[256,182,4],\"color\":[209,210,211,128],\"score\":0.0227752},\n{\"type\":32, \"data\":[238,142,5],\"color\":[205,205,204,128],\"score\":0.0227711},\n{\"type\":32, \"data\":[293,219,7],\"color\":[80,107,147,128],\"score\":0.0227663},\n{\"type\":32, \"data\":[260,84,24],\"color\":[0,0,0,128],\"score\":0.0227641},\n{\"type\":32, \"data\":[355,312,16],\"color\":[48,94,151,128],\"score\":0.0227631},\n{\"type\":32, \"data\":[204,168,8],\"color\":[217,216,213,128],\"score\":0.0227547},\n{\"type\":32, \"data\":[358,185,7],\"color\":[29,42,61,128],\"score\":0.0227508},\n{\"type\":32, \"data\":[328,124,3],\"color\":[0,0,0,128],\"score\":0.0227494},\n{\"type\":32, \"data\":[170,279,5],\"color\":[141,145,143,128],\"score\":0.0227415},\n{\"type\":32, \"data\":[225,263,14],\"color\":[60,106,164,128],\"score\":0.0227411},\n{\"type\":32, \"data\":[138,288,7],\"color\":[58,101,160,128],\"score\":0.0227395},\n{\"type\":32, \"data\":[225,148,8],\"color\":[218,219,217,128],\"score\":0.0227366},\n{\"type\":32, \"data\":[153,131,5],\"color\":[244,242,238,128],\"score\":0.0227225},\n{\"type\":32, \"data\":[38,226,13],\"color\":[55,100,158,128],\"score\":0.0227222},\n{\"type\":32, \"data\":[122,163,4],\"color\":[24,25,19,128],\"score\":0.0227148},\n{\"type\":32, \"data\":[138,100,16],\"color\":[0,0,0,128],\"score\":0.022692},\n{\"type\":32, \"data\":[147,141,3],\"color\":[254,255,255,128],\"score\":0.0226653},\n{\"type\":32, \"data\":[292,243,13],\"color\":[62,110,171,128],\"score\":0.0226643},\n{\"type\":32, \"data\":[118,120,31],\"color\":[0,0,0,128],\"score\":0.0226413},\n{\"type\":32, \"data\":[299,254,8],\"color\":[62,105,165,128],\"score\":0.0226406},\n{\"type\":32, \"data\":[405,204,14],\"color\":[62,111,172,128],\"score\":0.0226401},\n{\"type\":32, \"data\":[190,193,5],\"color\":[221,232,245,128],\"score\":0.0226301},\n{\"type\":32, \"data\":[301,166,3],\"color\":[165,178,196,128],\"score\":0.0226191},\n{\"type\":32, \"data\":[177,68,6],\"color\":[126,133,136,128],\"score\":0.0226025},\n{\"type\":32, \"data\":[370,182,3],\"color\":[49,98,140,128],\"score\":0.0225964},\n{\"type\":32, \"data\":[329,131,2],\"color\":[156,174,197,128],\"score\":0.022594},\n{\"type\":32, \"data\":[278,213,7],\"color\":[95,114,141,128],\"score\":0.0225889},\n{\"type\":32, \"data\":[317,182,3],\"color\":[19,18,19,128],\"score\":0.0225762},\n{\"type\":32, \"data\":[489,239,14],\"color\":[49,99,160,128],\"score\":0.0225756},\n{\"type\":32, \"data\":[453,173,3],\"color\":[49,56,42,128],\"score\":0.0225708},\n{\"type\":32, \"data\":[434,167,5],\"color\":[27,28,24,128],\"score\":0.0225632},\n{\"type\":32, \"data\":[511,249,9],\"color\":[44,93,156,128],\"score\":0.0225627},\n{\"type\":32, \"data\":[150,90,7],\"color\":[0,0,0,128],\"score\":0.022547},\n{\"type\":32, \"data\":[163,62,6],\"color\":[200,198,194,128],\"score\":0.0225297},\n{\"type\":32, \"data\":[315,192,4],\"color\":[59,90,131,128],\"score\":0.0225149},\n{\"type\":32, \"data\":[69,176,2],\"color\":[31,33,14,128],\"score\":0.0225119},\n{\"type\":32, \"data\":[47,312,11],\"color\":[48,89,144,128],\"score\":0.0225115},\n{\"type\":32, \"data\":[184,196,3],\"color\":[97,125,149,128],\"score\":0.0224924},\n{\"type\":32, \"data\":[68,245,15],\"color\":[57,100,158,128],\"score\":0.022492},\n{\"type\":32, \"data\":[302,194,4],\"color\":[60,84,111,128],\"score\":0.022488},\n{\"type\":32, \"data\":[128,170,4],\"color\":[52,52,46,128],\"score\":0.0224808},\n{\"type\":32, \"data\":[257,119,4],\"color\":[214,215,210,128],\"score\":0.022477},\n{\"type\":32, \"data\":[302,187,6],\"color\":[37,52,67,128],\"score\":0.0224708},\n{\"type\":32, \"data\":[249,195,6],\"color\":[155,167,176,128],\"score\":0.022456},\n{\"type\":32, \"data\":[416,279,13],\"color\":[50,96,155,128],\"score\":0.0224555},\n{\"type\":32, \"data\":[127,76,1],\"color\":[255,127,100,128],\"score\":0.0224313},\n{\"type\":32, \"data\":[479,212,11],\"color\":[54,104,164,128],\"score\":0.0224309},\n{\"type\":32, \"data\":[336,178,3],\"color\":[4,0,0,128],\"score\":0.0224021},\n{\"type\":32, \"data\":[278,223,7],\"color\":[111,133,164,128],\"score\":0.0223976},\n{\"type\":32, \"data\":[155,194,5],\"color\":[162,167,173,128],\"score\":0.02239},\n{\"type\":32, \"data\":[357,196,2],\"color\":[112,129,144,128],\"score\":0.0223828},\n{\"type\":32, \"data\":[195,186,4],\"color\":[184,185,183,128],\"score\":0.0223728},\n{\"type\":32, \"data\":[295,116,5],\"color\":[172,180,200,128],\"score\":0.0223309},\n{\"type\":32, \"data\":[139,62,5],\"color\":[46,34,19,128],\"score\":0.0222575},\n{\"type\":32, \"data\":[283,152,3],\"color\":[96,105,115,128],\"score\":0.0222459},\n{\"type\":32, \"data\":[282,192,4],\"color\":[66,90,119,128],\"score\":0.0222393},\n{\"type\":32, \"data\":[373,118,21],\"color\":[0,0,0,128],\"score\":0.0222},\n{\"type\":32, \"data\":[262,192,6],\"color\":[109,115,118,128],\"score\":0.0221903},\n{\"type\":32, \"data\":[154,213,4],\"color\":[184,183,189,128],\"score\":0.0221866},\n{\"type\":32, \"data\":[121,121,28],\"color\":[0,0,0,128],\"score\":0.0221722},\n{\"type\":32, \"data\":[341,152,5],\"color\":[142,160,183,128],\"score\":0.0221662},\n{\"type\":32, \"data\":[246,157,6],\"color\":[201,201,201,128],\"score\":0.022161},\n{\"type\":32, \"data\":[261,189,4],\"color\":[98,98,94,128],\"score\":0.0221493},\n{\"type\":32, \"data\":[160,85,3],\"color\":[244,244,238,128],\"score\":0.0221077},\n{\"type\":32, \"data\":[206,195,6],\"color\":[177,195,211,128],\"score\":0.0221011},\n{\"type\":32, \"data\":[306,216,5],\"color\":[67,97,137,128],\"score\":0.0220987},\n{\"type\":32, \"data\":[171,192,7],\"color\":[109,130,154,128],\"score\":0.0220892},\n{\"type\":32, \"data\":[314,173,5],\"color\":[125,144,161,128],\"score\":0.0220792},\n{\"type\":32, \"data\":[149,135,3],\"color\":[242,248,244,128],\"score\":0.0220714},\n{\"type\":32, \"data\":[241,172,5],\"color\":[217,217,216,128],\"score\":0.0220667},\n{\"type\":32, \"data\":[11,170,6],\"color\":[18,18,17,128],\"score\":0.0220641},\n{\"type\":32, \"data\":[153,286,4],\"color\":[163,157,154,128],\"score\":0.022055},\n{\"type\":32, \"data\":[280,166,3],\"color\":[187,196,210,128],\"score\":0.0220448},\n{\"type\":32, \"data\":[205,64,23],\"color\":[0,0,0,128],\"score\":0.0220338},\n{\"type\":32, \"data\":[168,242,4],\"color\":[141,140,136,128],\"score\":0.0220226},\n{\"type\":32, \"data\":[138,63,1],\"color\":[233,198,156,128],\"score\":0.0219721},\n{\"type\":32, \"data\":[67,262,9],\"color\":[55,96,154,128],\"score\":0.0219718},\n{\"type\":32, \"data\":[221,122,2],\"color\":[188,191,213,128],\"score\":0.0219684},\n{\"type\":32, \"data\":[141,203,5],\"color\":[73,120,187,128],\"score\":0.0219565},\n{\"type\":32, \"data\":[97,187,5],\"color\":[67,102,147,128],\"score\":0.0219526},\n{\"type\":32, \"data\":[160,242,3],\"color\":[188,191,187,128],\"score\":0.0219477},\n{\"type\":32, \"data\":[250,114,4],\"color\":[145,161,184,128],\"score\":0.0219178},\n{\"type\":32, \"data\":[288,146,4],\"color\":[107,114,129,128],\"score\":0.0219098},\n{\"type\":32, \"data\":[284,154,1],\"color\":[159,170,176,128],\"score\":0.0219055},\n{\"type\":32, \"data\":[291,142,5],\"color\":[106,123,142,128],\"score\":0.0219006},\n{\"type\":32, \"data\":[178,199,6],\"color\":[77,121,177,128],\"score\":0.0218943},\n{\"type\":32, \"data\":[58,164,4],\"color\":[7,8,8,128],\"score\":0.0218929}\n]}";
ShapeDatasets.girl_with_a_pearl_earring = "{\"shapes\":\n[{\"type\":32, \"data\":[213,175,80],\"color\":[212,209,216,128],\"score\":0.192479},\n{\"type\":32, \"data\":[224,440,71],\"color\":[215,172,100,128],\"score\":0.184097},\n{\"type\":32, \"data\":[220,299,66],\"color\":[206,168,132,128],\"score\":0.176717},\n{\"type\":32, \"data\":[370,357,40],\"color\":[235,228,193,128],\"score\":0.171146},\n{\"type\":32, \"data\":[270,99,39],\"color\":[230,235,209,128],\"score\":0.165828},\n{\"type\":32, \"data\":[354,286,34],\"color\":[239,210,157,128],\"score\":0.162252},\n{\"type\":32, \"data\":[273,203,55],\"color\":[7,2,13,128],\"score\":0.157842},\n{\"type\":32, \"data\":[37,371,147],\"color\":[0,0,0,128],\"score\":0.146366},\n{\"type\":32, \"data\":[177,237,43],\"color\":[255,197,158,128],\"score\":0.142705},\n{\"type\":32, \"data\":[181,155,37],\"color\":[233,232,240,128],\"score\":0.140542},\n{\"type\":32, \"data\":[229,359,35],\"color\":[249,212,138,128],\"score\":0.138361},\n{\"type\":32, \"data\":[165,496,26],\"color\":[255,208,123,128],\"score\":0.136401},\n{\"type\":32, \"data\":[43,106,117],\"color\":[0,0,0,128],\"score\":0.128425},\n{\"type\":32, \"data\":[228,122,39],\"color\":[111,167,226,128],\"score\":0.126942},\n{\"type\":32, \"data\":[180,329,26],\"color\":[0,0,0,128],\"score\":0.125079},\n{\"type\":32, \"data\":[346,232,24],\"color\":[197,167,113,128],\"score\":0.12381},\n{\"type\":32, \"data\":[436,68,121],\"color\":[0,0,0,128],\"score\":0.118899},\n{\"type\":32, \"data\":[193,22,70],\"color\":[0,0,0,128],\"score\":0.115994},\n{\"type\":32, \"data\":[417,454,70],\"color\":[0,0,0,128],\"score\":0.113557},\n{\"type\":32, \"data\":[429,247,68],\"color\":[0,0,2,128],\"score\":0.111256},\n{\"type\":32, \"data\":[306,145,46],\"color\":[95,98,97,128],\"score\":0.109809},\n{\"type\":32, \"data\":[234,323,20],\"color\":[254,245,224,128],\"score\":0.108683},\n{\"type\":32, \"data\":[289,15,52],\"color\":[0,0,0,128],\"score\":0.107313},\n{\"type\":32, \"data\":[354,396,17],\"color\":[187,224,237,128],\"score\":0.106128},\n{\"type\":32, \"data\":[98,242,42],\"color\":[0,0,5,128],\"score\":0.105144},\n{\"type\":32, \"data\":[279,242,51],\"color\":[35,22,26,128],\"score\":0.104139},\n{\"type\":32, \"data\":[308,362,32],\"color\":[31,7,0,128],\"score\":0.10341},\n{\"type\":32, \"data\":[177,280,26],\"color\":[212,155,134,128],\"score\":0.102543},\n{\"type\":32, \"data\":[353,319,20],\"color\":[245,205,139,128],\"score\":0.101754},\n{\"type\":32, \"data\":[297,301,12],\"color\":[223,218,201,128],\"score\":0.10097},\n{\"type\":32, \"data\":[435,330,38],\"color\":[0,0,0,128],\"score\":0.100225},\n{\"type\":32, \"data\":[288,91,26],\"color\":[237,199,133,128],\"score\":0.0993363},\n{\"type\":32, \"data\":[207,411,32],\"color\":[204,166,110,128],\"score\":0.098587},\n{\"type\":32, \"data\":[321,451,47],\"color\":[55,33,15,128],\"score\":0.097901},\n{\"type\":32, \"data\":[340,196,17],\"color\":[197,162,103,128],\"score\":0.09713},\n{\"type\":32, \"data\":[194,122,25],\"color\":[180,207,239,128],\"score\":0.0965818},\n{\"type\":32, \"data\":[192,323,18],\"color\":[0,0,0,128],\"score\":0.0959763},\n{\"type\":32, \"data\":[199,216,39],\"color\":[198,149,113,128],\"score\":0.0953013},\n{\"type\":32, \"data\":[282,177,42],\"color\":[17,34,65,128],\"score\":0.0946765},\n{\"type\":32, \"data\":[306,267,25],\"color\":[0,0,5,128],\"score\":0.0940895},\n{\"type\":32, \"data\":[152,218,16],\"color\":[255,233,224,128],\"score\":0.0934519},\n{\"type\":32, \"data\":[436,97,107],\"color\":[0,0,14,128],\"score\":0.0923382},\n{\"type\":32, \"data\":[260,310,10],\"color\":[255,255,255,128],\"score\":0.0916355},\n{\"type\":32, \"data\":[275,344,31],\"color\":[50,40,25,128],\"score\":0.0909796},\n{\"type\":32, \"data\":[110,192,31],\"color\":[0,0,9,128],\"score\":0.0904082},\n{\"type\":32, \"data\":[219,157,19],\"color\":[37,74,116,128],\"score\":0.089848},\n{\"type\":32, \"data\":[164,171,22],\"color\":[255,229,195,128],\"score\":0.0892575},\n{\"type\":32, \"data\":[351,352,14],\"color\":[255,232,151,128],\"score\":0.0888241},\n{\"type\":32, \"data\":[109,479,34],\"color\":[0,0,7,128],\"score\":0.0883233},\n{\"type\":32, \"data\":[241,271,37],\"color\":[115,86,63,128],\"score\":0.0879063},\n{\"type\":32, \"data\":[331,157,23],\"color\":[146,119,77,128],\"score\":0.0875244},\n{\"type\":32, \"data\":[161,342,37],\"color\":[0,0,14,128],\"score\":0.0869694},\n{\"type\":32, \"data\":[337,258,8],\"color\":[255,255,179,128],\"score\":0.0865595},\n{\"type\":32, \"data\":[170,239,14],\"color\":[90,52,32,128],\"score\":0.0861738},\n{\"type\":32, \"data\":[146,411,31],\"color\":[0,0,10,128],\"score\":0.0856757},\n{\"type\":32, \"data\":[151,253,10],\"color\":[255,247,240,128],\"score\":0.085251},\n{\"type\":32, \"data\":[124,64,66],\"color\":[0,0,14,128],\"score\":0.0841206},\n{\"type\":32, \"data\":[277,305,9],\"color\":[255,255,255,128],\"score\":0.0835655},\n{\"type\":32, \"data\":[263,127,25],\"color\":[59,106,164,128],\"score\":0.0831098},\n{\"type\":32, \"data\":[389,329,16],\"color\":[40,49,72,128],\"score\":0.0827663},\n{\"type\":32, \"data\":[398,374,15],\"color\":[188,196,180,128],\"score\":0.0823174},\n{\"type\":32, \"data\":[61,388,116],\"color\":[0,0,14,128],\"score\":0.0800526},\n{\"type\":32, \"data\":[293,397,28],\"color\":[62,46,28,128],\"score\":0.0797399},\n{\"type\":32, \"data\":[56,189,84],\"color\":[0,0,16,128],\"score\":0.0785445},\n{\"type\":32, \"data\":[253,488,34],\"color\":[114,92,60,128],\"score\":0.0781633},\n{\"type\":32, \"data\":[390,414,27],\"color\":[0,0,24,128],\"score\":0.0778721},\n{\"type\":32, \"data\":[207,206,10],\"color\":[21,12,3,128],\"score\":0.077357},\n{\"type\":32, \"data\":[315,117,21],\"color\":[149,122,78,128],\"score\":0.0769672},\n{\"type\":32, \"data\":[315,28,44],\"color\":[0,0,16,128],\"score\":0.0766044},\n{\"type\":32, \"data\":[236,110,30],\"color\":[155,173,189,128],\"score\":0.0762907},\n{\"type\":32, \"data\":[171,473,21],\"color\":[203,158,98,128],\"score\":0.0759334},\n{\"type\":32, \"data\":[189,38,57],\"color\":[0,0,17,128],\"score\":0.0754825},\n{\"type\":32, \"data\":[350,283,19],\"color\":[234,199,142,128],\"score\":0.0750114},\n{\"type\":32, \"data\":[224,385,38],\"color\":[185,149,90,128],\"score\":0.0745365},\n{\"type\":32, \"data\":[411,210,53],\"color\":[0,0,17,128],\"score\":0.074055},\n{\"type\":32, \"data\":[211,345,12],\"color\":[240,234,221,128],\"score\":0.0737182},\n{\"type\":32, \"data\":[429,449,67],\"color\":[0,0,15,128],\"score\":0.0732024},\n{\"type\":32, \"data\":[165,289,11],\"color\":[255,213,192,128],\"score\":0.0729155},\n{\"type\":32, \"data\":[318,297,15],\"color\":[79,75,72,128],\"score\":0.0726013},\n{\"type\":32, \"data\":[13,102,140],\"color\":[0,0,18,128],\"score\":0.0716676},\n{\"type\":32, \"data\":[174,274,14],\"color\":[136,59,51,128],\"score\":0.0713023},\n{\"type\":32, \"data\":[163,139,14],\"color\":[160,194,231,128],\"score\":0.071054},\n{\"type\":32, \"data\":[148,234,11],\"color\":[255,230,222,128],\"score\":0.0706691},\n{\"type\":32, \"data\":[383,300,15],\"color\":[53,62,84,128],\"score\":0.070347},\n{\"type\":32, \"data\":[310,296,8],\"color\":[194,185,169,128],\"score\":0.0701167},\n{\"type\":32, \"data\":[257,238,30],\"color\":[90,64,47,128],\"score\":0.0699036},\n{\"type\":32, \"data\":[233,353,21],\"color\":[193,146,72,128],\"score\":0.0696117},\n{\"type\":32, \"data\":[316,277,15],\"color\":[0,0,13,128],\"score\":0.0693658},\n{\"type\":32, \"data\":[243,316,10],\"color\":[255,255,255,128],\"score\":0.069065},\n{\"type\":32, \"data\":[219,490,38],\"color\":[106,85,60,128],\"score\":0.0688231},\n{\"type\":32, \"data\":[436,358,31],\"color\":[0,0,18,128],\"score\":0.0685356},\n{\"type\":32, \"data\":[312,445,33],\"color\":[61,44,29,128],\"score\":0.068396},\n{\"type\":32, \"data\":[295,151,26],\"color\":[35,48,72,128],\"score\":0.0681242},\n{\"type\":32, \"data\":[198,229,19],\"color\":[244,202,176,128],\"score\":0.0678384},\n{\"type\":32, \"data\":[307,335,30],\"color\":[45,29,15,128],\"score\":0.0675457},\n{\"type\":32, \"data\":[242,126,31],\"color\":[102,143,193,128],\"score\":0.0673302},\n{\"type\":32, \"data\":[201,182,16],\"color\":[247,191,147,128],\"score\":0.067112},\n{\"type\":32, \"data\":[117,264,27],\"color\":[0,0,18,128],\"score\":0.0668544},\n{\"type\":32, \"data\":[426,296,36],\"color\":[0,0,15,128],\"score\":0.0666216},\n{\"type\":32, \"data\":[251,85,12],\"color\":[255,216,130,128],\"score\":0.0663334},\n{\"type\":32, \"data\":[335,216,8],\"color\":[255,225,150,128],\"score\":0.0660456},\n{\"type\":32, \"data\":[320,511,34],\"color\":[41,14,0,128],\"score\":0.065844},\n{\"type\":32, \"data\":[362,262,20],\"color\":[133,121,112,128],\"score\":0.0656908},\n{\"type\":32, \"data\":[254,194,28],\"color\":[48,35,32,128],\"score\":0.0655399},\n{\"type\":32, \"data\":[180,444,16],\"color\":[199,161,106,128],\"score\":0.0653281},\n{\"type\":32, \"data\":[352,371,13],\"color\":[233,217,182,128],\"score\":0.0650533},\n{\"type\":32, \"data\":[253,34,30],\"color\":[0,0,18,128],\"score\":0.0648694},\n{\"type\":32, \"data\":[337,237,9],\"color\":[239,209,146,128],\"score\":0.0646308},\n{\"type\":32, \"data\":[156,276,7],\"color\":[255,187,175,128],\"score\":0.0644525},\n{\"type\":32, \"data\":[326,141,7],\"color\":[255,232,155,128],\"score\":0.0642018},\n{\"type\":32, \"data\":[352,326,18],\"color\":[190,160,113,128],\"score\":0.0640617},\n{\"type\":32, \"data\":[327,154,6],\"color\":[255,226,159,128],\"score\":0.0638812},\n{\"type\":32, \"data\":[384,347,9],\"color\":[39,46,64,128],\"score\":0.0637232},\n{\"type\":32, \"data\":[64,421,99],\"color\":[0,0,17,128],\"score\":0.063135},\n{\"type\":32, \"data\":[359,263,6],\"color\":[255,255,222,128],\"score\":0.0629234},\n{\"type\":32, \"data\":[218,331,8],\"color\":[255,255,255,128],\"score\":0.0627132},\n{\"type\":32, \"data\":[227,308,7],\"color\":[99,67,42,128],\"score\":0.0625778},\n{\"type\":32, \"data\":[315,239,15],\"color\":[0,0,14,128],\"score\":0.0624324},\n{\"type\":32, \"data\":[45,279,100],\"color\":[0,0,19,128],\"score\":0.0621332},\n{\"type\":32, \"data\":[294,268,23],\"color\":[3,0,18,128],\"score\":0.0619745},\n{\"type\":32, \"data\":[162,511,28],\"color\":[185,145,93,128],\"score\":0.0617747},\n{\"type\":32, \"data\":[230,323,9],\"color\":[255,255,255,128],\"score\":0.0615882},\n{\"type\":32, \"data\":[314,374,25],\"color\":[36,19,9,128],\"score\":0.0614173},\n{\"type\":32, \"data\":[388,317,7],\"color\":[135,148,158,128],\"score\":0.0612823},\n{\"type\":32, \"data\":[342,464,22],\"color\":[81,64,44,128],\"score\":0.061165},\n{\"type\":32, \"data\":[286,134,15],\"color\":[41,57,85,128],\"score\":0.0610665},\n{\"type\":32, \"data\":[267,280,4],\"color\":[255,255,255,128],\"score\":0.0608222},\n{\"type\":32, \"data\":[183,129,23],\"color\":[162,186,215,128],\"score\":0.0606848},\n{\"type\":32, \"data\":[351,305,19],\"color\":[196,168,122,128],\"score\":0.0605365},\n{\"type\":32, \"data\":[385,172,32],\"color\":[0,0,15,128],\"score\":0.0604158},\n{\"type\":32, \"data\":[332,201,6],\"color\":[255,221,153,128],\"score\":0.0602626},\n{\"type\":32, \"data\":[247,334,11],\"color\":[167,133,88,128],\"score\":0.0601002},\n{\"type\":32, \"data\":[205,427,15],\"color\":[242,175,89,128],\"score\":0.0599345},\n{\"type\":32, \"data\":[327,164,5],\"color\":[255,232,160,128],\"score\":0.0597854},\n{\"type\":32, \"data\":[337,271,8],\"color\":[255,238,153,128],\"score\":0.0596276},\n{\"type\":32, \"data\":[377,377,14],\"color\":[79,106,132,128],\"score\":0.0594399},\n{\"type\":32, \"data\":[343,175,12],\"color\":[84,64,40,128],\"score\":0.0593356},\n{\"type\":32, \"data\":[361,277,6],\"color\":[255,255,228,128],\"score\":0.0591749},\n{\"type\":32, \"data\":[289,301,7],\"color\":[238,241,239,128],\"score\":0.058985},\n{\"type\":32, \"data\":[196,396,17],\"color\":[127,118,102,128],\"score\":0.0588745},\n{\"type\":32, \"data\":[396,386,5],\"color\":[232,223,187,128],\"score\":0.0587542},\n{\"type\":32, \"data\":[203,349,7],\"color\":[240,246,251,128],\"score\":0.0586226},\n{\"type\":32, \"data\":[357,218,17],\"color\":[83,68,57,128],\"score\":0.0584488},\n{\"type\":32, \"data\":[146,208,9],\"color\":[251,202,174,128],\"score\":0.0583167},\n{\"type\":32, \"data\":[224,220,9],\"color\":[228,181,151,128],\"score\":0.0581855},\n{\"type\":32, \"data\":[196,316,12],\"color\":[0,0,15,128],\"score\":0.0580559},\n{\"type\":32, \"data\":[153,195,5],\"color\":[23,1,0,128],\"score\":0.0578983},\n{\"type\":32, \"data\":[207,116,24],\"color\":[164,183,209,128],\"score\":0.0577457},\n{\"type\":32, \"data\":[380,289,13],\"color\":[64,70,87,128],\"score\":0.0576321},\n{\"type\":32, \"data\":[224,365,23],\"color\":[186,146,86,128],\"score\":0.0575091},\n{\"type\":32, \"data\":[301,173,23],\"color\":[39,49,72,128],\"score\":0.0574071},\n{\"type\":32, \"data\":[407,62,84],\"color\":[0,0,19,128],\"score\":0.057146},\n{\"type\":32, \"data\":[253,311,7],\"color\":[255,255,255,128],\"score\":0.0569894},\n{\"type\":32, \"data\":[235,167,13],\"color\":[24,43,72,128],\"score\":0.0568535},\n{\"type\":32, \"data\":[396,357,9],\"color\":[234,228,197,128],\"score\":0.0566614},\n{\"type\":32, \"data\":[264,495,17],\"color\":[142,110,69,128],\"score\":0.0565491},\n{\"type\":32, \"data\":[252,408,18],\"color\":[174,145,105,128],\"score\":0.0564431},\n{\"type\":32, \"data\":[243,436,24],\"color\":[110,99,79,128],\"score\":0.0563438},\n{\"type\":32, \"data\":[364,297,6],\"color\":[255,246,213,128],\"score\":0.0562238},\n{\"type\":32, \"data\":[357,252,5],\"color\":[255,255,211,128],\"score\":0.056048},\n{\"type\":32, \"data\":[285,78,10],\"color\":[255,232,168,128],\"score\":0.0559135},\n{\"type\":32, \"data\":[154,148,9],\"color\":[174,182,200,128],\"score\":0.0558073},\n{\"type\":32, \"data\":[235,87,6],\"color\":[255,234,136,128],\"score\":0.0556724},\n{\"type\":32, \"data\":[377,397,10],\"color\":[19,24,42,128],\"score\":0.0555378},\n{\"type\":32, \"data\":[216,476,13],\"color\":[177,134,81,128],\"score\":0.0554307},\n{\"type\":32, \"data\":[424,490,61],\"color\":[0,0,16,128],\"score\":0.0553119},\n{\"type\":32, \"data\":[294,328,22],\"color\":[51,39,30,128],\"score\":0.055206},\n{\"type\":32, \"data\":[329,177,6],\"color\":[235,202,141,128],\"score\":0.0550467},\n{\"type\":32, \"data\":[306,94,18],\"color\":[158,137,99,128],\"score\":0.0549254},\n{\"type\":32, \"data\":[362,402,11],\"color\":[135,155,163,128],\"score\":0.0547966},\n{\"type\":32, \"data\":[331,189,6],\"color\":[227,194,135,128],\"score\":0.0546955},\n{\"type\":32, \"data\":[378,321,6],\"color\":[34,14,1,128],\"score\":0.0545979},\n{\"type\":32, \"data\":[344,157,13],\"color\":[64,48,37,128],\"score\":0.0545143},\n{\"type\":32, \"data\":[366,431,22],\"color\":[1,2,23,128],\"score\":0.0544171},\n{\"type\":32, \"data\":[410,246,33],\"color\":[0,0,16,128],\"score\":0.0543108},\n{\"type\":32, \"data\":[326,394,14],\"color\":[27,4,0,128],\"score\":0.0541948},\n{\"type\":32, \"data\":[217,282,19],\"color\":[154,124,102,128],\"score\":0.0541093},\n{\"type\":32, \"data\":[318,351,20],\"color\":[44,29,20,128],\"score\":0.054006},\n{\"type\":32, \"data\":[295,406,24],\"color\":[73,56,42,128],\"score\":0.0539041},\n{\"type\":32, \"data\":[337,249,8],\"color\":[241,204,142,128],\"score\":0.0537552},\n{\"type\":32, \"data\":[166,293,9],\"color\":[238,211,184,128],\"score\":0.0536904},\n{\"type\":32, \"data\":[349,268,6],\"color\":[70,46,22,128],\"score\":0.0535678},\n{\"type\":32, \"data\":[353,285,4],\"color\":[43,31,17,128],\"score\":0.0534683},\n{\"type\":32, \"data\":[171,220,9],\"color\":[142,105,84,128],\"score\":0.0533591},\n{\"type\":32, \"data\":[189,204,9],\"color\":[242,217,204,128],\"score\":0.0532398},\n{\"type\":32, \"data\":[166,351,30],\"color\":[0,0,20,128],\"score\":0.0531221},\n{\"type\":32, \"data\":[356,299,4],\"color\":[74,50,27,128],\"score\":0.0530381},\n{\"type\":32, \"data\":[181,193,11],\"color\":[163,130,107,128],\"score\":0.0529487},\n{\"type\":32, \"data\":[342,181,12],\"color\":[89,70,50,128],\"score\":0.052854},\n{\"type\":32, \"data\":[425,321,29],\"color\":[0,0,19,128],\"score\":0.0527796},\n{\"type\":32, \"data\":[359,322,7],\"color\":[107,86,62,128],\"score\":0.0526735},\n{\"type\":32, \"data\":[363,287,5],\"color\":[255,253,234,128],\"score\":0.0525862},\n{\"type\":32, \"data\":[348,253,6],\"color\":[62,35,13,128],\"score\":0.0524704},\n{\"type\":32, \"data\":[369,261,6],\"color\":[16,11,17,128],\"score\":0.0523724},\n{\"type\":32, \"data\":[103,492,33],\"color\":[0,0,17,128],\"score\":0.0523063},\n{\"type\":32, \"data\":[350,499,24],\"color\":[47,23,7,128],\"score\":0.0522326},\n{\"type\":32, \"data\":[325,287,7],\"color\":[3,0,18,128],\"score\":0.0521263},\n{\"type\":32, \"data\":[288,208,27],\"color\":[36,39,55,128],\"score\":0.0520432},\n{\"type\":32, \"data\":[336,226,7],\"color\":[237,204,143,128],\"score\":0.0519112},\n{\"type\":32, \"data\":[378,379,6],\"color\":[204,217,192,128],\"score\":0.0518063},\n{\"type\":32, \"data\":[165,196,6],\"color\":[255,244,228,128],\"score\":0.0516631},\n{\"type\":32, \"data\":[241,160,8],\"color\":[60,110,162,128],\"score\":0.0515962},\n{\"type\":32, \"data\":[326,307,7],\"color\":[37,28,16,128],\"score\":0.0515012},\n{\"type\":32, \"data\":[285,27,37],\"color\":[0,0,18,128],\"score\":0.0514009},\n{\"type\":32, \"data\":[256,292,12],\"color\":[69,55,43,128],\"score\":0.0512878},\n{\"type\":32, \"data\":[372,272,7],\"color\":[27,30,45,128],\"score\":0.0512135},\n{\"type\":32, \"data\":[394,342,9],\"color\":[131,145,154,128],\"score\":0.0511211},\n{\"type\":32, \"data\":[381,305,11],\"color\":[76,75,76,128],\"score\":0.0510272},\n{\"type\":32, \"data\":[399,377,9],\"color\":[230,219,177,128],\"score\":0.050916},\n{\"type\":32, \"data\":[202,148,15],\"color\":[109,143,180,128],\"score\":0.0508281},\n{\"type\":32, \"data\":[163,165,16],\"color\":[255,215,202,128],\"score\":0.0507525},\n{\"type\":32, \"data\":[231,19,51],\"color\":[0,0,18,128],\"score\":0.0506465},\n{\"type\":32, \"data\":[189,170,12],\"color\":[250,203,178,128],\"score\":0.0505843},\n{\"type\":32, \"data\":[151,268,5],\"color\":[254,195,181,128],\"score\":0.0504739},\n{\"type\":32, \"data\":[383,290,5],\"color\":[135,147,156,128],\"score\":0.0504118},\n{\"type\":32, \"data\":[251,112,17],\"color\":[91,126,167,128],\"score\":0.0503408},\n{\"type\":32, \"data\":[383,358,6],\"color\":[38,54,81,128],\"score\":0.0502594},\n{\"type\":32, \"data\":[135,305,24],\"color\":[0,0,18,128],\"score\":0.0501805},\n{\"type\":32, \"data\":[295,81,8],\"color\":[252,219,166,128],\"score\":0.0501065},\n{\"type\":32, \"data\":[160,268,6],\"color\":[146,37,21,128],\"score\":0.0499917},\n{\"type\":32, \"data\":[231,124,24],\"color\":[130,163,202,128],\"score\":0.0499025},\n{\"type\":32, \"data\":[212,312,5],\"color\":[240,218,179,128],\"score\":0.0497878},\n{\"type\":32, \"data\":[303,449,22],\"color\":[47,29,20,128],\"score\":0.0497147},\n{\"type\":32, \"data\":[254,151,6],\"color\":[11,35,67,128],\"score\":0.0496434},\n{\"type\":32, \"data\":[267,308,8],\"color\":[255,255,249,128],\"score\":0.0494621},\n{\"type\":32, \"data\":[274,292,8],\"color\":[81,83,85,128],\"score\":0.049384},\n{\"type\":32, \"data\":[141,102,27],\"color\":[3,3,18,128],\"score\":0.049305},\n{\"type\":32, \"data\":[60,452,89],\"color\":[0,0,18,128],\"score\":0.049214},\n{\"type\":32, \"data\":[349,336,13],\"color\":[226,191,137,128],\"score\":0.0491333},\n{\"type\":32, \"data\":[81,48,107],\"color\":[3,3,19,128],\"score\":0.0489799},\n{\"type\":32, \"data\":[227,88,4],\"color\":[255,238,168,128],\"score\":0.0489106},\n{\"type\":32, \"data\":[157,476,10],\"color\":[145,125,98,128],\"score\":0.0488613},\n{\"type\":32, \"data\":[242,220,14],\"color\":[117,84,64,128],\"score\":0.0487896},\n{\"type\":32, \"data\":[430,389,23],\"color\":[0,0,18,128],\"score\":0.0487261},\n{\"type\":32, \"data\":[267,466,12],\"color\":[171,129,82,128],\"score\":0.0486569},\n{\"type\":32, \"data\":[330,209,4],\"color\":[244,216,148,128],\"score\":0.0485832},\n{\"type\":32, \"data\":[200,497,11],\"color\":[70,63,49,128],\"score\":0.0485168},\n{\"type\":32, \"data\":[326,133,5],\"color\":[242,207,141,128],\"score\":0.0484153},\n{\"type\":32, \"data\":[367,237,10],\"color\":[62,54,58,128],\"score\":0.0483156},\n{\"type\":32, \"data\":[405,282,20],\"color\":[0,0,17,128],\"score\":0.0482523},\n{\"type\":32, \"data\":[342,201,6],\"color\":[32,18,11,128],\"score\":0.0481478},\n{\"type\":32, \"data\":[153,254,9],\"color\":[255,198,185,128],\"score\":0.0480877},\n{\"type\":32, \"data\":[211,186,14],\"color\":[206,168,135,128],\"score\":0.0480191},\n{\"type\":32, \"data\":[113,151,32],\"color\":[7,6,20,128],\"score\":0.0479431},\n{\"type\":32, \"data\":[323,299,10],\"color\":[77,73,65,128],\"score\":0.0478907},\n{\"type\":32, \"data\":[242,492,16],\"color\":[85,74,56,128],\"score\":0.0478326},\n{\"type\":32, \"data\":[321,198,6],\"color\":[0,0,10,128],\"score\":0.0477673},\n{\"type\":32, \"data\":[340,140,9],\"color\":[75,56,38,128],\"score\":0.0477025},\n{\"type\":32, \"data\":[212,335,7],\"color\":[255,255,255,128],\"score\":0.047595},\n{\"type\":32, \"data\":[200,455,12],\"color\":[109,82,56,128],\"score\":0.0475465},\n{\"type\":32, \"data\":[186,299,10],\"color\":[139,123,105,128],\"score\":0.047485},\n{\"type\":32, \"data\":[233,302,9],\"color\":[103,84,64,128],\"score\":0.0474167},\n{\"type\":32, \"data\":[218,163,4],\"color\":[158,204,250,128],\"score\":0.0473535},\n{\"type\":32, \"data\":[358,308,4],\"color\":[61,47,34,128],\"score\":0.0472638},\n{\"type\":32, \"data\":[317,222,12],\"color\":[1,3,25,128],\"score\":0.0471982},\n{\"type\":32, \"data\":[145,178,7],\"color\":[247,199,166,128],\"score\":0.0471186},\n{\"type\":32, \"data\":[207,215,6],\"color\":[104,88,74,128],\"score\":0.0470398},\n{\"type\":32, \"data\":[124,237,15],\"color\":[4,4,17,128],\"score\":0.0469884},\n{\"type\":32, \"data\":[147,243,7],\"color\":[255,213,200,128],\"score\":0.0469296},\n{\"type\":32, \"data\":[195,322,16],\"color\":[0,0,19,128],\"score\":0.0468202},\n{\"type\":32, \"data\":[263,91,9],\"color\":[239,208,151,128],\"score\":0.0467378},\n{\"type\":32, \"data\":[247,388,14],\"color\":[212,164,89,128],\"score\":0.0466752},\n{\"type\":32, \"data\":[386,378,5],\"color\":[41,42,60,128],\"score\":0.046588},\n{\"type\":32, \"data\":[353,207,5],\"color\":[177,154,111,128],\"score\":0.0465213},\n{\"type\":32, \"data\":[384,369,5],\"color\":[51,62,84,128],\"score\":0.0464685},\n{\"type\":32, \"data\":[380,333,6],\"color\":[34,14,0,128],\"score\":0.0463704},\n{\"type\":32, \"data\":[194,254,10],\"color\":[230,193,164,128],\"score\":0.0463168},\n{\"type\":32, \"data\":[319,90,8],\"color\":[62,49,35,128],\"score\":0.0462542},\n{\"type\":32, \"data\":[352,278,4],\"color\":[58,41,16,128],\"score\":0.0461736},\n{\"type\":32, \"data\":[330,473,10],\"color\":[106,86,53,128],\"score\":0.0461213},\n{\"type\":32, \"data\":[264,133,12],\"color\":[119,151,184,128],\"score\":0.0460672},\n{\"type\":32, \"data\":[172,467,18],\"color\":[189,149,92,128],\"score\":0.0460213},\n{\"type\":32, \"data\":[281,122,9],\"color\":[38,60,91,128],\"score\":0.0459617},\n{\"type\":32, \"data\":[347,233,5],\"color\":[31,13,3,128],\"score\":0.0458505},\n{\"type\":32, \"data\":[265,264,8],\"color\":[42,22,13,128],\"score\":0.0457882},\n{\"type\":32, \"data\":[145,196,4],\"color\":[255,255,225,128],\"score\":0.0456741},\n{\"type\":32, \"data\":[151,331,32],\"color\":[4,3,20,128],\"score\":0.0456228},\n{\"type\":32, \"data\":[354,291,4],\"color\":[68,50,34,128],\"score\":0.0455435},\n{\"type\":32, \"data\":[304,190,13],\"color\":[46,67,96,128],\"score\":0.0454862},\n{\"type\":32, \"data\":[366,307,5],\"color\":[255,249,218,128],\"score\":0.0453867},\n{\"type\":32, \"data\":[259,72,9],\"color\":[170,134,82,128],\"score\":0.0453282},\n{\"type\":32, \"data\":[237,344,14],\"color\":[198,155,90,128],\"score\":0.0452786},\n{\"type\":32, \"data\":[283,303,8],\"color\":[213,215,215,128],\"score\":0.0452158},\n{\"type\":32, \"data\":[258,354,13],\"color\":[83,82,75,128],\"score\":0.0451515},\n{\"type\":32, \"data\":[214,452,13],\"color\":[162,124,79,128],\"score\":0.0450989},\n{\"type\":32, \"data\":[216,385,10],\"color\":[132,118,91,128],\"score\":0.0450416},\n{\"type\":32, \"data\":[339,117,13],\"color\":[41,26,20,128],\"score\":0.0449761},\n{\"type\":32, \"data\":[190,123,23],\"color\":[173,190,214,128],\"score\":0.0449262},\n{\"type\":32, \"data\":[312,129,10],\"color\":[88,69,47,128],\"score\":0.0448781},\n{\"type\":32, \"data\":[253,332,12],\"color\":[133,117,93,128],\"score\":0.0448258},\n{\"type\":32, \"data\":[370,138,24],\"color\":[1,0,18,128],\"score\":0.0447708},\n{\"type\":32, \"data\":[356,243,4],\"color\":[255,240,190,128],\"score\":0.0446623},\n{\"type\":32, \"data\":[318,342,19],\"color\":[43,28,19,128],\"score\":0.0446153},\n{\"type\":32, \"data\":[350,401,13],\"color\":[116,141,163,128],\"score\":0.0445559},\n{\"type\":32, \"data\":[165,499,10],\"color\":[216,161,81,128],\"score\":0.0445145},\n{\"type\":32, \"data\":[348,241,5],\"color\":[43,23,12,128],\"score\":0.0444258},\n{\"type\":32, \"data\":[233,275,18],\"color\":[129,99,80,128],\"score\":0.0443793},\n{\"type\":32, \"data\":[160,373,26],\"color\":[1,0,18,128],\"score\":0.0443237},\n{\"type\":32, \"data\":[341,446,16],\"color\":[65,49,36,128],\"score\":0.0442867},\n{\"type\":32, \"data\":[280,395,17],\"color\":[77,62,45,128],\"score\":0.0442301},\n{\"type\":32, \"data\":[380,303,10],\"color\":[72,70,74,128],\"score\":0.0441898},\n{\"type\":32, \"data\":[77,144,68],\"color\":[8,7,21,128],\"score\":0.0441306},\n{\"type\":32, \"data\":[315,371,24],\"color\":[40,24,16,128],\"score\":0.0440844},\n{\"type\":32, \"data\":[249,87,8],\"color\":[255,221,162,128],\"score\":0.0440349},\n{\"type\":32, \"data\":[162,244,7],\"color\":[105,66,46,128],\"score\":0.0439692},\n{\"type\":32, \"data\":[353,383,14],\"color\":[178,185,177,128],\"score\":0.0439039},\n{\"type\":32, \"data\":[177,274,6],\"color\":[131,45,35,128],\"score\":0.0438582},\n{\"type\":32, \"data\":[277,195,17],\"color\":[29,23,29,128],\"score\":0.0438113},\n{\"type\":32, \"data\":[199,353,4],\"color\":[255,255,255,128],\"score\":0.0437428},\n{\"type\":32, \"data\":[251,417,22],\"color\":[151,128,93,128],\"score\":0.0437009},\n{\"type\":32, \"data\":[350,185,4],\"color\":[195,171,126,128],\"score\":0.0436462},\n{\"type\":32, \"data\":[365,336,5],\"color\":[92,67,42,128],\"score\":0.0435648},\n{\"type\":32, \"data\":[238,318,9],\"color\":[255,254,246,128],\"score\":0.0434967},\n{\"type\":32, \"data\":[202,374,13],\"color\":[185,151,91,128],\"score\":0.0434572},\n{\"type\":32, \"data\":[355,235,4],\"color\":[208,194,155,128],\"score\":0.0433965},\n{\"type\":32, \"data\":[259,311,7],\"color\":[255,252,239,128],\"score\":0.0433499},\n{\"type\":32, \"data\":[327,169,5],\"color\":[229,194,137,128],\"score\":0.0432841},\n{\"type\":32, \"data\":[370,331,5],\"color\":[223,212,186,128],\"score\":0.0431992},\n{\"type\":32, \"data\":[150,224,13],\"color\":[242,195,189,128],\"score\":0.0431501},\n{\"type\":32, \"data\":[205,205,6],\"color\":[32,20,18,128],\"score\":0.0430909},\n{\"type\":32, \"data\":[359,267,5],\"color\":[255,240,204,128],\"score\":0.0430179},\n{\"type\":32, \"data\":[253,183,8],\"color\":[19,0,0,128],\"score\":0.0429638},\n{\"type\":32, \"data\":[184,502,14],\"color\":[137,112,82,128],\"score\":0.0429163},\n{\"type\":32, \"data\":[259,105,6],\"color\":[38,85,132,128],\"score\":0.0428642},\n{\"type\":32, \"data\":[272,68,6],\"color\":[207,174,115,128],\"score\":0.0428244},\n{\"type\":32, \"data\":[396,201,33],\"color\":[2,1,19,128],\"score\":0.042791},\n{\"type\":32, \"data\":[173,244,10],\"color\":[105,68,50,128],\"score\":0.0427283},\n{\"type\":32, \"data\":[226,356,16],\"color\":[213,165,90,128],\"score\":0.0426841},\n{\"type\":32, \"data\":[204,342,4],\"color\":[255,255,255,128],\"score\":0.0426391},\n{\"type\":32, \"data\":[157,285,4],\"color\":[255,241,219,128],\"score\":0.0425778},\n{\"type\":32, \"data\":[163,204,5],\"color\":[255,231,227,128],\"score\":0.0425188},\n{\"type\":32, \"data\":[343,299,11],\"color\":[219,179,118,128],\"score\":0.0424637},\n{\"type\":32, \"data\":[372,284,5],\"color\":[34,27,31,128],\"score\":0.0424052},\n{\"type\":32, \"data\":[229,174,9],\"color\":[40,43,54,128],\"score\":0.0423607},\n{\"type\":32, \"data\":[359,314,3],\"color\":[53,36,23,128],\"score\":0.0423012},\n{\"type\":32, \"data\":[390,329,7],\"color\":[120,138,155,128],\"score\":0.0422381},\n{\"type\":32, \"data\":[232,203,10],\"color\":[103,73,53,128],\"score\":0.0422006},\n{\"type\":32, \"data\":[305,166,18],\"color\":[41,50,69,128],\"score\":0.0421639},\n{\"type\":32, \"data\":[386,306,7],\"color\":[104,116,128,128],\"score\":0.0421109},\n{\"type\":32, \"data\":[347,321,10],\"color\":[209,177,129,128],\"score\":0.0420782},\n{\"type\":32, \"data\":[241,448,21],\"color\":[107,93,69,128],\"score\":0.0420464},\n{\"type\":32, \"data\":[351,419,8],\"color\":[0,0,15,128],\"score\":0.0419986},\n{\"type\":32, \"data\":[217,491,9],\"color\":[165,127,79,128],\"score\":0.0419616},\n{\"type\":32, \"data\":[161,231,7],\"color\":[184,144,121,128],\"score\":0.0419248},\n{\"type\":32, \"data\":[166,136,14],\"color\":[162,183,208,128],\"score\":0.04187},\n{\"type\":32, \"data\":[180,469,8],\"color\":[231,165,84,128],\"score\":0.0418376},\n{\"type\":32, \"data\":[162,278,5],\"color\":[243,168,166,128],\"score\":0.0417949},\n{\"type\":32, \"data\":[323,121,4],\"color\":[205,190,145,128],\"score\":0.0417373},\n{\"type\":32, \"data\":[367,317,5],\"color\":[245,235,208,128],\"score\":0.041664},\n{\"type\":32, \"data\":[304,124,5],\"color\":[169,155,121,128],\"score\":0.0416105},\n{\"type\":32, \"data\":[311,249,19],\"color\":[5,1,20,128],\"score\":0.041577},\n{\"type\":32, \"data\":[338,281,7],\"color\":[255,219,147,128],\"score\":0.04152},\n{\"type\":32, \"data\":[314,121,8],\"color\":[64,54,42,128],\"score\":0.0414668},\n{\"type\":32, \"data\":[175,207,7],\"color\":[143,113,94,128],\"score\":0.0414237},\n{\"type\":32, \"data\":[379,279,7],\"color\":[95,110,132,128],\"score\":0.0413637},\n{\"type\":32, \"data\":[367,350,4],\"color\":[82,57,38,128],\"score\":0.0413128},\n{\"type\":32, \"data\":[258,202,7],\"color\":[57,72,97,128],\"score\":0.0412773},\n{\"type\":32, \"data\":[314,101,4],\"color\":[233,200,143,128],\"score\":0.041229},\n{\"type\":32, \"data\":[143,511,11],\"color\":[151,128,99,128],\"score\":0.0411946},\n{\"type\":32, \"data\":[375,367,5],\"color\":[178,191,186,128],\"score\":0.0411396},\n{\"type\":32, \"data\":[194,202,4],\"color\":[254,255,252,128],\"score\":0.0410944},\n{\"type\":32, \"data\":[368,236,11],\"color\":[52,44,48,128],\"score\":0.0410602},\n{\"type\":32, \"data\":[347,364,9],\"color\":[235,196,136,128],\"score\":0.0410103},\n{\"type\":32, \"data\":[304,108,9],\"color\":[110,104,87,128],\"score\":0.0409662},\n{\"type\":32, \"data\":[128,274,20],\"color\":[8,7,21,128],\"score\":0.0409306},\n{\"type\":32, \"data\":[375,294,7],\"color\":[50,40,37,128],\"score\":0.0408809},\n{\"type\":32, \"data\":[236,250,14],\"color\":[96,67,55,128],\"score\":0.0408426},\n{\"type\":32, \"data\":[345,209,5],\"color\":[35,19,11,128],\"score\":0.0407705},\n{\"type\":32, \"data\":[389,411,22],\"color\":[10,9,23,128],\"score\":0.0407342},\n{\"type\":32, \"data\":[207,253,12],\"color\":[195,160,127,128],\"score\":0.0407016},\n{\"type\":32, \"data\":[265,146,6],\"color\":[108,147,184,128],\"score\":0.0406645},\n{\"type\":32, \"data\":[342,192,6],\"color\":[43,27,18,128],\"score\":0.0405991},\n{\"type\":32, \"data\":[366,249,6],\"color\":[41,26,20,128],\"score\":0.0405511},\n{\"type\":32, \"data\":[409,372,5],\"color\":[80,119,140,128],\"score\":0.0404958},\n{\"type\":32, \"data\":[315,295,8],\"color\":[134,127,118,128],\"score\":0.0404473},\n{\"type\":32, \"data\":[302,439,20],\"color\":[54,38,27,128],\"score\":0.0404226},\n{\"type\":32, \"data\":[274,329,16],\"color\":[61,57,48,128],\"score\":0.0403791},\n{\"type\":32, \"data\":[212,355,7],\"color\":[152,126,81,128],\"score\":0.0403368},\n{\"type\":32, \"data\":[175,298,8],\"color\":[204,176,154,128],\"score\":0.0402918},\n{\"type\":32, \"data\":[197,473,11],\"color\":[93,76,54,128],\"score\":0.040253},\n{\"type\":32, \"data\":[326,146,5],\"color\":[239,199,137,128],\"score\":0.0402068},\n{\"type\":32, \"data\":[306,324,20],\"color\":[53,42,33,128],\"score\":0.0401736},\n{\"type\":32, \"data\":[263,370,7],\"color\":[64,53,42,128],\"score\":0.0401419},\n{\"type\":32, \"data\":[303,357,35],\"color\":[44,28,19,128],\"score\":0.0401114},\n{\"type\":32, \"data\":[245,97,4],\"color\":[57,75,103,128],\"score\":0.0400595},\n{\"type\":32, \"data\":[364,329,5],\"color\":[106,89,71,128],\"score\":0.0400073},\n{\"type\":32, \"data\":[277,75,6],\"color\":[255,226,160,128],\"score\":0.0399706},\n{\"type\":32, \"data\":[183,433,13],\"color\":[170,142,103,128],\"score\":0.0399381},\n{\"type\":32, \"data\":[332,52,30],\"color\":[2,1,19,128],\"score\":0.0399048},\n{\"type\":32, \"data\":[272,113,7],\"color\":[43,89,140,128],\"score\":0.039856},\n{\"type\":32, \"data\":[380,341,5],\"color\":[46,27,10,128],\"score\":0.0398128},\n{\"type\":32, \"data\":[178,261,7],\"color\":[174,158,130,128],\"score\":0.0397861},\n{\"type\":32, \"data\":[169,452,9],\"color\":[154,136,101,128],\"score\":0.0397532},\n{\"type\":32, \"data\":[336,261,7],\"color\":[255,214,146,128],\"score\":0.0396821},\n{\"type\":32, \"data\":[308,450,11],\"color\":[76,59,40,128],\"score\":0.0396548},\n{\"type\":32, \"data\":[318,275,13],\"color\":[11,5,22,128],\"score\":0.0396126},\n{\"type\":32, \"data\":[277,305,5],\"color\":[248,242,238,128],\"score\":0.0395832},\n{\"type\":32, \"data\":[222,89,5],\"color\":[199,185,155,128],\"score\":0.0395514},\n{\"type\":32, \"data\":[212,411,13],\"color\":[200,161,96,128],\"score\":0.0395201},\n{\"type\":32, \"data\":[121,192,21],\"color\":[10,8,20,128],\"score\":0.0394698},\n{\"type\":32, \"data\":[379,383,6],\"color\":[167,181,168,128],\"score\":0.0394339},\n{\"type\":32, \"data\":[377,310,6],\"color\":[41,25,20,128],\"score\":0.03938},\n{\"type\":32, \"data\":[287,399,17],\"color\":[77,60,43,128],\"score\":0.0393531},\n{\"type\":32, \"data\":[198,234,17],\"color\":[232,188,160,128],\"score\":0.0393271},\n{\"type\":32, \"data\":[346,217,4],\"color\":[34,15,2,128],\"score\":0.0392883},\n{\"type\":32, \"data\":[40,260,101],\"color\":[4,3,19,128],\"score\":0.0392362},\n{\"type\":32, \"data\":[292,150,23],\"color\":[46,58,80,128],\"score\":0.0392052},\n{\"type\":32, \"data\":[210,141,5],\"color\":[75,104,139,128],\"score\":0.0391746},\n{\"type\":32, \"data\":[292,92,5],\"color\":[114,99,75,128],\"score\":0.0391318},\n{\"type\":32, \"data\":[228,100,11],\"color\":[132,159,196,128],\"score\":0.0391062},\n{\"type\":32, \"data\":[195,278,11],\"color\":[178,153,127,128],\"score\":0.0390715},\n{\"type\":32, \"data\":[321,207,7],\"color\":[0,0,21,128],\"score\":0.0390355},\n{\"type\":32, \"data\":[348,164,5],\"color\":[134,122,94,128],\"score\":0.0389985},\n{\"type\":32, \"data\":[249,74,5],\"color\":[152,125,85,128],\"score\":0.0389632},\n{\"type\":32, \"data\":[263,505,9],\"color\":[144,109,70,128],\"score\":0.0389425},\n{\"type\":32, \"data\":[325,378,14],\"color\":[30,11,5,128],\"score\":0.0389209},\n{\"type\":32, \"data\":[272,291,4],\"color\":[156,155,148,128],\"score\":0.0388752},\n{\"type\":32, \"data\":[354,228,3],\"color\":[200,181,139,128],\"score\":0.0388374},\n{\"type\":32, \"data\":[224,326,9],\"color\":[241,235,228,128],\"score\":0.0388047},\n{\"type\":32, \"data\":[327,95,7],\"color\":[61,47,36,128],\"score\":0.0387765},\n{\"type\":32, \"data\":[125,289,28],\"color\":[6,5,20,128],\"score\":0.0387442},\n{\"type\":32, \"data\":[267,280,3],\"color\":[255,255,251,128],\"score\":0.038699},\n{\"type\":32, \"data\":[396,363,8],\"color\":[226,210,170,128],\"score\":0.0386625},\n{\"type\":32, \"data\":[274,250,7],\"color\":[101,78,59,128],\"score\":0.0386306},\n{\"type\":32, \"data\":[328,185,3],\"color\":[255,230,160,128],\"score\":0.0385778},\n{\"type\":32, \"data\":[362,400,6],\"color\":[172,185,176,128],\"score\":0.0385478},\n{\"type\":32, \"data\":[174,70,30],\"color\":[2,2,18,128],\"score\":0.0385205},\n{\"type\":32, \"data\":[175,284,7],\"color\":[153,94,82,128],\"score\":0.0384962},\n{\"type\":32, \"data\":[350,262,4],\"color\":[62,45,23,128],\"score\":0.0384484},\n{\"type\":32, \"data\":[154,195,6],\"color\":[85,65,46,128],\"score\":0.0384055},\n{\"type\":32, \"data\":[299,298,7],\"color\":[175,170,160,128],\"score\":0.0383712},\n{\"type\":32, \"data\":[210,207,9],\"color\":[95,70,51,128],\"score\":0.0383455},\n{\"type\":32, \"data\":[351,342,12],\"color\":[224,189,137,128],\"score\":0.0383179},\n{\"type\":32, \"data\":[349,177,4],\"color\":[149,130,98,128],\"score\":0.0382836},\n{\"type\":32, \"data\":[433,363,20],\"color\":[0,0,14,128],\"score\":0.0382596},\n{\"type\":32, \"data\":[300,478,20],\"color\":[49,33,22,128],\"score\":0.0382325},\n{\"type\":32, \"data\":[374,352,4],\"color\":[181,201,200,128],\"score\":0.0381905},\n{\"type\":32, \"data\":[388,384,5],\"color\":[63,76,96,128],\"score\":0.0381386},\n{\"type\":32, \"data\":[133,125,20],\"color\":[5,4,18,128],\"score\":0.0381005},\n{\"type\":32, \"data\":[190,218,11],\"color\":[231,187,156,128],\"score\":0.038085},\n{\"type\":32, \"data\":[384,297,5],\"color\":[115,128,139,128],\"score\":0.0380467},\n{\"type\":32, \"data\":[175,167,15],\"color\":[239,205,193,128],\"score\":0.0380243},\n{\"type\":32, \"data\":[361,39,59],\"color\":[3,2,19,128],\"score\":0.0380004},\n{\"type\":32, \"data\":[278,99,10],\"color\":[200,176,130,128],\"score\":0.0379733},\n{\"type\":32, \"data\":[152,214,14],\"color\":[233,195,182,128],\"score\":0.0379338},\n{\"type\":32, \"data\":[174,349,22],\"color\":[3,3,18,128],\"score\":0.0379028},\n{\"type\":32, \"data\":[211,166,5],\"color\":[69,87,109,128],\"score\":0.0378683},\n{\"type\":32, \"data\":[166,189,8],\"color\":[249,204,185,128],\"score\":0.0378322},\n{\"type\":32, \"data\":[343,409,5],\"color\":[92,124,148,128],\"score\":0.037808},\n{\"type\":32, \"data\":[272,452,11],\"color\":[138,108,77,128],\"score\":0.0377799},\n{\"type\":32, \"data\":[260,40,23],\"color\":[6,4,19,128],\"score\":0.0377575},\n{\"type\":32, \"data\":[303,90,6],\"color\":[231,193,134,128],\"score\":0.0377264},\n{\"type\":32, \"data\":[151,206,6],\"color\":[196,159,126,128],\"score\":0.0376901},\n{\"type\":32, \"data\":[151,145,4],\"color\":[164,198,232,128],\"score\":0.0376657},\n{\"type\":32, \"data\":[155,242,4],\"color\":[156,104,73,128],\"score\":0.0376358},\n{\"type\":32, \"data\":[330,402,9],\"color\":[28,8,0,128],\"score\":0.0376015},\n{\"type\":32, \"data\":[377,267,7],\"color\":[80,96,120,128],\"score\":0.0375651},\n{\"type\":32, \"data\":[371,391,5],\"color\":[54,64,83,128],\"score\":0.0375301},\n{\"type\":32, \"data\":[338,139,8],\"color\":[86,70,53,128],\"score\":0.0375094},\n{\"type\":32, \"data\":[185,414,9],\"color\":[137,126,109,128],\"score\":0.0374896},\n{\"type\":32, \"data\":[332,197,6],\"color\":[204,173,119,128],\"score\":0.0374478},\n{\"type\":32, \"data\":[373,247,3],\"color\":[113,142,168,128],\"score\":0.0374096},\n{\"type\":32, \"data\":[116,214,21],\"color\":[8,8,20,128],\"score\":0.0373906},\n{\"type\":32, \"data\":[316,141,5],\"color\":[89,74,45,128],\"score\":0.0373549},\n{\"type\":32, \"data\":[308,129,5],\"color\":[145,127,93,128],\"score\":0.0373206},\n{\"type\":32, \"data\":[296,118,4],\"color\":[213,186,135,128],\"score\":0.0372887},\n{\"type\":32, \"data\":[222,64,19],\"color\":[1,0,18,128],\"score\":0.0372672},\n{\"type\":32, \"data\":[370,325,4],\"color\":[240,231,206,128],\"score\":0.0372191},\n{\"type\":32, \"data\":[262,76,3],\"color\":[41,24,12,128],\"score\":0.0371602},\n{\"type\":32, \"data\":[367,359,4],\"color\":[101,72,45,128],\"score\":0.0371269},\n{\"type\":32, \"data\":[287,232,6],\"color\":[50,67,96,128],\"score\":0.0370965},\n{\"type\":32, \"data\":[249,167,8],\"color\":[46,72,108,128],\"score\":0.0370693},\n{\"type\":32, \"data\":[403,235,30],\"color\":[3,1,18,128],\"score\":0.0370439},\n{\"type\":32, \"data\":[378,375,5],\"color\":[183,193,177,128],\"score\":0.0370114},\n{\"type\":32, \"data\":[397,149,47],\"color\":[4,3,19,128],\"score\":0.0369782},\n{\"type\":32, \"data\":[277,133,4],\"color\":[98,139,183,128],\"score\":0.036948},\n{\"type\":32, \"data\":[360,382,5],\"color\":[236,215,161,128],\"score\":0.0369239},\n{\"type\":32, \"data\":[425,467,58],\"color\":[2,1,19,128],\"score\":0.036905},\n{\"type\":32, \"data\":[288,297,4],\"color\":[150,154,152,128],\"score\":0.0368717},\n{\"type\":32, \"data\":[137,420,34],\"color\":[3,2,19,128],\"score\":0.0368478},\n{\"type\":32, \"data\":[297,129,4],\"color\":[28,9,9,128],\"score\":0.0368221},\n{\"type\":32, \"data\":[202,504,10],\"color\":[75,64,47,128],\"score\":0.0367996},\n{\"type\":32, \"data\":[326,331,10],\"color\":[35,17,8,128],\"score\":0.0367781},\n{\"type\":32, \"data\":[154,262,4],\"color\":[188,105,79,128],\"score\":0.0367474},\n{\"type\":32, \"data\":[358,259,5],\"color\":[255,222,184,128],\"score\":0.0366989},\n{\"type\":32, \"data\":[338,176,7],\"color\":[65,49,34,128],\"score\":0.036671},\n{\"type\":32, \"data\":[347,223,5],\"color\":[60,43,27,128],\"score\":0.0366458},\n{\"type\":32, \"data\":[162,470,9],\"color\":[149,130,101,128],\"score\":0.0366234},\n{\"type\":32, \"data\":[148,192,3],\"color\":[217,197,180,128],\"score\":0.0365937},\n{\"type\":32, \"data\":[352,485,17],\"color\":[54,36,25,128],\"score\":0.0365735},\n{\"type\":32, \"data\":[357,361,7],\"color\":[204,170,124,128],\"score\":0.0365536},\n{\"type\":32, \"data\":[252,101,5],\"color\":[47,92,139,128],\"score\":0.0365217},\n{\"type\":32, \"data\":[362,195,8],\"color\":[43,30,28,128],\"score\":0.036499},\n{\"type\":32, \"data\":[232,86,4],\"color\":[255,221,167,128],\"score\":0.0364788},\n{\"type\":32, \"data\":[203,204,3],\"color\":[0,0,0,128],\"score\":0.0364501},\n{\"type\":32, \"data\":[360,270,5],\"color\":[250,221,188,128],\"score\":0.0364173},\n{\"type\":32, \"data\":[326,309,7],\"color\":[54,44,34,128],\"score\":0.0363928},\n{\"type\":32, \"data\":[324,125,3],\"color\":[229,210,151,128],\"score\":0.03635},\n{\"type\":32, \"data\":[335,219,8],\"color\":[208,175,120,128],\"score\":0.0363062},\n{\"type\":32, \"data\":[407,355,5],\"color\":[65,89,119,128],\"score\":0.0362566},\n{\"type\":32, \"data\":[198,109,14],\"color\":[177,192,212,128],\"score\":0.0362327},\n{\"type\":32, \"data\":[274,294,4],\"color\":[67,46,42,128],\"score\":0.0362039},\n{\"type\":32, \"data\":[357,302,3],\"color\":[70,51,28,128],\"score\":0.0361634},\n{\"type\":32, \"data\":[319,178,5],\"color\":[29,14,18,128],\"score\":0.0361348},\n{\"type\":32, \"data\":[261,159,6],\"color\":[26,19,28,128],\"score\":0.0361135},\n{\"type\":32, \"data\":[290,447,10],\"color\":[38,20,12,128],\"score\":0.0360924},\n{\"type\":32, \"data\":[346,153,4],\"color\":[149,128,97,128],\"score\":0.03606},\n{\"type\":32, \"data\":[153,149,3],\"color\":[114,120,128,128],\"score\":0.036039},\n{\"type\":32, \"data\":[302,295,6],\"color\":[149,148,143,128],\"score\":0.036011},\n{\"type\":32, \"data\":[238,302,7],\"color\":[106,86,65,128],\"score\":0.0359854},\n{\"type\":32, \"data\":[161,139,11],\"color\":[158,178,202,128],\"score\":0.035965},\n{\"type\":32, \"data\":[323,115,3],\"color\":[222,200,152,128],\"score\":0.0359154},\n{\"type\":32, \"data\":[149,184,6],\"color\":[191,151,127,128],\"score\":0.0358876},\n{\"type\":32, \"data\":[264,96,5],\"color\":[255,229,168,128],\"score\":0.0358562},\n{\"type\":32, \"data\":[192,191,8],\"color\":[194,158,140,128],\"score\":0.0358381},\n{\"type\":32, \"data\":[224,185,5],\"color\":[155,128,106,128],\"score\":0.0358122},\n{\"type\":32, \"data\":[289,68,4],\"color\":[144,121,84,128],\"score\":0.0357865},\n{\"type\":32, \"data\":[147,495,8],\"color\":[134,119,102,128],\"score\":0.0357648},\n{\"type\":32, \"data\":[266,347,9],\"color\":[74,67,55,128],\"score\":0.035743},\n{\"type\":32, \"data\":[190,139,16],\"color\":[153,178,209,128],\"score\":0.0357216},\n{\"type\":32, \"data\":[202,216,6],\"color\":[167,141,121,128],\"score\":0.0356934},\n{\"type\":32, \"data\":[373,277,6],\"color\":[47,41,45,128],\"score\":0.0356587},\n{\"type\":32, \"data\":[273,386,10],\"color\":[64,52,38,128],\"score\":0.0356321},\n{\"type\":32, \"data\":[351,193,4],\"color\":[192,165,122,128],\"score\":0.0355965},\n{\"type\":32, \"data\":[334,511,13],\"color\":[25,5,0,128],\"score\":0.0355762},\n{\"type\":32, \"data\":[353,219,3],\"color\":[187,167,127,128],\"score\":0.0355447},\n{\"type\":32, \"data\":[246,158,4],\"color\":[90,142,195,128],\"score\":0.0355187},\n{\"type\":32, \"data\":[262,107,7],\"color\":[63,105,151,128],\"score\":0.0355021},\n{\"type\":32, \"data\":[256,380,8],\"color\":[181,147,94,128],\"score\":0.0354694},\n{\"type\":32, \"data\":[226,158,6],\"color\":[51,65,82,128],\"score\":0.0354451},\n{\"type\":32, \"data\":[195,438,6],\"color\":[230,165,82,128],\"score\":0.0354232},\n{\"type\":32, \"data\":[337,164,7],\"color\":[63,45,32,128],\"score\":0.0353966},\n{\"type\":32, \"data\":[241,476,15],\"color\":[95,84,62,128],\"score\":0.0353792},\n{\"type\":32, \"data\":[399,348,4],\"color\":[216,210,178,128],\"score\":0.0353458},\n{\"type\":32, \"data\":[282,152,6],\"color\":[33,22,29,128],\"score\":0.035322},\n{\"type\":32, \"data\":[247,365,10],\"color\":[147,129,91,128],\"score\":0.035303},\n{\"type\":32, \"data\":[324,419,11],\"color\":[76,59,44,128],\"score\":0.0352794},\n{\"type\":32, \"data\":[366,409,4],\"color\":[117,135,141,128],\"score\":0.0352519},\n{\"type\":32, \"data\":[374,256,4],\"color\":[105,121,142,128],\"score\":0.0352229},\n{\"type\":32, \"data\":[278,93,10],\"color\":[178,159,118,128],\"score\":0.0351947},\n{\"type\":32, \"data\":[152,273,3],\"color\":[244,210,195,128],\"score\":0.0351646},\n{\"type\":32, \"data\":[277,168,9],\"color\":[44,70,102,128],\"score\":0.0351466},\n{\"type\":32, \"data\":[315,351,16],\"color\":[52,39,30,128],\"score\":0.0351267},\n{\"type\":32, \"data\":[353,223,3],\"color\":[178,157,118,128],\"score\":0.0351054},\n{\"type\":32, \"data\":[322,192,4],\"color\":[5,2,16,128],\"score\":0.0350837},\n{\"type\":32, \"data\":[331,462,8],\"color\":[97,78,49,128],\"score\":0.0350687},\n{\"type\":32, \"data\":[87,121,64],\"color\":[8,7,20,128],\"score\":0.0350438},\n{\"type\":32, \"data\":[187,399,10],\"color\":[132,117,92,128],\"score\":0.0350302},\n{\"type\":32, \"data\":[288,413,5],\"color\":[38,26,21,128],\"score\":0.0350135},\n{\"type\":32, \"data\":[198,356,3],\"color\":[241,240,255,128],\"score\":0.034984},\n{\"type\":32, \"data\":[288,140,8],\"color\":[54,78,108,128],\"score\":0.0349677},\n{\"type\":32, \"data\":[342,417,5],\"color\":[0,0,17,128],\"score\":0.0349442},\n{\"type\":32, \"data\":[216,242,9],\"color\":[172,135,112,128],\"score\":0.0349208},\n{\"type\":32, \"data\":[392,348,4],\"color\":[65,74,96,128],\"score\":0.0348829},\n{\"type\":32, \"data\":[291,127,6],\"color\":[33,38,59,128],\"score\":0.0348613},\n{\"type\":32, \"data\":[349,277,6],\"color\":[123,98,65,128],\"score\":0.0348306},\n{\"type\":32, \"data\":[244,295,6],\"color\":[79,64,50,128],\"score\":0.0348137},\n{\"type\":32, \"data\":[405,347,4],\"color\":[53,83,118,128],\"score\":0.0347959},\n{\"type\":32, \"data\":[371,381,4],\"color\":[47,68,95,128],\"score\":0.0347593},\n{\"type\":32, \"data\":[370,127,27],\"color\":[5,4,18,128],\"score\":0.034744},\n{\"type\":32, \"data\":[342,457,9],\"color\":[45,30,24,128],\"score\":0.0347263},\n{\"type\":32, \"data\":[160,257,4],\"color\":[255,213,198,128],\"score\":0.0346955},\n{\"type\":32, \"data\":[216,317,5],\"color\":[218,194,164,128],\"score\":0.0346626},\n{\"type\":32, \"data\":[257,83,5],\"color\":[216,196,155,128],\"score\":0.0346437},\n{\"type\":32, \"data\":[428,303,36],\"color\":[4,3,19,128],\"score\":0.0346214},\n{\"type\":32, \"data\":[373,400,6],\"color\":[54,60,76,128],\"score\":0.0345945},\n{\"type\":32, \"data\":[222,305,8],\"color\":[123,99,74,128],\"score\":0.0345713},\n{\"type\":32, \"data\":[244,178,5],\"color\":[26,4,0,128],\"score\":0.0345494},\n{\"type\":32, \"data\":[344,309,11],\"color\":[207,177,127,128],\"score\":0.0345277},\n{\"type\":32, \"data\":[339,290,8],\"color\":[207,171,114,128],\"score\":0.0345112},\n{\"type\":32, \"data\":[366,344,4],\"color\":[100,68,35,128],\"score\":0.03447},\n{\"type\":32, \"data\":[177,125,14],\"color\":[176,192,218,128],\"score\":0.0344532},\n{\"type\":32, \"data\":[340,387,4],\"color\":[91,124,141,128],\"score\":0.0344304},\n{\"type\":32, \"data\":[353,328,4],\"color\":[159,129,88,128],\"score\":0.0344102},\n{\"type\":32, \"data\":[240,337,9],\"color\":[196,153,91,128],\"score\":0.0343891},\n{\"type\":32, \"data\":[250,70,4],\"color\":[203,185,139,128],\"score\":0.0343706},\n{\"type\":32, \"data\":[149,377,33],\"color\":[3,2,19,128],\"score\":0.0343525},\n{\"type\":32, \"data\":[149,266,3],\"color\":[250,219,205,128],\"score\":0.0343254},\n{\"type\":32, \"data\":[227,376,5],\"color\":[137,119,92,128],\"score\":0.0343079},\n{\"type\":32, \"data\":[139,0,46],\"color\":[2,1,19,128],\"score\":0.0342949},\n{\"type\":32, \"data\":[235,424,14],\"color\":[134,117,88,128],\"score\":0.0342817},\n{\"type\":32, \"data\":[178,247,5],\"color\":[98,62,44,128],\"score\":0.0342631},\n{\"type\":32, \"data\":[329,179,3],\"color\":[253,208,138,128],\"score\":0.0342357},\n{\"type\":32, \"data\":[333,205,5],\"color\":[205,170,118,128],\"score\":0.0342096},\n{\"type\":32, \"data\":[348,243,6],\"color\":[87,64,42,128],\"score\":0.0341837},\n{\"type\":32, \"data\":[364,224,9],\"color\":[59,54,57,128],\"score\":0.0341602},\n{\"type\":32, \"data\":[252,233,18],\"color\":[88,62,47,128],\"score\":0.0341431},\n{\"type\":32, \"data\":[317,168,6],\"color\":[30,20,28,128],\"score\":0.0341172},\n{\"type\":32, \"data\":[260,68,5],\"color\":[196,175,127,128],\"score\":0.0340953},\n{\"type\":32, \"data\":[272,103,2],\"color\":[255,246,214,128],\"score\":0.0340781},\n{\"type\":32, \"data\":[408,277,23],\"color\":[5,3,19,128],\"score\":0.0340669},\n{\"type\":32, \"data\":[287,394,10],\"color\":[92,71,49,128],\"score\":0.0340524},\n{\"type\":32, \"data\":[154,254,7],\"color\":[245,205,198,128],\"score\":0.0340349},\n{\"type\":32, \"data\":[348,355,8],\"color\":[242,205,146,128],\"score\":0.0340168},\n{\"type\":32, \"data\":[262,296,7],\"color\":[85,65,54,128],\"score\":0.0339836},\n{\"type\":32, \"data\":[280,66,3],\"color\":[154,129,86,128],\"score\":0.0339613},\n{\"type\":32, \"data\":[270,75,3],\"color\":[255,231,172,128],\"score\":0.0339409},\n{\"type\":32, \"data\":[187,270,5],\"color\":[154,107,84,128],\"score\":0.0339269},\n{\"type\":32, \"data\":[337,267,7],\"color\":[251,204,140,128],\"score\":0.0339018},\n{\"type\":32, \"data\":[383,397,9],\"color\":[7,5,18,128],\"score\":0.0338827},\n{\"type\":32, \"data\":[353,396,6],\"color\":[111,132,156,128],\"score\":0.0338653},\n{\"type\":32, \"data\":[335,232,6],\"color\":[196,177,130,128],\"score\":0.0338478},\n{\"type\":32, \"data\":[379,434,25],\"color\":[5,4,20,128],\"score\":0.0338356},\n{\"type\":32, \"data\":[156,279,5],\"color\":[232,182,165,128],\"score\":0.0338125},\n{\"type\":32, \"data\":[336,131,6],\"color\":[75,59,36,128],\"score\":0.0337929},\n{\"type\":32, \"data\":[357,250,4],\"color\":[255,223,177,128],\"score\":0.0337628},\n{\"type\":32, \"data\":[226,232,5],\"color\":[158,118,96,128],\"score\":0.0337469},\n{\"type\":32, \"data\":[374,302,3],\"color\":[37,16,2,128],\"score\":0.0337286},\n{\"type\":32, \"data\":[328,195,2],\"color\":[255,241,170,128],\"score\":0.0337072},\n{\"type\":32, \"data\":[134,190,9],\"color\":[24,16,24,128],\"score\":0.0336931},\n{\"type\":32, \"data\":[282,504,8],\"color\":[74,61,37,128],\"score\":0.0336759},\n{\"type\":32, \"data\":[283,291,3],\"color\":[4,0,4,128],\"score\":0.0336424},\n{\"type\":32, \"data\":[304,152,14],\"color\":[45,59,82,128],\"score\":0.033631},\n{\"type\":32, \"data\":[295,210,12],\"color\":[41,46,65,128],\"score\":0.0336132},\n{\"type\":32, \"data\":[176,195,8],\"color\":[164,137,113,128],\"score\":0.0335966},\n{\"type\":32, \"data\":[267,85,8],\"color\":[185,163,123,128],\"score\":0.0335754},\n{\"type\":32, \"data\":[402,383,4],\"color\":[210,201,167,128],\"score\":0.0335566},\n{\"type\":32, \"data\":[204,197,4],\"color\":[105,91,78,128],\"score\":0.0335298},\n{\"type\":32, \"data\":[169,258,5],\"color\":[150,124,96,128],\"score\":0.0335138},\n{\"type\":32, \"data\":[268,274,2],\"color\":[163,164,170,128],\"score\":0.0334934},\n{\"type\":32, \"data\":[209,340,6],\"color\":[253,249,239,128],\"score\":0.0334576},\n{\"type\":32, \"data\":[236,95,5],\"color\":[105,124,149,128],\"score\":0.033435},\n{\"type\":32, \"data\":[253,146,4],\"color\":[47,89,136,128],\"score\":0.0334205},\n{\"type\":32, \"data\":[233,387,7],\"color\":[225,165,83,128],\"score\":0.0334082},\n{\"type\":32, \"data\":[228,351,15],\"color\":[203,159,91,128],\"score\":0.033393},\n{\"type\":32, \"data\":[336,241,7],\"color\":[201,179,130,128],\"score\":0.0333741},\n{\"type\":32, \"data\":[297,102,8],\"color\":[143,131,101,128],\"score\":0.0333527},\n{\"type\":32, \"data\":[148,229,11],\"color\":[239,197,190,128],\"score\":0.0333358},\n{\"type\":32, \"data\":[329,294,3],\"color\":[23,18,24,128],\"score\":0.0333129},\n{\"type\":32, \"data\":[295,329,22],\"color\":[51,38,30,128],\"score\":0.0333014},\n{\"type\":32, \"data\":[370,243,3],\"color\":[94,104,126,128],\"score\":0.0332763},\n{\"type\":32, \"data\":[390,320,5],\"color\":[112,122,135,128],\"score\":0.0332553},\n{\"type\":32, \"data\":[373,359,4],\"color\":[175,195,200,128],\"score\":0.033218},\n{\"type\":32, \"data\":[168,493,9],\"color\":[207,157,84,128],\"score\":0.0332048},\n{\"type\":32, \"data\":[335,435,13],\"color\":[67,53,40,128],\"score\":0.03319},\n{\"type\":32, \"data\":[167,235,10],\"color\":[149,111,90,128],\"score\":0.0331701},\n{\"type\":32, \"data\":[294,349,11],\"color\":[35,15,7,128],\"score\":0.0331544},\n{\"type\":32, \"data\":[343,183,4],\"color\":[42,27,19,128],\"score\":0.0331338},\n{\"type\":32, \"data\":[276,236,5],\"color\":[37,5,0,128],\"score\":0.0331125},\n{\"type\":32, \"data\":[221,219,6],\"color\":[219,177,150,128],\"score\":0.0330957},\n{\"type\":32, \"data\":[254,394,10],\"color\":[197,151,86,128],\"score\":0.0330863},\n{\"type\":32, \"data\":[328,302,5],\"color\":[48,37,32,128],\"score\":0.033063},\n{\"type\":32, \"data\":[183,457,6],\"color\":[223,165,84,128],\"score\":0.0330432},\n{\"type\":32, \"data\":[301,509,14],\"color\":[38,18,1,128],\"score\":0.0330264},\n{\"type\":32, \"data\":[397,341,2],\"color\":[213,221,197,128],\"score\":0.0330046},\n{\"type\":32, \"data\":[337,151,5],\"color\":[54,41,29,128],\"score\":0.0329869},\n{\"type\":32, \"data\":[264,476,9],\"color\":[160,124,76,128],\"score\":0.0329728},\n{\"type\":32, \"data\":[199,457,10],\"color\":[104,83,59,128],\"score\":0.0329518},\n{\"type\":32, \"data\":[194,151,9],\"color\":[134,163,196,128],\"score\":0.0329416},\n{\"type\":32, \"data\":[160,291,4],\"color\":[255,223,204,128],\"score\":0.0329257},\n{\"type\":32, \"data\":[189,188,6],\"color\":[172,141,115,128],\"score\":0.0329136},\n{\"type\":32, \"data\":[344,328,9],\"color\":[210,183,135,128],\"score\":0.0328941},\n{\"type\":32, \"data\":[319,231,10],\"color\":[13,9,23,128],\"score\":0.0328813},\n{\"type\":32, \"data\":[220,506,8],\"color\":[149,110,69,128],\"score\":0.0328612},\n{\"type\":32, \"data\":[322,112,2],\"color\":[219,189,145,128],\"score\":0.0328448},\n{\"type\":32, \"data\":[348,171,4],\"color\":[131,116,89,128],\"score\":0.0328279},\n{\"type\":32, \"data\":[309,97,4],\"color\":[224,190,135,128],\"score\":0.0328034},\n{\"type\":32, \"data\":[318,130,4],\"color\":[53,40,35,128],\"score\":0.0327886},\n{\"type\":32, \"data\":[360,320,4],\"color\":[99,76,50,128],\"score\":0.0327608},\n{\"type\":32, \"data\":[213,149,5],\"color\":[60,100,142,128],\"score\":0.0327431},\n{\"type\":32, \"data\":[382,349,5],\"color\":[56,54,67,128],\"score\":0.0327255},\n{\"type\":32, \"data\":[281,426,7],\"color\":[84,72,56,128],\"score\":0.0327131},\n{\"type\":32, \"data\":[354,211,5],\"color\":[146,126,93,128],\"score\":0.0326924},\n{\"type\":32, \"data\":[146,192,2],\"color\":[255,255,249,128],\"score\":0.0326687},\n{\"type\":32, \"data\":[200,482,7],\"color\":[86,71,46,128],\"score\":0.0326561},\n{\"type\":32, \"data\":[312,312,9],\"color\":[65,56,47,128],\"score\":0.0326402},\n{\"type\":32, \"data\":[334,103,6],\"color\":[46,32,25,128],\"score\":0.0326243},\n{\"type\":32, \"data\":[365,303,5],\"color\":[248,218,181,128],\"score\":0.0326009},\n{\"type\":32, \"data\":[187,298,8],\"color\":[138,115,96,128],\"score\":0.0325892},\n{\"type\":32, \"data\":[272,277,4],\"color\":[99,95,87,128],\"score\":0.0325692},\n{\"type\":32, \"data\":[180,330,22],\"color\":[4,4,20,128],\"score\":0.0325509},\n{\"type\":32, \"data\":[258,124,13],\"color\":[114,146,183,128],\"score\":0.0325366},\n{\"type\":32, \"data\":[278,224,5],\"color\":[37,61,94,128],\"score\":0.0325215},\n{\"type\":32, \"data\":[333,192,2],\"color\":[83,58,35,128],\"score\":0.0324987},\n{\"type\":32, \"data\":[333,199,2],\"color\":[107,82,59,128],\"score\":0.0324823},\n{\"type\":32, \"data\":[354,338,3],\"color\":[151,123,82,128],\"score\":0.0324612},\n{\"type\":32, \"data\":[140,189,4],\"color\":[80,51,42,128],\"score\":0.0324495},\n{\"type\":32, \"data\":[379,326,5],\"color\":[47,32,25,128],\"score\":0.0324324},\n{\"type\":32, \"data\":[349,259,4],\"color\":[83,63,41,128],\"score\":0.0324172},\n{\"type\":32, \"data\":[214,170,4],\"color\":[75,76,85,128],\"score\":0.0324012},\n{\"type\":32, \"data\":[315,285,5],\"color\":[35,33,46,128],\"score\":0.032383},\n{\"type\":32, \"data\":[369,368,3],\"color\":[52,63,94,128],\"score\":0.0323624},\n{\"type\":32, \"data\":[383,286,3],\"color\":[137,153,168,128],\"score\":0.0323429},\n{\"type\":32, \"data\":[322,493,13],\"color\":[55,38,28,128],\"score\":0.0323296},\n{\"type\":32, \"data\":[320,191,6],\"color\":[25,16,21,128],\"score\":0.0323088},\n{\"type\":32, \"data\":[119,201,20],\"color\":[8,8,21,128],\"score\":0.0322926},\n{\"type\":32, \"data\":[370,265,5],\"color\":[46,32,28,128],\"score\":0.0322725},\n{\"type\":32, \"data\":[210,323,3],\"color\":[8,3,14,128],\"score\":0.0322548},\n{\"type\":32, \"data\":[254,322,3],\"color\":[142,119,92,128],\"score\":0.0322425},\n{\"type\":32, \"data\":[368,232,4],\"color\":[77,84,100,128],\"score\":0.0322258},\n{\"type\":32, \"data\":[231,109,15],\"color\":[132,162,200,128],\"score\":0.0322122},\n{\"type\":32, \"data\":[327,111,4],\"color\":[69,54,35,128],\"score\":0.0321992},\n{\"type\":32, \"data\":[269,100,2],\"color\":[255,249,184,128],\"score\":0.0321868},\n{\"type\":32, \"data\":[233,286,7],\"color\":[152,125,103,128],\"score\":0.0321718},\n{\"type\":32, \"data\":[158,511,8],\"color\":[206,150,75,128],\"score\":0.0321613},\n{\"type\":32, \"data\":[313,85,5],\"color\":[102,82,61,128],\"score\":0.0321459},\n{\"type\":32, \"data\":[209,386,6],\"color\":[122,110,92,128],\"score\":0.0321289},\n{\"type\":32, \"data\":[223,174,6],\"color\":[55,70,89,128],\"score\":0.032109},\n{\"type\":32, \"data\":[149,218,11],\"color\":[238,202,195,128],\"score\":0.0320954},\n{\"type\":32, \"data\":[284,490,6],\"color\":[95,85,59,128],\"score\":0.0320823},\n{\"type\":32, \"data\":[309,261,21],\"color\":[8,5,20,128],\"score\":0.0320589},\n{\"type\":32, \"data\":[380,303,5],\"color\":[57,54,67,128],\"score\":0.0320466},\n{\"type\":32, \"data\":[338,277,7],\"color\":[245,205,142,128],\"score\":0.0320295},\n{\"type\":32, \"data\":[202,293,9],\"color\":[149,127,106,128],\"score\":0.0320181},\n{\"type\":32, \"data\":[355,238,3],\"color\":[215,199,166,128],\"score\":0.0319993},\n{\"type\":32, \"data\":[215,466,11],\"color\":[157,121,78,128],\"score\":0.0319861},\n{\"type\":32, \"data\":[228,190,5],\"color\":[115,89,68,128],\"score\":0.031974},\n{\"type\":32, \"data\":[204,180,8],\"color\":[234,190,164,128],\"score\":0.0319582},\n{\"type\":32, \"data\":[344,144,4],\"color\":[130,110,83,128],\"score\":0.0319374},\n{\"type\":32, \"data\":[298,230,8],\"color\":[30,17,14,128],\"score\":0.0319254},\n{\"type\":32, \"data\":[360,375,5],\"color\":[209,210,184,128],\"score\":0.0319122},\n{\"type\":32, \"data\":[234,152,6],\"color\":[59,106,160,128],\"score\":0.0318955},\n{\"type\":32, \"data\":[334,412,5],\"color\":[27,12,4,128],\"score\":0.0318848},\n{\"type\":32, \"data\":[227,271,12],\"color\":[119,91,74,128],\"score\":0.0318718},\n{\"type\":32, \"data\":[410,380,4],\"color\":[68,93,116,128],\"score\":0.0318473},\n{\"type\":32, \"data\":[199,309,5],\"color\":[9,6,18,128],\"score\":0.031834},\n{\"type\":32, \"data\":[147,171,6],\"color\":[247,207,184,128],\"score\":0.0318142},\n{\"type\":32, \"data\":[203,429,10],\"color\":[226,165,86,128],\"score\":0.0318027},\n{\"type\":32, \"data\":[182,489,7],\"color\":[158,129,91,128],\"score\":0.0317922},\n{\"type\":32, \"data\":[265,491,10],\"color\":[143,110,72,128],\"score\":0.0317815},\n{\"type\":32, \"data\":[164,269,6],\"color\":[158,82,63,128],\"score\":0.0317696},\n{\"type\":32, \"data\":[355,347,4],\"color\":[175,146,110,128],\"score\":0.0317553},\n{\"type\":32, \"data\":[186,448,4],\"color\":[222,164,88,128],\"score\":0.0317424},\n{\"type\":32, \"data\":[390,388,3],\"color\":[125,134,135,128],\"score\":0.0317241},\n{\"type\":32, \"data\":[313,135,4],\"color\":[136,108,67,128],\"score\":0.0317097},\n{\"type\":32, \"data\":[229,224,6],\"color\":[160,128,110,128],\"score\":0.0316981},\n{\"type\":32, \"data\":[336,446,3],\"color\":[16,0,0,128],\"score\":0.0316835},\n{\"type\":32, \"data\":[274,88,4],\"color\":[232,204,148,128],\"score\":0.0316693},\n{\"type\":32, \"data\":[328,288,3],\"color\":[0,0,8,128],\"score\":0.0316534},\n{\"type\":32, \"data\":[394,224,24],\"color\":[4,3,18,128],\"score\":0.0316443},\n{\"type\":32, \"data\":[335,249,5],\"color\":[185,166,121,128],\"score\":0.0316326},\n{\"type\":32, \"data\":[303,134,3],\"color\":[22,18,28,128],\"score\":0.0316198},\n{\"type\":32, \"data\":[238,163,6],\"color\":[45,64,92,128],\"score\":0.0316081},\n{\"type\":32, \"data\":[336,307,3],\"color\":[243,211,156,128],\"score\":0.0315956},\n{\"type\":32, \"data\":[148,86,32],\"color\":[6,4,19,128],\"score\":0.0315841},\n{\"type\":32, \"data\":[148,262,3],\"color\":[254,209,179,128],\"score\":0.031564},\n{\"type\":32, \"data\":[386,371,3],\"color\":[54,53,61,128],\"score\":0.0315525},\n{\"type\":32, \"data\":[211,441,7],\"color\":[177,138,93,128],\"score\":0.03154},\n{\"type\":32, \"data\":[331,208,4],\"color\":[196,170,118,128],\"score\":0.0315355},\n{\"type\":32, \"data\":[239,89,4],\"color\":[251,204,136,128],\"score\":0.0315218},\n{\"type\":32, \"data\":[246,347,7],\"color\":[161,140,102,128],\"score\":0.031513},\n{\"type\":32, \"data\":[149,190,1],\"color\":[55,40,25,128],\"score\":0.0314983},\n{\"type\":32, \"data\":[309,111,5],\"color\":[133,123,99,128],\"score\":0.031488},\n{\"type\":32, \"data\":[364,293,5],\"color\":[243,219,188,128],\"score\":0.0314654},\n{\"type\":32, \"data\":[267,277,2],\"color\":[243,233,222,128],\"score\":0.0314454},\n{\"type\":32, \"data\":[291,79,9],\"color\":[237,209,159,128],\"score\":0.0314257},\n{\"type\":32, \"data\":[348,238,5],\"color\":[76,58,42,128],\"score\":0.0314107},\n{\"type\":32, \"data\":[240,50,19],\"color\":[4,4,19,128],\"score\":0.0314013},\n{\"type\":32, \"data\":[59,493,74],\"color\":[3,2,17,128],\"score\":0.0313869},\n{\"type\":32, \"data\":[162,247,3],\"color\":[61,28,20,128],\"score\":0.0313724},\n{\"type\":32, \"data\":[215,370,4],\"color\":[242,174,80,128],\"score\":0.0313596},\n{\"type\":32, \"data\":[252,156,3],\"color\":[28,6,1,128],\"score\":0.0313399},\n{\"type\":32, \"data\":[373,340,3],\"color\":[217,200,178,128],\"score\":0.0313123},\n{\"type\":32, \"data\":[199,229,9],\"color\":[239,191,176,128],\"score\":0.0313022},\n{\"type\":32, \"data\":[289,98,5],\"color\":[175,161,122,128],\"score\":0.0312908},\n{\"type\":32, \"data\":[390,312,4],\"color\":[115,123,130,128],\"score\":0.0312794},\n{\"type\":32, \"data\":[250,312,7],\"color\":[251,245,233,128],\"score\":0.031256},\n{\"type\":32, \"data\":[148,331,32],\"color\":[5,4,19,128],\"score\":0.0312456},\n{\"type\":32, \"data\":[168,447,6],\"color\":[179,142,87,128],\"score\":0.0312333},\n{\"type\":32, \"data\":[380,276,3],\"color\":[116,140,156,128],\"score\":0.0312158},\n{\"type\":32, \"data\":[154,482,9],\"color\":[149,126,97,128],\"score\":0.0312011},\n{\"type\":32, \"data\":[284,297,4],\"color\":[131,140,147,128],\"score\":0.0311849},\n{\"type\":32, \"data\":[220,166,3],\"color\":[140,174,211,128],\"score\":0.0311591},\n{\"type\":32, \"data\":[365,185,11],\"color\":[14,5,14,128],\"score\":0.0311501},\n{\"type\":32, \"data\":[169,457,8],\"color\":[148,130,100,128],\"score\":0.0311389},\n{\"type\":32, \"data\":[191,278,6],\"color\":[196,161,142,128],\"score\":0.0311288},\n{\"type\":32, \"data\":[278,316,4],\"color\":[80,69,50,128],\"score\":0.0311144},\n{\"type\":32, \"data\":[329,191,3],\"color\":[246,217,160,128],\"score\":0.0310914},\n{\"type\":32, \"data\":[325,311,8],\"color\":[60,51,42,128],\"score\":0.0310817},\n{\"type\":32, \"data\":[119,228,19],\"color\":[8,7,20,128],\"score\":0.0310694},\n{\"type\":32, \"data\":[333,361,6],\"color\":[30,9,0,128],\"score\":0.0310552},\n{\"type\":32, \"data\":[144,176,5],\"color\":[225,198,177,128],\"score\":0.0310446},\n{\"type\":32, \"data\":[181,429,8],\"color\":[152,133,103,128],\"score\":0.0310335},\n{\"type\":32, \"data\":[259,77,2],\"color\":[61,47,29,128],\"score\":0.0310128},\n{\"type\":32, \"data\":[236,373,4],\"color\":[144,126,100,128],\"score\":0.0310037},\n{\"type\":32, \"data\":[172,278,5],\"color\":[200,76,66,128],\"score\":0.0309913},\n{\"type\":32, \"data\":[333,228,5],\"color\":[181,161,119,128],\"score\":0.0309842},\n{\"type\":32, \"data\":[391,344,5],\"color\":[83,87,96,128],\"score\":0.030972},\n{\"type\":32, \"data\":[283,477,7],\"color\":[76,67,52,128],\"score\":0.0309624},\n{\"type\":32, \"data\":[249,501,8],\"color\":[87,73,51,128],\"score\":0.0309514},\n{\"type\":32, \"data\":[306,118,5],\"color\":[88,77,56,128],\"score\":0.0309364},\n{\"type\":32, \"data\":[356,295,3],\"color\":[101,78,58,128],\"score\":0.0309171},\n{\"type\":32, \"data\":[227,207,7],\"color\":[115,85,69,128],\"score\":0.0309068},\n{\"type\":32, \"data\":[353,199,3],\"color\":[172,153,120,128],\"score\":0.0308929},\n{\"type\":32, \"data\":[243,319,6],\"color\":[248,244,233,128],\"score\":0.0308781},\n{\"type\":32, \"data\":[344,303,5],\"color\":[172,146,106,128],\"score\":0.030865},\n{\"type\":32, \"data\":[299,316,11],\"color\":[59,49,39,128],\"score\":0.0308538},\n{\"type\":32, \"data\":[370,375,2],\"color\":[32,56,86,128],\"score\":0.0308428},\n{\"type\":32, \"data\":[383,364,6],\"color\":[78,91,107,128],\"score\":0.0308221},\n{\"type\":32, \"data\":[328,448,5],\"color\":[103,83,52,128],\"score\":0.0308043},\n{\"type\":32, \"data\":[273,290,4],\"color\":[139,142,135,128],\"score\":0.0307867},\n{\"type\":32, \"data\":[276,284,4],\"color\":[43,36,34,128],\"score\":0.0307728},\n{\"type\":32, \"data\":[191,195,3],\"color\":[246,205,188,128],\"score\":0.0307546},\n{\"type\":32, \"data\":[432,236,57],\"color\":[3,2,19,128],\"score\":0.0307425},\n{\"type\":32, \"data\":[165,278,3],\"color\":[243,192,180,128],\"score\":0.0307227},\n{\"type\":32, \"data\":[303,479,11],\"color\":[42,23,16,128],\"score\":0.030715},\n{\"type\":32, \"data\":[175,226,6],\"color\":[149,117,95,128],\"score\":0.0307035},\n{\"type\":32, \"data\":[207,359,6],\"color\":[150,129,94,128],\"score\":0.0306889},\n{\"type\":32, \"data\":[343,315,9],\"color\":[202,171,123,128],\"score\":0.0306811},\n{\"type\":32, \"data\":[249,294,11],\"color\":[98,79,61,128],\"score\":0.0306737},\n{\"type\":32, \"data\":[313,109,2],\"color\":[47,29,22,128],\"score\":0.0306559},\n{\"type\":32, \"data\":[243,77,5],\"color\":[163,152,111,128],\"score\":0.0306384},\n{\"type\":32, \"data\":[336,224,2],\"color\":[123,97,75,128],\"score\":0.0306262},\n{\"type\":32, \"data\":[335,182,2],\"color\":[183,144,89,128],\"score\":0.0306115},\n{\"type\":32, \"data\":[249,410,10],\"color\":[163,138,104,128],\"score\":0.0306027},\n{\"type\":32, \"data\":[72,111,34],\"color\":[9,8,23,128],\"score\":0.0305963},\n{\"type\":32, \"data\":[209,332,2],\"color\":[254,245,222,128],\"score\":0.030579},\n{\"type\":32, \"data\":[217,158,3],\"color\":[136,172,218,128],\"score\":0.0305631},\n{\"type\":32, \"data\":[145,293,10],\"color\":[8,8,20,128],\"score\":0.0305497},\n{\"type\":32, \"data\":[272,437,9],\"color\":[133,107,77,128],\"score\":0.0305422},\n{\"type\":32, \"data\":[292,285,6],\"color\":[14,1,18,128],\"score\":0.0305342},\n{\"type\":32, \"data\":[181,176,9],\"color\":[226,190,175,128],\"score\":0.0305237},\n{\"type\":32, \"data\":[334,211,2],\"color\":[119,89,70,128],\"score\":0.0305092},\n{\"type\":32, \"data\":[341,291,10],\"color\":[205,170,115,128],\"score\":0.0305007},\n{\"type\":32, \"data\":[259,95,4],\"color\":[255,217,154,128],\"score\":0.030491},\n{\"type\":32, \"data\":[155,414,20],\"color\":[2,1,18,128],\"score\":0.0304835},\n{\"type\":32, \"data\":[156,189,3],\"color\":[143,119,101,128],\"score\":0.0304713},\n{\"type\":32, \"data\":[240,94,2],\"color\":[79,92,89,128],\"score\":0.030459},\n{\"type\":32, \"data\":[353,322,4],\"color\":[169,133,96,128],\"score\":0.0304477},\n{\"type\":32, \"data\":[165,160,12],\"color\":[239,213,203,128],\"score\":0.0304396},\n{\"type\":32, \"data\":[155,194,3],\"color\":[28,11,0,128],\"score\":0.0304212},\n{\"type\":32, \"data\":[370,410,3],\"color\":[56,57,71,128],\"score\":0.0304075},\n{\"type\":32, \"data\":[347,341,6],\"color\":[233,209,155,128],\"score\":0.0303966},\n{\"type\":32, \"data\":[165,364,25],\"color\":[3,3,18,128],\"score\":0.0303865},\n{\"type\":32, \"data\":[200,165,4],\"color\":[200,162,113,128],\"score\":0.03037},\n{\"type\":32, \"data\":[232,319,7],\"color\":[240,234,225,128],\"score\":0.0303568},\n{\"type\":32, \"data\":[307,379,12],\"color\":[46,32,24,128],\"score\":0.0303491},\n{\"type\":32, \"data\":[259,85,6],\"color\":[204,184,142,128],\"score\":0.0303374},\n{\"type\":32, \"data\":[134,434,30],\"color\":[3,2,18,128],\"score\":0.0303311},\n{\"type\":32, \"data\":[289,236,4],\"color\":[52,60,82,128],\"score\":0.0303236},\n{\"type\":32, \"data\":[176,477,9],\"color\":[211,155,81,128],\"score\":0.0303141},\n{\"type\":32, \"data\":[158,147,3],\"color\":[108,134,162,128],\"score\":0.0302998},\n{\"type\":32, \"data\":[244,144,6],\"color\":[131,167,200,128],\"score\":0.0302887},\n{\"type\":32, \"data\":[318,103,4],\"color\":[180,155,115,128],\"score\":0.0302749},\n{\"type\":32, \"data\":[350,449,9],\"color\":[65,51,40,128],\"score\":0.0302642},\n{\"type\":32, \"data\":[372,334,3],\"color\":[228,213,179,128],\"score\":0.0302435},\n{\"type\":32, \"data\":[242,279,9],\"color\":[135,108,85,128],\"score\":0.0302335},\n{\"type\":32, \"data\":[367,354,3],\"color\":[100,77,53,128],\"score\":0.0302219},\n{\"type\":32, \"data\":[298,71,3],\"color\":[182,154,104,128],\"score\":0.0302117},\n{\"type\":32, \"data\":[289,158,4],\"color\":[40,28,30,128],\"score\":0.0302024},\n{\"type\":32, \"data\":[328,392,10],\"color\":[31,11,2,128],\"score\":0.0301923},\n{\"type\":32, \"data\":[368,312,3],\"color\":[247,227,203,128],\"score\":0.0301811},\n{\"type\":32, \"data\":[185,209,6],\"color\":[237,187,160,128],\"score\":0.0301709},\n{\"type\":32, \"data\":[368,208,6],\"color\":[43,34,43,128],\"score\":0.0301626},\n{\"type\":32, \"data\":[279,294,2],\"color\":[21,7,9,128],\"score\":0.030146},\n{\"type\":32, \"data\":[269,296,3],\"color\":[65,42,30,128],\"score\":0.0301342},\n{\"type\":32, \"data\":[219,429,5],\"color\":[173,141,93,128],\"score\":0.0301264},\n{\"type\":32, \"data\":[158,198,3],\"color\":[138,103,86,128],\"score\":0.0301129},\n{\"type\":32, \"data\":[157,245,2],\"color\":[86,49,30,128],\"score\":0.0301013},\n{\"type\":32, \"data\":[321,185,4],\"color\":[29,12,15,128],\"score\":0.0300893},\n{\"type\":32, \"data\":[217,230,7],\"color\":[211,165,141,128],\"score\":0.0300823},\n{\"type\":32, \"data\":[341,376,3],\"color\":[83,106,117,128],\"score\":0.0300614},\n{\"type\":32, \"data\":[325,325,10],\"color\":[42,28,20,128],\"score\":0.0300513},\n{\"type\":32, \"data\":[323,296,6],\"color\":[92,95,87,128],\"score\":0.0300332},\n{\"type\":32, \"data\":[356,176,5],\"color\":[40,19,13,128],\"score\":0.0300244},\n{\"type\":32, \"data\":[277,188,6],\"color\":[27,12,12,128],\"score\":0.030015},\n{\"type\":32, \"data\":[269,308,6],\"color\":[243,236,224,128],\"score\":0.0300009},\n{\"type\":32, \"data\":[352,272,3],\"color\":[74,58,37,128],\"score\":0.0299842},\n{\"type\":32, \"data\":[365,482,6],\"color\":[34,11,2,128],\"score\":0.0299763},\n{\"type\":32, \"data\":[325,141,4],\"color\":[236,199,134,128],\"score\":0.0299636},\n{\"type\":32, \"data\":[190,415,8],\"color\":[164,142,109,128],\"score\":0.029954},\n{\"type\":32, \"data\":[264,211,4],\"color\":[52,68,94,128],\"score\":0.0299434},\n{\"type\":32, \"data\":[204,265,6],\"color\":[172,144,124,128],\"score\":0.0299345},\n{\"type\":32, \"data\":[361,233,4],\"color\":[56,35,17,128],\"score\":0.0299256},\n{\"type\":32, \"data\":[228,123,5],\"color\":[107,140,184,128],\"score\":0.029917},\n{\"type\":32, \"data\":[196,202,3],\"color\":[220,221,207,128],\"score\":0.0299059},\n{\"type\":32, \"data\":[130,186,10],\"color\":[11,10,23,128],\"score\":0.0299062},\n{\"type\":32, \"data\":[208,308,2],\"color\":[203,188,164,128],\"score\":0.0298929},\n{\"type\":32, \"data\":[277,212,9],\"color\":[33,25,30,128],\"score\":0.0298825},\n{\"type\":32, \"data\":[347,320,3],\"color\":[252,217,150,128],\"score\":0.0298719},\n{\"type\":32, \"data\":[248,87,7],\"color\":[245,211,158,128],\"score\":0.0298667},\n{\"type\":32, \"data\":[362,389,5],\"color\":[205,203,168,128],\"score\":0.0298553},\n{\"type\":32, \"data\":[240,364,5],\"color\":[202,162,91,128],\"score\":0.029847},\n{\"type\":32, \"data\":[165,189,8],\"color\":[236,203,186,128],\"score\":0.0298331},\n{\"type\":32, \"data\":[346,292,2],\"color\":[137,106,75,128],\"score\":0.029823},\n{\"type\":32, \"data\":[381,280,2],\"color\":[141,164,176,128],\"score\":0.0298099},\n{\"type\":32, \"data\":[346,407,7],\"color\":[106,126,142,128],\"score\":0.0298038},\n{\"type\":32, \"data\":[249,191,4],\"color\":[45,62,88,128],\"score\":0.029793},\n{\"type\":32, \"data\":[230,74,8],\"color\":[9,8,19,128],\"score\":0.0297889},\n{\"type\":32, \"data\":[367,256,5],\"color\":[51,36,27,128],\"score\":0.0297676},\n{\"type\":32, \"data\":[24,270,29],\"color\":[2,1,18,128],\"score\":0.0297617},\n{\"type\":32, \"data\":[192,204,5],\"color\":[250,236,219,128],\"score\":0.0297402},\n{\"type\":32, \"data\":[21,5,56],\"color\":[3,2,18,128],\"score\":0.0297319},\n{\"type\":32, \"data\":[289,108,3],\"color\":[222,201,152,128],\"score\":0.0297223},\n{\"type\":32, \"data\":[325,131,3],\"color\":[207,186,134,128],\"score\":0.0297139},\n{\"type\":32, \"data\":[239,79,3],\"color\":[179,168,122,128],\"score\":0.0297008},\n{\"type\":32, \"data\":[412,367,2],\"color\":[66,92,114,128],\"score\":0.0296896},\n{\"type\":32, \"data\":[311,154,10],\"color\":[43,52,70,128],\"score\":0.0296791},\n{\"type\":32, \"data\":[335,221,2],\"color\":[125,103,76,128],\"score\":0.0296664},\n{\"type\":32, \"data\":[207,98,5],\"color\":[170,185,198,128],\"score\":0.0296533},\n{\"type\":32, \"data\":[326,158,4],\"color\":[213,180,134,128],\"score\":0.0296374},\n{\"type\":32, \"data\":[302,179,5],\"color\":[43,72,104,128],\"score\":0.029629},\n{\"type\":32, \"data\":[286,136,8],\"color\":[53,74,102,128],\"score\":0.0296219},\n{\"type\":32, \"data\":[151,270,3],\"color\":[233,207,200,128],\"score\":0.0296075},\n{\"type\":32, \"data\":[405,363,3],\"color\":[113,142,154,128],\"score\":0.0295946},\n{\"type\":32, \"data\":[348,159,4],\"color\":[125,111,84,128],\"score\":0.0295802},\n{\"type\":32, \"data\":[327,440,4],\"color\":[98,77,50,128],\"score\":0.0295721},\n{\"type\":32, \"data\":[230,139,7],\"color\":[133,165,204,128],\"score\":0.0295651},\n{\"type\":32, \"data\":[145,199,3],\"color\":[255,211,184,128],\"score\":0.0295525},\n{\"type\":32, \"data\":[396,360,9],\"color\":[205,198,169,128],\"score\":0.0295357},\n{\"type\":32, \"data\":[244,456,13],\"color\":[104,89,64,128],\"score\":0.0295289},\n{\"type\":32, \"data\":[176,449,7],\"color\":[151,132,105,128],\"score\":0.0295214},\n{\"type\":32, \"data\":[276,262,5],\"color\":[25,9,12,128],\"score\":0.0295149},\n{\"type\":32, \"data\":[134,462,18],\"color\":[5,4,19,128],\"score\":0.0295063},\n{\"type\":32, \"data\":[205,374,9],\"color\":[198,156,90,128],\"score\":0.0294972},\n{\"type\":32, \"data\":[368,511,9],\"color\":[32,8,0,128],\"score\":0.0294869},\n{\"type\":32, \"data\":[354,333,3],\"color\":[161,131,84,128],\"score\":0.029473},\n{\"type\":32, \"data\":[263,191,5],\"color\":[34,49,74,128],\"score\":0.0294642},\n{\"type\":32, \"data\":[230,303,9],\"color\":[121,98,78,128],\"score\":0.029452},\n{\"type\":32, \"data\":[378,271,2],\"color\":[128,143,154,128],\"score\":0.0294429},\n{\"type\":32, \"data\":[356,246,3],\"color\":[238,216,171,128],\"score\":0.0294292},\n{\"type\":32, \"data\":[424,320,27],\"color\":[5,4,19,128],\"score\":0.0294209},\n{\"type\":32, \"data\":[333,204,2],\"color\":[124,98,72,128],\"score\":0.0294092},\n{\"type\":32, \"data\":[302,223,11],\"color\":[33,32,41,128],\"score\":0.029403},\n{\"type\":32, \"data\":[325,150,4],\"color\":[211,183,130,128],\"score\":0.0293947},\n{\"type\":32, \"data\":[389,353,3],\"color\":[154,170,173,128],\"score\":0.0293806},\n{\"type\":32, \"data\":[248,339,6],\"color\":[184,152,104,128],\"score\":0.0293739},\n{\"type\":32, \"data\":[201,348,4],\"color\":[245,238,235,128],\"score\":0.029362},\n{\"type\":32, \"data\":[217,89,2],\"color\":[192,165,102,128],\"score\":0.0293507},\n{\"type\":32, \"data\":[314,0,68],\"color\":[3,2,19,128],\"score\":0.0293426},\n{\"type\":32, \"data\":[150,193,1],\"color\":[226,223,219,128],\"score\":0.0293254},\n{\"type\":32, \"data\":[340,233,2],\"color\":[255,235,159,128],\"score\":0.0293116},\n{\"type\":32, \"data\":[168,265,7],\"color\":[163,120,97,128],\"score\":0.029303},\n{\"type\":32, \"data\":[337,141,5],\"color\":[58,46,35,128],\"score\":0.0292917},\n{\"type\":32, \"data\":[178,511,5],\"color\":[121,93,69,128],\"score\":0.0292838},\n{\"type\":32, \"data\":[387,297,3],\"color\":[126,138,148,128],\"score\":0.0292726},\n{\"type\":32, \"data\":[269,176,3],\"color\":[18,1,2,128],\"score\":0.0292626},\n{\"type\":32, \"data\":[268,79,2],\"color\":[115,101,87,128],\"score\":0.0292516},\n{\"type\":32, \"data\":[259,282,5],\"color\":[88,69,54,128],\"score\":0.0292419},\n{\"type\":32, \"data\":[362,330,3],\"color\":[109,81,51,128],\"score\":0.0292317},\n{\"type\":32, \"data\":[304,171,4],\"color\":[43,25,27,128],\"score\":0.0292223},\n{\"type\":32, \"data\":[210,56,31],\"color\":[3,3,19,128],\"score\":0.0292098},\n{\"type\":32, \"data\":[260,151,3],\"color\":[31,70,117,128],\"score\":0.0291969},\n{\"type\":32, \"data\":[324,119,3],\"color\":[190,178,144,128],\"score\":0.0291865},\n{\"type\":32, \"data\":[329,456,5],\"color\":[97,79,50,128],\"score\":0.0291803},\n{\"type\":32, \"data\":[240,185,5],\"color\":[44,58,83,128],\"score\":0.0291716},\n{\"type\":32, \"data\":[318,138,4],\"color\":[87,71,53,128],\"score\":0.0291587},\n{\"type\":32, \"data\":[247,242,16],\"color\":[93,66,52,128],\"score\":0.0291526},\n{\"type\":32, \"data\":[235,172,5],\"color\":[35,25,31,128],\"score\":0.0291437},\n{\"type\":32, \"data\":[181,273,4],\"color\":[120,55,42,128],\"score\":0.0291321},\n{\"type\":32, \"data\":[309,297,7],\"color\":[157,146,133,128],\"score\":0.0291218},\n{\"type\":32, \"data\":[229,218,6],\"color\":[175,141,121,128],\"score\":0.0291149},\n{\"type\":32, \"data\":[185,263,6],\"color\":[184,159,130,128],\"score\":0.0291059},\n{\"type\":32, \"data\":[276,419,5],\"color\":[113,93,65,128],\"score\":0.0291004},\n{\"type\":32, \"data\":[368,334,3],\"color\":[128,118,94,128],\"score\":0.0290879},\n{\"type\":32, \"data\":[366,428,17],\"color\":[6,3,20,128],\"score\":0.0290805},\n{\"type\":32, \"data\":[286,89,2],\"color\":[122,103,79,128],\"score\":0.0290714},\n{\"type\":32, \"data\":[287,303,4],\"color\":[235,231,225,128],\"score\":0.0290584},\n{\"type\":32, \"data\":[139,183,2],\"color\":[133,106,85,128],\"score\":0.0290404},\n{\"type\":32, \"data\":[156,270,3],\"color\":[196,71,58,128],\"score\":0.0290293},\n{\"type\":32, \"data\":[187,475,5],\"color\":[162,132,88,128],\"score\":0.0290207},\n{\"type\":32, \"data\":[340,227,2],\"color\":[255,231,153,128],\"score\":0.0290083},\n{\"type\":32, \"data\":[164,117,1],\"color\":[181,188,203,128],\"score\":0.0289947},\n{\"type\":32, \"data\":[304,400,7],\"color\":[82,64,47,128],\"score\":0.0289867},\n{\"type\":32, \"data\":[184,287,6],\"color\":[142,122,98,128],\"score\":0.0289765},\n{\"type\":32, \"data\":[216,129,9],\"color\":[130,165,203,128],\"score\":0.028969},\n{\"type\":32, \"data\":[328,176,3],\"color\":[243,207,151,128],\"score\":0.0289505},\n{\"type\":32, \"data\":[224,361,11],\"color\":[211,163,90,128],\"score\":0.0289444},\n{\"type\":32, \"data\":[395,335,2],\"color\":[185,191,190,128],\"score\":0.0289299},\n{\"type\":32, \"data\":[322,200,5],\"color\":[4,3,24,128],\"score\":0.0289151},\n{\"type\":32, \"data\":[264,324,8],\"color\":[92,86,70,128],\"score\":0.0289041},\n{\"type\":32, \"data\":[228,165,3],\"color\":[32,28,38,128],\"score\":0.0288944},\n{\"type\":32, \"data\":[351,300,3],\"color\":[254,214,133,128],\"score\":0.0288805},\n{\"type\":32, \"data\":[366,90,31],\"color\":[5,4,20,128],\"score\":0.0288737},\n{\"type\":32, \"data\":[212,303,2],\"color\":[72,51,28,128],\"score\":0.0288639},\n{\"type\":32, \"data\":[323,341,14],\"color\":[42,27,18,128],\"score\":0.0288564},\n{\"type\":32, \"data\":[212,88,4],\"color\":[55,44,29,128],\"score\":0.0288492},\n{\"type\":32, \"data\":[351,317,3],\"color\":[167,130,94,128],\"score\":0.0288413},\n{\"type\":32, \"data\":[242,195,5],\"color\":[48,30,19,128],\"score\":0.0288323},\n{\"type\":32, \"data\":[358,284,2],\"color\":[232,220,193,128],\"score\":0.0288211},\n{\"type\":32, \"data\":[178,303,4],\"color\":[166,146,131,128],\"score\":0.0288097},\n{\"type\":32, \"data\":[359,194,4],\"color\":[57,47,44,128],\"score\":0.0288011},\n{\"type\":32, \"data\":[317,346,12],\"color\":[50,38,28,128],\"score\":0.0287955},\n{\"type\":32, \"data\":[330,205,3],\"color\":[241,216,152,128],\"score\":0.0287789},\n{\"type\":32, \"data\":[273,373,8],\"color\":[45,30,17,128],\"score\":0.0287717},\n{\"type\":32, \"data\":[221,400,10],\"color\":[187,152,92,128],\"score\":0.0287646},\n{\"type\":32, \"data\":[148,183,5],\"color\":[203,170,152,128],\"score\":0.0287565},\n{\"type\":32, \"data\":[301,75,3],\"color\":[168,141,103,128],\"score\":0.0287463},\n{\"type\":32, \"data\":[327,162,4],\"color\":[206,172,119,128],\"score\":0.0287396},\n{\"type\":32, \"data\":[384,314,5],\"color\":[73,75,85,128],\"score\":0.0287255},\n{\"type\":32, \"data\":[335,217,1],\"color\":[103,74,44,128],\"score\":0.0287164},\n{\"type\":32, \"data\":[277,105,3],\"color\":[240,206,143,128],\"score\":0.0287067},\n{\"type\":32, \"data\":[397,387,2],\"color\":[224,212,177,128],\"score\":0.0286982},\n{\"type\":32, \"data\":[215,332,7],\"color\":[241,233,217,128],\"score\":0.0286835},\n{\"type\":32, \"data\":[346,285,2],\"color\":[137,110,64,128],\"score\":0.0286735},\n{\"type\":32, \"data\":[375,372,3],\"color\":[187,200,182,128],\"score\":0.0286633},\n{\"type\":32, \"data\":[250,330,7],\"color\":[147,121,95,128],\"score\":0.028656},\n{\"type\":32, \"data\":[146,313,20],\"color\":[6,5,19,128],\"score\":0.0286493},\n{\"type\":32, \"data\":[295,421,5],\"color\":[39,26,21,128],\"score\":0.0286426},\n{\"type\":32, \"data\":[388,304,3],\"color\":[118,137,144,128],\"score\":0.0286315},\n{\"type\":32, \"data\":[188,443,3],\"color\":[216,168,92,128],\"score\":0.0286253},\n{\"type\":32, \"data\":[223,310,6],\"color\":[154,122,91,128],\"score\":0.0286162},\n{\"type\":32, \"data\":[221,291,9],\"color\":[150,120,96,128],\"score\":0.0286078},\n{\"type\":32, \"data\":[374,253,3],\"color\":[102,119,135,128],\"score\":0.0285957},\n{\"type\":32, \"data\":[334,285,3],\"color\":[248,224,160,128],\"score\":0.0285844},\n{\"type\":32, \"data\":[409,364,3],\"color\":[56,84,113,128],\"score\":0.0285731},\n{\"type\":32, \"data\":[341,248,2],\"color\":[255,221,146,128],\"score\":0.0285613},\n{\"type\":32, \"data\":[275,142,6],\"color\":[49,57,71,128],\"score\":0.0285522},\n{\"type\":32, \"data\":[189,380,3],\"color\":[135,127,111,128],\"score\":0.0285445}\n]}";
ShapeDatasets.mountain_green_landscape = "{\"shapes\":\n[{\"type\":1, \"data\":[0,0,512,341],\"color\":[75,104,91,255],\"score\":0.211314},\n{\"type\":32, \"data\":[128,97,31],\"color\":[216,225,229,255],\"score\":0.202769},\n{\"type\":32, \"data\":[204,92,32],\"color\":[200,209,216,255],\"score\":0.195317},\n{\"type\":32, \"data\":[277,79,31],\"color\":[180,195,207,255],\"score\":0.189718},\n{\"type\":32, \"data\":[32,97,32],\"color\":[137,197,224,255],\"score\":0.184037},\n{\"type\":32, \"data\":[332,72,32],\"color\":[154,180,203,255],\"score\":0.179713},\n{\"type\":32, \"data\":[85,105,25],\"color\":[185,209,221,255],\"score\":0.176175},\n{\"type\":32, \"data\":[235,60,24],\"color\":[193,204,213,255],\"score\":0.172874},\n{\"type\":32, \"data\":[55,56,32],\"color\":[55,153,213,255],\"score\":0.169424},\n{\"type\":32, \"data\":[110,30,31],\"color\":[7,88,183,255],\"score\":0.166853},\n{\"type\":32, \"data\":[172,25,32],\"color\":[7,70,168,255],\"score\":0.16454},\n{\"type\":32, \"data\":[26,27,30],\"color\":[9,111,198,255],\"score\":0.162368},\n{\"type\":32, \"data\":[176,83,28],\"color\":[186,205,218,255],\"score\":0.160106},\n{\"type\":32, \"data\":[248,96,31],\"color\":[170,189,203,255],\"score\":0.15788},\n{\"type\":32, \"data\":[480,212,32],\"color\":[43,65,25,255],\"score\":0.156341},\n{\"type\":32, \"data\":[310,29,32],\"color\":[71,122,168,255],\"score\":0.154768},\n{\"type\":32, \"data\":[419,193,32],\"color\":[52,73,26,255],\"score\":0.15347},\n{\"type\":32, \"data\":[241,17,22],\"color\":[7,61,154,255],\"score\":0.152378},\n{\"type\":32, \"data\":[365,41,27],\"color\":[50,112,168,255],\"score\":0.151266},\n{\"type\":32, \"data\":[377,75,19],\"color\":[154,167,173,255],\"score\":0.150009},\n{\"type\":32, \"data\":[31,308,32],\"color\":[52,81,35,255],\"score\":0.149026},\n{\"type\":32, \"data\":[305,173,32],\"color\":[65,85,31,255],\"score\":0.148062},\n{\"type\":32, \"data\":[456,270,31],\"color\":[52,64,43,255],\"score\":0.147091},\n{\"type\":32, \"data\":[69,17,31],\"color\":[7,91,186,255],\"score\":0.146069},\n{\"type\":32, \"data\":[0,60,26],\"color\":[40,155,217,255],\"score\":0.145182},\n{\"type\":32, \"data\":[363,184,30],\"color\":[63,84,28,255],\"score\":0.144273},\n{\"type\":32, \"data\":[278,261,32],\"color\":[65,91,33,255],\"score\":0.143383},\n{\"type\":32, \"data\":[212,260,31],\"color\":[64,90,35,255],\"score\":0.142604},\n{\"type\":32, \"data\":[242,163,28],\"color\":[65,85,26,255],\"score\":0.141729},\n{\"type\":32, \"data\":[245,312,32],\"color\":[60,86,36,255],\"score\":0.140874},\n{\"type\":32, \"data\":[360,269,32],\"color\":[63,90,33,255],\"score\":0.139949},\n{\"type\":32, \"data\":[441,88,20],\"color\":[130,148,162,255],\"score\":0.138956},\n{\"type\":32, \"data\":[479,139,28],\"color\":[51,63,40,255],\"score\":0.138023},\n{\"type\":32, \"data\":[207,21,26],\"color\":[8,63,160,255],\"score\":0.137189},\n{\"type\":32, \"data\":[125,308,29],\"color\":[54,74,47,255],\"score\":0.136497},\n{\"type\":32, \"data\":[94,257,32],\"color\":[60,86,43,255],\"score\":0.135768},\n{\"type\":32, \"data\":[112,112,23],\"color\":[204,220,228,255],\"score\":0.135001},\n{\"type\":32, \"data\":[161,44,32],\"color\":[25,99,184,255],\"score\":0.134321},\n{\"type\":32, \"data\":[417,150,24],\"color\":[71,89,24,255],\"score\":0.133654},\n{\"type\":32, \"data\":[94,69,17],\"color\":[53,149,208,255],\"score\":0.132672},\n{\"type\":32, \"data\":[464,8,26],\"color\":[47,57,45,255],\"score\":0.132045},\n{\"type\":32, \"data\":[311,308,31],\"color\":[62,90,40,255],\"score\":0.131314},\n{\"type\":32, \"data\":[270,25,24],\"color\":[25,89,169,255],\"score\":0.13056},\n{\"type\":32, \"data\":[393,32,19],\"color\":[17,99,185,255],\"score\":0.129833},\n{\"type\":32, \"data\":[481,74,24],\"color\":[38,56,60,255],\"score\":0.129136},\n{\"type\":32, \"data\":[184,312,32],\"color\":[62,87,42,255],\"score\":0.128407},\n{\"type\":32, \"data\":[213,109,20],\"color\":[195,206,214,255],\"score\":0.127766},\n{\"type\":32, \"data\":[62,141,27],\"color\":[46,94,101,255],\"score\":0.127069},\n{\"type\":32, \"data\":[154,251,30],\"color\":[65,92,41,255],\"score\":0.126411},\n{\"type\":32, \"data\":[63,59,11],\"color\":[203,219,228,255],\"score\":0.125547},\n{\"type\":32, \"data\":[215,62,15],\"color\":[227,227,227,255],\"score\":0.124996},\n{\"type\":32, \"data\":[24,166,31],\"color\":[53,76,57,255],\"score\":0.124426},\n{\"type\":32, \"data\":[188,180,30],\"color\":[64,88,47,255],\"score\":0.123868},\n{\"type\":32, \"data\":[76,319,27],\"color\":[58,83,41,255],\"score\":0.123361},\n{\"type\":32, \"data\":[404,292,32],\"color\":[64,89,43,255],\"score\":0.122792},\n{\"type\":32, \"data\":[329,145,20],\"color\":[128,137,67,255],\"score\":0.122269},\n{\"type\":32, \"data\":[32,246,32],\"color\":[61,88,49,255],\"score\":0.121639},\n{\"type\":32, \"data\":[366,111,23],\"color\":[55,75,61,255],\"score\":0.121164},\n{\"type\":32, \"data\":[47,104,15],\"color\":[226,235,238,255],\"score\":0.120542},\n{\"type\":32, \"data\":[477,318,31],\"color\":[69,89,54,255],\"score\":0.120162},\n{\"type\":32, \"data\":[129,190,31],\"color\":[65,86,56,255],\"score\":0.119716},\n{\"type\":32, \"data\":[371,1,22],\"color\":[19,56,67,255],\"score\":0.119175},\n{\"type\":32, \"data\":[429,54,17],\"color\":[34,57,40,255],\"score\":0.118641},\n{\"type\":32, \"data\":[271,137,13],\"color\":[151,142,65,255],\"score\":0.118264},\n{\"type\":32, \"data\":[416,27,12],\"color\":[149,165,169,255],\"score\":0.117646},\n{\"type\":32, \"data\":[324,78,20],\"color\":[211,217,221,255],\"score\":0.117062},\n{\"type\":32, \"data\":[122,66,9],\"color\":[178,208,225,255],\"score\":0.116699},\n{\"type\":32, \"data\":[155,92,19],\"color\":[229,232,231,255],\"score\":0.11628},\n{\"type\":32, \"data\":[324,263,31],\"color\":[64,92,33,255],\"score\":0.115915},\n{\"type\":32, \"data\":[153,7,32],\"color\":[6,64,163,255],\"score\":0.115499},\n{\"type\":32, \"data\":[76,168,21],\"color\":[55,79,49,255],\"score\":0.115137},\n{\"type\":32, \"data\":[81,56,8],\"color\":[191,212,225,255],\"score\":0.114717},\n{\"type\":32, \"data\":[294,131,15],\"color\":[137,132,88,255],\"score\":0.114418},\n{\"type\":32, \"data\":[435,7,20],\"color\":[52,67,59,255],\"score\":0.114061},\n{\"type\":32, \"data\":[493,112,13],\"color\":[85,129,155,255],\"score\":0.113678},\n{\"type\":32, \"data\":[209,144,16],\"color\":[135,138,77,255],\"score\":0.113314},\n{\"type\":32, \"data\":[362,326,31],\"color\":[69,92,50,255],\"score\":0.112991},\n{\"type\":32, \"data\":[380,153,20],\"color\":[79,100,34,255],\"score\":0.112746},\n{\"type\":32, \"data\":[404,104,16],\"color\":[50,66,55,255],\"score\":0.112488},\n{\"type\":32, \"data\":[352,36,7],\"color\":[178,200,218,255],\"score\":0.1121},\n{\"type\":32, \"data\":[283,0,13],\"color\":[126,162,195,255],\"score\":0.111753},\n{\"type\":32, \"data\":[331,24,8],\"color\":[185,196,203,255],\"score\":0.111371},\n{\"type\":32, \"data\":[20,121,11],\"color\":[200,218,226,255],\"score\":0.110993},\n{\"type\":32, \"data\":[40,132,12],\"color\":[42,107,141,255],\"score\":0.110781},\n{\"type\":32, \"data\":[497,47,14],\"color\":[76,124,152,255],\"score\":0.110431},\n{\"type\":32, \"data\":[253,44,7],\"color\":[208,214,218,255],\"score\":0.110094},\n{\"type\":32, \"data\":[173,66,13],\"color\":[96,156,202,255],\"score\":0.109549},\n{\"type\":32, \"data\":[467,165,26],\"color\":[80,89,35,255],\"score\":0.1093},\n{\"type\":32, \"data\":[404,78,11],\"color\":[110,142,162,255],\"score\":0.109032},\n{\"type\":32, \"data\":[155,136,21],\"color\":[88,123,123,255],\"score\":0.108728},\n{\"type\":32, \"data\":[71,204,32],\"color\":[72,93,63,255],\"score\":0.10849},\n{\"type\":32, \"data\":[256,216,32],\"color\":[71,95,60,255],\"score\":0.108275},\n{\"type\":32, \"data\":[405,4,14],\"color\":[13,56,94,255],\"score\":0.108067},\n{\"type\":32, \"data\":[65,283,26],\"color\":[58,87,40,255],\"score\":0.107861},\n{\"type\":32, \"data\":[468,103,9],\"color\":[33,33,35,255],\"score\":0.107613},\n{\"type\":32, \"data\":[464,56,15],\"color\":[37,50,32,255],\"score\":0.107311},\n{\"type\":32, \"data\":[416,248,28],\"color\":[67,94,55,255],\"score\":0.107117},\n{\"type\":32, \"data\":[450,166,10],\"color\":[140,139,44,255],\"score\":0.106914},\n{\"type\":32, \"data\":[488,172,11],\"color\":[133,142,45,255],\"score\":0.106672},\n{\"type\":32, \"data\":[457,37,6],\"color\":[171,178,178,255],\"score\":0.106385},\n{\"type\":32, \"data\":[422,327,32],\"color\":[72,93,54,255],\"score\":0.106187},\n{\"type\":32, \"data\":[339,3,14],\"color\":[45,77,69,255],\"score\":0.105956},\n{\"type\":32, \"data\":[225,46,6],\"color\":[72,140,191,255],\"score\":0.105734},\n{\"type\":32, \"data\":[500,283,20],\"color\":[60,71,53,255],\"score\":0.105515},\n{\"type\":32, \"data\":[500,90,12],\"color\":[42,63,43,255],\"score\":0.105336},\n{\"type\":32, \"data\":[15,194,30],\"color\":[68,88,63,255],\"score\":0.105153},\n{\"type\":32, \"data\":[268,321,30],\"color\":[59,86,35,255],\"score\":0.104989},\n{\"type\":32, \"data\":[292,84,17],\"color\":[215,219,222,255],\"score\":0.104772},\n{\"type\":32, \"data\":[80,138,16],\"color\":[66,115,132,255],\"score\":0.104537},\n{\"type\":32, \"data\":[0,297,32],\"color\":[53,82,35,255],\"score\":0.104375},\n{\"type\":32, \"data\":[410,39,7],\"color\":[22,79,94,255],\"score\":0.104226},\n{\"type\":32, \"data\":[187,213,29],\"color\":[70,94,57,255],\"score\":0.104068},\n{\"type\":32, \"data\":[374,49,9],\"color\":[19,70,90,255],\"score\":0.103825},\n{\"type\":32, \"data\":[499,0,11],\"color\":[31,43,35,255],\"score\":0.103645},\n{\"type\":32, \"data\":[508,173,13],\"color\":[118,127,43,255],\"score\":0.103498},\n{\"type\":32, \"data\":[255,261,29],\"color\":[63,89,33,255],\"score\":0.103374},\n{\"type\":32, \"data\":[450,201,23],\"color\":[39,62,22,255],\"score\":0.103211},\n{\"type\":32, \"data\":[351,82,11],\"color\":[206,211,213,255],\"score\":0.103044},\n{\"type\":32, \"data\":[502,144,18],\"color\":[39,52,29,255],\"score\":0.102864},\n{\"type\":32, \"data\":[194,50,11],\"color\":[36,113,187,255],\"score\":0.102669},\n{\"type\":32, \"data\":[64,96,11],\"color\":[226,232,235,255],\"score\":0.102423},\n{\"type\":32, \"data\":[19,5,20],\"color\":[7,90,185,255],\"score\":0.102274},\n{\"type\":32, \"data\":[407,60,9],\"color\":[34,51,34,255],\"score\":0.102084},\n{\"type\":32, \"data\":[129,216,28],\"color\":[71,94,58,255],\"score\":0.101954},\n{\"type\":32, \"data\":[130,336,31],\"color\":[65,86,47,255],\"score\":0.101798},\n{\"type\":32, \"data\":[339,48,8],\"color\":[16,110,192,255],\"score\":0.101613},\n{\"type\":32, \"data\":[483,61,6],\"color\":[66,111,136,255],\"score\":0.101492},\n{\"type\":32, \"data\":[288,116,12],\"color\":[117,128,137,255],\"score\":0.101373},\n{\"type\":32, \"data\":[214,314,31],\"color\":[61,87,37,255],\"score\":0.101254},\n{\"type\":32, \"data\":[170,127,17],\"color\":[78,118,142,255],\"score\":0.101089},\n{\"type\":32, \"data\":[181,100,13],\"color\":[231,229,227,255],\"score\":0.100932},\n{\"type\":32, \"data\":[44,77,13],\"color\":[18,154,216,255],\"score\":0.100755},\n{\"type\":32, \"data\":[306,217,20],\"color\":[72,96,65,255],\"score\":0.100648},\n{\"type\":32, \"data\":[377,224,20],\"color\":[66,90,64,255],\"score\":0.10054},\n{\"type\":32, \"data\":[51,57,6],\"color\":[219,227,232,255],\"score\":0.100282},\n{\"type\":32, \"data\":[427,166,14],\"color\":[96,107,29,255],\"score\":0.10016},\n{\"type\":32, \"data\":[503,203,20],\"color\":[40,63,24,255],\"score\":0.100049},\n{\"type\":32, \"data\":[179,296,29],\"color\":[61,87,45,255],\"score\":0.0999493},\n{\"type\":32, \"data\":[348,110,14],\"color\":[57,80,68,255],\"score\":0.0998543},\n{\"type\":32, \"data\":[278,61,15],\"color\":[162,184,202,255],\"score\":0.0997365},\n{\"type\":32, \"data\":[148,154,9],\"color\":[133,148,80,255],\"score\":0.0996067},\n{\"type\":32, \"data\":[442,32,6],\"color\":[175,181,180,255],\"score\":0.0993093},\n{\"type\":32, \"data\":[110,127,12],\"color\":[155,189,210,255],\"score\":0.0991779},\n{\"type\":32, \"data\":[468,156,11],\"color\":[38,43,27,255],\"score\":0.0990176},\n{\"type\":32, \"data\":[30,65,12],\"color\":[11,142,212,255],\"score\":0.0988945},\n{\"type\":32, \"data\":[322,18,6],\"color\":[178,192,206,255],\"score\":0.0987186},\n{\"type\":32, \"data\":[494,250,19],\"color\":[68,91,58,255],\"score\":0.0986246},\n{\"type\":32, \"data\":[446,136,9],\"color\":[42,68,29,255],\"score\":0.0984804},\n{\"type\":32, \"data\":[22,86,11],\"color\":[174,213,230,255],\"score\":0.098361},\n{\"type\":32, \"data\":[456,106,4],\"color\":[152,170,185,255],\"score\":0.0982595},\n{\"type\":32, \"data\":[354,68,10],\"color\":[143,169,188,255],\"score\":0.0981247},\n{\"type\":32, \"data\":[448,55,9],\"color\":[27,43,19,255],\"score\":0.0980119},\n{\"type\":32, \"data\":[258,178,12],\"color\":[40,60,25,255],\"score\":0.0979006},\n{\"type\":32, \"data\":[64,127,14],\"color\":[32,103,145,255],\"score\":0.0977464},\n{\"type\":32, \"data\":[504,23,13],\"color\":[39,83,109,255],\"score\":0.0976381},\n{\"type\":32, \"data\":[75,77,8],\"color\":[13,144,212,255],\"score\":0.0975031},\n{\"type\":32, \"data\":[101,102,17],\"color\":[228,234,236,255],\"score\":0.0973618},\n{\"type\":32, \"data\":[130,65,6],\"color\":[151,190,215,255],\"score\":0.0972336},\n{\"type\":32, \"data\":[34,114,7],\"color\":[245,247,245,255],\"score\":0.0970906},\n{\"type\":32, \"data\":[344,38,4],\"color\":[182,200,216,255],\"score\":0.0969932},\n{\"type\":32, \"data\":[110,66,7],\"color\":[99,168,212,255],\"score\":0.0968725},\n{\"type\":32, \"data\":[301,178,24],\"color\":[48,71,28,255],\"score\":0.0967839},\n{\"type\":32, \"data\":[477,80,13],\"color\":[22,29,30,255],\"score\":0.0966738},\n{\"type\":32, \"data\":[378,114,19],\"color\":[47,66,53,255],\"score\":0.0966023},\n{\"type\":32, \"data\":[453,73,8],\"color\":[118,146,168,255],\"score\":0.0964627},\n{\"type\":32, \"data\":[313,130,14],\"color\":[128,127,90,255],\"score\":0.096359},\n{\"type\":32, \"data\":[448,11,5],\"color\":[145,150,136,255],\"score\":0.0961608},\n{\"type\":32, \"data\":[469,32,8],\"color\":[29,30,30,255],\"score\":0.0960387},\n{\"type\":32, \"data\":[6,149,13],\"color\":[37,62,32,255],\"score\":0.0959577},\n{\"type\":32, \"data\":[122,80,12],\"color\":[248,248,246,255],\"score\":0.0958204},\n{\"type\":32, \"data\":[21,136,6],\"color\":[32,111,147,255],\"score\":0.0957178},\n{\"type\":32, \"data\":[48,159,10],\"color\":[26,51,27,255],\"score\":0.095615},\n{\"type\":32, \"data\":[151,67,9],\"color\":[60,143,202,255],\"score\":0.0954883},\n{\"type\":32, \"data\":[211,94,8],\"color\":[131,167,192,255],\"score\":0.0953468},\n{\"type\":32, \"data\":[501,78,4],\"color\":[113,145,163,255],\"score\":0.0952091},\n{\"type\":32, \"data\":[100,3,22],\"color\":[7,70,169,255],\"score\":0.0951272},\n{\"type\":32, \"data\":[102,138,8],\"color\":[94,130,144,255],\"score\":0.095052},\n{\"type\":32, \"data\":[128,43,16],\"color\":[7,96,189,255],\"score\":0.0949759},\n{\"type\":32, \"data\":[103,170,9],\"color\":[46,64,32,255],\"score\":0.0948715},\n{\"type\":32, \"data\":[192,131,9],\"color\":[114,131,139,255],\"score\":0.0947765},\n{\"type\":32, \"data\":[311,25,7],\"color\":[59,81,91,255],\"score\":0.094645},\n{\"type\":32, \"data\":[44,37,16],\"color\":[13,127,207,255],\"score\":0.0945489},\n{\"type\":32, \"data\":[0,93,8],\"color\":[142,199,228,255],\"score\":0.0944642},\n{\"type\":32, \"data\":[354,151,12],\"color\":[104,125,61,255],\"score\":0.0943837},\n{\"type\":32, \"data\":[507,65,7],\"color\":[27,49,48,255],\"score\":0.0942856},\n{\"type\":32, \"data\":[270,159,10],\"color\":[100,113,26,255],\"score\":0.0942034},\n{\"type\":32, \"data\":[463,262,12],\"color\":[34,34,31,255],\"score\":0.0941344},\n{\"type\":32, \"data\":[218,154,8],\"color\":[92,108,30,255],\"score\":0.0940591},\n{\"type\":32, \"data\":[233,5,30],\"color\":[6,55,150,255],\"score\":0.0939797},\n{\"type\":32, \"data\":[202,69,11],\"color\":[236,234,232,255],\"score\":0.0938654},\n{\"type\":32, \"data\":[467,173,10],\"color\":[51,50,39,255],\"score\":0.0937887},\n{\"type\":32, \"data\":[426,90,5],\"color\":[80,99,108,255],\"score\":0.0937138},\n{\"type\":32, \"data\":[216,47,5],\"color\":[153,175,198,255],\"score\":0.0936138},\n{\"type\":32, \"data\":[128,170,9],\"color\":[37,61,25,255],\"score\":0.0935448},\n{\"type\":32, \"data\":[374,0,6],\"color\":[15,104,156,255],\"score\":0.0934695},\n{\"type\":32, \"data\":[431,96,4],\"color\":[206,208,211,255],\"score\":0.0933934},\n{\"type\":32, \"data\":[127,256,27],\"color\":[61,89,42,255],\"score\":0.0933314},\n{\"type\":32, \"data\":[13,33,20],\"color\":[6,119,205,255],\"score\":0.0932711},\n{\"type\":32, \"data\":[3,57,6],\"color\":[148,198,224,255],\"score\":0.0931174},\n{\"type\":32, \"data\":[296,46,9],\"color\":[24,101,181,255],\"score\":0.0930316},\n{\"type\":32, \"data\":[332,215,20],\"color\":[71,96,69,255],\"score\":0.0929586},\n{\"type\":32, \"data\":[482,39,4],\"color\":[170,178,174,255],\"score\":0.0928396},\n{\"type\":32, \"data\":[271,38,11],\"color\":[9,70,162,255],\"score\":0.0927781},\n{\"type\":32, \"data\":[469,118,10],\"color\":[36,37,36,255],\"score\":0.092698},\n{\"type\":32, \"data\":[195,175,8],\"color\":[33,51,22,255],\"score\":0.0926298},\n{\"type\":32, \"data\":[84,114,7],\"color\":[240,243,243,255],\"score\":0.0925595},\n{\"type\":32, \"data\":[230,125,5],\"color\":[127,138,131,255],\"score\":0.0924858},\n{\"type\":32, \"data\":[283,61,6],\"color\":[83,141,185,255],\"score\":0.0923742},\n{\"type\":32, \"data\":[25,337,20],\"color\":[48,75,32,255],\"score\":0.0923134},\n{\"type\":32, \"data\":[325,36,7],\"color\":[92,105,111,255],\"score\":0.0922279},\n{\"type\":32, \"data\":[179,34,21],\"color\":[7,75,172,255],\"score\":0.0921616},\n{\"type\":32, \"data\":[352,134,14],\"color\":[76,106,100,255],\"score\":0.0920832},\n{\"type\":32, \"data\":[269,105,10],\"color\":[205,212,217,255],\"score\":0.0919876},\n{\"type\":32, \"data\":[87,148,10],\"color\":[97,127,105,255],\"score\":0.0919056},\n{\"type\":32, \"data\":[358,51,10],\"color\":[9,105,192,255],\"score\":0.0917934},\n{\"type\":32, \"data\":[115,292,14],\"color\":[38,52,46,255],\"score\":0.0917324},\n{\"type\":32, \"data\":[173,160,11],\"color\":[86,115,71,255],\"score\":0.0916693},\n{\"type\":32, \"data\":[11,104,10],\"color\":[103,184,223,255],\"score\":0.0916093},\n{\"type\":32, \"data\":[368,81,6],\"color\":[211,216,217,255],\"score\":0.0915071},\n{\"type\":32, \"data\":[18,82,7],\"color\":[132,197,224,255],\"score\":0.0914481},\n{\"type\":32, \"data\":[258,86,14],\"color\":[149,176,198,255],\"score\":0.0913938},\n{\"type\":32, \"data\":[385,53,6],\"color\":[36,63,63,255],\"score\":0.0912631},\n{\"type\":32, \"data\":[439,94,5],\"color\":[188,199,205,255],\"score\":0.0911903},\n{\"type\":32, \"data\":[237,146,15],\"color\":[82,97,30,255],\"score\":0.091124},\n{\"type\":32, \"data\":[503,314,27],\"color\":[73,93,58,255],\"score\":0.0910624},\n{\"type\":32, \"data\":[329,149,11],\"color\":[160,160,54,255],\"score\":0.0909849},\n{\"type\":32, \"data\":[471,14,12],\"color\":[27,35,25,255],\"score\":0.0909196},\n{\"type\":32, \"data\":[348,0,6],\"color\":[48,123,153,255],\"score\":0.0908483},\n{\"type\":32, \"data\":[402,196,19],\"color\":[41,63,25,255],\"score\":0.0907921},\n{\"type\":32, \"data\":[506,110,9],\"color\":[46,116,158,255],\"score\":0.0907246},\n{\"type\":32, \"data\":[67,159,13],\"color\":[41,68,36,255],\"score\":0.0906582},\n{\"type\":32, \"data\":[420,0,11],\"color\":[18,42,43,255],\"score\":0.0905965},\n{\"type\":32, \"data\":[315,37,8],\"color\":[123,141,154,255],\"score\":0.0905127},\n{\"type\":32, \"data\":[428,242,24],\"color\":[70,96,62,255],\"score\":0.0904623},\n{\"type\":32, \"data\":[484,106,6],\"color\":[126,164,189,255],\"score\":0.0903676},\n{\"type\":32, \"data\":[232,89,8],\"color\":[119,160,191,255],\"score\":0.0902806},\n{\"type\":32, \"data\":[90,77,11],\"color\":[23,141,208,255],\"score\":0.0901972},\n{\"type\":32, \"data\":[293,26,7],\"color\":[73,141,196,255],\"score\":0.0901407},\n{\"type\":32, \"data\":[329,68,13],\"color\":[193,203,211,255],\"score\":0.0900615},\n{\"type\":32, \"data\":[334,106,6],\"color\":[76,115,142,255],\"score\":0.0899874},\n{\"type\":32, \"data\":[9,116,5],\"color\":[180,212,224,255],\"score\":0.0899002},\n{\"type\":32, \"data\":[138,98,8],\"color\":[184,203,211,255],\"score\":0.089841},\n{\"type\":32, \"data\":[276,77,12],\"color\":[200,207,214,255],\"score\":0.0897671},\n{\"type\":32, \"data\":[385,32,15],\"color\":[8,96,193,255],\"score\":0.0896979},\n{\"type\":32, \"data\":[103,50,12],\"color\":[8,110,196,255],\"score\":0.0896407},\n{\"type\":32, \"data\":[422,32,6],\"color\":[202,204,198,255],\"score\":0.0895389},\n{\"type\":32, \"data\":[361,34,5],\"color\":[133,178,213,255],\"score\":0.0894534},\n{\"type\":32, \"data\":[210,114,14],\"color\":[216,219,222,255],\"score\":0.0894013},\n{\"type\":32, \"data\":[427,43,5],\"color\":[46,104,106,255],\"score\":0.0893337},\n{\"type\":32, \"data\":[246,46,8],\"color\":[236,234,233,255],\"score\":0.0892546},\n{\"type\":32, \"data\":[307,106,11],\"color\":[66,98,129,255],\"score\":0.0891781},\n{\"type\":32, \"data\":[243,108,6],\"color\":[105,150,183,255],\"score\":0.0890921},\n{\"type\":32, \"data\":[327,86,12],\"color\":[232,233,233,255],\"score\":0.0890367},\n{\"type\":32, \"data\":[493,38,5],\"color\":[141,168,188,255],\"score\":0.0889594},\n{\"type\":32, \"data\":[456,340,16],\"color\":[49,71,38,255],\"score\":0.0889065},\n{\"type\":32, \"data\":[467,95,8],\"color\":[33,35,33,255],\"score\":0.0888609},\n{\"type\":32, \"data\":[193,147,8],\"color\":[56,85,61,255],\"score\":0.0887781},\n{\"type\":32, \"data\":[23,236,32],\"color\":[62,88,51,255],\"score\":0.0887336},\n{\"type\":32, \"data\":[284,151,9],\"color\":[70,88,25,255],\"score\":0.0886799},\n{\"type\":32, \"data\":[227,204,20],\"color\":[70,96,69,255],\"score\":0.0886377},\n{\"type\":32, \"data\":[304,85,11],\"color\":[227,230,231,255],\"score\":0.0886018},\n{\"type\":32, \"data\":[317,52,7],\"color\":[12,94,184,255],\"score\":0.0885199},\n{\"type\":32, \"data\":[435,87,3],\"color\":[53,72,75,255],\"score\":0.0884509},\n{\"type\":32, \"data\":[493,18,8],\"color\":[70,108,129,255],\"score\":0.0883842},\n{\"type\":32, \"data\":[187,0,32],\"color\":[5,55,153,255],\"score\":0.0883522},\n{\"type\":32, \"data\":[91,60,4],\"color\":[173,200,220,255],\"score\":0.0882603},\n{\"type\":32, \"data\":[219,134,7],\"color\":[161,153,112,255],\"score\":0.0881824},\n{\"type\":32, \"data\":[412,78,11],\"color\":[92,126,145,255],\"score\":0.0881361},\n{\"type\":32, \"data\":[417,163,12],\"color\":[102,112,27,255],\"score\":0.0880924},\n{\"type\":32, \"data\":[204,52,3],\"color\":[170,187,203,255],\"score\":0.088046},\n{\"type\":32, \"data\":[24,92,5],\"color\":[237,243,244,255],\"score\":0.0879947},\n{\"type\":32, \"data\":[13,58,5],\"color\":[131,191,224,255],\"score\":0.0879002},\n{\"type\":32, \"data\":[264,7,9],\"color\":[36,109,181,255],\"score\":0.087837},\n{\"type\":32, \"data\":[280,211,22],\"color\":[71,96,67,255],\"score\":0.0877969},\n{\"type\":32, \"data\":[387,166,13],\"color\":[81,98,26,255],\"score\":0.0877555},\n{\"type\":32, \"data\":[326,189,9],\"color\":[33,57,24,255],\"score\":0.0876935},\n{\"type\":32, \"data\":[268,122,5],\"color\":[88,113,139,255],\"score\":0.0876277},\n{\"type\":32, \"data\":[465,136,12],\"color\":[43,59,27,255],\"score\":0.0875879},\n{\"type\":32, \"data\":[404,118,4],\"color\":[118,126,126,255],\"score\":0.0875297},\n{\"type\":32, \"data\":[411,24,7],\"color\":[180,191,200,255],\"score\":0.087467},\n{\"type\":32, \"data\":[487,119,7],\"color\":[86,106,111,255],\"score\":0.0874069},\n{\"type\":32, \"data\":[408,272,21],\"color\":[60,86,37,255],\"score\":0.0873681},\n{\"type\":32, \"data\":[172,61,7],\"color\":[163,191,212,255],\"score\":0.0872594},\n{\"type\":32, \"data\":[121,138,4],\"color\":[140,144,126,255],\"score\":0.0872161},\n{\"type\":32, \"data\":[163,69,5],\"color\":[15,116,194,255],\"score\":0.0871432},\n{\"type\":32, \"data\":[427,137,12],\"color\":[51,78,21,255],\"score\":0.0870912},\n{\"type\":32, \"data\":[300,2,10],\"color\":[111,153,191,255],\"score\":0.087039},\n{\"type\":32, \"data\":[334,36,4],\"color\":[54,64,65,255],\"score\":0.086962},\n{\"type\":32, \"data\":[176,72,4],\"color\":[21,116,190,255],\"score\":0.0869169},\n{\"type\":32, \"data\":[152,180,18],\"color\":[59,83,45,255],\"score\":0.0868686},\n{\"type\":32, \"data\":[327,130,8],\"color\":[86,105,95,255],\"score\":0.0868103},\n{\"type\":32, \"data\":[362,128,10],\"color\":[64,98,103,255],\"score\":0.0867512},\n{\"type\":32, \"data\":[244,122,6],\"color\":[204,209,210,255],\"score\":0.0866937},\n{\"type\":32, \"data\":[328,50,5],\"color\":[7,95,189,255],\"score\":0.0866416},\n{\"type\":32, \"data\":[77,124,6],\"color\":[53,116,156,255],\"score\":0.0866061},\n{\"type\":32, \"data\":[164,39,18],\"color\":[7,83,179,255],\"score\":0.0865495},\n{\"type\":32, \"data\":[203,159,7],\"color\":[145,146,37,255],\"score\":0.0864716},\n{\"type\":32, \"data\":[74,64,5],\"color\":[107,174,211,255],\"score\":0.0864177},\n{\"type\":32, \"data\":[405,15,5],\"color\":[12,81,188,255],\"score\":0.0863372},\n{\"type\":32, \"data\":[430,111,6],\"color\":[75,124,156,255],\"score\":0.0862733},\n{\"type\":32, \"data\":[80,38,12],\"color\":[7,110,200,255],\"score\":0.0862325},\n{\"type\":32, \"data\":[58,0,20],\"color\":[7,77,175,255],\"score\":0.0861941},\n{\"type\":32, \"data\":[328,117,7],\"color\":[50,72,66,255],\"score\":0.0861477},\n{\"type\":32, \"data\":[271,27,14],\"color\":[6,66,157,255],\"score\":0.0860983},\n{\"type\":32, \"data\":[480,279,13],\"color\":[40,46,38,255],\"score\":0.0860514},\n{\"type\":32, \"data\":[437,160,9],\"color\":[72,78,37,255],\"score\":0.0860043},\n{\"type\":32, \"data\":[454,34,5],\"color\":[159,171,176,255],\"score\":0.0859295},\n{\"type\":32, \"data\":[254,118,5],\"color\":[222,223,222,255],\"score\":0.0858869},\n{\"type\":32, \"data\":[372,13,8],\"color\":[16,32,32,255],\"score\":0.0858403},\n{\"type\":32, \"data\":[395,81,6],\"color\":[142,169,190,255],\"score\":0.0858023},\n{\"type\":32, \"data\":[509,77,6],\"color\":[103,145,163,255],\"score\":0.0857191},\n{\"type\":32, \"data\":[429,70,4],\"color\":[81,118,147,255],\"score\":0.085659},\n{\"type\":32, \"data\":[261,53,6],\"color\":[107,150,186,255],\"score\":0.0856084},\n{\"type\":32, \"data\":[348,23,7],\"color\":[17,95,163,255],\"score\":0.0855281},\n{\"type\":32, \"data\":[172,150,13],\"color\":[82,117,91,255],\"score\":0.0854936},\n{\"type\":32, \"data\":[464,242,10],\"color\":[42,47,32,255],\"score\":0.0854558},\n{\"type\":32, \"data\":[452,103,4],\"color\":[194,202,208,255],\"score\":0.0853965},\n{\"type\":32, \"data\":[412,133,9],\"color\":[47,74,22,255],\"score\":0.0853547},\n{\"type\":32, \"data\":[20,79,4],\"color\":[220,228,234,255],\"score\":0.0853003},\n{\"type\":32, \"data\":[341,162,6],\"color\":[109,126,30,255],\"score\":0.085261},\n{\"type\":32, \"data\":[436,101,2],\"color\":[45,57,64,255],\"score\":0.0852192},\n{\"type\":32, \"data\":[125,100,7],\"color\":[170,195,210,255],\"score\":0.0851854},\n{\"type\":32, \"data\":[435,78,6],\"color\":[155,178,198,255],\"score\":0.0851409},\n{\"type\":32, \"data\":[64,77,8],\"color\":[8,145,211,255],\"score\":0.085088},\n{\"type\":32, \"data\":[350,191,8],\"color\":[35,59,17,255],\"score\":0.0850496},\n{\"type\":32, \"data\":[349,11,6],\"color\":[29,45,29,255],\"score\":0.0849793},\n{\"type\":32, \"data\":[34,155,11],\"color\":[34,61,41,255],\"score\":0.0849446},\n{\"type\":32, \"data\":[302,36,9],\"color\":[73,133,186,255],\"score\":0.0849124},\n{\"type\":32, \"data\":[452,162,8],\"color\":[151,147,48,255],\"score\":0.0848682},\n{\"type\":32, \"data\":[509,36,5],\"color\":[39,55,60,255],\"score\":0.0848206},\n{\"type\":32, \"data\":[388,9,7],\"color\":[14,42,54,255],\"score\":0.0847721},\n{\"type\":32, \"data\":[215,176,10],\"color\":[53,78,26,255],\"score\":0.0847391},\n{\"type\":32, \"data\":[448,92,4],\"color\":[185,197,204,255],\"score\":0.0846941},\n{\"type\":32, \"data\":[333,298,20],\"color\":[60,88,40,255],\"score\":0.0846701},\n{\"type\":32, \"data\":[371,45,6],\"color\":[12,54,62,255],\"score\":0.0846003},\n{\"type\":32, \"data\":[386,62,5],\"color\":[144,150,155,255],\"score\":0.084565},\n{\"type\":32, \"data\":[298,67,11],\"color\":[184,195,205,255],\"score\":0.0845166},\n{\"type\":32, \"data\":[352,114,7],\"color\":[39,61,31,255],\"score\":0.0844773},\n{\"type\":32, \"data\":[511,148,9],\"color\":[73,82,44,255],\"score\":0.084436},\n{\"type\":32, \"data\":[446,76,5],\"color\":[162,183,199,255],\"score\":0.0843943},\n{\"type\":32, \"data\":[444,297,14],\"color\":[64,90,47,255],\"score\":0.0843624},\n{\"type\":32, \"data\":[310,94,4],\"color\":[164,182,195,255],\"score\":0.0843343},\n{\"type\":32, \"data\":[125,125,6],\"color\":[183,212,230,255],\"score\":0.0842889},\n{\"type\":32, \"data\":[271,184,6],\"color\":[53,75,31,255],\"score\":0.0842523},\n{\"type\":32, \"data\":[14,130,3],\"color\":[121,150,155,255],\"score\":0.0842044},\n{\"type\":32, \"data\":[131,110,9],\"color\":[233,235,235,255],\"score\":0.084154},\n{\"type\":32, \"data\":[314,9,5],\"color\":[15,112,177,255],\"score\":0.0841189},\n{\"type\":32, \"data\":[443,236,13],\"color\":[73,99,68,255],\"score\":0.0840947},\n{\"type\":32, \"data\":[206,133,5],\"color\":[161,153,130,255],\"score\":0.0840566},\n{\"type\":32, \"data\":[10,82,5],\"color\":[36,168,218,255],\"score\":0.0840166},\n{\"type\":32, \"data\":[51,125,8],\"color\":[26,98,141,255],\"score\":0.0839784},\n{\"type\":32, \"data\":[43,190,23],\"color\":[73,92,67,255],\"score\":0.0839471},\n{\"type\":32, \"data\":[77,93,9],\"color\":[216,223,226,255],\"score\":0.0839011},\n{\"type\":32, \"data\":[347,62,6],\"color\":[147,176,199,255],\"score\":0.083866},\n{\"type\":32, \"data\":[309,41,4],\"color\":[164,183,207,255],\"score\":0.0838046},\n{\"type\":32, \"data\":[494,106,6],\"color\":[104,159,195,255],\"score\":0.0837622},\n{\"type\":32, \"data\":[39,35,6],\"color\":[50,162,221,255],\"score\":0.0837205},\n{\"type\":32, \"data\":[60,112,5],\"color\":[157,184,199,255],\"score\":0.0836923},\n{\"type\":32, \"data\":[280,11,5],\"color\":[37,116,181,255],\"score\":0.083649},\n{\"type\":32, \"data\":[129,154,6],\"color\":[61,85,44,255],\"score\":0.083609},\n{\"type\":32, \"data\":[433,19,3],\"color\":[119,127,112,255],\"score\":0.0835674},\n{\"type\":32, \"data\":[374,140,8],\"color\":[51,77,28,255],\"score\":0.0835241},\n{\"type\":32, \"data\":[432,59,8],\"color\":[19,28,15,255],\"score\":0.0834813},\n{\"type\":32, \"data\":[363,140,5],\"color\":[49,77,42,255],\"score\":0.0834466},\n{\"type\":32, \"data\":[75,107,3],\"color\":[91,172,212,255],\"score\":0.0834072},\n{\"type\":32, \"data\":[446,83,4],\"color\":[79,102,122,255],\"score\":0.0833626},\n{\"type\":32, \"data\":[358,23,6],\"color\":[9,65,142,255],\"score\":0.0833078},\n{\"type\":32, \"data\":[404,47,5],\"color\":[8,105,183,255],\"score\":0.0832543},\n{\"type\":32, \"data\":[488,233,13],\"color\":[54,76,35,255],\"score\":0.0832221},\n{\"type\":32, \"data\":[56,94,7],\"color\":[245,247,245,255],\"score\":0.0831916},\n{\"type\":32, \"data\":[303,51,6],\"color\":[11,87,176,255],\"score\":0.0831538},\n{\"type\":32, \"data\":[281,51,5],\"color\":[216,219,221,255],\"score\":0.0831018},\n{\"type\":32, \"data\":[296,37,5],\"color\":[21,98,179,255],\"score\":0.0830649},\n{\"type\":32, \"data\":[382,203,10],\"color\":[41,61,35,255],\"score\":0.0830306},\n{\"type\":32, \"data\":[145,128,7],\"color\":[51,104,139,255],\"score\":0.0829931},\n{\"type\":32, \"data\":[395,229,15],\"color\":[74,101,71,255],\"score\":0.0829562},\n{\"type\":32, \"data\":[486,48,5],\"color\":[43,84,91,255],\"score\":0.0829112},\n{\"type\":32, \"data\":[162,94,14],\"color\":[245,244,240,255],\"score\":0.0828692},\n{\"type\":32, \"data\":[260,106,4],\"color\":[245,244,244,255],\"score\":0.0828308},\n{\"type\":32, \"data\":[96,110,4],\"color\":[155,191,213,255],\"score\":0.0827802},\n{\"type\":32, \"data\":[339,8,7],\"color\":[36,57,30,255],\"score\":0.0827432},\n{\"type\":32, \"data\":[367,90,4],\"color\":[104,118,91,255],\"score\":0.0827018},\n{\"type\":32, \"data\":[438,0,8],\"color\":[21,31,31,255],\"score\":0.0826597},\n{\"type\":32, \"data\":[372,28,7],\"color\":[14,97,196,255],\"score\":0.0826251},\n{\"type\":32, \"data\":[325,106,7],\"color\":[81,119,149,255],\"score\":0.0825828},\n{\"type\":32, \"data\":[337,180,4],\"color\":[110,124,41,255],\"score\":0.0825564},\n{\"type\":32, \"data\":[496,67,4],\"color\":[28,91,129,255],\"score\":0.0825168},\n{\"type\":32, \"data\":[321,168,9],\"color\":[78,100,25,255],\"score\":0.0824803},\n{\"type\":32, \"data\":[362,72,4],\"color\":[103,121,138,255],\"score\":0.0824395},\n{\"type\":32, \"data\":[184,258,27],\"color\":[64,91,37,255],\"score\":0.0824192},\n{\"type\":32, \"data\":[387,119,5],\"color\":[81,91,78,255],\"score\":0.0823925},\n{\"type\":32, \"data\":[0,90,4],\"color\":[211,227,237,255],\"score\":0.0823709},\n{\"type\":32, \"data\":[445,149,5],\"color\":[127,133,63,255],\"score\":0.0823234},\n{\"type\":32, \"data\":[99,199,23],\"color\":[74,94,67,255],\"score\":0.082296},\n{\"type\":32, \"data\":[74,55,5],\"color\":[231,234,234,255],\"score\":0.0822384},\n{\"type\":32, \"data\":[510,98,4],\"color\":[32,44,42,255],\"score\":0.0822098},\n{\"type\":32, \"data\":[232,177,9],\"color\":[43,63,22,255],\"score\":0.0821775},\n{\"type\":32, \"data\":[271,173,7],\"color\":[91,111,30,255],\"score\":0.0821404},\n{\"type\":32, \"data\":[298,18,6],\"color\":[29,110,179,255],\"score\":0.0821123},\n{\"type\":32, \"data\":[496,119,7],\"color\":[77,104,118,255],\"score\":0.08208},\n{\"type\":32, \"data\":[76,326,32],\"color\":[59,83,41,255],\"score\":0.0820535},\n{\"type\":32, \"data\":[286,124,4],\"color\":[186,163,127,255],\"score\":0.0820146},\n{\"type\":32, \"data\":[310,206,13],\"color\":[67,93,65,255],\"score\":0.0819918},\n{\"type\":32, \"data\":[242,135,7],\"color\":[122,122,63,255],\"score\":0.0819482},\n{\"type\":32, \"data\":[317,28,4],\"color\":[51,66,70,255],\"score\":0.0818949},\n{\"type\":32, \"data\":[452,112,5],\"color\":[59,110,141,255],\"score\":0.0818491},\n{\"type\":32, \"data\":[48,146,7],\"color\":[46,73,52,255],\"score\":0.0818232},\n{\"type\":32, \"data\":[379,79,8],\"color\":[173,187,198,255],\"score\":0.0817903},\n{\"type\":32, \"data\":[104,65,2],\"color\":[187,209,225,255],\"score\":0.0817677},\n{\"type\":32, \"data\":[510,51,6],\"color\":[48,129,173,255],\"score\":0.0817399},\n{\"type\":32, \"data\":[68,230,18],\"color\":[65,89,51,255],\"score\":0.0817171},\n{\"type\":32, \"data\":[428,171,6],\"color\":[132,139,28,255],\"score\":0.0816822},\n{\"type\":32, \"data\":[384,66,3],\"color\":[91,98,102,255],\"score\":0.0816397},\n{\"type\":32, \"data\":[270,67,4],\"color\":[235,235,235,255],\"score\":0.0816047},\n{\"type\":32, \"data\":[175,195,9],\"color\":[50,73,56,255],\"score\":0.0815758},\n{\"type\":32, \"data\":[185,106,10],\"color\":[224,225,224,255],\"score\":0.0815552},\n{\"type\":32, \"data\":[339,96,3],\"color\":[120,126,106,255],\"score\":0.0815089},\n{\"type\":32, \"data\":[115,172,6],\"color\":[39,58,23,255],\"score\":0.0814792},\n{\"type\":32, \"data\":[256,127,4],\"color\":[81,100,95,255],\"score\":0.081439},\n{\"type\":32, \"data\":[455,21,4],\"color\":[89,100,92,255],\"score\":0.0814003},\n{\"type\":32, \"data\":[473,205,27],\"color\":[41,64,23,255],\"score\":0.0813785},\n{\"type\":32, \"data\":[255,205,18],\"color\":[71,97,69,255],\"score\":0.0813595},\n{\"type\":32, \"data\":[278,0,6],\"color\":[178,190,206,255],\"score\":0.0813294},\n{\"type\":32, \"data\":[28,130,3],\"color\":[36,112,156,255],\"score\":0.0812939},\n{\"type\":32, \"data\":[424,20,6],\"color\":[69,76,60,255],\"score\":0.0812473},\n{\"type\":32, \"data\":[59,37,12],\"color\":[6,112,200,255],\"score\":0.0812165},\n{\"type\":32, \"data\":[393,57,3],\"color\":[32,40,28,255],\"score\":0.081178},\n{\"type\":32, \"data\":[416,212,13],\"color\":[47,70,32,255],\"score\":0.0811536},\n{\"type\":32, \"data\":[88,169,7],\"color\":[31,54,23,255],\"score\":0.0811169},\n{\"type\":32, \"data\":[163,326,17],\"color\":[71,92,45,255],\"score\":0.081098},\n{\"type\":32, \"data\":[385,90,2],\"color\":[81,102,76,255],\"score\":0.0810646},\n{\"type\":32, \"data\":[53,117,3],\"color\":[122,156,178,255],\"score\":0.0810368},\n{\"type\":32, \"data\":[375,230,5],\"color\":[38,51,49,255],\"score\":0.0810091},\n{\"type\":32, \"data\":[221,91,7],\"color\":[143,173,196,255],\"score\":0.0809816},\n{\"type\":32, \"data\":[415,71,5],\"color\":[60,85,94,255],\"score\":0.0809406},\n{\"type\":32, \"data\":[340,131,7],\"color\":[107,121,107,255],\"score\":0.0809142},\n{\"type\":32, \"data\":[86,85,3],\"color\":[110,179,213,255],\"score\":0.080875},\n{\"type\":32, \"data\":[99,94,9],\"color\":[245,245,243,255],\"score\":0.0808417},\n{\"type\":32, \"data\":[457,95,3],\"color\":[71,73,78,255],\"score\":0.0807915},\n{\"type\":32, \"data\":[11,69,7],\"color\":[8,148,214,255],\"score\":0.0807665},\n{\"type\":32, \"data\":[30,140,4],\"color\":[35,59,43,255],\"score\":0.0807431},\n{\"type\":32, \"data\":[423,122,4],\"color\":[139,143,129,255],\"score\":0.0806949},\n{\"type\":32, \"data\":[256,86,2],\"color\":[44,123,172,255],\"score\":0.0806692},\n{\"type\":32, \"data\":[460,45,2],\"color\":[138,149,143,255],\"score\":0.0806118},\n{\"type\":32, \"data\":[161,150,5],\"color\":[129,145,84,255],\"score\":0.080577},\n{\"type\":32, \"data\":[277,126,5],\"color\":[155,144,115,255],\"score\":0.0805532},\n{\"type\":32, \"data\":[346,88,7],\"color\":[230,230,227,255],\"score\":0.0805057},\n{\"type\":32, \"data\":[430,277,6],\"color\":[40,53,37,255],\"score\":0.0804902},\n{\"type\":32, \"data\":[18,155,6],\"color\":[29,56,27,255],\"score\":0.0804739},\n{\"type\":32, \"data\":[359,11,7],\"color\":[23,39,23,255],\"score\":0.0804359},\n{\"type\":32, \"data\":[479,39,4],\"color\":[164,171,160,255],\"score\":0.0803857},\n{\"type\":32, \"data\":[132,98,3],\"color\":[76,158,196,255],\"score\":0.0803357},\n{\"type\":32, \"data\":[385,243,11],\"color\":[72,100,51,255],\"score\":0.0803142},\n{\"type\":32, \"data\":[483,149,5],\"color\":[111,127,51,255],\"score\":0.0802741},\n{\"type\":32, \"data\":[269,54,6],\"color\":[138,166,191,255],\"score\":0.0802491},\n{\"type\":32, \"data\":[383,111,6],\"color\":[24,41,27,255],\"score\":0.0802143},\n{\"type\":32, \"data\":[271,146,5],\"color\":[178,168,34,255],\"score\":0.0801825},\n{\"type\":32, \"data\":[112,148,11],\"color\":[72,114,111,255],\"score\":0.0801581},\n{\"type\":32, \"data\":[257,146,7],\"color\":[69,85,21,255],\"score\":0.0801358},\n{\"type\":32, \"data\":[374,154,3],\"color\":[136,152,67,255],\"score\":0.0801078},\n{\"type\":32, \"data\":[98,124,5],\"color\":[216,226,232,255],\"score\":0.0800857},\n{\"type\":32, \"data\":[123,197,20],\"color\":[73,93,67,255],\"score\":0.0800648},\n{\"type\":32, \"data\":[481,18,5],\"color\":[58,80,79,255],\"score\":0.0800263},\n{\"type\":32, \"data\":[443,112,6],\"color\":[50,104,136,255],\"score\":0.0799874},\n{\"type\":32, \"data\":[373,89,2],\"color\":[66,81,59,255],\"score\":0.0799644},\n{\"type\":32, \"data\":[220,242,17],\"color\":[68,92,34,255],\"score\":0.0799487},\n{\"type\":32, \"data\":[83,144,7],\"color\":[67,110,116,255],\"score\":0.0799272},\n{\"type\":32, \"data\":[361,150,6],\"color\":[135,150,82,255],\"score\":0.0798899},\n{\"type\":32, \"data\":[131,137,4],\"color\":[134,142,131,255],\"score\":0.0798472},\n{\"type\":32, \"data\":[339,28,4],\"color\":[161,186,206,255],\"score\":0.0797966},\n{\"type\":32, \"data\":[204,44,5],\"color\":[16,106,191,255],\"score\":0.0797721},\n{\"type\":32, \"data\":[337,19,2],\"color\":[95,111,113,255],\"score\":0.0797437},\n{\"type\":32, \"data\":[206,96,8],\"color\":[139,170,192,255],\"score\":0.0797166},\n{\"type\":32, \"data\":[3,132,5],\"color\":[42,75,60,255],\"score\":0.0796901},\n{\"type\":32, \"data\":[145,47,14],\"color\":[6,94,187,255],\"score\":0.0796697},\n{\"type\":32, \"data\":[144,294,9],\"color\":[41,57,46,255],\"score\":0.0796482},\n{\"type\":32, \"data\":[267,76,4],\"color\":[144,169,191,255],\"score\":0.0796174},\n{\"type\":32, \"data\":[181,87,7],\"color\":[227,226,226,255],\"score\":0.0795906},\n{\"type\":32, \"data\":[491,138,10],\"color\":[27,40,29,255],\"score\":0.0795674},\n{\"type\":32, \"data\":[60,58,7],\"color\":[236,237,237,255],\"score\":0.0795408},\n{\"type\":32, \"data\":[169,167,4],\"color\":[132,143,70,255],\"score\":0.0795192},\n{\"type\":32, \"data\":[320,66,9],\"color\":[181,194,206,255],\"score\":0.0794929},\n{\"type\":32, \"data\":[165,120,12],\"color\":[72,114,144,255],\"score\":0.0794504},\n{\"type\":32, \"data\":[442,104,3],\"color\":[196,204,208,255],\"score\":0.0794089},\n{\"type\":32, \"data\":[453,0,8],\"color\":[41,47,34,255],\"score\":0.0793887},\n{\"type\":32, \"data\":[484,0,13],\"color\":[29,41,24,255],\"score\":0.0793665},\n{\"type\":32, \"data\":[260,292,14],\"color\":[68,95,44,255],\"score\":0.0793477},\n{\"type\":32, \"data\":[234,75,9],\"color\":[186,196,205,255],\"score\":0.079327},\n{\"type\":32, \"data\":[149,77,3],\"color\":[118,167,203,255],\"score\":0.0792905},\n{\"type\":32, \"data\":[507,258,14],\"color\":[74,97,68,255],\"score\":0.0792717},\n{\"type\":32, \"data\":[214,128,2],\"color\":[90,131,161,255],\"score\":0.0792439},\n{\"type\":32, \"data\":[165,291,13],\"color\":[52,75,50,255],\"score\":0.0792256},\n{\"type\":32, \"data\":[407,83,6],\"color\":[116,152,176,255],\"score\":0.0791926},\n{\"type\":32, \"data\":[439,85,2],\"color\":[38,56,67,255],\"score\":0.0791479},\n{\"type\":32, \"data\":[469,46,8],\"color\":[44,63,21,255],\"score\":0.079105},\n{\"type\":32, \"data\":[362,201,8],\"color\":[40,67,20,255],\"score\":0.0790815},\n{\"type\":32, \"data\":[211,163,6],\"color\":[84,105,26,255],\"score\":0.0790595},\n{\"type\":32, \"data\":[384,171,8],\"color\":[103,115,36,255],\"score\":0.079035},\n{\"type\":32, \"data\":[429,122,3],\"color\":[152,142,121,255],\"score\":0.0790071},\n{\"type\":32, \"data\":[53,68,3],\"color\":[133,189,225,255],\"score\":0.0789682},\n{\"type\":32, \"data\":[119,93,7],\"color\":[224,225,223,255],\"score\":0.0789488},\n{\"type\":32, \"data\":[451,97,2],\"color\":[52,57,62,255],\"score\":0.0789047},\n{\"type\":32, \"data\":[336,94,1],\"color\":[100,103,86,255],\"score\":0.0788805},\n{\"type\":32, \"data\":[455,80,2],\"color\":[46,60,71,255],\"score\":0.0788399},\n{\"type\":32, \"data\":[366,176,9],\"color\":[85,102,28,255],\"score\":0.078814},\n{\"type\":32, \"data\":[309,185,8],\"color\":[29,49,20,255],\"score\":0.0787901},\n{\"type\":32, \"data\":[400,340,20],\"color\":[79,97,62,255],\"score\":0.078773},\n{\"type\":32, \"data\":[352,158,6],\"color\":[87,109,23,255],\"score\":0.0787456},\n{\"type\":32, \"data\":[292,151,6],\"color\":[97,112,31,255],\"score\":0.0787202},\n{\"type\":32, \"data\":[328,37,3],\"color\":[35,45,48,255],\"score\":0.078681},\n{\"type\":32, \"data\":[206,83,6],\"color\":[227,227,226,255],\"score\":0.0786555},\n{\"type\":32, \"data\":[140,137,4],\"color\":[138,146,134,255],\"score\":0.0786333},\n{\"type\":32, \"data\":[154,141,6],\"color\":[59,105,109,255],\"score\":0.0786111},\n{\"type\":32, \"data\":[261,158,7],\"color\":[58,79,22,255],\"score\":0.0785877},\n{\"type\":32, \"data\":[445,19,6],\"color\":[52,63,47,255],\"score\":0.0785481},\n{\"type\":32, \"data\":[92,105,2],\"color\":[136,188,208,255],\"score\":0.0785272},\n{\"type\":32, \"data\":[33,104,3],\"color\":[128,186,217,255],\"score\":0.0785008},\n{\"type\":32, \"data\":[480,100,3],\"color\":[127,153,171,255],\"score\":0.0784483},\n{\"type\":32, \"data\":[290,7,5],\"color\":[154,178,202,255],\"score\":0.0784213},\n{\"type\":32, \"data\":[294,136,11],\"color\":[133,129,68,255],\"score\":0.0784012},\n{\"type\":32, \"data\":[314,340,16],\"color\":[70,93,47,255],\"score\":0.0783851},\n{\"type\":32, \"data\":[290,248,18],\"color\":[69,96,31,255],\"score\":0.0783722},\n{\"type\":32, \"data\":[487,28,3],\"color\":[29,39,40,255],\"score\":0.0783359},\n{\"type\":32, \"data\":[351,225,16],\"color\":[71,93,72,255],\"score\":0.0783195},\n{\"type\":32, \"data\":[58,142,4],\"color\":[98,128,122,255],\"score\":0.0782922},\n{\"type\":32, \"data\":[44,83,8],\"color\":[21,162,220,255],\"score\":0.0782706},\n{\"type\":32, \"data\":[239,35,5],\"color\":[25,109,190,255],\"score\":0.0782333},\n{\"type\":32, \"data\":[98,75,9],\"color\":[11,132,204,255],\"score\":0.078199},\n{\"type\":32, \"data\":[314,143,6],\"color\":[157,155,62,255],\"score\":0.0781711},\n{\"type\":32, \"data\":[263,113,4],\"color\":[141,170,192,255],\"score\":0.078146},\n{\"type\":32, \"data\":[23,119,9],\"color\":[224,233,238,255],\"score\":0.0781132},\n{\"type\":32, \"data\":[471,214,8],\"color\":[23,42,14,255],\"score\":0.078089},\n{\"type\":32, \"data\":[467,64,8],\"color\":[22,22,24,255],\"score\":0.0780597},\n{\"type\":32, \"data\":[418,109,6],\"color\":[31,53,57,255],\"score\":0.0780306},\n{\"type\":32, \"data\":[437,70,4],\"color\":[81,117,147,255],\"score\":0.07799},\n{\"type\":32, \"data\":[131,75,7],\"color\":[246,246,243,255],\"score\":0.0779627},\n{\"type\":32, \"data\":[410,101,7],\"color\":[68,84,69,255],\"score\":0.0779429},\n{\"type\":32, \"data\":[316,17,4],\"color\":[152,177,200,255],\"score\":0.077908},\n{\"type\":32, \"data\":[107,232,16],\"color\":[67,93,47,255],\"score\":0.0778954},\n{\"type\":32, \"data\":[341,17,3],\"color\":[98,132,156,255],\"score\":0.0778645},\n{\"type\":32, \"data\":[18,86,3],\"color\":[57,172,215,255],\"score\":0.0778384},\n{\"type\":32, \"data\":[372,34,3],\"color\":[59,152,212,255],\"score\":0.0778172},\n{\"type\":32, \"data\":[507,277,5],\"color\":[35,40,32,255],\"score\":0.0777952},\n{\"type\":32, \"data\":[508,21,5],\"color\":[19,106,153,255],\"score\":0.0777654},\n{\"type\":32, \"data\":[240,88,5],\"color\":[114,155,187,255],\"score\":0.0777438},\n{\"type\":32, \"data\":[215,291,26],\"color\":[64,90,42,255],\"score\":0.0777336},\n{\"type\":32, \"data\":[66,118,6],\"color\":[54,117,156,255],\"score\":0.0777119},\n{\"type\":32, \"data\":[285,182,8],\"color\":[28,50,21,255],\"score\":0.0776866},\n{\"type\":32, \"data\":[340,72,10],\"color\":[190,201,209,255],\"score\":0.0776667},\n{\"type\":32, \"data\":[295,165,8],\"color\":[66,92,24,255],\"score\":0.0776448},\n{\"type\":32, \"data\":[408,6,5],\"color\":[14,37,38,255],\"score\":0.0776136},\n{\"type\":32, \"data\":[303,143,3],\"color\":[83,91,30,255],\"score\":0.0775992},\n{\"type\":32, \"data\":[496,14,4],\"color\":[89,139,171,255],\"score\":0.0775731},\n{\"type\":32, \"data\":[169,73,4],\"color\":[13,115,191,255],\"score\":0.0775257},\n{\"type\":32, \"data\":[492,56,5],\"color\":[94,147,184,255],\"score\":0.0774897},\n{\"type\":32, \"data\":[396,48,5],\"color\":[19,89,138,255],\"score\":0.077459},\n{\"type\":32, \"data\":[70,143,6],\"color\":[86,118,114,255],\"score\":0.0774366},\n{\"type\":32, \"data\":[157,73,3],\"color\":[142,179,203,255],\"score\":0.0774066},\n{\"type\":32, \"data\":[446,68,3],\"color\":[63,94,113,255],\"score\":0.0773817},\n{\"type\":32, \"data\":[267,106,4],\"color\":[249,247,244,255],\"score\":0.0773572},\n{\"type\":32, \"data\":[222,37,6],\"color\":[20,92,181,255],\"score\":0.077331},\n{\"type\":32, \"data\":[355,96,5],\"color\":[99,107,86,255],\"score\":0.0772958},\n{\"type\":32, \"data\":[0,76,9],\"color\":[12,159,218,255],\"score\":0.0772831},\n{\"type\":32, \"data\":[318,38,2],\"color\":[56,63,54,255],\"score\":0.0772451},\n{\"type\":32, \"data\":[421,192,7],\"color\":[29,45,19,255],\"score\":0.0772224},\n{\"type\":32, \"data\":[307,58,3],\"color\":[135,163,190,255],\"score\":0.0771976},\n{\"type\":32, \"data\":[261,49,3],\"color\":[40,120,183,255],\"score\":0.0771723},\n{\"type\":32, \"data\":[208,192,10],\"color\":[64,96,64,255],\"score\":0.0771574},\n{\"type\":32, \"data\":[231,42,4],\"color\":[224,223,221,255],\"score\":0.0771103},\n{\"type\":32, \"data\":[401,153,5],\"color\":[45,62,17,255],\"score\":0.0770896},\n{\"type\":32, \"data\":[397,20,7],\"color\":[6,82,191,255],\"score\":0.0770673},\n{\"type\":32, \"data\":[466,304,9],\"color\":[80,100,65,255],\"score\":0.0770538},\n{\"type\":32, \"data\":[178,63,3],\"color\":[72,149,200,255],\"score\":0.0770236},\n{\"type\":32, \"data\":[183,131,8],\"color\":[109,136,150,255],\"score\":0.0769914},\n{\"type\":32, \"data\":[456,8,4],\"color\":[95,101,76,255],\"score\":0.0769513},\n{\"type\":32, \"data\":[398,126,6],\"color\":[83,114,119,255],\"score\":0.0769257},\n{\"type\":32, \"data\":[292,112,8],\"color\":[92,113,136,255],\"score\":0.0769043},\n{\"type\":32, \"data\":[158,206,10],\"color\":[77,95,69,255],\"score\":0.0768903},\n{\"type\":32, \"data\":[24,145,3],\"color\":[79,109,96,255],\"score\":0.0768764},\n{\"type\":32, \"data\":[447,98,2],\"color\":[58,60,66,255],\"score\":0.0768351},\n{\"type\":32, \"data\":[256,57,5],\"color\":[171,184,197,255],\"score\":0.0768215},\n{\"type\":32, \"data\":[236,1,18],\"color\":[5,46,139,255],\"score\":0.0768055},\n{\"type\":32, \"data\":[224,121,5],\"color\":[177,192,199,255],\"score\":0.0767872},\n{\"type\":32, \"data\":[21,316,14],\"color\":[56,88,36,255],\"score\":0.0767771},\n{\"type\":32, \"data\":[443,9,2],\"color\":[120,127,120,255],\"score\":0.0767569},\n{\"type\":32, \"data\":[415,190,8],\"color\":[27,46,19,255],\"score\":0.0767436},\n{\"type\":32, \"data\":[43,56,3],\"color\":[157,191,216,255],\"score\":0.0767015},\n{\"type\":32, \"data\":[401,110,5],\"color\":[25,38,28,255],\"score\":0.0766782},\n{\"type\":32, \"data\":[316,94,5],\"color\":[170,186,198,255],\"score\":0.0766541},\n{\"type\":32, \"data\":[264,133,6],\"color\":[162,146,89,255],\"score\":0.0766354},\n{\"type\":32, \"data\":[442,100,2],\"color\":[60,70,74,255],\"score\":0.0765941},\n{\"type\":32, \"data\":[250,77,5],\"color\":[185,198,209,255],\"score\":0.0765765},\n{\"type\":32, \"data\":[452,227,5],\"color\":[57,81,44,255],\"score\":0.0765651},\n{\"type\":32, \"data\":[495,26,6],\"color\":[39,73,90,255],\"score\":0.076538},\n{\"type\":32, \"data\":[302,93,4],\"color\":[191,199,206,255],\"score\":0.0765143},\n{\"type\":32, \"data\":[226,106,8],\"color\":[221,223,225,255],\"score\":0.0764898},\n{\"type\":32, \"data\":[333,27,5],\"color\":[208,216,221,255],\"score\":0.0764656},\n{\"type\":32, \"data\":[498,172,9],\"color\":[135,142,44,255],\"score\":0.0764525},\n{\"type\":32, \"data\":[119,112,5],\"color\":[238,237,236,255],\"score\":0.076439},\n{\"type\":32, \"data\":[34,87,2],\"color\":[212,227,233,255],\"score\":0.0764134},\n{\"type\":32, \"data\":[177,77,4],\"color\":[75,150,196,255],\"score\":0.0763845},\n{\"type\":32, \"data\":[370,64,5],\"color\":[185,195,203,255],\"score\":0.076354},\n{\"type\":32, \"data\":[220,328,21],\"color\":[60,83,31,255],\"score\":0.0763429},\n{\"type\":32, \"data\":[87,90,3],\"color\":[120,178,212,255],\"score\":0.0763163},\n{\"type\":32, \"data\":[363,231,5],\"color\":[45,61,67,255],\"score\":0.0762981},\n{\"type\":32, \"data\":[297,197,6],\"color\":[57,80,59,255],\"score\":0.0762853},\n{\"type\":32, \"data\":[128,146,4],\"color\":[52,78,46,255],\"score\":0.0762656},\n{\"type\":32, \"data\":[381,151,5],\"color\":[91,124,70,255],\"score\":0.076242},\n{\"type\":32, \"data\":[388,160,5],\"color\":[54,70,21,255],\"score\":0.0762237},\n{\"type\":32, \"data\":[395,63,4],\"color\":[59,69,72,255],\"score\":0.0761967},\n{\"type\":32, \"data\":[304,23,4],\"color\":[22,72,117,255],\"score\":0.0761622},\n{\"type\":32, \"data\":[477,133,5],\"color\":[29,37,29,255],\"score\":0.0761513},\n{\"type\":32, \"data\":[304,34,4],\"color\":[20,107,179,255],\"score\":0.0761276},\n{\"type\":32, \"data\":[495,46,5],\"color\":[41,108,152,255],\"score\":0.0761056},\n{\"type\":32, \"data\":[508,123,6],\"color\":[57,74,62,255],\"score\":0.0760866},\n{\"type\":32, \"data\":[333,142,4],\"color\":[183,170,95,255],\"score\":0.0760698},\n{\"type\":32, \"data\":[190,160,8],\"color\":[57,78,32,255],\"score\":0.0760498},\n{\"type\":32, \"data\":[133,84,7],\"color\":[250,249,247,255],\"score\":0.0760329},\n{\"type\":32, \"data\":[74,248,11],\"color\":[56,77,35,255],\"score\":0.076022},\n{\"type\":32, \"data\":[79,65,3],\"color\":[33,144,207,255],\"score\":0.0759972},\n{\"type\":32, \"data\":[427,28,3],\"color\":[199,197,193,255],\"score\":0.0759494},\n{\"type\":32, \"data\":[128,291,8],\"color\":[34,47,49,255],\"score\":0.075932},\n{\"type\":32, \"data\":[419,12,4],\"color\":[47,96,131,255],\"score\":0.0758929},\n{\"type\":32, \"data\":[194,136,4],\"color\":[161,151,126,255],\"score\":0.0758722},\n{\"type\":32, \"data\":[412,41,6],\"color\":[25,70,65,255],\"score\":0.07585},\n{\"type\":32, \"data\":[309,300,9],\"color\":[46,78,35,255],\"score\":0.075836},\n{\"type\":32, \"data\":[202,178,5],\"color\":[30,49,22,255],\"score\":0.0758154},\n{\"type\":32, \"data\":[493,277,10],\"color\":[50,57,47,255],\"score\":0.075804},\n{\"type\":32, \"data\":[181,166,7],\"color\":[85,104,38,255],\"score\":0.0757864},\n{\"type\":32, \"data\":[334,0,4],\"color\":[52,115,126,255],\"score\":0.0757645},\n{\"type\":32, \"data\":[506,81,3],\"color\":[60,99,86,255],\"score\":0.0757392},\n{\"type\":32, \"data\":[457,37,3],\"color\":[217,220,219,255],\"score\":0.0757108},\n{\"type\":32, \"data\":[3,99,5],\"color\":[92,180,224,255],\"score\":0.0756907},\n{\"type\":32, \"data\":[58,126,8],\"color\":[11,88,132,255],\"score\":0.0756671},\n{\"type\":32, \"data\":[94,120,7],\"color\":[232,237,238,255],\"score\":0.0756491},\n{\"type\":32, \"data\":[229,60,8],\"color\":[230,229,226,255],\"score\":0.0756329},\n{\"type\":32, \"data\":[274,156,4],\"color\":[131,137,35,255],\"score\":0.0756188},\n{\"type\":32, \"data\":[297,104,4],\"color\":[70,97,127,255],\"score\":0.0755982},\n{\"type\":32, \"data\":[229,49,3],\"color\":[43,117,179,255],\"score\":0.0755576},\n{\"type\":32, \"data\":[365,1,5],\"color\":[27,86,106,255],\"score\":0.0755364},\n{\"type\":32, \"data\":[347,49,8],\"color\":[9,106,193,255],\"score\":0.0755154},\n{\"type\":32, \"data\":[229,122,2],\"color\":[91,103,94,255],\"score\":0.0754925},\n{\"type\":32, \"data\":[488,67,5],\"color\":[41,76,90,255],\"score\":0.0754671},\n{\"type\":32, \"data\":[423,162,6],\"color\":[74,90,19,255],\"score\":0.0754433},\n{\"type\":32, \"data\":[465,2,8],\"color\":[36,53,16,255],\"score\":0.0754296},\n{\"type\":32, \"data\":[317,109,6],\"color\":[82,111,138,255],\"score\":0.0754124},\n{\"type\":32, \"data\":[426,80,6],\"color\":[125,161,188,255],\"score\":0.075393},\n{\"type\":32, \"data\":[476,273,8],\"color\":[29,26,23,255],\"score\":0.0753743},\n{\"type\":32, \"data\":[338,34,3],\"color\":[64,76,79,255],\"score\":0.0753486},\n{\"type\":32, \"data\":[409,76,3],\"color\":[65,93,87,255],\"score\":0.0753242},\n{\"type\":32, \"data\":[407,104,1],\"color\":[176,191,187,255],\"score\":0.0752974},\n{\"type\":32, \"data\":[487,257,8],\"color\":[80,102,75,255],\"score\":0.0752819},\n{\"type\":32, \"data\":[152,63,3],\"color\":[136,178,208,255],\"score\":0.0752522},\n{\"type\":32, \"data\":[263,125,4],\"color\":[106,127,146,255],\"score\":0.075231},\n{\"type\":32, \"data\":[189,75,5],\"color\":[163,181,197,255],\"score\":0.0752032},\n{\"type\":32, \"data\":[177,288,4],\"color\":[35,49,41,255],\"score\":0.0751928},\n{\"type\":32, \"data\":[451,124,2],\"color\":[155,151,123,255],\"score\":0.0751746},\n{\"type\":32, \"data\":[388,134,3],\"color\":[149,151,98,255],\"score\":0.075137},\n{\"type\":32, \"data\":[420,65,4],\"color\":[23,34,19,255],\"score\":0.0751243},\n{\"type\":32, \"data\":[40,113,7],\"color\":[249,251,249,255],\"score\":0.0751053},\n{\"type\":32, \"data\":[402,26,4],\"color\":[19,105,199,255],\"score\":0.0750832},\n{\"type\":32, \"data\":[491,219,14],\"color\":[43,66,26,255],\"score\":0.0750754},\n{\"type\":32, \"data\":[405,175,8],\"color\":[51,71,20,255],\"score\":0.0750649},\n{\"type\":32, \"data\":[24,50,8],\"color\":[6,125,206,255],\"score\":0.0750526},\n{\"type\":32, \"data\":[455,91,3],\"color\":[176,190,202,255],\"score\":0.0750091},\n{\"type\":32, \"data\":[247,69,4],\"color\":[143,164,184,255],\"score\":0.0749965},\n{\"type\":32, \"data\":[85,73,8],\"color\":[10,134,206,255],\"score\":0.0749855},\n{\"type\":32, \"data\":[331,16,2],\"color\":[89,95,88,255],\"score\":0.0749562},\n{\"type\":32, \"data\":[435,33,4],\"color\":[121,136,133,255],\"score\":0.0749329},\n{\"type\":32, \"data\":[439,209,4],\"color\":[15,29,14,255],\"score\":0.0749209},\n{\"type\":32, \"data\":[426,96,2],\"color\":[211,218,213,255],\"score\":0.0748922},\n{\"type\":32, \"data\":[281,133,6],\"color\":[127,121,61,255],\"score\":0.074879},\n{\"type\":32, \"data\":[459,40,3],\"color\":[215,213,203,255],\"score\":0.0748631},\n{\"type\":32, \"data\":[410,32,2],\"color\":[45,142,195,255],\"score\":0.0748445},\n{\"type\":32, \"data\":[152,108,6],\"color\":[243,243,240,255],\"score\":0.0748163},\n{\"type\":32, \"data\":[322,232,8],\"color\":[88,107,62,255],\"score\":0.0748031},\n{\"type\":32, \"data\":[149,118,2],\"color\":[156,163,168,255],\"score\":0.0747874},\n{\"type\":32, \"data\":[7,60,3],\"color\":[75,173,216,255],\"score\":0.0747673},\n{\"type\":32, \"data\":[335,41,2],\"color\":[125,169,200,255],\"score\":0.0747409},\n{\"type\":32, \"data\":[415,97,5],\"color\":[49,66,45,255],\"score\":0.0747221},\n{\"type\":32, \"data\":[65,67,3],\"color\":[126,186,215,255],\"score\":0.074698},\n{\"type\":32, \"data\":[60,187,17],\"color\":[73,92,67,255],\"score\":0.0746891},\n{\"type\":32, \"data\":[278,103,7],\"color\":[193,202,209,255],\"score\":0.0746683},\n{\"type\":32, \"data\":[326,5,3],\"color\":[32,69,61,255],\"score\":0.0746501},\n{\"type\":32, \"data\":[312,50,5],\"color\":[7,87,179,255],\"score\":0.0746342},\n{\"type\":32, \"data\":[210,144,5],\"color\":[169,159,68,255],\"score\":0.0746138},\n{\"type\":32, \"data\":[359,89,1],\"color\":[107,111,92,255],\"score\":0.0746015},\n{\"type\":32, \"data\":[480,232,7],\"color\":[63,89,36,255],\"score\":0.0745883},\n{\"type\":32, \"data\":[510,133,5],\"color\":[13,22,16,255],\"score\":0.0745732},\n{\"type\":32, \"data\":[217,59,6],\"color\":[250,248,245,255],\"score\":0.0745522},\n{\"type\":32, \"data\":[295,85,6],\"color\":[246,246,245,255],\"score\":0.0745316},\n{\"type\":32, \"data\":[115,128,7],\"color\":[166,203,225,255],\"score\":0.074518},\n{\"type\":32, \"data\":[314,81,9],\"color\":[238,238,238,255],\"score\":0.0745026},\n{\"type\":32, \"data\":[500,110,5],\"color\":[53,139,187,255],\"score\":0.0744846},\n{\"type\":32, \"data\":[327,212,17],\"color\":[70,96,68,255],\"score\":0.0744719},\n{\"type\":32, \"data\":[195,62,3],\"color\":[211,210,212,255],\"score\":0.0744478},\n{\"type\":32, \"data\":[345,324,6],\"color\":[85,111,63,255],\"score\":0.0744342},\n{\"type\":32, \"data\":[497,156,4],\"color\":[8,16,12,255],\"score\":0.0744165},\n{\"type\":32, \"data\":[361,83,5],\"color\":[228,230,227,255],\"score\":0.0743849},\n{\"type\":32, \"data\":[205,121,6],\"color\":[234,234,233,255],\"score\":0.0743705},\n{\"type\":32, \"data\":[179,216,14],\"color\":[77,100,62,255],\"score\":0.07436},\n{\"type\":32, \"data\":[432,177,5],\"color\":[83,105,20,255],\"score\":0.0743441},\n{\"type\":32, \"data\":[223,45,3],\"color\":[25,124,188,255],\"score\":0.0743298},\n{\"type\":32, \"data\":[160,161,7],\"color\":[69,101,65,255],\"score\":0.0743103},\n{\"type\":32, \"data\":[138,65,4],\"color\":[83,161,210,255],\"score\":0.0742743},\n{\"type\":32, \"data\":[93,133,5],\"color\":[76,127,167,255],\"score\":0.0742517},\n{\"type\":32, \"data\":[82,56,4],\"color\":[235,239,239,255],\"score\":0.0742322},\n{\"type\":32, \"data\":[288,98,6],\"color\":[227,228,229,255],\"score\":0.0742126},\n{\"type\":32, \"data\":[498,122,3],\"color\":[126,134,128,255],\"score\":0.074198},\n{\"type\":32, \"data\":[216,140,6],\"color\":[170,157,74,255],\"score\":0.0741813},\n{\"type\":32, \"data\":[451,81,2],\"color\":[50,67,80,255],\"score\":0.074146},\n{\"type\":32, \"data\":[127,100,2],\"color\":[103,161,202,255],\"score\":0.0741337},\n{\"type\":32, \"data\":[445,126,4],\"color\":[104,117,106,255],\"score\":0.0741075},\n{\"type\":32, \"data\":[434,24,4],\"color\":[45,57,41,255],\"score\":0.0740858},\n{\"type\":32, \"data\":[434,38,3],\"color\":[60,108,117,255],\"score\":0.0740684},\n{\"type\":32, \"data\":[8,116,5],\"color\":[175,205,217,255],\"score\":0.0740533},\n{\"type\":32, \"data\":[411,240,8],\"color\":[72,96,81,255],\"score\":0.074044},\n{\"type\":32, \"data\":[248,222,13],\"color\":[82,104,68,255],\"score\":0.0740322},\n{\"type\":32, \"data\":[411,14,3],\"color\":[16,84,184,255],\"score\":0.0740087},\n{\"type\":32, \"data\":[355,150,4],\"color\":[150,160,74,255],\"score\":0.0739926},\n{\"type\":32, \"data\":[332,65,5],\"color\":[165,181,195,255],\"score\":0.0739763},\n{\"type\":32, \"data\":[146,188,10],\"color\":[61,87,56,255],\"score\":0.0739658},\n{\"type\":32, \"data\":[187,136,3],\"color\":[168,162,139,255],\"score\":0.0739492},\n{\"type\":32, \"data\":[369,53,2],\"color\":[10,112,183,255],\"score\":0.073932},\n{\"type\":32, \"data\":[254,136,4],\"color\":[80,91,35,255],\"score\":0.0739152},\n{\"type\":32, \"data\":[498,37,3],\"color\":[138,163,187,255],\"score\":0.0738983},\n{\"type\":32, \"data\":[324,287,15],\"color\":[64,91,43,255],\"score\":0.073887},\n{\"type\":32, \"data\":[481,44,3],\"color\":[61,89,69,255],\"score\":0.073867},\n{\"type\":32, \"data\":[379,120,3],\"color\":[91,99,81,255],\"score\":0.0738507},\n{\"type\":32, \"data\":[467,182,5],\"color\":[65,73,44,255],\"score\":0.0738389},\n{\"type\":32, \"data\":[150,71,4],\"color\":[12,117,197,255],\"score\":0.0738138},\n{\"type\":32, \"data\":[174,58,3],\"color\":[229,231,233,255],\"score\":0.0737867},\n{\"type\":32, \"data\":[235,121,2],\"color\":[117,128,126,255],\"score\":0.0737671},\n{\"type\":32, \"data\":[235,52,4],\"color\":[164,180,196,255],\"score\":0.0737546},\n{\"type\":32, \"data\":[340,0,2],\"color\":[91,141,171,255],\"score\":0.0737346},\n{\"type\":32, \"data\":[450,119,4],\"color\":[58,68,63,255],\"score\":0.0737133},\n{\"type\":32, \"data\":[471,82,6],\"color\":[9,10,12,255],\"score\":0.0736997},\n{\"type\":32, \"data\":[485,167,6],\"color\":[155,158,44,255],\"score\":0.0736836},\n{\"type\":32, \"data\":[498,91,10],\"color\":[36,55,33,255],\"score\":0.0736725},\n{\"type\":32, \"data\":[493,339,12],\"color\":[60,85,48,255],\"score\":0.0736626},\n{\"type\":32, \"data\":[1,170,11],\"color\":[64,86,70,255],\"score\":0.0736509},\n{\"type\":32, \"data\":[125,66,3],\"color\":[94,165,206,255],\"score\":0.0736284},\n{\"type\":32, \"data\":[289,56,4],\"color\":[105,153,190,255],\"score\":0.0736107},\n{\"type\":32, \"data\":[290,75,6],\"color\":[214,217,219,255],\"score\":0.0735976},\n{\"type\":32, \"data\":[12,105,10],\"color\":[106,186,224,255],\"score\":0.0735824},\n{\"type\":32, \"data\":[236,100,6],\"color\":[185,198,208,255],\"score\":0.0735684},\n{\"type\":32, \"data\":[110,70,4],\"color\":[59,153,209,255],\"score\":0.0735488},\n{\"type\":32, \"data\":[410,162,4],\"color\":[142,147,39,255],\"score\":0.0735268},\n{\"type\":32, \"data\":[287,42,5],\"color\":[7,85,175,255],\"score\":0.0735112},\n{\"type\":32, \"data\":[503,2,9],\"color\":[30,44,37,255],\"score\":0.0734945},\n{\"type\":32, \"data\":[496,182,2],\"color\":[70,89,20,255],\"score\":0.0734845},\n{\"type\":32, \"data\":[425,42,2],\"color\":[15,128,195,255],\"score\":0.0734664},\n{\"type\":32, \"data\":[80,129,8],\"color\":[45,112,154,255],\"score\":0.073451},\n{\"type\":32, \"data\":[431,103,2],\"color\":[61,72,71,255],\"score\":0.0734143},\n{\"type\":32, \"data\":[220,29,9],\"color\":[6,63,163,255],\"score\":0.0734047},\n{\"type\":32, \"data\":[184,66,2],\"color\":[194,197,204,255],\"score\":0.0733827},\n{\"type\":32, \"data\":[262,93,4],\"color\":[111,154,188,255],\"score\":0.0733681},\n{\"type\":32, \"data\":[105,149,11],\"color\":[71,114,110,255],\"score\":0.0733585},\n{\"type\":32, \"data\":[214,102,5],\"color\":[192,201,208,255],\"score\":0.0733386},\n{\"type\":32, \"data\":[147,136,3],\"color\":[133,149,146,255],\"score\":0.0733223},\n{\"type\":32, \"data\":[409,111,3],\"color\":[11,18,13,255],\"score\":0.0732984},\n{\"type\":32, \"data\":[70,132,6],\"color\":[16,94,142,255],\"score\":0.0732889},\n{\"type\":32, \"data\":[326,17,4],\"color\":[197,205,211,255],\"score\":0.073272},\n{\"type\":32, \"data\":[304,106,5],\"color\":[40,77,113,255],\"score\":0.0732555},\n{\"type\":32, \"data\":[421,146,7],\"color\":[46,69,16,255],\"score\":0.073237},\n{\"type\":32, \"data\":[485,41,3],\"color\":[153,174,177,255],\"score\":0.0732199},\n{\"type\":32, \"data\":[240,160,4],\"color\":[86,107,51,255],\"score\":0.0732104},\n{\"type\":32, \"data\":[308,26,2],\"color\":[123,153,166,255],\"score\":0.0731801},\n{\"type\":32, \"data\":[479,114,4],\"color\":[47,66,64,255],\"score\":0.0731557},\n{\"type\":32, \"data\":[136,149,5],\"color\":[101,130,92,255],\"score\":0.0731388},\n{\"type\":32, \"data\":[174,24,12],\"color\":[6,65,165,255],\"score\":0.0731295},\n{\"type\":32, \"data\":[318,123,4],\"color\":[168,151,122,255],\"score\":0.0731043},\n{\"type\":32, \"data\":[93,44,9],\"color\":[7,114,201,255],\"score\":0.0730914},\n{\"type\":32, \"data\":[308,11,4],\"color\":[21,112,174,255],\"score\":0.0730714},\n{\"type\":32, \"data\":[80,105,3],\"color\":[118,182,215,255],\"score\":0.073053},\n{\"type\":32, \"data\":[399,41,5],\"color\":[7,116,207,255],\"score\":0.0730367},\n{\"type\":32, \"data\":[176,176,5],\"color\":[47,70,26,255],\"score\":0.0730234},\n{\"type\":32, \"data\":[114,137,3],\"color\":[157,155,139,255],\"score\":0.0730059},\n{\"type\":32, \"data\":[24,85,2],\"color\":[54,173,209,255],\"score\":0.0729824},\n{\"type\":32, \"data\":[322,101,4],\"color\":[120,153,179,255],\"score\":0.0729627},\n{\"type\":32, \"data\":[191,128,6],\"color\":[87,119,147,255],\"score\":0.0729466},\n{\"type\":32, \"data\":[267,0,4],\"color\":[118,153,198,255],\"score\":0.0729169},\n{\"type\":32, \"data\":[284,157,6],\"color\":[47,68,19,255],\"score\":0.0729014},\n{\"type\":32, \"data\":[278,63,2],\"color\":[45,123,176,255],\"score\":0.0728885},\n{\"type\":32, \"data\":[395,94,5],\"color\":[52,67,44,255],\"score\":0.072871},\n{\"type\":32, \"data\":[437,36,2],\"color\":[156,174,177,255],\"score\":0.0728539},\n{\"type\":32, \"data\":[39,144,3],\"color\":[65,99,87,255],\"score\":0.0728449},\n{\"type\":32, \"data\":[165,60,2],\"color\":[212,215,228,255],\"score\":0.0728232},\n{\"type\":32, \"data\":[8,124,3],\"color\":[105,145,166,255],\"score\":0.0727934},\n{\"type\":32, \"data\":[388,61,3],\"color\":[183,187,200,255],\"score\":0.0727683},\n{\"type\":32, \"data\":[375,271,16],\"color\":[61,88,28,255],\"score\":0.0727599},\n{\"type\":32, \"data\":[136,161,5],\"color\":[86,108,50,255],\"score\":0.072743},\n{\"type\":32, \"data\":[307,62,5],\"color\":[137,165,189,255],\"score\":0.0727298},\n{\"type\":32, \"data\":[231,146,7],\"color\":[64,85,19,255],\"score\":0.0727175},\n{\"type\":32, \"data\":[271,134,4],\"color\":[120,122,74,255],\"score\":0.0727049},\n{\"type\":32, \"data\":[497,116,3],\"color\":[29,74,106,255],\"score\":0.0726912},\n{\"type\":32, \"data\":[454,42,2],\"color\":[85,95,72,255],\"score\":0.0726654},\n{\"type\":32, \"data\":[37,66,9],\"color\":[9,139,211,255],\"score\":0.0726528},\n{\"type\":32, \"data\":[258,181,7],\"color\":[26,44,21,255],\"score\":0.0726425},\n{\"type\":32, \"data\":[278,118,6],\"color\":[99,116,135,255],\"score\":0.0726311},\n{\"type\":32, \"data\":[347,37,4],\"color\":[203,215,224,255],\"score\":0.0726182},\n{\"type\":32, \"data\":[466,161,7],\"color\":[28,31,27,255],\"score\":0.0726017},\n{\"type\":32, \"data\":[505,330,5],\"color\":[86,110,80,255],\"score\":0.0725896},\n{\"type\":32, \"data\":[139,69,2],\"color\":[224,233,233,255],\"score\":0.0725707},\n{\"type\":32, \"data\":[378,160,4],\"color\":[46,69,14,255],\"score\":0.072554},\n{\"type\":32, \"data\":[369,100,7],\"color\":[39,53,35,255],\"score\":0.0725347},\n{\"type\":32, \"data\":[506,39,4],\"color\":[49,78,87,255],\"score\":0.0725166},\n{\"type\":32, \"data\":[258,82,3],\"color\":[109,154,187,255],\"score\":0.0725042},\n{\"type\":32, \"data\":[394,307,17],\"color\":[69,92,48,255],\"score\":0.0724959},\n{\"type\":32, \"data\":[350,27,3],\"color\":[18,66,119,255],\"score\":0.0724829},\n{\"type\":32, \"data\":[96,295,5],\"color\":[81,103,103,255],\"score\":0.072472},\n{\"type\":32, \"data\":[18,93,4],\"color\":[220,232,235,255],\"score\":0.0724585},\n{\"type\":32, \"data\":[41,19,9],\"color\":[6,93,189,255],\"score\":0.072448},\n{\"type\":32, \"data\":[395,70,3],\"color\":[138,165,186,255],\"score\":0.072426},\n{\"type\":32, \"data\":[359,108,4],\"color\":[78,103,108,255],\"score\":0.0723957},\n{\"type\":32, \"data\":[215,221,11],\"color\":[79,101,63,255],\"score\":0.0723872},\n{\"type\":32, \"data\":[178,57,2],\"color\":[204,220,221,255],\"score\":0.0723703},\n{\"type\":32, \"data\":[428,9,2],\"color\":[24,102,130,255],\"score\":0.0723555},\n{\"type\":32, \"data\":[193,83,7],\"color\":[191,198,203,255],\"score\":0.0723452},\n{\"type\":32, \"data\":[399,59,4],\"color\":[36,51,32,255],\"score\":0.0723287},\n{\"type\":32, \"data\":[500,60,2],\"color\":[29,59,50,255],\"score\":0.0723114},\n{\"type\":32, \"data\":[287,16,5],\"color\":[9,93,171,255],\"score\":0.0722953},\n{\"type\":32, \"data\":[475,28,4],\"color\":[11,15,15,255],\"score\":0.072279},\n{\"type\":32, \"data\":[205,0,14],\"color\":[4,47,142,255],\"score\":0.0722702},\n{\"type\":32, \"data\":[392,0,3],\"color\":[10,109,161,255],\"score\":0.0722487},\n{\"type\":32, \"data\":[344,100,4],\"color\":[81,94,75,255],\"score\":0.0722353},\n{\"type\":32, \"data\":[181,320,5],\"color\":[81,110,55,255],\"score\":0.0722233},\n{\"type\":32, \"data\":[139,27,10],\"color\":[7,76,175,255],\"score\":0.0722155},\n{\"type\":32, \"data\":[434,106,2],\"color\":[182,194,209,255],\"score\":0.0721932},\n{\"type\":32, \"data\":[141,118,4],\"color\":[211,217,220,255],\"score\":0.0721773},\n{\"type\":32, \"data\":[169,148,4],\"color\":[121,141,89,255],\"score\":0.072163},\n{\"type\":32, \"data\":[119,160,2],\"color\":[132,157,98,255],\"score\":0.0721492},\n{\"type\":32, \"data\":[401,0,2],\"color\":[10,115,179,255],\"score\":0.0721345},\n{\"type\":32, \"data\":[260,46,2],\"color\":[113,163,189,255],\"score\":0.0721232},\n{\"type\":32, \"data\":[325,312,11],\"color\":[52,82,34,255],\"score\":0.0721167},\n{\"type\":32, \"data\":[456,72,6],\"color\":[120,150,176,255],\"score\":0.0721042},\n{\"type\":32, \"data\":[295,28,6],\"color\":[81,146,198,255],\"score\":0.0720931},\n{\"type\":32, \"data\":[424,104,2],\"color\":[25,34,29,255],\"score\":0.072071},\n{\"type\":32, \"data\":[171,79,3],\"color\":[171,187,206,255],\"score\":0.0720512},\n{\"type\":32, \"data\":[114,273,10],\"color\":[58,89,47,255],\"score\":0.0720437},\n{\"type\":32, \"data\":[257,29,4],\"color\":[10,104,190,255],\"score\":0.0720327},\n{\"type\":32, \"data\":[422,99,3],\"color\":[126,133,122,255],\"score\":0.072014},\n{\"type\":32, \"data\":[320,0,7],\"color\":[47,127,173,255],\"score\":0.0720042},\n{\"type\":32, \"data\":[317,156,5],\"color\":[130,136,34,255],\"score\":0.0719915},\n{\"type\":32, \"data\":[232,135,6],\"color\":[89,97,43,255],\"score\":0.0719807},\n{\"type\":32, \"data\":[429,32,2],\"color\":[95,101,99,255],\"score\":0.0719644},\n{\"type\":32, \"data\":[334,193,4],\"color\":[30,52,22,255],\"score\":0.0719519},\n{\"type\":32, \"data\":[441,119,4],\"color\":[52,70,65,255],\"score\":0.0719309},\n{\"type\":32, \"data\":[345,95,2],\"color\":[157,162,147,255],\"score\":0.0719131},\n{\"type\":32, \"data\":[387,176,2],\"color\":[154,165,52,255],\"score\":0.0719024},\n{\"type\":32, \"data\":[290,127,4],\"color\":[179,157,104,255],\"score\":0.071886},\n{\"type\":32, \"data\":[16,2,19],\"color\":[7,88,184,255],\"score\":0.0718773},\n{\"type\":32, \"data\":[369,71,2],\"color\":[76,89,105,255],\"score\":0.0718438},\n{\"type\":32, \"data\":[390,54,4],\"color\":[28,52,34,255],\"score\":0.0718298},\n{\"type\":32, \"data\":[457,85,4],\"color\":[111,140,167,255],\"score\":0.0718047},\n{\"type\":32, \"data\":[184,42,3],\"color\":[27,117,199,255],\"score\":0.0717922},\n{\"type\":32, \"data\":[353,20,4],\"color\":[8,94,187,255],\"score\":0.0717777},\n{\"type\":32, \"data\":[490,179,3],\"color\":[88,110,65,255],\"score\":0.0717626},\n{\"type\":32, \"data\":[460,108,1],\"color\":[159,167,180,255],\"score\":0.0717471},\n{\"type\":32, \"data\":[458,157,2],\"color\":[150,146,38,255],\"score\":0.071736},\n{\"type\":32, \"data\":[90,340,8],\"color\":[81,101,40,255],\"score\":0.0717224},\n{\"type\":32, \"data\":[419,120,3],\"color\":[149,143,132,255],\"score\":0.0717048},\n{\"type\":32, \"data\":[328,10,2],\"color\":[98,121,127,255],\"score\":0.0716906},\n{\"type\":32, \"data\":[479,92,5],\"color\":[40,59,44,255],\"score\":0.0716779},\n{\"type\":32, \"data\":[301,29,3],\"color\":[135,173,204,255],\"score\":0.0716531},\n{\"type\":32, \"data\":[78,96,8],\"color\":[221,226,227,255],\"score\":0.0716372},\n{\"type\":32, \"data\":[473,10,4],\"color\":[8,9,9,255],\"score\":0.0716268},\n{\"type\":32, \"data\":[267,315,9],\"color\":[48,78,28,255],\"score\":0.0716179},\n{\"type\":32, \"data\":[447,103,3],\"color\":[194,200,205,255],\"score\":0.0715939},\n{\"type\":32, \"data\":[439,101,2],\"color\":[63,67,75,255],\"score\":0.0715737},\n{\"type\":32, \"data\":[229,126,2],\"color\":[176,189,188,255],\"score\":0.0715568},\n{\"type\":32, \"data\":[504,27,3],\"color\":[25,54,70,255],\"score\":0.0715458},\n{\"type\":32, \"data\":[423,3,2],\"color\":[12,79,119,255],\"score\":0.0715315},\n{\"type\":32, \"data\":[361,91,3],\"color\":[104,114,88,255],\"score\":0.0715185},\n{\"type\":32, \"data\":[458,79,1],\"color\":[24,34,40,255],\"score\":0.0715028},\n{\"type\":32, \"data\":[424,110,3],\"color\":[48,109,147,255],\"score\":0.0714824},\n{\"type\":32, \"data\":[141,172,6],\"color\":[44,68,24,255],\"score\":0.0714685},\n{\"type\":32, \"data\":[58,300,14],\"color\":[51,82,34,255],\"score\":0.0714603},\n{\"type\":32, \"data\":[280,225,8],\"color\":[85,106,68,255],\"score\":0.0714516},\n{\"type\":32, \"data\":[219,170,8],\"color\":[69,95,25,255],\"score\":0.0714423},\n{\"type\":32, \"data\":[279,295,5],\"color\":[75,98,51,255],\"score\":0.0714356},\n{\"type\":32, \"data\":[368,310,4],\"color\":[47,63,47,255],\"score\":0.0714258},\n{\"type\":32, \"data\":[273,9,3],\"color\":[80,138,189,255],\"score\":0.07141},\n{\"type\":32, \"data\":[447,108,3],\"color\":[42,99,138,255],\"score\":0.0713935},\n{\"type\":32, \"data\":[119,67,2],\"color\":[76,163,212,255],\"score\":0.0713696},\n{\"type\":32, \"data\":[378,174,4],\"color\":[67,87,19,255],\"score\":0.0713556},\n{\"type\":32, \"data\":[310,219,5],\"color\":[52,76,50,255],\"score\":0.0713446},\n{\"type\":32, \"data\":[343,23,4],\"color\":[19,112,188,255],\"score\":0.0713282},\n{\"type\":32, \"data\":[318,128,3],\"color\":[77,97,95,255],\"score\":0.0713126},\n{\"type\":32, \"data\":[115,63,2],\"color\":[204,212,223,255],\"score\":0.0712934},\n{\"type\":32, \"data\":[452,192,12],\"color\":[48,73,24,255],\"score\":0.0712828},\n{\"type\":32, \"data\":[461,24,1],\"color\":[127,134,141,255],\"score\":0.0712662},\n{\"type\":32, \"data\":[181,105,5],\"color\":[246,243,240,255],\"score\":0.0712534},\n{\"type\":32, \"data\":[441,171,5],\"color\":[110,117,36,255],\"score\":0.0712406},\n{\"type\":32, \"data\":[166,176,4],\"color\":[43,62,24,255],\"score\":0.0712322},\n{\"type\":32, \"data\":[508,179,5],\"color\":[93,102,44,255],\"score\":0.0712173},\n{\"type\":32, \"data\":[179,149,6],\"color\":[100,127,91,255],\"score\":0.071209},\n{\"type\":32, \"data\":[75,166,7],\"color\":[33,60,30,255],\"score\":0.0711996},\n{\"type\":32, \"data\":[509,293,4],\"color\":[95,105,84,255],\"score\":0.071191},\n{\"type\":32, \"data\":[319,34,2],\"color\":[206,209,208,255],\"score\":0.0711624},\n{\"type\":32, \"data\":[460,29,3],\"color\":[24,27,31,255],\"score\":0.0711481},\n{\"type\":32, \"data\":[200,142,4],\"color\":[91,117,96,255],\"score\":0.0711322},\n{\"type\":32, \"data\":[311,35,2],\"color\":[62,87,79,255],\"score\":0.0711078},\n{\"type\":32, \"data\":[498,79,3],\"color\":[104,146,161,255],\"score\":0.0710855},\n{\"type\":32, \"data\":[13,133,2],\"color\":[115,162,191,255],\"score\":0.0710671},\n{\"type\":32, \"data\":[236,57,5],\"color\":[200,203,205,255],\"score\":0.0710572},\n{\"type\":32, \"data\":[344,227,5],\"color\":[56,68,77,255],\"score\":0.0710465},\n{\"type\":32, \"data\":[397,10,3],\"color\":[9,24,38,255],\"score\":0.0710285},\n{\"type\":32, \"data\":[304,40,3],\"color\":[125,164,202,255],\"score\":0.0710168},\n{\"type\":32, \"data\":[98,286,4],\"color\":[40,66,64,255],\"score\":0.0710053},\n{\"type\":32, \"data\":[173,141,4],\"color\":[48,96,109,255],\"score\":0.0709914},\n{\"type\":32, \"data\":[443,38,2],\"color\":[138,154,164,255],\"score\":0.0709769},\n{\"type\":32, \"data\":[365,20,3],\"color\":[9,42,82,255],\"score\":0.0709667},\n{\"type\":32, \"data\":[112,80,5],\"color\":[247,248,247,255],\"score\":0.0709499},\n{\"type\":32, \"data\":[462,72,2],\"color\":[46,47,61,255],\"score\":0.0709365},\n{\"type\":32, \"data\":[442,76,4],\"color\":[183,199,212,255],\"score\":0.0709214},\n{\"type\":32, \"data\":[439,105,2],\"color\":[201,213,212,255],\"score\":0.070902},\n{\"type\":32, \"data\":[480,147,4],\"color\":[120,136,66,255],\"score\":0.0708899},\n{\"type\":32, \"data\":[417,172,3],\"color\":[150,144,53,255],\"score\":0.0708718},\n{\"type\":32, \"data\":[362,304,4],\"color\":[70,98,83,255],\"score\":0.0708633},\n{\"type\":32, \"data\":[322,42,3],\"color\":[128,163,194,255],\"score\":0.0708376},\n{\"type\":32, \"data\":[422,96,1],\"color\":[205,217,201,255],\"score\":0.0708174},\n{\"type\":32, \"data\":[413,167,3],\"color\":[61,83,15,255],\"score\":0.0708042},\n{\"type\":32, \"data\":[38,90,2],\"color\":[42,167,212,255],\"score\":0.0707865},\n{\"type\":32, \"data\":[9,139,3],\"color\":[61,90,70,255],\"score\":0.0707775},\n{\"type\":32, \"data\":[121,62,4],\"color\":[210,219,222,255],\"score\":0.0707612},\n{\"type\":32, \"data\":[419,49,7],\"color\":[37,60,33,255],\"score\":0.07075},\n{\"type\":32, \"data\":[431,26,1],\"color\":[143,142,139,255],\"score\":0.0707348},\n{\"type\":32, \"data\":[473,107,5],\"color\":[29,30,31,255],\"score\":0.0707224},\n{\"type\":32, \"data\":[436,12,5],\"color\":[34,44,35,255],\"score\":0.0707027},\n{\"type\":32, \"data\":[345,259,22],\"color\":[62,90,29,255],\"score\":0.0706946},\n{\"type\":32, \"data\":[370,163,3],\"color\":[45,62,14,255],\"score\":0.0706814},\n{\"type\":32, \"data\":[201,135,4],\"color\":[179,159,123,255],\"score\":0.0706649},\n{\"type\":32, \"data\":[20,59,2],\"color\":[101,181,222,255],\"score\":0.0706497},\n{\"type\":32, \"data\":[481,309,7],\"color\":[85,105,70,255],\"score\":0.0706382},\n{\"type\":32, \"data\":[160,120,3],\"color\":[122,147,156,255],\"score\":0.0706215},\n{\"type\":32, \"data\":[136,131,4],\"color\":[52,106,138,255],\"score\":0.0706086},\n{\"type\":32, \"data\":[43,98,6],\"color\":[250,251,248,255],\"score\":0.0705933},\n{\"type\":32, \"data\":[139,311,8],\"color\":[50,77,35,255],\"score\":0.0705824},\n{\"type\":32, \"data\":[373,114,5],\"color\":[29,47,35,255],\"score\":0.0705713},\n{\"type\":32, \"data\":[86,129,2],\"color\":[108,152,181,255],\"score\":0.0705586},\n{\"type\":32, \"data\":[497,130,6],\"color\":[41,58,39,255],\"score\":0.0705506},\n{\"type\":32, \"data\":[409,124,3],\"color\":[55,85,24,255],\"score\":0.0705387},\n{\"type\":32, \"data\":[0,121,4],\"color\":[48,71,65,255],\"score\":0.0705275},\n{\"type\":32, \"data\":[326,33,1],\"color\":[193,195,194,255],\"score\":0.0705079},\n{\"type\":32, \"data\":[427,287,7],\"color\":[64,94,35,255],\"score\":0.0704999},\n{\"type\":32, \"data\":[189,113,5],\"color\":[198,204,209,255],\"score\":0.0704868},\n{\"type\":32, \"data\":[75,63,2],\"color\":[22,143,209,255],\"score\":0.070472},\n{\"type\":32, \"data\":[482,68,2],\"color\":[59,98,115,255],\"score\":0.0704589},\n{\"type\":32, \"data\":[329,322,9],\"color\":[70,98,46,255],\"score\":0.0704504},\n{\"type\":32, \"data\":[486,125,3],\"color\":[110,122,109,255],\"score\":0.0704379},\n{\"type\":32, \"data\":[302,121,4],\"color\":[144,138,133,255],\"score\":0.0704225},\n{\"type\":32, \"data\":[312,3,3],\"color\":[106,154,194,255],\"score\":0.0704081},\n{\"type\":32, \"data\":[371,332,15],\"color\":[75,94,54,255],\"score\":0.0704009},\n{\"type\":32, \"data\":[121,106,2],\"color\":[140,179,206,255],\"score\":0.0703908},\n{\"type\":32, \"data\":[79,194,21],\"color\":[75,94,69,255],\"score\":0.0703836},\n{\"type\":32, \"data\":[445,94,3],\"color\":[204,209,211,255],\"score\":0.0703691},\n{\"type\":32, \"data\":[419,38,2],\"color\":[95,125,122,255],\"score\":0.070352},\n{\"type\":32, \"data\":[329,14,2],\"color\":[159,176,184,255],\"score\":0.0703378},\n{\"type\":32, \"data\":[52,162,7],\"color\":[20,43,18,255],\"score\":0.0703299},\n{\"type\":32, \"data\":[211,92,3],\"color\":[96,151,186,255],\"score\":0.0703203},\n{\"type\":32, \"data\":[457,32,2],\"color\":[103,132,152,255],\"score\":0.0703056},\n{\"type\":32, \"data\":[311,312,1],\"color\":[146,174,123,255],\"score\":0.0702892},\n{\"type\":32, \"data\":[91,299,4],\"color\":[72,90,87,255],\"score\":0.0702791},\n{\"type\":32, \"data\":[436,120,2],\"color\":[118,126,133,255],\"score\":0.0702687},\n{\"type\":32, \"data\":[355,34,4],\"color\":[199,213,225,255],\"score\":0.0702565},\n{\"type\":32, \"data\":[144,162,3],\"color\":[114,138,79,255],\"score\":0.0702466},\n{\"type\":32, \"data\":[449,308,9],\"color\":[75,98,59,255],\"score\":0.070237},\n{\"type\":32, \"data\":[71,66,3],\"color\":[146,190,216,255],\"score\":0.0702234},\n{\"type\":32, \"data\":[261,11,5],\"color\":[7,87,174,255],\"score\":0.0702097},\n{\"type\":32, \"data\":[208,252,9],\"color\":[58,85,27,255],\"score\":0.0702033},\n{\"type\":32, \"data\":[317,189,5],\"color\":[18,34,14,255],\"score\":0.07019},\n{\"type\":32, \"data\":[481,157,5],\"color\":[75,91,29,255],\"score\":0.0701791},\n{\"type\":32, \"data\":[496,163,3],\"color\":[76,81,32,255],\"score\":0.0701644},\n{\"type\":32, \"data\":[189,332,3],\"color\":[112,115,76,255],\"score\":0.0701427},\n{\"type\":32, \"data\":[345,29,2],\"color\":[91,147,195,255],\"score\":0.070132},\n{\"type\":32, \"data\":[341,292,12],\"color\":[68,94,45,255],\"score\":0.0701247},\n{\"type\":32, \"data\":[313,123,2],\"color\":[196,163,133,255],\"score\":0.0701118},\n{\"type\":32, \"data\":[334,97,3],\"color\":[213,218,213,255],\"score\":0.070094},\n{\"type\":32, \"data\":[501,74,1],\"color\":[19,40,68,255],\"score\":0.0700861},\n{\"type\":32, \"data\":[362,167,5],\"color\":[52,69,23,255],\"score\":0.0700756},\n{\"type\":32, \"data\":[270,129,3],\"color\":[186,158,108,255],\"score\":0.0700612},\n{\"type\":32, \"data\":[439,156,5],\"color\":[57,64,36,255],\"score\":0.0700502},\n{\"type\":32, \"data\":[3,188,2],\"color\":[26,35,30,255],\"score\":0.0700389},\n{\"type\":32, \"data\":[240,78,5],\"color\":[203,210,215,255],\"score\":0.0700278},\n{\"type\":32, \"data\":[452,66,2],\"color\":[56,85,110,255],\"score\":0.0700136},\n{\"type\":32, \"data\":[94,151,4],\"color\":[125,143,96,255],\"score\":0.0699979},\n{\"type\":32, \"data\":[388,5,4],\"color\":[19,62,76,255],\"score\":0.0699895},\n{\"type\":32, \"data\":[368,240,6],\"color\":[79,106,50,255],\"score\":0.0699806},\n{\"type\":32, \"data\":[101,110,2],\"color\":[139,184,203,255],\"score\":0.0699636},\n{\"type\":32, \"data\":[190,195,10],\"color\":[59,86,57,255],\"score\":0.0699539},\n{\"type\":32, \"data\":[256,205,9],\"color\":[63,90,63,255],\"score\":0.0699463},\n{\"type\":32, \"data\":[273,119,4],\"color\":[76,104,132,255],\"score\":0.0699373},\n{\"type\":32, \"data\":[509,10,4],\"color\":[45,93,113,255],\"score\":0.0699248},\n{\"type\":32, \"data\":[337,118,3],\"color\":[44,57,44,255],\"score\":0.0699135},\n{\"type\":32, \"data\":[348,141,8],\"color\":[93,122,101,255],\"score\":0.0698984},\n{\"type\":32, \"data\":[260,66,4],\"color\":[212,215,220,255],\"score\":0.0698862},\n{\"type\":32, \"data\":[116,254,7],\"color\":[51,73,36,255],\"score\":0.0698773},\n{\"type\":32, \"data\":[388,121,3],\"color\":[117,116,102,255],\"score\":0.0698664}\n]}";
ShapeDatasets.mountain_view = "{\"shapes\":\n[{\"type\":1, \"data\":[0,0,512,288],\"color\":[123,84,101,255],\"score\":0.1836},\n{\"type\":32, \"data\":[479,28,31],\"color\":[244,152,96,255],\"score\":0.179547},\n{\"type\":32, \"data\":[418,29,31],\"color\":[244,145,100,255],\"score\":0.175565},\n{\"type\":32, \"data\":[356,31,32],\"color\":[236,130,106,255],\"score\":0.172028},\n{\"type\":32, \"data\":[390,73,29],\"color\":[234,145,89,255],\"score\":0.169119},\n{\"type\":32, \"data\":[295,41,31],\"color\":[225,114,105,255],\"score\":0.166524},\n{\"type\":32, \"data\":[179,157,32],\"color\":[22,71,119,255],\"score\":0.163849},\n{\"type\":32, \"data\":[120,182,32],\"color\":[24,67,116,255],\"score\":0.161236},\n{\"type\":32, \"data\":[58,166,32],\"color\":[39,94,152,255],\"score\":0.158711},\n{\"type\":32, \"data\":[258,137,31],\"color\":[25,58,103,255],\"score\":0.156198},\n{\"type\":32, \"data\":[455,71,30],\"color\":[233,113,104,255],\"score\":0.1536},\n{\"type\":32, \"data\":[235,34,32],\"color\":[215,110,105,255],\"score\":0.151116},\n{\"type\":32, \"data\":[315,125,29],\"color\":[31,49,92,255],\"score\":0.148912},\n{\"type\":32, \"data\":[481,131,32],\"color\":[43,42,55,255],\"score\":0.146051},\n{\"type\":32, \"data\":[371,128,28],\"color\":[37,45,77,255],\"score\":0.143968},\n{\"type\":32, \"data\":[175,28,31],\"color\":[205,106,103,255],\"score\":0.142067},\n{\"type\":32, \"data\":[114,24,32],\"color\":[197,102,102,255],\"score\":0.140481},\n{\"type\":32, \"data\":[113,136,32],\"color\":[47,83,149,255],\"score\":0.138614},\n{\"type\":32, \"data\":[29,204,32],\"color\":[30,70,118,255],\"score\":0.136303},\n{\"type\":32, \"data\":[426,134,29],\"color\":[41,51,72,255],\"score\":0.134231},\n{\"type\":32, \"data\":[334,69,31],\"color\":[225,111,113,255],\"score\":0.132104},\n{\"type\":32, \"data\":[22,141,31],\"color\":[50,87,157,255],\"score\":0.130361},\n{\"type\":32, \"data\":[219,147,30],\"color\":[22,64,110,255],\"score\":0.128781},\n{\"type\":32, \"data\":[483,204,29],\"color\":[72,71,44,255],\"score\":0.127212},\n{\"type\":32, \"data\":[495,67,29],\"color\":[235,105,100,255],\"score\":0.125676},\n{\"type\":32, \"data\":[56,25,32],\"color\":[183,91,98,255],\"score\":0.124564},\n{\"type\":32, \"data\":[262,74,28],\"color\":[204,92,122,255],\"score\":0.123265},\n{\"type\":32, \"data\":[323,183,30],\"color\":[79,86,53,255],\"score\":0.122022},\n{\"type\":32, \"data\":[79,208,20],\"color\":[31,64,108,255],\"score\":0.120945},\n{\"type\":32, \"data\":[158,183,32],\"color\":[27,67,109,255],\"score\":0.119971},\n{\"type\":32, \"data\":[442,203,31],\"color\":[91,89,47,255],\"score\":0.118831},\n{\"type\":32, \"data\":[63,107,29],\"color\":[75,61,128,255],\"score\":0.117918},\n{\"type\":32, \"data\":[457,0,28],\"color\":[246,174,104,255],\"score\":0.117057},\n{\"type\":32, \"data\":[296,15,32],\"color\":[219,121,108,255],\"score\":0.116176},\n{\"type\":32, \"data\":[275,185,30],\"color\":[79,85,69,255],\"score\":0.115481},\n{\"type\":32, \"data\":[487,170,30],\"color\":[81,82,46,255],\"score\":0.114667},\n{\"type\":32, \"data\":[387,6,20],\"color\":[239,146,109,255],\"score\":0.113976},\n{\"type\":32, \"data\":[23,85,29],\"color\":[90,43,95,255],\"score\":0.113273},\n{\"type\":32, \"data\":[218,89,27],\"color\":[159,83,138,255],\"score\":0.112665},\n{\"type\":32, \"data\":[511,11,32],\"color\":[244,168,98,255],\"score\":0.11202},\n{\"type\":32, \"data\":[208,182,21],\"color\":[38,77,101,255],\"score\":0.111466},\n{\"type\":32, \"data\":[423,72,22],\"color\":[235,128,79,255],\"score\":0.110937},\n{\"type\":32, \"data\":[157,113,20],\"color\":[84,83,151,255],\"score\":0.110399},\n{\"type\":32, \"data\":[380,174,32],\"color\":[82,93,75,255],\"score\":0.109717},\n{\"type\":32, \"data\":[292,120,26],\"color\":[26,46,92,255],\"score\":0.109217},\n{\"type\":32, \"data\":[511,124,31],\"color\":[38,31,47,255],\"score\":0.108733},\n{\"type\":32, \"data\":[343,133,31],\"color\":[35,51,84,255],\"score\":0.10826},\n{\"type\":32, \"data\":[355,252,20],\"color\":[167,70,140,255],\"score\":0.107707},\n{\"type\":32, \"data\":[265,258,31],\"color\":[147,68,127,255],\"score\":0.107162},\n{\"type\":32, \"data\":[5,286,18],\"color\":[182,60,176,255],\"score\":0.10671},\n{\"type\":32, \"data\":[202,34,31],\"color\":[210,106,103,255],\"score\":0.106335},\n{\"type\":32, \"data\":[465,261,18],\"color\":[165,78,143,255],\"score\":0.105889},\n{\"type\":32, \"data\":[408,252,27],\"color\":[156,91,124,255],\"score\":0.105412},\n{\"type\":32, \"data\":[21,27,28],\"color\":[171,84,96,255],\"score\":0.105069},\n{\"type\":32, \"data\":[149,28,31],\"color\":[200,104,103,255],\"score\":0.104755},\n{\"type\":32, \"data\":[8,182,20],\"color\":[27,75,129,255],\"score\":0.104447},\n{\"type\":32, \"data\":[238,193,20],\"color\":[80,89,62,255],\"score\":0.104098},\n{\"type\":32, \"data\":[396,127,23],\"color\":[39,46,79,255],\"score\":0.103779},\n{\"type\":32, \"data\":[360,281,17],\"color\":[77,50,72,255],\"score\":0.103344},\n{\"type\":32, \"data\":[149,157,25],\"color\":[23,75,128,255],\"score\":0.10305},\n{\"type\":32, \"data\":[289,72,20],\"color\":[215,96,117,255],\"score\":0.102704},\n{\"type\":32, \"data\":[112,82,29],\"color\":[118,54,107,255],\"score\":0.102413},\n{\"type\":32, \"data\":[361,91,10],\"color\":[219,120,148,255],\"score\":0.102089},\n{\"type\":32, \"data\":[79,158,31],\"color\":[41,96,156,255],\"score\":0.10182},\n{\"type\":32, \"data\":[115,202,20],\"color\":[27,52,96,255],\"score\":0.101491},\n{\"type\":32, \"data\":[83,259,20],\"color\":[145,57,123,255],\"score\":0.101215},\n{\"type\":32, \"data\":[421,288,18],\"color\":[72,44,74,255],\"score\":0.100863},\n{\"type\":32, \"data\":[447,134,29],\"color\":[39,47,63,255],\"score\":0.100433},\n{\"type\":32, \"data\":[189,111,17],\"color\":[93,87,152,255],\"score\":0.100101},\n{\"type\":32, \"data\":[342,4,18],\"color\":[224,133,111,255],\"score\":0.0998748},\n{\"type\":32, \"data\":[172,76,22],\"color\":[150,61,110,255],\"score\":0.0996431},\n{\"type\":32, \"data\":[173,236,30],\"color\":[124,94,75,255],\"score\":0.099335},\n{\"type\":32, \"data\":[392,81,7],\"color\":[242,216,175,255],\"score\":0.0990914},\n{\"type\":32, \"data\":[448,222,24],\"color\":[90,86,49,255],\"score\":0.0989034},\n{\"type\":32, \"data\":[312,249,20],\"color\":[157,83,125,255],\"score\":0.098617},\n{\"type\":32, \"data\":[498,267,14],\"color\":[157,83,141,255],\"score\":0.0983908},\n{\"type\":32, \"data\":[237,257,32],\"color\":[146,67,123,255],\"score\":0.0981287},\n{\"type\":32, \"data\":[67,76,20],\"color\":[109,44,92,255],\"score\":0.0979123},\n{\"type\":32, \"data\":[497,214,20],\"color\":[52,54,45,255],\"score\":0.0976954},\n{\"type\":32, \"data\":[47,267,8],\"color\":[182,67,168,255],\"score\":0.09748},\n{\"type\":32, \"data\":[297,154,14],\"color\":[54,76,98,255],\"score\":0.0972972},\n{\"type\":32, \"data\":[312,285,9],\"color\":[184,41,173,255],\"score\":0.0970521},\n{\"type\":32, \"data\":[270,0,24],\"color\":[201,115,112,255],\"score\":0.096873},\n{\"type\":32, \"data\":[7,219,20],\"color\":[33,66,112,255],\"score\":0.0966778},\n{\"type\":32, \"data\":[471,92,11],\"color\":[208,118,151,255],\"score\":0.0963902},\n{\"type\":32, \"data\":[51,243,11],\"color\":[152,121,65,255],\"score\":0.0962106},\n{\"type\":32, \"data\":[406,193,17],\"color\":[116,112,57,255],\"score\":0.0960303},\n{\"type\":32, \"data\":[429,95,12],\"color\":[182,114,156,255],\"score\":0.0958102},\n{\"type\":32, \"data\":[494,153,19],\"color\":[71,64,59,255],\"score\":0.0956324},\n{\"type\":32, \"data\":[57,209,23],\"color\":[32,68,112,255],\"score\":0.0954496},\n{\"type\":32, \"data\":[428,255,14],\"color\":[185,89,156,255],\"score\":0.0951686},\n{\"type\":32, \"data\":[140,199,17],\"color\":[24,46,92,255],\"score\":0.0950158},\n{\"type\":32, \"data\":[335,200,26],\"color\":[102,101,54,255],\"score\":0.0948504},\n{\"type\":32, \"data\":[21,249,13],\"color\":[143,112,64,255],\"score\":0.0946645},\n{\"type\":32, \"data\":[209,211,14],\"color\":[117,108,67,255],\"score\":0.0945055},\n{\"type\":32, \"data\":[234,99,15],\"color\":[156,104,160,255],\"score\":0.0943334},\n{\"type\":32, \"data\":[91,27,31],\"color\":[192,97,100,255],\"score\":0.0941711},\n{\"type\":32, \"data\":[222,71,20],\"color\":[187,73,113,255],\"score\":0.0940209},\n{\"type\":32, \"data\":[398,151,27],\"color\":[56,68,90,255],\"score\":0.0938693},\n{\"type\":32, \"data\":[208,285,11],\"color\":[70,50,63,255],\"score\":0.0936744},\n{\"type\":32, \"data\":[279,272,9],\"color\":[92,59,81,255],\"score\":0.0934909},\n{\"type\":32, \"data\":[154,276,12],\"color\":[151,61,130,255],\"score\":0.0933598},\n{\"type\":32, \"data\":[259,158,20],\"color\":[39,72,102,255],\"score\":0.0932622},\n{\"type\":32, \"data\":[474,246,11],\"color\":[122,98,87,255],\"score\":0.0931268},\n{\"type\":32, \"data\":[236,132,19],\"color\":[19,52,99,255],\"score\":0.0930268},\n{\"type\":32, \"data\":[338,287,6],\"color\":[205,55,193,255],\"score\":0.0928849},\n{\"type\":32, \"data\":[70,238,10],\"color\":[141,115,59,255],\"score\":0.0927208},\n{\"type\":32, \"data\":[234,262,17],\"color\":[120,67,101,255],\"score\":0.092577},\n{\"type\":32, \"data\":[358,115,15],\"color\":[26,30,64,255],\"score\":0.0924464},\n{\"type\":32, \"data\":[381,191,17],\"color\":[105,112,52,255],\"score\":0.0923182},\n{\"type\":32, \"data\":[384,287,13],\"color\":[77,49,75,255],\"score\":0.0921765},\n{\"type\":32, \"data\":[71,284,12],\"color\":[100,73,62,255],\"score\":0.0920688},\n{\"type\":32, \"data\":[451,96,10],\"color\":[185,122,164,255],\"score\":0.0918921},\n{\"type\":32, \"data\":[408,75,11],\"color\":[238,170,44,255],\"score\":0.0917507},\n{\"type\":32, \"data\":[408,238,13],\"color\":[137,104,92,255],\"score\":0.0916361},\n{\"type\":32, \"data\":[346,94,8],\"color\":[205,126,164,255],\"score\":0.091518},\n{\"type\":32, \"data\":[15,113,17],\"color\":[64,62,135,255],\"score\":0.0914061},\n{\"type\":32, \"data\":[390,269,7],\"color\":[205,66,184,255],\"score\":0.0912281},\n{\"type\":32, \"data\":[379,48,18],\"color\":[238,124,100,255],\"score\":0.0911244},\n{\"type\":32, \"data\":[271,221,16],\"color\":[144,83,110,255],\"score\":0.0909777},\n{\"type\":32, \"data\":[269,284,7],\"color\":[199,42,183,255],\"score\":0.0908654},\n{\"type\":32, \"data\":[138,69,19],\"color\":[145,56,100,255],\"score\":0.0907654},\n{\"type\":32, \"data\":[376,93,8],\"color\":[224,124,145,255],\"score\":0.0906462},\n{\"type\":32, \"data\":[459,61,28],\"color\":[240,114,93,255],\"score\":0.0905565},\n{\"type\":32, \"data\":[334,230,16],\"color\":[135,87,104,255],\"score\":0.090405},\n{\"type\":32, \"data\":[214,108,11],\"color\":[117,103,165,255],\"score\":0.090296},\n{\"type\":32, \"data\":[378,74,11],\"color\":[235,166,47,255],\"score\":0.0901761},\n{\"type\":32, \"data\":[478,267,11],\"color\":[183,65,164,255],\"score\":0.0900502},\n{\"type\":32, \"data\":[378,169,15],\"color\":[78,94,107,255],\"score\":0.0899276},\n{\"type\":32, \"data\":[448,258,8],\"color\":[189,63,164,255],\"score\":0.089804},\n{\"type\":32, \"data\":[177,232,9],\"color\":[145,66,118,255],\"score\":0.0896922},\n{\"type\":32, \"data\":[191,177,27],\"color\":[29,75,112,255],\"score\":0.0895971},\n{\"type\":32, \"data\":[252,98,9],\"color\":[167,110,163,255],\"score\":0.0895007},\n{\"type\":32, \"data\":[481,287,10],\"color\":[79,45,81,255],\"score\":0.0894063},\n{\"type\":32, \"data\":[279,252,10],\"color\":[182,70,155,255],\"score\":0.0893125},\n{\"type\":32, \"data\":[445,151,15],\"color\":[46,55,42,255],\"score\":0.0892296},\n{\"type\":32, \"data\":[125,103,15],\"color\":[95,69,136,255],\"score\":0.0891449},\n{\"type\":32, \"data\":[117,233,14],\"color\":[124,85,74,255],\"score\":0.0890613},\n{\"type\":32, \"data\":[113,257,12],\"color\":[148,66,123,255],\"score\":0.0889655},\n{\"type\":32, \"data\":[163,231,6],\"color\":[157,69,125,255],\"score\":0.088899},\n{\"type\":32, \"data\":[65,127,19],\"color\":[57,79,153,255],\"score\":0.0888207},\n{\"type\":32, \"data\":[214,0,23],\"color\":[198,113,110,255],\"score\":0.0887474},\n{\"type\":32, \"data\":[496,114,17],\"color\":[21,18,41,255],\"score\":0.0886537},\n{\"type\":32, \"data\":[81,273,4],\"color\":[61,29,59,255],\"score\":0.0885722},\n{\"type\":32, \"data\":[485,89,10],\"color\":[215,108,140,255],\"score\":0.0884844},\n{\"type\":32, \"data\":[504,279,4],\"color\":[207,44,198,255],\"score\":0.0884005},\n{\"type\":32, \"data\":[244,282,6],\"color\":[200,51,181,255],\"score\":0.0882934},\n{\"type\":32, \"data\":[408,97,9],\"color\":[183,113,159,255],\"score\":0.0881397},\n{\"type\":32, \"data\":[190,57,15],\"color\":[191,79,102,255],\"score\":0.0880615},\n{\"type\":32, \"data\":[234,208,11],\"color\":[110,110,58,255],\"score\":0.0880001},\n{\"type\":32, \"data\":[37,287,9],\"color\":[173,72,159,255],\"score\":0.0878798},\n{\"type\":32, \"data\":[360,72,12],\"color\":[231,124,78,255],\"score\":0.0878203},\n{\"type\":32, \"data\":[412,264,8],\"color\":[187,67,167,255],\"score\":0.0877113},\n{\"type\":32, \"data\":[335,258,7],\"color\":[189,74,161,255],\"score\":0.0876082},\n{\"type\":32, \"data\":[340,165,15],\"color\":[63,67,61,255],\"score\":0.0875261},\n{\"type\":32, \"data\":[186,100,13],\"color\":[128,87,149,255],\"score\":0.087464},\n{\"type\":32, \"data\":[109,287,18],\"color\":[125,90,75,255],\"score\":0.0874083},\n{\"type\":32, \"data\":[429,234,10],\"color\":[124,103,70,255],\"score\":0.0873218},\n{\"type\":32, \"data\":[192,120,9],\"color\":[54,75,142,255],\"score\":0.087265},\n{\"type\":32, \"data\":[33,67,16],\"color\":[118,46,84,255],\"score\":0.0872049},\n{\"type\":32, \"data\":[355,207,8],\"color\":[135,126,41,255],\"score\":0.0871346},\n{\"type\":32, \"data\":[226,282,5],\"color\":[209,34,188,255],\"score\":0.087023},\n{\"type\":32, \"data\":[111,53,13],\"color\":[173,73,95,255],\"score\":0.086959},\n{\"type\":32, \"data\":[417,257,5],\"color\":[127,69,107,255],\"score\":0.0868828},\n{\"type\":32, \"data\":[432,123,17],\"color\":[35,46,83,255],\"score\":0.0868187},\n{\"type\":32, \"data\":[305,103,14],\"color\":[40,39,90,255],\"score\":0.0867669},\n{\"type\":32, \"data\":[134,126,17],\"color\":[58,84,153,255],\"score\":0.0867177},\n{\"type\":32, \"data\":[97,213,11],\"color\":[30,54,100,255],\"score\":0.0866374},\n{\"type\":32, \"data\":[272,118,18],\"color\":[23,44,93,255],\"score\":0.0865799},\n{\"type\":32, \"data\":[100,100,13],\"color\":[92,61,125,255],\"score\":0.0865195},\n{\"type\":32, \"data\":[313,169,16],\"color\":[66,69,61,255],\"score\":0.0864712},\n{\"type\":32, \"data\":[467,217,12],\"color\":[69,54,60,255],\"score\":0.0864007},\n{\"type\":32, \"data\":[393,97,6],\"color\":[208,124,158,255],\"score\":0.0863068},\n{\"type\":32, \"data\":[195,230,10],\"color\":[142,72,107,255],\"score\":0.086225},\n{\"type\":32, \"data\":[324,140,20],\"color\":[33,58,96,255],\"score\":0.0861773},\n{\"type\":32, \"data\":[260,187,20],\"color\":[81,88,61,255],\"score\":0.0861235},\n{\"type\":32, \"data\":[135,225,10],\"color\":[117,100,64,255],\"score\":0.0860532},\n{\"type\":32, \"data\":[430,166,8],\"color\":[74,85,103,255],\"score\":0.0859891},\n{\"type\":32, \"data\":[504,89,6],\"color\":[207,102,140,255],\"score\":0.0859412},\n{\"type\":32, \"data\":[487,274,9],\"color\":[140,66,128,255],\"score\":0.0858926},\n{\"type\":32, \"data\":[490,185,15],\"color\":[94,100,34,255],\"score\":0.0858073},\n{\"type\":32, \"data\":[404,214,14],\"color\":[121,71,93,255],\"score\":0.0857313},\n{\"type\":32, \"data\":[419,0,17],\"color\":[247,171,107,255],\"score\":0.0856869},\n{\"type\":32, \"data\":[176,261,10],\"color\":[94,83,57,255],\"score\":0.0856073},\n{\"type\":32, \"data\":[417,148,9],\"color\":[52,60,50,255],\"score\":0.0855462},\n{\"type\":32, \"data\":[187,213,10],\"color\":[113,113,54,255],\"score\":0.0854761},\n{\"type\":32, \"data\":[370,264,6],\"color\":[196,45,177,255],\"score\":0.0853215},\n{\"type\":32, \"data\":[197,272,4],\"color\":[172,38,153,255],\"score\":0.0852683},\n{\"type\":32, \"data\":[294,278,10],\"color\":[99,69,85,255],\"score\":0.0851961},\n{\"type\":32, \"data\":[330,91,9],\"color\":[209,113,150,255],\"score\":0.0851377},\n{\"type\":32, \"data\":[77,287,8],\"color\":[145,123,51,255],\"score\":0.0850608},\n{\"type\":32, \"data\":[150,96,12],\"color\":[117,69,133,255],\"score\":0.0850126},\n{\"type\":32, \"data\":[148,258,8],\"color\":[115,105,53,255],\"score\":0.0849445},\n{\"type\":32, \"data\":[129,252,9],\"color\":[125,55,104,255],\"score\":0.0848913},\n{\"type\":32, \"data\":[240,261,5],\"color\":[178,62,166,255],\"score\":0.0847963},\n{\"type\":32, \"data\":[199,79,13],\"color\":[158,62,116,255],\"score\":0.0847481},\n{\"type\":32, \"data\":[309,201,16],\"color\":[95,104,47,255],\"score\":0.084697},\n{\"type\":32, \"data\":[65,260,12],\"color\":[147,62,121,255],\"score\":0.0846292},\n{\"type\":32, \"data\":[464,118,14],\"color\":[26,33,69,255],\"score\":0.0845724},\n{\"type\":32, \"data\":[86,233,7],\"color\":[149,119,61,255],\"score\":0.0844881},\n{\"type\":32, \"data\":[116,4,31],\"color\":[199,110,106,255],\"score\":0.0844545},\n{\"type\":32, \"data\":[113,165,15],\"color\":[25,85,140,255],\"score\":0.0844035},\n{\"type\":32, \"data\":[500,235,6],\"color\":[92,103,50,255],\"score\":0.0843424},\n{\"type\":32, \"data\":[226,242,4],\"color\":[210,76,188,255],\"score\":0.0842793},\n{\"type\":32, \"data\":[290,201,11],\"color\":[81,92,40,255],\"score\":0.0842278},\n{\"type\":32, \"data\":[292,231,6],\"color\":[80,63,65,255],\"score\":0.0841647},\n{\"type\":32, \"data\":[234,185,14],\"color\":[61,73,66,255],\"score\":0.084118},\n{\"type\":32, \"data\":[175,141,18],\"color\":[20,62,117,255],\"score\":0.0840755},\n{\"type\":32, \"data\":[108,241,6],\"color\":[82,51,63,255],\"score\":0.0840177},\n{\"type\":32, \"data\":[92,262,8],\"color\":[176,76,153,255],\"score\":0.0839498},\n{\"type\":32, \"data\":[485,236,4],\"color\":[189,63,157,255],\"score\":0.0838879},\n{\"type\":32, \"data\":[101,228,6],\"color\":[134,116,56,255],\"score\":0.0838349},\n{\"type\":32, \"data\":[290,219,7],\"color\":[161,65,135,255],\"score\":0.0837777},\n{\"type\":32, \"data\":[419,188,13],\"color\":[102,108,40,255],\"score\":0.0837229},\n{\"type\":32, \"data\":[148,278,5],\"color\":[99,70,80,255],\"score\":0.0836567},\n{\"type\":32, \"data\":[362,257,4],\"color\":[224,72,194,255],\"score\":0.0836098},\n{\"type\":32, \"data\":[197,249,11],\"color\":[104,84,65,255],\"score\":0.0835607},\n{\"type\":32, \"data\":[403,168,11],\"color\":[66,83,113,255],\"score\":0.0835111},\n{\"type\":32, \"data\":[511,254,9],\"color\":[100,81,77,255],\"score\":0.0834618},\n{\"type\":32, \"data\":[9,56,11],\"color\":[138,56,83,255],\"score\":0.0834098},\n{\"type\":32, \"data\":[497,44,15],\"color\":[241,128,89,255],\"score\":0.0833647},\n{\"type\":32, \"data\":[82,54,12],\"color\":[164,68,92,255],\"score\":0.0833129},\n{\"type\":32, \"data\":[482,276,4],\"color\":[186,28,180,255],\"score\":0.0832658},\n{\"type\":32, \"data\":[333,188,13],\"color\":[84,92,41,255],\"score\":0.0832249},\n{\"type\":32, \"data\":[214,244,9],\"color\":[170,59,147,255],\"score\":0.0831635},\n{\"type\":32, \"data\":[212,224,7],\"color\":[141,74,108,255],\"score\":0.0831135},\n{\"type\":32, \"data\":[141,287,5],\"color\":[193,65,163,255],\"score\":0.0830476},\n{\"type\":32, \"data\":[176,119,9],\"color\":[61,80,148,255],\"score\":0.0830091},\n{\"type\":32, \"data\":[431,73,15],\"color\":[235,117,77,255],\"score\":0.0829741},\n{\"type\":32, \"data\":[37,246,10],\"color\":[159,113,83,255],\"score\":0.0829186},\n{\"type\":32, \"data\":[257,26,18],\"color\":[224,122,105,255],\"score\":0.0828815},\n{\"type\":32, \"data\":[408,274,6],\"color\":[104,66,93,255],\"score\":0.08282},\n{\"type\":32, \"data\":[264,61,19],\"color\":[215,96,108,255],\"score\":0.0827819},\n{\"type\":32, \"data\":[165,54,12],\"color\":[187,79,99,255],\"score\":0.0827483},\n{\"type\":32, \"data\":[55,53,11],\"color\":[160,66,89,255],\"score\":0.0827118},\n{\"type\":32, \"data\":[285,187,6],\"color\":[88,106,121,255],\"score\":0.0826515},\n{\"type\":32, \"data\":[456,249,8],\"color\":[158,112,125,255],\"score\":0.0825942},\n{\"type\":32, \"data\":[361,193,10],\"color\":[85,97,53,255],\"score\":0.0825615},\n{\"type\":32, \"data\":[276,287,6],\"color\":[217,67,198,255],\"score\":0.0824934},\n{\"type\":32, \"data\":[385,118,16],\"color\":[33,35,71,255],\"score\":0.0824424},\n{\"type\":32, \"data\":[493,68,19],\"color\":[239,98,94,255],\"score\":0.0824079},\n{\"type\":32, \"data\":[12,93,13],\"color\":[74,39,97,255],\"score\":0.0823756},\n{\"type\":32, \"data\":[378,245,6],\"color\":[165,103,131,255],\"score\":0.0823289},\n{\"type\":32, \"data\":[416,250,5],\"color\":[205,123,176,255],\"score\":0.0822505},\n{\"type\":32, \"data\":[411,118,12],\"color\":[32,36,73,255],\"score\":0.082212},\n{\"type\":32, \"data\":[449,283,12],\"color\":[110,64,89,255],\"score\":0.0821615},\n{\"type\":32, \"data\":[330,272,7],\"color\":[95,75,62,255],\"score\":0.082105},\n{\"type\":32, \"data\":[67,255,5],\"color\":[92,55,69,255],\"score\":0.0820315},\n{\"type\":32, \"data\":[449,219,9],\"color\":[59,63,41,255],\"score\":0.0819788},\n{\"type\":32, \"data\":[322,207,9],\"color\":[118,119,67,255],\"score\":0.0819434},\n{\"type\":32, \"data\":[504,270,7],\"color\":[193,90,178,255],\"score\":0.0818816},\n{\"type\":32, \"data\":[219,28,15],\"color\":[220,117,104,255],\"score\":0.0818521},\n{\"type\":32, \"data\":[470,158,16],\"color\":[70,70,56,255],\"score\":0.0818116},\n{\"type\":32, \"data\":[341,276,6],\"color\":[85,62,70,255],\"score\":0.0817627},\n{\"type\":32, \"data\":[0,262,11],\"color\":[144,81,129,255],\"score\":0.0817207},\n{\"type\":32, \"data\":[172,219,8],\"color\":[112,108,55,255],\"score\":0.0816824},\n{\"type\":32, \"data\":[52,154,22],\"color\":[48,100,163,255],\"score\":0.0816506},\n{\"type\":32, \"data\":[204,271,3],\"color\":[197,52,178,255],\"score\":0.0815936},\n{\"type\":32, \"data\":[369,227,11],\"color\":[106,68,92,255],\"score\":0.0815463},\n{\"type\":32, \"data\":[174,250,10],\"color\":[129,115,53,255],\"score\":0.0815066},\n{\"type\":32, \"data\":[413,238,3],\"color\":[189,97,168,255],\"score\":0.0814672},\n{\"type\":32, \"data\":[428,249,5],\"color\":[162,134,118,255],\"score\":0.0814146},\n{\"type\":32, \"data\":[363,248,4],\"color\":[105,60,86,255],\"score\":0.0813619},\n{\"type\":32, \"data\":[36,119,14],\"color\":[60,70,145,255],\"score\":0.0813287},\n{\"type\":32, \"data\":[425,268,4],\"color\":[202,23,177,255],\"score\":0.0812777},\n{\"type\":32, \"data\":[257,287,8],\"color\":[102,66,87,255],\"score\":0.0811999},\n{\"type\":32, \"data\":[221,262,9],\"color\":[109,78,84,255],\"score\":0.0811528},\n{\"type\":32, \"data\":[333,228,9],\"color\":[154,95,126,255],\"score\":0.0811152},\n{\"type\":32, \"data\":[240,85,9],\"color\":[187,78,131,255],\"score\":0.081087},\n{\"type\":32, \"data\":[300,112,11],\"color\":[18,32,77,255],\"score\":0.0810549},\n{\"type\":32, \"data\":[266,90,11],\"color\":[190,97,147,255],\"score\":0.0810126},\n{\"type\":32, \"data\":[46,281,9],\"color\":[125,60,109,255],\"score\":0.0809729},\n{\"type\":32, \"data\":[421,100,7],\"color\":[146,107,162,255],\"score\":0.080922},\n{\"type\":32, \"data\":[241,154,17],\"color\":[27,71,115,255],\"score\":0.0808867},\n{\"type\":32, \"data\":[167,285,5],\"color\":[69,51,66,255],\"score\":0.080829},\n{\"type\":32, \"data\":[311,33,15],\"color\":[234,126,104,255],\"score\":0.0808016},\n{\"type\":32, \"data\":[464,183,16],\"color\":[89,93,38,255],\"score\":0.0807681},\n{\"type\":32, \"data\":[384,231,8],\"color\":[139,68,117,255],\"score\":0.0807344},\n{\"type\":32, \"data\":[388,255,4],\"color\":[202,38,182,255],\"score\":0.0806689},\n{\"type\":32, \"data\":[90,251,5],\"color\":[107,29,103,255],\"score\":0.0806262},\n{\"type\":32, \"data\":[423,218,11],\"color\":[93,86,54,255],\"score\":0.0805902},\n{\"type\":32, \"data\":[441,192,8],\"color\":[60,79,36,255],\"score\":0.0805531},\n{\"type\":32, \"data\":[22,266,6],\"color\":[73,52,58,255],\"score\":0.0804575},\n{\"type\":32, \"data\":[260,272,4],\"color\":[204,59,188,255],\"score\":0.080397},\n{\"type\":32, \"data\":[49,258,4],\"color\":[81,44,72,255],\"score\":0.0803422},\n{\"type\":32, \"data\":[136,52,12],\"color\":[181,77,97,255],\"score\":0.080308},\n{\"type\":32, \"data\":[483,110,10],\"color\":[19,22,57,255],\"score\":0.0802829},\n{\"type\":32, \"data\":[83,179,13],\"color\":[29,91,143,255],\"score\":0.0802526},\n{\"type\":32, \"data\":[408,205,7],\"color\":[142,100,95,255],\"score\":0.0802151},\n{\"type\":32, \"data\":[282,87,9],\"color\":[200,95,141,255],\"score\":0.0801757},\n{\"type\":32, \"data\":[16,3,20],\"color\":[157,84,102,255],\"score\":0.08015},\n{\"type\":32, \"data\":[462,97,7],\"color\":[186,130,169,255],\"score\":0.0801172},\n{\"type\":32, \"data\":[169,99,10],\"color\":[120,80,143,255],\"score\":0.0800858},\n{\"type\":32, \"data\":[140,242,7],\"color\":[153,67,128,255],\"score\":0.0800311},\n{\"type\":32, \"data\":[496,284,6],\"color\":[97,45,82,255],\"score\":0.0799832},\n{\"type\":32, \"data\":[55,190,13],\"color\":[29,79,127,255],\"score\":0.0799612},\n{\"type\":32, \"data\":[263,242,8],\"color\":[171,63,144,255],\"score\":0.0799293},\n{\"type\":32, \"data\":[34,266,7],\"color\":[155,67,136,255],\"score\":0.0798832},\n{\"type\":32, \"data\":[274,232,10],\"color\":[127,74,110,255],\"score\":0.0798524},\n{\"type\":32, \"data\":[345,227,9],\"color\":[140,82,116,255],\"score\":0.0798135},\n{\"type\":32, \"data\":[385,96,6],\"color\":[218,129,161,255],\"score\":0.0797619},\n{\"type\":32, \"data\":[388,140,15],\"color\":[47,57,82,255],\"score\":0.0797319},\n{\"type\":32, \"data\":[130,272,8],\"color\":[108,80,75,255],\"score\":0.0797027},\n{\"type\":32, \"data\":[359,141,15],\"color\":[42,60,92,255],\"score\":0.0796737},\n{\"type\":32, \"data\":[229,55,13],\"color\":[206,91,105,255],\"score\":0.0796491},\n{\"type\":32, \"data\":[415,48,19],\"color\":[241,129,92,255],\"score\":0.0796185},\n{\"type\":32, \"data\":[396,208,3],\"color\":[172,73,150,255],\"score\":0.0795909},\n{\"type\":32, \"data\":[147,220,6],\"color\":[126,115,59,255],\"score\":0.0795649},\n{\"type\":32, \"data\":[167,197,12],\"color\":[28,60,95,255],\"score\":0.0795277},\n{\"type\":32, \"data\":[211,189,10],\"color\":[41,73,87,255],\"score\":0.0794977},\n{\"type\":32, \"data\":[96,281,6],\"color\":[152,125,67,255],\"score\":0.0794561},\n{\"type\":32, \"data\":[334,117,11],\"color\":[25,36,76,255],\"score\":0.0794308},\n{\"type\":32, \"data\":[424,284,9],\"color\":[50,29,58,255],\"score\":0.079402},\n{\"type\":32, \"data\":[331,241,4],\"color\":[79,63,59,255],\"score\":0.0793563},\n{\"type\":32, \"data\":[254,264,4],\"color\":[194,29,178,255],\"score\":0.0793023},\n{\"type\":32, \"data\":[174,174,17],\"color\":[27,80,123,255],\"score\":0.0792752},\n{\"type\":32, \"data\":[317,75,16],\"color\":[223,99,116,255],\"score\":0.079244},\n{\"type\":32, \"data\":[385,241,5],\"color\":[124,108,78,255],\"score\":0.0792001},\n{\"type\":32, \"data\":[418,167,8],\"color\":[70,84,116,255],\"score\":0.0791769},\n{\"type\":32, \"data\":[473,234,5],\"color\":[101,105,46,255],\"score\":0.0791413},\n{\"type\":32, \"data\":[205,117,6],\"color\":[60,80,145,255],\"score\":0.0790956},\n{\"type\":32, \"data\":[291,171,10],\"color\":[66,68,58,255],\"score\":0.0790666},\n{\"type\":32, \"data\":[473,265,3],\"color\":[125,15,100,255],\"score\":0.0790193},\n{\"type\":32, \"data\":[310,252,7],\"color\":[132,98,100,255],\"score\":0.0789841},\n{\"type\":32, \"data\":[410,221,5],\"color\":[80,47,66,255],\"score\":0.0789511},\n{\"type\":32, \"data\":[461,267,9],\"color\":[184,67,166,255],\"score\":0.0789108},\n{\"type\":32, \"data\":[118,235,5],\"color\":[161,59,122,255],\"score\":0.0788525},\n{\"type\":32, \"data\":[280,221,4],\"color\":[184,68,156,255],\"score\":0.078821},\n{\"type\":32, \"data\":[62,93,12],\"color\":[86,46,106,255],\"score\":0.0787953},\n{\"type\":32, \"data\":[98,73,15],\"color\":[123,47,94,255],\"score\":0.078768},\n{\"type\":32, \"data\":[443,283,3],\"color\":[188,48,151,255],\"score\":0.0787197},\n{\"type\":32, \"data\":[272,200,8],\"color\":[95,102,41,255],\"score\":0.0786921},\n{\"type\":32, \"data\":[419,72,9],\"color\":[235,132,53,255],\"score\":0.0786712},\n{\"type\":32, \"data\":[438,96,10],\"color\":[181,120,164,255],\"score\":0.078645},\n{\"type\":32, \"data\":[369,19,20],\"color\":[237,139,107,255],\"score\":0.0786202},\n{\"type\":32, \"data\":[360,157,7],\"color\":[71,75,63,255],\"score\":0.0785919},\n{\"type\":32, \"data\":[368,209,7],\"color\":[149,108,77,255],\"score\":0.0785518},\n{\"type\":32, \"data\":[165,243,2],\"color\":[200,120,178,255],\"score\":0.0785143},\n{\"type\":32, \"data\":[404,224,2],\"color\":[198,46,181,255],\"score\":0.0784848},\n{\"type\":32, \"data\":[159,252,8],\"color\":[124,115,48,255],\"score\":0.0784569},\n{\"type\":32, \"data\":[509,182,15],\"color\":[86,94,31,255],\"score\":0.0784272},\n{\"type\":32, \"data\":[81,264,5],\"color\":[185,74,159,255],\"score\":0.0783874},\n{\"type\":32, \"data\":[392,69,6],\"color\":[237,183,63,255],\"score\":0.0783534},\n{\"type\":32, \"data\":[162,211,5],\"color\":[71,75,78,255],\"score\":0.0783323},\n{\"type\":32, \"data\":[36,37,17],\"color\":[183,85,93,255],\"score\":0.0783066},\n{\"type\":32, \"data\":[235,253,4],\"color\":[173,58,151,255],\"score\":0.0782626},\n{\"type\":32, \"data\":[494,90,6],\"color\":[209,108,146,255],\"score\":0.0782388},\n{\"type\":32, \"data\":[264,172,7],\"color\":[56,70,67,255],\"score\":0.0782159},\n{\"type\":32, \"data\":[236,284,3],\"color\":[64,43,65,255],\"score\":0.0781607},\n{\"type\":32, \"data\":[450,266,4],\"color\":[117,20,113,255],\"score\":0.0780969},\n{\"type\":32, \"data\":[386,218,9],\"color\":[113,69,89,255],\"score\":0.0780758},\n{\"type\":32, \"data\":[258,277,3],\"color\":[191,34,190,255],\"score\":0.0780455},\n{\"type\":32, \"data\":[95,123,15],\"color\":[54,75,148,255],\"score\":0.0780233},\n{\"type\":32, \"data\":[404,249,8],\"color\":[131,122,76,255],\"score\":0.077984},\n{\"type\":32, \"data\":[468,206,8],\"color\":[102,63,80,255],\"score\":0.0779453},\n{\"type\":32, \"data\":[423,243,3],\"color\":[193,128,155,255],\"score\":0.0779179},\n{\"type\":32, \"data\":[128,79,14],\"color\":[124,49,103,255],\"score\":0.0778957},\n{\"type\":32, \"data\":[117,226,6],\"color\":[119,115,49,255],\"score\":0.0778548},\n{\"type\":32, \"data\":[275,259,7],\"color\":[154,56,129,255],\"score\":0.0778169},\n{\"type\":32, \"data\":[162,0,30],\"color\":[199,113,108,255],\"score\":0.0777955},\n{\"type\":32, \"data\":[344,266,4],\"color\":[209,71,185,255],\"score\":0.0777558},\n{\"type\":32, \"data\":[47,223,11],\"color\":[34,63,105,255],\"score\":0.0777338},\n{\"type\":32, \"data\":[9,143,23],\"color\":[50,90,160,255],\"score\":0.0777089},\n{\"type\":32, \"data\":[483,211,9],\"color\":[39,38,44,255],\"score\":0.0776808},\n{\"type\":32, \"data\":[429,262,6],\"color\":[200,47,180,255],\"score\":0.0776446},\n{\"type\":32, \"data\":[413,266,6],\"color\":[201,62,184,255],\"score\":0.0776168},\n{\"type\":32, \"data\":[9,73,13],\"color\":[100,38,80,255],\"score\":0.0775927},\n{\"type\":32, \"data\":[52,268,6],\"color\":[191,65,176,255],\"score\":0.0775582},\n{\"type\":32, \"data\":[282,157,6],\"color\":[53,83,113,255],\"score\":0.0775378},\n{\"type\":32, \"data\":[160,125,7],\"color\":[55,82,149,255],\"score\":0.0775168},\n{\"type\":32, \"data\":[433,207,8],\"color\":[113,111,47,255],\"score\":0.0774809},\n{\"type\":32, \"data\":[270,269,6],\"color\":[99,71,82,255],\"score\":0.0774469},\n{\"type\":32, \"data\":[303,262,4],\"color\":[212,52,184,255],\"score\":0.0773861},\n{\"type\":32, \"data\":[5,246,7],\"color\":[144,107,79,255],\"score\":0.077365},\n{\"type\":32, \"data\":[403,81,5],\"color\":[240,218,54,255],\"score\":0.0773348},\n{\"type\":32, \"data\":[36,52,9],\"color\":[158,65,89,255],\"score\":0.077313},\n{\"type\":32, \"data\":[383,198,10],\"color\":[117,120,39,255],\"score\":0.0772933},\n{\"type\":32, \"data\":[202,104,8],\"color\":[131,101,162,255],\"score\":0.0772708},\n{\"type\":32, \"data\":[189,260,5],\"color\":[156,70,133,255],\"score\":0.0772129},\n{\"type\":32, \"data\":[329,103,5],\"color\":[76,62,121,255],\"score\":0.0771657},\n{\"type\":32, \"data\":[353,217,4],\"color\":[71,45,59,255],\"score\":0.077128},\n{\"type\":32, \"data\":[433,135,6],\"color\":[53,70,105,255],\"score\":0.0771022},\n{\"type\":32, \"data\":[126,199,19],\"color\":[24,49,94,255],\"score\":0.0770773},\n{\"type\":32, \"data\":[228,225,11],\"color\":[134,88,93,255],\"score\":0.077051},\n{\"type\":32, \"data\":[187,194,10],\"color\":[30,63,94,255],\"score\":0.0770276},\n{\"type\":32, \"data\":[495,151,10],\"color\":[84,75,67,255],\"score\":0.0770075},\n{\"type\":32, \"data\":[316,287,3],\"color\":[93,18,91,255],\"score\":0.0769604},\n{\"type\":32, \"data\":[404,92,5],\"color\":[231,117,141,255],\"score\":0.0769371},\n{\"type\":32, \"data\":[338,58,20],\"color\":[229,114,105,255],\"score\":0.0769198},\n{\"type\":32, \"data\":[363,172,8],\"color\":[80,96,107,255],\"score\":0.0768984},\n{\"type\":32, \"data\":[464,283,8],\"color\":[119,90,85,255],\"score\":0.076869},\n{\"type\":32, \"data\":[206,164,19],\"color\":[25,75,120,255],\"score\":0.0768495},\n{\"type\":32, \"data\":[307,6,15],\"color\":[207,118,112,255],\"score\":0.0768333},\n{\"type\":32, \"data\":[433,101,5],\"color\":[142,113,168,255],\"score\":0.0768111},\n{\"type\":32, \"data\":[257,201,7],\"color\":[98,107,48,255],\"score\":0.0767894},\n{\"type\":32, \"data\":[157,283,4],\"color\":[212,38,192,255],\"score\":0.0767232},\n{\"type\":32, \"data\":[437,270,7],\"color\":[112,79,92,255],\"score\":0.076694},\n{\"type\":32, \"data\":[479,97,4],\"color\":[189,132,167,255],\"score\":0.0766663},\n{\"type\":32, \"data\":[339,206,9],\"color\":[119,119,51,255],\"score\":0.0766399},\n{\"type\":32, \"data\":[494,0,19],\"color\":[248,181,104,255],\"score\":0.0766199},\n{\"type\":32, \"data\":[302,199,5],\"color\":[55,80,35,255],\"score\":0.0765963},\n{\"type\":32, \"data\":[72,277,5],\"color\":[66,39,63,255],\"score\":0.0765642},\n{\"type\":32, \"data\":[351,255,5],\"color\":[203,50,174,255],\"score\":0.0765253},\n{\"type\":32, \"data\":[157,76,15],\"color\":[141,54,106,255],\"score\":0.0765084},\n{\"type\":32, \"data\":[35,102,10],\"color\":[75,51,116,255],\"score\":0.0764904},\n{\"type\":32, \"data\":[437,90,6],\"color\":[220,118,149,255],\"score\":0.076469},\n{\"type\":32, \"data\":[265,221,3],\"color\":[195,107,151,255],\"score\":0.0764452},\n{\"type\":32, \"data\":[455,203,10],\"color\":[100,91,49,255],\"score\":0.0764263},\n{\"type\":32, \"data\":[420,90,5],\"color\":[219,112,143,255],\"score\":0.0764058},\n{\"type\":32, \"data\":[305,95,7],\"color\":[63,48,105,255],\"score\":0.076383},\n{\"type\":32, \"data\":[442,250,4],\"color\":[194,113,166,255],\"score\":0.0763548},\n{\"type\":32, \"data\":[449,255,5],\"color\":[203,102,179,255],\"score\":0.0763238},\n{\"type\":32, \"data\":[491,269,4],\"color\":[93,67,81,255],\"score\":0.0762857},\n{\"type\":32, \"data\":[293,265,4],\"color\":[187,42,168,255],\"score\":0.0762436},\n{\"type\":32, \"data\":[244,238,11],\"color\":[156,81,129,255],\"score\":0.0762215},\n{\"type\":32, \"data\":[43,286,6],\"color\":[158,62,145,255],\"score\":0.0761957},\n{\"type\":32, \"data\":[353,234,6],\"color\":[172,96,144,255],\"score\":0.0761722},\n{\"type\":32, \"data\":[19,274,3],\"color\":[194,81,166,255],\"score\":0.0761344},\n{\"type\":32, \"data\":[47,253,3],\"color\":[179,68,146,255],\"score\":0.0760958},\n{\"type\":32, \"data\":[457,36,14],\"color\":[243,139,94,255],\"score\":0.076076},\n{\"type\":32, \"data\":[3,280,3],\"color\":[124,52,114,255],\"score\":0.0760399},\n{\"type\":32, \"data\":[480,253,5],\"color\":[130,115,110,255],\"score\":0.0760161},\n{\"type\":32, \"data\":[382,81,5],\"color\":[240,211,46,255],\"score\":0.0759892},\n{\"type\":32, \"data\":[104,250,2],\"color\":[66,34,49,255],\"score\":0.0759651},\n{\"type\":32, \"data\":[495,275,2],\"color\":[229,120,209,255],\"score\":0.0759284},\n{\"type\":32, \"data\":[70,0,11],\"color\":[203,110,105,255],\"score\":0.0759083},\n{\"type\":32, \"data\":[250,274,4],\"color\":[92,67,81,255],\"score\":0.075871},\n{\"type\":32, \"data\":[302,277,3],\"color\":[166,53,153,255],\"score\":0.0758277},\n{\"type\":32, \"data\":[105,30,18],\"color\":[197,100,99,255],\"score\":0.0758114},\n{\"type\":32, \"data\":[239,0,8],\"color\":[177,102,112,255],\"score\":0.0757895},\n{\"type\":32, \"data\":[186,271,6],\"color\":[94,81,71,255],\"score\":0.0757602},\n{\"type\":32, \"data\":[443,233,6],\"color\":[107,111,42,255],\"score\":0.0757428},\n{\"type\":32, \"data\":[252,217,10],\"color\":[139,85,93,255],\"score\":0.0757198},\n{\"type\":32, \"data\":[218,207,10],\"color\":[108,114,56,255],\"score\":0.0756979},\n{\"type\":32, \"data\":[508,267,5],\"color\":[206,69,193,255],\"score\":0.0756719},\n{\"type\":32, \"data\":[328,288,5],\"color\":[75,46,74,255],\"score\":0.0756394},\n{\"type\":32, \"data\":[310,227,7],\"color\":[159,95,119,255],\"score\":0.0756158},\n{\"type\":32, \"data\":[307,153,8],\"color\":[52,75,103,255],\"score\":0.0755979},\n{\"type\":32, \"data\":[25,242,5],\"color\":[173,125,89,255],\"score\":0.0755775},\n{\"type\":32, \"data\":[174,277,7],\"color\":[141,65,101,255],\"score\":0.0755562},\n{\"type\":32, \"data\":[392,272,6],\"color\":[202,51,177,255],\"score\":0.0755246},\n{\"type\":32, \"data\":[482,235,2],\"color\":[228,95,208,255],\"score\":0.0755037},\n{\"type\":32, \"data\":[57,287,6],\"color\":[90,62,64,255],\"score\":0.0754779},\n{\"type\":32, \"data\":[82,94,10],\"color\":[91,50,112,255],\"score\":0.075461},\n{\"type\":32, \"data\":[227,107,8],\"color\":[135,115,173,255],\"score\":0.0754341},\n{\"type\":32, \"data\":[272,237,2],\"color\":[188,97,172,255],\"score\":0.075416},\n{\"type\":32, \"data\":[166,32,14],\"color\":[212,109,100,255],\"score\":0.0753966},\n{\"type\":32, \"data\":[20,287,7],\"color\":[153,61,141,255],\"score\":0.0753587},\n{\"type\":32, \"data\":[274,170,5],\"color\":[43,59,59,255],\"score\":0.0753384},\n{\"type\":32, \"data\":[378,87,3],\"color\":[236,103,77,255],\"score\":0.0753187},\n{\"type\":32, \"data\":[381,192,10],\"color\":[101,110,38,255],\"score\":0.075302},\n{\"type\":32, \"data\":[93,229,4],\"color\":[122,113,45,255],\"score\":0.0752805},\n{\"type\":32, \"data\":[208,264,5],\"color\":[189,54,157,255],\"score\":0.0752184},\n{\"type\":32, \"data\":[233,278,2],\"color\":[208,76,199,255],\"score\":0.0751847},\n{\"type\":32, \"data\":[469,78,10],\"color\":[236,97,98,255],\"score\":0.0751674},\n{\"type\":32, \"data\":[371,152,5],\"color\":[67,68,50,255],\"score\":0.0751469},\n{\"type\":32, \"data\":[335,102,4],\"color\":[91,72,131,255],\"score\":0.0751293},\n{\"type\":32, \"data\":[319,102,6],\"color\":[62,53,109,255],\"score\":0.0751074},\n{\"type\":32, \"data\":[293,250,7],\"color\":[151,88,119,255],\"score\":0.0750884},\n{\"type\":32, \"data\":[201,236,4],\"color\":[171,69,139,255],\"score\":0.0750673},\n{\"type\":32, \"data\":[223,131,16],\"color\":[21,52,100,255],\"score\":0.0750473},\n{\"type\":32, \"data\":[149,244,2],\"color\":[190,110,167,255],\"score\":0.0750182},\n{\"type\":32, \"data\":[459,271,3],\"color\":[229,112,216,255],\"score\":0.0749852},\n{\"type\":32, \"data\":[395,238,3],\"color\":[196,112,178,255],\"score\":0.0749518},\n{\"type\":32, \"data\":[511,287,7],\"color\":[81,43,85,255],\"score\":0.0749235},\n{\"type\":32, \"data\":[259,106,3],\"color\":[60,61,125,255],\"score\":0.0749087},\n{\"type\":32, \"data\":[10,283,4],\"color\":[226,91,216,255],\"score\":0.0748713},\n{\"type\":32, \"data\":[319,258,2],\"color\":[232,104,203,255],\"score\":0.0748438},\n{\"type\":32, \"data\":[225,250,4],\"color\":[84,57,66,255],\"score\":0.0748132},\n{\"type\":32, \"data\":[284,31,13],\"color\":[231,124,103,255],\"score\":0.0747966},\n{\"type\":32, \"data\":[321,219,5],\"color\":[120,107,48,255],\"score\":0.0747772},\n{\"type\":32, \"data\":[145,271,4],\"color\":[183,33,165,255],\"score\":0.0747352},\n{\"type\":32, \"data\":[455,119,14],\"color\":[29,37,73,255],\"score\":0.0747137},\n{\"type\":32, \"data\":[310,265,4],\"color\":[117,81,85,255],\"score\":0.0746855},\n{\"type\":32, \"data\":[285,264,3],\"color\":[180,103,146,255],\"score\":0.0746619},\n{\"type\":32, \"data\":[61,214,17],\"color\":[32,65,108,255],\"score\":0.0746474},\n{\"type\":32, \"data\":[68,57,7],\"color\":[153,60,89,255],\"score\":0.0746327},\n{\"type\":32, \"data\":[393,81,7],\"color\":[242,216,178,255],\"score\":0.0746156},\n{\"type\":32, \"data\":[164,264,2],\"color\":[191,40,169,255],\"score\":0.0745839},\n{\"type\":32, \"data\":[201,257,5],\"color\":[78,63,64,255],\"score\":0.0745576},\n{\"type\":32, \"data\":[474,271,4],\"color\":[222,76,205,255],\"score\":0.0745276},\n{\"type\":32, \"data\":[121,254,5],\"color\":[97,60,78,255],\"score\":0.0744934},\n{\"type\":32, \"data\":[50,282,2],\"color\":[186,35,168,255],\"score\":0.0744757},\n{\"type\":32, \"data\":[237,277,2],\"color\":[44,18,55,255],\"score\":0.0744511},\n{\"type\":32, \"data\":[505,246,2],\"color\":[164,150,132,255],\"score\":0.074434},\n{\"type\":32, \"data\":[508,163,5],\"color\":[48,46,41,255],\"score\":0.0744182},\n{\"type\":32, \"data\":[63,274,5],\"color\":[90,62,75,255],\"score\":0.0743974},\n{\"type\":32, \"data\":[127,248,3],\"color\":[183,56,173,255],\"score\":0.0743563},\n{\"type\":32, \"data\":[104,267,5],\"color\":[116,62,88,255],\"score\":0.0743289},\n{\"type\":32, \"data\":[36,258,3],\"color\":[95,70,64,255],\"score\":0.0743067},\n{\"type\":32, \"data\":[85,244,5],\"color\":[159,30,142,255],\"score\":0.0742846},\n{\"type\":32, \"data\":[399,257,6],\"color\":[130,107,102,255],\"score\":0.0742608},\n{\"type\":32, \"data\":[23,52,7],\"color\":[154,64,86,255],\"score\":0.0742495},\n{\"type\":32, \"data\":[432,148,9],\"color\":[41,51,38,255],\"score\":0.0742311},\n{\"type\":32, \"data\":[188,247,5],\"color\":[124,117,47,255],\"score\":0.0742102},\n{\"type\":32, \"data\":[420,264,3],\"color\":[227,120,210,255],\"score\":0.0741813},\n{\"type\":32, \"data\":[25,189,18],\"color\":[28,74,126,255],\"score\":0.07417},\n{\"type\":32, \"data\":[81,253,3],\"color\":[199,62,180,255],\"score\":0.0741388},\n{\"type\":32, \"data\":[383,150,5],\"color\":[58,59,47,255],\"score\":0.0741203},\n{\"type\":32, \"data\":[461,167,9],\"color\":[85,82,55,255],\"score\":0.0741023},\n{\"type\":32, \"data\":[305,218,4],\"color\":[103,55,82,255],\"score\":0.0740799},\n{\"type\":32, \"data\":[226,179,6],\"color\":[32,63,81,255],\"score\":0.0740627},\n{\"type\":32, \"data\":[263,257,3],\"color\":[197,37,177,255],\"score\":0.0740298},\n{\"type\":32, \"data\":[407,287,9],\"color\":[81,62,79,255],\"score\":0.0740051},\n{\"type\":32, \"data\":[468,262,3],\"color\":[222,23,193,255],\"score\":0.0739808},\n{\"type\":32, \"data\":[299,223,3],\"color\":[177,80,148,255],\"score\":0.0739548},\n{\"type\":32, \"data\":[315,235,6],\"color\":[180,93,146,255],\"score\":0.0739305},\n{\"type\":32, \"data\":[184,80,13],\"color\":[147,59,115,255],\"score\":0.073917},\n{\"type\":32, \"data\":[88,277,3],\"color\":[201,33,169,255],\"score\":0.0738803},\n{\"type\":32, \"data\":[421,271,4],\"color\":[138,26,123,255],\"score\":0.0738579},\n{\"type\":32, \"data\":[154,15,6],\"color\":[174,98,109,255],\"score\":0.0738407},\n{\"type\":32, \"data\":[400,276,3],\"color\":[201,79,179,255],\"score\":0.073811},\n{\"type\":32, \"data\":[111,265,2],\"color\":[215,126,198,255],\"score\":0.0737798},\n{\"type\":32, \"data\":[135,254,3],\"color\":[190,22,154,255],\"score\":0.0737395},\n{\"type\":32, \"data\":[340,248,4],\"color\":[207,82,184,255],\"score\":0.0737042},\n{\"type\":32, \"data\":[467,136,9],\"color\":[40,40,46,255],\"score\":0.0736843},\n{\"type\":32, \"data\":[246,124,12],\"color\":[17,44,91,255],\"score\":0.0736696},\n{\"type\":32, \"data\":[101,260,2],\"color\":[213,100,208,255],\"score\":0.0736419},\n{\"type\":32, \"data\":[306,209,7],\"color\":[120,114,53,255],\"score\":0.0736197},\n{\"type\":32, \"data\":[5,260,3],\"color\":[161,141,140,255],\"score\":0.0735994},\n{\"type\":32, \"data\":[219,237,6],\"color\":[177,81,153,255],\"score\":0.0735758},\n{\"type\":32, \"data\":[180,258,7],\"color\":[98,87,62,255],\"score\":0.0735527},\n{\"type\":32, \"data\":[417,132,9],\"color\":[36,53,93,255],\"score\":0.0735371},\n{\"type\":32, \"data\":[371,95,5],\"color\":[216,136,166,255],\"score\":0.0735143},\n{\"type\":32, \"data\":[333,234,2],\"color\":[221,108,200,255],\"score\":0.0734911},\n{\"type\":32, \"data\":[121,262,3],\"color\":[182,90,163,255],\"score\":0.0734731},\n{\"type\":32, \"data\":[459,238,6],\"color\":[94,97,47,255],\"score\":0.0734562},\n{\"type\":32, \"data\":[340,144,12],\"color\":[36,61,99,255],\"score\":0.0734436},\n{\"type\":32, \"data\":[272,249,4],\"color\":[212,65,192,255],\"score\":0.0734168},\n{\"type\":32, \"data\":[79,248,3],\"color\":[108,57,69,255],\"score\":0.0733928},\n{\"type\":32, \"data\":[262,213,7],\"color\":[133,82,93,255],\"score\":0.073376},\n{\"type\":32, \"data\":[319,273,5],\"color\":[106,54,93,255],\"score\":0.0733548},\n{\"type\":32, \"data\":[492,265,5],\"color\":[128,89,109,255],\"score\":0.0733375},\n{\"type\":32, \"data\":[127,223,5],\"color\":[134,121,52,255],\"score\":0.0733186},\n{\"type\":32, \"data\":[471,194,5],\"color\":[112,110,34,255],\"score\":0.0733033},\n{\"type\":32, \"data\":[402,148,7],\"color\":[63,57,64,255],\"score\":0.073285},\n{\"type\":32, \"data\":[255,262,4],\"color\":[207,41,179,255],\"score\":0.0732599},\n{\"type\":32, \"data\":[459,257,3],\"color\":[188,147,162,255],\"score\":0.0732381},\n{\"type\":32, \"data\":[295,186,5],\"color\":[79,88,101,255],\"score\":0.0732242},\n{\"type\":32, \"data\":[253,243,3],\"color\":[200,44,173,255],\"score\":0.073199},\n{\"type\":32, \"data\":[354,198,4],\"color\":[96,118,105,255],\"score\":0.073171},\n{\"type\":32, \"data\":[471,111,8],\"color\":[19,24,59,255],\"score\":0.0731597},\n{\"type\":32, \"data\":[398,216,1],\"color\":[197,97,204,255],\"score\":0.073143},\n{\"type\":32, \"data\":[238,221,5],\"color\":[104,90,60,255],\"score\":0.0731189},\n{\"type\":32, \"data\":[50,240,2],\"color\":[200,120,139,255],\"score\":0.073101},\n{\"type\":32, \"data\":[97,54,8],\"color\":[170,70,93,255],\"score\":0.0730878},\n{\"type\":32, \"data\":[162,221,5],\"color\":[131,128,58,255],\"score\":0.0730653},\n{\"type\":32, \"data\":[208,248,2],\"color\":[121,61,78,255],\"score\":0.0730489},\n{\"type\":32, \"data\":[179,286,4],\"color\":[139,30,94,255],\"score\":0.0730285},\n{\"type\":32, \"data\":[195,141,15],\"color\":[18,59,109,255],\"score\":0.0730144},\n{\"type\":32, \"data\":[433,227,2],\"color\":[165,65,136,255],\"score\":0.0729971},\n{\"type\":32, \"data\":[36,240,4],\"color\":[181,125,124,255],\"score\":0.0729766},\n{\"type\":32, \"data\":[378,227,2],\"color\":[194,71,182,255],\"score\":0.0729539},\n{\"type\":32, \"data\":[511,119,12],\"color\":[17,11,25,255],\"score\":0.0729371},\n{\"type\":32, \"data\":[341,223,6],\"color\":[117,91,93,255],\"score\":0.0729177},\n{\"type\":32, \"data\":[503,273,2],\"color\":[121,53,113,255],\"score\":0.0728929},\n{\"type\":32, \"data\":[329,257,4],\"color\":[200,48,175,255],\"score\":0.0728635},\n{\"type\":32, \"data\":[72,269,3],\"color\":[184,49,177,255],\"score\":0.072839},\n{\"type\":32, \"data\":[34,282,4],\"color\":[209,88,197,255],\"score\":0.0728069},\n{\"type\":32, \"data\":[477,265,2],\"color\":[100,19,82,255],\"score\":0.0727791},\n{\"type\":32, \"data\":[327,247,2],\"color\":[225,89,191,255],\"score\":0.0727582},\n{\"type\":32, \"data\":[92,263,2],\"color\":[112,72,72,255],\"score\":0.0727337},\n{\"type\":32, \"data\":[385,165,11],\"color\":[68,86,112,255],\"score\":0.0727177},\n{\"type\":32, \"data\":[281,113,9],\"color\":[17,33,80,255],\"score\":0.072704},\n{\"type\":32, \"data\":[22,284,2],\"color\":[204,142,202,255],\"score\":0.0726742},\n{\"type\":32, \"data\":[355,96,5],\"color\":[203,134,169,255],\"score\":0.0726503},\n{\"type\":32, \"data\":[508,229,8],\"color\":[73,76,54,255],\"score\":0.0726282},\n{\"type\":32, \"data\":[142,234,3],\"color\":[176,81,124,255],\"score\":0.0726096},\n{\"type\":32, \"data\":[344,102,2],\"color\":[108,85,142,255],\"score\":0.0725952},\n{\"type\":32, \"data\":[399,205,4],\"color\":[156,94,104,255],\"score\":0.0725798},\n{\"type\":32, \"data\":[163,275,3],\"color\":[197,61,171,255],\"score\":0.0725593},\n{\"type\":32, \"data\":[200,197,6],\"color\":[53,85,86,255],\"score\":0.0725404},\n{\"type\":32, \"data\":[269,0,12],\"color\":[186,109,114,255],\"score\":0.0725286},\n{\"type\":32, \"data\":[221,82,10],\"color\":[174,69,124,255],\"score\":0.0725135},\n{\"type\":32, \"data\":[263,240,3],\"color\":[126,72,99,255],\"score\":0.072492},\n{\"type\":32, \"data\":[290,134,10],\"color\":[25,57,100,255],\"score\":0.0724782},\n{\"type\":32, \"data\":[76,252,2],\"color\":[205,92,193,255],\"score\":0.0724555},\n{\"type\":32, \"data\":[21,281,2],\"color\":[91,55,90,255],\"score\":0.0724333},\n{\"type\":32, \"data\":[272,103,4],\"color\":[58,56,119,255],\"score\":0.0724174},\n{\"type\":32, \"data\":[472,211,3],\"color\":[122,25,125,255],\"score\":0.0723936},\n{\"type\":32, \"data\":[373,232,5],\"color\":[84,72,68,255],\"score\":0.0723745},\n{\"type\":32, \"data\":[470,241,3],\"color\":[159,51,114,255],\"score\":0.0723524},\n{\"type\":32, \"data\":[81,259,3],\"color\":[135,100,84,255],\"score\":0.072328},\n{\"type\":32, \"data\":[41,277,4],\"color\":[87,68,69,255],\"score\":0.0723009},\n{\"type\":32, \"data\":[346,190,7],\"color\":[81,95,32,255],\"score\":0.0722837},\n{\"type\":32, \"data\":[479,269,3],\"color\":[215,96,195,255],\"score\":0.0722597},\n{\"type\":32, \"data\":[475,260,4],\"color\":[218,73,193,255],\"score\":0.0722349},\n{\"type\":32, \"data\":[234,258,3],\"color\":[82,40,74,255],\"score\":0.072203},\n{\"type\":32, \"data\":[212,115,5],\"color\":[76,90,155,255],\"score\":0.072192},\n{\"type\":32, \"data\":[452,90,6],\"color\":[219,116,149,255],\"score\":0.072177},\n{\"type\":32, \"data\":[79,148,16],\"color\":[49,98,163,255],\"score\":0.072165},\n{\"type\":32, \"data\":[397,100,4],\"color\":[177,117,166,255],\"score\":0.072145},\n{\"type\":32, \"data\":[85,271,3],\"color\":[76,43,65,255],\"score\":0.0721237},\n{\"type\":32, \"data\":[469,185,8],\"color\":[72,87,33,255],\"score\":0.0721071},\n{\"type\":32, \"data\":[111,231,3],\"color\":[170,111,116,255],\"score\":0.0720833},\n{\"type\":32, \"data\":[394,249,4],\"color\":[181,120,144,255],\"score\":0.0720614},\n{\"type\":32, \"data\":[290,99,6],\"color\":[55,51,106,255],\"score\":0.0720436},\n{\"type\":32, \"data\":[31,74,10],\"color\":[104,38,83,255],\"score\":0.0720306},\n{\"type\":32, \"data\":[142,243,2],\"color\":[203,112,188,255],\"score\":0.0720115},\n{\"type\":32, \"data\":[368,79,5],\"color\":[232,126,50,255],\"score\":0.0719975},\n{\"type\":32, \"data\":[385,267,4],\"color\":[203,68,186,255],\"score\":0.0719755},\n{\"type\":32, \"data\":[317,265,3],\"color\":[216,75,186,255],\"score\":0.0719345},\n{\"type\":32, \"data\":[226,229,3],\"color\":[167,64,134,255],\"score\":0.0719171},\n{\"type\":32, \"data\":[380,234,2],\"color\":[200,74,187,255],\"score\":0.0718967},\n{\"type\":32, \"data\":[245,253,3],\"color\":[71,49,67,255],\"score\":0.0718755},\n{\"type\":32, \"data\":[392,212,3],\"color\":[67,55,57,255],\"score\":0.071854},\n{\"type\":32, \"data\":[3,285,3],\"color\":[223,83,217,255],\"score\":0.0718316},\n{\"type\":32, \"data\":[484,243,4],\"color\":[91,65,69,255],\"score\":0.0718068},\n{\"type\":32, \"data\":[435,119,13],\"color\":[30,39,75,255],\"score\":0.0717947},\n{\"type\":32, \"data\":[253,176,6],\"color\":[59,73,63,255],\"score\":0.0717819},\n{\"type\":32, \"data\":[24,155,15],\"color\":[45,97,161,255],\"score\":0.0717697},\n{\"type\":32, \"data\":[405,264,3],\"color\":[218,102,185,255],\"score\":0.0717461},\n{\"type\":32, \"data\":[467,253,6],\"color\":[117,92,97,255],\"score\":0.0717292},\n{\"type\":32, \"data\":[114,267,3],\"color\":[183,52,167,255],\"score\":0.0717058},\n{\"type\":32, \"data\":[214,271,2],\"color\":[198,129,174,255],\"score\":0.0716844},\n{\"type\":32, \"data\":[97,248,4],\"color\":[160,21,148,255],\"score\":0.0716623},\n{\"type\":32, \"data\":[141,33,13],\"color\":[208,106,100,255],\"score\":0.0716526},\n{\"type\":32, \"data\":[79,65,6],\"color\":[127,51,89,255],\"score\":0.0716425},\n{\"type\":32, \"data\":[114,118,10],\"color\":[63,76,149,255],\"score\":0.0716296},\n{\"type\":32, \"data\":[444,101,5],\"color\":[147,118,169,255],\"score\":0.0716135},\n{\"type\":32, \"data\":[51,250,3],\"color\":[108,83,48,255],\"score\":0.0715925},\n{\"type\":32, \"data\":[440,220,7],\"color\":[62,68,40,255],\"score\":0.0715766},\n{\"type\":32, \"data\":[64,265,3],\"color\":[186,57,170,255],\"score\":0.071556},\n{\"type\":32, \"data\":[389,207,2],\"color\":[204,110,141,255],\"score\":0.0715353},\n{\"type\":32, \"data\":[489,276,2],\"color\":[70,23,66,255],\"score\":0.0715103},\n{\"type\":32, \"data\":[442,134,4],\"color\":[55,71,107,255],\"score\":0.0714959},\n{\"type\":32, \"data\":[250,71,10],\"color\":[206,80,111,255],\"score\":0.0714832},\n{\"type\":32, \"data\":[462,266,1],\"color\":[87,38,74,255],\"score\":0.0714662},\n{\"type\":32, \"data\":[123,287,14],\"color\":[116,92,78,255],\"score\":0.071453},\n{\"type\":32, \"data\":[27,278,5],\"color\":[95,71,81,255],\"score\":0.0714324},\n{\"type\":32, \"data\":[496,256,3],\"color\":[200,114,176,255],\"score\":0.0714098},\n{\"type\":32, \"data\":[375,262,2],\"color\":[229,128,208,255],\"score\":0.0713835},\n{\"type\":32, \"data\":[175,108,7],\"color\":[106,93,160,255],\"score\":0.0713722},\n{\"type\":32, \"data\":[249,195,4],\"color\":[91,104,104,255],\"score\":0.071353},\n{\"type\":32, \"data\":[43,265,4],\"color\":[209,75,199,255],\"score\":0.0713317},\n{\"type\":32, \"data\":[21,288,3],\"color\":[211,35,213,255],\"score\":0.0713184},\n{\"type\":32, \"data\":[280,102,5],\"color\":[50,51,109,255],\"score\":0.0713052},\n{\"type\":32, \"data\":[157,261,4],\"color\":[87,86,51,255],\"score\":0.071284},\n{\"type\":32, \"data\":[358,216,4],\"color\":[96,50,81,255],\"score\":0.0712633},\n{\"type\":32, \"data\":[312,245,4],\"color\":[107,74,82,255],\"score\":0.0712384},\n{\"type\":32, \"data\":[404,272,4],\"color\":[94,56,76,255],\"score\":0.0712224},\n{\"type\":32, \"data\":[199,22,16],\"color\":[215,116,105,255],\"score\":0.0712112},\n{\"type\":32, \"data\":[283,234,2],\"color\":[201,73,185,255],\"score\":0.0711863},\n{\"type\":32, \"data\":[202,228,2],\"color\":[78,64,67,255],\"score\":0.071173},\n{\"type\":32, \"data\":[500,275,3],\"color\":[227,96,205,255],\"score\":0.0711401},\n{\"type\":32, \"data\":[310,282,4],\"color\":[217,60,203,255],\"score\":0.0711191},\n{\"type\":32, \"data\":[501,77,10],\"color\":[236,86,99,255],\"score\":0.0711069},\n{\"type\":32, \"data\":[498,265,1],\"color\":[226,162,224,255],\"score\":0.0710885},\n{\"type\":32, \"data\":[283,62,19],\"color\":[218,100,109,255],\"score\":0.0710787},\n{\"type\":32, \"data\":[404,255,4],\"color\":[152,136,121,255],\"score\":0.0710638},\n{\"type\":32, \"data\":[0,268,6],\"color\":[124,52,131,255],\"score\":0.0710491},\n{\"type\":32, \"data\":[501,260,4],\"color\":[122,71,117,255],\"score\":0.07103},\n{\"type\":32, \"data\":[382,138,9],\"color\":[43,60,97,255],\"score\":0.0710177},\n{\"type\":32, \"data\":[271,287,5],\"color\":[202,16,191,255],\"score\":0.0710036},\n{\"type\":32, \"data\":[263,138,11],\"color\":[22,59,105,255],\"score\":0.0709923},\n{\"type\":32, \"data\":[246,203,7],\"color\":[97,107,47,255],\"score\":0.0709762},\n{\"type\":32, \"data\":[117,247,2],\"color\":[199,101,185,255],\"score\":0.0709558},\n{\"type\":32, \"data\":[240,175,6],\"color\":[74,87,74,255],\"score\":0.070944},\n{\"type\":32, \"data\":[490,239,3],\"color\":[184,97,143,255],\"score\":0.0709209},\n{\"type\":32, \"data\":[399,76,4],\"color\":[239,208,79,255],\"score\":0.0709038},\n{\"type\":32, \"data\":[209,272,3],\"color\":[97,46,75,255],\"score\":0.0708806},\n{\"type\":32, \"data\":[160,238,4],\"color\":[90,72,65,255],\"score\":0.0708574},\n{\"type\":32, \"data\":[441,78,9],\"color\":[235,104,92,255],\"score\":0.0708462},\n{\"type\":32, \"data\":[56,258,2],\"color\":[200,72,188,255],\"score\":0.0708285},\n{\"type\":32, \"data\":[35,249,2],\"color\":[197,84,154,255],\"score\":0.0708112},\n{\"type\":32, \"data\":[199,264,5],\"color\":[130,111,97,255],\"score\":0.0707963},\n{\"type\":32, \"data\":[446,263,4],\"color\":[186,17,168,255],\"score\":0.0707737},\n{\"type\":32, \"data\":[191,287,3],\"color\":[190,61,149,255],\"score\":0.0707494},\n{\"type\":32, \"data\":[411,273,2],\"color\":[158,134,136,255],\"score\":0.0707284},\n{\"type\":32, \"data\":[254,279,2],\"color\":[70,41,56,255],\"score\":0.0707052},\n{\"type\":32, \"data\":[353,247,3],\"color\":[116,48,87,255],\"score\":0.0706738},\n{\"type\":32, \"data\":[350,265,2],\"color\":[91,41,75,255],\"score\":0.0706477},\n{\"type\":32, \"data\":[484,193,4],\"color\":[131,123,32,255],\"score\":0.070631},\n{\"type\":32, \"data\":[320,245,3],\"color\":[127,79,77,255],\"score\":0.0706138},\n{\"type\":32, \"data\":[381,210,3],\"color\":[173,87,122,255],\"score\":0.0705941},\n{\"type\":32, \"data\":[65,279,5],\"color\":[66,45,64,255],\"score\":0.0705766},\n{\"type\":32, \"data\":[411,101,5],\"color\":[151,110,165,255],\"score\":0.0705609},\n{\"type\":32, \"data\":[376,113,12],\"color\":[29,27,63,255],\"score\":0.070544},\n{\"type\":32, \"data\":[151,60,8],\"color\":[167,65,98,255],\"score\":0.0705336},\n{\"type\":32, \"data\":[461,230,5],\"color\":[105,108,45,255],\"score\":0.0705205},\n{\"type\":32, \"data\":[153,243,2],\"color\":[185,88,147,255],\"score\":0.0704991},\n{\"type\":32, \"data\":[362,0,14],\"color\":[225,135,113,255],\"score\":0.070488},\n{\"type\":32, \"data\":[243,102,8],\"color\":[155,116,169,255],\"score\":0.0704735},\n{\"type\":32, \"data\":[166,15,6],\"color\":[180,100,108,255],\"score\":0.0704616},\n{\"type\":32, \"data\":[349,241,4],\"color\":[195,59,169,255],\"score\":0.0704414},\n{\"type\":32, \"data\":[84,249,2],\"color\":[80,12,82,255],\"score\":0.0704239},\n{\"type\":32, \"data\":[391,149,5],\"color\":[53,48,49,255],\"score\":0.0704085},\n{\"type\":32, \"data\":[335,269,4],\"color\":[127,111,61,255],\"score\":0.0703853},\n{\"type\":32, \"data\":[221,0,8],\"color\":[174,104,112,255],\"score\":0.0703725},\n{\"type\":32, \"data\":[236,263,3],\"color\":[187,61,180,255],\"score\":0.0703525},\n{\"type\":32, \"data\":[482,261,4],\"color\":[214,86,194,255],\"score\":0.0703324},\n{\"type\":32, \"data\":[344,254,3],\"color\":[126,70,103,255],\"score\":0.070315},\n{\"type\":32, \"data\":[108,261,3],\"color\":[103,63,79,255],\"score\":0.0702966},\n{\"type\":32, \"data\":[130,283,4],\"color\":[132,117,94,255],\"score\":0.070286},\n{\"type\":32, \"data\":[468,200,2],\"color\":[154,75,137,255],\"score\":0.0702716},\n{\"type\":32, \"data\":[17,247,5],\"color\":[151,136,42,255],\"score\":0.0702547},\n{\"type\":32, \"data\":[447,287,3],\"color\":[61,26,52,255],\"score\":0.0702341},\n{\"type\":32, \"data\":[370,251,1],\"color\":[233,141,211,255],\"score\":0.0702209},\n{\"type\":32, \"data\":[99,235,4],\"color\":[172,77,115,255],\"score\":0.0702006},\n{\"type\":32, \"data\":[476,208,4],\"color\":[42,34,48,255],\"score\":0.0701871},\n{\"type\":32, \"data\":[467,103,1],\"color\":[116,99,141,255],\"score\":0.0701774},\n{\"type\":32, \"data\":[73,194,11],\"color\":[30,76,122,255],\"score\":0.0701684},\n{\"type\":32, \"data\":[318,91,4],\"color\":[211,109,149,255],\"score\":0.0701555},\n{\"type\":32, \"data\":[370,53,13],\"color\":[234,117,101,255],\"score\":0.0701443},\n{\"type\":32, \"data\":[197,211,9],\"color\":[113,114,53,255],\"score\":0.0701284},\n{\"type\":32, \"data\":[71,237,4],\"color\":[171,124,87,255],\"score\":0.0701125},\n{\"type\":32, \"data\":[156,280,3],\"color\":[220,78,197,255],\"score\":0.0700933},\n{\"type\":32, \"data\":[443,273,6],\"color\":[88,64,76,255],\"score\":0.0700732},\n{\"type\":32, \"data\":[476,225,5],\"color\":[46,50,46,255],\"score\":0.070062},\n{\"type\":32, \"data\":[185,173,17],\"color\":[27,79,122,255],\"score\":0.0700521},\n{\"type\":32, \"data\":[105,269,2],\"color\":[172,75,162,255],\"score\":0.0700308},\n{\"type\":32, \"data\":[172,272,2],\"color\":[198,44,150,255],\"score\":0.0700148},\n{\"type\":32, \"data\":[316,113,7],\"color\":[23,35,78,255],\"score\":0.0700035},\n{\"type\":32, \"data\":[261,227,4],\"color\":[173,78,142,255],\"score\":0.0699865},\n{\"type\":32, \"data\":[65,287,2],\"color\":[162,118,112,255],\"score\":0.069972},\n{\"type\":32, \"data\":[192,269,3],\"color\":[79,37,79,255],\"score\":0.069952},\n{\"type\":32, \"data\":[170,279,4],\"color\":[104,81,84,255],\"score\":0.0699411},\n{\"type\":32, \"data\":[129,164,16],\"color\":[23,79,132,255],\"score\":0.0699295},\n{\"type\":32, \"data\":[297,230,4],\"color\":[75,60,65,255],\"score\":0.0699135},\n{\"type\":32, \"data\":[245,230,2],\"color\":[103,75,64,255],\"score\":0.0698963},\n{\"type\":32, \"data\":[155,197,12],\"color\":[23,47,92,255],\"score\":0.0698855},\n{\"type\":32, \"data\":[127,137,10],\"color\":[44,85,151,255],\"score\":0.0698744},\n{\"type\":32, \"data\":[193,276,2],\"color\":[71,36,71,255],\"score\":0.0698602},\n{\"type\":32, \"data\":[170,230,4],\"color\":[175,58,151,255],\"score\":0.0698399},\n{\"type\":32, \"data\":[218,269,2],\"color\":[177,114,134,255],\"score\":0.0698201},\n{\"type\":32, \"data\":[355,110,9],\"color\":[25,23,57,255],\"score\":0.0698088},\n{\"type\":32, \"data\":[339,94,6],\"color\":[203,126,165,255],\"score\":0.0697954},\n{\"type\":32, \"data\":[356,279,7],\"color\":[59,36,64,255],\"score\":0.0697803},\n{\"type\":32, \"data\":[302,272,3],\"color\":[76,49,76,255],\"score\":0.0697631},\n{\"type\":32, \"data\":[496,278,2],\"color\":[154,10,106,255],\"score\":0.0697456},\n{\"type\":32, \"data\":[176,236,2],\"color\":[82,53,62,255],\"score\":0.069728},\n{\"type\":32, \"data\":[474,281,5],\"color\":[77,46,70,255],\"score\":0.0697104},\n{\"type\":32, \"data\":[87,282,2],\"color\":[71,36,50,255],\"score\":0.0696922},\n{\"type\":32, \"data\":[96,273,3],\"color\":[185,52,143,255],\"score\":0.0696748},\n{\"type\":32, \"data\":[339,27,16],\"color\":[239,135,105,255],\"score\":0.0696649},\n{\"type\":32, \"data\":[389,260,2],\"color\":[86,46,74,255],\"score\":0.0696389},\n{\"type\":32, \"data\":[28,287,3],\"color\":[136,46,101,255],\"score\":0.0696255},\n{\"type\":32, \"data\":[487,281,4],\"color\":[106,72,101,255],\"score\":0.0696136},\n{\"type\":32, \"data\":[8,158,9],\"color\":[34,91,154,255],\"score\":0.0696029},\n{\"type\":32, \"data\":[29,265,4],\"color\":[127,55,105,255],\"score\":0.0695807},\n{\"type\":32, \"data\":[389,269,2],\"color\":[237,123,211,255],\"score\":0.0695647},\n{\"type\":32, \"data\":[340,267,2],\"color\":[112,12,88,255],\"score\":0.0695471},\n{\"type\":32, \"data\":[282,283,2],\"color\":[177,151,153,255],\"score\":0.0695278},\n{\"type\":32, \"data\":[493,235,3],\"color\":[114,122,56,255],\"score\":0.0695107},\n{\"type\":32, \"data\":[218,276,4],\"color\":[110,66,87,255],\"score\":0.0694871},\n{\"type\":32, \"data\":[322,270,3],\"color\":[134,23,125,255],\"score\":0.069468},\n{\"type\":32, \"data\":[322,228,6],\"color\":[147,114,104,255],\"score\":0.0694545},\n{\"type\":32, \"data\":[409,254,4],\"color\":[169,138,130,255],\"score\":0.0694402},\n{\"type\":32, \"data\":[223,264,2],\"color\":[166,52,135,255],\"score\":0.0694243},\n{\"type\":32, \"data\":[456,262,4],\"color\":[193,24,161,255],\"score\":0.0694075},\n{\"type\":32, \"data\":[429,136,5],\"color\":[53,71,108,255],\"score\":0.0693981},\n{\"type\":32, \"data\":[214,105,8],\"color\":[133,107,168,255],\"score\":0.0693862},\n{\"type\":32, \"data\":[485,273,2],\"color\":[208,110,191,255],\"score\":0.0693667},\n{\"type\":32, \"data\":[289,241,4],\"color\":[177,92,146,255],\"score\":0.0693506},\n{\"type\":32, \"data\":[12,265,3],\"color\":[174,107,132,255],\"score\":0.0693291},\n{\"type\":32, \"data\":[382,273,1],\"color\":[199,162,163,255],\"score\":0.0693145},\n{\"type\":32, \"data\":[67,16,8],\"color\":[174,92,103,255],\"score\":0.069302},\n{\"type\":32, \"data\":[63,109,8],\"color\":[80,67,138,255],\"score\":0.0692931},\n{\"type\":32, \"data\":[177,246,5],\"color\":[148,135,53,255],\"score\":0.0692813},\n{\"type\":32, \"data\":[274,259,2],\"color\":[223,60,189,255],\"score\":0.0692609},\n{\"type\":32, \"data\":[434,261,4],\"color\":[211,51,191,255],\"score\":0.0692459},\n{\"type\":32, \"data\":[388,221,2],\"color\":[182,69,141,255],\"score\":0.0692279},\n{\"type\":32, \"data\":[262,97,5],\"color\":[173,114,165,255],\"score\":0.0692119},\n{\"type\":32, \"data\":[303,248,3],\"color\":[177,50,147,255],\"score\":0.0691963},\n{\"type\":32, \"data\":[442,204,6],\"color\":[119,109,44,255],\"score\":0.0691823},\n{\"type\":32, \"data\":[160,230,4],\"color\":[179,80,141,255],\"score\":0.0691682},\n{\"type\":32, \"data\":[404,246,5],\"color\":[120,120,48,255],\"score\":0.0691535},\n{\"type\":32, \"data\":[239,269,1],\"color\":[205,75,194,255],\"score\":0.0691386},\n{\"type\":32, \"data\":[392,177,4],\"color\":[94,106,107,255],\"score\":0.0691261},\n{\"type\":32, \"data\":[393,90,2],\"color\":[239,188,24,255],\"score\":0.0691073},\n{\"type\":32, \"data\":[271,94,6],\"color\":[184,108,158,255],\"score\":0.069097},\n{\"type\":32, \"data\":[362,240,2],\"color\":[227,96,201,255],\"score\":0.0690779},\n{\"type\":32, \"data\":[22,255,7],\"color\":[129,102,53,255],\"score\":0.0690637},\n{\"type\":32, \"data\":[88,287,4],\"color\":[113,99,52,255],\"score\":0.0690539},\n{\"type\":32, \"data\":[382,261,4],\"color\":[97,77,85,255],\"score\":0.0690325},\n{\"type\":32, \"data\":[107,226,5],\"color\":[124,115,51,255],\"score\":0.0690161},\n{\"type\":32, \"data\":[173,265,5],\"color\":[75,65,50,255],\"score\":0.0690043},\n{\"type\":32, \"data\":[14,126,10],\"color\":[55,77,153,255],\"score\":0.0689943},\n{\"type\":32, \"data\":[43,247,4],\"color\":[134,115,43,255],\"score\":0.0689741},\n{\"type\":32, \"data\":[141,239,3],\"color\":[116,47,96,255],\"score\":0.0689549},\n{\"type\":32, \"data\":[52,33,12],\"color\":[193,93,95,255],\"score\":0.0689446},\n{\"type\":32, \"data\":[387,288,8],\"color\":[60,41,62,255],\"score\":0.0689361},\n{\"type\":32, \"data\":[317,248,2],\"color\":[213,95,184,255],\"score\":0.0689151},\n{\"type\":32, \"data\":[137,265,6],\"color\":[114,95,74,255],\"score\":0.0688995},\n{\"type\":32, \"data\":[466,270,4],\"color\":[158,100,141,255],\"score\":0.0688768},\n{\"type\":32, \"data\":[303,228,2],\"color\":[103,87,47,255],\"score\":0.0688631},\n{\"type\":32, \"data\":[54,63,6],\"color\":[127,51,86,255],\"score\":0.0688538},\n{\"type\":32, \"data\":[255,219,3],\"color\":[109,94,40,255],\"score\":0.0688332},\n{\"type\":32, \"data\":[489,58,11],\"color\":[241,110,91,255],\"score\":0.0688245},\n{\"type\":32, \"data\":[434,238,4],\"color\":[97,94,44,255],\"score\":0.0688108},\n{\"type\":32, \"data\":[485,288,5],\"color\":[48,33,61,255],\"score\":0.0688002},\n{\"type\":32, \"data\":[502,214,2],\"color\":[101,119,42,255],\"score\":0.0687838},\n{\"type\":32, \"data\":[275,255,1],\"color\":[74,12,53,255],\"score\":0.0687704},\n{\"type\":32, \"data\":[149,285,3],\"color\":[128,121,119,255],\"score\":0.0687505},\n{\"type\":32, \"data\":[234,193,6],\"color\":[79,77,54,255],\"score\":0.0687397},\n{\"type\":32, \"data\":[73,282,3],\"color\":[128,99,56,255],\"score\":0.0687278},\n{\"type\":32, \"data\":[431,179,7],\"color\":[98,99,35,255],\"score\":0.0687133},\n{\"type\":32, \"data\":[155,215,3],\"color\":[85,77,51,255],\"score\":0.0687},\n{\"type\":32, \"data\":[429,90,5],\"color\":[219,119,152,255],\"score\":0.068687},\n{\"type\":32, \"data\":[310,178,10],\"color\":[75,76,53,255],\"score\":0.068677},\n{\"type\":32, \"data\":[361,261,2],\"color\":[139,19,100,255],\"score\":0.068657},\n{\"type\":32, \"data\":[406,232,2],\"color\":[199,70,171,255],\"score\":0.0686292},\n{\"type\":32, \"data\":[113,69,8],\"color\":[128,50,93,255],\"score\":0.0686217},\n{\"type\":32, \"data\":[315,260,2],\"color\":[202,35,176,255],\"score\":0.0686046},\n{\"type\":32, \"data\":[231,253,2],\"color\":[194,28,162,255],\"score\":0.0685867},\n{\"type\":32, \"data\":[370,221,5],\"color\":[125,46,114,255],\"score\":0.0685666},\n{\"type\":32, \"data\":[478,254,3],\"color\":[95,80,79,255],\"score\":0.0685497},\n{\"type\":32, \"data\":[325,255,2],\"color\":[206,145,175,255],\"score\":0.0685325},\n{\"type\":32, \"data\":[487,167,3],\"color\":[38,31,40,255],\"score\":0.0685188},\n{\"type\":32, \"data\":[341,242,2],\"color\":[75,55,67,255],\"score\":0.0685043},\n{\"type\":32, \"data\":[496,193,4],\"color\":[123,121,34,255],\"score\":0.0684903},\n{\"type\":32, \"data\":[97,171,12],\"color\":[28,92,147,255],\"score\":0.0684788},\n{\"type\":32, \"data\":[387,276,2],\"color\":[85,33,73,255],\"score\":0.0684639},\n{\"type\":32, \"data\":[58,264,3],\"color\":[139,91,86,255],\"score\":0.0684439},\n{\"type\":32, \"data\":[148,124,12],\"color\":[62,86,154,255],\"score\":0.0684329},\n{\"type\":32, \"data\":[152,105,7],\"color\":[106,83,151,255],\"score\":0.0684239},\n{\"type\":32, \"data\":[457,287,6],\"color\":[116,98,69,255],\"score\":0.0684136},\n{\"type\":32, \"data\":[490,249,6],\"color\":[129,110,98,255],\"score\":0.068395},\n{\"type\":32, \"data\":[274,214,1],\"color\":[53,45,25,255],\"score\":0.068379},\n{\"type\":32, \"data\":[109,247,1],\"color\":[205,100,199,255],\"score\":0.0683617},\n{\"type\":32, \"data\":[214,224,2],\"color\":[84,69,53,255],\"score\":0.068346},\n{\"type\":32, \"data\":[209,53,10],\"color\":[202,89,103,255],\"score\":0.0683359},\n{\"type\":32, \"data\":[252,235,3],\"color\":[117,59,97,255],\"score\":0.0683189},\n{\"type\":32, \"data\":[442,281,1],\"color\":[232,125,229,255],\"score\":0.0683045},\n{\"type\":32, \"data\":[265,262,2],\"color\":[87,45,74,255],\"score\":0.0682889},\n{\"type\":32, \"data\":[124,94,9],\"color\":[106,59,122,255],\"score\":0.0682792},\n{\"type\":32, \"data\":[464,209,1],\"color\":[187,70,161,255],\"score\":0.0682654},\n{\"type\":32, \"data\":[374,251,2],\"color\":[199,141,168,255],\"score\":0.0682461},\n{\"type\":32, \"data\":[326,278,6],\"color\":[96,75,79,255],\"score\":0.0682339},\n{\"type\":32, \"data\":[296,157,5],\"color\":[72,88,111,255],\"score\":0.0682236},\n{\"type\":32, \"data\":[240,273,3],\"color\":[89,32,64,255],\"score\":0.0682044},\n{\"type\":32, \"data\":[83,47,7],\"color\":[181,80,94,255],\"score\":0.0681952},\n{\"type\":32, \"data\":[8,35,13],\"color\":[179,83,90,255],\"score\":0.0681858},\n{\"type\":32, \"data\":[379,248,2],\"color\":[219,80,190,255],\"score\":0.0681687},\n{\"type\":32, \"data\":[302,186,4],\"color\":[74,81,88,255],\"score\":0.0681565},\n{\"type\":32, \"data\":[374,256,4],\"color\":[138,88,112,255],\"score\":0.0681439},\n{\"type\":32, \"data\":[377,28,16],\"color\":[243,140,104,255],\"score\":0.0681365},\n{\"type\":32, \"data\":[293,275,7],\"color\":[89,67,76,255],\"score\":0.0681232},\n{\"type\":32, \"data\":[213,220,2],\"color\":[194,66,160,255],\"score\":0.0681095},\n{\"type\":32, \"data\":[71,262,2],\"color\":[195,41,181,255],\"score\":0.0680939},\n{\"type\":32, \"data\":[153,267,2],\"color\":[221,61,196,255],\"score\":0.0680711},\n{\"type\":32, \"data\":[92,252,2],\"color\":[164,34,162,255],\"score\":0.0680544},\n{\"type\":32, \"data\":[262,185,7],\"color\":[95,95,65,255],\"score\":0.0680468},\n{\"type\":32, \"data\":[245,262,3],\"color\":[135,67,115,255],\"score\":0.0680328},\n{\"type\":32, \"data\":[99,91,8],\"color\":[99,50,110,255],\"score\":0.0680251},\n{\"type\":32, \"data\":[217,250,3],\"color\":[186,12,181,255],\"score\":0.0680048},\n{\"type\":32, \"data\":[101,242,4],\"color\":[91,65,61,255],\"score\":0.0679859},\n{\"type\":32, \"data\":[359,287,3],\"color\":[111,90,57,255],\"score\":0.0679752},\n{\"type\":32, \"data\":[128,257,4],\"color\":[91,67,74,255],\"score\":0.067957},\n{\"type\":32, \"data\":[512,89,4],\"color\":[206,101,140,255],\"score\":0.0679438},\n{\"type\":32, \"data\":[413,90,4],\"color\":[226,113,144,255],\"score\":0.0679309},\n{\"type\":32, \"data\":[365,232,5],\"color\":[110,94,93,255],\"score\":0.0679182},\n{\"type\":32, \"data\":[29,145,10],\"color\":[56,99,167,255],\"score\":0.0679095},\n{\"type\":32, \"data\":[333,264,2],\"color\":[165,145,93,255],\"score\":0.0678924},\n{\"type\":32, \"data\":[157,270,2],\"color\":[96,30,73,255],\"score\":0.0678743},\n{\"type\":32, \"data\":[301,252,2],\"color\":[96,42,81,255],\"score\":0.067858},\n{\"type\":32, \"data\":[152,274,4],\"color\":[112,74,82,255],\"score\":0.0678454},\n{\"type\":32, \"data\":[328,168,11],\"color\":[63,62,52,255],\"score\":0.0678331},\n{\"type\":32, \"data\":[248,281,3],\"color\":[223,94,197,255],\"score\":0.0678174},\n{\"type\":32, \"data\":[472,97,5],\"color\":[195,136,172,255],\"score\":0.0678053},\n{\"type\":32, \"data\":[35,11,12],\"color\":[167,90,103,255],\"score\":0.0677975},\n{\"type\":32, \"data\":[449,166,4],\"color\":[78,84,83,255],\"score\":0.0677827},\n{\"type\":32, \"data\":[486,80,8],\"color\":[237,91,105,255],\"score\":0.0677766},\n{\"type\":32, \"data\":[362,271,2],\"color\":[130,94,105,255],\"score\":0.0677621},\n{\"type\":32, \"data\":[464,245,2],\"color\":[180,139,148,255],\"score\":0.067746},\n{\"type\":32, \"data\":[328,282,1],\"color\":[174,145,146,255],\"score\":0.067731},\n{\"type\":32, \"data\":[28,270,1],\"color\":[56,36,48,255],\"score\":0.0677182},\n{\"type\":32, \"data\":[398,134,10],\"color\":[45,60,94,255],\"score\":0.067705},\n{\"type\":32, \"data\":[391,279,2],\"color\":[147,67,138,255],\"score\":0.0676895},\n{\"type\":32, \"data\":[116,242,4],\"color\":[103,47,81,255],\"score\":0.0676772},\n{\"type\":32, \"data\":[483,94,5],\"color\":[199,126,162,255],\"score\":0.0676652},\n{\"type\":32, \"data\":[134,247,3],\"color\":[88,54,72,255],\"score\":0.0676478},\n{\"type\":32, \"data\":[300,236,3],\"color\":[192,106,157,255],\"score\":0.0676302},\n{\"type\":32, \"data\":[455,142,8],\"color\":[40,44,37,255],\"score\":0.0676194},\n{\"type\":32, \"data\":[67,260,3],\"color\":[128,100,81,255],\"score\":0.0676039},\n{\"type\":32, \"data\":[489,132,9],\"color\":[41,33,42,255],\"score\":0.0675921},\n{\"type\":32, \"data\":[153,221,4],\"color\":[139,132,65,255],\"score\":0.0675794},\n{\"type\":32, \"data\":[232,276,1],\"color\":[233,81,210,255],\"score\":0.0675667},\n{\"type\":32, \"data\":[508,204,3],\"color\":[19,18,30,255],\"score\":0.0675524},\n{\"type\":32, \"data\":[393,83,4],\"color\":[243,218,221,255],\"score\":0.0675354},\n{\"type\":32, \"data\":[189,225,4],\"color\":[153,59,126,255],\"score\":0.0675192},\n{\"type\":32, \"data\":[442,167,3],\"color\":[72,82,96,255],\"score\":0.0675092},\n{\"type\":32, \"data\":[507,254,3],\"color\":[56,46,46,255],\"score\":0.0674865},\n{\"type\":32, \"data\":[439,257,2],\"color\":[232,127,216,255],\"score\":0.0674681},\n{\"type\":32, \"data\":[366,287,2],\"color\":[128,107,69,255],\"score\":0.0674578},\n{\"type\":32, \"data\":[26,224,12],\"color\":[33,63,108,255],\"score\":0.0674489},\n{\"type\":32, \"data\":[393,203,3],\"color\":[151,136,44,255],\"score\":0.0674341},\n{\"type\":32, \"data\":[462,128,5],\"color\":[42,49,80,255],\"score\":0.0674261},\n{\"type\":32, \"data\":[436,267,3],\"color\":[148,108,102,255],\"score\":0.067411},\n{\"type\":32, \"data\":[136,107,7],\"color\":[95,79,147,255],\"score\":0.0674041},\n{\"type\":32, \"data\":[419,230,5],\"color\":[126,109,69,255],\"score\":0.0673921},\n{\"type\":32, \"data\":[431,222,4],\"color\":[62,74,41,255],\"score\":0.0673807},\n{\"type\":32, \"data\":[318,271,1],\"color\":[186,137,152,255],\"score\":0.0673645},\n{\"type\":32, \"data\":[493,276,2],\"color\":[218,114,205,255],\"score\":0.0673471},\n{\"type\":32, \"data\":[193,281,2],\"color\":[177,79,147,255],\"score\":0.0673344},\n{\"type\":32, \"data\":[409,216,2],\"color\":[167,55,138,255],\"score\":0.0673194},\n{\"type\":32, \"data\":[379,240,1],\"color\":[218,163,208,255],\"score\":0.0673059},\n{\"type\":32, \"data\":[417,258,3],\"color\":[89,50,82,255],\"score\":0.0672925},\n{\"type\":32, \"data\":[443,257,2],\"color\":[137,35,127,255],\"score\":0.0672764},\n{\"type\":32, \"data\":[53,15,8],\"color\":[167,89,103,255],\"score\":0.067266},\n{\"type\":32, \"data\":[184,239,3],\"color\":[92,79,61,255],\"score\":0.0672519},\n{\"type\":32, \"data\":[327,204,3],\"color\":[136,141,113,255],\"score\":0.0672353},\n{\"type\":32, \"data\":[379,253,2],\"color\":[62,48,49,255],\"score\":0.0672161},\n{\"type\":32, \"data\":[197,152,13],\"color\":[21,68,116,255],\"score\":0.0672086},\n{\"type\":32, \"data\":[270,261,2],\"color\":[194,54,181,255],\"score\":0.0671959},\n{\"type\":32, \"data\":[465,220,8],\"color\":[59,57,51,255],\"score\":0.0671852},\n{\"type\":32, \"data\":[387,87,2],\"color\":[247,209,43,255],\"score\":0.0671695},\n{\"type\":32, \"data\":[246,285,3],\"color\":[173,23,150,255],\"score\":0.0671522},\n{\"type\":32, \"data\":[377,203,5],\"color\":[139,131,42,255],\"score\":0.0671411},\n{\"type\":32, \"data\":[401,238,3],\"color\":[171,122,134,255],\"score\":0.0671262},\n{\"type\":32, \"data\":[470,267,2],\"color\":[112,24,97,255],\"score\":0.0671103},\n{\"type\":32, \"data\":[201,247,3],\"color\":[134,120,72,255],\"score\":0.0670977},\n{\"type\":32, \"data\":[369,246,3],\"color\":[178,116,140,255],\"score\":0.0670834},\n{\"type\":32, \"data\":[495,32,8],\"color\":[242,148,92,255],\"score\":0.067076},\n{\"type\":32, \"data\":[359,221,2],\"color\":[164,74,152,255],\"score\":0.067062},\n{\"type\":32, \"data\":[238,106,7],\"color\":[144,121,174,255],\"score\":0.0670524},\n{\"type\":32, \"data\":[1,258,2],\"color\":[100,78,61,255],\"score\":0.0670355},\n{\"type\":32, \"data\":[15,287,2],\"color\":[96,49,78,255],\"score\":0.0670226},\n{\"type\":32, \"data\":[382,177,6],\"color\":[93,105,101,255],\"score\":0.06701},\n{\"type\":32, \"data\":[10,144,8],\"color\":[59,98,169,255],\"score\":0.0670009},\n{\"type\":32, \"data\":[233,27,12],\"color\":[225,121,104,255],\"score\":0.0669928},\n{\"type\":32, \"data\":[474,41,9],\"color\":[243,132,91,255],\"score\":0.0669849},\n{\"type\":32, \"data\":[138,227,2],\"color\":[150,68,131,255],\"score\":0.0669684},\n{\"type\":32, \"data\":[191,260,2],\"color\":[210,76,182,255],\"score\":0.0669552},\n{\"type\":32, \"data\":[421,210,5],\"color\":[80,65,63,255],\"score\":0.0669437},\n{\"type\":32, \"data\":[264,107,5],\"color\":[46,51,111,255],\"score\":0.0669337},\n{\"type\":32, \"data\":[172,255,5],\"color\":[104,95,51,255],\"score\":0.0669227},\n{\"type\":32, \"data\":[40,256,2],\"color\":[151,33,138,255],\"score\":0.0669081},\n{\"type\":32, \"data\":[190,47,8],\"color\":[203,93,101,255],\"score\":0.0669003},\n{\"type\":32, \"data\":[344,271,2],\"color\":[174,98,130,255],\"score\":0.0668858},\n{\"type\":32, \"data\":[54,0,8],\"color\":[199,105,103,255],\"score\":0.0668779},\n{\"type\":32, \"data\":[282,249,3],\"color\":[206,104,180,255],\"score\":0.0668646},\n{\"type\":32, \"data\":[401,190,11],\"color\":[110,117,43,255],\"score\":0.0668536},\n{\"type\":32, \"data\":[110,277,8],\"color\":[121,72,78,255],\"score\":0.0668403},\n{\"type\":32, \"data\":[153,48,9],\"color\":[194,87,99,255],\"score\":0.0668338},\n{\"type\":32, \"data\":[75,118,9],\"color\":[57,70,145,255],\"score\":0.0668267},\n{\"type\":32, \"data\":[388,287,3],\"color\":[91,78,88,255],\"score\":0.0668162},\n{\"type\":32, \"data\":[328,126,9],\"color\":[27,45,86,255],\"score\":0.0668085},\n{\"type\":32, \"data\":[65,47,8],\"color\":[177,77,92,255],\"score\":0.0668015},\n{\"type\":32, \"data\":[420,253,1],\"color\":[161,18,96,255],\"score\":0.066789},\n{\"type\":32, \"data\":[251,255,4],\"color\":[119,86,94,255],\"score\":0.0667766},\n{\"type\":32, \"data\":[309,51,11],\"color\":[225,107,106,255],\"score\":0.0667695},\n{\"type\":32, \"data\":[483,150,6],\"color\":[79,72,78,255],\"score\":0.0667607},\n{\"type\":32, \"data\":[372,87,4],\"color\":[235,104,105,255],\"score\":0.0667482},\n{\"type\":32, \"data\":[187,277,5],\"color\":[114,100,85,255],\"score\":0.0667401},\n{\"type\":32, \"data\":[441,180,7],\"color\":[96,100,31,255],\"score\":0.0667285},\n{\"type\":32, \"data\":[159,274,2],\"color\":[212,62,195,255],\"score\":0.0667109},\n{\"type\":32, \"data\":[498,249,3],\"color\":[88,58,67,255],\"score\":0.0666925},\n{\"type\":32, \"data\":[201,230,2],\"color\":[82,68,64,255],\"score\":0.0666818},\n{\"type\":32, \"data\":[151,235,7],\"color\":[133,102,65,255],\"score\":0.0666742},\n{\"type\":32, \"data\":[109,279,3],\"color\":[133,117,79,255],\"score\":0.0666618},\n{\"type\":32, \"data\":[189,107,6],\"color\":[118,99,163,255],\"score\":0.0666537},\n{\"type\":32, \"data\":[357,243,4],\"color\":[188,48,164,255],\"score\":0.0666417},\n{\"type\":32, \"data\":[148,0,12],\"color\":[205,124,112,255],\"score\":0.0666333},\n{\"type\":32, \"data\":[277,238,4],\"color\":[98,68,85,255],\"score\":0.0666185},\n{\"type\":32, \"data\":[284,254,2],\"color\":[232,119,199,255],\"score\":0.0666012},\n{\"type\":32, \"data\":[54,245,4],\"color\":[161,144,42,255],\"score\":0.0665895},\n{\"type\":32, \"data\":[108,144,10],\"color\":[45,93,157,255],\"score\":0.066583},\n{\"type\":32, \"data\":[394,243,2],\"color\":[105,75,68,255],\"score\":0.0665679},\n{\"type\":32, \"data\":[421,110,3],\"color\":[34,29,65,255],\"score\":0.0665608},\n{\"type\":32, \"data\":[40,259,2],\"color\":[67,39,50,255],\"score\":0.066543},\n{\"type\":32, \"data\":[458,79,9],\"color\":[236,99,97,255],\"score\":0.0665353},\n{\"type\":32, \"data\":[446,93,5],\"color\":[208,127,164,255],\"score\":0.0665258},\n{\"type\":32, \"data\":[283,274,4],\"color\":[66,47,66,255],\"score\":0.0665153},\n{\"type\":32, \"data\":[344,287,1],\"color\":[206,31,207,255],\"score\":0.0665006},\n{\"type\":32, \"data\":[252,0,6],\"color\":[177,105,114,255],\"score\":0.0664925},\n{\"type\":32, \"data\":[36,273,2],\"color\":[179,50,181,255],\"score\":0.066476},\n{\"type\":32, \"data\":[263,287,2],\"color\":[150,125,125,255],\"score\":0.066463},\n{\"type\":32, \"data\":[266,86,7],\"color\":[199,88,136,255],\"score\":0.0664538},\n{\"type\":32, \"data\":[267,253,2],\"color\":[105,85,70,255],\"score\":0.0664414},\n{\"type\":32, \"data\":[2,10,12],\"color\":[149,79,101,255],\"score\":0.066435},\n{\"type\":32, \"data\":[255,235,2],\"color\":[87,40,77,255],\"score\":0.0664226},\n{\"type\":32, \"data\":[280,213,5],\"color\":[130,82,97,255],\"score\":0.0664079},\n{\"type\":32, \"data\":[291,209,5],\"color\":[98,94,48,255],\"score\":0.0663974},\n{\"type\":32, \"data\":[79,233,5],\"color\":[143,127,48,255],\"score\":0.0663848},\n{\"type\":32, \"data\":[408,235,1],\"color\":[58,53,35,255],\"score\":0.0663729},\n{\"type\":32, \"data\":[297,96,5],\"color\":[60,49,107,255],\"score\":0.0663628},\n{\"type\":32, \"data\":[95,17,7],\"color\":[184,99,105,255],\"score\":0.0663566},\n{\"type\":32, \"data\":[206,239,3],\"color\":[138,70,114,255],\"score\":0.0663441},\n{\"type\":32, \"data\":[372,287,1],\"color\":[135,129,134,255],\"score\":0.0663337},\n{\"type\":32, \"data\":[258,252,3],\"color\":[184,67,152,255],\"score\":0.0663207},\n{\"type\":32, \"data\":[148,263,3],\"color\":[78,74,46,255],\"score\":0.0663075},\n{\"type\":32, \"data\":[136,59,7],\"color\":[166,65,96,255],\"score\":0.0663006},\n{\"type\":32, \"data\":[366,260,3],\"color\":[227,80,203,255],\"score\":0.0662874},\n{\"type\":32, \"data\":[172,224,2],\"color\":[51,61,33,255],\"score\":0.0662712},\n{\"type\":32, \"data\":[272,220,3],\"color\":[148,110,63,255],\"score\":0.066255},\n{\"type\":32, \"data\":[61,170,10],\"color\":[36,103,158,255],\"score\":0.066248},\n{\"type\":32, \"data\":[340,261,3],\"color\":[212,106,182,255],\"score\":0.066234},\n{\"type\":32, \"data\":[277,245,3],\"color\":[209,54,183,255],\"score\":0.0662204},\n{\"type\":32, \"data\":[189,256,1],\"color\":[221,106,198,255],\"score\":0.0662109},\n{\"type\":32, \"data\":[434,245,3],\"color\":[197,56,148,255],\"score\":0.0661951},\n{\"type\":32, \"data\":[355,270,2],\"color\":[120,100,108,255],\"score\":0.0661807},\n{\"type\":32, \"data\":[458,267,2],\"color\":[132,55,125,255],\"score\":0.0661651},\n{\"type\":32, \"data\":[162,269,3],\"color\":[120,52,102,255],\"score\":0.0661533},\n{\"type\":32, \"data\":[230,245,2],\"color\":[200,46,165,255],\"score\":0.0661392},\n{\"type\":32, \"data\":[212,253,3],\"color\":[187,59,171,255],\"score\":0.0661276},\n{\"type\":32, \"data\":[9,257,2],\"color\":[74,48,60,255],\"score\":0.0661059},\n{\"type\":32, \"data\":[247,236,1],\"color\":[221,69,204,255],\"score\":0.0660961},\n{\"type\":32, \"data\":[265,157,10],\"color\":[41,77,111,255],\"score\":0.0660881}\n]}";
ShapeDatasets.cinderella = "{\"shapes\":\n[{\"type\":32, \"data\":[178,352,83],\"color\":[255,255,183,128],\"score\":0.184815},\n{\"type\":32, \"data\":[258,511,76],\"color\":[246,196,132,128],\"score\":0.177467},\n{\"type\":32, \"data\":[103,511,83],\"color\":[235,187,125,128],\"score\":0.169547},\n{\"type\":32, \"data\":[185,57,231],\"color\":[0,0,0,128],\"score\":0.143456},\n{\"type\":32, \"data\":[111,241,52],\"color\":[177,168,106,128],\"score\":0.136837},\n{\"type\":32, \"data\":[137,147,30],\"color\":[255,209,120,128],\"score\":0.130998},\n{\"type\":32, \"data\":[104,311,35],\"color\":[255,235,158,128],\"score\":0.126921},\n{\"type\":32, \"data\":[182,348,54],\"color\":[255,231,166,128],\"score\":0.123562},\n{\"type\":32, \"data\":[16,250,63],\"color\":[0,0,0,128],\"score\":0.119216},\n{\"type\":32, \"data\":[94,411,43],\"color\":[23,20,6,128],\"score\":0.115677},\n{\"type\":32, \"data\":[172,421,34],\"color\":[238,199,129,128],\"score\":0.113572},\n{\"type\":32, \"data\":[219,455,23],\"color\":[0,11,0,128],\"score\":0.111907},\n{\"type\":32, \"data\":[265,346,35],\"color\":[154,137,86,128],\"score\":0.109923},\n{\"type\":32, \"data\":[97,202,18],\"color\":[242,227,151,128],\"score\":0.108643},\n{\"type\":32, \"data\":[185,237,19],\"color\":[200,143,77,128],\"score\":0.107463},\n{\"type\":32, \"data\":[263,448,24],\"color\":[255,202,138,128],\"score\":0.106282},\n{\"type\":32, \"data\":[40,491,40],\"color\":[197,158,106,128],\"score\":0.105021},\n{\"type\":32, \"data\":[139,235,37],\"color\":[33,34,13,128],\"score\":0.10381},\n{\"type\":32, \"data\":[53,365,23],\"color\":[204,143,73,128],\"score\":0.102783},\n{\"type\":32, \"data\":[92,235,17],\"color\":[244,230,161,128],\"score\":0.101675},\n{\"type\":32, \"data\":[146,0,143],\"color\":[0,0,0,128],\"score\":0.098033},\n{\"type\":32, \"data\":[140,124,28],\"color\":[195,138,76,128],\"score\":0.0962441},\n{\"type\":32, \"data\":[204,275,21],\"color\":[160,114,65,128],\"score\":0.0952317},\n{\"type\":32, \"data\":[304,439,25],\"color\":[57,52,31,128],\"score\":0.0946144},\n{\"type\":32, \"data\":[260,74,122],\"color\":[0,2,2,128],\"score\":0.0926333},\n{\"type\":32, \"data\":[36,136,74],\"color\":[0,0,0,128],\"score\":0.0908509},\n{\"type\":32, \"data\":[29,299,44],\"color\":[0,1,1,128],\"score\":0.089599},\n{\"type\":32, \"data\":[266,357,32],\"color\":[122,116,74,128],\"score\":0.0888991},\n{\"type\":32, \"data\":[98,291,29],\"color\":[200,185,124,128],\"score\":0.088232},\n{\"type\":32, \"data\":[0,429,18],\"color\":[255,163,86,128],\"score\":0.0875277},\n{\"type\":32, \"data\":[352,258,33],\"color\":[0,6,3,128],\"score\":0.0869428},\n{\"type\":32, \"data\":[140,148,17],\"color\":[255,217,148,128],\"score\":0.0860728},\n{\"type\":32, \"data\":[279,360,17],\"color\":[219,200,142,128],\"score\":0.0854002},\n{\"type\":32, \"data\":[115,185,25],\"color\":[149,115,57,128],\"score\":0.0848037},\n{\"type\":32, \"data\":[312,386,23],\"color\":[1,11,9,128],\"score\":0.0843053},\n{\"type\":32, \"data\":[267,423,12],\"color\":[255,193,125,128],\"score\":0.083716},\n{\"type\":32, \"data\":[277,472,19],\"color\":[255,215,153,128],\"score\":0.0831952},\n{\"type\":32, \"data\":[175,511,35],\"color\":[217,174,119,128],\"score\":0.0826543},\n{\"type\":32, \"data\":[93,391,27],\"color\":[33,31,16,128],\"score\":0.0821185},\n{\"type\":32, \"data\":[133,287,28],\"color\":[151,131,79,128],\"score\":0.0815923},\n{\"type\":32, \"data\":[51,391,32],\"color\":[125,97,55,128],\"score\":0.0811216},\n{\"type\":32, \"data\":[33,231,45],\"color\":[0,0,4,128],\"score\":0.0803879},\n{\"type\":32, \"data\":[238,434,22],\"color\":[96,64,32,128],\"score\":0.0798809},\n{\"type\":32, \"data\":[130,463,11],\"color\":[20,23,13,128],\"score\":0.0794521},\n{\"type\":32, \"data\":[257,376,19],\"color\":[73,65,31,128],\"score\":0.0790152},\n{\"type\":32, \"data\":[326,494,25],\"color\":[156,131,86,128],\"score\":0.07869},\n{\"type\":32, \"data\":[227,233,34],\"color\":[1,7,6,128],\"score\":0.0782184},\n{\"type\":32, \"data\":[180,215,12],\"color\":[192,131,66,128],\"score\":0.0778405},\n{\"type\":32, \"data\":[159,237,18],\"color\":[0,3,4,128],\"score\":0.0774938},\n{\"type\":32, \"data\":[113,507,37],\"color\":[203,161,109,128],\"score\":0.0771523},\n{\"type\":32, \"data\":[91,259,12],\"color\":[245,225,152,128],\"score\":0.0766456},\n{\"type\":32, \"data\":[178,273,14],\"color\":[0,3,0,128],\"score\":0.0762937},\n{\"type\":32, \"data\":[183,251,15],\"color\":[176,142,82,128],\"score\":0.0759399},\n{\"type\":32, \"data\":[257,283,21],\"color\":[8,14,7,128],\"score\":0.0755969},\n{\"type\":32, \"data\":[145,159,17],\"color\":[251,179,117,128],\"score\":0.0753045},\n{\"type\":32, \"data\":[199,460,18],\"color\":[41,42,20,128],\"score\":0.0749924},\n{\"type\":32, \"data\":[166,432,26],\"color\":[195,172,114,128],\"score\":0.0747076},\n{\"type\":32, \"data\":[291,149,44],\"color\":[50,41,22,128],\"score\":0.0743283},\n{\"type\":32, \"data\":[98,328,23],\"color\":[205,185,126,128],\"score\":0.0740384},\n{\"type\":32, \"data\":[203,268,8],\"color\":[241,180,110,128],\"score\":0.0737871},\n{\"type\":32, \"data\":[224,293,12],\"color\":[248,208,140,128],\"score\":0.0735452},\n{\"type\":32, \"data\":[212,386,32],\"color\":[227,198,137,128],\"score\":0.0732296},\n{\"type\":32, \"data\":[112,422,28],\"color\":[62,55,34,128],\"score\":0.0729724},\n{\"type\":32, \"data\":[4,351,24],\"color\":[20,19,6,128],\"score\":0.0727551},\n{\"type\":32, \"data\":[64,57,77],\"color\":[0,2,3,128],\"score\":0.0722417},\n{\"type\":32, \"data\":[174,191,11],\"color\":[152,106,46,128],\"score\":0.0719695},\n{\"type\":32, \"data\":[352,320,23],\"color\":[15,19,7,128],\"score\":0.0717518},\n{\"type\":32, \"data\":[104,105,14],\"color\":[94,72,35,128],\"score\":0.0714607},\n{\"type\":32, \"data\":[111,265,9],\"color\":[0,5,0,128],\"score\":0.0711368},\n{\"type\":32, \"data\":[128,239,11],\"color\":[156,149,91,128],\"score\":0.0708945},\n{\"type\":32, \"data\":[214,189,34],\"color\":[0,2,3,128],\"score\":0.0706329},\n{\"type\":32, \"data\":[196,257,5],\"color\":[255,245,148,128],\"score\":0.070417},\n{\"type\":32, \"data\":[99,197,12],\"color\":[214,210,150,128],\"score\":0.0702164},\n{\"type\":32, \"data\":[171,469,11],\"color\":[42,43,20,128],\"score\":0.0699333},\n{\"type\":32, \"data\":[352,373,21],\"color\":[11,20,12,128],\"score\":0.0697459},\n{\"type\":32, \"data\":[248,350,13],\"color\":[71,64,28,128],\"score\":0.0694927},\n{\"type\":32, \"data\":[316,233,24],\"color\":[75,64,40,128],\"score\":0.0692941},\n{\"type\":32, \"data\":[94,379,18],\"color\":[19,24,13,128],\"score\":0.0691091},\n{\"type\":32, \"data\":[179,268,16],\"color\":[24,26,16,128],\"score\":0.0688942},\n{\"type\":32, \"data\":[309,333,26],\"color\":[75,68,45,128],\"score\":0.0686842},\n{\"type\":32, \"data\":[206,310,13],\"color\":[181,133,79,128],\"score\":0.0684964},\n{\"type\":32, \"data\":[276,500,25],\"color\":[162,132,83,128],\"score\":0.0683177},\n{\"type\":32, \"data\":[129,356,25],\"color\":[209,182,118,128],\"score\":0.0681058},\n{\"type\":32, \"data\":[203,284,14],\"color\":[108,78,43,128],\"score\":0.0679075},\n{\"type\":32, \"data\":[300,474,8],\"color\":[255,228,166,128],\"score\":0.0677103},\n{\"type\":32, \"data\":[319,446,29],\"color\":[85,74,48,128],\"score\":0.0675065},\n{\"type\":32, \"data\":[159,119,10],\"color\":[137,97,43,128],\"score\":0.0673689},\n{\"type\":32, \"data\":[188,412,30],\"color\":[200,176,120,128],\"score\":0.0671499},\n{\"type\":32, \"data\":[294,393,21],\"color\":[23,26,17,128],\"score\":0.0669526},\n{\"type\":32, \"data\":[53,433,15],\"color\":[35,39,21,128],\"score\":0.0667999},\n{\"type\":32, \"data\":[100,430,12],\"color\":[0,11,9,128],\"score\":0.0666686},\n{\"type\":32, \"data\":[217,493,21],\"color\":[194,157,106,128],\"score\":0.0664866},\n{\"type\":32, \"data\":[213,277,12],\"color\":[173,137,89,128],\"score\":0.0662979},\n{\"type\":32, \"data\":[189,341,26],\"color\":[230,219,168,128],\"score\":0.0661451},\n{\"type\":32, \"data\":[277,341,8],\"color\":[230,217,154,128],\"score\":0.065932},\n{\"type\":32, \"data\":[143,307,8],\"color\":[76,64,28,128],\"score\":0.0657573},\n{\"type\":32, \"data\":[130,259,11],\"color\":[145,144,91,128],\"score\":0.0656129},\n{\"type\":32, \"data\":[38,486,28],\"color\":[171,137,93,128],\"score\":0.065515},\n{\"type\":32, \"data\":[63,388,11],\"color\":[28,21,9,128],\"score\":0.0653807},\n{\"type\":32, \"data\":[269,444,11],\"color\":[255,234,164,128],\"score\":0.0651979},\n{\"type\":32, \"data\":[221,448,20],\"color\":[51,52,29,128],\"score\":0.0650511},\n{\"type\":32, \"data\":[55,259,22],\"color\":[0,11,9,128],\"score\":0.0649287},\n{\"type\":32, \"data\":[50,133,59],\"color\":[0,2,4,128],\"score\":0.0646323},\n{\"type\":32, \"data\":[142,99,8],\"color\":[162,88,52,128],\"score\":0.0644789},\n{\"type\":32, \"data\":[273,463,14],\"color\":[255,230,167,128],\"score\":0.0643439},\n{\"type\":32, \"data\":[112,240,9],\"color\":[5,12,0,128],\"score\":0.0641519},\n{\"type\":32, \"data\":[93,86,8],\"color\":[100,77,34,128],\"score\":0.0640329},\n{\"type\":32, \"data\":[306,428,29],\"color\":[69,61,39,128],\"score\":0.0639251},\n{\"type\":32, \"data\":[352,191,35],\"color\":[8,15,12,128],\"score\":0.0638055},\n{\"type\":32, \"data\":[123,295,17],\"color\":[199,180,124,128],\"score\":0.0637137},\n{\"type\":32, \"data\":[91,223,16],\"color\":[194,182,125,128],\"score\":0.0636012},\n{\"type\":32, \"data\":[112,454,11],\"color\":[183,146,97,128],\"score\":0.0634805},\n{\"type\":32, \"data\":[330,35,53],\"color\":[0,3,3,128],\"score\":0.0633424},\n{\"type\":32, \"data\":[146,391,14],\"color\":[159,135,80,128],\"score\":0.0632291},\n{\"type\":32, \"data\":[161,262,17],\"color\":[35,39,22,128],\"score\":0.0631097},\n{\"type\":32, \"data\":[265,414,12],\"color\":[177,118,71,128],\"score\":0.0630085},\n{\"type\":32, \"data\":[171,256,8],\"color\":[134,121,69,128],\"score\":0.0628807},\n{\"type\":32, \"data\":[53,207,24],\"color\":[3,9,7,128],\"score\":0.0627734},\n{\"type\":32, \"data\":[60,323,14],\"color\":[15,24,13,128],\"score\":0.0626732},\n{\"type\":32, \"data\":[301,324,24],\"color\":[85,70,46,128],\"score\":0.0625767},\n{\"type\":32, \"data\":[206,444,9],\"color\":[121,103,61,128],\"score\":0.0624811},\n{\"type\":32, \"data\":[120,416,9],\"color\":[137,114,74,128],\"score\":0.0623646},\n{\"type\":32, \"data\":[88,366,13],\"color\":[41,42,21,128],\"score\":0.0622589},\n{\"type\":32, \"data\":[130,224,11],\"color\":[136,115,64,128],\"score\":0.0621584},\n{\"type\":32, \"data\":[142,111,8],\"color\":[0,0,0,128],\"score\":0.0619847},\n{\"type\":32, \"data\":[158,285,10],\"color\":[83,74,31,128],\"score\":0.0618532},\n{\"type\":32, \"data\":[127,440,12],\"color\":[83,72,45,128],\"score\":0.0617455},\n{\"type\":32, \"data\":[304,277,12],\"color\":[134,95,54,128],\"score\":0.0616593},\n{\"type\":32, \"data\":[242,426,9],\"color\":[172,120,70,128],\"score\":0.0615352},\n{\"type\":32, \"data\":[18,450,8],\"color\":[0,0,0,128],\"score\":0.0614201},\n{\"type\":32, \"data\":[61,362,15],\"color\":[195,133,69,128],\"score\":0.0612743},\n{\"type\":32, \"data\":[237,313,18],\"color\":[181,147,97,128],\"score\":0.0611699},\n{\"type\":32, \"data\":[106,387,13],\"color\":[5,8,3,128],\"score\":0.0610633},\n{\"type\":32, \"data\":[115,209,8],\"color\":[40,42,20,128],\"score\":0.0609585},\n{\"type\":32, \"data\":[49,491,8],\"color\":[93,61,29,128],\"score\":0.0608123},\n{\"type\":32, \"data\":[175,172,6],\"color\":[152,103,44,128],\"score\":0.0607181},\n{\"type\":32, \"data\":[270,369,12],\"color\":[168,151,99,128],\"score\":0.0606045},\n{\"type\":32, \"data\":[193,286,8],\"color\":[64,48,24,128],\"score\":0.0605068},\n{\"type\":32, \"data\":[179,303,9],\"color\":[255,241,178,128],\"score\":0.0604218},\n{\"type\":32, \"data\":[65,405,9],\"color\":[153,129,79,128],\"score\":0.0603091},\n{\"type\":32, \"data\":[189,246,6],\"color\":[255,204,119,128],\"score\":0.0601883},\n{\"type\":32, \"data\":[118,119,8],\"color\":[192,141,69,128],\"score\":0.0600431},\n{\"type\":32, \"data\":[94,403,7],\"color\":[136,98,54,128],\"score\":0.0599605},\n{\"type\":32, \"data\":[222,301,13],\"color\":[228,209,152,128],\"score\":0.0598566},\n{\"type\":32, \"data\":[189,228,12],\"color\":[172,111,59,128],\"score\":0.0597656},\n{\"type\":32, \"data\":[156,300,6],\"color\":[255,218,141,128],\"score\":0.0596696},\n{\"type\":32, \"data\":[0,428,9],\"color\":[53,23,7,128],\"score\":0.0595216},\n{\"type\":32, \"data\":[39,359,8],\"color\":[54,56,31,128],\"score\":0.0594335},\n{\"type\":32, \"data\":[85,280,14],\"color\":[192,179,118,128],\"score\":0.0593524},\n{\"type\":32, \"data\":[81,478,15],\"color\":[190,157,110,128],\"score\":0.0592902},\n{\"type\":32, \"data\":[349,403,27],\"color\":[42,46,30,128],\"score\":0.0592203},\n{\"type\":32, \"data\":[205,360,32],\"color\":[222,206,150,128],\"score\":0.0591385},\n{\"type\":32, \"data\":[198,422,16],\"color\":[193,169,113,128],\"score\":0.0590733},\n{\"type\":32, \"data\":[38,348,8],\"color\":[149,116,61,128],\"score\":0.0590145},\n{\"type\":32, \"data\":[297,226,42],\"color\":[54,48,27,128],\"score\":0.0589198},\n{\"type\":32, \"data\":[251,381,10],\"color\":[54,58,31,128],\"score\":0.0588266},\n{\"type\":32, \"data\":[124,45,48],\"color\":[0,3,3,128],\"score\":0.0587466},\n{\"type\":32, \"data\":[109,110,4],\"color\":[238,179,88,128],\"score\":0.0586145},\n{\"type\":32, \"data\":[141,500,29],\"color\":[194,153,101,128],\"score\":0.0585516},\n{\"type\":32, \"data\":[120,175,14],\"color\":[96,63,25,128],\"score\":0.0584673},\n{\"type\":32, \"data\":[45,392,10],\"color\":[41,39,17,128],\"score\":0.0583764},\n{\"type\":32, \"data\":[288,362,12],\"color\":[182,173,123,128],\"score\":0.0582977},\n{\"type\":32, \"data\":[311,340,24],\"color\":[70,68,44,128],\"score\":0.0582267},\n{\"type\":32, \"data\":[274,504,30],\"color\":[167,136,89,128],\"score\":0.0581636},\n{\"type\":32, \"data\":[182,464,15],\"color\":[60,56,32,128],\"score\":0.0581008},\n{\"type\":32, \"data\":[153,330,21],\"color\":[227,213,159,128],\"score\":0.0580199},\n{\"type\":32, \"data\":[292,470,8],\"color\":[255,228,168,128],\"score\":0.0579427},\n{\"type\":32, \"data\":[84,435,7],\"color\":[4,14,7,128],\"score\":0.0578699},\n{\"type\":32, \"data\":[153,424,16],\"color\":[176,149,92,128],\"score\":0.0577949},\n{\"type\":32, \"data\":[257,324,8],\"color\":[185,162,115,128],\"score\":0.0577216},\n{\"type\":32, \"data\":[91,455,14],\"color\":[145,117,72,128],\"score\":0.0576614},\n{\"type\":32, \"data\":[165,441,12],\"color\":[206,185,129,128],\"score\":0.0576048},\n{\"type\":32, \"data\":[121,142,4],\"color\":[67,26,0,128],\"score\":0.0575516},\n{\"type\":32, \"data\":[77,339,8],\"color\":[155,128,80,128],\"score\":0.0574514},\n{\"type\":32, \"data\":[165,371,28],\"color\":[205,188,131,128],\"score\":0.0573888},\n{\"type\":32, \"data\":[85,74,6],\"color\":[92,72,31,128],\"score\":0.0573243},\n{\"type\":32, \"data\":[270,428,8],\"color\":[248,203,147,128],\"score\":0.0572452},\n{\"type\":32, \"data\":[26,405,12],\"color\":[138,102,57,128],\"score\":0.0571848},\n{\"type\":32, \"data\":[120,193,7],\"color\":[190,143,73,128],\"score\":0.0571257},\n{\"type\":32, \"data\":[211,132,28],\"color\":[0,2,4,128],\"score\":0.0570725},\n{\"type\":32, \"data\":[293,320,10],\"color\":[139,102,63,128],\"score\":0.0570035},\n{\"type\":32, \"data\":[312,451,14],\"color\":[106,91,59,128],\"score\":0.0569492},\n{\"type\":32, \"data\":[104,101,5],\"color\":[196,143,65,128],\"score\":0.0568215},\n{\"type\":32, \"data\":[21,14,62],\"color\":[0,2,3,128],\"score\":0.0567526},\n{\"type\":32, \"data\":[60,426,19],\"color\":[65,60,36,128],\"score\":0.0566856},\n{\"type\":32, \"data\":[5,470,12],\"color\":[148,124,79,128],\"score\":0.0566124},\n{\"type\":32, \"data\":[251,305,6],\"color\":[42,33,19,128],\"score\":0.0565421},\n{\"type\":32, \"data\":[139,140,6],\"color\":[126,73,33,128],\"score\":0.0564457},\n{\"type\":32, \"data\":[351,240,19],\"color\":[8,12,10,128],\"score\":0.0563897},\n{\"type\":32, \"data\":[311,479,5],\"color\":[255,208,150,128],\"score\":0.0563032},\n{\"type\":32, \"data\":[328,497,15],\"color\":[140,120,80,128],\"score\":0.0562453},\n{\"type\":32, \"data\":[154,163,8],\"color\":[155,81,38,128],\"score\":0.0561427},\n{\"type\":32, \"data\":[172,198,13],\"color\":[103,76,35,128],\"score\":0.0560786},\n{\"type\":32, \"data\":[170,136,14],\"color\":[51,31,12,128],\"score\":0.0560126},\n{\"type\":32, \"data\":[139,157,13],\"color\":[246,202,138,128],\"score\":0.0559142},\n{\"type\":32, \"data\":[148,125,9],\"color\":[160,108,55,128],\"score\":0.0558469},\n{\"type\":32, \"data\":[293,447,11],\"color\":[56,52,26,128],\"score\":0.0557852},\n{\"type\":32, \"data\":[198,462,12],\"color\":[30,33,18,128],\"score\":0.0557291},\n{\"type\":32, \"data\":[314,415,8],\"color\":[122,114,85,128],\"score\":0.0556558},\n{\"type\":32, \"data\":[304,356,8],\"color\":[13,23,16,128],\"score\":0.0555902},\n{\"type\":32, \"data\":[169,232,10],\"color\":[9,13,9,128],\"score\":0.0555393},\n{\"type\":32, \"data\":[78,112,25],\"color\":[3,6,5,128],\"score\":0.0554893},\n{\"type\":32, \"data\":[112,256,8],\"color\":[3,8,3,128],\"score\":0.0554107},\n{\"type\":32, \"data\":[201,237,11],\"color\":[25,21,11,128],\"score\":0.0553533},\n{\"type\":32, \"data\":[4,392,13],\"color\":[45,36,12,128],\"score\":0.0553041},\n{\"type\":32, \"data\":[37,377,11],\"color\":[143,123,77,128],\"score\":0.0552395},\n{\"type\":32, \"data\":[143,451,12],\"color\":[162,144,97,128],\"score\":0.0551797},\n{\"type\":32, \"data\":[112,288,8],\"color\":[226,214,150,128],\"score\":0.0551242},\n{\"type\":32, \"data\":[133,309,5],\"color\":[92,76,35,128],\"score\":0.0550511},\n{\"type\":32, \"data\":[113,227,8],\"color\":[20,27,15,128],\"score\":0.0549947},\n{\"type\":32, \"data\":[38,250,39],\"color\":[7,13,10,128],\"score\":0.0549248},\n{\"type\":32, \"data\":[116,109,6],\"color\":[0,0,0,128],\"score\":0.0548436},\n{\"type\":32, \"data\":[156,203,17],\"color\":[33,31,13,128],\"score\":0.0547815},\n{\"type\":32, \"data\":[349,292,15],\"color\":[31,28,12,128],\"score\":0.0547327},\n{\"type\":32, \"data\":[198,263,4],\"color\":[255,213,133,128],\"score\":0.0546714},\n{\"type\":32, \"data\":[116,155,10],\"color\":[109,66,23,128],\"score\":0.0545824},\n{\"type\":32, \"data\":[67,188,18],\"color\":[6,8,6,128],\"score\":0.0545393},\n{\"type\":32, \"data\":[352,346,9],\"color\":[1,7,4,128],\"score\":0.0544849},\n{\"type\":32, \"data\":[6,444,6],\"color\":[214,147,84,128],\"score\":0.0544225},\n{\"type\":32, \"data\":[252,273,24],\"color\":[27,29,18,128],\"score\":0.0543705},\n{\"type\":32, \"data\":[158,150,8],\"color\":[191,119,62,128],\"score\":0.0543035},\n{\"type\":32, \"data\":[192,501,26],\"color\":[185,150,101,128],\"score\":0.0542508},\n{\"type\":32, \"data\":[272,331,4],\"color\":[229,212,156,128],\"score\":0.0541785},\n{\"type\":32, \"data\":[236,465,8],\"color\":[73,50,24,128],\"score\":0.0541265},\n{\"type\":32, \"data\":[292,416,16],\"color\":[42,38,24,128],\"score\":0.0540638},\n{\"type\":32, \"data\":[93,240,9],\"color\":[215,204,148,128],\"score\":0.0540186},\n{\"type\":32, \"data\":[272,219,29],\"color\":[36,33,17,128],\"score\":0.053981},\n{\"type\":32, \"data\":[86,355,9],\"color\":[30,31,16,128],\"score\":0.0539283},\n{\"type\":32, \"data\":[261,338,7],\"color\":[65,63,33,128],\"score\":0.0538693},\n{\"type\":32, \"data\":[290,113,40],\"color\":[31,23,12,128],\"score\":0.0538308},\n{\"type\":32, \"data\":[11,325,29],\"color\":[28,30,18,128],\"score\":0.0537914},\n{\"type\":32, \"data\":[118,89,15],\"color\":[0,4,5,128],\"score\":0.0537469},\n{\"type\":32, \"data\":[352,452,15],\"color\":[41,39,22,128],\"score\":0.0537027},\n{\"type\":32, \"data\":[247,457,9],\"color\":[187,126,82,128],\"score\":0.053649},\n{\"type\":32, \"data\":[177,162,5],\"color\":[127,87,36,128],\"score\":0.0535876},\n{\"type\":32, \"data\":[138,180,7],\"color\":[62,43,13,128],\"score\":0.0535425},\n{\"type\":32, \"data\":[79,232,5],\"color\":[108,100,50,128],\"score\":0.0535068},\n{\"type\":32, \"data\":[157,102,4],\"color\":[126,97,49,128],\"score\":0.0534578},\n{\"type\":32, \"data\":[157,141,4],\"color\":[87,40,13,128],\"score\":0.0534082},\n{\"type\":32, \"data\":[169,458,8],\"color\":[150,131,80,128],\"score\":0.0533474},\n{\"type\":32, \"data\":[212,316,7],\"color\":[126,115,66,128],\"score\":0.0532696},\n{\"type\":32, \"data\":[156,258,8],\"color\":[0,0,2,128],\"score\":0.0532131},\n{\"type\":32, \"data\":[225,433,12],\"color\":[48,46,26,128],\"score\":0.0531683},\n{\"type\":32, \"data\":[133,434,6],\"color\":[22,24,10,128],\"score\":0.0531189},\n{\"type\":32, \"data\":[255,445,8],\"color\":[184,120,69,128],\"score\":0.0530748},\n{\"type\":32, \"data\":[193,252,4],\"color\":[255,226,135,128],\"score\":0.0530163},\n{\"type\":32, \"data\":[101,94,5],\"color\":[155,113,46,128],\"score\":0.0529499},\n{\"type\":32, \"data\":[329,361,11],\"color\":[87,89,63,128],\"score\":0.0529113},\n{\"type\":32, \"data\":[109,406,11],\"color\":[21,23,12,128],\"score\":0.0528594},\n{\"type\":32, \"data\":[278,282,19],\"color\":[58,49,27,128],\"score\":0.0528199},\n{\"type\":32, \"data\":[139,290,5],\"color\":[227,205,148,128],\"score\":0.0527857},\n{\"type\":32, \"data\":[104,347,11],\"color\":[186,170,114,128],\"score\":0.0527395},\n{\"type\":32, \"data\":[11,422,5],\"color\":[241,180,104,128],\"score\":0.0526861},\n{\"type\":32, \"data\":[208,283,11],\"color\":[128,95,55,128],\"score\":0.0526371},\n{\"type\":32, \"data\":[123,403,5],\"color\":[175,142,93,128],\"score\":0.0525679},\n{\"type\":32, \"data\":[40,291,29],\"color\":[14,20,14,128],\"score\":0.0525255},\n{\"type\":32, \"data\":[213,412,13],\"color\":[176,152,100,128],\"score\":0.0524886},\n{\"type\":32, \"data\":[124,429,4],\"color\":[160,133,93,128],\"score\":0.0524421},\n{\"type\":32, \"data\":[24,212,51],\"color\":[7,10,9,128],\"score\":0.0523928},\n{\"type\":32, \"data\":[127,467,8],\"color\":[55,46,25,128],\"score\":0.0523379},\n{\"type\":32, \"data\":[99,188,7],\"color\":[196,182,115,128],\"score\":0.0522817},\n{\"type\":32, \"data\":[183,260,8],\"color\":[19,16,7,128],\"score\":0.0522245},\n{\"type\":32, \"data\":[239,417,9],\"color\":[123,88,49,128],\"score\":0.0521808},\n{\"type\":32, \"data\":[110,115,3],\"color\":[254,190,107,128],\"score\":0.0521026},\n{\"type\":32, \"data\":[46,501,9],\"color\":[195,151,103,128],\"score\":0.0520713},\n{\"type\":32, \"data\":[209,272,9],\"color\":[184,141,91,128],\"score\":0.0520145},\n{\"type\":32, \"data\":[278,316,4],\"color\":[0,12,26,128],\"score\":0.0519576},\n{\"type\":32, \"data\":[107,106,3],\"color\":[205,153,83,128],\"score\":0.0519222},\n{\"type\":32, \"data\":[102,465,5],\"color\":[74,66,36,128],\"score\":0.0518702},\n{\"type\":32, \"data\":[38,469,16],\"color\":[184,155,102,128],\"score\":0.0518344},\n{\"type\":32, \"data\":[131,136,6],\"color\":[235,187,119,128],\"score\":0.0517781},\n{\"type\":32, \"data\":[99,265,6],\"color\":[192,177,119,128],\"score\":0.051735},\n{\"type\":32, \"data\":[317,153,20],\"color\":[50,41,24,128],\"score\":0.0516974},\n{\"type\":32, \"data\":[258,394,13],\"color\":[84,64,33,128],\"score\":0.0516547},\n{\"type\":32, \"data\":[194,448,7],\"color\":[130,112,64,128],\"score\":0.051606},\n{\"type\":32, \"data\":[209,260,6],\"color\":[28,28,19,128],\"score\":0.051552},\n{\"type\":32, \"data\":[55,365,5],\"color\":[95,63,32,128],\"score\":0.051516},\n{\"type\":32, \"data\":[175,290,5],\"color\":[220,170,102,128],\"score\":0.0514563},\n{\"type\":32, \"data\":[75,450,6],\"color\":[58,57,32,128],\"score\":0.0513912},\n{\"type\":32, \"data\":[72,391,8],\"color\":[20,20,13,128],\"score\":0.0513424},\n{\"type\":32, \"data\":[219,460,13],\"color\":[38,38,19,128],\"score\":0.0513033},\n{\"type\":32, \"data\":[107,174,7],\"color\":[31,28,10,128],\"score\":0.0512536},\n{\"type\":32, \"data\":[14,511,14],\"color\":[121,94,57,128],\"score\":0.0512147},\n{\"type\":32, \"data\":[160,234,16],\"color\":[18,21,13,128],\"score\":0.0511911},\n{\"type\":32, \"data\":[122,442,6],\"color\":[145,117,76,128],\"score\":0.0511552},\n{\"type\":32, \"data\":[69,378,6],\"color\":[145,104,50,128],\"score\":0.0511106},\n{\"type\":32, \"data\":[211,246,15],\"color\":[14,17,12,128],\"score\":0.0510814},\n{\"type\":32, \"data\":[4,361,3],\"color\":[170,94,61,128],\"score\":0.0510523},\n{\"type\":32, \"data\":[141,400,9],\"color\":[145,123,73,128],\"score\":0.0510087},\n{\"type\":32, \"data\":[2,306,8],\"color\":[86,45,25,128],\"score\":0.050977},\n{\"type\":32, \"data\":[101,318,16],\"color\":[208,196,139,128],\"score\":0.0509409},\n{\"type\":32, \"data\":[352,144,24],\"color\":[3,7,5,128],\"score\":0.0509138},\n{\"type\":32, \"data\":[267,153,10],\"color\":[66,51,26,128],\"score\":0.0508858},\n{\"type\":32, \"data\":[53,404,7],\"color\":[150,124,77,128],\"score\":0.0508297},\n{\"type\":32, \"data\":[282,348,7],\"color\":[211,198,142,128],\"score\":0.0507799},\n{\"type\":32, \"data\":[196,305,10],\"color\":[225,158,99,128],\"score\":0.050749},\n{\"type\":32, \"data\":[62,343,5],\"color\":[24,21,3,128],\"score\":0.0506911},\n{\"type\":32, \"data\":[187,285,6],\"color\":[54,42,21,128],\"score\":0.0506549},\n{\"type\":32, \"data\":[199,293,4],\"color\":[43,44,17,128],\"score\":0.0506247},\n{\"type\":32, \"data\":[203,344,26],\"color\":[224,210,156,128],\"score\":0.0505958},\n{\"type\":32, \"data\":[71,368,6],\"color\":[209,151,84,128],\"score\":0.0505634},\n{\"type\":32, \"data\":[78,66,5],\"color\":[74,62,27,128],\"score\":0.0505303},\n{\"type\":32, \"data\":[141,231,8],\"color\":[73,74,39,128],\"score\":0.0504885},\n{\"type\":32, \"data\":[134,377,11],\"color\":[185,159,97,128],\"score\":0.0504561},\n{\"type\":32, \"data\":[143,169,6],\"color\":[245,196,126,128],\"score\":0.050423},\n{\"type\":32, \"data\":[152,285,9],\"color\":[122,111,64,128],\"score\":0.0503903},\n{\"type\":32, \"data\":[314,335,19],\"color\":[88,78,51,128],\"score\":0.0503633},\n{\"type\":32, \"data\":[144,463,4],\"color\":[54,57,39,128],\"score\":0.0503177},\n{\"type\":32, \"data\":[117,136,8],\"color\":[116,66,19,128],\"score\":0.0502869},\n{\"type\":32, \"data\":[226,396,16],\"color\":[215,189,128,128],\"score\":0.0502588},\n{\"type\":32, \"data\":[112,301,5],\"color\":[133,121,72,128],\"score\":0.0502287},\n{\"type\":32, \"data\":[121,274,9],\"color\":[132,118,70,128],\"score\":0.0502024},\n{\"type\":32, \"data\":[55,380,6],\"color\":[173,118,64,128],\"score\":0.0501696},\n{\"type\":32, \"data\":[186,239,4],\"color\":[255,192,103,128],\"score\":0.0501283},\n{\"type\":32, \"data\":[245,364,6],\"color\":[73,73,33,128],\"score\":0.0500971},\n{\"type\":32, \"data\":[86,122,23],\"color\":[3,5,5,128],\"score\":0.0500626},\n{\"type\":32, \"data\":[158,472,6],\"color\":[105,84,53,128],\"score\":0.050036},\n{\"type\":32, \"data\":[266,403,11],\"color\":[117,82,48,128],\"score\":0.0500055},\n{\"type\":32, \"data\":[41,488,4],\"color\":[91,56,15,128],\"score\":0.0499615},\n{\"type\":32, \"data\":[72,331,7],\"color\":[61,62,33,128],\"score\":0.0499282},\n{\"type\":32, \"data\":[128,127,5],\"color\":[94,53,12,128],\"score\":0.0498989},\n{\"type\":32, \"data\":[267,350,8],\"color\":[145,126,79,128],\"score\":0.049869},\n{\"type\":32, \"data\":[290,152,12],\"color\":[5,7,8,128],\"score\":0.0498396},\n{\"type\":32, \"data\":[285,509,33],\"color\":[165,135,88,128],\"score\":0.0498137},\n{\"type\":32, \"data\":[126,451,6],\"color\":[76,66,42,128],\"score\":0.0497847},\n{\"type\":32, \"data\":[44,381,7],\"color\":[81,81,45,128],\"score\":0.0497508},\n{\"type\":32, \"data\":[211,187,24],\"color\":[2,6,7,128],\"score\":0.0497271},\n{\"type\":32, \"data\":[142,94,5],\"color\":[164,37,20,128],\"score\":0.0496887},\n{\"type\":32, \"data\":[288,330,8],\"color\":[58,45,26,128],\"score\":0.0496571},\n{\"type\":32, \"data\":[352,104,20],\"color\":[0,1,1,128],\"score\":0.0496334},\n{\"type\":32, \"data\":[319,480,4],\"color\":[255,189,137,128],\"score\":0.0495878},\n{\"type\":32, \"data\":[90,269,7],\"color\":[217,205,143,128],\"score\":0.0495601},\n{\"type\":32, \"data\":[222,443,8],\"color\":[86,82,51,128],\"score\":0.0495298},\n{\"type\":32, \"data\":[177,220,6],\"color\":[190,134,71,128],\"score\":0.0494908},\n{\"type\":32, \"data\":[163,290,6],\"color\":[93,77,35,128],\"score\":0.0494558},\n{\"type\":32, \"data\":[319,267,11],\"color\":[88,73,51,128],\"score\":0.0494291},\n{\"type\":32, \"data\":[59,433,12],\"color\":[39,39,23,128],\"score\":0.0493998},\n{\"type\":32, \"data\":[245,186,25],\"color\":[16,18,11,128],\"score\":0.0493767},\n{\"type\":32, \"data\":[187,208,7],\"color\":[41,33,14,128],\"score\":0.0493474},\n{\"type\":32, \"data\":[175,185,9],\"color\":[113,79,35,128],\"score\":0.0493155},\n{\"type\":32, \"data\":[234,489,18],\"color\":[175,142,92,128],\"score\":0.0492884},\n{\"type\":32, \"data\":[33,449,3],\"color\":[193,162,88,128],\"score\":0.0492493},\n{\"type\":32, \"data\":[207,312,3],\"color\":[99,58,15,128],\"score\":0.0492173},\n{\"type\":32, \"data\":[162,304,9],\"color\":[245,189,121,128],\"score\":0.0491855},\n{\"type\":32, \"data\":[53,474,11],\"color\":[195,162,113,128],\"score\":0.049159},\n{\"type\":32, \"data\":[326,485,3],\"color\":[68,18,0,128],\"score\":0.0491186},\n{\"type\":32, \"data\":[150,109,5],\"color\":[0,0,0,128],\"score\":0.0490944},\n{\"type\":32, \"data\":[116,153,6],\"color\":[178,132,68,128],\"score\":0.0490663},\n{\"type\":32, \"data\":[92,181,7],\"color\":[103,95,47,128],\"score\":0.0490332},\n{\"type\":32, \"data\":[78,242,4],\"color\":[86,79,34,128],\"score\":0.0490024},\n{\"type\":32, \"data\":[163,273,8],\"color\":[12,16,9,128],\"score\":0.0489732},\n{\"type\":32, \"data\":[146,412,11],\"color\":[178,148,93,128],\"score\":0.0489459},\n{\"type\":32, \"data\":[54,393,5],\"color\":[6,11,4,128],\"score\":0.0489205},\n{\"type\":32, \"data\":[241,305,5],\"color\":[128,104,64,128],\"score\":0.0488952},\n{\"type\":32, \"data\":[62,100,30],\"color\":[5,7,6,128],\"score\":0.0488755},\n{\"type\":32, \"data\":[128,247,10],\"color\":[125,118,70,128],\"score\":0.0488526},\n{\"type\":32, \"data\":[133,178,7],\"color\":[86,58,22,128],\"score\":0.0488315},\n{\"type\":32, \"data\":[12,430,5],\"color\":[227,171,106,128],\"score\":0.0487888},\n{\"type\":32, \"data\":[27,453,5],\"color\":[37,40,19,128],\"score\":0.0487568},\n{\"type\":32, \"data\":[352,195,14],\"color\":[0,0,2,128],\"score\":0.0487332},\n{\"type\":32, \"data\":[80,375,6],\"color\":[88,83,51,128],\"score\":0.0487036},\n{\"type\":32, \"data\":[52,490,6],\"color\":[99,72,39,128],\"score\":0.0486791},\n{\"type\":32, \"data\":[225,281,4],\"color\":[137,111,70,128],\"score\":0.0486422},\n{\"type\":32, \"data\":[73,339,6],\"color\":[149,123,83,128],\"score\":0.0486158},\n{\"type\":32, \"data\":[317,228,15],\"color\":[74,58,38,128],\"score\":0.0485919},\n{\"type\":32, \"data\":[30,433,15],\"color\":[62,56,31,128],\"score\":0.048566},\n{\"type\":32, \"data\":[60,455,10],\"color\":[179,143,85,128],\"score\":0.0485435},\n{\"type\":32, \"data\":[352,418,7],\"color\":[11,16,8,128],\"score\":0.0485228},\n{\"type\":32, \"data\":[153,308,5],\"color\":[167,138,84,128],\"score\":0.0484953},\n{\"type\":32, \"data\":[96,154,14],\"color\":[4,7,5,128],\"score\":0.0484705},\n{\"type\":32, \"data\":[111,272,4],\"color\":[14,22,10,128],\"score\":0.0484352},\n{\"type\":32, \"data\":[296,365,6],\"color\":[155,154,107,128],\"score\":0.0484094},\n{\"type\":32, \"data\":[130,104,4],\"color\":[179,146,90,128],\"score\":0.0483761},\n{\"type\":32, \"data\":[172,330,14],\"color\":[233,221,170,128],\"score\":0.0483545},\n{\"type\":32, \"data\":[81,198,5],\"color\":[73,73,31,128],\"score\":0.0483245},\n{\"type\":32, \"data\":[46,366,3],\"color\":[51,27,1,128],\"score\":0.0482948},\n{\"type\":32, \"data\":[94,461,6],\"color\":[191,147,100,128],\"score\":0.0482715},\n{\"type\":32, \"data\":[174,396,22],\"color\":[214,192,132,128],\"score\":0.0482501},\n{\"type\":32, \"data\":[186,33,72],\"color\":[1,5,5,128],\"score\":0.0482076},\n{\"type\":32, \"data\":[115,353,18],\"color\":[194,175,115,128],\"score\":0.0481801},\n{\"type\":32, \"data\":[124,163,4],\"color\":[69,31,4,128],\"score\":0.0481521},\n{\"type\":32, \"data\":[83,319,12],\"color\":[179,162,103,128],\"score\":0.0481101},\n{\"type\":32, \"data\":[323,133,7],\"color\":[74,70,40,128],\"score\":0.0480787},\n{\"type\":32, \"data\":[193,233,7],\"color\":[115,78,38,128],\"score\":0.0480507},\n{\"type\":32, \"data\":[87,445,4],\"color\":[175,150,94,128],\"score\":0.0480288},\n{\"type\":32, \"data\":[244,127,21],\"color\":[10,12,8,128],\"score\":0.0480116},\n{\"type\":32, \"data\":[53,460,4],\"color\":[114,91,44,128],\"score\":0.0479863},\n{\"type\":32, \"data\":[48,311,2],\"color\":[209,115,90,128],\"score\":0.047952},\n{\"type\":32, \"data\":[113,117,3],\"color\":[208,158,86,128],\"score\":0.0479348},\n{\"type\":32, \"data\":[16,463,4],\"color\":[67,48,20,128],\"score\":0.0479018},\n{\"type\":32, \"data\":[213,284,7],\"color\":[108,84,49,128],\"score\":0.0478748},\n{\"type\":32, \"data\":[156,285,3],\"color\":[198,175,114,128],\"score\":0.0478484},\n{\"type\":32, \"data\":[135,278,6],\"color\":[172,162,111,128],\"score\":0.0478168},\n{\"type\":32, \"data\":[36,357,11],\"color\":[100,83,47,128],\"score\":0.0477982},\n{\"type\":32, \"data\":[130,442,3],\"color\":[3,9,2,128],\"score\":0.0477687},\n{\"type\":32, \"data\":[100,203,11],\"color\":[193,183,129,128],\"score\":0.0477479},\n{\"type\":32, \"data\":[65,421,14],\"color\":[84,74,44,128],\"score\":0.0477184},\n{\"type\":32, \"data\":[0,325,10],\"color\":[0,3,4,128],\"score\":0.0476996},\n{\"type\":32, \"data\":[125,328,14],\"color\":[225,203,150,128],\"score\":0.0476784},\n{\"type\":32, \"data\":[54,353,9],\"color\":[188,128,69,128],\"score\":0.0476493},\n{\"type\":32, \"data\":[143,220,7],\"color\":[121,91,42,128],\"score\":0.0476266},\n{\"type\":32, \"data\":[228,304,5],\"color\":[169,139,85,128],\"score\":0.0476021},\n{\"type\":32, \"data\":[226,365,12],\"color\":[229,214,155,128],\"score\":0.0475848},\n{\"type\":32, \"data\":[150,132,5],\"color\":[99,54,14,128],\"score\":0.0475435},\n{\"type\":32, \"data\":[167,166,7],\"color\":[12,5,0,128],\"score\":0.0475099},\n{\"type\":32, \"data\":[121,271,3],\"color\":[57,40,12,128],\"score\":0.0474853},\n{\"type\":32, \"data\":[92,343,3],\"color\":[228,215,148,128],\"score\":0.0474692},\n{\"type\":32, \"data\":[313,470,4],\"color\":[46,38,14,128],\"score\":0.0474343},\n{\"type\":32, \"data\":[112,194,7],\"color\":[126,111,62,128],\"score\":0.0474121},\n{\"type\":32, \"data\":[297,350,5],\"color\":[27,35,23,128],\"score\":0.0473902},\n{\"type\":32, \"data\":[130,402,4],\"color\":[19,18,1,128],\"score\":0.0473547},\n{\"type\":32, \"data\":[248,311,4],\"color\":[119,104,67,128],\"score\":0.0473342},\n{\"type\":32, \"data\":[271,314,5],\"color\":[155,125,75,128],\"score\":0.0473113},\n{\"type\":32, \"data\":[131,415,5],\"color\":[32,30,12,128],\"score\":0.0472841},\n{\"type\":32, \"data\":[93,86,3],\"color\":[164,121,54,128],\"score\":0.0472519},\n{\"type\":32, \"data\":[254,478,9],\"color\":[194,137,87,128],\"score\":0.0472332},\n{\"type\":32, \"data\":[123,120,7],\"color\":[177,129,64,128],\"score\":0.0472093},\n{\"type\":32, \"data\":[184,467,7],\"color\":[24,28,16,128],\"score\":0.0471915},\n{\"type\":32, \"data\":[164,130,8],\"color\":[33,21,8,128],\"score\":0.0471725},\n{\"type\":32, \"data\":[123,419,3],\"color\":[184,147,107,128],\"score\":0.0471471},\n{\"type\":32, \"data\":[92,222,9],\"color\":[209,196,141,128],\"score\":0.0471209},\n{\"type\":32, \"data\":[240,266,19],\"color\":[24,26,17,128],\"score\":0.0471001},\n{\"type\":32, \"data\":[312,370,13],\"color\":[33,36,25,128],\"score\":0.0470819},\n{\"type\":32, \"data\":[137,294,9],\"color\":[193,173,118,128],\"score\":0.0470575},\n{\"type\":32, \"data\":[118,63,32],\"color\":[4,6,5,128],\"score\":0.0470267},\n{\"type\":32, \"data\":[92,249,11],\"color\":[196,180,123,128],\"score\":0.047011},\n{\"type\":32, \"data\":[197,282,6],\"color\":[141,108,64,128],\"score\":0.0469859},\n{\"type\":32, \"data\":[224,427,7],\"color\":[30,32,18,128],\"score\":0.0469657},\n{\"type\":32, \"data\":[134,300,4],\"color\":[133,116,64,128],\"score\":0.0469398},\n{\"type\":32, \"data\":[105,228,4],\"color\":[123,121,75,128],\"score\":0.0469208},\n{\"type\":32, \"data\":[233,446,11],\"color\":[67,59,33,128],\"score\":0.0469034},\n{\"type\":32, \"data\":[22,394,7],\"color\":[66,60,26,128],\"score\":0.0468791},\n{\"type\":32, \"data\":[252,280,19],\"color\":[27,28,17,128],\"score\":0.0468657},\n{\"type\":32, \"data\":[79,261,4],\"color\":[113,109,55,128],\"score\":0.0468383},\n{\"type\":32, \"data\":[129,144,4],\"color\":[255,235,170,128],\"score\":0.0468097},\n{\"type\":32, \"data\":[147,151,6],\"color\":[247,223,154,128],\"score\":0.0467868},\n{\"type\":32, \"data\":[131,394,4],\"color\":[45,42,16,128],\"score\":0.0467627},\n{\"type\":32, \"data\":[202,267,5],\"color\":[238,173,107,128],\"score\":0.0467335},\n{\"type\":32, \"data\":[154,137,4],\"color\":[194,127,61,128],\"score\":0.0467095},\n{\"type\":32, \"data\":[43,331,11],\"color\":[46,50,29,128],\"score\":0.0466932},\n{\"type\":32, \"data\":[139,481,12],\"color\":[188,149,96,128],\"score\":0.0466749},\n{\"type\":32, \"data\":[123,175,4],\"color\":[181,118,55,128],\"score\":0.0466502},\n{\"type\":32, \"data\":[79,486,22],\"color\":[179,147,102,128],\"score\":0.0466321},\n{\"type\":32, \"data\":[15,356,8],\"color\":[15,17,7,128],\"score\":0.0466128},\n{\"type\":32, \"data\":[67,437,5],\"color\":[2,12,7,128],\"score\":0.0465861},\n{\"type\":32, \"data\":[185,221,3],\"color\":[255,187,118,128],\"score\":0.0465543},\n{\"type\":32, \"data\":[284,467,9],\"color\":[252,222,162,128],\"score\":0.0465328},\n{\"type\":32, \"data\":[212,388,8],\"color\":[191,171,120,128],\"score\":0.0465144},\n{\"type\":32, \"data\":[193,272,6],\"color\":[56,52,31,128],\"score\":0.0464887},\n{\"type\":32, \"data\":[321,202,19],\"color\":[45,42,27,128],\"score\":0.0464701},\n{\"type\":32, \"data\":[252,376,10],\"color\":[74,75,43,128],\"score\":0.0464483},\n{\"type\":32, \"data\":[184,306,7],\"color\":[255,227,171,128],\"score\":0.0464284},\n{\"type\":32, \"data\":[352,330,8],\"color\":[6,11,9,128],\"score\":0.0464123},\n{\"type\":32, \"data\":[109,434,11],\"color\":[41,40,23,128],\"score\":0.0463916},\n{\"type\":32, \"data\":[64,377,3],\"color\":[45,33,19,128],\"score\":0.0463703},\n{\"type\":32, \"data\":[200,308,2],\"color\":[128,52,19,128],\"score\":0.0463506},\n{\"type\":32, \"data\":[130,463,6],\"color\":[36,38,26,128],\"score\":0.0463333},\n{\"type\":32, \"data\":[308,73,24],\"color\":[18,16,9,128],\"score\":0.0463197},\n{\"type\":32, \"data\":[100,444,6],\"color\":[69,68,39,128],\"score\":0.0462951},\n{\"type\":32, \"data\":[226,296,4],\"color\":[255,255,194,128],\"score\":0.0462627},\n{\"type\":32, \"data\":[161,107,6],\"color\":[66,54,24,128],\"score\":0.0462448},\n{\"type\":32, \"data\":[141,356,19],\"color\":[202,185,128,128],\"score\":0.0462291},\n{\"type\":32, \"data\":[182,248,5],\"color\":[175,115,61,128],\"score\":0.0462086},\n{\"type\":32, \"data\":[139,402,5],\"color\":[197,173,114,128],\"score\":0.0461869},\n{\"type\":32, \"data\":[116,102,8],\"color\":[0,0,2,128],\"score\":0.0461635},\n{\"type\":32, \"data\":[273,450,9],\"color\":[248,217,160,128],\"score\":0.0461413},\n{\"type\":32, \"data\":[168,157,5],\"color\":[22,4,1,128],\"score\":0.0461208},\n{\"type\":32, \"data\":[223,316,5],\"color\":[156,142,88,128],\"score\":0.0461008},\n{\"type\":32, \"data\":[92,361,6],\"color\":[42,34,16,128],\"score\":0.0460829},\n{\"type\":32, \"data\":[315,247,4],\"color\":[108,98,70,128],\"score\":0.0460655},\n{\"type\":32, \"data\":[276,334,3],\"color\":[210,208,154,128],\"score\":0.0460485},\n{\"type\":32, \"data\":[89,81,4],\"color\":[119,92,39,128],\"score\":0.0460225},\n{\"type\":32, \"data\":[304,467,5],\"color\":[201,145,89,128],\"score\":0.0459992},\n{\"type\":32, \"data\":[81,211,5],\"color\":[131,126,72,128],\"score\":0.0459749},\n{\"type\":32, \"data\":[105,344,3],\"color\":[132,108,62,128],\"score\":0.0459547},\n{\"type\":32, \"data\":[336,442,12],\"color\":[97,82,54,128],\"score\":0.0459298},\n{\"type\":32, \"data\":[253,345,6],\"color\":[67,67,38,128],\"score\":0.0459138},\n{\"type\":32, \"data\":[335,390,4],\"color\":[102,104,78,128],\"score\":0.045892},\n{\"type\":32, \"data\":[292,342,5],\"color\":[36,40,26,128],\"score\":0.0458759},\n{\"type\":32, \"data\":[336,282,9],\"color\":[63,55,30,128],\"score\":0.04586},\n{\"type\":32, \"data\":[92,410,6],\"color\":[95,77,40,128],\"score\":0.0458412},\n{\"type\":32, \"data\":[111,59,29],\"color\":[4,6,5,128],\"score\":0.0458305},\n{\"type\":32, \"data\":[169,429,10],\"color\":[184,158,103,128],\"score\":0.0458165},\n{\"type\":32, \"data\":[134,133,4],\"color\":[235,199,133,128],\"score\":0.0457881},\n{\"type\":32, \"data\":[114,219,5],\"color\":[16,23,7,128],\"score\":0.0457707},\n{\"type\":32, \"data\":[15,373,5],\"color\":[40,32,9,128],\"score\":0.0457554},\n{\"type\":32, \"data\":[324,357,9],\"color\":[94,91,60,128],\"score\":0.045742},\n{\"type\":32, \"data\":[335,474,11],\"color\":[100,90,59,128],\"score\":0.0457223},\n{\"type\":32, \"data\":[215,303,8],\"color\":[205,190,139,128],\"score\":0.0457045},\n{\"type\":32, \"data\":[232,325,9],\"color\":[203,185,126,128],\"score\":0.0456858},\n{\"type\":32, \"data\":[32,403,7],\"color\":[159,113,64,128],\"score\":0.0456635},\n{\"type\":32, \"data\":[147,101,3],\"color\":[117,146,102,128],\"score\":0.0456423},\n{\"type\":32, \"data\":[117,277,5],\"color\":[185,169,110,128],\"score\":0.0456243},\n{\"type\":32, \"data\":[111,265,4],\"color\":[4,6,3,128],\"score\":0.0456031},\n{\"type\":32, \"data\":[144,260,4],\"color\":[112,115,75,128],\"score\":0.0455868},\n{\"type\":32, \"data\":[152,185,9],\"color\":[11,10,4,128],\"score\":0.0455673},\n{\"type\":32, \"data\":[243,300,4],\"color\":[214,166,101,128],\"score\":0.045539},\n{\"type\":32, \"data\":[248,362,4],\"color\":[135,123,68,128],\"score\":0.0455251},\n{\"type\":32, \"data\":[22,237,54],\"color\":[10,12,10,128],\"score\":0.0455006},\n{\"type\":32, \"data\":[35,495,5],\"color\":[142,107,64,128],\"score\":0.0454854},\n{\"type\":32, \"data\":[144,267,5],\"color\":[57,63,30,128],\"score\":0.0454699},\n{\"type\":32, \"data\":[123,463,4],\"color\":[130,101,63,128],\"score\":0.0454531},\n{\"type\":32, \"data\":[135,195,4],\"color\":[180,124,61,128],\"score\":0.0454323},\n{\"type\":32, \"data\":[50,371,4],\"color\":[216,149,80,128],\"score\":0.0454129},\n{\"type\":32, \"data\":[41,443,6],\"color\":[23,32,17,128],\"score\":0.0453928},\n{\"type\":32, \"data\":[145,398,5],\"color\":[111,96,52,128],\"score\":0.0453649},\n{\"type\":32, \"data\":[173,197,9],\"color\":[116,84,42,128],\"score\":0.0453505},\n{\"type\":32, \"data\":[161,281,3],\"color\":[144,137,86,128],\"score\":0.0453318},\n{\"type\":32, \"data\":[138,112,7],\"color\":[38,21,5,128],\"score\":0.0453084},\n{\"type\":32, \"data\":[70,448,6],\"color\":[128,110,75,128],\"score\":0.0452807},\n{\"type\":32, \"data\":[64,403,4],\"color\":[171,139,89,128],\"score\":0.0452662},\n{\"type\":32, \"data\":[168,301,5],\"color\":[255,232,165,128],\"score\":0.045249},\n{\"type\":32, \"data\":[117,113,4],\"color\":[34,33,21,128],\"score\":0.0452278},\n{\"type\":32, \"data\":[20,369,6],\"color\":[92,74,37,128],\"score\":0.0452136},\n{\"type\":32, \"data\":[0,435,5],\"color\":[77,49,26,128],\"score\":0.0451989},\n{\"type\":32, \"data\":[90,302,6],\"color\":[221,205,147,128],\"score\":0.0451738},\n{\"type\":32, \"data\":[103,259,4],\"color\":[140,130,77,128],\"score\":0.0451561},\n{\"type\":32, \"data\":[334,495,10],\"color\":[148,129,86,128],\"score\":0.0451394},\n{\"type\":32, \"data\":[153,158,2],\"color\":[84,20,0,128],\"score\":0.0451163},\n{\"type\":32, \"data\":[37,367,2],\"color\":[225,188,134,128],\"score\":0.0450967},\n{\"type\":32, \"data\":[247,435,10],\"color\":[135,91,53,128],\"score\":0.045081},\n{\"type\":32, \"data\":[209,266,4],\"color\":[110,82,49,128],\"score\":0.0450564},\n{\"type\":32, \"data\":[81,291,10],\"color\":[174,161,103,128],\"score\":0.0450416},\n{\"type\":32, \"data\":[123,435,3],\"color\":[164,138,106,128],\"score\":0.0450187},\n{\"type\":32, \"data\":[66,329,7],\"color\":[21,25,14,128],\"score\":0.0450038},\n{\"type\":32, \"data\":[30,445,4],\"color\":[129,116,69,128],\"score\":0.0449854},\n{\"type\":32, \"data\":[143,125,6],\"color\":[173,130,74,128],\"score\":0.0449722},\n{\"type\":32, \"data\":[33,415,11],\"color\":[99,74,44,128],\"score\":0.044957},\n{\"type\":32, \"data\":[121,449,7],\"color\":[152,124,81,128],\"score\":0.0449411},\n{\"type\":32, \"data\":[153,164,2],\"color\":[76,0,0,128],\"score\":0.0449189},\n{\"type\":32, \"data\":[184,253,4],\"color\":[66,46,18,128],\"score\":0.0448927},\n{\"type\":32, \"data\":[115,425,6],\"color\":[79,70,41,128],\"score\":0.0448776},\n{\"type\":32, \"data\":[114,466,6],\"color\":[187,152,101,128],\"score\":0.0448647},\n{\"type\":32, \"data\":[44,406,3],\"color\":[25,26,6,128],\"score\":0.0448459},\n{\"type\":32, \"data\":[62,394,4],\"color\":[3,4,2,128],\"score\":0.0448268},\n{\"type\":32, \"data\":[5,414,5],\"color\":[202,134,66,128],\"score\":0.0448041},\n{\"type\":32, \"data\":[282,480,3],\"color\":[133,68,33,128],\"score\":0.0447868},\n{\"type\":32, \"data\":[96,90,3],\"color\":[138,114,46,128],\"score\":0.0447694},\n{\"type\":32, \"data\":[103,243,5],\"color\":[126,119,70,128],\"score\":0.0447516},\n{\"type\":32, \"data\":[200,301,6],\"color\":[209,190,127,128],\"score\":0.0447336},\n{\"type\":32, \"data\":[196,256,4],\"color\":[255,187,111,128],\"score\":0.044717},\n{\"type\":32, \"data\":[102,299,3],\"color\":[116,105,57,128],\"score\":0.0446969},\n{\"type\":32, \"data\":[170,311,6],\"color\":[210,166,103,128],\"score\":0.044679},\n{\"type\":32, \"data\":[96,376,13],\"color\":[23,26,16,128],\"score\":0.0446554},\n{\"type\":32, \"data\":[126,212,8],\"color\":[103,72,32,128],\"score\":0.0446374},\n{\"type\":32, \"data\":[205,171,26],\"color\":[7,8,7,128],\"score\":0.0446221},\n{\"type\":32, \"data\":[277,116,14],\"color\":[43,36,20,128],\"score\":0.044609},\n{\"type\":32, \"data\":[278,266,14],\"color\":[62,53,31,128],\"score\":0.044596},\n{\"type\":32, \"data\":[3,391,5],\"color\":[107,77,44,128],\"score\":0.0445818},\n{\"type\":32, \"data\":[85,338,6],\"color\":[176,159,99,128],\"score\":0.0445693},\n{\"type\":32, \"data\":[94,395,6],\"color\":[85,63,33,128],\"score\":0.0445531},\n{\"type\":32, \"data\":[31,394,2],\"color\":[210,176,133,128],\"score\":0.0445329},\n{\"type\":32, \"data\":[63,357,4],\"color\":[230,167,83,128],\"score\":0.0445149},\n{\"type\":32, \"data\":[88,417,3],\"color\":[127,99,56,128],\"score\":0.0444994},\n{\"type\":32, \"data\":[202,427,9],\"color\":[195,170,114,128],\"score\":0.0444856},\n{\"type\":32, \"data\":[173,255,6],\"color\":[124,107,60,128],\"score\":0.0444677},\n{\"type\":32, \"data\":[103,98,4],\"color\":[165,122,56,128],\"score\":0.0444518},\n{\"type\":32, \"data\":[86,134,25],\"color\":[4,6,5,128],\"score\":0.0444339},\n{\"type\":32, \"data\":[146,410,5],\"color\":[216,189,130,128],\"score\":0.0444202},\n{\"type\":32, \"data\":[217,271,3],\"color\":[205,181,133,128],\"score\":0.0444027},\n{\"type\":32, \"data\":[239,469,5],\"color\":[88,66,34,128],\"score\":0.0443932},\n{\"type\":32, \"data\":[48,287,22],\"color\":[16,21,14,128],\"score\":0.0443807},\n{\"type\":32, \"data\":[304,477,5],\"color\":[252,203,148,128],\"score\":0.0443618},\n{\"type\":32, \"data\":[196,391,9],\"color\":[229,205,146,128],\"score\":0.044352},\n{\"type\":32, \"data\":[177,168,4],\"color\":[139,96,47,128],\"score\":0.0443368},\n{\"type\":32, \"data\":[162,219,11],\"color\":[22,22,13,128],\"score\":0.0443178},\n{\"type\":32, \"data\":[162,176,6],\"color\":[8,8,0,128],\"score\":0.0443067},\n{\"type\":32, \"data\":[277,380,3],\"color\":[29,30,15,128],\"score\":0.0442899},\n{\"type\":32, \"data\":[250,403,4],\"color\":[33,29,6,128],\"score\":0.0442771},\n{\"type\":32, \"data\":[130,446,2],\"color\":[0,2,4,128],\"score\":0.0442608},\n{\"type\":32, \"data\":[283,299,11],\"color\":[57,47,26,128],\"score\":0.0442463},\n{\"type\":32, \"data\":[241,339,7],\"color\":[140,128,85,128],\"score\":0.0442342},\n{\"type\":32, \"data\":[115,211,5],\"color\":[26,32,15,128],\"score\":0.0442192},\n{\"type\":32, \"data\":[262,435,5],\"color\":[233,175,108,128],\"score\":0.0441998},\n{\"type\":32, \"data\":[231,285,2],\"color\":[214,170,110,128],\"score\":0.0441833},\n{\"type\":32, \"data\":[281,311,3],\"color\":[151,126,73,128],\"score\":0.0441633},\n{\"type\":32, \"data\":[9,453,4],\"color\":[13,8,0,128],\"score\":0.0441405},\n{\"type\":32, \"data\":[252,325,10],\"color\":[162,147,99,128],\"score\":0.0441324},\n{\"type\":32, \"data\":[42,346,5],\"color\":[170,122,69,128],\"score\":0.0441134},\n{\"type\":32, \"data\":[109,352,5],\"color\":[219,209,150,128],\"score\":0.0440974},\n{\"type\":32, \"data\":[252,448,7],\"color\":[190,140,92,128],\"score\":0.0440839},\n{\"type\":32, \"data\":[98,505,25],\"color\":[174,140,96,128],\"score\":0.0440743},\n{\"type\":32, \"data\":[352,436,6],\"color\":[17,21,9,128],\"score\":0.0440538},\n{\"type\":32, \"data\":[190,245,4],\"color\":[248,190,112,128],\"score\":0.0440363},\n{\"type\":32, \"data\":[35,391,3],\"color\":[21,23,5,128],\"score\":0.0440212},\n{\"type\":32, \"data\":[93,365,4],\"color\":[99,80,45,128],\"score\":0.0440004},\n{\"type\":32, \"data\":[111,124,3],\"color\":[11,0,2,128],\"score\":0.0439854},\n{\"type\":32, \"data\":[155,280,3],\"color\":[40,44,12,128],\"score\":0.0439677},\n{\"type\":32, \"data\":[152,251,6],\"color\":[3,6,4,128],\"score\":0.0439538},\n{\"type\":32, \"data\":[170,471,5],\"color\":[46,45,25,128],\"score\":0.0439395},\n{\"type\":32, \"data\":[116,271,3],\"color\":[167,165,110,128],\"score\":0.0439178},\n{\"type\":32, \"data\":[26,349,5],\"color\":[102,82,50,128],\"score\":0.0439031},\n{\"type\":32, \"data\":[273,437,6],\"color\":[246,206,149,128],\"score\":0.0438922},\n{\"type\":32, \"data\":[183,233,3],\"color\":[222,163,90,128],\"score\":0.0438727},\n{\"type\":32, \"data\":[109,393,10],\"color\":[24,24,14,128],\"score\":0.0438611},\n{\"type\":32, \"data\":[49,394,5],\"color\":[31,29,14,128],\"score\":0.043848},\n{\"type\":32, \"data\":[9,341,3],\"color\":[98,85,60,128],\"score\":0.0438341},\n{\"type\":32, \"data\":[85,188,4],\"color\":[84,66,21,128],\"score\":0.0438143},\n{\"type\":32, \"data\":[164,447,6],\"color\":[216,194,136,128],\"score\":0.0438003},\n{\"type\":32, \"data\":[73,300,4],\"color\":[107,103,58,128],\"score\":0.0437832},\n{\"type\":32, \"data\":[28,364,5],\"color\":[58,49,25,128],\"score\":0.0437714},\n{\"type\":32, \"data\":[190,314,3],\"color\":[173,131,79,128],\"score\":0.0437556},\n{\"type\":32, \"data\":[80,363,6],\"color\":[78,79,47,128],\"score\":0.0437386},\n{\"type\":32, \"data\":[98,468,3],\"color\":[76,62,31,128],\"score\":0.0437227},\n{\"type\":32, \"data\":[70,346,4],\"color\":[76,52,28,128],\"score\":0.0437067},\n{\"type\":32, \"data\":[352,368,8],\"color\":[17,17,9,128],\"score\":0.0436958},\n{\"type\":32, \"data\":[138,141,2],\"color\":[27,13,12,128],\"score\":0.0436711},\n{\"type\":32, \"data\":[125,233,8],\"color\":[116,116,73,128],\"score\":0.0436572},\n{\"type\":32, \"data\":[304,275,13],\"color\":[108,83,49,128],\"score\":0.0436444},\n{\"type\":32, \"data\":[100,308,7],\"color\":[218,204,150,128],\"score\":0.0436328},\n{\"type\":32, \"data\":[285,387,11],\"color\":[35,38,25,128],\"score\":0.0436233},\n{\"type\":32, \"data\":[312,149,6],\"color\":[12,8,5,128],\"score\":0.0436114},\n{\"type\":32, \"data\":[349,511,12],\"color\":[86,78,43,128],\"score\":0.0435976},\n{\"type\":32, \"data\":[117,177,3],\"color\":[21,21,11,128],\"score\":0.0435829},\n{\"type\":32, \"data\":[290,178,12],\"color\":[30,35,26,128],\"score\":0.0435743},\n{\"type\":32, \"data\":[75,117,30],\"color\":[4,6,5,128],\"score\":0.0435655},\n{\"type\":32, \"data\":[292,481,3],\"color\":[138,70,32,128],\"score\":0.0435486},\n{\"type\":32, \"data\":[19,498,9],\"color\":[161,130,88,128],\"score\":0.0435364},\n{\"type\":32, \"data\":[157,151,6],\"color\":[208,145,82,128],\"score\":0.0435171},\n{\"type\":32, \"data\":[255,436,3],\"color\":[88,52,23,128],\"score\":0.0435041},\n{\"type\":32, \"data\":[120,314,7],\"color\":[221,202,145,128],\"score\":0.0434956},\n{\"type\":32, \"data\":[185,224,4],\"color\":[237,152,89,128],\"score\":0.0434808},\n{\"type\":32, \"data\":[99,430,7],\"color\":[11,15,11,128],\"score\":0.043471},\n{\"type\":32, \"data\":[275,322,4],\"color\":[175,108,68,128],\"score\":0.0434532},\n{\"type\":32, \"data\":[189,280,6],\"color\":[94,77,48,128],\"score\":0.0434405},\n{\"type\":32, \"data\":[352,288,8],\"color\":[5,9,6,128],\"score\":0.0434259},\n{\"type\":32, \"data\":[138,455,6],\"color\":[155,125,85,128],\"score\":0.0434151},\n{\"type\":32, \"data\":[111,346,3],\"color\":[137,107,57,128],\"score\":0.0433934},\n{\"type\":32, \"data\":[81,247,4],\"color\":[136,129,71,128],\"score\":0.0433797},\n{\"type\":32, \"data\":[220,278,3],\"color\":[194,163,118,128],\"score\":0.0433636},\n{\"type\":32, \"data\":[236,296,2],\"color\":[120,77,24,128],\"score\":0.0433475},\n{\"type\":32, \"data\":[191,302,4],\"color\":[217,150,84,128],\"score\":0.0433351},\n{\"type\":32, \"data\":[148,143,4],\"color\":[248,220,151,128],\"score\":0.0433209},\n{\"type\":32, \"data\":[166,120,5],\"color\":[111,85,41,128],\"score\":0.0433066},\n{\"type\":32, \"data\":[68,459,3],\"color\":[228,190,121,128],\"score\":0.0432908},\n{\"type\":32, \"data\":[286,322,5],\"color\":[140,109,70,128],\"score\":0.0432754},\n{\"type\":32, \"data\":[293,449,10],\"color\":[73,64,36,128],\"score\":0.0432622},\n{\"type\":32, \"data\":[25,413,4],\"color\":[54,48,28,128],\"score\":0.04325},\n{\"type\":32, \"data\":[37,402,3],\"color\":[186,130,79,128],\"score\":0.0432384},\n{\"type\":32, \"data\":[352,488,9],\"color\":[75,74,47,128],\"score\":0.043226},\n{\"type\":32, \"data\":[194,279,1],\"color\":[213,191,142,128],\"score\":0.043216},\n{\"type\":32, \"data\":[191,217,4],\"color\":[90,58,29,128],\"score\":0.043203},\n{\"type\":32, \"data\":[101,287,5],\"color\":[223,206,146,128],\"score\":0.0431925},\n{\"type\":32, \"data\":[123,411,4],\"color\":[169,137,97,128],\"score\":0.0431701},\n{\"type\":32, \"data\":[141,167,6],\"color\":[224,175,113,128],\"score\":0.0431625},\n{\"type\":32, \"data\":[258,272,13],\"color\":[37,37,23,128],\"score\":0.0431543},\n{\"type\":32, \"data\":[212,362,8],\"color\":[204,191,133,128],\"score\":0.0431417},\n{\"type\":32, \"data\":[121,148,3],\"color\":[76,38,10,128],\"score\":0.0431233},\n{\"type\":32, \"data\":[352,168,14],\"color\":[5,7,6,128],\"score\":0.0431138},\n{\"type\":32, \"data\":[70,402,5],\"color\":[144,130,80,128],\"score\":0.0430988},\n{\"type\":32, \"data\":[253,429,4],\"color\":[84,54,26,128],\"score\":0.0430849},\n{\"type\":32, \"data\":[216,489,14],\"color\":[188,153,104,128],\"score\":0.0430732},\n{\"type\":32, \"data\":[89,451,4],\"color\":[53,50,28,128],\"score\":0.0430487},\n{\"type\":32, \"data\":[109,111,3],\"color\":[201,153,73,128],\"score\":0.0430345},\n{\"type\":32, \"data\":[115,147,6],\"color\":[159,113,55,128],\"score\":0.0430235},\n{\"type\":32, \"data\":[103,219,6],\"color\":[149,141,90,128],\"score\":0.0430101},\n{\"type\":32, \"data\":[135,98,3],\"color\":[201,57,35,128],\"score\":0.042993},\n{\"type\":32, \"data\":[175,234,5],\"color\":[21,21,12,128],\"score\":0.0429809},\n{\"type\":32, \"data\":[209,305,5],\"color\":[215,195,145,128],\"score\":0.0429694},\n{\"type\":32, \"data\":[241,408,4],\"color\":[108,79,39,128],\"score\":0.042958},\n{\"type\":32, \"data\":[300,450,6],\"color\":[109,93,62,128],\"score\":0.0429415},\n{\"type\":32, \"data\":[135,200,3],\"color\":[175,126,63,128],\"score\":0.0429261},\n{\"type\":32, \"data\":[302,324,4],\"color\":[146,108,68,128],\"score\":0.0429129},\n{\"type\":32, \"data\":[268,365,10],\"color\":[153,136,89,128],\"score\":0.0429016},\n{\"type\":32, \"data\":[0,306,5],\"color\":[0,9,7,128],\"score\":0.04289},\n{\"type\":32, \"data\":[50,366,2],\"color\":[31,22,0,128],\"score\":0.0428705},\n{\"type\":32, \"data\":[123,395,4],\"color\":[160,122,79,128],\"score\":0.0428482},\n{\"type\":32, \"data\":[263,38,36],\"color\":[5,7,7,128],\"score\":0.0428396},\n{\"type\":32, \"data\":[91,400,4],\"color\":[132,96,56,128],\"score\":0.0428291},\n{\"type\":32, \"data\":[119,302,3],\"color\":[130,111,61,128],\"score\":0.0428124},\n{\"type\":32, \"data\":[93,361,2],\"color\":[159,123,86,128],\"score\":0.0427957},\n{\"type\":32, \"data\":[52,87,31],\"color\":[4,6,5,128],\"score\":0.0427864},\n{\"type\":32, \"data\":[51,354,4],\"color\":[126,83,47,128],\"score\":0.0427734},\n{\"type\":32, \"data\":[3,494,13],\"color\":[117,103,65,128],\"score\":0.0427611},\n{\"type\":32, \"data\":[31,511,5],\"color\":[128,94,60,128],\"score\":0.0427485},\n{\"type\":32, \"data\":[236,299,2],\"color\":[255,235,187,128],\"score\":0.0427281},\n{\"type\":32, \"data\":[308,125,7],\"color\":[6,6,5,128],\"score\":0.0427178},\n{\"type\":32, \"data\":[29,489,8],\"color\":[184,152,105,128],\"score\":0.0427065},\n{\"type\":32, \"data\":[233,420,7],\"color\":[102,76,44,128],\"score\":0.0426928},\n{\"type\":32, \"data\":[236,511,12],\"color\":[145,121,86,128],\"score\":0.0426809},\n{\"type\":32, \"data\":[313,410,6],\"color\":[97,92,67,128],\"score\":0.0426688},\n{\"type\":32, \"data\":[146,302,4],\"color\":[101,67,27,128],\"score\":0.0426514},\n{\"type\":32, \"data\":[0,361,7],\"color\":[97,72,39,128],\"score\":0.0426411},\n{\"type\":32, \"data\":[139,309,4],\"color\":[66,66,34,128],\"score\":0.0426255},\n{\"type\":32, \"data\":[198,229,3],\"color\":[144,95,51,128],\"score\":0.042614},\n{\"type\":32, \"data\":[9,438,4],\"color\":[219,155,92,128],\"score\":0.0426009},\n{\"type\":32, \"data\":[140,249,7],\"color\":[65,67,35,128],\"score\":0.0425855},\n{\"type\":32, \"data\":[278,490,9],\"color\":[184,154,100,128],\"score\":0.0425743},\n{\"type\":32, \"data\":[283,437,4],\"color\":[47,38,17,128],\"score\":0.0425613},\n{\"type\":32, \"data\":[172,273,10],\"color\":[18,20,14,128],\"score\":0.0425515},\n{\"type\":32, \"data\":[240,384,5],\"color\":[179,155,95,128],\"score\":0.0425355},\n{\"type\":32, \"data\":[150,272,2],\"color\":[167,151,92,128],\"score\":0.0425232},\n{\"type\":32, \"data\":[32,378,8],\"color\":[145,119,74,128],\"score\":0.0425107},\n{\"type\":32, \"data\":[96,207,9],\"color\":[208,191,134,128],\"score\":0.0425002},\n{\"type\":32, \"data\":[289,357,5],\"color\":[199,191,146,128],\"score\":0.0424872},\n{\"type\":32, \"data\":[320,114,11],\"color\":[37,35,17,128],\"score\":0.0424774},\n{\"type\":32, \"data\":[166,202,8],\"color\":[56,47,21,128],\"score\":0.0424643},\n{\"type\":32, \"data\":[218,287,2],\"color\":[97,59,29,128],\"score\":0.0424528},\n{\"type\":32, \"data\":[140,438,2],\"color\":[74,57,23,128],\"score\":0.0424397},\n{\"type\":32, \"data\":[326,185,16],\"color\":[24,28,19,128],\"score\":0.0424293},\n{\"type\":32, \"data\":[54,373,1],\"color\":[13,10,0,128],\"score\":0.042416},\n{\"type\":32, \"data\":[27,417,4],\"color\":[134,99,63,128],\"score\":0.0424051},\n{\"type\":32, \"data\":[29,424,4],\"color\":[31,32,15,128],\"score\":0.0423932},\n{\"type\":32, \"data\":[112,181,4],\"color\":[122,113,60,128],\"score\":0.0423774},\n{\"type\":32, \"data\":[27,389,3],\"color\":[147,123,81,128],\"score\":0.0423661},\n{\"type\":32, \"data\":[213,266,2],\"color\":[183,172,138,128],\"score\":0.0423553},\n{\"type\":32, \"data\":[278,342,6],\"color\":[201,189,130,128],\"score\":0.0423424},\n{\"type\":32, \"data\":[249,303,3],\"color\":[32,23,8,128],\"score\":0.0423327},\n{\"type\":32, \"data\":[270,422,5],\"color\":[218,170,122,128],\"score\":0.0423219},\n{\"type\":32, \"data\":[80,224,5],\"color\":[124,116,63,128],\"score\":0.0422967},\n{\"type\":32, \"data\":[186,435,11],\"color\":[190,170,114,128],\"score\":0.0422863},\n{\"type\":32, \"data\":[99,340,4],\"color\":[163,142,89,128],\"score\":0.0422749},\n{\"type\":32, \"data\":[60,373,3],\"color\":[217,154,85,128],\"score\":0.0422654},\n{\"type\":32, \"data\":[0,60,62],\"color\":[3,6,5,128],\"score\":0.0422551},\n{\"type\":32, \"data\":[94,175,4],\"color\":[76,58,25,128],\"score\":0.042246},\n{\"type\":32, \"data\":[184,297,6],\"color\":[237,194,128,128],\"score\":0.0422351},\n{\"type\":32, \"data\":[172,291,5],\"color\":[195,157,95,128],\"score\":0.0422235},\n{\"type\":32, \"data\":[136,102,4],\"color\":[131,128,73,128],\"score\":0.0422026},\n{\"type\":32, \"data\":[326,189,5],\"color\":[67,60,33,128],\"score\":0.0421887},\n{\"type\":32, \"data\":[275,511,18],\"color\":[153,134,89,128],\"score\":0.0421793},\n{\"type\":32, \"data\":[277,172,7],\"color\":[60,44,22,128],\"score\":0.0421706},\n{\"type\":32, \"data\":[251,411,4],\"color\":[48,27,8,128],\"score\":0.0421587},\n{\"type\":32, \"data\":[253,393,6],\"color\":[52,51,25,128],\"score\":0.0421467},\n{\"type\":32, \"data\":[123,471,4],\"color\":[97,76,43,128],\"score\":0.0421301},\n{\"type\":32, \"data\":[254,383,5],\"color\":[101,102,67,128],\"score\":0.0421177},\n{\"type\":32, \"data\":[81,70,3],\"color\":[97,81,42,128],\"score\":0.0421074},\n{\"type\":32, \"data\":[172,441,5],\"color\":[217,197,141,128],\"score\":0.0420964},\n{\"type\":32, \"data\":[272,394,4],\"color\":[119,84,52,128],\"score\":0.0420866},\n{\"type\":32, \"data\":[167,252,6],\"color\":[88,86,47,128],\"score\":0.0420762},\n{\"type\":32, \"data\":[66,415,5],\"color\":[117,96,56,128],\"score\":0.0420662},\n{\"type\":32, \"data\":[157,189,3],\"color\":[83,61,29,128],\"score\":0.0420559},\n{\"type\":32, \"data\":[125,110,4],\"color\":[128,106,54,128],\"score\":0.0420477},\n{\"type\":32, \"data\":[76,309,6],\"color\":[174,158,99,128],\"score\":0.0420365},\n{\"type\":32, \"data\":[130,192,3],\"color\":[55,38,2,128],\"score\":0.0420206},\n{\"type\":32, \"data\":[271,414,3],\"color\":[121,76,40,128],\"score\":0.0420114},\n{\"type\":32, \"data\":[245,457,5],\"color\":[159,113,73,128],\"score\":0.0419999},\n{\"type\":32, \"data\":[145,205,9],\"color\":[53,49,23,128],\"score\":0.0419891},\n{\"type\":32, \"data\":[144,109,7],\"color\":[15,17,9,128],\"score\":0.0419775},\n{\"type\":32, \"data\":[256,216,14],\"color\":[37,30,18,128],\"score\":0.041969},\n{\"type\":32, \"data\":[97,296,3],\"color\":[133,125,73,128],\"score\":0.0419581},\n{\"type\":32, \"data\":[322,405,6],\"color\":[38,33,20,128],\"score\":0.0419489},\n{\"type\":32, \"data\":[180,253,3],\"color\":[149,103,58,128],\"score\":0.0419381},\n{\"type\":32, \"data\":[145,139,3],\"color\":[164,101,46,128],\"score\":0.0419246},\n{\"type\":32, \"data\":[73,355,3],\"color\":[156,116,61,128],\"score\":0.0419147},\n{\"type\":32, \"data\":[153,297,3],\"color\":[255,223,149,128],\"score\":0.0418963},\n{\"type\":32, \"data\":[132,289,7],\"color\":[203,184,136,128],\"score\":0.0418873},\n{\"type\":32, \"data\":[8,477,7],\"color\":[152,135,97,128],\"score\":0.0418761},\n{\"type\":32, \"data\":[44,457,5],\"color\":[157,123,61,128],\"score\":0.0418643},\n{\"type\":32, \"data\":[201,260,2],\"color\":[207,119,57,128],\"score\":0.0418543},\n{\"type\":32, \"data\":[69,479,15],\"color\":[184,152,106,128],\"score\":0.041847},\n{\"type\":32, \"data\":[190,309,4],\"color\":[255,225,168,128],\"score\":0.0418317},\n{\"type\":32, \"data\":[82,205,5],\"color\":[144,138,87,128],\"score\":0.0418204},\n{\"type\":32, \"data\":[352,470,6],\"color\":[36,35,19,128],\"score\":0.0418095},\n{\"type\":32, \"data\":[226,383,7],\"color\":[226,211,154,128],\"score\":0.0418005},\n{\"type\":32, \"data\":[133,207,7],\"color\":[74,48,20,128],\"score\":0.0417887},\n{\"type\":32, \"data\":[65,425,6],\"color\":[43,40,21,128],\"score\":0.04178},\n{\"type\":32, \"data\":[160,400,10],\"color\":[194,173,115,128],\"score\":0.0417712},\n{\"type\":32, \"data\":[147,164,3],\"color\":[185,97,59,128],\"score\":0.0417548},\n{\"type\":32, \"data\":[243,365,3],\"color\":[36,41,11,128],\"score\":0.0417406},\n{\"type\":32, \"data\":[124,194,4],\"color\":[197,145,78,128],\"score\":0.0417307},\n{\"type\":32, \"data\":[148,102,2],\"color\":[183,153,113,128],\"score\":0.0417188},\n{\"type\":32, \"data\":[234,297,1],\"color\":[60,25,0,128],\"score\":0.0416991},\n{\"type\":32, \"data\":[256,463,6],\"color\":[240,173,115,128],\"score\":0.0416865},\n{\"type\":32, \"data\":[317,305,22],\"color\":[80,67,41,128],\"score\":0.0416751},\n{\"type\":32, \"data\":[310,167,8],\"color\":[64,46,25,128],\"score\":0.0416654},\n{\"type\":32, \"data\":[343,394,3],\"color\":[106,103,76,128],\"score\":0.0416534},\n{\"type\":32, \"data\":[217,211,22],\"color\":[11,13,10,128],\"score\":0.0416439},\n{\"type\":32, \"data\":[214,258,3],\"color\":[91,78,55,128],\"score\":0.0416274},\n{\"type\":32, \"data\":[178,301,5],\"color\":[255,245,185,128],\"score\":0.0416164},\n{\"type\":32, \"data\":[234,401,7],\"color\":[225,201,136,128],\"score\":0.0416077},\n{\"type\":32, \"data\":[183,271,2],\"color\":[118,108,81,128],\"score\":0.0415934},\n{\"type\":32, \"data\":[203,459,10],\"color\":[39,41,23,128],\"score\":0.0415826},\n{\"type\":32, \"data\":[23,460,5],\"color\":[143,121,75,128],\"score\":0.0415665},\n{\"type\":32, \"data\":[46,312,2],\"color\":[145,72,49,128],\"score\":0.0415565},\n{\"type\":32, \"data\":[58,333,7],\"color\":[53,54,34,128],\"score\":0.0415443},\n{\"type\":32, \"data\":[90,250,7],\"color\":[209,197,142,128],\"score\":0.0415317},\n{\"type\":32, \"data\":[93,467,3],\"color\":[226,170,98,128],\"score\":0.0415195},\n{\"type\":32, \"data\":[171,498,21],\"color\":[187,151,103,128],\"score\":0.0415088},\n{\"type\":32, \"data\":[100,420,9],\"color\":[26,28,19,128],\"score\":0.0414997},\n{\"type\":32, \"data\":[75,462,2],\"color\":[90,62,19,128],\"score\":0.0414891},\n{\"type\":32, \"data\":[97,267,5],\"color\":[196,178,121,128],\"score\":0.0414799},\n{\"type\":32, \"data\":[191,234,2],\"color\":[20,18,1,128],\"score\":0.0414688},\n{\"type\":32, \"data\":[12,511,6],\"color\":[99,74,43,128],\"score\":0.04146},\n{\"type\":32, \"data\":[149,443,6],\"color\":[195,170,107,128],\"score\":0.0414514},\n{\"type\":32, \"data\":[95,471,1],\"color\":[82,40,0,128],\"score\":0.0414435},\n{\"type\":32, \"data\":[181,246,5],\"color\":[192,137,78,128],\"score\":0.0414323},\n{\"type\":32, \"data\":[51,361,3],\"color\":[211,133,64,128],\"score\":0.0414231},\n{\"type\":32, \"data\":[95,443,3],\"color\":[137,128,88,128],\"score\":0.0414113},\n{\"type\":32, \"data\":[334,370,6],\"color\":[44,47,32,128],\"score\":0.0414027},\n{\"type\":32, \"data\":[50,346,5],\"color\":[168,122,74,128],\"score\":0.0413908},\n{\"type\":32, \"data\":[140,177,3],\"color\":[144,107,57,128],\"score\":0.0413735},\n{\"type\":32, \"data\":[341,364,8],\"color\":[67,61,37,128],\"score\":0.041366},\n{\"type\":32, \"data\":[307,390,7],\"color\":[9,11,9,128],\"score\":0.0413566},\n{\"type\":32, \"data\":[130,459,3],\"color\":[19,24,11,128],\"score\":0.0413491},\n{\"type\":32, \"data\":[88,464,3],\"color\":[137,82,40,128],\"score\":0.0413391},\n{\"type\":32, \"data\":[136,393,4],\"color\":[113,109,70,128],\"score\":0.0413279},\n{\"type\":32, \"data\":[57,299,14],\"color\":[18,22,14,128],\"score\":0.0413175},\n{\"type\":32, \"data\":[97,345,3],\"color\":[225,208,154,128],\"score\":0.0413084},\n{\"type\":32, \"data\":[150,491,9],\"color\":[205,163,109,128],\"score\":0.0412998},\n{\"type\":32, \"data\":[202,294,3],\"color\":[64,54,27,128],\"score\":0.041287},\n{\"type\":32, \"data\":[154,100,5],\"color\":[92,59,30,128],\"score\":0.0412712},\n{\"type\":32, \"data\":[101,263,2],\"color\":[117,107,55,128],\"score\":0.0412605},\n{\"type\":32, \"data\":[310,206,15],\"color\":[57,48,29,128],\"score\":0.0412502},\n{\"type\":32, \"data\":[144,458,3],\"color\":[101,100,68,128],\"score\":0.0412417},\n{\"type\":32, \"data\":[179,213,4],\"color\":[146,119,66,128],\"score\":0.0412319},\n{\"type\":32, \"data\":[79,444,3],\"color\":[26,32,21,128],\"score\":0.0412215},\n{\"type\":32, \"data\":[162,462,6],\"color\":[136,110,72,128],\"score\":0.0412098},\n{\"type\":32, \"data\":[309,493,11],\"color\":[170,134,86,128],\"score\":0.0412013},\n{\"type\":32, \"data\":[20,397,3],\"color\":[34,26,8,128],\"score\":0.0411902},\n{\"type\":32, \"data\":[307,257,10],\"color\":[80,58,32,128],\"score\":0.0411822},\n{\"type\":32, \"data\":[116,412,5],\"color\":[74,64,34,128],\"score\":0.0411714},\n{\"type\":32, \"data\":[261,413,5],\"color\":[168,117,70,128],\"score\":0.0411614},\n{\"type\":32, \"data\":[118,347,3],\"color\":[153,127,71,128],\"score\":0.0411509},\n{\"type\":32, \"data\":[147,297,2],\"color\":[112,51,0,128],\"score\":0.0411346},\n{\"type\":32, \"data\":[338,331,9],\"color\":[58,56,35,128],\"score\":0.0411243},\n{\"type\":32, \"data\":[80,383,5],\"color\":[64,64,36,128],\"score\":0.0411154},\n{\"type\":32, \"data\":[146,98,3],\"color\":[105,94,58,128],\"score\":0.0411074},\n{\"type\":32, \"data\":[110,455,7],\"color\":[186,143,99,128],\"score\":0.0410972},\n{\"type\":32, \"data\":[119,169,4],\"color\":[164,127,58,128],\"score\":0.041083},\n{\"type\":32, \"data\":[352,215,11],\"color\":[6,9,7,128],\"score\":0.0410751},\n{\"type\":32, \"data\":[276,479,3],\"color\":[135,74,46,128],\"score\":0.0410606},\n{\"type\":32, \"data\":[316,435,2],\"color\":[157,129,91,128],\"score\":0.0410485},\n{\"type\":32, \"data\":[105,198,6],\"color\":[177,171,117,128],\"score\":0.0410413},\n{\"type\":32, \"data\":[109,331,12],\"color\":[208,191,132,128],\"score\":0.0410308},\n{\"type\":32, \"data\":[304,429,4],\"color\":[26,28,16,128],\"score\":0.0410201},\n{\"type\":32, \"data\":[151,286,3],\"color\":[172,148,85,128],\"score\":0.0410103},\n{\"type\":32, \"data\":[327,441,3],\"color\":[37,23,3,128],\"score\":0.0409981},\n{\"type\":32, \"data\":[0,339,7],\"color\":[6,9,9,128],\"score\":0.0409888},\n{\"type\":32, \"data\":[197,447,6],\"color\":[104,90,54,128],\"score\":0.0409794},\n{\"type\":32, \"data\":[326,455,5],\"color\":[57,50,33,128],\"score\":0.0409723},\n{\"type\":32, \"data\":[253,312,4],\"color\":[133,100,65,128],\"score\":0.0409642},\n{\"type\":32, \"data\":[222,290,3],\"color\":[251,237,173,128],\"score\":0.0409556},\n{\"type\":32, \"data\":[54,473,12],\"color\":[185,152,104,128],\"score\":0.0409469},\n{\"type\":32, \"data\":[219,264,1],\"color\":[179,177,151,128],\"score\":0.04093},\n{\"type\":32, \"data\":[160,300,5],\"color\":[255,218,152,128],\"score\":0.0409169},\n{\"type\":32, \"data\":[327,330,6],\"color\":[106,89,58,128],\"score\":0.0409061},\n{\"type\":32, \"data\":[308,467,3],\"color\":[183,143,99,128],\"score\":0.0408957},\n{\"type\":32, \"data\":[123,153,2],\"color\":[44,5,0,128],\"score\":0.0408784},\n{\"type\":32, \"data\":[130,452,2],\"color\":[24,25,9,128],\"score\":0.0408702},\n{\"type\":32, \"data\":[150,112,6],\"color\":[27,21,11,128],\"score\":0.0408619},\n{\"type\":32, \"data\":[276,219,9],\"color\":[58,46,24,128],\"score\":0.040854},\n{\"type\":32, \"data\":[299,474,5],\"color\":[248,209,152,128],\"score\":0.0408448},\n{\"type\":32, \"data\":[135,219,5],\"color\":[143,107,54,128],\"score\":0.0408347},\n{\"type\":32, \"data\":[5,312,2],\"color\":[208,113,42,128],\"score\":0.0408089},\n{\"type\":32, \"data\":[121,74,25],\"color\":[4,6,6,128],\"score\":0.0407997},\n{\"type\":32, \"data\":[23,316,3],\"color\":[91,83,55,128],\"score\":0.040785},\n{\"type\":32, \"data\":[207,261,2],\"color\":[3,2,2,128],\"score\":0.0407744},\n{\"type\":32, \"data\":[42,383,9],\"color\":[109,91,52,128],\"score\":0.0407655},\n{\"type\":32, \"data\":[299,464,3],\"color\":[178,129,73,128],\"score\":0.0407552},\n{\"type\":32, \"data\":[245,371,3],\"color\":[41,44,20,128],\"score\":0.0407459},\n{\"type\":32, \"data\":[269,480,3],\"color\":[144,80,47,128],\"score\":0.0407327},\n{\"type\":32, \"data\":[194,105,29],\"color\":[5,8,6,128],\"score\":0.0407248},\n{\"type\":32, \"data\":[320,486,2],\"color\":[115,47,19,128],\"score\":0.0407151},\n{\"type\":32, \"data\":[186,260,5],\"color\":[7,11,8,128],\"score\":0.040704},\n{\"type\":32, \"data\":[17,401,1],\"color\":[192,196,146,128],\"score\":0.0406945},\n{\"type\":32, \"data\":[325,152,6],\"color\":[58,58,36,128],\"score\":0.0406854},\n{\"type\":32, \"data\":[120,440,3],\"color\":[71,54,25,128],\"score\":0.0406777},\n{\"type\":32, \"data\":[163,307,4],\"color\":[203,153,96,128],\"score\":0.0406676},\n{\"type\":32, \"data\":[77,348,4],\"color\":[71,54,31,128],\"score\":0.0406578},\n{\"type\":32, \"data\":[171,181,6],\"color\":[96,76,34,128],\"score\":0.0406488},\n{\"type\":32, \"data\":[284,270,7],\"color\":[83,65,40,128],\"score\":0.0406415},\n{\"type\":32, \"data\":[124,157,2],\"color\":[34,0,0,128],\"score\":0.0406228},\n{\"type\":32, \"data\":[142,229,6],\"color\":[58,60,31,128],\"score\":0.0406155},\n{\"type\":32, \"data\":[291,240,9],\"color\":[31,32,16,128],\"score\":0.0406086},\n{\"type\":32, \"data\":[90,435,6],\"color\":[36,36,19,128],\"score\":0.0406015},\n{\"type\":32, \"data\":[122,207,5],\"color\":[110,85,44,128],\"score\":0.0405942},\n{\"type\":32, \"data\":[317,312,4],\"color\":[114,102,76,128],\"score\":0.0405825},\n{\"type\":32, \"data\":[76,60,4],\"color\":[54,44,20,128],\"score\":0.0405724},\n{\"type\":32, \"data\":[218,404,7],\"color\":[181,159,108,128],\"score\":0.0405641},\n{\"type\":32, \"data\":[106,300,4],\"color\":[140,129,79,128],\"score\":0.0405541},\n{\"type\":32, \"data\":[6,303,2],\"color\":[185,94,62,128],\"score\":0.0405345},\n{\"type\":32, \"data\":[156,435,11],\"color\":[179,155,98,128],\"score\":0.0405264},\n{\"type\":32, \"data\":[145,284,4],\"color\":[113,109,62,128],\"score\":0.0405166},\n{\"type\":32, \"data\":[224,281,3],\"color\":[133,110,74,128],\"score\":0.0405068},\n{\"type\":32, \"data\":[145,159,4],\"color\":[235,200,137,128],\"score\":0.0404987},\n{\"type\":32, \"data\":[214,314,3],\"color\":[120,100,61,128],\"score\":0.0404911},\n{\"type\":32, \"data\":[127,130,3],\"color\":[72,39,7,128],\"score\":0.0404795},\n{\"type\":32, \"data\":[316,476,1],\"color\":[255,205,149,128],\"score\":0.0404729},\n{\"type\":32, \"data\":[286,336,3],\"color\":[26,30,12,128],\"score\":0.0404629},\n{\"type\":32, \"data\":[44,487,4],\"color\":[100,70,33,128],\"score\":0.0404481},\n{\"type\":32, \"data\":[141,145,3],\"color\":[211,143,78,128],\"score\":0.0404347},\n{\"type\":32, \"data\":[114,228,5],\"color\":[19,20,11,128],\"score\":0.0404251},\n{\"type\":32, \"data\":[172,404,2],\"color\":[158,133,75,128],\"score\":0.0404184},\n{\"type\":32, \"data\":[209,511,7],\"color\":[158,128,89,128],\"score\":0.0404111},\n{\"type\":32, \"data\":[12,381,3],\"color\":[126,94,54,128],\"score\":0.0404022},\n{\"type\":32, \"data\":[160,151,5],\"color\":[220,148,88,128],\"score\":0.0403962},\n{\"type\":32, \"data\":[144,420,5],\"color\":[157,131,76,128],\"score\":0.0403854},\n{\"type\":32, \"data\":[246,97,16],\"color\":[12,14,9,128],\"score\":0.0403794},\n{\"type\":32, \"data\":[2,450,3],\"color\":[150,91,46,128],\"score\":0.0403678},\n{\"type\":32, \"data\":[286,314,4],\"color\":[137,116,74,128],\"score\":0.0403561},\n{\"type\":32, \"data\":[144,170,4],\"color\":[249,214,143,128],\"score\":0.0403462},\n{\"type\":32, \"data\":[115,165,3],\"color\":[160,131,77,128],\"score\":0.0403351},\n{\"type\":32, \"data\":[144,118,4],\"color\":[99,58,22,128],\"score\":0.0403224},\n{\"type\":32, \"data\":[63,321,8],\"color\":[17,21,11,128],\"score\":0.0403139},\n{\"type\":32, \"data\":[273,244,7],\"color\":[63,52,28,128],\"score\":0.0403061},\n{\"type\":32, \"data\":[196,307,2],\"color\":[164,75,50,128],\"score\":0.0402951},\n{\"type\":32, \"data\":[75,336,1],\"color\":[215,213,159,128],\"score\":0.0402849},\n{\"type\":32, \"data\":[97,456,5],\"color\":[169,140,94,128],\"score\":0.0402759},\n{\"type\":32, \"data\":[181,362,17],\"color\":[209,195,141,128],\"score\":0.0402691},\n{\"type\":32, \"data\":[128,299,2],\"color\":[252,239,178,128],\"score\":0.0402587},\n{\"type\":32, \"data\":[148,172,5],\"color\":[220,161,100,128],\"score\":0.0402481},\n{\"type\":32, \"data\":[291,209,4],\"color\":[0,2,2,128],\"score\":0.0402366},\n{\"type\":32, \"data\":[92,231,7],\"color\":[206,197,141,128],\"score\":0.0402307},\n{\"type\":32, \"data\":[52,252,25],\"color\":[11,14,11,128],\"score\":0.0402235},\n{\"type\":32, \"data\":[324,510,11],\"color\":[131,122,83,128],\"score\":0.0402168},\n{\"type\":32, \"data\":[312,341,13],\"color\":[70,66,43,128],\"score\":0.0402077},\n{\"type\":32, \"data\":[201,269,3],\"color\":[240,198,126,128],\"score\":0.0401977},\n{\"type\":32, \"data\":[352,390,6],\"color\":[18,20,15,128],\"score\":0.0401912},\n{\"type\":32, \"data\":[191,289,3],\"color\":[39,36,16,128],\"score\":0.0401833},\n{\"type\":32, \"data\":[24,343,7],\"color\":[56,53,31,128],\"score\":0.0401744},\n{\"type\":32, \"data\":[218,262,2],\"color\":[0,0,0,128],\"score\":0.0401636},\n{\"type\":32, \"data\":[297,111,12],\"color\":[28,16,8,128],\"score\":0.0401586},\n{\"type\":32, \"data\":[289,450,5],\"color\":[44,39,17,128],\"score\":0.0401479},\n{\"type\":32, \"data\":[149,124,4],\"color\":[183,135,81,128],\"score\":0.0401341},\n{\"type\":32, \"data\":[234,349,3],\"color\":[191,164,92,128],\"score\":0.0401239},\n{\"type\":32, \"data\":[287,480,2],\"color\":[136,65,29,128],\"score\":0.0401153},\n{\"type\":32, \"data\":[156,141,2],\"color\":[52,12,0,128],\"score\":0.0401025},\n{\"type\":32, \"data\":[69,379,4],\"color\":[140,106,58,128],\"score\":0.0400919},\n{\"type\":32, \"data\":[67,388,5],\"color\":[75,50,22,128],\"score\":0.040083},\n{\"type\":32, \"data\":[130,410,5],\"color\":[56,48,24,128],\"score\":0.0400752},\n{\"type\":32, \"data\":[85,75,3],\"color\":[101,76,37,128],\"score\":0.0400662},\n{\"type\":32, \"data\":[97,448,4],\"color\":[57,60,36,128],\"score\":0.0400551},\n{\"type\":32, \"data\":[79,334,2],\"color\":[78,78,35,128],\"score\":0.0400456},\n{\"type\":32, \"data\":[338,414,5],\"color\":[90,79,48,128],\"score\":0.0400359},\n{\"type\":32, \"data\":[78,411,5],\"color\":[42,50,31,128],\"score\":0.0400284},\n{\"type\":32, \"data\":[346,261,10],\"color\":[24,26,15,128],\"score\":0.0400217},\n{\"type\":32, \"data\":[338,161,9],\"color\":[21,24,16,128],\"score\":0.0400153},\n{\"type\":32, \"data\":[156,291,3],\"color\":[83,76,44,128],\"score\":0.0400065},\n{\"type\":32, \"data\":[35,452,3],\"color\":[179,149,83,128],\"score\":0.0399974},\n{\"type\":32, \"data\":[268,487,6],\"color\":[196,160,105,128],\"score\":0.0399872},\n{\"type\":32, \"data\":[181,183,5],\"color\":[59,39,15,128],\"score\":0.0399793},\n{\"type\":32, \"data\":[195,313,2],\"color\":[183,105,64,128],\"score\":0.0399739},\n{\"type\":32, \"data\":[120,266,3],\"color\":[67,58,26,128],\"score\":0.0399662},\n{\"type\":32, \"data\":[40,413,3],\"color\":[147,109,68,128],\"score\":0.0399586},\n{\"type\":32, \"data\":[316,423,2],\"color\":[11,11,0,128],\"score\":0.0399485},\n{\"type\":32, \"data\":[12,495,5],\"color\":[156,132,89,128],\"score\":0.0399423},\n{\"type\":32, \"data\":[296,127,4],\"color\":[77,46,23,128],\"score\":0.0399339},\n{\"type\":32, \"data\":[339,436,4],\"color\":[105,102,78,128],\"score\":0.039928},\n{\"type\":32, \"data\":[90,293,3],\"color\":[139,126,79,128],\"score\":0.0399191},\n{\"type\":32, \"data\":[32,350,4],\"color\":[137,102,64,128],\"score\":0.0399114},\n{\"type\":32, \"data\":[230,288,1],\"color\":[115,63,0,128],\"score\":0.0399004},\n{\"type\":32, \"data\":[134,173,2],\"color\":[41,26,0,128],\"score\":0.0398883},\n{\"type\":32, \"data\":[276,385,6],\"color\":[65,54,36,128],\"score\":0.0398823},\n{\"type\":32, \"data\":[242,423,8],\"color\":[138,102,61,128],\"score\":0.0398741},\n{\"type\":32, \"data\":[265,450,6],\"color\":[245,199,131,128],\"score\":0.0398668},\n{\"type\":32, \"data\":[352,458,7],\"color\":[34,32,17,128],\"score\":0.0398607},\n{\"type\":32, \"data\":[45,399,2],\"color\":[130,116,78,128],\"score\":0.0398527},\n{\"type\":32, \"data\":[44,356,4],\"color\":[93,59,24,128],\"score\":0.0398427},\n{\"type\":32, \"data\":[55,403,5],\"color\":[142,124,75,128],\"score\":0.0398348},\n{\"type\":32, \"data\":[126,176,6],\"color\":[138,90,40,128],\"score\":0.0398293},\n{\"type\":32, \"data\":[260,422,6],\"color\":[168,113,61,128],\"score\":0.03982},\n{\"type\":32, \"data\":[145,305,5],\"color\":[97,83,42,128],\"score\":0.0398112},\n{\"type\":32, \"data\":[192,305,2],\"color\":[189,115,59,128],\"score\":0.0398049},\n{\"type\":32, \"data\":[241,484,13],\"color\":[170,137,87,128],\"score\":0.0397994},\n{\"type\":32, \"data\":[220,294,5],\"color\":[243,227,163,128],\"score\":0.0397904},\n{\"type\":32, \"data\":[275,308,4],\"color\":[124,100,63,128],\"score\":0.0397822},\n{\"type\":32, \"data\":[120,181,3],\"color\":[44,25,19,128],\"score\":0.0397739},\n{\"type\":32, \"data\":[80,258,3],\"color\":[107,107,60,128],\"score\":0.0397663},\n{\"type\":32, \"data\":[62,199,16],\"color\":[6,8,6,128],\"score\":0.0397602},\n{\"type\":32, \"data\":[313,204,6],\"color\":[30,27,14,128],\"score\":0.0397537},\n{\"type\":32, \"data\":[122,389,4],\"color\":[139,107,66,128],\"score\":0.0397449},\n{\"type\":32, \"data\":[323,419,2],\"color\":[120,122,105,128],\"score\":0.0397365},\n{\"type\":32, \"data\":[18,445,5],\"color\":[21,26,14,128],\"score\":0.0397284},\n{\"type\":32, \"data\":[54,367,1],\"color\":[230,198,129,128],\"score\":0.0397188},\n{\"type\":32, \"data\":[235,466,6],\"color\":[61,53,29,128],\"score\":0.0397144},\n{\"type\":32, \"data\":[111,247,7],\"color\":[25,28,14,128],\"score\":0.0397053},\n{\"type\":32, \"data\":[266,297,11],\"color\":[39,36,22,128],\"score\":0.0396984},\n{\"type\":32, \"data\":[121,368,10],\"color\":[199,172,108,128],\"score\":0.0396894},\n{\"type\":32, \"data\":[108,51,31],\"color\":[4,6,5,128],\"score\":0.0396832},\n{\"type\":32, \"data\":[279,316,4],\"color\":[18,37,32,128],\"score\":0.0396756},\n{\"type\":32, \"data\":[132,352,9],\"color\":[191,174,115,128],\"score\":0.0396696},\n{\"type\":32, \"data\":[219,309,2],\"color\":[250,232,204,128],\"score\":0.0396619},\n{\"type\":32, \"data\":[214,265,1],\"color\":[203,186,155,128],\"score\":0.0396538},\n{\"type\":32, \"data\":[123,416,2],\"color\":[186,145,108,128],\"score\":0.0396454},\n{\"type\":32, \"data\":[323,278,6],\"color\":[61,58,37,128],\"score\":0.0396392},\n{\"type\":32, \"data\":[143,277,5],\"color\":[156,144,96,128],\"score\":0.0396296},\n{\"type\":32, \"data\":[306,288,5],\"color\":[106,83,50,128],\"score\":0.0396251},\n{\"type\":32, \"data\":[90,412,2],\"color\":[137,111,68,128],\"score\":0.0396183},\n{\"type\":32, \"data\":[99,184,4],\"color\":[178,157,92,128],\"score\":0.039609},\n{\"type\":32, \"data\":[113,424,8],\"color\":[67,60,35,128],\"score\":0.039603},\n{\"type\":32, \"data\":[116,445,4],\"color\":[150,128,87,128],\"score\":0.039594},\n{\"type\":32, \"data\":[185,274,2],\"color\":[118,101,79,128],\"score\":0.0395827},\n{\"type\":32, \"data\":[43,494,5],\"color\":[172,130,82,128],\"score\":0.0395732},\n{\"type\":32, \"data\":[291,418,9],\"color\":[38,37,23,128],\"score\":0.0395648},\n{\"type\":32, \"data\":[51,418,5],\"color\":[96,87,49,128],\"score\":0.0395589},\n{\"type\":32, \"data\":[70,110,30],\"color\":[4,6,5,128],\"score\":0.0395523},\n{\"type\":32, \"data\":[196,430,10],\"color\":[196,172,116,128],\"score\":0.0395455},\n{\"type\":32, \"data\":[130,397,2],\"color\":[17,16,0,128],\"score\":0.0395392},\n{\"type\":32, \"data\":[305,358,6],\"color\":[24,27,16,128],\"score\":0.0395304},\n{\"type\":32, \"data\":[152,275,4],\"color\":[103,95,54,128],\"score\":0.0395223},\n{\"type\":32, \"data\":[217,266,2],\"color\":[76,57,23,128],\"score\":0.0395143},\n{\"type\":32, \"data\":[37,360,3],\"color\":[39,51,28,128],\"score\":0.0395054},\n{\"type\":32, \"data\":[110,436,4],\"color\":[19,25,16,128],\"score\":0.0395007},\n{\"type\":32, \"data\":[168,208,4],\"color\":[86,62,30,128],\"score\":0.0394941},\n{\"type\":32, \"data\":[275,85,11],\"color\":[35,26,14,128],\"score\":0.0394892},\n{\"type\":32, \"data\":[64,368,3],\"color\":[216,159,94,128],\"score\":0.0394802},\n{\"type\":32, \"data\":[311,312,3],\"color\":[39,40,26,128],\"score\":0.0394743},\n{\"type\":32, \"data\":[263,335,6],\"color\":[87,85,49,128],\"score\":0.0394693},\n{\"type\":32, \"data\":[264,380,3],\"color\":[116,121,89,128],\"score\":0.0394625}\n]}";
ShapeDatasets.windflowers = "{\"shapes\":\n[{\"type\":32, \"data\":[157,234,176],\"color\":[255,255,189,128],\"score\":0.252936},\n{\"type\":32, \"data\":[176,93,176],\"color\":[195,156,93,128],\"score\":0.219401},\n{\"type\":32, \"data\":[175,388,176],\"color\":[172,158,99,128],\"score\":0.18604},\n{\"type\":32, \"data\":[126,290,75],\"color\":[238,235,251,128],\"score\":0.175815},\n{\"type\":32, \"data\":[351,325,156],\"color\":[72,70,0,128],\"score\":0.161465},\n{\"type\":32, \"data\":[223,143,41],\"color\":[255,255,255,128],\"score\":0.156353},\n{\"type\":32, \"data\":[87,3,31],\"color\":[255,255,255,128],\"score\":0.152817},\n{\"type\":32, \"data\":[142,90,59],\"color\":[73,43,0,128],\"score\":0.147802},\n{\"type\":32, \"data\":[90,394,44],\"color\":[215,174,190,128],\"score\":0.144369},\n{\"type\":32, \"data\":[351,217,115],\"color\":[128,113,28,128],\"score\":0.139708},\n{\"type\":32, \"data\":[140,1,24],\"color\":[255,255,255,128],\"score\":0.13676},\n{\"type\":32, \"data\":[6,90,96],\"color\":[109,95,53,128],\"score\":0.133622},\n{\"type\":32, \"data\":[35,489,77],\"color\":[100,88,10,128],\"score\":0.13169},\n{\"type\":32, \"data\":[57,212,41],\"color\":[103,81,0,128],\"score\":0.129753},\n{\"type\":32, \"data\":[291,471,46],\"color\":[18,18,0,128],\"score\":0.128131},\n{\"type\":32, \"data\":[144,217,26],\"color\":[245,248,253,128],\"score\":0.126745},\n{\"type\":32, \"data\":[70,319,40],\"color\":[216,214,224,128],\"score\":0.125351},\n{\"type\":32, \"data\":[203,253,25],\"color\":[232,230,238,128],\"score\":0.123946},\n{\"type\":32, \"data\":[192,370,54],\"color\":[88,77,47,128],\"score\":0.122356},\n{\"type\":32, \"data\":[339,0,51],\"color\":[147,124,61,128],\"score\":0.12117},\n{\"type\":32, \"data\":[101,156,25],\"color\":[216,221,219,128],\"score\":0.119973},\n{\"type\":32, \"data\":[269,75,38],\"color\":[78,54,0,128],\"score\":0.118861},\n{\"type\":32, \"data\":[171,61,16],\"color\":[249,148,194,128],\"score\":0.117882},\n{\"type\":32, \"data\":[6,342,28],\"color\":[142,155,99,128],\"score\":0.117058},\n{\"type\":32, \"data\":[351,147,89],\"color\":[122,104,24,128],\"score\":0.115787},\n{\"type\":32, \"data\":[199,196,47],\"color\":[199,144,174,128],\"score\":0.114983},\n{\"type\":32, \"data\":[168,511,59],\"color\":[55,64,0,128],\"score\":0.114175},\n{\"type\":32, \"data\":[256,361,42],\"color\":[56,62,3,128],\"score\":0.113513},\n{\"type\":32, \"data\":[147,349,46],\"color\":[167,145,135,128],\"score\":0.112871},\n{\"type\":32, \"data\":[298,2,17],\"color\":[227,200,218,128],\"score\":0.112241},\n{\"type\":32, \"data\":[330,49,41],\"color\":[71,50,2,128],\"score\":0.111612},\n{\"type\":32, \"data\":[113,195,16],\"color\":[76,81,0,128],\"score\":0.111065},\n{\"type\":32, \"data\":[101,259,28],\"color\":[238,241,230,128],\"score\":0.110547},\n{\"type\":32, \"data\":[52,361,20],\"color\":[95,62,62,128],\"score\":0.110015},\n{\"type\":32, \"data\":[351,477,49],\"color\":[75,73,22,128],\"score\":0.109514},\n{\"type\":32, \"data\":[184,423,42],\"color\":[86,74,6,128],\"score\":0.108986},\n{\"type\":32, \"data\":[10,32,64],\"color\":[117,93,82,128],\"score\":0.108425},\n{\"type\":32, \"data\":[351,312,30],\"color\":[147,142,95,128],\"score\":0.107927},\n{\"type\":32, \"data\":[85,21,19],\"color\":[210,202,231,128],\"score\":0.107446},\n{\"type\":32, \"data\":[132,431,39],\"color\":[142,121,66,128],\"score\":0.106914},\n{\"type\":32, \"data\":[156,132,27],\"color\":[78,57,2,128],\"score\":0.106443},\n{\"type\":32, \"data\":[145,6,16],\"color\":[255,255,244,128],\"score\":0.105995},\n{\"type\":32, \"data\":[228,126,29],\"color\":[255,232,203,128],\"score\":0.105536},\n{\"type\":32, \"data\":[232,458,18],\"color\":[187,138,64,128],\"score\":0.105172},\n{\"type\":32, \"data\":[83,402,17],\"color\":[213,222,204,128],\"score\":0.104756},\n{\"type\":32, \"data\":[194,99,20],\"color\":[72,38,7,128],\"score\":0.104358},\n{\"type\":32, \"data\":[208,76,14],\"color\":[255,192,157,128],\"score\":0.103837},\n{\"type\":32, \"data\":[9,471,57],\"color\":[74,80,23,128],\"score\":0.103404},\n{\"type\":32, \"data\":[351,208,95],\"color\":[113,101,34,128],\"score\":0.102904},\n{\"type\":32, \"data\":[37,133,46],\"color\":[108,99,40,128],\"score\":0.102502},\n{\"type\":32, \"data\":[84,371,16],\"color\":[216,234,245,128],\"score\":0.102143},\n{\"type\":32, \"data\":[186,207,23],\"color\":[130,90,86,128],\"score\":0.101787},\n{\"type\":32, \"data\":[271,282,58],\"color\":[87,80,21,128],\"score\":0.101155},\n{\"type\":32, \"data\":[234,177,24],\"color\":[200,148,165,128],\"score\":0.100797},\n{\"type\":32, \"data\":[196,369,17],\"color\":[171,155,161,128],\"score\":0.100463},\n{\"type\":32, \"data\":[198,157,18],\"color\":[253,253,234,128],\"score\":0.100113},\n{\"type\":32, \"data\":[289,503,61],\"color\":[44,41,0,128],\"score\":0.0997731},\n{\"type\":32, \"data\":[97,1,17],\"color\":[255,255,244,128],\"score\":0.099451},\n{\"type\":32, \"data\":[44,333,18],\"color\":[215,221,224,128],\"score\":0.0991349},\n{\"type\":32, \"data\":[244,69,19],\"color\":[43,16,0,128],\"score\":0.0988442},\n{\"type\":32, \"data\":[117,16,10],\"color\":[92,88,27,128],\"score\":0.0985598},\n{\"type\":32, \"data\":[186,51,8],\"color\":[255,161,195,128],\"score\":0.0982826},\n{\"type\":32, \"data\":[0,324,30],\"color\":[99,108,58,128],\"score\":0.0979952},\n{\"type\":32, \"data\":[83,106,35],\"color\":[124,113,34,128],\"score\":0.097721},\n{\"type\":32, \"data\":[351,0,13],\"color\":[223,191,178,128],\"score\":0.0974777},\n{\"type\":32, \"data\":[37,245,31],\"color\":[117,114,53,128],\"score\":0.097218},\n{\"type\":32, \"data\":[351,200,38],\"color\":[139,129,67,128],\"score\":0.0969796},\n{\"type\":32, \"data\":[207,276,17],\"color\":[176,170,162,128],\"score\":0.0967415},\n{\"type\":32, \"data\":[19,192,8],\"color\":[251,194,237,128],\"score\":0.0964938},\n{\"type\":32, \"data\":[283,269,13],\"color\":[158,148,127,128],\"score\":0.0962577},\n{\"type\":32, \"data\":[338,434,17],\"color\":[124,122,69,128],\"score\":0.0960404},\n{\"type\":32, \"data\":[241,36,36],\"color\":[83,59,2,128],\"score\":0.095832},\n{\"type\":32, \"data\":[151,205,18],\"color\":[231,233,221,128],\"score\":0.0956211},\n{\"type\":32, \"data\":[68,343,6],\"color\":[95,1,11,128],\"score\":0.0954178},\n{\"type\":32, \"data\":[281,92,35],\"color\":[110,89,15,128],\"score\":0.0951986},\n{\"type\":32, \"data\":[261,177,6],\"color\":[249,223,255,128],\"score\":0.0949953},\n{\"type\":32, \"data\":[199,121,12],\"color\":[236,208,194,128],\"score\":0.0947912},\n{\"type\":32, \"data\":[56,417,15],\"color\":[151,62,117,128],\"score\":0.0945914},\n{\"type\":32, \"data\":[153,162,12],\"color\":[93,76,0,128],\"score\":0.0943922},\n{\"type\":32, \"data\":[51,305,14],\"color\":[239,243,235,128],\"score\":0.0942129},\n{\"type\":32, \"data\":[66,36,10],\"color\":[161,159,197,128],\"score\":0.0940083},\n{\"type\":32, \"data\":[45,23,13],\"color\":[36,53,0,128],\"score\":0.0938148},\n{\"type\":32, \"data\":[224,472,10],\"color\":[227,175,92,128],\"score\":0.0936243},\n{\"type\":32, \"data\":[217,207,12],\"color\":[134,51,66,128],\"score\":0.0934422},\n{\"type\":32, \"data\":[172,275,15],\"color\":[245,247,227,128],\"score\":0.0932735},\n{\"type\":32, \"data\":[211,233,16],\"color\":[212,226,197,128],\"score\":0.0930934},\n{\"type\":32, \"data\":[179,27,19],\"color\":[58,57,0,128],\"score\":0.0929137},\n{\"type\":32, \"data\":[340,113,27],\"color\":[158,130,44,128],\"score\":0.0927485},\n{\"type\":32, \"data\":[230,99,12],\"color\":[255,226,154,128],\"score\":0.0925725},\n{\"type\":32, \"data\":[312,401,27],\"color\":[38,51,7,128],\"score\":0.0924085},\n{\"type\":32, \"data\":[117,54,30],\"color\":[85,86,32,128],\"score\":0.0922536},\n{\"type\":32, \"data\":[91,154,14],\"color\":[228,229,222,128],\"score\":0.0920928},\n{\"type\":32, \"data\":[249,91,9],\"color\":[6,0,0,128],\"score\":0.0919338},\n{\"type\":32, \"data\":[276,406,11],\"color\":[154,144,83,128],\"score\":0.0917728},\n{\"type\":32, \"data\":[91,210,16],\"color\":[108,97,2,128],\"score\":0.0916091},\n{\"type\":32, \"data\":[125,23,9],\"color\":[192,166,179,128],\"score\":0.0914486},\n{\"type\":32, \"data\":[128,155,21],\"color\":[141,125,93,128],\"score\":0.0913034},\n{\"type\":32, \"data\":[49,456,27],\"color\":[60,44,9,128],\"score\":0.0911541},\n{\"type\":32, \"data\":[199,450,25],\"color\":[72,55,1,128],\"score\":0.0910114},\n{\"type\":32, \"data\":[69,276,14],\"color\":[242,246,238,128],\"score\":0.0908659},\n{\"type\":32, \"data\":[67,69,27],\"color\":[86,71,28,128],\"score\":0.0907209},\n{\"type\":32, \"data\":[23,292,19],\"color\":[105,105,57,128],\"score\":0.0905686},\n{\"type\":32, \"data\":[177,107,16],\"color\":[56,36,0,128],\"score\":0.0904377},\n{\"type\":32, \"data\":[64,164,15],\"color\":[98,79,9,128],\"score\":0.0902888},\n{\"type\":32, \"data\":[130,500,37],\"color\":[65,78,0,128],\"score\":0.0901475},\n{\"type\":32, \"data\":[348,171,6],\"color\":[238,195,223,128],\"score\":0.0900003},\n{\"type\":32, \"data\":[133,233,28],\"color\":[222,221,199,128],\"score\":0.0898659},\n{\"type\":32, \"data\":[184,71,11],\"color\":[86,37,4,128],\"score\":0.0897222},\n{\"type\":32, \"data\":[245,425,12],\"color\":[11,5,0,128],\"score\":0.0895853},\n{\"type\":32, \"data\":[107,445,10],\"color\":[175,158,138,128],\"score\":0.0894545},\n{\"type\":32, \"data\":[70,321,18],\"color\":[179,170,151,128],\"score\":0.0893196},\n{\"type\":32, \"data\":[16,405,9],\"color\":[177,154,107,128],\"score\":0.0891878},\n{\"type\":32, \"data\":[179,237,10],\"color\":[158,105,77,128],\"score\":0.0890602},\n{\"type\":32, \"data\":[115,397,22],\"color\":[152,133,103,128],\"score\":0.0889401},\n{\"type\":32, \"data\":[248,498,6],\"color\":[175,154,160,128],\"score\":0.0888018},\n{\"type\":32, \"data\":[190,300,21],\"color\":[168,161,145,128],\"score\":0.0886614},\n{\"type\":32, \"data\":[211,99,8],\"color\":[64,34,0,128],\"score\":0.0885326},\n{\"type\":32, \"data\":[150,298,21],\"color\":[219,215,199,128],\"score\":0.0884083},\n{\"type\":32, \"data\":[225,180,9],\"color\":[168,61,94,128],\"score\":0.0882858},\n{\"type\":32, \"data\":[11,481,41],\"color\":[92,86,32,128],\"score\":0.0881696},\n{\"type\":32, \"data\":[329,311,9],\"color\":[184,162,155,128],\"score\":0.0880506},\n{\"type\":32, \"data\":[156,184,13],\"color\":[210,204,187,128],\"score\":0.0879265},\n{\"type\":32, \"data\":[309,475,16],\"color\":[0,5,2,128],\"score\":0.0878171},\n{\"type\":32, \"data\":[202,60,7],\"color\":[239,149,83,128],\"score\":0.0876938},\n{\"type\":32, \"data\":[150,445,31],\"color\":[113,93,35,128],\"score\":0.0875811},\n{\"type\":32, \"data\":[58,237,19],\"color\":[100,87,27,128],\"score\":0.0874688},\n{\"type\":32, \"data\":[18,232,32],\"color\":[133,120,64,128],\"score\":0.0873607},\n{\"type\":32, \"data\":[57,382,12],\"color\":[146,48,81,128],\"score\":0.0872498},\n{\"type\":32, \"data\":[18,264,11],\"color\":[168,184,148,128],\"score\":0.0871276},\n{\"type\":32, \"data\":[0,339,4],\"color\":[255,255,255,128],\"score\":0.0870061},\n{\"type\":32, \"data\":[123,10,7],\"color\":[82,85,0,128],\"score\":0.086882},\n{\"type\":32, \"data\":[57,38,5],\"color\":[211,201,253,128],\"score\":0.086773},\n{\"type\":32, \"data\":[244,177,12],\"color\":[216,212,200,128],\"score\":0.0866561},\n{\"type\":32, \"data\":[77,476,7],\"color\":[242,152,75,128],\"score\":0.0865219},\n{\"type\":32, \"data\":[292,157,27],\"color\":[101,87,15,128],\"score\":0.0864168},\n{\"type\":32, \"data\":[66,433,14],\"color\":[139,64,87,128],\"score\":0.0863136},\n{\"type\":32, \"data\":[120,188,17],\"color\":[123,113,36,128],\"score\":0.0862077},\n{\"type\":32, \"data\":[38,39,7],\"color\":[175,161,181,128],\"score\":0.0860987},\n{\"type\":32, \"data\":[17,450,4],\"color\":[255,195,207,128],\"score\":0.0859745},\n{\"type\":32, \"data\":[170,412,23],\"color\":[67,71,14,128],\"score\":0.0858736},\n{\"type\":32, \"data\":[282,12,8],\"color\":[179,149,146,128],\"score\":0.0857728},\n{\"type\":32, \"data\":[249,37,11],\"color\":[156,116,66,128],\"score\":0.0856703},\n{\"type\":32, \"data\":[341,362,31],\"color\":[82,85,7,128],\"score\":0.0855731},\n{\"type\":32, \"data\":[185,505,37],\"color\":[56,59,0,128],\"score\":0.0854767},\n{\"type\":32, \"data\":[295,290,23],\"color\":[85,82,5,128],\"score\":0.085384},\n{\"type\":32, \"data\":[197,249,13],\"color\":[238,239,211,128],\"score\":0.0852903},\n{\"type\":32, \"data\":[273,435,28],\"color\":[58,51,3,128],\"score\":0.085202},\n{\"type\":32, \"data\":[85,32,12],\"color\":[130,117,171,128],\"score\":0.0851019},\n{\"type\":32, \"data\":[79,119,25],\"color\":[133,129,62,128],\"score\":0.0850108},\n{\"type\":32, \"data\":[285,369,9],\"color\":[123,113,91,128],\"score\":0.0849196},\n{\"type\":32, \"data\":[245,318,3],\"color\":[255,255,255,128],\"score\":0.0848016},\n{\"type\":32, \"data\":[151,185,4],\"color\":[70,66,0,128],\"score\":0.0847088},\n{\"type\":32, \"data\":[192,404,6],\"color\":[182,156,148,128],\"score\":0.0846111},\n{\"type\":32, \"data\":[290,60,7],\"color\":[190,129,98,128],\"score\":0.0845198},\n{\"type\":32, \"data\":[240,502,4],\"color\":[225,199,212,128],\"score\":0.0843983},\n{\"type\":32, \"data\":[199,214,5],\"color\":[225,246,233,128],\"score\":0.0843048},\n{\"type\":32, \"data\":[12,363,4],\"color\":[255,243,248,128],\"score\":0.084189},\n{\"type\":32, \"data\":[215,115,13],\"color\":[221,162,136,128],\"score\":0.0840955},\n{\"type\":32, \"data\":[0,81,51],\"color\":[112,84,72,128],\"score\":0.083999},\n{\"type\":32, \"data\":[287,0,5],\"color\":[34,23,0,128],\"score\":0.0839064},\n{\"type\":32, \"data\":[282,113,24],\"color\":[134,119,25,128],\"score\":0.0838137},\n{\"type\":32, \"data\":[164,89,4],\"color\":[255,219,232,128],\"score\":0.0837013},\n{\"type\":32, \"data\":[127,87,22],\"color\":[112,88,2,128],\"score\":0.0836185},\n{\"type\":32, \"data\":[227,354,20],\"color\":[56,70,4,128],\"score\":0.0835378},\n{\"type\":32, \"data\":[277,327,16],\"color\":[126,110,75,128],\"score\":0.0834438},\n{\"type\":32, \"data\":[51,351,10],\"color\":[119,141,133,128],\"score\":0.083364},\n{\"type\":32, \"data\":[56,7,6],\"color\":[183,178,197,128],\"score\":0.0832773},\n{\"type\":32, \"data\":[25,184,9],\"color\":[204,144,143,128],\"score\":0.0831941},\n{\"type\":32, \"data\":[173,158,4],\"color\":[255,255,255,128],\"score\":0.0831002},\n{\"type\":32, \"data\":[179,6,19],\"color\":[126,97,19,128],\"score\":0.083019},\n{\"type\":32, \"data\":[50,487,4],\"color\":[253,204,189,128],\"score\":0.082911},\n{\"type\":32, \"data\":[161,38,14],\"color\":[49,60,1,128],\"score\":0.0828281},\n{\"type\":32, \"data\":[167,465,4],\"color\":[188,186,215,128],\"score\":0.0827408},\n{\"type\":32, \"data\":[206,88,6],\"color\":[255,210,149,128],\"score\":0.0826355},\n{\"type\":32, \"data\":[135,178,4],\"color\":[244,234,255,128],\"score\":0.0825492},\n{\"type\":32, \"data\":[277,212,34],\"color\":[117,111,24,128],\"score\":0.0824751},\n{\"type\":32, \"data\":[208,191,13],\"color\":[214,112,170,128],\"score\":0.0823972},\n{\"type\":32, \"data\":[125,44,8],\"color\":[130,124,125,128],\"score\":0.0823056},\n{\"type\":32, \"data\":[172,56,8],\"color\":[231,157,183,128],\"score\":0.0822281},\n{\"type\":32, \"data\":[96,419,17],\"color\":[176,170,138,128],\"score\":0.0821464},\n{\"type\":32, \"data\":[76,149,4],\"color\":[249,255,255,128],\"score\":0.0820418},\n{\"type\":32, \"data\":[234,329,9],\"color\":[158,132,93,128],\"score\":0.0819603},\n{\"type\":32, \"data\":[302,38,22],\"color\":[78,66,14,128],\"score\":0.0818806},\n{\"type\":32, \"data\":[176,191,6],\"color\":[60,61,3,128],\"score\":0.0817905},\n{\"type\":32, \"data\":[240,196,9],\"color\":[196,204,204,128],\"score\":0.0817105},\n{\"type\":32, \"data\":[203,481,6],\"color\":[193,135,58,128],\"score\":0.081621},\n{\"type\":32, \"data\":[190,87,11],\"color\":[59,34,0,128],\"score\":0.08154},\n{\"type\":32, \"data\":[60,19,11],\"color\":[80,74,42,128],\"score\":0.0814632},\n{\"type\":32, \"data\":[89,505,5],\"color\":[186,167,167,128],\"score\":0.0813694},\n{\"type\":32, \"data\":[305,337,22],\"color\":[81,84,5,128],\"score\":0.0812935},\n{\"type\":32, \"data\":[344,309,4],\"color\":[233,220,205,128],\"score\":0.0812133},\n{\"type\":32, \"data\":[150,52,8],\"color\":[133,125,99,128],\"score\":0.0811301},\n{\"type\":32, \"data\":[112,0,9],\"color\":[255,255,248,128],\"score\":0.0810528},\n{\"type\":32, \"data\":[253,247,26],\"color\":[85,74,20,128],\"score\":0.0809761},\n{\"type\":32, \"data\":[37,84,9],\"color\":[168,137,121,128],\"score\":0.0809008},\n{\"type\":32, \"data\":[37,370,14],\"color\":[75,96,15,128],\"score\":0.0808258},\n{\"type\":32, \"data\":[195,45,4],\"color\":[255,165,202,128],\"score\":0.0807326},\n{\"type\":32, \"data\":[343,410,19],\"color\":[76,72,0,128],\"score\":0.0806658},\n{\"type\":32, \"data\":[243,482,14],\"color\":[30,41,0,128],\"score\":0.0805892},\n{\"type\":32, \"data\":[176,352,29],\"color\":[146,125,111,128],\"score\":0.0805151},\n{\"type\":32, \"data\":[84,13,8],\"color\":[255,255,205,128],\"score\":0.0804435},\n{\"type\":32, \"data\":[186,179,12],\"color\":[207,89,144,128],\"score\":0.0803643},\n{\"type\":32, \"data\":[58,288,11],\"color\":[233,239,229,128],\"score\":0.0802935},\n{\"type\":32, \"data\":[256,463,11],\"color\":[116,88,12,128],\"score\":0.0802232},\n{\"type\":32, \"data\":[311,263,14],\"color\":[65,49,12,128],\"score\":0.080159},\n{\"type\":32, \"data\":[253,145,12],\"color\":[237,215,201,128],\"score\":0.0800873},\n{\"type\":32, \"data\":[82,451,17],\"color\":[84,36,16,128],\"score\":0.0800173},\n{\"type\":32, \"data\":[58,181,3],\"color\":[255,226,240,128],\"score\":0.0799503},\n{\"type\":32, \"data\":[32,278,17],\"color\":[110,120,69,128],\"score\":0.0798909},\n{\"type\":32, \"data\":[199,100,7],\"color\":[22,9,0,128],\"score\":0.0798242},\n{\"type\":32, \"data\":[31,418,14],\"color\":[58,74,4,128],\"score\":0.0797592},\n{\"type\":32, \"data\":[144,386,17],\"color\":[144,114,107,128],\"score\":0.0796952},\n{\"type\":32, \"data\":[66,0,5],\"color\":[44,40,0,128],\"score\":0.0796171},\n{\"type\":32, \"data\":[115,137,8],\"color\":[203,180,158,128],\"score\":0.0795451},\n{\"type\":32, \"data\":[234,125,22],\"color\":[244,233,208,128],\"score\":0.0794889},\n{\"type\":32, \"data\":[202,141,19],\"color\":[240,233,219,128],\"score\":0.0794241},\n{\"type\":32, \"data\":[164,223,7],\"color\":[139,114,130,128],\"score\":0.0793554},\n{\"type\":32, \"data\":[0,288,6],\"color\":[238,210,213,128],\"score\":0.0792847},\n{\"type\":32, \"data\":[7,441,3],\"color\":[209,217,218,128],\"score\":0.0792131},\n{\"type\":32, \"data\":[70,494,16],\"color\":[70,76,0,128],\"score\":0.0791469},\n{\"type\":32, \"data\":[336,303,6],\"color\":[49,62,0,128],\"score\":0.0790829},\n{\"type\":32, \"data\":[337,200,27],\"color\":[109,101,27,128],\"score\":0.0790214},\n{\"type\":32, \"data\":[97,181,8],\"color\":[215,208,175,128],\"score\":0.0789518},\n{\"type\":32, \"data\":[335,171,4],\"color\":[235,188,221,128],\"score\":0.0788707},\n{\"type\":32, \"data\":[65,196,13],\"color\":[107,94,0,128],\"score\":0.0788103},\n{\"type\":32, \"data\":[267,73,4],\"color\":[219,161,151,128],\"score\":0.0787449},\n{\"type\":32, \"data\":[144,178,5],\"color\":[215,201,246,128],\"score\":0.0786856},\n{\"type\":32, \"data\":[238,461,7],\"color\":[217,165,106,128],\"score\":0.078619},\n{\"type\":32, \"data\":[349,434,7],\"color\":[157,152,135,128],\"score\":0.0785551},\n{\"type\":32, \"data\":[2,242,17],\"color\":[100,101,32,128],\"score\":0.0784977},\n{\"type\":32, \"data\":[144,70,4],\"color\":[218,191,172,128],\"score\":0.0784348},\n{\"type\":32, \"data\":[79,259,12],\"color\":[236,241,234,128],\"score\":0.0783765},\n{\"type\":32, \"data\":[334,483,12],\"color\":[91,80,18,128],\"score\":0.0783161},\n{\"type\":32, \"data\":[143,166,8],\"color\":[98,81,10,128],\"score\":0.0782559},\n{\"type\":32, \"data\":[350,39,20],\"color\":[117,93,33,128],\"score\":0.0781962},\n{\"type\":32, \"data\":[123,158,9],\"color\":[200,187,174,128],\"score\":0.0781323},\n{\"type\":32, \"data\":[70,214,6],\"color\":[206,170,135,128],\"score\":0.0780662},\n{\"type\":32, \"data\":[208,174,6],\"color\":[253,255,246,128],\"score\":0.0780083},\n{\"type\":32, \"data\":[314,310,4],\"color\":[192,159,180,128],\"score\":0.077948},\n{\"type\":32, \"data\":[132,270,14],\"color\":[191,165,138,128],\"score\":0.0778891},\n{\"type\":32, \"data\":[49,312,15],\"color\":[225,224,214,128],\"score\":0.0778356},\n{\"type\":32, \"data\":[309,79,17],\"color\":[69,47,18,128],\"score\":0.0777783},\n{\"type\":32, \"data\":[198,317,11],\"color\":[123,112,88,128],\"score\":0.0777212},\n{\"type\":32, \"data\":[224,451,8],\"color\":[54,51,0,128],\"score\":0.0776614},\n{\"type\":32, \"data\":[343,270,29],\"color\":[108,107,21,128],\"score\":0.0776045},\n{\"type\":32, \"data\":[140,237,7],\"color\":[185,163,126,128],\"score\":0.0775463},\n{\"type\":32, \"data\":[209,378,9],\"color\":[151,137,122,128],\"score\":0.0774867},\n{\"type\":32, \"data\":[153,480,8],\"color\":[1,14,0,128],\"score\":0.0774279},\n{\"type\":32, \"data\":[332,5,13],\"color\":[112,92,18,128],\"score\":0.0773701},\n{\"type\":32, \"data\":[219,280,14],\"color\":[120,115,85,128],\"score\":0.0773149},\n{\"type\":32, \"data\":[302,53,3],\"color\":[255,175,155,128],\"score\":0.0772497},\n{\"type\":32, \"data\":[25,359,4],\"color\":[254,202,186,128],\"score\":0.077179},\n{\"type\":32, \"data\":[55,398,12],\"color\":[155,68,104,128],\"score\":0.077122},\n{\"type\":32, \"data\":[97,26,8],\"color\":[128,114,178,128],\"score\":0.0770687},\n{\"type\":32, \"data\":[129,170,5],\"color\":[87,71,0,128],\"score\":0.077014},\n{\"type\":32, \"data\":[80,180,4],\"color\":[255,194,184,128],\"score\":0.0769509},\n{\"type\":32, \"data\":[43,241,4],\"color\":[209,193,186,128],\"score\":0.0768945},\n{\"type\":32, \"data\":[74,228,14],\"color\":[119,106,22,128],\"score\":0.0768397},\n{\"type\":32, \"data\":[121,368,13],\"color\":[192,184,165,128],\"score\":0.0767881},\n{\"type\":32, \"data\":[78,0,5],\"color\":[78,63,64,128],\"score\":0.0767256},\n{\"type\":32, \"data\":[192,30,12],\"color\":[47,48,0,128],\"score\":0.0766644},\n{\"type\":32, \"data\":[34,342,8],\"color\":[202,212,222,128],\"score\":0.0766092},\n{\"type\":32, \"data\":[220,420,8],\"color\":[142,116,84,128],\"score\":0.0765536},\n{\"type\":32, \"data\":[212,75,11],\"color\":[255,172,142,128],\"score\":0.0765036},\n{\"type\":32, \"data\":[115,347,13],\"color\":[160,135,118,128],\"score\":0.0764507},\n{\"type\":32, \"data\":[122,307,13],\"color\":[168,156,144,128],\"score\":0.0763994},\n{\"type\":32, \"data\":[270,329,3],\"color\":[233,226,216,128],\"score\":0.076337},\n{\"type\":32, \"data\":[229,497,3],\"color\":[220,170,176,128],\"score\":0.0762854},\n{\"type\":32, \"data\":[175,202,4],\"color\":[240,221,233,128],\"score\":0.0762281},\n{\"type\":32, \"data\":[15,346,12],\"color\":[87,100,38,128],\"score\":0.0761785},\n{\"type\":32, \"data\":[170,171,10],\"color\":[205,142,76,128],\"score\":0.0761276},\n{\"type\":32, \"data\":[65,352,7],\"color\":[140,48,65,128],\"score\":0.0760729},\n{\"type\":32, \"data\":[236,205,6],\"color\":[216,214,221,128],\"score\":0.0760263},\n{\"type\":32, \"data\":[219,39,10],\"color\":[43,32,0,128],\"score\":0.075981},\n{\"type\":32, \"data\":[170,315,17],\"color\":[181,172,159,128],\"score\":0.0759262},\n{\"type\":32, \"data\":[261,347,18],\"color\":[64,60,5,128],\"score\":0.0758748},\n{\"type\":32, \"data\":[44,61,17],\"color\":[83,72,38,128],\"score\":0.075825},\n{\"type\":32, \"data\":[0,191,13],\"color\":[195,121,94,128],\"score\":0.0757703},\n{\"type\":32, \"data\":[115,20,9],\"color\":[103,95,64,128],\"score\":0.0757223},\n{\"type\":32, \"data\":[81,414,10],\"color\":[197,194,183,128],\"score\":0.0756776},\n{\"type\":32, \"data\":[30,392,15],\"color\":[84,88,11,128],\"score\":0.075627},\n{\"type\":32, \"data\":[125,0,5],\"color\":[255,255,255,128],\"score\":0.0755662},\n{\"type\":32, \"data\":[222,193,12],\"color\":[193,98,140,128],\"score\":0.0755212},\n{\"type\":32, \"data\":[253,160,7],\"color\":[161,100,90,128],\"score\":0.075475},\n{\"type\":32, \"data\":[0,409,12],\"color\":[77,83,7,128],\"score\":0.0754277},\n{\"type\":32, \"data\":[261,295,16],\"color\":[92,90,0,128],\"score\":0.0753833},\n{\"type\":32, \"data\":[170,249,10],\"color\":[179,157,135,128],\"score\":0.0753408},\n{\"type\":32, \"data\":[162,186,5],\"color\":[252,254,241,128],\"score\":0.075296},\n{\"type\":32, \"data\":[263,313,3],\"color\":[230,168,190,128],\"score\":0.075247},\n{\"type\":32, \"data\":[269,368,4],\"color\":[192,157,176,128],\"score\":0.075171},\n{\"type\":32, \"data\":[300,41,3],\"color\":[243,176,129,128],\"score\":0.0751185},\n{\"type\":32, \"data\":[273,402,5],\"color\":[178,176,136,128],\"score\":0.075074},\n{\"type\":32, \"data\":[212,165,5],\"color\":[162,128,103,128],\"score\":0.0750271},\n{\"type\":32, \"data\":[226,0,5],\"color\":[162,167,182,128],\"score\":0.0749746},\n{\"type\":32, \"data\":[187,194,6],\"color\":[117,59,27,128],\"score\":0.0749245},\n{\"type\":32, \"data\":[136,16,8],\"color\":[252,237,202,128],\"score\":0.0748808},\n{\"type\":32, \"data\":[158,427,13],\"color\":[134,104,57,128],\"score\":0.0748357},\n{\"type\":32, \"data\":[87,208,3],\"color\":[222,188,202,128],\"score\":0.0747844},\n{\"type\":32, \"data\":[14,412,4],\"color\":[239,177,150,128],\"score\":0.0747417},\n{\"type\":32, \"data\":[219,334,16],\"color\":[81,87,10,128],\"score\":0.0746999},\n{\"type\":32, \"data\":[288,318,7],\"color\":[169,137,106,128],\"score\":0.0746494},\n{\"type\":32, \"data\":[133,194,4],\"color\":[227,198,226,128],\"score\":0.0745967},\n{\"type\":32, \"data\":[161,61,7],\"color\":[225,153,187,128],\"score\":0.0745416},\n{\"type\":32, \"data\":[305,5,6],\"color\":[227,212,203,128],\"score\":0.0744976},\n{\"type\":32, \"data\":[85,359,15],\"color\":[208,212,215,128],\"score\":0.0744538},\n{\"type\":32, \"data\":[120,230,18],\"color\":[229,232,209,128],\"score\":0.0744061},\n{\"type\":32, \"data\":[170,110,19],\"color\":[78,53,13,128],\"score\":0.0743628},\n{\"type\":32, \"data\":[106,200,15],\"color\":[114,106,19,128],\"score\":0.0743196},\n{\"type\":32, \"data\":[137,339,13],\"color\":[199,197,178,128],\"score\":0.0742736},\n{\"type\":32, \"data\":[92,288,26],\"color\":[208,206,197,128],\"score\":0.0742314},\n{\"type\":32, \"data\":[225,155,5],\"color\":[157,131,92,128],\"score\":0.0741887},\n{\"type\":32, \"data\":[136,404,13],\"color\":[120,107,96,128],\"score\":0.074148},\n{\"type\":32, \"data\":[173,78,11],\"color\":[167,91,81,128],\"score\":0.0741025},\n{\"type\":32, \"data\":[173,342,9],\"color\":[120,94,64,128],\"score\":0.074057},\n{\"type\":32, \"data\":[140,30,8],\"color\":[69,74,0,128],\"score\":0.0740134},\n{\"type\":32, \"data\":[285,263,6],\"color\":[173,174,156,128],\"score\":0.0739685},\n{\"type\":32, \"data\":[225,303,10],\"color\":[66,74,0,128],\"score\":0.073922},\n{\"type\":32, \"data\":[102,471,12],\"color\":[135,104,29,128],\"score\":0.0738799},\n{\"type\":32, \"data\":[194,142,5],\"color\":[195,131,127,128],\"score\":0.0738281},\n{\"type\":32, \"data\":[83,390,17],\"color\":[188,186,181,128],\"score\":0.0737875},\n{\"type\":32, \"data\":[330,328,3],\"color\":[229,188,212,128],\"score\":0.0737459},\n{\"type\":32, \"data\":[183,221,15],\"color\":[142,101,99,128],\"score\":0.0737019},\n{\"type\":32, \"data\":[195,279,11],\"color\":[208,201,178,128],\"score\":0.0736624},\n{\"type\":32, \"data\":[252,221,16],\"color\":[121,117,40,128],\"score\":0.0736202},\n{\"type\":32, \"data\":[102,243,16],\"color\":[214,213,187,128],\"score\":0.0735804},\n{\"type\":32, \"data\":[300,417,8],\"color\":[0,16,0,128],\"score\":0.0735388},\n{\"type\":32, \"data\":[40,25,11],\"color\":[68,66,8,128],\"score\":0.0734997},\n{\"type\":32, \"data\":[160,240,10],\"color\":[227,229,222,128],\"score\":0.0734607},\n{\"type\":32, \"data\":[78,174,4],\"color\":[83,50,5,128],\"score\":0.0734209},\n{\"type\":32, \"data\":[238,335,3],\"color\":[252,193,177,128],\"score\":0.0733759},\n{\"type\":32, \"data\":[72,338,3],\"color\":[116,27,28,128],\"score\":0.0733306},\n{\"type\":32, \"data\":[146,189,3],\"color\":[99,88,15,128],\"score\":0.0732886},\n{\"type\":32, \"data\":[103,43,4],\"color\":[139,138,162,128],\"score\":0.0732503},\n{\"type\":32, \"data\":[0,17,31],\"color\":[120,90,61,128],\"score\":0.0732122},\n{\"type\":32, \"data\":[339,148,20],\"color\":[133,100,19,128],\"score\":0.0731754},\n{\"type\":32, \"data\":[262,0,15],\"color\":[81,58,0,128],\"score\":0.0731362},\n{\"type\":32, \"data\":[224,246,8],\"color\":[135,124,129,128],\"score\":0.0730926},\n{\"type\":32, \"data\":[106,455,6],\"color\":[173,156,136,128],\"score\":0.0730522},\n{\"type\":32, \"data\":[197,15,4],\"color\":[190,150,144,128],\"score\":0.073009},\n{\"type\":32, \"data\":[7,63,11],\"color\":[74,58,31,128],\"score\":0.0729684},\n{\"type\":32, \"data\":[280,338,3],\"color\":[226,179,198,128],\"score\":0.0729218},\n{\"type\":32, \"data\":[103,373,6],\"color\":[133,108,86,128],\"score\":0.0728841},\n{\"type\":32, \"data\":[328,304,3],\"color\":[251,210,226,128],\"score\":0.0728459},\n{\"type\":32, \"data\":[205,39,4],\"color\":[205,133,133,128],\"score\":0.0727982},\n{\"type\":32, \"data\":[279,490,11],\"color\":[5,19,0,128],\"score\":0.0727624},\n{\"type\":32, \"data\":[262,275,5],\"color\":[183,147,115,128],\"score\":0.0727113},\n{\"type\":32, \"data\":[226,87,9],\"color\":[231,147,70,128],\"score\":0.0726699},\n{\"type\":32, \"data\":[242,74,13],\"color\":[47,24,2,128],\"score\":0.0726301},\n{\"type\":32, \"data\":[53,157,21],\"color\":[120,101,27,128],\"score\":0.0725927},\n{\"type\":32, \"data\":[217,123,5],\"color\":[205,118,128,128],\"score\":0.0725536},\n{\"type\":32, \"data\":[241,302,3],\"color\":[224,175,162,128],\"score\":0.072512},\n{\"type\":32, \"data\":[1,262,3],\"color\":[255,255,241,128],\"score\":0.0724641},\n{\"type\":32, \"data\":[0,341,8],\"color\":[165,165,155,128],\"score\":0.0724255},\n{\"type\":32, \"data\":[231,437,8],\"color\":[151,106,80,128],\"score\":0.0723889},\n{\"type\":32, \"data\":[180,478,7],\"color\":[0,23,0,128],\"score\":0.072349},\n{\"type\":32, \"data\":[133,432,7],\"color\":[60,55,0,128],\"score\":0.0723111},\n{\"type\":32, \"data\":[14,271,3],\"color\":[255,241,239,128],\"score\":0.072274},\n{\"type\":32, \"data\":[32,437,13],\"color\":[36,65,4,128],\"score\":0.072237},\n{\"type\":32, \"data\":[1,129,24],\"color\":[95,83,62,128],\"score\":0.0722023},\n{\"type\":32, \"data\":[169,143,13],\"color\":[120,106,13,128],\"score\":0.0721622},\n{\"type\":32, \"data\":[119,201,3],\"color\":[216,169,187,128],\"score\":0.0721218},\n{\"type\":32, \"data\":[13,260,4],\"color\":[251,221,213,128],\"score\":0.0720744},\n{\"type\":32, \"data\":[218,214,7],\"color\":[110,88,45,128],\"score\":0.0720328},\n{\"type\":32, \"data\":[119,145,5],\"color\":[129,83,43,128],\"score\":0.0719922},\n{\"type\":32, \"data\":[194,388,10],\"color\":[79,83,41,128],\"score\":0.0719541},\n{\"type\":32, \"data\":[334,321,5],\"color\":[59,68,7,128],\"score\":0.0719153},\n{\"type\":32, \"data\":[344,219,18],\"color\":[134,130,65,128],\"score\":0.0718816},\n{\"type\":32, \"data\":[161,14,3],\"color\":[221,204,185,128],\"score\":0.071842},\n{\"type\":32, \"data\":[189,363,18],\"color\":[159,143,133,128],\"score\":0.0718076},\n{\"type\":32, \"data\":[146,225,6],\"color\":[194,169,143,128],\"score\":0.071774},\n{\"type\":32, \"data\":[37,264,4],\"color\":[187,167,186,128],\"score\":0.071737},\n{\"type\":32, \"data\":[351,8,6],\"color\":[205,180,201,128],\"score\":0.0716944},\n{\"type\":32, \"data\":[277,330,5],\"color\":[29,38,0,128],\"score\":0.0716517},\n{\"type\":32, \"data\":[148,148,4],\"color\":[161,162,155,128],\"score\":0.0716147},\n{\"type\":32, \"data\":[283,478,6],\"color\":[110,96,31,128],\"score\":0.0715822},\n{\"type\":32, \"data\":[102,148,11],\"color\":[218,215,198,128],\"score\":0.0715399},\n{\"type\":32, \"data\":[70,477,4],\"color\":[234,142,77,128],\"score\":0.0715031},\n{\"type\":32, \"data\":[30,293,7],\"color\":[80,80,13,128],\"score\":0.071463},\n{\"type\":32, \"data\":[30,354,4],\"color\":[44,61,23,128],\"score\":0.0714264},\n{\"type\":32, \"data\":[116,35,8],\"color\":[57,67,0,128],\"score\":0.0713893},\n{\"type\":32, \"data\":[226,366,4],\"color\":[143,121,146,128],\"score\":0.071342},\n{\"type\":32, \"data\":[325,378,5],\"color\":[127,119,99,128],\"score\":0.071304},\n{\"type\":32, \"data\":[232,401,13],\"color\":[64,62,0,128],\"score\":0.0712682},\n{\"type\":32, \"data\":[200,134,3],\"color\":[183,78,81,128],\"score\":0.071228},\n{\"type\":32, \"data\":[214,510,16],\"color\":[34,45,0,128],\"score\":0.0711933},\n{\"type\":32, \"data\":[218,315,3],\"color\":[234,207,180,128],\"score\":0.0711466},\n{\"type\":32, \"data\":[215,337,2],\"color\":[251,247,255,128],\"score\":0.071093},\n{\"type\":32, \"data\":[244,454,7],\"color\":[193,137,93,128],\"score\":0.071054},\n{\"type\":32, \"data\":[297,398,5],\"color\":[140,126,43,128],\"score\":0.0710185},\n{\"type\":32, \"data\":[47,263,3],\"color\":[215,209,203,128],\"score\":0.0709826},\n{\"type\":32, \"data\":[208,49,8],\"color\":[67,36,0,128],\"score\":0.0709461},\n{\"type\":32, \"data\":[162,165,7],\"color\":[110,101,43,128],\"score\":0.0709098},\n{\"type\":32, \"data\":[21,280,10],\"color\":[143,140,109,128],\"score\":0.0708725},\n{\"type\":32, \"data\":[200,42,3],\"color\":[234,159,171,128],\"score\":0.0708326},\n{\"type\":32, \"data\":[337,20,13],\"color\":[71,74,9,128],\"score\":0.070799},\n{\"type\":32, \"data\":[23,375,13],\"color\":[106,108,43,128],\"score\":0.0707648},\n{\"type\":32, \"data\":[160,511,17],\"color\":[92,97,6,128],\"score\":0.0707321},\n{\"type\":32, \"data\":[216,481,9],\"color\":[134,104,13,128],\"score\":0.0706987},\n{\"type\":32, \"data\":[96,105,12],\"color\":[153,123,76,128],\"score\":0.0706653},\n{\"type\":32, \"data\":[78,165,3],\"color\":[227,219,224,128],\"score\":0.070627},\n{\"type\":32, \"data\":[158,91,2],\"color\":[255,235,236,128],\"score\":0.0705891},\n{\"type\":32, \"data\":[228,327,3],\"color\":[227,196,175,128],\"score\":0.0705433},\n{\"type\":32, \"data\":[278,142,14],\"color\":[109,104,2,128],\"score\":0.0705097},\n{\"type\":32, \"data\":[129,178,3],\"color\":[237,203,233,128],\"score\":0.0704659},\n{\"type\":32, \"data\":[222,66,7],\"color\":[143,77,17,128],\"score\":0.0704321},\n{\"type\":32, \"data\":[71,460,11],\"color\":[45,47,0,128],\"score\":0.0703981},\n{\"type\":32, \"data\":[55,250,12],\"color\":[95,83,37,128],\"score\":0.0703619},\n{\"type\":32, \"data\":[270,176,5],\"color\":[189,154,129,128],\"score\":0.0703234},\n{\"type\":32, \"data\":[302,206,13],\"color\":[143,127,52,128],\"score\":0.0702891},\n{\"type\":32, \"data\":[209,13,3],\"color\":[198,168,172,128],\"score\":0.0702514},\n{\"type\":32, \"data\":[126,65,16],\"color\":[85,62,17,128],\"score\":0.0702176},\n{\"type\":32, \"data\":[137,184,4],\"color\":[91,92,0,128],\"score\":0.0701822},\n{\"type\":32, \"data\":[70,180,3],\"color\":[225,185,183,128],\"score\":0.0701455},\n{\"type\":32, \"data\":[285,408,8],\"color\":[127,114,46,128],\"score\":0.0701101},\n{\"type\":32, \"data\":[176,167,7],\"color\":[250,185,134,128],\"score\":0.0700741},\n{\"type\":32, \"data\":[53,96,14],\"color\":[99,79,30,128],\"score\":0.0700423},\n{\"type\":32, \"data\":[95,8,11],\"color\":[252,246,216,128],\"score\":0.0700099},\n{\"type\":32, \"data\":[348,304,5],\"color\":[174,168,135,128],\"score\":0.0699785},\n{\"type\":32, \"data\":[228,167,5],\"color\":[175,85,111,128],\"score\":0.0699478},\n{\"type\":32, \"data\":[284,34,16],\"color\":[91,76,15,128],\"score\":0.0699163},\n{\"type\":32, \"data\":[13,224,4],\"color\":[221,175,154,128],\"score\":0.0698839},\n{\"type\":32, \"data\":[301,170,5],\"color\":[155,123,115,128],\"score\":0.0698513},\n{\"type\":32, \"data\":[264,511,15],\"color\":[87,71,0,128],\"score\":0.069818},\n{\"type\":32, \"data\":[190,345,9],\"color\":[114,97,67,128],\"score\":0.0697852},\n{\"type\":32, \"data\":[3,273,3],\"color\":[215,236,230,128],\"score\":0.0697435},\n{\"type\":32, \"data\":[56,417,13],\"color\":[143,89,107,128],\"score\":0.0697106},\n{\"type\":32, \"data\":[38,181,8],\"color\":[166,115,102,128],\"score\":0.0696791},\n{\"type\":32, \"data\":[12,322,17],\"color\":[111,118,71,128],\"score\":0.0696514},\n{\"type\":32, \"data\":[191,67,6],\"color\":[60,31,0,128],\"score\":0.069615},\n{\"type\":32, \"data\":[131,115,22],\"color\":[107,75,29,128],\"score\":0.0695868},\n{\"type\":32, \"data\":[117,327,12],\"color\":[163,147,133,128],\"score\":0.0695589},\n{\"type\":32, \"data\":[14,399,4],\"color\":[167,163,175,128],\"score\":0.0695271},\n{\"type\":32, \"data\":[278,312,3],\"color\":[220,168,155,128],\"score\":0.0694949},\n{\"type\":32, \"data\":[247,33,2],\"color\":[255,251,217,128],\"score\":0.0694566},\n{\"type\":32, \"data\":[146,0,15],\"color\":[247,238,206,128],\"score\":0.0694284},\n{\"type\":32, \"data\":[182,265,13],\"color\":[232,235,212,128],\"score\":0.069397},\n{\"type\":32, \"data\":[260,167,6],\"color\":[106,80,15,128],\"score\":0.0693607},\n{\"type\":32, \"data\":[250,131,13],\"color\":[236,232,213,128],\"score\":0.0693324},\n{\"type\":32, \"data\":[118,454,8],\"color\":[98,88,8,128],\"score\":0.0693035},\n{\"type\":32, \"data\":[206,226,6],\"color\":[230,236,223,128],\"score\":0.0692756},\n{\"type\":32, \"data\":[262,326,3],\"color\":[198,184,154,128],\"score\":0.0692412},\n{\"type\":32, \"data\":[11,307,3],\"color\":[234,195,206,128],\"score\":0.0691967},\n{\"type\":32, \"data\":[35,125,19],\"color\":[122,124,68,128],\"score\":0.0691672},\n{\"type\":32, \"data\":[124,188,7],\"color\":[88,97,0,128],\"score\":0.0691343},\n{\"type\":32, \"data\":[23,302,4],\"color\":[201,166,160,128],\"score\":0.0691039},\n{\"type\":32, \"data\":[175,222,4],\"color\":[209,170,188,128],\"score\":0.0690769},\n{\"type\":32, \"data\":[276,269,7],\"color\":[166,159,119,128],\"score\":0.0690435},\n{\"type\":32, \"data\":[330,67,22],\"color\":[78,51,19,128],\"score\":0.0690153},\n{\"type\":32, \"data\":[287,312,4],\"color\":[35,56,0,128],\"score\":0.0689846},\n{\"type\":32, \"data\":[106,418,18],\"color\":[158,139,105,128],\"score\":0.0689537},\n{\"type\":32, \"data\":[7,10,8],\"color\":[75,76,2,128],\"score\":0.068925},\n{\"type\":32, \"data\":[90,164,4],\"color\":[140,137,118,128],\"score\":0.0688964},\n{\"type\":32, \"data\":[132,480,8],\"color\":[16,41,1,128],\"score\":0.068868},\n{\"type\":32, \"data\":[147,20,6],\"color\":[226,212,188,128],\"score\":0.0688379},\n{\"type\":32, \"data\":[32,469,21],\"color\":[78,62,12,128],\"score\":0.0688105},\n{\"type\":32, \"data\":[334,231,4],\"color\":[195,179,134,128],\"score\":0.0687821},\n{\"type\":32, \"data\":[48,241,2],\"color\":[245,222,228,128],\"score\":0.0687503},\n{\"type\":32, \"data\":[270,339,4],\"color\":[144,119,130,128],\"score\":0.0687182},\n{\"type\":32, \"data\":[241,443,6],\"color\":[149,122,117,128],\"score\":0.0686878},\n{\"type\":32, \"data\":[279,368,4],\"color\":[156,143,146,128],\"score\":0.0686569},\n{\"type\":32, \"data\":[238,326,3],\"color\":[217,172,164,128],\"score\":0.0686294},\n{\"type\":32, \"data\":[72,39,5],\"color\":[168,168,199,128],\"score\":0.0685979},\n{\"type\":32, \"data\":[191,156,12],\"color\":[232,231,213,128],\"score\":0.0685674},\n{\"type\":32, \"data\":[152,197,8],\"color\":[244,249,226,128],\"score\":0.068534},\n{\"type\":32, \"data\":[316,182,13],\"color\":[93,77,35,128],\"score\":0.0685069},\n{\"type\":32, \"data\":[76,298,8],\"color\":[176,174,157,128],\"score\":0.0684802},\n{\"type\":32, \"data\":[332,311,3],\"color\":[247,222,217,128],\"score\":0.0684485},\n{\"type\":32, \"data\":[176,247,6],\"color\":[159,135,109,128],\"score\":0.0684229},\n{\"type\":32, \"data\":[212,324,3],\"color\":[176,149,139,128],\"score\":0.0683963},\n{\"type\":32, \"data\":[231,213,4],\"color\":[208,221,220,128],\"score\":0.0683684},\n{\"type\":32, \"data\":[291,333,2],\"color\":[247,205,197,128],\"score\":0.068335},\n{\"type\":32, \"data\":[293,263,4],\"color\":[172,176,167,128],\"score\":0.068304},\n{\"type\":32, \"data\":[284,378,7],\"color\":[44,54,0,128],\"score\":0.0682775},\n{\"type\":32, \"data\":[188,49,6],\"color\":[218,141,161,128],\"score\":0.0682505},\n{\"type\":32, \"data\":[0,429,13],\"color\":[85,98,30,128],\"score\":0.0682233},\n{\"type\":32, \"data\":[182,388,9],\"color\":[63,76,15,128],\"score\":0.0681975},\n{\"type\":32, \"data\":[208,118,4],\"color\":[181,83,96,128],\"score\":0.068164},\n{\"type\":32, \"data\":[34,201,13],\"color\":[121,104,33,128],\"score\":0.0681378},\n{\"type\":32, \"data\":[101,123,12],\"color\":[122,95,32,128],\"score\":0.0681113},\n{\"type\":32, \"data\":[72,6,4],\"color\":[246,236,236,128],\"score\":0.0680816},\n{\"type\":32, \"data\":[342,170,4],\"color\":[191,169,152,128],\"score\":0.0680535},\n{\"type\":32, \"data\":[311,248,10],\"color\":[66,53,25,128],\"score\":0.0680277},\n{\"type\":32, \"data\":[242,369,4],\"color\":[146,133,103,128],\"score\":0.0679986},\n{\"type\":32, \"data\":[266,404,4],\"color\":[167,162,112,128],\"score\":0.0679684},\n{\"type\":32, \"data\":[135,154,9],\"color\":[159,147,133,128],\"score\":0.0679394},\n{\"type\":32, \"data\":[219,265,8],\"color\":[137,127,121,128],\"score\":0.0679123},\n{\"type\":32, \"data\":[210,441,7],\"color\":[23,29,6,128],\"score\":0.067886},\n{\"type\":32, \"data\":[231,487,8],\"color\":[65,66,0,128],\"score\":0.0678578},\n{\"type\":32, \"data\":[136,250,10],\"color\":[196,176,159,128],\"score\":0.0678321},\n{\"type\":32, \"data\":[325,430,6],\"color\":[137,130,88,128],\"score\":0.0678068},\n{\"type\":32, \"data\":[145,56,3],\"color\":[222,162,139,128],\"score\":0.0677773},\n{\"type\":32, \"data\":[292,12,6],\"color\":[214,185,181,128],\"score\":0.0677518},\n{\"type\":32, \"data\":[23,222,2],\"color\":[255,223,214,128],\"score\":0.0677229},\n{\"type\":32, \"data\":[350,316,6],\"color\":[65,67,0,128],\"score\":0.0676965},\n{\"type\":32, \"data\":[212,407,5],\"color\":[8,35,0,128],\"score\":0.0676687},\n{\"type\":32, \"data\":[180,199,4],\"color\":[219,171,169,128],\"score\":0.0676385},\n{\"type\":32, \"data\":[62,366,8],\"color\":[162,64,96,128],\"score\":0.0676129},\n{\"type\":32, \"data\":[83,191,9],\"color\":[114,108,2,128],\"score\":0.0675854},\n{\"type\":32, \"data\":[311,377,13],\"color\":[43,56,1,128],\"score\":0.0675587},\n{\"type\":32, \"data\":[205,64,3],\"color\":[119,47,1,128],\"score\":0.0675265},\n{\"type\":32, \"data\":[193,0,13],\"color\":[92,70,0,128],\"score\":0.0674971},\n{\"type\":32, \"data\":[311,123,6],\"color\":[77,44,6,128],\"score\":0.0674706},\n{\"type\":32, \"data\":[205,457,10],\"color\":[117,91,12,128],\"score\":0.0674443},\n{\"type\":32, \"data\":[308,446,19],\"color\":[33,47,8,128],\"score\":0.0674148},\n{\"type\":32, \"data\":[209,142,10],\"color\":[249,255,237,128],\"score\":0.0673884},\n{\"type\":32, \"data\":[63,13,2],\"color\":[244,216,224,128],\"score\":0.0673595},\n{\"type\":32, \"data\":[325,482,3],\"color\":[143,150,117,128],\"score\":0.0673301},\n{\"type\":32, \"data\":[100,490,14],\"color\":[72,88,0,128],\"score\":0.0673036},\n{\"type\":32, \"data\":[106,137,3],\"color\":[250,255,251,128],\"score\":0.067278},\n{\"type\":32, \"data\":[75,133,14],\"color\":[116,135,55,128],\"score\":0.0672482},\n{\"type\":32, \"data\":[253,31,2],\"color\":[255,218,205,128],\"score\":0.0672176},\n{\"type\":32, \"data\":[291,346,11],\"color\":[61,66,7,128],\"score\":0.0671919},\n{\"type\":32, \"data\":[312,32,11],\"color\":[55,46,8,128],\"score\":0.0671666},\n{\"type\":32, \"data\":[223,23,6],\"color\":[127,107,78,128],\"score\":0.0671404},\n{\"type\":32, \"data\":[238,384,4],\"color\":[140,132,104,128],\"score\":0.0671143},\n{\"type\":32, \"data\":[203,205,7],\"color\":[139,93,63,128],\"score\":0.0670881},\n{\"type\":32, \"data\":[292,361,8],\"color\":[111,109,70,128],\"score\":0.0670626},\n{\"type\":32, \"data\":[233,428,9],\"color\":[57,36,5,128],\"score\":0.0670376},\n{\"type\":32, \"data\":[106,362,5],\"color\":[144,109,91,128],\"score\":0.0670116},\n{\"type\":32, \"data\":[239,166,7],\"color\":[236,224,203,128],\"score\":0.0669876},\n{\"type\":32, \"data\":[6,222,3],\"color\":[222,194,175,128],\"score\":0.0669616},\n{\"type\":32, \"data\":[166,202,6],\"color\":[171,137,142,128],\"score\":0.0669373},\n{\"type\":32, \"data\":[191,134,6],\"color\":[255,255,234,128],\"score\":0.0669135},\n{\"type\":32, \"data\":[55,11,2],\"color\":[236,212,233,128],\"score\":0.0668869},\n{\"type\":32, \"data\":[142,308,14],\"color\":[206,206,194,128],\"score\":0.0668646},\n{\"type\":32, \"data\":[184,59,6],\"color\":[171,90,82,128],\"score\":0.0668373},\n{\"type\":32, \"data\":[228,470,9],\"color\":[191,151,94,128],\"score\":0.066814},\n{\"type\":32, \"data\":[233,320,3],\"color\":[185,158,162,128],\"score\":0.0667863},\n{\"type\":32, \"data\":[156,386,5],\"color\":[189,178,153,128],\"score\":0.0667614},\n{\"type\":32, \"data\":[115,87,17],\"color\":[130,109,23,128],\"score\":0.0667374},\n{\"type\":32, \"data\":[92,470,6],\"color\":[161,127,48,128],\"score\":0.0667141},\n{\"type\":32, \"data\":[233,261,7],\"color\":[54,45,12,128],\"score\":0.0666899},\n{\"type\":32, \"data\":[235,108,12],\"color\":[253,235,187,128],\"score\":0.0666665},\n{\"type\":32, \"data\":[197,473,5],\"color\":[0,12,1,128],\"score\":0.0666405},\n{\"type\":32, \"data\":[215,90,4],\"color\":[162,92,0,128],\"score\":0.0666134},\n{\"type\":32, \"data\":[129,448,7],\"color\":[141,125,95,128],\"score\":0.0665885},\n{\"type\":32, \"data\":[175,401,7],\"color\":[33,50,1,128],\"score\":0.0665635},\n{\"type\":32, \"data\":[267,318,3],\"color\":[225,149,137,128],\"score\":0.0665377},\n{\"type\":32, \"data\":[73,172,7],\"color\":[88,77,28,128],\"score\":0.0665112},\n{\"type\":32, \"data\":[42,350,8],\"color\":[124,144,134,128],\"score\":0.0664875},\n{\"type\":32, \"data\":[235,296,7],\"color\":[75,75,0,128],\"score\":0.066463},\n{\"type\":32, \"data\":[325,387,3],\"color\":[148,130,113,128],\"score\":0.0664392},\n{\"type\":32, \"data\":[143,308,4],\"color\":[148,129,113,128],\"score\":0.066413},\n{\"type\":32, \"data\":[215,355,11],\"color\":[65,76,18,128],\"score\":0.0663928},\n{\"type\":32, \"data\":[83,318,7],\"color\":[148,160,146,128],\"score\":0.0663685},\n{\"type\":32, \"data\":[218,229,11],\"color\":[177,175,158,128],\"score\":0.0663446},\n{\"type\":32, \"data\":[134,113,7],\"color\":[133,115,77,128],\"score\":0.0663219},\n{\"type\":32, \"data\":[82,208,2],\"color\":[221,198,193,128],\"score\":0.0662968},\n{\"type\":32, \"data\":[334,36,2],\"color\":[249,207,163,128],\"score\":0.0662689},\n{\"type\":32, \"data\":[322,401,12],\"color\":[33,41,6,128],\"score\":0.0662461},\n{\"type\":32, \"data\":[328,416,6],\"color\":[112,100,48,128],\"score\":0.0662231},\n{\"type\":32, \"data\":[13,97,7],\"color\":[143,93,111,128],\"score\":0.0662003},\n{\"type\":32, \"data\":[115,167,4],\"color\":[209,212,214,128],\"score\":0.0661755},\n{\"type\":32, \"data\":[282,279,11],\"color\":[120,99,45,128],\"score\":0.0661521},\n{\"type\":32, \"data\":[192,401,8],\"color\":[137,121,94,128],\"score\":0.066128},\n{\"type\":32, \"data\":[230,278,8],\"color\":[93,93,2,128],\"score\":0.0661037},\n{\"type\":32, \"data\":[255,205,10],\"color\":[105,100,5,128],\"score\":0.0660797},\n{\"type\":32, \"data\":[279,255,5],\"color\":[62,55,10,128],\"score\":0.0660561},\n{\"type\":32, \"data\":[258,152,7],\"color\":[210,178,163,128],\"score\":0.0660334},\n{\"type\":32, \"data\":[132,417,5],\"color\":[56,72,6,128],\"score\":0.0660083},\n{\"type\":32, \"data\":[243,291,2],\"color\":[233,190,171,128],\"score\":0.0659838},\n{\"type\":32, \"data\":[238,504,3],\"color\":[199,178,159,128],\"score\":0.0659574},\n{\"type\":32, \"data\":[141,413,6],\"color\":[131,134,130,128],\"score\":0.0659334},\n{\"type\":32, \"data\":[154,276,8],\"color\":[231,225,208,128],\"score\":0.0659111},\n{\"type\":32, \"data\":[283,63,4],\"color\":[31,27,0,128],\"score\":0.0658855},\n{\"type\":32, \"data\":[120,139,5],\"color\":[192,172,149,128],\"score\":0.0658629},\n{\"type\":32, \"data\":[252,496,3],\"color\":[169,144,170,128],\"score\":0.0658395},\n{\"type\":32, \"data\":[78,233,2],\"color\":[249,232,195,128],\"score\":0.0658137},\n{\"type\":32, \"data\":[94,337,13],\"color\":[213,214,221,128],\"score\":0.0657887},\n{\"type\":32, \"data\":[91,243,9],\"color\":[233,237,222,128],\"score\":0.0657666},\n{\"type\":32, \"data\":[196,224,4],\"color\":[219,78,67,128],\"score\":0.0657448},\n{\"type\":32, \"data\":[155,125,13],\"color\":[77,51,12,128],\"score\":0.0657232},\n{\"type\":32, \"data\":[338,217,9],\"color\":[103,95,14,128],\"score\":0.0656996},\n{\"type\":32, \"data\":[32,302,6],\"color\":[95,107,51,128],\"score\":0.0656791},\n{\"type\":32, \"data\":[46,221,2],\"color\":[250,232,223,128],\"score\":0.0656485},\n{\"type\":32, \"data\":[261,101,12],\"color\":[110,98,12,128],\"score\":0.0656257},\n{\"type\":32, \"data\":[0,381,17],\"color\":[99,98,28,128],\"score\":0.0656061},\n{\"type\":32, \"data\":[126,9,5],\"color\":[102,100,24,128],\"score\":0.0655841},\n{\"type\":32, \"data\":[3,209,13],\"color\":[125,101,53,128],\"score\":0.0655632},\n{\"type\":32, \"data\":[253,117,3],\"color\":[199,126,105,128],\"score\":0.06554},\n{\"type\":32, \"data\":[105,279,12],\"color\":[227,227,219,128],\"score\":0.0655211},\n{\"type\":32, \"data\":[171,157,3],\"color\":[254,255,228,128],\"score\":0.0654956},\n{\"type\":32, \"data\":[140,270,7],\"color\":[180,144,109,128],\"score\":0.0654733},\n{\"type\":32, \"data\":[174,210,4],\"color\":[79,87,40,128],\"score\":0.0654526},\n{\"type\":32, \"data\":[335,127,4],\"color\":[203,164,101,128],\"score\":0.0654296},\n{\"type\":32, \"data\":[73,437,13],\"color\":[123,68,66,128],\"score\":0.0654053},\n{\"type\":32, \"data\":[131,139,5],\"color\":[83,58,3,128],\"score\":0.0653838},\n{\"type\":32, \"data\":[253,434,5],\"color\":[0,4,5,128],\"score\":0.065361},\n{\"type\":32, \"data\":[269,484,16],\"color\":[27,28,3,128],\"score\":0.0653399},\n{\"type\":32, \"data\":[294,313,2],\"color\":[223,171,185,128],\"score\":0.0653171},\n{\"type\":32, \"data\":[191,230,3],\"color\":[73,57,29,128],\"score\":0.0652936},\n{\"type\":32, \"data\":[275,320,5],\"color\":[59,75,0,128],\"score\":0.06527},\n{\"type\":32, \"data\":[202,245,15],\"color\":[220,216,192,128],\"score\":0.0652468},\n{\"type\":32, \"data\":[72,16,3],\"color\":[255,254,195,128],\"score\":0.0652208},\n{\"type\":32, \"data\":[265,386,14],\"color\":[57,59,3,128],\"score\":0.0651977},\n{\"type\":32, \"data\":[231,313,3],\"color\":[198,159,125,128],\"score\":0.0651697},\n{\"type\":32, \"data\":[259,412,9],\"color\":[107,85,23,128],\"score\":0.065148},\n{\"type\":32, \"data\":[50,265,9],\"color\":[121,136,89,128],\"score\":0.0651246},\n{\"type\":32, \"data\":[279,354,10],\"color\":[63,63,0,128],\"score\":0.0651029},\n{\"type\":32, \"data\":[110,239,9],\"color\":[204,193,165,128],\"score\":0.0650822},\n{\"type\":32, \"data\":[59,292,14],\"color\":[219,222,213,128],\"score\":0.0650569},\n{\"type\":32, \"data\":[328,44,3],\"color\":[200,123,103,128],\"score\":0.0650343},\n{\"type\":32, \"data\":[210,98,5],\"color\":[33,22,0,128],\"score\":0.0650128},\n{\"type\":32, \"data\":[123,360,15],\"color\":[189,178,161,128],\"score\":0.0649911},\n{\"type\":32, \"data\":[138,209,10],\"color\":[237,241,223,128],\"score\":0.0649692},\n{\"type\":32, \"data\":[193,359,6],\"color\":[181,174,174,128],\"score\":0.064948},\n{\"type\":32, \"data\":[103,397,4],\"color\":[122,92,57,128],\"score\":0.0649291},\n{\"type\":32, \"data\":[181,213,5],\"color\":[190,130,171,128],\"score\":0.064904},\n{\"type\":32, \"data\":[312,328,14],\"color\":[81,86,8,128],\"score\":0.0648838},\n{\"type\":32, \"data\":[21,159,17],\"color\":[114,94,39,128],\"score\":0.0648644},\n{\"type\":32, \"data\":[304,356,3],\"color\":[164,154,109,128],\"score\":0.0648381},\n{\"type\":32, \"data\":[23,255,2],\"color\":[255,255,250,128],\"score\":0.0648089},\n{\"type\":32, \"data\":[225,122,3],\"color\":[207,100,116,128],\"score\":0.0647849},\n{\"type\":32, \"data\":[6,444,3],\"color\":[178,163,155,128],\"score\":0.0647562},\n{\"type\":32, \"data\":[326,318,3],\"color\":[241,188,202,128],\"score\":0.0647302},\n{\"type\":32, \"data\":[263,53,17],\"color\":[79,60,19,128],\"score\":0.0647096},\n{\"type\":32, \"data\":[164,3,4],\"color\":[169,140,126,128],\"score\":0.0646883},\n{\"type\":32, \"data\":[55,450,9],\"color\":[33,48,3,128],\"score\":0.0646667},\n{\"type\":32, \"data\":[287,56,3],\"color\":[234,173,130,128],\"score\":0.0646396},\n{\"type\":32, \"data\":[335,511,29],\"color\":[51,46,5,128],\"score\":0.0646205},\n{\"type\":32, \"data\":[186,206,3],\"color\":[58,70,15,128],\"score\":0.0645978},\n{\"type\":32, \"data\":[322,312,3],\"color\":[212,196,173,128],\"score\":0.0645768},\n{\"type\":32, \"data\":[186,146,4],\"color\":[191,146,145,128],\"score\":0.0645545},\n{\"type\":32, \"data\":[255,217,5],\"color\":[167,148,80,128],\"score\":0.0645349},\n{\"type\":32, \"data\":[225,162,4],\"color\":[234,235,179,128],\"score\":0.0645117},\n{\"type\":32, \"data\":[114,14,6],\"color\":[92,95,16,128],\"score\":0.0644879},\n{\"type\":32, \"data\":[171,240,4],\"color\":[229,220,203,128],\"score\":0.064464},\n{\"type\":32, \"data\":[16,286,3],\"color\":[234,161,179,128],\"score\":0.06444},\n{\"type\":32, \"data\":[326,363,6],\"color\":[127,104,55,128],\"score\":0.0644192},\n{\"type\":32, \"data\":[170,88,3],\"color\":[202,152,152,128],\"score\":0.0643993},\n{\"type\":32, \"data\":[156,156,10],\"color\":[117,100,23,128],\"score\":0.0643816},\n{\"type\":32, \"data\":[25,309,8],\"color\":[126,130,88,128],\"score\":0.0643625},\n{\"type\":32, \"data\":[194,290,6],\"color\":[212,213,210,128],\"score\":0.0643415},\n{\"type\":32, \"data\":[139,178,3],\"color\":[226,230,255,128],\"score\":0.0643188},\n{\"type\":32, \"data\":[325,283,18],\"color\":[95,87,17,128],\"score\":0.0642997},\n{\"type\":32, \"data\":[309,412,3],\"color\":[133,135,87,128],\"score\":0.0642796},\n{\"type\":32, \"data\":[122,285,11],\"color\":[187,171,158,128],\"score\":0.0642587},\n{\"type\":32, \"data\":[239,56,9],\"color\":[47,29,0,128],\"score\":0.0642385},\n{\"type\":32, \"data\":[102,231,7],\"color\":[237,240,221,128],\"score\":0.06422},\n{\"type\":32, \"data\":[161,339,9],\"color\":[121,110,79,128],\"score\":0.0641974},\n{\"type\":32, \"data\":[62,335,5],\"color\":[221,218,210,128],\"score\":0.0641777},\n{\"type\":32, \"data\":[156,291,3],\"color\":[143,136,82,128],\"score\":0.064154},\n{\"type\":32, \"data\":[76,77,7],\"color\":[136,116,70,128],\"score\":0.0641351},\n{\"type\":32, \"data\":[200,56,4],\"color\":[238,176,112,128],\"score\":0.0641053},\n{\"type\":32, \"data\":[341,248,16],\"color\":[117,113,21,128],\"score\":0.0640864},\n{\"type\":32, \"data\":[293,125,7],\"color\":[173,134,60,128],\"score\":0.0640673},\n{\"type\":32, \"data\":[44,251,8],\"color\":[102,87,33,128],\"score\":0.0640477},\n{\"type\":32, \"data\":[219,103,5],\"color\":[198,152,84,128],\"score\":0.0640252},\n{\"type\":32, \"data\":[53,350,10],\"color\":[138,137,129,128],\"score\":0.064004},\n{\"type\":32, \"data\":[225,419,5],\"color\":[132,123,111,128],\"score\":0.0639825},\n{\"type\":32, \"data\":[148,63,5],\"color\":[71,64,3,128],\"score\":0.0639634},\n{\"type\":32, \"data\":[9,42,8],\"color\":[143,105,98,128],\"score\":0.0639427},\n{\"type\":32, \"data\":[188,86,13],\"color\":[83,54,8,128],\"score\":0.0639261},\n{\"type\":32, \"data\":[150,178,3],\"color\":[217,219,255,128],\"score\":0.0639059},\n{\"type\":32, \"data\":[270,309,6],\"color\":[60,67,0,128],\"score\":0.0638836},\n{\"type\":32, \"data\":[351,324,2],\"color\":[255,206,207,128],\"score\":0.0638635},\n{\"type\":32, \"data\":[311,449,8],\"color\":[82,75,17,128],\"score\":0.0638432},\n{\"type\":32, \"data\":[183,306,8],\"color\":[200,201,198,128],\"score\":0.0638227},\n{\"type\":32, \"data\":[242,40,3],\"color\":[215,146,108,128],\"score\":0.063804},\n{\"type\":32, \"data\":[15,452,3],\"color\":[237,148,125,128],\"score\":0.0637852},\n{\"type\":32, \"data\":[70,211,3],\"color\":[234,192,190,128],\"score\":0.0637651},\n{\"type\":32, \"data\":[148,406,3],\"color\":[27,56,0,128],\"score\":0.0637457},\n{\"type\":32, \"data\":[241,4,10],\"color\":[120,99,20,128],\"score\":0.0637256},\n{\"type\":32, \"data\":[33,8,3],\"color\":[180,150,152,128],\"score\":0.0637057},\n{\"type\":32, \"data\":[220,359,2],\"color\":[185,152,143,128],\"score\":0.0636856},\n{\"type\":32, \"data\":[179,38,8],\"color\":[41,44,0,128],\"score\":0.0636669},\n{\"type\":32, \"data\":[80,15,6],\"color\":[255,255,201,128],\"score\":0.0636462},\n{\"type\":32, \"data\":[196,139,3],\"color\":[179,95,100,128],\"score\":0.0636225},\n{\"type\":32, \"data\":[19,13,4],\"color\":[145,117,145,128],\"score\":0.0636016},\n{\"type\":32, \"data\":[237,315,4],\"color\":[35,48,0,128],\"score\":0.0635827},\n{\"type\":32, \"data\":[126,238,6],\"color\":[246,255,249,128],\"score\":0.063563},\n{\"type\":32, \"data\":[327,1,5],\"color\":[155,112,90,128],\"score\":0.063545},\n{\"type\":32, \"data\":[248,87,8],\"color\":[32,15,0,128],\"score\":0.0635288},\n{\"type\":32, \"data\":[161,194,2],\"color\":[84,54,102,128],\"score\":0.0635057},\n{\"type\":32, \"data\":[341,230,2],\"color\":[234,222,225,128],\"score\":0.0634783},\n{\"type\":32, \"data\":[38,0,7],\"color\":[69,70,8,128],\"score\":0.0634593},\n{\"type\":32, \"data\":[201,117,5],\"color\":[229,221,208,128],\"score\":0.0634379},\n{\"type\":32, \"data\":[263,84,10],\"color\":[110,86,15,128],\"score\":0.063418},\n{\"type\":32, \"data\":[83,283,9],\"color\":[190,182,176,128],\"score\":0.0633999},\n{\"type\":32, \"data\":[79,51,10],\"color\":[66,72,26,128],\"score\":0.0633812},\n{\"type\":32, \"data\":[182,427,8],\"color\":[40,50,0,128],\"score\":0.063363},\n{\"type\":32, \"data\":[209,311,8],\"color\":[97,91,56,128],\"score\":0.0633451},\n{\"type\":32, \"data\":[243,474,8],\"color\":[19,31,0,128],\"score\":0.0633254},\n{\"type\":32, \"data\":[156,208,2],\"color\":[103,70,69,128],\"score\":0.0632994},\n{\"type\":32, \"data\":[187,218,3],\"color\":[95,56,10,128],\"score\":0.0632809},\n{\"type\":32, \"data\":[244,191,7],\"color\":[173,161,159,128],\"score\":0.0632634},\n{\"type\":32, \"data\":[117,303,3],\"color\":[112,102,83,128],\"score\":0.0632443},\n{\"type\":32, \"data\":[129,20,4],\"color\":[250,228,196,128],\"score\":0.0632261},\n{\"type\":32, \"data\":[236,197,3],\"color\":[255,255,246,128],\"score\":0.0632053},\n{\"type\":32, \"data\":[220,178,4],\"color\":[125,86,61,128],\"score\":0.0631861},\n{\"type\":32, \"data\":[119,440,9],\"color\":[100,95,47,128],\"score\":0.0631683},\n{\"type\":32, \"data\":[193,30,12],\"color\":[66,60,6,128],\"score\":0.063151},\n{\"type\":32, \"data\":[187,232,2],\"color\":[255,223,236,128],\"score\":0.0631288},\n{\"type\":32, \"data\":[227,221,5],\"color\":[181,199,188,128],\"score\":0.0631116},\n{\"type\":32, \"data\":[197,256,7],\"color\":[240,242,225,128],\"score\":0.0630933},\n{\"type\":32, \"data\":[179,52,6],\"color\":[214,149,164,128],\"score\":0.0630748},\n{\"type\":32, \"data\":[325,126,4],\"color\":[195,159,96,128],\"score\":0.0630569},\n{\"type\":32, \"data\":[173,198,2],\"color\":[255,250,227,128],\"score\":0.0630358},\n{\"type\":32, \"data\":[250,22,8],\"color\":[66,55,1,128],\"score\":0.063017},\n{\"type\":32, \"data\":[109,405,5],\"color\":[199,180,146,128],\"score\":0.0629982},\n{\"type\":32, \"data\":[228,287,4],\"color\":[156,135,122,128],\"score\":0.0629801},\n{\"type\":32, \"data\":[11,361,3],\"color\":[224,203,182,128],\"score\":0.0629595},\n{\"type\":32, \"data\":[189,118,5],\"color\":[154,121,70,128],\"score\":0.0629385},\n{\"type\":32, \"data\":[126,34,3],\"color\":[139,134,138,128],\"score\":0.0629182},\n{\"type\":32, \"data\":[243,328,4],\"color\":[51,62,0,128],\"score\":0.0628977},\n{\"type\":32, \"data\":[29,344,3],\"color\":[242,236,231,128],\"score\":0.0628801},\n{\"type\":32, \"data\":[347,360,10],\"color\":[47,58,0,128],\"score\":0.0628624},\n{\"type\":32, \"data\":[153,82,9],\"color\":[110,89,7,128],\"score\":0.0628444},\n{\"type\":32, \"data\":[291,0,3],\"color\":[79,72,0,128],\"score\":0.0628289},\n{\"type\":32, \"data\":[64,242,11],\"color\":[92,79,27,128],\"score\":0.0628114},\n{\"type\":32, \"data\":[211,81,7],\"color\":[255,190,169,128],\"score\":0.0627951},\n{\"type\":32, \"data\":[245,318,4],\"color\":[211,176,148,128],\"score\":0.0627746},\n{\"type\":32, \"data\":[160,179,3],\"color\":[154,117,64,128],\"score\":0.0627547},\n{\"type\":32, \"data\":[288,365,2],\"color\":[223,173,167,128],\"score\":0.0627374},\n{\"type\":32, \"data\":[74,270,14],\"color\":[228,229,220,128],\"score\":0.0627199},\n{\"type\":32, \"data\":[213,309,2],\"color\":[208,203,165,128],\"score\":0.0627006},\n{\"type\":32, \"data\":[118,23,6],\"color\":[134,111,115,128],\"score\":0.0626818},\n{\"type\":32, \"data\":[197,213,5],\"color\":[197,190,193,128],\"score\":0.0626643},\n{\"type\":32, \"data\":[154,303,6],\"color\":[234,238,221,128],\"score\":0.0626458},\n{\"type\":32, \"data\":[108,37,6],\"color\":[53,61,0,128],\"score\":0.0626275},\n{\"type\":32, \"data\":[170,301,9],\"color\":[175,162,136,128],\"score\":0.0626095},\n{\"type\":32, \"data\":[149,370,14],\"color\":[146,109,100,128],\"score\":0.0625914},\n{\"type\":32, \"data\":[211,62,4],\"color\":[228,139,72,128],\"score\":0.062573},\n{\"type\":32, \"data\":[190,223,4],\"color\":[168,142,179,128],\"score\":0.0625555},\n{\"type\":32, \"data\":[68,12,3],\"color\":[92,73,56,128],\"score\":0.0625383},\n{\"type\":32, \"data\":[229,337,7],\"color\":[61,65,0,128],\"score\":0.0625206},\n{\"type\":32, \"data\":[136,350,8],\"color\":[200,197,177,128],\"score\":0.0625053},\n{\"type\":32, \"data\":[330,307,2],\"color\":[49,53,9,128],\"score\":0.0624855},\n{\"type\":32, \"data\":[328,71,3],\"color\":[149,112,98,128],\"score\":0.0624688},\n{\"type\":32, \"data\":[329,459,12],\"color\":[28,39,6,128],\"score\":0.0624523},\n{\"type\":32, \"data\":[40,296,3],\"color\":[223,216,212,128],\"score\":0.06243},\n{\"type\":32, \"data\":[77,30,10],\"color\":[152,144,177,128],\"score\":0.0624126},\n{\"type\":32, \"data\":[143,143,4],\"color\":[71,48,0,128],\"score\":0.0623931},\n{\"type\":32, \"data\":[351,454,9],\"color\":[86,88,13,128],\"score\":0.0623798},\n{\"type\":32, \"data\":[26,243,9],\"color\":[103,109,35,128],\"score\":0.0623629},\n{\"type\":32, \"data\":[307,2,11],\"color\":[193,167,162,128],\"score\":0.0623451},\n{\"type\":32, \"data\":[109,418,4],\"color\":[210,197,163,128],\"score\":0.0623281},\n{\"type\":32, \"data\":[344,5,2],\"color\":[214,187,216,128],\"score\":0.0623101},\n{\"type\":32, \"data\":[151,259,6],\"color\":[217,221,222,128],\"score\":0.0622956},\n{\"type\":32, \"data\":[56,23,8],\"color\":[56,63,11,128],\"score\":0.0622779},\n{\"type\":32, \"data\":[56,38,5],\"color\":[170,160,188,128],\"score\":0.0622619},\n{\"type\":32, \"data\":[75,179,4],\"color\":[188,150,135,128],\"score\":0.0622454},\n{\"type\":32, \"data\":[308,400,3],\"color\":[118,125,99,128],\"score\":0.062227},\n{\"type\":32, \"data\":[204,171,6],\"color\":[247,255,242,128],\"score\":0.0622079},\n{\"type\":32, \"data\":[24,266,8],\"color\":[100,125,73,128],\"score\":0.0621905},\n{\"type\":32, \"data\":[229,95,7],\"color\":[243,202,139,128],\"score\":0.0621749},\n{\"type\":32, \"data\":[320,172,4],\"color\":[161,136,101,128],\"score\":0.0621557},\n{\"type\":32, \"data\":[118,177,7],\"color\":[142,113,86,128],\"score\":0.0621387},\n{\"type\":32, \"data\":[94,299,3],\"color\":[148,145,111,128],\"score\":0.0621205},\n{\"type\":32, \"data\":[80,473,4],\"color\":[219,157,88,128],\"score\":0.0621034},\n{\"type\":32, \"data\":[351,409,20],\"color\":[77,74,7,128],\"score\":0.0620898},\n{\"type\":32, \"data\":[2,114,14],\"color\":[75,70,57,128],\"score\":0.0620734},\n{\"type\":32, \"data\":[343,46,2],\"color\":[235,156,135,128],\"score\":0.062055},\n{\"type\":32, \"data\":[231,121,3],\"color\":[209,135,125,128],\"score\":0.0620368},\n{\"type\":32, \"data\":[173,67,8],\"color\":[177,97,97,128],\"score\":0.0620206},\n{\"type\":32, \"data\":[248,361,6],\"color\":[116,113,44,128],\"score\":0.0620025},\n{\"type\":32, \"data\":[285,227,2],\"color\":[200,199,159,128],\"score\":0.0619826},\n{\"type\":32, \"data\":[43,329,15],\"color\":[211,208,198,128],\"score\":0.0619638},\n{\"type\":32, \"data\":[0,358,8],\"color\":[95,90,35,128],\"score\":0.0619479},\n{\"type\":32, \"data\":[170,184,3],\"color\":[246,201,216,128],\"score\":0.0619323},\n{\"type\":32, \"data\":[154,50,7],\"color\":[77,76,27,128],\"score\":0.0619121},\n{\"type\":32, \"data\":[283,330,4],\"color\":[44,49,0,128],\"score\":0.0618972},\n{\"type\":32, \"data\":[224,437,5],\"color\":[144,114,94,128],\"score\":0.0618792},\n{\"type\":32, \"data\":[350,171,3],\"color\":[236,202,243,128],\"score\":0.0618623},\n{\"type\":32, \"data\":[221,3,3],\"color\":[147,148,136,128],\"score\":0.0618444},\n{\"type\":32, \"data\":[41,284,5],\"color\":[98,89,33,128],\"score\":0.0618292},\n{\"type\":32, \"data\":[130,0,6],\"color\":[248,243,241,128],\"score\":0.0618079},\n{\"type\":32, \"data\":[107,164,4],\"color\":[134,131,103,128],\"score\":0.0617906},\n{\"type\":32, \"data\":[205,162,3],\"color\":[205,134,133,128],\"score\":0.061775},\n{\"type\":32, \"data\":[103,13,6],\"color\":[239,230,187,128],\"score\":0.0617569},\n{\"type\":32, \"data\":[9,295,6],\"color\":[83,77,44,128],\"score\":0.0617413},\n{\"type\":32, \"data\":[70,505,13],\"color\":[66,84,0,128],\"score\":0.0617267},\n{\"type\":32, \"data\":[18,408,2],\"color\":[242,197,189,128],\"score\":0.0617093},\n{\"type\":32, \"data\":[317,161,7],\"color\":[82,61,20,128],\"score\":0.0616939},\n{\"type\":32, \"data\":[218,32,1],\"color\":[240,198,173,128],\"score\":0.0616768},\n{\"type\":32, \"data\":[262,192,11],\"color\":[113,110,25,128],\"score\":0.0616612},\n{\"type\":32, \"data\":[227,9,6],\"color\":[53,50,2,128],\"score\":0.061642},\n{\"type\":32, \"data\":[264,178,4],\"color\":[212,194,216,128],\"score\":0.0616248},\n{\"type\":32, \"data\":[253,308,9],\"color\":[77,80,7,128],\"score\":0.0616091},\n{\"type\":32, \"data\":[282,6,5],\"color\":[116,98,86,128],\"score\":0.0615919},\n{\"type\":32, \"data\":[224,317,4],\"color\":[46,68,0,128],\"score\":0.061574},\n{\"type\":32, \"data\":[156,190,4],\"color\":[254,255,225,128],\"score\":0.0615577},\n{\"type\":32, \"data\":[136,385,8],\"color\":[133,101,88,128],\"score\":0.0615432},\n{\"type\":32, \"data\":[324,233,1],\"color\":[255,249,213,128],\"score\":0.0615266},\n{\"type\":32, \"data\":[118,377,11],\"color\":[178,164,144,128],\"score\":0.061512},\n{\"type\":32, \"data\":[232,68,9],\"color\":[96,60,13,128],\"score\":0.0614963},\n{\"type\":32, \"data\":[102,431,4],\"color\":[117,91,59,128],\"score\":0.0614813},\n{\"type\":32, \"data\":[342,104,5],\"color\":[151,142,98,128],\"score\":0.0614648},\n{\"type\":32, \"data\":[249,100,4],\"color\":[33,30,0,128],\"score\":0.0614479},\n{\"type\":32, \"data\":[199,187,11],\"color\":[204,123,160,128],\"score\":0.061431},\n{\"type\":32, \"data\":[179,455,4],\"color\":[142,118,48,128],\"score\":0.0614165},\n{\"type\":32, \"data\":[248,267,3],\"color\":[143,133,107,128],\"score\":0.0614016},\n{\"type\":32, \"data\":[152,184,4],\"color\":[120,114,28,128],\"score\":0.0613851},\n{\"type\":32, \"data\":[7,267,4],\"color\":[80,121,51,128],\"score\":0.0613675},\n{\"type\":32, \"data\":[72,405,6],\"color\":[220,208,184,128],\"score\":0.0613528},\n{\"type\":32, \"data\":[40,42,4],\"color\":[176,162,185,128],\"score\":0.0613371},\n{\"type\":32, \"data\":[119,317,4],\"color\":[211,200,204,128],\"score\":0.0613223},\n{\"type\":32, \"data\":[84,230,5],\"color\":[93,86,21,128],\"score\":0.0613066},\n{\"type\":32, \"data\":[32,215,1],\"color\":[255,224,249,128],\"score\":0.061292},\n{\"type\":32, \"data\":[188,455,5],\"color\":[20,36,6,128],\"score\":0.0612773},\n{\"type\":32, \"data\":[89,219,10],\"color\":[121,108,21,128],\"score\":0.0612634},\n{\"type\":32, \"data\":[122,340,4],\"color\":[136,113,77,128],\"score\":0.0612482},\n{\"type\":32, \"data\":[132,511,23],\"color\":[77,88,1,128],\"score\":0.0612345},\n{\"type\":32, \"data\":[41,218,2],\"color\":[202,198,171,128],\"score\":0.0612197},\n{\"type\":32, \"data\":[330,280,5],\"color\":[127,120,71,128],\"score\":0.0612044},\n{\"type\":32, \"data\":[247,49,2],\"color\":[232,146,71,128],\"score\":0.061186},\n{\"type\":32, \"data\":[153,241,12],\"color\":[219,219,215,128],\"score\":0.0611707},\n{\"type\":32, \"data\":[68,319,8],\"color\":[175,166,145,128],\"score\":0.0611558},\n{\"type\":32, \"data\":[287,302,12],\"color\":[77,90,0,128],\"score\":0.06114},\n{\"type\":32, \"data\":[173,434,6],\"color\":[68,58,0,128],\"score\":0.0611263},\n{\"type\":32, \"data\":[211,155,8],\"color\":[234,239,213,128],\"score\":0.0611102},\n{\"type\":32, \"data\":[87,501,2],\"color\":[206,195,191,128],\"score\":0.0610943},\n{\"type\":32, \"data\":[273,129,10],\"color\":[113,111,18,128],\"score\":0.0610807},\n{\"type\":32, \"data\":[210,218,3],\"color\":[213,223,209,128],\"score\":0.0610651},\n{\"type\":32, \"data\":[104,252,7],\"color\":[192,189,166,128],\"score\":0.0610509},\n{\"type\":32, \"data\":[17,191,5],\"color\":[205,185,218,128],\"score\":0.0610365},\n{\"type\":32, \"data\":[198,22,4],\"color\":[122,105,37,128],\"score\":0.0610236},\n{\"type\":32, \"data\":[239,421,10],\"color\":[41,31,1,128],\"score\":0.0610076},\n{\"type\":32, \"data\":[21,83,11],\"color\":[140,96,82,128],\"score\":0.0609924},\n{\"type\":32, \"data\":[334,19,15],\"color\":[84,74,14,128],\"score\":0.06098},\n{\"type\":32, \"data\":[75,327,4],\"color\":[235,243,229,128],\"score\":0.0609622},\n{\"type\":32, \"data\":[142,400,5],\"color\":[169,145,133,128],\"score\":0.0609483},\n{\"type\":32, \"data\":[176,158,3],\"color\":[248,255,228,128],\"score\":0.0609337},\n{\"type\":32, \"data\":[259,261,10],\"color\":[74,61,11,128],\"score\":0.0609174},\n{\"type\":32, \"data\":[303,488,17],\"color\":[35,28,3,128],\"score\":0.0609045},\n{\"type\":32, \"data\":[280,400,3],\"color\":[163,165,137,128],\"score\":0.0608891},\n{\"type\":32, \"data\":[293,210,3],\"color\":[201,181,104,128],\"score\":0.0608721},\n{\"type\":32, \"data\":[168,231,4],\"color\":[209,200,148,128],\"score\":0.0608561},\n{\"type\":32, \"data\":[59,47,5],\"color\":[54,57,23,128],\"score\":0.0608413},\n{\"type\":32, \"data\":[38,364,11],\"color\":[87,91,39,128],\"score\":0.0608236},\n{\"type\":32, \"data\":[65,38,3],\"color\":[97,73,55,128],\"score\":0.0608089},\n{\"type\":32, \"data\":[306,511,16],\"color\":[67,51,8,128],\"score\":0.0607941},\n{\"type\":32, \"data\":[180,213,1],\"color\":[0,0,0,128],\"score\":0.0607787},\n{\"type\":32, \"data\":[167,466,5],\"color\":[136,133,116,128],\"score\":0.060765},\n{\"type\":32, \"data\":[104,381,4],\"color\":[129,99,72,128],\"score\":0.0607513},\n{\"type\":32, \"data\":[233,452,7],\"color\":[110,93,31,128],\"score\":0.0607362},\n{\"type\":32, \"data\":[233,435,6],\"color\":[135,98,55,128],\"score\":0.0607215},\n{\"type\":32, \"data\":[201,73,6],\"color\":[255,165,119,128],\"score\":0.0607054},\n{\"type\":32, \"data\":[94,372,8],\"color\":[196,183,181,128],\"score\":0.0606915},\n{\"type\":32, \"data\":[274,434,19],\"color\":[59,53,7,128],\"score\":0.0606778},\n{\"type\":32, \"data\":[192,56,4],\"color\":[107,49,23,128],\"score\":0.0606625},\n{\"type\":32, \"data\":[341,321,2],\"color\":[210,202,203,128],\"score\":0.0606388},\n{\"type\":32, \"data\":[345,236,2],\"color\":[205,186,162,128],\"score\":0.0606232},\n{\"type\":32, \"data\":[129,160,5],\"color\":[187,181,170,128],\"score\":0.060609},\n{\"type\":32, \"data\":[123,469,9],\"color\":[94,73,6,128],\"score\":0.0605955},\n{\"type\":32, \"data\":[44,85,7],\"color\":[142,116,102,128],\"score\":0.0605792},\n{\"type\":32, \"data\":[340,345,13],\"color\":[89,87,11,128],\"score\":0.0605655},\n{\"type\":32, \"data\":[329,204,7],\"color\":[153,140,54,128],\"score\":0.0605518},\n{\"type\":32, \"data\":[59,423,4],\"color\":[89,50,43,128],\"score\":0.060538},\n{\"type\":32, \"data\":[317,473,10],\"color\":[11,13,2,128],\"score\":0.0605235},\n{\"type\":32, \"data\":[303,434,9],\"color\":[14,28,2,128],\"score\":0.060509},\n{\"type\":32, \"data\":[218,329,7],\"color\":[64,74,0,128],\"score\":0.0604942},\n{\"type\":32, \"data\":[68,426,6],\"color\":[157,102,122,128],\"score\":0.0604787},\n{\"type\":32, \"data\":[241,281,2],\"color\":[219,156,143,128],\"score\":0.0604611},\n{\"type\":32, \"data\":[182,110,2],\"color\":[160,142,124,128],\"score\":0.060445},\n{\"type\":32, \"data\":[48,8,4],\"color\":[129,114,124,128],\"score\":0.0604301},\n{\"type\":32, \"data\":[217,115,6],\"color\":[254,240,185,128],\"score\":0.0604142},\n{\"type\":32, \"data\":[265,478,4],\"color\":[119,53,6,128],\"score\":0.060399},\n{\"type\":32, \"data\":[341,125,4],\"color\":[189,149,94,128],\"score\":0.060385},\n{\"type\":32, \"data\":[291,65,3],\"color\":[225,151,102,128],\"score\":0.0603697},\n{\"type\":32, \"data\":[102,422,4],\"color\":[124,100,52,128],\"score\":0.0603556},\n{\"type\":32, \"data\":[208,38,2],\"color\":[206,153,165,128],\"score\":0.0603425},\n{\"type\":32, \"data\":[59,121,15],\"color\":[131,134,62,128],\"score\":0.0603288},\n{\"type\":32, \"data\":[58,379,10],\"color\":[144,79,93,128],\"score\":0.0603161},\n{\"type\":32, \"data\":[39,242,1],\"color\":[255,255,243,128],\"score\":0.0603016},\n{\"type\":32, \"data\":[150,426,9],\"color\":[128,112,75,128],\"score\":0.0602869},\n{\"type\":32, \"data\":[262,288,2],\"color\":[190,168,132,128],\"score\":0.0602705},\n{\"type\":32, \"data\":[200,82,3],\"color\":[231,104,53,128],\"score\":0.0602546},\n{\"type\":32, \"data\":[62,180,3],\"color\":[187,159,155,128],\"score\":0.0602354},\n{\"type\":32, \"data\":[135,169,5],\"color\":[105,90,28,128],\"score\":0.0602223},\n{\"type\":32, \"data\":[193,323,10],\"color\":[132,124,101,128],\"score\":0.0602078},\n{\"type\":32, \"data\":[58,5,3],\"color\":[209,203,214,128],\"score\":0.0601945},\n{\"type\":32, \"data\":[208,8,3],\"color\":[161,135,110,128],\"score\":0.0601806},\n{\"type\":32, \"data\":[259,366,7],\"color\":[49,53,11,128],\"score\":0.0601662},\n{\"type\":32, \"data\":[194,379,9],\"color\":[122,111,83,128],\"score\":0.060153},\n{\"type\":32, \"data\":[229,323,2],\"color\":[213,167,153,128],\"score\":0.0601382},\n{\"type\":32, \"data\":[95,324,9],\"color\":[220,222,225,128],\"score\":0.0601248},\n{\"type\":32, \"data\":[116,309,3],\"color\":[131,114,96,128],\"score\":0.0601118},\n{\"type\":32, \"data\":[293,246,13],\"color\":[98,88,1,128],\"score\":0.0600976},\n{\"type\":32, \"data\":[96,436,4],\"color\":[171,166,145,128],\"score\":0.0600842},\n{\"type\":32, \"data\":[301,77,14],\"color\":[93,68,19,128],\"score\":0.0600679},\n{\"type\":32, \"data\":[33,491,14],\"color\":[72,77,4,128],\"score\":0.0600555},\n{\"type\":32, \"data\":[208,211,4],\"color\":[95,82,50,128],\"score\":0.0600427},\n{\"type\":32, \"data\":[240,33,4],\"color\":[59,55,0,128],\"score\":0.060028},\n{\"type\":32, \"data\":[250,41,4],\"color\":[72,52,0,128],\"score\":0.0600147},\n{\"type\":32, \"data\":[177,466,7],\"color\":[104,78,1,128],\"score\":0.0599998},\n{\"type\":32, \"data\":[169,196,3],\"color\":[97,92,52,128],\"score\":0.0599856},\n{\"type\":32, \"data\":[279,185,11],\"color\":[102,94,26,128],\"score\":0.0599731},\n{\"type\":32, \"data\":[160,173,2],\"color\":[241,254,255,128],\"score\":0.0599577},\n{\"type\":32, \"data\":[102,60,13],\"color\":[80,70,15,128],\"score\":0.0599439},\n{\"type\":32, \"data\":[205,87,5],\"color\":[255,187,141,128],\"score\":0.0599308},\n{\"type\":32, \"data\":[228,497,3],\"color\":[187,152,137,128],\"score\":0.0599169},\n{\"type\":32, \"data\":[221,159,3],\"color\":[136,142,77,128],\"score\":0.059902},\n{\"type\":32, \"data\":[161,90,3],\"color\":[217,185,173,128],\"score\":0.0598882},\n{\"type\":32, \"data\":[282,323,4],\"color\":[167,139,106,128],\"score\":0.0598733},\n{\"type\":32, \"data\":[24,357,2],\"color\":[250,242,230,128],\"score\":0.0598601},\n{\"type\":32, \"data\":[144,280,4],\"color\":[244,245,229,128],\"score\":0.0598468},\n{\"type\":32, \"data\":[150,328,5],\"color\":[138,148,119,128],\"score\":0.0598333},\n{\"type\":32, \"data\":[11,197,5],\"color\":[199,153,140,128],\"score\":0.0598174},\n{\"type\":32, \"data\":[345,328,6],\"color\":[76,79,40,128],\"score\":0.0598024},\n{\"type\":32, \"data\":[49,424,4],\"color\":[177,115,142,128],\"score\":0.059789},\n{\"type\":32, \"data\":[133,185,4],\"color\":[102,106,0,128],\"score\":0.0597763},\n{\"type\":32, \"data\":[125,269,10],\"color\":[206,200,190,128],\"score\":0.0597635},\n{\"type\":32, \"data\":[20,234,2],\"color\":[207,184,185,128],\"score\":0.0597496},\n{\"type\":32, \"data\":[332,435,4],\"color\":[140,135,106,128],\"score\":0.0597356},\n{\"type\":32, \"data\":[158,29,9],\"color\":[83,70,0,128],\"score\":0.0597233},\n{\"type\":32, \"data\":[334,43,1],\"color\":[255,229,208,128],\"score\":0.0597043},\n{\"type\":32, \"data\":[120,45,2],\"color\":[174,158,212,128],\"score\":0.0596887},\n{\"type\":32, \"data\":[178,230,5],\"color\":[146,79,55,128],\"score\":0.0596756},\n{\"type\":32, \"data\":[75,335,2],\"color\":[150,69,79,128],\"score\":0.0596621},\n{\"type\":32, \"data\":[217,446,5],\"color\":[27,28,0,128],\"score\":0.0596489},\n{\"type\":32, \"data\":[255,177,5],\"color\":[225,207,207,128],\"score\":0.0596346},\n{\"type\":32, \"data\":[100,304,6],\"color\":[232,229,226,128],\"score\":0.0596227},\n{\"type\":32, \"data\":[47,177,9],\"color\":[150,100,61,128],\"score\":0.0596101},\n{\"type\":32, \"data\":[205,268,5],\"color\":[211,209,195,128],\"score\":0.0595983},\n{\"type\":32, \"data\":[167,355,12],\"color\":[154,122,104,128],\"score\":0.0595856},\n{\"type\":32, \"data\":[321,307,3],\"color\":[74,82,0,128],\"score\":0.0595682},\n{\"type\":32, \"data\":[306,18,3],\"color\":[167,155,91,128],\"score\":0.0595561},\n{\"type\":32, \"data\":[195,273,4],\"color\":[171,160,124,128],\"score\":0.059543},\n{\"type\":32, \"data\":[251,32,2],\"color\":[232,201,175,128],\"score\":0.0595264},\n{\"type\":32, \"data\":[239,38,2],\"color\":[223,179,137,128],\"score\":0.0595098},\n{\"type\":32, \"data\":[310,218,3],\"color\":[148,122,125,128],\"score\":0.0594964},\n{\"type\":32, \"data\":[224,190,10],\"color\":[192,112,143,128],\"score\":0.0594847},\n{\"type\":32, \"data\":[180,294,4],\"color\":[159,149,92,128],\"score\":0.0594722},\n{\"type\":32, \"data\":[226,379,1],\"color\":[211,194,177,128],\"score\":0.0594597},\n{\"type\":32, \"data\":[234,497,5],\"color\":[54,49,7,128],\"score\":0.0594453},\n{\"type\":32, \"data\":[106,149,8],\"color\":[192,180,156,128],\"score\":0.0594323},\n{\"type\":32, \"data\":[169,204,2],\"color\":[238,236,230,128],\"score\":0.0594179},\n{\"type\":32, \"data\":[35,333,4],\"color\":[148,164,168,128],\"score\":0.0594046},\n{\"type\":32, \"data\":[165,416,2],\"color\":[0,8,0,128],\"score\":0.0593907},\n{\"type\":32, \"data\":[21,421,9],\"color\":[89,96,29,128],\"score\":0.0593783},\n{\"type\":32, \"data\":[147,163,8],\"color\":[112,94,20,128],\"score\":0.0593669},\n{\"type\":32, \"data\":[196,427,6],\"color\":[128,77,16,128],\"score\":0.0593548},\n{\"type\":32, \"data\":[188,173,7],\"color\":[203,120,155,128],\"score\":0.0593422},\n{\"type\":32, \"data\":[183,329,8],\"color\":[138,146,129,128],\"score\":0.0593311},\n{\"type\":32, \"data\":[170,330,3],\"color\":[212,202,205,128],\"score\":0.059317},\n{\"type\":32, \"data\":[167,254,6],\"color\":[169,149,123,128],\"score\":0.0593052},\n{\"type\":32, \"data\":[208,395,5],\"color\":[119,117,95,128],\"score\":0.0592893},\n{\"type\":32, \"data\":[183,232,1],\"color\":[244,255,246,128],\"score\":0.0592761},\n{\"type\":32, \"data\":[347,14,2],\"color\":[158,143,152,128],\"score\":0.0592589},\n{\"type\":32, \"data\":[242,499,2],\"color\":[205,194,193,128],\"score\":0.0592455},\n{\"type\":32, \"data\":[160,10,2],\"color\":[140,106,49,128],\"score\":0.0592302},\n{\"type\":32, \"data\":[211,1,5],\"color\":[81,59,0,128],\"score\":0.0592189},\n{\"type\":32, \"data\":[221,255,6],\"color\":[144,138,133,128],\"score\":0.059206},\n{\"type\":32, \"data\":[183,223,3],\"color\":[97,65,25,128],\"score\":0.0591914},\n{\"type\":32, \"data\":[284,216,3],\"color\":[163,149,106,128],\"score\":0.0591786},\n{\"type\":32, \"data\":[205,131,2],\"color\":[191,108,114,128],\"score\":0.0591644},\n{\"type\":32, \"data\":[275,44,16],\"color\":[90,71,21,128],\"score\":0.0591517},\n{\"type\":32, \"data\":[242,489,9],\"color\":[57,63,3,128],\"score\":0.059139},\n{\"type\":32, \"data\":[56,394,11],\"color\":[155,86,109,128],\"score\":0.0591281},\n{\"type\":32, \"data\":[328,268,8],\"color\":[76,75,1,128],\"score\":0.0591149},\n{\"type\":32, \"data\":[209,290,8],\"color\":[123,115,90,128],\"score\":0.0591023},\n{\"type\":32, \"data\":[104,389,4],\"color\":[136,103,71,128],\"score\":0.0590904},\n{\"type\":32, \"data\":[92,290,4],\"color\":[238,255,244,128],\"score\":0.0590773},\n{\"type\":32, \"data\":[351,481,14],\"color\":[71,47,2,128],\"score\":0.0590666},\n{\"type\":32, \"data\":[89,152,7],\"color\":[231,231,217,128],\"score\":0.0590545},\n{\"type\":32, \"data\":[283,169,2],\"color\":[186,173,129,128],\"score\":0.0590415},\n{\"type\":32, \"data\":[0,424,16],\"color\":[83,89,25,128],\"score\":0.0590293},\n{\"type\":32, \"data\":[351,289,12],\"color\":[108,103,53,128],\"score\":0.0590191},\n{\"type\":32, \"data\":[72,12,1],\"color\":[56,33,23,128],\"score\":0.0590037},\n{\"type\":32, \"data\":[348,260,6],\"color\":[123,127,62,128],\"score\":0.0589923},\n{\"type\":32, \"data\":[16,256,2],\"color\":[248,241,226,128],\"score\":0.0589761},\n{\"type\":32, \"data\":[139,34,10],\"color\":[71,75,10,128],\"score\":0.0589643},\n{\"type\":32, \"data\":[322,325,5],\"color\":[50,60,9,128],\"score\":0.0589517},\n{\"type\":32, \"data\":[110,136,4],\"color\":[212,213,194,128],\"score\":0.058939},\n{\"type\":32, \"data\":[132,44,4],\"color\":[122,116,118,128],\"score\":0.0589244},\n{\"type\":32, \"data\":[84,180,3],\"color\":[244,182,159,128],\"score\":0.0589122},\n{\"type\":32, \"data\":[274,156,11],\"color\":[105,89,4,128],\"score\":0.0588996},\n{\"type\":32, \"data\":[170,450,6],\"color\":[128,108,58,128],\"score\":0.0588876},\n{\"type\":32, \"data\":[232,329,3],\"color\":[71,73,0,128],\"score\":0.0588758},\n{\"type\":32, \"data\":[222,73,4],\"color\":[214,135,75,128],\"score\":0.0588644},\n{\"type\":32, \"data\":[144,152,3],\"color\":[169,160,172,128],\"score\":0.0588512},\n{\"type\":32, \"data\":[284,462,9],\"color\":[30,19,6,128],\"score\":0.0588396},\n{\"type\":32, \"data\":[175,15,2],\"color\":[177,146,137,128],\"score\":0.0588257},\n{\"type\":32, \"data\":[32,349,3],\"color\":[121,135,143,128],\"score\":0.0588136},\n{\"type\":32, \"data\":[45,47,3],\"color\":[17,38,0,128],\"score\":0.0587994},\n{\"type\":32, \"data\":[214,382,6],\"color\":[139,128,107,128],\"score\":0.0587869},\n{\"type\":32, \"data\":[38,380,9],\"color\":[59,71,23,128],\"score\":0.0587738},\n{\"type\":32, \"data\":[258,365,2],\"color\":[168,155,107,128],\"score\":0.0587578},\n{\"type\":32, \"data\":[243,310,5],\"color\":[64,73,0,128],\"score\":0.0587458},\n{\"type\":32, \"data\":[295,5,2],\"color\":[83,60,39,128],\"score\":0.0587302},\n{\"type\":32, \"data\":[322,338,9],\"color\":[105,95,24,128],\"score\":0.0587196},\n{\"type\":32, \"data\":[211,121,2],\"color\":[180,60,74,128],\"score\":0.0587068},\n{\"type\":32, \"data\":[287,475,2],\"color\":[155,144,78,128],\"score\":0.058696},\n{\"type\":32, \"data\":[295,204,2],\"color\":[210,208,118,128],\"score\":0.0586837},\n{\"type\":32, \"data\":[132,283,3],\"color\":[165,140,81,128],\"score\":0.0586717},\n{\"type\":32, \"data\":[213,424,5],\"color\":[133,97,68,128],\"score\":0.0586601},\n{\"type\":32, \"data\":[240,207,4],\"color\":[138,130,130,128],\"score\":0.0586485},\n{\"type\":32, \"data\":[26,306,2],\"color\":[234,175,184,128],\"score\":0.0586344},\n{\"type\":32, \"data\":[104,129,5],\"color\":[135,143,78,128],\"score\":0.0586226},\n{\"type\":32, \"data\":[192,212,5],\"color\":[151,117,146,128],\"score\":0.0586109},\n{\"type\":32, \"data\":[221,166,3],\"color\":[233,239,188,128],\"score\":0.0585994},\n{\"type\":32, \"data\":[127,146,4],\"color\":[104,77,37,128],\"score\":0.0585869},\n{\"type\":32, \"data\":[351,388,7],\"color\":[121,103,31,128],\"score\":0.0585747},\n{\"type\":32, \"data\":[102,209,10],\"color\":[107,100,22,128],\"score\":0.0585618},\n{\"type\":32, \"data\":[212,28,5],\"color\":[47,47,0,128],\"score\":0.0585506},\n{\"type\":32, \"data\":[83,91,4],\"color\":[81,66,0,128],\"score\":0.0585391},\n{\"type\":32, \"data\":[284,316,2],\"color\":[226,190,156,128],\"score\":0.0585268},\n{\"type\":32, \"data\":[85,422,6],\"color\":[182,188,179,128],\"score\":0.0585139}\n]}";
Main.demoUrl = "https://tweenoptimizer.geometrize.co.uk/";
Main.scoreText = window.document.getElementById("scoretext");
Main.optimizationPassesText = window.document.getElementById("optimizationpassestext");
Main.rendererContainer = window.document.getElementById("shapecanvascontainer");
Main.stepButton = window.document.getElementById("stepbutton");
Main.resetButton = window.document.getElementById("resetbutton");
Main.generalErrorsText = window.document.getElementById("generalerrors");
Main.costFunctionTextArea = window.document.getElementById("costfunctiontextedit");
Main.costFunctionPresetSelect = window.document.getElementById("costfunctionpresets");
Main.costFunctionErrorsText = window.document.getElementById("costfunctionerrors");
Main.optimizationFunctionTextArea = window.document.getElementById("optimizefunctiontextedit");
Main.optimizationFunctionPresetSelect = window.document.getElementById("optimizefunctionspresets");
Main.optimizationFunctionErrorsText = window.document.getElementById("optimizationfunctionerrors");
Main.datasetOnePresetSelect = window.document.getElementById("datasetonepresets");
Main.datasetOneTextArea = window.document.getElementById("datasetonetextedit");
Main.datasetOneErrorsText = window.document.getElementById("datasetoneerrors");
Main.datasetTwoPresetSelect = window.document.getElementById("datasettwopresets");
Main.datasetTwoTextArea = window.document.getElementById("datasettwotextedit");
Main.datasetTwoErrorsText = window.document.getElementById("datasettwoerrors");
Main.resultsDataTextArea = window.document.getElementById("resultsdatatextedit");
haxe_SysTools.winMetaCharacters = [32,40,41,37,33,94,34,60,62,38,124,10,13,44,59];
StringTools.winMetaCharacters = haxe_SysTools.winMetaCharacters;
StringTools.MIN_SURROGATE_CODE_POINT = 65536;
motion_actuators_SimpleActuator.actuators = [];
motion_actuators_SimpleActuator.actuatorsLength = 0;
motion_actuators_SimpleActuator.addedEvent = false;
motion_easing_Expo.easeIn = new motion_easing__$Expo_ExpoEaseIn();
motion_easing_Expo.easeInOut = new motion_easing__$Expo_ExpoEaseInOut();
motion_easing_Expo.easeOut = new motion_easing__$Expo_ExpoEaseOut();
motion_Actuate.defaultActuator = motion_actuators_SimpleActuator;
motion_Actuate.defaultEase = motion_easing_Expo.easeOut;
motion_Actuate.targetLibraries = new haxe_ds_ObjectMap();
motion_easing_Quad.easeIn = new motion_easing__$Quad_QuadEaseIn();
motion_easing_Quad.easeInOut = new motion_easing__$Quad_QuadEaseInOut();
motion_easing_Quad.easeOut = new motion_easing__$Quad_QuadEaseOut();
util_ColorHelpers.TRANSPARENT = 0;
util_ColorHelpers.WHITE = -1;
util_ColorHelpers.GRAY = -8355712;
util_ColorHelpers.BLACK = -16777216;
util_ColorHelpers.GREEN = -16744448;
util_ColorHelpers.LIME = -16711936;
util_ColorHelpers.YELLOW = -256;
util_ColorHelpers.ORANGE = -23296;
util_ColorHelpers.RED = -65536;
util_ColorHelpers.PURPLE = -8388480;
util_ColorHelpers.BLUE = -16776961;
util_ColorHelpers.BROWN = -7650029;
util_ColorHelpers.PINK = -16181;
util_ColorHelpers.MAGENTA = -65281;
util_ColorHelpers.CYAN = -16711681;
util_ColorHelpers.COLOR_REGEX = new EReg("^(0x|#)(([A-F0-9]{2}){3,4})$","i");
util_FlxColor.TRANSPARENT = 0;
util_FlxColor.WHITE = -1;
util_FlxColor.GRAY = -8355712;
util_FlxColor.BLACK = -16777216;
util_FlxColor.GREEN = -16744448;
util_FlxColor.LIME = -16711936;
util_FlxColor.YELLOW = -256;
util_FlxColor.ORANGE = -23296;
util_FlxColor.RED = -65536;
util_FlxColor.PURPLE = -8388480;
util_FlxColor.BLUE = -16776961;
util_FlxColor.BROWN = -7650029;
util_FlxColor.PINK = -16181;
util_FlxColor.MAGENTA = -65281;
util_FlxColor.CYAN = -16711681;
util_FlxColor.COLOR_REGEX = new EReg("^(0x|#)(([A-F0-9]{2}){3,4})$","i");
Main.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);