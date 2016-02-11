'use strict';
let gulp = require('gulp');
let runSequence = require('run-sequence');

gulp.task('build-ts', function(cb) {
	return runSequence('ts-lint', 'ts', cb);
});
