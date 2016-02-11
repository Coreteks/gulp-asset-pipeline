'use strict';
let gulp = require('gulp');
let config = require('../config');
let _ = require('lodash');
let runSequence = require('run-sequence');
let jsTaskName = require('./js').taskName;
let tsTaskName = require('./ts').taskName;
let tsLintTaskName = require('./ts-lint').taskName;
let sassTaskName = require('./sass').taskName;

gulp.task('watch', function() {
	_.forEach(config.js, function(bundle) {
		gulp.watch(bundle.src, [jsTaskName(bundle)]);
	});
	_.forEach(config.ts, function(bundle) {
		if (gulp.hasTask(tsLintTaskName(bundle))) {
			gulp.watch(bundle.src, function() {
				return runSequence(tsLintTaskName(bundle), tsTaskName(bundle));
			});
		} else {
			gulp.watch(bundle.src, [tsTaskName(bundle)]);
		}
	});
	_.forEach(config.sass, function(bundle) {
		gulp.watch(bundle.src, [sassTaskName(bundle)]);
	});
});
