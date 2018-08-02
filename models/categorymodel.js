var db = require('./dboperation');

module.exports = {
	// 热门推荐
	rmtjbook: function(callback){
		var sql = "select * from books order by sales_volume desc";
		db.exec(sql, '', function(err,rows){
			if(err){
				return callback(err);
			}
			callback(err,rows);
		})
	},
	//  分类显示书籍
	categorybook: function(category, callback){
		var sql = "select * from books where category = ?";
		db.exec(sql, category, function(err,rows){
			if(err){
				return callback(err);
			}
			callback(err,rows);
		})
	},
	// 查询
	searchbook: function(search_val, callback){
		var sql = "SELECT * FROM books WHERE book_name like '%" + search_val + "%'";
		db.exec(sql, '', function(err,rows){
			if(err){
				return callback(err);
			}
			callback(err,rows);
		})
	},
}
