jQuery(document).ready(function($) {

	var data = {
		'action': 'advt_rand',
	};

	$.post(MyAjax.ajaxurl, data, function(response) {
		$('.widget_advertiser_ad .widget-wrap').fadeOut('fast', function(){
			$(this).html(response).fadeIn('slow');
		});
	});

	setInterval(function() {
		$.post(MyAjax.ajaxurl, data, function(response) {
			$('.widget_advertiser_ad .widget-wrap').fadeOut('fast', function(){
				$(this).html(response).fadeIn(900);
			});
		});
	}, 6000);

});