'use strict';

module.exports = function (gulp, options) {
	return function () {
		gulp.watch(options.cssAllPaths, gulp.series("buildcss"));
		gulp.watch(options.htmlAllPaths, gulp.series("buildhtml"));
		gulp.watch(options.jsAllPaths, gulp.series("buildjs"));
		gulp.watch(options.manifestSourceFolder, gulp.series("buildmanifest"));
	}
};
