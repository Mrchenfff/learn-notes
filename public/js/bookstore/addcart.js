var btn_bookcons = $('.btn_bookcon');
var bookcon_modals = $('.bookcon_modal');
var cart_bookids = $('.cart_bookid');
var cart_nums = $('.cart_num');
var btn_tocarts = $('.btn_tocart');
var joincartmessages = $('.joincartmessage');

for (var i = 0; i < btn_bookcons.length; i++) {
	btn_bookcons[i].setAttribute('data-target', '#bookcon_modal' + i);
	bookcon_modals[i].id = 'bookcon_modal' + i;
	cart_bookids[i].setAttribute('name', 'cart_bookid' + i);
	cart_nums[i].setAttribute('name', 'cart_num' + i);
	btn_tocarts[i].id = 'btn_tocart' + i;
	joincartmessages[i].id = 'joincartmessage' + i;
}

function clean_class(id) {
	setTimeout(function() {
		$(id).removeClass().text('');
	}, 1000);
}

function clean_class2() {
	setTimeout(function() {
		$('#joincartmes').removeClass().text('');
	}, 1000);
}

// ajax添加购物车方法
var joincart = function(i) {
	return function() {
		var inpid = 'cart_bookid' + i;
		var book_id = $('input[name=' + inpid + ']').val();
		var inpnum = 'cart_num' + i;
		var book_num = $('input[name=' + inpnum + ']').val();
		var joincartmessage = '#joincartmessage' + i;
		if (book_num == '') {
			$(joincartmessage).removeClass().addClass('alert alert-warning').text('书籍数量不能为空');
		} else {
			$.ajax({
				url: '/book/addtocart',
				type: 'POST',
				dataType: 'json',
				cache: false,
				timeout: 5000,
				data: {
					book_id: book_id,
					book_num: book_num
				},
				success: function(data) {
					var res = data;
					if (res[0] == 'success') {
						$(joincartmessage).removeClass().addClass('alert alert-success').text(res[1]);
						clean_class(joincartmessage);
					} else {
						$(joincartmessage).removeClass().addClass('alert alert-warning').text(res[1]);
						clean_class(joincartmessage);
					}
				},
				error: function(jqXHR, textStatus, errorThrown) {
					$(joincartmessage).removeClass().addClass('alert alert-warning').text('无法连接服务器');
					clean_class(joincartmessage);
				}
			});
		}
	}
}
for (var i = 0; i < btn_tocarts.length; i++) {
	$('#btn_tocart' + i).click(joincart(i));
}



var cart_olbookids = $('.cart_olbookid');
var cart_olnums = $('.cart_olnum');
var btn_oltocarts = $('.btn_oltocart');
for (var i = 0; i < btn_oltocarts.length; i++) {
	cart_olbookids[i].setAttribute('name', 'cart_olbookid' + i);
	cart_olnums[i].setAttribute('name', 'cart_olnum' + i);
	btn_oltocarts[i].id = 'btn_oltocart' + i;
}
// ajax添加购物车方法2
var joincart2 = function(i) {
	return function() {
		var inpid = 'cart_olbookid' + i;
		var book_id = $('input[name=' + inpid + ']').val();
		var inpnum = 'cart_olnum' + i;
		var book_num = $('input[name=' + inpnum + ']').val();
		if (book_num == '') {
			$('#joincartmes').removeClass().addClass('alert alert-warning col-md-2').text('书籍数量不能为空');
		} else {
			$.ajax({
				url: '/book/addtocart',
				type: 'POST',
				dataType: 'json',
				cache: false,
				timeout: 5000,
				data: {
					book_id: book_id,
					book_num: book_num
				},
				success: function(data) {
					var res = data;
					if (res[0] == 'success') {
						$('#joincartmes').removeClass().addClass('alert alert-success col-md-2').text(res[1]);
						clean_class2();
					} else {
						$('#joincartmes').removeClass().addClass('alert alert-warning col-md-2').text(res[1]);
						clean_class2();
					}
				},
				error: function(jqXHR, textStatus, errorThrown) {
					$('#joincartmes').removeClass().addClass('alert alert-warning col-md-2').text('无法连接服务器');
					clean_class2();
				}
			});
		}
	}
}
for (var i = 0; i < btn_oltocarts.length; i++) {
	$('#btn_oltocart' + i).click(joincart2(i));
}
