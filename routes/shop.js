var express = require('express');
var router = express.Router();

var shopmodel = require('../models/shopmodel');

// 管理店铺页面
router.get('/manage', function(req, res, next) {
	var mer_id = req.session.uid;
	shopmodel.allshop(mer_id, function(err, rows) {
		if (err) {
			res.render('shop/manageshop', {
				title: '店铺管理',
				datas: []
			})
		}
		res.render('shop/manageshop', {
			title: '店铺管理',
			datas: rows
		})
	});
});

// 添加店铺
router.post('/shop_add', function(req, res, next) {
	var shop_name = req.body.shop_name;
	var mer_id = req.session.uid;
	shopmodel.shop_add(shop_name, mer_id, function(err, rows) {
		if (err) {
			res.json(['error', "添加店铺失败:" + err]);
			return next(err);
		}
		res.json(['success', "添加店铺成功"]);
	})
});

// 修改店铺名称
router.post('/shop_change', function(req, res, next) {
	var shop_name = req.body.shop_xgname;
	var shop_id = req.body.shop_xgid;
	shopmodel.shop_change(shop_name, shop_id, function(err, rows) {
		if (err) {
			res.json(['error', "修改失败:" + err]);
			return next(err);
		}
		res.json(['success', "修改成功"]);
	})
});

// 进入店铺
router.get('/inshop/:id', function(req, res, next) {
	var id = req.params.id;
	shopmodel.mer_shop(id, function(err, shopinformation, books) {
		if (err) {
			res.render('shop/shop_mer', {
				title: '我的店铺',
				shopinformation: [],
				books: []
			})
		}
		req.session.dpid = shopinformation.sid;
		res.render('shop/shop_mer', {
			title: '我的店铺',
			shopinformation: shopinformation,
			books: books
		})
	});
});

// 添加书籍
router.post('/addbook', function(req, res, next) {
	var book_name = req.body.book_name;
	var detail = req.body.detail;
	var category = req.body.category;
	var price = req.body.price;
	var stock = req.body.stock;
	var discount = req.body.discount;
	var shop_id = req.session.dpid;
	shopmodel.book_add(book_name, detail, category, price, stock, discount, shop_id, function(err, rows) {
		if (err) {
			res.json(['error', "上架失败:" + err]);
			return next(err);
		}
		res.json(['success', "上架成功"]);
	});
});

// 我的订单
router.get('/shoporder', function(req, res, next) {
	var mer_id = req.session.uid;
	shopmodel.shoporder(mer_id, function(err, rows) {
		if (err) {
			res.render('business/myorder', {
				title: '商家：我的订单',
				orders: []
			});
		}
		res.render('business/myorder', {
			title: '商家：我的订单',
			orders: rows
		});
	})
});

// 处理订单
router.get('/clorder/:oid', function(req, res, next) {
	var oid = req.params.oid;
	shopmodel.clorder(oid, function(err, rows) {
		if (err) {
			req.flash('error_msg','发货失败：' + err);
			res.redirect('/shop/shoporder');
		}
		req.flash('success_msg','发货成功');
		res.redirect('/shop/shoporder');
	})
});

module.exports = router;
