(function($) {

	$(function() {
		var my_timeout = false;

		if( Modernizr.touch ) {
			return;
		}

		$('.navbar .nav li').mouseenter(function() {
			clearTimeout(my_timeout);
			var $this = $(this);
			var my_dropnav = $this.data('mydropnav');

			$('.dropnav').hide();

			var url = $this.attr('data-dropnav-source');
			if( !url ) {
				return;
			}


			if( !my_dropnav ) {
				var container = $('<div></div>')
						.addClass('dropnav row-fluid')
						.html('<div class="span12"><div class="row-fluid loading">&nbsp;</div></div>');

				var parent = $this.parents('.navbar');

				$('body').append(container);
				container.css({
					'position': 'absolute',
					'left': parent.offset().left,
					'top': parent.offset().top + parent.height(),
					'width': parent.width(),
				});

				my_dropnav = container;

				my_dropnav.hide();

				$this.data('mydropnav', my_dropnav);

				$.get(url+'&d='+parseInt(Math.random()*99999999), function(data) {
					container.find('.row-fluid').removeClass('loading').empty();
					container.find('.row-fluid').append($(data));
				});

				my_dropnav.mouseenter(function() {
					clearTimeout(my_timeout);
				}).mouseleave(function() {
					my_timeout = setTimeout(function() {
						$('.dropnav').hide();
					}, 500);
				});
			}

			my_dropnav.fadeIn();
		}).mouseleave(function() {
			clearTimeout(my_timeout);
			my_timeout = setTimeout(function() {
				$('.dropnav').hide();
			}, 500);
		});


	});

})(jQuery);