'use strict';

const enumerable = require("linq");

module.exports = function (gulp, options) {
	return function () {
		enumerable.from({
			"**/*.css": "buildcss",
			"**/*.html": "buildhtml",
			"**/*.js": "buildjs",
			"manifest.json": "buildmanifest"
		}).forEach(x => gulp.watch(options.sourceFolder + x.key, gulp.series(x.value)));

		/*gulp.watch(options.sourceFolder + "**!/!*.css", gulp.series("buildcss"));
		gulp.watch(options.sourceFolder + "**!/!*.html", gulp.series("buildhtml"));
		gulp.watch(options.sourceFolder + "**!/!*.js", gulp.series("buildjs"));
		gulp.watch(options.sourceFolder + "manifest.json", gulp.series("buildmanifest"));*/
	}
};
