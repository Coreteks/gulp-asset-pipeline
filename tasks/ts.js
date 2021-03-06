'use strict';
let gulp = require('gulp');
let config = require('../config');
let $ = require('gulp-load-plugins')();
let _ = require('lodash');
let fs = require('fs');
let path = require('path');

let prefix = 'ts';

let taskName = function(bundle) {
	return prefix + '-' + bundle.name;
};

let bundles = config.ts;

gulp.task(prefix, _.map(bundles, function(bundle) {
	return taskName(bundle);
}));

let tsConfigFilename = 'tsconfig.json';
let tsProject;
// If a tsconfig.json file exist, use it
if (fs.existsSync(tsConfigFilename)) {
	tsProject = $.typescript.createProject(tsConfigFilename);
}

_.forEach(bundles, function(bundle, key) {
	gulp.task(taskName(bundle), function() {
		return gulp.src(bundle.src)
			.pipe($.newer(path.resolve(bundle.dest, bundle.name)))
			.pipe($.if(config.debug, $.debug()))
			.pipe($.if(bundle.sourcemaps, $.sourcemaps.init()))
			.pipe($.typescript(tsProject))
			.pipe($.concat(bundle.name))
			.pipe($.if(config.production, $.uglify()))
			.pipe($.if(bundle.sourcemaps, $.sourcemaps.write('.')))
			.pipe(gulp.dest(bundle.dest));
	});
});

module.exports = {
	taskName: taskName,
};
