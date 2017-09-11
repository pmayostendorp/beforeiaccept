$(document).ready(function(){

	$('.nav-burger').click( function() {
		$('.nav-items').slideToggle();
		$('.nav-burger i').toggleClass('fa-times');
		$('.nav-burger i').toggleClass('fa-bars');
	});

	var navigationHeaderOffset = $('.navigation-slug').offset().top;

	$(window).scroll(function(){
	  var navigationHeader = $('.navigation-slug'),
	      scroll = $(window).scrollTop();
	
	  if (scroll > navigationHeaderOffset) {
	  	$('body').addClass('fixed-nav');
			/* Special case if we're logged in as Admin */
			if ( $('#wpadminbar').length ) {
				$('.navigation-slug').css('top','32px');
			}
	  }
	  else {
	  	$('body').removeClass('fixed-nav');
			/* Special case if we're logged in as Admin */
			if ( $('#wpadminbar').length ) {
				$('.navigation-slug').css('top','0px');
			}
	  }
	  
	  
	});
	
	$('.search-button').click( function() {
		$('.search-field').slideToggle();
		$('#search-input').focus();
	});
	
	$('.global-search').submit( function(event) {
		event.preventDefault();
		search_term = $('#search-input').val();
		$('.gsc-input').val(search_term);
		$('.gsc-search-button').trigger('click');
	});


});