'use strict';
let gulp = require('gulp');
let runSequence = require('run-sequence');

gulp.task('build', function(cb) {
	return runSequence(['copy', 'build-ts', 'js', 'sass'], cb);
});
