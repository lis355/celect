'use strict';

const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const debug = require("gulp-debug");
const concat = require("gulp-concat");

module.exports = function (gulp, options) {
	return function () {
		return gulp.src(options.cssAllPaths)
			.pipe(cleanCSS())
			.pipe(autoprefixer())
			.pipe(debug({title: "CSS File: "}))
			.pipe(concat(options.cssMinName))
			.pipe(gulp.dest(options.cssDestinationFolder))
	}
};
