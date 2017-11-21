var db = require('./dboperation');

module.exports = {
	// 用户注册
	user_reg: function(username, password, name, phonenumber, address, callback) {
		db.getConnection(function(err, connection) {
			if (err) {
				return callback(err);
			}
			var sql;
			connection.beginTransaction(function(err) {
				if (err) {
					return callback(err);
				}
				sql = "SELECT * FROM user WHERE username = ?";
				connection.query(sql, username, function(err, rows) {
					if (err) {
						return connection.rollback(function() {
							callback(err);
						});
					}
					if (rows.length > 0) {
						return callback('用户名存在');
					}
					sql = "insert into user(username,password,name,phonenum,address) values(?,?,?,?,?)";
					connection.query(sql, [username,password,name,phonenumber,address], function(err, rows) {
						if (err) {
							return connection.rollback(function(err) {
								callback(err);
							});
						}
						connection.commit(function(err) {
							if (err) {
								return connection.rollback(function() {
									callback(err);
								});
							}
							connection.end();
							callback();
						});
					})
				})
			})
		})
	},
	// 个人登录
	personal_login: function(username,callback){
		var sql = "select * from user where username = ?";
		db.exec(sql,username,function(err,rows){
			if(err){
				return callback(err);
			}
			callback(err,rows[0]);
		})
	},
	// 首页显示书籍
	homeallbook: function(callback){
		var sql = "select * from books order by id desc limit 0,12";
		db.exec(sql, '', function(err,rows){
			if(err){
				return callback(err);
			}
			callback(err,rows);
		})
	},
	// 用户我的订单
	userorder: function(uid, callback){
		var sql = "SELECT * from books,bookorder,shop where bookorder.book_id = books.id and bookorder.shop_id = shop.id and bookorder.user_id = ?";
		db.exec(sql, uid, function(err,rows){
			if(err){
				return callback(err);
			}
			callback(err,rows);
		})
	},
}
