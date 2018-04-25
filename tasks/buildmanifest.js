'use strict';

module.exports = function (gulp, options) {
	return function () {
		const newer = require("gulp-newer");
		const debug = require("gulp-debug");

		return gulp.src(options.manifestSourceFolder)
			.pipe(newer(options.destinationFolder))
			.pipe(debug({title: "Manifest File: "}))
			.pipe(gulp.dest(options.manifestDestinationFolder));
	}
};
