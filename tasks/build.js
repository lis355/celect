'use strict';

module.exports = function (gulp, options) {
	return gulp.series(
		options.tasks.clear,
		options.tasks.incbuild);
};
