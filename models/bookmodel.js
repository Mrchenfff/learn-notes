var db = require('./dboperation');

module.exports = {
	// 上传书籍图片
	uploadimg: function(id, imgurl, callback) {
		var sql = "update books set image = ? WHERE id = ?";
		db.exec(sql, [imgurl,id], function(err, rows) {
			if (err) {
				return callback(err);
			}
			callback();
		});
	},
	// 修改库存
	xgstock: function(id, stock, callback) {
		var sql = "update books set stock = ? WHERE id = ?";
		db.exec(sql, [stock,id], function(err, rows) {
			if (err) {
				return callback(err);
			}
			callback();
		});
	},
	joincart: function(user_id, book_id, number, callback) {
		db.getConnection(function(err, connection) {
			if (err) {
				return callback(err);
			}
			var sql;
			connection.beginTransaction(function(err) {
				if (err) {
					return callback(err);
				}
				sql = "SELECT * FROM shopcart WHERE user_id = ? and book_id = ?";
				connection.query(sql, [user_id,book_id], function(err, rows) {
					if (err) {
						return connection.rollback(function() {
							callback(err);
						});
					}
					if (rows.length > 0) {
						return callback('您的购物车中已经有了该商品');
					}
					sql = "select * from books where id = ?";
					connection.query(sql, book_id, function(err, aaa) {
						if (err) {
							return connection.rollback(function(err) {
								callback(err);
							});
						}
						var stock = aaa[0].stock;
						if (number > stock) {
							return callback('库存不足');
						}
						sql = "insert into shopcart(user_id,book_id,number) values(?,?,?)";
						connection.query(sql, [user_id,book_id,number], function(err, rows) {
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
		})
	},
	// 我的购物车
	myshopcart: function(uid, callback) {
		db.getConnection(function(err, connection) {
			if (err) {
				return callback(err);
			}
			var sql;
			connection.beginTransaction(function(err) {
				if (err) {
					return callback(err);
				}
				var sql = "select * from user WHERE id = ?";
				connection.query(sql, uid, function(err, user) {
					if (err) {
						return connection.rollback(function() {
							callback(err);
						});
					}
					sql = "SELECT *,books.id as bid,shopcart.id as cartid from books,shop,shopcart WHERE books.shop_id = shop.id and shopcart.book_id = books.id and shopcart.user_id = ?";
					connection.query(sql, uid, function(err, books) {
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
							callback(err, user[0], books);
						});
					})
				})
			})
		})
	},
	// 移除购物车商品
	delcartbook: function(id,callback){
		var sql = "delete from shopcart where id = ?";
		db.exec(sql,id,function(err,rows){
			if(err){
				return callback(err);
			}
			callback();
		})
	},
	// 下单
	placeorder: function(user_id, book_id, order_address, booknums, callback){
		db.getConnection(function(err, connection) {
			if (err) {
				return callback(err);
			}
			var sql;
			connection.beginTransaction(function(err) {
				if (err) {
					return callback(err);
				}
				sql = "SELECT * FROM books WHERE id = ?";
				connection.query(sql, book_id, function(err, rows) {
					if (err) {
						return connection.rollback(function() {
							callback(err);
						});
					}
					var shop_id = rows[0].shop_id;
					sql = "insert into bookorder(user_id,book_id,order_date,number,status,order_address,shop_id) values(?,?,now(),?,0,?,?)";
					connection.query(sql, [user_id,book_id,booknums,order_address,shop_id], function(err, rows) {
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
}
