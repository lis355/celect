'use strict';

module.exports = function (gulp) {
	return gulp.series(
		"clear",
		"incbuild");
};
