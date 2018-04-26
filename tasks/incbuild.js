'use strict';

module.exports = function (gulp) {
	return gulp.parallel(
			"buildcss",
			"buildhtml",
			"buildmanifest",
			"buildjs");
};
