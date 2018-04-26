'use strict';

const gulp = require("gulp");
const args = require("args-parser")(process.argv);
const enumerable = require("linq");

const options = {
	sourceFolder: "src/",
	destinationFolder: "dest/"
};

options.allTemplate = "**/*";

options.cssExtension = ".css";
options.cssSourceFolder = options.sourceFolder + "css";
options.cssAllPaths = options.sourceFolder + options.allTemplate + options.cssExtension;
options.cssMinName = "style.min.css";
options.cssDestinationFolder = options.destinationFolder + "/css";

options.htmlExtension = ".html";
options.htmlSourceFolder = options.sourceFolder + "html";
options.htmlAllPaths = options.sourceFolder + options.allTemplate + options.htmlExtension;
options.htmlDestinationFolder = options.destinationFolder;

options.jsExtension = ".js";
options.jsSourceFolder = options.sourceFolder + "js";
options.jsAllPaths = options.sourceFolder + options.allTemplate + options.jsExtension;
options.jsEntries = ["vk_inject.js", "code2.js"];
options.jsCommonBundlePath = "common.js";
options.jsDestinationFolder = options.destinationFolder + "/js";

options.manifestSourceFolder = options.sourceFolder + "manifest.json";
options.manifestDestinationFolder = options.destinationFolder;

let tasksList = [
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
];

function defineTasks(tasksList) {
	function defineTask(taskName, options, taskPath) {
		options = options || {};
		options.taskName = taskName;
		options.DEBUG = DEBUG;

		taskPath = taskPath || "./tasks/" + taskName;

		gulp.task(taskName, require(taskPath)(gulp, options));

		//console.log(`Defined ${taskName} task`);
	}

	const DEBUG = args["debug"];
	if (DEBUG)
		console.log("DEBUG build");

	enumerable.from(tasksList).forEach(x => defineTask(x, options));
}

defineTasks(tasksList);
