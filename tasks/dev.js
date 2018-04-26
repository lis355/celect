'use strict';

module.exports = function (gulp) {
	return gulp.series(
		"build",
		"watch");
};
