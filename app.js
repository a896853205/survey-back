var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
// cookie解析包
var cookieParser = require('cookie-parser');
// 请求体解析包
var bodyParser = require('body-parser');
// 设置跨域
let corsConfig = require('./corsConfig');
// 基本文件路径和测试路径
let mainPath = './src/main';
let testPath = './src/test';

// 中间件
let verifyIdMiddle = require(`${mainPath}/app/middle/checkId`);
let verifyRoleMiddle = require(`${mainPath}/app/middle/checkRole`);

// 路由
var noneRouter = require(`${mainPath}/app/routes/none`)
let getTokenRouter = require(`${mainPath}/app/routes/getToken`);
let getNavRouter = require(`${mainPath}/app/routes/nav`)

let managerRouter = require(`${mainPath}/app/routes/manager`);
let superRouter = require(`${mainPath}/app/routes/super`)

var app = express();

// 允许跨域
app.all('*',corsConfig);
// view engine setup
// jade设置路径
app.set('views', path.join(__dirname, `${mainPath}/webapp/views`));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 没有权限的的路由
app.use('/', noneRouter);
// 判断登录权限的中间件
app.use('/home', verifyIdMiddle, verifyRoleMiddle);
// 判断结束进入主页
app.use('/home/manager', managerRouter);
// 判断结束进入主页
app.use('/home/super', superRouter);
// 获取token的值,根据自己的权限获取nav的值
app.use('/home/all', getTokenRouter, getNavRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  // @ts-ignore
  console.log('err:' + err.status);
  // @ts-ignore
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
