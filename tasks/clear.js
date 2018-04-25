'use strict';

module.exports = function (gulp, options) {
	return function () {
		const del = require("del");

		return del(options.destinationFolder);
	}
};
