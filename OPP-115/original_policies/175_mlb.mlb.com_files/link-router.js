(function() {
	var $ = jQuery;

	var type;
	var needToDivide = window.navigator.userAgent.match(/Android/) && !window.navigator.userAgent.match(/Chrome/);
	var largestScreenDimension = Math.max( screen.width, screen.height );
	if (needToDivide) {
		largestScreenDimension = largestScreenDimension / (window.devicePixelRatio || 1);
	}
	if (largestScreenDimension < 1024) {
		type = 'phone';
	} else if ("ontouchmove" in window) {
		type = 'tablet';
	} else {
		type = 'desktop';
	}
	var property = 'data-'+type+'-href';
	$('a['+property+']').on('touchstart mousedown', function(e) {
		var newHref = e.currentTarget.getAttribute(property);
		e.currentTarget.href = newHref;
	});

})();