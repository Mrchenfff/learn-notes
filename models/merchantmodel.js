var db = require('./dboperation');

module.exports = {
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