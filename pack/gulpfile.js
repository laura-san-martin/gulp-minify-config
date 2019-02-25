const gulp = require('gulp'),
    babel = require('gulp-babel'),
    browserify = require('gulp-browserify'),
    combineMq = require('gulp-combine-mq'),
    csso = require('gulp-csso'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass');

sass.compiler = require('node-sass');
    

gulp.task('sassTask', function () {
    return gulp.src('./src/scss/main.scss')
      .pipe(sass())
      .pipe(combineMq())
      .pipe(csso())
      .pipe(gulp.dest('./dist/scss/'));
});

gulp.task('jsTask', function() {
    return gulp.src('src/js/index.js')
        .pipe(babel({presets: ['@babel/preset-env']}))
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('imgTask', function() {
    return gulp.src('./src/img/**')
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.jpegtran({ progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({ plugins: [{ removeViewBox: false }] })
        ]))
        .pipe(gulp.dest('./dist/img/'));
});

gulp.task('default', function () {
    gulp.watch("./src/img/**/**", gulp.series('imgTask'));
    gulp.watch("./src/scss/**/*.scss", gulp.series('sassTask'));
    gulp.watch("./src/js/**/*.js", gulp.series('jsTask'));
});

