var order_dates = $('.order_date');

for (var i=0; i < order_dates.length; i++) {
	order_dates[i].id = 'order_date' + i;
	var str_date = $('#order_date' + i).text();
	var d = new Date(str_date);
	var zcdate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(); 
	$('#order_date' + i).text(zcdate);
}