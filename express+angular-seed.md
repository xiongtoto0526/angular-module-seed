1. init
http://www.expressjs.com.cn/starter/installing.html

npm install express-generator -g

express -e angular-module-seed  // -e 使用ejs模板

edit package.json
"jade": "~1.11.0", ==>"ejs": "2.3.4",

unzip the baseLib.zip
npm rebuild node-sass  （if windows）
npm install

app.js :  app.set('view engine', 'ejs');

2. 修改app目录结构
- bin/www：
var app = require('../app/app');
- app.js
var routes = require('../routes/index');
var users = require('../routes/users');

// view engine setup
if (app.get('env') === 'development') {
  app.set('views', path.join(__dirname, 'views', 'src'));
} else {
  app.set('views', path.join(__dirname, 'views', 'dist'));
}

3.修改静态目录
app.js:
if (app.get('env') === 'development') {
  app.use(express.static(path.join(process.cwd())));
  app.use(express.static(path.join(process.cwd(), 'tmp')));
  app.use(express.static(path.join(process.cwd(), 'assets', 'distribution')));
  app.use(require('connect-livereload')({ port: 35729 }));
  app.use(require('mocer')(__dirname + path.sep + 'mocks'));
} else {
  var basePath = process.cwd();
  if (basePath.endsWith('bin')) {
    basePath = basePath.slice(0, basePath.length - 4);
  }

  app.use(express.static(path.join(basePath, 'pub')));
}

4.安装sublime插件
scss, html js css pretty
ejs,emmet




todo:
1. resize the package.json library.


