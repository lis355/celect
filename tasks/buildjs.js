'use strict';

const browserify = require("browserify");
const buffer = require("vinyl-buffer");
const source = require("vinyl-source-stream");
const merge = require("merge-stream");
const debug = require("gulp-debug");
const gulpIf = require("gulp-if");
const uglify = require("gulp-uglify-es").default;

module.exports = function (gulp, options) {
	return function () {
		let compileScriptsWithCommon = function (entries) {
			return browserify(entries, {
				basedir: options.sourceFolder + "js/"
			}).plugin("common-bundle", {
				common: "common.js"
			}).bundle()
				.pipe(buffer());
		};

		let compileSingleScript = function (entry) {
			return browserify(entry, {
				basedir: options.sourceFolder + "js/"
			}).bundle()
				.pipe(source(entry));
		};

		let minifyAndOutput = function (sequence) {
			return sequence.pipe(debug({title: "JS File: "}))
				.pipe(gulpIf(!options.DEBUG, uglify()))
				.pipe(gulp.dest(options.destinationFolder + "js/"));
		};

		return minifyAndOutput(merge(
			compileSingleScript("vk_background.js"),
			compileSingleScript("vk_inject.js")
		));
	}
};
