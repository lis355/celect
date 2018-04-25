'use strict';

module.exports = function (gulp, options) {
	return gulp.series(
		options.tasks.clear,
		gulp.parallel(
			options.tasks.buildCSS,
			options.tasks.buildHTML,
			options.tasks.buildManifest,
			options.tasks.buildJS));
};