// include gulp
var gulp = require('gulp');

// include plugins
var sass = require('gulp-ruby-sass'),
minifycss    = require('gulp-minify-css'),
sourcemaps   = require('gulp-sourcemaps'),
uncss = require('gulp-uncss'),
autoprefixer = require('autoprefixer-core'),
postcss = require('gulp-postcss'),
browserSync = require('browser-sync'),
notify       = require('gulp-notify'),
reload = browserSync.reload;


// define the default task and add the watch task to it
gulp.task('default', ['watch', 'serve']);

// compile scss
gulp.task('sass', function () {
    // return scss
    return sass('sass', {
        style: 'expanded',
        sourcemap: true
    })
    //log errors
    .on('error', function (err) {
      console.error('Error!', err.message);
   })
    // pipe steps
    .pipe(postcss([ autoprefixer({ browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'ie >= 10'] }) ])) // vendor prefixes

    // remove unused css
    // .pipe(uncss({
    //     html: ['*.html', '*.php', 'js/**/*.js']
    // }))
    .pipe(minifycss()) //minify css
    // create source map
    .pipe(sourcemaps.write('maps', {
        sourceRoot: '/sass' // the source of the scss
    }))
    .pipe(gulp.dest('css')) // write css
    .pipe(notify({
        message: 'Styles task complete'
    }));
});

// serve url
gulp.task('serve', function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        },
        open: false // don't open pages
    });
});

// ssh tunnel
gulp.task('tunnel', function() {

    // Static server
    browserSync({
        server: {
            baseDir: "./"
        },
        tunnel: "frontEnd",
        open: false,
        ghostMode: false,
        notify: true
    });

    gulp.watch('scss/**/*.scss', ['scss']);
    gulp.watch(['*.html', '*.php', 'js/**/*.js', 'img/**/*']).on('change', reload);
});

gulp.task('watch', function() {
    // do only default tasks
    gulp.watch('./sass/**/*.scss', ['sass']);
    // reload browsers if a change is made to this file types
    gulp.watch(['*.html', '*.php', 'js/**/*.js', 'img/**/*', './css/**/*.css']).on("change", browserSync.reload);
});