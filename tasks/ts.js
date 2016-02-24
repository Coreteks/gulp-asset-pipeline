'use strict';
let gulp = require('gulp');
let config = require('../config');
let $ = require('gulp-load-plugins')();
let webpack = require('webpack-stream');
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
		let tsFiles = gulp.src(bundle.src)
			//.pipe($.newer(path.resolve(bundle.dest, bundle.name)))
			.pipe($.if(config.debug, $.debug()))
			.pipe($.if(bundle.sourcemaps, $.sourcemaps.init()))
			.pipe($.typescript(tsProject))
			.pipe($.if(bundle.sourcemaps, $.sourcemaps.write('.')))
			.pipe(gulp.dest('./dist'));

		let webpackProductionConfig = {
			output: {
				filename: bundle.name,
			},
			resolve: {
				extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
			},
		};

		let webpackDevConfig = _.extend({
			devtool: 'source-map',
			module: {
				preLoaders: [
					{
						test: /.js$/,
						loader: 'source-map-loader',
					},
				],
			},
		}, webpackProductionConfig);

		let outputJs = tsFiles
			.pipe($.filter('**/*.js'))
			.pipe($.if(config.debug, $.debug()))
			.pipe(webpack($.if(config.production, webpackProductionConfig, webpackDevConfig)))
			.pipe(gulp.dest(bundle.dest));

		if (config.production) {
			outputJs.pipe($.filter('**/*.js'))
				.pipe($.if(config.debug, $.debug()))
				.pipe($.uglify())
				.pipe(gulp.dest(bundle.dest));
		}
	});
});

module.exports = {
	taskName: taskName,
};
