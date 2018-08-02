var express = require('express');
var router = express.Router();

var categorymodel = require('../models/categorymodel');

// 热门推荐
router.get('/rmtj', function(req, res, next) {
    categorymodel.rmtjbook(function(err, rows) {
        if (err) {
            res.render('public/category', {
                title: '热门书籍',
                navname: '热门书籍',
				dqcategory: '热门书籍',
                books: []
            })
        }
        res.render('public/category', {
			title: '热门书籍',
            navname: '热门书籍',
			dqcategory: '热门书籍',
            books: rows
        })
    })
});

// 分类查询
router.get('/:category', function(req, res, next) {
	var category = req.params.category;
    categorymodel.categorybook(category, function(err, rows) {
        if (err) {
            res.render('public/category', {
                title: category + '书籍',
                navname: '分类查看',
				dqcategory: category,
                books: []
            })
        }
        res.render('public/category', {
			title: category + '书籍',
            navname: '分类查看',
			dqcategory: category,
            books: rows
        })
    })
});

// 搜索功能
router.post('/search', function(req, res, next) {
	var search_val = req.body.search_val;
	categorymodel.searchbook(search_val, function(err, rows) {
		if (err) {
			res.render('public/category', {
				title: 'search:' + search_val,
                navname: '搜索',
				dqcategory: search_val,
				books: []
			})
		}
		res.render('public/category', {
			title: 'search:' + search_val,
            navname: '搜索',
			dqcategory: search_val,
			books: rows
		})
	})
});

module.exports = router;
