'use strict';

const browserify = require("browserify");
const buffer = require("vinyl-buffer");
const debug = require("gulp-debug");
const gulpIf = require("gulp-if");
const uglify = require("gulp-uglify-es").default;

module.exports = function (gulp, options) {
	return function () {
		const jsEntries = ["vk_inject.js", "code2.js"];

		return browserify(jsEntries, {
			basedir: options.sourceFolder + "js/"
		}).plugin("common-bundle", {
			common: "common.js"
		}).bundle()
			.pipe(buffer())
			.pipe(debug({title: "JS File: "}))
			.pipe(gulpIf(!options.DEBUG, uglify()))
			.pipe(gulp.dest(options.destinationFolder + "js/"));
	}
};
