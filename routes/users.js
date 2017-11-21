var express = require('express');
var router = express.Router();

var usermodel = require('../models/usermodel');

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

module.exports = router;
