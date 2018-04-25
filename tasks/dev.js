'use strict';

module.exports = function (gulp, options) {
	return gulp.series(
		options.tasks.build,
		options.tasks.watch);
};
