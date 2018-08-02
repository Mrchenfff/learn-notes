var cart_item_num = $('.cart_item').length;

function cart(cart_box, cart_danjia, cart_check, cart_checkdis) {
	var cart_box = $(cart_box);
	var dj = $(cart_danjia).text();
	setPrice();
	setNum();
	$(cart_box).bind('input propertychange', function() {
		setPrice();
		setNum();
		getAllprice();
		yhprice();
	});
	function setPrice() {
		var price = parseFloat(cart_box.val() * dj).toFixed(2);
		$(cart_check).attr('price', price);
	}
	function setNum() {
		$(cart_checkdis).attr('value', cart_box.val());
	}
}

var xz1 = function(i) {
	return function(){
		if ($('#cart_check'+i).prop('checked') == true) {
			$('#cart_checkdis'+i).prop('checked', true);
		}else{
			$('#cart_checkdis'+i).prop('checked', false);
		}
	}
}

for (var i = 0; i < cart_item_num; i++) {
	var cart_box_id = 'cart_box' + i;
	var cart_danjia_id = 'cart_danjia' + i;
	var cart_check_id = 'cart_check' + i;
	var cart_checkdis_id = 'cart_checkdis' + i;
	var hq_cart_box_id = '#cart_box' + i;
	var hq_cart_danjia_id = '#cart_danjia' + i;
	var hq_cart_check_id = '#cart_check' + i;
	var hq_cart_checkdis_id = '#cart_checkdis' + i;
	$('.cart_box').eq(i).attr('id', cart_box_id);
	$('.cart_danjia').eq(i).attr('id', cart_danjia_id);
	$('.cart_check').eq(i).attr('id', cart_check_id);
	$('.cart_checkdis').eq(i).attr('id', cart_checkdis_id);
	cart(hq_cart_box_id, hq_cart_danjia_id, hq_cart_check_id, hq_cart_checkdis_id);
}

for (var i=0; i < cart_item_num; i++) {
	$('#cart_check'+i).click(xz1(i));
}

$('.cart_check').click(function() {
	getAllprice();
	yhprice();
});

function getAllprice() {
	var zj = 0;
	$('.cart_check').each(function() {
		if ($(this).prop('checked') == true) {
			zj += parseFloat($(this).attr('price'));
		}
		$('#zongjia').html(zj.toFixed(2));
	});
	if (parseFloat(zj.toFixed(2)) >= 200) {
		$('#zongjia_yh').html(parseFloat(zj - 30.00).toFixed(2));
	}else{
		$('#zongjia_yh').html(zj.toFixed(2));
	}
}
