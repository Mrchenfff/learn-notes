var express = require('express');
var router = express.Router();

var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');

var bookmodel = require('../models/bookmodel');

// 上传书籍图片页面
router.get('/loadbook/:id', function(req, res, next) {
	req.session.bid = req.params.id;
	res.render('book/loadimg', {
		title: '上传书籍图片'
	})
});

// 上传图片
router.post('/uploading', function(req, res, next) {
	var uid = req.session.uid;
	var dpid = req.session.dpid;
	var bid = req.session.bid;
	//生成multiparty对象，并配置上传目标路径
	var form = new multiparty.Form({
		uploadDir: './public/images/upload/'
	});
	//上传完成后处理
	form.parse(req, function(err, fields, files) {
		var filesTmp = JSON.stringify(files, null, 2);
		if (err) {
			console.log('parse error: ' + err);
		} else {
			console.log('parse files: ' + filesTmp);
			var inputFile = files.inputFile[0];
			var uploadedPath = inputFile.path;
			var dstPath = './public/images/upload/' + uid + dpid + bid + '.jpg';
			var imgurl = '/images/upload/' + uid + dpid + bid + '.jpg';
			//重命名为真实文件名
			fs.rename(uploadedPath, dstPath, function(err) {
				if (err) {
					console.log('rename error: ' + err);
				} else {
					console.log('rename ok');
				}
			});
			bookmodel.uploadimg(bid, imgurl, function(err, rows) {
				if (err) {
					req.flash('error_msg','上传失败：' + err);
					res.redirect('/book/loadbook/' + bid);
				}
			})
		}
		req.flash('success_msg','上传图片成功');
		res.redirect('/book/loadbook/' + bid);
	});
});

// 修改库存
router.post('/xgstock', function(req, res, next) {
	var bid = req.session.bid;
	var stock = req.body.stock;
	bookmodel.xgstock(bid, stock, function(err, rows) {
		if (err) {
			req.flash('error_msg','修改失败：' + err);
			res.redirect('/book/loadbook/' + bid);
		}
		req.flash('success_msg','修改库存成功');
		res.redirect('/book/loadbook/' + bid);
	})
});

// 添加到购物车
router.post('/addtocart', function(req, res, next) {
	var user_id = req.session.uid;
	var book_id = req.body.book_id;
	var number = req.body.book_num;
	bookmodel.joincart(user_id, book_id, number, function(err, rows) {
		if (err) {
			res.json(['error', "添加失败:" + err]);
			return next(err);
		}
		res.json(['success', "添加成功"]);
	})
});

router.get('/shopcart', function(req, res, next) {
	var uid = req.session.uid;
	bookmodel.myshopcart(uid, function(err, user, books) {
		if (err) {
			res.render('shopcart/shopcart', {
				title: '购物车',
				data: [],
				books: []
			})
		}
		res.render('shopcart/shopcart', {
			title: '购物车',
			data: user,
			books: books
		})
	})
});

// 从购物车移除
router.get('/delcartbook/:id',function(req,res,next){
	var id = req.params.id;
	bookmodel.delcartbook(id, function(err,rows){
		if(err){
			req.flash('error_msg','移除失败：' + err);
			res.redirect('/book/shopcart');
		}
		req.flash('success_msg','移除商品成功');
		res.redirect('/book/shopcart');
	})
});

// 下单
router.post('/placeorder', function(req, res) {
	var user_id = req.session.uid;
	var cartbooks = req.body.cartbooks;
	var booknums = req.body.booknums;
	var order_address = req.body.order_address;
	for (var i = 0; i < cartbooks.length; i++) {
		cartbooks[i] = parseInt(cartbooks[i]);
		booknums[i] = parseInt(booknums[i]);
	}
	for (var i = 0; i < cartbooks.length; i++) {
		bookmodel.placeorder(user_id, cartbooks[i], order_address, booknums[i], function(err, rows) {
			if (err) {
				req.flash('error_msg','下单失败' + err);
				res.redirect('/book/shopcart');
			}
		})
	}
	req.flash('success_msg','下单成功');
	res.redirect('/book/shopcart');
});

module.exports = router;
