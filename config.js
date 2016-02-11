var gulpUtil = require('gulp-util');

var production = !! gulpUtil.env.production;
var debug = !! gulpUtil.env.debug;

var config = {};

config.production = production;
config.debug = debug;
config.sourcemaps = ! production;

config.sass = {};
config.ts = {};
config.js = {};
config.copy = [];

module.exports = config;
