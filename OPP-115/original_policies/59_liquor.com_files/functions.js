$(document).ready(function(){

	$(document).on("click", ".scroll-to", function() {
		div = $(this).data('div');
		$("html, body").animate({ scrollTop: $(div).offset().top });
	});

	$('.get-more').on('click', function() {
		what = $(this).data('what');
		more = $(this).data('get-how-many-more');
		$(what).children(':hidden').not('.clearfix').slice(0,more).slideDown();
		$("html, body").animate({ scrollTop: $(this).offset().top - 300 });
		if( $(what).children(':hidden').not('.clearfix').length == 0 ) {
			$(this).animate({'opacity':'0'}).slideUp();
		}
	});

	/** save buttons **/
	$(".btn-save").on('click', function(){
		var $button = $(this);
		$button.parent().find('.btn-success').hide();
		$button.parent().find('.btn-info').fadeIn();
		var data = {
			'post_type': $button.data('type'),
			'action': $button.data('action'),
			'post_id':$button.data('id'),
		};

		$.post('/wp-admin/admin-ajax.php', data, function(response){
			$button.parent().find('.btn-info').hide();
			if( response.success && response.data.message ){
				$button.parent().find('.btn-success > span').html( response.data.message );
				$button.parent().find('.btn-success').fadeIn();
				$button.parent().find('.btn-default').hide();
			} else {
				$button.parent().find('.btn-default').fadeIn();
				$button.parent().find('.btn-success').hide();
			}

			ga('send','event',$button.data('type'), $button.data('action'), $button.data('id'));

			if( response.data.prompt ){
				if( response.data.prompt == 'login'){
					show_modal_login();
				}
			}
		});
	});

	/** spirit video plays **/
	$('.videomodal').on('show.bs.modal', function (e) {
		var modal = $(this);
		var vid = modal.find('.modal-body').data('vid');
		modal.find('.modal-body iframe').attr('src', '/wp-content/themes/liquor-2015/components/content/spirit-video-frame.php?vid='+vid);
		console.log(vid);
	});
	$('.videomodal').on('hide.bs.modal', function (e) {
		var modal = $(this);
		modal.find('.modal-body iframe').removeAttr('src');
	});

	/** Clean up layout issues, ads, etc. on window resize **/
	function housecleaning() {
		
		var width = $( window ).width();

		$('.fix-my-height').each(function() {
			use_my_height = $(this).find('.use-my-height:first').height();
			max_height = $(this).data('max-height');
			if (max_height === undefined) {
				$(this).css('height', use_my_height );
			}
			else if (use_my_height) {
				if ( use_my_height <= max_height ) {
					$(this).css('height', use_my_height );
				}
				else {
					$(this).css('height', max_height );
				}
			}
		});
		
		// Trending Tiles
		tile = $('#trending-carousel .carousel-inner .trending');
		tile.removeClass('active');

		if ( width <= 766 ) {
		
			$('#trending-carousel').addClass('carousel');
			tile.attr('style','');
			tile.removeClass('fix-my-height');
			tile.addClass('item');
			tile.first().addClass('active');
			$('.hero-slug .hero').removeClass('fix-my-height');
			$('.hero-slug .hero').attr('style','');
			$('#trending-carousel').carousel({ interval: 5000 });
			$("#trending-carousel").carousel('cycle');
		
		} else {
		
			$('#trending-carousel').removeClass('carousel');
			tile.addClass('fix-my-height');
			tile.removeClass('item');
			$('.hero-slug .hero').addClass('fix-my-height');
			$('.nav-items').show();
			$("#trending-carousel").carousel('pause').removeData();

		}
		
	}
	
	
	$( window ).resize(function() {
	
		housecleaning();

		// Don't fire it until they are truly done futzing for at least a second.
		if (refresh_when_done_resizing !== undefined) {
			clearTimeout(refresh_when_done_resizing);
		}
		refresh_when_done_resizing = setTimeout('refreshAds()',1000);


	});
	
	/** Clean up on initial page load **/
	housecleaning();
	
});

var refresh_when_done_resizing = null;

function refreshAds() {

	// Fix Ad to fit content (Moved from /wp-content/plugins/ldc-2015-googledfp-widget/widgets.php)

	googletag.cmd.push(function() {
    googletag.pubads().refresh();
	});

}

