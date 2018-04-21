'use strict';

const gulp = require("gulp");
const debug = require("gulp-debug");
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

const DEBUG = args["debug"];

if (DEBUG)
	console.log("DEBUG");

const destinationFolder = "dest";

const paths = {
	sourceFolder : "src/",
	destinationFolder : "dest"
};

paths.cssSourceFolder = paths.sourceFolder + "**/*.css";
paths.cssMinName = "style.min.css";
paths.cssDestinationFolder = paths.destinationFolder + "/css";

paths.htmlSourceFolder = paths.sourceFolder + "**/*.html";
paths.htmlDestinationFolder = paths.destinationFolder;

paths.jsSourceFolder = paths.sourceFolder + "**/*.js";
paths.jsEntries = "src/js/vk_inject.js";
paths.jsMinName = "main.min.js";
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
	serve: "serve",
	dev: "dev"
};

gulp.task(tasks.buildCSS, function () {
	return gulp.src(paths.cssSourceFolder)
		.pipe(cleanCSS())
		.pipe(autoprefixer())
		.pipe(debug({title: "CSS File: "}))
		.pipe(concat(paths.cssMinName ))
		.pipe(gulp.dest(paths.cssDestinationFolder))
});

gulp.task(tasks.buildHTML, function () {
	return gulp.src(paths.htmlSourceFolder)
		.pipe(newer(destinationFolder))
		.pipe(debug({title: "HTML File: "}))
		.pipe(gulp.dest(paths.htmlDestinationFolder))
});

gulp.task(tasks.buildJS, function () {
	return browserify({
		entries: paths.jsEntries
	}).bundle()
		.pipe(source(paths.jsMinName))
		.pipe(buffer())
		.pipe(gulpIf(!DEBUG, uglify()))
		.pipe(gulp.dest(paths.jsDestinationFolder))
});

gulp.task(tasks.buildManifest, function () {
	return gulp.src(paths.manifestSourceFolder)
		.pipe(newer(destinationFolder))
		.pipe(debug({title: "Manifest File: "}))
		.pipe(gulp.dest(paths.manifestDestinationFolder))
});

gulp.task(tasks.watch, function () {
	gulp.watch(paths.cssSourceFolder, gulp.series(tasks.buildCSS));
	gulp.watch(paths.htmlSourceFolder , gulp.series(tasks.buildHTML));
	gulp.watch(paths.jsSourceFolder , gulp.series(tasks.buildJS));
	gulp.watch(paths.manifestSourceFolder , gulp.series(tasks.buildManifest));
});

gulp.task(tasks.clean, function () {
	return del(destinationFolder);
});

gulp.task(tasks.build, gulp.series(
	tasks.clean,
	gulp.parallel(tasks.buildCSS, tasks.buildHTML, tasks.buildManifest, tasks.buildJS)));

/*gulp.task(tasks.serve, function () {
	browserSync.init({
		server: destinationFolder
	});

	browserSync.watch(destinationFolder +"/!**!/!*.*")
		.on("change", browserSync.reload);
});*/

gulp.task(tasks.dev, gulp.series(
	tasks.build,
	gulp.parallel(tasks.watch/*, tasks.serve*/)));

gulp.task("default", gulp.series(tasks.dev));
