'use strict';

const newer = require("gulp-newer");
const debug = require("gulp-debug");

module.exports = function (gulp, options) {
	return function () {
		return gulp.src(options.manifestSourceFolder)
			.pipe(newer(options.destinationFolder))
			.pipe(debug({title: "Manifest File: "}))
			.pipe(gulp.dest(options.manifestDestinationFolder));
	}
};
