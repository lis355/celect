'use strict';

const gulp = require("gulp");
const enumerable = require("linq");

module.exports = {
	defineTasks: function (tasksList, options) {
		function defineTask(taskName, options, taskPath) {
			options = options || {};
			options.taskName = taskName;

			taskPath = taskPath || "./tasks/" + taskName;

			gulp.task(taskName, require(taskPath)(gulp, options));

			//console.log(`Defined ${taskName} task`);
		}

		enumerable.from(tasksList).forEach(x => defineTask(x, options));
	}
};
