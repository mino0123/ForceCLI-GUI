var gulp = require('gulp');
var gutil = require('gulp-util');
var spawn = require('child_process').spawn;
var NwBuilder = require('node-webkit-builder');

gulp.task('nw', function () {
    var nw = new NwBuilder({
        version: 'latest',
        files: ['./*'],
        platforms: ['win']
    });
    nw.on('log', function (msg) {
        gutil.log('node-webkit-builder', msg);
    });
    return nw.build().catch(function (err) {
        gutil.log('node-webkit-builder', err);
    });
});

gulp.task('run', ['nw'], function () {
    var child = spawn('./build/soql-tester/win/soql-tester.exe', [], {
        detached: true,
        stdio: 'ignore'
    });
    child.unref();
});

gulp.task('default', ['nw', 'run']);
