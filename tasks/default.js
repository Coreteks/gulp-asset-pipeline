'use strict';
let gulp = require('gulp');
let runSequence = require('run-sequence');

// TODO(tom.rochette@coreteks.org): This is running all tasks in parallel, but it should be done in some order
gulp.task('default', function(cb) {
	return runSequence('build', 'watch', cb);
});
