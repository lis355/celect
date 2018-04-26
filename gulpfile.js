'use strict';

const args = require("args-parser")(process.argv);
const tasks = require("./gulp-tasks-def");

const options = {
	sourceFolder: "src/",
	destinationFolder: "dest/"
};

options.DEBUG = args["debug"] === true;
if (options.DEBUG)
	console.log("DEBUG build");

tasks.defineTasks([
	"buildcss",
	"buildhtml",
	"buildjs",
	"buildmanifest",
	"clear",
	"incbuild",
	"build",
	"watch",
	"dev",
	"default"
], options);
