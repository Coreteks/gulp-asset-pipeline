'use strict';
let gulp = require('gulp');
let runSequence = require('run-sequence');

gulp.task('build-ts', function(cb) {
	return runSequence('ts-lint', 'ts', cb);
});

gulp.task('build', function(cb) {
	return runSequence(['copy', 'build-ts', 'js', 'sass'], cb);
});
