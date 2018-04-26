'use strict';

const del = require("del");

module.exports = function (gulp, options) {
	return function () {
		return del(options.destinationFolder);
	}
};
