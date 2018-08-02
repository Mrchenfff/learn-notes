var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var session = require('express-session');

var index = require('./routes/index');
var users = require('./routes/users');
var shop = require('./routes/shop');
var book = require('./routes/book');
var category = require('./routes/category');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  resave: true,
  saveUninitialized: false,
  secret: 'secret'
}));

app.use(flash());
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  // 用户属性（个人用户 或 店家）
  res.locals.usertype = req.session.usertype || '';
  // 用户真实名字
  res.locals.name = req.session.name || '';
  // 用户的id
  res.locals.uid = req.session.uid || '';
  // 店家的店铺id
  res.locals.dpid = req.session.dpid || '';
  // 书的id
  res.locals.bid = req.session.bid || '';
  next();
});

app.use(function(req, res, next) {
    if (!req.session.name) {
        if(req.url == '/' || req.url == '/bus_login' || req.url == '/reg_user' || req.url == '/reg_mer' || req.url == '/personal_login' || req.url == '/merchant_login'){
            next();
        }else{
            res.redirect('/');
        }
    } else if (req.session.name) {
        if(req.url == '/'){
            res.redirect('/home');
        }else{
            next();
        }
    }
});

app.use('/', index);
app.use('/users', users);
app.use('/shop', shop);
app.use('/book', book);
app.use('/category', category);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
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
  res.render('public/error', {
    title: err.status
});
});

module.exports = app;
