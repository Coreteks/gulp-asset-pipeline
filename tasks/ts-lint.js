'use strict';
let gulp = require('gulp');
let config = require('../config');
let $ = require('gulp-load-plugins')();
let _ = require('lodash');

let prefix = 'ts-lint';

let taskName = function(bundle) {
	return prefix + '-' + bundle.name;
};

let bundles = _.filter(config.ts, { shouldLint: true});

gulp.task(prefix, _.map(bundles, function(bundle) {
	return taskName(bundle);
}));

_.forEach(bundles, function(bundle, key) {
	gulp.task(taskName(bundle), function() {
		return gulp.src(bundle.src)
			.pipe($.tslint())
			.pipe($.tslint.report('prose'));
	});
});

module.exports = {
	taskName: taskName,
};
