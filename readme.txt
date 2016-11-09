开发须知：

一.新增模块
以sp为例：
1. app.js 中新增 app.use('/sp', require('./routes/sp'));
2. app/routes 下新增sp.js
3. app/views/src 下新增 sp.ejs 。 (替换文件内所有的 ‘sp’关键字)
4. assets目录下新增sp目录，其子目录及文件命名规则参考sp即可
5. task/development.js 中增加 template:sp，bundle:sp 相关的内容
6. task/task-config.js 中增加 sp 相关配置。


二.新增特性
以sp模块的log为例：

1. sp下新增log目录。其子目录及文件命名规则参考sp即可。

2. 新增controller:
main-sp.js中新增
// controllers
import LogController from './log/log-controller';
import UserController from './user/user-controller';

3. 新增service:
main-sp.js中新增
// services
import LogService from './log/log-service';
import UserService from './user/user-service';

4. 新增scss
main-sp.scss中新增：
@import 'log/log';
@import 'user/user';

