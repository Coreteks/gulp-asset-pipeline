'use strict';
let gulp = require('gulp');
let config = require('../config');
let $ = require('gulp-load-plugins')();

gulp.task('copy', function () {
	for (let instruction of config.copy) {
		gulp.src(instruction.src)
			.pipe($.newer(instruction.dest))
			.pipe($.if(config.debug, $.debug()))
			.pipe(gulp.dest(instruction.dest));
	}
});
