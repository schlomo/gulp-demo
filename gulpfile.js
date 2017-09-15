const gulp = require('gulp');

gulp.task('clean', function() {
  return require('del')(['out']);
});

gulp.task('build', ['clean'], function(){
  return gulp.src(['src/**'])
    .pipe(gulp.dest('out'));
})

gulp.task('default', ['build']);