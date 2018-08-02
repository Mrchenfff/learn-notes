// 添加店铺提示
$('input[name="shop_name"]').blur(function() {
	if ($('input[name="shop_name"]').val() == '') {
		$('#addshopmessage').removeClass().addClass('alert alert-warning').text('店铺名不能为空');
	} else {
		$('#addshopmessage').removeClass().text('');
	}
});

// ajax添加店铺
$('#btn_shopadd').click(function() {
	var shop_name = $('input[name="shop_name"]').val();
	if (shop_name == '') {
		$('#addshopmessage').removeClass().addClass('alert alert-warning').text('店铺名不能为空');
	} else {
		$.ajax({
			url: '/shop/shop_add',
			type: 'POST',
			dataType: 'json',
			cache: false,
			timeout: 5000,
			data: {
				shop_name: shop_name
			},
			success: function(data) {
				var res = data;
				if (res[0] == 'success') {
					$('#addshopmessage').removeClass().addClass('alert alert-success').text(res[1]);
					location.href = "/shop/manage";
				} else {
					$('#addshopmessage').removeClass().addClass('alert alert-warning').text(res[1]);
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				$('#addshopmessage').removeClass().addClass('alert alert-warning').text('无法连接服务器');
			}
		});
	}
});

// 动态赋予id以及模态事件
var btn_xgdps = $('.btn_xgdp');
var shop_modals = $('.shop_modal');
var xgshopids = $('.xgshopid');
var xgshopnames = $('.xgshopname');
var btn_wcxgs = $('.btn_wcxg');
for (var i = 0; i < btn_xgdps.length; i++) {
	btn_xgdps[i].setAttribute('data-target', '#shop' + i);
	shop_modals[i].id = 'shop' + i;
	xgshopids[i].setAttribute('name', 'xgshopid' + i);
	xgshopnames[i].setAttribute('name', 'xgshopname' + i);
	btn_wcxgs[i].setAttribute('id', 'btn_wcxg' + i);
}

// 修改店铺名称提示
$('input[name="shop_xgname"]').blur(function() {
	if ($('input[name="shop_xgname"]').val() == '') {
		$('.xgshopmessage').removeClass().addClass('alert alert-warning').text('店铺名不能为空');
	} else {
		$('.xgshopmessage').removeClass().text('');
	}
});

// ajax修改店铺名称方法
var xgshopname = function(i) {
	return function() {
		var inpid = 'xgshopid' + i;
		var inpname = 'xgshopname' + i;
		var shop_xgid = $('input[name=' + inpid + ']').val();
		var shop_xgname = $('input[name=' + inpname + ']').val();
		if (shop_xgname == '') {
			$('.xgshopmessage').removeClass().addClass('alert alert-warning').text('店铺名不能为空');
		} else {
			$.ajax({
				url: '/shop/shop_change',
				type: 'POST',
				dataType: 'json',
				cache: false,
				timeout: 5000,
				data: {
					shop_xgid: shop_xgid,
					shop_xgname: shop_xgname
				},
				success: function(data) {
					var res = data;
					if (res[0] == 'success') {
						$('.xgshopmessage').removeClass().addClass('alert alert-success').text(res[1]);
						location.href = "/shop/manage";
					} else {
						$('.xgshopmessage').removeClass().addClass('alert alert-warning').text(res[1]);
					}
				},
				error: function(jqXHR, textStatus, errorThrown) {
					$('.xgshopmessage').removeClass().addClass('alert alert-warning').text('无法连接服务器');
				}
			});
		}
	}
}
for (var i = 0; i < btn_wcxgs.length; i++) {
	$('#btn_wcxg' + i).click(xgshopname(i));
}
