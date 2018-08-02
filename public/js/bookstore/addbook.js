// 上架书籍提示
$('input[name="book_name"]').blur(function() {
	if ($('input[name="book_name"]').val() == '') {
		$('#addbookmessage').removeClass().addClass('alert alert-warning').text('书名不能为空');
	} else {
		$('#addbookmessage').removeClass().text('');
	}
});
$('input[name="detail"]').blur(function() {
	if ($('input[name="detail"]').val() == '') {
		$('#addbookmessage').removeClass().addClass('alert alert-warning').text('描述不能为空');
	} else {
		$('#addbookmessage').removeClass().text('');
	}
});
$('input[name="price"]').blur(function() {
	if ($('input[name="price"]').val() == '') {
		$('#addbookmessage').removeClass().addClass('alert alert-warning').text('原价不能为空');
	} else {
		$('#addbookmessage').removeClass().text('');
	}
});
$('input[name="stock"]').blur(function() {
	if ($('input[name="stock"]').val() == '') {
		$('#addbookmessage').removeClass().addClass('alert alert-warning').text('库存不能为空');
	} else {
		$('#addbookmessage').removeClass().text('');
	}
});
$('input[name="discount"]').blur(function() {
	if ($('input[name="discount"]').val() == '') {
		$('#addbookmessage').removeClass().addClass('alert alert-warning').text('特价不能为空，可与原价相同');
	} else {
		$('#addbookmessage').removeClass().text('');
	}
});

// ajax上架书籍
$('#btn_addbook').click(function() {
	var book_name = $('input[name="book_name"]').val();
	var detail = $('input[name="detail"]').val();
	var category = $('select[name="category"]').val();
	var price = $('input[name="price"]').val();
	var stock = $('input[name="stock"]').val();
	var discount = $('input[name="discount"]').val();
	if (book_name == '' || detail == '' || price == '' || stock == '' || discount == '') {
		$('#addbookmessage').removeClass().addClass('alert alert-warning').text('信息不完整，请检查信息');
	} else {
		$.ajax({
			url: '/shop/addbook',
			type: 'POST',
			dataType: 'json',
			cache: false,
			timeout: 5000,
			data: {
				book_name: book_name,
				detail: detail,
				category: category,
				price: price,
				stock: stock,
				discount: discount
			},
			success: function(data) {
				var res = data;
				if (res[0] == 'success') {
					$('#addbookmessage').removeClass().addClass('alert alert-success').text(res[1]);
					location.reload();
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
