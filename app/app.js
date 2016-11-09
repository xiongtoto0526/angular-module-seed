var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var app = express();

// __dirname,app.js所在目录
// process.cwd(), package.json所在目录

// view engine setup
if (app.get('env') === 'development') {
  app.set('views', path.join(__dirname, 'views', 'src'));
} else {
  app.set('views', path.join(__dirname, 'views', 'dist'));
}
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

if (app.get('env') === 'development') {
  app.use(express.static(path.join(process.cwd()))); // ?
  app.use(express.static(path.join(process.cwd(), 'tmp'))); //开发环境用
  app.use(express.static(path.join(process.cwd(), 'assets', 'distribution'))); // 生产环境用
  app.use(require('connect-livereload')({ port: 35729 })); // ?
  app.use(require('mocer')(__dirname + path.sep + 'mocks')); // mock数据用
} else {
  var basePath = process.cwd();
  if (basePath.endsWith('bin')) {
    basePath = basePath.slice(0, basePath.length - 4);
  }
  app.use(express.static(path.join(basePath, 'pub')));// 生产环境用
}


app.use('/', require('./routes/index'));
app.use('/pm', require('./routes/pm'));
app.use('/sp', require('./routes/sp'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
