'use strict';

const newer = require("gulp-newer");
const debug = require("gulp-debug");

module.exports = function (gulp, options) {
	return function () {
		return gulp.src(options.sourceFolder + "**/*.html")
			.pipe(newer(options.destinationFolder))
			.pipe(debug({title: "HTML File: "}))
			.pipe(gulp.dest(options.destinationFolder));
	}
};
