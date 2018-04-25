'use strict';

module.exports = function (gulp, options) {
	return function () {
		const browserify = require("browserify");
		const buffer = require("vinyl-buffer");
		const debug = require("gulp-debug");
		const gulpIf = require("gulp-if");
		const uglify = require("gulp-uglify-es").default;

		return browserify(options.jsEntries, {
			basedir: options.jsSourceFolder
		}).plugin("common-bundle", {
			common: options.jsCommonBundlePath
		}).bundle()
			.pipe(buffer())
			.pipe(debug({title: "JS File: "}))
			.pipe(gulpIf(!options.DEBUG, uglify()))
			.pipe(gulp.dest(options.jsDestinationFolder));
	}
};
