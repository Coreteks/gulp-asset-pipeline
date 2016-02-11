'use strict';
let gulp = require('gulp');
let config = require('../config');
let $ = require('gulp-load-plugins')();
let _ = require('lodash');
let path = require('path');

let prefix = 'sass';

let taskName = function(bundle) {
	return prefix + '-' + bundle.name;
};

let bundles = config.sass;

gulp.task(prefix, _.map(bundles, function(bundle) {
	return taskName(bundle);
}));

_.forEach(bundles, function(bundle, key) {
	gulp.task(taskName(bundle), function() {
		return gulp.src(bundle.src)
			.pipe($.newer(path.resolve(bundle.dest, bundle.name)))
			.pipe($.if(config.debug, $.debug()))
			.pipe($.if(bundle.sourcemaps, $.sourcemaps.init()))
			.pipe($.sass(bundle.settings))
			.pipe($.concat(bundle.name))
			.pipe($.if(config.production, $.moreCss()))
			.pipe($.if(bundle.sourcemaps, $.sourcemaps.write('.')))
			.pipe(gulp.dest(bundle.dest));
	});
});

module.exports = {
	taskName: taskName,
};
