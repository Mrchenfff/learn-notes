var db = require('./dboperation');

module.exports = {
	// 商家注册
	mer_reg: function(username, password, name, phonenumber, address, callback) {
		db.getConnection(function(err, connection) {
			if (err) {
				return callback(err);
			}
			var sql;
			connection.beginTransaction(function(err) {
				if (err) {
					return callback(err);
				}
				sql = "SELECT * FROM merchant WHERE username = ?";
				connection.query(sql, username, function(err, rows) {
					if (err) {
						return connection.rollback(function() {
							callback(err);
						});
					}
					if (rows.length > 0) {
						return callback('用户名存在');
					}
					sql = "insert into merchant(username,password,mer_name,phonenum,address) values(?,?,?,?,?)";
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
	// 商户登录
	merchant_login: function(username,callback){
		var sql = "select * from merchant where username = ?";
		db.exec(sql,username,function(err,rows){
			if(err){
				return callback(err);
			}
			callback(err,rows[0]);
		})
	},
}