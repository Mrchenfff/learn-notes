var express = require('express');
var router = express.Router();

var usermodel = require('../models/usermodel');
var mermodel = require('../models/merchantmodel');

// 首页个人登录页面
router.get('/', function(req, res, next) {
    req.session.login = 1;
	res.render('index', {
		title: '青年书社个人登录',
        logintit: '个人',
        logintit2: '管理员',
        loginurl: '/bus_login',
        modalname: '#user_reg',
        lonin:true,
        url: '/personal_login'
    });
});

// 首页管理员登陆页面
router.get('/bus_login', function(req, res, next) {
	res.render('index', {
		title: '青年书社卖家登陆',
        logintit: '管理员',
        logintit2: '个人',
        loginurl: '/',
        modalname: '#bus_reg',
        url: '/merchant_login'
    });
});

// 用户注册
router.post('/reg_user', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var name = req.body.name;
    var phonenumber = req.body.phonenumber;
    var address = req.body.address;
    usermodel.user_reg(username, password, name, phonenumber, address, function(err, rows) {
        if (err) {
            res.json(['error', "注册失败:" + err]);
            return next(err);
        }
        res.json(['success', "注册成功"]);
    });
});

// 个人登录
router.post('/personal_login', function(req, res) {
    var u = req.body.username;
    var p = req.body.password;
    usermodel.personal_login(u, function(err, user) {
        if (err) {
            res.send('登录失败: ' + err);
        }
        if(!user){
            res.json(['error', "账号不存在"]);
        }else{
            if (p == user.password) {
                req.session.usertype = 0;
                req.session.name = user.name;
                req.session.uid = user.id;
                res.json(['success', "登陆成功"]);
            }
            if(p != user.password){
                res.json(['error', "密码错误"]);
            }
        }
    });
});

// 商家登录
router.post('/merchant_login', function(req, res) {
    var u = req.body.username;
    var p = req.body.password;
    mermodel.merchant_login(u, function(err, user) {
        if (err) {
            res.send('登录失败: ' + err);
        }
        if(!user){
            res.json(['error', "账号不存在"]);
        }else{
            if (p == user.password) {
                req.session.usertype = 1;
                req.session.name = user.mer_name;
                req.session.uid = user.id;
                res.json(['success', "登陆成功"]);
            }
            if(p != user.password){
                res.json(['error', "密码错误"]);
            }
        }
    });
});

// 登录后首页
router.get('/home', function(req, res, next) {
	usermodel.homeallbook(function(err, rows) {
		if (err) {
			res.render('public/home', {
				title: '青年书城首页',
				books: []
			})
		}
		res.render('public/home', {
			title: '青年书城首页',
			books: rows
		})
	})
});

// 退出登录
router.get('/logout', function(req, res) {
    req.session.usertype = null;
    req.session.name = null;
    req.session.uid = null;
    req.session.dpid = null;
    req.session.bid = null;
    res.redirect('/');
});

module.exports = router;
