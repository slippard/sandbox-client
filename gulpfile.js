var gulp = require('gulp');
var ts = require('gulp-typescript');
var runSequence = require('run-sequence');
var tsProject = ts.createProject('tsconfig.json');
var del = require('del');

gulp.task('clean', function () {
    return del([
        'dist/'
    ]);
});

gulp.task('ts', function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest('dist'));
});

gulp.task('merge', function() {
    gulp.src('src/*.json')
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', gulp.series('clean', 'ts', function (done) {
    done();
}));