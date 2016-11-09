'use strict';

var gulp = require('gulp');
var flatten = require('gulp-flatten'); // 打平目录
var nodemon = require('gulp-nodemon'); // 自动重启项目工程
var path = require('path');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass'); // 编译sass
var postcss = require('gulp-postcss'); // css 后处理,支持多个css插件
var $ = require('gulp-load-plugins')();
var autoprefixer = require('autoprefixer-core'); // 为css添加浏览器前缀
var ngAnnotate = require('gulp-ng-annotate'); // 将ng注解自动注入bean
var source = require('vinyl-source-stream'); // 文件流处理库
var browserify = require('browserify'); // 支持require的模块化加载
var streamify = require('gulp-streamify'); // 流化
var regenerator = require('gulp-regenerator'); // ES6编译成ES5
var minifyHTML = require('gulp-minify-html'); // 压缩 HTML
var ngHtml2Js = require('gulp-ng-html2js'); // 将模板转换为js
var rimraf = require('rimraf'); // 清除目录,等效于 rm -rf
var runSequence = require('run-sequence'); // 按序执行，支持并发
var opn = require('opn'); // 打开浏览器
var devip = require('dev-ip'); // 获取本机ip
var livereload = require('gulp-livereload'); //  Gulp的实时加载插件
var argv = require('minimist')(process.argv.slice(2)); // 获取运行参数
var rucksack = require('gulp-rucksack'); // 为css增加响应式style
var jetpack = require('fs-jetpack'); // 文件操作库
var config = require('../config.json'); // 读取json
var configPath = path.join(process.cwd(), 'config.json');

var baseUrl = argv.baseUrl;
var port = argv.port;

// eg: baseUrl=http://111.111.222.121:8908, port is result to 8908
if (baseUrl && baseUrl.split(":")) {
  port =baseUrl.split(":")[2]
};

var taskConfig = require('./task-config');

var assets = path.join(process.cwd(), 'assets');
var tmp = path.join(process.cwd(), 'tmp');

var stylesPath = taskConfig.stylesPath;

gulp.task('default', function() {
  return runSequence('development');
});

gulp.task('development', function() {
  return runSequence('clean', ['copy', 'env:development', 'template', 'style', 'url'], 'bundle', 'serve', 'watch', 'opn');
});

gulp.task('clean', function(cb) {
  return rimraf(tmp, cb);
});

gulp.task('copy', function() {
  gulp.src(assets + '/**/img/*').pipe(flatten()).pipe(gulp.dest(tmp + '/img'));
  gulp.src(assets + '/**/fonts/*').pipe(flatten()).pipe(gulp.dest(tmp + '/fonts'));
  gulp.src(assets + '/**/file/*').pipe(flatten()).pipe(gulp.dest(tmp + '/file'));
});

gulp.task('env:development', function() {
  process.env.NODE_ENV = 'development';
  process.env.PORT = port ? port : config.port;
});

gulp.task('template', ['template:common','template:sp','template:pm']);
gulp.task('template:common', () => template(taskConfig.template.common));
gulp.task('template:sp', () => template(taskConfig.template.sp));
gulp.task('template:pm', () => template(taskConfig.template.pm));

// html模板转换为js
function template(app) {
  return gulp.src(app.files)
    .pipe(minifyHTML({ empty: true, spare: true, quotes: true }))
    .pipe(ngHtml2Js({ moduleName: app.moduleName, prefix: 'views/' }))
    .pipe($.concat(app.fileName))
    .pipe(gulp.dest(tmp + '/js'));
}

gulp.task('style', function() {
  return gulp.src(stylesPath)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(rucksack())
    .pipe(postcss([autoprefixer({ browsers: ['last 2 version'] })]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(tmp + '/css'))
    .pipe(livereload());
});

gulp.task('url', function() {
  config.baseUrl = baseUrl ? baseUrl : 'http://' + devip()[0] + ':' + config.port;
  jetpack.write(configPath, config);
});

gulp.task('bundle', ['bundle:common', 'bundle:sp', 'bundle:pm']);
gulp.task('bundle:common', () => bundle(taskConfig.bundle.common));
gulp.task('bundle:sp', ['template:sp'], () => bundle(taskConfig.bundle.sp));
gulp.task('bundle:pm', ['template:pm'], () => bundle(taskConfig.bundle.pm));

function bundle(app) {
  if (app.weClient) {
    return browserify(app.entry)
      .transform('babelify', { presets: 'es2015', compact: false })
      .bundle()
      .pipe(source('main.js'))
      .pipe($.rename({ suffix: '-' + app.type, extname: '.js' }))
      .pipe(gulp.dest(tmp + '/js'))
      .pipe(livereload());
  } else {
    return browserify(app.entry)
      .transform('babelify', { presets: 'es2015', compact: false })
      .bundle()
      .pipe(source('main.js'))
      .pipe(ngAnnotate({ add: true })) // 微信端为何不做转码？
      .pipe(streamify(regenerator({ includeRuntime: true }))) // 微信端为何不做regenerator？
      .pipe($.rename({ suffix: '-' + app.type, extname: '.js' }))
      .pipe(gulp.dest(tmp + '/js'))
      .pipe(livereload());
  }
}

gulp.task('serve', function() {
  return nodemon({
    script: './bin/www',
    ext: 'js ejs',
    watch: ['app/views/', 'app/routes/', 'app/app.js', '/bin/'], // 监控express目录下的文件变化
    ignore: ['./pub/**/*']
  }).on('restart', function() {
    setTimeout(() => {
      livereload.reload(); // express重启成功后，再重启web工程
    }, 1000);
  });
});

gulp.task('watch', function() {  // 监控assets目录下的文件变化
  livereload.listen();
  gulp.watch(taskConfig.paths.sass, ['style']);
  gulp.watch([taskConfig.paths.js.common, taskConfig.paths.tpl.common], ['bundle:common']);
  gulp.watch([taskConfig.paths.js.sp, taskConfig.paths.tpl.sp], ['bundle:sp']);
  gulp.watch([taskConfig.paths.js.pm, taskConfig.paths.tpl.pm], ['bundle:pm']);
});

gulp.task('opn', function() {
  return opn('http://' + devip()[0] + ':' + process.env.PORT);
});
