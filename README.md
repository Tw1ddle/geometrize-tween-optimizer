[![Project logo](https://github.com/Tw1ddle/geometrize-tween-optimizer/blob/master/screenshots/logo.png?raw=true "Geometrize Tween Optimizer Project logo")](https://www.geometrize.co.uk/)

[![License](https://img.shields.io/:license-mit-blue.svg?style=flat-square)](https://github.com/Tw1ddle/geometrize-tween-optimizer/blob/master/LICENSE)
[![Geometrize Tween Optimizer Build Status](https://ci.appveyor.com/api/projects/status/github/Tw1ddle/geometrize-tween-optimizer)](https://ci.appveyor.com/project/Tw1ddle/geometrize-tween-optimizer)

A utility for creating appealing tweening animations between sets of shapes. Run it now [in your browser](https://tweenoptimizer.geometrize.co.uk/).

Made for use with shapes exported from [Geometrize](https://www.geometrize.co.uk/), a tool for recreating images using geometric primitives.

[![Geometrized Tween Example](https://github.com/Tw1ddle/geometrize-tween-optimizer/blob/master/screenshots/example_tween.gif?raw=true "Geometrized Tween Example")](https://www.geometrize.co.uk/)

# Features
 * Create visually appealing transitions between collections of shapes.
 * Edit the core algorithm interactively via on-page script textedits.
 * Save mappings between sets of shape data for use elsewhere.
 * View the shapes tweening in realtime.

# Usage
 * Open up the [demo](https://tweenoptimizer.geometrize.co.uk/) and inspect the sample shape data and optimization code.
 * Use different shape data by pasting Geometrize shape data JSON into the "Dataset" text areas.
 * Edit the optimization code via the "cost function" and "optimization function" text areas.
 
If you extend this code, remember that you must disable dead code elimination (''-dce no'' in the build .hxml), or else mark things you expose to the scripting engine with the ''@:keep'' annotation.

Also remember that you can't expose abstracts to hscript. One workaround is to write a wrapper for your abstract that exposes the functions you need to hscript.

# Notes
 * Created by [Sam Twidale](https://github.com/Tw1ddle) and [Joe Williamson](https://github.com/JoeCreates/).
 * Written using [Haxe](https://github.com/HaxeFoundation/haxe), [hscript](https://github.com/HaxeFoundation/hscript), [cloner](https://github.com/thomasuster/cloner) and utilities from [HaxeFlixel](https://github.com/HaxeFlixel/flixel).