var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var paths = {
    sass: ['./scss/**/*.scss']
};

/**
 * Combined Tasks
 */
gulp.task('inject', ['injectBower', 'injectSources']);

gulp.task('default', ['sass']);

gulp.task('sass', function (done) {
    gulp.src('./scss/ionic.app.scss')
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest('./www/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest('./www/css/'))
        .on('end', done);
});

gulp.task('watch', function () {
    gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function () {
    return bower.commands.install()
        .on('log', function (data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});

gulp.task('git-check', function (done) {
    if (!sh.which('git')) {
        console.log(
            '  ' + gutil.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
            '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});

/**
 * Dependency Injection
 */
var inject = require('gulp-inject'),
    wiredep = require('wiredep');

gulp.task('injectBower', function () {
    wiredep({
        src: './www/index.html',
        directory: './www/lib/bower_components/',
        bowerJson: require('./bower.json'),
        devDependencies: false
    });
});

gulp.task('injectSources', function () {
    var target = gulp.src('www/index.html');

    return target.pipe(inject(gulp.src(
        [
            '**/*.js',
            '**/*.css',
            '!lib/bower_components/**/*.css',
            '!lib/bower_components/**/*.js'
        ],
        {
            read: false,
            cwd: 'www'
        }),
        {
            relative: true
        })
    ).pipe(gulp.dest('www'));
});
