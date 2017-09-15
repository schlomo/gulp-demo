const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

gulp.task('clean', function() {
  return require('del')(['out']);
});

gulp.task('build', ['clean'], function(){
  return gulp.src(['src/**'])
    .pipe($.if('*.js', $.rev()))
    .pipe($.if('*.css', $.rev()))
    .pipe($.revReplace())
    .pipe(gulp.dest('out'));
})

gulp.task('apimocker', ['build'], function(){
  gulp.watch('src/**', ['build'])
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
  return $.apimocker.start({
    staticDirectory: 'out',
    staticPath: '/'
  });
});

gulp.task('default', ['build']);