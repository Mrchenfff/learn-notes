var express = require('express');
var router = express.Router();

var usermodel = require('../models/usermodel');
var shopmodel = require('../models/shopmodel');

/* GET users listing. */
router.get('/userorder', function(req, res, next) {
	var uid = req.session.uid;
	usermodel.userorder(uid, function(err, rows) {
		if (err) {
			res.render('user/myorder', {
				title: '用户：我的订单',
				orders: []
			});
		}
		res.render('user/myorder', {
			title: '用户：我的订单',
			orders: rows
		});
	})
});
/* GET users listing. */
router.get('/userinfo', function(req, res, next) {
	var uid = req.session.uid;
	console.log(uid);
	usermodel.userinfo(uid, function(err, rows) {
		if (err) {
			res.render('user/userinfo', {
				title: '用户：我的信息',
				rows: []
			});
		}
		res.render('user/userinfo', {
			title: '用户：我的信息',
			rows: rows
		});
	})
});

/* GET users listing. */
router.post('/updateuserinfo', function(req, res, next) {
	var id = req.session.uid;
	var username = req.body.username;
	var name = req.body.name;
	var phonenum = req.body.phonenum;
	var address = req.body.address;
	var body=req.body;

	usermodel.updateuserinfo(id,name,phonenum,address, function(err, rows) {
		if (err) {
			
			req.flash('error_msg','更新失败：');

			res.redirect('/users/userinfo');
		}
			req.flash('success_msg','更新成功：');
			res.redirect('/users/userinfo');
	})
});

/* GET users listing. */
router.post('/updateorder/:id', function(req, res, next) {
	var id = req.params.id;
	var status = req.body.status;
	var number = req.body.number;
	var order_address = req.body.order_address;

	usermodel.updateorder(id,number,order_address,status,function(err, rows) {
		if (err) {
			
			req.flash('error_msg','更新失败：');

			res.redirect('/shop/shoporder');
		}
			req.flash('success_msg','更新成功：');
			res.redirect('/shop/shoporder');
	})
});


router.get('/usershow',function(req,res,next){

	usermodel.selectuser(function(err,rows){
		console.log(rows);
		res.render('user/usershow',{
			title:'用户管理',
			rows:rows
		});
	})
})
router.get('/deleteuser/:id',function(req,res,next){
var id =req.params.id;
	usermodel.deleteuser(id,function(err,rows){
		res.redirect('/users/usershow');
	})
})
//添加公告
router.post('/addcontent',function(req,res,next){
var title =req.body.title;
var content =req.body.content;
console.log(title);
console.log(content);
	usermodel.addcontent(title,content,function(err,rows){
		res.json(1);
	})
})
//公告页展示
router.get('/content/',function(req,res,next){
	usermodel.selectcontent(function(err,rows){
	
		res.render('user/content',{
			title:'公告管理',
			rows:rows
		});
	})
})
//公告页展示
router.get('/usercontent',function(req,res,next){
	usermodel.selectcontent(function(err,rows){
	console.log(rows);
		res.render('user/usercontent',{
			title:'公告查看',
			rows:rows
		});
	})
})
//公告页展示
router.get('/contentshow/:id',function(req,res,next){
	var id =req.params.id;
	usermodel.showcontent(id,function(err,rows){
	console.log(rows);
		res.render('user/contents',{
			title:'公告管理',
			rows:rows
		});
	})
})
//公告页展示
router.post('/getcontent/:id',function(req,res,next){
var id =req.params.id;
	usermodel.showcontent(id,function(err,rows){
	console.log(rows);
	res.json(rows);
	})
})
//公告删
router.get('/deletecontent/:id',function(req,res,next){
	var id =req.params.id;
	console.log(id);
	usermodel.deletecontent(id,function(err,rows){
		req.flash('success_msg','删除成功');
	res.redirect('/users/content');
	})
})
//公告页展示
router.post('/updatecontent/:id',function(req,res,next){
	var id =req.params.id;
	var title=req.body.title;
	var content=req.body.content;
	usermodel.updatecontent(id,title,content,function(err,rows){
	req.flash('success_msg','更新成功：');
	res.redirect('/users/content');
	})
})

module.exports = router;
