var db = require('./dboperation');

module.exports = {
	// 添加店铺
	shop_add: function(shop_name, mer_id, callback) {
		db.getConnection(function(err, connection) {
			if (err) {
				return callback(err);
			}
			var sql;
			connection.beginTransaction(function(err) {
				if (err) {
					return callback(err);
				}
				sql = "SELECT * FROM shop WHERE shop_name = ?";
				connection.query(sql, shop_name, function(err, rows) {
					if (err) {
						return connection.rollback(function() {
							callback(err);
						});
					}
					if (rows.length > 0) {
						return callback('店名已存在');
					}
					sql = "insert into shop(shop_name,mer_id) values(?,?)";
					connection.query(sql, [shop_name,mer_id], function(err, rows) {
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
	// 显示所有店铺
	allshop: function(mer_id, callback) {
		var sql = "select * from shop WHERE mer_id = ?";
		db.exec(sql, mer_id, function(err, rows) {
			if (err) {
				return callback(err);
			}
			callback(err, rows);
		});
	},
	// 修改店铺名称
	shop_change: function(shop_name, shop_id, callback) {
		db.getConnection(function(err, connection) {
			if (err) {
				return callback(err);
			}
			var sql;
			connection.beginTransaction(function(err) {
				if (err) {
					return callback(err);
				}
				sql = "SELECT * FROM shop WHERE shop_name = ?";
				connection.query(sql, shop_name, function(err, rows) {
					if (err) {
						return connection.rollback(function() {
							callback(err);
						});
					}
					if (rows.length > 0) {
						return callback('店名已存在');
					}
					sql = "update shop set shop_name = ? where id = ?";
					connection.query(sql, [shop_name,shop_id], function(err, rows) {
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
	// 商家进入店铺
	mer_shop: function(id, callback) {
		db.getConnection(function(err, connection) {
			if (err) {
				return callback(err);
			}
			var sql;
			connection.beginTransaction(function(err) {
				if (err) {
					return callback(err);
				}
				// 查询店铺id、店铺名、店铺所属人
				var sql = "select shop.id as sid, shop_name,mer_name from merchant,shop where shop.id = ? and shop.mer_id = merchant.id";
				connection.query(sql, id, function(err, shopinformation) {
					if (err) {
						return connection.rollback(function() {
							callback(err);
						});
					}
					var sid = shopinformation[0].sid;
					sql = "select * from books WHERE shop_id = ?";
					connection.query(sql, sid, function(err, books) {
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
							callback(err, shopinformation[0], books);
						});
					})
				})
			})
		})
	},
	// 上架书籍
	book_add: function(book_name,detail,category,price,stock,discount,shop_id,callback) {
		db.getConnection(function(err, connection) {
			if (err) {
				return callback(err);
			}
			var sql;
			connection.beginTransaction(function(err) {
				if (err) {
					return callback(err);
				}
				sql = "SELECT * FROM books WHERE book_name = ? and shop_id = ?";
				connection.query(sql, [book_name,shop_id], function(err, rows) {
					if (err) {
						return connection.rollback(function() {
							callback(err);
						});
					}
					if (rows.length > 0) {
						return callback('本店该书已存在');
					}
					sql = "insert into books(book_name,detail,category,price,stock,discount,sales_volume,shop_id) values (?,?,?,?,?,?,0,?)";
					connection.query(sql,[book_name,detail,category,price,stock,discount,shop_id], function(err, rows) {
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
	// 商家我的订单
	shoporder: function(mer_id, callback){
		var sql = "SELECT *,bookorder.id as oid,bookorder.number as onum from books,bookorder,shop,user where bookorder.user_id = user.id and bookorder.book_id = books.id and bookorder.shop_id = shop.id and shop.mer_id = ?";
		db.exec(sql, mer_id, function(err,rows){
			if(err){
				return callback(err);
			}
			callback(err,rows);
		})
	},
	// 处理订单
	// clorder: function(oid, callback) {
	// 	var sql = "update bookorder set status = 1 where id = ?";
	// 	db.exec(sql, oid, function(err,rows){
	// 		if(err){
	// 			return callback(err);
	// 		}
	// 		callback();
	// 	})
	// },
	clorder: function(oid, callback) {
		db.getConnection(function(err, connection) {
			if (err) {
				return callback(err);
			}
			var sql;
			connection.beginTransaction(function(err) {
				if (err) {
					return callback(err);
				}
				sql = "SELECT * FROM bookorder WHERE id = ?";
				connection.query(sql, oid, function(err, rows) {
					if (err) {
						return connection.rollback(function() {
							callback(err);
						});
					}
					var book_id = rows[0].book_id;
					var csnum = rows[0].number;
					sql = "update books,bookorder set books.stock=books.stock-?,books.sales_volume=books.sales_volume+?,bookorder.status=1 where books.id = ? and bookorder.id = ?";
					connection.query(sql,[csnum,csnum,book_id,oid], function(err, rows) {
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
