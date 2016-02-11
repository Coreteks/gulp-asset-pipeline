'use strict';
let gulp = require('gulp');
let config = require('../config');
let _ = require('lodash');

gulp.task('watch', function() {
	_.forEach(config.js, function(bundle) {
		gulp.watch(bundle.src, ['js-' + bundle.name]);
	});
	_.forEach(config.ts, function(bundle) {
		gulp.watch(bundle.src, ['ts-lint-' + bundle.name, 'ts-' + bundle.name]);
	});
	_.forEach(config.sass, function(bundle) {
		gulp.watch(bundle.src, ['sass']);
	});
});
