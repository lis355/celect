'use strict';

const gulp = require("gulp");
const args = require("args-parser")(process.argv);
const enumerable = require("linq");

const DEBUG = args["debug"];
if (DEBUG)
	console.log("DEBUG build");

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

let tasks = {
	buildCSS: "buildcss",
	buildHTML: "buildhtml",
	buildJS: "buildjs",
	buildManifest: "buildmanifest",
	clear: "clear",
	incbuild: "incbuild",
	build: "build",
	watch: "watch",
	dev: "dev",
	default: "default"
};

function defineTask(taskName, options, path) {

	options = options || {};
	options.taskName = taskName;
	options.tasks = tasks;
	options.DEBUG = DEBUG;

	path = path || "./tasks/" + taskName;

	gulp.task(taskName, require(path)(gulp, options));
}

enumerable.from(tasks).forEach(x =>	defineTask(x.value, options));
