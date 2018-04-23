'use strict';

const gulp = require("gulp");
const debug = require("gulp-debug");
const path = require("path");
const fs = require("fs");
//const rename = require("gulp-rename");
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const concat = require("gulp-concat");
const del = require("del");
//const jeditor = require("gulp-json-editor");
const newer = require("gulp-newer");
//const browserSync = require("browser-sync").create();
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const uglify = require("gulp-uglify-es").default;
const gulpIf = require("gulp-if");
const args = require("args-parser")(process.argv);
const merge = require("merge-stream");
const enumerable = require("linq");

const DEBUG = args["debug"];

if (DEBUG)
	console.log("DEBUG");

const destinationFolder = "dest";

const paths = {
	sourceFolder: "src/",
	destinationFolder: "dest"
};

paths.allTemplate = "**/*";

paths.cssExtension = ".css";
paths.cssSourceFolder = paths.sourceFolder + "css";
paths.cssAllPaths = paths.sourceFolder + paths.allTemplate + paths.cssExtension;
paths.cssMinName = "style.min.css";
paths.cssDestinationFolder = paths.destinationFolder + "/css";

paths.htmlExtension = ".css";
paths.htmlSourceFolder = paths.sourceFolder + "html";
paths.htmlAllPaths = paths.sourceFolder + paths.allTemplate + paths.htmlExtension;
paths.htmlDestinationFolder = paths.destinationFolder;

paths.jsExtension = ".js";
paths.jsSourceFolder = paths.sourceFolder + "js";
paths.jsAllPaths = paths.sourceFolder + paths.allTemplate + paths.jsExtension;
paths.jsEntries = ["vk_inject.js", "code2.js"];
paths.jsCommonBuildPath = "common.js";
paths.jsDestinationFolder = paths.destinationFolder + "/js";

paths.manifestSourceFolder = paths.sourceFolder + "manifest.json";
paths.manifestDestinationFolder = paths.destinationFolder;

let tasks = {
	buildCSS: "build:css",
	buildHTML: "build:html",
	buildJS: "build:js",
	buildManifest: "build:manifest",
	watch: "watch",
	clean: "clean",
	build: "build",
	dev: "dev"
};

gulp.task(tasks.buildCSS, function () {
	return gulp.src(paths.cssAllPaths)
		.pipe(cleanCSS())
		.pipe(autoprefixer())
		.pipe(debug({title: "CSS File: "}))
		.pipe(concat(paths.cssMinName))
		.pipe(gulp.dest(paths.cssDestinationFolder))
});

gulp.task(tasks.buildHTML, function () {
	return gulp.src(paths.htmlAllPaths)
		.pipe(newer(destinationFolder))
		.pipe(debug({title: "HTML File: "}))
		.pipe(gulp.dest(paths.htmlDestinationFolder))
});

gulp.task(tasks.buildJS, function () {
	return browserify(paths.jsEntries, {
		basedir: paths.jsSourceFolder
	}).plugin("common-bundle", {
		common: paths.jsCommonBuildPath
	}).bundle()
		.pipe(buffer())
		.pipe(debug({title: "JS File: "}))
		.pipe(gulpIf(!DEBUG, uglify()))
		.pipe(gulp.dest(paths.jsDestinationFolder));
});

gulp.task(tasks.buildManifest, function () {
	return gulp.src(paths.manifestSourceFolder)
		.pipe(newer(destinationFolder))
		.pipe(debug({title: "Manifest File: "}))
		.pipe(gulp.dest(paths.manifestDestinationFolder))
});

gulp.task(tasks.watch, function () {
	gulp.watch(paths.cssAllPaths, gulp.series(tasks.buildCSS));
	gulp.watch(paths.htmlAllPaths, gulp.series(tasks.buildHTML));
	gulp.watch(paths.jsAllPaths, gulp.series(tasks.buildJS));
	gulp.watch(paths.manifestSourceFolder, gulp.series(tasks.buildManifest));
});

gulp.task(tasks.clean, function () {
	return del(destinationFolder);
});

gulp.task(tasks.build, gulp.series(
	tasks.clean,
	gulp.parallel(tasks.buildCSS, tasks.buildHTML, tasks.buildManifest, tasks.buildJS)));

gulp.task(tasks.dev, gulp.series(
	tasks.build,
	tasks.watch));

gulp.task("default", gulp.series(tasks.dev));
