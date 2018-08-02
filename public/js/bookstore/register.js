// 用户注册提示
$('input[name="username1"]').blur(function(){
	if($('input[name="username1"]').val() == '') {
		$('#reg_wrong1').removeClass().addClass('alert alert-warning').text('用户名不能为空');
	}else{
		$('#reg_wrong1').removeClass().text('');
	}
});
$('input[name="password1"]').blur(function(){
	if($('input[name="password1"]').val() == '') {
		$('#reg_wrong1').removeClass().addClass('alert alert-warning').text('密码不能为空');
	}else{
		$('#reg_wrong1').removeClass().text('');
	}
});
$('input[name="re_pwd1"]').blur(function(){
	if($('input[name="re_pwd1"]').val() != $('input[name="password1"]').val()) {
		$('#reg_wrong1').removeClass().addClass('alert alert-warning').text('两次密码不相同');
	}else{
		$('#reg_wrong1').removeClass().text('');
	}
});
$('input[name="name1"]').blur(function(){
	if($('input[name="name1"]').val() == '') {
		$('#reg_wrong1').removeClass().addClass('alert alert-warning').text('姓名不能为空');
	}else{
		$('#reg_wrong1').removeClass().text('');
	}
});
$('input[name="phonenumber1"]').blur(function(){
	if($('input[name="phonenumber1"]').val() == '') {
		$('#reg_wrong1').removeClass().addClass('alert alert-warning').text('手机号不能为空');
	}else{
		$('#reg_wrong1').removeClass().text('');
	}
});
$('input[name="address1"]').blur(function(){
	if($('input[name="address1"]').val() == '') {
		$('#reg_wrong1').removeClass().addClass('alert alert-warning').text('地址不能为空');
	}else{
		$('#reg_wrong1').removeClass().text('');
	}
});
// 商家注册提示
$('input[name="username2"]').blur(function(){
	if($('input[name="username2"]').val() == '') {
		$('#reg_wrong2').removeClass().addClass('alert alert-warning').text('用户名不能为空');
	}else{
		$('#reg_wrong2').removeClass().text('');
	}
});
$('input[name="password2"]').blur(function(){
	if($('input[name="password2"]').val() == '') {
		$('#reg_wrong2').removeClass().addClass('alert alert-warning').text('密码不能为空');
	}else{
		$('#reg_wrong2').removeClass().text('');
	}
});
$('input[name="re_pwd2"]').blur(function(){
	if($('input[name="re_pwd2"]').val() != $('input[name="password2"]').val()) {
		$('#reg_wrong2').removeClass().addClass('alert alert-warning').text('两次密码不相同');
	}else{
		$('#reg_wrong2').removeClass().text('');
	}
});
$('input[name="name2"]').blur(function(){
	if($('input[name="name2"]').val() == '') {
		$('#reg_wrong2').removeClass().addClass('alert alert-warning').text('姓名不能为空');
	}else{
		$('#reg_wrong2').removeClass().text('');
	}
});
$('input[name="phonenumber2"]').blur(function(){
	if($('input[name="phonenumber2"]').val() == '') {
		$('#reg_wrong2').removeClass().addClass('alert alert-warning').text('手机号不能为空');
	}else{
		$('#reg_wrong2').removeClass().text('');
	}
});
$('input[name="address2"]').blur(function(){
	if($('input[name="address2"]').val() == '') {
		$('#reg_wrong2').removeClass().addClass('alert alert-warning').text('地址不能为空');
	}else{
		$('#reg_wrong2').removeClass().text('');
	}
});

// ajax用户注册
$(document).on('click', "#reg1", function() {
	var username = $('input[name="username1"]').val();
	var password = $('input[name="password1"]').val();
	var re_pwd = $('input[name="re_pwd1"]').val();
	var name = $('input[name="name1"]').val();
	var phonenumber = $('input[name="phonenumber1"]').val();
	var address = $('input[name="address1"]').val();
	if (username == '' || password == '' || name == '' || phonenumber == '' || address == '' || re_pwd != password) {
		$('#reg_wrong1').removeClass().addClass('alert alert-warning').text('注册信息错误请检查');
	} else {
		$.ajax({
			url: '/reg_user',
			type: 'POST',
			dataType: 'json',
			cache: false,
			timeout: 5000,
			data: {
				username: username,
				password: password,
				name: name,
				phonenumber: phonenumber,
				address: address
			},
			success: function(data) {
				var res = data;
				if (res[0] == 'success') {
					$('#reg_wrong1').removeClass().addClass('alert alert-success').text(res[1]);
				} else {
					$('#reg_wrong1').removeClass().addClass('alert alert-warning').text(res[1]);
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				$('#reg_wrong1').text('无法连接服务器');
			}
		});
	}
});

// ajax商家注册
$(document).on('click', "#reg2", function() {
	var username = $('input[name="username2"]').val();
	var password = $('input[name="password2"]').val();
	var re_pwd = $('input[name="re_pwd2"]').val();
	var name = $('input[name="name2"]').val();
	var phonenumber = $('input[name="phonenumber2"]').val();
	var address = $('input[name="address2"]').val();
	if (username == '' || password == '' || name == '' || phonenumber == '' || address == '' || re_pwd != password) {
		$('#reg_wrong2').removeClass().addClass('alert alert-warning').text('注册信息错误请检查');
	} else {
		$.ajax({
			url: '/reg_mer',
			type: 'POST',
			dataType: 'json',
			cache: false,
			timeout: 5000,
			data: {
				username: username,
				password: password,
				name: name,
				phonenumber: phonenumber,
				address: address
			},
			success: function(data) {
				var res = data;
				if (res[0] == 'success') {
					$('#reg_wrong2').removeClass().addClass('alert alert-success').text(res[1]);
				} else {
					$('#reg_wrong2').removeClass().addClass('alert alert-warning').text(res[1]);
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				$('#reg_wrong2').text('无法连接服务器');
			}
		});
	}
});