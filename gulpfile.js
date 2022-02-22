// Requires the gulp and installed plugins
var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();

//minify styles
gulp.task('sass', function() {
    var paths = [
      "app/scss/**/*.scss"
    ];
    gulp.src(paths, {base: ""}) // Get source files with gulp.src
    .pipe(sass({outputStyle: 'compressed'})) // Sends it through a gulp plugin with compressed format
    .pipe(rename({suffix: '.min'})) //output file into minified name
    .pipe(gulp.dest("app/css")) // Outputs the file in the destination folder
    .pipe(browserSync.stream()); //browser synchronize
});



//watch changes
gulp.task('serve', function(){
    browserSync.init({
        server: "app"
    });

    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});
