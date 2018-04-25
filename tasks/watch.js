'use strict';

module.exports = function (gulp, options) {
	return function () {
		gulp.watch(options.cssAllPaths, gulp.series(options.tasks.buildCSS));
		gulp.watch(options.htmlAllPaths, gulp.series(options.tasks.buildHTML));
		gulp.watch(options.jsAllPaths, gulp.series(options.tasks.buildJS));
		gulp.watch(options.manifestSourceFolder, gulp.series(options.tasks.buildManifest));
	}
};
