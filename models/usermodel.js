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
	userinfo:function(uid, callback){
		var sql ='select * from user where id = ?';
		db.exec(sql, uid ,function(err,rows){
			if(err){
				return callback(err);
			}
			callback(err,rows)
		})

	},
	updateuserinfo:function(id,name,phonenum,address, callback){
		
		db.getConnection(function(err, connection) {
			if (err) {
				return callback(err);
			}
		// var sql ='update user set name= ?,phonenum= ? ,address=? where id = ? ';
		connection.beginTransaction(function(err) {
				if (err) {
					return callback(err);
				}

				sql = "update user set name= ?,phonenum= ? ,address=? where id = ?";
				connection.query(sql, [name,phonenum,address,id], function(err, rows) {
					if (err) {
						return connection.rollback(function() {
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
		// db.exec(sql, [name,phonenum,address,id] ,function(err,rows){
		// 	if(err){
		// 		return callback(err);
		// 	}
		// 	callback(err,rows)
		// })

	},
	updateorder:function(id,number,order_address,status, callback){
		
		db.getConnection(function(err, connection) {
			if (err) {
				return callback(err);
			}
		// var sql ='update user set name= ?,phonenum= ? ,address=? where id = ? ';
		connection.beginTransaction(function(err) {
				if (err) {
					return callback(err);
				}

				sql = "update bookorder set number= ?,order_address= ? ,status= ? where id = ?";
				connection.query(sql, [number,order_address,status,id], function(err, rows) {
					if (err) {
						return connection.rollback(function() {
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
		// db.exec(sql, [name,phonenum,address,id] ,function(err,rows){
		// 	if(err){
		// 		return callback(err);
		// 	}
		// 	callback(err,rows)
		// })

	},
		selectuser:function(callback){
		var sql ='select * from user';
		db.exec(sql,function(err,rows){
			if(err){
				return callback(err);
			}
			callback(err,rows)
		})

	},

 	 deleteuser:function(id,callback){
 	 	var sql='delete from user where id =?';
 	 	db.exec(sql,id,function(err,rows){
			if(err){
				return callback(err);
			}
			callback(err,rows)
		})
 	 },
 	 selectcontent:function(callback){
 	 	var sql='select * from content order by id desc';
 	 	db.exec(sql,function(err,rows){
			if(err){
				return callback(err);
			}
			callback(err,rows)
		})
 	 },

 	 addcontent:function(title,content,callback){
 	 	var sql ='insert into content (title,content,time) values(?,?,now())';
 	 		db.exec(sql,[title,content],function(err,rows){
			if(err){
				return callback(err);
			}
			callback(err,rows)
		})
 	 },
 	 showcontent:function(id,callback){
 	 	var sql="select *from content where id =?";
 	 	db.exec(sql,id,function(err,rows){
			if(err){
				return callback(err);
			}
			callback(err,rows)
		})
 	 },

 	  deletecontent:function(id,callback){
 	 	var sql="delete from content where id=?";
 	 	db.exec(sql,id,function(err,rows){
			if(err){
				return callback(err);
			}
			callback(err,rows)
		})
 	 },

 	 updatecontent:function(id,title,content,callback){
 	 	var sql="update content  set title =  ?,content= ? where id= ?";
 	 	db.exec(sql,[title,content,id],function(err,rows){
			if(err){
				return callback(err);
			}
			callback(err,rows)
		})
 	 }
}
