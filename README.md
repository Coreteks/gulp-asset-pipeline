# Gulp Asset Pipeline

`gulp-asset-pipeline` is a simple, opinionated tool based on [`gulp`](http://gulpjs.com/) to build your assets in an efficient manner.

## Getting started

`npm install coreteks/gulp-asset-pipeline`

In your gulpfile.js
```javascript
var config = require('gulp-asset-pipeline/config');

// Your own configuration
var sourceAssets = './assets';
var bowerComponentsAssets = './bower_components';
var publicAssets = './public/assets';

config.sass = {
	app: {
		src: [sourceAssets + '/stylesheets/**/*.{sass,scss}'],
		dest: publicAssets + '/css',
		sourcemaps: config.sourcemaps,
		name: 'app.css',
	},
};

config.ts = {
	app: {
		src: [sourceAssets + '/javascripts/**/*.ts'],
		dest: publicAssets + '/js',
		sourcemaps: config.sourcemaps,
		name: 'app.js',
		shouldLint: true,
	},
};

config.js = {
	components: {
		src: [
			bowerComponentsAssets + '/bootstrap-sass/assets/javascripts/bootstrap.js',
		],
		dest: publicAssets + '/js',
		sourcemaps: config.sourcemaps,
		name: 'components.js',
	},
};

config.copy = [{
	src: bowerComponentsAssets + '/bootstrap-sass/assets/fonts/bootstrap/*',
	dest: publicAssets + '/fonts',
},{
	src: bowerComponentsAssets + '/font-awesome/fonts/*',
	dest: publicAssets + '/fonts',
}];
// End of your configuration

// Require gulp-asset-pipeline, this loads the gulp tasks
require('gulp-asset-pipeline');

[your other gulp.task here]
```

## Supported tasks

`gulp-asset-pipeline` supports various tasks out of the box to simplify your asset pipeline.

### Sass

Transpiles sass to css and minifies.

### Javascript

Concatenates and uglifies source code into a single output file.

### Typescript

Transpiles typescript to javascript.

### Copy

Copy files from `src` to `dest`.

## Flags

When running `gulp`, you may pass flags to indicate how you want certain things to be done.

### Debug (--debug)

Display all the source files used in a task.

## Production (--production)

Configures the environment in production mode. This implies that css/js will be minified/uglified.

## License

The code is licensed under the [MIT license](http://choosealicense.com/licenses/mit/). See [LICENSE](LICENSE).
